/* Lesson: Calculating Factorials — Your First Recursive Function  [AlgoStage framework]
 * factorial(4) fully stepped: frames push on the way down to the base case, then pop on the
 * way up, each multiplying its return value. Synced code, call-stack inspector, console. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const START = 4;
function buildFrames() {
  const f = [], stack = [];
  const snap = o => f.push(Object.assign({ stack: stack.map(s => ({ ...s })) }, o));
  function fact(n) {
    stack.push({ n, ret: null });
    snap({ line: 1, cur: stack.length - 1, log: `call factorial(${n})` });
    if (n === 0) {
      snap({ line: 2, cur: stack.length - 1, log: `n == 0 → base case` });
      stack[stack.length - 1].ret = 1;
      snap({ line: 3, cur: stack.length - 1, returning: true, log: `factorial(0) returns 1` });
      stack.pop();
      return 1;
    }
    snap({ line: 4, cur: stack.length - 1, log: `factorial(${n}) needs factorial(${n - 1})` });
    const sub = fact(n - 1);
    const r = n * sub;
    stack[stack.length - 1].ret = r;
    snap({ line: 4, cur: stack.length - 1, returning: true, log: `factorial(${n}) = ${n} × ${sub} = ${r}`, done: n === START });
    stack.pop();
    return r;
  }
  fact(START);
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">factorial</span>(n):' },
  { n: 2, t: '    <span class="kw">if</span> n == 0:' },
  { n: 3, t: '        <span class="kw">return</span> 1' },
  { n: 4, t: '    <span class="kw">return</span> n * <span class="fn">factorial</span>(n - 1)' },
];

export default function CrFactorialVisualization() {
  return (
    <AlgoStage
      title="factorial(4) — Recursion & the Call Stack"
      subtitle="Each call pushes a frame that pauses at n × factorial(n−1). At n=0 the base case returns 1, then frames pop in reverse, multiplying as they unwind."
      accent="#4fce78"
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
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(returns \d+|= \d+)$/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Recursion pauses each frame mid-expression until its child returns. The base case <code>factorial(0)=1</code> stops the descent; then each frame completes its <code>n × …</code> on the way up: 1, 1, 2, 6, <strong>24</strong>. Depth = <code>O(n)</code> stack space.</>}
      aside={fr => (
        <div>
          <div style={{ font: '600 10.5px ui-monospace, monospace', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--a-faint)', marginBottom: 4 }}>Return values (unwinding)</div>
          <div style={{ font: '13px ui-monospace, monospace', color: 'var(--a-ink)' }}>
            {fr.stack.filter(s => s.ret != null).length
              ? fr.stack.filter(s => s.ret != null).map(s => `${s.n}!=${s.ret}`).join('  ·  ')
              : <span style={{ color: 'var(--a-faint)', fontStyle: 'italic' }}>descending to base case…</span>}
          </div>
        </div>
      )}
      renderCanvas={fr => (
        <>
          <text x="320" y="18" textAnchor="middle" style={{ font: '600 11px ui-monospace, monospace', fill: 'var(--a-faint)' }}>call stack — newest frame at the bottom</text>
          {fr.stack.map((s, i) => {
            const isCur = i === fr.cur;
            const ret = s.ret != null;
            return (
              <g key={i}>
                <rect x={190 - i * 6} y={30 + i * 44} width={260 + i * 12} height="36" rx="8"
                  fill={isCur && fr.returning ? 'var(--a-visited-soft)' : isCur ? 'var(--a-current-soft)' : 'var(--a-surface-2)'}
                  stroke={isCur && fr.returning ? 'var(--a-visited)' : isCur ? 'var(--a-current)' : 'var(--a-border)'} strokeWidth={isCur ? 3 : 2}
                  className={isCur ? 'algo-pulse' : ''} style={{ transition: 'fill .3s' }} />
                <text x={210 - i * 6} y={53 + i * 44} style={{ font: '700 14px ui-monospace, monospace', fill: 'var(--a-ink)' }}>factorial({s.n})</text>
                {ret && <text x={440 + i * 6} y={53 + i * 44} textAnchor="end" style={{ font: '700 14px ui-monospace, monospace', fill: 'var(--a-visited)' }}>→ {s.ret}</text>}
              </g>
            );
          })}
        </>
      )}
    />
  );
}
