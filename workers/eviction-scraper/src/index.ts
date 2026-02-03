/**
 * Denver Eviction Tracker — Cloudflare Worker
 *
 * Scrapes Denver County Court eviction filings on a daily cron schedule,
 * stores them in a D1 database, and serves an API for the frontend dashboard.
 *
 * Data source: Denver County Court public records
 * https://www.denvercountycourt.org/
 *
 * D1 Database setup:
 *   wrangler d1 create eviction-data
 *   wrangler d1 execute eviction-data --file=./schema.sql
 */

export interface Env {
  DB: D1Database;
  CORS_ORIGIN: string;
}

// --- Database Schema (run via wrangler d1 execute) ---
// CREATE TABLE IF NOT EXISTS eviction_filings (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   case_number TEXT UNIQUE NOT NULL,
//   filing_date TEXT NOT NULL,
//   plaintiff TEXT NOT NULL,           -- landlord / property management company
//   plaintiff_attorney TEXT,
//   defendant TEXT NOT NULL,            -- tenant (consider privacy: may anonymize)
//   address TEXT,
//   neighborhood TEXT,
//   zip_code TEXT,
//   filing_type TEXT,                   -- FED (forcible entry and detainer), etc.
//   disposition TEXT,                   -- pending, dismissed, judgment for plaintiff, etc.
//   disposition_date TEXT,
//   amount_claimed REAL,
//   created_at TEXT DEFAULT (datetime('now')),
//   updated_at TEXT DEFAULT (datetime('now'))
// );
//
// CREATE INDEX idx_filing_date ON eviction_filings(filing_date);
// CREATE INDEX idx_plaintiff ON eviction_filings(plaintiff);
// CREATE INDEX idx_neighborhood ON eviction_filings(neighborhood);
// CREATE INDEX idx_zip_code ON eviction_filings(zip_code);

