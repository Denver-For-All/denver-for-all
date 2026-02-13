import React from 'react';

interface Props {
  currentStep: number;
  locale: 'en' | 'es';
}

const steps = [
  {
    heading: 'The Surge',
    headingEs: 'La Oleada',
    body: 'Denver eviction filings have nearly doubled since before the pandemic. In 2025, 15,953 families faced eviction \u2014 72% above pre-pandemic levels. The COVID moratorium created a brief reprieve, but when it lifted, filings didn\u2019t just return to normal. They exploded.',
    bodyEs:
      'Las demandas de desalojo en Denver casi se han duplicado desde antes de la pandemia. En 2025, 15,953 familias enfrentaron desalojo \u2014 72% por encima de los niveles pre-pandemia. La moratoria por COVID cre\u00f3 un breve respiro, pero cuando se levant\u00f3, las demandas no solo volvieron a la normalidad. Explotaron.',
  },
  {
    heading: 'Where It Hits Hardest',
    headingEs: 'D\u00f3nde Golpea M\u00e1s Fuerte',
    body: 'Evictions are not spread evenly. Green Valley Ranch alone saw 2,100+ filings in 2025 \u2014 the largest share of any single zip code. West Colfax, Montbello, Five Points, and Hampden round out the top five. These are communities with the highest percentages of Latino and Black tenants.',
    bodyEs:
      'Los desalojos no se distribuyen de manera uniforme. Green Valley Ranch sola tuvo m\u00e1s de 2,100 demandas en 2025 \u2014 la mayor proporci\u00f3n de cualquier c\u00f3digo postal. West Colfax, Montbello, Five Points y Hampden completan los cinco principales. Son comunidades con los mayores porcentajes de inquilinos latinos y negros.',
  },
  {
    heading: 'What Happens in Court',
    headingEs: 'Qu\u00e9 Pasa en la Corte',
    body: 'Colorado\u2019s SB24-064 dashboard now tracks every eviction outcome. The numbers are stark: 62% of cases end with judgment for possession. 28% are default judgments \u2014 the tenant never showed up. In 2025, only 104 out of 14,653 defendants (0.7%) even filed an answer. Half of all cases result in a writ of restitution \u2014 a court order for the sheriff to physically remove the tenant. And 99.6% of filings are classified as \u201clease violation,\u201d not non-payment.',
    bodyEs:
      'El panel SB24-064 de Colorado ahora rastrea cada resultado de desalojo. Los n\u00fameros son contundentes: el 62% de los casos terminan con sentencia de posesi\u00f3n. El 28% son sentencias en rebeld\u00eda \u2014 el inquilino nunca se present\u00f3. En 2025, solo 104 de 14,653 demandados (0.7%) presentaron respuesta. La mitad de los casos resultan en una orden de restituci\u00f3n \u2014 una orden judicial para que el sheriff desaloje f\u00edsicamente al inquilino. Y el 99.6% de las demandas se clasifican como \u201cviolaci\u00f3n de contrato,\u201d no falta de pago.',
  },
  {
    heading: 'The Safety Net Collapses',
    headingEs: 'La Red de Seguridad Colapsa',
    body: 'As eviction filings hit record highs, Denver slashed rental assistance. The budget dropped from $31.3 million in 2024 to $12 million for 2026. The city projects serving 1,500 fewer households. The mayor cites a $200 million projected general fund deficit \u2014 but the cost of homelessness far exceeds the cost of prevention.',
    bodyEs:
      'Mientras las demandas de desalojo alcanzan r\u00e9cords, Denver recort\u00f3 la asistencia de alquiler. El presupuesto baj\u00f3 de $31.3 millones en 2024 a $12 millones para 2026. La ciudad proyecta atender 1,500 hogares menos. El alcalde cita un d\u00e9ficit proyectado de $200 millones \u2014 pero el costo de la falta de vivienda supera con creces el costo de la prevenci\u00f3n.',
  },
  {
    heading: 'The Housing Math',
    headingEs: 'Las Matem\u00e1ticas de la Vivienda',
    body: 'Rents are declining. Vacancy is rising. Yet evictions haven\u2019t slowed. Because eviction is not just about rent levels \u2014 it\u2019s about the gap between rent and income. 52% of Denver households are renters. Rent has risen 85% since 2010. And Colorado is one of the few states that preempts cities from enacting any rent stabilization. The protection is zero.',
    bodyEs:
      'Las rentas est\u00e1n bajando. Las vacantes est\u00e1n subiendo. Sin embargo, los desalojos no han disminuido. Porque el desalojo no se trata solo del nivel de renta \u2014 se trata de la brecha entre renta e ingreso. El 52% de los hogares de Denver son inquilinos. La renta ha subido 85% desde 2010. Y Colorado es uno de los pocos estados que proh\u00edbe a las ciudades establecer cualquier estabilizaci\u00f3n de renta. La protecci\u00f3n es cero.',
  },
  {
    heading: 'Against the National Trend',
    headingEs: 'Contra la Tendencia Nacional',
    body: 'Most major cities tracked by the Eviction Lab are seeing filing declines. Denver is going the opposite direction \u2014 grouped with Austin, Las Vegas, and Phoenix as Western cities trending upward. Colorado\u2019s landlord-friendly policies, low filing fees ($95\u2013$145), and fast eviction timelines (4\u20135 weeks) make it easy to file and hard to fight.',
    bodyEs:
      'La mayor\u00eda de las ciudades principales rastreadas por el Laboratorio de Desalojos est\u00e1n viendo disminuciones. Denver va en la direcci\u00f3n opuesta \u2014 agrupada con Austin, Las Vegas y Phoenix como ciudades del oeste con tendencia al alza. Las pol\u00edticas favorables a propietarios de Colorado, las bajas tarifas ($95\u2013$145) y los plazos r\u00e1pidos (4\u20135 semanas) hacen f\u00e1cil presentar y dif\u00edcil luchar.',
  },
];

export default function NarrativeSteps({ currentStep, locale }: Props) {
  return (
    <div>
      {steps.map((step, i) => (
        <div key={i} className="scrolly-step" data-step={i}>
          <div className={`step-card ${currentStep === i ? 'step-card--active' : ''}`}>
            <div className="step-number">
              {i + 1} / {steps.length}
            </div>
            <h3 className="step-heading">{locale === 'es' ? step.headingEs : step.heading}</h3>
            <p className="step-body">{locale === 'es' ? step.bodyEs : step.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
