/**
 * Mark each policy's References list so it can be styled as an APA 7
 * reference list (hanging indent, URLs that wrap).
 *
 * Adds class="references" to the first list after a References heading in any
 * supported language. REFERENCE_HEADINGS is shared with
 * scripts/translate/sync-references.mjs; the first entry per locale is canonical.
 */
export const REFERENCE_HEADINGS = {
  en: ['References'],
  es: ['Referencias'],
  vi: ['Tài Liệu Tham Khảo', 'Tham Khảo'],
  zh: ['参考文献', '参考资料'],
  ar: ['المراجع'],
  am: ['ማጣቀሻዎች', 'ዋቢዎች', 'ዋቢ'],
};

const ALL_HEADINGS = new Set(Object.values(REFERENCE_HEADINGS).flat());

function text(node) {
  if (node.type === 'text') return node.value;
  return (node.children ?? []).map(text).join('');
}

export default function rehypeReferences() {
  return (tree) => {
    let pending = false;
    for (const node of tree.children) {
      if (node.type !== 'element') continue;
      if (node.tagName === 'h2') {
        pending = ALL_HEADINGS.has(text(node).trim());
      } else if (pending && (node.tagName === 'ul' || node.tagName === 'ol')) {
        const existing = node.properties.className ?? [];
        node.properties.className = [...existing, 'references'];
        // Citations stay in the source's script, so let each entry pick its own direction
        // (Latin-script sources render LTR even on the RTL Arabic pages).
        for (const item of node.children) {
          if (item.type === 'element' && item.tagName === 'li') item.properties.dir = 'auto';
        }
        pending = false;
      }
    }
  };
}