export default {
  /**
   * HTTP handler — serves the API for the frontend dashboard
   */
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const corsHeaders = {
      'Access-Control-Allow-Origin': env.CORS_ORIGIN,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      switch (url.pathname) {
        case '/api/evictions/summary':
          return jsonResponse(await getSummary(env.DB), corsHeaders);

        case '/api/evictions/by-neighborhood':
          return jsonResponse(await getByNeighborhood(env.DB), corsHeaders);

        case '/api/evictions/by-landlord':
          return jsonResponse(await getByLandlord(env.DB, url.searchParams), corsHeaders);

        case '/api/evictions/trend':
          return jsonResponse(await getTrend(env.DB, url.searchParams), corsHeaders);

        case '/api/evictions/recent':
          return jsonResponse(await getRecent(env.DB, url.searchParams), corsHeaders);

        default:
          return jsonResponse({ error: 'Not found' }, corsHeaders, 404);
      }
    } catch (err) {
      console.error('API error:', err);
      return jsonResponse({ error: 'Internal server error' }, corsHeaders, 500);
    }
  },

  /**
   * Cron handler — scrapes court records daily
   */
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    console.log('Starting daily eviction scrape...');

    try {
      // TODO: Implement actual scraping logic
      // Denver County Court records are available at:
      // https://www.denvercountycourt.org/search/
      //
      // Strategy:
      // 1. Fetch the search page for FED (Forcible Entry and Detainer) cases
      // 2. Filter by date range (yesterday to today)
      // 3. Parse case details: case number, parties, address, filing type
      // 4. Geocode addresses to neighborhoods using Denver Open Data API
      // 5. Upsert into D1 database
      //
      // IMPORTANT: Respect rate limits, add delays between requests
      // Consider using Denver Open Data API if available:
      // https://www.denvergov.org/opendata
      //
      // Alternative data sources:
      // - Colorado Judicial Branch case search
      // - PACER for federal cases
      // - Denver county clerk records

      const filings = await scrapeFilings();

      for (const filing of filings) {
        await env.DB.prepare(`
          INSERT OR IGNORE INTO eviction_filings
            (case_number, filing_date, plaintiff, plaintiff_attorney,
             defendant, address, neighborhood, zip_code, filing_type,
             amount_claimed)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          filing.caseNumber,
          filing.filingDate,
          filing.plaintiff,
          filing.plaintiffAttorney,
          filing.defendant,
          filing.address,
          filing.neighborhood,
          filing.zipCode,
          filing.filingType,
          filing.amountClaimed,
        ).run();
      }

      console.log(`Scraped and stored ${filings.length} new filings`);
    } catch (err) {
      console.error('Scrape error:', err);
    }
  },
};

// --- Scraping (stub) ---

interface EvictionFiling {
  caseNumber: string;
  filingDate: string;
  plaintiff: string;
  plaintiffAttorney: string | null;
  defendant: string;
  address: string | null;
  neighborhood: string | null;
  zipCode: string | null;
  filingType: string;
  amountClaimed: number | null;
}

async function scrapeFilings(): Promise<EvictionFiling[]> {
  // TODO: Implement actual scraping
  // This is the main engineering task for this worker
  //
  // Approach options:
  // 1. Direct HTTP scraping of court website (fragile but free)
  // 2. Denver Open Data API (if eviction data is published)
  // 3. Colorado Judicial Branch API (if available)
  // 4. FOIA/CORA request for bulk data export (best for historical)
  //
  // For MVP: Start with a CORA request for historical data,
  // then build daily scraping for new filings
  return [];
}

// --- API Handlers ---

async function getSummary(db: D1Database) {
  const total = await db.prepare(
    'SELECT COUNT(*) as count FROM eviction_filings'
  ).first();

  const thisMonth = await db.prepare(`
    SELECT COUNT(*) as count FROM eviction_filings
    WHERE filing_date >= date('now', 'start of month')
  `).first();

  const topLandlord = await db.prepare(`
    SELECT plaintiff, COUNT(*) as count FROM eviction_filings
    GROUP BY plaintiff ORDER BY count DESC LIMIT 1
  `).first();

  return {
    totalFilings: total?.count ?? 0,
    thisMonth: thisMonth?.count ?? 0,
    topFiler: topLandlord?.plaintiff ?? 'N/A',
    topFilerCount: topLandlord?.count ?? 0,
  };
}

async function getByNeighborhood(db: D1Database) {
  const results = await db.prepare(`
    SELECT neighborhood, COUNT(*) as count
    FROM eviction_filings
    WHERE neighborhood IS NOT NULL
    GROUP BY neighborhood
    ORDER BY count DESC
  `).all();

  return results.results;
}

async function getByLandlord(db: D1Database, params: URLSearchParams) {
  const limit = Math.min(parseInt(params.get('limit') ?? '20'), 100);

  const results = await db.prepare(`
    SELECT plaintiff as landlord, COUNT(*) as filings,
           MIN(filing_date) as first_filing,
           MAX(filing_date) as last_filing
    FROM eviction_filings
    GROUP BY plaintiff
    ORDER BY filings DESC
    LIMIT ?
  `).bind(limit).all();

  return results.results;
}

async function getTrend(db: D1Database, params: URLSearchParams) {
  const months = Math.min(parseInt(params.get('months') ?? '12'), 60);

  const results = await db.prepare(`
    SELECT
      strftime('%Y-%m', filing_date) as month,
      COUNT(*) as filings
    FROM eviction_filings
    WHERE filing_date >= date('now', '-' || ? || ' months')
    GROUP BY month
    ORDER BY month ASC
  `).bind(months).all();

  return results.results;
}

async function getRecent(db: D1Database, params: URLSearchParams) {
  const limit = Math.min(parseInt(params.get('limit') ?? '50'), 200);

  const results = await db.prepare(`
    SELECT case_number, filing_date, plaintiff, neighborhood,
           zip_code, filing_type, disposition
    FROM eviction_filings
    ORDER BY filing_date DESC
    LIMIT ?
  `).bind(limit).all();

  return results.results;
}

// --- Utilities ---

function jsonResponse(data: unknown, corsHeaders: Record<string, string>, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}
