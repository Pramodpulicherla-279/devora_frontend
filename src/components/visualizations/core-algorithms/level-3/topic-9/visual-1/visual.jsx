/* Lesson: Maze Solving — Finding a Path Through a Grid  [AlgoStage]
 * DFS with backtracking: step into open neighbours, mark the trail, and when a path dead-ends,
 * back up and try another direction. Fully stepped with the grid, route, and console. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const G = [
  [0, 0, 1, 0, 0],
  [1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
];
const R = G.length, C = G[0].length, END = [4, 4];
const DIRS = [[0, 1], [1, 0], [0, -1], [-1, 0]];
const kkey = (r, c) => r + ',' + c;

function buildFrames() {
  const f = []; const visited = new Set(); const path = []; let solved = false;
  const snap = o => f.push(Object.assign({ path: path.map(p => [...p]), visited: [...visited] }, o));
  function dfs(r, c) {
    if (solved) return true;
    if (r < 0 || c < 0 || r >= R || c >= C || G[r][c] === 1 || visited.has(kkey(r, c))) return false;
    visited.add(kkey(r, c)); path.push([r, c]);
    snap({ r, c, action: 'visit', log: `step to (${r},${c})` });
    if (r === END[0] && c === END[1]) { solved = true; snap({ r, c, action: 'found', log: 'reached the exit!', done: true }); return true; }
    for (const [dr, dc] of DIRS) if (dfs(r + dr, c + dc)) return true;
    path.pop();
    snap({ r, c, action: 'back', log: `dead end at (${r},${c}) → backtrack` });
    return false;
  }
  snap({ r: 0, c: 0, action: 'start', log: 'start at (0,0), find the exit' });
  dfs(0, 0);
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">solve</span>(r, c):' },
  { n: 2, t: '    <span class="kw">if</span> off_grid <span class="kw">or</span> wall <span class="kw">or</span> seen: <span class="kw">return</span> <span class="kw">False</span>' },
  { n: 3, t: '    seen.add((r,c)); path.append((r,c))' },
  { n: 4, t: '    <span class="kw">if</span> (r,c) == exit: <span class="kw">return</span> <span class="kw">True</span>' },
  { n: 5, t: '    <span class="kw">for</span> dr,dc <span class="kw">in</span> [(0,1),(1,0),(0,-1),(-1,0)]:' },
  { n: 6, t: '        <span class="kw">if</span> <span class="fn">solve</span>(r+dr, c+dc): <span class="kw">return</span> <span class="kw">True</span>' },
  { n: 7, t: '    path.pop()   <span class="st"># backtrack</span>' },
  { n: 8, t: '    <span class="kw">return</span> <span class="kw">False</span>' },
];
const lineFor = fr => fr.action === 'found' ? 4 : fr.action === 'back' ? 7 : fr.action === 'visit' ? 3 : 1;
const CELL = 46, ox = 320 - (C * CELL) / 2, oy = 20;

export default function BtMazeVisualization() {
  return (
    <AlgoStage
      title="Maze Solving with Backtracking"
      subtitle="Depth-first search explores one direction as far as it can, laying down a trail. When it hits a wall or dead end, it backs up to the last junction and tries a different way."
      accent="#6b8cff" viewBox="0 0 640 260"
      frames={FRAMES} code={CODE} lineFor={lineFor}
      variables={(fr, prev) => [
        { name: 'cell', type: 'tuple', prev: prev ? `(${prev.r},${prev.c})` : '—', cur: `(${fr.r},${fr.c})` },
        { name: 'route length', type: 'int', prev: prev ? String(prev.path.length) : '0', cur: String(fr.path.length) },
        { name: 'cells seen', type: 'int', prev: prev ? String(prev.visited.length) : '0', cur: String(fr.visited.length) },
        { name: 'status', type: 'str', prev: '', cur: fr.action },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(reached the exit!|backtrack)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Backtracking = DFS that <strong>undoes</strong> a step (<code>path.pop()</code>) when it leads nowhere. The <code>seen</code> set stops it from looping. It finds <em>a</em> path (not necessarily the shortest — that's BFS's job). Same skeleton solves word search, N-Queens and Sudoku.</>}
      renderCanvas={fr => {
        const onPath = new Set(fr.path.map(([r, c]) => kkey(r, c)));
        const seen = new Set(fr.visited);
        return (
          <>
            {G.map((row, r) => row.map((cell, c) => {
              const isCur = r === fr.r && c === fr.c;
              const isPath = onPath.has(kkey(r, c));
              const isSeen = seen.has(kkey(r, c));
              const isStart = r === 0 && c === 0, isEnd = r === END[0] && c === END[1];
              let fill = cell === 1 ? 'var(--a-ink)' : isCur ? 'var(--a-current)' : isPath ? (fr.done ? 'var(--a-visited)' : 'color-mix(in srgb, var(--algo-accent) 45%, transparent)') : isSeen ? 'color-mix(in srgb, #f85149 14%, transparent)' : 'var(--a-surface-2)';
              return (
                <g key={r + '-' + c}>
                  <rect x={ox + c * CELL} y={oy + r * CELL} width={CELL - 3} height={CELL - 3} rx="5" fill={fill} stroke={isEnd ? 'var(--a-visited)' : 'var(--a-border)'} strokeWidth={isEnd || isStart ? 2.5 : 1} className={isCur ? 'algo-pulse' : ''} style={{ transition: 'fill .2s' }} />
                  {isStart && <text x={ox + c * CELL + (CELL - 3) / 2} y={oy + r * CELL + 28} textAnchor="middle" style={{ font: '700 12px ui-monospace, monospace', fill: 'var(--a-ink)' }}>S</text>}
                  {isEnd && <text x={ox + c * CELL + (CELL - 3) / 2} y={oy + r * CELL + 28} textAnchor="middle" style={{ font: '700 12px ui-monospace, monospace', fill: 'var(--a-visited)' }}>E</text>}
                </g>
              );
            }))}
          </>
        );
      }}
    />
  );
}
