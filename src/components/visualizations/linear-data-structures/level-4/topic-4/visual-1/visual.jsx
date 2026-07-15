/* Lesson: Balanced Parentheses  [AlgoStage framework]
 * Scan the string: push every opening bracket, and on a closing bracket pop and check it
 * matches. Fully stepped with synced code, live stack inspector, console. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const S = '{[()]}';
const OPEN = '([{', PAIRS = { ')': '(', ']': '[', '}': '{' };
const X = i => 210 + i * 40, Y = 44;

function buildFrames() {
  const f = [], stack = [];
  const snap = o => f.push(Object.assign({ stack: [...stack] }, o));
  snap({ line: 2, idx: -1, log: 'stack = []' });
  for (let idx = 0; idx < S.length; idx++) {
    const ch = S[idx];
    snap({ line: 4, idx, log: `read '${ch}'` });
    if (OPEN.includes(ch)) { stack.push(ch); snap({ line: 6, idx, log: `'${ch}' is opening → push` }); }
    else {
      const top = stack[stack.length - 1];
      if (stack.length && top === PAIRS[ch]) { stack.pop(); snap({ line: 7, idx, log: `'${ch}' closes '${top}' → pop` }); }
      else { snap({ line: 8, idx, fail: true, log: `'${ch}' has no match → NOT balanced`, done: true }); return f; }
    }
  }
  snap({ line: 9, idx: S.length, balanced: stack.length === 0, log: stack.length ? 'unclosed brackets → not balanced' : 'stack empty → balanced ✓', done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">is_balanced</span>(s):' },
  { n: 2, t: '    stack = []' },
  { n: 3, t: '    pairs = {")":"(", "]":"[", "}":"{"}' },
  { n: 4, t: '    <span class="kw">for</span> ch <span class="kw">in</span> s:' },
  { n: 5, t: '        <span class="kw">if</span> ch <span class="kw">in</span> "([{":' },
  { n: 6, t: '            stack.append(ch)' },
  { n: 7, t: '        <span class="kw">elif</span> stack.pop() == pairs[ch]:' },
  { n: 8, t: '            <span class="kw">else</span>: <span class="kw">return</span> <span class="kw">False</span>' },
  { n: 9, t: '    <span class="kw">return</span> <span class="kw">not</span> stack' },
];

export default function SqBalancedParensVisualization() {
  return (
    <AlgoStage
      title="Balanced Parentheses (Stack)"
      subtitle="A stack is the perfect tool: push each opening bracket, and when a closing bracket arrives it must match the most recent open one — the top of the stack. Any mismatch means unbalanced."
      accent="#6b8cff"
      viewBox="0 0 640 230"
      frames={FRAMES}
      code={CODE}
      lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'ch', type: 'str', prev: prev && prev.idx >= 0 && prev.idx < S.length ? `'${S[prev.idx]}'` : '—', cur: fr.idx >= 0 && fr.idx < S.length ? `'${S[fr.idx]}'` : '—' },
        { name: 'stack top', type: 'str', prev: prev && prev.stack.length ? `'${prev.stack[prev.stack.length - 1]}'` : '—', cur: fr.stack.length ? `'${fr.stack[fr.stack.length - 1]}'` : '—' },
        { name: 'len(stack)', type: 'int', prev: prev ? String(prev.stack.length) : '0', cur: String(fr.stack.length) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(balanced ✓|NOT balanced)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Each closing bracket must match the <strong>top</strong> of the stack (LIFO) — the nearest unclosed opener. If the stack is empty when a closer arrives, or a bracket doesn't match, it's unbalanced; if the stack is empty at the end, it's balanced. Time <code>O(n)</code>.</>}
      aside={fr => (
        <div>
          <div style={{ font: '600 10.5px ui-monospace, monospace', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--a-faint)', marginBottom: 6 }}>Stack (top = right)</div>
          <div style={{ display: 'flex', gap: 6, minHeight: 34, alignItems: 'center' }}>
            {fr.stack.length ? fr.stack.map((c, k) => <span key={k} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 7, background: k === fr.stack.length - 1 ? 'color-mix(in srgb, var(--algo-accent) 22%, transparent)' : 'var(--a-surface-2)', color: 'var(--algo-accent)', border: '1px solid var(--algo-accent)', font: '700 16px ui-monospace, monospace' }}>{c}</span>) : <span style={{ color: 'var(--a-faint)', fontStyle: 'italic', fontSize: 13 }}>empty</span>}
          </div>
        </div>
      )}
      renderCanvas={fr => (
        <>
          <text x="320" y="24" textAnchor="middle" style={{ font: '600 11px ui-monospace, monospace', fill: 'var(--a-faint)' }}>input string</text>
          {S.split('').map((c, i) => {
            const cur = i === fr.idx, done = i < fr.idx;
            return (
              <g key={i}>
                <rect x={X(i) - 17} y={Y} width="34" height="40" rx="7" fill={cur ? (fr.fail ? 'color-mix(in srgb, #f85149 20%, transparent)' : 'var(--a-current-soft)') : done ? 'var(--a-surface-2)' : 'var(--a-code)'} stroke={cur ? (fr.fail ? '#f85149' : 'var(--a-current)') : done ? 'var(--a-faint)' : 'var(--a-border)'} strokeWidth={cur ? 3 : 2} className={cur ? 'algo-pulse' : ''} style={{ transition: 'fill .3s' }} />
                <text x={X(i)} y={Y + 27} textAnchor="middle" style={{ font: '700 19px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{c}</text>
              </g>
            );
          })}
          {/* vertical stack in canvas */}
          <text x="320" y="118" textAnchor="middle" style={{ font: '600 11px ui-monospace, monospace', fill: 'var(--a-faint)' }}>call stack grows ↑</text>
          {fr.stack.map((c, k) => (
            <g key={k}>
              <rect x="288" y={190 - k * 34} width="64" height="30" rx="7" fill={k === fr.stack.length - 1 ? 'color-mix(in srgb, var(--algo-accent) 20%, transparent)' : 'var(--a-surface-2)'} stroke="var(--algo-accent)" strokeWidth="2" className={k === fr.stack.length - 1 ? 'algo-pulse' : ''} />
              <text x="320" y={210 - k * 34} textAnchor="middle" style={{ font: '700 16px ui-monospace, monospace', fill: 'var(--algo-accent)' }}>{c}</text>
            </g>
          ))}
          {fr.done && <text x="320" y="212" textAnchor="middle" style={{ font: '700 15px ui-monospace, monospace', fill: fr.balanced ? 'var(--a-visited)' : '#f85149' }}>{fr.balanced ? '✓ balanced' : '✗ not balanced'}</text>}
        </>
      )}
    />
  );
}
