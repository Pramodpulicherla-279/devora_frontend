/* Lesson: Depth-First Traversal Recap — Recursive vs Iterative
 * 2D animated: DFS dives deep before backtracking. Shown iteratively with an explicit STACK
 * (the same stack recursion uses implicitly). Preorder visiting sequence. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const P = { 50: [320, 40], 30: [200, 100], 70: [440, 100], 20: [130, 160], 40: [265, 160], 60: [385, 160], 80: [510, 160] };
const EDGES = [[50, 30], [50, 70], [30, 20], [30, 40], [70, 60], [70, 80]];
const CH = { 50: [30, 70], 30: [20, 40], 70: [60, 80] };
function dfsState(steps) {
  const stack = [50], visited = [];
  for (let s = 0; s < steps; s++) { if (!stack.length) break; const n = stack.pop(); visited.push(n); (CH[n] || []).slice().reverse().forEach(c => stack.push(c)); }
  return { stack, visited };
}
export default function TreeDfsVisualization() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setStep(v => (v >= 7 ? 0 : v + 1)), 0.85, auto);
  const { stack, visited } = dfsState(step);

  return (
    <Stage2D
      title="DFS: Recursive vs Iterative"
      subtitle="Depth-first goes as deep as possible, then backtracks. Recursion uses the call stack; the iterative version uses an explicit stack — same LIFO behaviour."
      accent="#a78bfa"
      viewBox="0 0 640 250"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setStep(v => (v >= 7 ? 0 : v + 1))}>next</button>
          <button className="dsa2d-btn" onClick={() => setStep(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">visited: {visited.join(', ') || '—'}</span>
        </>
      }
      legend={<>DFS with a <strong>stack</strong> (LIFO) dives down one branch fully before the next: 50 · 30 · 20 · 40 · 70 · 60 · 80 (preorder). Recursive DFS is the same, using the call stack implicitly — elegant but risks stack overflow on very deep trees, where the iterative version is safer. Both are O(n).</>}
    >
      {EDGES.map(([a, b], k) => <line key={k} x1={P[a][0]} y1={P[a][1]} x2={P[b][0]} y2={P[b][1]} stroke="#30363d" strokeWidth="2" />)}
      {Object.entries(P).map(([val, [x, y]]) => {
        const v = +val;
        const isVisited = visited.includes(v);
        const inStack = stack.includes(v);
        const isCur = visited[visited.length - 1] === v && step > 0;
        return (
          <g key={val}>
            <circle cx={x} cy={y} r="21" fill={isCur ? 'rgba(167,139,250,.35)' : isVisited ? 'rgba(167,139,250,.12)' : inStack ? 'rgba(255,212,59,.15)' : '#161b22'} stroke={isCur ? '#a78bfa' : isVisited ? '#7c6bb0' : inStack ? '#ffd43b' : '#7c6bb0'} strokeWidth="2" className={isCur ? 'dsa2d-pulse' : ''} />
            <text x={x} y={y + 5} fill="#e6edf3" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{val}</text>
          </g>
        );
      })}
      {/* stack (grows right) */}
      <text x="60" y="212" fill="#8b949e" fontSize="12" fontFamily="Consolas">stack:</text>
      {stack.map((v, k) => (
        <g key={k} className="dsa2d-fade">
          <rect x={120 + k * 50} y="196" width="42" height="30" rx="6" fill="rgba(255,212,59,.14)" stroke="#ffd43b" strokeWidth="1.5" />
          <text x={141 + k * 50} y="216" fill="#ffd43b" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
        </g>
      ))}
      {stack.length > 0 && <text x={120 + (stack.length - 1) * 50 + 21} y="190" fill="#ffd43b" fontSize="11" textAnchor="middle" fontFamily="Consolas">top</text>}
    </Stage2D>
  );
}
