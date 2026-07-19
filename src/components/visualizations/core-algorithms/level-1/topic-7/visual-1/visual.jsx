/* Lesson: Ternary Search  [AlgoStage]
 * On a unimodal sequence (rises then falls), split the range into thirds with two probes m1/m2
 * and discard the third that can't contain the peak. Finds the maximum in O(log n). */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const A = [1, 3, 6, 9, 12, 14, 11, 7, 4, 2];   // unimodal, peak at index 5
const CW = 54, gap = 8, startX = (640 - (A.length * (CW + gap) - gap)) / 2, baseY = 176, unit = 10;

function buildFrames() {
  const f = []; let lo = 0, hi = A.length - 1;
  const snap = o => f.push(Object.assign({ lo, hi }, o));
  snap({ line: 2, m1: null, m2: null, log: 'find the peak of a unimodal array' });
  let g = 0;
  while (hi - lo > 2 && g++ < 20) {
    const m1 = lo + Math.floor((hi - lo) / 3), m2 = hi - Math.floor((hi - lo) / 3);
    snap({ line: 4, m1, m2, log: `m1=${m1} (${A[m1]}), m2=${m2} (${A[m2]})` });
    if (A[m1] < A[m2]) { snap({ line: 6, m1, m2, log: `f(m1) < f(m2) → peak is right, drop [${lo}..${m1}]` }); lo = m1 + 1; }
    else { snap({ line: 8, m1, m2, log: `f(m1) ≥ f(m2) → peak is left, drop [${m2}..${hi}]` }); hi = m2 - 1; }
  }
  // pick max in remaining
  let best = lo; for (let i = lo; i <= hi; i++) if (A[i] > A[best]) best = i;
  snap({ line: 9, m1: null, m2: null, peak: best, log: `peak = ${A[best]} at index ${best}`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">ternary_peak</span>(a):' },
  { n: 2, t: '    lo, hi = 0, <span class="fn">len</span>(a) - 1' },
  { n: 3, t: '    <span class="kw">while</span> hi - lo > 2:' },
  { n: 4, t: '        m1, m2 = lo+(hi-lo)//3, hi-(hi-lo)//3' },
  { n: 5, t: '        <span class="kw">if</span> a[m1] < a[m2]:' },
  { n: 6, t: '            lo = m1 + 1' },
  { n: 7, t: '        <span class="kw">else</span>:' },
  { n: 8, t: '            hi = m2 - 1' },
  { n: 9, t: '    <span class="kw">return</span> <span class="fn">max</span>(a[lo:hi+1])' },
];

export default function SrchTernaryVisualization() {
  return (
    <AlgoStage
      title="Ternary Search — O(log n)"
      subtitle="When a sequence increases then decreases (unimodal), you can't compare against a fixed target — but two probes at the ⅓ and ⅔ points reveal which third the peak lies in, and you drop the rest."
      accent="#a78bfa" viewBox="0 0 640 200"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'lo', type: 'int', prev: prev ? String(prev.lo) : '0', cur: String(fr.lo) },
        { name: 'hi', type: 'int', prev: prev ? String(prev.hi) : String(A.length - 1), cur: String(fr.hi) },
        { name: 'm1', type: 'int', prev: prev && prev.m1 != null ? String(prev.m1) : '—', cur: fr.m1 != null ? String(fr.m1) : '—' },
        { name: 'm2', type: 'int', prev: prev && prev.m2 != null ? String(prev.m2) : '—', cur: fr.m2 != null ? String(fr.m2) : '—' },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(peak = \d+ at index \d+)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Ternary search needs a <strong>unimodal</strong> function (one peak/valley), not a sorted array. Each step removes a third of the range → <strong>O(log n)</strong>, though with more comparisons per step than binary search. Used for optimising continuous unimodal functions and some geometry problems.</>}
      renderCanvas={fr => (
        <>
          {A.map((v, k) => {
            const inRange = k >= fr.lo && k <= fr.hi, isM = k === fr.m1 || k === fr.m2, isPeak = fr.peak === k;
            const fill = isPeak ? 'var(--a-visited)' : isM ? 'var(--a-current-soft)' : inRange ? 'var(--a-surface-2)' : 'var(--a-code)';
            const stroke = isPeak ? 'var(--a-visited)' : isM ? 'var(--a-current)' : inRange ? 'var(--a-faint)' : 'var(--a-border)';
            return (
              <g key={k} opacity={inRange || isPeak ? 1 : 0.35}>
                <rect x={startX + k * (CW + gap)} y={baseY - v * unit} width={CW} height={v * unit} rx="5" fill={fill} stroke={stroke} strokeWidth={isM || isPeak ? 3 : 2} className={isM ? 'algo-pulse' : ''} style={{ transition: 'fill .25s, opacity .25s' }} />
                <text x={startX + k * (CW + gap) + CW / 2} y={baseY - v * unit - 6} textAnchor="middle" style={{ font: '700 12px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
                {k === fr.m1 && <text x={startX + k * (CW + gap) + CW / 2} y={baseY + 16} textAnchor="middle" style={{ font: '700 10px ui-monospace, monospace', fill: 'var(--a-current)' }}>m1</text>}
                {k === fr.m2 && <text x={startX + k * (CW + gap) + CW / 2} y={baseY + 16} textAnchor="middle" style={{ font: '700 10px ui-monospace, monospace', fill: 'var(--a-current)' }}>m2</text>}
              </g>
            );
          })}
        </>
      )}
    />
  );
}
