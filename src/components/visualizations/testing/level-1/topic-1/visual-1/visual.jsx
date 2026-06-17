import { useState } from 'react';
import './visual.css';

const LAYERS = [
  { id: 'unit', label: 'Unit', count: 'hundreds', speed: 'milliseconds', cost: 'cheap', catches: 'Logic bugs in a single function', w: 100, color: '#56d364' },
  { id: 'integration', label: 'Integration', count: 'dozens', speed: 'seconds', cost: 'moderate', catches: 'Modules wired together wrong (DB, API)', w: 65, color: '#58a6ff' },
  { id: 'e2e', label: 'E2E', count: 'a few', speed: 'minutes', cost: 'expensive', catches: 'Whole user flows breaking', w: 35, color: '#f0883e' },
];

export default function TstWhyTestVisualization() {
  const [sel, setSel] = useState('unit');
  const l = LAYERS.find(x => x.id === sel);

  return (
    <div className="tstwhy-wrap">
      <h3 className="tstwhy-title">Why Test? The Testing Pyramid</h3>
      <p className="tstwhy-sub">Many fast unit tests, fewer slow end-to-end tests</p>

      <div className="tstwhy-pyramid">
        {LAYERS.map(layer => (
          <button key={layer.id} className={`tstwhy-layer ${sel === layer.id ? 'tstwhy-layer-active' : ''}`}
            style={{ width: `${layer.w}%`, borderColor: layer.color, background: sel === layer.id ? layer.color + '25' : '#161b22' }}
            onClick={() => setSel(layer.id)}>
            <span style={{ color: layer.color }}>{layer.label}</span>
          </button>
        ))}
      </div>

      <div className="tstwhy-detail" style={{ borderTopColor: l.color }}>
        <div className="tstwhy-row"><span className="tstwhy-k">Count</span>{l.count}</div>
        <div className="tstwhy-row"><span className="tstwhy-k">Speed</span>{l.speed}</div>
        <div className="tstwhy-row"><span className="tstwhy-k">Cost</span>{l.cost}</div>
        <div className="tstwhy-row"><span className="tstwhy-k">Catches</span>{l.catches}</div>
      </div>

      <div className="tstwhy-confidence">
        <span className="tstwhy-conf-label">🛡️ Combined confidence</span>
        <div className="tstwhy-conf-bar"><div className="tstwhy-conf-fill" /></div>
      </div>
      <p className="tstwhy-note">Lean on cheap unit tests for coverage; reserve a few E2E tests for critical journeys.</p>
    </div>
  );
}
