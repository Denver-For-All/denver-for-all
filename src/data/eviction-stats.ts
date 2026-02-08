/**
 * Denver Eviction Data
 * Sources: Denver County Court, Denverite, Denver7, 9News, Princeton Eviction Lab,
 * Colorado Judicial Branch (SB24-064), Enterprise Community Partners
 */

export const annualFilings = [
  { year: '2016', filings: 8000 },
  { year: '2017', filings: 8999 },
  { year: '2018', filings: 8999 },
  { year: '2019', filings: 9261 },
  { year: '2020', filings: 3910 },
  { year: '2021', filings: 4879 },
  { year: '2022', filings: 8863 },
  { year: '2023', filings: 12910 },
  { year: '2024', filings: 15960 },
  { year: '2025', filings: 15953 },
];

export const prePandemicAvg = 8999;

export const topNeighborhoods = [
  { name: 'Green Valley Ranch', zip: '80249', filings: 2100, note: 'largest share of any zip' },
  { name: 'West Colfax / Sun Valley', zip: '80204', filings: null, note: 'top 3 in July 2025' },
  { name: 'Montbello', zip: '80239', filings: null, note: 'top 5 Jan-Jul 2025' },
  { name: 'Five Points', zip: '80205', filings: null, note: 'top 5 Jan-Jul 2025' },
  { name: 'Hampden', zip: '80231', filings: null, note: 'top 5 Jan-Jul 2025' },
];

export const courtOutcomes = {
  sheriffEnforcement2023: 47,
  sheriffEnforcement2019: 59,
  legalHelpAvoidJudgment: 50,
  householdsWithLegalHelp2024: 3331,
  casesOnBusyDay: 230,
  selfEvictionsPerCase: 2,
};

export const rentalAssistanceBudget = [
  { year: '2024', amount: 31.3, label: '$31.3M' },
  { year: '2025 (initial)', amount: 25.5, label: '$25.5M' },
  { year: '2025 (after cuts)', amount: 16.5, label: '$16.5M' },
  { year: '2026', amount: 12.0, label: '$12.0M' },
];

export const housingContext = {
  medianRent: 2150,
  avgRentMetro: 1754,
  vacancyRate: 7.6,
  renterHouseholds: 52,
  rentBurden: 29.2,
  rentStabilization: 0,
  rentIncreaseSince2010: 85,
  homelessPopulation: 7300,
  fewerHouseholdsServed: 1500,
};

export const legalHelp = {
  contractAmount: 2.8,
  householdsPerYear: 1033,
  period: '2025-2028',
};

export const nationalComparison = {
  citiesTracked: 34,
  citiesDeclined: 29,
  citiesIncreased: 15,
  denvePctAbovePrePandemic: 72,
  filingFeeRange: '$95-$145',
  evictionTimeline: '4-5 weeks',
  peerCities: ['Austin', 'Las Vegas', 'Phoenix'],
};
