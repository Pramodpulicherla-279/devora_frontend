/* Lesson: Counting the Number of Set Bits  [AlgoStage]
 * Brian Kernighan's trick: n & (n-1) erases the LOWEST set bit. Count how many erasures until
 * zero — one loop iteration per 1-bit, not per bit position. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const START = 0b10110100; // 180, four set bits
function buildFrames() {
  const f = []; let n = START, count = 0;
  const snap = o => f.push(Object.assign({ n, count }, o));
  snap({ line: 2, log: `n = ${START} (${START.toString(2).padStart(8, '0')})` });
  while (n !== 0) {
    const low = n & -n;
    snap({ line: 3, low, log: `lowest set bit of ${n} is ${low}` });
    n = n & (n - 1); count++;
    snap({ line: 4, erased: low, log: `n & (n-1) erases it → ${n.toString(2).padStart(8, '0')} (count=${count})` });
  }
  snap({ line: 6, log: `zero reached — ${count} set bits`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">popcount</span>(n):' },
  { n: 2, t: '    count = 0' },
  { n: 3, t: '    <span class="kw">while</span> n:' },
  { n: 4, t: '        n &= n - 1   <span class="st"># kill lowest 1</span>' },
  { n: 5, t: '        count += 1' },
  { n: 6, t: '    <span class="kw">return</span> count' },
];
const CW = 56, gap = 8, startX = (640 - (8 * (CW + gap) - gap)) / 2;

export default function BitCountSetVisualization() {
  return (
    <AlgoStage
      title="Counting Set Bits (Kernighan)"
      subtitle="Subtracting 1 flips the lowest set bit and everything below it; AND-ing with the original wipes exactly that bit. Loop until zero — the iteration count IS the answer."
      accent="#4fce78" viewBox="0 0 640 160"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'n (binary)', type: 'bits', prev: prev ? prev.n.toString(2).padStart(8, '0') : '', cur: fr.n.toString(2).padStart(8, '0') },
        { name: 'count', type: 'int', prev: prev ? String(prev.count) : '0', cur: String(fr.count) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(erases it[^(]*|\d+ set bits)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Naively checking all 8 positions costs 8 steps; Kernighan runs once per <strong>set</strong> bit — here just 4 iterations. The same <code>n &amp; (n-1)</code> identity powers the power-of-two test next lesson. (Python 3.10+: <code>n.bit_count()</code>.)</>}
      renderCanvas={fr => (
        <>
          {Array.from({ length: 8 }, (_, i) => (fr.n >> (7 - i)) & 1).map((b, i) => {
            const isErased = fr.erased && (128 >> i) === fr.erased;
            return (
              <g key={i}>
                <rect x={startX + i * (CW + gap)} y="46" width={CW} height="52" rx="8" fill={isErased ? 'color-mix(in srgb, #f85149 22%, transparent)' : b ? 'color-mix(in srgb, var(--a-visited) 22%, transparent)' : 'var(--a-surface-2)'} stroke={isErased ? '#f85149' : b ? 'var(--a-visited)' : 'var(--a-border)'} strokeWidth={isErased ? 3 : b ? 2.5 : 1.5} className={isErased ? 'algo-pulse' : ''} style={{ transition: 'fill .25s' }} />
                <text x={startX + i * (CW + gap) + CW / 2} y="80" textAnchor="middle" style={{ font: '700 22px ui-monospace, monospace', fill: b ? 'var(--a-ink)' : 'var(--a-faint)' }}>{b}</text>
              </g>
            );
          })}
          <text x="320" y="128" textAnchor="middle" style={{ font: '700 14px ui-monospace, monospace', fill: 'var(--a-visited)' }}>set bits erased so far: {fr.count}</text>
        </>
      )}
    />
  );
}
