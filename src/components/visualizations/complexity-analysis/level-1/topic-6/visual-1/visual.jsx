/* Lesson: Logarithmic Time O(log n) — binary search  [AlgoStage framework]
 * Fully stepped binary search: transport, synced code, live lo/hi/mid inspector, console. Each
 * step halves the search space — the essence of O(log n). */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const A = Array.from({ length: 16 }, (_, i) => i * 2 + 1);   // 1,3,5,...,31 (sorted)
const T = 25;

function buildFrames() {
  const f = []; let lo = 0, hi = 15, mid = null, found = null;
  const snap = o => f.push(Object.assign({ lo, hi, mid, found }, o));
  snap({ line: 2, log: 'lo, hi = 0, 15' });
  let guard = 0;
  while (lo <= hi && guard++ < 20) {
    snap({ line: 3, log: `lo(${lo}) <= hi(${hi})? yes` });
    mid = Math.floor((lo + hi) / 2);
    snap({ line: 4, log: `mid = (${lo}+${hi})//2 = ${mid}` });
    snap({ line: 5, log: `a[${mid}] = ${A[mid]}, target = ${T}` });
    if (A[mid] === T) { found = mid; snap({ line: 6, found: mid, log: `found ${T} at index ${mid}`, done: true }); break; }
    else if (A[mid] < T) { snap({ line: 7, log: `${A[mid]} < ${T} → search right` }); lo = mid + 1; snap({ line: 8, log: `lo = mid + 1 = ${lo}` }); }
    else { snap({ line: 9, log: `${A[mid]} > ${T} → search left` }); hi = mid - 1; snap({ line: 10, log: `hi = mid - 1 = ${hi}` }); }
  }
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">binary_search</span>(a, target):' },
  { n: 2, t: '    lo, hi = 0, <span class="fn">len</span>(a) - 1' },
  { n: 3, t: '    <span class="kw">while</span> lo <= hi:' },
  { n: 4, t: '        mid = (lo + hi) // 2' },
  { n: 5, t: '        <span class="kw">if</span> a[mid] == target:' },
  { n: 6, t: '            <span class="kw">return</span> mid' },
  { n: 7, t: '        <span class="kw">elif</span> a[mid] < target:' },
  { n: 8, t: '            lo = mid + 1' },
  { n: 9, t: '        <span class="kw">else</span>:' },
  { n: 10, t: '            hi = mid - 1' },
];

export default function CaLogTimeVisualization() {
  const CW = 36, gap = 4, startX = 20;
  return (
    <AlgoStage
      title="Binary Search — O(log n)"
      subtitle="Each comparison discards half the remaining elements, so a sorted array of n items is searched in about log₂(n) steps. Scrub to watch lo, hi and mid close in on the target."
      accent="#a78bfa"
      viewBox="0 0 640 190"
      frames={FRAMES}
      code={CODE}
      lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'lo', type: 'int', prev: prev ? String(prev.lo) : '0', cur: String(fr.lo) },
        { name: 'hi', type: 'int', prev: prev ? String(prev.hi) : '15', cur: String(fr.hi) },
        { name: 'mid', type: 'int', prev: prev ? (prev.mid == null ? '—' : String(prev.mid)) : '—', cur: fr.mid == null ? '—' : String(fr.mid) },
        { name: 'a[mid]', type: 'int', prev: prev && prev.mid != null ? String(A[prev.mid]) : '—', cur: fr.mid == null ? '—' : String(A[fr.mid]) },
        { name: 'target', type: 'int', prev: String(T), cur: String(T) },
        { name: 'space', type: 'int', prev: prev ? String(Math.max(0, prev.hi - prev.lo + 1)) : '16', cur: String(Math.max(0, fr.hi - fr.lo + 1)) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(found) (\d+)/, '<span class="pre">$1 $2</span>')}</span>`}
      legend={<>Keep two bounds <code>lo</code> and <code>hi</code>; check the middle. If it's the target, done; if too small, discard the left half (<code>lo = mid+1</code>); if too big, discard the right half. The search space halves every step → <strong>O(log n)</strong>. A million items take only ~20 comparisons. Requires a <strong>sorted</strong> array.</>}
      aside={fr => (
        <div>
          <div style={{ font: '600 10.5px ui-monospace, monospace', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--a-faint)', marginBottom: 4 }}>Search space</div>
          <div style={{ font: '13px ui-monospace, monospace', color: 'var(--a-ink)' }}>
            {fr.found != null ? <span style={{ color: 'var(--a-visited)', fontWeight: 700 }}>target found at index {fr.found}</span>
              : <>indices [{fr.lo} .. {fr.hi}] — <b style={{ color: 'var(--algo-accent)' }}>{Math.max(0, fr.hi - fr.lo + 1)}</b> of 16 elements remain</>}
          </div>
        </div>
      )}
      renderCanvas={fr => (
        <>
          {A.map((v, k) => {
            const inRange = k >= fr.lo && k <= fr.hi;
            const isMid = k === fr.mid;
            const isFound = fr.found === k;
            const fill = isFound ? 'var(--a-visited-soft)' : isMid ? 'var(--a-current-soft)' : inRange ? 'var(--a-surface-2)' : 'var(--a-code)';
            const stroke = isFound ? 'var(--a-visited)' : isMid ? 'var(--a-current)' : inRange ? 'var(--a-faint)' : 'var(--a-border)';
            return (
              <g key={k} opacity={inRange || isFound ? 1 : 0.4}>
                <rect x={startX + k * (CW + gap)} y="56" width={CW} height="50" rx="7" fill={fill} stroke={stroke} strokeWidth={isMid || isFound ? 3 : 2} style={{ transition: 'fill .3s, stroke .3s, opacity .3s' }} className={isMid && fr.found == null ? 'algo-pulse' : ''} />
                <text x={startX + k * (CW + gap) + CW / 2} y="86" textAnchor="middle" style={{ font: '700 15px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
                <text x={startX + k * (CW + gap) + CW / 2} y="122" textAnchor="middle" style={{ font: '10px ui-monospace, monospace', fill: 'var(--a-faint)' }}>{k}</text>
              </g>
            );
          })}
          {/* lo / hi / mid pointers */}
          {fr.lo <= 15 && <text x={startX + fr.lo * (CW + gap) + CW / 2} y="46" textAnchor="middle" style={{ font: '700 12px ui-monospace, monospace', fill: 'var(--algo-accent)' }}>lo</text>}
          {fr.hi >= 0 && <text x={startX + fr.hi * (CW + gap) + CW / 2} y="146" textAnchor="middle" style={{ font: '700 12px ui-monospace, monospace', fill: 'var(--algo-accent)' }}>hi</text>}
          {fr.mid != null && <text x={startX + fr.mid * (CW + gap) + CW / 2} y="146" textAnchor="middle" style={{ font: '700 12px ui-monospace, monospace', fill: 'var(--a-current)' }}>{fr.mid === fr.lo ? '' : fr.mid === fr.hi ? '' : 'mid'}</text>}
        </>
      )}
    />
  );
}
