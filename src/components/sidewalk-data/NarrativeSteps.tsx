import React from 'react';

interface Props {
  currentStep: number;
  locale: 'en' | 'es';
}

interface Step {
  heading: string;
  headingEs: string;
  body: string;
  bodyEs: string;
}

const steps: Step[] = [
  {
    heading: 'The Scale of the Crisis',
    headingEs: 'La Escala de la Crisis',
    body: 'Denver has 3,140 miles of sidewalks. But 43% of them \u2014 nearly 1,500 miles \u2014 are either missing entirely or too narrow for a wheelchair. At least 1,233 blocks need repair. At previous funding levels, completing the network would take over 400 years.',
    bodyEs: 'Denver tiene 3,140 millas de aceras. Pero el 43% \u2014 casi 1,500 millas \u2014 faltan por completo o son demasiado estrechas para una silla de ruedas. Al menos 1,233 cuadras necesitan reparaci\u00f3n. Al ritmo previo de financiamiento, completar la red tomar\u00eda m\u00e1s de 400 a\u00f1os.',
  },
  {
    heading: 'The Equity Gap',
    headingEs: 'La Brecha de Equidad',
    body: 'In DOTI equity priority neighborhoods \u2014 areas with the highest need \u2014 37% of sidewalks are too narrow, compared to 34% citywide. 153 miles are missing entirely, concentrated in north and southwest Denver. The poorest neighborhoods bear the heaviest burden.',
    bodyEs: 'En los vecindarios prioritarios de equidad de DOTI \u2014 \u00e1reas con mayor necesidad \u2014 el 37% de las aceras son demasiado estrechas, comparado con el 34% en toda la ciudad. Faltan 153 millas por completo, concentradas en el norte y suroeste de Denver.',
  },
  {
    heading: "Can't Get to the Bus",
    headingEs: 'No Se Puede Llegar al Autob\u00fas',
    body: 'Over half of Denver\u2019s high-ridership transit stops have missing sidewalks within a two-minute walk. 71% have deficient-width sidewalks nearby. Union Station has less than 1% missing or deficient. The infrastructure follows the investment. The investment follows the wealth.',
    bodyEs: 'M\u00e1s de la mitad de las paradas de tr\u00e1nsito de alto uso en Denver tienen aceras faltantes a dos minutos caminando. El 71% tienen aceras de ancho deficiente. Union Station tiene menos del 1% faltante o deficiente. La infraestructura sigue la inversi\u00f3n. La inversi\u00f3n sigue la riqueza.',
  },
  {
    heading: 'The Streets Where People Die',
    headingEs: 'Las Calles Donde la Gente Muere',
    body: 'These four arterials have some of the narrowest sidewalks in Denver. The percentages show how much of each corridor\u2019s sidewalks lack any buffer between pedestrians and traffic \u2014 on Leetsdale Dr, that\u2019s two-thirds. They are all part of the High Injury Network, where 50% of fatal crashes happen on just 5% of streets. 93 people died on Denver streets in 2025. 35 were pedestrians.',
    bodyEs: 'Estas cuatro arterias tienen algunas de las aceras m\u00e1s estrechas de Denver. Los porcentajes muestran cu\u00e1nto de las aceras de cada corredor carecen de zona de protecci\u00f3n entre peatones y tr\u00e1fico \u2014 en Leetsdale Dr, son dos tercios. Todas son parte de la Red de Alto Riesgo, donde el 50% de los choques fatales ocurren en solo el 5% de las calles. 93 personas murieron en las calles de Denver en 2025.',
  },
  {
    heading: 'Where Kids Walk to School',
    headingEs: 'Donde los Ni\u00f1os Caminan a la Escuela',
    body: '35% of community destinations \u2014 schools, parks, food stores, health centers \u2014 have missing sidewalks within a two-minute walk. The gap between wealthy and underserved areas is stark: Presbyterian/St. Luke\u2019s Hospital has 7% missing or deficient. Abraham Lincoln High School has 64%.',
    bodyEs: 'El 35% de los destinos comunitarios \u2014 escuelas, parques, tiendas de alimentos, centros de salud \u2014 tienen aceras faltantes a dos minutos caminando. La brecha es clara: el Hospital Presbyterian/St. Luke\u2019s tiene 7% faltante o deficiente. La Escuela Abraham Lincoln tiene 64%.',
  },
  {
    heading: 'The Window to Act',
    headingEs: 'La Ventana para Actuar',
    body: 'The Sidewalk Implementation Plan is being finalized through 2026. Public input on prioritization happens Spring 2026. This is the window to demand equity-first construction \u2014 that the most dangerous corridors and underserved neighborhoods come first, not last.',
    bodyEs: 'El Plan de Implementaci\u00f3n de Aceras se finalizar\u00e1 durante 2026. Los comentarios p\u00fablicos sobre priorizaci\u00f3n ocurren en la primavera de 2026. Esta es la ventana para exigir construcci\u00f3n con equidad primero \u2014 que los corredores m\u00e1s peligrosos y los vecindarios desatendidos sean primero, no \u00faltimos.',
  },
];

export default function NarrativeSteps({ currentStep, locale }: Props) {
  return (
    <div>
      {steps.map((step, i) => (
        <div
          key={i}
          className="scrolly-step"
          data-step={i}
        >
          <div className={`step-card ${currentStep === i ? 'step-card--active' : ''}`}>
            <div className="step-number">{i + 1} / {steps.length}</div>
            <h3 className="step-heading">
              {locale === 'es' ? step.headingEs : step.heading}
            </h3>
            <p className="step-body">
              {locale === 'es' ? step.bodyEs : step.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
