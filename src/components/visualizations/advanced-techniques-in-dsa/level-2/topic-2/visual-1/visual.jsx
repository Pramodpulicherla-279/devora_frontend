/* Lesson: Memoization — Caching Your Way to Speed  [AlgoStage]
 * Top-down fib(5) with a memo dict: every result is stored on first computation, and repeat
 * calls become instant cache hits. Watch the hits in the inspector and console. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

function buildFrames() {
  const f = []; const memo = {}; const stack = []; let hits = 0;
  const snap = o => f.push(Object.assign({ memo: { ...memo }, stack: [...stack], hits }, o));
  snap({ line: 1, log: 'compute fib(5), caching every answer' });
  function fib(n) {
    stack.push(n);
    snap({ line: 2, n, log: `call fib(${n})` });
    if (n in memo) { hits++; snap({ line: 3, n, hit: n, log: `memo HIT: fib(${n}) = ${memo[n]} (no recursion)` }); stack.pop(); return memo[n]; }
    if (n <= 1) { memo[n] = n; snap({ line: 4, n, store: n, log: `base case: fib(${n}) = ${n}` }); stack.pop(); return n; }
    const r = fib(n - 1) + fib(n - 2);
    memo[n] = r;
    snap({ line: 6, n, store: n, log: `store fib(${n}) = ${r}` });
    stack.pop();
    return r;
  }
  const res = fib(5);
  snap({ line: 7, log: `fib(5) = ${res} — ${Object.keys(memo).length} computations, ${hits} cache hits`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: 'memo = {}' },
  { n: 2, t: '<span class="kw">def</span> <span class="fn">fib</span>(n):' },
  { n: 3, t: '    <span class="kw">if</span> n <span class="kw">in</span> memo: <span class="kw">return</span> memo[n]' },
  { n: 4, t: '    <span class="kw">if</span> n <= 1: <span class="kw">return</span> n' },
  { n: 5, t: '    r = <span class="fn">fib</span>(n-1) + <span class="fn">fib</span>(n-2)' },
  { n: 6, t: '    memo[n] = r' },
  { n: 7, t: '    <span class="kw">return</span> r' },
];
const CW = 76, gap = 12, startX = (640 - (6 * (CW + gap) - gap)) / 2, Y = 66;

export default function DpMemoizationVisualization() {
  return (
    <AlgoStage
      title="Memoization (Top-Down DP)"
      subtitle="Keep the natural recursion, but before computing anything, check the cache — and after computing, store it. Repeats become O(1) lookups, turning O(2ⁿ) into O(n)."
      accent="#4fce78" viewBox="0 0 640 170"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'n', type: 'int', prev: prev && prev.n != null ? String(prev.n) : '—', cur: fr.n != null ? String(fr.n) : '—' },
        { name: 'depth', type: 'int', prev: prev ? String(prev.stack.length) : '0', cur: String(fr.stack.length) },
        { name: 'memo', type: 'dict', prev: prev ? `{${Object.entries(prev.memo).map(([k, v]) => k + ':' + v).join(',')}}` : '{}', cur: `{${Object.entries(fr.memo).map(([k, v]) => k + ':' + v).join(',')}}` },
        { name: 'cache hits', type: 'int', prev: prev ? String(prev.hits) : '0', cur: String(fr.hits) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(memo HIT[^(]*)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>The cache turns the recursion tree into a straight line: each <code>fib(k)</code> is computed <strong>once</strong> and every other occurrence is a hit. In Python, <code>@functools.lru_cache</code> gives you this in one decorator line. Top-down keeps the code shaped like the recurrence.</>}
      aside={fr => (
        <div>
          <div style={{ font: '600 10.5px ui-monospace, monospace', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--a-faint)', marginBottom: 6 }}>Call stack</div>
          <div style={{ display: 'flex', gap: 6, minHeight: 28, alignItems: 'center' }}>
            {fr.stack.length ? fr.stack.map((n, k) => <span key={k} style={{ display: 'inline-flex', alignItems: 'center', padding: '0 8px', height: 26, borderRadius: 6, background: 'var(--a-surface-2)', border: '1px solid var(--a-faint)', font: '700 12px ui-monospace, monospace', color: 'var(--a-ink)' }}>fib({n})</span>) : <span style={{ color: 'var(--a-faint)', fontStyle: 'italic', fontSize: 13 }}>empty</span>}
          </div>
        </div>
      )}
      renderCanvas={fr => (
        <>
          <text x="320" y="30" textAnchor="middle" style={{ font: '600 11px ui-monospace, monospace', fill: 'var(--a-faint)' }}>memo — one slot per subproblem</text>
          {[0, 1, 2, 3, 4, 5].map(n => {
            const has = n in fr.memo, isStore = fr.store === n, isHit = fr.hit === n;
            return (
              <g key={n}>
                <rect x={startX + n * (CW + gap)} y={Y} width={CW} height="54" rx="9" fill={isHit ? 'color-mix(in srgb, var(--algo-accent) 25%, transparent)' : isStore ? 'var(--a-visited-soft)' : has ? 'color-mix(in srgb, var(--a-visited) 10%, transparent)' : 'var(--a-surface-2)'} stroke={isHit ? 'var(--algo-accent)' : isStore || has ? 'var(--a-visited)' : 'var(--a-faint)'} strokeWidth={isStore || isHit ? 3 : 2} className={isStore || isHit ? 'algo-pulse' : ''} style={{ transition: 'fill .25s' }} />
                <text x={startX + n * (CW + gap) + CW / 2} y={Y + 24} textAnchor="middle" style={{ font: '600 10px ui-monospace, monospace', fill: 'var(--a-faint)' }}>fib({n})</text>
                <text x={startX + n * (CW + gap) + CW / 2} y={Y + 44} textAnchor="middle" style={{ font: '700 17px ui-monospace, monospace', fill: has ? 'var(--a-ink)' : 'var(--a-faint)' }}>{has ? fr.memo[n] : '·'}</text>
              </g>
            );
          })}
        </>
      )}
    />
  );
}
