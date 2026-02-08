/**
 * Denver Campaign Finance & Money in Politics Data
 * Sources: Colorado Sun, Denverite, Denver Post, Colorado Newsline,
 * Denver Gazette, Chalkbeat, Axios Denver, SearchLight Denver
 */

export const outsideSpending = [
  { year: '2019', amount: 1.0, label: '<$1M' },
  { year: '2023', amount: 4.8, label: '$4.8M' },
  { year: '2025 (School Board)', amount: 2.4, label: '$2.4M' },
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
  { name: 'Reallocate $286K to Sheriff Mental Health', vote: '7-6', result: 'Passed', position: 'good' },
];

export const realEstateMoney = {
  aBetterDenverRealEstate: 578000,
  narDonation: 150000,
  vibrantDenverRaised: 1800000,
  mizelDonation: 65000,
};
