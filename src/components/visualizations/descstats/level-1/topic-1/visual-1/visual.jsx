/* Lesson: What is Statistics and Central Tendency
 * Visual type: INTERACTIVE
 * Reason: Mean/median/mode are best understood by manipulating data and
 * watching the measures react — especially how the mean (not the median)
 * gets dragged by an outlier. A static image can't show that pull. */
import React, { useState } from 'react';
import './visual.css';

const PRESETS = {
  symmetric: [20, 35, 45, 50, 55, 65, 80],
  skewed: [20, 25, 30, 35, 40, 45, 95],
  bimodal: [15, 18, 22, 60, 64, 68, 70],
};

const mean = (a) => a.reduce((s, x) => s + x, 0) / a.length;
const median = (a) => { const s = [...a].sort((x, y) => x - y); const m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const mode = (a) => {
  const buckets = {};
  a.forEach((v) => { const b = Math.round(v / 10) * 10; buckets[b] = (buckets[b] || 0) + 1; });
  let best = null, bestN = 0;
  Object.entries(buckets).forEach(([k, n]) => { if (n > bestN) { bestN = n; best = Number(k); } });
  return bestN > 1 ? best : null;
};

const DescStatsCentralTendencyVisualization = () => {
  const [preset, setPreset] = useState('symmetric');
  const [outlier, setOutlier] = useState(null);
  const data = outlier !== null ? [...PRESETS[preset], outlier] : PRESETS[preset];
  const mn = mean(data), md = median(data), mo = mode(data);
  const W = 320, pad = 14;
  const x = (v) => pad + (v / 100) * (W - 2 * pad);

  return (
    <div className="dsct-wrap">
      <header className="dsct-head">
        <span className="dsct-badge">Statistics</span>
        <h2>Central Tendency</h2>
        <p>Mean, median &amp; mode — and how an outlier pulls them apart</p>
      </header>

      <div className="dsct-controls">
        {Object.keys(PRESETS).map((p) => (
          <button key={p} className={`dsct-preset ${preset === p ? 'dsct-preset--on' : ''}`}
            onClick={() => { setPreset(p); setOutlier(null); }}>{p}</button>
        ))}
      </div>

      <div className="dsct-plot-wrap">
        <svg viewBox={`0 0 ${W} 96`} className="dsct-svg" preserveAspectRatio="xMidYMid meet">
          <line x1={pad} y1="64" x2={W - pad} y2="64" className="dsct-axis" />
          {[0, 25, 50, 75, 100].map((t) => (
            <g key={t}>
              <line x1={x(t)} y1="60" x2={x(t)} y2="68" className="dsct-tick" />
              <text x={x(t)} y="82" className="dsct-tick-label">{t}</text>
            </g>
          ))}
          {data.map((v, i) => (
            <circle key={i} cx={x(v)} cy="64" r="6" className={`dsct-dot ${outlier !== null && i === data.length - 1 ? 'dsct-dot--outlier' : ''}`} />
          ))}
          {/* mean & median markers */}
          <g>
            <line x1={x(mn)} y1="24" x2={x(mn)} y2="64" className="dsct-mean-line" />
            <text x={x(mn)} y="18" className="dsct-mean-label">mean</text>
          </g>
          <g>
            <line x1={x(md)} y1="44" x2={x(md)} y2="74" className="dsct-median-line" />
            <text x={x(md)} y="94" className="dsct-median-label">median</text>
          </g>
        </svg>
      </div>

      <div className="dsct-outlier">
        <label>
          Add an outlier {outlier !== null ? `at ${outlier}` : ''}
          <input type="range" min="0" max="100" value={outlier ?? 95}
            onChange={(e) => setOutlier(Number(e.target.value))} className="dsct-slider" />
        </label>
        {outlier !== null && <button className="dsct-clear" onClick={() => setOutlier(null)}>remove outlier</button>}
      </div>

      <div className="dsct-stats">
        <div className="dsct-stat dsct-stat--mean"><span>Mean</span><strong>{mn.toFixed(1)}</strong><em>sum ÷ count — pulled by outliers</em></div>
        <div className="dsct-stat dsct-stat--median"><span>Median</span><strong>{md.toFixed(1)}</strong><em>middle value — robust to outliers</em></div>
        <div className="dsct-stat dsct-stat--mode"><span>Mode</span><strong>{mo !== null ? `~${mo}` : 'none'}</strong><em>most frequent range</em></div>
      </div>
      {outlier !== null && Math.abs(mn - md) > 6 && (
        <div className="dsct-insight">⚡ Notice: the <strong>mean</strong> jumped toward the outlier while the <strong>median</strong> barely moved.</div>
      )}
    </div>
  );
};

export default DescStatsCentralTendencyVisualization;
