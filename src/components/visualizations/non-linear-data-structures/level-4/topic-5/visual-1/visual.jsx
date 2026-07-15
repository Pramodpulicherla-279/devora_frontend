/* Lesson: Breadth-First Search (BFS) — Exploring Level by Level  [AlgoStage framework]
 * Full interactive execution: transport + scrubber, synced code, live variable inspector, and
 * console — all driven by one precomputed BFS trace over the shared graph. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';
import { GNODES, GADJ, GEDGES, nodeById } from '../../../../_dsa-shared/graphData';

const key = (a, b) => Math.min(a, b) + '-' + Math.max(a, b);

function buildFrames() {
  const f = [], visited = new Set([0]), q = [0], tree = new Set();
  const snap = o => f.push(Object.assign({ queue: [...q], visited: [...visited], tree: new Set(tree) }, o));
  snap({ line: 3, cur: null, con: null, log: 'visited = {A}' });
  snap({ line: 4, cur: null, con: null, log: 'queue = [A]' });
  while (q.length) {
    snap({ line: 5, cur: null, con: null, log: 'queue not empty' });
    const node = q.shift();
    snap({ line: 6, cur: node, con: null, log: `dequeue ${nodeById(node).label}` });
    for (const nb of GADJ[node]) {
      snap({ line: 7, cur: node, con: nb, log: `look at neighbour ${nodeById(nb).label}` });
      if (!visited.has(nb)) {
        snap({ line: 8, cur: node, con: nb, log: `${nodeById(nb).label} not in visited? yes` });
        visited.add(nb); tree.add(key(node, nb));
        snap({ line: 9, cur: node, con: nb, log: `visit ${nodeById(nb).label}`, add: nb });
        q.push(nb);
        snap({ line: 10, cur: node, con: nb, log: `enqueue ${nodeById(nb).label}` });
      } else {
        snap({ line: 8, cur: node, con: nb, log: `${nodeById(nb).label} already visited → skip`, skip: true });
      }
    }
  }
  snap({ line: 5, cur: null, con: null, log: 'queue empty → finished', done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">from</span> collections <span class="kw">import</span> deque' },
  { n: 2, t: '<span class="kw">def</span> <span class="fn">bfs</span>(graph, start):' },
  { n: 3, t: '    visited = {start}' },
  { n: 4, t: '    queue = deque([start])' },
  { n: 5, t: '    <span class="kw">while</span> queue:' },
  { n: 6, t: '        node = queue.popleft()' },
  { n: 7, t: '        <span class="kw">for</span> nb <span class="kw">in</span> graph[node]:' },
  { n: 8, t: '            <span class="kw">if</span> nb <span class="kw">not in</span> visited:' },
  { n: 9, t: '                visited.add(nb)' },
  { n: 10, t: '                queue.append(nb)' },
];
const fmtQ = a => (a.length ? '[' + a.map(x => nodeById(x).label).join(', ') + ']' : '[]');
const fmtV = a => '{' + a.map(x => nodeById(x).label).join(', ') + '}';

export default function GraphBfsVisualization() {
  return (
    <AlgoStage
      title="Breadth-First Search (BFS)"
      subtitle="BFS explores in rings: all neighbours of A, then their neighbours. A FIFO queue enforces this order. Scrub the timeline — code, variables, queue and console move together."
      accent="#6b8cff"
      viewBox="0 0 640 300"
      frames={FRAMES}
      code={CODE}
      lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'node', type: 'str', prev: prev ? (prev.cur == null ? '—' : nodeById(prev.cur).label) : '—', cur: fr.cur == null ? '—' : nodeById(fr.cur).label },
        { name: 'nb', type: 'str', prev: prev ? (prev.con == null ? '—' : nodeById(prev.con).label) : '—', cur: fr.con == null ? '—' : nodeById(fr.con).label },
        { name: 'queue', type: 'deque', prev: prev ? fmtQ(prev.queue) : '[A]', cur: fmtQ(fr.queue) },
        { name: 'visited', type: 'set', prev: prev ? fmtV(prev.visited) : '{A}', cur: fmtV(fr.visited) },
        { name: 'len(queue)', type: 'int', prev: prev ? String(prev.queue.length) : '1', cur: String(fr.queue.length) },
      ]}
      logFor={fr => {
        const cls = fr.done ? 'done' : '';
        const t = fr.log.replace(/(visit|dequeue|enqueue) ([A-G])/, '<span class="pre">$1 $2</span>');
        return `<span class="${cls}">${t}</span>`;
      }}
      legend={<>Use a <strong>queue</strong> (FIFO): dequeue a node, mark it visited, enqueue its unvisited neighbours. Because the queue drains oldest-first, nodes emerge in order of distance from the start → BFS finds the <strong>fewest-edges path</strong>. Time <code>O(V+E)</code>.</>}
      aside={fr => (
        <>
          <div>
            <div style={{ font: '600 10.5px ui-monospace, monospace', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--a-faint)', marginBottom: 6 }}>Queue (front → back)</div>
            <div style={{ display: 'flex', gap: 6, minHeight: 30, alignItems: 'center' }}>
              {fr.queue.length ? fr.queue.map((x, k) => (
                <span key={k} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 28, height: 28, borderRadius: 7, background: 'color-mix(in srgb, var(--algo-accent) 16%, transparent)', color: 'var(--algo-accent)', border: '1px solid var(--algo-accent)', font: '700 13px ui-monospace, monospace' }}>{nodeById(x).label}</span>
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
