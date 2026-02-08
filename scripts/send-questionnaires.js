#!/usr/bin/env node
/**
 * send-questionnaires.js
 *
 * Sends the Denver For All candidate questionnaire to council candidates.
 * Supports three sending modes:
 *   1. Resend API (info@denverforall.org) — requires RESEND_API_KEY env var
 *   2. mailto: links — opens your email client with pre-filled messages
 *   3. Dry run — prints the email text for manual copy/paste
 *
 * Usage:
 *   node scripts/send-questionnaires.js --dry-run          # Print emails to console
 *   node scripts/send-questionnaires.js --mailto            # Open mailto: links
 *   RESEND_API_KEY=re_xxx node scripts/send-questionnaires.js --resend  # Send via Resend API
 *
 *   node scripts/send-questionnaires.js --candidate "Paul Pazen"  # Single candidate
 *   node scripts/send-questionnaires.js --dry-run --all           # All not-yet-contacted
 */

// ============================================================
// CANDIDATE DATA — update emails as you find them
// ============================================================
const candidates = [
  // District 2 — Southwest Denver
  { name: 'Paul Pazen', district: 2, email: '', status: 'not-contacted' },
  { name: 'Tran Nguyen-Wills', district: 2, email: '', status: 'not-contacted' },
  { name: 'Antonio Martinez', district: 2, email: '', status: 'not-contacted' },
  // District 3 — Northwest Denver
  { name: 'Mark Montoya', district: 3, email: '', status: 'not-contacted' },
  { name: 'Matt Walter', district: 3, email: '', status: 'not-contacted' },
  { name: 'Shannon Callahan', district: 3, email: '', status: 'sent', note: 'Sent via contact form' },
  // District 4 — Northeast Denver
  { name: 'Flor Alvidrez', district: 4, email: '', status: 'not-contacted' },
  { name: 'William Fenton II', district: 4, email: '', status: 'not-contacted' },
  // District 8 — Northeast / Montbello
  { name: 'Shontel Lewis', district: 8, email: '', status: 'not-contacted' },
  { name: 'Teddy McCullough', district: 8, email: '', status: 'not-contacted' },
  // District 9 — Southeast Denver
  { name: 'Hamilton Nickoloff', district: 9, email: '', status: 'not-contacted' },
  { name: 'Darrell Watson', district: 9, email: '', status: 'not-contacted' },
  // District 10 — Central Denver
  { name: 'Chris Hinds', district: 10, email: '', status: 'not-contacted' },
  { name: 'Sean Staggs', district: 10, email: '', status: 'not-contacted' },
  // District 11 — Far Northeast Denver
  { name: 'Kayla Greathouse', district: 11, email: '', status: 'not-contacted' },
  { name: 'Brande Micheau', district: 11, email: '', status: 'not-contacted' },
  // District 12 — Capitol Hill / Cheesman
  { name: 'Serena Gonzales Gutierrez', district: 12, email: '', status: 'not-contacted' },
  { name: 'Michael Harding', district: 12, email: '', status: 'not-contacted' },
  // At-Large
  { name: 'Sarah Parady', district: 'At-Large', email: '', status: 'not-contacted' },
];

