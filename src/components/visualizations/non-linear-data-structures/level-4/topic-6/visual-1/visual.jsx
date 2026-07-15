/* Lesson: Depth-First Search (DFS) — Exploring as Deep as Possible First  [AlgoStage]
 * Iterative DFS with an explicit stack, fully stepped: transport, synced code, live stack +
 * visited inspector, and console. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';
import { GNODES, GADJ, GEDGES, nodeById } from '../../../../_dsa-shared/graphData';

const key = (a, b) => Math.min(a, b) + '-' + Math.max(a, b);

function buildFrames() {
  const f = [], visited = new Set(), stack = [0], tree = new Set();
  const parent = {};
  const snap = o => f.push(Object.assign({ stack: [...stack], visited: [...visited], tree: new Set(tree) }, o));
  snap({ line: 2, cur: null, con: null, log: 'visited = set()' });
  snap({ line: 3, cur: null, con: null, log: 'stack = [A]' });
  let guard = 0;
  while (stack.length && guard++ < 200) {
    snap({ line: 4, cur: null, con: null, log: 'stack not empty' });
    const node = stack.pop();
    snap({ line: 5, cur: node, con: null, log: `pop ${nodeById(node).label}` });
    if (visited.has(node)) { snap({ line: 7, cur: node, con: null, log: `${nodeById(node).label} already visited → continue`, skip: true }); continue; }
    snap({ line: 6, cur: node, con: null, log: `${nodeById(node).label} not visited` });
    visited.add(node);
    if (parent[node] != null) tree.add(key(parent[node], node));
    snap({ line: 8, cur: node, con: null, log: `visit ${nodeById(node).label}`, add: node });
    for (const nb of GADJ[node]) {
      snap({ line: 9, cur: node, con: nb, log: `neighbour ${nodeById(nb).label}` });
      if (!visited.has(nb)) parent[nb] = node;
      stack.push(nb);
      snap({ line: 10, cur: node, con: nb, log: `push ${nodeById(nb).label}` });
    }
  }
  snap({ line: 4, cur: null, con: null, log: 'stack empty → finished', done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">dfs</span>(graph, start):' },
  { n: 2, t: '    visited = <span class="fn">set</span>()' },
  { n: 3, t: '    stack = [start]' },
  { n: 4, t: '    <span class="kw">while</span> stack:' },
  { n: 5, t: '        node = stack.pop()' },
  { n: 6, t: '        <span class="kw">if</span> node <span class="kw">in</span> visited:' },
  { n: 7, t: '            <span class="kw">continue</span>' },
  { n: 8, t: '        visited.add(node)' },
  { n: 9, t: '        <span class="kw">for</span> nb <span class="kw">in</span> graph[node]:' },
  { n: 10, t: '            stack.append(nb)' },
];
const fmtS = a => (a.length ? '[' + a.map(x => nodeById(x).label).join(', ') + ']' : '[]');
const fmtV = a => '{' + a.map(x => nodeById(x).label).join(', ') + '}';

export default function GraphDfsVisualization() {
  return (
    <AlgoStage
      title="Depth-First Search (DFS)"
      subtitle="DFS dives down one branch as far as it can, then backtracks. An explicit stack (LIFO) remembers where to resume — pop the newest node each time. Scrub to watch the stack grow and drain."
      accent="#a78bfa"
      viewBox="0 0 640 300"
      frames={FRAMES}
      code={CODE}
      lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'node', type: 'str', prev: prev ? (prev.cur == null ? '—' : nodeById(prev.cur).label) : '—', cur: fr.cur == null ? '—' : nodeById(fr.cur).label },
        { name: 'nb', type: 'str', prev: prev ? (prev.con == null ? '—' : nodeById(prev.con).label) : '—', cur: fr.con == null ? '—' : nodeById(fr.con).label },
        { name: 'stack', type: 'list', prev: prev ? fmtS(prev.stack) : '[A]', cur: fmtS(fr.stack) },
        { name: 'visited', type: 'set', prev: prev ? fmtV(prev.visited) : '{}', cur: fmtV(fr.visited) },
        { name: 'len(stack)', type: 'int', prev: prev ? String(prev.stack.length) : '1', cur: String(fr.stack.length) },
      ]}
      logFor={fr => {
        const t = fr.log.replace(/(visit|pop|push) ([A-G])/, '<span class="pre">$1 $2</span>');
        return `<span class="${fr.done ? 'done' : ''}">${t}</span>`;
      }}
      legend={<>Use a <strong>stack</strong> (LIFO): pop the most recently pushed node, visit it, and push its neighbours. The newest node is always explored next, so DFS plunges deep before widening. Powers cycle detection, topological sort, and connected components. Time <code>O(V+E)</code>.</>}
      aside={fr => (
        <>
          <div>
            <div style={{ font: '600 10.5px ui-monospace, monospace', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--a-faint)', marginBottom: 6 }}>Stack (top = right)</div>
            <div style={{ display: 'flex', gap: 6, minHeight: 30, alignItems: 'center', flexWrap: 'wrap' }}>
              {fr.stack.length ? fr.stack.map((x, k) => (
                <span key={k} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 28, height: 28, borderRadius: 7, background: k === fr.stack.length - 1 ? 'color-mix(in srgb, var(--algo-accent) 24%, transparent)' : 'var(--a-surface-2)', color: 'var(--algo-accent)', border: '1px solid var(--algo-accent)', font: '700 13px ui-monospace, monospace' }}>{nodeById(x).label}</span>
              )) : <span style={{ color: 'var(--a-faint)', fontStyle: 'italic', fontSize: 13 }}>empty</span>}
            </div>
          </div>
          <div>
            <div style={{ font: '600 10.5px ui-monospace, monospace', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--a-faint)', marginBottom: 6 }}>Visited order</div>
            <div style={{ display: 'flex', gap: 6, minHeight: 30, alignItems: 'center', flexWrap: 'wrap' }}>
              {fr.visited.map((x, k) => (
                <span key={k} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: '50%', background: 'var(--a-visited-soft)', color: 'var(--a-visited)', border: '1px solid var(--a-visited)', font: '700 12px ui-monospace, monospace' }}>{nodeById(x).label}</span>
              ))}
            </div>
          </div>
        </>
      )}
      renderCanvas={fr => {
        const vis = new Set(fr.visited);
        return (
          <>
            {GEDGES.map(([a, b], k) => {
              const na = nodeById(a), nb = nodeById(b);
              return <line key={k} className={'algo-edge' + (fr.tree.has(key(a, b)) ? ' tree' : '')} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} />;
            })}
            {GNODES.map(n => {
              let st = 'idle', badge = '';
              if (vis.has(n.id)) { st = 'visited'; badge = '✓'; }
              if (fr.con === n.id) { st = 'considering'; badge = '?'; }
              if (fr.cur === n.id) { st = 'current'; badge = '▶'; }
              const bc = st === 'current' ? 'var(--a-current)' : st === 'considering' ? 'var(--algo-accent)' : st === 'visited' ? 'var(--a-visited)' : 'transparent';
              return (
                <g key={n.id} className="algo-node" data-s={st}>
                  <circle className={'algo-nodec' + (fr.cur === n.id || fr.con === n.id ? ' algo-pulse' : '')} cx={n.x} cy={n.y} r="20" />
                  <text className="algo-nodet" x={n.x} y={n.y + 5}>{n.label}</text>
                  <text x={n.x + 18} y={n.y - 16} textAnchor="middle" style={{ font: '700 11px ui-monospace, monospace', fill: bc }}>{badge}</text>
                </g>
              );
            })}
          </>
        );
      }}
    />
  );
}
