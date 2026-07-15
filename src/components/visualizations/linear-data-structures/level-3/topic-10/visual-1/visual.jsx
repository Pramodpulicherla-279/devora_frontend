/* Lesson: Finding the Middle of a Linked List in One Pass  [AlgoStage framework]
 * slow +1, fast +2: when fast runs off the end, slow sits on the middle. Fully stepped with
 * synced code, live slow/fast inspector, and console. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const VAL = [1, 2, 3, 4, 5];
const NEXT = [1, 2, 3, 4, null];
const X = i => 90 + i * 108, Y = 85, NULLX = 90 + VAL.length * 108;

function buildFrames() {
  const f = [];
  let slow = 0, fast = 0;
  const snap = o => f.push(Object.assign({ slow, fast }, o));
  snap({ line: 2, log: 'slow = fast = head (node 1)' });
  let guard = 0;
  while (fast != null && NEXT[fast] != null && guard++ < 12) {
    snap({ line: 3, log: `fast (node ${VAL[fast]}) has a next → loop` });
    slow = NEXT[slow];
    snap({ line: 4, log: `slow → node ${VAL[slow]}` });
    fast = NEXT[NEXT[fast]];
    snap({ line: 5, log: `fast → ${fast == null ? 'None (off the end)' : 'node ' + VAL[fast]}` });
  }
  snap({ line: 6, log: `fast stopped → middle is node ${VAL[slow]}`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">middle</span>(head):' },
  { n: 2, t: '    slow = fast = head' },
  { n: 3, t: '    <span class="kw">while</span> fast <span class="kw">and</span> fast.next:' },
  { n: 4, t: '        slow = slow.next' },
  { n: 5, t: '        fast = fast.next.next' },
  { n: 6, t: '    <span class="kw">return</span> slow' },
];
const lbl = i => (i == null ? 'None' : String(VAL[i]));

export default function LlMiddleVisualization() {
  return (
    <AlgoStage
      title="Middle of a Linked List (Slow/Fast)"
      subtitle="Move slow one node and fast two nodes each step. When fast falls off the end, slow has travelled exactly half the list — the middle, found in a single pass."
      accent="#4fce78"
      viewBox="0 0 640 180"
      frames={FRAMES}
      code={CODE}
      lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'slow', type: 'node', prev: prev ? lbl(prev.slow) : '1', cur: lbl(fr.slow) },
        { name: 'fast', type: 'node', prev: prev ? lbl(prev.fast) : '1', cur: lbl(fr.fast) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(middle is node \d+)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Since fast covers ground twice as quickly, it reaches the end just as slow reaches the halfway point — no need to count the length first. This slow/fast "two-runner" trick also finds cycles and the k-th node from the end. Time <code>O(n)</code>, space <code>O(1)</code>.</>}
      renderCanvas={fr => (
        <>
          <defs><marker id="mid-arr" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="var(--a-muted)" /></marker></defs>
          {VAL.map((v, i) => {
            if (NEXT[i] == null) return <line key={i} x1={X(i) + 22} y1={Y} x2={NULLX - 16} y2={Y} stroke="var(--a-muted)" strokeWidth="2.5" markerEnd="url(#mid-arr)" />;
            return <line key={i} x1={X(i) + 22} y1={Y} x2={X(NEXT[i]) - 24} y2={Y} stroke="var(--a-muted)" strokeWidth="2.5" markerEnd="url(#mid-arr)" />;
          })}
          {VAL.map((v, i) => {
            const isSlow = i === fr.slow, isFast = i === fr.fast, mid = fr.done && isSlow;
            return (
              <g key={i}>
                <circle cx={X(i)} cy={Y} r="21" fill={mid ? 'var(--a-visited-soft)' : isSlow ? 'color-mix(in srgb, var(--algo-accent) 18%, transparent)' : isFast ? 'var(--a-current-soft)' : 'var(--a-surface-2)'} stroke={mid ? 'var(--a-visited)' : isSlow ? 'var(--algo-accent)' : isFast ? 'var(--a-current)' : 'var(--a-faint)'} strokeWidth={isSlow || isFast ? 3 : 2.5} className={mid ? 'algo-pulse' : ''} style={{ transition: 'fill .3s, stroke .3s' }} />
                <text x={X(i)} y={Y + 5} textAnchor="middle" style={{ font: '700 15px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
              </g>
            );
          })}
          <text x={NULLX} y={Y + 5} textAnchor="middle" style={{ font: '700 13px ui-monospace, monospace', fill: 'var(--a-faint)' }}>∅</text>
          <text x={fr.slow == null ? 0 : X(fr.slow)} y={Y - 30} textAnchor="middle" style={{ font: '700 11px ui-monospace, monospace', fill: 'var(--algo-accent)', opacity: fr.slow == null ? 0 : 1 }}>slow</text>
          <text x={fr.fast == null ? NULLX : X(fr.fast)} y={fr.slow === fr.fast ? Y - 46 : Y - 30} textAnchor="middle" style={{ font: '700 11px ui-monospace, monospace', fill: 'var(--a-current)' }}>fast</text>
        </>
      )}
    />
  );
}
