/* Lesson: The N-Queens Problem  [AlgoStage framework]
 * Place queens row by row; try each column, backtrack when a queen is attacked. The canonical
 * backtracking search — fully stepped with board, synced code, row/column inspector, console. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const N = 4;
function buildFrames() {
  const f = []; const cols = new Set(), diag = new Set(), anti = new Set(); const q = []; let solved = false;
  const snap = o => f.push(Object.assign({ q: [...q] }, o));
  snap({ row: 0, tryCol: null, log: 'place a queen in each row without conflicts' });
  function place(r) {
    if (solved) return;
    if (r === N) { solved = true; snap({ row: N, tryCol: null, solution: true, log: 'all 4 queens safe → solution found', done: true }); return; }
    for (let c = 0; c < N; c++) {
      if (solved) return;
      const ok = !cols.has(c) && !diag.has(r - c) && !anti.has(r + c);
      snap({ row: r, tryCol: c, conflict: !ok, log: `row ${r}, col ${c}: ${ok ? 'safe' : 'attacked → skip'}` });
      if (ok) {
        q[r] = c; cols.add(c); diag.add(r - c); anti.add(r + c);
        snap({ row: r, tryCol: c, placed: true, log: `place queen (${r},${c})` });
        place(r + 1);
        if (solved) return;
        q[r] = undefined; cols.delete(c); diag.delete(r - c); anti.delete(r + c);
        snap({ row: r, tryCol: c, backtrack: true, log: `dead end → remove (${r},${c}), backtrack` });
      }
    }
  }
  place(0);
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">solve</span>(row):' },
  { n: 2, t: '    <span class="kw">if</span> row == N: <span class="kw">return</span> <span class="kw">True</span>' },
  { n: 3, t: '    <span class="kw">for</span> col <span class="kw">in</span> <span class="fn">range</span>(N):' },
  { n: 4, t: '        <span class="kw">if</span> safe(row, col):' },
  { n: 5, t: '            place(row, col)' },
  { n: 6, t: '            <span class="kw">if</span> <span class="fn">solve</span>(row+1): <span class="kw">return</span> <span class="kw">True</span>' },
  { n: 7, t: '            remove(row, col)   <span class="st"># backtrack</span>' },
  { n: 8, t: '    <span class="kw">return</span> <span class="kw">False</span>' },
];
const lineFor = fr => fr.solution ? 2 : fr.backtrack ? 7 : fr.placed ? 5 : fr.tryCol != null ? 4 : 3;
const CELL = 54, ox = 320 - (N * CELL) / 2, oy = 24;

export default function BtNQueensVisualization() {
  return (
    <AlgoStage
      title="N-Queens (Backtracking)"
      subtitle="Place one queen per row. For each row try every column; if the square is safe, place and recurse; if a row has no safe square, back up and move the previous queen. Choose → explore → un-choose."
      accent="#a78bfa" viewBox="0 0 640 260"
      frames={FRAMES} code={CODE} lineFor={lineFor}
      variables={(fr, prev) => [
        { name: 'row', type: 'int', prev: prev ? String(prev.row) : '0', cur: String(fr.row) },
        { name: 'trying col', type: 'int', prev: prev && prev.tryCol != null ? String(prev.tryCol) : '—', cur: fr.tryCol != null ? String(fr.tryCol) : '—' },
        { name: 'queens placed', type: 'int', prev: prev ? String(prev.q.filter(x => x != null).length) : '0', cur: String(fr.q.filter(x => x != null).length) },
        { name: 'status', type: 'str', prev: '', cur: fr.solution ? 'solved' : fr.backtrack ? 'backtrack' : fr.conflict ? 'attacked' : fr.placed ? 'placed' : 'trying' },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(solution found|backtrack)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Backtracking = DFS that <strong>undoes</strong> a choice when it leads nowhere. Each queen must avoid the same column and both diagonals (tracked as <code>row−col</code> and <code>row+col</code>). Pruning attacked squares early keeps the search far below the brute-force <code>Nᴺ</code>.</>}
      renderCanvas={fr => (
        <>
          {Array.from({ length: N }).map((_, r) => Array.from({ length: N }).map((_, c) => {
            const dark = (r + c) % 2 === 1;
            const isTry = r === fr.row && c === fr.tryCol && !fr.placed && !fr.solution;
            const isConflict = isTry && fr.conflict;
            const isPlaceCell = r === fr.row && c === fr.tryCol && fr.placed;
            const isBack = r === fr.row && c === fr.tryCol && fr.backtrack;
            let fill = dark ? 'var(--a-surface-2)' : 'var(--a-code)';
            if (isConflict || isBack) fill = 'color-mix(in srgb, #f85149 22%, transparent)';
            else if (isTry) fill = 'var(--a-current-soft)';
            else if (isPlaceCell) fill = 'var(--a-visited-soft)';
            const hasQ = fr.q[r] === c;
            return (
              <g key={r + '-' + c}>
                <rect x={ox + c * CELL} y={oy + r * CELL} width={CELL - 2} height={CELL - 2} rx="6" fill={fill} stroke={isTry || isPlaceCell || isBack ? (isConflict || isBack ? '#f85149' : isPlaceCell ? 'var(--a-visited)' : 'var(--a-current)') : 'var(--a-border)'} strokeWidth={isTry || isPlaceCell || isBack ? 2.5 : 1} className={isTry ? 'algo-pulse' : ''} style={{ transition: 'fill .2s' }} />
                {hasQ && <text x={ox + c * CELL + (CELL - 2) / 2} y={oy + r * CELL + 36} textAnchor="middle" style={{ font: '26px serif', fill: 'var(--a-visited)' }}>♛</text>}
                {isTry && !hasQ && <text x={ox + c * CELL + (CELL - 2) / 2} y={oy + r * CELL + 36} textAnchor="middle" style={{ font: '24px serif', fill: fr.conflict ? '#f85149' : 'var(--a-current)', opacity: 0.6 }}>♛</text>}
              </g>
            );
          }))}
          {fr.solution && <text x="320" y={oy + N * CELL + 20} textAnchor="middle" style={{ font: '700 14px ui-monospace, monospace', fill: 'var(--a-visited)' }}>✓ solution found</text>}
        </>
      )}
    />
  );
}
