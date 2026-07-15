/* Problem: Number of Islands
 * 2D animated: sweep the grid; each unvisited land cell (1) starts a flood-fill that sinks its
 * whole island, incrementing the count. Grid here has 2 islands. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const G = [[1, 1, 0, 0], [1, 0, 0, 1], [0, 0, 1, 1], [0, 0, 0, 1]];
// component id per land cell (precomputed): island 0 = top-left, island 1 = right
const COMP = { '0,0': 0, '0,1': 0, '1,0': 0, '1,3': 1, '2,2': 1, '2,3': 1, '3,3': 1 };
// reveal order (BFS per island)
const ORDER = ['0,0', '0,1', '1,0', '1,3', '2,3', '2,2', '3,3'];
const COLORS = ['#58a6ff', '#56d364'];

export default function GraphNumIslandsVisualization() {
  const [n, setN] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setN(v => (v >= ORDER.length ? 0 : v + 1)), 0.7, auto);
  const revealed = new Set(ORDER.slice(0, n));
  const count = new Set(ORDER.slice(0, n).map(k => COMP[k])).size;
  const CW = 60, ox = 210, oy = 55;

  return (
    <Stage2D
      title="Number of Islands" subtitle="An island is a group of connected land cells (1s). Walk the grid; the first time you touch a new island, count it and flood-fill the rest so you don't count it again."
      accent="#56d364" viewBox="0 0 640 320"
      controls={<><button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setN(v => (v >= ORDER.length ? 0 : v + 1))}>step</button><button className="dsa2d-btn" onClick={() => setN(0)}>↺</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">islands: {count}</span></>}
      legend={<>For each cell that is land and not yet visited, run DFS/BFS to mark the whole connected island, then add 1 to the count. It's <strong>connected components on a grid</strong> — each cell's neighbours are up/down/left/right. Time <code>O(rows × cols)</code>.</>}
    >
      {G.map((row, r) => row.map((v, c) => { const key = r + ',' + c; const land = v === 1; const on = revealed.has(key); const comp = COMP[key]; return (
        <g key={key}><rect x={ox + c * CW} y={oy + r * CW} width={CW - 6} height={CW - 6} rx="8" fill={!land ? '#0b1622' : on ? COLORS[comp] : '#3a4250'} stroke={land ? (on ? COLORS[comp] : '#8b949e') : '#1b2836'} strokeWidth="2" className={on && ORDER[n - 1] === key ? 'dsa2d-pulse' : ''} /><text x={ox + c * CW + (CW - 6) / 2} y={oy + r * CW + 33} fill={land ? '#0d1117' : '#3a566e'} fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{land ? (on ? '▓' : '1') : '~'}</text></g>); }))}
      <text x="320" y="305" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">each colour = one island · ~ = water · flood-filled land shown filled</text>
    </Stage2D>
  );
}
