import { useState } from 'react';
import './visual.css';

const BENCHMARKS = [
  { op: 'Matrix Multiply (1k×1k)', cpu: 320, gpu: 12 },
  { op: 'Conv2D (64 filters)',     cpu: 180, gpu: 8  },
  { op: 'Forward Pass (ResNet)',   cpu: 450, gpu: 22 },
  { op: 'Backward Pass',          cpu: 890, gpu: 41 },
];

export default function PtGpuVisualization() {
  const [showTransfer, setShowTransfer] = useState(false);

  const maxTime = Math.max(...BENCHMARKS.map(b => b.cpu));

  return (
    <div className="ptgpu-root">
      <h3 className="ptgpu-title">GPU Acceleration with PyTorch</h3>

      <div className="ptgpu-device-code">
        <pre className="ptgpu-code">{`device = 'cuda' if torch.cuda.is_available() else 'cpu'
model = model.to(device)
data  = data.to(device)`}</pre>
      </div>

      <div className="ptgpu-chart-section">
        <div className="ptgpu-chart-title">Execution Time Comparison (ms)</div>
        <div className="ptgpu-chart">
          {BENCHMARKS.map(b => (
            <div key={b.op} className="ptgpu-row">
              <div className="ptgpu-op-label">{b.op}</div>
              <div className="ptgpu-bars">
                <div className="ptgpu-bar-wrap">
                  <span className="ptgpu-bar-tag ptgpu-cpu-tag">CPU</span>
                  <div className="ptgpu-bar-track">
                    <div className="ptgpu-bar ptgpu-cpu-bar" style={{ width: `${(b.cpu / maxTime) * 100}%` }} />
                  </div>
                  <span className="ptgpu-bar-val">{b.cpu}ms</span>
                </div>
                <div className="ptgpu-bar-wrap">
                  <span className="ptgpu-bar-tag ptgpu-gpu-tag">GPU</span>
                  <div className="ptgpu-bar-track">
                    <div className="ptgpu-bar ptgpu-gpu-bar" style={{ width: `${(b.gpu / maxTime) * 100}%` }} />
                  </div>
                  <span className="ptgpu-bar-val ptgpu-speedup">{b.gpu}ms <span className="ptgpu-x">{(b.cpu/b.gpu).toFixed(0)}x</span></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="ptgpu-toggle" onClick={() => setShowTransfer(t => !t)}>
        {showTransfer ? 'Hide' : 'Show'} Memory Transfer Diagram
      </button>

      {showTransfer && (
        <div className="ptgpu-transfer">
          <div className="ptgpu-mem-box ptgpu-cpu-mem">
            <div className="ptgpu-mem-label">CPU RAM</div>
            <div className="ptgpu-mem-item">tensor (float32)</div>
            <div className="ptgpu-mem-item">numpy arrays</div>
          </div>
          <div className="ptgpu-transfer-arrow">
            <svg width="80" height="36" viewBox="0 0 80 36">
              <path d="M0 12 H60 L52 5 M60 12 L52 19" stroke="#f97316" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <path d="M80 24 H20 L28 17 M20 24 L28 31" stroke="#58a6ff" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
            <div className="ptgpu-transfer-labels">
              <span style={{ color: '#f97316' }}>.to('cuda')</span>
              <span style={{ color: '#58a6ff' }}>.to('cpu')</span>
            </div>
          </div>
          <div className="ptgpu-mem-box ptgpu-gpu-mem">
            <div className="ptgpu-mem-label">GPU VRAM</div>
            <div className="ptgpu-mem-item">cuda tensor</div>
            <div className="ptgpu-mem-item">model weights</div>
          </div>
        </div>
      )}
    </div>
  );
}
