/* Lesson: Priority Queues — A Sneak Peek Before We Cover Heaps
 * 2D animated: items leave a priority queue by priority, not arrival order. Each step removes
 * the highest-priority (lowest number) item. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const ITEMS = [
  { v: 'email', p: 4 }, { v: 'alarm', p: 1 }, { v: 'backup', p: 5 }, { v: 'alert', p: 2 }, { v: 'log', p: 3 },
];
export default function SqPriorityQueueVisualization() {
  const [removed, setRemoved] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setRemoved(v => (v > ITEMS.length ? 0 : v + 1)), 1.1, auto);
  // order of removal = ascending priority
  const order = [...ITEMS].sort((a, b) => a.p - b.p);
  const goneSet = new Set(order.slice(0, Math.min(removed, ITEMS.length)).map(x => x.v));
  const nextOut = order[Math.min(removed, ITEMS.length - 1)];
  const CW = 96, gap = 12;
  const startX = 320 - (ITEMS.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Priority Queue"
      subtitle="A priority queue serves items by importance, not by arrival. Dequeue always returns the highest-priority element — here, the smallest priority number."
      accent="#f0883e"
      viewBox="0 0 640 230"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setRemoved(v => (v > ITEMS.length ? 0 : v + 1))}>dequeue best</button>
          <button className="dsa2d-btn" onClick={() => setRemoved(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{removed > ITEMS.length ? 'empty' : `next out: ${nextOut.v} (p=${nextOut.p})`}</span>
        </>
      }
      legend={<>Items keep their arrival positions, but dequeue jumps to the most urgent one. A naive implementation scans all items each time (O(n)); a <strong>heap</strong> (next chapter) does it in <strong>O(log n)</strong>. Used in Dijkstra's algorithm, task schedulers, and event simulations.</>}
    >
      {ITEMS.map((it, k) => {
        const gone = goneSet.has(it.v);
        const isNext = !gone && nextOut && it.v === nextOut.v && removed <= ITEMS.length;
        return (
          <g key={k} style={{ opacity: gone ? 0.2 : 1, transition: 'opacity .4s' }}>
            <rect x={startX + k * (CW + gap)} y="86" width={CW} height="58" rx="10"
              fill={isNext ? 'rgba(240,136,62,.25)' : '#161b22'} stroke={isNext ? '#f0883e' : '#30363d'} strokeWidth="2" className={isNext ? 'dsa2d-pulse' : ''} />
            <text x={startX + k * (CW + gap) + CW / 2} y="112" fill="#e6edf3" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{it.v}</text>
            <text x={startX + k * (CW + gap) + CW / 2} y="132" fill={it.p <= 2 ? '#f0883e' : '#8b949e'} fontSize="12" textAnchor="middle" fontFamily="Consolas">priority {it.p}</text>
            {isNext && <text x={startX + k * (CW + gap) + CW / 2} y="78" fill="#f0883e" fontSize="12" textAnchor="middle" fontFamily="Consolas">↓ next out</text>}
          </g>
        );
      })}
      <text x="320" y="180" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">removal order by priority: alarm → alert → log → email → backup</text>
    </Stage2D>
  );
}
