import { useState } from "react";
import "./visual.css";

const scenarios = {
  balanced: {
    label: "Balanced Dataset",
    accuracy: "91%", precision: "0.90", recall: "0.92", f1: "0.91",
    tp: 92, fp: 8, fn: 10, tn: 90,
    note: "All metrics agree — the dataset is balanced so accuracy is meaningful.",
  },
  imbalanced: {
    label: "Imbalanced Dataset (99% negative)",
    accuracy: "99%", precision: "0.50", recall: "0.10", f1: "0.17",
    tp: 1, fp: 1, fn: 9, tn: 989,
    note: "Accuracy looks great but F1 is 0.17 — the model misses almost all positives!",
  },
};

const metrics = [
  { key: "accuracy", label: "Accuracy", color: "#58a6ff" },
  { key: "precision", label: "Precision", color: "#a78bfa" },
  { key: "recall", label: "Recall", color: "#f97316" },
  { key: "f1", label: "F1 Score", color: "#56d364" },
];

export default function SvClassEvalVisualization() {
  const [scene, setScene] = useState("balanced");
  const s = scenarios[scene];

  return (
    <div className="svclseval-wrap">
      <h2 className="svclseval-title">Evaluating Classifiers</h2>
      <div className="svclseval-tabs">
        {Object.entries(scenarios).map(([k, v]) => (
          <button key={k} className={`svclseval-tab ${scene === k ? "svclseval-tab--active" : ""}`}
            onClick={() => setScene(k)}>
            {v.label}
          </button>
        ))}
      </div>

      <div className="svclseval-metrics">
        {metrics.map(m => (
          <div key={m.key} className="svclseval-card" style={{borderColor: m.color}}>
            <div className="svclseval-card-label" style={{color: m.color}}>{m.label}</div>
            <div className="svclseval-card-val" style={{color: m.color}}>{s[m.key]}</div>
          </div>
        ))}
      </div>

      <div className="svclseval-mini-conf">
        <div className="svclseval-conf-title">Quick Confusion Matrix</div>
        <div className="svclseval-conf-grid">
          {[
            {lbl:"TP", v:s.tp, color:"#56d364"},
            {lbl:"FP", v:s.fp, color:"#f97316"},
            {lbl:"FN", v:s.fn, color:"#a78bfa"},
            {lbl:"TN", v:s.tn, color:"#58a6ff"},
          ].map(c => (
            <div key={c.lbl} className="svclseval-conf-cell" style={{borderColor: c.color}}>
              <span className="svclseval-conf-lbl" style={{color: c.color}}>{c.lbl}</span>
              <span className="svclseval-conf-val">{c.v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`svclseval-note ${scene === "imbalanced" ? "svclseval-note--warn" : ""}`}>
        {s.note}
      </div>
    </div>
  );
}
