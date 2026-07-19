/* Lesson: Binary Search on Answers  [AlgoStage]
 * Instead of searching an array, binary-search the ANSWER SPACE. Example: integer square root
 * of 58 — find the largest x with x*x <= 58 by halving the candidate range. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const N = 58;
function buildFrames() {
  const f = []; let lo = 0, hi = N, mid = null, best = 0;
  const snap = o => f.push(Object.assign({ lo, hi, mid, best }, o));
  snap({ line: 2, log: `answer is somewhere in [0, ${N}]` });
  let guard = 0;
  while (lo <= hi && guard++ < 20) {
    mid = lo + ((hi - lo) >> 1);
    const sq = mid * mid, ok = sq <= N;
    snap({ line: 4, sq, ok, log: `mid = ${mid}, mid² = ${sq} ${ok ? '≤' : '>'} ${N}` });
    if (ok) { best = mid; snap({ line: 5, sq, ok, log: `feasible → record ${mid}, search higher (lo = ${mid + 1})` }); lo = mid + 1; }
    else { snap({ line: 7, sq, ok, log: `too big → search lower (hi = ${mid - 1})` }); hi = mid - 1; }
  }
  snap({ line: 8, mid: null, log: `answer = ${best}  (isqrt of ${N})`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">isqrt</span>(N):' },
  { n: 2, t: '    lo, hi, best = 0, N, 0' },
  { n: 3, t: '    <span class="kw">while</span> lo <= hi:' },
  { n: 4, t: '        mid = lo + (hi - lo) // 2' },
  { n: 5, t: '        <span class="kw">if</span> mid*mid <= N:' },
  { n: 6, t: '            best = mid; lo = mid + 1' },
  { n: 7, t: '        <span class="kw">else</span>: hi = mid - 1' },
  { n: 8, t: '    <span class="kw">return</span> best' },
];
const X = a => 50 + (a / N) * 540;

export default function SrchBinaryAnswersVisualization() {
  return (
    <AlgoStage
      title="Binary Search on the Answer"
      subtitle="Many problems ask for the largest/smallest value that satisfies a condition. If 'feasible' flips from true to false at one boundary, you can binary-search the answer space itself — no array needed."
      accent="#6b8cff" viewBox="0 0 640 150"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'lo', type: 'int', prev: prev ? String(prev.lo) : '0', cur: String(fr.lo) },
        { name: 'hi', type: 'int', prev: prev ? String(prev.hi) : String(N), cur: String(fr.hi) },
        { name: 'mid', type: 'int', prev: prev && prev.mid != null ? String(prev.mid) : '—', cur: fr.mid == null ? '—' : String(fr.mid) },
        { name: 'mid²', type: 'int', prev: prev && prev.sq != null ? String(prev.sq) : '—', cur: fr.sq != null ? String(fr.sq) : '—' },
        { name: 'best', type: 'int', prev: prev ? String(prev.best) : '0', cur: String(fr.best) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(answer = \d+)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>The key insight: the condition <code>mid² ≤ N</code> is <strong>monotonic</strong> — true for small answers, false for large. That lets you halve the candidate range just like array binary search → <strong>O(log N)</strong>. Same pattern solves "minimum eating speed", "split array largest sum", and capacity problems.</>}
      renderCanvas={fr => (
        <>
          <line x1={X(0)} y1="70" x2={X(N)} y2="70" stroke="var(--a-border)" strokeWidth="3" />
          {/* active range band */}
          {fr.lo <= fr.hi && <rect x={X(fr.lo)} y="60" width={Math.max(2, X(fr.hi) - X(fr.lo))} height="20" rx="5" fill="color-mix(in srgb, var(--algo-accent) 22%, transparent)" stroke="var(--algo-accent)" style={{ transition: 'x .3s, width .3s' }} />}
          {[0, N].map(a => <text key={a} x={X(a)} y="102" textAnchor="middle" style={{ font: '10px ui-monospace, monospace', fill: 'var(--a-faint)' }}>{a}</text>)}
          {/* markers */}
          {fr.lo <= fr.hi && <text x={X(fr.lo)} y="50" textAnchor="middle" style={{ font: '700 11px ui-monospace, monospace', fill: 'var(--algo-accent)' }}>lo</text>}
          {fr.lo <= fr.hi && <text x={X(fr.hi)} y="120" textAnchor="middle" style={{ font: '700 11px ui-monospace, monospace', fill: 'var(--algo-accent)' }}>hi</text>}
          {fr.mid != null && <g><line x1={X(fr.mid)} y1="52" x2={X(fr.mid)} y2="88" stroke={fr.ok ? 'var(--a-visited)' : '#f85149'} strokeWidth="2.5" className="algo-pulse" /><text x={X(fr.mid)} y="44" textAnchor="middle" style={{ font: '700 12px ui-monospace, monospace', fill: fr.ok ? 'var(--a-visited)' : '#f85149' }}>{fr.mid}</text></g>}
          {/* best marker */}
          <circle cx={X(fr.best)} cy="70" r="7" fill="var(--a-visited)" />
          <text x={X(fr.best)} y="134" textAnchor="middle" style={{ font: '700 11px ui-monospace, monospace', fill: 'var(--a-visited)' }}>best={fr.best}</text>
        </>
      )}
    />
  );
}
