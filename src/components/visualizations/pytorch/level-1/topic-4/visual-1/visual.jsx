import { useState } from 'react';
import './visual.css';

const CHANNELS = [
  { id: 'R', label: 'Red', color: '#ef4444', grid: Array(16).fill(0).map((_, i) => `rgba(239,68,68,${0.3 + (i % 4) * 0.18})`) },
  { id: 'G', label: 'Green', color: '#56d364', grid: Array(16).fill(0).map((_, i) => `rgba(86,211,100,${0.2 + ((i * 3) % 4) * 0.2})`) },
  { id: 'B', label: 'Blue', color: '#58a6ff', grid: Array(16).fill(0).map((_, i) => `rgba(88,166,255,${0.25 + ((i * 7) % 4) * 0.17})`) },
];

function MiniGrid({ colors, size = 4, dim }) {
  return (
    <svg width={size * 18} height={size * 18} viewBox={`0 0 ${size * 18} ${size * 18}`} style={{ opacity: dim ? 0.35 : 1 }}>
      {colors.map((c, i) => (
        <rect key={i} x={(i % size) * 18} y={Math.floor(i / size) * 18}
          width="17" height="17" rx="2" fill={c} />
      ))}
    </svg>
  );
}

export default function PtImageTensorsVisualization() {
  const [active, setActive] = useState(null);

  const combined = Array(16).fill(0).map((_, i) => {
    const r = parseInt(CHANNELS[0].grid[i].match(/[\d.]+/g)[0]);
    const g = parseInt(CHANNELS[1].grid[i].match(/[\d.]+/g)[0]);
    const b = parseInt(CHANNELS[2].grid[i].match(/[\d.]+/g)[0]);
    return `rgb(${r},${g},${b})`;
  });

  return (
    <div className="ptimgtens-root">
      <h3 className="ptimgtens-title">Image as Tensor: C × H × W</h3>

      <div className="ptimgtens-shape-bar">
        <span className="ptimgtens-shape">
          <span className="ptimgtens-dim" style={{ color: '#a78bfa' }}>3</span>
          <span className="ptimgtens-x"> × </span>
          <span className="ptimgtens-dim" style={{ color: '#58a6ff' }}>4</span>
          <span className="ptimgtens-x"> × </span>
          <span className="ptimgtens-dim" style={{ color: '#56d364' }}>4</span>
          <span className="ptimgtens-x">  =  </span>
          <span className="ptimgtens-dim" style={{ color: '#f97316' }}>tensor(3, 4, 4)</span>
        </span>
        <span className="ptimgtens-sub">(C × H × W)</span>
      </div>

      <div className="ptimgtens-vis">
        <div className="ptimgtens-combined">
          <div className="ptimgtens-ch-label">RGB Image</div>
          <div className="ptimgtens-grid-box">
            <MiniGrid colors={combined} dim={active !== null} />
          </div>
        </div>

        <div className="ptimgtens-decompose">
          <svg width="36" height="20" viewBox="0 0 36 20">
            <path d="M0 10 H28 L20 4 M28 10 L20 16" stroke="#f97316" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="ptimgtens-channels">
          {CHANNELS.map((ch, i) => (
            <div
              key={ch.id}
              className={`ptimgtens-channel ${active === i ? 'ptimgtens-ch-active' : ''}`}
              style={{ '--chc': ch.color }}
              onClick={() => setActive(active === i ? null : i)}
            >
              <div className="ptimgtens-ch-header">
                <span className="ptimgtens-ch-id" style={{ color: ch.color }}>{ch.id}</span>
                <span className="ptimgtens-ch-name">{ch.label} channel</span>
              </div>
              <MiniGrid colors={ch.grid} dim={active !== null && active !== i} />
              <div className="ptimgtens-ch-shape">[4 × 4]</div>
            </div>
          ))}
        </div>
      </div>

      <div className="ptimgtens-toggle-hint">Click a channel to highlight it</div>

      <div className="ptimgtens-code-row">
        <pre className="ptimgtens-code">{`img_tensor = transforms.ToTensor()(pil_img)
# Shape: torch.Size([3, 64, 64])
# Values: float32, range [0.0, 1.0]`}</pre>
      </div>
    </div>
  );
}
