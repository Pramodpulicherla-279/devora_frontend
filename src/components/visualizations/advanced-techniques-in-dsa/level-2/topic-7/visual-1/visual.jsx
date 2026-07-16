/* Lesson: The 0/1 Knapsack Problem  [AlgoStage]
 * The classic 2D DP table: rows = items considered, columns = remaining capacity. Each cell is
 * a take-it-or-skip-it decision built from the row above. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const ITEMS = [{ n: 'A', w: 1, v: 1 }, { n: 'B', w: 3, v: 4 }, { n: 'C', w: 4, v: 5 }];
const CAP = 5;
function buildFrames() {
  const f = []; const dp = Array.from({ length: ITEMS.length + 1 }, () => Array(CAP + 1).fill(null));
  const snap = o => f.push(Object.assign({ dp: dp.map(r => [...r]) }, o));
  for (let c = 0; c <= CAP; c++) dp[0][c] = 0;
  snap({ line: 2, log: 'row 0: no items → value 0 at every capacity' });
  for (let i = 1; i <= ITEMS.length; i++) {
    const it = ITEMS[i - 1];
    for (let c = 0; c <= CAP; c++) {
      const skip = dp[i - 1][c];
      if (c < it.w) {
        dp[i][c] = skip;
        snap({ line: 5, cur: [i, c], srcs: [[i - 1, c]], log: `item ${it.n} (w${it.w}) too heavy for cap ${c} → carry ${skip}` });
      } else {
        const take = dp[i - 1][c - it.w] + it.v;
        dp[i][c] = Math.max(skip, take);
        snap({ line: 7, cur: [i, c], srcs: [[i - 1, c], [i - 1, c - it.w]], log: `cap ${c}: skip=${skip} vs take=${dp[i - 1][c - it.w]}+${it.v}=${take} → ${dp[i][c]}` });
      }
    }
  }
  snap({ line: 8, log: `best value = ${dp[ITEMS.length][CAP]} (items A + C, weight 5)`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">for</span> i, item <span class="kw">in</span> <span class="fn">enumerate</span>(items, 1):' },
  { n: 2, t: '    <span class="kw">for</span> c <span class="kw">in</span> <span class="fn">range</span>(cap + 1):' },
  { n: 5, t: '        <span class="kw">if</span> c < item.w: dp[i][c] = dp[i-1][c]' },
  { n: 6, t: '        <span class="kw">else</span>:' },
  { n: 7, t: '            dp[i][c] = <span class="fn">max</span>(dp[i-1][c],' },
  { n: 8, t: '                dp[i-1][c-item.w] + item.v)' },
];
const CW = 64, CH = 36, ox = 150, oy = 42;

export default function DpKnapsackVisualization() {
  return (
    <AlgoStage
      title="0/1 Knapsack — 2D DP Table"
      subtitle="dp[i][c] = the best value using the first i items within capacity c. Each cell asks one question: is this item worth taking? max(skip it, take it + best of the leftover capacity)."
      accent="#a78bfa" viewBox="0 0 640 240"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'cell', type: 'tuple', prev: prev && prev.cur ? `[${prev.cur.join(',')}]` : '—', cur: fr.cur ? `[${fr.cur.join(',')}]` : '—' },
        { name: 'item', type: 'str', prev: '—', cur: fr.cur ? `${ITEMS[fr.cur[0] - 1].n} (w${ITEMS[fr.cur[0] - 1].w},v${ITEMS[fr.cur[0] - 1].v})` : '—' },
        { name: 'value', type: 'int', prev: '—', cur: fr.cur ? String(fr.dp[fr.cur[0]][fr.cur[1]]) : '—' },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(→ \d+|best value = \d+[^)]*\))/, '<span class="pre">$1</span>')}</span>`}
      legend={<>The table has <code>items × capacity</code> states, each computed in O(1) → <strong>O(n·W)</strong>. Reading a cell's two sources — <em>directly above</em> (skip) and <em>above-left by the item's weight</em> (take) — is the entire algorithm. Final answer: bottom-right cell.</>}
      renderCanvas={fr => (
        <>
          {/* column headers = capacity */}
          {Array.from({ length: CAP + 1 }).map((_, c) => <text key={'c' + c} x={ox + c * CW + CW / 2} y={oy - 8} textAnchor="middle" style={{ font: '600 10px ui-monospace, monospace', fill: 'var(--a-faint)' }}>cap {c}</text>)}
          {/* row headers */}
          {['∅', ...ITEMS.map(it => `${it.n} w${it.w}v${it.v}`)].map((lab, r) => <text key={'r' + r} x={ox - 10} y={oy + r * CH + 23} textAnchor="end" style={{ font: '600 10px ui-monospace, monospace', fill: 'var(--a-faint)' }}>{lab}</text>)}
          {fr.dp.map((row, r) => row.map((v, c) => {
            const isCur = fr.cur && fr.cur[0] === r && fr.cur[1] === c;
            const isSrc = fr.srcs && fr.srcs.some(([sr, sc]) => sr === r && sc === c);
            const isAns = fr.done && r === ITEMS.length && c === CAP;
            const has = v != null;
            return (
              <g key={r + '-' + c}>
                <rect x={ox + c * CW} y={oy + r * CH} width={CW - 4} height={CH - 4} rx="6" fill={isAns ? 'var(--a-visited)' : isCur ? 'var(--a-visited-soft)' : isSrc ? 'var(--a-current-soft)' : has ? 'var(--a-surface-2)' : 'var(--a-code)'} stroke={isAns || isCur ? 'var(--a-visited)' : isSrc ? 'var(--a-current)' : 'var(--a-border)'} strokeWidth={isCur || isSrc || isAns ? 2.5 : 1} className={isCur ? 'algo-pulse' : ''} style={{ transition: 'fill .2s' }} />
                <text x={ox + c * CW + (CW - 4) / 2} y={oy + r * CH + 22} textAnchor="middle" style={{ font: '700 14px ui-monospace, monospace', fill: isAns ? '#fff' : has ? 'var(--a-ink)' : 'var(--a-faint)' }}>{has ? v : '·'}</text>
              </g>
            );
          }))}
        </>
      )}
    />
  );
}
