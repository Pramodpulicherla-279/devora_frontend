import { useState } from 'react';
import './visual.css';

const ARCHS = {
  mobilenet: {
    name: 'MobileNetV3',
    color: '#56d364',
    pros: ['Tiny (6 MB)', 'Fast on CPU/mobile', 'Good for edge deployment'],
    cons: ['Lower accuracy ceiling', 'Struggles on complex scenes'],
    match: { dataset: 'small', priority: 'speed' },
  },
  efficientnet: {
    name: 'EfficientNet-B3',
    color: '#58a6ff',
    pros: ['Best accuracy/param ratio', 'Scales well', 'Strong transfer learning'],
    cons: ['Slower than MobileNet', 'Needs tuning for small datasets'],
    match: { dataset: 'large', priority: 'accuracy' },
  },
  resnet: {
    name: 'ResNet-50',
    color: '#f97316',
    pros: ['Battle-tested', 'Fast training', 'Great baseline'],
    cons: ['Not state-of-art accuracy', 'Larger than MobileNet'],
    match: { dataset: 'small', priority: 'accuracy' },
  },
  vit: {
    name: 'ViT-B/16',
    color: '#a78bfa',
    pros: ['Excellent on large data', 'Global context', 'Highly scalable'],
    cons: ['Data hungry', 'Slow without large pre-training', 'High memory'],
    match: { dataset: 'large', priority: 'speed' },
  },
};

function recommend(dataset, priority) {
  return Object.values(ARCHS).find(a => a.match.dataset === dataset && a.match.priority === priority) || ARCHS.resnet;
}

export default function CnnChooseArchVisualization() {
  const [dataset, setDataset] = useState(null);
  const [priority, setPriority] = useState(null);
  const rec = dataset && priority ? recommend(dataset, priority) : null;

  return (
    <div className="cnnca-wrap">
      <h3 className="cnnca-title">Choosing &amp; Adapting Architectures</h3>

      <div className="cnnca-flow">
        <div className="cnnca-step">
          <p className="cnnca-question">Dataset size?</p>
          <div className="cnnca-options">
            {['small', 'large'].map(d => (
              <button key={d} className={`cnnca-btn${dataset === d ? ' cnnca-btn--active' : ''}`}
                onClick={() => setDataset(d)}>
                {d === 'small' ? 'Small (< 10k)' : 'Large (> 50k)'}
              </button>
            ))}
          </div>
        </div>

        <div className="cnnca-divider">↓</div>

        <div className="cnnca-step">
          <p className="cnnca-question">Top priority?</p>
          <div className="cnnca-options">
            {['speed', 'accuracy'].map(p => (
              <button key={p} className={`cnnca-btn${priority === p ? ' cnnca-btn--active' : ''}`}
                onClick={() => setPriority(p)}>
                {p === 'speed' ? 'Speed / Deployment' : 'Max Accuracy'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {rec ? (
        <div className="cnnca-result" style={{ borderColor: rec.color }}>
          <div className="cnnca-rec-name" style={{ color: rec.color }}>{rec.name}</div>
          <div className="cnnca-rec-cols">
            <div className="cnnca-rec-col">
              <div className="cnnca-col-label" style={{ color: '#56d364' }}>Pros</div>
              {rec.pros.map(p => <div key={p} className="cnnca-bullet" style={{ color: '#a3adbb' }}>✓ {p}</div>)}
            </div>
            <div className="cnnca-rec-col">
              <div className="cnnca-col-label" style={{ color: '#f97316' }}>Cons</div>
              {rec.cons.map(c => <div key={c} className="cnnca-bullet" style={{ color: '#6b7785' }}>✗ {c}</div>)}
            </div>
          </div>
        </div>
      ) : (
        <div className="cnnca-placeholder">Select your scenario above to get a recommendation.</div>
      )}
    </div>
  );
}
