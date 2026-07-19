/* Lesson: Collision Resolution — Chaining vs Open Addressing
 * 2D animated: toggle two strategies for the same colliding keys. Chaining stores a linked list
 * per bucket; open addressing probes to the next free slot. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const SIZE = 6;
export default function HtCollisionResolutionVisualization() {
  const [mode, setMode] = useState('chaining');
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setMode(m => m === 'chaining' ? 'open' : 'chaining'), 2.4, auto);
  // three keys all hash to bucket 2
  const CW = 74, gap = 8;
  const startX = 320 - (SIZE * (CW + gap) - gap) / 2;
  const H = 2;                                    // collision bucket
  const keys = ['A', 'B', 'C'];

  return (
    <Stage2D
      title="Chaining vs Open Addressing"
      subtitle="Two ways to handle a collision. Chaining keeps a list of entries in each bucket. Open addressing keeps one entry per slot and probes elsewhere when full."
      accent="#a78bfa"
      viewBox="0 0 640 250"
      controls={
        <>
          <button className={`dsa2d-btn ${mode === 'chaining' ? 'dsa2d-btn--on' : ''}`} onClick={() => setMode('chaining')}>chaining</button>
          <button className={`dsa2d-btn ${mode === 'open' ? 'dsa2d-btn--on' : ''}`} onClick={() => setMode('open')}>open addressing</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={mode === 'chaining'
        ? <><strong>Chaining:</strong> each bucket points to a linked list. Colliding keys are appended — simple, and it degrades gracefully. Cost: extra pointers and worse cache locality.</>
        : <><strong>Open addressing:</strong> everything lives in the array itself. On a collision, probe the next slot (linear probing) until an empty one is found. Cache-friendly, but clustering can hurt, and it needs resizing before it fills up.</>}
    >
      {Array.from({ length: SIZE }).map((_, k) => {
        // open addressing places A@2, B@3, C@4 (probe forward)
        const openOccupant = mode === 'open' ? (k === 2 ? 'A' : k === 3 ? 'B' : k === 4 ? 'C' : null) : (k === H ? 'A' : null);
        const isCollisionBucket = k === H;
        const probed = mode === 'open' && (k === 3 || k === 4);
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="60" width={CW} height="52" rx="8"
              fill={openOccupant ? (probed ? 'rgba(240,136,62,.16)' : 'rgba(167,139,250,.2)') : '#0d1117'}
              stroke={probed ? '#f0883e' : openOccupant || isCollisionBucket ? '#a78bfa' : '#30363d'} strokeWidth="2" />
            <text x={startX + k * (CW + gap) + CW / 2} y="52" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">[{k}]</text>
            {openOccupant && <text x={startX + k * (CW + gap) + CW / 2} y="92" fill="#e6edf3" fontSize="17" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{openOccupant}</text>}
          </g>
        );
      })}
      {/* chaining list under bucket 2 */}
      {mode === 'chaining' && keys.slice(1).map((kk, n) => {
        const x = startX + H * (CW + gap);
        const y = 130 + n * 40;
        return (
          <g key={kk} className="dsa2d-fade">
            <line x1={x + CW / 2} y1={y - 18} x2={x + CW / 2} y2={y} stroke="#a78bfa" strokeWidth="2" markerEnd="url(#ah)" />
            <rect x={x} y={y} width={CW} height="30" rx="6" fill="rgba(167,139,250,.14)" stroke="#a78bfa" strokeWidth="1.5" />
            <text x={x + CW / 2} y={y + 21} fill="#c9bdf5" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{kk}</text>
          </g>
        );
      })}
      <text x="320" y="234" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">
        {mode === 'chaining' ? 'A, B, C chained in bucket 2' : 'A stays in 2; B and C probe forward to 3 and 4'}
      </text>
      <defs><marker id="ah" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><polygon points="0,0 7,3 0,6" fill="#a78bfa" /></marker></defs>
    </Stage2D>
  );
}
