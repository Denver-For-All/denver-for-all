/**
 * Denver Campaign Finance & Money in Politics Data
 * Sources: Colorado Sun, Denverite, Denver Post, Colorado Newsline,
 * Denver Gazette, Chalkbeat, Axios Denver, SearchLight Denver,
 * Colorado TRACER (tracer.sos.colorado.gov), Denver Clerk & Recorder
 *
 * Last updated: 2026-02-08 with contribution data through January 2026
 */

export const outsideSpending = [
  { year: '2019', amount: 1.0, label: '<$1M' },
  { year: '2023', amount: 4.8, label: '$4.8M' },
  { year: '2025 (School Board)', amount: 2.4, label: '$2.4M' },
  { year: '2025 (Ballot)', amount: 8.5, label: '$8.5M' },
];

export const mayoralPACs2023 = [
  {
    name: 'Advancing Denver',
    candidate: 'Mike Johnston',
    spent: 2300000,
    topDonors: [
      { name: 'Reid Hoffman (LinkedIn)', amount: 905000 },
      { name: 'Michael Bloomberg', amount: 500000 },
    ],
  },
  {
    name: 'A Better Denver',
    candidate: 'Kelly Brough',
    spent: 1400000,
    topDonors: [
      { name: 'National Assoc. of Realtors', amount: 150000 },
      { name: 'Real estate / development', amount: 578000 },
    ],
  },
];

export const totalRaised2023 = {
  candidateFundraising: 6600000,
  candidateSpending: 5700000,
  outsideSpendingMayoral: 3600000,
  outsideSpendingTotal: 4800000,
  fefDisbursed: 7700000,
  fefCandidates: 47,
};

export const councilVotes = [
  {
    name: 'Flock Surveillance Renewal',
    nameEs: 'Renovaci\u00f3n de Vigilancia Flock',
    vote: '12-0',
    result: 'Rejected',
    resultEs: 'Rechazado',
    mayorAction: 'Bypassed with smaller contract',
    mayorActionEs: 'Evadido con contrato menor',
    position: 'good',
    tags: ['Public Safety', 'Democracy'],
  },
  {
    name: 'Encampment Sweep Moratorium',
    nameEs: 'Moratoria de Barridos de Campamentos',
    vote: '7-6',
    result: 'Passed, then vetoed',
    resultEs: 'Aprobado, luego vetado',
    mayorAction: 'Vetoed (needed 9 to override)',
    mayorActionEs: 'Vetado (necesitaba 9 para anular)',
    position: 'vetoed',
    tags: ['Housing', 'Public Safety'],
  },
  {
    name: 'Fair Elections Fund Reforms',
    nameEs: 'Reformas del Fondo de Elecciones Justas',
    vote: 'Unanimous',
    result: 'Passed',
    resultEs: 'Aprobado',
    mayorAction: 'Signed',
    mayorActionEs: 'Firmado',
    position: 'good',
    tags: ['Democracy'],
  },
  {
    name: 'ShotSpotter Renewal ($4.7M)',
    nameEs: 'Renovaci\u00f3n de ShotSpotter ($4.7M)',
    vote: '10-1',
    result: 'Passed',
    resultEs: 'Aprobado',
    mayorAction: 'Signed',
    mayorActionEs: 'Firmado',
    position: 'bad',
    tags: ['Public Safety'],
  },
];

export const schoolBoard2025 = {
  totalSpending: 2400000,
  proCharter: {
    name: 'Better Leaders, Stronger Schools',
    amount: 1500000,
    result: 'All 4 candidates lost',
    resultEs: 'Los 4 candidatos perdieron',
  },
  proUnion: {
    name: 'Students Deserve Better',
    amount: 286500,
    result: 'All 4 candidates won',
    resultEs: 'Los 4 candidatos ganaron',
  },
  spendingRatio: 5,
};

export const fefRules2027 = {
  matchRatio: '9:1',
  matchThreshold: 50,
  fefContributionLimit: 500,
  nonFefContributionLimit: 1190,
  mayoralQualification: 250,
  councilQualification: 100,
  anonymousDonations: 'Banned',
  perCapitaFunding: 3.45,
};

