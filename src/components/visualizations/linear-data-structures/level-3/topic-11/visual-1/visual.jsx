/* Lesson: Circular Linked Lists and Where They're Used
 * 2D animated: nodes arranged in a ring where the tail's next points back to the head. A
 * cursor loops forever, never hitting None. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const VALS = ['A', 'B', 'C', 'D', 'E'];
const CX = 320, CY = 130, R = 78;
const pos = i => ({ x: CX + R * Math.cos(-Math.PI / 2 + i * 2 * Math.PI / VALS.length), y: CY + R * Math.sin(-Math.PI / 2 + i * 2 * Math.PI / VALS.length) });
export default function LlCircularVisualization() {
  const [cur, setCur] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setCur(v => (v + 1) % VALS.length), 0.8, auto);

  return (
    <Stage2D
      title="Circular Linked List"
      subtitle="The last node points back to the first, forming a ring with no end. A cursor can loop around indefinitely — perfect for round-robin scheduling."
      accent="#a78bfa"
      viewBox="0 0 640 260"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setCur(v => (v + 1) % VALS.length)}>advance</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">at {VALS[cur]} → next {VALS[(cur + 1) % VALS.length]}</span>
        </>
      }
      legend={<>Instead of <code>tail.next = None</code>, a circular list sets <code>tail.next = head</code>. Uses: <strong>round-robin CPU scheduling</strong>, turn-taking games, circular buffers, and any playlist that loops. Careful — traversal needs a stop condition or it never ends.</>}
    >
      {/* edges */}
      {VALS.map((_, i) => {
        const a = pos(i), b = pos((i + 1) % VALS.length);
        const isBack = i === VALS.length - 1;
        // shorten to node edges
        const ang = Math.atan2(b.y - a.y, b.x - a.x);
        const x1 = a.x + 26 * Math.cos(ang), y1 = a.y + 26 * Math.sin(ang);
        const x2 = b.x - 30 * Math.cos(ang), y2 = b.y - 30 * Math.sin(ang);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={isBack ? '#f0883e' : '#a78bfa'} strokeWidth="2" strokeDasharray={isBack ? '5 3' : '0'} markerEnd={isBack ? 'url(#a11o)' : 'url(#a11)'} />;
      })}
      {VALS.map((v, i) => {
        const p = pos(i);
        const on = i === cur;
        return (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="24" fill={on ? 'rgba(167,139,250,.3)' : '#161b22'} stroke={on ? '#a78bfa' : '#7c6bb0'} strokeWidth="2" className={on ? 'dsa2d-pulse' : ''} />
            <text x={p.x} y={p.y + 6} fill="#e6edf3" fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
          </g>
        );
      })}
      <text x={CX} y={CY + 4} fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="Consolas">loops forever</text>
      <text x={CX + 90} y={CY - 60} fill="#f0883e" fontSize="11" fontFamily="Consolas">tail → head</text>
      <defs>
        <marker id="a11" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><polygon points="0,0 7,3 0,6" fill="#a78bfa" /></marker>
        <marker id="a11o" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><polygon points="0,0 7,3 0,6" fill="#f0883e" /></marker>
      </defs>
    </Stage2D>
  );
}
