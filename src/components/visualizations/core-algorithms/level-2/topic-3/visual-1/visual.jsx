/* Lesson: Selection Sort  [AlgoStage framework]
 * Each pass scans the unsorted region for the minimum, then swaps it to the front. Fully
 * stepped: bars, synced code, live i/j/min/swaps inspector, console. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const INIT = [5, 2, 8, 1, 9, 3];
const CW = 72, gap = 14, startX = (640 - (INIT.length * (CW + gap) - gap)) / 2, baseY = 176, unit = 15;

function buildFrames() {
  const a = [...INIT], n = a.length, f = []; let comps = 0, swaps = 0;
  const snap = o => f.push(Object.assign({ a: [...a], comps, swaps }, o));
  snap({ line: 2, i: null, j: null, m: null, sorted: 0, log: `n = ${n}` });
  for (let i = 0; i < n; i++) {
    let m = i;
    snap({ line: 4, i, j: null, m, sorted: i, log: `min so far = a[${i}] = ${a[i]}` });
    for (let j = i + 1; j < n; j++) {
      comps++;
      snap({ line: 6, i, j, m, sorted: i, log: `a[${j}]=${a[j]} < a[${m}]=${a[m]}?` });
      if (a[j] < a[m]) { m = j; snap({ line: 7, i, j, m, sorted: i, log: `new minimum → index ${m} (${a[m]})` }); }
    }
    let sw = null;
    if (m !== i) {[a[i], a[m]] = [a[m], a[i]]; swaps++; sw = [i, m]; }
    snap({ line: 8, i, j: null, m, sorted: i + 1, swap: sw, log: `place ${a[i]} at index ${i}` });
  }
  snap({ line: 8, i: n, j: null, m: null, sorted: n, log: 'array sorted', done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">selection_sort</span>(a):' },
  { n: 2, t: '    n = <span class="fn">len</span>(a)' },
  { n: 3, t: '    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(n):' },
  { n: 4, t: '        m = i' },
  { n: 5, t: '        <span class="kw">for</span> j <span class="kw">in</span> <span class="fn">range</span>(i+1, n):' },
  { n: 6, t: '            <span class="kw">if</span> a[j] < a[m]:' },
  { n: 7, t: '                m = j' },
  { n: 8, t: '        a[i], a[m] = a[m], a[i]' },
];

export default function SortSelectionVisualization() {
  return (
    <AlgoStage
      title="Selection Sort — O(n²)"
      subtitle="Find the smallest value in the unsorted part and swap it to the front, growing a sorted prefix one element at a time. Always exactly n−1 swaps — the fewest of the simple sorts."
      accent="#a78bfa" viewBox="0 0 640 200"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'i', type: 'int', prev: prev ? (prev.i == null ? '—' : String(prev.i)) : '—', cur: fr.i == null ? '—' : String(fr.i) },
        { name: 'j', type: 'int', prev: prev ? (prev.j == null ? '—' : String(prev.j)) : '—', cur: fr.j == null ? '—' : String(fr.j) },
        { name: 'min index', type: 'int', prev: prev ? (prev.m == null ? '—' : String(prev.m)) : '—', cur: fr.m == null ? '—' : String(fr.m) },
        { name: 'swaps', type: 'int', prev: prev ? String(prev.swaps) : '0', cur: String(fr.swaps) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(new minimum|sorted)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Selection sort makes <strong>O(n²)</strong> comparisons but only <strong>O(n)</strong> swaps — useful when writes are expensive. The green prefix is finished; purple marks the current minimum, amber the element being compared. Unlike bubble/insertion, it's <strong>not stable</strong> by default.</>}
      renderCanvas={fr => (
        <>
          {fr.a.map((v, k) => {
            const isSorted = k < fr.sorted, isMin = k === fr.m, isJ = k === fr.j;
            const isSwap = fr.swap && (k === fr.swap[0] || k === fr.swap[1]);
            const fill = isSwap ? 'var(--a-visited)' : isSorted ? 'var(--a-visited-soft)' : isMin ? 'color-mix(in srgb, var(--algo-accent) 40%, transparent)' : isJ ? 'var(--a-current)' : 'var(--a-surface-2)';
            const stroke = isSwap || isSorted ? 'var(--a-visited)' : isMin ? 'var(--algo-accent)' : isJ ? 'var(--a-current)' : 'var(--a-faint)';
            return (
              <g key={k}>
                <rect x={startX + k * (CW + gap)} y={baseY - v * unit} width={CW} height={v * unit} rx="6" fill={fill} stroke={stroke} strokeWidth={isMin ? 3 : 2} className={isJ ? 'algo-pulse' : ''} style={{ transition: 'fill .25s, height .3s, y .3s' }} />
                <text x={startX + k * (CW + gap) + CW / 2} y={baseY - v * unit - 7} textAnchor="middle" style={{ font: '700 15px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
                <text x={startX + k * (CW + gap) + CW / 2} y={baseY + 16} textAnchor="middle" style={{ font: '10px ui-monospace, monospace', fill: 'var(--a-faint)' }}>{k}</text>
              </g>
            );
          })}
        </>
      )}
    />
  );
}
