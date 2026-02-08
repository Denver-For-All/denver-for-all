import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, LabelList, Cell,
  ResponsiveContainer, Tooltip,
} from 'recharts';
import {
  outsideSpending, mayoralPACs2023, totalRaised2023,
  councilVotes, schoolBoard2025,
} from '../../data/campaign-finance-stats';

const C = {
  danger: '#C0392B',
  primary: '#0D7377',
  primaryLight: '#7DD3C0',
  secondary: '#1E5FA6',
  accent: '#D4A843',
  muted: '#8A95A3',
  text: '#1A2332',
  textMuted: '#5A6978',
  bgAlt: '#F0F4F5',
  border: '#D8DEE4',
};

interface Props {
  step: number;
  locale: 'en' | 'es';
}

function ChartTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{
      fontSize: '1.1rem', fontWeight: 700, color: C.text,
      textAlign: 'center', marginBottom: '1rem',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      {children}
    </h3>
  );
}

function MoneyExplosion({ locale }: { locale: string }) {
  const data = outsideSpending.map(d => ({
    name: d.year,
    amount: d.amount,
    label: d.label,
  }));

  return (
    <div>
      <ChartTitle>
        {locale === 'es' ? 'Gasto Externo en Elecciones de Denver' : 'Outside Spending in Denver Elections'}
      </ChartTitle>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ left: 10, right: 30, top: 10, bottom: 10 }}>
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: C.textMuted }} />
          <YAxis tickFormatter={v => `$${v}M`} tick={{ fontSize: 12, fill: C.textMuted }} domain={[0, 6]} />
          <Tooltip formatter={(v: number) => `$${v}M`}
            contentStyle={{ borderRadius: 8, border: `1px solid ${C.border}`, fontFamily: 'Inter, system-ui, sans-serif' }} />
          <Bar dataKey="amount" radius={[4, 4, 0, 0]} barSize={60}>
            {data.map((_, i) => (
              <Cell key={i} fill={i === 0 ? C.muted : i === 1 ? C.danger : C.accent} />
            ))}
            <LabelList dataKey="label" position="top" fill={C.text} fontSize={14} fontWeight={700} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div style={{
        textAlign: 'center', marginTop: '0.5rem', fontSize: '0.9rem', color: C.textMuted,
      }}>
        {locale === 'es'
          ? 'De <$1M en 2019 a $4.8M en 2023 — un aumento de 380%'
          : 'From <$1M in 2019 to $4.8M in 2023 — a 380% increase'}
      </div>
    </div>
  );
}

