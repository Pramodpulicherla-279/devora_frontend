/* Lesson: What Is a Graph? Nodes, Edges, and Real-World Networks
 * 2D animated: a network of vertices and edges draws in; hover any node to light up its
 * direct connections. Shows that a graph is just "things + relationships". */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';
import { GNODES, GADJ, GEDGES, nodeById } from '../../../../_dsa-shared/graphData';

export default function GraphIntroVisualization() {
  const [shown, setShown] = useState(1);
  const [hover, setHover] = useState(null);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setShown(v => (v >= GEDGES.length ? 1 : v + 1)), 0.6, auto);
  const nbrs = hover != null ? new Set(GADJ[hover]) : new Set();

  return (
    <Stage2D
      title="What Is a Graph?"
      subtitle="A graph is a set of vertices (nodes) connected by edges. Social networks, maps, and dependencies are all graphs — hover a node to see its neighbours."
      accent="#58a6ff"
      viewBox="0 0 640 340"
      controls={
        <>
          <div className="dsa2d-group"><span className="dsa2d-label">edges: {Math.min(shown, GEDGES.length)}/{GEDGES.length}</span><input className="dsa2d-slider" type="range" min="1" max={GEDGES.length} value={shown} onChange={e => setShown(+e.target.value)} /></div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{hover != null ? `${nodeById(hover).label} → {${GADJ[hover].map(i => nodeById(i).label).join(', ')}}` : `${GNODES.length} nodes, ${GEDGES.length} edges`}</span>
        </>
      }
      legend={<>Vertices hold data; edges are the relationships between them. This graph is <strong>undirected</strong> (edges go both ways) and <strong>connected</strong> (every node is reachable). A node's <em>degree</em> is its number of edges. Hover to highlight a vertex's adjacency list.</>}
    >
      {GEDGES.map(([a, b], i) => {
        const on = i < shown;
        const lit = hover != null && (a === hover || b === hover);
        const na = nodeById(a), nb = nodeById(b);
        return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke={lit ? '#58a6ff' : on ? '#30363d' : '#161b22'} strokeWidth={lit ? 3.5 : 2} style={{ transition: 'stroke .3s' }} />;
      })}
      {GNODES.map(n => {
        const lit = hover === n.id, isNbr = nbrs.has(n.id);
        return (
          <g key={n.id} onMouseEnter={() => setHover(n.id)} onMouseLeave={() => setHover(null)} style={{ cursor: 'pointer' }}>
            <circle cx={n.x} cy={n.y} r="22" fill={lit ? '#58a6ff' : isNbr ? 'rgba(88,166,255,.25)' : '#161b22'} stroke={lit || isNbr ? '#58a6ff' : '#8b949e'} strokeWidth="2.5" className={lit ? 'dsa2d-pulse' : ''} />
            <text x={n.x} y={n.y + 6} fill={lit ? '#0d1117' : '#e6edf3'} fontSize="17" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{n.label}</text>
          </g>
        );
      })}
    </Stage2D>
  );
}
