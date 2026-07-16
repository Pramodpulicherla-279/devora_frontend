/* Lesson: Counting Sort  [AlgoStage]
 * No comparisons: tally how many times each value appears, then write the values back in order.
 * Linear time when the value range is small. Fully stepped: input, counts, output. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const A = [3, 1, 3, 0, 2, 1, 2];
const K = 4;
const CW = 52, gap = 8;
const inX = i => 40 + i * (CW + gap);
const cntX = v => 250 + v * (CW + gap);
const outX = i => 40 + i * (CW + gap);

function buildFrames() {
  const f = []; const count = Array(K).fill(0); const out = [];
  const snap = o => f.push(Object.assign({ count: [...count], out: [...out] }, o));
  snap({ line: 2, phase: 'count', i: null, log: 'count array initialised to 0' });
  for (let i = 0; i < A.length; i++) { count[A[i]]++; snap({ line: 4, phase: 'count', i, bucket: A[i], log: `a[${i}]=${A[i]} → count[${A[i]}] = ${count[A[i]]}` }); }
  for (let v = 0; v < K; v++) { for (let c = 0; c < count[v]; c++) { out.push(v); snap({ line: 7, phase: 'out', v, outIdx: out.length - 1, log: `emit ${v} (${c + 1}/${count[v]})` }); } }
  snap({ line: 8, phase: 'done', log: 'sorted without a single comparison', done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">counting_sort</span>(a, k):' },
  { n: 2, t: '    count = [0] * k' },
  { n: 3, t: '    <span class="kw">for</span> x <span class="kw">in</span> a:' },
  { n: 4, t: '        count[x] += 1' },
  { n: 5, t: '    out = []' },
  { n: 6, t: '    <span class="kw">for</span> v <span class="kw">in</span> <span class="fn">range</span>(k):' },
  { n: 7, t: '        out += [v] * count[v]' },
  { n: 8, t: '    <span class="kw">return</span> out' },
];

export default function SortCountingVisualization() {
  return (
    <AlgoStage
      title="Counting Sort — O(n + k)"
      subtitle="When values are small integers, skip comparisons entirely: tally each value's frequency, then read the counts out in order. Linear time, at the cost of an array sized to the value range k."
      accent="#4fce78" viewBox="0 0 640 260"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'phase', type: 'str', prev: prev ? prev.phase : '', cur: fr.phase },
        { name: 'count', type: 'list', prev: prev ? `[${prev.count.join(',')}]` : '[0,0,0,0]', cur: `[${fr.count.join(',')}]` },
        { name: 'output len', type: 'int', prev: prev ? String(prev.out.length) : '0', cur: String(fr.out.length) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(without a single comparison)/, '<span class="pre">$1</span>')}</span>`}
      legend={<><strong>O(n + k)</strong> time — beats the O(n log n) comparison-sort lower bound because it doesn't compare, it counts. Only practical when <code>k</code> (the value range) isn't huge. A prefix-sum variant makes it <strong>stable</strong>, which is what radix sort relies on.</>}
      renderCanvas={fr => (
        <>
          <text x="40" y="30" style={{ font: '600 10px ui-monospace, monospace', fill: 'var(--a-faint)' }}>input</text>
          {A.map((v, i) => {
            const cur = fr.phase === 'count' && i === fr.i;
            return <g key={'in' + i}><rect x={inX(i)} y="38" width={CW} height="40" rx="6" fill={cur ? 'var(--a-current-soft)' : i < (fr.phase === 'count' ? fr.i : A.length) ? 'var(--a-surface-2)' : 'var(--a-code)'} stroke={cur ? 'var(--a-current)' : 'var(--a-faint)'} strokeWidth={cur ? 3 : 1.5} className={cur ? 'algo-pulse' : ''} /><text x={inX(i) + CW / 2} y="64" textAnchor="middle" style={{ font: '700 16px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text></g>;
          })}
          <text x="250" y="118" style={{ font: '600 10px ui-monospace, monospace', fill: 'var(--a-faint)' }}>counts (value → tally)</text>
          {fr.count.map((c, v) => {
            const hot = (fr.phase === 'count' && fr.bucket === v) || (fr.phase === 'out' && fr.v === v);
            return <g key={'c' + v}><rect x={cntX(v)} y="126" width={CW} height="40" rx="6" fill={hot ? 'color-mix(in srgb, var(--a-visited) 20%, transparent)' : 'var(--a-surface-2)'} stroke={hot ? 'var(--a-visited)' : 'var(--a-faint)'} strokeWidth={hot ? 3 : 1.5} className={hot ? 'algo-pulse' : ''} /><text x={cntX(v) + CW / 2} y="152" textAnchor="middle" style={{ font: '700 16px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{c}</text><text x={cntX(v) + CW / 2} y="182" textAnchor="middle" style={{ font: '9px ui-monospace, monospace', fill: 'var(--a-faint)' }}>val {v}</text></g>;
          })}
          <text x="40" y="206" style={{ font: '600 10px ui-monospace, monospace', fill: 'var(--a-faint)' }}>output</text>
          {fr.out.map((v, i) => <g key={'o' + i}><rect x={outX(i)} y="214" width={CW} height="38" rx="6" fill={i === fr.outIdx ? 'var(--a-visited)' : 'var(--a-visited-soft)'} stroke="var(--a-visited)" strokeWidth={i === fr.outIdx ? 3 : 1.5} className={i === fr.outIdx ? 'algo-pulse' : ''} /><text x={outX(i) + CW / 2} y="239" textAnchor="middle" style={{ font: '700 15px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text></g>)}
        </>
      )}
    />
  );
}
