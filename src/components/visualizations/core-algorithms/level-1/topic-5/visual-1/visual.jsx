/* Lesson: Finding the First and Last Occurrence  [AlgoStage]
 * Two biased binary searches over a sorted array with duplicates: one keeps going left after a
 * match (first index), the other right (last index). Fully stepped. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const A = [2, 5, 7, 7, 7, 9, 9, 11];
const T = 7;
const CW = 66, gap = 8, startX = (640 - (A.length * (CW + gap) - gap)) / 2, Y = 62;

function buildFrames() {
  const f = [];
  function search(bias, phase, firstFound) {
    let lo = 0, hi = A.length - 1, res = -1, mid = null;
    const snap = o => f.push(Object.assign({ lo, hi, mid, phase, res, first: firstFound }, o));
    snap({ line: bias === 'L' ? 2 : 5, log: `${phase === 'first' ? 'find FIRST' : 'find LAST'} ${T}: lo=0, hi=${A.length - 1}` });
    let g = 0;
    while (lo <= hi && g++ < 20) {
      mid = lo + ((hi - lo) >> 1);
      snap({ line: 3, log: `mid=${mid}, a[mid]=${A[mid]}` });
      if (A[mid] === T) { res = mid; if (bias === 'L') { snap({ line: 4, res, log: `match → keep searching LEFT (hi=${mid - 1})` }); hi = mid - 1; } else { snap({ line: 6, res, log: `match → keep searching RIGHT (lo=${mid + 1})` }); lo = mid + 1; } }
      else if (A[mid] < T) { lo = mid + 1; snap({ line: 7, res, log: `${A[mid]} < ${T} → lo=${lo}` }); }
      else { hi = mid - 1; snap({ line: 7, res, log: `${A[mid]} > ${T} → hi=${hi}` }); }
    }
    f.push(Object.assign({ lo, hi, mid: null, phase, res, first: firstFound, settled: true }, phase === 'last' ? { done: true } : {}));
    return res;
  }
  const first = search('L', 'first', -1);
  search('R', 'last', first);
  return f;
}
const FRAMES = buildFrames();
// fix last frame log
FRAMES.forEach(fr => { if (fr.settled) fr.log = fr.phase === 'first' ? `first occurrence = index ${fr.res}` : `range = [${fr.first} .. ${fr.res}]`; });

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">first_last</span>(a, t):' },
  { n: 2, t: '    <span class="st"># first: bias left</span>' },
  { n: 3, t: '    mid = (lo + hi) // 2' },
  { n: 4, t: '    <span class="kw">if</span> a[mid]==t: res=mid; hi=mid-1' },
  { n: 5, t: '    <span class="st"># last: bias right</span>' },
  { n: 6, t: '    <span class="kw">if</span> a[mid]==t: res=mid; lo=mid+1' },
  { n: 7, t: '    <span class="kw">else</span>: move lo or hi past t' },
];

export default function SrchFirstLastVisualization() {
  return (
    <AlgoStage
      title="First and Last Occurrence"
      subtitle="With duplicates, plain binary search finds *some* match. To get the boundaries, don't stop on a match — record it and keep searching left (for the first) or right (for the last)."
      accent="#4fce78" viewBox="0 0 640 150"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line ?? 3}
      variables={(fr, prev) => [
        { name: 'phase', type: 'str', prev: prev ? prev.phase : '', cur: fr.phase },
        { name: 'mid', type: 'int', prev: prev && prev.mid != null ? String(prev.mid) : '—', cur: fr.mid == null ? '—' : String(fr.mid) },
        { name: 'best index', type: 'int', prev: prev ? String(prev.res) : '-1', cur: String(fr.res) },
        { name: 'range', type: 'span', prev: prev ? `[${prev.lo}..${prev.hi}]` : '', cur: fr.settled ? '—' : `[${fr.lo}..${fr.hi}]` },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(first occurrence = index \d+|range = \[[^\]]*\])/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Both searches are <strong>O(log n)</strong>, so finding the full range is still <code>O(log n)</code> — far better than expanding linearly from one match (which is O(n) when the value repeats a lot). The trick is simply <em>not returning</em> on a match. Here first = index {FRAMES[FRAMES.length - 1].first}, last = index {FRAMES[FRAMES.length - 1].res}.</>}
      renderCanvas={fr => (
        <>
          {A.map((v, k) => {
            const inRange = !fr.settled && k >= fr.lo && k <= fr.hi, isMid = k === fr.mid, isTarget = v === T;
            const isRes = fr.settled && fr.phase === 'last' && (k === fr.first || k === fr.res);
            const fill = isRes ? 'var(--a-visited-soft)' : isMid ? 'var(--a-current-soft)' : inRange && isTarget ? 'color-mix(in srgb, var(--a-visited) 12%, transparent)' : inRange ? 'var(--a-surface-2)' : 'var(--a-code)';
            const stroke = isRes ? 'var(--a-visited)' : isMid ? 'var(--a-current)' : inRange ? 'var(--a-faint)' : 'var(--a-border)';
            return (
              <g key={k} opacity={inRange || fr.settled ? 1 : 0.4}>
                <rect x={startX + k * (CW + gap)} y={Y} width={CW} height="48" rx="7" fill={fill} stroke={stroke} strokeWidth={isMid || isRes ? 3 : 2} className={isMid ? 'algo-pulse' : ''} style={{ transition: 'fill .25s, opacity .25s' }} />
                <text x={startX + k * (CW + gap) + CW / 2} y={Y + 30} textAnchor="middle" style={{ font: '700 15px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
                <text x={startX + k * (CW + gap) + CW / 2} y={Y + 64} textAnchor="middle" style={{ font: '9px ui-monospace, monospace', fill: 'var(--a-faint)' }}>{k}</text>
              </g>
            );
          })}
        </>
      )}
    />
  );
}
