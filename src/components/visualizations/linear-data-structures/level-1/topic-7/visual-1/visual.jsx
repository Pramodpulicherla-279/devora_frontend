/* Lesson: The Two-Pointer Technique  [AlgoStage framework]
 * Two-sum on a SORTED array: one pointer at each end, moved by comparing the sum to the
 * target. Fully stepped with synced code, live lo/hi/sum inspector, console. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const A = [2, 3, 5, 8, 11, 15];
const T = 16;
const CW = 74, gap = 8, startX = (640 - (A.length * (CW + gap) - gap)) / 2, Y = 70;

function buildFrames() {
  const f = []; let lo = 0, hi = A.length - 1, s = null, found = null;
  const snap = o => f.push(Object.assign({ lo, hi, s, found }, o));
  snap({ line: 2, log: `lo = 0, hi = ${A.length - 1}` });
  let guard = 0;
  while (lo < hi && guard++ < 12) {
    snap({ line: 3, log: `lo(${lo}) < hi(${hi})? yes` });
    s = A[lo] + A[hi];
    snap({ line: 4, log: `sum = ${A[lo]} + ${A[hi]} = ${s}` });
    if (s === T) { found = [lo, hi]; snap({ line: 6, found: [lo, hi], log: `${s} == ${T} → found indices (${lo}, ${hi})`, done: true }); break; }
    else if (s < T) { snap({ line: 7, log: `${s} < ${T} → need bigger, move lo` }); lo++; snap({ line: 8, log: `lo = ${lo}` }); }
    else { snap({ line: 9, log: `${s} > ${T} → need smaller, move hi` }); hi--; snap({ line: 10, log: `hi = ${hi}` }); }
  }
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">two_sum</span>(a, target):' },
  { n: 2, t: '    lo, hi = 0, <span class="fn">len</span>(a) - 1' },
  { n: 3, t: '    <span class="kw">while</span> lo < hi:' },
  { n: 4, t: '        s = a[lo] + a[hi]' },
  { n: 5, t: '        <span class="kw">if</span> s == target:' },
  { n: 6, t: '            <span class="kw">return</span> (lo, hi)' },
  { n: 7, t: '        <span class="kw">elif</span> s < target:' },
  { n: 8, t: '            lo += 1' },
  { n: 9, t: '        <span class="kw">else</span>:' },
  { n: 10, t: '            hi -= 1' },
];

export default function ArrTwoPointerVisualization() {
  return (
    <AlgoStage
      title="Two-Pointer: Pair Sum on a Sorted Array"
      subtitle="Because the array is sorted, comparing a[lo]+a[hi] to the target tells you which pointer to move: too small → raise lo, too big → lower hi. One pass, no nested loop."
      accent="#6b8cff"
      viewBox="0 0 640 160"
      frames={FRAMES}
      code={CODE}
      lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'lo', type: 'int', prev: prev ? String(prev.lo) : '0', cur: String(fr.lo) },
        { name: 'hi', type: 'int', prev: prev ? String(prev.hi) : String(A.length - 1), cur: String(fr.hi) },
        { name: 'a[lo]+a[hi]', type: 'int', prev: prev && prev.s != null ? String(prev.s) : '—', cur: fr.s == null ? '—' : String(fr.s) },
        { name: 'target', type: 'int', prev: String(T), cur: String(T) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(found indices[^)]*\))/, '<span class="pre">$1</span>')}</span>`}
      legend={<>The sorted order is the trick: each comparison rules out a whole side, so the pointers converge in <strong>O(n)</strong> instead of checking all pairs in O(n²). Works for pair-sum, 3-sum (fix one, two-pointer the rest), and container-with-most-water.</>}
      renderCanvas={fr => (
        <>
          {A.map((v, i) => {
            const isLo = i === fr.lo, isHi = i === fr.hi, found = fr.found && (i === fr.found[0] || i === fr.found[1]);
            const inRange = i >= fr.lo && i <= fr.hi;
            return (
              <g key={i} opacity={inRange || found ? 1 : 0.4}>
                <rect x={startX + i * (CW + gap)} y={Y} width={CW} height="52" rx="8" fill={found ? 'var(--a-visited-soft)' : isLo ? 'color-mix(in srgb, var(--algo-accent) 18%, transparent)' : isHi ? 'var(--a-current-soft)' : 'var(--a-surface-2)'} stroke={found ? 'var(--a-visited)' : isLo ? 'var(--algo-accent)' : isHi ? 'var(--a-current)' : 'var(--a-faint)'} strokeWidth={isLo || isHi || found ? 3 : 2} className={found ? 'algo-pulse' : ''} style={{ transition: 'fill .3s, stroke .3s, opacity .3s' }} />
                <text x={startX + i * (CW + gap) + CW / 2} y={Y + 33} textAnchor="middle" style={{ font: '700 18px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
                <text x={startX + i * (CW + gap) + CW / 2} y={Y + 68} textAnchor="middle" style={{ font: '10px ui-monospace, monospace', fill: 'var(--a-faint)' }}>{i}</text>
              </g>
            );
          })}
          <text x={startX + fr.lo * (CW + gap) + CW / 2} y={Y - 8} textAnchor="middle" style={{ font: '700 11px ui-monospace, monospace', fill: 'var(--algo-accent)' }}>lo</text>
          <text x={startX + fr.hi * (CW + gap) + CW / 2} y={fr.lo === fr.hi ? Y - 22 : Y - 8} textAnchor="middle" style={{ font: '700 11px ui-monospace, monospace', fill: 'var(--a-current)' }}>hi</text>
        </>
      )}
    />
  );
}
