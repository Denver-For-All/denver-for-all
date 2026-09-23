import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { load } from 'js-yaml';

const POLICIES_DIR = join(__dirname, '..', 'src', 'content', 'policies');

interface SmartGoal {
  goal: string;
  goalEs: string;
  metric: string;
  metricEs: string;
  baseline: string;
  baselineEs: string;
  target: string;
  targetEs: string;
  deadline: string;
  owner: string;
  ownerEs: string;
  precedent: string;
  precedentEs: string;
  source: string;
}

const REQUIRED_FIELDS: (keyof SmartGoal)[] = [
  'goal',
  'goalEs',
  'metric',
  'metricEs',
  'baseline',
  'baselineEs',
  'target',
  'targetEs',
  'deadline',
  'owner',
  'ownerEs',
  'precedent',
  'precedentEs',
  'source',
];

// Targets must be in the future relative to when they were last reviewed, and near enough
// that the people setting them can still be held accountable.
const MAX_HORIZON_YEARS = 10;

function readFrontmatter(file: string): Record<string, unknown> {
  const content = readFileSync(join(POLICIES_DIR, file), 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) throw new Error(`${file} has no frontmatter`);
  return load(match[1]) as Record<string, unknown>;
}

describe('SMART policy goals', () => {
  const policyFiles = readdirSync(POLICIES_DIR).filter((f) => f.endsWith('.md'));

  for (const file of policyFiles) {
    describe(file, () => {
      const fm = readFrontmatter(file);
      const goals = (fm.smartGoals ?? []) as SmartGoal[];
      const reviewed = String(fm.goalsReviewed ?? '');

      it('has at least three SMART goals and a review date', () => {
        expect(goals.length).toBeGreaterThanOrEqual(3);
        expect(reviewed).toMatch(/^20\d{2}-(0[1-9]|1[0-2])$/);
      });

      it('fills every SMART field', () => {
        for (const goal of goals) {
          for (const field of REQUIRED_FIELDS) {
            const value = goal[field];
            expect(
              typeof value === 'string' && value.trim().length > 0,
              `"${goal.goal}" is missing ${field}`,
            ).toBe(true);
          }
        }
      });

      it('dates every baseline (measurable)', () => {
        for (const goal of goals) {
          expect(goal.baseline, `baseline for "${goal.goal}" needs a year`).toMatch(/\b20\d{2}\b/);
          expect(goal.source, `source for "${goal.goal}" needs a year`).toMatch(/\b(19|20)\d{2}\b/);
        }
      });

      it('sets deadlines after the review date and within the accountability horizon (time-bound)', () => {
        const reviewedYear = Number(reviewed.slice(0, 4));
        for (const goal of goals) {
          expect(goal.deadline, `deadline for "${goal.goal}"`).toMatch(
            /^20\d{2}(-(0[1-9]|1[0-2]))?$/,
          );
          expect(goal.deadline > reviewed, `"${goal.goal}" deadline is already past`).toBe(true);
          expect(Number(goal.deadline.slice(0, 4)) - reviewedYear).toBeLessThanOrEqual(
            MAX_HORIZON_YEARS,
          );
        }
      });

      it('does not repeat a goal', () => {
        const titles = goals.map((g) => g.goal);
        expect(new Set(titles).size).toBe(titles.length);
      });
    });
  }
});
