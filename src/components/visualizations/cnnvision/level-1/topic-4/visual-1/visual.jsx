import { useState } from 'react';
import './visual.css';

const LAYERS = [
  {
    id: 'input', label: 'Input', shape: '3×32×32', color: '#58a6ff',
    code: `# Input image tensor\nx = torch.randn(1, 3, 32, 32)\n# Batch=1, Channels=3, H=32, W=32`,
    desc: 'RGB image: 3 channels, 32×32 pixels'
  },
  {
    id: 'conv1', label: 'Conv+ReLU', shape: '32×30×30', color: '#a78bfa',
    code: `self.conv1 = nn.Sequential(\n  nn.Conv2d(3, 32, kernel_size=3),\n  nn.ReLU()\n)`,
    desc: '32 filters of size 3×3, no padding → 30×30'
  },
  {
    id: 'pool1', label: 'MaxPool', shape: '32×15×15', color: '#f97316',
    code: `self.pool = nn.MaxPool2d(2, 2)\n# Halves spatial dims: 30→15`,
    desc: '2×2 max pool with stride 2 halves dimensions'
  },
  {
    id: 'conv2', label: 'Conv+ReLU', shape: '64×13×13', color: '#a78bfa',
    code: `self.conv2 = nn.Sequential(\n  nn.Conv2d(32, 64, kernel_size=3),\n  nn.ReLU()\n)`,
    desc: '64 filters, 3×3 kernel → 13×13'
  },
  {
    id: 'pool2', label: 'MaxPool', shape: '64×6×6', color: '#f97316',
    code: `self.pool = nn.MaxPool2d(2, 2)\n# 13→6 (floor division)`,
    desc: 'Second 2×2 pool → 6×6 spatial'
  },
  {
    id: 'fc', label: 'FC Layer', shape: '128', color: '#56d364',
    code: `self.fc1 = nn.Linear(64*6*6, 128)\nself.fc2 = nn.Linear(128, 10)`,
    desc: 'Flatten then two dense layers'
  },
  {
    id: 'out', label: 'Output', shape: '10 classes', color: '#58a6ff',
    code: `logits = self.fc2(F.relu(self.fc1(x)))\n# 10 class scores (CIFAR-10)`,
    desc: 'Raw logits → apply softmax for probabilities'
  },
];

export default function CnnScratchVisualization() {
  const [active, setActive] = useState(0);
  const layer = LAYERS[active];

  return (
    <div className="cnnscratch-wrap">
      <h3 className="cnnscratch-title">Building a CNN with PyTorch</h3>

      <div className="cnnscratch-arch">
        {LAYERS.map((l, i) => (
          <button key={l.id}
            className={`cnnscratch-layer ${active===i ? 'cnnscratch-layer--active' : ''}`}
            style={{ '--lc': l.color }}
            onClick={() => setActive(i)}>
            <span className="cnnscratch-layer-name">{l.label}</span>
            <span className="cnnscratch-layer-shape">{l.shape}</span>
            {i < LAYERS.length - 1 && <div className="cnnscratch-arrow">↓</div>}
          </button>
        ))}
      </div>

      <div className="cnnscratch-detail" style={{ '--lc': layer.color }}>
        <div className="cnnscratch-detail-header">
          <span className="cnnscratch-detail-name">{layer.label}</span>
          <span className="cnnscratch-detail-shape">{layer.shape}</span>
        </div>
        <p className="cnnscratch-detail-desc">{layer.desc}</p>
        <pre className="cnnscratch-code">{layer.code}</pre>
        <div className="cnnscratch-nav">
          <button className="cnnscratch-nav-btn" onClick={() => setActive(a => Math.max(0,a-1))} disabled={active===0}>← Prev</button>
          <button className="cnnscratch-nav-btn" onClick={() => setActive(a => Math.min(LAYERS.length-1,a+1))} disabled={active===LAYERS.length-1}>Next →</button>
        </div>
      </div>
    </div>
  );
}
