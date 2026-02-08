import React, { useEffect, useRef, useState } from 'react';
import StickyVisualization from './StickyVisualization';
import NarrativeSteps from './NarrativeSteps';
import { useLocale } from './useLocale';
import './styles.css';

export default function SidewalkScrollytelling() {
  const [currentStep, setCurrentStep] = useState(0);
  const scrollyRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();

  useEffect(() => {
    let scroller: { setup: Function; resize: Function; destroy: Function } | undefined;

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
    <div className="scrolly" ref={scrollyRef}>
      <div className="scrolly__graphic">
        <StickyVisualization step={currentStep} locale={locale} />
      </div>
      <div className="scrolly__steps">
        <NarrativeSteps currentStep={currentStep} locale={locale} />
      </div>
    </div>
  );
}
