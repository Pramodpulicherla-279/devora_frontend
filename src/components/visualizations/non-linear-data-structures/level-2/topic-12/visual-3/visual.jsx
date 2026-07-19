/* Problem: Merge K Sorted Lists
 * 2D animated: a min-heap holds the current head of each sorted list. Repeatedly pop the
 * smallest into the output and push that list's next element. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const LISTS = [[1, 4, 7], [2, 5, 8], [3, 6, 9]];
// deterministic merge sequence for the output
const MERGED = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export default function HeapMergeKVisualization() {
  const [n, setN] = useState(0);   // how many popped into output
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setN(v => (v >= MERGED.length ? 0 : v + 1)), 0.7, auto);
  // pointers per list = how many taken from each
  const taken = [0, 0, 0];
  MERGED.slice(0, n).forEach(val => { for (let l = 0; l < 3; l++) { const idx = LISTS[l].indexOf(val); if (idx !== -1 && idx === taken[l]) { taken[l]++; break; } } });
  const heads = LISTS.map((L, l) => taken[l] < L.length ? L[taken[l]] : null).filter(h => h !== null);
  const done = n >= MERGED.length;
  const CW = 46, gap = 6;

  return (
    <Stage2D
      title="Merge K Sorted Lists"
      subtitle="A min-heap of the K list heads always reveals the global smallest. Pop it to the output, then push the next value from that same list."
      accent="#56d364"
      viewBox="0 0 640 260"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setN(v => (v >= MERGED.length ? 0 : v + 1))}>pop min</button>
          <button className="dsa2d-btn" onClick={() => setN(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{done ? 'merged ✓' : `next heads: {${heads.join(',')}}`}</span>
        </>
      }
      legend={<>The heap only ever holds <strong>K</strong> elements (one per list), so each of the N total values is pushed/popped once → <strong>O(N log K)</strong>. Far better than concatenating and sorting O(N log N), and it streams the output in order.</>}
    >
      {LISTS.map((L, l) => (
        <g key={l}>
          <text x="60" y={54 + l * 48} fill="#8b949e" fontSize="12" fontFamily="Consolas">L{l + 1}</text>
          {L.map((v, k) => {
            const consumed = k < taken[l];
            const isHead = k === taken[l];
            return (
              <g key={k}>
                <rect x={110 + k * (CW + gap)} y={34 + l * 48} width={CW} height="38" rx="6"
                  fill={isHead ? 'rgba(86,211,100,.22)' : consumed ? '#0d1117' : '#161b22'}
                  stroke={isHead ? '#56d364' : consumed ? '#21262d' : '#30363d'} strokeWidth="2" style={{ opacity: consumed ? 0.35 : 1 }} />
                <text x={110 + k * (CW + gap) + CW / 2} y={59 + l * 48} fill={consumed ? '#8b949e' : '#e6edf3'} fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
              </g>
            );
          })}
        </g>
      ))}
      {/* output */}
      <text x="60" y="204" fill="#8b949e" fontSize="12" fontFamily="Consolas">merged:</text>
      {MERGED.slice(0, n).map((v, k) => (
        <g key={k} className="dsa2d-fade">
          <rect x={130 + k * (CW - 2)} y="184" width={CW - 6} height="36" rx="6" fill="rgba(86,211,100,.16)" stroke="#3fb950" strokeWidth="1.5" />
          <text x={130 + k * (CW - 2) + (CW - 6) / 2} y="208" fill="#7ee787" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
        </g>
      ))}
    </Stage2D>
  );
}
