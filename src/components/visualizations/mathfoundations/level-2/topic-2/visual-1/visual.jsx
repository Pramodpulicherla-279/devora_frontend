import './visual.css';

const GRID = 7;
const CELL = 36;

function loss(x, y) {
  return (x - 3) ** 2 + (y - 3) ** 2;
}

const maxLoss = loss(0, 0);

function heatColor(v) {
  const t = Math.min(1, v / maxLoss);
  const r = Math.round(t * 90);
  const g = Math.round((1 - t) * 40 + 10);
  const b = Math.round((1 - t) * 80 + 30);
  return `rgb(${r},${g},${b})`;
}

export default function MfGradientsVisualization() {
  const cells = [];
  for (let r = 0; r < GRID; r++) {
    for (let c = 0; c < GRID; c++) {
      cells.push({ r, c, v: loss(c, r) });
    }
  }

  const W = GRID * CELL + 2;
  const H = GRID * CELL + 2;

  return (
    <div className="mfgrad-root">
      <h3 className="mfgrad-title">Loss Surface & Gradient</h3>
      <div className="mfgrad-body">
        <svg width={W} height={H} className="mfgrad-svg">
          {cells.map(({ r, c, v }) => (
            <rect key={`${r}-${c}`}
              x={c * CELL + 1} y={r * CELL + 1}
              width={CELL - 1} height={CELL - 1}
              fill={heatColor(v)} rx="2" />
          ))}
          {cells.map(({ r, c }) => {
            if (r === 0 || c === 0 || r === GRID - 1 || c === GRID - 1) return null;
            const dx = loss(c + 0.5, r) - loss(c - 0.5, r);
            const dy = loss(c, r + 0.5) - loss(c, r - 0.5);
            const len = Math.sqrt(dx * dx + dy * dy);
            const norm = 10 / (len + 0.01);
            const cx = c * CELL + CELL / 2 + 1;
            const cy = r * CELL + CELL / 2 + 1;
            const ex = cx + dx * norm;
            const ey = cy + dy * norm;
            return (
              <g key={`arr-${r}-${c}`}>
                <line x1={cx} y1={cy} x2={ex} y2={ey} stroke="#58a6ff" strokeWidth="1.2" />
                <circle cx={ex} cy={ey} r="2" fill="#58a6ff" />
              </g>
            );
          })}
          <circle cx={3 * CELL + CELL / 2 + 1} cy={3 * CELL + CELL / 2 + 1} r="5"
            fill="#56d364" stroke="#0d1117" strokeWidth="1.5" />
        </svg>

        <div className="mfgrad-legend">
          <div className="mfgrad-legend-item">
            <span className="mfgrad-dot" style={{ background: 'rgb(5,40,80)' }} /> Low loss (minimum)
          </div>
          <div className="mfgrad-legend-item">
            <span className="mfgrad-dot" style={{ background: 'rgb(90,15,30)' }} /> High loss
          </div>
          <div className="mfgrad-legend-item">
            <span className="mfgrad-dot" style={{ background: '#58a6ff' }} /> Gradient arrows (uphill)
          </div>
          <div className="mfgrad-legend-item">
            <span className="mfgrad-dot" style={{ background: '#56d364' }} /> Global minimum
          </div>
          <div className="mfgrad-note">
            The gradient ∇L points in the direction of steepest ascent.
            Gradient descent moves <em>opposite</em> to it.
          </div>
        </div>
      </div>
    </div>
  );
}
