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

const SITE = 'Dev.EL';
const BASE = 'https://dev-el.co';

/**
 * Builds a React Router v7 `meta` descriptor array for a page.
 * Centralises title/description/canonical/OG/Twitter + optional JSON-LD so every
 * route emits a complete, consistent set of tags into the prerendered HTML.
 *
 * @param {object}        o
 * @param {string}        [o.title]       Page title (site name appended)
 * @param {string}        [o.description] Meta description (~155 chars)
 * @param {string}        [o.canonical]   Path only, e.g. "/course/html/intro"
 * @param {string}        [o.image]       Absolute OG image URL
 * @param {boolean}       [o.noindex]     true → noindex,nofollow
 * @param {Array|object}  [o.jsonLd]      Page-specific schema.org graph
 * @returns {Array} React Router meta descriptors
 */
export function buildMeta({ title, description, canonical, image, noindex = false, jsonLd = null } = {}) {
  const fullTitle = title
    ? `${title} | ${SITE}`
    : `${SITE} — Go from Beginner to Advanced Developer | Free Coding Courses`;
  const url = canonical ? `${BASE}${canonical}` : BASE;
  const img = image || `${BASE}/dev-el-logo-v2.png`;

  const tags = [
    { title: fullTitle },
    { name: 'description', content: description || '' },
    { name: 'robots', content: noindex ? 'noindex,nofollow' : 'index,follow,max-snippet:-1,max-image-preview:large' },
    { tagName: 'link', rel: 'canonical', href: url },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: description || '' },
    { property: 'og:url', content: url },
    { property: 'og:image', content: img },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: SITE },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: description || '' },
    { name: 'twitter:image', content: img },
  ];

  if (jsonLd) {
    tags.push({
      'script:ld+json': Array.isArray(jsonLd)
        ? { '@context': 'https://schema.org', '@graph': jsonLd }
        : jsonLd,
    });
  }

  return tags;
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
