import { useState } from 'react';
import './visual.css';

const BUGS = [
  {
    title: 'NaN Loss',
    symptom: 'loss prints nan after a few batches',
    code: 'print(loss.item())  # nan\n# Check: log(0) or 0/0 in loss fn',
    fix: 'Add epsilon: log(pred + 1e-8). Use nn.CrossEntropyLoss not manual log.',
    color: '#f85149',
  },
  {
    title: 'Exploding Gradients',
    symptom: 'Loss shoots to inf, weights become huge',
    code: 'torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)',
    fix: 'Clip gradients before optimizer.step(). Reduce learning rate.',
    color: '#f97316',
  },
  {
    title: 'Wrong Tensor Shapes',
    symptom: 'RuntimeError: mat1 and mat2 shapes cannot be multiplied',
    code: 'print(x.shape)  # Debug shape at each layer\n# Use x = x.view(batch, -1) to flatten',
    fix: 'Always print shapes while building. Use reshape/view correctly.',
    color: '#f97316',
  },
  {
    title: 'Forgetting .zero_grad()',
    symptom: 'Gradients accumulate — loss behaves erratically',
    code: '# Wrong:\nloss.backward(); optimizer.step()\n# Right:\noptimizer.zero_grad(); loss.backward(); optimizer.step()',
    fix: 'Call optimizer.zero_grad() at the start of every batch.',
    color: '#a78bfa',
  },
  {
    title: '.eval() vs .train()',
    symptom: 'Val accuracy inconsistent; dropout active at inference',
    code: 'model.eval()   # Disables dropout, fixes BN stats\nmodel.train()  # Re-enable for next epoch',
    fix: 'Switch to model.eval() before validation, model.train() after.',
    color: '#58a6ff',
  },
  {
    title: 'Device Mismatch',
    symptom: 'RuntimeError: Expected all tensors to be on the same device',
    code: 'device = "cuda" if torch.cuda.is_available() else "cpu"\nmodel = model.to(device)\nX, y = X.to(device), y.to(device)',
    fix: 'Move both model and data to the same device before forward pass.',
    color: '#56d364',
  },
];

export default function NnDebuggingVisualization() {
  const [open, setOpen] = useState(null);

  return (
    <div className="nndebug-root">
      <div className="nndebug-header">6 Common Neural Network Bugs</div>
      <div className="nndebug-list">
        {BUGS.map((bug, i) => (
          <div key={i} className={`nndebug-item${open === i ? ' nndebug-item--open' : ''}`}>
            <button className="nndebug-trigger" style={{ '--bc': bug.color }} onClick={() => setOpen(open === i ? null : i)}>
              <span className="nndebug-idx" style={{ background: bug.color }}>{i + 1}</span>
              <span className="nndebug-title">{bug.title}</span>
              <span className="nndebug-chevron">{open === i ? '▲' : '▼'}</span>
            </button>
            {open === i && (
              <div className="nndebug-body">
                <div className="nndebug-row"><span className="nndebug-label">Symptom</span><span className="nndebug-value">{bug.symptom}</span></div>
                <pre className="nndebug-code">{bug.code}</pre>
                <div className="nndebug-row"><span className="nndebug-label nndebug-label--fix">Fix</span><span className="nndebug-value">{bug.fix}</span></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
