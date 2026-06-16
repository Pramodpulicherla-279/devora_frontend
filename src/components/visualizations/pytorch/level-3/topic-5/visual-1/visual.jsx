import { useState } from 'react';
import './visual.css';

const STEPS = [
  {
    id: 'data',
    label: 'Data',
    icon: '🗂️',
    code: `dataset = ImageFolder('data/train', transform=transforms)`,
    output: `Found 8000 images in 10 classes`,
  },
  {
    id: 'transforms',
    label: 'Transforms',
    icon: '🔄',
    code: `transforms.Compose([\n  transforms.Resize(224),\n  transforms.RandomHorizontalFlip(),\n  transforms.ToTensor(),\n  transforms.Normalize(mean, std),\n])`,
    output: `Tensor shape: [3, 224, 224]  dtype: float32`,
  },
  {
    id: 'loader',
    label: 'DataLoader',
    icon: '📦',
    code: `loader = DataLoader(dataset, batch_size=32,\n                    shuffle=True, num_workers=4)`,
    output: `Batch shape: [32, 3, 224, 224]  (250 batches/epoch)`,
  },
  {
    id: 'model',
    label: 'Model (pretrained)',
    icon: '🧠',
    code: `model = resnet50(pretrained=True)\nfor p in model.parameters(): p.requires_grad = False\nmodel.fc = nn.Linear(2048, 10)`,
    output: `Trainable params: 20,490  /  Total: 25,557,032`,
  },
  {
    id: 'train',
    label: 'Train',
    icon: '⚡',
    code: `for epoch in range(10):\n  for x, y in loader:\n    opt.zero_grad()\n    loss = criterion(model(x.to(device)), y.to(device))\n    loss.backward(); opt.step()`,
    output: `Epoch 10/10  loss: 0.142  val_acc: 94.3%`,
  },
  {
    id: 'eval',
    label: 'Evaluate',
    icon: '📊',
    code: `model.eval()\nwith torch.no_grad():\n  correct = sum((model(x.to(device)).argmax(1)==y.to(device)).sum()\n                for x, y in val_loader)\nprint(correct / len(val_dataset))`,
    output: `Test Accuracy: 94.3%  (943 / 1000 correct)`,
  },
];

export default function PtEndToEndVisualization() {
  const [active, setActive] = useState(0);

  const s = STEPS[active];

  return (
    <div className="ptend-root">
      <h3 className="ptend-title">End-to-End Image Classification Pipeline</h3>

      <div className="ptend-pipeline">
        {STEPS.map((step, i) => (
          <div key={step.id} className="ptend-step-wrap">
            <button
              className={`ptend-step ${i === active ? 'ptend-step--active' : ''} ${i < active ? 'ptend-step--done' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="ptend-icon">{step.icon}</span>
              <span className="ptend-label">{step.label}</span>
            </button>
            {i < STEPS.length - 1 && <span className="ptend-arrow">→</span>}
          </div>
        ))}
      </div>

      <div className="ptend-detail">
        <div className="ptend-detail-header">
          <span className="ptend-step-num">Step {active + 1} / {STEPS.length}</span>
          <span className="ptend-step-name">{s.label}</span>
        </div>
        <pre className="ptend-code">{s.code}</pre>
        <div className="ptend-output">
          <span className="ptend-output-label">Output</span>
          <code className="ptend-output-val">{s.output}</code>
        </div>
      </div>

      <div className="ptend-nav">
        <button className="ptend-nav-btn" disabled={active === 0} onClick={() => setActive(a => a - 1)}>← Prev</button>
        <button className="ptend-nav-btn" disabled={active === STEPS.length - 1} onClick={() => setActive(a => a + 1)}>Next →</button>
      </div>
    </div>
  );
}
