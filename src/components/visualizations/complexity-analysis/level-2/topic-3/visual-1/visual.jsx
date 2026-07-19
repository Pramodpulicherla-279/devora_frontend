/* Lesson: Tracing a Recursive Call With the Call Stack  [AlgoStage framework]
 * sum_to(4) fully stepped: frames push descending to the base case, then pop adding their n
 * on the way up. Synced code, live call-stack inspector, console. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const START = 4;
function buildFrames() {
  const f = [], stack = [];
  const snap = o => f.push(Object.assign({ stack: stack.map(s => ({ ...s })) }, o));
  function sumTo(n) {
    stack.push({ n, ret: null });
    snap({ line: 1, cur: stack.length - 1, log: `call sum_to(${n})` });
    if (n === 0) {
      snap({ line: 2, cur: stack.length - 1, log: `n == 0 → base case` });
      stack[stack.length - 1].ret = 0;
      snap({ line: 3, cur: stack.length - 1, returning: true, log: `sum_to(0) returns 0` });
      stack.pop();
      return 0;
    }
    snap({ line: 4, cur: stack.length - 1, log: `sum_to(${n}) waits for sum_to(${n - 1})` });
    const sub = sumTo(n - 1);
    const r = n + sub;
    stack[stack.length - 1].ret = r;
    snap({ line: 4, cur: stack.length - 1, returning: true, log: `sum_to(${n}) = ${n} + ${sub} = ${r}`, done: n === START });
    stack.pop();
    return r;
  }
  sumTo(START);
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">sum_to</span>(n):' },
  { n: 2, t: '    <span class="kw">if</span> n == 0:' },
  { n: 3, t: '        <span class="kw">return</span> 0' },
  { n: 4, t: '    <span class="kw">return</span> n + <span class="fn">sum_to</span>(n - 1)' },
];

export default function CrCallStackVisualization() {
  return (
    <AlgoStage
      title="Tracing sum_to(4) on the Call Stack"
      subtitle="Every recursive call adds a frame that pauses at n + sum_to(n−1). Watch the stack grow to the base case, then unwind — each frame adding its n as it returns."
      accent="#6b8cff"
      viewBox="0 0 640 260"
      frames={FRAMES}
      code={CODE}
      lineFor={fr => fr.line}
      variables={(fr, prev) => {
        const top = fr.stack[fr.stack.length - 1];
        const ptop = prev && prev.stack.length ? prev.stack[prev.stack.length - 1] : null;
        return [
          { name: 'n', type: 'int', prev: ptop ? String(ptop.n) : '—', cur: top ? String(top.n) : '—' },
          { name: 'depth', type: 'int', prev: prev ? String(prev.stack.length) : '0', cur: String(fr.stack.length) },
          { name: 'returns', type: 'int', prev: ptop && ptop.ret != null ? String(ptop.ret) : '—', cur: top && top.ret != null ? String(top.ret) : '—' },
        ];
      }}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(returns 0|= \d+)$/, '<span class="pre">$1</span>')}</span>`}
      legend={<><strong>Push (down):</strong> <code>sum_to(4)</code> calls <code>sum_to(3)</code>…<code>sum_to(0)</code>, each frame paused. <strong>Pop (up):</strong> the base returns 0 and each frame adds its <code>n</code> — 0→1→3→6→<strong>10</strong>. The call stack is what makes recursion "remember" where to resume.</>}
      aside={fr => (
        <div>
          <div style={{ font: '600 10.5px ui-monospace, monospace', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--a-faint)', marginBottom: 4 }}>Returned so far</div>
          <div style={{ font: '13px ui-monospace, monospace', color: 'var(--a-ink)' }}>
            {fr.stack.filter(s => s.ret != null).length
              ? fr.stack.filter(s => s.ret != null).map(s => `sum_to(${s.n})=${s.ret}`).join('  ·  ')
              : <span style={{ color: 'var(--a-faint)', fontStyle: 'italic' }}>descending to base case…</span>}
          </div>
        </div>
      )}
      renderCanvas={fr => (
        <>
          <text x="320" y="18" textAnchor="middle" style={{ font: '600 11px ui-monospace, monospace', fill: 'var(--a-faint)' }}>call stack — newest frame at the bottom</text>
          {fr.stack.map((s, i) => {
            const isCur = i === fr.cur, ret = s.ret != null;
            return (
              <g key={i}>
                <rect x={190 - i * 6} y={30 + i * 44} width={260 + i * 12} height="36" rx="8"
                  fill={isCur && fr.returning ? 'var(--a-visited-soft)' : isCur ? 'var(--a-current-soft)' : 'var(--a-surface-2)'}
                  stroke={isCur && fr.returning ? 'var(--a-visited)' : isCur ? 'var(--a-current)' : 'var(--a-border)'} strokeWidth={isCur ? 3 : 2}
                  className={isCur ? 'algo-pulse' : ''} style={{ transition: 'fill .3s' }} />
                <text x={210 - i * 6} y={53 + i * 44} style={{ font: '700 14px ui-monospace, monospace', fill: 'var(--a-ink)' }}>sum_to({s.n})</text>
                {ret && <text x={440 + i * 6} y={53 + i * 44} textAnchor="end" style={{ font: '700 14px ui-monospace, monospace', fill: 'var(--a-visited)' }}>→ {s.ret}</text>}
              </g>
            );
          })}
        </>
      )}
    />
  );
}
