/* Lesson: Floyd-Warshall — Shortest Paths Between All Pairs  [AlgoStage]
 * One matrix, one idea: for each intermediate node k, ask every pair (i,j) whether going
 * THROUGH k is shorter. Three loops, O(V³), all-pairs answer. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const V = 4;
const INF = Infinity;
const INIT = [
  [0, 3, 7, INF],
  [INF, 0, 1, 5],
  [INF, INF, 0, 2],
  [INF, INF, INF, 0],
];
function buildFrames() {
  const f = []; const d = INIT.map(r => [...r]);
  const fmt = x => x === INF ? '∞' : x;
  const snap = o => f.push(Object.assign({ d: d.map(r => [...r]) }, o));
  snap({ line: 1, log: 'start with direct edge weights (∞ = no edge)' });
  for (let k = 0; k < V; k++) {
    snap({ line: 2, k, log: `k = ${k + 1}: allow paths through node ${k + 1}` });
    for (let i = 0; i < V; i++) for (let j = 0; j < V; j++) {
      if (i === j || d[i][k] === INF || d[k][j] === INF) continue;
      const cand = d[i][k] + d[k][j];
      const better = cand < d[i][j];
      snap({ line: 4, k, i, j, log: `d[${i + 1}][${j + 1}]: via ${k + 1} = ${fmt(d[i][k])}+${fmt(d[k][j])} = ${cand} ${better ? '< ' + fmt(d[i][j]) + ' → update' : '≥ ' + fmt(d[i][j])}` });
      if (better) { d[i][j] = cand; snap({ line: 5, k, i, j, improved: true, log: `d[${i + 1}][${j + 1}] = ${cand}` }); }
    }
  }
  snap({ line: 6, log: 'matrix final — every cell is a shortest path', done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: 'd = adjacency matrix (∞ if no edge)' },
  { n: 2, t: '<span class="kw">for</span> k <span class="kw">in</span> <span class="fn">range</span>(V):' },
  { n: 3, t: '  <span class="kw">for</span> i, j <span class="kw">in</span> all pairs:' },
  { n: 4, t: '    <span class="kw">if</span> d[i][k] + d[k][j] < d[i][j]:' },
  { n: 5, t: '        d[i][j] = d[i][k] + d[k][j]' },
  { n: 6, t: '<span class="kw">return</span> d' },
];
const CW = 66, CH = 42, ox = 230, oy = 56;

export default function AgraphFloydWarshallVisualization() {
  return (
    <AlgoStage
      title="Floyd-Warshall (All Pairs)"
      subtitle="Grow the set of allowed 'stopover' nodes one at a time. After considering k, every cell holds the shortest path using only stopovers 1..k — after the last k, it's the true answer."
      accent="#a78bfa" viewBox="0 0 640 270"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'k (stopover)', type: 'int', prev: prev && prev.k != null ? String(prev.k + 1) : '—', cur: fr.k != null ? String(fr.k + 1) : '—' },
        { name: 'pair (i,j)', type: 'tuple', prev: prev && prev.i != null ? `(${prev.i + 1},${prev.j + 1})` : '—', cur: fr.i != null ? `(${fr.i + 1},${fr.j + 1})` : '—' },
        { name: 'd[i][j]', type: 'int', prev: '—', cur: fr.i != null ? (fr.d[fr.i][fr.j] === INF ? '∞' : String(fr.d[fr.i][fr.j])) : '—' },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(d\[\d\]\[\d\] = \d+|matrix final[^!]*)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Three nested loops → <strong>O(V³)</strong> time, O(V²) space — dense but wonderfully simple, and it handles negative edges (not negative cycles). Use it when V is small (&lt; ~400) and you need <em>every</em> pair; for one source, Dijkstra/Bellman-Ford is cheaper.</>}
      renderCanvas={fr => (
        <>
          {[1, 2, 3, 4].map((n, c) => <text key={'ch' + c} x={ox + c * CW + (CW - 6) / 2} y={oy - 10} textAnchor="middle" style={{ font: '700 12px ui-monospace, monospace', fill: fr.k === c ? 'var(--a-current)' : 'var(--algo-accent)' }}>→{n}</text>)}
          {[1, 2, 3, 4].map((n, r) => <text key={'rh' + r} x={ox - 18} y={oy + r * CH + 26} textAnchor="middle" style={{ font: '700 12px ui-monospace, monospace', fill: fr.k === r ? 'var(--a-current)' : 'var(--algo-accent)' }}>{n}→</text>)}
          {fr.d.map((row, r) => row.map((v, c) => {
            const isCur = fr.i === r && fr.j === c;
            const isViaRow = fr.k != null && (r === fr.k || c === fr.k);
            return (
              <g key={r + '-' + c}>
                <rect x={ox + c * CW} y={oy + r * CH} width={CW - 6} height={CH - 6} rx="7" fill={isCur ? (fr.improved ? 'var(--a-visited-soft)' : 'var(--a-current-soft)') : isViaRow ? 'color-mix(in srgb, var(--algo-accent) 10%, transparent)' : 'var(--a-surface-2)'} stroke={isCur ? (fr.improved ? 'var(--a-visited)' : 'var(--a-current)') : 'var(--a-border)'} strokeWidth={isCur ? 3 : 1} className={isCur ? 'algo-pulse' : ''} style={{ transition: 'fill .2s' }} />
                <text x={ox + c * CW + (CW - 6) / 2} y={oy + r * CH + 24} textAnchor="middle" style={{ font: '700 15px ui-monospace, monospace', fill: v === INF ? 'var(--a-faint)' : 'var(--a-ink)' }}>{v === INF ? '∞' : v}</text>
              </g>
            );
          }))}
          <text x="120" y="120" textAnchor="middle" style={{ font: '600 11px ui-monospace, monospace', fill: 'var(--a-faint)' }}>tinted row/col = the</text>
          <text x="120" y="136" textAnchor="middle" style={{ font: '600 11px ui-monospace, monospace', fill: 'var(--a-faint)' }}>current stopover k</text>
        </>
      )}
    />
  );
}
