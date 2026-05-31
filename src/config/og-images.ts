import type { ImageMetadata } from 'astro';

// Single source of truth for the category artwork in src/assets/og/.
// These images serve double duty: on-page hero/thumbnail visuals (rendered
// through Astro's <Image> pipeline) and og:image social-share meta tags
// (optimized via getImage in Layout.astro).
const ogImages = import.meta.glob<{ default: ImageMetadata }>('../assets/og/*.png', {
  eager: true,
});

/**
 * Resolve a category key (e.g. "housing", "democracy") to its ImageMetadata.
 * Falls back to the default artwork for unknown keys.
 */
export function getOgImage(category: string | undefined): ImageMetadata {
  const entry = ogImages[`../assets/og/${category}.png`] ?? ogImages['../assets/og/default.png'];
  return entry.default;
}
