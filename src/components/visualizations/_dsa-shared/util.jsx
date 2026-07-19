import { useEffect } from 'react';

/** Auto-advances a step function on an interval while `playing`. */
export function useAutoPlay(fn, seconds = 1.8, playing = true, deps = []) {
  useEffect(() => {
    if (!playing) return undefined;
    const id = setInterval(fn, seconds * 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, seconds, ...deps]);
}

/** Standard ▶/⏸ auto-demo toggle for the controls row. */
export function AutoButton({ playing, onToggle }) {
  return (
    <button className={`dsa2d-btn ${playing ? 'dsa2d-btn--on' : ''}`} onClick={onToggle}>
      {playing ? '⏸ auto' : '▶ auto'}
    </button>
  );
}
