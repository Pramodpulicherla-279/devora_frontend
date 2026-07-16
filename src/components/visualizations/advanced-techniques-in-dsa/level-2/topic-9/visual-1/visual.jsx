/* Lesson: Longest Increasing Subsequence  [AlgoStage]
 * dp[i] = length of the longest increasing subsequence ENDING at index i. For each i, look
 * back at every smaller element and extend the best of them. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const A = [3, 1, 4, 1, 5, 9];
function buildFrames() {
  const f = []; const dp = Array(A.length).fill(null);
  const snap = o => f.push(Object.assign({ dp: [...dp] }, o));
  snap({ line: 1, log: 'dp[i] = LIS length ending exactly at i' });
  for (let i = 0; i < A.length; i++) {
    dp[i] = 1;
    snap({ line: 3, i, log: `dp[${i}] starts at 1 (the element alone)` });
    for (let j = 0; j < i; j++) {
      const ok = A[j] < A[i];
      snap({ line: 5, i, j, ok, log: `a[${j}]=${A[j]} < a[${i}]=${A[i]}? ${ok ? 'yes' : 'no'}` });
      if (ok && dp[j] + 1 > dp[i]) {
        dp[i] = dp[j] + 1;
        snap({ line: 6, i, j, ok, improved: true, log: `extend: dp[${i}] = dp[${j}] + 1 = ${dp[i]}` });
      }
    }
  }
  const best = Math.max(...dp);
  snap({ line: 7, log: `LIS length = ${best}  (e.g. 1, 4, 5, 9)`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: 'dp = [1] * n' },
  { n: 2, t: '<span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(n):' },
  { n: 3, t: '    dp[i] = 1' },
  { n: 4, t: '    <span class="kw">for</span> j <span class="kw">in</span> <span class="fn">range</span>(i):' },
  { n: 5, t: '        <span class="kw">if</span> a[j] < a[i]:' },
  { n: 6, t: '            dp[i] = <span class="fn">max</span>(dp[i], dp[j]+1)' },
  { n: 7, t: '<span class="kw">return</span> <span class="fn">max</span>(dp)' },
];
const CW = 74, gap = 14, startX = (640 - (A.length * (CW + gap) - gap)) / 2;

export default function DpLisVisualization() {
  return (
    <AlgoStage
      title="Longest Increasing Subsequence"
      subtitle="For each element, look back at all earlier smaller elements and extend the longest chain among them. The answer is the best chain ending anywhere."
      accent="#4fce78" viewBox="0 0 640 190"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'i', type: 'int', prev: prev && prev.i != null ? String(prev.i) : '—', cur: fr.i != null ? String(fr.i) : '—' },
        { name: 'j (look-back)', type: 'int', prev: prev && prev.j != null ? String(prev.j) : '—', cur: fr.j != null ? String(fr.j) : '—' },
        { name: 'dp', type: 'list', prev: prev ? `[${prev.dp.map(x => x ?? '·').join(',')}]` : '[]', cur: `[${fr.dp.map(x => x ?? '·').join(',')}]` },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(extend: [^=]*= \d+|LIS length = \d+)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>The double loop is <strong>O(n²)</strong> — fine for interviews; a patience-sorting variant with binary search reaches <strong>O(n log n)</strong>. Note the state definition: "ending at i" is what makes the recurrence work; the final answer is <code>max(dp)</code>, not <code>dp[n-1]</code>.</>}
      renderCanvas={fr => (
        <>
          {A.map((v, k) => {
            const isI = k === fr.i, isJ = k === fr.j;
            const has = fr.dp[k] != null;
            return (
              <g key={k}>
                <rect x={startX + k * (CW + gap)} y={44} width={CW} height="52" rx="8" fill={isI ? 'var(--a-visited-soft)' : isJ ? (fr.ok ? 'color-mix(in srgb, var(--algo-accent) 22%, transparent)' : 'color-mix(in srgb, #f85149 15%, transparent)') : 'var(--a-surface-2)'} stroke={isI ? 'var(--a-visited)' : isJ ? (fr.ok ? 'var(--algo-accent)' : '#f85149') : 'var(--a-faint)'} strokeWidth={isI || isJ ? 3 : 2} className={isI ? 'algo-pulse' : ''} style={{ transition: 'fill .2s' }} />
                <text x={startX + k * (CW + gap) + CW / 2} y={77} textAnchor="middle" style={{ font: '700 19px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
                {/* dp value strip */}
                <rect x={startX + k * (CW + gap)} y={112} width={CW} height="32" rx="6" fill={has ? 'color-mix(in srgb, var(--a-visited) 12%, transparent)' : 'var(--a-code)'} stroke={has ? 'var(--a-visited)' : 'var(--a-border)'} strokeWidth="1.5" />
                <text x={startX + k * (CW + gap) + CW / 2} y={133} textAnchor="middle" style={{ font: '700 14px ui-monospace, monospace', fill: has ? 'var(--a-visited)' : 'var(--a-faint)' }}>{has ? 'dp=' + fr.dp[k] : '·'}</text>
              </g>
            );
          })}
          <text x="320" y="172" textAnchor="middle" style={{ font: '600 11px ui-monospace, monospace', fill: 'var(--a-faint)' }}>green = current i · blue = smaller look-back (chain can extend) · red = not smaller</text>
        </>
      )}
    />
  );
}
