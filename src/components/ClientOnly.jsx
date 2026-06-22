// src/components/ClientOnly.jsx
// Renders its children only in the browser, never during the SSG/Node build.
//
// Why: components that touch the DOM, `window`, WebGL (Three.js / @react-three),
// or browser-only libs (Sandpack) crash when React renders them to a string at
// build time. Wrapping them in <ClientOnly> makes the server emit `fallback`
// (or nothing) and lets the real component mount after hydration.
//
// Uses useSyncExternalStore so the server snapshot (false) and the first client
// render (false → then true) line up — no hydration mismatch warnings.
import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,   // client snapshot
    () => false,  // server snapshot
  );
}

export default function ClientOnly({ children, fallback = null }) {
  const hydrated = useHydrated();
  if (!hydrated) return fallback;
  return typeof children === 'function' ? children() : children;
}
