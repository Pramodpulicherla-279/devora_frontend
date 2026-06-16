import { useState } from 'react';
import './visual.css';

const GRID = Array.from({ length: 8 }, (_, r) =>
  Array.from({ length: 8 }, (_, c) => {
    const base = (r + c) % 2 === 0 ? '#1e2a3a' : '#1a2436';
    return base;
  })
);

const BOXES = [
  { x: 1, y: 1, w: 3, h: 3, color: '#58a6ff', label: 'Cat' },
  { x: 4, y: 3, w: 3, h: 3, color: '#f97316', label: 'Dog' },
];

const SEG_COLORS = { cat: '#1d3a5c', dog: '#3a1a00', bg: '#161b22' };

function cellSeg(r, c) {
  if (r >= 1 && r <= 3 && c >= 1 && c <= 3) return SEG_COLORS.cat;
  if (r >= 3 && r <= 5 && c >= 4 && c <= 6) return SEG_COLORS.dog;
  return SEG_COLORS.bg;
}

const PIPELINES = {
  yolo: {
    label: 'YOLO', color: '#56d364',
    steps: ['Input Image', 'Single CNN Pass', 'Grid Cells', 'Bounding Boxes + Classes'],
    note: 'One-shot: extremely fast, single forward pass.',
  },
  rcnn: {
    label: 'Faster R-CNN', color: '#a78bfa',
    steps: ['Input Image', 'Region Proposals (RPN)', 'ROI Pooling', 'Classifier + Regressor'],
    note: 'Two-stage: slower but more accurate on small objects.',
  },
};

const CELL = 34;

export default function CnnDetectionVisualization() {
  const [tab, setTab] = useState('detect');

  return (
    <div className="cnndetect-wrap">
      <h3 className="cnndetect-title">Object Detection &amp; Segmentation</h3>
      <div className="cnndetect-tabs">
        {['detect', 'segment', 'compare'].map(t => (
          <button key={t} className={`cnndetect-tab${tab === t ? ' cnndetect-tab--active' : ''}`}
            onClick={() => setTab(t)}>
            {t === 'detect' ? 'Detection' : t === 'segment' ? 'Segmentation' : 'YOLO vs R-CNN'}
          </button>
        ))}
      </div>

      {tab === 'detect' && (
        <div className="cnndetect-panel">
          <svg width={CELL * 8} height={CELL * 8} className="cnndetect-svg">
            {GRID.map((row, r) => row.map((fill, c) => (
              <rect key={`${r}-${c}`} x={c * CELL} y={r * CELL} width={CELL} height={CELL} fill={fill} />
            )))}
            {BOXES.map(b => (
              <g key={b.label}>
                <rect x={b.x * CELL} y={b.y * CELL} width={b.w * CELL} height={b.h * CELL}
                  fill="none" stroke={b.color} strokeWidth={2} />
                <rect x={b.x * CELL} y={b.y * CELL - 16} width={46} height={16} fill={b.color} opacity={0.9} />
                <text x={b.x * CELL + 4} y={b.y * CELL - 3} fontSize={11} fill="#0d1117" fontWeight="700">{b.label}</text>
              </g>
            ))}
          </svg>
          <p className="cnndetect-note">Bounding boxes locate each object with a class label and confidence score.</p>
        </div>
      )}

      {tab === 'segment' && (
        <div className="cnndetect-panel">
          <svg width={CELL * 8} height={CELL * 8} className="cnndetect-svg">
            {GRID.map((_, r) => GRID[0].map((__, c) => (
              <rect key={`${r}-${c}`} x={c * CELL} y={r * CELL} width={CELL} height={CELL} fill={cellSeg(r, c)} />
            )))}
            <text x={1.5 * CELL} y={2.6 * CELL} fontSize={12} fill="#58a6ff" fontWeight="700">Cat</text>
            <text x={4.5 * CELL} y={4.6 * CELL} fontSize={12} fill="#f97316" fontWeight="700">Dog</text>
          </svg>
          <p className="cnndetect-note">Segmentation assigns a class to every pixel — not just a box, but an exact mask.</p>
        </div>
      )}

      {tab === 'compare' && (
        <div className="cnndetect-compare">
          {Object.values(PIPELINES).map(p => (
            <div key={p.label} className="cnndetect-pipeline">
              <div className="cnndetect-pipe-title" style={{ color: p.color }}>{p.label}</div>
              {p.steps.map((s, i) => (
                <div key={i} className="cnndetect-step-wrap">
                  <div className="cnndetect-step" style={{ borderColor: p.color }}>{s}</div>
                  {i < p.steps.length - 1 && <div className="cnndetect-arrow" style={{ color: p.color }}>↓</div>}
                </div>
              ))}
              <p className="cnndetect-pipe-note">{p.note}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
