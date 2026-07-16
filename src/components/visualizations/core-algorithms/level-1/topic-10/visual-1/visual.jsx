/* Lesson: Interpolation Search  [AlgoStage]
 * For uniformly distributed sorted data, estimate WHERE the target should be (like guessing a
 * name's page in a phone book) instead of always probing the middle. ~O(log log n). */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const A = [5, 12, 20, 28, 35, 44, 52, 60, 71, 88];
const T = 52;
const CW = 54, gap = 8, startX = (640 - (A.length * (CW + gap) - gap)) / 2, Y = 62;

function buildFrames() {
  const f = []; let lo = 0, hi = A.length - 1, pos = null, found = null;
  const snap = o => f.push(Object.assign({ lo, hi, pos, found }, o));
  snap({ line: 2, log: `search ${T} in near-uniform data` });
  let g = 0;
  while (lo <= hi && T >= A[lo] && T <= A[hi] && g++ < 20) {
    pos = lo + Math.floor((T - A[lo]) * (hi - lo) / (A[hi] - A[lo]));
    snap({ line: 4, log: `estimate pos = ${lo} + (${T}-${A[lo]})·(${hi}-${lo})/(${A[hi]}-${A[lo]}) = ${pos}` });
    if (A[pos] === T) { found = pos; snap({ line: 5, found: pos, log: `a[${pos}] == ${T} → found`, done: true }); return f; }
    if (A[pos] < T) { snap({ line: 6, log: `a[${pos}]=${A[pos]} < ${T} → lo = ${pos + 1}` }); lo = pos + 1; }
    else { snap({ line: 7, log: `a[${pos}]=${A[pos]} > ${T} → hi = ${pos - 1}` }); hi = pos - 1; }
  }
  snap({ line: 8, pos: null, found: found ?? -1, log: found == null ? 'not found' : '', done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">interpolation_search</span>(a, t):' },
  { n: 2, t: '    lo, hi = 0, <span class="fn">len</span>(a) - 1' },
  { n: 3, t: '    <span class="kw">while</span> lo <= hi <span class="kw">and</span> a[lo] <= t <= a[hi]:' },
  { n: 4, t: '        pos = lo + (t-a[lo])*(hi-lo)//(a[hi]-a[lo])' },
  { n: 5, t: '        <span class="kw">if</span> a[pos] == t: <span class="kw">return</span> pos' },
  { n: 6, t: '        <span class="kw">elif</span> a[pos] < t: lo = pos + 1' },
  { n: 7, t: '        <span class="kw">else</span>: hi = pos - 1' },
  { n: 8, t: '    <span class="kw">return</span> -1' },
];

export default function SrchInterpolationVisualization() {
  return (
    <AlgoStage
      title="Interpolation Search"
      subtitle="Binary search always probes the middle. Interpolation search probes where the value should be, given the range — like opening a dictionary near 'Z' at the back. On uniform data that's ~O(log log n)."
      accent="#a78bfa" viewBox="0 0 640 150"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'lo', type: 'int', prev: prev ? String(prev.lo) : '0', cur: String(fr.lo) },
        { name: 'hi', type: 'int', prev: prev ? String(prev.hi) : String(A.length - 1), cur: String(fr.hi) },
        { name: 'pos (estimate)', type: 'int', prev: prev && prev.pos != null ? String(prev.pos) : '—', cur: fr.pos != null ? String(fr.pos) : '—' },
        { name: 'a[pos]', type: 'int', prev: prev && prev.pos != null ? String(A[prev.pos]) : '—', cur: fr.pos != null ? String(A[fr.pos]) : '—' },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(found|not found)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>The probe formula assumes values are <strong>evenly spaced</strong>, so it lands close to the target immediately — <strong>O(log log n)</strong> on uniform data. But on skewed/clustered data it degrades to <strong>O(n)</strong>. Binary search is the safer default; interpolation wins only when you know the distribution is smooth.</>}
      renderCanvas={fr => (
        <>
          {A.map((v, k) => {
            const inRange = k >= fr.lo && k <= fr.hi, isPos = k === fr.pos, found = fr.found === k;
            const fill = found ? 'var(--a-visited-soft)' : isPos ? 'var(--a-current-soft)' : inRange ? 'var(--a-surface-2)' : 'var(--a-code)';
            const stroke = found ? 'var(--a-visited)' : isPos ? 'var(--a-current)' : inRange ? 'var(--a-faint)' : 'var(--a-border)';
            return (
              <g key={k} opacity={inRange || found ? 1 : 0.4}>
                <rect x={startX + k * (CW + gap)} y={Y} width={CW} height="48" rx="7" fill={fill} stroke={stroke} strokeWidth={isPos || found ? 3 : 2} className={isPos && fr.found == null ? 'algo-pulse' : ''} style={{ transition: 'fill .25s, opacity .25s' }} />
                <text x={startX + k * (CW + gap) + CW / 2} y={Y + 30} textAnchor="middle" style={{ font: '700 14px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
                {isPos && <text x={startX + k * (CW + gap) + CW / 2} y={Y - 6} textAnchor="middle" style={{ font: '700 10px ui-monospace, monospace', fill: 'var(--a-current)' }}>pos</text>}
              </g>
            );
          })}
        </>
      )}
    />
  );
}
