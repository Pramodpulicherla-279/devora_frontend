import { useState } from "react";
import "./visual.css";

const EPOCHS = 30;
const lossData = Array.from({ length: EPOCHS }, (_, i) => {
  const t = i / (EPOCHS - 1);
  return 2.4 * Math.exp(-3.5 * t) + 0.08 + (Math.random() * 0.04 - 0.02) * (1 - t);
}).map((v, i, arr) => i === 0 ? v : Math.min(arr[i - 1], v + 0.02));

const W = 260, H = 140, PX = 30, PY = 14;

function LAYERS_INFO() {
  return [
    { name: "init_weights()", code: "W1 = np.random.randn(4, 2) * 0.01\nb1 = np.zeros((4, 1))" },
    { name: "forward(X)", code: "Z1 = W1 @ X + b1\nA1 = relu(Z1)\nZ2 = W2 @ A1 + b2\nA2 = sigmoid(Z2)" },
    { name: "compute_loss()", code: "L = -np.mean(Y*np.log(A2)\n        + (1-Y)*np.log(1-A2))" },
    { name: "backward()", code: "dZ2 = A2 - Y\ndW2 = dZ2 @ A1.T / m\ndZ1 = W2.T @ dZ2 * drelu(Z1)\ndW1 = dZ1 @ X.T / m" },
    { name: "update()", code: "W1 -= lr * dW1\nW2 -= lr * dW2\nb1 -= lr * db1\nb2 -= lr * db2" },
  ];
}

export default function NnScratchVisualization() {
  const [open, setOpen] = useState(null);
  const layers = LAYERS_INFO();
  const maxL = Math.max(...lossData);
  const minL = Math.min(...lossData);

  const pts = lossData.map((v, i) => {
    const x = PX + (i / (EPOCHS - 1)) * (W - 2 * PX);
    const y = H - PY - ((v - minL) / (maxL - minL)) * (H - 2 * PY);
    return `${x},${y}`;
  }).join(" L");

  return (
    <div className="nnscratch-wrap">
      <div className="nnscratch-title">Neural Network from Scratch with NumPy</div>
      <div className="nnscratch-subtitle">Training loss curve and code structure breakdown</div>
      <div className="nnscratch-grid">
        <div className="nnscratch-svg-box">
          <svg viewBox={`0 0 ${W} ${H}`} width="100%">
            <text x={W / 2} y={10} textAnchor="middle" fontSize={9} fill="#a78bfa" fontWeight="600">Training Loss</text>
            <line x1={PX} y1={PY + 10} x2={PX} y2={H - PY} stroke="#30363d" strokeWidth={1} />
            <line x1={PX} y1={H - PY} x2={W - PX} y2={H - PY} stroke="#30363d" strokeWidth={1} />
            {[0, 0.5, 1, 1.5, 2].map((v, i) => (
              <text key={i} x={PX - 3} y={H - PY - ((v - minL) / (maxL - minL)) * (H - 2 * PY - 10) + 3} fontSize={7} fill="#6b7785" textAnchor="end">{v.toFixed(1)}</text>
            ))}
            <polyline points={pts} fill="none" stroke="#a78bfa" strokeWidth={2} />
            {lossData.map((v, i) => {
              if (i % 5 !== 0) return null;
              const x = PX + (i / (EPOCHS - 1)) * (W - 2 * PX);
              const y = H - PY - ((v - minL) / (maxL - minL)) * (H - 2 * PY);
              return <circle key={i} cx={x} cy={y} r={2.5} fill="#a78bfa" />;
            })}
            <text x={W / 2} y={H - 2} textAnchor="middle" fontSize={8} fill="#6b7785">Epoch</text>
            <text x={W - PX} y={H - PY - ((lossData[EPOCHS - 1] - minL) / (maxL - minL)) * (H - 2 * PY) - 6} fontSize={8} fill="#56d364" textAnchor="end">Converged</text>
          </svg>
          <div className="nnscratch-epoch">Final loss ≈ {lossData[EPOCHS - 1].toFixed(3)} after {EPOCHS} epochs</div>
        </div>

        <div className="nnscratch-layers">
          {layers.map((l, i) => (
            <div key={i} className="nnscratch-layer">
              <div className="nnscratch-layer-header" onClick={() => setOpen(open === i ? null : i)}>
                <span className="nnscratch-layer-name">{l.name}</span>
                <span className={`nnscratch-layer-arrow${open === i ? " open" : ""}`}>▶</span>
              </div>
              {open === i && <div className="nnscratch-layer-body"><pre style={{ margin: 0 }}>{l.code}</pre></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
