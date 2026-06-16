import { useState } from "react";
import "./visual.css";

const LAYERS = [
  { label: "Input", nodes: 4, x: 80 },
  { label: "Hidden", nodes: 4, x: 240 },
  { label: "Output", nodes: 2, x: 400 },
];
const COLORS = { Input: "#58a6ff", Hidden: "#a78bfa", Output: "#56d364" };
const NODE_R = 18;
const H = 260;

function nodeY(idx, total) {
  const spacing = H / (total + 1);
  return spacing * (idx + 1);
}

const INFO = {
  Input: { title: "Input Layer", text: "Receives raw data — pixels, numbers, or word embeddings. Each node represents one feature of your input." },
  Hidden: { title: "Hidden Layer", text: "Learns abstract representations. Weights and biases here transform inputs into meaningful patterns." },
  Output: { title: "Output Layer", text: "Produces the final prediction — a class probability or regression value." },
  default: { title: "Neural Network", text: "Click any node to learn what that layer does. Connections carry weighted signals forward through the network." },
};

export default function NnWhatIsVisualization() {
  const [active, setActive] = useState(null);

  const info = active ? (INFO[active.layer] || INFO.default) : INFO.default;

  return (
    <div className="nnwhat-wrap">
      <div className="nnwhat-title">What Is a Neural Network?</div>
      <div className="nnwhat-subtitle">Click any node to explore each layer's role</div>

      <div className="nnwhat-svg-wrap">
        <svg viewBox="0 0 480 260" width="100%" style={{ maxWidth: 480 }}>
          {LAYERS.slice(0, -1).map((layer, li) => {
            const next = LAYERS[li + 1];
            return layer.nodes > 0 && Array.from({ length: layer.nodes }).map((_, i) =>
              Array.from({ length: next.nodes }).map((_, j) => {
                const isActive = active && (active.layer === layer.label || active.layer === next.label);
                return (
                  <line key={`${li}-${i}-${j}`}
                    x1={layer.x} y1={nodeY(i, layer.nodes)}
                    x2={next.x} y2={nodeY(j, next.nodes)}
                    stroke={isActive ? "#a78bfa" : "#30363d"}
                    strokeWidth={isActive ? 1.5 : 0.8}
                    strokeOpacity={isActive ? 0.8 : 0.5}
                  />
                );
              })
            );
          })}

          {LAYERS.map((layer) =>
            Array.from({ length: layer.nodes }).map((_, i) => {
              const y = nodeY(i, layer.nodes);
              const isActive = active && active.layer === layer.label && active.idx === i;
              return (
                <g key={`${layer.label}-${i}`} onClick={() => setActive(isActive ? null : { layer: layer.label, idx: i })} style={{ cursor: "pointer" }}>
                  <circle cx={layer.x} cy={y} r={NODE_R + 4} fill="transparent" />
                  <circle cx={layer.x} cy={y} r={NODE_R}
                    fill={isActive ? COLORS[layer.label] : "#161b22"}
                    stroke={COLORS[layer.label]}
                    strokeWidth={isActive ? 2.5 : 1.5}
                  />
                  {isActive && <circle cx={layer.x} cy={y} r={NODE_R + 6} fill="none" stroke={COLORS[layer.label]} strokeWidth={1} strokeOpacity={0.4} />}
                </g>
              );
            })
          )}

          {LAYERS.map((layer) => (
            <text key={layer.label} x={layer.x} y={H + 20} textAnchor="middle" fontSize={11} fill={COLORS[layer.label]} fontWeight="600">
              {layer.label}
            </text>
          ))}
          {LAYERS.map((layer) => (
            <text key={`${layer.label}-n`} x={layer.x} y={H + 34} textAnchor="middle" fontSize={10} fill="#6b7785">
              {layer.nodes} nodes
            </text>
          ))}
        </svg>
      </div>

      <div className="nnwhat-info">
        <div className="nnwhat-info-title">{info.title}</div>
        <div className="nnwhat-info-text">{info.text}</div>
      </div>

      <div className="nnwhat-legend">
        {Object.entries(COLORS).map(([k, v]) => (
          <div key={k} className="nnwhat-legend-item">
            <div className="nnwhat-legend-dot" style={{ background: v }} />
            {k} Layer
          </div>
        ))}
      </div>
      <div className="nnwhat-hint">Tap a node to highlight its connections</div>
    </div>
  );
}
