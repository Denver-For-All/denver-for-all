import React, { useEffect, useState } from 'react';
import { useLocale } from './useLocale';
import './styles.css';

interface ScrollytellingWrapperProps {
  Visualization: React.ComponentType<{ step: number; locale: 'en' | 'es' }>;
  Steps: React.ComponentType<{ currentStep: number; locale: 'en' | 'es' }>;
}

interface ScrollamaInstance {
  setup: (opts: { step: string; offset: number }) => ScrollamaInstance;
  onStepEnter: (cb: (response: { index: number }) => void) => ScrollamaInstance;
  resize: () => void;
  destroy: () => void;
}

export default function ScrollytellingWrapper({
  Visualization,
  Steps,
}: ScrollytellingWrapperProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const locale = useLocale();

  useEffect(() => {
    let scroller: ScrollamaInstance | undefined;

    async function init() {
      const scrollama = (await import('scrollama')).default;
      scroller = scrollama() as ScrollamaInstance;

      scroller
        .setup({
          step: '.scrolly-step',
          offset: 0.5,
        })
        .onStepEnter(({ index }) => {
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
        <Visualization step={currentStep} locale={locale} />
      </div>
      <div className="scrolly__steps">
        <Steps currentStep={currentStep} locale={locale} />
      </div>
    </div>
  );
}
