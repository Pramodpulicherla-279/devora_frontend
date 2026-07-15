/* Problem: Container With Most Water
 * 2D animated: two pointers at the ends. Area = min(height) × width. Always move the shorter
 * wall inward — that's the only move that can improve the area. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const H = [3, 9, 4, 2, 8, 5, 7, 6];
export default function ArrContainerWaterVisualization() {
  const [lo, setLo] = useState(0);
  const [hi, setHi] = useState(H.length - 1);
  const [best, setBest] = useState(0);
  const [auto, setAuto] = useState(true);
  const area = Math.min(H[lo], H[hi]) * (hi - lo);
  const step = () => {
    setBest(b => Math.max(b, area));
    if (lo >= hi - 1) { setLo(0); setHi(H.length - 1); setBest(0); return; }
    if (H[lo] < H[hi]) setLo(l => l + 1); else setHi(h => h - 1);
  };
  useAutoPlay(step, 1.0, auto, [lo, hi]);
  const CW = 56, gap = 8, baseY = 180, unit = 15;
  const startX = 320 - (H.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Container With Most Water"
      subtitle="Two vertical lines form a container; water is limited by the shorter wall. Start wide and move the shorter side inward, tracking the largest area."
      accent="#58a6ff"
      viewBox="0 0 640 240"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={step}>step</button>
          <button className="dsa2d-btn" onClick={() => { setLo(0); setHi(H.length - 1); setBest(0); }}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">area = min({H[lo]},{H[hi]})×{hi - lo} = {area} · best {Math.max(best, area)}</span>
        </>
      }
      legend={<>Width shrinks every step, so the only way to beat the current area is a <em>taller</em> wall — and only the shorter side has room to improve. Moving it inward explores all useful options in <strong>O(n)</strong> instead of checking every pair O(n²).</>}
    >
      {/* water fill between lo and hi */}
      <rect x={startX + lo * (CW + gap) + CW / 2} y={baseY - Math.min(H[lo], H[hi]) * unit} width={(hi - lo) * (CW + gap)} height={Math.min(H[lo], H[hi]) * unit} fill="rgba(88,166,255,.15)" />
      {H.map((h, k) => {
        const active = k === lo || k === hi;
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y={baseY - h * unit} width={CW} height={h * unit} rx="4"
              fill={active ? 'rgba(88,166,255,.4)' : '#161b22'} stroke={active ? '#58a6ff' : '#30363d'} strokeWidth="2" className={active ? 'dsa2d-pulse' : ''} />
            <text x={startX + k * (CW + gap) + CW / 2} y={baseY + 16} fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="Consolas">{h}</text>
          </g>
        );
      })}
      <text x={startX + lo * (CW + gap) + CW / 2} y={baseY - H[lo] * unit - 6} fill="#58a6ff" fontSize="11" textAnchor="middle" fontFamily="Consolas">L</text>
      <text x={startX + hi * (CW + gap) + CW / 2} y={baseY - H[hi] * unit - 6} fill="#58a6ff" fontSize="11" textAnchor="middle" fontFamily="Consolas">R</text>
    </Stage2D>
  );
}
