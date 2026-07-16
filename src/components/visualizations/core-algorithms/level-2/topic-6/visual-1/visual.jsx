/* Lesson: Quick Sort  [AlgoStage framework]
 * Lomuto partition around the last element: a scanner j walks the range, swapping smaller
 * values behind a boundary i; the pivot then drops into place. Fully stepped with bars. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const INIT = [5, 2, 8, 1, 9, 3, 7, 4];
const CW = 58, gap = 10, startX = (640 - (INIT.length * (CW + gap) - gap)) / 2, baseY = 176, unit = 15;

function buildFrames() {
  const a = [...INIT], f = []; let comps = 0, swaps = 0; const fixed = new Set();
  const snap = o => f.push(Object.assign({ a: [...a], comps, swaps, fixed: [...fixed] }, o));
  function qs(lo, hi) {
    if (lo > hi) return;
    if (lo === hi) { fixed.add(lo); snap({ lo, hi, pivot: null, pval: null, i: null, j: null, log: `a[${lo}] alone → fixed` }); return; }
    const pval = a[hi]; let i = lo - 1;
    snap({ lo, hi, pivot: hi, pval, i, j: null, log: `partition [${lo}..${hi}], pivot = ${pval}` });
    for (let j = lo; j < hi; j++) {
      comps++;
      snap({ lo, hi, pivot: hi, pval, i, j, log: `a[${j}]=${a[j]} < pivot ${pval}?` });
      if (a[j] < pval) { i++; let sw = null; if (i !== j) {[a[i], a[j]] = [a[j], a[i]]; swaps++; sw = [i, j]; } snap({ lo, hi, pivot: hi, pval, i, j, swap: sw, log: `yes → move behind boundary (i=${i})` }); }
    }
    const p = i + 1;[a[p], a[hi]] = [a[hi], a[p]]; swaps++; fixed.add(p);
    snap({ lo, hi, pivot: p, pval, i: null, j: null, swap: [p, hi], log: `drop pivot at index ${p} → ${pval} final` });
    qs(lo, p - 1); qs(p + 1, hi);
  }
  qs(0, a.length - 1);
  snap({ lo: null, hi: null, pivot: null, pval: null, i: null, j: null, log: 'array sorted', done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">quick_sort</span>(a, lo, hi):' },
  { n: 2, t: '    <span class="kw">if</span> lo >= hi: <span class="kw">return</span>' },
  { n: 3, t: '    p = partition(a, lo, hi)   <span class="st"># pivot = a[hi]</span>' },
  { n: 4, t: '    quick_sort(a, lo, p-1)' },
  { n: 5, t: '    quick_sort(a, p+1, hi)' },
];

export default function SortQuickVisualization() {
  return (
    <AlgoStage
      title="Quick Sort — O(n log n) avg"
      subtitle="Pick a pivot, partition the range so smaller values sit left and larger right, then recurse on each side. In place and cache-friendly — usually the fastest general-purpose sort."
      accent="#a78bfa" viewBox="0 0 640 200"
      frames={FRAMES} code={CODE} lineFor={fr => (fr.done ? 5 : fr.pivot != null || fr.i != null ? 3 : 2)}
      variables={(fr, prev) => [
        { name: 'range', type: 'span', prev: prev && prev.lo != null ? `[${prev.lo}..${prev.hi}]` : '—', cur: fr.lo != null ? `[${fr.lo}..${fr.hi}]` : '—' },
        { name: 'pivot', type: 'int', prev: prev && prev.pval != null ? String(prev.pval) : '—', cur: fr.pval != null ? String(fr.pval) : '—' },
        { name: 'boundary i', type: 'int', prev: prev && prev.i != null ? String(prev.i) : '—', cur: fr.i != null ? String(fr.i) : '—' },
        { name: 'scanner j', type: 'int', prev: prev && prev.j != null ? String(prev.j) : '—', cur: fr.j != null ? String(fr.j) : '—' },
        { name: 'swaps', type: 'int', prev: prev ? String(prev.swaps) : '0', cur: String(fr.swaps) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(final|sorted)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Average <strong>O(n log n)</strong>, but a bad pivot (already-sorted input with last-element pivot) degrades to <strong>O(n²)</strong> — the next lesson fixes this with pivot choice. It's <strong>in place</strong> (O(log n) stack) but <strong>not stable</strong>. Green bars are pivots already in their final spot.</>}
      renderCanvas={fr => (
        <>
          {fr.lo != null && <rect x={startX + fr.lo * (CW + gap) - 4} y={baseY - 9 * unit - 8} width={(fr.hi - fr.lo + 1) * (CW + gap) - gap + 8} height={9 * unit + 20} rx="10" fill="none" stroke="var(--algo-accent)" strokeWidth="2" strokeDasharray="6 4" />}
          {fr.a.map((v, k) => {
            const isPivot = k === fr.pivot, isI = k === fr.i, isJ = k === fr.j, isFixed = fr.fixed.includes(k);
            const isSwap = fr.swap && (k === fr.swap[0] || k === fr.swap[1]);
            const fill = fr.done || isFixed ? 'var(--a-visited-soft)' : isPivot ? 'color-mix(in srgb, var(--algo-accent) 40%, transparent)' : isSwap ? 'var(--a-visited)' : isJ ? 'var(--a-current)' : 'var(--a-surface-2)';
            const stroke = fr.done || isFixed ? 'var(--a-visited)' : isPivot ? 'var(--algo-accent)' : isJ ? 'var(--a-current)' : isI ? 'var(--a-muted)' : 'var(--a-faint)';
            return (
              <g key={k}>
                <rect x={startX + k * (CW + gap)} y={baseY - v * unit} width={CW} height={v * unit} rx="5" fill={fill} stroke={stroke} strokeWidth={isPivot || isI ? 3 : 2} className={isJ ? 'algo-pulse' : ''} style={{ transition: 'fill .25s, height .3s, y .3s' }} />
                <text x={startX + k * (CW + gap) + CW / 2} y={baseY - v * unit - 7} textAnchor="middle" style={{ font: '700 14px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
                {isI && <text x={startX + k * (CW + gap) + CW / 2} y={baseY + 16} textAnchor="middle" style={{ font: '700 10px ui-monospace, monospace', fill: 'var(--a-muted)' }}>i</text>}
                {isPivot && !fr.done && <text x={startX + k * (CW + gap) + CW / 2} y={baseY + 16} textAnchor="middle" style={{ font: '700 10px ui-monospace, monospace', fill: 'var(--algo-accent)' }}>pivot</text>}
              </g>
            );
          })}
        </>
      )}
    />
  );
}
