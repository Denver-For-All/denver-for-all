/**
 * Data from the Denver Sidewalk Implementation Plan: State of the System Report
 * City and County of Denver — January 22, 2026
 */

export const networkOverview = {
  totalMiles: 3140,
  missingMiles: 318,
  missingPct: 9,
  deficientMiles: 1162,
  deficientPct: 34,
  adequateMiles: 1660,
  adequatePct: 57,
  totalDeficientOrMissing: 1480,
  totalDeficientOrMissingPct: 43,
  blocksNeedingRepair: 1233,
  blocksNeedingRepairPct: 5,
};

export const equityComparison = [
  { metric: 'Missing', metricEs: 'Faltantes', equity: 9, citywide: 9 },
  { metric: 'Deficient Width', metricEs: 'Ancho Deficiente', equity: 37, citywide: 34 },
  { metric: 'Needs Repair', metricEs: 'Necesita Reparación', equity: 4, citywide: 5 },
];

export const equityDetails = {
  missingMiles: 153,
  deficientMiles: 624,
  repairBlocks: 527,
  concentration: 'north and southwest Denver',
};

export const transitStops = [
  { metric: 'Missing Sidewalk', metricEs: 'Acera Faltante', pct: 54 },
  { metric: 'Deficient Width', metricEs: 'Ancho Deficiente', pct: 71 },
  { metric: 'Needs Repair', metricEs: 'Necesita Reparación', pct: 39 },
];

export const dangerousCorridors = [
  { name: 'Sheridan Blvd', pct: 43 },
  { name: 'W. 38th Ave', pct: 55 },
  { name: 'E. Colfax Ave', pct: 64 },
  { name: 'Leetsdale Dr', pct: 66 },
];

export const communityDestinations = [
  { metric: 'Missing Sidewalk', metricEs: 'Acera Faltante', pct: 35 },
  { metric: 'Deficient Width', metricEs: 'Ancho Deficiente', pct: 51 },
  { metric: 'Needs Repair', metricEs: 'Necesita Reparación', pct: 26 },
];

export const destinationExamples = [
  { name: "Presbyterian/St. Luke's Hospital", nameEs: "Hospital Presbyterian/St. Luke's", pct: 7 },
  { name: 'Abraham Lincoln High School', nameEs: 'Escuela Secundaria Abraham Lincoln', pct: 64 },
];

export const highInjuryNetwork = {
  fatalCrashPct: 50,
  streetsPct: 5,
  missingMiles: 16,
  missingPct: 5,
  deficientMiles: 55,
  deficientPct: 17,
  repairBlocks: 230,
  repairPct: 7,
};

export const donutData = [
  { name: 'Missing', nameEs: 'Faltante', value: 318, color: '#C0392B' },
  { name: 'Deficient', nameEs: 'Deficiente', value: 1162, color: '#D4A843' },
  { name: 'Adequate', nameEs: 'Adecuado', value: 1660, color: '#0D7377' },
];
