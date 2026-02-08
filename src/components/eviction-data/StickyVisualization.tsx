import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, LabelList, Cell,
  ResponsiveContainer, Tooltip, ReferenceLine,
} from 'recharts';
import {
  annualFilings, prePandemicAvg, topNeighborhoods,
  courtOutcomes, rentalAssistanceBudget, nationalComparison,
  sb24064Data,
} from '../../data/eviction-stats';

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

function FilingsTrend({ locale }: { locale: string }) {
  const data = annualFilings.map(d => ({
    ...d,
    fill: d.year === '2020' || d.year === '2021' ? C.primaryLight :
          parseInt(d.year) >= 2023 ? C.danger : C.secondary,
  }));

  return (
    <div>
      <ChartTitle>
        {locale === 'es' ? 'Demandas de Desalojo Anuales en Denver' : 'Annual Denver Eviction Filings'}
      </ChartTitle>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ left: 5, right: 10, top: 10, bottom: 5 }}>
          <XAxis dataKey="year" tick={{ fontSize: 11, fill: C.textMuted }} interval={0} angle={-45} textAnchor="end" height={50} />
          <YAxis tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}K` : v}
            tick={{ fontSize: 12, fill: C.textMuted }} />
          <Tooltip formatter={(v: number) => v.toLocaleString()}
            contentStyle={{ borderRadius: 8, border: `1px solid ${C.border}`, fontFamily: 'Inter, system-ui, sans-serif' }} />
          <ReferenceLine y={prePandemicAvg} stroke={C.muted} strokeDasharray="4 4"
            label={{ value: locale === 'es' ? 'Promedio pre-pandemia' : 'Pre-pandemic avg', position: 'right', fontSize: 11, fill: C.muted }} />
          <Bar dataKey="filings" radius={[3, 3, 0, 0]} barSize={32}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
        <span style={{ fontSize: '2rem', fontWeight: 800, color: C.danger }}>72%</span>
        <span style={{ fontSize: '0.9rem', color: C.textMuted, marginLeft: '0.5rem' }}>
          {locale === 'es' ? 'por encima de niveles pre-pandemia' : 'above pre-pandemic levels'}
        </span>
      </div>
    </div>
  );
}

function NeighborhoodChart({ locale }: { locale: string }) {
  const data = topNeighborhoods.map(d => ({
    name: d.name,
    label: d.filings ? `${d.filings.toLocaleString()}+` : (locale === 'es' ? 'Top 5' : 'Top 5'),
    value: d.filings || 1200,
    isEstimate: !d.filings,
  }));

  return (
    <div>
      <ChartTitle>
        {locale === 'es' ? 'Vecindarios Más Afectados (2025)' : 'Hardest Hit Neighborhoods (2025)'}
      </ChartTitle>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 60, top: 10, bottom: 10 }}>
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="name" width={160}
            tick={{ fontSize: 13, fill: C.text, fontWeight: 500 }} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={28}>
            {data.map((entry, i) => (
              <Cell key={i} fill={i === 0 ? C.danger : entry.isEstimate ? C.accent : C.secondary} opacity={entry.isEstimate ? 0.7 : 1} />
            ))}
            <LabelList dataKey="label" position="right"
              fill={C.text} fontSize={14} fontWeight={700} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div style={{
        textAlign: 'center', marginTop: '1rem', padding: '0.75rem',
        background: '#FDF2F2', borderRadius: 8, borderLeft: `4px solid ${C.danger}`,
        fontSize: '0.85rem', color: C.danger, fontWeight: 600,
      }}>
        {locale === 'es'
          ? 'Comunidades con los mayores porcentajes de inquilinos latinos y negros'
          : 'Communities with the highest percentages of Latino and Black tenants'}
      </div>
    </div>
  );
}

function CourtOutcomesChart({ locale }: { locale: string }) {
  const o = sb24064Data.outcomes;
  const possessionPct = Math.round((o.judgmentForPossession.yes / o.total) * 100);
  const writPct = Math.round((o.writOfRestitution.yes / o.total) * 100);
  const defaultPct = Math.round((o.defaultJudgment.yes / o.total) * 100);
  const answerPct2025 = ((sb24064Data.defendantAnswerFiled[2025].yes /
    (sb24064Data.defendantAnswerFiled[2025].yes + sb24064Data.defendantAnswerFiled[2025].no)) * 100).toFixed(1);

  const cards = [
    {
      value: `${possessionPct}%`,
      label: locale === 'es' ? 'sentencia de posesión otorgada' : 'judgment for possession granted',
      sub: locale === 'es'
        ? `${o.judgmentForPossession.yes.toLocaleString()} de ${o.total.toLocaleString()} casos (2024–2026)`
        : `${o.judgmentForPossession.yes.toLocaleString()} of ${o.total.toLocaleString()} cases (2024–2026)`,
      color: C.danger,
      bg: '#FDF2F2',
    },
    {
      value: `${answerPct2025}%`,
      label: locale === 'es' ? 'de inquilinos presentaron respuesta en 2025' : 'of tenants filed an answer in 2025',
      sub: locale === 'es'
        ? `Solo ${sb24064Data.defendantAnswerFiled[2025].yes} de ${sb24064Data.closedCases[2025].toLocaleString()} demandados respondieron`
        : `Only ${sb24064Data.defendantAnswerFiled[2025].yes} of ${sb24064Data.closedCases[2025].toLocaleString()} defendants responded`,
      color: C.accent,
      bg: '#FFFBF0',
    },
    {
      value: `${writPct}%`,
      label: locale === 'es' ? 'orden de restitución emitida' : 'writ of restitution issued',
      sub: locale === 'es'
        ? `${o.writOfRestitution.yes.toLocaleString()} casos — el sheriff ejecuta el desalojo físico`
        : `${o.writOfRestitution.yes.toLocaleString()} cases — sheriff enforces physical removal`,
      color: C.secondary,
      bg: C.bgAlt,
    },
    {
      value: `${defaultPct}%`,
      label: locale === 'es' ? 'sentencia en rebeldía' : 'default judgment',
      sub: locale === 'es'
        ? 'El inquilino no compareció — pierde automáticamente'
        : 'Tenant didn\'t show up — automatic loss',
      color: C.muted,
      bg: C.bgAlt,
    },
  ];

  return (
    <div>
      <ChartTitle>
        {locale === 'es' ? 'Qué Pasa en la Corte' : 'What Happens in Court'}
      </ChartTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
        {cards.map((c, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'baseline', gap: '1rem',
            padding: '1rem', background: c.bg, borderRadius: 12,
            borderLeft: `4px solid ${c.color}`,
          }}>
            <span style={{
              fontSize: '2rem', fontWeight: 800, color: c.color,
              lineHeight: 1, fontFamily: 'Inter, system-ui, sans-serif', flexShrink: 0,
            }}>
              {c.value}
            </span>
            <div>
              <div style={{ fontSize: '0.9rem', color: C.text, fontWeight: 600 }}>{c.label}</div>
              <div style={{ fontSize: '0.8rem', color: C.textMuted, marginTop: '0.2rem' }}>{c.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{
        textAlign: 'center', marginTop: '0.5rem', fontSize: '0.75rem', color: C.textMuted,
      }}>
        {locale === 'es'
          ? `Fuente: Panel SB24-064, datos al ${sb24064Data.dataAsOf}`
          : `Source: SB24-064 Dashboard, data as of ${sb24064Data.dataAsOf}`}
      </div>
    </div>
  );
}

function BudgetChart({ locale }: { locale: string }) {
  return (
    <div>
      <ChartTitle>
        {locale === 'es' ? 'Presupuesto de Asistencia de Alquiler' : 'Rental Assistance Budget'}
      </ChartTitle>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={rentalAssistanceBudget} margin={{ left: 20, right: 40, top: 10, bottom: 10 }}>
          <XAxis dataKey="year" tick={{ fontSize: 11, fill: C.textMuted }} interval={0} angle={-20} textAnchor="end" height={50} />
          <YAxis tickFormatter={v => `$${v}M`} tick={{ fontSize: 12, fill: C.textMuted }} domain={[0, 35]} />
          <Tooltip formatter={(v: number) => `$${v}M`}
            contentStyle={{ borderRadius: 8, border: `1px solid ${C.border}`, fontFamily: 'Inter, system-ui, sans-serif' }} />
          <Bar dataKey="amount" radius={[4, 4, 0, 0]} barSize={40}>
            {rentalAssistanceBudget.map((entry, i) => (
              <Cell key={i} fill={i === 0 ? C.primary : i === rentalAssistanceBudget.length - 1 ? C.danger : C.accent} />
            ))}
            <LabelList dataKey="label" position="top" fill={C.text} fontSize={13} fontWeight={700} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div style={{
        textAlign: 'center', marginTop: '0.5rem', padding: '0.75rem',
        background: '#FDF2F2', borderRadius: 8, borderLeft: `4px solid ${C.danger}`,
        fontSize: '0.85rem', color: C.danger, fontWeight: 600,
      }}>
        {locale === 'es'
          ? '1,500 hogares menos atendidos por los recortes'
          : '1,500 fewer households served due to cuts'}
      </div>
    </div>
  );
}

function HousingContext({ locale }: { locale: string }) {
  const stats = [
    { value: '$2,150', label: locale === 'es' ? 'Alquiler mediano' : 'Median rent', color: C.accent },
    { value: '7.6%', label: locale === 'es' ? 'Tasa de vacantes' : 'Vacancy rate', color: C.primary },
    { value: '52%', label: locale === 'es' ? 'Hogares inquilinos' : 'Renter households', color: C.secondary },
    { value: '$0', label: locale === 'es' ? 'Estabilización de alquiler en CO' : 'Rent stabilization in CO', color: C.danger },
  ];

  return (
    <div>
      <ChartTitle>
        {locale === 'es' ? 'El Contexto del Mercado de Vivienda' : 'The Housing Market Context'}
      </ChartTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            textAlign: 'center', padding: '1.25rem', background: C.bgAlt,
            borderRadius: 12, border: `2px solid ${i === 3 ? C.danger : C.border}`,
          }}>
            <div style={{
              fontSize: '2rem', fontWeight: 800, color: s.color,
              lineHeight: 1, fontFamily: 'Inter, system-ui, sans-serif',
            }}>
              {s.value}
            </div>
            <div style={{ fontSize: '0.8rem', color: C.textMuted, marginTop: '0.5rem' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
      <div style={{
        textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: C.textMuted,
      }}>
        {locale === 'es'
          ? 'Las rentas bajan, las vacantes suben — pero los desalojos no paran'
          : 'Rents declining, vacancies rising — but evictions aren\'t slowing'}
      </div>
    </div>
  );
}

function NationalComparison({ locale }: { locale: string }) {
  const stats = [
    {
      value: `${nationalComparison.citiesDeclined}/${nationalComparison.citiesTracked}`,
      label: locale === 'es' ? 'ciudades con menos desalojos en 2025' : 'cities saw fewer filings in 2025',
      sub: '',
      color: C.primary,
    },
    {
      value: locale === 'es' ? 'Denver sube' : 'Denver rising',
      label: locale === 'es'
        ? `Con Austin, Las Vegas, Phoenix`
        : `With Austin, Las Vegas, Phoenix`,
      sub: '',
      color: C.danger,
    },
    {
      value: nationalComparison.evictionTimeline,
      label: locale === 'es' ? 'del caso a la calle en Colorado' : 'from filing to eviction in Colorado',
      sub: locale === 'es' ? `Tarifa de presentación: ${nationalComparison.filingFeeRange}` : `Filing fee: ${nationalComparison.filingFeeRange}`,
      color: C.accent,
    },
  ];

  return (
    <div>
      <ChartTitle>
        {locale === 'es' ? 'Denver vs. la Tendencia Nacional' : 'Denver vs. the National Trend'}
      </ChartTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'baseline', gap: '1rem',
            padding: '1.25rem', background: i === 1 ? '#FDF2F2' : C.bgAlt,
            borderRadius: 12, borderLeft: `4px solid ${s.color}`,
          }}>
            <span style={{
              fontSize: i === 1 ? '1.5rem' : '2rem', fontWeight: 800, color: s.color,
              lineHeight: 1, fontFamily: 'Inter, system-ui, sans-serif', flexShrink: 0,
            }}>
              {s.value}
            </span>
            <div>
              <div style={{ fontSize: '0.95rem', color: C.text, fontWeight: 600 }}>{s.label}</div>
              {s.sub && <div style={{ fontSize: '0.85rem', color: C.textMuted, marginTop: '0.2rem' }}>{s.sub}</div>}
            </div>
          </div>
        ))}
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
        {step === 0 && <FilingsTrend locale={locale} />}
        {step === 1 && <NeighborhoodChart locale={locale} />}
        {step === 2 && <CourtOutcomesChart locale={locale} />}
        {step === 3 && <BudgetChart locale={locale} />}
        {step === 4 && <HousingContext locale={locale} />}
        {step === 5 && <NationalComparison locale={locale} />}
      </div>
    </div>
  );
}
