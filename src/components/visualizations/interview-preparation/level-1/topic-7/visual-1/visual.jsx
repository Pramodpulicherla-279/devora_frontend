/* Lesson: The Monotonic Stack Pattern  [AlgoStage]
 * Next Greater Element: keep a stack of indices whose values only DECREASE. A newcomer pops
 * everything smaller — and each pop resolves that element's answer instantly. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const A = [2, 5, 3, 4, 8, 1];
function buildFrames() {
  const f = []; const stack = []; const ans = Array(A.length).fill(null);
  const snap = o => f.push(Object.assign({ stack: [...stack], ans: [...ans] }, o));
  snap({ line: 1, i: -1, log: 'find each element\'s next greater element (NGE) in one pass' });
  for (let i = 0; i < A.length; i++) {
    snap({ line: 3, i, log: `arrive at a[${i}] = ${A[i]}` });
    while (stack.length && A[stack[stack.length - 1]] < A[i]) {
      const j = stack.pop();
      ans[j] = A[i];
      snap({ line: 5, i, resolved: j, log: `a[${j}]=${A[j]} < ${A[i]} → pop: NGE(${A[j]}) = ${A[i]}` });
    }
    stack.push(i);
    snap({ line: 6, i, log: `push index ${i} — stack values stay decreasing` });
  }
  snap({ line: 7, log: `leftovers (${stack.map(j => A[j]).join(', ')}) have no greater element → -1`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: 'stack, ans = [], [-1] * n' },
  { n: 2, t: '<span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(n):' },
  { n: 3, t: '    <span class="kw">while</span> stack <span class="kw">and</span> a[stack[-1]] < a[i]:' },
  { n: 5, t: '        ans[stack.pop()] = a[i]' },
  { n: 6, t: '    stack.append(i)' },
  { n: 7, t: '<span class="kw">return</span> ans' },
];
const CW = 70, gap = 12, startX = (640 - (A.length * (CW + gap) - gap)) / 2;

export default function PatMonotonicStackVisualization() {
  return (
    <AlgoStage
      title="Monotonic Stack — Next Greater Element"
      subtitle="The stack holds elements still waiting for something bigger. When a bigger value arrives, it answers every smaller waiter at once. Each index is pushed and popped at most once → O(n)."
      accent="#e46e9b" viewBox="0 0 640 210"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'i / a[i]', type: 'int', prev: prev && prev.i >= 0 ? `${prev.i} / ${A[prev.i]}` : '—', cur: fr.i >= 0 && fr.i < A.length ? `${fr.i} / ${A[fr.i]}` : '—' },
        { name: 'stack (values)', type: 'stack', prev: prev ? `[${prev.stack.map(j => A[j]).join(',')}]` : '[]', cur: `[${fr.stack.map(j => A[j]).join(',')}]` },
        { name: 'answers', type: 'list', prev: prev ? `[${prev.ans.map(x => x ?? '·').join(',')}]` : '[]', cur: `[${fr.ans.map(x => x ?? '·').join(',')}]` },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(NGE\(\d+\) = \d+|no greater element[^!]*)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>The signal phrase: "next/previous greater/smaller element", "days until warmer", "largest rectangle in histogram". Whenever an answer depends on the nearest bigger-or-smaller neighbour, a monotonic stack turns O(n²) scanning into <strong>O(n)</strong>.</>}
      renderCanvas={fr => (
        <>
          {A.map((v, k) => {
            const cur = k === fr.i, resolved = fr.resolved === k, onStack = fr.stack.includes(k);
            return (
              <g key={k}>
                <rect x={startX + k * (CW + gap)} y="40" width={CW} height="48" rx="8" fill={resolved ? 'var(--a-visited-soft)' : cur ? 'var(--a-current-soft)' : onStack ? 'color-mix(in srgb, #e46e9b 20%, transparent)' : 'var(--a-surface-2)'} stroke={resolved ? 'var(--a-visited)' : cur ? 'var(--a-current)' : onStack ? '#e46e9b' : 'var(--a-faint)'} strokeWidth={cur || resolved ? 3 : 1.5} className={cur || resolved ? 'algo-pulse' : ''} style={{ transition: 'fill .25s' }} />
                <text x={startX + k * (CW + gap) + CW / 2} y="70" textAnchor="middle" style={{ font: '700 18px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
                <text x={startX + k * (CW + gap) + CW / 2} y="106" textAnchor="middle" style={{ font: '700 12px ui-monospace, monospace', fill: fr.ans[k] != null ? 'var(--a-visited)' : 'var(--a-faint)' }}>{fr.ans[k] != null ? '→' + fr.ans[k] : '·'}</text>
              </g>
            );
          })}
          <text x="130" y="150" style={{ font: '600 11px ui-monospace, monospace', fill: 'var(--a-faint)' }}>waiting stack (top → right):</text>
          {fr.stack.map((j, k) => (
            <g key={'s' + k}>
              <rect x={280 + k * 60} y="134" width="48" height="32" rx="7" fill="color-mix(in srgb, #e46e9b 20%, transparent)" stroke="#e46e9b" strokeWidth="2" />
              <text x={304 + k * 60} y="156" textAnchor="middle" style={{ font: '700 14px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{A[j]}</text>
            </g>
          ))}
          <text x="320" y="196" textAnchor="middle" style={{ font: '600 11px ui-monospace, monospace', fill: 'var(--a-faint)' }}>stack values always decrease left→right — a bigger arrival pops (and answers) the smaller ones</text>
        </>
      )}
    />
  );
}
