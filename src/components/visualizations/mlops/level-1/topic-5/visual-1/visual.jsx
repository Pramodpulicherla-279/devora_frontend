import { useState } from 'react';
import './visual.css';

const metrics = [
  { name: 'Accuracy', v1: '91.2%', v2: '92.8%', better: true },
  { name: 'Latency p99', v1: '120ms', v2: '115ms', better: true },
  { name: 'Error Rate', v1: '0.8%', v2: '0.6%', better: true },
];

const checklist = [
  { label: 'v2 accuracy ≥ v1 on hold-out set', done: true },
  { label: 'p99 latency < 150ms', done: true },
  { label: 'Error rate < 1%', done: true },
  { label: 'Run for ≥ 24 hours on canary', done: false },
  { label: 'No abnormal alerts triggered', done: false },
];

export default function MlopsVersioningVisualization() {
  const [traffic, setTraffic] = useState(10);
  const [promoted, setPromoted] = useState(false);

  return (
    <div className="mlopsver-container">
      <h3 className="mlopsver-title">A/B Testing & Canary Deployments</h3>

      <div className="mlopsver-split">
        <div className="mlopsver-model mlopsver-model--v1">
          <div className="mlopsver-model-label">Model v1 (stable)</div>
          <div className="mlopsver-model-pct" style={{fontSize: `clamp(1.2rem, 3vw, 2rem)`}}>{promoted ? 0 : 100 - traffic}%</div>
          <div className="mlopsver-bar-outer">
            <div className="mlopsver-bar-fill mlopsver-bar-fill--v1" style={{width: `${promoted ? 0 : 100 - traffic}%`}}/>
          </div>
        </div>
        <div className="mlopsver-divider">
          <svg width="2" height="80"><line x1="1" y1="0" x2="1" y2="80" stroke="#30363d" strokeWidth="2" strokeDasharray="4 4"/></svg>
          <span className="mlopsver-divider-label">traffic split</span>
        </div>
        <div className="mlopsver-model mlopsver-model--v2">
          <div className="mlopsver-model-label">Model v2 (canary)</div>
          <div className="mlopsver-model-pct" style={{fontSize: `clamp(1.2rem, 3vw, 2rem)`}}>{promoted ? 100 : traffic}%</div>
          <div className="mlopsver-bar-outer">
            <div className="mlopsver-bar-fill mlopsver-bar-fill--v2" style={{width: `${promoted ? 100 : traffic}%`}}/>
          </div>
        </div>
      </div>

      {!promoted && (
        <div className="mlopsver-slider-row">
          <span className="mlopsver-slider-label">Canary %</span>
          <input type="range" min="1" max="50" value={traffic} onChange={e => setTraffic(+e.target.value)} className="mlopsver-range"/>
          <span className="mlopsver-slider-val">{traffic}%</span>
        </div>
      )}

      <div className="mlopsver-metrics">
        <div className="mlopsver-metrics-title">Metrics Comparison</div>
        <div className="mlopsver-metrics-grid">
          <div className="mlopsver-col-head"/>
          <div className="mlopsver-col-head">v1</div>
          <div className="mlopsver-col-head" style={{color:'#56d364'}}>v2 (canary)</div>
          {metrics.map((m, i) => (
            <>
              <div key={`l${i}`} className="mlopsver-cell mlopsver-cell--label">{m.name}</div>
              <div key={`v1${i}`} className="mlopsver-cell">{m.v1}</div>
              <div key={`v2${i}`} className={`mlopsver-cell ${m.better ? 'mlopsver-cell--better' : 'mlopsver-cell--worse'}`}>{m.v2} {m.better ? '▲' : '▼'}</div>
            </>
          ))}
        </div>
      </div>

      <div className="mlopsver-checklist">
        <div className="mlopsver-checklist-title">Promotion Criteria</div>
        {checklist.map((c, i) => (
          <div key={i} className={`mlopsver-check ${c.done ? 'mlopsver-check--done' : ''}`}>
            <span className="mlopsver-check-icon">{c.done ? '✓' : '○'}</span>
            <span>{c.label}</span>
          </div>
        ))}
      </div>

      <button className="mlopsver-btn" onClick={() => setPromoted(!promoted)}>
        {promoted ? 'Roll Back to v1' : 'Promote v2 to 100%'}
      </button>
    </div>
  );
}