// ============================================================
// QUESTIONNAIRE EMAIL
// ============================================================
function buildEmail(candidate) {
  const subject = `Denver For All — 2027 Candidate Questionnaire (District ${candidate.district})`;

  const body = `Dear ${candidate.name},

My name is [YOUR NAME], and I'm a volunteer with Denver For All (denverforall.org), a grassroots civic research project that produces evidence-based policy proposals and free civic tools for Denver residents.

Ahead of the April 2027 election, we're sending every candidate for Denver City Council the same 10-question survey. We will publish all responses — unedited and in full — alongside your public record on our Candidate Tracker (denverforall.org/tools/candidate-tracker).

Candidates who don't respond will be listed as "No Response" with their public record only. We believe Denver voters deserve to know where every candidate stands on the issues below.

Please reply to this email with your answers. There is no word limit — say as much or as little as you like on each question. We will publish your exact words with zero editorial changes.

— — — — — — — — — —

THE 10 QUESTIONS

1. RENT STABILIZATION
Colorado currently preempts cities from enacting rent control. Do you support Denver passing rent stabilization if the state enables it? What annual cap on rent increases would you support? If the state does not act, what specific steps would you take at the city level to protect tenants from displacement?

2. HOMELESSNESS & ENCAMPMENT POLICY
Denver City Council passed a moratorium on encampment sweeps during freezing temperatures; Mayor Johnston vetoed it. Would you vote to override that veto? Do you support a housing-first approach over enforcement-based sweeps? What is your plan for reducing unsheltered homelessness in your district?

3. STAR & LEAD EXPANSION
Denver's STAR program sends mental health professionals instead of police to crisis calls (10,000+ calls, zero incidents requiring police backup). The LEAD program diverts people facing low-level charges to case management instead of arrest (Seattle evaluation: 58% lower recidivism). Do you support expanding both programs to 24/7 citywide coverage? Should community members be able to make LEAD referrals directly, without requiring police contact?

4. POLICE BUDGET REALLOCATION
Denver For All proposes a phased reallocation of the police budget: Phase 1 (~8% / $25M) expands STAR and LEAD citywide; Phase 2 (~15% / $45M) adds violence intervention and substance treatment; Phase 3 (~25% / $75M) adds youth services, restorative justice, and housing. Each phase evaluated before the next begins. What level of reallocation do you support? Where would you direct the funds?

5. LIVING WAGE
Denver's minimum wage is $18.81/hour. A single adult with one child needs $27.35/hour to meet basic expenses in Denver (MIT Living Wage Calculator). Do you support raising Denver's minimum wage to $25/hour, indexed to cost of living? Do you support eliminating the tipped worker subminimum wage (One Fair Wage)?

6. MUNICIPAL BROADBAND
Denver voters approved municipal broadband in 2020, but the city has not built it. Meanwhile, Comcast and CenturyLink charge some of the highest internet prices in the country, and 15% of Denver households lack broadband access. Do you support Denver building city-owned fiber internet infrastructure? What timeline would you push for?

7. DISABILITY RIGHTS & INCLUSION
Over 70,000 Denver residents live with a disability. People with disabilities make up a third to half of all people killed by police nationally. Less than 5% of Denver's housing stock is wheelchair accessible. The Commission for People with Disabilities is advisory-only with no enforcement power. What specific commitments would you make for disabled constituents? Do you support elevating the Commission from advisory to enforcement authority?

8. FLOCK CAMERAS & SURVEILLANCE
Denver City Council voted 12-0 to reject the Flock ALPR camera contract. Mayor Johnston bypassed the vote by structuring a contract just under the $500K council approval threshold. Audit logs revealed ICE searched Denver's camera data 1,400+ times. Do you support the mayor's authority to override council on surveillance contracts? Should council approval be required before any surveillance technology is deployed?

9. PARTICIPATORY BUDGETING
Cities like Paris, New York, and Porto Alegre let residents directly decide how to spend portions of the public budget. Denver has no participatory budgeting program. Should Denver residents directly decide how to spend a portion of the city budget? What dollar amount would you allocate to resident-directed spending?

10. YOUR DISTRICT'S TOP PRIORITY
What is the single most important issue facing your district, and what specific policy would you propose to address it? Be specific: name the problem, name the solution, name how you'd pay for it.

— — — — — — — — — —

ABOUT THIS PROCESS

- Your responses will be published in full, unedited, at denverforall.org/tools/candidate-tracker
- All candidates receive the same questions
- There is no word limit
- Non-response will be noted publicly
- You may update your responses at any time before the election

We appreciate your time and your willingness to engage with Denver voters on the issues that matter most.

Denver For All
denverforall.org
info@denverforall.org`;

  return { subject, body };
}

// ============================================================
// SENDING MODES
// ============================================================

