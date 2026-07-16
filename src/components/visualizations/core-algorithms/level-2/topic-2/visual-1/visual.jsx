/* Lesson: Bubble Sort  [AlgoStage framework]
 * Repeated passes swap adjacent out-of-order pairs; the largest value "bubbles" to the end
 * each pass. Fully stepped: bars, synced code, live i/j/comparisons/swaps inspector, console. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const INIT = [5, 2, 8, 1, 9, 3];
const CW = 72, gap = 14, startX = (640 - (INIT.length * (CW + gap) - gap)) / 2, baseY = 176, unit = 15;

function buildFrames() {
  const a = [...INIT], n = a.length, f = []; let comps = 0, swaps = 0;
  const snap = o => f.push(Object.assign({ a: [...a], comps, swaps }, o));
  snap({ line: 2, i: null, j: null, sorted: 0, log: `n = ${n}` });
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      comps++;
      snap({ line: 5, i, j, sorted: i, log: `compare a[${j}]=${a[j]} & a[${j + 1}]=${a[j + 1]}` });
      if (a[j] > a[j + 1]) { const x = a[j], y = a[j + 1];[a[j], a[j + 1]] = [a[j + 1], a[j]]; swaps++; snap({ line: 6, i, j, sorted: i, swap: [j, j + 1], log: `${x} > ${y} → swap` }); }
    }
    snap({ line: 3, i, j: null, sorted: i + 1, log: `pass ${i + 1} done → ${a[n - 1 - i]} locked at end` });
  }
  snap({ line: 6, i: n, j: null, sorted: n, log: 'array sorted', done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">bubble_sort</span>(a):' },
  { n: 2, t: '    n = <span class="fn">len</span>(a)' },
  { n: 3, t: '    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(n):' },
  { n: 4, t: '        <span class="kw">for</span> j <span class="kw">in</span> <span class="fn">range</span>(n-1-i):' },
  { n: 5, t: '            <span class="kw">if</span> a[j] > a[j+1]:' },
  { n: 6, t: '                a[j], a[j+1] = a[j+1], a[j]' },
];

export default function SortBubbleVisualization() {
  return (
    <AlgoStage
      title="Bubble Sort — O(n²)"
      subtitle="Repeatedly walk the array swapping adjacent pairs that are out of order. Each pass floats the next-largest value to its final place at the end. Simple, stable, but slow."
      accent="#6b8cff" viewBox="0 0 640 200"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'i (pass)', type: 'int', prev: prev ? (prev.i == null ? '—' : String(prev.i)) : '—', cur: fr.i == null ? '—' : String(fr.i) },
        { name: 'j', type: 'int', prev: prev ? (prev.j == null ? '—' : String(prev.j)) : '—', cur: fr.j == null ? '—' : String(fr.j) },
        { name: 'comparisons', type: 'int', prev: prev ? String(prev.comps) : '0', cur: String(fr.comps) },
        { name: 'swaps', type: 'int', prev: prev ? String(prev.swaps) : '0', cur: String(fr.swaps) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(swap|sorted)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Two nested loops → <strong>O(n²)</strong> comparisons. After pass <code>i</code>, the last <code>i+1</code> elements are in final position (shown green). Bubble sort is mostly a teaching tool, but it's <strong>stable</strong> and detects an already-sorted array in one pass with an early-exit flag.</>}
      renderCanvas={fr => (
        <>
          {fr.a.map((v, k) => {
            const active = k === fr.j || k === fr.j + 1;
            const isSorted = k >= fr.a.length - fr.sorted;
            const isSwap = fr.swap && (k === fr.swap[0] || k === fr.swap[1]);
            const fill = isSwap ? 'var(--a-visited)' : isSorted ? 'var(--a-visited-soft)' : active ? 'var(--a-current)' : 'var(--a-surface-2)';
            const stroke = isSwap ? 'var(--a-visited)' : isSorted ? 'var(--a-visited)' : active ? 'var(--a-current)' : 'var(--a-faint)';
            return (
              <g key={k}>
                <rect x={startX + k * (CW + gap)} y={baseY - v * unit} width={CW} height={v * unit} rx="6" fill={fill} stroke={stroke} strokeWidth="2" className={active && !isSwap ? 'algo-pulse' : ''} style={{ transition: 'fill .25s, height .3s, y .3s' }} />
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
