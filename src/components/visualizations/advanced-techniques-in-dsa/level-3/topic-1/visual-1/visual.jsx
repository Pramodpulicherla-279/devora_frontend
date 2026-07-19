/* Lesson: Dijkstra's Algorithm — Shortest Path With Weights  [AlgoStage]
 * Full step-through: settle the closest unsettled node, relax its edges, repeat. Live distance
 * table, settled set, and console. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const N = { S: [80, 150], A: [250, 60], B: [250, 240], C: [430, 70], D: [430, 230] };
const EDGES = [['S', 'A', 2], ['S', 'B', 5], ['A', 'B', 1], ['A', 'C', 6], ['B', 'C', 2], ['C', 'D', 1], ['B', 'D', 8]];
const ADJ = {}; Object.keys(N).forEach(k => ADJ[k] = []);
EDGES.forEach(([a, b, w]) => { ADJ[a].push([b, w]); ADJ[b].push([a, w]); });

function buildFrames() {
  const f = []; const dist = { S: 0, A: Infinity, B: Infinity, C: Infinity, D: Infinity };
  const settled = new Set(); const parent = {};
  const fmt = d => d === Infinity ? '∞' : d;
  const snap = o => f.push(Object.assign({ dist: { ...dist }, settled: [...settled], parent: { ...parent } }, o));
  snap({ line: 2, log: 'dist[S]=0, everything else ∞' });
  let guard = 0;
  while (settled.size < Object.keys(N).length && guard++ < 12) {
    let u = null; for (const k of Object.keys(N)) if (!settled.has(k) && (u == null || dist[k] < dist[u])) u = k;
    settled.add(u);
    snap({ line: 4, cur: u, log: `closest unsettled = ${u} (dist ${fmt(dist[u])}) → settle it permanently` });
    for (const [v, w] of ADJ[u]) {
      if (settled.has(v)) continue;
      const cand = dist[u] + w;
      const better = cand < dist[v];
      snap({ line: 6, cur: u, con: v, edge: [u, v], log: `relax ${u}→${v}: ${fmt(dist[u])}+${w}=${cand} ${better ? '<' : '≥'} ${fmt(dist[v])}${better ? ' → update' : ''}` });
      if (better) { dist[v] = cand; parent[v] = u; snap({ line: 7, cur: u, con: v, edge: [u, v], improved: true, log: `dist[${v}] = ${cand}` }); }
    }
  }
  snap({ line: 8, log: `all settled — shortest: A=2, B=3, C=5, D=6`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">dijkstra</span>(graph, S):' },
  { n: 2, t: '    dist = {S: 0, others: <span class="kw">inf</span>}' },
  { n: 3, t: '    <span class="kw">while</span> unsettled nodes remain:' },
  { n: 4, t: '        u = closest unsettled node   <span class="st"># greedy</span>' },
  { n: 5, t: '        <span class="kw">for</span> v, w <span class="kw">in</span> graph[u]:' },
  { n: 6, t: '            <span class="kw">if</span> dist[u] + w < dist[v]:' },
  { n: 7, t: '                dist[v] = dist[u] + w' },
  { n: 8, t: '    <span class="kw">return</span> dist' },
];

export default function AgraphDijkstraVisualization() {
  const fmt = d => d === Infinity ? '∞' : d;
  return (
    <AlgoStage
      title="Dijkstra's Shortest Paths"
      subtitle="Settle the closest unsettled node (that distance is now final), then relax its outgoing edges to improve neighbours. A priority queue makes the 'closest' pick fast."
      accent="#6b8cff" viewBox="0 0 640 300"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'settling', type: 'node', prev: prev && prev.cur ? prev.cur : '—', cur: fr.cur ?? '—' },
        { name: 'relaxing', type: 'edge', prev: prev && prev.edge ? prev.edge.join('→') : '—', cur: fr.edge ? fr.edge.join('→') : '—' },
        { name: 'dist', type: 'map', prev: prev ? Object.entries(prev.dist).map(([k, v]) => k + ':' + fmt(v)).join(' ') : '', cur: Object.entries(fr.dist).map(([k, v]) => k + ':' + fmt(v)).join(' ') },
        { name: 'settled', type: 'set', prev: prev ? '{' + prev.settled.join(',') + '}' : '{}', cur: '{' + fr.settled.join(',') + '}' },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(settle it permanently|dist\[[A-Z]\] = \d+|all settled[^!]*)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>With a binary heap the run time is <strong>O((V+E) log V)</strong>. The greedy settle is only safe because edges are <strong>non-negative</strong> — a cheaper path can't sneak in later through a farther node. The next lesson breaks exactly that assumption.</>}
      renderCanvas={fr => (
        <>
          {EDGES.map(([a, b, w], k) => {
            const [x1, y1] = N[a], [x2, y2] = N[b];
            const hot = fr.edge && ((fr.edge[0] === a && fr.edge[1] === b) || (fr.edge[0] === b && fr.edge[1] === a));
            const inTree = fr.parent[b] === a || fr.parent[a] === b;
            return (
              <g key={k}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={hot ? (fr.improved ? 'var(--a-visited)' : 'var(--a-current)') : inTree ? 'var(--algo-accent)' : 'var(--a-border)'} strokeWidth={hot ? 4 : inTree ? 3 : 2} className={hot ? 'algo-pulse' : ''} style={{ transition: 'stroke .25s' }} />
                <circle cx={(x1 + x2) / 2} cy={(y1 + y2) / 2} r="10" fill="var(--a-code)" stroke="var(--a-faint)" />
                <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 + 4} textAnchor="middle" style={{ font: '700 11px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{w}</text>
              </g>
            );
          })}
          {Object.entries(N).map(([id, [x, y]]) => {
            const isSettled = fr.settled.includes(id), isCur = fr.cur === id, isCon = fr.con === id;
            return (
              <g key={id}>
                <circle cx={x} cy={y} r="21" fill={isCur ? 'var(--a-current-soft)' : isSettled ? 'color-mix(in srgb, var(--algo-accent) 22%, transparent)' : isCon ? 'var(--a-visited-soft)' : 'var(--a-surface-2)'} stroke={isCur ? 'var(--a-current)' : isSettled ? 'var(--algo-accent)' : isCon ? 'var(--a-visited)' : 'var(--a-faint)'} strokeWidth={isCur || isCon ? 3.5 : 2.5} className={isCur || isCon ? 'algo-pulse' : ''} style={{ transition: 'fill .25s' }} />
                <text x={x} y={y + 5} textAnchor="middle" style={{ font: '700 15px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{id}</text>
                <text x={x} y={y + 40} textAnchor="middle" style={{ font: '700 12px ui-monospace, monospace', fill: isSettled ? 'var(--algo-accent)' : 'var(--a-muted)' }}>{fr.dist[id] === Infinity ? '∞' : fr.dist[id]}</text>
              </g>
            );
          })}
        </>
      )}
    />
  );
}
