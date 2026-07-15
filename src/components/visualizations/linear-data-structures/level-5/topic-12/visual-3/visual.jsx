/* Problem: LRU Cache
 * 2D animated: a fixed-capacity cache. A hash map gives O(1) lookup; a doubly linked list keeps
 * usage order. Every access moves an item to the front; a full cache evicts the back. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

// capacity 2. order[0] = most recently used
const OPS = [
  { order: [1], note: 'put(1)' },
  { order: [2, 1], note: 'put(2)' },
  { order: [1, 2], note: 'get(1) → move 1 to front' },
  { order: [3, 1], note: 'put(3) → cache full, evict 2 (LRU)' },
  { order: [3, 1], note: 'get(2) → miss (was evicted)' },
];
export default function HtLruCacheVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % OPS.length), 1.6, auto);
  const { order, note } = OPS[i];
  const CW = 90, gap = 30;
  const startX = 320 - (2 * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="LRU Cache"
      subtitle="Least-Recently-Used cache with O(1) get and put. A hash map finds nodes instantly; a doubly linked list orders them by recency so eviction is also O(1)."
      accent="#a78bfa"
      viewBox="0 0 640 230"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v + 1) % OPS.length)}>next op</button>
          <button className="dsa2d-btn" onClick={() => setI(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{note} · capacity 2</span>
        </>
      }
      legend={<>The combo is the trick: the <strong>hash map</strong> maps key → node for O(1) access, and the <strong>doubly linked list</strong> maintains most-recent → least-recent order. On access, unlink and re-insert at the front; when full, drop the tail — all <strong>O(1)</strong>.</>}
    >
      <text x={startX - 20} y="90" fill="#56d364" fontSize="12" textAnchor="end" fontFamily="Consolas">MRU</text>
      {order.map((key, k) => (
        <g key={k} className="dsa2d-fade">
          <rect x={startX + k * (CW + gap)} y="60" width={CW} height="56" rx="10" fill={k === 0 ? 'rgba(167,139,250,.28)' : '#161b22'} stroke={k === 0 ? '#a78bfa' : '#7c6bb0'} strokeWidth="2" className={k === 0 ? 'dsa2d-pop' : ''} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
          <text x={startX + k * (CW + gap) + CW / 2} y="94" fill="#e6edf3" fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">key {key}</text>
          {k < order.length - 1 && <line x1={startX + k * (CW + gap) + CW} y1="88" x2={startX + k * (CW + gap) + CW + gap} y2="88" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#lru)" />}
        </g>
      ))}
      <text x={startX + order.length * (CW + gap) - gap + 6} y="90" fill="#f0883e" fontSize="12" fontFamily="Consolas">LRU (evict)</text>
      <text x="320" y="164" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">front = most recently used · back = first to be evicted</text>
      <text x="320" y="192" fill="#c9bdf5" fontSize="13" textAnchor="middle" fontFamily="Consolas">{note}</text>
      <defs><marker id="lru" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><polygon points="0,0 7,3 0,6" fill="#a78bfa" /></marker></defs>
    </Stage2D>
  );
}
