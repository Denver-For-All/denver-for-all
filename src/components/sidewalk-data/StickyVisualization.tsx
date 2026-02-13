import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import {
  donutData,
  equityComparison,
  transitStops,
  dangerousCorridors,
  destinationExamples,
  highInjuryNetwork,
} from '../../data/sidewalk-stats';

const C = {
  danger: '#C0392B',
  primary: '#0D7377',
  primaryLight: '#7DD3C0',
  secondary: '#1E5FA6',
  secondaryLight: '#6BA3D6',
  accent: '#D4A843',
  muted: '#8A95A3',
  text: '#1A2332',
  textMuted: '#5A6978',
  bg: '#FAFBFC',
  bgAlt: '#F0F4F5',
  border: '#D8DEE4',
};

interface Props {
  step: number;
  locale: 'en' | 'es';
}

function ChartTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontSize: '1.1rem',
        fontWeight: 700,
        color: C.text,
        textAlign: 'center',
        marginBottom: '1rem',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {children}
    </h3>
  );
}

function OverviewDonut({ locale }: { locale: string }) {
  return (
    <div>
      <ChartTitle>
        {locale === 'es' ? '3,140 Millas de Aceras' : '3,140 Miles of Sidewalk'}
      </ChartTitle>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={donutData}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={120}
            dataKey="value"
            stroke="#fff"
            strokeWidth={2}
          >
            {donutData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
            <LabelList
              dataKey={locale === 'es' ? 'nameEs' : 'name'}
              position="outside"
              fill={C.textMuted}
              fontSize={13}
              fontFamily="Inter, system-ui, sans-serif"
            />
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [`${value.toLocaleString()} mi`, name]}
            contentStyle={{
              borderRadius: 8,
              border: `1px solid ${C.border}`,
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
        <span
          style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            color: C.danger,
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          43%
        </span>
        <br />
        <span style={{ color: C.textMuted, fontSize: '0.95rem' }}>
          {locale === 'es' ? 'faltantes o deficientes' : 'missing or deficient'}
        </span>
      </div>
    </div>
  );
}

function EquityChart({ locale }: { locale: string }) {
  const data = equityComparison.map((d) => ({
    name: locale === 'es' ? d.metricEs : d.metric,
    [locale === 'es' ? 'Áreas de Equidad' : 'Equity Areas']: d.equity,
    [locale === 'es' ? 'Toda la Ciudad' : 'Citywide']: d.citywide,
  }));

  const equityLabel = locale === 'es' ? 'Áreas de Equidad' : 'Equity Areas';
  const cityLabel = locale === 'es' ? 'Toda la Ciudad' : 'Citywide';

  return (
    <div>
      <ChartTitle>
        {locale === 'es'
          ? 'Vecindarios de Equidad vs. Toda la Ciudad'
          : 'Equity Neighborhoods vs. Citywide'}
      </ChartTitle>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 20, right: 40, top: 10, bottom: 10 }}
        >
          <XAxis
            type="number"
            domain={[0, 45]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 12, fill: C.textMuted }}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={110}
            tick={{ fontSize: 13, fill: C.text, fontWeight: 500 }}
          />
          <Tooltip
            formatter={(v: number) => `${v}%`}
            contentStyle={{
              borderRadius: 8,
              border: `1px solid ${C.border}`,
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          />
          <Legend wrapperStyle={{ fontSize: 13, fontFamily: 'Inter, system-ui, sans-serif' }} />
          <Bar dataKey={equityLabel} fill={C.danger} radius={[0, 4, 4, 0]} barSize={18}>
            <LabelList
              dataKey={equityLabel}
              position="right"
              formatter={(v: number) => `${v}%`}
              fill={C.text}
              fontSize={13}
              fontWeight={600}
            />
          </Bar>
          <Bar dataKey={cityLabel} fill={C.secondary} radius={[0, 4, 4, 0]} barSize={18}>
            <LabelList
              dataKey={cityLabel}
              position="right"
              formatter={(v: number) => `${v}%`}
              fill={C.text}
              fontSize={13}
              fontWeight={600}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function TransitChart({ locale }: { locale: string }) {
  const data = transitStops.map((d) => ({
    name: locale === 'es' ? d.metricEs : d.metric,
    pct: d.pct,
  }));

  return (
    <div>
      <ChartTitle>
        {locale === 'es'
          ? '% de Paradas de Tránsito Afectadas (a 2 min caminando)'
          : '% of Transit Stops Affected (within 2-min walk)'}
      </ChartTitle>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 20, right: 50, top: 10, bottom: 10 }}
        >
          <XAxis
            type="number"
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 12, fill: C.textMuted }}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={120}
            tick={{ fontSize: 13, fill: C.text, fontWeight: 500 }}
          />
          <Tooltip
            formatter={(v: number) => `${v}%`}
            contentStyle={{
              borderRadius: 8,
              border: `1px solid ${C.border}`,
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          />
          <Bar dataKey="pct" radius={[0, 4, 4, 0]} barSize={24}>
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.pct > 60 ? C.danger : entry.pct > 45 ? C.accent : C.secondary}
              />
            ))}
            <LabelList
              dataKey="pct"
              position="right"
              formatter={(v: number) => `${v}%`}
              fill={C.text}
              fontSize={14}
              fontWeight={700}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div
        style={{
          textAlign: 'center',
          marginTop: '1rem',
          padding: '0.75rem',
          background: C.bgAlt,
          borderRadius: 8,
          fontSize: '0.85rem',
          color: C.textMuted,
        }}
      >
        {locale === 'es'
          ? 'Union Station: <1% faltantes o deficientes'
          : 'Union Station: <1% missing or deficient'}
      </div>
    </div>
  );
}

