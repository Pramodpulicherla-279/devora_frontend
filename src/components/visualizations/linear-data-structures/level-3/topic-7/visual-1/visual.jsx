/* Lesson: Reversing a Linked List Iteratively  [AlgoStage framework]
 * The classic prev/curr/next three-pointer dance, fully stepped: each iteration flips one
 * node's next pointer backward. Synced code, live pointer inspector, console. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const VAL = [1, 2, 3, 4];
const X = i => 90 + i * 135, Y = 95, NULLX = 90 + VAL.length * 135;

function buildFrames() {
  const next = [1, 2, 3, null];          // next[i] = index or null
  const f = [];
  let prev = null, curr = 0, nxt = null;
  const snap = o => f.push(Object.assign({ next: [...next], prev, curr, nxt }, o));
  snap({ line: 2, log: 'prev = None' });
  snap({ line: 3, log: 'curr = head (node 1)' });
  let guard = 0;
  while (curr !== null && guard++ < 12) {
    snap({ line: 4, log: `curr is node ${VAL[curr]} → loop` });
    nxt = next[curr];
    snap({ line: 5, log: `nxt = ${nxt == null ? 'None' : 'node ' + VAL[nxt]}` });
    next[curr] = prev;
    snap({ line: 6, log: `node ${VAL[curr]}.next → ${prev == null ? 'None' : 'node ' + VAL[prev]}  (flipped)` });
    prev = curr;
    snap({ line: 7, log: `prev = node ${VAL[curr]}` });
    curr = nxt;
    snap({ line: 8, log: `curr = ${curr == null ? 'None' : 'node ' + VAL[curr]}` });
  }
  snap({ line: 9, log: `return prev (new head = node ${VAL[prev]})`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">reverse</span>(head):' },
  { n: 2, t: '    prev = <span class="kw">None</span>' },
  { n: 3, t: '    curr = head' },
  { n: 4, t: '    <span class="kw">while</span> curr:' },
  { n: 5, t: '        nxt = curr.next' },
  { n: 6, t: '        curr.next = prev' },
  { n: 7, t: '        prev = curr' },
  { n: 8, t: '        curr = nxt' },
  { n: 9, t: '    <span class="kw">return</span> prev' },
];
const lbl = i => (i == null ? 'None' : String(VAL[i]));

function ptr(i, text, color) {
  const x = i == null ? NULLX : X(i);
  return (
    <g key={text}>
      <text x={x} y={44} textAnchor="middle" style={{ font: '700 12px ui-monospace, monospace', fill: color }}>{text}</text>
      <path d={`M${x},50 l-5,-8 l10,0 z`} fill={color} />
    </g>
  );
}

export default function LlReverseVisualization() {
  return (
    <AlgoStage
      title="Reversing a Linked List"
      subtitle="Three pointers do the work: nxt saves the rest of the list, curr.next flips backward, then prev and curr shuffle forward. One pass, O(1) extra space."
      accent="#6b8cff"
      viewBox="0 0 640 200"
      frames={FRAMES}
      code={CODE}
      lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'prev', type: 'node', prev: prev ? lbl(prev.prev) : 'None', cur: lbl(fr.prev) },
        { name: 'curr', type: 'node', prev: prev ? lbl(prev.curr) : '1', cur: lbl(fr.curr) },
        { name: 'nxt', type: 'node', prev: prev ? lbl(prev.nxt) : 'None', cur: lbl(fr.nxt) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(flipped|new head[^)]*\))/, '<span class="pre">$1</span>')}</span>`}
      legend={<>The order matters: <strong>save</strong> <code>nxt</code> first (or you lose the rest of the list), <strong>flip</strong> <code>curr.next = prev</code>, then <strong>advance</strong> <code>prev</code> and <code>curr</code>. After the walk, <code>prev</code> is the new head. Time <code>O(n)</code>, space <code>O(1)</code>.</>}
      renderCanvas={fr => (
        <>
          <defs><marker id="ll-arr" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="var(--a-muted)" /></marker></defs>
          {VAL.map((v, i) => {
            const t = fr.next[i];
            if (t == null) return <text key={'n' + i} x={X(i) + 30} y={Y + 5} style={{ font: '12px ui-monospace, monospace', fill: 'var(--a-faint)' }}>→∅</text>;
            const x1 = X(i), x2 = X(t), dir = x2 > x1 ? 1 : -1;
            const my = t > i ? Y - 34 : Y + 34;
            return <path key={'n' + i} d={`M${x1 + dir * 24},${Y} Q${(x1 + x2) / 2},${my} ${x2 - dir * 26},${Y}`} fill="none" stroke={t < i ? 'var(--algo-accent)' : 'var(--a-muted)'} strokeWidth="2.5" markerEnd="url(#ll-arr)" style={{ transition: 'all .3s' }} />;
          })}
          {VAL.map((v, i) => {
            const isCur = i === fr.curr, isPrev = i === fr.prev;
            return (
              <g key={i}>
                <circle cx={X(i)} cy={Y} r="24" fill={isCur ? 'var(--a-current-soft)' : isPrev ? 'color-mix(in srgb, var(--algo-accent) 16%, transparent)' : 'var(--a-surface-2)'} stroke={isCur ? 'var(--a-current)' : isPrev ? 'var(--algo-accent)' : 'var(--a-faint)'} strokeWidth={isCur || isPrev ? 3 : 2.5} className={isCur ? 'algo-pulse' : ''} style={{ transition: 'fill .3s, stroke .3s' }} />
                <text x={X(i)} y={Y + 5} textAnchor="middle" style={{ font: '700 16px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
              </g>
            );
          })}
          <text x={NULLX} y={Y + 5} textAnchor="middle" style={{ font: '700 14px ui-monospace, monospace', fill: 'var(--a-faint)' }}>∅</text>
          {ptr(fr.prev, 'prev', 'var(--algo-accent)')}
          {ptr(fr.curr, 'curr', 'var(--a-current)')}
        </>
      )}
    />
  );
}
