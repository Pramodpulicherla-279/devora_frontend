/* Lesson: Traversing a Linked List From Head to Tail
 * 2D animated: a "current" pointer walks the chain, following each node's next reference until
 * it reaches None. There's no random jump — you must step through every node. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const VALS = [5, 8, 12, 3, 9];
export default function LlTraversalVisualization() {
  const [cur, setCur] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setCur(v => (v > VALS.length ? 0 : v + 1)), 0.8, auto);
  const NW = 84, gap = 30;
  const startX = 320 - (VALS.length * (NW + gap) - gap) / 2;
  const atEnd = cur >= VALS.length;

  return (
    <Stage2D
      title="Traversing a Linked List"
      subtitle="Start at the head and repeatedly follow next until you hit None. Unlike an array, you can't jump to index i — you walk there link by link."
      accent="#58a6ff"
      viewBox="0 0 640 220"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setCur(v => (v > VALS.length ? 0 : v + 1))}>current = current.next</button>
          <button className="dsa2d-btn" onClick={() => setCur(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{atEnd ? 'current = None → stop' : `visiting ${VALS[cur]}`}</span>
        </>
      }
      legend={<>The pattern: <code>cur = head; while cur: visit(cur); cur = cur.next</code>. Traversal is <strong>O(n)</strong> — same as an array — but each step is a pointer hop, not an index. Reaching the k-th node costs k steps, which is why indexed access is O(n) here.</>}
    >
      {VALS.map((v, k) => {
        const x = startX + k * (NW + gap);
        const on = k === cur && !atEnd;
        const visited = k < cur;
        return (
          <g key={k}>
            <rect x={x} y="86" width={NW} height="52" rx="8"
              fill={on ? 'rgba(88,166,255,.25)' : visited ? 'rgba(88,166,255,.08)' : '#161b22'}
              stroke={on ? '#58a6ff' : visited ? '#3d5a80' : '#30363d'} strokeWidth="2" className={on ? 'dsa2d-pulse' : ''} />
            <text x={x + NW / 2} y="119" fill={visited && !on ? '#6b7785' : '#e6edf3'} fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
            {k < VALS.length - 1
              ? <line x1={x + NW} y1="112" x2={x + NW + gap} y2="112" stroke="#58a6ff" strokeWidth="2" markerEnd="url(#a3)" />
              : <text x={x + NW + gap - 6} y="117" fill="#6b7785" fontSize="13" fontFamily="Consolas">None</text>}
          </g>
        );
      })}
      {!atEnd && <g style={{ transform: `translate(${startX + cur * (NW + gap) + NW / 2}px, 60px)`, transition: 'transform .3s' }}>
        <polygon points="-8,-14 8,-14 0,0" fill="#58a6ff" /><text y="-18" fill="#58a6ff" fontSize="12" textAnchor="middle" fontFamily="Consolas">current</text>
      </g>}
      <defs><marker id="a3" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><polygon points="0,0 7,3 0,6" fill="#58a6ff" /></marker></defs>
    </Stage2D>
  );
}
