import { useState } from "react";
import "./visual.css";

const features = [
  { name: "age",        corr: 0.62, imp: 0.18, rfe: true  },
  { name: "salary",     corr: 0.81, imp: 0.32, rfe: true  },
  { name: "city_enc",   corr: 0.21, imp: 0.07, rfe: false },
  { name: "exp_years",  corr: 0.74, imp: 0.25, rfe: true  },
  { name: "score",      corr: 0.11, imp: 0.03, rfe: false },
  { name: "dept_enc",   corr: 0.55, imp: 0.15, rfe: true  },
];

const methods = {
  filter: { label: "Filter (Correlation)", note: "Keep features with |r| > 0.5 with target." },
  rfe: { label: "Wrapper (RFE)", note: "Recursive Feature Elimination picks top features by model performance." },
  embedded: { label: "Embedded (Importance)", note: "Tree model assigns importance scores; low-importance features dropped." },
};

export default function FeSelectionVisualization() {
  const [method, setMethod] = useState("filter");

  const selected = features.filter(f => {
    if (method === "filter") return f.corr >= 0.5;
    if (method === "rfe") return f.rfe;
    return f.imp >= 0.1;
  });

  return (
    <div className="fesel-wrap">
      <h3 className="fesel-title">Feature Selection</h3>

      <div className="fesel-tabs">
        {Object.entries(methods).map(([k, v]) => (
          <button key={k} className={`fesel-tab ${method === k ? "fesel-tab--on" : ""}`} onClick={() => setMethod(k)}>{v.label}</button>
        ))}
      </div>

      <div className="fesel-features">
        {features.map(f => {
          const keep = method === "filter" ? f.corr >= 0.5 : method === "rfe" ? f.rfe : f.imp >= 0.1;
          const val = method === "filter" ? f.corr : method === "embedded" ? f.imp : null;
          const barW = method === "filter" ? f.corr * 100 : method === "embedded" ? f.imp * 300 : (f.rfe ? 100 : 30);
          return (
            <div key={f.name} className={`fesel-row ${!keep ? "fesel-row--drop" : ""}`}>
              <div className="fesel-name">{f.name}</div>
              <div className="fesel-bar-track">
                <div className="fesel-bar" style={{ width: `${Math.min(barW, 100)}%`, background: keep ? "#56d364" : "#30363d" }} />
              </div>
              {val !== null && <div className="fesel-val" style={{ color: keep ? "#56d364" : "#6b7785" }}>{val}</div>}
              <div className={`fesel-status ${keep ? "fesel-status--keep" : "fesel-status--drop"}`}>{keep ? "✓" : "✗"}</div>
            </div>
          );
        })}
      </div>

      <div className="fesel-summary">
        <span className="fesel-sum-keep">{selected.length} kept</span>
        <span className="fesel-sum-drop">{features.length - selected.length} dropped</span>
      </div>

      <p className="fesel-note">{methods[method].note}</p>
    </div>
  );
}
