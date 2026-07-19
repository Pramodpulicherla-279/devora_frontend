/* Lesson: The Top-K Elements Pattern  [AlgoStage]
 * Keep a MIN-heap of size k while streaming data: anything smaller than the heap's minimum
 * can't be top-k, so evict-and-insert only when the newcomer beats the floor. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const STREAM = [5, 12, 3, 19, 8, 15, 7];
const K = 3;
function buildFrames() {
  const f = []; const heap = [];
  const snap = o => f.push(Object.assign({ heap: [...heap].sort((a, b) => a - b) }, o));
  snap({ line: 1, i: -1, log: `stream numbers, keep only the ${K} largest` });
  for (let i = 0; i < STREAM.length; i++) {
    const x = STREAM[i];
    if (heap.length < K) { heap.push(x); snap({ line: 3, i, add: x, log: `heap not full → push ${x}` }); }
    else {
      const mn = Math.min(...heap);
      if (x > mn) { heap.splice(heap.indexOf(mn), 1); heap.push(x); snap({ line: 5, i, add: x, evict: mn, log: `${x} > floor ${mn} → evict ${mn}, push ${x}` }); }
      else snap({ line: 6, i, skip: true, log: `${x} ≤ floor ${mn} → can't be top-${K}, skip` });
    }
  }
  snap({ line: 7, log: `top-${K} = {${[...heap].sort((a, b) => b - a).join(', ')}}`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: 'heap = []   <span class="st"># min-heap, size ≤ k</span>' },
  { n: 2, t: '<span class="kw">for</span> x <span class="kw">in</span> stream:' },
  { n: 3, t: '    <span class="kw">if</span> len(heap) < k: heappush(heap, x)' },
  { n: 4, t: '    <span class="kw">elif</span> x > heap[0]:' },
  { n: 5, t: '        heapreplace(heap, x)' },
  { n: 6, t: '    <span class="st"># else: ignore x</span>' },
  { n: 7, t: '<span class="kw">return</span> heap' },
];
const CW = 66, gap = 12, startX = (640 - (STREAM.length * (CW + gap) - gap)) / 2;

export default function PatTopKVisualization() {
  return (
    <AlgoStage
      title="Top-K with a Size-K Min-Heap"
      subtitle="Counter-intuitive but perfect: to track the k LARGEST, keep a MIN-heap — its root is the floor of your top-k club. Newcomers must beat the floor to enter; the floor gets evicted."
      accent="#a78bfa" viewBox="0 0 640 190"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'x', type: 'int', prev: prev && prev.i >= 0 ? String(STREAM[prev.i]) : '—', cur: fr.i >= 0 && fr.i < STREAM.length ? String(STREAM[fr.i]) : '—' },
        { name: 'heap (floor first)', type: 'heap', prev: prev ? `[${prev.heap.join(',')}]` : '[]', cur: `[${fr.heap.join(',')}]` },
        { name: 'floor', type: 'int', prev: '—', cur: fr.heap.length ? String(fr.heap[0]) : '—' },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(evict \d+, push \d+|top-\d+ = \{[^}]*\})/, '<span class="pre">$1</span>')}</span>`}
      legend={<>n items, each heap op O(log k) → <strong>O(n log k)</strong> — far better than sorting everything when k is small. Same pattern: kth largest, k closest points, k most frequent (heap of counts), merge k lists. Heap of size k, never bigger.</>}
      renderCanvas={fr => (
        <>
          {STREAM.map((v, k) => {
            const cur = k === fr.i;
            const inHeap = fr.heap.includes(v) && k <= fr.i;
            return (
              <g key={k}>
                <rect x={startX + k * (CW + gap)} y="40" width={CW} height="48" rx="8" fill={cur && fr.skip ? 'color-mix(in srgb, #f85149 15%, transparent)' : cur ? 'var(--a-current-soft)' : inHeap ? 'color-mix(in srgb, var(--algo-accent) 18%, transparent)' : 'var(--a-surface-2)'} stroke={cur && fr.skip ? '#f85149' : cur ? 'var(--a-current)' : inHeap ? 'var(--algo-accent)' : 'var(--a-faint)'} strokeWidth={cur ? 3 : 1.5} className={cur ? 'algo-pulse' : ''} style={{ transition: 'fill .25s' }} />
                <text x={startX + k * (CW + gap) + CW / 2} y="70" textAnchor="middle" style={{ font: '700 17px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
              </g>
            );
          })}
          <text x="130" y="128" style={{ font: '600 11px ui-monospace, monospace', fill: 'var(--a-faint)' }}>the club (min-heap):</text>
          {fr.heap.map((v, k) => (
            <g key={'h' + k}>
              <rect x={270 + k * 70} y="112" width="56" height="36" rx="8" fill={k === 0 ? 'var(--a-current-soft)' : 'color-mix(in srgb, var(--algo-accent) 18%, transparent)'} stroke={k === 0 ? 'var(--a-current)' : 'var(--algo-accent)'} strokeWidth="2" style={{ transition: 'fill .25s' }} />
              <text x={298 + k * 70} y="136" textAnchor="middle" style={{ font: '700 15px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
              {k === 0 && <text x={298 + k * 70} y="162" textAnchor="middle" style={{ font: '600 9px ui-monospace, monospace', fill: 'var(--a-current)' }}>floor</text>}
            </g>
          ))}
        </>
      )}
    />
  );
}
