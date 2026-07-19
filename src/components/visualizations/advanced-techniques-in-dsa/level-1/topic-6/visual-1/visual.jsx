/* Lesson: The Fractional Knapsack Problem  [AlgoStage]
 * Because items can be split, greedy by value-per-weight IS optimal: pour in the densest item
 * first, then the next, taking a fraction of whatever no longer fits. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const ITEMS = [
  { n: 'gold dust', w: 6, v: 30 },   // ratio 5
  { n: 'silver', w: 5, v: 20 },      // ratio 4
  { n: 'copper', w: 4, v: 8 },       // ratio 2
]; // already sorted by ratio desc
const CAP = 10;
function buildFrames() {
  const f = []; let used = 0, value = 0; const takes = [];
  const snap = o => f.push(Object.assign({ used, value, takes: takes.map(t => ({ ...t })) }, o));
  snap({ line: 1, log: `capacity ${CAP}kg — items sorted by value/weight` });
  for (let i = 0; i < ITEMS.length; i++) {
    const it = ITEMS[i], room = CAP - used;
    snap({ line: 3, i, log: `${it.n}: ratio ${it.v}/${it.w} = ${(it.v / it.w).toFixed(1)} per kg, room = ${room}kg` });
    if (room <= 0) { snap({ line: 4, i, log: 'knapsack full → stop' }); break; }
    const take = Math.min(it.w, room);
    const frac = take / it.w;
    used += take; value += it.v * frac;
    takes.push({ i, take, frac });
    snap({ line: frac < 1 ? 6 : 5, i, log: frac < 1 ? `only ${room}kg fits → take ${(frac * 100).toFixed(0)}% of ${it.n} (+${it.v * frac})` : `take ALL of ${it.n} (+${it.v})` });
  }
  snap({ line: 7, log: `total value = ${value} — provably the maximum`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: 'items.sort(key=ratio, reverse=<span class="kw">True</span>)' },
  { n: 2, t: '<span class="kw">for</span> it <span class="kw">in</span> items:' },
  { n: 3, t: '    room = cap - used' },
  { n: 4, t: '    <span class="kw">if</span> room == 0: <span class="kw">break</span>' },
  { n: 5, t: '    take = <span class="fn">min</span>(it.w, room)' },
  { n: 6, t: '    value += it.v * take / it.w' },
  { n: 7, t: '<span class="kw">return</span> value' },
];
const COLORS = ['#f0c15b', '#c0c8d4', '#e08b5a'];

export default function GreedyFractionalKnapsackVisualization() {
  return (
    <AlgoStage
      title="Fractional Knapsack"
      subtitle="Unlike 0/1 knapsack, you may take fractions — so the greedy 'densest first' rule becomes provably optimal. Splitting removes the trap that forces 0/1 knapsack to use DP."
      accent="#f0a35e" viewBox="0 0 640 210"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'used', type: 'kg', prev: prev ? String(prev.used) : '0', cur: String(fr.used) },
        { name: 'room', type: 'kg', prev: prev ? String(CAP - prev.used) : String(CAP), cur: String(CAP - fr.used) },
        { name: 'value', type: 'int', prev: prev ? String(prev.value) : '0', cur: String(fr.value) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(take ALL[^(]*|take \d+%[^(]*|total value = \d+[^!]*)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>The exchange argument is easy here: if an optimal solution carries any lower-ratio material while higher-ratio material was left behind, swapping a gram improves it — contradiction. Contrast with <strong>0/1</strong> knapsack, where indivisibility breaks the argument and DP is required.</>}
      renderCanvas={fr => {
        const unit = 46;
        let x = 90;
        return (
          <>
            <text x="90" y="34" style={{ font: '600 11px ui-monospace, monospace', fill: 'var(--a-faint)' }}>knapsack — {CAP}kg capacity</text>
            <rect x="88" y="44" width={CAP * unit + 4} height="58" rx="10" fill="var(--a-code)" stroke="var(--a-faint)" strokeWidth="2" />
            {fr.takes.map((t, k) => {
              const w = t.take * unit;
              const el = <g key={k}><rect x={x + 2} y="48" width={w - 2} height="50" rx="6" fill={COLORS[t.i]} opacity="0.75" className={k === fr.takes.length - 1 ? 'algo-pulse' : ''} /><text x={x + w / 2} y="78" textAnchor="middle" style={{ font: '700 11px ui-monospace, monospace', fill: '#1a1a1a' }}>{ITEMS[t.i].n}{t.frac < 1 ? ` ${(t.frac * 100).toFixed(0)}%` : ''}</text></g>;
              x += w; return el;
            })}
            {/* item list */}
            {ITEMS.map((it, k) => {
              const isCur = k === fr.i;
              return <g key={'i' + k}><rect x={90 + k * 165} y="128" width="150" height="44" rx="8" fill={isCur ? 'var(--a-current-soft)' : 'var(--a-surface-2)'} stroke={isCur ? 'var(--a-current)' : COLORS[k]} strokeWidth={isCur ? 2.5 : 2} /><text x={165 + k * 165} y="146" textAnchor="middle" style={{ font: '700 12px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{it.n}</text><text x={165 + k * 165} y="164" textAnchor="middle" style={{ font: '11px ui-monospace, monospace', fill: 'var(--a-muted)' }}>{it.w}kg · {it.v}v · {(it.v / it.w).toFixed(1)}/kg</text></g>;
            })}
            <text x="320" y="196" textAnchor="middle" style={{ font: '700 13px ui-monospace, monospace', fill: 'var(--a-visited)' }}>value so far: {fr.value}</text>
          </>
        );
      }}
    />
  );
}
