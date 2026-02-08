import React, { useEffect, useState } from 'react';
import StickyVisualization from './StickyVisualization';
import NarrativeSteps from './NarrativeSteps';
import { useLocale } from '../sidewalk-data/useLocale';
import '../sidewalk-data/styles.css';

export default function EvictionScrollytelling() {
  const [currentStep, setCurrentStep] = useState(0);
  const locale = useLocale();

  useEffect(() => {
    let scroller: any;

    async function init() {
      const scrollama = (await import('scrollama')).default;
      scroller = scrollama();

      scroller
        .setup({
          step: '.scrolly-step',
          offset: 0.5,
        })
        .onStepEnter(({ index }: { index: number }) => {
          setCurrentStep(index);
        });

      window.addEventListener('resize', scroller.resize);
    }

    init();

    return () => {
      if (scroller) scroller.destroy();
    };
  }, []);

  return (
    <div className="scrolly">
      <div className="scrolly__graphic">
        <StickyVisualization step={currentStep} locale={locale} />
      </div>
      <div className="scrolly__steps">
        <NarrativeSteps currentStep={currentStep} locale={locale} />
      </div>
    </div>
  );
}
