import { useState } from 'react';
import './visual.css';

const AUGMENTS = [
  {
    name: 'Horizontal Flip', key: 'flip',
    transform: 'scaleX(-1)',
    code: `transforms.RandomHorizontalFlip(p=0.5)`,
    desc: 'Randomly mirrors the image left-right. Free augmentation for most tasks.'
  },
  {
    name: 'Rotation', key: 'rotate',
    transform: 'rotate(20deg)',
    code: `transforms.RandomRotation(degrees=20)`,
    desc: 'Rotates by a random angle. Helps with orientation invariance.'
  },
  {
    name: 'Random Crop', key: 'crop',
    transform: 'scale(1.2) translate(-8%, -6%)',
    code: `transforms.RandomCrop(224, padding=32)`,
    desc: 'Crops a random sub-region. Forces the model to use local features.'
  },
  {
    name: 'Color Jitter', key: 'color',
    transform: 'saturate(3) hue-rotate(40deg)',
    filterStyle: true,
    code: `transforms.ColorJitter(\n  brightness=0.4, contrast=0.4,\n  saturation=0.4, hue=0.1)`,
    desc: 'Randomly changes brightness, contrast, saturation, hue.'
  },
  {
    name: 'Cutout', key: 'cutout',
    cutout: true,
    code: `# Custom Cutout\ndef cutout(img, n_holes=1, length=32):\n  y = np.random.randint(H)\n  x = np.random.randint(W)\n  # zero out patch`,
    desc: 'Masks a random rectangle to force attention to other regions.'
  },
];

const GRID = [
  ['#1d3a5c','#a78bfa','#56d364'],
  ['#f97316','#58a6ff','#1d5c2d'],
  ['#2d1a44','#1a3a1a','#5c3d1d'],
];

export default function CnnAugmentVisualization() {
  const [active, setActive] = useState(null);
  const aug = active !== null ? AUGMENTS[active] : null;

  const getStyle = () => {
    if (!aug) return {};
    if (aug.filterStyle) return { filter: aug.transform };
    return { transform: aug.transform };
  };

  return (
    <div className="cnnaug-wrap">
      <h3 className="cnnaug-title">Data Augmentation for Vision</h3>
      <p className="cnnaug-desc">Click an augmentation to apply it to the sample image grid.</p>

      <div className="cnnaug-techniques">
        {AUGMENTS.map((a, i) => (
          <button key={a.key}
            className={`cnnaug-tech ${active===i?'cnnaug-tech--active':''}`}
            onClick={() => setActive(active===i ? null : i)}>
            {a.name}
          </button>
        ))}
      </div>

      <div className="cnnaug-layout">
        <div className="cnnaug-image-panel">
          <div className="cnnaug-label">Sample Image</div>
          <div className="cnnaug-image-wrap">
            <svg viewBox="0 0 90 90" width={90} height={90} style={!aug?.filterStyle && !aug?.cutout ? getStyle() : {}}
              className="cnnaug-image" filter={aug?.filterStyle ? aug.transform : undefined}>
              {GRID.map((row, r) =>
                row.map((fill, c) => (
                  <rect key={`${r}-${c}`} x={c*30} y={r*30} width={30} height={30} fill={fill}/>
                ))
              )}
              {aug?.cutout && (
                <rect x={25} y={25} width={40} height={40} fill="#0d1117"/>
              )}
              {aug?.filterStyle && (
                <rect x={0} y={0} width={90} height={90} fill="none"
                  style={{filter: aug.transform}}/>
              )}
            </svg>
          </div>
        </div>

        {aug && (
          <div className="cnnaug-info-panel">
            <div className="cnnaug-info-name">{aug.name}</div>
            <p className="cnnaug-info-desc">{aug.desc}</p>
            <pre className="cnnaug-code">{aug.code}</pre>
          </div>
        )}

        {!aug && (
          <div className="cnnaug-placeholder">
            Select an augmentation to see its effect and code
          </div>
        )}
      </div>
    </div>
  );
}
