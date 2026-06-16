import { useState } from 'react';
import './visual.css';

const STEPS = [
  {
    label: 'Collect',
    icon: '📁',
    tip: 'Aim for 1000+ images per class. Use web scraping, public datasets (ImageNet, COCO), or domain-specific sources.',
    code: `# Download from HuggingFace Datasets
from datasets import load_dataset
ds = load_dataset("cats_vs_dogs")`,
  },
  {
    label: 'Annotate',
    icon: '🏷',
    tip: 'Use LabelImg or CVAT for bounding boxes. For classification, folder structure is enough.',
    code: `# Folder structure = labels
data/
  cats/  img1.jpg img2.jpg ...
  dogs/  img1.jpg img2.jpg ...`,
  },
  {
    label: 'Augment',
    icon: '🔄',
    tip: 'Flip, crop, color-jitter, and rotate to increase effective dataset size and reduce overfitting.',
    code: `transforms.Compose([
  transforms.RandomHorizontalFlip(),
  transforms.ColorJitter(0.3, 0.3),
  transforms.RandomRotation(15),
])`,
  },
  {
    label: 'Architecture',
    icon: '🏗',
    tip: 'Start with a pre-trained ResNet-50. Fine-tune only the final layers first, then unfreeze more if needed.',
    code: `model = resnet50(weights="IMAGENET1K_V2")
model.fc = nn.Linear(2048, num_classes)`,
  },
  {
    label: 'Train',
    icon: '⚡',
    tip: 'Use AdamW + cosine LR decay. Monitor val loss every epoch. Use early stopping with patience=5.',
    code: `optimizer = AdamW(model.parameters(), lr=1e-4)
scheduler = CosineAnnealingLR(optimizer, T_max=30)`,
  },
  {
    label: 'Evaluate',
    icon: '📊',
    tip: 'Report accuracy, F1, confusion matrix. Check per-class performance — imbalanced classes hide in averages.',
    code: `from sklearn.metrics import classification_report
print(classification_report(y_true, y_pred))`,
  },
  {
    label: 'Deploy',
    icon: '🚀',
    tip: 'Export to ONNX. Use FastAPI or TorchServe. Add input validation and output confidence thresholds.',
    code: `torch.onnx.export(model, dummy, "model.onnx")
# Serve with FastAPI + onnxruntime`,
  },
];

export default function CnnEndToEndVisualization() {
  const [done, setDone] = useState(new Set());
  const [expanded, setExpanded] = useState(null);

  function toggle(i) {
    setDone(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  const pct = Math.round((done.size / STEPS.length) * 100);

  return (
    <div className="cnnend-wrap">
      <h3 className="cnnend-title">A Complete Computer Vision Project</h3>

      <div className="cnnend-progress-bar">
        <div className="cnnend-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="cnnend-progress-label">{done.size} / {STEPS.length} steps complete — {pct}%</div>

      <div className="cnnend-steps">
        {STEPS.map((s, i) => (
          <div key={i} className={`cnnend-card${done.has(i) ? ' cnnend-card--done' : ''}`}>
            <div className="cnnend-card-header">
              <button className="cnnend-check" onClick={() => toggle(i)}
                aria-label={done.has(i) ? 'Mark incomplete' : 'Mark complete'}>
                {done.has(i) ? '✓' : '○'}
              </button>
              <span className="cnnend-step-num">{i + 1}</span>
              <span className="cnnend-step-label">{s.label}</span>
              <button className="cnnend-expand" onClick={() => setExpanded(expanded === i ? null : i)}>
                {expanded === i ? '▲' : '▼'}
              </button>
            </div>
            {expanded === i && (
              <div className="cnnend-card-body">
                <p className="cnnend-tip">{s.tip}</p>
                <pre className="cnnend-code">{s.code}</pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
