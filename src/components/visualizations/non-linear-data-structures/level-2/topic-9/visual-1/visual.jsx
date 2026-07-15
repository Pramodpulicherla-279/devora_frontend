/* Lesson: Priority Queues — Heaps With a Purpose
 * 2D animated: a heap-backed priority queue. Each pop returns the highest-priority item
 * (smallest key) in O(log n), unlike a naive O(n) scan. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const POS = [[320, 50], [210, 120], [430, 120], [150, 186], [270, 186]];
const EDGES = [[0, 1], [0, 2], [1, 3], [1, 4]];
// (priority, task) min-heap by priority
const SNAPS = [
  { v: [[1, 'alarm'], [3, 'email'], [2, 'alert'], [5, 'backup'], [4, 'log']], out: null, note: 'min-heap ordered by priority' },
  { v: [[2, 'alert'], [3, 'email'], [4, 'log'], [5, 'backup']], out: 'alarm (1)', note: 'pop → alarm, reheapify' },
  { v: [[3, 'email'], [5, 'backup'], [4, 'log']], out: 'alert (2)', note: 'pop → alert' },
  { v: [[4, 'log'], [5, 'backup']], out: 'email (3)', note: 'pop → email' },
];
export default function HeapPriorityQueueVisualization() {
  const [s, setS] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setS(v => (v + 1) % SNAPS.length), 1.6, auto);
  const { v, out, note } = SNAPS[s];

  return (
    <Stage2D
      title="Priority Queue = Heap With a Job"
      subtitle="A priority queue always serves the most urgent item next. Back it with a heap and every insert/extract is O(log n) — no linear scan."
      accent="#f0883e"
      viewBox="0 0 640 260"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setS(v => (v + 1) % SNAPS.length)}>pop highest</button>
          <button className="dsa2d-btn" onClick={() => setS(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{out ? `served: ${out}` : note}</span>
        </>
      }
      legend={<>Store <code>(priority, item)</code> tuples in a min-heap; the root is always the most urgent. Insert and extract are <strong>O(log n)</strong>, versus O(n) for scanning a list each time. This is the engine behind Dijkstra's, A*, event simulation, and OS schedulers.</>}
    >
      {EDGES.filter(([x, y]) => x < v.length && y < v.length).map(([x, y], k) => <line key={k} x1={POS[x][0]} y1={POS[x][1]} x2={POS[y][0]} y2={POS[y][1]} stroke="#30363d" strokeWidth="2" />)}
      {v.map(([pri, task], k) => {
        const isRoot = k === 0;
        return (
          <g key={k} className="dsa2d-fade">
            <circle cx={POS[k][0]} cy={POS[k][1]} r="27" fill={isRoot ? 'rgba(240,136,62,.3)' : '#161b22'} stroke={isRoot ? '#f0883e' : '#7c6bb0'} strokeWidth="2" className={isRoot ? 'dsa2d-pulse' : ''} />
            <text x={POS[k][0]} y={POS[k][1] - 2} fill="#e6edf3" fontSize="11" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{task}</text>
            <text x={POS[k][0]} y={POS[k][1] + 12} fill={isRoot ? '#f8c088' : '#8b949e'} fontSize="11" textAnchor="middle" fontFamily="Consolas">p{pri}</text>
          </g>
        );
      })}
      <text x="320" y="238" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">root (orange) = next to be served · lowest priority number wins</text>
    </Stage2D>
  );
}
