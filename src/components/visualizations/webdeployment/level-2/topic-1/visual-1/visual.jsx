import { useState } from 'react';
import './visual.css';

const REGIONS = [
  { id: 'us', label: 'US East', x: 24, y: 42, latency: '12ms' },
  { id: 'eu', label: 'Europe', x: 50, y: 36, latency: '8ms' },
  { id: 'asia', label: 'Asia', x: 76, y: 48, latency: '15ms' },
];

export default function DepVercelVisualization() {
  const [region, setRegion] = useState('eu');
  const r = REGIONS.find(x => x.id === region);

  return (
    <div className="depvcl-wrap">
      <h3 className="depvcl-title">Deploying to Vercel</h3>
      <p className="depvcl-sub">Git push → build → served from a global edge network</p>

      <div className="depvcl-pipeline">
        {['Git push', 'Vercel CI', 'Build', 'Edge deploy'].map((s, i) => (
          <div key={i} className="depvcl-pl-item">
            <span className="depvcl-pl-dot">{i + 1}</span>
            <span className="depvcl-pl-label">{s}</span>
            {i < 3 && <span className="depvcl-pl-arrow">→</span>}
          </div>
        ))}
      </div>

      <div className="depvcl-globe">
        <svg viewBox="0 0 100 80" className="depvcl-svg">
          <ellipse cx="50" cy="40" rx="46" ry="34" fill="#161b22" stroke="#30363d" strokeWidth="0.5" />
          <ellipse cx="50" cy="40" rx="46" ry="20" fill="none" stroke="#21262d" strokeWidth="0.3" />
          <ellipse cx="50" cy="40" rx="28" ry="34" fill="none" stroke="#21262d" strokeWidth="0.3" />
          {REGIONS.map(reg => (
            <g key={reg.id} onClick={() => setRegion(reg.id)} style={{ cursor: 'pointer' }}>
              <circle cx={reg.x} cy={reg.y} r={region === reg.id ? 4 : 2.5}
                fill={region === reg.id ? '#818cf8' : '#8b949e'}>
                {region === reg.id && <animate attributeName="r" values="4;5.5;4" dur="1.5s" repeatCount="indefinite" />}
              </circle>
              <text x={reg.x} y={reg.y - 6} fontSize="3.5" fill="#c9d1d9" textAnchor="middle">{reg.label}</text>
            </g>
          ))}
        </svg>
      </div>

      <div className="depvcl-info">
        <div className="depvcl-info-card">
          <div className="depvcl-info-label">Nearest edge</div>
          <div className="depvcl-info-val">{r.label}</div>
        </div>
        <div className="depvcl-info-card">
          <div className="depvcl-info-label">Latency</div>
          <div className="depvcl-info-val depvcl-latency">{r.latency}</div>
        </div>
      </div>

      <div className="depvcl-urls">
        <div className="depvcl-url depvcl-url-prod"><span>🌐 Production</span> myapp.vercel.app</div>
        <div className="depvcl-url depvcl-url-preview"><span>🔬 Preview</span> myapp-git-feature-x.vercel.app</div>
      </div>

      <pre className="depvcl-code">{`// vercel.json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}`}</pre>
    </div>
  );
}
