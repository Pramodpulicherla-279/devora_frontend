// src/analytics.js
// Single source of truth for Firebase Analytics (GA4).
//
// Why this exists: GA4 used to initialise from an inline <script> in index.html
// (removed during SEO edits) and via firebase.js (only ever imported by the
// admin editor). So normal visitors were never tracked → GA showed 0 users.
// This module is imported once from main.jsx, so analytics initialises for
// every visitor, and it logs a page_view on each SPA route change.
import app from './firebase';
import { getAnalytics, isSupported, logEvent } from 'firebase/analytics';

let instance = null;
let initPromise = null;

/** Initialise GA4 once — browser-only and guarded against unsupported envs. */
export function initAnalytics() {
  if (typeof window === 'undefined') return Promise.resolve(null);
  if (!initPromise) {
    initPromise = isSupported()
      .then((ok) => (ok ? (instance = getAnalytics(app)) : null))
      .catch(() => null); // blocked / unsupported (ad-blockers etc.) — non-fatal
  }
  return initPromise;
}

/** Log a GA4 event; ensures analytics is initialised first. */
export function trackEvent(name, params = {}) {
  initAnalytics().then((a) => {
    if (!a) return;
    try {
      logEvent(a, name, params);
    } catch {
      /* non-fatal */
    }
  });
}

/** Log a page_view — call on every SPA route change. */
export function trackPageView(path) {
  if (typeof window === 'undefined') return;
  trackEvent('page_view', {
    page_path: path || window.location.pathname + window.location.search,
    page_location: window.location.href,
    page_title: document.title,
  });
}
