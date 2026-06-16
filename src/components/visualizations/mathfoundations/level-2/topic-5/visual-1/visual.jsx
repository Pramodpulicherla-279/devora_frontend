import { useState } from 'react';
import './visual.css';

const W = 300, H = 160, PAD = 24;

const FUNCTIONS = {
  Linear: {
    f: x => 2 * x + 1,
    range: [-2, 2],
    yRange: [-3, 5],
    label: 'f(x) = 2x + 1',
    code: `import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-2, 2, 100)
y = 2 * x + 1
plt.plot(x, y, color='#58a6ff')
plt.title('Linear: f(x) = 2x + 1')
plt.show()`,
  },
  Quadratic: {
    f: x => x * x - 1,
    range: [-2.5, 2.5],
    yRange: [-1.5, 5.5],
    label: 'f(x) = x² − 1',
    code: `import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-2.5, 2.5, 100)
y = x**2 - 1
plt.plot(x, y, color='#a78bfa')
plt.title('Quadratic: f(x) = x² − 1')
plt.show()`,
  },
  Sigmoid: {
    f: x => 1 / (1 + Math.exp(-x)),
    range: [-4, 4],
    yRange: [0, 1],
    label: 'σ(x) = 1/(1+e^−x)',
    code: `import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-4, 4, 100)
y = 1 / (1 + np.exp(-x))
plt.plot(x, y, color='#56d364')
plt.title('Sigmoid σ(x)')
plt.axhline(0.5, color='gray', linestyle='--')
plt.show()`,
  },
};

const COLORS = { Linear: '#58a6ff', Quadratic: '#a78bfa', Sigmoid: '#56d364' };

export default function MfVizFunctionsVisualization() {
  const [tab, setTab] = useState('Linear');
  const fn = FUNCTIONS[tab];
  const [xMin, xMax] = fn.range;
  const [yMin, yMax] = fn.yRange;
  const color = COLORS[tab];

  const pts = [];
  const steps = 80;
  for (let i = 0; i <= steps; i++) {
    const x = xMin + (i / steps) * (xMax - xMin);
    const y = fn.f(x);
    const sx = PAD + ((x - xMin) / (xMax - xMin)) * (W - PAD * 2);
    const sy = H - PAD - ((y - yMin) / (yMax - yMin)) * (H - PAD * 2);
    pts.push(`${sx},${Math.max(PAD, Math.min(H - PAD, sy))}`);
  }

  return (
    <div className="mfvizfn-root">
      <h3 className="mfvizfn-title">Visualizing Functions</h3>
      <div className="mfvizfn-tabs">
        {Object.keys(FUNCTIONS).map(k => (
          <button key={k} onClick={() => setTab(k)}
            className={`mfvizfn-tab ${tab === k ? 'mfvizfn-tab-active' : ''}`}
            style={tab === k ? { borderColor: COLORS[k], color: COLORS[k] } : {}}>
            {k}
          </button>
        ))}
      </div>

      <div className="mfvizfn-body">
        <div>
          <div className="mfvizfn-fn-label" style={{ color }}>{fn.label}</div>
          <svg width={W} height={H} className="mfvizfn-svg">
            <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="#30363d" />
            <line x1={PAD} y1={PAD} x2={PAD} y2={H - PAD} stroke="#30363d" />
            <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="2.2" />
          </svg>
        </div>
        <pre className="mfvizfn-code">{fn.code}</pre>
      </div>
    </div>
  );
}