export const budgetVotes = [
  { name: 'Cut police budget $3.2M', vote: '3-10', result: 'Failed', position: 'bad' },
  { name: 'Move Encampment Team to HOST', vote: '5-8', result: 'Failed', position: 'bad' },
  { name: '$2.5M for Basic Income Project', vote: '6-6', result: 'Failed (tie)', position: 'bad' },
  {
    name: 'Reallocate $286K to Sheriff Mental Health',
    vote: '7-6',
    result: 'Passed',
    position: 'good',
  },
];

export const realEstateMoney = {
  aBetterDenverRealEstate: 578000,
  narDonation: 150000,
  vibrantDenverRaised: 1800000,
  mizelDonation: 65000,
};

/**
 * 2025 Denver Ballot Measure Spending
 * Source: Colorado TRACER & Denver Clerk filings, Nov 2024 - Jan 2026
 */
export const ballotMeasures2025 = {
  /** Vibrant Denver Bond (Issues 2A-2E) — Infrastructure bond */
  vibrantDenverBond: {
    name: 'Vibrant Denver Bond',
    issues: '2A, 2B, 2C, 2D, 2E',
    totalRaised: 1800000,
    topDonors: [
      { name: 'Kent Thiry', amount: 100000, type: 'individual' },
      { name: 'Gary Advocacy LLC', amount: 75000, type: 'corporate' },
      { name: 'Jacobs Engineering', amount: 75000, type: 'corporate' },
      { name: 'Associated General Contractors', amount: 120500, type: 'corporate' },
      { name: 'Larry Mizel', amount: 65000, type: 'individual' },
      { name: 'HNTB Corporation', amount: 50000, type: 'corporate' },
      { name: 'Denver Museum/Zoo/Botanic/DCPA/DAM', amount: 250000, type: 'nonprofit' },
      { name: 'Visit Denver', amount: 50000, type: 'corporate' },
      { name: 'SEMA Construction', amount: 40000, type: 'corporate' },
      { name: 'AEG Presents', amount: 40000, type: 'corporate' },
    ],
    corporatePercent: 85,
    individualPercent: 15,
  },

  /** Denver Kids vs Big Tobacco (opposing Referendum 310) */
  kidsVsBigTobacco: {
    name: 'Denver Kids vs Big Tobacco',
    issue: 'Referendum 310',
    side: 'anti-tobacco',
    totalRaised: 5700000,
    totalInKind: 710000,
    topDonors: [
      { name: 'Michael Bloomberg', amount: 4850000, type: 'individual' },
      { name: 'Tobacco-Free Kids Action Fund', amount: 710000, type: 'pac', inKind: true },
      { name: 'Kaiser Permanente', amount: 50000, type: 'corporate' },
      { name: 'American Heart Association', amount: 30000, type: 'nonprofit' },
      { name: 'ACS Cancer Action', amount: 30000, type: 'nonprofit' },
    ],
    bloombergPercent: 85,
  },

  /** Citizen Power! (supporting Referendum 310 — pro-tobacco/vaping) */
  citizenPower: {
    name: 'Citizen Power!',
    issue: 'Referendum 310',
    side: 'pro-tobacco',
    totalRaised: 370000,
    totalInKind: 295000,
    topDonors: [
      { name: 'Altria Client Services', amount: 75000, type: 'corporate' },
      { name: 'Philip Morris International', amount: 75000, type: 'corporate', inKind: true },
      { name: 'Rocky Mountain Smoke Free Alliance', amount: 172000, type: 'pac', inKind: true },
      { name: 'National Assoc. of Tobacco Outlets', amount: 50000, type: 'pac' },
      { name: 'Streamline Group', amount: 35000, type: 'corporate' },
      { name: 'The Cigarette Store LLC', amount: 30000, type: 'corporate' },
      { name: 'Swisher International', amount: 30000, type: 'corporate' },
    ],
    tobaccoIndustryPercent: 90,
  },

  /** Majority Vote Denver (pro Measure 2G — election reform) */
  majorityVoteDenver: {
    name: 'Majority Vote Denver',
    issue: 'Referred Measure 2G',
    side: 'pro',
    totalRaised: 209000,
    topDonors: [
      { name: 'Forward Denver', amount: 103000, type: 'pac' },
      { name: 'Safe Streets Safe Communities', amount: 76000, type: 'pac' },
      { name: 'R. Stanton Dodge', amount: 25000, type: 'individual' },
    ],
  },

  /** Hands Off Denver Elections (opposing Measure 2G) */
  handsOffDenverElections: {
    name: 'Hands Off Denver Elections',
    issue: 'Referred Measure 2G',
    side: 'anti',
    totalRaised: 7500,
    totalInKind: 19500,
    topDonors: [
      { name: 'Working Families Power', amount: 19500, type: 'pac', inKind: true },
      { name: 'AFSCME', amount: 2000, type: 'labor' },
      { name: 'Denver Classroom Teachers Assoc.', amount: 2000, type: 'labor' },
      { name: 'Conservation Colorado', amount: 2000, type: 'nonprofit' },
      { name: 'Communications Workers of America', amount: 1500, type: 'labor' },
    ],
  },

  /** Referendum 310 total battle — tobacco war summary */
  ref310Summary: {
    antiTobaccoTotal: 6400000,
    proTobaccoTotal: 665000,
    spendingRatio: 10,
    bloombergShare: 4850000,
  },
};

