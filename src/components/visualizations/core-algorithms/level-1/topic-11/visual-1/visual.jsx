/* Lesson: Searching in Unsorted Data — Why Sorting First Sometimes Wins
 * 2D animated: a break-even chart. For q queries, compare q linear scans (q·n) vs
 * sort-once-then-binary (n·log n + q·log n). Slide q and watch which strategy wins. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const N = 1000, log2n = Math.log2(N);
const linear = q => q * N;
const sortFirst = q => N * log2n + q * log2n;
const QMAX = 40;
export default function SrchSortFirstVisualization() {
  const [q, setQ] = useState(5);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setQ(v => (v >= QMAX ? 1 : v + 1)), 0.5, auto);
  const W = 420, H = 180, ox = 90, oy = 30;
  const maxY = linear(QMAX);
  const px = qq => ox + (qq / QMAX) * W;
  const py = v => oy + H - (v / maxY) * H;
  const linPts = Array.from({ length: q + 1 }, (_, k) => `${px(k)},${py(linear(k))}`).join(' ');
  const sfPts = Array.from({ length: q + 1 }, (_, k) => `${px(k)},${py(sortFirst(k))}`).join(' ');
  const breakeven = Math.ceil((N * log2n) / (N - log2n));
  const winner = q < breakeven ? 'linear scans' : 'sort + binary';

  return (
    <Stage2D title="Sort First, or Just Scan?" subtitle={`For n = ${N} items and q lookups: q linear scans cost q·n, while sorting once then binary-searching costs n·log n + q·log n. The winner depends on how many times you'll search.`}
      accent="#58a6ff" viewBox="0 0 640 260"
      controls={<><div className="dsa2d-group"><span className="dsa2d-label">queries q = {q}</span><input className="dsa2d-slider" type="range" min="1" max={QMAX} value={q} onChange={e => setQ(+e.target.value)} /></div><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">winner: {winner}</span></>}
      legend={<>One or a few lookups → just <strong>scan</strong> (sorting's upfront O(n log n) isn't worth it). Many lookups → <strong>sort once</strong>, then each search is O(log n). Break-even here is about <strong>{breakeven} queries</strong>. Same logic favours building a hash set when you'll do many membership checks.</>}>
      <line x1={ox} y1={oy} x2={ox} y2={oy + H} stroke="#30363d" /><line x1={ox} y1={oy + H} x2={ox + W} y2={oy + H} stroke="#30363d" />
      <text x={ox - 6} y={oy + 8} fill="#8b949e" fontSize="11" textAnchor="end" fontFamily="system-ui">ops</text>
      <text x={ox + W} y={oy + H + 16} fill="#8b949e" fontSize="11" textAnchor="end" fontFamily="system-ui">queries →</text>
      {/* break-even marker */}
      <line x1={px(breakeven)} y1={oy} x2={px(breakeven)} y2={oy + H} stroke="#ffd43b" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x={px(breakeven)} y={oy - 4} fill="#ffd43b" fontSize="11" textAnchor="middle" fontFamily="Consolas">break-even ≈ {breakeven}</text>
      <polyline points={linPts} fill="none" stroke="#f0883e" strokeWidth="2.5" />
      <polyline points={sfPts} fill="none" stroke="#58a6ff" strokeWidth="2.5" />
      <circle cx={px(q)} cy={py(linear(q))} r="4" fill="#f0883e" className="dsa2d-pulse" />
      <circle cx={px(q)} cy={py(sortFirst(q))} r="4" fill="#58a6ff" className="dsa2d-pulse" />
      <text x={520} y={70} fill="#f0883e" fontSize="12" fontFamily="Consolas">q·n (scan)</text>
      <text x={520} y={92} fill="#58a6ff" fontSize="12" fontFamily="Consolas">sort+binary</text>
    </Stage2D>
  );
}
