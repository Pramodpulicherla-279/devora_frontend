/* Lesson: Binary Search  [AlgoStage framework]
 * Halve the search range each step by comparing the middle element to the target. Fully stepped
 * with synced code, live lo/hi/mid inspector, console. Requires a SORTED array. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const A = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
const T = 23;
const CW = 54, gap = 6, startX = (640 - (A.length * (CW + gap) - gap)) / 2, Y = 60;

function buildFrames() {
  const f = []; let lo = 0, hi = A.length - 1, mid = null, found = null;
  const snap = o => f.push(Object.assign({ lo, hi, mid, found }, o));
  snap({ line: 2, log: `lo, hi = 0, ${A.length - 1}` });
  let guard = 0;
  while (lo <= hi && guard++ < 20) {
    snap({ line: 3, log: `lo(${lo}) <= hi(${hi})? yes` });
    mid = (lo + hi) >> 1;
    snap({ line: 4, log: `mid = ${mid}, a[mid] = ${A[mid]}` });
    if (A[mid] === T) { found = mid; snap({ line: 5, found: mid, log: `a[${mid}] == ${T} → found`, done: true }); return f; }
    if (A[mid] < T) { snap({ line: 6, log: `${A[mid]} < ${T} → go right` }); lo = mid + 1; snap({ line: 7, log: `lo = ${lo}` }); }
    else { snap({ line: 8, log: `${A[mid]} > ${T} → go left` }); hi = mid - 1; snap({ line: 9, log: `hi = ${hi}` }); }
  }
  snap({ line: 10, found: -1, log: 'lo > hi → not found', done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">binary_search</span>(a, target):' },
  { n: 2, t: '    lo, hi = 0, <span class="fn">len</span>(a) - 1' },
  { n: 3, t: '    <span class="kw">while</span> lo <= hi:' },
  { n: 4, t: '        mid = (lo + hi) // 2' },
  { n: 5, t: '        <span class="kw">if</span> a[mid] == target: <span class="kw">return</span> mid' },
  { n: 6, t: '        <span class="kw">elif</span> a[mid] < target:' },
  { n: 7, t: '            lo = mid + 1' },
  { n: 8, t: '        <span class="kw">else</span>:' },
  { n: 9, t: '            hi = mid - 1' },
  { n: 10, t: '    <span class="kw">return</span> -1' },
];

export default function SrchBinaryVisualization() {
  return (
    <AlgoStage
      title="Binary Search — O(log n)"
      subtitle="On a sorted array, compare the middle element to the target: if too small search the right half, too big the left. Each step discards half the remaining range."
      accent="#a78bfa" viewBox="0 0 640 150"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'lo', type: 'int', prev: prev ? String(prev.lo) : '0', cur: String(fr.lo) },
        { name: 'hi', type: 'int', prev: prev ? String(prev.hi) : String(A.length - 1), cur: String(fr.hi) },
        { name: 'mid', type: 'int', prev: prev && prev.mid != null ? String(prev.mid) : '—', cur: fr.mid == null ? '—' : String(fr.mid) },
        { name: 'a[mid]', type: 'int', prev: prev && prev.mid != null ? String(A[prev.mid]) : '—', cur: fr.mid == null ? '—' : String(A[fr.mid]) },
        { name: 'remaining', type: 'int', prev: prev ? String(Math.max(0, prev.hi - prev.lo + 1)) : String(A.length), cur: String(Math.max(0, fr.hi - fr.lo + 1)) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(found|not found)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Halving each step means <strong>O(log n)</strong> — a 1000-element array takes ~10 comparisons, a million ~20. The catch: the array must be <strong>sorted</strong>. Watch out for the classic bug <code>(lo+hi)//2</code> overflow (use <code>lo + (hi-lo)//2</code> in languages with fixed ints).</>}
      renderCanvas={fr => (
        <>
          {A.map((v, k) => {
            const inRange = k >= fr.lo && k <= fr.hi, isMid = k === fr.mid, found = fr.found === k;
            const fill = found ? 'var(--a-visited-soft)' : isMid ? 'var(--a-current-soft)' : inRange ? 'var(--a-surface-2)' : 'var(--a-code)';
            const stroke = found ? 'var(--a-visited)' : isMid ? 'var(--a-current)' : inRange ? 'var(--a-faint)' : 'var(--a-border)';
            return (
              <g key={k} opacity={inRange || found ? 1 : 0.4}>
                <rect x={startX + k * (CW + gap)} y={Y} width={CW} height="48" rx="7" fill={fill} stroke={stroke} strokeWidth={isMid || found ? 3 : 2} className={isMid && fr.found == null ? 'algo-pulse' : ''} style={{ transition: 'fill .25s, opacity .25s' }} />
                <text x={startX + k * (CW + gap) + CW / 2} y={Y + 30} textAnchor="middle" style={{ font: '700 14px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
                <text x={startX + k * (CW + gap) + CW / 2} y={Y + 64} textAnchor="middle" style={{ font: '9px ui-monospace, monospace', fill: 'var(--a-faint)' }}>{k}</text>
              </g>
            );
          })}
        </>
      )}
    />
  );
}
