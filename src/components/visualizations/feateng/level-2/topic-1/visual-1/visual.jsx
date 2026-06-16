import { useState } from "react";
import "./visual.css";

const rawValues = [2,5,7,8,12,15,18,22,25,28,31,35,38,42,45,48,52,55,58,62,65,68,72,75,78,82,85,88,92,95];

function getBins(values, n) {
  const min = Math.min(...values), max = Math.max(...values);
  const step = (max - min) / n;
  const bins = Array.from({ length: n }, (_, i) => ({ lo: min + i * step, hi: min + (i + 1) * step, count: 0, label: "" }));
  values.forEach(v => {
    const idx = Math.min(Math.floor((v - min) / step), n - 1);
    bins[idx].count++;
  });
  bins.forEach(b => { b.label = `${Math.round(b.lo)}–${Math.round(b.hi)}`; });
  return bins;
}

const W = 320, H = 140, PAD = 24;

export default function FeBinningVisualization() {
  const [bins, setBins] = useState(5);
  const binData = getBins(rawValues, bins);
  const maxCount = Math.max(...binData.map(b => b.count));
  const bw = (W - PAD * 2) / bins;

  return (
    <div className="febin-wrap">
      <h3 className="febin-title">Binning & Discretization</h3>

      <div className="febin-control">
        <label className="febin-label">Number of bins: <strong style={{ color: "#f97316" }}>{bins}</strong></label>
        <input type="range" min={2} max={10} value={bins} onChange={e => setBins(+e.target.value)} className="febin-slider" />
      </div>

      <svg viewBox={`0 0 ${W} ${H + 30}`} className="febin-svg">
        {binData.map((b, i) => {
          const barH = maxCount > 0 ? ((b.count / maxCount) * H) : 0;
          const x = PAD + i * bw, y = H - barH;
          return (
            <g key={i}>
              <rect x={x + 1} y={y} width={bw - 2} height={barH} fill="#f97316" opacity="0.75" rx="3" />
              <line x1={x} y1={0} x2={x} y2={H} stroke="#21262d" strokeWidth="1" />
              <text x={x + bw / 2} y={H + 16} textAnchor="middle" fontSize="8" fill="#6b7785">{b.label}</text>
            </g>
          );
        })}
        <line x1={PAD} y1={H} x2={W - PAD} y2={H} stroke="#30363d" strokeWidth="1" />
      </svg>

      <div className="febin-counts">
        {binData.map((b, i) => (
          <div key={i} className="febin-count-chip">
            <span className="febin-chip-range">{b.label}</span>
            <span className="febin-chip-n">{b.count}</span>
          </div>
        ))}
      </div>

      <p className="febin-note">
        {bins} bins created. Continuous age values become {bins} ordinal categories for tree-based models.
      </p>
    </div>
  );
}
