// src/utils/seoHelpers.js
// Utility helpers used by useSEO across all pages.

/**
 * Strips HTML tags and collapses whitespace to produce clean plain text.
 * Used to auto-generate meta descriptions from lesson HTML content.
 *
 * @param {string} html   Raw HTML string (e.g. lesson.content)
 * @param {number} maxLen Maximum character length (default 160)
 * @returns {string}      Plain-text excerpt, truncated with ellipsis if needed
 */
export function htmlToPlain(html = '', maxLen = 160) {
  if (!html) return '';

  // SSR-safe fallback (no document in Node.js)
  if (typeof document === 'undefined') {
    const plain = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return plain.length <= maxLen ? plain : plain.slice(0, maxLen - 1) + '…';
  }

  const div       = document.createElement('div');
  div.innerHTML   = html;
  const text      = (div.textContent || div.innerText || '').replace(/\s+/g, ' ').trim();
  return text.length <= maxLen ? text : text.slice(0, maxLen - 1) + '…';
}

/**
 * Converts a URL slug to a human-readable title.
 * Handles multi-word slugs including common abbreviations.
 *
 * Examples:
 *   "backend-nodejs-express" → "Backend Nodejs Express"
 *   "git-and-github"         → "Git and GitHub"  (special-cased below)
 *   "html"                   → "HTML"
 *
 * @param {string} slug URL slug
 * @returns {string}    Title-cased string
 */
export function slugToTitle(slug = '') {
  // Known overrides for accurate casing
  const overrides = {
    html:                    'HTML',
    css:                     'CSS',
    javascript:              'JavaScript',
    nodejs:                  'Node.js',
    'node.js':               'Node.js',
    mongodb:                 'MongoDB',
    sql:                     'SQL',
    'git-and-github':        'Git & GitHub',
    'terminal-command-line': 'Terminal / CLI',
    'backend-nodejs-express':'Backend (Node / Express)',
    'mern-stack':            'MERN Stack',
    'mean-stack':            'MEAN Stack',
  };

  const lower = slug.toLowerCase();
  if (overrides[lower]) return overrides[lower];

  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
