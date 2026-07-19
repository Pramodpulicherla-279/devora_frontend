/* Lesson: The Two-Pointer Pattern, Revisited and Generalized
 * 2D animated: the three two-pointer shapes — converging ends, same-direction (read/write),
 * and parallel across two arrays. Cycle through them. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const SHAPES = [
  { t: 'Converging (ends → middle)', c: '#6b8cff', ex: 'pair-sum in sorted array · palindrome check · container with most water', l: 0, r: 7, dirL: '→', dirR: '←' },
  { t: 'Same direction (read / write)', c: '#4fce78', ex: 'move zeroes · dedupe sorted array · partition in place', l: 2, r: 5, dirL: '→', dirR: '→' },
  { t: 'Parallel (two sequences)', c: '#f0a35e', ex: 'merge two sorted arrays · compare version strings · intersection', l: 3, r: 4, dirL: '→', dirR: '→', two: true },
];
export default function PatTwoPointerVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % SHAPES.length), 2.4, auto);
  const s = SHAPES[i];
  const CW = 52, gap = 7, startX = (640 - (8 * (CW + gap) - gap)) / 2;
  const rowY = s.two ? [64, 128] : [86];
  return (
    <Stage2D title="Two Pointers, Generalized" subtitle="One pattern, three geometries. What stays constant: each pointer only ever moves forward, so the total work is O(n) — the pattern's whole reason to exist."
      accent={s.c} viewBox="0 0 640 260"
      controls={<>{SHAPES.map((sh, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{s.t}</span></>}
      legend={<><strong>{s.t}</strong> — used for: {s.ex}. Choosing the geometry is the real decision: sorted data pulls toward <em>converging</em>, in-place rearranging toward <em>read/write</em>, two inputs toward <em>parallel</em>. After that, the loop writes itself.</>}>
      {rowY.map((y, rowIdx) => (
        <g key={rowIdx}>
          {Array.from({ length: 8 }).map((_, k) => (
            <rect key={k} x={startX + k * (CW + gap)} y={y} width={CW} height="40" rx="7" fill="#161b22" stroke="#30363d" strokeWidth="1.5" />
          ))}
        </g>
      ))}
      {/* pointers */}
      {(() => {
        const py = s.two ? [rowY[0], rowY[1]] : [rowY[0], rowY[0]];
        return (
          <>
            <g className="dsa2d-pulse">
              <text x={startX + s.l * (CW + gap) + CW / 2} y={py[0] - 12} fill={s.c} fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">p1 {s.dirL}</text>
              <path d={`M${startX + s.l * (CW + gap) + CW / 2},${py[0] - 6} l-5,-8 l10,0 z`} fill={s.c} transform={`rotate(180 ${startX + s.l * (CW + gap) + CW / 2} ${py[0] - 10})`} />
            </g>
            <g className="dsa2d-pulse">
              <text x={startX + s.r * (CW + gap) + CW / 2} y={py[1] + 66} fill={s.c} fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">p2 {s.dirR}</text>
            </g>
          </>
        );
      })()}
      <text x="320" y={s.two ? 216 : 180} fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">{s.two ? 'two sequences, one pointer each — advance whichever is "behind"' : s.l === 0 ? 'pointers start at both ends and squeeze inward' : 'both march right: one reads every slot, one writes accepted values'}</text>
    </Stage2D>
  );
}
