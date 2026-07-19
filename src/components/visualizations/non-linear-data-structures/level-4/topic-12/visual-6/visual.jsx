/* Problem: Rotting Oranges (Multi-Source BFS)
 * 2D animated: every minute, rotten oranges (2) rot their fresh (1) neighbours simultaneously.
 * Start BFS from ALL rotten cells at once; the number of levels is the minutes elapsed. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

// 0 empty, 1 fresh, 2 rotten. minute at which each cell rots (Infinity = never/empty)
const G = [[2, 1, 1], [1, 1, 0], [0, 1, 1]];
const ROT_MIN = { '0,0': 0, '0,1': 1, '1,0': 1, '0,2': 2, '1,1': 2, '2,1': 3, '2,2': 4 };
const TOTAL = 4;

export default function GraphRottingOrangesVisualization() {
  const [m, setM] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setM(v => (v >= TOTAL ? 0 : v + 1)), 1.0, auto);
  const CW = 74, ox = 210, oy = 55;

  return (
    <Stage2D
      title="Rotting Oranges" subtitle="Rot spreads from every rotten orange to its fresh neighbours each minute — all at the same time. That simultaneity is exactly multi-source BFS: seed the queue with all rotten cells at once."
      accent="#f0883e" viewBox="0 0 640 320"
      controls={<><div className="dsa2d-group"><span className="dsa2d-label">minute: {m}</span><input className="dsa2d-slider" type="range" min="0" max={TOTAL} value={m} onChange={e => setM(+e.target.value)} /></div><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{m >= TOTAL ? 'all rotten → 4 minutes' : `minute ${m}`}</span></>}
      legend={<>Push every rotten orange into the queue with distance 0, then BFS: each level is one minute, rotting all current-frontier neighbours together. The answer is the last level reached — or −1 if a fresh orange is unreachable. Time <code>O(rows × cols)</code>.</>}
    >
      {G.map((row, r) => row.map((v, c) => { const key = r + ',' + c; const empty = v === 0; const rotMin = ROT_MIN[key]; const rotten = !empty && rotMin <= m; const justRotted = rotMin === m; return (
        <g key={key}><rect x={ox + c * CW} y={oy + r * CW} width={CW - 8} height={CW - 8} rx="12" fill={empty ? '#0b1622' : rotten ? '#6e4327' : '#1f5a2e'} stroke={empty ? '#1b2836' : rotten ? '#f0883e' : '#3fb950'} strokeWidth="2.5" className={justRotted && !empty ? 'dsa2d-pulse' : ''} /><text x={ox + c * CW + (CW - 8) / 2} y={oy + r * CW + 44} fontSize="26" textAnchor="middle">{empty ? '' : rotten ? '🟤' : '🟠'}</text></g>); }))}
      <text x="320" y="305" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">🟠 fresh · 🟤 rotten · drag the slider to advance minutes</text>
    </Stage2D>
  );
}
