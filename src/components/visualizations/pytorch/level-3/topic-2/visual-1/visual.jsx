import { useState } from 'react';
import './visual.css';

const INITIAL_LAYERS = [
  { name: 'conv1',  params: 9408,   frozen: true },
  { name: 'layer1', params: 215808, frozen: true },
  { name: 'layer2', params: 1219584, frozen: true },
  { name: 'layer3', params: 7077888, frozen: false },
  { name: 'layer4', params: 14990336, frozen: false },
  { name: 'fc',     params: 2049000, frozen: false },
];

export default function PtFinetuneVisualization() {
  const [layers, setLayers] = useState(INITIAL_LAYERS);

  const toggle = name => setLayers(ls => ls.map(l => l.name === name ? { ...l, frozen: !l.frozen } : l));

  const trainableParams = layers.filter(l => !l.frozen).reduce((s, l) => s + l.params, 0);
  const totalParams = layers.reduce((s, l) => s + l.params, 0);

  const fmt = n => n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : `${(n / 1e3).toFixed(0)}K`;

  return (
    <div className="ptft-root">
      <h3 className="ptft-title">Freezing and Fine-Tuning Layers</h3>

      <div className="ptft-layer-list">
        {layers.map(l => (
          <div key={l.name} className={`ptft-layer ${l.frozen ? 'ptft-layer--frozen' : 'ptft-layer--active'}`}>
            <button className="ptft-lock" onClick={() => toggle(l.name)} title={l.frozen ? 'Unfreeze' : 'Freeze'}>
              {l.frozen ? '🔒' : '🔓'}
            </button>
            <span className="ptft-layer-name">{l.name}</span>
            <span className="ptft-layer-params">{fmt(l.params)}</span>
            <div className="ptft-grad-status">
              {l.frozen
                ? <span className="ptft-grad ptft-grad--blocked">✕ grad blocked</span>
                : <span className="ptft-grad ptft-grad--flow">↓ grad flows</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="ptft-stats">
        <div className="ptft-stat-box">
          <span className="ptft-stat-label">Trainable params</span>
          <span className="ptft-stat-val ptft-orange">{fmt(trainableParams)}</span>
        </div>
        <div className="ptft-stat-box">
          <span className="ptft-stat-label">Total params</span>
          <span className="ptft-stat-val">{fmt(totalParams)}</span>
        </div>
        <div className="ptft-stat-box">
          <span className="ptft-stat-label">% trainable</span>
          <span className="ptft-stat-val ptft-orange">{((trainableParams / totalParams) * 100).toFixed(1)}%</span>
        </div>
      </div>

      <div className="ptft-tip">Click the lock icons to toggle layer freezing and watch trainable parameter count update live.</div>
    </div>
  );
}
