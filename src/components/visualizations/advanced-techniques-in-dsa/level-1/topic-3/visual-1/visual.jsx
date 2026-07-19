/* Lesson: The Coin Change Problem — Where Greedy Succeeds and Where It Doesn't  [AlgoStage]
 * Step through greedy coin-picking on the trap system {1,3,4} for target 6, then see the DP
 * answer it missed. The full anatomy of a greedy failure. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const COINS = [4, 3, 1];
const T = 6;
function buildFrames() {
  const f = []; const picks = []; let remain = T;
  const snap = o => f.push(Object.assign({ picks: [...picks], remain }, o));
  snap({ line: 1, log: `greedy: make ${T} from {${[...COINS].sort((a, b) => a - b).join(',')}} — always take the biggest` });
  let guard = 0;
  while (remain > 0 && guard++ < 10) {
    for (const c of COINS) {
      if (c <= remain) {
        snap({ line: 3, coin: c, log: `biggest coin ≤ ${remain} is ${c} → take it` });
        picks.push(c); remain -= c;
        snap({ line: 4, coin: c, log: `remaining = ${remain}` });
        break;
      }
    }
  }
  snap({ line: 5, log: `greedy result: ${picks.join('+')} = ${T} using ${picks.length} coins`, greedyDone: true });
  snap({ line: 6, log: `but DP finds 3+3 = ${T} using only 2 coins`, showOptimal: true, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">greedy_change</span>(coins, t):' },
  { n: 2, t: '    <span class="kw">while</span> t > 0:' },
  { n: 3, t: '        c = biggest coin <= t' },
  { n: 4, t: '        take(c); t -= c' },
  { n: 5, t: '    <span class="st"># returns 4+1+1 (3 coins)</span>' },
  { n: 6, t: '    <span class="st"># DP would return 3+3 (2 coins)</span>' },
];

export default function GreedyCoinChangeVisualization() {
  return (
    <AlgoStage
      title="Coin Change: Greedy's Famous Trap"
      subtitle="Watch greedy walk into it: taking the 4 feels right, but it strands the remaining 2 into 1+1. The optimal answer never takes the biggest coin at all."
      accent="#f85149" viewBox="0 0 640 190"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'remaining', type: 'int', prev: prev ? String(prev.remain) : String(T), cur: String(fr.remain) },
        { name: 'picks', type: 'list', prev: prev ? `[${prev.picks.join(',')}]` : '[]', cur: `[${fr.picks.join(',')}]` },
        { name: 'coins used', type: 'int', prev: prev ? String(prev.picks.length) : '0', cur: String(fr.picks.length) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(using \d+ coins|only 2 coins)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Greedy is correct for coin change only when the coin system is <strong>canonical</strong> (like most real currencies). For arbitrary systems, the safe tool is the DP from the Dynamic Programming part — it considers every coin at every amount. Moral: <strong>prove</strong> greedy before you trust it.</>}
      renderCanvas={fr => (
        <>
          <text x="120" y="34" textAnchor="middle" style={{ font: '600 11px ui-monospace, monospace', fill: 'var(--a-faint)' }}>greedy picks</text>
          {fr.picks.map((v, k) => (
            <g key={k}>
              <circle cx={70 + k * 58} cy={74} r="24" fill={fr.showOptimal ? 'color-mix(in srgb, #f85149 18%, transparent)' : 'var(--a-current-soft)'} stroke={fr.showOptimal ? '#f85149' : 'var(--a-current)'} strokeWidth="2.5" className={k === fr.picks.length - 1 && !fr.greedyDone ? 'algo-pulse' : ''} />
              <text x={70 + k * 58} y={80} textAnchor="middle" style={{ font: '700 16px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
            </g>
          ))}
          {fr.picks.length > 0 && <text x={70 + fr.picks.length * 58 + 10} y={80} style={{ font: '700 14px ui-monospace, monospace', fill: fr.showOptimal ? '#f85149' : 'var(--a-muted)' }}>= {T - fr.remain} ({fr.picks.length} coins)</text>}
          {fr.showOptimal && (
            <>
              <text x="120" y="128" textAnchor="middle" style={{ font: '600 11px ui-monospace, monospace', fill: 'var(--a-faint)' }}>optimal (DP)</text>
              {[3, 3].map((v, k) => <g key={'o' + k}><circle cx={70 + k * 58} cy={162} r="24" fill="var(--a-visited-soft)" stroke="var(--a-visited)" strokeWidth="2.5" className="algo-pulse" /><text x={70 + k * 58} y={168} textAnchor="middle" style={{ font: '700 16px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text></g>)}
              <text x={196} y={168} style={{ font: '700 14px ui-monospace, monospace', fill: 'var(--a-visited)' }}>= 6 (2 coins) ✓</text>
            </>
          )}
        </>
      )}
    />
  );
}
