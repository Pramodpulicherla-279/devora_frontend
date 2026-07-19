/* Problem: Course Schedule (Cycle Detection)
 * 2D animated: prerequisites as a digraph — Kahn's peeling works until a cycle survives with
 * no zero-in-degree course. Toggle a cycle edge to see both outcomes. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const N = { A: [110, 90], B: [320, 60], C: [530, 90], D: [320, 220] };
export default function AgraphCourseScheduleVisualization() {
  const [cyclic, setCyclic] = useState(false);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setCyclic(c => !c), 3.0, auto);
  const EDGES = cyclic ? [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'B']] : [['A', 'B'], ['B', 'C'], ['B', 'D']];
  const order = cyclic ? ['A'] : ['A', 'B', 'C', 'D'];
  const stuck = cyclic ? ['B', 'C', 'D'] : [];
  return (
    <Stage2D title="Course Schedule" subtitle="'Can all courses be finished?' = 'is the prerequisite graph a DAG?' Peel zero-in-degree courses (Kahn's). If everything peels, yes; if a knot of courses remains all waiting on each other — a cycle — no."
      accent={cyclic ? '#f85149' : '#56d364'} viewBox="0 0 640 290"
      controls={<><button className={`dsa2d-btn ${!cyclic ? 'dsa2d-btn--on' : ''}`} onClick={() => setCyclic(false)}>valid plan ✓</button><button className={`dsa2d-btn ${cyclic ? 'dsa2d-btn--on' : ''}`} onClick={() => setCyclic(true)}>add D→B (cycle) ✗</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={cyclic
        ? <>With D→B added, courses B, C, D each wait on another — no zero-in-degree course exists after A peels. Kahn's output has fewer than V courses → <strong>cycle → impossible</strong>. (Equivalently: DFS finds a grey→grey back edge.)</>
        : <>All prerequisites point forward: peel A, then B, then C and D — output counts V courses → <strong>schedulable</strong>, and the peel order (A, B, C, D) is a valid study plan. Course Schedule II just returns that order. <strong>O(V+E)</strong>.</>}>
      <defs><marker id="acs-arr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L9,3 L0,6 Z" fill="#6e7681" /></marker><marker id="acs-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L9,3 L0,6 Z" fill="#f85149" /></marker></defs>
      {EDGES.map(([a, b], k) => {
        const [x1, y1] = N[a], [x2, y2] = N[b];
        const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
        const isCycEdge = cyclic && ((a === 'B' && b === 'C') || (a === 'C' && b === 'D') || (a === 'D' && b === 'B'));
        return <line key={k} x1={x1 + ux * 26} y1={y1 + uy * 26} x2={x2 - ux * 28} y2={y2 - uy * 28} stroke={isCycEdge ? '#f85149' : '#6e7681'} strokeWidth={isCycEdge ? 3.5 : 2.5} markerEnd={isCycEdge ? 'url(#acs-red)' : 'url(#acs-arr)'} className={isCycEdge ? 'dsa2d-pulse' : ''} style={{ transition: 'stroke .3s' }} />;
      })}
      {Object.entries(N).map(([id, [x, y]]) => {
        const peeled = order.includes(id), isStuck = stuck.includes(id);
        return (
          <g key={id}>
            <circle cx={x} cy={y} r="24" fill={isStuck ? 'rgba(248,81,73,.16)' : peeled ? 'rgba(86,211,100,.2)' : '#161b22'} stroke={isStuck ? '#f85149' : peeled ? '#56d364' : '#8b949e'} strokeWidth="2.5" className={isStuck ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s' }} />
            <text x={x} y={y + 5} fill="#e6edf3" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">📚{id}</text>
            <text x={x} y={y + 42} fill={isStuck ? '#f85149' : peeled ? '#7ee787' : '#8b949e'} fontSize="11" textAnchor="middle" fontFamily="Consolas">{isStuck ? 'stuck' : peeled ? 'peeled #' + (order.indexOf(id) + 1) : ''}</text>
          </g>
        );
      })}
      <text x="320" y="282" fill={cyclic ? '#f85149' : '#56d364'} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{cyclic ? '✗ B→C→D→B all waiting on each other — impossible' : '✓ peel order A→B→C→D = a valid study plan'}</text>
    </Stage2D>
  );
}
