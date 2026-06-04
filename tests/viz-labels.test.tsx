// @vitest-environment jsdom
//
// Regression guard for the data-story visualizations (Recharts).
// Bar/Pie entrance animation in Recharts hides <LabelList> value labels until
// the animation completes (recharts/recharts#3028); because each scroll step
// remounts the chart, those labels could vanish entirely. The components set
// isAnimationActive={false} so labels paint immediately — this test asserts the
// expected value labels are actually rendered as SVG text.
import { describe, it, expect, vi } from 'vitest';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

// jsdom has no layout engine / ResizeObserver, so force ResponsiveContainer to a
// fixed size. This is the only mock — the charts themselves are the real thing.
vi.mock('recharts', async (orig) => {
  const actual = (await orig()) as Record<string, unknown>;
  const RC = actual.ResponsiveContainer as React.ComponentType<Record<string, unknown>>;
  return {
    ...actual,
    ResponsiveContainer: (props: Record<string, unknown>) =>
      React.createElement(RC, {
        ...props,
        width: 640,
        height: props.height || 320,
        initialDimension: { width: 640, height: props.height || 320 },
      }),
  };
});

async function renderStep(dir: string, step: number): Promise<string[]> {
  const Mod = (await import(`../src/components/${dir}/StickyVisualization.tsx`)).default;
  const host = document.createElement('div');
  document.body.appendChild(host);
  const root = createRoot(host);
  await act(async () => {
    root.render(React.createElement(Mod, { step, locale: 'en' }));
  });
  await act(async () => {
    await new Promise((r) => setTimeout(r, 30));
  });
  const texts = Array.from(host.querySelectorAll('.recharts-label-list text')).map((n) =>
    (n.textContent || '').trim(),
  );
  act(() => root.unmount());
  host.remove();
  return texts.filter(Boolean);
}

// Steps that contain a Recharts chart with value labels, and a sample label that
// must appear in the rendered SVG.
const cases: Array<[string, number, string]> = [
  ['sidewalk-data', 0, 'Missing'], // donut slice labels
  ['sidewalk-data', 1, '37%'], // grouped bar value labels
  ['sidewalk-data', 2, '71%'],
  ['sidewalk-data', 3, '66%'],
  ['eviction-data', 1, '2,100+'], // hardest-hit neighborhoods
  ['eviction-data', 3, '$31.3M'], // rental assistance budget
  ['campaign-finance-data', 0, '$8.5M'], // outside spending
  ['campaign-finance-data', 1, '$905K'], // top donors
];

describe('data-story visualizations render their value labels', () => {
  for (const [dir, step, sample] of cases) {
    it(`${dir} step ${step} shows "${sample}"`, async () => {
      const labels = await renderStep(dir, step);
      expect(labels.length).toBeGreaterThan(0);
      expect(labels).toContain(sample);
    });
  }
});
