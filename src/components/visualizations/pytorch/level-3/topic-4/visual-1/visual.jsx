import { useState } from 'react';
import './visual.css';

const PITFALLS = [
  {
    title: 'Forget zero_grad()',
    bad: `for x, y in loader:\n  loss = criterion(model(x), y)\n  loss.backward()   # gradients accumulate!\n  opt.step()`,
    good: `for x, y in loader:\n  opt.zero_grad()   # clear every step\n  loss = criterion(model(x), y)\n  loss.backward()\n  opt.step()`,
  },
  {
    title: 'Not using .eval()',
    bad: `# Dropout & BatchNorm active!\nfor x, y in val_loader:\n  pred = model(x)`,
    good: `model.eval()\nwith torch.no_grad():\n  for x, y in val_loader:\n    pred = model(x)`,
  },
  {
    title: 'Device mismatch',
    bad: `x = x.to('cuda')\ny = y            # still on CPU!\nloss = criterion(model(x), y)  # error`,
    good: `x = x.to(device)\ny = y.to(device)\nloss = criterion(model(x), y)`,
  },
  {
    title: 'In-place ops on leaf',
    bad: `x = torch.tensor([1.0], requires_grad=True)\nx += 1   # in-place on leaf → RuntimeError`,
    good: `x = torch.tensor([1.0], requires_grad=True)\nx = x + 1   # creates new tensor, safe`,
  },
  {
    title: 'Memory leak in loop',
    bad: `losses = []\nfor x, y in loader:\n  loss = criterion(model(x), y)\n  losses.append(loss)  # holds graph in RAM`,
    good: `losses = []\nfor x, y in loader:\n  loss = criterion(model(x), y)\n  losses.append(loss.item())  # detached scalar`,
  },
  {
    title: 'Wrong loss reduction',
    bad: `criterion = nn.CrossEntropyLoss(reduction='sum')\n# loss grows with batch size,\n# LR needs rescaling — easy mistake`,
    good: `criterion = nn.CrossEntropyLoss()  # reduction='mean'\n# consistent regardless of batch size`,
  },
];

export default function PtPitfallsVisualization() {
  const [open, setOpen] = useState(null);

  return (
    <div className="ptpit-root">
      <h3 className="ptpit-title">Common PyTorch Pitfalls</h3>
      <p className="ptpit-sub">Click a card to see the fix.</p>

      <div className="ptpit-grid">
        {PITFALLS.map((p, i) => (
          <div key={i} className={`ptpit-card ${open === i ? 'ptpit-card--open' : ''}`} onClick={() => setOpen(open === i ? null : i)}>
            <div className="ptpit-card-header">
              <span className="ptpit-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="ptpit-card-title">{p.title}</span>
              <span className="ptpit-chevron">{open === i ? '▲' : '▼'}</span>
            </div>
            {open === i && (
              <div className="ptpit-diff">
                <div className="ptpit-diff-block ptpit-diff-bad">
                  <span className="ptpit-diff-label ptpit-diff-label--bad">✕ Bad</span>
                  <pre className="ptpit-code">{p.bad}</pre>
                </div>
                <div className="ptpit-diff-block ptpit-diff-good">
                  <span className="ptpit-diff-label ptpit-diff-label--good">✓ Good</span>
                  <pre className="ptpit-code">{p.good}</pre>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
