/* Lesson: Kruskal's Algorithm — Building a Spanning Tree Edge by Edge  [AlgoStage]
 * Sort edges by weight; accept each edge whose endpoints are in DIFFERENT components (checked
 * by union-find), reject those that would close a cycle. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const N = { A: [100, 80], B: [280, 50], C: [460, 90], D: [180, 210], E: [380, 220] };
const IDS = Object.keys(N);
const EDGES = [['C', 'E', 1], ['A', 'D', 2], ['B', 'C', 3], ['A', 'B', 4], ['B', 'D', 5], ['B', 'E', 6], ['D', 'E', 7]];
function buildFrames() {
  const f = []; const parent = {}; IDS.forEach(k => parent[k] = k);
  const find = x => { while (parent[x] !== x) x = parent[x]; return x; };
  const mst = []; let cost = 0;
  const comps = () => { const m = {}; IDS.forEach(k => m[k] = find(k)); return m; };
  const snap = o => f.push(Object.assign({ mst: mst.map(e => [...e]), cost, comps: comps() }, o));
  snap({ line: 1, log: 'edges sorted by weight; every node starts as its own component' });
  for (let i = 0; i < EDGES.length; i++) {
    const [a, b, w] = EDGES[i];
    const ra = find(a), rb = find(b);
    snap({ line: 3, i, edge: [a, b], log: `edge ${a}–${b} (${w}): find(${a})=${ra}, find(${b})=${rb}` });
    if (ra !== rb) { parent[rb] = ra; mst.push([a, b]); cost += w; snap({ line: 5, i, edge: [a, b], accepted: true, log: `different components → union & accept (cost ${cost})` }); }
    else snap({ line: 6, i, edge: [a, b], rejected: true, log: `same component → cycle → reject` });
    if (mst.length === IDS.length - 1) { snap({ line: 7, log: `MST complete: ${IDS.length - 1} edges, total cost ${cost}`, done: true }); return f; }
  }
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: 'edges.sort(key=weight)' },
  { n: 2, t: '<span class="kw">for</span> a, b, w <span class="kw">in</span> edges:' },
  { n: 3, t: '    <span class="kw">if</span> find(a) != find(b):' },
  { n: 4, t: '        union(a, b)' },
  { n: 5, t: '        mst.add((a, b, w))' },
  { n: 6, t: '    <span class="st"># else: would form a cycle</span>' },
  { n: 7, t: '    <span class="kw">if</span> len(mst) == V-1: <span class="kw">break</span>' },
];
const COMP_COLOR = { A: '#6b8cff', B: '#4fce78', C: '#f0a35e', D: '#a78bfa', E: '#e46e9b' };

export default function AgraphKruskalVisualization() {
  return (
    <AlgoStage
      title="Kruskal's Algorithm"
      subtitle="Greedy over EDGES: take them cheapest-first, but only if they join two different components. Union-Find answers 'same component?' in near-constant time — that's the whole trick."
      accent="#4fce78" viewBox="0 0 640 280"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'edge', type: 'str', prev: prev && prev.edge ? prev.edge.join('–') : '—', cur: fr.edge ? fr.edge.join('–') : '—' },
        { name: 'verdict', type: 'str', prev: '', cur: fr.accepted ? 'accept' : fr.rejected ? 'reject (cycle)' : '—' },
        { name: 'MST edges', type: 'int', prev: prev ? String(prev.mst.length) : '0', cur: String(fr.mst.length) },
        { name: 'cost', type: 'int', prev: prev ? String(prev.cost) : '0', cur: String(fr.cost) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(accept[^)]*\)|reject|MST complete[^!]*)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Sorting dominates: <strong>O(E log E)</strong>. The <em>cut property</em> proves each accepted edge is safe: the cheapest edge crossing between two components must belong to some MST. Node colours show components merging as unions happen.</>}
      renderCanvas={fr => (
        <>
          {EDGES.map(([a, b, w], k) => {
            const [x1, y1] = N[a], [x2, y2] = N[b];
            const inMst = fr.mst.some(([ma, mb]) => ma === a && mb === b);
            const hot = fr.edge && fr.edge[0] === a && fr.edge[1] === b;
            const col = hot ? (fr.accepted ? 'var(--a-visited)' : fr.rejected ? '#f85149' : 'var(--a-current)') : inMst ? 'var(--a-visited)' : 'var(--a-border)';
            return (
              <g key={k}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={col} strokeWidth={inMst || hot ? 4 : 2} strokeDasharray={hot && fr.rejected ? '5 4' : 'none'} className={hot ? 'algo-pulse' : ''} style={{ transition: 'stroke .25s' }} />
                <circle cx={(x1 + x2) / 2} cy={(y1 + y2) / 2} r="11" fill="var(--a-code)" stroke={col} />
                <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 + 4} textAnchor="middle" style={{ font: '700 11px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{w}</text>
              </g>
            );
          })}
          {IDS.map(id => {
            const [x, y] = N[id];
            const root = fr.comps[id];
            return (
              <g key={id}>
                <circle cx={x} cy={y} r="20" fill={`color-mix(in srgb, ${COMP_COLOR[root]} 26%, transparent)`} stroke={COMP_COLOR[root]} strokeWidth="3" style={{ transition: 'stroke .3s, fill .3s' }} />
                <text x={x} y={y + 5} textAnchor="middle" style={{ font: '700 15px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{id}</text>
              </g>
            );
          })}
          <text x="320" y="272" textAnchor="middle" style={{ font: '600 11px ui-monospace, monospace', fill: 'var(--a-faint)' }}>node colour = its component's root · unions merge colours</text>
        </>
      )}
    />
  );
}
