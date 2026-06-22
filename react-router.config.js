// react-router.config.js — React Router v7 framework-mode config
//
// ssr: false  → we build a client SPA (Firebase serves static files; no Node server).
// prerender   → at BUILD time, render the listed routes to static HTML with their
//               loader data baked in. That HTML is what Googlebot indexes.
//
// During initial validation we prerender a small representative set so SSR crashes
// surface fast. Once the build is green, flip SSG_MAX to Infinity to prerender every
// course + lesson from the sitemap.
const SSG_MAX = Infinity; // prerender the whole site

const STATIC_PATHS = ['/', '/roadmaps'];

/** @type {import('@react-router/dev/config').Config} */
export default {
  appDirectory: 'src',
  // ssr:true so server loaders run at build and lesson CONTENT is baked into the
  // prerendered HTML (ssr:false only emits a shell + meta — content suspends).
  // Non-prerendered, client-only routes (profile/admin/track/reset) fall back to
  // the SPA shell; we deploy only build/client to Firebase (the server bundle is
  // unused for static hosting).
  ssr: true,

  async prerender() {
    let dynamic = [];
    try {
      const res = await fetch('https://devora-backend.onrender.com/sitemap.xml');
      const xml = await res.text();
      dynamic = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
        .map((m) => {
          try { return new URL(m[1]).pathname; } catch { return null; }
        })
        .filter(Boolean);
    } catch (e) {
      console.warn('[prerender] sitemap fetch failed; static paths only:', e.message);
    }

    // De-dupe, drop private/auth routes, keep only real GET pages
    const all = [...new Set([...STATIC_PATHS, ...dynamic])].filter(
      (p) => !/^\/(admin-dashboard|profile|reset-password)(\/|$)/.test(p),
    );

    const limited = all.slice(0, SSG_MAX);
    console.log(`[prerender] ${limited.length} of ${all.length} routes (SSG_MAX=${SSG_MAX})`);
    return limited;
  },
};
