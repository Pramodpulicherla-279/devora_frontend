/* Lesson: Union-Find (Disjoint Set) — The Data Structure Kruskal's Needs  [AlgoStage]
 * Watch a forest of parent pointers evolve: find() walks up to the root, union() hangs one
 * root under another. Live parent-array inspector. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const IDS = ['A', 'B', 'C', 'D', 'E', 'F'];
const OPS = [
  ['union', 'A', 'B'], ['union', 'C', 'D'], ['union', 'E', 'F'],
  ['find', 'B'], ['union', 'B', 'D'], ['union', 'D', 'F'], ['find', 'F'],
];
function buildFrames() {
  const f = []; const parent = {}; IDS.forEach(k => parent[k] = k);
  const find = x => { const path = [x]; while (parent[x] !== x) { x = parent[x]; path.push(x); } return { root: x, path }; };
  const snap = o => f.push(Object.assign({ parent: { ...parent } }, o));
  snap({ line: 1, log: 'everyone starts as their own root: parent[x] = x' });
  for (const [op, a, b] of OPS) {
    if (op === 'find') {
      const { root, path } = find(a);
      snap({ line: 3, path, log: `find(${a}): follow parents ${path.join(' → ')} → root ${root}` });
    } else {
      const ra = find(a), rb = find(b);
      snap({ line: 5, path: [...ra.path, ...rb.path], log: `union(${a},${b}): roots are ${ra.root} and ${rb.root}` });
      if (ra.root !== rb.root) { parent[rb.root] = ra.root; snap({ line: 6, joined: [rb.root, ra.root], log: `hang ${rb.root} under ${ra.root} → one component` }); }
      else snap({ line: 7, log: 'already same root — nothing to do' });
    }
  }
  snap({ line: 8, log: 'all six elements now share root A', done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: 'parent = {x: x <span class="kw">for</span> x <span class="kw">in</span> items}' },
  { n: 2, t: '<span class="kw">def</span> <span class="fn">find</span>(x):' },
  { n: 3, t: '    <span class="kw">while</span> parent[x] != x: x = parent[x]' },
  { n: 4, t: '    <span class="kw">return</span> x' },
  { n: 5, t: '<span class="kw">def</span> <span class="fn">union</span>(a, b):' },
  { n: 6, t: '    parent[<span class="fn">find</span>(b)] = <span class="fn">find</span>(a)' },
  { n: 7, t: '    <span class="st"># no-op if already joined</span>' },
  { n: 8, t: '<span class="st"># + path compression & rank → ~O(1)</span>' },
];
// fixed layout: roots row + children hang below as unions occur
const POS = { A: [110, 70], B: [110, 150], C: [280, 70], D: [280, 150], E: [450, 70], F: [450, 150] };

export default function AgraphUnionFindVisualization() {
  return (
    <AlgoStage
      title="Union-Find (Disjoint Set)"
      subtitle="Two operations rule connectivity questions: find(x) walks parent pointers to the root that names x's component; union(a,b) links one root under the other, merging two components."
      accent="#6b8cff" viewBox="0 0 640 240"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'parent[]', type: 'map', prev: prev ? IDS.map(k => k + ':' + prev.parent[k]).join(' ') : '', cur: IDS.map(k => k + ':' + fr.parent[k]).join(' ') },
        { name: 'components', type: 'int', prev: prev ? String(new Set(IDS.map(k => { let x = k; while (prev.parent[x] !== x) x = prev.parent[x]; return x; })).size) : '6', cur: String(new Set(IDS.map(k => { let x = k; while (fr.parent[x] !== x) x = fr.parent[x]; return x; })).size) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(root [A-F]|one component|share root A)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Naive find is O(depth); adding <strong>path compression</strong> (point every visited node straight at the root) and <strong>union by rank</strong> flattens trees so both ops run in effectively <strong>O(1)</strong> (inverse Ackermann). This powers Kruskal's, cycle detection, and "accounts merge" problems.</>}
      renderCanvas={fr => (
        <>
          <defs><marker id="auf-arr" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="var(--a-muted)" /></marker></defs>
          {IDS.map(id => {
            const p = fr.parent[id];
            if (p === id) return null;
            const [x1, y1] = POS[id], [x2, y2] = POS[p];
            const hot = fr.joined && fr.joined[0] === id;
            const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
            return <line key={id} x1={x1 + ux * 22} y1={y1 + uy * 22} x2={x2 - ux * 24} y2={y2 - uy * 24} stroke={hot ? 'var(--a-visited)' : 'var(--a-muted)'} strokeWidth={hot ? 3.5 : 2.5} markerEnd="url(#auf-arr)" className={hot ? 'algo-pulse' : ''} style={{ transition: 'stroke .25s' }} />;
          })}
          {IDS.map(id => {
            const [x, y] = POS[id];
            const isRoot = fr.parent[id] === id;
            const onPath = fr.path && fr.path.includes(id);
            return (
              <g key={id}>
                <circle cx={x} cy={y} r="20" fill={onPath ? 'var(--a-current-soft)' : isRoot ? 'color-mix(in srgb, var(--algo-accent) 22%, transparent)' : 'var(--a-surface-2)'} stroke={onPath ? 'var(--a-current)' : isRoot ? 'var(--algo-accent)' : 'var(--a-faint)'} strokeWidth={isRoot ? 3 : 2.5} className={onPath ? 'algo-pulse' : ''} style={{ transition: 'fill .25s' }} />
                <text x={x} y={y + 5} textAnchor="middle" style={{ font: '700 15px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{id}</text>
                {isRoot && <text x={x} y={y - 28} textAnchor="middle" style={{ font: '700 10px ui-monospace, monospace', fill: 'var(--algo-accent)' }}>root</text>}
              </g>
            );
          })}
          <text x="320" y="228" textAnchor="middle" style={{ font: '600 11px ui-monospace, monospace', fill: 'var(--a-faint)' }}>arrows point to parents · amber = the path a find() walks</text>
        </>
      )}
    />
  );
}