/**
 * 2025 Pro-Animal Colorado — Foie Gras Ban Initiative
 * Source: Colorado TRACER, through January 2026
 */
export const foieGrasBan2025 = {
  committee: 'Pro-Animal Colorado',
  issue: 'Proposed 2026 Initiated Ordinance: Foie Gras Ban',
  totalRaised: 62000,
  contributionCount: 450,
  uniqueDonors: 180,
  avgContribution: 55,
  medianContribution: 26,
  topDonors: [
    { name: 'Max Thomas', amount: 10800 },
    { name: 'CARA THORSEN', amount: 5521 },
    { name: 'Vivek Ravi', amount: 5000 },
    { name: 'The Wizard (Airbnb)', amount: 5000 },
    { name: 'Justin Clark', amount: 3153 },
    { name: 'Megan McVeigh (Jeffrey McVeigh)', amount: 3700 },
    { name: 'Max Blair', amount: 2516 },
  ],
  outOfStatePercent: 75,
  coloradoPercent: 25,
  grassrootsFunded: true,
};

/**
 * Early 2027 Election Cycle — Council & Mayoral Race Fundraising
 * Source: Colorado TRACER & Denver Clerk filings, through January 2026
 */
export const earlyFundraising2027 = [
  {
    committee: 'Tran for Two',
    candidate: 'Tran',
    office: 'City Council',
    district: '2',
    totalRaised: 8500,
    fefTotal: 5200,
    fefContributions: 48,
    uniqueDonors: 72,
    avgContribution: 85,
    topIssue: 'Strong FEF participation',
  },
  {
    committee: 'Chris for Denver 2027',
    candidate: 'Chris',
    office: 'City Council',
    district: '10',
    totalRaised: 7800,
    fefTotal: 5600,
    fefContributions: 55,
    uniqueDonors: 68,
    avgContribution: 78,
    topIssue: 'Strong FEF participation',
  },
  {
    committee: 'Callahan for Council',
    candidate: 'Callahan',
    office: 'City Council',
    district: '6',
    totalRaised: 625,
    fefTotal: 0,
    fefContributions: 0,
    uniqueDonors: 6,
    avgContribution: 104,
    topIssue: 'Early stage',
  },
  {
    committee: 'Sarah Parady for Denver',
    candidate: 'Sarah Parady',
    office: 'City Council At-Large Seat B',
    district: 'At-Large B',
    totalRaised: 2045,
    fefTotal: 0,
    fefContributions: 0,
    uniqueDonors: 15,
    avgContribution: 136,
    topIssue: 'At-large race',
  },
  {
    committee: 'Aurelio Martinez for Denver Mayor',
    candidate: 'Aurelio Martinez',
    office: 'Mayor',
    district: null,
    totalRaised: 1079,
    fefTotal: 560,
    fefContributions: 8,
    uniqueDonors: 14,
    avgContribution: 77,
    topIssue: 'Grassroots mayoral challenge',
  },
];
