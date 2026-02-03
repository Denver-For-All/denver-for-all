-- Denver Campaign Finance Tracker — D1 Database Schema
-- Run with: wrangler d1 execute campaign-finance --file=./schema.sql

CREATE TABLE IF NOT EXISTS contributions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  filing_id TEXT UNIQUE NOT NULL,
  candidate_name TEXT NOT NULL,
  candidate_office TEXT NOT NULL,
  candidate_district TEXT,
  contributor_name TEXT NOT NULL,
  contributor_address TEXT,
  contributor_type TEXT NOT NULL,       -- individual, pac, corporate, party, other
  contributor_category TEXT NOT NULL,   -- developer, landlord, real_estate, labor, small_donor, corporate, pac, other
  amount REAL NOT NULL,
  contribution_date TEXT NOT NULL,
  election_cycle TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_candidate ON contributions(candidate_name);
CREATE INDEX IF NOT EXISTS idx_contributor ON contributions(contributor_name);
CREATE INDEX IF NOT EXISTS idx_category ON contributions(contributor_category);
CREATE INDEX IF NOT EXISTS idx_date ON contributions(contribution_date);
CREATE INDEX IF NOT EXISTS idx_cycle ON contributions(election_cycle);

-- Voting record for scorecard
CREATE TABLE IF NOT EXISTS council_votes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  councilmember TEXT NOT NULL,
  district TEXT,
  vote_date TEXT NOT NULL,
  item_description TEXT NOT NULL,
  category TEXT NOT NULL,               -- housing, labor, climate, immigration, safety, education
  vote TEXT NOT NULL,                    -- yes, no, abstain, absent
  progressive_position TEXT NOT NULL,   -- yes or no (what the progressive vote would be)
  source_url TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_cm ON council_votes(councilmember);
CREATE INDEX IF NOT EXISTS idx_vote_cat ON council_votes(category);

-- Scorecard view
CREATE VIEW IF NOT EXISTS v_scorecard AS
SELECT
  councilmember,
  district,
  category,
  COUNT(*) as total_votes,
  SUM(CASE WHEN vote = progressive_position THEN 1 ELSE 0 END) as progressive_votes,
  ROUND(
    SUM(CASE WHEN vote = progressive_position THEN 1.0 ELSE 0.0 END) / COUNT(*) * 100,
    0
  ) as progressive_score
FROM council_votes
WHERE vote != 'absent'
GROUP BY councilmember, district, category;
