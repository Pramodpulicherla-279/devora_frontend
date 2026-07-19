/* Lesson: Removing the Top Element (Extract-Min)  [AlgoStage framework]
 * Take the root, move the last element up to keep the tree complete, then sift it down by
 * swapping with its smaller child until order is restored. Synced code, array+tree, console. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const POS = [[280, 45], [170, 110], [390, 110], [110, 175], [230, 175], [340, 175], [450, 175]];
const parent = i => Math.floor((i - 1) / 2);

function buildFrames() {
  let heap = [1, 3, 5, 7, 9, 6, 8];
  const f = [];
  const snap = o => f.push(Object.assign({ heap: [...heap], size: heap.length }, o));
  snap({ line: 2, i: 0, log: `root = heap[0] = ${heap[0]} (the minimum)` });
  const last = heap.pop();
  heap[0] = last;
  snap({ line: 3, i: 0, log: `move last (${last}) to root, size ${heap.length}` });
  let i = 0, guard = 0;
  while (guard++ < 10) {
    const l = 2 * i + 1, r = 2 * i + 2; let c = -1;
    if (l < heap.length) c = l;
    if (r < heap.length && heap[r] < heap[l]) c = r;
    if (c === -1) { snap({ line: 6, i, log: `node ${heap[i]} is a leaf → done`, done: true }); break; }
    snap({ line: 6, i, child: c, log: `smaller child = ${heap[c]}` });
    if (heap[i] <= heap[c]) { snap({ line: 7, i, log: `${heap[i]} ≤ ${heap[c]} → heap order restored`, done: true }); break; }
    const a = heap[i], b = heap[c];
    [heap[i], heap[c]] = [heap[c], heap[i]];
    snap({ line: 8, i, child: c, swap: [i, c], log: `${a} > ${b} → swap` });
    i = c;
    snap({ line: 9, i, log: `continue sifting from index ${i}` });
  }
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">extract_min</span>(heap):' },
  { n: 2, t: '    root = heap[0]' },
  { n: 3, t: '    heap[0] = heap.pop()' },
  { n: 4, t: '    i = 0' },
  { n: 5, t: '    <span class="kw">while</span> <span class="kw">True</span>:' },
  { n: 6, t: '        c = smaller_child(i)' },
  { n: 7, t: '        <span class="kw">if</span> heap[i] <= heap[c]: <span class="kw">break</span>' },
  { n: 8, t: '        heap[i], heap[c] = heap[c], heap[i]' },
  { n: 9, t: '        i = c' },
];

export default function HeapExtractVisualization() {
  return (
    <AlgoStage
      title="Extract-Min From a Heap"
      subtitle="The minimum is always the root. Remove it, move the last leaf up to keep the tree complete, then 'sift down' — swap with the smaller child until the heap property holds again."
      accent="#6b8cff"
      viewBox="0 0 560 230"
      frames={FRAMES}
      code={CODE}
      lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'i', type: 'int', prev: prev ? String(prev.i) : '0', cur: String(fr.i) },
        { name: 'heap[i]', type: 'int', prev: prev ? String(prev.heap[prev.i]) : '—', cur: String(fr.heap[fr.i]) },
        { name: 'child', type: 'int', prev: prev && prev.child != null ? String(prev.heap[prev.child]) : '—', cur: fr.child != null ? String(fr.heap[fr.child]) : '—' },
        { name: 'size', type: 'int', prev: prev ? String(prev.size) : '7', cur: String(fr.size) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(restored|done)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Sift-down compares a node with its <strong>smaller</strong> child and swaps if it's larger, walking down at most <code>log n</code> levels → <strong>O(log n)</strong>. The array layout means child indices are <code>2i+1</code> and <code>2i+2</code> — no pointers needed. Extract-min + insert is how a heap powers a priority queue.</>}
      aside={fr => (
        <div>
          <div style={{ font: '600 10.5px ui-monospace, monospace', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--a-faint)', marginBottom: 5 }}>Array backing store</div>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {fr.heap.map((v, k) => <span key={k} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 30, borderRadius: 6, background: k === fr.i ? 'var(--a-current-soft)' : (fr.swap && k === fr.swap[1]) ? 'var(--a-visited-soft)' : 'var(--a-surface-2)', color: 'var(--a-ink)', border: '1px solid ' + (k === fr.i ? 'var(--a-current)' : 'var(--a-faint)'), font: '700 13px ui-monospace, monospace' }}>{v}</span>)}
          </div>
        </div>
      )}
      renderCanvas={fr => (
        <>
          {fr.heap.map((v, i) => {
            if (i === 0) return null;
            const p = parent(i);
            const onSwap = fr.swap && ((i === fr.swap[0] || i === fr.swap[1]) && (p === fr.swap[0] || p === fr.swap[1]));
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
          <text x="280" y="215" textAnchor="middle" style={{ font: '600 11px ui-monospace, monospace', fill: 'var(--a-faint)' }}>extracted min = 1 · amber = sifting node</text>
        </>
      )}
    />
  );
}
