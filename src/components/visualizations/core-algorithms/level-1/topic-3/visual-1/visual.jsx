/* Lesson: Implementing Binary Search Without Off-by-One Errors  [AlgoStage]
 * Emphasises the loop invariant "answer ∈ [lo, hi]" and the three correct updates. Fully
 * stepped, showing why it's lo = mid+1 / hi = mid-1, not lo = mid / hi = mid. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const A = [1, 3, 5, 7, 9, 11, 13, 15];
const T = 11;
const CW = 66, gap = 8, startX = (640 - (A.length * (CW + gap) - gap)) / 2, Y = 62;

function buildFrames() {
  const f = []; let lo = 0, hi = A.length - 1, mid = null, found = null;
  const snap = o => f.push(Object.assign({ lo, hi, mid, found }, o));
  snap({ line: 2, log: 'invariant: if present, target ∈ [lo, hi]' });
  let guard = 0;
  while (lo <= hi && guard++ < 20) {
    snap({ line: 3, log: `lo(${lo}) <= hi(${hi})  — range still non-empty` });
    mid = lo + ((hi - lo) >> 1);
    snap({ line: 4, log: `mid = lo + (hi-lo)//2 = ${mid}  (overflow-safe)` });
    if (A[mid] === T) { found = mid; snap({ line: 5, found: mid, log: `a[${mid}] == ${T} → return ${mid}`, done: true }); return f; }
    if (A[mid] < T) { snap({ line: 6, log: `a[${mid}]=${A[mid]} < ${T} → discard mid, lo = mid+1` }); lo = mid + 1; }
    else { snap({ line: 7, log: `a[${mid}]=${A[mid]} > ${T} → discard mid, hi = mid-1` }); hi = mid - 1; }
  }
  snap({ line: 8, found: -1, log: 'lo > hi → range empty → not found', done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">binary_search</span>(a, target):' },
  { n: 2, t: '    lo, hi = 0, <span class="fn">len</span>(a) - 1   <span class="st"># closed [lo, hi]</span>' },
  { n: 3, t: '    <span class="kw">while</span> lo <= hi:' },
  { n: 4, t: '        mid = lo + (hi - lo) // 2' },
  { n: 5, t: '        <span class="kw">if</span> a[mid] == target: <span class="kw">return</span> mid' },
  { n: 6, t: '        <span class="kw">elif</span> a[mid] < target: lo = mid + 1' },
  { n: 7, t: '        <span class="kw">else</span>: hi = mid - 1' },
  { n: 8, t: '    <span class="kw">return</span> -1' },
];

export default function SrchBinaryImplVisualization() {
  return (
    <AlgoStage
      title="Binary Search Without Off-by-One Bugs"
      subtitle="Three details prevent the classic bugs: use a closed interval [lo, hi] with lo <= hi, compute mid overflow-safely, and always exclude mid with mid±1 so the range strictly shrinks."
      accent="#a78bfa" viewBox="0 0 640 150"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'lo', type: 'int', prev: prev ? String(prev.lo) : '0', cur: String(fr.lo) },
        { name: 'hi', type: 'int', prev: prev ? String(prev.hi) : String(A.length - 1), cur: String(fr.hi) },
        { name: 'mid', type: 'int', prev: prev && prev.mid != null ? String(prev.mid) : '—', cur: fr.mid == null ? '—' : String(fr.mid) },
        { name: 'range size', type: 'int', prev: prev ? String(Math.max(0, prev.hi - prev.lo + 1)) : String(A.length), cur: String(Math.max(0, fr.hi - fr.lo + 1)) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(return -?\d+|not found)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>The killer bug is <code>lo = mid</code> (or <code>hi = mid</code>): if mid never leaves the range, an unlucky comparison loops forever. Because we already checked <code>a[mid]</code>, excluding it with <strong><code>mid+1</code>/<code>mid-1</code></strong> is both correct and guarantees termination. <code>lo &lt;= hi</code> (not <code>&lt;</code>) checks the last single element.</>}
      renderCanvas={fr => (
        <>
          {A.map((v, k) => {
            const inRange = k >= fr.lo && k <= fr.hi, isMid = k === fr.mid, found = fr.found === k;
            const fill = found ? 'var(--a-visited-soft)' : isMid ? 'var(--a-current-soft)' : inRange ? 'var(--a-surface-2)' : 'var(--a-code)';
            const stroke = found ? 'var(--a-visited)' : isMid ? 'var(--a-current)' : inRange ? 'var(--a-faint)' : 'var(--a-border)';
            return (
              <g key={k} opacity={inRange || found ? 1 : 0.35}>
                <rect x={startX + k * (CW + gap)} y={Y} width={CW} height="48" rx="7" fill={fill} stroke={stroke} strokeWidth={isMid || found ? 3 : 2} className={isMid && fr.found == null ? 'algo-pulse' : ''} style={{ transition: 'fill .25s, opacity .25s' }} />
                <text x={startX + k * (CW + gap) + CW / 2} y={Y + 30} textAnchor="middle" style={{ font: '700 15px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
                <text x={startX + k * (CW + gap) + CW / 2} y={Y + 64} textAnchor="middle" style={{ font: '9px ui-monospace, monospace', fill: 'var(--a-faint)' }}>{k}</text>
              </g>
            );
          })}
          {fr.lo <= A.length - 1 && fr.lo <= fr.hi && <text x={startX + fr.lo * (CW + gap) + CW / 2} y={Y - 6} textAnchor="middle" style={{ font: '700 11px ui-monospace, monospace', fill: 'var(--algo-accent)' }}>lo</text>}
          {fr.hi >= 0 && fr.lo <= fr.hi && <text x={startX + fr.hi * (CW + gap) + CW / 2} y={Y + 80} textAnchor="middle" style={{ font: '700 11px ui-monospace, monospace', fill: 'var(--algo-accent)' }}>hi</text>}
        </>
      )}
    />
  );
}
