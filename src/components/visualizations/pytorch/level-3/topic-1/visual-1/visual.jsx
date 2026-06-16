import { useState } from 'react';
import './visual.css';

const LAYERS = [
  { name: 'conv1',  frozen: true },
  { name: 'layer1', frozen: true },
  { name: 'layer2', frozen: true },
  { name: 'layer3', frozen: true },
  { name: 'layer4', frozen: true },
  { name: 'fc (replaced)', frozen: false },
];

const METRICS = [
  { label: 'Train from Scratch', acc: 54, epochs: 80, color: '#a3adbb' },
  { label: 'Transfer Learning',  acc: 91, epochs: 12, color: '#f97316' },
];

const CODE = `model = torchvision.models.resnet50(pretrained=True)

# Freeze all layers
for param in model.parameters():
    param.requires_grad = False

# Replace final FC layer (trainable)
model.fc = nn.Linear(model.fc.in_features, num_classes)`;

export default function PtTransferVisualization() {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="pttransfer-root">
      <h3 className="pttransfer-title">Transfer Learning with ResNet</h3>

      <div className="pttransfer-body">
        <div className="pttransfer-arch">
          <div className="pttransfer-arch-label">ResNet-50 Architecture</div>
          {LAYERS.map(l => (
            <div key={l.name} className={`pttransfer-layer ${l.frozen ? 'pttransfer-layer--frozen' : 'pttransfer-layer--active'}`}>
              <span className="pttransfer-layer-name">{l.name}</span>
              <span className="pttransfer-layer-status">{l.frozen ? '🔒 frozen' : '✏️ trainable'}</span>
            </div>
          ))}
        </div>

        <div className="pttransfer-right">
          <div className="pttransfer-metrics">
            <div className="pttransfer-metrics-label">Accuracy after training</div>
            {METRICS.map(m => (
              <div key={m.label} className="pttransfer-metric-row">
                <div className="pttransfer-metric-name" style={{ color: m.color }}>{m.label}</div>
                <div className="pttransfer-bar-track">
                  <div className="pttransfer-bar" style={{ width: `${m.acc}%`, background: m.color }} />
                </div>
                <span className="pttransfer-acc">{m.acc}%</span>
                <span className="pttransfer-epochs">{m.epochs} epochs</span>
              </div>
            ))}
          </div>

          <div className="pttransfer-summary">
            <div className="pttransfer-stat"><span className="pttransfer-stat-val pttransfer-orange">37%</span>accuracy gain</div>
            <div className="pttransfer-stat"><span className="pttransfer-stat-val pttransfer-orange">6.7x</span>faster convergence</div>
          </div>
        </div>
      </div>

      <button className="pttransfer-toggle" onClick={() => setShowCode(c => !c)}>
        {showCode ? 'Hide' : 'Show'} Setup Code
      </button>
      {showCode && <pre className="pttransfer-code">{CODE}</pre>}
    </div>
  );
}
