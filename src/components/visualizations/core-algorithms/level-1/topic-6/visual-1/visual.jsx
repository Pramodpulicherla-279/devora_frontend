/* Lesson: Searching in a Rotated Sorted Array  [AlgoStage]
 * A sorted array rotated at an unknown pivot. Binary search still works: at each mid, one half
 * is always properly sorted — check if the target lies in it, else search the other. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const A = [6, 7, 8, 1, 2, 3, 4, 5];
const T = 3;
const CW = 66, gap = 8, startX = (640 - (A.length * (CW + gap) - gap)) / 2, Y = 62;

function buildFrames() {
  const f = []; let lo = 0, hi = A.length - 1, mid = null, found = null, sortedSide = null;
  const snap = o => f.push(Object.assign({ lo, hi, mid, found, sortedSide }, o));
  snap({ line: 2, log: `search ${T} in a rotated array` });
  let g = 0;
  while (lo <= hi && g++ < 20) {
    mid = (lo + hi) >> 1;
    snap({ line: 4, log: `mid=${mid}, a[mid]=${A[mid]}` });
    if (A[mid] === T) { found = mid; snap({ line: 5, found: mid, log: `a[${mid}] == ${T} → found`, done: true }); return f; }
    if (A[lo] <= A[mid]) {
      sortedSide = 'L';
      if (A[lo] <= T && T < A[mid]) { snap({ line: 7, sortedSide, log: `left half [${lo}..${mid}] sorted & holds ${T} → hi=${mid - 1}` }); hi = mid - 1; }
      else { snap({ line: 8, sortedSide, log: `left sorted but ${T} not in it → lo=${mid + 1}` }); lo = mid + 1; }
    } else {
      sortedSide = 'R';
      if (A[mid] < T && T <= A[hi]) { snap({ line: 10, sortedSide, log: `right half [${mid}..${hi}] sorted & holds ${T} → lo=${mid + 1}` }); lo = mid + 1; }
      else { snap({ line: 11, sortedSide, log: `right sorted but ${T} not in it → hi=${mid - 1}` }); hi = mid - 1; }
    }
  }
  snap({ line: 12, found: -1, log: 'not found', done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">search</span>(a, t):' },
  { n: 2, t: '    lo, hi = 0, <span class="fn">len</span>(a) - 1' },
  { n: 3, t: '    <span class="kw">while</span> lo <= hi:' },
  { n: 4, t: '        mid = (lo + hi) // 2' },
  { n: 5, t: '        <span class="kw">if</span> a[mid] == t: <span class="kw">return</span> mid' },
  { n: 6, t: '        <span class="kw">if</span> a[lo] <= a[mid]:      <span class="st"># left sorted</span>' },
  { n: 7, t: '            <span class="kw">if</span> a[lo] <= t < a[mid]: hi = mid-1' },
  { n: 8, t: '            <span class="kw">else</span>: lo = mid+1' },
  { n: 10, t: '        <span class="kw">elif</span> a[mid] < t <= a[hi]: lo = mid+1' },
  { n: 11, t: '        <span class="kw">else</span>: hi = mid-1' },
];

export default function SrchRotatedVisualization() {
  return (
    <AlgoStage
      title="Search in a Rotated Sorted Array"
      subtitle="The array was sorted, then rotated at a hidden pivot. The trick: at any mid, at least one half is still perfectly sorted — test whether the target falls inside it and search accordingly."
      accent="#6b8cff" viewBox="0 0 640 150"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'lo', type: 'int', prev: prev ? String(prev.lo) : '0', cur: String(fr.lo) },
        { name: 'hi', type: 'int', prev: prev ? String(prev.hi) : String(A.length - 1), cur: String(fr.hi) },
        { name: 'mid', type: 'int', prev: prev && prev.mid != null ? String(prev.mid) : '—', cur: fr.mid == null ? '—' : String(fr.mid) },
        { name: 'sorted half', type: 'str', prev: prev && prev.sortedSide ? (prev.sortedSide === 'L' ? 'left' : 'right') : '—', cur: fr.sortedSide ? (fr.sortedSide === 'L' ? 'left' : 'right') : '—' },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(found|not found)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Comparing <code>a[lo]</code> to <code>a[mid]</code> tells you which side is sorted. Then a simple range check decides where the target must be. Still <strong>O(log n)</strong> — no need to find the pivot first. Watch the edge cases with duplicates, which can force O(n).</>}
      renderCanvas={fr => (
        <>
          {A.map((v, k) => {
            const inRange = k >= fr.lo && k <= fr.hi, isMid = k === fr.mid, found = fr.found === k;
            const inSorted = fr.sortedSide === 'L' ? (k >= fr.lo && k <= fr.mid) : fr.sortedSide === 'R' ? (k >= fr.mid && k <= fr.hi) : false;
            const fill = found ? 'var(--a-visited-soft)' : isMid ? 'var(--a-current-soft)' : inSorted ? 'color-mix(in srgb, var(--algo-accent) 12%, transparent)' : inRange ? 'var(--a-surface-2)' : 'var(--a-code)';
            const stroke = found ? 'var(--a-visited)' : isMid ? 'var(--a-current)' : inRange ? 'var(--a-faint)' : 'var(--a-border)';
            return (
              <g key={k} opacity={inRange || found ? 1 : 0.4}>
                <rect x={startX + k * (CW + gap)} y={Y} width={CW} height="48" rx="7" fill={fill} stroke={stroke} strokeWidth={isMid || found ? 3 : 2} className={isMid && fr.found == null ? 'algo-pulse' : ''} style={{ transition: 'fill .25s, opacity .25s' }} />
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
