/* Problem: Course Schedule (Cycle Detection / Topological Sort)
 * 2D animated: can all courses be finished? Repeatedly take a course with no remaining
 * prerequisites (in-degree 0). If any remain stuck, there's a cycle → impossible. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const NODES = [{ id: 0, l: 'CS1', x: 90, y: 90 }, { id: 1, l: 'CS2', x: 260, y: 60 }, { id: 2, l: 'CS3', x: 260, y: 200 }, { id: 3, l: 'CS4', x: 430, y: 130 }];
const ADJ = { 0: [1, 2], 1: [3], 2: [3], 3: [] };   // acyclic → can finish
const EDGES = []; for (const a in ADJ) for (const b of ADJ[a]) EDGES.push([+a, b]);
const ORDER = [0, 1, 2, 3];

export default function GraphCourseScheduleVisualization() {
  const [n, setN] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setN(v => (v >= ORDER.length ? 0 : v + 1)), 1.0, auto);
  const taken = new Set(ORDER.slice(0, n));
  const indeg = id => { let d = 0; for (const a in ADJ) if (ADJ[a].includes(id) && !taken.has(+a)) d++; return d; };

  return (
    <Stage2D
      title="Course Schedule" subtitle="Courses have prerequisites (edges). You can finish them all only if the prerequisite graph has NO cycle. Kahn's algorithm removes courses with zero remaining prereqs one by one."
      accent="#58a6ff" viewBox="0 0 560 260"
      controls={<><button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setN(v => (v >= ORDER.length ? 0 : v + 1))}>take course</button><button className="dsa2d-btn" onClick={() => setN(0)}>↺</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{n >= ORDER.length ? 'all done → can finish ✓' : `taken ${n}/${ORDER.length}`}</span></>}
      legend={<>This is <strong>topological sort</strong>: take any course with in-degree 0, then decrement its dependents. If you can take all of them, the schedule works; if some stay blocked, a <strong>cycle</strong> makes it impossible (LeetCode "Course Schedule" returns False). Time <code>O(V+E)</code>.</>}
    >
      <defs><marker id="cs-arr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L9,3 L0,6 Z" fill="#6e7681" /></marker></defs>
      {EDGES.map(([a, b], k) => { const na = NODES[a], nb = NODES[b], gone = taken.has(a); const dx = nb.x - na.x, dy = nb.y - na.y, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len; return <line key={k} x1={na.x + ux * 26} y1={na.y + uy * 26} x2={nb.x - ux * 28} y2={nb.y - uy * 28} stroke={gone ? '#21262d' : '#6e7681'} strokeWidth="2.5" markerEnd="url(#cs-arr)" />; })}
      {NODES.map(nn => { const done = taken.has(nn.id), ready = !done && indeg(nn.id) === 0; return (
        <g key={nn.id}><circle cx={nn.x} cy={nn.y} r="24" fill={done ? 'rgba(86,211,100,.2)' : ready ? 'rgba(88,166,255,.18)' : '#161b22'} stroke={done ? '#56d364' : ready ? '#58a6ff' : '#8b949e'} strokeWidth="2.5" className={ORDER[n - 1] === nn.id ? 'dsa2d-pulse' : ''} /><text x={nn.x} y={nn.y + 5} fill="#e6edf3" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{nn.l}</text>{!done && <><circle cx={nn.x + 20} cy={nn.y - 20} r="10" fill={ready ? '#58a6ff' : '#30363d'} /><text x={nn.x + 20} y={nn.y - 16} fill={ready ? '#0d1117' : '#c9d1d9'} fontSize="11" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{indeg(nn.id)}</text></>}</g>); })}
      <text x="280" y="248" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">badge = remaining prerequisites · green = completed</text>
    </Stage2D>
  );
}
