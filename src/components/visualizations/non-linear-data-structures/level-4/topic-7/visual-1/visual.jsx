/* Lesson: BFS vs DFS — Choosing the Right Traversal for the Problem
 * 2D animated: the same graph, toggled between BFS and DFS. Each node is badged with the
 * order it was visited, making the level-by-level vs dive-deep contrast obvious. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';
import { GNODES, GADJ, GEDGES, nodeById } from '../../../../_dsa-shared/graphData';

function order(start, dfs) {
  const visited = new Set([start]), out = [start];
  const bag = [start];
  while (bag.length) {
    const cur = dfs ? bag[bag.length - 1] : bag[0];
    const next = GADJ[cur].find(nb => !visited.has(nb));
    if (next != null) { visited.add(next); out.push(next); bag.push(next); }
    else { dfs ? bag.pop() : bag.shift(); }
  }
  return out;
}
const BFS = order(0, false), DFS = order(0, true);

export default function GraphBfsVsDfsVisualization() {
  const [dfs, setDfs] = useState(false);
  const [k, setK] = useState(1);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setK(v => (v >= 7 ? 1 : v + 1)), 0.7, auto);
  const seq = dfs ? DFS : BFS;
  const rank = id => { const idx = seq.indexOf(id); return idx < k ? idx + 1 : null; };

  return (
    <Stage2D
      title="BFS vs DFS"
      subtitle="Same graph, same start — but the visit order differs completely. BFS fans out level by level; DFS commits to one path and dives."
      accent={dfs ? '#a78bfa' : '#58a6ff'}
      viewBox="0 0 640 340"
      controls={
        <>
          <button className={`dsa2d-btn ${!dfs ? 'dsa2d-btn--on' : ''}`} onClick={() => { setDfs(false); setK(1); }}>BFS (queue)</button>
          <button className={`dsa2d-btn ${dfs ? 'dsa2d-btn--on' : ''}`} onClick={() => { setDfs(true); setK(1); }}>DFS (stack)</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">order: {seq.slice(0, k).map(i => nodeById(i).label).join(' → ')}</span>
        </>
      }
      legend={dfs
        ? <><strong>DFS</strong> ({DFS.map(i => nodeById(i).label).join('→')}): dives to the bottom of one branch first. Great for cycle detection, topological sort, path existence, and puzzles/backtracking.</>
        : <><strong>BFS</strong> ({BFS.map(i => nodeById(i).label).join('→')}): visits nodes nearest the start first. Use it for <strong>shortest paths</strong> in unweighted graphs, level counting, and "nearest" queries.</>}
    >
      {GEDGES.map(([a, b], i) => {
        const na = nodeById(a), nb = nodeById(b);
        const both = rank(a) && rank(b);
        return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke={both ? (dfs ? '#a78bfa' : '#58a6ff') : '#30363d'} strokeWidth={both ? 3 : 2} style={{ transition: 'stroke .3s' }} />;
      })}
      {GNODES.map(n => {
        const r = rank(n.id), accent = dfs ? '#a78bfa' : '#58a6ff';
        return (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r="21" fill={r ? `${dfs ? 'rgba(167,139,250,.3)' : 'rgba(88,166,255,.3)'}` : '#161b22'} stroke={r ? accent : '#8b949e'} strokeWidth="2.5" className={r === k ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s' }} />
            <text x={n.x} y={n.y + 6} fill="#e6edf3" fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{n.label}</text>
            {r && <g><circle cx={n.x + 18} cy={n.y - 18} r="11" fill={accent} /><text x={n.x + 18} y={n.y - 14} fill="#0d1117" fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{r}</text></g>}
          </g>
        );
      })}
      <text x="320" y="332" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">badges = the order each node was visited</text>
    </Stage2D>
  );
}
