import { useState } from 'react';
import './visual.css';

const PITFALLS = [
  {
    title: 'Wrong Normalization Stats',
    symptom: 'Loss stays high; model performs worse than random.',
    diagnosis: 'Mean/std used at inference differs from training (e.g. ImageNet stats on custom data).',
    fix: `# Compute your dataset's own stats
mean = dataset.mean(axis=(0,2,3))
std  = dataset.std(axis=(0,2,3))
transforms.Normalize(mean, std)`,
  },
  {
    title: 'Augmentation at Test Time',
    symptom: 'Validation accuracy randomly varies each run.',
    diagnosis: 'RandomCrop / RandomFlip is inside the validation transform pipeline.',
    fix: `# Separate train vs val transforms
val_transform = transforms.Compose([
  transforms.Resize(256),
  transforms.CenterCrop(224),
  transforms.ToTensor(),
])`,
  },
  {
    title: 'Forgetting model.eval()',
    symptom: 'Validation loss jumps erratically; BatchNorm behaves strangely.',
    diagnosis: 'BatchNorm and Dropout remain in training mode during evaluation.',
    fix: `model.eval()          # disables Dropout, fixes BN stats
with torch.no_grad():
    output = model(val_input)`,
  },
  {
    title: 'Channel Order: RGB vs BGR',
    symptom: 'Pre-trained model predicts nonsense on seemingly correct inputs.',
    diagnosis: 'OpenCV loads images as BGR; PyTorch/PIL expects RGB.',
    fix: `import cv2
img = cv2.imread('img.jpg')
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)  # fix`,
  },
  {
    title: 'Label Mismatch',
    symptom: 'Training loss drops but validation accuracy is random.',
    diagnosis: 'Class indices differ between train and val splits (folder sort order changed).',
    fix: `# Freeze label map from training
class_to_idx = train_dataset.class_to_idx
# Pass same map to val dataset or save it:
import json; json.dump(class_to_idx, open('labels.json','w'))`,
  },
];

export default function CnnDebuggingVisualization() {
  const [open, setOpen] = useState(null);

  return (
    <div className="cnndebug-wrap">
      <h3 className="cnndebug-title">Debugging Vision Models — 5 Common Pitfalls</h3>
      <div className="cnndebug-list">
        {PITFALLS.map((p, i) => (
          <div key={i} className={`cnndebug-item${open === i ? ' cnndebug-item--open' : ''}`}>
            <button className="cnndebug-header" onClick={() => setOpen(open === i ? null : i)}>
              <span className="cnndebug-num">{i + 1}</span>
              <span className="cnndebug-item-title">{p.title}</span>
              <span className="cnndebug-chevron">{open === i ? '▲' : '▼'}</span>
            </button>
            {open === i && (
              <div className="cnndebug-body">
                <div className="cnndebug-row">
                  <span className="cnndebug-label cnndebug-label--symptom">Symptom</span>
                  <span className="cnndebug-text">{p.symptom}</span>
                </div>
                <div className="cnndebug-row">
                  <span className="cnndebug-label cnndebug-label--diag">Diagnosis</span>
                  <span className="cnndebug-text">{p.diagnosis}</span>
                </div>
                <pre className="cnndebug-code">{p.fix}</pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
