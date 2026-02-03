-- Denver Eviction Tracker — D1 Database Schema
-- Run with: wrangler d1 execute eviction-data --file=./schema.sql

CREATE TABLE IF NOT EXISTS eviction_filings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  case_number TEXT UNIQUE NOT NULL,
  filing_date TEXT NOT NULL,
  plaintiff TEXT NOT NULL,
  plaintiff_attorney TEXT,
  defendant TEXT NOT NULL,
  address TEXT,
  neighborhood TEXT,
  zip_code TEXT,
  filing_type TEXT,
  disposition TEXT,
  disposition_date TEXT,
  amount_claimed REAL,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_filing_date ON eviction_filings(filing_date);
CREATE INDEX IF NOT EXISTS idx_plaintiff ON eviction_filings(plaintiff);
CREATE INDEX IF NOT EXISTS idx_neighborhood ON eviction_filings(neighborhood);
CREATE INDEX IF NOT EXISTS idx_zip_code ON eviction_filings(zip_code);
CREATE INDEX IF NOT EXISTS idx_disposition ON eviction_filings(disposition);

-- Aggregation view for dashboard
CREATE VIEW IF NOT EXISTS v_monthly_summary AS
SELECT
  strftime('%Y-%m', filing_date) as month,
  COUNT(*) as total_filings,
  COUNT(DISTINCT plaintiff) as unique_plaintiffs,
  COUNT(DISTINCT neighborhood) as neighborhoods_affected,
  SUM(CASE WHEN disposition = 'judgment_plaintiff' THEN 1 ELSE 0 END) as judgments_for_landlord,
  SUM(CASE WHEN disposition = 'dismissed' THEN 1 ELSE 0 END) as dismissed,
  AVG(amount_claimed) as avg_amount_claimed
FROM eviction_filings
GROUP BY month
ORDER BY month DESC;

-- Top filers view
CREATE VIEW IF NOT EXISTS v_top_filers AS
SELECT
  plaintiff as landlord,
  COUNT(*) as total_filings,
  COUNT(DISTINCT neighborhood) as neighborhoods,
  MIN(filing_date) as first_filing,
  MAX(filing_date) as most_recent,
  ROUND(AVG(amount_claimed), 2) as avg_claim
FROM eviction_filings
GROUP BY plaintiff
ORDER BY total_filings DESC;
