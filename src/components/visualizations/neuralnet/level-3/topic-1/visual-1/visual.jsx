import { useState } from 'react';
import './visual.css';

const TABS = ['Tensor', 'Autograd', 'Backward'];

const tensorData = [[1.2, 0.4, -0.8], [2.1, -1.3, 0.7], [0.3, 1.8, -0.5]];
const colorScale = (v) => {
  const t = (v + 2.5) / 5;
  const r = Math.round(80 + t * 100);
  const g = Math.round(40 + t * 60);
  const b = Math.round(160 + t * 80);
  return `rgb(${r},${g},${b})`;
};

const nodes = [
  { id: 'x', label: 'x', x: 60, y: 100, fn: null },
  { id: 'y', label: 'y = x²', x: 200, y: 100, fn: 'PowBackward' },
  { id: 'loss', label: 'loss = y.mean()', x: 360, y: 100, fn: 'MeanBackward' },
];

const gradInfo = [
  { from: 'loss', to: 'y', grad: '∂loss/∂y = 1/n', color: '#a78bfa' },
  { from: 'y', to: 'x', grad: '∂y/∂x = 2x', color: '#58a6ff' },
];

export default function NnPytorchIntroVisualization() {
  const [tab, setTab] = useState(0);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [animGrad, setAnimGrad] = useState(false);

  return (
    <div className="nnpt-root">
      <div className="nnpt-tabs">
        {TABS.map((t, i) => (
          <button key={t} className={`nnpt-tab${tab === i ? ' nnpt-tab--active' : ''}`} onClick={() => { setTab(i); setAnimGrad(false); }}>{t}</button>
        ))}
      </div>

      {tab === 0 && (
        <div className="nnpt-panel">
          <div className="nnpt-tensor-label">torch.Tensor — shape [3, 3], dtype float32</div>
          <div className="nnpt-grid">
            {tensorData.map((row, r) => row.map((val, c) => (
              <div key={`${r}-${c}`} className="nnpt-cell" style={{ background: colorScale(val) }}>
                {val.toFixed(1)}
              </div>
            )))}
          </div>
          <div className="nnpt-axis-labels">
            <span>dim 0 (rows) →</span><span>dim 1 (cols) →</span>
          </div>
          <pre className="nnpt-code">{`x = torch.tensor([[1.2, 0.4, -0.8],\n                  [2.1,-1.3,  0.7],\n                  [0.3, 1.8, -0.5]])\nprint(x.shape)  # torch.Size([3, 3])`}</pre>
        </div>
      )}

      {tab === 1 && (
        <div className="nnpt-panel">
          <div className="nnpt-tensor-label">Compute Graph — grad_fn at each node</div>
          <svg className="nnpt-svg" viewBox="0 0 440 200">
            {nodes.slice(0, -1).map((n, i) => (
              <line key={i} x1={n.x + 56} y1={100} x2={nodes[i + 1].x - 4} y2={100} stroke="#30363d" strokeWidth="2" markerEnd="url(#arr)" />
            ))}
            <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#30363d" /></marker></defs>
            {nodes.map(n => (
              <g key={n.id} onMouseEnter={() => setHoveredNode(n.id)} onMouseLeave={() => setHoveredNode(null)}>
                <rect x={n.x - 4} y={72} width={n.id === 'loss' ? 100 : 64} height={56} rx="8" fill={hoveredNode === n.id ? '#21262d' : '#161b22'} stroke={hoveredNode === n.id ? '#a78bfa' : '#30363d'} strokeWidth="1.5" />
                <text x={n.x + (n.id === 'loss' ? 46 : 28)} y={97} textAnchor="middle" fill="#e6edf3" fontSize="11">{n.label}</text>
                {n.fn && <text x={n.x + 28} y={116} textAnchor="middle" fill="#a78bfa" fontSize="9">{n.fn}</text>}
              </g>
            ))}
          </svg>
          <pre className="nnpt-code">{`x = torch.tensor([2.0], requires_grad=True)\ny = x ** 2          # PowBackward\nloss = y.mean()     # MeanBackward\nprint(loss.grad_fn) # <MeanBackward0>`}</pre>
        </div>
      )}

      {tab === 2 && (
        <div className="nnpt-panel">
          <div className="nnpt-tensor-label">Backward Pass — gradients flow right to left</div>
          <svg className="nnpt-svg" viewBox="0 0 440 200">
            {gradInfo.map((g, i) => (
              <g key={i}>
                <line x1={i === 0 ? 360 : 200} y1={100} x2={i === 0 ? 200 : 60} y2={100} stroke={animGrad ? g.color : '#30363d'} strokeWidth="2.5" strokeDasharray={animGrad ? '0' : '6 4'} markerEnd="url(#barr)" />
                <text x={i === 0 ? 280 : 130} y={88} textAnchor="middle" fill={g.color} fontSize="10">{g.grad}</text>
              </g>
            ))}
            <defs><marker id="barr" markerWidth="8" markerHeight="8" refX="2" refY="3" orient="auto"><path d="M8,0 L8,6 L0,3 z" fill="#a78bfa" /></marker></defs>
            {nodes.map(n => (
              <g key={n.id}>
                <rect x={n.x - 4} y={72} width={n.id === 'loss' ? 100 : 64} height={56} rx="8" fill="#161b22" stroke="#30363d" strokeWidth="1.5" />
                <text x={n.x + (n.id === 'loss' ? 46 : 28)} y={103} textAnchor="middle" fill="#e6edf3" fontSize="11">{n.label}</text>
              </g>
            ))}
          </svg>
          <button className="nnpt-btn" onClick={() => setAnimGrad(v => !v)}>{animGrad ? 'Reset' : 'Run backward()'}</button>
          <pre className="nnpt-code">{`loss.backward()\nprint(x.grad)  # tensor([4.])  # 2*x`}</pre>
        </div>
      )}
    </div>
  );
}
