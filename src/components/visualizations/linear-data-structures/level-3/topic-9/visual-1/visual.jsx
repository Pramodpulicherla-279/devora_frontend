/* Lesson: Detecting a Cycle — Floyd's Tortoise and Hare  [AlgoStage framework]
 * slow moves 1 step, fast moves 2. In a looped list they must eventually meet. Fully stepped
 * with synced code, live slow/fast inspector, and console. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const VAL = [1, 2, 3, 4, 5, 6];
const NEXT = [1, 2, 3, 4, 5, 2];        // 6 loops back to 3 (index 2)
const X = i => 70 + i * 96, Y = 80;

function buildFrames() {
  const f = [];
  let slow = 0, fast = 0, met = false;
  const snap = o => f.push(Object.assign({ slow, fast, met }, o));
  snap({ line: 2, log: 'slow = fast = head (node 1)' });
  let guard = 0;
  while (guard++ < 12) {
    snap({ line: 3, log: 'fast and fast.next exist → loop' });
    slow = NEXT[slow];
    snap({ line: 4, log: `slow → node ${VAL[slow]}` });
    fast = NEXT[NEXT[fast]];
    snap({ line: 5, log: `fast → node ${VAL[fast]} (two hops)` });
    if (slow === fast) { met = true; snap({ line: 6, met: true, log: `slow == fast at node ${VAL[slow]} → cycle!`, done: true }); break; }
    snap({ line: 6, log: `slow (${VAL[slow]}) != fast (${VAL[fast]})` });
  }
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">has_cycle</span>(head):' },
  { n: 2, t: '    slow = fast = head' },
  { n: 3, t: '    <span class="kw">while</span> fast <span class="kw">and</span> fast.next:' },
  { n: 4, t: '        slow = slow.next' },
  { n: 5, t: '        fast = fast.next.next' },
  { n: 6, t: '        <span class="kw">if</span> slow <span class="kw">is</span> fast:' },
  { n: 7, t: '            <span class="kw">return</span> <span class="kw">True</span>' },
];

export default function LlCycleVisualization() {
  return (
    <AlgoStage
      title="Floyd's Tortoise and Hare"
      subtitle="A slow pointer (1 step) and a fast pointer (2 steps) chase through the list. If a loop exists the fast one laps the slow one and they collide — no extra memory needed."
      accent="#6b8cff"
      viewBox="0 0 640 210"
      frames={FRAMES}
      code={CODE}
      lineFor={fr => (fr.met && fr.done ? 7 : fr.line)}
      variables={(fr, prev) => [
        { name: 'slow', type: 'node', prev: prev ? String(VAL[prev.slow]) : '1', cur: String(VAL[fr.slow]) },
        { name: 'fast', type: 'node', prev: prev ? String(VAL[prev.fast]) : '1', cur: String(VAL[fr.fast]) },
        { name: 'slow is fast', type: 'bool', prev: prev ? String(prev.slow === prev.fast) : 'True', cur: String(fr.slow === fr.fast) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(cycle!)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Because fast gains one node on slow each step, inside a loop the gap shrinks to zero — they <strong>must</strong> meet. If fast reaches <code>None</code> first, there's no cycle. Time <code>O(n)</code>, space <code>O(1)</code> — far better than storing every visited node in a set.</>}
      renderCanvas={fr => (
        <>
          <defs><marker id="fc-arr" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="var(--a-muted)" /></marker></defs>
          {VAL.map((v, i) => {
            const t = NEXT[i], x1 = X(i), x2 = X(t);
            if (t === i + 1) return <line key={i} x1={x1 + 22} y1={Y} x2={x2 - 24} y2={Y} stroke="var(--a-muted)" strokeWidth="2.5" markerEnd="url(#fc-arr)" />;
            // back edge (curved below)
            return <path key={i} d={`M${x1},${Y + 22} Q${(x1 + x2) / 2},${Y + 78} ${x2},${Y + 24}`} fill="none" stroke="var(--a-faint)" strokeWidth="2.5" markerEnd="url(#fc-arr)" />;
          })}
          {VAL.map((v, i) => {
            const isSlow = i === fr.slow, isFast = i === fr.fast, meet = isSlow && isFast;
            return (
              <g key={i}>
                <circle cx={X(i)} cy={Y} r="21" fill={meet ? 'var(--a-visited-soft)' : isSlow ? 'color-mix(in srgb, var(--algo-accent) 18%, transparent)' : isFast ? 'var(--a-current-soft)' : 'var(--a-surface-2)'} stroke={meet ? 'var(--a-visited)' : isSlow ? 'var(--algo-accent)' : isFast ? 'var(--a-current)' : 'var(--a-faint)'} strokeWidth={isSlow || isFast ? 3 : 2.5} className={meet ? 'algo-pulse' : ''} style={{ transition: 'fill .3s, stroke .3s' }} />
                <text x={X(i)} y={Y + 5} textAnchor="middle" style={{ font: '700 15px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
              </g>
            );
          })}
          {/* pointer tags */}
          <text x={X(fr.slow)} y={Y - 30} textAnchor="middle" style={{ font: '700 11px ui-monospace, monospace', fill: 'var(--algo-accent)' }}>slow🐢</text>
          <text x={X(fr.fast)} y={fr.slow === fr.fast ? Y - 46 : Y - 30} textAnchor="middle" style={{ font: '700 11px ui-monospace, monospace', fill: 'var(--a-current)' }}>fast🐇</text>
        </>
      )}
    />
  );
}
