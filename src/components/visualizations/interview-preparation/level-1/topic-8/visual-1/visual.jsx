/* Lesson: Tree and Graph Traversal as a Pattern, Not a One-Off Algorithm
 * 2D animated: one template, four containers — swap the frontier structure and the SAME loop
 * becomes BFS, DFS, Dijkstra, or Best-First. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const VARIANTS = [
  { t: 'Queue (FIFO)', algo: 'BFS', c: '#6b8cff', gives: 'level order · shortest path (unweighted)' },
  { t: 'Stack (LIFO)', algo: 'DFS', c: '#a78bfa', gives: 'cycle detection · topological sort · connectivity' },
  { t: 'Min-heap by distance', algo: "Dijkstra's", c: '#f0a35e', gives: 'shortest path with weights' },
  { t: 'Min-heap by heuristic', algo: 'Best-First / A*', c: '#4fce78', gives: 'guided pathfinding (games, maps)' },
];
export default function PatTraversalVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % VARIANTS.length), 2.2, auto);
  const v = VARIANTS[i];
  return (
    <Stage2D title="Traversal Is One Pattern" subtitle="Every traversal is the same loop: take a node from the frontier, mark it, add its unvisited neighbours. The ONLY difference is what data structure holds the frontier."
      accent={v.c} viewBox="0 0 640 280"
      controls={<>{VARIANTS.map((vv, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{vv.algo}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<>Memorise the skeleton once; then in an interview the decision collapses to one question: <strong>what should the frontier prioritise?</strong> Oldest (queue), newest (stack), cheapest so far (heap), or most promising (heuristic heap).</>}>
      <rect x="60" y="46" width="300" height="180" rx="12" fill="#0b0f15" stroke="#30363d" />
      {['frontier = {start}', 'while frontier:', '    node = frontier.take()', '    if seen: continue', '    mark(node)', '    frontier.add(neighbours)'].map((ln, k) => (
        <g key={k}>
          {k === 2 && <rect x="70" y={72 + k * 24 - 15} width="280" height="21" rx="4" fill={v.c + '22'} />}
          <text x="80" y={72 + k * 24} fill={k === 2 ? v.c : '#8b949e'} fontSize="13" fontFamily="Consolas" fontWeight={k === 2 ? '700' : '400'}>{ln}</text>
        </g>
      ))}
      <rect x="386" y="46" width="194" height="180" rx="12" fill={v.c + '10'} stroke={v.c} strokeWidth="2" />
      <text x="483" y="80" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">frontier =</text>
      <text x="483" y="112" fill={v.c} fontSize="17" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{v.t}</text>
      <text x="483" y="146" fill="#e6edf3" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">→ {v.algo}</text>
      <foreignObject x="396" y="158" width="174" height="60"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '11.5px system-ui', lineHeight: 1.4, textAlign: 'center' }}>{v.gives}</div></foreignObject>
      <text x="320" y="262" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">same loop · different container · different superpower</text>
    </Stage2D>
  );
}