async function sendViaResend(candidate, apiKey) {
  const { subject, body } = buildEmail(candidate);
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Denver For All <info@denverforall.org>',
      to: [candidate.email],
      subject,
      text: body,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Resend error for ${candidate.name}: ${JSON.stringify(data)}`);
  }
  return data;
}

function openMailto(candidate) {
  const { subject, body } = buildEmail(candidate);
  const mailto = `mailto:${candidate.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  console.log(`\n📧 ${candidate.name} (District ${candidate.district})`);
  console.log(`   Open this link in your browser:\n   ${mailto}\n`);
  return mailto;
}

function dryRun(candidate) {
  const { subject, body } = buildEmail(candidate);
  console.log('═'.repeat(70));
  console.log(`TO: ${candidate.email || '[EMAIL NEEDED]'}`);
  console.log(`SUBJECT: ${subject}`);
  console.log('═'.repeat(70));
  console.log(body);
  console.log('\n');
}

// ============================================================
// CLI
// ============================================================
const args = process.argv.slice(2);
const mode = args.includes('--resend') ? 'resend'
  : args.includes('--mailto') ? 'mailto'
  : 'dry-run';

const candidateFilter = args.includes('--candidate')
  ? args[args.indexOf('--candidate') + 1]
  : null;

const sendAll = args.includes('--all');

let targets = candidates;

if (candidateFilter) {
  targets = candidates.filter(c =>
    c.name.toLowerCase().includes(candidateFilter.toLowerCase())
  );
  if (targets.length === 0) {
    console.error(`No candidate found matching "${candidateFilter}"`);
    process.exit(1);
  }
} else if (sendAll) {
  targets = candidates.filter(c => c.status === 'not-contacted');
} else if (!candidateFilter && !sendAll) {
  // Default: show status summary
  console.log('\nCandidate Questionnaire Status\n');
  console.log('District | Candidate                       | Status          | Email');
  console.log('---------|-------------------------------|-----------------|------');
  for (const c of candidates) {
    const dist = String(c.district).padEnd(8);
    const name = c.name.padEnd(32);
    const status = c.status.padEnd(16);
    const email = c.email || '[NEED EMAIL]';
    console.log(`${dist}| ${name}| ${status}| ${email}`);
  }
  console.log(`\nTotal: ${candidates.length} candidates`);
  console.log(`Sent: ${candidates.filter(c => c.status === 'sent').length}`);
  console.log(`Not contacted: ${candidates.filter(c => c.status === 'not-contacted').length}`);
  console.log(`\nUsage:`);
  console.log(`  node scripts/send-questionnaires.js --dry-run --all           # Preview all unsent emails`);
  console.log(`  node scripts/send-questionnaires.js --dry-run --candidate "Paul Pazen"  # Preview one`);
  console.log(`  node scripts/send-questionnaires.js --mailto --candidate "Paul Pazen"   # Open in email client`);
  console.log(`  RESEND_API_KEY=re_xxx node scripts/send-questionnaires.js --resend --all # Send via Resend\n`);
  process.exit(0);
}

console.log(`\nMode: ${mode}`);
console.log(`Targets: ${targets.length} candidate(s)\n`);

for (const candidate of targets) {
  if (mode === 'resend') {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY environment variable required for --resend mode');
      process.exit(1);
    }
    if (!candidate.email) {
      console.log(`⚠️  Skipping ${candidate.name} — no email address`);
      continue;
    }
    try {
      const result = await sendViaResend(candidate, apiKey);
      console.log(`✅ Sent to ${candidate.name} (${candidate.email}) — ID: ${result.id}`);
    } catch (err) {
      console.error(`❌ Failed: ${err.message}`);
    }
  } else if (mode === 'mailto') {
    if (!candidate.email) {
      console.log(`⚠️  Skipping ${candidate.name} — no email address`);
      continue;
    }
    openMailto(candidate);
  } else {
    dryRun(candidate);
  }
}
