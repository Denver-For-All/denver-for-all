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
      'economy',
      'community',
    ]),
    icon: z.string(),
    order: z.number(),
    status: z.enum(['draft', 'published']).default('draft'),
    // Action readiness metadata
    actionTarget: z.enum(['mayor', 'state', 'congress', 'all']).default('mayor'),
    petition: z.object({
      url: z.string(),
      code: z.string(),
      title: z.string(),
      titleEs: z.string().optional(),
    }).optional(),
    grantProposal: z.string().optional(),
    hasFundingSources: z.boolean().default(false),
    councilChampion: z.string().optional(),
  }),
});

const grants = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    titleEs: z.string().optional(),
    summary: z.string(),
    policySlug: z.string(),
    grantProgram: z.string(),
    fundingAgency: z.string(),
    estimatedAmount: z.string(),
    deadline: z.string().optional(),
    status: z.enum(['draft', 'ready', 'submitted']).default('draft'),
  }),
});

export const collections = { policies, grants };
