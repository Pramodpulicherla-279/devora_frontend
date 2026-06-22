// src/hooks/useSEO.js
// Drop-in SEO manager — no extra dependencies, concurrent-mode safe.
// Manages <title>, meta tags, canonical link, and JSON-LD per route.
// Cleans up dynamic JSON-LD on unmount (route change).
import { useEffect } from 'react';

const SITE   = 'Dev.EL';
const BASE   = 'https://dev-el.co';
const OG_IMG = `${BASE}/dev-el-logo-v2.png`;

/**
 * @param {object}        opts
 * @param {string}        opts.title       Page title (site name appended automatically)
 * @param {string}        opts.description 150-160 char meta description
 * @param {string}        opts.canonical   Path only — e.g. "/course/html/intro-to-html"
 * @param {string}       [opts.image]      Absolute OG image URL (defaults to logo)
 * @param {boolean}      [opts.noindex]    true → noindex,nofollow (profile / admin pages)
 * @param {Array|object} [opts.jsonLd]     schema.org graph array or single object
 */
export function useSEO({
  title,
  description,
  canonical,
  image,
  noindex = false,
  jsonLd  = null,
}) {
  const fullTitle    = title ? `${title} | ${SITE}` : `${SITE} — Go from Beginner to Advanced Developer | Free Courses`;
  const absCanonical = canonical ? `${BASE}${canonical}` : BASE;
  const absImage     = image || OG_IMG;

  useEffect(() => {
    // ── Title ──────────────────────────────────────────────────────────────
    document.title = fullTitle;

    // ── Standard meta ──────────────────────────────────────────────────────
    setMeta('name', 'description', description || '');
    setMeta(
      'name',
      'robots',
      noindex
        ? 'noindex,nofollow'
        : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1',
    );

    // ── Open Graph ─────────────────────────────────────────────────────────
    setMeta('property', 'og:title',       fullTitle);
    setMeta('property', 'og:description', description || '');
    setMeta('property', 'og:url',         absCanonical);
    setMeta('property', 'og:image',       absImage);
    setMeta('property', 'og:type',        'website');
    setMeta('property', 'og:site_name',   SITE);

    // ── Twitter / X ────────────────────────────────────────────────────────
    setMeta('name', 'twitter:card',        'summary_large_image');
    setMeta('name', 'twitter:title',       fullTitle);
    setMeta('name', 'twitter:description', description || '');
    setMeta('name', 'twitter:image',       absImage);

    // ── Canonical link ─────────────────────────────────────────────────────
    setLink('canonical', absCanonical);

    // ── JSON-LD structured data ────────────────────────────────────────────
    jsonLd ? injectLd(jsonLd) : removeLd();

    // Cleanup: remove dynamic JSON-LD when the route unmounts
    return () => removeLd();
  }, [fullTitle, description, absCanonical, absImage, noindex, jsonLd]); // eslint-disable-line react-hooks/exhaustive-deps
}

// ── DOM helpers ──────────────────────────────────────────────────────────────

function setMeta(attr, key, value) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function injectLd(data) {
  removeLd(); // always replace, never duplicate
  const script      = document.createElement('script');
  script.type       = 'application/ld+json';
  script.id         = '__ld__';
  script.textContent = JSON.stringify(
    Array.isArray(data)
      ? { '@context': 'https://schema.org', '@graph': data }
      : data,
  );
  document.head.appendChild(script);
}

function removeLd() {
  document.getElementById('__ld__')?.remove();
}
