/* Problem: Find the Maximum Product of Two Elements
 * 2D animated: scan once, tracking the two largest values. Their product is the answer — no
 * need to sort or check all pairs. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const NUMS = [3, 7, 2, 9, 5, 8];
export default function ArrMaxProductVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v >= NUMS.length ? 0 : v + 1)), 0.8, auto);
  // top two among first i
  const seen = NUMS.slice(0, i).sort((a, b) => b - a);
  const [m1, m2] = [seen[0] ?? 0, seen[1] ?? 0];
  const done = i >= NUMS.length;
  const CW = 62, gap = 10;
  const startX = 320 - (NUMS.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Maximum Product of Two Elements"
      subtitle="Sorting works but is O(n log n). Instead, sweep once and remember the two biggest values — their product is the maximum."
      accent="#56d364"
      viewBox="0 0 640 220"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v >= NUMS.length ? 0 : v + 1))}>scan</button>
          <button className="dsa2d-btn" onClick={() => setI(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">top2 = {m1}, {m2} · product = {m1 * m2}</span>
        </>
      }
      legend={<>Track <code>max1 ≥ max2</code> as you scan: each new value either becomes the new max1 (pushing the old one to max2) or maybe the new max2. One pass → <strong>O(n)</strong> time, <strong>O(1)</strong> space, and the product is <code>max1 × max2</code>.</>}
    >
      {NUMS.map((v, k) => {
        const scanned = k < i, cur = k === i && !done;
        const isTop = (v === m1 || v === m2) && scanned && NUMS.slice(0, i).filter(x => x === v).length && [m1, m2].includes(v);
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="60" width={CW} height="54" rx="8"
              fill={isTop ? 'rgba(86,211,100,.28)' : cur ? 'rgba(88,166,255,.22)' : scanned ? '#161b22' : '#0d1117'}
              stroke={isTop ? '#56d364' : cur ? '#58a6ff' : scanned ? '#6e7681' : '#30363d'} strokeWidth="2" className={cur ? 'dsa2d-pulse' : ''} />
            <text x={startX + k * (CW + gap) + CW / 2} y="93" fill="#e6edf3" fontSize="19" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
          </g>
        );
      })}
      <text x="320" y="150" fill="#8b949e" fontSize="13" textAnchor="middle" fontFamily="Consolas">largest two so far: <tspan fill="#7ee787" fontWeight="700">{m1}</tspan> and <tspan fill="#7ee787" fontWeight="700">{m2}</tspan></text>
      {done && <text x="320" y="184" fill="#56d364" fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">max product = {m1} × {m2} = {m1 * m2}</text>}
    </Stage2D>
  );
}
