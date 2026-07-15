/* Lesson: Recursive Sum, Count, and Search on Lists  [AlgoStage framework]
 * rec_sum([3,1,4,1,5]) fully stepped: each call peels the head and recurses on the tail until
 * the list is empty. Synced code, call-stack inspector (shrinking sublists), console. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const LIST = [3, 1, 4, 1, 5];
function buildFrames() {
  const f = [], stack = [];
  const snap = o => f.push(Object.assign({ stack: stack.map(s => ({ lst: [...s.lst], ret: s.ret })) }, o));
  function rec(lst) {
    stack.push({ lst: [...lst], ret: null });
    snap({ line: 1, cur: stack.length - 1, log: `call rec_sum([${lst.join(', ')}])` });
    if (lst.length === 0) {
      snap({ line: 2, cur: stack.length - 1, log: `empty list → base case` });
      stack[stack.length - 1].ret = 0;
      snap({ line: 3, cur: stack.length - 1, returning: true, log: `rec_sum([]) returns 0` });
      stack.pop();
      return 0;
    }
    snap({ line: 4, cur: stack.length - 1, log: `${lst[0]} + rec_sum([${lst.slice(1).join(', ')}])` });
    const sub = rec(lst.slice(1));
    const r = lst[0] + sub;
    stack[stack.length - 1].ret = r;
    snap({ line: 4, cur: stack.length - 1, returning: true, log: `${lst[0]} + ${sub} = ${r}`, done: lst.length === LIST.length });
    stack.pop();
    return r;
  }
  rec(LIST);
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">rec_sum</span>(lst):' },
  { n: 2, t: '    <span class="kw">if</span> <span class="kw">not</span> lst:' },
  { n: 3, t: '        <span class="kw">return</span> 0' },
  { n: 4, t: '    <span class="kw">return</span> lst[0] + <span class="fn">rec_sum</span>(lst[1:])' },
];

export default function CrRecursiveListVisualization() {
  return (
    <AlgoStage
      title="Recursion on a List — rec_sum"
      subtitle="rec_sum([3,1,4,1,5]) = 3 + rec_sum([1,4,1,5]). Each call peels off the head and recurses on the tail; the empty list is the base case. Scrub to watch the list shrink then the sum rebuild."
      accent="#6b8cff"
      viewBox="0 0 640 280"
      frames={FRAMES}
      code={CODE}
      lineFor={fr => fr.line}
      variables={(fr, prev) => {
        const top = fr.stack[fr.stack.length - 1];
        const ptop = prev && prev.stack.length ? prev.stack[prev.stack.length - 1] : null;
        return [
          { name: 'lst', type: 'list', prev: ptop ? `[${ptop.lst.join(',')}]` : '—', cur: top ? `[${top.lst.join(',')}]` : '—' },
          { name: 'lst[0]', type: 'int', prev: ptop && ptop.lst.length ? String(ptop.lst[0]) : '—', cur: top && top.lst.length ? String(top.lst[0]) : '—' },
          { name: 'depth', type: 'int', prev: prev ? String(prev.stack.length) : '0', cur: String(fr.stack.length) },
          { name: 'returns', type: 'int', prev: ptop && ptop.ret != null ? String(ptop.ret) : '—', cur: top && top.ret != null ? String(top.ret) : '—' },
        ];
      }}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(returns 0|= \d+)$/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Base case: <code>rec_sum([]) == 0</code>. Recursive case: <code>lst[0] + rec_sum(lst[1:])</code>. Each call shrinks the list by one → <strong>O(n)</strong> depth. Swap <code>+</code> for <code>1 +</code> to count, or a comparison to search — same peel-the-head shape.</>}
      aside={fr => (
        <div>
          <div style={{ font: '600 10.5px ui-monospace, monospace', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--a-faint)', marginBottom: 4 }}>Rebuilding the sum</div>
          <div style={{ font: '13px ui-monospace, monospace', color: 'var(--a-ink)' }}>
            {fr.stack.filter(s => s.ret != null).length
              ? fr.stack.filter(s => s.ret != null).map(s => s.ret).join('  →  ')
              : <span style={{ color: 'var(--a-faint)', fontStyle: 'italic' }}>peeling heads to the empty list…</span>}
          </div>
        </div>
      )}
      renderCanvas={fr => (
        <>
          <text x="320" y="18" textAnchor="middle" style={{ font: '600 11px ui-monospace, monospace', fill: 'var(--a-faint)' }}>call stack — each frame holds a shorter list</text>
          {fr.stack.map((s, i) => {
            const isCur = i === fr.cur, ret = s.ret != null;
            return (
              <g key={i}>
                <rect x={110 - i * 4} y={30 + i * 44} width={300 + i * 8} height="36" rx="8"
                  fill={isCur && fr.returning ? 'var(--a-visited-soft)' : isCur ? 'var(--a-current-soft)' : 'var(--a-surface-2)'}
                  stroke={isCur && fr.returning ? 'var(--a-visited)' : isCur ? 'var(--a-current)' : 'var(--a-border)'} strokeWidth={isCur ? 3 : 2}
                  className={isCur ? 'algo-pulse' : ''} style={{ transition: 'fill .3s' }} />
                <text x={128 - i * 4} y={53 + i * 44} style={{ font: '700 13px ui-monospace, monospace', fill: 'var(--a-ink)' }}>rec_sum([{s.lst.join(', ')}])</text>
                {ret && <text x={400 + i * 4} y={53 + i * 44} textAnchor="end" style={{ font: '700 13px ui-monospace, monospace', fill: 'var(--a-visited)' }}>→ {s.ret}</text>}
              </g>
            );
          })}
        </>
      )}
    />
  );
}
