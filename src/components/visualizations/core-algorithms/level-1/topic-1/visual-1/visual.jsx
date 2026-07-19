/* Lesson: Linear Search  [AlgoStage framework]
 * Scan the array left to right until the target is found (or the end is reached). Fully stepped
 * with synced code, live i/a[i] inspector, console. The O(n) baseline every search improves on. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const A = [7, 3, 9, 2, 8, 5, 1];
const T = 8;
const CW = 72, gap = 12, startX = (640 - (A.length * (CW + gap) - gap)) / 2, Y = 66;

function buildFrames() {
  const f = []; let comps = 0;
  const snap = o => f.push(Object.assign({ comps }, o));
  snap({ line: 1, i: -1, found: null, log: `search for ${T}` });
  for (let i = 0; i < A.length; i++) {
    comps++;
    snap({ line: 3, i, found: null, log: `a[${i}] = ${A[i]} == ${T}?` });
    if (A[i] === T) { snap({ line: 4, i, found: i, log: `match → return index ${i}`, done: true }); return f; }
  }
  snap({ line: 5, i: A.length, found: -1, log: 'reached end → return -1', done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">linear_search</span>(a, target):' },
  { n: 2, t: '    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="fn">len</span>(a)):' },
  { n: 3, t: '        <span class="kw">if</span> a[i] == target:' },
  { n: 4, t: '            <span class="kw">return</span> i' },
  { n: 5, t: '    <span class="kw">return</span> -1' },
];

export default function SrchLinearVisualization() {
  return (
    <AlgoStage
      title="Linear Search — O(n)"
      subtitle="The simplest search: check each element in turn until you find the target or run out. No sorting required, works on any list — but slow for large data."
      accent="#6b8cff" viewBox="0 0 640 150"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'i', type: 'int', prev: prev ? String(prev.i) : '—', cur: String(fr.i) },
        { name: 'a[i]', type: 'int', prev: prev && prev.i >= 0 && prev.i < A.length ? String(A[prev.i]) : '—', cur: fr.i >= 0 && fr.i < A.length ? String(A[fr.i]) : '—' },
        { name: 'target', type: 'int', prev: String(T), cur: String(T) },
        { name: 'comparisons', type: 'int', prev: prev ? String(prev.comps) : '0', cur: String(fr.comps) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(return -?\d+)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Worst case scans all <code>n</code> elements → <strong>O(n)</strong>. It's the right choice for small or unsorted data, or when you'll only search once (sorting first would cost more). Every faster search — binary, hashing — trades setup or structure for speed.</>}
      renderCanvas={fr => (
        <>
          {A.map((v, k) => {
            const cur = k === fr.i, found = fr.found === k, checked = k < fr.i;
            const fill = found ? 'var(--a-visited-soft)' : cur ? 'var(--a-current-soft)' : checked ? 'var(--a-surface-2)' : 'var(--a-code)';
            const stroke = found ? 'var(--a-visited)' : cur ? 'var(--a-current)' : checked ? 'var(--a-faint)' : 'var(--a-border)';
            return (
              <g key={k}>
                <rect x={startX + k * (CW + gap)} y={Y} width={CW} height="52" rx="8" fill={fill} stroke={stroke} strokeWidth={cur || found ? 3 : 2} className={cur && fr.found == null ? 'algo-pulse' : ''} style={{ transition: 'fill .25s, stroke .25s' }} />
                <text x={startX + k * (CW + gap) + CW / 2} y={Y + 33} textAnchor="middle" style={{ font: '700 18px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
                <text x={startX + k * (CW + gap) + CW / 2} y={Y + 68} textAnchor="middle" style={{ font: '10px ui-monospace, monospace', fill: 'var(--a-faint)' }}>{k}</text>
              </g>
            );
          })}
        </>
      )}
    />
  );
}
