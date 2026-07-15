/* Lesson: 2D Arrays and Matrices — Working With Lists of Lists
 * 2D animated: a grid you index by [row][col]. Under the hood it's still one flat block —
 * row-major order — so address = row × cols + col. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const ROWS = 3, COLS = 4;
export default function ArrMatrixVisualization() {
  const [idx, setIdx] = useState(6);             // flat index 0..11
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setIdx(v => (v + 1) % (ROWS * COLS)), 0.8, auto);
  const r = Math.floor(idx / COLS), c = idx % COLS;
  const CELL = 62, gap = 6;
  const gx = 130, gy = 40;

  return (
    <Stage2D
      title="2D Arrays & Matrices"
      subtitle="A matrix is a grid you access with two indices, matrix[row][col]. In memory it's laid out one row after another (row-major)."
      accent="#58a6ff"
      viewBox="0 0 640 260"
      controls={
        <>
          <div className="dsa2d-group"><span className="dsa2d-label">cell #{idx}</span><input className="dsa2d-slider" type="range" min="0" max={ROWS * COLS - 1} value={idx} onChange={e => setIdx(+e.target.value)} /></div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">m[{r}][{c}] → flat {r}×{COLS}+{c} = {idx}</span>
        </>
      }
      legend={<>Access is still <strong>O(1)</strong>: two indices collapse to one address via <code>row × num_cols + col</code>. Traversing the whole grid is <strong>O(rows × cols)</strong>. In Python a "2D array" is usually a list of lists — convenient, though rows aren't guaranteed adjacent in memory like a true matrix.</>}
    >
      {/* grid */}
      {Array.from({ length: ROWS }).map((_, ri) => Array.from({ length: COLS }).map((_, ci) => {
        const on = ri === r && ci === c;
        return (
          <g key={`${ri}-${ci}`}>
            <rect x={gx + ci * (CELL + gap)} y={gy + ri * (CELL + gap)} width={CELL} height={CELL} rx="7"
              fill={on ? 'rgba(88,166,255,.25)' : '#161b22'} stroke={on ? '#58a6ff' : '#30363d'} strokeWidth="2"
              className={on ? 'dsa2d-pulse' : ''} />
            <text x={gx + ci * (CELL + gap) + CELL / 2} y={gy + ri * (CELL + gap) + CELL / 2 + 5} fill={on ? '#79c0ff' : '#8b949e'} fontSize="13" textAnchor="middle" fontFamily="Consolas">{ri},{ci}</text>
          </g>
        );
      }))}
      {/* row/col labels */}
      {Array.from({ length: ROWS }).map((_, ri) => <text key={ri} x={gx - 16} y={gy + ri * (CELL + gap) + CELL / 2 + 5} fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="Consolas">{ri}</text>)}
      {Array.from({ length: COLS }).map((_, ci) => <text key={ci} x={gx + ci * (CELL + gap) + CELL / 2} y={gy - 8} fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="Consolas">{ci}</text>)}
      {/* flat memory strip */}
      <text x="130" y="222" fill="#8b949e" fontSize="11" fontFamily="system-ui">flat memory (row-major):</text>
      {Array.from({ length: ROWS * COLS }).map((_, k) => {
        const on = k === idx;
        return <rect key={k} x={130 + k * 30} y="230" width="26" height="20" rx="3" fill={on ? '#58a6ff' : '#21262d'} style={{ transition: 'fill .3s' }} />;
      })}
    </Stage2D>
  );
}
