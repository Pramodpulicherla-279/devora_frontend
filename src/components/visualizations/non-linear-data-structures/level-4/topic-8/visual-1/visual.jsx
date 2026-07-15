/* Lesson: Detecting Cycles in a Graph  [AlgoStage framework]
 * Three-colour DFS over a directed graph, fully stepped: a back edge to a GREY (in-progress)
 * node proves a cycle. Synced code, recursion-stack inspector, console. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const NODES = [
  { id: 0, l: 'A', x: 100, y: 80 }, { id: 1, l: 'B', x: 300, y: 60 },
  { id: 2, l: 'C', x: 480, y: 100 }, { id: 3, l: 'D', x: 300, y: 220 },
  { id: 4, l: 'E', x: 130, y: 240 },
];
const ADJ = { 0: [1], 1: [2, 3], 2: [], 3: [4], 4: [1] }; // cycle B→D→E→B
const EDGES = []; for (const a in ADJ) for (const b of ADJ[a]) EDGES.push([+a, b]);
const CN = ['WHITE', 'GREY', 'BLACK'];

function buildFrames() {
  const color = {}; NODES.forEach(n => color[n.id] = 0);
  const f = [], stack = []; let back = null;
  const snap = o => f.push(Object.assign({ color: { ...color }, stack: [...stack], back }, o));
  snap({ line: 2, cur: null, con: null, log: 'colour all nodes WHITE' });
  let cycle = false;
  function dfs(u) {
    color[u] = 1; stack.push(u);
    snap({ line: 4, cur: u, con: null, log: `enter ${NODES[u].l} → GREY` });
    for (const v of ADJ[u]) {
      snap({ line: 6, cur: u, con: v, log: `edge ${NODES[u].l}→${NODES[v].l}: ${NODES[v].l} is ${CN[color[v]]}` });
      if (color[v] === 1) { back = [u, v]; cycle = true; snap({ line: 7, cur: u, con: v, back, log: `${NODES[v].l} is GREY → back edge! cycle found`, done: true }); return true; }
      if (color[v] === 0) { snap({ line: 8, cur: u, con: v, log: `${NODES[v].l} WHITE → recurse` }); if (dfs(v)) return true; }
    }
    color[u] = 2; stack.pop();
    snap({ line: 10, cur: stack.length ? stack[stack.length - 1] : u, con: null, log: `${NODES[u].l} done → BLACK` });
    return false;
  }
  for (const n of NODES) if (color[n.id] === 0) { if (dfs(n.id)) break; }
  if (!cycle) snap({ line: 11, cur: null, con: null, log: 'no back edge → acyclic', done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">has_cycle</span>(graph):' },
  { n: 2, t: '    color = {u: WHITE <span class="kw">for</span> u <span class="kw">in</span> graph}' },
  { n: 3, t: '    <span class="kw">def</span> <span class="fn">dfs</span>(u):' },
  { n: 4, t: '        color[u] = GREY' },
  { n: 5, t: '        <span class="kw">for</span> v <span class="kw">in</span> graph[u]:' },
  { n: 6, t: '            <span class="kw">if</span> color[v] == GREY:' },
  { n: 7, t: '                <span class="kw">return</span> <span class="kw">True</span>   <span class="st"># back edge</span>' },
  { n: 8, t: '            <span class="kw">if</span> color[v] == WHITE <span class="kw">and</span> <span class="fn">dfs</span>(v):' },
  { n: 9, t: '                <span class="kw">return</span> <span class="kw">True</span>' },
  { n: 10, t: '        color[u] = BLACK' },
  { n: 11, t: '    <span class="kw">return</span> <span class="kw">any</span>(<span class="fn">dfs</span>(u) ...)' },
];
const lineMap = { 2: 2, 4: 4, 6: 6, 7: 7, 8: 8, 10: 10, 11: 11 };

export default function GraphCycleVisualization() {
  const NC = ['var(--a-surface-2)', 'var(--a-current-soft)', 'var(--a-code)'];
  const NS = ['var(--a-faint)', 'var(--a-current)', 'var(--a-border)'];
  return (
    <AlgoStage
      title="Cycle Detection (3-Colour DFS)"
      subtitle="Colour nodes WHITE→GREY→BLACK as DFS runs. GREY means 'on the current recursion path'. An edge to a GREY node is a back edge — proof of a cycle."
      accent="#f0883e"
      viewBox="0 0 600 300"
      frames={FRAMES}
      code={CODE}
      lineFor={fr => lineMap[fr.line] ?? null}
      variables={(fr, prev) => [
        { name: 'u', type: 'node', prev: prev ? (prev.cur == null ? '—' : NODES[prev.cur].l) : '—', cur: fr.cur == null ? '—' : NODES[fr.cur].l },
        { name: 'v', type: 'node', prev: prev ? (prev.con == null ? '—' : NODES[prev.con].l) : '—', cur: fr.con == null ? '—' : NODES[fr.con].l },
        { name: 'color[v]', type: 'enum', prev: prev && prev.con != null ? CN[prev.color[prev.con]] : '—', cur: fr.con == null ? '—' : CN[fr.color[fr.con]] },
        { name: 'recursion', type: 'stack', prev: prev ? '[' + prev.stack.map(x => NODES[x].l).join(',') + ']' : '[]', cur: '[' + fr.stack.map(x => NODES[x].l).join(',') + ']' },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(back edge)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>WHITE = unvisited, <span style={{ color: 'var(--a-current)' }}>GREY</span> = in progress (on the recursion stack), BLACK = fully explored. A <strong>back edge</strong> to a GREY node closes a loop → cycle. For undirected graphs, any visited non-parent neighbour signals one. Time <code>O(V+E)</code>.</>}
      aside={fr => (
        <div>
          <div style={{ font: '600 10.5px ui-monospace, monospace', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--a-faint)', marginBottom: 6 }}>Recursion stack (GREY path)</div>
          <div style={{ display: 'flex', gap: 6, minHeight: 30, alignItems: 'center', flexWrap: 'wrap' }}>
            {fr.stack.length ? fr.stack.map((x, k) => (
              <span key={k} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 28, height: 28, borderRadius: 7, background: 'var(--a-current-soft)', color: 'var(--a-current)', border: '1px solid var(--a-current)', font: '700 13px ui-monospace, monospace' }}>{NODES[x].l}</span>
            )) : <span style={{ color: 'var(--a-faint)', fontStyle: 'italic', fontSize: 13 }}>empty</span>}
            {fr.back && <span style={{ marginLeft: 8, color: '#f85149', font: '700 12px ui-monospace, monospace' }}>⟳ {NODES[fr.back[0]].l}→{NODES[fr.back[1]].l}</span>}
          </div>
        </div>
      )}
      renderCanvas={fr => (
        <>
          <defs>
            <marker id="cyc-arr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L9,3 L0,6 Z" fill="var(--a-faint)" /></marker>
            <marker id="cyc-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L9,3 L0,6 Z" fill="#f85149" /></marker>
          </defs>
          {EDGES.map(([a, b], k) => {
            const na = NODES[a], nb = NODES[b];
            const dx = nb.x - na.x, dy = nb.y - na.y, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
            const isBack = fr.back && fr.back[0] === a && fr.back[1] === b;
            return <line key={k} x1={na.x + ux * 22} y1={na.y + uy * 22} x2={nb.x - ux * 24} y2={nb.y - uy * 24} stroke={isBack ? '#f85149' : 'var(--a-border)'} strokeWidth={isBack ? 3.5 : 2.5} markerEnd={isBack ? 'url(#cyc-red)' : 'url(#cyc-arr)'} className={isBack ? 'algo-pulse' : ''} style={{ transition: 'stroke .3s' }} />;
          })}
          {NODES.map(n => {
            const c = fr.color[n.id];
            const isCur = n.id === fr.cur, isCon = n.id === fr.con;
            return (
              <g key={n.id}>
                <circle cx={n.x} cy={n.y} r="21" fill={NC[c]} stroke={isCon ? 'var(--algo-accent)' : NS[c]} strokeWidth={isCur || isCon ? 3.5 : 2.5} strokeDasharray={isCon ? '5 4' : 'none'} className={isCur || isCon ? 'algo-pulse' : ''} style={{ transition: 'fill .3s, stroke .3s' }} />
                <text x={n.x} y={n.y + 5} textAnchor="middle" style={{ font: '700 15px ui-monospace, monospace', fill: c === 1 ? 'var(--a-current)' : 'var(--a-ink)' }}>{n.l}</text>
              </g>
            );
          })}
        </>
      )}
    />
  );
}
