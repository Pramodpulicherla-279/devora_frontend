/* Problem: Move All Zeros to the End
 * 2D animated: a write-pointer collects non-zero values in order; the rest are filled with
 * zeros. In place, stable, O(n). */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const INIT = [0, 4, 0, 7, 2, 0, 9];
// precompute state after processing read pointer up to r
function stateAt(r) {
  const a = [...INIT]; let w = 0;
  for (let read = 0; read < r; read++) { if (a[read] !== 0) { [a[w], a[read]] = [a[read], a[w]]; w++; } }
  return { a, w: Math.min(w, INIT.length) };
}
export default function ArrMoveZerosVisualization() {
  const [r, setR] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setR(v => (v > INIT.length ? 0 : v + 1)), 0.8, auto);
  const { a, w } = stateAt(Math.min(r, INIT.length));
  const done = r > INIT.length;
  const CW = 62, gap = 8;
  const startX = 320 - (INIT.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Move All Zeros to the End"
      subtitle="Keep a 'write' pointer for the next non-zero slot. Each non-zero value is swapped forward; zeros naturally drift to the back — no extra array."
      accent="#58a6ff"
      viewBox="0 0 640 220"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setR(v => (v > INIT.length ? 0 : v + 1))}>step</button>
          <button className="dsa2d-btn" onClick={() => setR(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{done ? 'done ✓' : `write ptr at index ${w}`}</span>
        </>
      }
      legend={<>Two pointers: <code>read</code> scans every element; <code>write</code> marks where the next non-zero goes. Swap when <code>read</code> hits a non-zero. Order of non-zeros is preserved (stable), it mutates in place → <strong>O(n)</strong> time, <strong>O(1)</strong> space.</>}
    >
      {a.map((v, k) => {
        const isWrite = k === w && !done;
        const zero = v === 0;
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="66" width={CW} height="54" rx="8"
              fill={isWrite ? 'rgba(88,166,255,.2)' : zero ? 'rgba(139,148,158,.1)' : 'rgba(86,211,100,.14)'}
              stroke={isWrite ? '#58a6ff' : zero ? '#484f58' : '#3fb950'} strokeWidth="2" className={isWrite ? 'dsa2d-pulse' : ''} />
            <text x={startX + k * (CW + gap) + CW / 2} y="99" fill={zero ? '#8b949e' : '#e6edf3'} fontSize="19" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
          </g>
        );
      })}
      {!done && w < INIT.length && <text x={startX + w * (CW + gap) + CW / 2} y="58" fill="#58a6ff" fontSize="12" textAnchor="middle" fontFamily="Consolas">write</text>}
      <text x="320" y="156" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">green = non-zeros packed to the front · grey = zeros pushed back</text>
      {done && <text x="320" y="184" fill="#56d364" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">[4, 7, 2, 9, 0, 0, 0]</text>}
    </Stage2D>
  );
}
