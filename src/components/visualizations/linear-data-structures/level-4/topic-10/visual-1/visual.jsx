/* Lesson: Double-Ended Queues (Deques) and When to Use Them
 * 2D animated: a deque generalizes both a stack and a queue. Use one end for both push/pop and
 * it's a stack (LIFO); use opposite ends and it's a queue (FIFO). */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function SqDequeUsesVisualization() {
  const [mode, setMode] = useState('stack');
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setMode(m => m === 'stack' ? 'queue' : 'stack'), 2.3, auto);
  const items = ['A', 'B', 'C', 'D'];
  const CW = 66, gap = 10;
  const startX = 320 - (items.length * (CW + gap) - gap) / 2;
  // stack: in at right, out at right. queue: in at right, out at left.
  const inEnd = 'right';
  const outEnd = mode === 'stack' ? 'right' : 'left';

  return (
    <Stage2D
      title="Deque: One Structure, Many Roles"
      subtitle="A double-ended queue supports insert and remove at BOTH ends. Restrict which ends you use and it becomes a stack or a queue on demand."
      accent="#a78bfa"
      viewBox="0 0 640 230"
      controls={
        <>
          <button className={`dsa2d-btn ${mode === 'stack' ? 'dsa2d-btn--on' : ''}`} onClick={() => setMode('stack')}>use as stack</button>
          <button className={`dsa2d-btn ${mode === 'queue' ? 'dsa2d-btn--on' : ''}`} onClick={() => setMode('queue')}>use as queue</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{mode === 'stack' ? 'LIFO — in & out at the same end' : 'FIFO — in and out at opposite ends'}</span>
        </>
      }
      legend={mode === 'stack'
        ? <>Add and remove at the <strong>same end</strong> → <strong>stack</strong> (LIFO). A deque can do this in O(1).</>
        : <>Add at one end, remove at the other → <strong>queue</strong> (FIFO), O(1) both ends. Because a deque does all four operations efficiently, it's also ideal for sliding-window maximums and undo/redo with a size cap.</>}
    >
      {items.map((v, k) => (
        <g key={k}>
          <rect x={startX + k * (CW + gap)} y="86" width={CW} height="54" rx="9" fill="#161b22" stroke="#a78bfa" strokeWidth="2" />
          <text x={startX + k * (CW + gap) + CW / 2} y="120" fill="#e6edf3" fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
        </g>
      ))}
      {/* in arrow (right) */}
      <g style={{ transition: 'opacity .3s' }}>
        <text x={startX + items.length * (CW + gap) + 10} y="104" fill="#56d364" fontSize="12" fontFamily="Consolas">in</text>
        <line x1={startX + items.length * (CW + gap) + 40} y1="113" x2={startX + items.length * (CW + gap) + 8} y2="113" stroke="#56d364" strokeWidth="2" markerEnd="url(#ad)" />
      </g>
      {/* out arrow */}
      {outEnd === 'right'
        ? <g><text x={startX + items.length * (CW + gap) + 10} y="132" fill="#f0883e" fontSize="12" fontFamily="Consolas">out</text><line x1={startX + items.length * (CW + gap) + 8} y1="140" x2={startX + items.length * (CW + gap) + 40} y2="140" stroke="#f0883e" strokeWidth="2" markerEnd="url(#ado)" /></g>
        : <g><text x={startX - 44} y="118" fill="#f0883e" fontSize="12" fontFamily="Consolas">out</text><line x1={startX - 8} y1="126" x2={startX - 40} y2="126" stroke="#f0883e" strokeWidth="2" markerEnd="url(#ado)" /></g>}
      <text x="320" y="180" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">{mode === 'stack' ? 'both green(in) & orange(out) on the right → stack' : 'in on the right, out on the left → queue'}</text>
      <defs>
        <marker id="ad" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><polygon points="0,0 7,3 0,6" fill="#56d364" /></marker>
        <marker id="ado" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><polygon points="0,0 7,3 0,6" fill="#f0883e" /></marker>
      </defs>
    </Stage2D>
  );
}
