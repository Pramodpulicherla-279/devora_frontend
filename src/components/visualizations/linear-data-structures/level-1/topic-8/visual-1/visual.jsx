/* Lesson: Rotating an Array — Three Approaches Compared
 * 2D animated: rotate right by k using the REVERSAL trick — reverse all, reverse first k,
 * reverse the rest. Steps through each phase. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const BASE = [1, 2, 3, 4, 5, 6, 7];
const K = 3;
const rev = (a, i, j) => { a = [...a]; while (i < j) { [a[i], a[j]] = [a[j], a[i]]; i++; j--; } return a; };
const PHASES = [
  { arr: BASE, label: 'original', hi: [] },
  { arr: rev(BASE, 0, BASE.length - 1), label: 'reverse whole array', hi: BASE.map((_, i) => i) },
  { arr: rev(rev(BASE, 0, BASE.length - 1), 0, K - 1), label: `reverse first k=${K}`, hi: [0, 1, 2] },
  { arr: rev(rev(rev(BASE, 0, BASE.length - 1), 0, K - 1), K, BASE.length - 1), label: 'reverse the rest → rotated!', hi: [3, 4, 5, 6] },
];
export default function ArrRotateVisualization() {
  const [p, setP] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setP(v => (v + 1) % PHASES.length), 1.4, auto);
  const phase = PHASES[p];
  const CW = 60, gap = 8;
  const startX = 320 - (BASE.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Rotate an Array by k (Reversal Trick)"
      subtitle="Rotating right by k means moving the last k elements to the front. The slick O(1)-space way: reverse the whole array, then reverse each part back."
      accent="#f0883e"
      viewBox="0 0 640 230"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setP(v => (v + 1) % PHASES.length)}>next phase</button>
          <button className="dsa2d-btn" onClick={() => setP(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">phase {p + 1}/4 · {phase.label}</span>
        </>
      }
      legend={<>Three ways to rotate: (1) copy into a new array with shifted indices — O(n) space; (2) rotate one step k times — O(n·k) time; (3) the <strong>reversal trick</strong> shown here — <strong>O(n)</strong> time, <strong>O(1)</strong> space. Reverse-all then reverse-the-two-parts lands every element in its rotated spot.</>}
    >
      {phase.arr.map((v, k) => {
        const hot = phase.hi.includes(k);
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="80" width={CW} height="54" rx="8"
              fill={hot ? 'rgba(240,136,62,.22)' : '#161b22'} stroke={hot ? '#f0883e' : '#30363d'} strokeWidth="2"
              className={hot ? 'dsa2d-pop' : ''} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
            <text x={startX + k * (CW + gap) + CW / 2} y="114" fill="#e6edf3" fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
          </g>
        );
      })}
      <text x="320" y="64" fill="#c9d1d9" fontSize="14" textAnchor="middle" fontFamily="Consolas">{phase.label}</text>
      <text x="320" y="172" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">
        {p === 3 ? 'result: [5,6,7,1,2,3,4] — last 3 moved to front' : 'orange = the section being reversed this phase'}
      </text>
    </Stage2D>
  );
}
