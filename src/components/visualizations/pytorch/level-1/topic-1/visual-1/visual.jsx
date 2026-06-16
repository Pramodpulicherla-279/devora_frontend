import { useState } from 'react';
import './visual.css';

const ITEMS = [
  { id: 0, label: 'img_001.jpg', color: '#f97316' },
  { id: 1, label: 'img_002.jpg', color: '#58a6ff' },
  { id: 2, label: 'img_003.jpg', color: '#a78bfa' },
  { id: 3, label: 'img_004.jpg', color: '#56d364' },
  { id: 4, label: 'img_005.jpg', color: '#f97316' },
  { id: 5, label: 'img_006.jpg', color: '#58a6ff' },
  { id: 6, label: 'img_007.jpg', color: '#a78bfa' },
  { id: 7, label: 'img_008.jpg', color: '#56d364' },
];

export default function PtDataLoaderVisualization() {
  const [batchSize, setBatchSize] = useState(4);
  const [currentBatch, setCurrentBatch] = useState(0);

  const totalBatches = Math.ceil(ITEMS.length / batchSize);
  const batchItems = ITEMS.slice(currentBatch * batchSize, currentBatch * batchSize + batchSize);

  const next = () => setCurrentBatch(b => (b + 1) % totalBatches);
  const prev = () => setCurrentBatch(b => (b - 1 + totalBatches) % totalBatches);

  return (
    <div className="ptdl-root">
      <h3 className="ptdl-title">Dataset &amp; DataLoader Pipeline</h3>

      <div className="ptdl-pipeline">
        <div className="ptdl-stage">
          <div className="ptdl-stage-label">Dataset</div>
          <div className="ptdl-stage-box">
            <div className="ptdl-files">
              {ITEMS.map(item => (
                <div key={item.id} className="ptdl-file" style={{ borderColor: item.color }}>
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <rect x="2" y="1" width="10" height="14" rx="1" fill={item.color} opacity="0.2" stroke={item.color} strokeWidth="1"/>
                    <rect x="4" y="5" width="6" height="1.5" rx="0.5" fill={item.color}/>
                    <rect x="4" y="8" width="4" height="1.5" rx="0.5" fill={item.color}/>
                  </svg>
                  <span className="ptdl-file-name">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="ptdl-method">__getitem__(idx)</div>
          </div>
        </div>

        <div className="ptdl-arrow">
          <svg width="40" height="20" viewBox="0 0 40 20">
            <path d="M0 10 H32 L24 4 M32 10 L24 16" stroke="#f97316" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="ptdl-stage">
          <div className="ptdl-stage-label">DataLoader</div>
          <div className="ptdl-stage-box ptdl-loader-box">
            <div className="ptdl-batch-info">
              <span className="ptdl-badge">batch_size={batchSize}</span>
              <span className="ptdl-badge ptdl-badge-blue">shuffle=True</span>
            </div>
            <div className="ptdl-batch-items">
              {batchItems.map(item => (
                <div key={item.id} className="ptdl-batch-item" style={{ background: item.color + '22', border: `1px solid ${item.color}` }}>
                  <span style={{ color: item.color }}>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="ptdl-batch-nav">
              <button className="ptdl-btn" onClick={prev}>&#8592;</button>
              <span className="ptdl-batch-counter">Batch {currentBatch + 1} / {totalBatches}</span>
              <button className="ptdl-btn" onClick={next}>&#8594;</button>
            </div>
          </div>
        </div>

        <div className="ptdl-arrow">
          <svg width="40" height="20" viewBox="0 0 40 20">
            <path d="M0 10 H32 L24 4 M32 10 L24 16" stroke="#f97316" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="ptdl-stage">
          <div className="ptdl-stage-label">Model</div>
          <div className="ptdl-stage-box ptdl-model-box">
            <svg width="48" height="48" viewBox="0 0 48 48">
              <rect x="4" y="4" width="40" height="40" rx="6" fill="#f97316" opacity="0.15" stroke="#f97316" strokeWidth="1.5"/>
              <circle cx="16" cy="16" r="4" fill="#f97316" opacity="0.7"/>
              <circle cx="32" cy="16" r="4" fill="#f97316" opacity="0.7"/>
              <circle cx="16" cy="32" r="4" fill="#f97316" opacity="0.7"/>
              <circle cx="32" cy="32" r="4" fill="#f97316" opacity="0.7"/>
              <line x1="16" y1="16" x2="32" y2="32" stroke="#f97316" strokeWidth="1" opacity="0.5"/>
              <line x1="32" y1="16" x2="16" y2="32" stroke="#f97316" strokeWidth="1" opacity="0.5"/>
            </svg>
            <div className="ptdl-model-text">Neural Net</div>
          </div>
        </div>
      </div>

      <div className="ptdl-controls">
        <label className="ptdl-label">
          batch_size: <span className="ptdl-val">{batchSize}</span>
        </label>
        <input
          className="ptdl-slider"
          type="range" min="1" max="8"
          value={batchSize}
          onChange={e => { setBatchSize(+e.target.value); setCurrentBatch(0); }}
        />
        <span className="ptdl-hint">{totalBatches} batches per epoch</span>
      </div>
    </div>
  );
}
