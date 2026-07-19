/* Lesson: Reversing an Array In Place  [AlgoStage framework]
 * Two pointers start at the ends and swap inward. Fully stepped with synced code, live
 * left/right inspector, and console. O(1) extra space. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const INIT = [3, 8, 1, 9, 4, 7];
const CW = 74, gap = 8, startX = (640 - (INIT.length * (CW + gap) - gap)) / 2, Y = 70;

function buildFrames() {
  const a = [...INIT], f = []; let left = 0, right = a.length - 1;
  const snap = o => f.push(Object.assign({ a: [...a], left, right }, o));
  snap({ line: 2, log: `left = 0, right = ${a.length - 1}` });
  let guard = 0;
  while (left < right && guard++ < 10) {
    snap({ line: 3, log: `left(${left}) < right(${right})? yes` });
    [a[left], a[right]] = [a[right], a[left]];
    snap({ line: 4, swap: [left, right], log: `swap a[${left}] ↔ a[${right}]` });
    left++;
    snap({ line: 5, log: `left = ${left}` });
    right--;
    snap({ line: 6, log: `right = ${right}` });
  }
  snap({ line: 7, log: 'array reversed in place', done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">reverse</span>(a):' },
  { n: 2, t: '    left, right = 0, <span class="fn">len</span>(a) - 1' },
  { n: 3, t: '    <span class="kw">while</span> left < right:' },
  { n: 4, t: '        a[left], a[right] = a[right], a[left]' },
  { n: 5, t: '        left += 1' },
  { n: 6, t: '        right -= 1' },
  { n: 7, t: '    <span class="kw">return</span> a' },
];

export default function ArrReverseInPlaceVisualization() {
  return (
    <AlgoStage
      title="Reverse an Array In Place"
      subtitle="Swap the ends, then step both pointers toward the middle. When they meet, the array is reversed — no second array, just O(1) extra space."
      accent="#6b8cff"
      viewBox="0 0 640 160"
      frames={FRAMES}
      code={CODE}
      lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'left', type: 'int', prev: prev ? String(prev.left) : '0', cur: String(fr.left) },
        { name: 'right', type: 'int', prev: prev ? String(prev.right) : String(INIT.length - 1), cur: String(fr.right) },
        { name: 'a[left]', type: 'int', prev: prev ? String(prev.a[prev.left]) : '—', cur: fr.left < fr.a.length ? String(fr.a[fr.left]) : '—' },
        { name: 'a[right]', type: 'int', prev: prev ? String(prev.a[prev.right]) : '—', cur: fr.right >= 0 ? String(fr.a[fr.right]) : '—' },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(swap[^↔]*↔[^\s]*)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Each swap fixes two elements at once, so only <code>n/2</code> swaps are needed → <strong>O(n)</strong> time, <strong>O(1)</strong> space. The two-pointer-from-the-ends pattern also powers palindrome checks and partitioning.</>}
      renderCanvas={fr => (
        <>
          {fr.a.map((v, i) => {
            const isL = i === fr.left, isR = i === fr.right, sw = fr.swap && (i === fr.swap[0] || i === fr.swap[1]);
            const done = fr.left >= fr.right && i >= 0;
            return (
              <g key={i}>
                <rect x={startX + i * (CW + gap)} y={Y} width={CW} height="52" rx="8" fill={sw ? 'var(--a-visited-soft)' : isL ? 'color-mix(in srgb, var(--algo-accent) 18%, transparent)' : isR ? 'var(--a-current-soft)' : 'var(--a-surface-2)'} stroke={sw ? 'var(--a-visited)' : isL ? 'var(--algo-accent)' : isR ? 'var(--a-current)' : 'var(--a-faint)'} strokeWidth={isL || isR || sw ? 3 : 2} className={sw ? 'algo-pulse' : ''} style={{ transition: 'fill .3s, stroke .3s' }} />
                <text x={startX + i * (CW + gap) + CW / 2} y={Y + 33} textAnchor="middle" style={{ font: '700 18px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
                <text x={startX + i * (CW + gap) + CW / 2} y={Y + 68} textAnchor="middle" style={{ font: '10px ui-monospace, monospace', fill: 'var(--a-faint)' }}>{i}</text>
              </g>
            );
          })}
          {fr.left < fr.a.length && <text x={startX + fr.left * (CW + gap) + CW / 2} y={Y - 8} textAnchor="middle" style={{ font: '700 11px ui-monospace, monospace', fill: 'var(--algo-accent)' }}>left</text>}
          {fr.right >= 0 && <text x={startX + fr.right * (CW + gap) + CW / 2} y={fr.left === fr.right ? Y - 22 : Y - 8} textAnchor="middle" style={{ font: '700 11px ui-monospace, monospace', fill: 'var(--a-current)' }}>right</text>}
        </>
      )}
    />
  );
}
