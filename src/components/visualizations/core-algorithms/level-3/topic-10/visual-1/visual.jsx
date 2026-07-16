/* Lesson: Word Search — Finding Words Hidden in a Grid  [AlgoStage]
 * DFS from each cell, matching the word letter by letter and marking the trail so a cell isn't
 * reused. Backtrack when the next letter doesn't match. Finds "ABCCED". */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const G = [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']];
const WORD = 'ABCCED';
const R = G.length, C = G[0].length;
const DIRS = [[0, 1], [1, 0], [0, -1], [-1, 0]];
const kkey = (r, c) => r + ',' + c;

function buildFrames() {
  const f = []; const used = new Set(); const path = []; let done = false;
  const snap = o => f.push(Object.assign({ path: path.map(p => [...p]) }, o));
  function dfs(r, c, idx) {
    if (done) return true;
    if (r < 0 || c < 0 || r >= R || c >= C || used.has(kkey(r, c)) || G[r][c] !== WORD[idx]) {
      if (r >= 0 && c >= 0 && r < R && c < C && !used.has(kkey(r, c)) && G[r][c] !== WORD[idx]) snap({ r, c, idx, action: 'mismatch', log: `(${r},${c})='${G[r][c]}' ≠ '${WORD[idx]}' → skip` });
      return false;
    }
    used.add(kkey(r, c)); path.push([r, c]);
    snap({ r, c, idx, action: 'match', log: `'${G[r][c]}' matches letter ${idx} → extend` });
    if (idx === WORD.length - 1) { done = true; snap({ r, c, idx, action: 'found', log: `spelled "${WORD}"!`, done: true }); return true; }
    for (const [dr, dc] of DIRS) if (dfs(r + dr, c + dc, idx + 1)) return true;
    used.delete(kkey(r, c)); path.pop();
    snap({ r, c, idx, action: 'back', log: `no extension → backtrack from (${r},${c})` });
    return false;
  }
  snap({ r: 0, c: 0, idx: 0, action: 'start', log: `search grid for "${WORD}"` });
  dfs(0, 0, 0);
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">dfs</span>(r, c, idx):' },
  { n: 2, t: '    <span class="kw">if</span> off_grid <span class="kw">or</span> used <span class="kw">or</span> grid[r][c] != word[idx]:' },
  { n: 3, t: '        <span class="kw">return</span> <span class="kw">False</span>' },
  { n: 4, t: '    <span class="kw">if</span> idx == <span class="fn">len</span>(word) - 1: <span class="kw">return</span> <span class="kw">True</span>' },
  { n: 5, t: '    used.add((r,c))' },
  { n: 6, t: '    <span class="kw">for</span> dr,dc <span class="kw">in</span> dirs:' },
  { n: 7, t: '        <span class="kw">if</span> <span class="fn">dfs</span>(r+dr, c+dc, idx+1): <span class="kw">return</span> <span class="kw">True</span>' },
  { n: 8, t: '    used.remove((r,c))   <span class="st"># backtrack</span>' },
];
const lineFor = fr => fr.action === 'found' ? 4 : fr.action === 'back' ? 8 : fr.action === 'mismatch' ? 2 : fr.action === 'match' ? 5 : 1;
const CELL = 56, ox = 320 - (C * CELL) / 2, oy = 30;

export default function BtWordSearchVisualization() {
  return (
    <AlgoStage
      title="Word Search in a Grid"
      subtitle="From a starting letter, walk to adjacent cells that continue the word, marking each so you can't reuse it. If a branch can't be extended, un-mark and back up — classic grid backtracking."
      accent="#a78bfa" viewBox="0 0 640 250"
      frames={FRAMES} code={CODE} lineFor={lineFor}
      variables={(fr, prev) => [
        { name: 'cell', type: 'tuple', prev: prev ? `(${prev.r},${prev.c})` : '—', cur: `(${fr.r},${fr.c})` },
        { name: 'letter idx', type: 'int', prev: prev ? String(prev.idx) : '0', cur: String(fr.idx) },
        { name: 'matched', type: 'str', prev: '', cur: `"${WORD.slice(0, fr.path.length)}"` },
        { name: 'status', type: 'str', prev: '', cur: fr.action },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(spelled "[^"]*"!|backtrack from [^)]*\))/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Marking visited cells prevents a letter from being reused within one word; un-marking on backtrack frees them for other branches. Combined with a <strong>trie</strong> of many target words, this is the "Word Search II" optimisation. Worst case O(cells · 4ᴸ), pruned heavily in practice.</>}
      renderCanvas={fr => {
        const onPath = new Map(fr.path.map(([r, c], i) => [kkey(r, c), i]));
        return (
          <>
            {G.map((row, r) => row.map((ch, c) => {
              const isCur = r === fr.r && c === fr.c;
              const pIdx = onPath.get(kkey(r, c));
              const isMismatch = isCur && fr.action === 'mismatch';
              let fill = isMismatch ? 'color-mix(in srgb, #f85149 20%, transparent)' : isCur ? 'var(--a-current-soft)' : pIdx != null ? (fr.done ? 'var(--a-visited-soft)' : 'color-mix(in srgb, var(--algo-accent) 22%, transparent)') : 'var(--a-surface-2)';
              return (
                <g key={r + '-' + c}>
                  <rect x={ox + c * CELL} y={oy + r * CELL} width={CELL - 4} height={CELL - 4} rx="8" fill={fill} stroke={isMismatch ? '#f85149' : isCur ? 'var(--a-current)' : pIdx != null ? 'var(--algo-accent)' : 'var(--a-faint)'} strokeWidth={isCur || pIdx != null ? 2.5 : 1.5} className={isCur && !isMismatch ? 'algo-pulse' : ''} style={{ transition: 'fill .2s' }} />
                  <text x={ox + c * CELL + (CELL - 4) / 2} y={oy + r * CELL + 35} textAnchor="middle" style={{ font: '700 20px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{ch}</text>
                </g>
              );
            }))}
            <text x="320" y={oy + R * CELL + 18} textAnchor="middle" style={{ font: '600 12px ui-monospace, monospace', fill: 'var(--a-faint)' }}>target: {WORD.split('').map((ch, i) => <tspan key={i} fill={i < fr.path.length ? 'var(--a-visited)' : 'var(--a-faint)'}>{ch}</tspan>)}</text>
          </>
        );
      }}
    />
  );
}