function WhoPays({ locale }: { locale: string }) {
  const donors = [
    { name: 'Reid Hoffman', amount: 905, label: '$905K', desc: 'LinkedIn' },
    { name: locale === 'es' ? 'Industria Inmobiliaria' : 'Real Estate Industry', amount: 578, label: '$578K', desc: locale === 'es' ? 'A Better Denver PAC' : 'A Better Denver PAC' },
    { name: 'Michael Bloomberg', amount: 500, label: '$500K', desc: '' },
    { name: locale === 'es' ? 'Asoc. Nac. de Agentes' : 'Natl. Assoc. of Realtors', amount: 150, label: '$150K', desc: locale === 'es' ? 'A Better Denver PAC' : 'A Better Denver PAC' },
  ];

  return (
    <div>
      <ChartTitle>
        {locale === 'es' ? 'Quién Paga por la Política de Denver (2023)' : 'Who Pays for Denver Politics (2023)'}
      </ChartTitle>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={donors} layout="vertical" margin={{ left: 10, right: 55, top: 10, bottom: 10 }}>
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="name" width={150}
            tick={{ fontSize: 12, fill: C.text, fontWeight: 500 }} />
          <Tooltip formatter={(v: number) => `$${v}K`}
            contentStyle={{ borderRadius: 8, border: `1px solid ${C.border}`, fontFamily: 'Inter, system-ui, sans-serif' }} />
          <Bar dataKey="amount" radius={[0, 4, 4, 0]} barSize={26}>
            {donors.map((d, i) => (
              <Cell key={i} fill={i === 1 || i === 3 ? C.accent : C.danger} />
            ))}
            <LabelList dataKey="label" position="right" fill={C.text} fontSize={13} fontWeight={700} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div style={{
        display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem', flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <span style={{ width: 12, height: 12, borderRadius: 2, background: C.danger, display: 'inline-block' }} />
          <span style={{ color: C.textMuted }}>{locale === 'es' ? 'Multimillonarios' : 'Billionaires'}</span>
        </span>
        <span style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <span style={{ width: 12, height: 12, borderRadius: 2, background: C.accent, display: 'inline-block' }} />
          <span style={{ color: C.textMuted }}>{locale === 'es' ? 'Inmobiliario' : 'Real Estate'}</span>
        </span>
      </div>
    </div>
  );
}

function FEFvsPACs({ locale }: { locale: string }) {
  const items = [
    {
      value: `$${(totalRaised2023.fefDisbursed / 1e6).toFixed(1)}M`,
      label: locale === 'es' ? 'Fondo de Elecciones Justas' : 'Fair Elections Fund',
      sub: locale === 'es' ? `Dividido entre ${totalRaised2023.fefCandidates} candidatos` : `Split across ${totalRaised2023.fefCandidates} candidates`,
      color: C.primary,
      bg: C.bgAlt,
    },
    {
      value: `$${(totalRaised2023.outsideSpendingTotal / 1e6).toFixed(1)}M`,
      label: locale === 'es' ? 'Gasto de Super PACs' : 'Super PAC Spending',
      sub: locale === 'es' ? 'Concentrado en pocos candidatos' : 'Concentrated on a handful of candidates',
      color: C.danger,
      bg: '#FDF2F2',
    },
  ];

  return (
    <div>
      <ChartTitle>
        {locale === 'es' ? 'Dinero Público vs. Dinero Privado (2023)' : 'Public Money vs. Private Money (2023)'}
      </ChartTitle>
      <div style={{ display: 'flex', gap: '1.25rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
        {items.map((item, i) => (
          <div key={i} style={{
            flex: '1 1 200px', textAlign: 'center', padding: '1.5rem',
            background: item.bg, borderRadius: 16,
            border: `2px solid ${item.color}`,
          }}>
            <div style={{
              fontSize: '2.5rem', fontWeight: 800, color: item.color,
              lineHeight: 1, fontFamily: 'Inter, system-ui, sans-serif',
            }}>
              {item.value}
            </div>
            <div style={{ fontSize: '0.9rem', color: C.text, fontWeight: 600, marginTop: '0.5rem' }}>
              {item.label}
            </div>
            <div style={{ fontSize: '0.8rem', color: C.textMuted, marginTop: '0.3rem' }}>
              {item.sub}
            </div>
          </div>
        ))}
      </div>
      <div style={{
        textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: C.textMuted,
      }}>
        {locale === 'es'
          ? 'PACs ilimitados anulan el financiamiento público para candidatos'
          : 'Unlimited PACs overwhelm public candidate financing'}
      </div>
    </div>
  );
}

function VoteScorecard({ locale }: { locale: string }) {
  const positionColors: Record<string, string> = { good: C.primary, bad: C.danger, vetoed: C.accent };
  const positionLabels: Record<string, Record<string, string>> = {
    good: { en: 'Progressive Win', es: 'Victoria Progresista' },
    bad: { en: 'Progressive Loss', es: 'P\u00e9rdida Progresista' },
    vetoed: { en: 'Mayor Vetoed', es: 'Vetado por Alcalde' },
  };

  return (
    <div>
      <ChartTitle>
        {locale === 'es' ? 'C\u00f3mo Vota el Concejo' : 'How the Council Votes'}
      </ChartTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem' }}>
        {councilVotes.map((v, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.85rem 1rem', background: v.position === 'bad' ? '#FDF2F2' : v.position === 'vetoed' ? '#FFFBEB' : C.bgAlt,
            borderRadius: 10, borderLeft: `4px solid ${positionColors[v.position]}`,
          }}>
            <div style={{
              fontSize: '1.1rem', fontWeight: 800, color: positionColors[v.position],
              fontFamily: 'Inter, system-ui, sans-serif', minWidth: 55, textAlign: 'center',
            }}>
              {v.vote}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: C.text }}>
                {locale === 'es' ? v.nameEs : v.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: C.textMuted }}>
                {locale === 'es' ? v.mayorActionEs : v.mayorAction}
              </div>
            </div>
            <span style={{
              fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.04em', color: positionColors[v.position],
              background: `${positionColors[v.position]}15`,
              padding: '0.2rem 0.5rem', borderRadius: 4,
            }}>
              {positionLabels[v.position][locale] || positionLabels[v.position].en}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SchoolBoardLesson({ locale }: { locale: string }) {
  const sides = [
    {
      label: locale === 'es' ? 'Pro-Charter (Better Leaders)' : 'Pro-Charter (Better Leaders)',
      amount: `$${(schoolBoard2025.proCharter.amount / 1e6).toFixed(1)}M`,
      result: locale === 'es' ? schoolBoard2025.proCharter.resultEs : schoolBoard2025.proCharter.result,
      color: C.danger,
      bg: '#FDF2F2',
    },
    {
      label: locale === 'es' ? 'Sindicato (Students Deserve Better)' : 'Union-Backed (Students Deserve Better)',
      amount: `$${(schoolBoard2025.proUnion.amount / 1e3).toFixed(0)}K`,
      result: locale === 'es' ? schoolBoard2025.proUnion.resultEs : schoolBoard2025.proUnion.result,
      color: C.primary,
      bg: C.bgAlt,
    },
  ];

  return (
    <div>
      <ChartTitle>
        {locale === 'es' ? 'Elecciones Escolares 2025: El Dinero No Siempre Gana' : '2025 School Board: Money Doesn\'t Always Win'}
      </ChartTitle>
      <div style={{ display: 'flex', gap: '1.25rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
        {sides.map((s, i) => (
          <div key={i} style={{
            flex: '1 1 200px', textAlign: 'center', padding: '1.25rem',
            background: s.bg, borderRadius: 16, border: `2px solid ${s.color}`,
          }}>
            <div style={{
              fontSize: '2.25rem', fontWeight: 800, color: s.color,
              lineHeight: 1, fontFamily: 'Inter, system-ui, sans-serif',
            }}>
              {s.amount}
            </div>
            <div style={{ fontSize: '0.85rem', color: C.text, fontWeight: 600, marginTop: '0.5rem' }}>
              {s.label}
            </div>
            <div style={{
              fontSize: '0.8rem', marginTop: '0.5rem', fontWeight: 700,
              color: i === 0 ? C.danger : C.primary,
            }}>
              {s.result}
            </div>
          </div>
        ))}
      </div>
      <div style={{
        textAlign: 'center', marginTop: '1.25rem', padding: '0.75rem',
        background: C.bgAlt, borderRadius: 8, fontSize: '0.9rem', color: C.text, fontWeight: 600,
      }}>
        {locale === 'es'
          ? `Ratio de gasto: ${schoolBoard2025.spendingRatio}:1 — La elección escolar más cara de la historia de Denver`
          : `Spending ratio: ${schoolBoard2025.spendingRatio}:1 — Most expensive Denver school board election ever`}
      </div>
    </div>
  );
}

function Outlook2027({ locale }: { locale: string }) {
  const items = [
    {
      value: locale === 'es' ? 'Prohibidas' : 'Banned',
      label: locale === 'es' ? 'Donaciones an\u00f3nimas' : 'Anonymous donations',
      color: C.primary,
    },
    {
      value: '$500',
      label: locale === 'es' ? 'L\u00edmite para candidatos FEF' : 'Limit for FEF candidates',
      color: C.primary,
    },
    {
      value: '9:1',
      label: locale === 'es' ? 'Proporci\u00f3n de igualaci\u00f3n para donaciones \u2264$50' : 'Match ratio for donations \u2264$50',
      color: C.accent,
    },
    {
      value: locale === 'es' ? 'Sin l\u00edmite' : 'No limit',
      label: locale === 'es' ? 'Gasto de Super PACs' : 'Super PAC spending',
      color: C.danger,
    },
  ];

  return (
    <div>
      <ChartTitle>
        {locale === 'es' ? 'Reglas para 2027: Lo Que Cambi\u00f3 (y Lo Que No)' : '2027 Rules: What Changed (and What Didn\'t)'}
      </ChartTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        {items.map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'baseline', gap: '1rem',
            padding: '1rem', background: i === 3 ? '#FDF2F2' : C.bgAlt,
            borderRadius: 10, borderLeft: `4px solid ${item.color}`,
          }}>
            <span style={{
              fontSize: '1.5rem', fontWeight: 800, color: item.color,
              lineHeight: 1, fontFamily: 'Inter, system-ui, sans-serif', flexShrink: 0,
              minWidth: 90, textAlign: 'center',
            }}>
              {item.value}
            </span>
            <span style={{ fontSize: '0.95rem', color: C.text, fontWeight: 500 }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <div style={{
        textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: C.textMuted,
      }}>
        {locale === 'es'
          ? 'Calderon anunci\u00f3 contra Johnston. Sigue el dinero.'
          : 'Calderon announced against Johnston. Watch the money.'}
      </div>
    </div>
  );
}

export default function StickyVisualization({ step, locale }: Props) {
  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: '1rem',
    }}>
      <div key={step} className="viz-fade">
        {step === 0 && <MoneyExplosion locale={locale} />}
        {step === 1 && <WhoPays locale={locale} />}
        {step === 2 && <FEFvsPACs locale={locale} />}
        {step === 3 && <VoteScorecard locale={locale} />}
        {step === 4 && <SchoolBoardLesson locale={locale} />}
        {step === 5 && <Outlook2027 locale={locale} />}
      </div>
    </div>
  );
}
