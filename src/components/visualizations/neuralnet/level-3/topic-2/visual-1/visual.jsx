import { useState } from 'react';
import './visual.css';

const LAYERS = [
  { name: 'nn.Linear(784, 256)', color: '#58a6ff', desc: 'Fully-connected layer: 784 → 256 neurons' },
  { name: 'nn.ReLU()', color: '#56d364', desc: 'Activation — zeroes out negatives' },
  { name: 'nn.Dropout(0.3)', color: '#f97316', desc: 'Randomly zeros 30% of neurons during training' },
  { name: 'nn.Linear(256, 10)', color: '#58a6ff', desc: 'Output layer: 256 → 10 classes' },
];

const INIT_CODE = `def __init__(self):
    super().__init__()
    self.fc1 = nn.Linear(784, 256)
    self.relu = nn.ReLU()
    self.drop = nn.Dropout(0.3)
    self.fc2 = nn.Linear(256, 10)`;

const FWD_CODE = `def forward(self, x):
    x = self.fc1(x)
    x = self.relu(x)
    x = self.drop(x)
    x = self.fc2(x)
    return x`;

export default function NnNnModuleVisualization() {
  const [activeMethod, setActiveMethod] = useState(null);
  const [hoveredLayer, setHoveredLayer] = useState(null);

  return (
    <div className="nnmod-root">
      <div className="nnmod-class-box">
        <div className="nnmod-class-title">class MyNet(nn.Module)</div>
        <div className="nnmod-methods">
          {['__init__', 'forward'].map(m => (
            <button
              key={m}
              className={`nnmod-method${activeMethod === m ? ' nnmod-method--active' : ''}`}
              onClick={() => setActiveMethod(activeMethod === m ? null : m)}
            >
              <span className="nnmod-method-kw">def</span> {m}(self{m === 'forward' ? ', x' : ''})
            </button>
          ))}
        </div>
      </div>

      {activeMethod && (
        <div className="nnmod-detail">
          <pre className="nnmod-code">{activeMethod === '__init__' ? INIT_CODE : FWD_CODE}</pre>
        </div>
      )}

      <div className="nnmod-palette-label">Layer Palette</div>
      <div className="nnmod-palette">
        {LAYERS.map((l, i) => (
          <div
            key={i}
            className={`nnmod-layer${hoveredLayer === i ? ' nnmod-layer--active' : ''}`}
            style={{ borderLeftColor: l.color }}
            onMouseEnter={() => setHoveredLayer(i)}
            onMouseLeave={() => setHoveredLayer(null)}
          >
            <span className="nnmod-layer-name" style={{ color: l.color }}>{l.name}</span>
            {hoveredLayer === i && <span className="nnmod-layer-desc">{l.desc}</span>}
          </div>
        ))}
      </div>

      <div className="nnmod-flow">
        {activeMethod === 'forward' && LAYERS.map((l, i) => (
          <div key={i} className="nnmod-flow-step">
            <div className="nnmod-flow-node" style={{ borderColor: l.color, color: l.color }}>{l.name}</div>
            {i < LAYERS.length - 1 && <div className="nnmod-flow-arrow">↓</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
