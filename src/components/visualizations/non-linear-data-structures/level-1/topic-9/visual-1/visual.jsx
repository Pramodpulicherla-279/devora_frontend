/* Lesson: Breadth-First (Level-Order) Traversal  [AlgoStage framework]
 * Visit a tree level by level with a QUEUE: dequeue a node, output it, enqueue its children.
 * Fully stepped with synced code, live queue + output inspector, console. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const NODES = [
  { id: 0, val: 8, x: 280, y: 50 }, { id: 1, val: 3, x: 160, y: 120 }, { id: 2, val: 10, x: 400, y: 120 },
  { id: 3, val: 1, x: 95, y: 195 }, { id: 4, val: 6, x: 225, y: 195 }, { id: 5, val: 14, x: 470, y: 195 },
];
const CH = { 0: [1, 2], 1: [3, 4], 2: [null, 5] };
const byId = id => NODES.find(n => n.id === id);
const edges = () => { const e = []; for (const p in CH) CH[p].forEach(c => { if (c != null) e.push([+p, c]); }); return e; };

function buildFrames() {
  const f = [], out = []; let queue = [0];
  const snap = o => f.push(Object.assign({ queue: [...queue], out: [...out] }, o));
  snap({ line: 2, cur: null, log: 'queue = [8]  (root)' });
  let guard = 0;
  while (queue.length && guard++ < 20) {
    snap({ line: 3, cur: null, log: 'queue not empty' });
    const node = queue.shift();
    snap({ line: 4, cur: node, log: `dequeue ${byId(node).val}` });
    out.push(node);
    snap({ line: 5, cur: node, log: `visit ${byId(node).val}` });
    for (const c of (CH[node] || [])) if (c != null) { queue.push(c); snap({ line: 6, cur: node, con: c, log: `enqueue child ${byId(c).val}` }); }
  }
  snap({ line: 7, cur: null, log: `level-order = ${out.map(x => byId(x).val).join(', ')}`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">level_order</span>(root):' },
  { n: 2, t: '    queue = deque([root])' },
  { n: 3, t: '    <span class="kw">while</span> queue:' },
  { n: 4, t: '        node = queue.popleft()' },
  { n: 5, t: '        <span class="fn">visit</span>(node)' },
  { n: 6, t: '        <span class="kw">for</span> c <span class="kw">in</span> node.children: queue.append(c)' },
  { n: 7, t: '    <span class="kw">return</span> order' },
];

export default function TreeBfsVisualization() {
  return (
    <AlgoStage
      title="Level-Order Traversal (BFS)"
      subtitle="A queue visits the tree top-to-bottom, left-to-right: dequeue a node, output it, enqueue its children. The FIFO order guarantees each level finishes before the next begins."
      accent="#6b8cff"
      viewBox="0 0 560 260"
      frames={FRAMES}
      code={CODE}
      lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'node', type: 'node', prev: prev ? (prev.cur == null ? '—' : String(byId(prev.cur).val)) : '—', cur: fr.cur == null ? '—' : String(byId(fr.cur).val) },
        { name: 'queue', type: 'deque', prev: prev ? '[' + prev.queue.map(x => byId(x).val).join(',') + ']' : '[8]', cur: '[' + fr.queue.map(x => byId(x).val).join(',') + ']' },
        { name: 'output', type: 'list', prev: prev ? '[' + prev.out.map(x => byId(x).val).join(',') + ']' : '[]', cur: '[' + fr.out.map(x => byId(x).val).join(',') + ']' },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(level-order = .*)$/, '<span class="pre">$1</span>')}</span>`}
      legend={<>The <strong>queue</strong> is what makes it breadth-first: children join the back while the current level drains from the front. Level-order is used for shortest-path-in-tree, printing by depth, and serialising trees. Time <code>O(n)</code>, space <code>O(width)</code>.</>}
      aside={fr => (
        <>
          <div>
            <div style={{ font: '600 10.5px ui-monospace, monospace', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--a-faint)', marginBottom: 6 }}>Queue (front → back)</div>
            <div style={{ display: 'flex', gap: 6, minHeight: 30, alignItems: 'center' }}>
              {fr.queue.length ? fr.queue.map((x, k) => <span key={k} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 28, height: 28, borderRadius: 7, background: 'color-mix(in srgb, var(--algo-accent) 16%, transparent)', color: 'var(--algo-accent)', border: '1px solid var(--algo-accent)', font: '700 13px ui-monospace, monospace' }}>{byId(x).val}</span>) : <span style={{ color: 'var(--a-faint)', fontStyle: 'italic', fontSize: 13 }}>empty</span>}
            </div>
          </div>
          <div>
            <div style={{ font: '600 10.5px ui-monospace, monospace', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--a-faint)', marginBottom: 6 }}>Output order</div>
            <div style={{ display: 'flex', gap: 6, minHeight: 30, alignItems: 'center', flexWrap: 'wrap' }}>
              {fr.out.map((x, k) => <span key={k} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: '50%', background: 'var(--a-visited-soft)', color: 'var(--a-visited)', border: '1px solid var(--a-visited)', font: '700 12px ui-monospace, monospace' }}>{byId(x).val}</span>)}
            </div>
          </div>
        </>
      )}
      renderCanvas={fr => (
        <>
          {edges().map(([p, c], k) => <line key={k} x1={byId(p).x} y1={byId(p).y} x2={byId(c).x} y2={byId(c).y} stroke={fr.out.includes(p) && fr.out.includes(c) ? 'var(--a-visited)' : 'var(--a-border)'} strokeWidth="2.5" style={{ transition: 'stroke .3s' }} />)}
          {NODES.map(n => {
            const isCur = n.id === fr.cur, done = fr.out.includes(n.id), inQ = fr.queue.includes(n.id);
            return (
              <g key={n.id}>
                <circle cx={n.x} cy={n.y} r="21" fill={isCur ? 'var(--a-current-soft)' : done ? 'var(--a-visited-soft)' : inQ ? 'color-mix(in srgb, var(--algo-accent) 14%, transparent)' : 'var(--a-surface-2)'} stroke={isCur ? 'var(--a-current)' : done ? 'var(--a-visited)' : inQ ? 'var(--algo-accent)' : 'var(--a-faint)'} strokeWidth={isCur ? 3.5 : 2.5} className={isCur ? 'algo-pulse' : ''} style={{ transition: 'fill .3s, stroke .3s' }} />
                <text x={n.x} y={n.y + 5} textAnchor="middle" style={{ font: '700 15px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{n.val}</text>
              </g>
            );
          })}
        </>
      )}
    />
  );
}
