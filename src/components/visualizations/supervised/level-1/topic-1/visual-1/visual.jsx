import { useState } from "react";
import "./visual.css";

const tabs = ["Supervised", "Unsupervised", "Reinforcement"];

const flows = {
  Supervised: {
    steps: ["Labeled Data", "Model Training", "Prediction"],
    colors: ["#56d364", "#58a6ff", "#a78bfa"],
    desc: "Learn from labeled examples — every input has a known output.",
    examples: ["Spam detection", "House price prediction", "Image classification"],
  },
  Unsupervised: {
    steps: ["Unlabeled Data", "Pattern Discovery", "Clusters / Structure"],
    colors: ["#f97316", "#58a6ff", "#a78bfa"],
    desc: "Find hidden patterns in data with no predefined labels.",
    examples: ["Customer segmentation", "Anomaly detection", "Topic modeling"],
  },
  Reinforcement: {
    steps: ["Environment", "Agent Action", "Reward Signal"],
    colors: ["#a78bfa", "#58a6ff", "#56d364"],
    desc: "Learn by trial and error — maximize cumulative reward over time.",
    examples: ["Game-playing AI", "Robot navigation", "Recommendation systems"],
  },
};

export default function SvWhatIsVisualization() {
  const [active, setActive] = useState("Supervised");
  const flow = flows[active];

  return (
    <div className="svwhat-wrap">
      <h2 className="svwhat-title">Types of Machine Learning</h2>
      <div className="svwhat-tabs">
        {tabs.map((t) => (
          <button
            key={t}
            className={`svwhat-tab ${active === t ? "svwhat-tab--active" : ""}`}
            onClick={() => setActive(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="svwhat-flow">
        {flow.steps.map((step, i) => (
          <div key={i} className="svwhat-flow-row">
            <div className="svwhat-node" style={{ borderColor: flow.colors[i] }}>
              <span className="svwhat-node-label" style={{ color: flow.colors[i] }}>{step}</span>
            </div>
            {i < flow.steps.length - 1 && (
              <div className="svwhat-arrow">▼</div>
            )}
          </div>
        ))}
      </div>

      <p className="svwhat-desc">{flow.desc}</p>

      <div className="svwhat-examples">
        <span className="svwhat-examples-title">Examples:</span>
        {flow.examples.map((ex, i) => (
          <span key={i} className="svwhat-badge">{ex}</span>
        ))}
      </div>

      {active === "Supervised" && (
        <div className="svwhat-detail">
          <svg viewBox="0 0 320 80" className="svwhat-svg">
            <rect x="4" y="20" width="80" height="40" rx="8" fill="#161b22" stroke="#56d364" strokeWidth="1.5"/>
            <text x="44" y="36" textAnchor="middle" fill="#56d364" fontSize="9" fontWeight="600">Input</text>
            <text x="44" y="50" textAnchor="middle" fill="#a3adbb" fontSize="8">House size, rooms</text>
            <text x="104" y="42" fill="#6b7785" fontSize="16">→</text>
            <rect x="120" y="20" width="80" height="40" rx="8" fill="#161b22" stroke="#58a6ff" strokeWidth="1.5"/>
            <text x="160" y="36" textAnchor="middle" fill="#58a6ff" fontSize="9" fontWeight="600">Model</text>
            <text x="160" y="50" textAnchor="middle" fill="#a3adbb" fontSize="8">Linear Regression</text>
            <text x="210" y="42" fill="#6b7785" fontSize="16">→</text>
            <rect x="228" y="20" width="88" height="40" rx="8" fill="#161b22" stroke="#a78bfa" strokeWidth="1.5"/>
            <text x="272" y="36" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="600">Output</text>
            <text x="272" y="50" textAnchor="middle" fill="#a3adbb" fontSize="8">$450,000</text>
          </svg>
        </div>
      )}
    </div>
  );
}
