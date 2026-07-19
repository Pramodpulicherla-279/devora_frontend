/* Lesson: The Fast and Slow Pointer Pattern
 * 2D animated: the happy-number example — repeated digit-square sums either reach 1 or loop.
 * Fast/slow pointers detect the loop without storing anything. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

// sequence for n=4 (unhappy): 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4 (cycle)
const SEQ = [4, 16, 37, 58, 89, 145, 42, 20];
const POS = SEQ.map((_, i) => {
  const a = (i / SEQ.length) * Math.PI * 2 - Math.PI / 2;
  return [320 + Math.cos(a) * 150, 145 + Math.sin(a) * 95];
});
const STEPS = [
  { s: 0, f: 0, log: 'slow = fast = 4' },
  { s: 1, f: 2, log: 'slow → 16 · fast →→ 37' },
  { s: 2, f: 4, log: 'slow → 37 · fast →→ 89' },
  { s: 3, f: 6, log: 'slow → 58 · fast →→ 42' },
  { s: 4, f: 0, log: 'slow → 89 · fast →→ 4 (lapped!)' },
  { s: 5, f: 2, log: 'slow → 145 · fast →→ 37' },
  { s: 6, f: 4, log: 'slow → 42 · fast →→ 89' },
  { s: 7, f: 6, log: 'slow → 20 · fast →→ 42' },
  { s: 0, f: 0, meet: true, log: 'they MEET at 4 → the sequence cycles → 4 is not happy' },
];
export default function PatFastSlowVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 1.5, auto);
  const st = STEPS[i];
  return (
    <Stage2D title="Fast & Slow Pointers, Generalized" subtitle="Any process that repeatedly applies a function — next pointer, digit-square sum, index jump — either terminates or enters a cycle. Two runners at different speeds expose the cycle with O(1) memory."
      accent="#6b8cff" viewBox="0 0 640 300"
      controls={<><button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v + 1) % STEPS.length)}>step</button><button className="dsa2d-btn" onClick={() => setI(0)}>↺</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{st.log}</span></>}
      legend={<>The same tortoise-and-hare you used on linked lists works on <em>any</em> iterated function: <strong>Happy Number</strong> (shown), <strong>Find the Duplicate</strong> (array as implicit linked list), circular arrays. If <code>slow == fast</code> before reaching a fixed point, there's a cycle.</>}>
      {SEQ.map((v, k) => {
        const [x2, y2] = POS[(k + 1) % SEQ.length];
        const [x1, y1] = POS[k];
        return <line key={'e' + k} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#30363d" strokeWidth="2" />;
      })}
      {SEQ.map((v, k) => {
        const [x, y] = POS[k];
        const isS = st.s === k, isF = st.f === k, meet = st.meet && isS;
        return (
          <g key={k}>
            <circle cx={x} cy={y} r="24" fill={meet ? 'rgba(86,211,100,.3)' : isS && isF ? 'rgba(240,163,94,.28)' : isS ? 'rgba(88,166,255,.25)' : isF ? 'rgba(240,163,94,.22)' : '#161b22'} stroke={meet ? '#56d364' : isS ? '#58a6ff' : isF ? '#f0a35e' : '#6e7681'} strokeWidth={isS || isF ? 3 : 2} className={meet ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s, stroke .3s' }} />
            <text x={x} y={y + 5} fill="#e6edf3" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
            {isS && <text x={x} y={y - 32} fill="#58a6ff" fontSize="11" textAnchor="middle" fontWeight="700" fontFamily="Consolas">🐢</text>}
            {isF && <text x={x + (isS ? 18 : 0)} y={y - 32} fill="#f0a35e" fontSize="11" textAnchor="middle" fontWeight="700" fontFamily="Consolas">🐇</text>}
          </g>
        );
      })}
      <text x="320" y="292" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">n → sum of squared digits: 4 → 16 → 37 → … → 20 → 4 (a hidden ring)</text>
    </Stage2D>
  );
}
