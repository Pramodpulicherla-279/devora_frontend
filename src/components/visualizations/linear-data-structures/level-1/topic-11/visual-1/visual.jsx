/* Lesson: Sliding Window — Solving Subarray Problems Efficiently  [AlgoStage framework]
 * Max sum of any size-k subarray. Instead of re-summing, the window adds the entering element
 * and drops the leaving one. Fully stepped with synced code, window inspector, console. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const A = [2, 1, 5, 1, 3, 2];
const K = 3;
const CW = 74, gap = 8, startX = (640 - (A.length * (CW + gap) - gap)) / 2, Y = 74;

function buildFrames() {
  const f = [];
  let window = A.slice(0, K).reduce((x, y) => x + y, 0), best = window;
  const snap = o => f.push(Object.assign({ window, best, lo: o.lo, hi: o.hi, add: o.add, rem: o.rem }, o));
  snap({ line: 2, lo: 0, hi: K - 1, log: `window = sum(a[:${K}]) = ${window}` });
  snap({ line: 3, lo: 0, hi: K - 1, log: `best = ${best}` });
  for (let i = K; i < A.length; i++) {
    snap({ line: 4, lo: i - K, hi: i - 1, log: `slide: bring in a[${i}]=${A[i]}, drop a[${i - K}]=${A[i - K]}` });
    window += A[i] - A[i - K];
    snap({ line: 5, lo: i - K + 1, hi: i, add: i, rem: i - K, log: `window += ${A[i]} - ${A[i - K]} = ${window}` });
    best = Math.max(best, window);
    snap({ line: 6, lo: i - K + 1, hi: i, log: `best = max(best, window) = ${best}` });
  }
  snap({ line: 7, lo: A.length - K, hi: A.length - 1, log: `max size-${K} subarray sum = ${best}`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">max_sum</span>(a, k):' },
  { n: 2, t: '    window = <span class="fn">sum</span>(a[:k])' },
  { n: 3, t: '    best = window' },
  { n: 4, t: '    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(k, <span class="fn">len</span>(a)):' },
  { n: 5, t: '        window += a[i] - a[i-k]' },
  { n: 6, t: '        best = <span class="fn">max</span>(best, window)' },
  { n: 7, t: '    <span class="kw">return</span> best' },
];

export default function ArrSlidingWindowVisualization() {
  return (
    <AlgoStage
      title="Sliding Window — Max Subarray Sum"
      subtitle="A fixed window of size k glides across the array. Each step adds the new right element and subtracts the old left one, so the sum updates in O(1) instead of O(k)."
      accent="#4fce78"
      viewBox="0 0 640 170"
      frames={FRAMES}
      code={CODE}
      lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'window', type: 'int', prev: prev ? String(prev.window) : String(FRAMES[0].window), cur: String(fr.window) },
        { name: 'best', type: 'int', prev: prev ? String(prev.best) : String(FRAMES[0].best), cur: String(fr.best) },
        { name: 'range', type: 'slice', prev: prev ? `[${prev.lo}..${prev.hi}]` : `[0..${K - 1}]`, cur: `[${fr.lo}..${fr.hi}]` },
        { name: '+in / −out', type: 'int', prev: '—', cur: fr.add != null ? `+${A[fr.add]} / −${A[fr.rem]}` : '—' },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(max size[^=]*= \d+)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Re-summing each window is O(n·k); the sliding trick reuses the previous sum and just adjusts the two changed ends → <strong>O(n)</strong> total. The same window pattern (often variable-width) solves "longest substring", "min window", and many subarray problems.</>}
      renderCanvas={fr => (
        <>
          {/* window band */}
          <rect x={startX + fr.lo * (CW + gap) - 4} y={Y - 6} width={(fr.hi - fr.lo + 1) * (CW + gap) - gap + 8} height="64" rx="10" fill="none" stroke="var(--a-visited)" strokeWidth="2.5" strokeDasharray="6 4" style={{ transition: 'x .35s, width .35s' }} />
          {A.map((v, i) => {
            const inWin = i >= fr.lo && i <= fr.hi;
            const entering = i === fr.add, leaving = i === fr.rem;
            return (
              <g key={i} opacity={inWin ? 1 : 0.5}>
                <rect x={startX + i * (CW + gap)} y={Y} width={CW} height="50" rx="8" fill={entering ? 'var(--a-visited-soft)' : leaving ? 'var(--a-current-soft)' : inWin ? 'color-mix(in srgb, var(--a-visited) 12%, transparent)' : 'var(--a-surface-2)'} stroke={entering ? 'var(--a-visited)' : leaving ? 'var(--a-current)' : inWin ? 'var(--a-visited)' : 'var(--a-faint)'} strokeWidth={entering || leaving ? 3 : 2} className={entering ? 'algo-pulse' : ''} style={{ transition: 'fill .3s' }} />
                <text x={startX + i * (CW + gap) + CW / 2} y={Y + 32} textAnchor="middle" style={{ font: '700 18px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
                <text x={startX + i * (CW + gap) + CW / 2} y={Y + 66} textAnchor="middle" style={{ font: '10px ui-monospace, monospace', fill: 'var(--a-faint)' }}>{i}</text>
              </g>
            );
          })}
        </>
      )}
      aside={fr => (
        <div style={{ display: 'flex', gap: 20 }}>
          <div><div style={{ font: '600 10.5px ui-monospace, monospace', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--a-faint)' }}>Window sum</div><div style={{ font: '700 20px ui-monospace, monospace', color: 'var(--a-ink)' }}>{fr.window}</div></div>
          <div><div style={{ font: '600 10.5px ui-monospace, monospace', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--a-faint)' }}>Best</div><div style={{ font: '700 20px ui-monospace, monospace', color: 'var(--a-visited)' }}>{fr.best}</div></div>
        </div>
      )}
    />
  );
}
