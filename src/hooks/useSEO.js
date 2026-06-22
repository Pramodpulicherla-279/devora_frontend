// src/hooks/useSEO.js
//
// DEPRECATED — no-op.
//
// SEO meta (title, description, canonical, Open Graph, Twitter) and JSON-LD are
// now provided by React Router v7 route `meta` exports in src/routes/*.jsx.
// Those render into the prerendered HTML at build time AND update on client-side
// navigation via <Meta/> in src/root.jsx — so this hook is no longer needed.
//
// It is kept as a no-op so existing `useSEO(...)` calls in screen components
// don't break. Calls can be removed at leisure; their arguments are ignored.
export function useSEO() {
  /* intentionally empty — see note above */
}
