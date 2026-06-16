import { useState } from "react";
import "./visual.css";

const initialCells = { tp: 50, fp: 10, fn: 5, tn: 35 };

const cellInfo = {
  tp: { label: "True Positive", color: "#56d364", desc: "Model said YES, actually YES" },
  fp: { label: "False Positive", color: "#f97316", desc: "Model said YES, actually NO (Type I)" },
  fn: { label: "False Negative", color: "#a78bfa", desc: "Model said NO, actually YES (Type II)" },
  tn: { label: "True Negative", color: "#58a6ff", desc: "Model said NO, actually NO" },
};

export default function SvConfMatrixVisualization() {
  const [cells, setCells] = useState(initialCells);
  const [selected, setSelected] = useState(null);

  const { tp, fp, fn, tn } = cells;
  const precision = tp + fp > 0 ? (tp / (tp + fp)).toFixed(3) : "N/A";
  const recall = tp + fn > 0 ? (tp / (tp + fn)).toFixed(3) : "N/A";
  const f1 = precision !== "N/A" && recall !== "N/A"
    ? (2 * parseFloat(precision) * parseFloat(recall) / (parseFloat(precision) + parseFloat(recall))).toFixed(3)
    : "N/A";
  const accuracy = ((tp + tn) / (tp + fp + fn + tn)).toFixed(3);

  const update = (key, val) => {
    const n = Math.max(0, Math.min(99, parseInt(val) || 0));
    setCells(c => ({ ...c, [key]: n }));
  };

  return (
    <div className="svconf-wrap">
      <h2 className="svconf-title">Confusion Matrix</h2>
      <div className="svconf-layout">
        <div className="svconf-matrix-area">
          <div className="svconf-axis-label svconf-axis-y">Actual</div>
          <div className="svconf-matrix-block">
            <div className="svconf-axis-label svconf-axis-x">Predicted →</div>
            <div className="svconf-matrix">
              {["tp","fp","fn","tn"].map(k => (
                <div key={k}
                  className={`svconf-cell ${selected === k ? "svconf-cell--selected" : ""}`}
                  style={{borderColor: selected === k ? cellInfo[k].color : "#21262d"}}
                  onClick={() => setSelected(selected === k ? null : k)}>
                  <span className="svconf-cell-key" style={{color: cellInfo[k].color}}>{k.toUpperCase()}</span>
                  <input className="svconf-cell-input" type="number" value={cells[k]} min="0" max="99"
                    onChange={e => update(k, e.target.value)} onClick={e => e.stopPropagation()}/>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="svconf-right">
          {selected && (
            <div className="svconf-info-box" style={{borderColor: cellInfo[selected].color}}>
              <div className="svconf-info-key" style={{color: cellInfo[selected].color}}>{cellInfo[selected].label}</div>
              <div className="svconf-info-desc">{cellInfo[selected].desc}</div>
            </div>
          )}
          <div className="svconf-derived">
            {[
              {l:"Precision", v:precision, c:"#a78bfa", f:"TP / (TP+FP)"},
              {l:"Recall", v:recall, c:"#f97316", f:"TP / (TP+FN)"},
              {l:"F1 Score", v:f1, c:"#56d364", f:"2·P·R / (P+R)"},
              {l:"Accuracy", v:accuracy, c:"#58a6ff", f:"(TP+TN) / All"},
            ].map(d => (
              <div key={d.l} className="svconf-metric">
                <div>
                  <div className="svconf-metric-label" style={{color:d.c}}>{d.l}</div>
                  <div className="svconf-metric-formula">{d.f}</div>
                </div>
                <div className="svconf-metric-val" style={{color:d.c}}>{d.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="svconf-hint">Click a cell to learn what it means. Edit values to see metrics update live.</p>
    </div>
  );
}
