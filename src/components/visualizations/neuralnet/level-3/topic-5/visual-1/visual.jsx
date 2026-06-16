import { useState } from 'react';
import './visual.css';

const STEPS = [
  {
    label: 'Dataset',
    desc: 'Load and preprocess data, apply transforms',
    code: 'dataset = MyDataset(root, transform=transforms.ToTensor())',
    color: '#a78bfa',
  },
  {
    label: 'DataLoader',
    desc: 'Batch and shuffle data for training',
    code: 'loader = DataLoader(dataset, batch_size=32, shuffle=True)',
    color: '#58a6ff',
  },
  {
    label: 'Model',
    desc: 'Define nn.Module, move to device',
    code: 'model = MyNet().to(device)',
    color: '#56d364',
  },
  {
    label: 'Training Loop',
    desc: 'Forward, loss, backward, step per batch',
    code: 'loss.backward(); optimizer.step()',
    color: '#f97316',
  },
  {
    label: 'Evaluate',
    desc: 'Run model.eval() and measure accuracy',
    code: 'with torch.no_grad(): acc = (pred == y).float().mean()',
    color: '#f85149',
  },
  {
    label: 'Save',
    desc: 'Persist weights for later use',
    code: 'torch.save(model.state_dict(), "model.pth")',
    color: '#56d364',
  },
];

export default function NnEndToEndVisualization() {
  const [done, setDone] = useState(new Set());
  const [running, setRunning] = useState(false);
  const [selected, setSelected] = useState(null);

  const runAll = async () => {
    if (running) return;
    setRunning(true);
    setDone(new Set());
    for (let i = 0; i < STEPS.length; i++) {
      await new Promise(r => setTimeout(r, 700));
      setDone(prev => new Set([...prev, i]));
    }
    setRunning(false);
  };

  return (
    <div className="nnend-root">
      <div className="nnend-header">
        <span className="nnend-title">End-to-End PyTorch Project</span>
        <button className="nnend-run-btn" onClick={runAll} disabled={running}>{running ? 'Running…' : 'Run All'}</button>
      </div>
      <div className="nnend-grid">
        {STEPS.map((s, i) => (
          <div
            key={i}
            className={`nnend-card${done.has(i) ? ' nnend-card--done' : ''}${selected === i ? ' nnend-card--selected' : ''}`}
            style={{ '--sc': s.color }}
            onClick={() => setSelected(selected === i ? null : i)}
          >
            <div className="nnend-card-top">
              <span className="nnend-card-num" style={{ background: s.color }}>{i + 1}</span>
              <span className="nnend-card-label" style={{ color: s.color }}>{s.label}</span>
              {done.has(i) && <span className="nnend-check">✓</span>}
            </div>
            <div className="nnend-card-desc">{s.desc}</div>
            {selected === i && <pre className="nnend-code">{s.code}</pre>}
          </div>
        ))}
      </div>
      {done.size === STEPS.length && (
        <div className="nnend-complete">Project complete! Model saved to disk.</div>
      )}
    </div>
  );
}
