import { useState } from 'react';
import './visual.css';

const GRID_SIZE = 6;
const BASE_COLORS = [
  ['#f97316','#fb923c','#fdba74','#fed7aa','#f97316','#fb923c'],
  ['#58a6ff','#3b82f6','#2563eb','#1d4ed8','#58a6ff','#3b82f6'],
  ['#56d364','#4ade80','#22c55e','#16a34a','#56d364','#4ade80'],
  ['#a78bfa','#8b5cf6','#7c3aed','#6d28d9','#a78bfa','#8b5cf6'],
  ['#f97316','#fb923c','#fdba74','#fed7aa','#f97316','#fb923c'],
  ['#58a6ff','#3b82f6','#2563eb','#1d4ed8','#58a6ff','#3b82f6'],
];

const TRANSFORMS = [
  {
    id: 'resize',
    label: 'Resize',
    code: 'transforms.Resize((32, 32))',
    desc: 'Scales image to fixed size',
    apply: (colors) => {
      const small = [colors[0], colors[2], colors[4]].map(row => [row[0], row[2], row[4]]);
      return { grid: small, size: 3 };
    },
  },
  {
    id: 'flip',
    label: 'RandomHorizontalFlip',
    code: 'transforms.RandomHorizontalFlip(p=0.5)',
    desc: 'Randomly mirrors the image horizontally',
    apply: (colors) => ({ grid: colors.map(row => [...row].reverse()), size: GRID_SIZE }),
  },
  {
    id: 'normalize',
    label: 'Normalize',
    code: 'transforms.Normalize(mean, std)',
    desc: 'Shifts pixel values to zero-mean unit variance',
    apply: (colors) => ({ grid: colors.map(row => row.map(() => '#334155')), size: GRID_SIZE }),
  },
  {
    id: 'jitter',
    label: 'ColorJitter',
    code: 'transforms.ColorJitter(brightness=0.4)',
    desc: 'Randomly adjusts brightness/contrast/saturation',
    apply: (colors) => ({
      grid: colors.map(row => row.map(c => c + 'aa')),
      size: GRID_SIZE,
    }),
  },
];

function PixelGrid({ grid, size }) {
  const cellSize = Math.floor(120 / size);
  return (
    <svg width={size * cellSize} height={size * cellSize} viewBox={`0 0 ${size * cellSize} ${size * cellSize}`}>
      {grid.map((row, r) =>
        row.map((color, c) => (
          <rect key={`${r}-${c}`} x={c * cellSize} y={r * cellSize}
            width={cellSize - 1} height={cellSize - 1} rx="1" fill={color} />
        ))
      )}
    </svg>
  );
}

export default function PtTransformsVisualization() {
  const [active, setActive] = useState(0);
  const result = TRANSFORMS[active].apply(BASE_COLORS);

  return (
    <div className="pttrans-root">
      <h3 className="pttrans-title">Data Transforms &amp; Augmentation</h3>

      <div className="pttrans-tabs">
        {TRANSFORMS.map((t, i) => (
          <button
            key={t.id}
            className={`pttrans-tab ${active === i ? 'pttrans-tab-active' : ''}`}
            onClick={() => setActive(i)}
          >{t.label}</button>
        ))}
      </div>

      <div className="pttrans-stage">
        <div className="pttrans-panel">
          <div className="pttrans-panel-label">Before</div>
          <div className="pttrans-grid-wrap">
            <PixelGrid grid={BASE_COLORS} size={GRID_SIZE} />
          </div>
          <div className="pttrans-shape">6 × 6 pixels</div>
        </div>

        <div className="pttrans-arrow">
          <svg width="48" height="24" viewBox="0 0 48 24">
            <path d="M0 12 H38 L30 5 M38 12 L30 19" stroke="#f97316" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          </svg>
          <div className="pttrans-op-name">{TRANSFORMS[active].label}</div>
        </div>

        <div className="pttrans-panel">
          <div className="pttrans-panel-label">After</div>
          <div className="pttrans-grid-wrap">
            <PixelGrid grid={result.grid} size={result.size} />
          </div>
          <div className="pttrans-shape">{result.size} × {result.size} pixels</div>
        </div>
      </div>

      <div className="pttrans-info">
        <div className="pttrans-desc">{TRANSFORMS[active].desc}</div>
        <pre className="pttrans-code">{TRANSFORMS[active].code}</pre>
      </div>
    </div>
  );
}
