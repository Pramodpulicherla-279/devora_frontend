/* Lesson: Tabulation — Building the Answer From the Bottom Up  [AlgoStage]
 * No recursion at all: fill a table from the smallest cases upward, each cell computed from
 * cells already filled. dp[i] = dp[i-1] + dp[i-2], left to right. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const N = 6;
function buildFrames() {
  const f = []; const dp = Array(N + 1).fill(null);
  const snap = o => f.push(Object.assign({ dp: [...dp] }, o));
  snap({ line: 1, log: `build fib(${N}) bottom-up` });
  dp[0] = 0; snap({ line: 2, fill: 0, log: 'dp[0] = 0 (base)' });
  dp[1] = 1; snap({ line: 3, fill: 1, log: 'dp[1] = 1 (base)' });
  for (let i = 2; i <= N; i++) {
    snap({ line: 4, i, src: [i - 1, i - 2], log: `dp[${i}] needs dp[${i - 1}] and dp[${i - 2}]` });
    dp[i] = dp[i - 1] + dp[i - 2];
    snap({ line: 5, i, fill: i, src: [i - 1, i - 2], log: `dp[${i}] = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}` });
  }
  snap({ line: 6, log: `dp[${N}] = ${dp[N]} — table complete, no recursion used`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">fib</span>(n):' },
  { n: 2, t: '    dp = [0] * (n + 1)' },
  { n: 3, t: '    dp[1] = 1' },
  { n: 4, t: '    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(2, n + 1):' },
  { n: 5, t: '        dp[i] = dp[i-1] + dp[i-2]' },
  { n: 6, t: '    <span class="kw">return</span> dp[n]' },
];
const CW = 70, gap = 10, startX = (640 - ((N + 1) * (CW + gap) - gap)) / 2, Y = 60;

export default function DpTabulationVisualization() {
  return (
    <AlgoStage
      title="Tabulation (Bottom-Up DP)"
      subtitle="Instead of recursing down from the goal, start at the base cases and fill a table upward. Every cell is computed from already-filled cells — a plain loop, no call stack."
      accent="#6b8cff" viewBox="0 0 640 160"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'i', type: 'int', prev: prev && prev.i != null ? String(prev.i) : '—', cur: fr.i != null ? String(fr.i) : '—' },
        { name: 'dp[i-1]', type: 'int', prev: '—', cur: fr.src ? String(fr.dp[fr.src[0]] ?? '—') : '—' },
        { name: 'dp[i-2]', type: 'int', prev: '—', cur: fr.src ? String(fr.dp[fr.src[1]] ?? '—') : '—' },
        { name: 'filled', type: 'int', prev: prev ? String(prev.dp.filter(x => x != null).length) : '0', cur: String(fr.dp.filter(x => x != null).length) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(dp\[\d+\] = \d+ \+ \d+ = \d+|table complete[^,]*)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Tabulation trades the elegance of recursion for control: <strong>no stack-overflow risk</strong>, easy to see the <strong>O(n)</strong> time and space, and often optimisable further (here you only ever need the last two cells → O(1) space). The requirement: know a valid <strong>fill order</strong> where dependencies come first.</>}
      renderCanvas={fr => (
        <>
          {fr.dp.map((v, k) => {
            const isFill = fr.fill === k, isSrc = fr.src && (k === fr.src[0] || k === fr.src[1]);
            const has = v != null;
            return (
              <g key={k}>
                <rect x={startX + k * (CW + gap)} y={Y} width={CW} height="54" rx="9" fill={isFill ? 'var(--a-visited-soft)' : isSrc ? 'var(--a-current-soft)' : has ? 'color-mix(in srgb, var(--a-visited) 10%, transparent)' : 'var(--a-surface-2)'} stroke={isFill ? 'var(--a-visited)' : isSrc ? 'var(--a-current)' : has ? 'var(--a-visited)' : 'var(--a-faint)'} strokeWidth={isFill || isSrc ? 3 : 2} className={isFill ? 'algo-pulse' : ''} style={{ transition: 'fill .25s' }} />
                <text x={startX + k * (CW + gap) + CW / 2} y={Y + 22} textAnchor="middle" style={{ font: '600 10px ui-monospace, monospace', fill: 'var(--a-faint)' }}>dp[{k}]</text>
                <text x={startX + k * (CW + gap) + CW / 2} y={Y + 44} textAnchor="middle" style={{ font: '700 17px ui-monospace, monospace', fill: has ? 'var(--a-ink)' : 'var(--a-faint)' }}>{has ? v : '·'}</text>
              </g>
            );
          })}
          <text x="320" y="146" textAnchor="middle" style={{ font: '600 11px ui-monospace, monospace', fill: 'var(--a-faint)' }}>amber = the two cells being read · green = the cell being written</text>
        </>
      )}
    />
  );
}
