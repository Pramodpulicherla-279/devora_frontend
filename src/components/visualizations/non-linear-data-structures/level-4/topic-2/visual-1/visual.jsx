/* Lesson: Directed vs Undirected Graphs
 * 2D animated: toggle between an undirected graph (edges both ways) and a directed one
 * (arrows show one-way relationships). A moving pulse shows which way you can travel. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';
import { GNODES, GEDGES, nodeById } from '../../../../_dsa-shared/graphData';

export default function GraphDirectedVisualization() {
  const [directed, setDirected] = useState(false);
  const [t, setT] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setT(v => (v + 1) % 100), 0.04, auto);
  const prog = t / 100;

  return (
    <Stage2D
      title="Directed vs Undirected Graphs"
      subtitle="In an undirected graph an edge means a mutual link (A↔B). In a directed graph each edge is one-way (A→B) — like followers, web links, or task dependencies."
      accent="#a78bfa"
      viewBox="0 0 640 340"
      controls={
        <>
          <button className={`dsa2d-btn ${!directed ? 'dsa2d-btn--on' : ''}`} onClick={() => setDirected(false)}>undirected (A↔B)</button>
          <button className={`dsa2d-btn ${directed ? 'dsa2d-btn--on' : ''}`} onClick={() => setDirected(true)}>directed (A→B)</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={directed
        ? <>Each arrow points one way: you can go <code>A→B</code> but not necessarily back. Directed graphs (digraphs) model Twitter follows, hyperlinks, and prerequisites. An edge now has a <strong>source</strong> and a <strong>target</strong>.</>
        : <>Edges are symmetric — <code>A—B</code> means you can travel both directions, like friendships or two-way roads. The adjacency list stores each edge on <strong>both</strong> endpoints.</>}
    >
      <defs>
        <marker id="gd-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#a78bfa" /></marker>
      </defs>
      {GEDGES.map(([a, b], i) => {
        const na = nodeById(a), nb = nodeById(b);
        // shorten to node edge for arrowhead
        const dx = nb.x - na.x, dy = nb.y - na.y, len = Math.hypot(dx, dy);
        const ux = dx / len, uy = dy / len;
        const x2 = nb.x - ux * 24, y2 = na.y + (nb.y - na.y) - uy * 24;
        const px = na.x + dx * prog, py = na.y + dy * prog;
        return (
          <g key={i}>
            <line x1={na.x + ux * 24} y1={na.y + uy * 24} x2={x2} y2={nb.y - uy * 24} stroke="#4b3f72" strokeWidth="2.5" markerEnd={directed ? 'url(#gd-arrow)' : undefined} />
            <circle cx={px} cy={py} r="4" fill="#a78bfa" opacity="0.9" />
          </g>
        );
      })}
      {GNODES.map(n => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r="22" fill="#161b22" stroke="#a78bfa" strokeWidth="2.5" />
          <text x={n.x} y={n.y + 6} fill="#e6edf3" fontSize="17" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{n.label}</text>
        </g>
      ))}
      <text x="320" y="332" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">{directed ? 'purple dots flow only in the arrow direction' : 'purple dots flow both ways along each edge'}</text>
    </Stage2D>
  );
}
