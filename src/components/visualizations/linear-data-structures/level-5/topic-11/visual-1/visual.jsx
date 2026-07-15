/* Lesson: The Two-Sum Problem — Hashing's Signature Use Case  [AlgoStage framework]
 * For each number, check whether its complement (target − x) is already in a hash map. Fully
 * stepped with synced code, live seen-map inspector, console. One pass, O(n). */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const NUMS = [3, 5, 8, 2, 7];
const T = 10;
const CW = 74, gap = 10, startX = (640 - (NUMS.length * (CW + gap) - gap)) / 2, Y = 66;

function buildFrames() {
  const f = [], seen = {};
  const snap = o => f.push(Object.assign({ seen: { ...seen } }, o));
  snap({ line: 2, i: -1, log: 'seen = {}' });
  for (let i = 0; i < NUMS.length; i++) {
    const x = NUMS[i], need = T - x;
    snap({ line: 4, i, need, log: `x = ${x}, need = ${T} − ${x} = ${need}` });
    if (need in seen) { snap({ line: 6, i, need, found: [seen[need], i], log: `${need} in seen → answer (${seen[need]}, ${i})`, done: true }); return f; }
    seen[x] = i;
    snap({ line: 7, i, need, log: `${need} not seen → store ${x}:${i}` });
  }
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">two_sum</span>(nums, target):' },
  { n: 2, t: '    seen = {}' },
  { n: 3, t: '    <span class="kw">for</span> i, x <span class="kw">in</span> <span class="fn">enumerate</span>(nums):' },
  { n: 4, t: '        need = target - x' },
  { n: 5, t: '        <span class="kw">if</span> need <span class="kw">in</span> seen:' },
  { n: 6, t: '            <span class="kw">return</span> (seen[need], i)' },
  { n: 7, t: '        seen[x] = i' },
];

export default function HtTwoSumVisualization() {
  return (
    <AlgoStage
      title="Two-Sum With a Hash Map"
      subtitle="Instead of checking every pair (O(n²)), remember each number you've seen. For the current x, its partner must be target − x — one O(1) lookup tells you if you've already met it."
      accent="#4fce78"
      viewBox="0 0 640 150"
      frames={FRAMES}
      code={CODE}
      lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'i', type: 'int', prev: prev ? String(prev.i) : '—', cur: String(fr.i) },
        { name: 'x', type: 'int', prev: prev && prev.i >= 0 ? String(NUMS[prev.i]) : '—', cur: fr.i >= 0 ? String(NUMS[fr.i]) : '—' },
        { name: 'need', type: 'int', prev: prev && prev.need != null ? String(prev.need) : '—', cur: fr.need != null ? String(fr.need) : '—' },
        { name: 'need in seen', type: 'bool', prev: prev && prev.need != null ? String(prev.need in prev.seen) : '—', cur: fr.need != null ? String(fr.need in fr.seen) : '—' },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(answer[^)]*\))/, '<span class="pre">$1</span>')}</span>`}
      legend={<>The hash map turns "have I seen the complement?" into an <strong>O(1)</strong> question, so the whole scan is <strong>O(n)</strong> time and <strong>O(n)</strong> space — the classic time-for-space trade. Storing <em>index</em> as the value lets you return the positions.</>}
      aside={fr => (
        <div>
          <div style={{ font: '600 10.5px ui-monospace, monospace', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--a-faint)', marginBottom: 6 }}>seen  {'{ value: index }'}</div>
          <div style={{ display: 'flex', gap: 8, minHeight: 30, alignItems: 'center', flexWrap: 'wrap' }}>
            {Object.keys(fr.seen).length ? Object.entries(fr.seen).map(([v, i]) => {
              const isNeed = fr.need != null && +v === fr.need;
              return <span key={v} style={{ display: 'inline-flex', alignItems: 'center', padding: '0 9px', height: 28, borderRadius: 7, background: isNeed ? 'var(--a-visited-soft)' : 'var(--a-surface-2)', color: isNeed ? 'var(--a-visited)' : 'var(--a-ink)', border: '1px solid ' + (isNeed ? 'var(--a-visited)' : 'var(--a-faint)'), font: '700 13px ui-monospace, monospace' }}>{v}:{i}</span>;
            }) : <span style={{ color: 'var(--a-faint)', fontStyle: 'italic', fontSize: 13 }}>empty</span>}
          </div>
        </div>
      )}
      renderCanvas={fr => (
        <>
          {NUMS.map((v, i) => {
            const cur = i === fr.i, found = fr.found && (i === fr.found[0] || i === fr.found[1]);
            const done = i < fr.i;
            return (
              <g key={i}>
                <rect x={startX + i * (CW + gap)} y={Y} width={CW} height="52" rx="8" fill={found ? 'var(--a-visited-soft)' : cur ? 'var(--a-current-soft)' : done ? 'var(--a-surface-2)' : 'var(--a-code)'} stroke={found ? 'var(--a-visited)' : cur ? 'var(--a-current)' : done ? 'var(--a-faint)' : 'var(--a-border)'} strokeWidth={cur || found ? 3 : 2} className={cur || found ? 'algo-pulse' : ''} style={{ transition: 'fill .3s, stroke .3s' }} />
                <text x={startX + i * (CW + gap) + CW / 2} y={Y + 33} textAnchor="middle" style={{ font: '700 18px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
                <text x={startX + i * (CW + gap) + CW / 2} y={Y + 68} textAnchor="middle" style={{ font: '10px ui-monospace, monospace', fill: 'var(--a-faint)' }}>{i}</text>
              </g>
            );
          })}
        </>
      )}
    />
  );
}
