import React from 'react';

interface Props {
  currentStep: number;
  locale: 'en' | 'es';
}

const steps = [
  {
    heading: 'The Money Explosion',
    headingEs: 'La Explosi\u00f3n de Dinero',
    body: 'Outside spending in Denver elections went from less than $1 million in 2019 to nearly $5 million in 2023 — then exploded to $8.5 million on 2025 ballot measures alone. Super PACs funded by billionaires, corporations, and industry groups now dominate Denver elections. The 2025 school board race added another $2.4 million in outside money.',
    bodyEs:
      'El gasto externo en elecciones de Denver pasó de menos de $1 millón en 2019 a casi $5 millones en 2023 — y luego explotó a $8.5 millones solo en medidas electorales de 2025. Los Super PACs financiados por multimillonarios, corporaciones y grupos industriales ahora dominan las elecciones de Denver. La elección escolar 2025 agregó otros $2.4 millones en dinero externo.',
  },
  {
    heading: 'Who Pays for Denver Politics',
    headingEs: 'Qui\u00e9n Paga por la Pol\u00edtica de Denver',
    body: 'Two tech billionaires put more money into the 2023 mayor\u2019s race than thousands of Denver residents combined. Reid Hoffman gave $905,000. Michael Bloomberg gave $500,000. The real estate industry funneled $578,000 through a single PAC backing Kelly Brough \u2014 led by the National Association of Realtors at $150,000.',
    bodyEs:
      'Dos multimillonarios tecnol\u00f3gicos pusieron m\u00e1s dinero en la carrera de alcalde 2023 que miles de residentes de Denver combinados. Reid Hoffman dio $905,000. Michael Bloomberg dio $500,000. La industria inmobiliaria canaliz\u00f3 $578,000 a trav\u00e9s de un solo PAC apoyando a Kelly Brough \u2014 liderado por la Asociaci\u00f3n Nacional de Agentes Inmobiliarios con $150,000.',
  },
  {
    heading: 'Fair Elections vs. Reality',
    headingEs: 'Elecciones Justas vs. Realidad',
    body: 'Denver\u2019s Fair Elections Fund is one of the most progressive public campaign finance systems in the country \u2014 $7.7 million disbursed to 47 candidates in 2023, with 9:1 matching on small donations. But unlimited super PAC spending overwhelms it. $7.7 million spread across 47 candidates vs. $4.8 million concentrated on a handful.',
    bodyEs:
      'El Fondo de Elecciones Justas de Denver es uno de los sistemas de financiamiento p\u00fablico m\u00e1s progresistas del pa\u00eds \u2014 $7.7 millones distribuidos a 47 candidatos en 2023, con igualaci\u00f3n 9:1 en donaciones peque\u00f1as. Pero el gasto ilimitado de Super PACs lo abruma. $7.7 millones entre 47 candidatos vs. $4.8 millones concentrados en unos pocos.',
  },
  {
    heading: 'How the Council Votes',
    headingEs: 'C\u00f3mo Vota el Concejo',
    body: 'When the council votes progressively, the mayor overrides them. When the council votes regressively, the mayor signs. The encampment moratorium passed 7\u20136 but was vetoed \u2014 then the mayor bypassed a 12\u20130 council vote against Flock surveillance with a smaller contract. The veto is the most powerful tool in Denver politics.',
    bodyEs:
      'Cuando el concejo vota progresivamente, el alcalde los anula. Cuando el concejo vota regresivamente, el alcalde firma. La moratoria de campamentos pas\u00f3 7\u20136 pero fue vetada \u2014 luego el alcalde evadi\u00f3 un voto 12\u20130 del concejo contra la vigilancia Flock con un contrato menor. El veto es la herramienta m\u00e1s poderosa en la pol\u00edtica de Denver.',
  },
  {
    heading: 'The School Board Lesson',
    headingEs: 'La Lecci\u00f3n de la Junta Escolar',
    body: 'In 2025, charter school advocates outspent teachers\u2019 union allies 5-to-1 in the most expensive Denver school board election ever \u2014 $1.5 million vs. $286,500. All four charter-backed candidates lost. All four union-backed candidates won. Money doesn\u2019t always win. But it always tries.',
    bodyEs:
      'En 2025, los defensores de escuelas charter superaron en gasto a los aliados del sindicato de maestros 5 a 1 en la elecci\u00f3n escolar m\u00e1s cara de Denver \u2014 $1.5 millones vs. $286,500. Los cuatro candidatos pro-charter perdieron. Los cuatro candidatos sindicales ganaron. El dinero no siempre gana. Pero siempre lo intenta.',
  },
  {
    heading: 'The 2025 Ballot Wars',
    headingEs: 'Las Guerras Electorales de 2025',
    body: 'Denver\u2019s 2025 ballot measures drew $8.5 million in spending. The biggest battle: Referendum 310 on tobacco regulation. Michael Bloomberg personally contributed $4.85 million to the anti-tobacco side, which spent $6.4 million total. The tobacco industry spent $665,000 fighting it \u2014 outspent 10-to-1, and they lost. Meanwhile, the Vibrant Denver Bond raised $1.8 million \u2014 85% from corporate donors including construction firms, engineering companies, and real estate interests who stand to benefit from the infrastructure projects.',
    bodyEs:
      'Las medidas electorales de Denver 2025 atrajeron $8.5 millones en gastos. La mayor batalla: Referéndum 310 sobre regulación del tabaco. Michael Bloomberg personalmente contribuyó $4.85 millones al lado anti-tabaco, que gastó $6.4 millones en total. La industria tabacalera gastó $665,000 combatiéndolo \u2014 superada 10 a 1, y perdieron. Mientras tanto, el Bono Vibrant Denver recaudó $1.8 millones \u2014 85% de donantes corporativos incluyendo empresas de construcción, ingeniería e intereses inmobiliarios que se beneficiarían de los proyectos de infraestructura.',
  },
  {
    heading: 'What\u2019s Coming in 2027',
    headingEs: 'Lo Que Viene en 2027',
    body: 'New rules for 2027: anonymous donations banned, contribution limits tightened to $500 for Fair Elections Fund participants. But super PAC spending remains unlimited. Five candidates have already filed for city council and the mayor\u2019s office. Three of them are already using the Fair Elections Fund, with strong small-dollar participation. Lisa Calderon has announced against Mayor Johnston. The money is about to start flowing. Track it at SearchLight Denver and Colorado TRACER.',
    bodyEs:
      'Nuevas reglas para 2027: donaciones anónimas prohibidas, límites de contribución reducidos a $500 para participantes del Fondo de Elecciones Justas. Pero el gasto de Super PACs sigue sin límite. Cinco candidatos ya se han registrado para el concejo municipal y la alcaldía. Tres de ellos ya están usando el Fondo de Elecciones Justas, con fuerte participación de pequeñas donaciones. Lisa Calderon anunció contra el Alcalde Johnston. El dinero está por empezar a fluir. Rastréalo en SearchLight Denver y Colorado TRACER.',
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
