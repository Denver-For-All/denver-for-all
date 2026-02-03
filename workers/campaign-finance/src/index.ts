/**
 * Denver Campaign Finance Tracker — Cloudflare Worker
 *
 * Scrapes Denver campaign finance filings weekly, normalizes contributor data,
 * categorizes donors (developer, landlord, PAC, corporate, individual),
 * and serves an API for the frontend visualization.
 *
 * Data sources:
 * - Denver Campaign Finance: https://www.denvergov.org/Government/Agencies-Departments-Offices/Clerk-Recorder/Elections-Voting/Campaign-Finance
 * - Colorado TRACER (Transparency in Contribution and Expenditure Reporting):
 *   https://tracer.sos.colorado.gov/
 * - Denver Open Data: https://www.denvergov.org/opendata
 *
 * D1 Database setup:
 *   wrangler d1 create campaign-finance
 *   wrangler d1 execute campaign-finance --file=./schema.sql
 */

export interface Env {
  DB: D1Database;
  CORS_ORIGIN: string;
}

export default {
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
        case '/api/finance/candidates':
          return jsonResponse(await getCandidates(env.DB), corsHeaders);

        case '/api/finance/candidate':
          return jsonResponse(
            await getCandidateDetail(env.DB, url.searchParams),
            corsHeaders,
          );

        case '/api/finance/top-donors':
          return jsonResponse(
            await getTopDonors(env.DB, url.searchParams),
            corsHeaders,
          );

        case '/api/finance/donor-types':
          return jsonResponse(
            await getDonorTypeBreakdown(env.DB, url.searchParams),
            corsHeaders,
          );

        case '/api/finance/scorecard':
          return jsonResponse(await getScorecard(env.DB), corsHeaders);

        default:
          return jsonResponse({ error: 'Not found' }, corsHeaders, 404);
      }
    } catch (err) {
      console.error('API error:', err);
      return jsonResponse({ error: 'Internal server error' }, corsHeaders, 500);
    }
  },

  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    console.log('Starting weekly campaign finance scrape...');

    try {
      // TODO: Implement scraping from Colorado TRACER system
      //
      // TRACER provides bulk data exports:
      // https://tracer.sos.colorado.gov/PublicSite/SearchPages/DataDownload.aspx
      //
      // Strategy:
      // 1. Download contribution data for Denver municipal candidates
      // 2. Parse and normalize contributor names and addresses
      // 3. Categorize contributors:
      //    - Cross-reference with Denver business licenses (developers, property mgmt)
      //    - Identify PACs and their parent organizations
      //    - Flag real estate industry donors
      //    - Identify corporate vs individual contributors
      // 4. Upsert into D1 database
      //
      // For Denver city elections specifically:
      // - Denver Clerk & Recorder maintains local campaign finance records
      // - May need CORA request for bulk historical data
      // - TRACER has state-level data that includes Denver municipal races

      const contributions = await scrapeContributions();

      for (const contrib of contributions) {
        await env.DB.prepare(`
          INSERT OR IGNORE INTO contributions
            (filing_id, candidate_name, candidate_office, candidate_district,
             contributor_name, contributor_address, contributor_type,
             contributor_category, amount, contribution_date, election_cycle)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          contrib.filingId,
          contrib.candidateName,
          contrib.candidateOffice,
          contrib.candidateDistrict,
          contrib.contributorName,
          contrib.contributorAddress,
          contrib.contributorType,
          contrib.contributorCategory,
          contrib.amount,
          contrib.contributionDate,
          contrib.electionCycle,
        ).run();
      }

      console.log(`Processed ${contributions.length} contributions`);
    } catch (err) {
      console.error('Scrape error:', err);
    }
  },
};

// --- Types ---

interface Contribution {
  filingId: string;
  candidateName: string;
  candidateOffice: string;
  candidateDistrict: string | null;
  contributorName: string;
  contributorAddress: string | null;
  contributorType: 'individual' | 'pac' | 'corporate' | 'party' | 'other';
  contributorCategory: 'developer' | 'landlord' | 'real_estate' | 'labor' | 'small_donor' | 'corporate' | 'pac' | 'other';
  amount: number;
  contributionDate: string;
  electionCycle: string;
}

async function scrapeContributions(): Promise<Contribution[]> {
  // TODO: Implement actual scraping from TRACER and Denver Clerk
  return [];
}

// --- API Handlers ---

async function getCandidates(db: D1Database) {
  const results = await db.prepare(`
    SELECT
      candidate_name,
      candidate_office,
      candidate_district,
      COUNT(*) as total_contributions,
      SUM(amount) as total_raised,
      AVG(amount) as avg_contribution,
      COUNT(CASE WHEN amount <= 50 THEN 1 END) as small_donor_count,
      SUM(CASE WHEN contributor_category = 'developer' THEN amount ELSE 0 END) as developer_money,
      SUM(CASE WHEN contributor_category = 'landlord' THEN amount ELSE 0 END) as landlord_money,
      SUM(CASE WHEN contributor_category = 'real_estate' THEN amount ELSE 0 END) as real_estate_money
    FROM contributions
    GROUP BY candidate_name, candidate_office, candidate_district
    ORDER BY total_raised DESC
  `).all();

  return results.results;
}

async function getCandidateDetail(db: D1Database, params: URLSearchParams) {
  const name = params.get('name');
  if (!name) return { error: 'name parameter required' };

  const summary = await db.prepare(`
    SELECT
      candidate_name,
      candidate_office,
      COUNT(*) as total_contributions,
      SUM(amount) as total_raised,
      AVG(amount) as avg_contribution
    FROM contributions
    WHERE candidate_name = ?
    GROUP BY candidate_name
  `).bind(name).first();

  const byCategory = await db.prepare(`
    SELECT contributor_category, SUM(amount) as total, COUNT(*) as count
    FROM contributions
    WHERE candidate_name = ?
    GROUP BY contributor_category
    ORDER BY total DESC
  `).bind(name).all();

  const topDonors = await db.prepare(`
    SELECT contributor_name, SUM(amount) as total, contributor_category
    FROM contributions
    WHERE candidate_name = ?
    GROUP BY contributor_name
    ORDER BY total DESC
    LIMIT 20
  `).bind(name).all();

  return {
    summary,
    byCategory: byCategory.results,
    topDonors: topDonors.results,
  };
}

async function getTopDonors(db: D1Database, params: URLSearchParams) {
  const category = params.get('category');
  const limit = Math.min(parseInt(params.get('limit') ?? '20'), 100);

  let query = `
    SELECT contributor_name, contributor_category,
           SUM(amount) as total_given,
           COUNT(DISTINCT candidate_name) as candidates_funded,
           GROUP_CONCAT(DISTINCT candidate_name) as candidates
    FROM contributions
  `;

  if (category) {
    query += ` WHERE contributor_category = ?`;
  }

  query += ` GROUP BY contributor_name ORDER BY total_given DESC LIMIT ?`;

  const stmt = category
    ? db.prepare(query).bind(category, limit)
    : db.prepare(query).bind(limit);

  const results = await stmt.all();
  return results.results;
}

async function getDonorTypeBreakdown(db: D1Database, params: URLSearchParams) {
  const candidate = params.get('candidate');

  let query = `
    SELECT contributor_category,
           SUM(amount) as total,
           COUNT(*) as count,
           ROUND(SUM(amount) * 100.0 / (SELECT SUM(amount) FROM contributions
  `;

  if (candidate) {
    query += ` WHERE candidate_name = ?), 1) as percentage FROM contributions WHERE candidate_name = ?
               GROUP BY contributor_category ORDER BY total DESC`;
    const results = await db.prepare(query).bind(candidate, candidate).all();
    return results.results;
  }

  query += `), 1) as percentage FROM contributions
             GROUP BY contributor_category ORDER BY total DESC`;
  const results = await db.prepare(query).all();
  return results.results;
}

async function getScorecard(db: D1Database) {
  // TODO: Scorecard requires manual data entry of council votes
  // on progressive priorities (housing, labor, climate, etc.)
  // This would be a separate table populated through admin interface
  //
  // For now, return placeholder structure
  return {
    note: 'Scorecard data is being compiled. Check back soon.',
    categories: [
      'Housing & Rent Control',
      'Labor & Wages',
      'Climate & Environment',
      'Immigration & Sanctuary',
      'Public Safety Reform',
      'Education',
    ],
    // councilmembers: [{ name, district, scores: { category: grade } }]
  };
}

function jsonResponse(data: unknown, corsHeaders: Record<string, string>, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}
