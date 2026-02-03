import { defineCollection, z } from 'astro:content';

const policies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    titleEs: z.string(),
    summary: z.string(),
    summaryEs: z.string(),
    category: z.enum([
      'housing',
      'labor',
      'climate',
      'health',
      'safety',
      'education',
      'immigration',
      'infrastructure',
      'justice',
      'democracy',
    ]),
    icon: z.string(),
    order: z.number(),
    status: z.enum(['draft', 'published']).default('draft'),
  }),
});

export const collections = { policies };
