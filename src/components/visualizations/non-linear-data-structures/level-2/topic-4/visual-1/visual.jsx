/* Lesson: Heapify — Restoring Heap Order After a Change  [AlgoStage framework]
 * A too-big root "sifts down", swapping with its smaller child until the heap property holds.
 * Fully stepped with synced code, array+tree, console. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const POS = [[280, 45], [170, 110], [390, 110], [110, 175], [230, 175], [340, 175], [450, 175]];
const parent = i => Math.floor((i - 1) / 2);

function buildFrames() {
  let heap = [9, 3, 5, 7, 1, 6, 8];
  const f = [];
  const snap = o => f.push(Object.assign({ heap: [...heap] }, o));
  let i = 0;
  snap({ line: 1, i: 0, log: `sift_down from index 0 (value ${heap[0]})` });
  let guard = 0;
  while (guard++ < 10) {
    const l = 2 * i + 1, r = 2 * i + 2; let c = -1;
    if (l < heap.length) c = l;
    if (r < heap.length && heap[r] < heap[l]) c = r;
    if (c === -1) { snap({ line: 4, i, log: `index ${i} is a leaf → done`, done: true }); break; }
    snap({ line: 3, i, child: c, log: `smaller child = ${heap[c]}` });
    if (heap[i] <= heap[c]) { snap({ line: 4, i, log: `${heap[i]} ≤ ${heap[c]} → heap order restored`, done: true }); break; }
    const a = heap[i], b = heap[c];
    [heap[i], heap[c]] = [heap[c], heap[i]];
    snap({ line: 6, i, child: c, swap: [i, c], log: `${a} > ${b} → swap down` });
    i = c;
    snap({ line: 7, i, log: `continue from index ${i}` });
  }
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">sift_down</span>(heap, i):' },
  { n: 2, t: '    <span class="kw">while</span> <span class="kw">True</span>:' },
  { n: 3, t: '        c = smaller_child(i)' },
  { n: 4, t: '        <span class="kw">if</span> c <span class="kw">is</span> <span class="kw">None</span> <span class="kw">or</span> heap[i] <= heap[c]: <span class="kw">break</span>' },
  { n: 6, t: '        heap[i], heap[c] = heap[c], heap[i]' },
  { n: 7, t: '        i = c' },
];

export default function HeapHeapifyVisualization() {
  return (
    <AlgoStage
      title="Heapify (Sift-Down)"
      subtitle="When a node breaks the heap property, compare it with its smaller child and swap downward — repeat until it's smaller than both children (or hits a leaf). At most log n steps."
      accent="#6b8cff"
      viewBox="0 0 560 220"
      frames={FRAMES}
      code={CODE}
      lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'i', type: 'int', prev: prev ? String(prev.i) : '0', cur: String(fr.i) },
        { name: 'heap[i]', type: 'int', prev: prev ? String(prev.heap[prev.i]) : '—', cur: String(fr.heap[fr.i]) },
        { name: 'smaller child', type: 'int', prev: prev && prev.child != null ? String(prev.heap[prev.child]) : '—', cur: fr.child != null ? String(fr.heap[fr.child]) : '—' },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(restored|done)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>"Heapify" a single node = sift it down until order holds. Because a heap is a complete tree of height <code>log n</code>, sift-down is <strong>O(log n)</strong>. It's the workhorse behind insert, extract, and building a heap. Array indices: children are <code>2i+1</code> and <code>2i+2</code>.</>}
      aside={fr => (
        <div>
          <div style={{ font: '600 10.5px ui-monospace, monospace', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--a-faint)', marginBottom: 5 }}>Array</div>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {fr.heap.map((v, k) => <span key={k} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 30, borderRadius: 6, background: k === fr.i ? 'var(--a-current-soft)' : (fr.swap && k === fr.swap[1]) ? 'var(--a-visited-soft)' : 'var(--a-surface-2)', color: 'var(--a-ink)', border: '1px solid ' + (k === fr.i ? 'var(--a-current)' : 'var(--a-faint)'), font: '700 13px ui-monospace, monospace' }}>{v}</span>)}
          </div>
        </div>
      )}
      renderCanvas={fr => (
        <>
          {fr.heap.map((v, i) => {
            if (i === 0) return null;
            const p = parent(i), onSwap = fr.swap && ((i === fr.swap[0] || i === fr.swap[1]) && (p === fr.swap[0] || p === fr.swap[1]));
            return <line key={'e' + i} x1={POS[p][0]} y1={POS[p][1]} x2={POS[i][0]} y2={POS[i][1]} stroke={onSwap ? 'var(--a-visited)' : 'var(--a-border)'} strokeWidth={onSwap ? 3 : 2} style={{ transition: 'stroke .3s' }} />;
          })}
          {fr.heap.map((v, i) => {
            const isI = i === fr.i, isChild = i === fr.child, isSwap = fr.swap && (i === fr.swap[0] || i === fr.swap[1]);
            return (
              <g key={i}>
                <circle cx={POS[i][0]} cy={POS[i][1]} r="20" fill={isI ? 'var(--a-current-soft)' : isChild ? 'color-mix(in srgb, var(--algo-accent) 16%, transparent)' : 'var(--a-surface-2)'} stroke={isSwap ? 'var(--a-visited)' : isI ? 'var(--a-current)' : isChild ? 'var(--algo-accent)' : 'var(--a-faint)'} strokeWidth={isI || isChild ? 3.5 : 2.5} className={isI ? 'algo-pulse' : ''} style={{ transition: 'fill .3s, stroke .3s' }} />
                <text x={POS[i][0]} y={POS[i][1] + 5} textAnchor="middle" style={{ font: '700 15px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
              </g>
            );
          })}
        </>
      )}
    />
  );
}
