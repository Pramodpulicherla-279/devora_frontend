import { useState } from 'react';
import './visual.css';

const METHODS = [
  {
    name: '__init__',
    color: '#f97316',
    desc: 'Store dataset path, load file list, define transforms',
    code: `def __init__(self, root, transform=None):\n    self.files = os.listdir(root)\n    self.root = root\n    self.transform = transform`,
  },
  {
    name: '__len__',
    color: '#58a6ff',
    desc: 'Return the total number of samples in the dataset',
    code: `def __len__(self):\n    return len(self.files)`,
  },
  {
    name: '__getitem__',
    color: '#a78bfa',
    desc: 'Load one sample by index, apply transforms, return (X, y)',
    code: `def __getitem__(self, idx):\n    img = Image.open(self.files[idx])\n    if self.transform:\n        img = self.transform(img)\n    return img, self.labels[idx]`,
  },
];

const SAMPLES = [
  { label: 'cat', color: '#f97316' },
  { label: 'dog', color: '#58a6ff' },
  { label: 'bird', color: '#a78bfa' },
  { label: 'fish', color: '#56d364' },
];

export default function PtCustomDatasetVisualization() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(null);

  return (
    <div className="ptcustds-root">
      <h3 className="ptcustds-title">Building a Custom Dataset</h3>

      <div className="ptcustds-layout">
        <div className="ptcustds-left">
          <div className="ptcustds-class-header">
            <span className="ptcustds-kw">class</span>{' '}
            <span className="ptcustds-classname">ImageDataset</span>
            <span className="ptcustds-kw">(Dataset)</span>
          </div>
          <div className="ptcustds-methods">
            {METHODS.map((m, i) => (
              <button
                key={m.name}
                className={`ptcustds-method-btn ${active === i ? 'ptcustds-active' : ''}`}
                style={{ '--mc': m.color }}
                onClick={() => setActive(i)}
              >
                <span className="ptcustds-def">def</span> {m.name}
                <span className="ptcustds-args">(self, ...)</span>
              </button>
            ))}
          </div>

          <div className="ptcustds-detail" style={{ borderColor: METHODS[active].color }}>
            <div className="ptcustds-detail-desc">{METHODS[active].desc}</div>
            <pre className="ptcustds-code">{METHODS[active].code}</pre>
          </div>
        </div>

        <div className="ptcustds-right">
          <div className="ptcustds-panel-label">Example: Image Dataset</div>
          <div className="ptcustds-samples">
            {SAMPLES.map((s, i) => (
              <div
                key={s.label}
                className={`ptcustds-sample ${hovered === i ? 'ptcustds-sample-hover' : ''}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{ '--sc': s.color }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40">
                  <rect x="2" y="2" width="36" height="36" rx="6" fill={s.color} opacity="0.15" stroke={s.color} strokeWidth="1.5"/>
                  <circle cx="14" cy="15" r="4" fill={s.color} opacity="0.6"/>
                  <path d="M6 32 Q20 18 34 32" stroke={s.color} strokeWidth="1.5" fill={s.color + '33'}/>
                </svg>
                <span className="ptcustds-sample-label" style={{ color: s.color }}>{s.label}</span>
                <span className="ptcustds-sample-idx">idx={i}</span>
              </div>
            ))}
          </div>
          <div className="ptcustds-usage">
            <div className="ptcustds-usage-label">Usage</div>
            <pre className="ptcustds-use-code">{`ds = ImageDataset('./data')\nprint(len(ds))  # ${SAMPLES.length}\nimg, label = ds[0]`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
