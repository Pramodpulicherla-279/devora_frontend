/* Lesson: Merge Sort  [AlgoStage framework]
 * Bottom-up merge sort: merge adjacent sorted runs of width 1, 2, 4, … using a two-pointer
 * merge. Fully stepped: bars, synced code, run-width/segment inspector, console. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const INIT = [5, 2, 8, 1, 9, 3, 7, 4];
const CW = 58, gap = 10, startX = (640 - (INIT.length * (CW + gap) - gap)) / 2, baseY = 176, unit = 15;

function buildFrames() {
  const a = [...INIT], n = a.length, f = []; let comps = 0;
  const snap = o => f.push(Object.assign({ a: [...a], comps }, o));
  snap({ line: 2, width: 1, seg: null, log: 'every element is a sorted run of length 1' });
  let width = 1;
  while (width < n) {
    for (let lo = 0; lo < n; lo += 2 * width) {
      const mid = Math.min(lo + width, n), hi = Math.min(lo + 2 * width, n);
      if (mid >= hi) continue;
      const left = a.slice(lo, mid), right = a.slice(mid, hi);
      let i = 0, j = 0, k = lo;
      snap({ line: 5, width, seg: [lo, hi], mid, write: null, log: `merge runs [${lo}..${mid - 1}] & [${mid}..${hi - 1}]` });
      while (i < left.length && j < right.length) {
        comps++;
        if (left[i] <= right[j]) { a[k] = left[i]; i++; } else { a[k] = right[j]; j++; }
        snap({ line: 5, width, seg: [lo, hi], mid, write: k, log: `write ${a[k]} → position ${k}` }); k++;
      }
      while (i < left.length) { a[k] = left[i]; i++; snap({ line: 5, width, seg: [lo, hi], mid, write: k, log: `copy ${a[k]}` }); k++; }
      while (j < right.length) { a[k] = right[j]; j++; snap({ line: 5, width, seg: [lo, hi], mid, write: k, log: `copy ${a[k]}` }); k++; }
    }
    width *= 2;
    snap({ line: 6, width, seg: null, log: `runs are now length ${width}` });
  }
  snap({ line: 6, width, seg: null, allSorted: true, log: 'array sorted', done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">merge_sort</span>(a):' },
  { n: 2, t: '    width = 1' },
  { n: 3, t: '    <span class="kw">while</span> width < <span class="fn">len</span>(a):' },
  { n: 4, t: '        <span class="kw">for</span> lo <span class="kw">in</span> <span class="fn">range</span>(0, n, 2*width):' },
  { n: 5, t: '            merge(a, lo, lo+width, lo+2*width)' },
  { n: 6, t: '        width *= 2' },
];

export default function SortMergeVisualization() {
  return (
    <AlgoStage
      title="Merge Sort — O(n log n)"
      subtitle="Divide and conquer: treat each element as a sorted run, then repeatedly merge adjacent runs (width 1 → 2 → 4 …). Merging two sorted runs is a simple two-pointer pass."
      accent="#6b8cff" viewBox="0 0 640 200"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'run width', type: 'int', prev: prev ? String(prev.width) : '1', cur: String(fr.width) },
        { name: 'merging', type: 'range', prev: prev && prev.seg ? `[${prev.seg[0]}..${prev.seg[1] - 1}]` : '—', cur: fr.seg ? `[${fr.seg[0]}..${fr.seg[1] - 1}]` : '—' },
        { name: 'writing →', type: 'int', prev: prev && prev.write != null ? String(prev.write) : '—', cur: fr.write != null ? String(fr.write) : '—' },
        { name: 'comparisons', type: 'int', prev: prev ? String(prev.comps) : '0', cur: String(fr.comps) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(sorted)/, '<span class="pre">$1</span>')}</span>`}
      legend={<><code>log n</code> merge levels × <code>O(n)</code> work per level = <strong>O(n log n)</strong> guaranteed, in the worst case too. The cost is <strong>O(n)</strong> extra space for the merge buffer. Merge sort is <strong>stable</strong> and the basis of external sorting for data too big for memory.</>}
      renderCanvas={fr => (
        <>
          {fr.seg && <rect x={startX + fr.seg[0] * (CW + gap) - 4} y={baseY - 9 * unit - 8} width={(fr.seg[1] - fr.seg[0]) * (CW + gap) - gap + 8} height={9 * unit + 20} rx="10" fill="none" stroke="var(--algo-accent)" strokeWidth="2" strokeDasharray="6 4" />}
          {fr.a.map((v, k) => {
            const inSeg = fr.seg && k >= fr.seg[0] && k < fr.seg[1];
            const isWrite = fr.write === k;
            const fill = fr.allSorted ? 'var(--a-visited-soft)' : isWrite ? 'var(--a-visited)' : inSeg ? 'var(--a-current-soft)' : 'var(--a-surface-2)';
            const stroke = fr.allSorted || isWrite ? 'var(--a-visited)' : inSeg ? 'var(--a-current)' : 'var(--a-faint)';
            return (
              <g key={k}>
                <rect x={startX + k * (CW + gap)} y={baseY - v * unit} width={CW} height={v * unit} rx="5" fill={fill} stroke={stroke} strokeWidth="2" className={isWrite ? 'algo-pulse' : ''} style={{ transition: 'fill .25s, height .3s, y .3s' }} />
                <text x={startX + k * (CW + gap) + CW / 2} y={baseY - v * unit - 7} textAnchor="middle" style={{ font: '700 14px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
                <text x={startX + k * (CW + gap) + CW / 2} y={baseY + 16} textAnchor="middle" style={{ font: '10px ui-monospace, monospace', fill: 'var(--a-faint)' }}>{k}</text>
              </g>
            );
          })}
        </>
      )}
    />
  );
}
