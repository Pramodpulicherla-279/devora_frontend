/* Lesson: Inserting and Searching in a BST  [AlgoStage framework]
 * Insert 5: walk from the root going left (smaller) or right (bigger) until an empty slot,
 * then attach. Fully stepped with synced code, live node/compare inspector, console. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

// fixed BST layout. children[id] = {l, r}
const NODES = [
  { id: 0, val: 8, x: 280, y: 45 }, { id: 1, val: 3, x: 160, y: 110 }, { id: 2, val: 10, x: 400, y: 110 },
  { id: 3, val: 1, x: 95, y: 175 }, { id: 4, val: 6, x: 225, y: 175 }, { id: 5, val: 14, x: 470, y: 175 },
  { id: 6, val: 4, x: 180, y: 240 }, { id: 7, val: 7, x: 275, y: 240 },
];
const CH = { 0: { l: 1, r: 2 }, 1: { l: 3, r: 4 }, 2: { r: 5 }, 4: { l: 6, r: 7 } };
const NEW = { val: 5, parent: 6, side: 'r', x: 228, y: 300 };
const byId = id => NODES.find(n => n.id === id);
const edges = () => { const e = []; for (const p in CH) { if (CH[p].l != null) e.push([+p, CH[p].l, 'l']); if (CH[p].r != null) e.push([+p, CH[p].r, 'r']); } return e; };

function buildFrames() {
  const V = NEW.val, f = [];
  const path = [];
  let node = 0;
  const snap = o => f.push(Object.assign({ node, path: [...path], attached: false }, o));
  snap({ line: 2, node: 0, log: `insert ${V}: start at root (8)` });
  let guard = 0;
  while (guard++ < 8) {
    path.push(node);
    snap({ line: 3, node, log: `at node ${byId(node).val}` });
    const less = V < byId(node).val;
    if (less) {
      snap({ line: 4, node, log: `${V} < ${byId(node).val}? yes → go left` });
      const l = CH[node] && CH[node].l;
      if (l == null) { snap({ line: 5, node, attached: true, log: `left is empty → attach ${V}`, done: true }); break; }
      snap({ line: 6, node, log: `left = node ${byId(l).val}, descend` });
      node = l;
    } else {
      snap({ line: 8, node, log: `${V} < ${byId(node).val}? no → go right` });
      const r = CH[node] && CH[node].r;
      if (r == null) { snap({ line: 9, node, attached: true, log: `right is empty → attach ${V}`, done: true }); break; }
      snap({ line: 10, node, log: `right = node ${byId(r).val}, descend` });
      node = r;
    }
  }
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">insert</span>(root, val):' },
  { n: 2, t: '    node = root' },
  { n: 3, t: '    <span class="kw">while</span> node:' },
  { n: 4, t: '        <span class="kw">if</span> val < node.val:' },
  { n: 5, t: '            <span class="kw">if</span> <span class="kw">not</span> node.left: node.left = Node(val)' },
  { n: 6, t: '            node = node.left' },
  { n: 8, t: '        <span class="kw">else</span>:' },
  { n: 9, t: '            <span class="kw">if</span> <span class="kw">not</span> node.right: node.right = Node(val)' },
  { n: 10, t: '            node = node.right' },
];

export default function TreeBstInsertVisualization() {
  return (
    <AlgoStage
      title="Inserting Into a BST"
      subtitle="A binary search tree keeps smaller values left, bigger values right. To insert, walk down comparing at each node until you reach an empty slot — that's where the new node goes."
      accent="#4fce78"
      viewBox="0 0 560 330"
      frames={FRAMES}
      code={CODE}
      lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'val', type: 'int', prev: '5', cur: '5' },
        { name: 'node.val', type: 'int', prev: prev ? String(byId(prev.node).val) : '8', cur: String(byId(fr.node).val) },
        { name: 'val < node.val', type: 'bool', prev: prev ? String(5 < byId(prev.node).val) : '—', cur: String(5 < byId(fr.node).val) },
        { name: 'depth', type: 'int', prev: prev ? String(prev.path.length) : '0', cur: String(fr.path.length) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(attach \d+)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>At each node: if <code>val &lt; node.val</code> go left, else go right — the same comparison that makes <strong>search</strong> O(h). When the branch is empty, attach the new node there. On a balanced tree that's <code>O(log n)</code>; on a degenerate (sorted-insert) tree it degrades to <code>O(n)</code>.</>}
      renderCanvas={fr => (
        <>
          {edges().map(([p, c], k) => <line key={k} x1={byId(p).x} y1={byId(p).y} x2={byId(c).x} y2={byId(c).y} stroke={fr.path.includes(p) && fr.path.includes(c) ? 'var(--a-visited)' : 'var(--a-border)'} strokeWidth={fr.path.includes(p) && fr.path.includes(c) ? 3 : 2} style={{ transition: 'stroke .3s' }} />)}
          {/* edge to new node */}
          {fr.attached && <line x1={byId(NEW.parent).x} y1={byId(NEW.parent).y} x2={NEW.x} y2={NEW.y} stroke="var(--a-visited)" strokeWidth="3" />}
          {NODES.map(n => {
            const isCur = n.id === fr.node, inPath = fr.path.includes(n.id);
            return (
              <g key={n.id}>
                <circle cx={n.x} cy={n.y} r="20" fill={isCur ? 'var(--a-current-soft)' : inPath ? 'color-mix(in srgb, var(--a-visited) 12%, transparent)' : 'var(--a-surface-2)'} stroke={isCur ? 'var(--a-current)' : inPath ? 'var(--a-visited)' : 'var(--a-faint)'} strokeWidth={isCur ? 3.5 : 2.5} className={isCur ? 'algo-pulse' : ''} style={{ transition: 'fill .3s, stroke .3s' }} />
                <text x={n.x} y={n.y + 5} textAnchor="middle" style={{ font: '700 15px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{n.val}</text>
              </g>
            );
          })}
          {fr.attached && (
            <g className="algo-pulse">
              <circle cx={NEW.x} cy={NEW.y} r="20" fill="var(--a-visited-soft)" stroke="var(--a-visited)" strokeWidth="3.5" />
              <text x={NEW.x} y={NEW.y + 5} textAnchor="middle" style={{ font: '700 15px ui-monospace, monospace', fill: 'var(--a-visited)' }}>{NEW.val}</text>
            </g>
          )}
        </>
      )}
    />
  );
}
