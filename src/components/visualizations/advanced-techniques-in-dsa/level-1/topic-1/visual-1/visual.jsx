/* Lesson: What Is a Greedy Algorithm? Making the Best Choice Right Now
 * 2D animated: make change for 67¢ with US coins by always grabbing the biggest coin that
 * fits — the essence of greedy: best local choice, never reconsidered. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const COINS = [25, 10, 5, 1];
const TARGET = 67;
// precompute greedy picks: 25,25,10,5,1,1
const PICKS = []; { let r = TARGET; for (const c of COINS) { while (r >= c) { PICKS.push(c); r -= c; } } }
export default function GreedyIntroVisualization() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setStep(v => (v >= PICKS.length ? 0 : v + 1)), 0.9, auto);
  const taken = PICKS.slice(0, step);
  const remaining = TARGET - taken.reduce((a, b) => a + b, 0);
  return (
    <Stage2D title="Greedy: Best Choice Right Now" subtitle={`Make ${TARGET}¢ with the fewest coins. Greedy's rule is one line: repeatedly take the largest coin that fits. No look-ahead, no undo — and for US coins, it's optimal.`}
      accent="#f0a35e" viewBox="0 0 640 240"
      controls={<><button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setStep(v => (v >= PICKS.length ? 0 : v + 1))}>take coin</button><button className="dsa2d-btn" onClick={() => setStep(0)}>↺</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">remaining: {remaining}¢ · coins used: {taken.length}</span></>}
      legend={<>A greedy algorithm makes the <strong>locally best</strong> choice at each step and never revisits it. That makes it fast and simple — <code>O(n)</code>-ish with no search tree — but it's only <em>correct</em> when local-best provably leads to global-best. The next lessons show when that promise breaks.</>}>
      {/* coin options */}
      <text x="130" y="40" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">coins (largest first)</text>
      {COINS.map((c, k) => {
        const isNext = step < PICKS.length && PICKS[step] === c;
        return <g key={c}><circle cx={70 + k * 55} cy={78} r="24" fill={isNext ? 'rgba(240,163,94,.3)' : '#161b22'} stroke={isNext ? '#f0a35e' : '#8b949e'} strokeWidth={isNext ? 3 : 2} className={isNext ? 'dsa2d-pulse' : ''} /><text x={70 + k * 55} y={84} fill="#e6edf3" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{c}¢</text></g>;
      })}
      {/* taken pile */}
      <text x="470" y="40" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">taken so far</text>
      {taken.map((c, k) => <g key={k} className="dsa2d-fade"><circle cx={360 + (k % 6) * 48} cy={78 + Math.floor(k / 6) * 46} r="20" fill="rgba(86,211,100,.2)" stroke="#56d364" strokeWidth="2" /><text x={360 + (k % 6) * 48} y={84 + Math.floor(k / 6) * 46} fill="#7ee787" fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{c}</text></g>)}
      {/* progress bar */}
      <rect x="70" y="170" width="500" height="22" rx="7" fill="#161b22" />
      <rect x="70" y="170" width="500" height="22" rx="7" fill="#f0a35e" style={{ transform: `scaleX(${(TARGET - remaining) / TARGET})`, transformBox: 'fill-box', transformOrigin: 'left', transition: 'transform .3s' }} />
      <text x="320" y="216" fill={remaining === 0 ? '#56d364' : '#c9d1d9'} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{remaining === 0 ? `✓ ${TARGET}¢ in ${taken.length} coins — optimal here` : `${TARGET - remaining}¢ / ${TARGET}¢`}</text>
    </Stage2D>
  );
}
