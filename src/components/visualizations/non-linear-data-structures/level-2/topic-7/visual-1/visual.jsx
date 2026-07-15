/* Lesson: Building a Heap From an Unsorted List  [AlgoStage framework]
 * Bottom-up build: sift_down every parent from the last one up to the root. Fully stepped with
 * synced code, array+tree, console. Surprisingly O(n), not O(n log n). */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const POS = [[280, 45], [170, 110], [390, 110], [110, 175], [230, 175], [340, 175], [450, 175]];
const parent = i => Math.floor((i - 1) / 2);

function buildFrames() {
  let heap = [5, 3, 8, 1, 9, 2, 7]; const n = heap.length, f = [];
  const snap = o => f.push(Object.assign({ heap: [...heap] }, o));
  snap({ line: 1, root: null, j: null, log: 'build a min-heap in place' });
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    snap({ line: 3, root: i, j: i, log: `heapify subtree at index ${i} (value ${heap[i]})` });
    let j = i, guard = 0;
    while (guard++ < 10) {
      const l = 2 * j + 1, r = 2 * j + 2; let c = -1;
      if (l < n) c = l;
      if (r < n && heap[r] < heap[l]) c = r;
      if (c === -1 || heap[j] <= heap[c]) { snap({ line: 4, root: i, j, log: `index ${j} settled` }); break; }
      const a = heap[j], b = heap[c];
      [heap[j], heap[c]] = [heap[c], heap[j]];
      snap({ line: 4, root: i, j, child: c, swap: [j, c], log: `swap ${a} ↕ ${b}` });
      j = c;
    }
  }
  snap({ line: 5, root: null, j: null, log: 'heap built — root is the minimum', done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">build_heap</span>(a):' },
  { n: 2, t: '    n = <span class="fn">len</span>(a)' },
  { n: 3, t: '    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(n//2 - 1, -1, -1):' },
  { n: 4, t: '        <span class="fn">sift_down</span>(a, i)   <span class="st"># bubble a[i] down</span>' },
  { n: 5, t: '    <span class="kw">return</span> a' },
];

export default function HeapBuildVisualization() {
  return (
    <AlgoStage
      title="Build-Heap (Bottom-Up)"
      subtitle="Start at the last parent and sift_down each node moving toward the root. Leaves are already valid heaps, so we skip them — which is why the whole build is O(n), not O(n log n)."
      accent="#4fce78"
      viewBox="0 0 560 220"
      frames={FRAMES}
      code={CODE}
      lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'i (subtree)', type: 'int', prev: prev && prev.root != null ? String(prev.root) : '—', cur: fr.root != null ? String(fr.root) : '—' },
        { name: 'j (sifting)', type: 'int', prev: prev && prev.j != null ? String(prev.j) : '—', cur: fr.j != null ? String(fr.j) : '—' },
        { name: 'a[j]', type: 'int', prev: prev && prev.j != null ? String(prev.heap[prev.j]) : '—', cur: fr.j != null ? String(fr.heap[fr.j]) : '—' },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(minimum)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Processing bottom-up means every node's children are already heaps when you sift it down. Most nodes are near the bottom with tiny subtrees, so the work sums to <strong>O(n)</strong> — faster than inserting n items one-by-one (O(n log n)).</>}
      aside={fr => (
        <div>
          <div style={{ font: '600 10.5px ui-monospace, monospace', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--a-faint)', marginBottom: 5 }}>Array</div>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {fr.heap.map((v, k) => <span key={k} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 30, borderRadius: 6, background: k === fr.j ? 'var(--a-current-soft)' : (fr.swap && k === fr.swap[1]) ? 'var(--a-visited-soft)' : 'var(--a-surface-2)', color: 'var(--a-ink)', border: '1px solid ' + (k === fr.root ? 'var(--a-visited)' : k === fr.j ? 'var(--a-current)' : 'var(--a-faint)'), font: '700 13px ui-monospace, monospace' }}>{v}</span>)}
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
            const isJ = i === fr.j, isRoot = i === fr.root, isChild = i === fr.child, isSwap = fr.swap && (i === fr.swap[0] || i === fr.swap[1]);
            return (
              <g key={i}>
                <circle cx={POS[i][0]} cy={POS[i][1]} r="20" fill={isJ ? 'var(--a-current-soft)' : isChild ? 'color-mix(in srgb, var(--algo-accent) 16%, transparent)' : 'var(--a-surface-2)'} stroke={isSwap ? 'var(--a-visited)' : isJ ? 'var(--a-current)' : isRoot ? 'var(--a-visited)' : isChild ? 'var(--algo-accent)' : 'var(--a-faint)'} strokeWidth={isJ || isChild || isRoot ? 3.2 : 2.5} className={isJ ? 'algo-pulse' : ''} style={{ transition: 'fill .3s, stroke .3s' }} />
                <text x={POS[i][0]} y={POS[i][1] + 5} textAnchor="middle" style={{ font: '700 15px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
              </g>
            );
          })}
        </>
      )}
    />
  );
}
