/* Lesson: Prim's Algorithm — Growing a Spanning Tree From a Single Node  [AlgoStage]
 * Start at one node; repeatedly add the CHEAPEST edge that connects the growing tree to a
 * node outside it. Same MST, different greedy angle from Kruskal's. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const N = { A: [100, 80], B: [280, 50], C: [460, 90], D: [180, 210], E: [380, 220] };
const EDGES = [['A', 'B', 4], ['B', 'C', 3], ['A', 'D', 2], ['B', 'D', 5], ['B', 'E', 6], ['C', 'E', 1], ['D', 'E', 7]];
function buildFrames() {
  const f = []; const inTree = new Set(['A']); const mst = []; let cost = 0;
  const snap = o => f.push(Object.assign({ inTree: [...inTree], mst: mst.map(e => [...e]), cost }, o));
  snap({ line: 1, log: 'start the tree at A' });
  let guard = 0;
  while (inTree.size < Object.keys(N).length && guard++ < 8) {
    const frontier = EDGES.filter(([a, b]) => inTree.has(a) !== inTree.has(b));
    snap({ line: 3, frontier: frontier.map(e => [...e]), log: `frontier edges: ${frontier.map(([a, b, w]) => a + b + '(' + w + ')').join(', ')}` });
    let best = null; for (const e of frontier) if (!best || e[2] < best[2]) best = e;
    const nw = inTree.has(best[0]) ? best[1] : best[0];
    inTree.add(nw); mst.push([best[0], best[1]]); cost += best[2];
    snap({ line: 5, picked: [best[0], best[1]], log: `cheapest crossing edge = ${best[0]}–${best[1]} (${best[2]}) → add ${nw} (cost ${cost})` });
  }
  snap({ line: 6, log: `tree spans all nodes — total cost ${cost} (same as Kruskal's!)`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: 'tree = {start}' },
  { n: 2, t: '<span class="kw">while</span> tree misses nodes:' },
  { n: 3, t: '    frontier = edges leaving the tree' },
  { n: 4, t: '    e = cheapest frontier edge   <span class="st"># heap</span>' },
  { n: 5, t: '    add e and its new node to the tree' },
  { n: 6, t: '<span class="kw">return</span> tree' },
];

export default function AgraphPrimVisualization() {
  return (
    <AlgoStage
      title="Prim's Algorithm"
      subtitle="One connected blob that swallows its cheapest neighbour, over and over. Where Kruskal's scatters accepted edges anywhere, Prim's tree grows outward from a seed like a crystal."
      accent="#a78bfa" viewBox="0 0 640 280"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'in tree', type: 'set', prev: prev ? '{' + prev.inTree.join(',') + '}' : '{A}', cur: '{' + fr.inTree.join(',') + '}' },
        { name: 'picked', type: 'edge', prev: prev && prev.picked ? prev.picked.join('–') : '—', cur: fr.picked ? fr.picked.join('–') : '—' },
        { name: 'cost', type: 'int', prev: prev ? String(prev.cost) : '0', cur: String(fr.cost) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(cheapest crossing edge[^→]*|total cost \d+[^!]*)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>With a min-heap over frontier edges, Prim's runs in <strong>O(E log V)</strong>. It shines on <strong>dense</strong> graphs and when you already have adjacency lists; Kruskal's (edge-sorted + union-find) often wins on sparse edge lists. Both build a minimum spanning tree — the next lesson compares them head-on.</>}
      renderCanvas={fr => (
        <>
          {EDGES.map(([a, b, w], k) => {
            const [x1, y1] = N[a], [x2, y2] = N[b];
            const inMst = fr.mst.some(([ma, mb]) => ma === a && mb === b);
            const isFrontier = fr.frontier && fr.frontier.some(([fa, fb]) => fa === a && fb === b);
            const isPicked = fr.picked && fr.picked[0] === a && fr.picked[1] === b;
            const col = isPicked ? 'var(--a-visited)' : inMst ? 'var(--a-visited)' : isFrontier ? 'var(--a-current)' : 'var(--a-border)';
            return (
              <g key={k}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={col} strokeWidth={inMst || isPicked ? 4 : isFrontier ? 3 : 2} strokeDasharray={isFrontier && !isPicked ? '6 4' : 'none'} className={isPicked ? 'algo-pulse' : ''} style={{ transition: 'stroke .25s' }} />
                <circle cx={(x1 + x2) / 2} cy={(y1 + y2) / 2} r="11" fill="var(--a-code)" stroke={col} />
                <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 + 4} textAnchor="middle" style={{ font: '700 11px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{w}</text>
              </g>
            );
          })}
          {Object.entries(N).map(([id, [x, y]]) => {
            const inT = fr.inTree.includes(id);
            return (
              <g key={id}>
                <circle cx={x} cy={y} r="20" fill={inT ? 'color-mix(in srgb, var(--algo-accent) 24%, transparent)' : 'var(--a-surface-2)'} stroke={inT ? 'var(--algo-accent)' : 'var(--a-faint)'} strokeWidth={inT ? 3 : 2.5} style={{ transition: 'fill .25s' }} />
                <text x={x} y={y + 5} textAnchor="middle" style={{ font: '700 15px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{id}</text>
              </g>
            );
          })}
          <text x="320" y="272" textAnchor="middle" style={{ font: '600 11px ui-monospace, monospace', fill: 'var(--a-faint)' }}>purple blob = the growing tree · dashed amber = frontier candidates</text>
        </>
      )}
    />
  );
}
