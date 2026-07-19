/* Lesson: Bellman-Ford — Handling Negative Edge Weights  [AlgoStage]
 * No greedy settling: relax EVERY edge, V−1 times. Slow but safe — negative edges are handled
 * because nothing is ever declared final until all passes finish. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const N = { S: [80, 150], A: [280, 60], B: [280, 240], C: [500, 150] };
const EDGES = [['S', 'A', 4], ['S', 'B', 5], ['A', 'B', -3], ['A', 'C', 6], ['B', 'C', 2]];
function buildFrames() {
  const f = []; const dist = { S: 0, A: Infinity, B: Infinity, C: Infinity };
  const fmt = d => d === Infinity ? '∞' : d;
  const snap = o => f.push(Object.assign({ dist: { ...dist } }, o));
  snap({ line: 2, log: 'dist[S]=0, others ∞ — no settling, ever' });
  const V = Object.keys(N).length;
  for (let pass = 1; pass <= V - 1; pass++) {
    let changed = false;
    snap({ line: 3, pass, log: `pass ${pass} of ${V - 1}: relax every edge` });
    for (const [u, v, w] of EDGES) {
      const cand = dist[u] + w;
      const better = dist[u] !== Infinity && cand < dist[v];
      snap({ line: 5, pass, edge: [u, v], log: `${u}→${v} (${w}): ${fmt(dist[u])}${w >= 0 ? '+' : ''}${w} = ${dist[u] === Infinity ? '∞' : cand} ${better ? '< ' + fmt(dist[v]) + ' → update' : '≥ ' + fmt(dist[v])}` });
      if (better) { dist[v] = cand; changed = true; snap({ line: 6, pass, edge: [u, v], improved: true, log: `dist[${v}] = ${cand}` }); }
    }
    if (!changed) { snap({ line: 7, pass, log: `pass ${pass}: nothing changed → converged early` }); break; }
  }
  snap({ line: 8, log: 'final: A=4, B=1 (via the −3 edge!), C=3', done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">bellman_ford</span>(edges, S):' },
  { n: 2, t: '    dist = {S: 0, others: <span class="kw">inf</span>}' },
  { n: 3, t: '    <span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(V - 1):' },
  { n: 4, t: '        <span class="kw">for</span> u, v, w <span class="kw">in</span> edges:' },
  { n: 5, t: '            <span class="kw">if</span> dist[u] + w < dist[v]:' },
  { n: 6, t: '                dist[v] = dist[u] + w' },
  { n: 7, t: '        <span class="st"># stop early if no change</span>' },
  { n: 8, t: '    <span class="kw">return</span> dist' },
];

export default function AgraphBellmanFordVisualization() {
  return (
    <AlgoStage
      title="Bellman-Ford"
      subtitle="Where Dijkstra commits, Bellman-Ford keeps an open mind: sweep all edges V−1 times, always willing to improve. That patience is what makes negative edges safe."
      accent="#f0a35e" viewBox="0 0 640 300"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'pass', type: 'int', prev: prev && prev.pass != null ? String(prev.pass) : '—', cur: fr.pass != null ? String(fr.pass) : '—' },
        { name: 'edge', type: 'str', prev: prev && prev.edge ? prev.edge.join('→') : '—', cur: fr.edge ? fr.edge.join('→') : '—' },
        { name: 'dist', type: 'map', prev: prev ? Object.entries(prev.dist).map(([k, v]) => k + ':' + (v === Infinity ? '∞' : v)).join(' ') : '', cur: Object.entries(fr.dist).map(([k, v]) => k + ':' + (v === Infinity ? '∞' : v)).join(' ') },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(dist\[[A-Z]\] = -?\d+|converged early|final:[^!]*)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Why V−1 passes? A shortest path uses at most V−1 edges, and each pass guarantees paths one edge longer are correct. Cost: <strong>O(V·E)</strong> — slower than Dijkstra, but it handles negative edges and (next lessons) even <em>detects</em> negative cycles. Note B ends at <strong>1</strong>, found through the −3 edge Dijkstra mishandled.</>}
      renderCanvas={fr => (
        <>
          <defs><marker id="abf-arr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L9,3 L0,6 Z" fill="var(--a-faint)" /></marker></defs>
          {EDGES.map(([a, b, w], k) => {
            const [x1, y1] = N[a], [x2, y2] = N[b];
            const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
            const hot = fr.edge && fr.edge[0] === a && fr.edge[1] === b;
            return (
              <g key={k}>
                <line x1={x1 + ux * 24} y1={y1 + uy * 24} x2={x2 - ux * 26} y2={y2 - uy * 26} stroke={hot ? (fr.improved ? 'var(--a-visited)' : 'var(--a-current)') : w < 0 ? '#f0883e' : 'var(--a-border)'} strokeWidth={hot ? 4 : 2.5} markerEnd="url(#abf-arr)" className={hot ? 'algo-pulse' : ''} style={{ transition: 'stroke .2s' }} />
                <circle cx={(x1 + x2) / 2} cy={(y1 + y2) / 2} r="12" fill="var(--a-code)" stroke={w < 0 ? '#f0883e' : 'var(--a-faint)'} strokeWidth="1.5" />
                <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 + 4} textAnchor="middle" style={{ font: '700 11px ui-monospace, monospace', fill: w < 0 ? '#f0883e' : 'var(--a-ink)' }}>{w}</text>
              </g>
            );
          })}
          {Object.entries(N).map(([id, [x, y]]) => (
            <g key={id}>
              <circle cx={x} cy={y} r="21" fill={fr.edge && fr.edge[1] === id ? 'var(--a-visited-soft)' : 'var(--a-surface-2)'} stroke={fr.edge && fr.edge[1] === id ? 'var(--a-visited)' : 'var(--a-faint)'} strokeWidth="2.5" style={{ transition: 'fill .2s' }} />
              <text x={x} y={y + 5} textAnchor="middle" style={{ font: '700 15px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{id}</text>
              <text x={x} y={y + 40} textAnchor="middle" style={{ font: '700 12px ui-monospace, monospace', fill: 'var(--algo-accent)' }}>{fr.dist[id] === Infinity ? '∞' : fr.dist[id]}</text>
            </g>
          ))}
        </>
      )}
    />
  );
}