function CorridorsChart({ locale }: { locale: string }) {
  const data = [...dangerousCorridors].sort((a, b) => a.pct - b.pct);
  const tooltipLabel = locale === 'es' ? '% sin zona de protección' : '% with no buffer';

  return (
    <div>
      <ChartTitle>
        {locale === 'es'
          ? 'Aceras Estrechas sin Zona de Protección'
          : 'Narrow Sidewalks with No Amenity Buffer'}
      </ChartTitle>
      <div
        style={{
          textAlign: 'center',
          fontSize: '0.8rem',
          color: C.textMuted,
          marginBottom: '0.5rem',
          marginTop: '-0.5rem',
        }}
      >
        {locale === 'es'
          ? '% de aceras del corredor sin zona de protección entre peatones y tráfico'
          : '% of corridor sidewalk segments with no buffer between pedestrians and traffic'}
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 10, right: 50, top: 10, bottom: 10 }}
        >
          <XAxis
            type="number"
            domain={[0, 80]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 12, fill: C.textMuted }}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={130}
            tick={{ fontSize: 13, fill: C.text, fontWeight: 600 }}
          />
          <Tooltip
            formatter={(v: number) => [`${v}%`, tooltipLabel]}
            contentStyle={{
              borderRadius: 8,
              border: `1px solid ${C.border}`,
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          />
          <Bar dataKey="pct" radius={[0, 4, 4, 0]} barSize={28}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.pct > 60 ? C.danger : C.accent} />
            ))}
            <LabelList
              dataKey="pct"
              position="right"
              formatter={(v: number) => `${v}%`}
              fill={C.text}
              fontSize={15}
              fontWeight={700}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div
        style={{
          textAlign: 'center',
          marginTop: '1rem',
          padding: '0.75rem',
          background: '#FDF2F2',
          borderRadius: 8,
          borderLeft: `4px solid ${C.danger}`,
          fontSize: '0.85rem',
          color: C.danger,
          fontWeight: 600,
        }}
      >
        {locale === 'es'
          ? 'Todas en la Red de Alto Riesgo de Lesiones — 50% de choques fatales en 5% de las calles'
          : 'All on the High Injury Network — 50% of fatal crashes on 5% of streets'}
      </div>
    </div>
  );
}

