/* Lesson: Insertion Sort  [AlgoStage framework]
 * Grow a sorted prefix by taking each next element as "key" and shifting larger elements right
 * to open a slot. Fully stepped: bars, synced code, live key/i/j/shifts inspector, console. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const INIT = [5, 2, 8, 1, 9, 3];
const CW = 72, gap = 14, startX = (640 - (INIT.length * (CW + gap) - gap)) / 2, baseY = 176, unit = 15;

function buildFrames() {
  const a = [...INIT], n = a.length, f = []; let comps = 0, shifts = 0;
  const snap = o => f.push(Object.assign({ a: [...a], comps, shifts }, o));
  snap({ line: 2, i: null, j: null, key: null, sorted: 1, log: 'a[0] alone is a sorted prefix' });
  for (let i = 1; i < n; i++) {
    const key = a[i];
    snap({ line: 3, i, j: i - 1, key, sorted: i, hole: i, log: `key = a[${i}] = ${key}` });
    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      comps++;
      a[j + 1] = a[j]; shifts++;
      snap({ line: 6, i, j, key, sorted: i, hole: j, log: `a[${j}]=${a[j]} > ${key} → shift right` });
      j--;
    }
    a[j + 1] = key;
    snap({ line: 8, i, j, key, sorted: i + 1, insertAt: j + 1, log: `insert ${key} at index ${j + 1}` });
  }
  snap({ line: 8, i: n, j: null, key: null, sorted: n, log: 'array sorted', done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">insertion_sort</span>(a):' },
  { n: 2, t: '    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(1, <span class="fn">len</span>(a)):' },
  { n: 3, t: '        key = a[i]' },
  { n: 4, t: '        j = i - 1' },
  { n: 5, t: '        <span class="kw">while</span> j >= 0 <span class="kw">and</span> a[j] > key:' },
  { n: 6, t: '            a[j+1] = a[j]' },
  { n: 7, t: '            j -= 1' },
  { n: 8, t: '        a[j+1] = key' },
];

export default function SortInsertionVisualization() {
  return (
    <AlgoStage
      title="Insertion Sort — O(n²)"
      subtitle="Like sorting a hand of cards: take the next element and slide it left past everything larger until it lands in the right spot. Fast on nearly-sorted data and fully stable."
      accent="#4fce78" viewBox="0 0 640 200"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'i', type: 'int', prev: prev ? (prev.i == null ? '—' : String(prev.i)) : '—', cur: fr.i == null ? '—' : String(fr.i) },
        { name: 'key', type: 'int', prev: prev ? (prev.key == null ? '—' : String(prev.key)) : '—', cur: fr.key == null ? '—' : String(fr.key) },
        { name: 'j', type: 'int', prev: prev ? (prev.j == null ? '—' : String(prev.j)) : '—', cur: fr.j == null ? '—' : String(fr.j) },
        { name: 'shifts', type: 'int', prev: prev ? String(prev.shifts) : '0', cur: String(fr.shifts) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(insert \d+|sorted)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Best case (already sorted) is <strong>O(n)</strong> — the inner loop never runs; worst case (reversed) is <strong>O(n²)</strong>. Because it only shifts, never jumps, insertion sort is <strong>stable</strong> and is what Timsort uses for small runs. Green = sorted prefix, amber = the key's target slot.</>}
      renderCanvas={fr => (
        <>
          {fr.a.map((v, k) => {
            const isSorted = k < fr.sorted && k !== fr.hole;
            const isHole = k === fr.hole;
            const isInsert = fr.insertAt === k;
            const fill = isInsert ? 'var(--a-visited)' : isHole ? 'var(--a-current-soft)' : isSorted ? 'var(--a-visited-soft)' : 'var(--a-surface-2)';
            const stroke = isInsert || isSorted ? 'var(--a-visited)' : isHole ? 'var(--a-current)' : 'var(--a-faint)';
            return (
              <g key={k}>
                <rect x={startX + k * (CW + gap)} y={baseY - v * unit} width={CW} height={v * unit} rx="6" fill={fill} stroke={stroke} strokeWidth={isHole ? 3 : 2} className={isHole ? 'algo-pulse' : ''} style={{ transition: 'fill .25s, height .3s, y .3s' }} />
                <text x={startX + k * (CW + gap) + CW / 2} y={baseY - v * unit - 7} textAnchor="middle" style={{ font: '700 15px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
                <text x={startX + k * (CW + gap) + CW / 2} y={baseY + 16} textAnchor="middle" style={{ font: '10px ui-monospace, monospace', fill: 'var(--a-faint)' }}>{k}</text>
              </g>
            );
          })}
          {fr.key != null && <text x="320" y="18" textAnchor="middle" style={{ font: '700 13px ui-monospace, monospace', fill: 'var(--a-current)' }}>key = {fr.key}</text>}
        </>
      )}
    />
  );
}
