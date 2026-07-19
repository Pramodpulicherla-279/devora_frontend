/* Lesson: Solving a Sudoku Puzzle With Backtracking  [AlgoStage]
 * A 4×4 Sudoku: for each empty cell try 1–4, keep going if valid, backtrack if stuck. Same
 * choose/explore/un-choose engine as N-Queens, on a constraint grid. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const PUZZLE = [[1, 2, 0, 4], [0, 4, 1, 2], [2, 1, 4, 0], [4, 0, 2, 1]];
const given = PUZZLE.map(row => row.map(v => v !== 0));
const valid = (g, r, c, v) => {
  for (let i = 0; i < 4; i++) if (g[r][i] === v || g[i][c] === v) return false;
  const br = r - r % 2, bc = c - c % 2;
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) if (g[br + i][bc + j] === v) return false;
  return true;
};
function buildFrames() {
  const g = PUZZLE.map(r => [...r]); const f = []; let solved = false;
  const snap = o => f.push(Object.assign({ g: g.map(r => [...r]) }, o));
  snap({ r: -1, c: -1, log: 'fill empty cells so every row, column and 2×2 box holds 1–4' });
  function solve() {
    if (solved) return true;
    let r = -1, c = -1;
    outer: for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) if (g[i][j] === 0) { r = i; c = j; break outer; }
    if (r === -1) { solved = true; snap({ r: -1, c: -1, done2: true, log: 'grid complete → solved', done: true }); return true; }
    for (let v = 1; v <= 4; v++) {
      const ok = valid(g, r, c, v);
      snap({ r, c, tryV: v, conflict: !ok, log: `cell (${r},${c}): try ${v} — ${ok ? 'valid' : 'breaks a rule'}` });
      if (ok) {
        g[r][c] = v; snap({ r, c, placed: v, log: `place ${v} at (${r},${c})` });
        if (solve()) return true;
        g[r][c] = 0; snap({ r, c, backtrack: true, log: `no solution → undo (${r},${c})` });
      }
    }
    return false;
  }
  solve();
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">solve</span>(grid):' },
  { n: 2, t: '    r, c = find_empty(grid)' },
  { n: 3, t: '    <span class="kw">if</span> <span class="kw">not</span> found: <span class="kw">return</span> <span class="kw">True</span>' },
  { n: 4, t: '    <span class="kw">for</span> v <span class="kw">in</span> 1..4:' },
  { n: 5, t: '        <span class="kw">if</span> valid(grid, r, c, v):' },
  { n: 6, t: '            grid[r][c] = v' },
  { n: 7, t: '            <span class="kw">if</span> <span class="fn">solve</span>(grid): <span class="kw">return</span> <span class="kw">True</span>' },
  { n: 8, t: '            grid[r][c] = 0   <span class="st"># backtrack</span>' },
];
const lineFor = fr => fr.done2 ? 3 : fr.backtrack ? 8 : fr.placed ? 6 : fr.tryV ? 5 : 2;
const CELL = 50, ox = 320 - (4 * CELL) / 2, oy = 22;

export default function BtSudokuVisualization() {
  return (
    <AlgoStage
      title="Sudoku (Backtracking)"
      subtitle="Find an empty cell, try each value 1–4, and check it against the row, column, and 2×2 box. Place it and move on; if the puzzle later gets stuck, come back and try the next value."
      accent="#a78bfa" viewBox="0 0 640 250"
      frames={FRAMES} code={CODE} lineFor={lineFor}
      variables={(fr, prev) => [
        { name: 'cell', type: 'tuple', prev: prev && prev.r >= 0 ? `(${prev.r},${prev.c})` : '—', cur: fr.r >= 0 ? `(${fr.r},${fr.c})` : '—' },
        { name: 'trying', type: 'int', prev: prev && prev.tryV ? String(prev.tryV) : '—', cur: fr.tryV ? String(fr.tryV) : '—' },
        { name: 'status', type: 'str', prev: '', cur: fr.done2 ? 'solved' : fr.backtrack ? 'backtrack' : fr.conflict ? 'invalid' : fr.placed ? 'placed' : 'trying' },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(solved|breaks a rule)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Constraint checking prunes hard: an invalid value is rejected before recursing, so the search explores far fewer than 4¹⁶ grids. Real 9×9 Sudoku uses the exact same engine — plus heuristics like filling the most-constrained cell first to prune even more.</>}
      renderCanvas={fr => (
        <>
          {fr.g.map((row, r) => row.map((v, c) => {
            const isCur = r === fr.r && c === fr.c;
            const isConflict = isCur && fr.conflict;
            const isGiven = given[r][c];
            const showTry = isCur && fr.tryV && !fr.placed;
            const fill = isConflict ? 'color-mix(in srgb, #f85149 20%, transparent)' : isCur && fr.placed ? 'var(--a-visited-soft)' : isCur ? 'var(--a-current-soft)' : isGiven ? 'var(--a-code)' : 'var(--a-surface-2)';
            const thick = (c % 2 === 0), thickR = (r % 2 === 0);
            return (
              <g key={r + '-' + c}>
                <rect x={ox + c * CELL} y={oy + r * CELL} width={CELL - 2} height={CELL - 2} rx="4" fill={fill} stroke={isCur ? (isConflict ? '#f85149' : 'var(--a-current)') : 'var(--a-border)'} strokeWidth={isCur ? 2.5 : 1} className={isCur && !fr.placed ? 'algo-pulse' : ''} style={{ transition: 'fill .2s' }} />
                {v !== 0 && <text x={ox + c * CELL + (CELL - 2) / 2} y={oy + r * CELL + 33} textAnchor="middle" style={{ font: `700 20px ui-monospace, monospace`, fill: isGiven ? 'var(--a-muted)' : 'var(--a-ink)' }}>{v}</text>}
                {showTry && v === 0 && <text x={ox + c * CELL + (CELL - 2) / 2} y={oy + r * CELL + 33} textAnchor="middle" style={{ font: '700 20px ui-monospace, monospace', fill: fr.conflict ? '#f85149' : 'var(--a-current)', opacity: 0.7 }}>{fr.tryV}</text>}
              </g>
            );
          }))}
          {/* box separators */}
          <line x1={ox + 2 * CELL - 1} y1={oy} x2={ox + 2 * CELL - 1} y2={oy + 4 * CELL - 2} stroke="var(--a-ink)" strokeWidth="2" />
          <line x1={ox} y1={oy + 2 * CELL - 1} x2={ox + 4 * CELL - 2} y2={oy + 2 * CELL - 1} stroke="var(--a-ink)" strokeWidth="2" />
        </>
      )}
    />
  );
}
