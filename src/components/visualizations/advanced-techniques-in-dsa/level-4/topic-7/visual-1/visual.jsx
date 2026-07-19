/* Lesson: Using XOR to Find a Single Unique Number  [AlgoStage]
 * XOR every element together: pairs cancel to 0 (x^x=0), zero is neutral (x^0=x), so only the
 * unique number survives. One pass, no extra memory. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const A = [4, 7, 2, 7, 4, 2, 9];   // 9 is the loner
function buildFrames() {
  const f = []; let acc = 0;
  const snap = o => f.push(Object.assign({ acc }, o));
  snap({ line: 2, i: -1, log: 'acc = 0 (XOR identity)' });
  for (let i = 0; i < A.length; i++) {
    const before = acc;
    acc ^= A[i];
    snap({ line: 4, i, log: `acc = ${before} ^ ${A[i]} = ${acc}  (${acc.toString(2).padStart(4, '0')})` });
  }
  snap({ line: 5, log: `every pair cancelled — the survivor is ${acc}`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">single_number</span>(nums):' },
  { n: 2, t: '    acc = 0' },
  { n: 3, t: '    <span class="kw">for</span> x <span class="kw">in</span> nums:' },
  { n: 4, t: '        acc ^= x' },
  { n: 5, t: '    <span class="kw">return</span> acc' },
];
const CW = 66, gap = 12, startX = (640 - (A.length * (CW + gap) - gap)) / 2;

export default function BitXorUniqueVisualization() {
  return (
    <AlgoStage
      title="XOR: Find the Single Number"
      subtitle="Three XOR facts do all the work: x^x = 0, x^0 = x, and order doesn't matter. So XOR-ing the whole array makes every duplicate pair annihilate, leaving only the loner."
      accent="#a78bfa" viewBox="0 0 640 160"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'x', type: 'int', prev: prev && prev.i >= 0 ? String(A[prev.i]) : '—', cur: fr.i >= 0 && fr.i < A.length ? String(A[fr.i]) : '—' },
        { name: 'acc', type: 'int', prev: prev ? String(prev.acc) : '0', cur: String(fr.acc) },
        { name: 'acc (bits)', type: 'bits', prev: prev ? prev.acc.toString(2).padStart(4, '0') : '0000', cur: fr.acc.toString(2).padStart(4, '0') },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(the survivor is \d+)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>O(n) time, <strong>O(1)</strong> space — beats both sorting and hash-set counting. Variants: two unique numbers (split by a differing bit), missing number in 0..n (XOR indices and values). XOR's self-cancelling makes it the tool for "everything appears twice except…" problems.</>}
      renderCanvas={fr => (
        <>
          {A.map((v, k) => {
            const cur = k === fr.i, seen = k < fr.i || fr.done;
            const isLoner = v === 9;
            return (
              <g key={k}>
                <rect x={startX + k * (CW + gap)} y="42" width={CW} height="52" rx="8" fill={fr.done && isLoner ? 'color-mix(in srgb, var(--algo-accent) 30%, transparent)' : cur ? 'var(--a-current-soft)' : seen ? 'var(--a-surface-2)' : 'var(--a-code)'} stroke={fr.done && isLoner ? 'var(--algo-accent)' : cur ? 'var(--a-current)' : 'var(--a-border)'} strokeWidth={cur || (fr.done && isLoner) ? 3 : 1.5} className={cur || (fr.done && isLoner) ? 'algo-pulse' : ''} style={{ transition: 'fill .25s' }} />
                <text x={startX + k * (CW + gap) + CW / 2} y="75" textAnchor="middle" style={{ font: '700 19px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
              </g>
            );
          })}
          <text x="320" y="132" textAnchor="middle" style={{ font: '700 15px ui-monospace, monospace', fill: 'var(--algo-accent)' }}>acc = {fr.acc}</text>
        </>
      )}
    />
  );
}
