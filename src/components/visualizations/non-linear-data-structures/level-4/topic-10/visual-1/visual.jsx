/* Lesson: Topological Sort — Ordering Tasks With Dependencies  [AlgoStage framework]
 * Kahn's algorithm fully stepped: repeatedly take a node with in-degree 0, output it, and
 * decrement its neighbours. Live in-degree map, queue, and order in the inspector + console. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const NODES = [
  { id: 0, l: 'Intro', x: 80, y: 150 }, { id: 1, l: 'Arrays', x: 250, y: 60 },
  { id: 2, l: 'Recur', x: 250, y: 240 }, { id: 3, l: 'Trees', x: 420, y: 110 },
  { id: 4, l: 'Graphs', x: 560, y: 150 }, { id: 5, l: 'Heaps', x: 420, y: 250 },
];
const ADJ = { 0: [1, 2], 1: [3], 2: [3, 5], 3: [4], 5: [4], 4: [] };
const EDGES = []; for (const a in ADJ) for (const b of ADJ[a]) EDGES.push([+a, b]);

function buildFrames() {
  const indeg = {}; NODES.forEach(n => indeg[n.id] = 0);
  for (const a in ADJ) for (const b of ADJ[a]) indeg[b]++;
  const f = [], order = [], removed = new Set();
  let queue = NODES.filter(n => indeg[n.id] === 0).map(n => n.id);
  const snap = o => f.push(Object.assign({ indeg: { ...indeg }, order: [...order], queue: [...queue], removed: new Set(removed) }, o));
  snap({ line: 2, cur: null, con: null, log: 'compute in-degrees' });
  snap({ line: 3, cur: null, con: null, log: `queue = [${queue.map(x => NODES[x].l).join(', ')}] (in-degree 0)` });
  let guard = 0;
  while (queue.length && guard++ < 30) {
    snap({ line: 5, cur: null, con: null, log: 'queue not empty' });
    const u = queue.shift();
    snap({ line: 6, cur: u, con: null, log: `take ${NODES[u].l}` });
    order.push(u); removed.add(u);
    snap({ line: 7, cur: u, con: null, log: `order.append(${NODES[u].l})` });
    for (const v of ADJ[u]) {
      indeg[v]--;
      snap({ line: 9, cur: u, con: v, log: `${NODES[v].l}.in_degree → ${indeg[v]}` });
      if (indeg[v] === 0) { queue.push(v); snap({ line: 11, cur: u, con: v, log: `${NODES[v].l} ready → enqueue` }); }
    }
  }
  snap({ line: 12, cur: null, con: null, log: `order = ${order.map(x => NODES[x].l).join(' → ')}`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">topo_sort</span>(graph):' },
  { n: 2, t: '    indeg = <span class="fn">in_degrees</span>(graph)' },
  { n: 3, t: '    queue = [u <span class="kw">for</span> u <span class="kw">in</span> graph <span class="kw">if</span> indeg[u]==0]' },
  { n: 4, t: '    order = []' },
  { n: 5, t: '    <span class="kw">while</span> queue:' },
  { n: 6, t: '        u = queue.pop(0)' },
  { n: 7, t: '        order.append(u)' },
  { n: 8, t: '        <span class="kw">for</span> v <span class="kw">in</span> graph[u]:' },
  { n: 9, t: '            indeg[v] -= 1' },
  { n: 10, t: '            <span class="kw">if</span> indeg[v] == 0:' },
  { n: 11, t: '                queue.append(v)' },
  { n: 12, t: '    <span class="kw">return</span> order' },
];
const lineMap = { 2: 2, 3: 3, 5: 5, 6: 6, 7: 7, 9: 9, 11: 11, 12: 12 };

export default function GraphTopoSortVisualization() {
  return (
    <AlgoStage
      title="Topological Sort (Kahn's Algorithm)"
      subtitle="A topological order lists tasks so every prerequisite comes first. Repeatedly remove a node with in-degree 0 and decrement its neighbours. Scrub to watch in-degrees fall to zero."
      accent="#6b8cff"
      viewBox="0 0 640 300"
      frames={FRAMES}
      code={CODE}
      lineFor={fr => lineMap[fr.line] ?? null}
      variables={(fr, prev) => [
        { name: 'u', type: 'node', prev: prev ? (prev.cur == null ? '—' : NODES[prev.cur].l) : '—', cur: fr.cur == null ? '—' : NODES[fr.cur].l },
        { name: 'v', type: 'node', prev: prev ? (prev.con == null ? '—' : NODES[prev.con].l) : '—', cur: fr.con == null ? '—' : NODES[fr.con].l },
        { name: 'indeg[v]', type: 'int', prev: prev && prev.con != null ? String(prev.indeg[prev.con]) : '—', cur: fr.con == null ? '—' : String(fr.indeg[fr.con]) },
        { name: 'queue', type: 'list', prev: prev ? '[' + prev.queue.map(x => NODES[x].l).join(',') + ']' : '', cur: '[' + fr.queue.map(x => NODES[x].l).join(',') + ']' },
        { name: 'len(order)', type: 'int', prev: prev ? String(prev.order.length) : '0', cur: String(fr.order.length) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(ready)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Compute each node's <strong>in-degree</strong> (number of prerequisites). Take any in-degree-0 node, append it to the order, and decrement its neighbours — repeat. Works only on a <strong>DAG</strong>; a leftover node means a circular dependency. Time <code>O(V+E)</code>.</>}
      aside={fr => (
        <div>
          <div style={{ font: '600 10.5px ui-monospace, monospace', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--a-faint)', marginBottom: 6 }}>Topological order</div>
          <div style={{ display: 'flex', gap: 6, minHeight: 30, alignItems: 'center', flexWrap: 'wrap' }}>
            {fr.order.length ? fr.order.map((x, k) => (
              <span key={k} style={{ display: 'inline-flex', alignItems: 'center', padding: '0 8px', height: 26, borderRadius: 7, background: 'var(--a-visited-soft)', color: 'var(--a-visited)', border: '1px solid var(--a-visited)', font: '700 12px ui-monospace, monospace' }}>{k + 1}. {NODES[x].l}</span>
            )) : <span style={{ color: 'var(--a-faint)', fontStyle: 'italic', fontSize: 13 }}>none yet</span>}
          </div>
        </div>
      )}
      renderCanvas={fr => (
        <>
          <defs><marker id="topo-arr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L9,3 L0,6 Z" fill="var(--a-faint)" /></marker></defs>
          {EDGES.map(([a, b], k) => {
            const na = NODES[a], nb = NODES[b], gone = fr.removed.has(a);
            const dx = nb.x - na.x, dy = nb.y - na.y, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
            return <line key={k} x1={na.x + ux * 32} y1={na.y + uy * 24} x2={nb.x - ux * 34} y2={nb.y - uy * 26} stroke={gone ? 'var(--a-border)' : 'var(--a-faint)'} strokeWidth="2.5" markerEnd="url(#topo-arr)" style={{ transition: 'stroke .3s', opacity: gone ? 0.4 : 1 }} />;
          })}
          {NODES.map(n => {
            const done = fr.removed.has(n.id), ready = !done && fr.indeg[n.id] === 0, isCur = n.id === fr.cur, isCon = n.id === fr.con;
            return (
              <g key={n.id}>
                <ellipse cx={n.x} cy={n.y} rx="36" ry="22" fill={done ? 'var(--a-visited-soft)' : ready ? 'color-mix(in srgb, var(--algo-accent) 14%, transparent)' : 'var(--a-surface-2)'} stroke={isCur ? 'var(--a-current)' : isCon ? 'var(--algo-accent)' : done ? 'var(--a-visited)' : ready ? 'var(--algo-accent)' : 'var(--a-faint)'} strokeWidth={isCur || isCon ? 3.5 : 2.5} className={isCur ? 'algo-pulse' : ''} style={{ transition: 'fill .3s, stroke .3s' }} />
                <text x={n.x} y={n.y + 5} textAnchor="middle" style={{ font: '700 13px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{n.l}</text>
                {!done && <>
                  <circle cx={n.x + 30} cy={n.y - 18} r="11" fill={ready ? 'var(--a-visited)' : 'var(--a-code)'} stroke={ready ? 'var(--a-visited)' : 'var(--a-border)'} />
                  <text x={n.x + 30} y={n.y - 14} textAnchor="middle" style={{ font: '700 12px ui-monospace, monospace', fill: ready ? '#0d1117' : 'var(--a-muted)' }}>{fr.indeg[n.id]}</text>
                </>}
              </g>
            );
          })}
        </>
      )}
    />
  );
}
