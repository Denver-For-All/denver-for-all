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
  // District 6 — Southeast Denver
  { name: 'Mark Montoya', district: 6, email: '', status: 'not-contacted' },
  { name: 'Matt Walter', district: 6, email: '', status: 'not-contacted' },
  {
    name: 'Shannon Callahan',
    district: 6,
    email: '',
    status: 'sent',
    note: 'Sent 10-question version via contact form; resend with updated 7-question version',
  },
  // District 7 — West Denver
  { name: 'Flor Alvidrez', district: 7, email: '', status: 'not-contacted' },
  { name: 'William Fenton II', district: 7, email: '', status: 'not-contacted' },
  // District 8 — Northeast Denver
  { name: 'Shontel Lewis', district: 8, email: '', status: 'not-contacted' },
  { name: 'Teddy McCullough', district: 8, email: '', status: 'not-contacted' },
  // District 9 — North Denver
  { name: 'Hamilton Nickoloff', district: 9, email: '', status: 'not-contacted' },
  { name: 'Darrell Watson', district: 9, email: '', status: 'not-contacted' },
  // District 10 — Central Denver
  { name: 'Chris Hinds', district: 10, email: '', status: 'not-contacted' },
  { name: 'Sean Staggs', district: 10, email: '', status: 'not-contacted' },
  // District 11 — Far Northeast Denver
  { name: 'Kayla Greathouse', district: 11, email: '', status: 'not-contacted' },
  { name: 'Brande Micheau', district: 11, email: '', status: 'not-contacted' },
  // At-Large
  { name: 'Serena Gonzales Gutierrez', district: 'At-Large', email: '', status: 'not-contacted' },
  { name: 'Michael Harding', district: 'At-Large', email: '', status: 'not-contacted' },
  // At-Large Seat B
  { name: 'Sarah Parady', district: 'At-Large B', email: '', status: 'not-contacted' },
];

// ============================================================
// QUESTIONNAIRE EMAIL
// ============================================================
function buildEmail(candidate) {
  const subject = `Denver For All — 2027 Candidate Questionnaire (District ${candidate.district})`;

  const body = `Dear ${candidate.name},

My name is [YOUR NAME], and I'm a volunteer with Denver For All (denverforall.org), a grassroots civic research project that produces evidence-based policy proposals and free civic tools for Denver residents.

Ahead of the April 2027 election, we're sending every candidate for Denver City Council the same 7-question survey. We will publish all responses — unedited and in full — alongside your public record on our Candidate Tracker (denverforall.org/tools/candidate-tracker).

Candidates who don't respond will be listed as "No Response" with their public record only. We believe Denver voters deserve to know where every candidate stands on the issues below.

Please reply to this email with your answers. There is no word limit — say as much or as little as you like on each question. We will publish your exact words with zero editorial changes.

— — — — — — — — — —

THE 7 QUESTIONS

1. RENT & HOUSING COSTS
Colorado currently preempts cities from enacting rent control. Do you support Denver passing rent stabilization if the state enables it, and what would you do at the city level to keep housing affordable?

2. HOMELESSNESS
Denver City Council passed a moratorium on encampment sweeps during freezing temperatures; Mayor Johnston vetoed it. Do you support a housing-first approach to homelessness, and would you vote to override the mayor's veto?

3. STAR & LEAD PROGRAMS
Denver's STAR program sends mental health professionals instead of police to crisis calls (10,000+ calls, zero incidents requiring police backup). The LEAD program diverts people facing low-level charges to case management instead of arrest. Do you support expanding both programs to 24/7 citywide coverage?

4. COST OF LIVING
Denver's minimum wage is $18.81/hour, but a single adult with one child needs $27.35/hour to meet basic expenses (MIT Living Wage Calculator). Do you support raising Denver's minimum wage to $25/hour, indexed to cost of living?

5. IMMIGRATION & SANCTUARY PROTECTIONS
Denver has received thousands of migrants since 2022 and spent over $70 million on newcomer services. Federal immigration enforcement actions in Denver have intensified. Do you support Denver's sanctuary policies, and what would you do to protect immigrant residents from federal enforcement actions?

6. SURVEILLANCE & ACCOUNTABILITY
Denver City Council voted 12-0 to reject the Flock camera contract, but the mayor bypassed the vote. Audit logs revealed ICE searched Denver's camera data 1,400+ times. Should council approval be required before any surveillance technology is deployed in Denver?

7. YOUR DISTRICT'S TOP PRIORITY
What is the single most important issue facing your district, and what specific policy would you propose to address it?

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
      Authorization: `Bearer ${apiKey}`,
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
const mode = args.includes('--resend')
  ? 'resend'
  : args.includes('--mailto')
    ? 'mailto'
    : 'dry-run';

const candidateFilter = args.includes('--candidate') ? args[args.indexOf('--candidate') + 1] : null;

const sendAll = args.includes('--all');

let targets = candidates;

if (candidateFilter) {
  targets = candidates.filter((c) => c.name.toLowerCase().includes(candidateFilter.toLowerCase()));
  if (targets.length === 0) {
    console.error(`No candidate found matching "${candidateFilter}"`);
    process.exit(1);
  }
} else if (sendAll) {
  targets = candidates.filter((c) => c.status === 'not-contacted');
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
  console.log(`Sent: ${candidates.filter((c) => c.status === 'sent').length}`);
  console.log(`Not contacted: ${candidates.filter((c) => c.status === 'not-contacted').length}`);
  console.log(`\nUsage:`);
  console.log(
    `  node scripts/send-questionnaires.js --dry-run --all           # Preview all unsent emails`,
  );
  console.log(
    `  node scripts/send-questionnaires.js --dry-run --candidate "Paul Pazen"  # Preview one`,
  );
  console.log(
    `  node scripts/send-questionnaires.js --mailto --candidate "Paul Pazen"   # Open in email client`,
  );
  console.log(
    `  RESEND_API_KEY=re_xxx node scripts/send-questionnaires.js --resend --all # Send via Resend\n`,
  );
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
