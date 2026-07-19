/* Lesson: What Is an Array, Really? Memory, Indexing, and Contiguous Storage
 * 2D animated: cells sit back-to-back in memory with real addresses. Accessing index i is
 * one arithmetic jump: base + i × size. The pointer lands instantly. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const VALS = [42, 7, 99, 13, 5, 88];
const BASE = 1000, SIZE = 8;
export default function ArrMemoryVisualization() {
  const [i, setI] = useState(3);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % VALS.length), 1.1, auto);
  const CW = 74, gap = 6;
  const startX = 320 - (VALS.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="An Array Is Contiguous Memory"
      subtitle="Array elements are stored back-to-back in one block. Because the cells are equal-sized and adjacent, the computer computes any element's address directly."
      accent="#58a6ff"
      viewBox="0 0 640 240"
      controls={
        <>
          <div className="dsa2d-group"><span className="dsa2d-label">index i = {i}</span><input className="dsa2d-slider" type="range" min="0" max={VALS.length - 1} value={i} onChange={e => setI(+e.target.value)} /></div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">addr = {BASE} + {i}×{SIZE} = {BASE + i * SIZE}</span>
        </>
      }
      legend={<>The address formula <code>base + i × item_size</code> means the computer never "searches" for element <code>i</code> — it jumps straight there. That's why array indexing is <strong>O(1)</strong>. The trade-off: the whole block must be contiguous, so growing it can mean relocating everything.</>}
    >
      {VALS.map((v, k) => {
        const on = k === i;
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="70" width={CW} height="56" rx="8" fill={on ? 'rgba(88,166,255,.2)' : '#161b22'} stroke={on ? '#58a6ff' : '#30363d'} strokeWidth="2" className={on ? 'dsa2d-pulse' : ''} />
            <text x={startX + k * (CW + gap) + CW / 2} y="105" fill="#e6edf3" fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
            <text x={startX + k * (CW + gap) + CW / 2} y="62" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">[{k}]</text>
            <text x={startX + k * (CW + gap) + CW / 2} y="144" fill={on ? '#79c0ff' : '#8b949e'} fontSize="11" textAnchor="middle" fontFamily="Consolas">{BASE + k * SIZE}</text>
          </g>
        );
      })}
      <text x={startX} y="176" fill="#8b949e" fontSize="11" fontFamily="system-ui">↑ memory addresses (bytes)</text>
      <g style={{ transform: `translate(${startX + i * (CW + gap) + CW / 2}px, 44px)`, transition: 'transform .4s cubic-bezier(.4,1.3,.5,1)' }}>
        <polygon points="-9,-15 9,-15 0,0" fill="#58a6ff" />
      </g>
      <text x="320" y="212" fill="#c9d1d9" fontSize="13" textAnchor="middle" fontFamily="Consolas">one jump → O(1) access</text>
    </Stage2D>
  );
}
