/* Lesson: Climbing Stairs — A Gentle Introduction to DP Thinking  [AlgoStage]
 * ways(i) = ways(i-1) + ways(i-2): you arrive at step i from one step below or two below.
 * Fill the staircase bottom-up and watch the counts build. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const N = 6;
function buildFrames() {
  const f = []; const ways = Array(N + 1).fill(null);
  const snap = o => f.push(Object.assign({ ways: [...ways] }, o));
  snap({ line: 1, log: `how many ways to climb ${N} steps taking 1 or 2 at a time?` });
  ways[0] = 1; snap({ line: 2, fill: 0, log: 'ways[0] = 1 (stand at the bottom)' });
  ways[1] = 1; snap({ line: 3, fill: 1, log: 'ways[1] = 1 (single step)' });
  for (let i = 2; i <= N; i++) {
    snap({ line: 4, i, src: [i - 1, i - 2], log: `step ${i}: arrive from step ${i - 1} or step ${i - 2}` });
    ways[i] = ways[i - 1] + ways[i - 2];
    snap({ line: 5, i, fill: i, src: [i - 1, i - 2], log: `ways[${i}] = ${ways[i - 1]} + ${ways[i - 2]} = ${ways[i]}` });
  }
  snap({ line: 6, log: `${ways[N]} distinct ways to reach the top`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">climb</span>(n):' },
  { n: 2, t: '    ways = [1, 1]' },
  { n: 3, t: '    <span class="st"># ways[0]=1, ways[1]=1</span>' },
  { n: 4, t: '    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(2, n + 1):' },
  { n: 5, t: '        ways.append(ways[i-1] + ways[i-2])' },
  { n: 6, t: '    <span class="kw">return</span> ways[n]' },
];

export default function DpClimbingStairsVisualization() {
  const SW = 78, SH = 26, ox = 90, baseY = 200;
  return (
    <AlgoStage
      title="Climbing Stairs"
      subtitle="To stand on step i you must have come from step i−1 (one hop) or step i−2 (double hop). So the number of ways to reach i is simply the sum of the ways to reach those two — the fib recurrence in disguise."
      accent="#6b8cff" viewBox="0 0 640 220"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'i', type: 'int', prev: prev && prev.i != null ? String(prev.i) : '—', cur: fr.i != null ? String(fr.i) : '—' },
        { name: 'ways[i-1]', type: 'int', prev: '—', cur: fr.src ? String(fr.ways[fr.src[0]] ?? '—') : '—' },
        { name: 'ways[i-2]', type: 'int', prev: '—', cur: fr.src ? String(fr.ways[fr.src[1]] ?? '—') : '—' },
        { name: 'answer', type: 'int', prev: prev ? String(prev.ways[N] ?? '—') : '—', cur: String(fr.ways[N] ?? '—') },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(ways\[\d+\] = \d+ \+ \d+ = \d+|\d+ distinct ways[^!]*)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>The DP mindset in miniature: define the <strong>state</strong> (ways to reach step i), find the <strong>recurrence</strong> (sum of the two predecessors), set <strong>base cases</strong>, and fill in order. Change the allowed hops (1, 2, 3…) and only the recurrence changes — the framework stays.</>}
      renderCanvas={fr => (
        <>
          {fr.ways.map((v, k) => {
            const x = ox + k * SW * 0.92, y = baseY - k * SH;
            const isFill = fr.fill === k, isSrc = fr.src && (k === fr.src[0] || k === fr.src[1]);
            const has = v != null;
            return (
              <g key={k}>
                <rect x={x} y={y} width={SW} height={SH - 3} rx="5" fill={isFill ? 'var(--a-visited-soft)' : isSrc ? 'var(--a-current-soft)' : has ? 'color-mix(in srgb, var(--a-visited) 10%, transparent)' : 'var(--a-surface-2)'} stroke={isFill ? 'var(--a-visited)' : isSrc ? 'var(--a-current)' : has ? 'var(--a-visited)' : 'var(--a-faint)'} strokeWidth={isFill || isSrc ? 2.5 : 1.5} className={isFill ? 'algo-pulse' : ''} style={{ transition: 'fill .25s' }} />
                <text x={x + 14} y={y + 16} style={{ font: '600 9px ui-monospace, monospace', fill: 'var(--a-faint)' }}>s{k}</text>
                <text x={x + SW - 12} y={y + 16} textAnchor="end" style={{ font: '700 13px ui-monospace, monospace', fill: has ? 'var(--a-ink)' : 'var(--a-faint)' }}>{has ? v : '·'}</text>
              </g>
            );
          })}
          <text x="530" y="60" textAnchor="middle" style={{ font: '600 11px ui-monospace, monospace', fill: 'var(--a-faint)' }}>number = ways to reach that step</text>
        </>
      )}
    />
  );
}
