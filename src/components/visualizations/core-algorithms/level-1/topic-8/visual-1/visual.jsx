/* Lesson: Search Problems on 2D Sorted Matrices  [AlgoStage]
 * Rows and columns both sorted → start at the top-right corner. Bigger than target ⇒ move left,
 * smaller ⇒ move down. Each step eliminates a whole row or column: O(m+n). */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const M = [[1, 4, 7, 11], [2, 5, 8, 12], [3, 6, 9, 16], [10, 13, 14, 17]];
const T = 5;
const CELL = 58, ox = 320 - (M[0].length * CELL) / 2, oy = 26;

function buildFrames() {
  const f = []; let r = 0, c = M[0].length - 1, found = null;
  const snap = o => f.push(Object.assign({ r, c, found }, o));
  snap({ line: 2, log: `start at top-right (0,${c}) = ${M[0][c]}` });
  let g = 0;
  while (r < M.length && c >= 0 && g++ < 30) {
    snap({ line: 3, log: `compare matrix[${r}][${c}] = ${M[r][c]} with ${T}` });
    if (M[r][c] === T) { found = [r, c]; snap({ line: 4, found: [r, c], log: `found ${T} at (${r},${c})`, done: true }); return f; }
    if (M[r][c] > T) { snap({ line: 5, log: `${M[r][c]} > ${T} → move left (col ${c - 1})` }); c--; }
    else { snap({ line: 6, log: `${M[r][c]} < ${T} → move down (row ${r + 1})` }); r++; }
  }
  snap({ line: 7, found: -1, log: 'off the matrix → not found', done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">search</span>(M, t):' },
  { n: 2, t: '    r, c = 0, cols - 1     <span class="st"># top-right</span>' },
  { n: 3, t: '    <span class="kw">while</span> r < rows <span class="kw">and</span> c >= 0:' },
  { n: 4, t: '        <span class="kw">if</span> M[r][c] == t: <span class="kw">return</span> (r, c)' },
  { n: 5, t: '        <span class="kw">elif</span> M[r][c] > t: c -= 1' },
  { n: 6, t: '        <span class="kw">else</span>: r += 1' },
  { n: 7, t: '    <span class="kw">return</span> <span class="kw">None</span>' },
];

export default function SrchMatrixVisualization() {
  return (
    <AlgoStage
      title="Search a 2D Sorted Matrix"
      subtitle="Each row is sorted left-to-right and each column top-to-bottom. Starting from the top-right corner is the key: from there, every comparison rules out an entire row or column."
      accent="#6b8cff" viewBox="0 0 640 300"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'row', type: 'int', prev: prev ? String(prev.r) : '0', cur: String(fr.r) },
        { name: 'col', type: 'int', prev: prev ? String(prev.c) : String(M[0].length - 1), cur: String(fr.c) },
        { name: 'M[r][c]', type: 'int', prev: prev && prev.r < M.length && prev.c >= 0 ? String(M[prev.r][prev.c]) : '—', cur: fr.r < M.length && fr.c >= 0 ? String(M[fr.r][fr.c]) : '—' },
        { name: 'target', type: 'int', prev: String(T), cur: String(T) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(found \d+ at \([^)]*\)|not found)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>From the top-right, a value <em>too big</em> means the whole column below is also too big (columns increase downward) → move left; <em>too small</em> means the whole row to the left is too small → move down. At most <code>m + n</code> steps → <strong>O(m+n)</strong>.</>}
      renderCanvas={fr => (
        <>
          {M.map((row, r) => row.map((v, c) => {
            const cur = r === fr.r && c === fr.c, found = fr.found && fr.found[0] === r && fr.found[1] === c;
            const eliminated = (fr.found == null) && ((fr.r > r && c > fr.c) || false);
            const fill = found ? 'var(--a-visited-soft)' : cur ? 'var(--a-current-soft)' : 'var(--a-surface-2)';
            const stroke = found ? 'var(--a-visited)' : cur ? 'var(--a-current)' : 'var(--a-faint)';
            return (
              <g key={r + '-' + c}>
                <rect x={ox + c * CELL} y={oy + r * CELL} width={CELL - 4} height={CELL - 4} rx="7" fill={fill} stroke={stroke} strokeWidth={cur || found ? 3 : 1.5} className={cur && fr.found == null ? 'algo-pulse' : ''} style={{ transition: 'fill .25s' }} />
                <text x={ox + c * CELL + (CELL - 4) / 2} y={oy + r * CELL + 34} textAnchor="middle" style={{ font: '700 16px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
              </g>
            );
          }))}
        </>
      )}
    />
  );
}
