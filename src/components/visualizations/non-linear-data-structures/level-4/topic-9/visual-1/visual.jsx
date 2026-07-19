/* Lesson: Connected Components — Finding Islands in a Graph  [AlgoStage framework]
 * Sweep every node; each unvisited one starts a new component and floods its island via BFS.
 * Fully stepped with synced code, count/queue/seen inspector, and console. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const NODES = [
  { id: 0, l: 'A', x: 90, y: 80 }, { id: 1, l: 'B', x: 220, y: 60 }, { id: 2, l: 'C', x: 160, y: 190 },
  { id: 3, l: 'D', x: 380, y: 90 }, { id: 4, l: 'E', x: 500, y: 70 },
  { id: 5, l: 'F', x: 380, y: 250 }, { id: 6, l: 'G', x: 500, y: 240 }, { id: 7, l: 'H', x: 600, y: 160 },
];
const ADJ = { 0: [1, 2], 1: [0, 2], 2: [0, 1], 3: [4], 4: [3], 5: [6, 7], 6: [5, 7], 7: [5, 6] };
const EDGES = []; { const seen = new Set(); for (const a in ADJ) for (const b of ADJ[a]) { const k = Math.min(a, b) + '-' + Math.max(a, b); if (!seen.has(k)) { seen.add(k); EDGES.push([+a, b]); } } }
const COLORS = ['#6b8cff', '#4fce78', '#f0a35e'];
const SOFT = ['color-mix(in srgb, #6b8cff 20%, transparent)', 'color-mix(in srgb, #4fce78 20%, transparent)', 'color-mix(in srgb, #f0a35e 20%, transparent)'];

function buildFrames() {
  const comp = {}, seen = new Set(); let count = 0, queue = [];
  const f = [];
  const snap = o => f.push(Object.assign({ comp: { ...comp }, seen: [...seen], count, queue: [...queue] }, o));
  snap({ line: 2, cur: null, log: 'seen = {}, count = 0' });
  for (const s of NODES.map(n => n.id)) {
    snap({ line: 4, cur: s, log: `outer: start = ${NODES[s].l}` });
    if (seen.has(s)) { snap({ line: 5, cur: s, log: `${NODES[s].l} already seen → skip`, skip: true }); continue; }
    count++;
    snap({ line: 7, cur: s, log: `new component #${count}` });
    queue = [s];
    let guard = 0;
    while (queue.length && guard++ < 40) {
      const u = queue.shift();
      snap({ line: 10, cur: u, log: `pop ${NODES[u].l}` });
      seen.add(u); comp[u] = count - 1;
      snap({ line: 11, cur: u, log: `mark ${NODES[u].l} (component ${count})`, add: u });
      for (const v of ADJ[u]) if (!seen.has(v) && !queue.includes(v)) { queue.push(v); snap({ line: 14, cur: u, con: v, log: `enqueue ${NODES[v].l}` }); }
    }
  }
  snap({ line: 15, cur: null, log: `${count} connected components found`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">count_components</span>(graph):' },
  { n: 2, t: '    seen, count = <span class="fn">set</span>(), 0' },
  { n: 3, t: '' },
  { n: 4, t: '    <span class="kw">for</span> s <span class="kw">in</span> graph:' },
  { n: 5, t: '        <span class="kw">if</span> s <span class="kw">in</span> seen: <span class="kw">continue</span>' },
  { n: 7, t: '        count += 1' },
  { n: 8, t: '        queue = [s]' },
  { n: 9, t: '        <span class="kw">while</span> queue:' },
  { n: 10, t: '            u = queue.pop(0)' },
  { n: 11, t: '            seen.add(u)' },
  { n: 12, t: '            <span class="kw">for</span> v <span class="kw">in</span> graph[u]:' },
  { n: 14, t: '                <span class="kw">if</span> v <span class="kw">not in</span> seen: queue.append(v)' },
  { n: 15, t: '    <span class="kw">return</span> count' },
];
const lineMap = { 2: 2, 4: 4, 5: 5, 7: 7, 10: 10, 11: 11, 14: 14, 15: 15 };

export default function GraphComponentsVisualization() {
  return (
    <AlgoStage
      title="Connected Components"
      subtitle="A component is a group of mutually reachable nodes. Walk every vertex; each unvisited one launches a BFS flood that paints its whole island one colour."
      accent="#4fce78"
      viewBox="0 0 640 300"
      frames={FRAMES}
      code={CODE}
      lineFor={fr => lineMap[fr.line] ?? null}
      variables={(fr, prev) => [
        { name: 's / u', type: 'node', prev: prev ? (prev.cur == null ? '—' : NODES[prev.cur].l) : '—', cur: fr.cur == null ? '—' : NODES[fr.cur].l },
        { name: 'count', type: 'int', prev: prev ? String(prev.count) : '0', cur: String(fr.count) },
        { name: 'queue', type: 'list', prev: prev ? '[' + prev.queue.map(x => NODES[x].l).join(',') + ']' : '[]', cur: '[' + fr.queue.map(x => NODES[x].l).join(',') + ']' },
        { name: 'len(seen)', type: 'int', prev: prev ? String(prev.seen.length) : '0', cur: String(fr.seen.length) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(new component #\d+)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Loop over all nodes; if one hasn't been seen, run BFS/DFS from it, mark everything reachable as one component, and increment the counter. This "count the flood-fills" pattern is exactly LeetCode's <strong>Number of Islands</strong>. Time <code>O(V+E)</code>.</>}
      aside={fr => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div>
            <div style={{ font: '600 10.5px ui-monospace, monospace', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--a-faint)', marginBottom: 4 }}>Components</div>
            <div style={{ font: '700 24px ui-monospace, monospace', color: COLORS[Math.max(0, fr.count - 1)] || 'var(--a-ink)' }}>{fr.count}</div>
          </div>
          <div>
            <div style={{ font: '600 10.5px ui-monospace, monospace', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--a-faint)', marginBottom: 6 }}>Flood queue</div>
            <div style={{ display: 'flex', gap: 6, minHeight: 28, alignItems: 'center' }}>
              {fr.queue.length ? fr.queue.map((x, k) => <span key={k} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 6, background: 'var(--a-surface-2)', color: 'var(--a-ink)', border: '1px solid var(--a-faint)', font: '700 12px ui-monospace, monospace' }}>{NODES[x].l}</span>) : <span style={{ color: 'var(--a-faint)', fontStyle: 'italic', fontSize: 13 }}>empty</span>}
            </div>
          </div>
        </div>
      )}
      renderCanvas={fr => (
        <>
          {EDGES.map(([a, b], k) => {
            const na = NODES[a], nb = NODES[b];
            const c = fr.comp[a];
            const both = fr.comp[a] !== undefined && fr.comp[b] !== undefined;
            return <line key={k} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke={both ? COLORS[c] : 'var(--a-border)'} strokeWidth={both ? 3 : 2} style={{ transition: 'stroke .3s' }} />;
          })}
          {NODES.map(n => {
            const c = fr.comp[n.id], isCur = n.id === fr.cur;
            return (
              <g key={n.id}>
                <circle cx={n.x} cy={n.y} r="20" fill={c !== undefined ? SOFT[c] : 'var(--a-surface-2)'} stroke={isCur ? 'var(--a-current)' : c !== undefined ? COLORS[c] : 'var(--a-faint)'} strokeWidth={isCur ? 3.5 : 2.5} className={isCur ? 'algo-pulse' : ''} style={{ transition: 'fill .3s, stroke .3s' }} />
                <text x={n.x} y={n.y + 5} textAnchor="middle" style={{ font: '700 14px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{n.l}</text>
              </g>
            );
          })}
        </>
      )}
    />
  );
}
