/* Lesson: The Fibonacci Sequence, Revisited With DP  [AlgoStage]
 * The final optimisation: dp[i] only ever reads the previous TWO cells, so keep two variables
 * instead of a whole table — O(n) time, O(1) space. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const N = 7;
function buildFrames() {
  const f = []; let a = 0, b = 1;
  const snap = o => f.push(Object.assign({ a, b }, o));
  snap({ line: 2, i: null, log: 'a, b = 0, 1  (fib(0), fib(1))' });
  for (let i = 2; i <= N; i++) {
    const next = a + b;
    snap({ line: 4, i, next, log: `next = ${a} + ${b} = ${next}` });
    a = b; b = next;
    snap({ line: 5, i, log: `slide window: a = ${a}, b = ${b}` });
  }
  snap({ line: 6, i: null, log: `fib(${N}) = ${b} using just two variables`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">fib</span>(n):' },
  { n: 2, t: '    a, b = 0, 1' },
  { n: 3, t: '    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(2, n + 1):' },
  { n: 4, t: '        nxt = a + b' },
  { n: 5, t: '        a, b = b, nxt' },
  { n: 6, t: '    <span class="kw">return</span> b' },
];
const FIB = [0, 1, 1, 2, 3, 5, 8, 13];

export default function DpFibonacciVisualization() {
  return (
    <AlgoStage
      title="Fibonacci: From O(2ⁿ) to O(n) to O(1) Space"
      subtitle="The DP journey in one recurrence: naive recursion is exponential; a table makes it O(n); and since each value depends only on the previous two, a rolling pair of variables finishes the job."
      accent="#4fce78" viewBox="0 0 640 170"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'i', type: 'int', prev: prev && prev.i != null ? String(prev.i) : '—', cur: fr.i != null ? String(fr.i) : '—' },
        { name: 'a', type: 'int', prev: prev ? String(prev.a) : '0', cur: String(fr.a) },
        { name: 'b', type: 'int', prev: prev ? String(prev.b) : '1', cur: String(fr.b) },
        { name: 'next', type: 'int', prev: prev && prev.next != null ? String(prev.next) : '—', cur: fr.next != null ? String(fr.next) : '—' },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(fib\(\d+\) = \d+[^,]*)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Recognising that the recurrence's <strong>dependency window</strong> is only two cells wide is a classic DP optimisation: collapse the table to a rolling window. Time stays <strong>O(n)</strong>; space drops from O(n) to <strong>O(1)</strong>. The same trick shrinks many 2D tables to one row.</>}
      renderCanvas={fr => {
        const CW = 62, gap = 10, startX = (640 - ((N + 1) * (CW + gap) - gap)) / 2, Y = 56;
        const bi = fr.i == null ? 1 : (fr.next != null ? fr.i - 1 : fr.i);
        const ai = bi - 1;
        return (
          <>
            {FIB.map((v, k) => {
              const isA = k === ai && !fr.done, isB = k === bi && !fr.done;
              const past = fr.i == null ? k <= 1 : k < fr.i || (fr.done);
              return (
                <g key={k}>
                  <rect x={startX + k * (CW + gap)} y={Y} width={CW} height="50" rx="8" fill={isB ? 'var(--a-visited-soft)' : isA ? 'var(--a-current-soft)' : past ? 'color-mix(in srgb, var(--a-visited) 8%, transparent)' : 'var(--a-surface-2)'} stroke={isB ? 'var(--a-visited)' : isA ? 'var(--a-current)' : past ? 'var(--a-visited)' : 'var(--a-border)'} strokeWidth={isA || isB ? 3 : 1.5} className={isB ? 'algo-pulse' : ''} style={{ transition: 'fill .25s', opacity: past || isA || isB ? 1 : 0.45 }} />
                  <text x={startX + k * (CW + gap) + CW / 2} y={Y + 21} textAnchor="middle" style={{ font: '600 9px ui-monospace, monospace', fill: 'var(--a-faint)' }}>fib({k})</text>
                  <text x={startX + k * (CW + gap) + CW / 2} y={Y + 41} textAnchor="middle" style={{ font: '700 16px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
                  {isA && <text x={startX + k * (CW + gap) + CW / 2} y={Y - 8} textAnchor="middle" style={{ font: '700 11px ui-monospace, monospace', fill: 'var(--a-current)' }}>a</text>}
                  {isB && <text x={startX + k * (CW + gap) + CW / 2} y={Y - 8} textAnchor="middle" style={{ font: '700 11px ui-monospace, monospace', fill: 'var(--a-visited)' }}>b</text>}
                </g>
              );
            })}
            <text x="320" y="152" textAnchor="middle" style={{ font: '600 11px ui-monospace, monospace', fill: 'var(--a-faint)' }}>only the two highlighted values live in memory — the rest are already forgotten</text>
          </>
        );
      }}
    />
  );
}
