/* Problem: Word Ladder (Shortest Transformation)
 * 2D animated: each word is a node; words one letter apart are connected. BFS from the start
 * word finds the SHORTEST chain to the target: hit → hot → dot → dog → cog. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

// levels of BFS from "hit" to "cog"
const NODES = [
  { id: 0, w: 'hit', x: 80, y: 130, lvl: 0 },
  { id: 1, w: 'hot', x: 210, y: 130, lvl: 1 },
  { id: 2, w: 'dot', x: 350, y: 80, lvl: 2 }, { id: 3, w: 'lot', x: 350, y: 190, lvl: 2 },
  { id: 4, w: 'dog', x: 480, y: 80, lvl: 3 }, { id: 5, w: 'log', x: 480, y: 190, lvl: 3 },
  { id: 6, w: 'cog', x: 600, y: 130, lvl: 4 },
];
const EDGES = [[0, 1], [1, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 6]];
const PATH = new Set([0, 1, 2, 4, 6]);   // one shortest path

export default function GraphWordLadderVisualization() {
  const [lvl, setLvl] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setLvl(v => (v >= 4 ? 0 : v + 1)), 1.1, auto);

  return (
    <Stage2D
      title="Word Ladder" subtitle="Transform one word into another by changing a single letter at a time, each step staying a real word. Model words as graph nodes and BFS outward — the first time you reach the target is the shortest ladder."
      accent="#f0883e" viewBox="0 0 680 260"
      controls={<><div className="dsa2d-group"><span className="dsa2d-label">BFS level: {lvl}</span><input className="dsa2d-slider" type="range" min="0" max="4" value={lvl} onChange={e => setLvl(+e.target.value)} /></div><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{lvl >= 4 ? '5 words → 4 steps' : `reached level ${lvl}`}</span></>}
      legend={<>Each BFS level = one transformation. Because BFS explores nearest-first, the level at which <code>cog</code> appears is the minimum number of steps. Path: <code>hit→hot→dot→dog→cog</code> (4 transformations). Building the neighbour graph dominates the cost.</>}
    >
      {EDGES.map(([a, b], k) => { const on = NODES[a].lvl <= lvl && NODES[b].lvl <= lvl; const inPath = PATH.has(a) && PATH.has(b); return <line key={k} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} stroke={on && inPath ? '#f0883e' : on ? '#4b4f58' : '#21262d'} strokeWidth={on && inPath ? 3.5 : 2} />; })}
      {NODES.map(nn => { const on = nn.lvl <= lvl; const isPath = PATH.has(nn.id) && on; const isTarget = nn.id === 6; return (
        <g key={nn.id} style={{ opacity: on ? 1 : 0.25, transition: 'opacity .3s' }}><circle cx={nn.x} cy={nn.y} r="26" fill={isTarget && on ? '#56d364' : isPath ? 'rgba(240,136,62,.25)' : '#161b22'} stroke={isTarget ? '#56d364' : isPath ? '#f0883e' : '#8b949e'} strokeWidth={isPath ? 3 : 2} className={nn.lvl === lvl ? 'dsa2d-pulse' : ''} /><text x={nn.x} y={nn.y + 5} fill={isTarget && on ? '#0d1117' : '#e6edf3'} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{nn.w}</text></g>); })}
      <text x="340" y="248" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">orange = one shortest ladder · each column is a BFS level</text>
    </Stage2D>
  );
}
