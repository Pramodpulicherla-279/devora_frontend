import { useState } from "react";
import "./visual.css";

const metrics = {
  without: { accuracy: 62, precision: 58, recall: 61, f1: 59 },
  with: { accuracy: 89, precision: 87, recall: 91, f1: 89 },
};

export default function FeWhatIsVisualization() {
  const [active, setActive] = useState("without");

  return (
    <div className="fewhat-wrap">
      <h3 className="fewhat-title">Feature Engineering Pipeline</h3>

      <div className="fewhat-flow">
        {["Raw Data", "Feature Engineering", "Better Features", "Model"].map((step, i) => (
          <div key={step} className="fewhat-flow-row">
            <div className={`fewhat-box ${i === 1 ? "fewhat-box--accent" : ""}`}>{step}</div>
            {i < 3 && (
              <svg className="fewhat-arrow" viewBox="0 0 40 20" width="40" height="20">
                <path d="M0 10 H32 M26 4 L36 10 L26 16" stroke="#f97316" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        ))}
      </div>

      <div className="fewhat-toggle">
        <button className={`fewhat-btn ${active === "without" ? "fewhat-btn--on" : ""}`} onClick={() => setActive("without")}>Without FE</button>
        <button className={`fewhat-btn ${active === "with" ? "fewhat-btn--on" : ""}`} onClick={() => setActive("with")}>With FE</button>
      </div>

      <div className="fewhat-metrics">
        {Object.entries(metrics[active]).map(([key, val]) => (
          <div className="fewhat-metric" key={key}>
            <div className="fewhat-metric-label">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
            <div className="fewhat-bar-track">
              <div
                className="fewhat-bar-fill"
                style={{ width: `${val}%`, background: active === "with" ? "#56d364" : "#6b7785" }}
              />
            </div>
            <div className="fewhat-metric-val">{val}%</div>
          </div>
        ))}
      </div>

      <p className="fewhat-note">
        {active === "with"
          ? "Good features unlock model potential — accuracy jumps from 62% to 89%."
          : "Raw data fed directly into the model underperforms significantly."}
      </p>
    </div>
  );
}
