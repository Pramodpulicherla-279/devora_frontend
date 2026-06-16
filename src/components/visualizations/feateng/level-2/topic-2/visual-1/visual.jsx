import { useState } from "react";
import "./visual.css";

const rows = [
  { A: 2, B: 5 }, { A: 4, B: 3 }, { A: 1, B: 8 }, { A: 6, B: 2 }, { A: 3, B: 7 },
];

const ops = [
  { key: "mul", label: "A × B", fn: (a, b) => +(a * b).toFixed(2), color: "#f97316" },
  { key: "div", label: "A / B", fn: (a, b) => +(a / b).toFixed(2), color: "#58a6ff" },
  { key: "sub", label: "A − B", fn: (a, b) => +(a - b).toFixed(2), color: "#56d364" },
  { key: "sum", label: "A + B", fn: (a, b) => +(a + b).toFixed(2), color: "#a78bfa" },
];

export default function FeInteractionVisualization() {
  const [active, setActive] = useState("mul");
  const op = ops.find(o => o.key === active);

  return (
    <div className="feinteract-wrap">
      <h3 className="feinteract-title">Interaction Features</h3>

      <div className="feinteract-tabs">
        {ops.map(o => (
          <button key={o.key} className={`feinteract-tab ${active === o.key ? "feinteract-tab--on" : ""}`}
            style={active === o.key ? { borderColor: o.color, color: o.color } : {}}
            onClick={() => setActive(o.key)}>{o.label}</button>
        ))}
      </div>

      <div className="feinteract-table-wrap">
        <table className="feinteract-table">
          <thead>
            <tr>
              <th>A</th>
              <th>B</th>
              <th className="feinteract-new-col" style={{ color: op.color }}>{op.label}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td className="feinteract-td-a">{r.A}</td>
                <td className="feinteract-td-b">{r.B}</td>
                <td className="feinteract-td-new" style={{ color: op.color }}>{op.fn(r.A, r.B)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="feinteract-info">
        <div className="feinteract-info-block">
          <span className="feinteract-info-label">New feature</span>
          <code className="feinteract-code" style={{ color: op.color }}>{op.label}</code>
        </div>
        <div className="feinteract-info-block">
          <span className="feinteract-info-label">Values range</span>
          <span className="feinteract-info-val">{Math.min(...rows.map(r => op.fn(r.A, r.B)))} – {Math.max(...rows.map(r => op.fn(r.A, r.B)))}</span>
        </div>
      </div>

      <p className="feinteract-note">
        Interaction features capture relationships between variables that individual features miss — often critical for tree models.
      </p>
    </div>
  );
}
