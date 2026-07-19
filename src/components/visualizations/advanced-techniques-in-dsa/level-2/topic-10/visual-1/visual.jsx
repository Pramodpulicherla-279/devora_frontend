/* Lesson: Coin Change — The DP Solution  [AlgoStage]
 * dp[a] = the fewest coins that make amount a. For each amount, try every coin and take the
 * best "one coin + previously solved smaller amount". Greedy fails here; DP doesn't. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const COINS = [1, 3, 4];
const AMT = 6;
function buildFrames() {
  const f = []; const dp = Array(AMT + 1).fill(null);
  const snap = o => f.push(Object.assign({ dp: [...dp] }, o));
  dp[0] = 0;
  snap({ line: 2, fill: 0, log: 'dp[0] = 0 — zero coins make amount 0' });
  for (let a = 1; a <= AMT; a++) {
    let best = Infinity;
    snap({ line: 3, a, log: `amount ${a}: try each coin` });
    for (const c of COINS) {
      if (c > a) { snap({ line: 4, a, coin: c, log: `coin ${c} > ${a} → skip` }); continue; }
      const cand = dp[a - c] + 1;
      const better = cand < best;
      if (better) best = cand;
      snap({ line: 5, a, coin: c, src: a - c, log: `coin ${c}: dp[${a - c}] + 1 = ${cand}${better ? ' → new best' : ''}` });
    }
    dp[a] = best;
    snap({ line: 6, a, fill: a, log: `dp[${a}] = ${best}` });
  }
  snap({ line: 7, log: `fewest coins for ${AMT} = ${dp[AMT]}  (3 + 3)`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: 'dp = [<span class="kw">inf</span>] * (amount + 1)' },
  { n: 2, t: 'dp[0] = 0' },
  { n: 3, t: '<span class="kw">for</span> a <span class="kw">in</span> <span class="fn">range</span>(1, amount + 1):' },
  { n: 4, t: '    <span class="kw">for</span> c <span class="kw">in</span> coins:' },
  { n: 5, t: '        <span class="kw">if</span> c <= a:' },
  { n: 6, t: '            dp[a] = <span class="fn">min</span>(dp[a], dp[a-c] + 1)' },
  { n: 7, t: '<span class="kw">return</span> dp[amount]' },
];
const CW = 70, gap = 10, startX = (640 - ((AMT + 1) * (CW + gap) - gap)) / 2, Y = 62;

export default function DpCoinChangeVisualization() {
  return (
    <AlgoStage
      title="Coin Change (Min Coins) — DP"
      subtitle="With coins {1, 3, 4} and target 6, greedy (take the biggest coin) gives 4+1+1 = 3 coins — but DP finds 3+3 = 2. Every amount is built from the best smaller amounts."
      accent="#f0a35e" viewBox="0 0 640 170"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'amount a', type: 'int', prev: prev && prev.a != null ? String(prev.a) : '—', cur: fr.a != null ? String(fr.a) : '—' },
        { name: 'coin', type: 'int', prev: prev && prev.coin != null ? String(prev.coin) : '—', cur: fr.coin != null ? String(fr.coin) : '—' },
        { name: 'dp', type: 'list', prev: prev ? `[${prev.dp.map(x => x ?? '·').join(',')}]` : '[]', cur: `[${fr.dp.map(x => x ?? '·').join(',')}]` },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(new best|dp\[\d+\] = \d+|fewest coins[^(]*)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>This is why DP beats greedy on non-canonical coin systems: dp[6] checks <em>all</em> coins — <code>dp[5]+1</code>, <code>dp[3]+1</code>, <code>dp[2]+1</code> — and keeps the minimum. Time <strong>O(amount × coins)</strong>. The "count the ways" variant flips <code>min</code> to a sum.</>}
      renderCanvas={fr => (
        <>
          {fr.dp.map((v, k) => {
            const isFill = fr.fill === k, isSrc = fr.src === k, isA = fr.a === k && !isFill;
            const has = v != null;
            return (
              <g key={k}>
                <rect x={startX + k * (CW + gap)} y={Y} width={CW} height="54" rx="9" fill={isFill ? 'var(--a-visited-soft)' : isSrc ? 'var(--a-current-soft)' : isA ? 'color-mix(in srgb, var(--algo-accent) 14%, transparent)' : has ? 'var(--a-surface-2)' : 'var(--a-code)'} stroke={isFill ? 'var(--a-visited)' : isSrc ? 'var(--a-current)' : isA ? 'var(--algo-accent)' : has ? 'var(--a-faint)' : 'var(--a-border)'} strokeWidth={isFill || isSrc || isA ? 3 : 1.5} className={isFill || isSrc ? 'algo-pulse' : ''} style={{ transition: 'fill .2s' }} />
                <text x={startX + k * (CW + gap) + CW / 2} y={Y + 22} textAnchor="middle" style={{ font: '600 10px ui-monospace, monospace', fill: 'var(--a-faint)' }}>amt {k}</text>
                <text x={startX + k * (CW + gap) + CW / 2} y={Y + 44} textAnchor="middle" style={{ font: '700 17px ui-monospace, monospace', fill: has ? 'var(--a-ink)' : 'var(--a-faint)' }}>{has ? v : '·'}</text>
              </g>
            );
          })}
          <text x="320" y="152" textAnchor="middle" style={{ font: '600 11px ui-monospace, monospace', fill: 'var(--a-faint)' }}>coins available: {COINS.join(', ')} · amber = the smaller amount being reused</text>
        </>
      )}
    />
  );
}