function DestinationsChart({ locale }: { locale: string }) {
  const data = destinationExamples.map((d) => ({
    name: locale === 'es' ? d.nameEs : d.name,
    pct: d.pct,
  }));

  return (
    <div>
      <ChartTitle>
        {locale === 'es'
          ? 'Aceras Faltantes/Deficientes Cerca de Destinos (a 2 min)'
          : 'Missing/Deficient Sidewalks Near Destinations (2-min walk)'}
      </ChartTitle>
      <div
        style={{
          display: 'flex',
          gap: '1.5rem',
          justifyContent: 'center',
          marginTop: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        {data.map((d, i) => (
          <div
            key={i}
            style={{
              textAlign: 'center',
              padding: '1.5rem',
              background: i === 1 ? '#FDF2F2' : C.bgAlt,
              borderRadius: 16,
              border: `2px solid ${i === 1 ? C.danger : C.border}`,
              flex: '1 1 200px',
              maxWidth: 260,
            }}
          >
            <div
              style={{
                fontSize: '3rem',
                fontWeight: 800,
                color: i === 1 ? C.danger : C.primary,
                lineHeight: 1,
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              {d.pct}%
            </div>
            <div
              style={{
                fontSize: '0.85rem',
                color: C.textMuted,
                marginTop: '0.5rem',
                lineHeight: 1.4,
              }}
            >
              {d.name}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          fontSize: '0.9rem',
          color: C.textMuted,
        }}
      >
        {locale === 'es'
          ? '35% de destinos comunitarios tienen aceras faltantes a 2 min caminando'
          : '35% of community destinations have missing sidewalks within a 2-min walk'}
      </div>
    </div>
  );
}

function HINCallout({ locale }: { locale: string }) {
  const stats = [
    {
      value: `${highInjuryNetwork.fatalCrashPct}%`,
      label: locale === 'es' ? 'de choques fatales' : 'of fatal crashes',
      sub:
        locale === 'es'
          ? `en solo ${highInjuryNetwork.streetsPct}% de las calles`
          : `on just ${highInjuryNetwork.streetsPct}% of streets`,
      color: C.danger,
    },
    {
      value: `${highInjuryNetwork.missingMiles} mi`,
      label: locale === 'es' ? 'aceras faltantes en la Red' : 'missing sidewalks on the Network',
      sub: '',
      color: C.accent,
    },
    {
      value: `${highInjuryNetwork.deficientMiles} mi`,
      label: locale === 'es' ? 'aceras de ancho deficiente' : 'deficient-width sidewalks',
      sub: '',
      color: C.accent,
    },
  ];

  return (
    <div>
      <ChartTitle>
        {locale === 'es' ? 'La Red de Alto Riesgo de Lesiones' : 'The High Injury Network'}
      </ChartTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '1rem',
              padding: '1.25rem',
              background: i === 0 ? '#FDF2F2' : C.bgAlt,
              borderRadius: 12,
              borderLeft: `4px solid ${s.color}`,
            }}
          >
            <span
              style={{
                fontSize: i === 0 ? '2.5rem' : '2rem',
                fontWeight: 800,
                color: s.color,
                lineHeight: 1,
                fontFamily: 'Inter, system-ui, sans-serif',
                flexShrink: 0,
              }}
            >
              {s.value}
            </span>
            <div>
              <div style={{ fontSize: '0.95rem', color: C.text, fontWeight: 600 }}>{s.label}</div>
              {s.sub && (
                <div style={{ fontSize: '0.85rem', color: C.textMuted, marginTop: '0.2rem' }}>
                  {s.sub}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StickyVisualization({ step, locale }: Props) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div key={step} className="viz-fade">
        {step === 0 && <OverviewDonut locale={locale} />}
        {step === 1 && <EquityChart locale={locale} />}
        {step === 2 && <TransitChart locale={locale} />}
        {step === 3 && <CorridorsChart locale={locale} />}
        {step === 4 && <DestinationsChart locale={locale} />}
        {step === 5 && <HINCallout locale={locale} />}
      </div>
    </div>
  );
}
