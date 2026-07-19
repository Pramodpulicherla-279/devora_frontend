/* Problem: Critical Connections (Bridges)
 * 2D animated: a bridge is an edge whose removal disconnects the graph — cycle edges are safe,
 * the lone link between clusters is not. Toggle removing each to see why. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const N = { A: [120, 90], B: [120, 220], C: [250, 155], D: [420, 155], E: [545, 90], F: [545, 220] };
const EDGES = [['A', 'B'], ['A', 'C'], ['B', 'C'], ['C', 'D'], ['D', 'E'], ['D', 'F'], ['E', 'F']];
const BRIDGE = ['C', 'D'];
export default function AgraphCriticalConnectionsVisualization() {
  const [removed, setRemoved] = useState(null);   // index of removed edge
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setRemoved(r => (r == null ? 3 : r === 3 ? 0 : null)), 2.4, auto);
  const isBridgeRemoved = removed === 3;
  return (
    <Stage2D title="Critical Connections (Bridges)" subtitle="Two triangles joined by one edge. Remove a cycle edge and everything stays reachable — the cycle offers a detour. Remove C–D and the network splits: that edge is a BRIDGE."
      accent={isBridgeRemoved ? '#f85149' : '#58a6ff'} viewBox="0 0 640 290"
      controls={<><button className={`dsa2d-btn ${removed == null ? 'dsa2d-btn--on' : ''}`} onClick={() => setRemoved(null)}>intact</button><button className={`dsa2d-btn ${removed === 0 ? 'dsa2d-btn--on' : ''}`} onClick={() => setRemoved(0)}>cut A–B (cycle edge)</button><button className={`dsa2d-btn ${removed === 3 ? 'dsa2d-btn--on' : ''}`} onClick={() => setRemoved(3)}>cut C–D (bridge)</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={isBridgeRemoved
        ? <>With C–D gone, {'{A,B,C}'} and {'{D,E,F}'} can't reach each other — C–D is the graph's only bridge. <strong>Tarjan's bridge algorithm</strong> finds all bridges in one DFS: an edge (u,v) is a bridge iff v's subtree can't reach back above u (low[v] &gt; disc[u]). O(V+E).</>
        : removed === 0
          ? <>A–B removed, yet A still reaches B through C — the triangle's redundancy absorbs the cut. Edges on a cycle are never bridges; that's exactly what low-link values detect.</>
          : <>In network terms: bridges are single points of failure (the one cable between data centres). The interview asks you to find them all — brute-force removal is O(E·(V+E)); Tarjan's DFS does it in one pass.</>}>
      {EDGES.map(([a, b], k) => {
        const cut = removed === k;
        const isBridge = a === BRIDGE[0] && b === BRIDGE[1];
        const [x1, y1] = N[a], [x2, y2] = N[b];
        return <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} stroke={cut ? '#f85149' : isBridge ? '#f0a35e' : '#6e7681'} strokeWidth={isBridge && !cut ? 4 : 2.5} strokeDasharray={cut ? '5 6' : 'none'} opacity={cut ? 0.35 : 1} className={isBridge && !cut ? 'dsa2d-pulse' : ''} style={{ transition: 'opacity .3s, stroke .3s' }} />;
      })}
      {Object.entries(N).map(([id, [x, y]]) => {
        const leftSide = ['A', 'B', 'C'].includes(id);
        const isolated = isBridgeRemoved && !leftSide;
        return (
          <g key={id}>
            <circle cx={x} cy={y} r="21" fill={isolated ? 'rgba(248,81,73,.14)' : 'rgba(88,166,255,.14)'} stroke={isolated ? '#f85149' : '#58a6ff'} strokeWidth="2.5" style={{ transition: 'fill .3s, stroke .3s' }} />
            <text x={x} y={y + 5} fill="#e6edf3" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{id}</text>
          </g>
        );
      })}
      <text x="320" y="280" fill={isBridgeRemoved ? '#f85149' : '#8b949e'} fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{isBridgeRemoved ? '✗ network split in two — C–D was critical' : 'orange = the bridge (no detour exists around it)'}</text>
    </Stage2D>
  );
}
