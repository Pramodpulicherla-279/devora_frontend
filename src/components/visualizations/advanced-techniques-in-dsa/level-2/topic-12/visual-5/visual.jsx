/* Problem: Unique Paths
 * 2D animated: a robot moves only right/down on a grid. Each cell's path count = paths from
 * above + paths from the left. Fill the 3×3 grid to 6. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const FULL = [[1, 1, 1], [1, 2, 3], [1, 3, 6]];
const ORDER = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
export default function DpUniquePathsVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % (ORDER.length + 1)), 1.0, auto);
  const filled = ORDER.slice(0, i);
  const cur = i < ORDER.length ? ORDER[i] : null;
  const done = i >= ORDER.length;
  const CELL = 78, ox = 320 - (3 * CELL) / 2, oy = 44;
  const has = (r, c) => filled.some(([fr, fc]) => fr === r && fc === c) || done;
  return (
    <Stage2D title="Unique Paths (3×3 → 6 ways)" subtitle="Moving only right or down, every cell can be entered from exactly two neighbours — so its path count is simply their sum. Edges have one path; the corner accumulates them all."
      accent="#6b8cff" viewBox="0 0 640 320"
      controls={<><button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v + 1) % (ORDER.length + 1))}>fill next</button><button className="dsa2d-btn" onClick={() => setI(0)}>↺</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{done ? '6 unique paths to the corner' : cur ? `dp[${cur[0]}][${cur[1]}] = ${cur[0] === 0 || cur[1] === 0 ? '1 (edge)' : FULL[cur[0] - 1][cur[1]] + ' + ' + FULL[cur[0]][cur[1] - 1] + ' = ' + FULL[cur[0]][cur[1]]}` : ''}</span></>}
      legend={<>State: paths to reach (r,c). Recurrence: <code>dp[r][c] = dp[r-1][c] + dp[r][c-1]</code>. Counts <em>add</em> (this is "count the ways", not "find the best"). <strong>O(m·n)</strong>; one rolling row gives O(n) space — and the closed form is C(m+n−2, m−1), Pascal's triangle in disguise.</>}>
      {FULL.map((row, r) => row.map((v, c) => {
        const show = has(r, c);
        const isCur = cur && cur[0] === r && cur[1] === c;
        const isSrc = cur && ((r === cur[0] - 1 && c === cur[1]) || (r === cur[0] && c === cur[1] - 1));
        const isGoal = done && r === 2 && c === 2;
        return (
          <g key={r + '-' + c}>
            <rect x={ox + c * CELL} y={oy + r * CELL} width={CELL - 6} height={CELL - 6} rx="10" fill={isGoal ? 'rgba(86,211,100,.3)' : isCur ? 'rgba(255,212,59,.16)' : isSrc ? 'rgba(107,140,255,.18)' : show ? '#161b22' : '#0d1117'} stroke={isGoal ? '#56d364' : isCur ? '#ffd43b' : isSrc ? '#6b8cff' : show ? '#6e7681' : '#21262d'} strokeWidth={isCur || isSrc || isGoal ? 3 : 1.5} className={isCur || isGoal ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .25s' }} />
            <text x={ox + c * CELL + (CELL - 6) / 2} y={oy + r * CELL + 45} fill={show || isCur ? '#e6edf3' : '#30363d'} fontSize="22" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{show || isCur ? v : '·'}</text>
            {r === 0 && c === 0 && <text x={ox + 12} y={oy + 20} fontSize="14">🤖</text>}
            {r === 2 && c === 2 && <text x={ox + 2 * CELL + 46} y={oy + 2 * CELL + 22} fontSize="14">🚩</text>}
          </g>
        );
      }))}
      <text x="320" y="308" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">blue = the two source cells (from above + from the left) feeding the yellow cell</text>
    </Stage2D>
  );
}
