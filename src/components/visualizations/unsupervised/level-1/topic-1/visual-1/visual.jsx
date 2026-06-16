import { useState } from "react";
import "./visual.css";

const TABS = ["Clustering", "Dimensionality Reduction", "Anomaly Detection"];

const UNSUPERVISED_POINTS = [
  {x:60,y:50},{x:80,y:60},{x:70,y:80},{x:90,y:45},{x:65,y:70},
  {x:200,y:55},{x:220,y:70},{x:210,y:40},{x:230,y:60},{x:195,y:75},
  {x:140,y:140},{x:160,y:155},{x:150,y:130},{x:170,y:148},{x:135,y:160},
];

const CLUSTER_COLORS = ["#818cf8","#56d364","#f97316"];
const CLUSTER_ASSIGN = [0,0,0,0,0,1,1,1,1,1,2,2,2,2,2];

const SUPERVISED_POINTS = [
  {x:60,y:50,label:"Cat"},{x:80,y:60,label:"Cat"},{x:70,y:80,label:"Cat"},
  {x:200,y:55,label:"Dog"},{x:220,y:70,label:"Dog"},{x:210,y:40,label:"Dog"},
  {x:140,y:140,label:"Bird"},{x:160,y:155,label:"Bird"},{x:150,y:130,label:"Bird"},
];

const tabDescriptions = {
  "Clustering": "Groups similar data points together without predefined labels. The model discovers natural groupings.",
  "Dimensionality Reduction": "Compresses high-dimensional data into fewer dimensions while preserving structure and variance.",
  "Anomaly Detection": "Identifies rare data points that deviate significantly from the normal pattern.",
};

export default function UnsupWhatIsVisualization() {
  const [activeTab, setActiveTab] = useState("Clustering");
  const [showLabels, setShowLabels] = useState(false);

  return (
    <div className="unsupwhat-wrap">
      <div className="unsupwhat-header">
        <h3 className="unsupwhat-title">Unsupervised vs Supervised Learning</h3>
        <button className="unsupwhat-toggle" onClick={() => setShowLabels(v => !v)}>
          {showLabels ? "Hide Labels (Unsupervised)" : "Show Labels (Supervised)"}
        </button>
      </div>

      <div className="unsupwhat-compare">
        <div className="unsupwhat-panel">
          <div className="unsupwhat-panel-label">{showLabels ? "Supervised" : "Unsupervised"}</div>
          <svg viewBox="0 0 290 210" className="unsupwhat-svg">
            {showLabels
              ? SUPERVISED_POINTS.map((p,i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r={7} fill={CLUSTER_COLORS[Math.floor(i/3)]} opacity={0.85}/>
                  <text x={p.x+10} y={p.y+4} fill="#e6edf3" fontSize={9}>{p.label}</text>
                </g>
              ))
              : UNSUPERVISED_POINTS.map((p,i) => (
                <circle key={i} cx={p.x} cy={p.y} r={7} fill="#a3adbb" opacity={0.7}/>
              ))
            }
          </svg>
          <p className="unsupwhat-caption">
            {showLabels ? "Points have predefined category labels." : "Points have no labels — structure must be discovered."}
          </p>
        </div>
      </div>

      <div className="unsupwhat-tabs">
        {TABS.map(t => (
          <button key={t} className={`unsupwhat-tab ${activeTab===t?"unsupwhat-tab--active":""}`} onClick={() => setActiveTab(t)}>{t}</button>
        ))}
      </div>

      <div className="unsupwhat-tab-content">
        <div className="unsupwhat-tab-desc">{tabDescriptions[activeTab]}</div>
        {activeTab === "Clustering" && (
          <svg viewBox="0 0 290 150" className="unsupwhat-svg">
            {UNSUPERVISED_POINTS.map((p,i) => (
              <circle key={i} cx={p.x} cy={p.y} r={7} fill={CLUSTER_COLORS[CLUSTER_ASSIGN[i]]} opacity={0.85}/>
            ))}
            {[[75,65],[212,58],[150,147]].map((c,i) => (
              <circle key={i} cx={c[0]} cy={c[1]} r={12} fill="none" stroke={CLUSTER_COLORS[i]} strokeWidth={2} strokeDasharray="4,2"/>
            ))}
          </svg>
        )}
        {activeTab === "Dimensionality Reduction" && (
          <svg viewBox="0 0 290 150" className="unsupwhat-svg">
            {UNSUPERVISED_POINTS.map((p,i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r={5} fill="#818cf8" opacity={0.5}/>
                <line x1={p.x} y1={p.y} x2={p.x} y2={130} stroke="#818cf8" strokeWidth={0.8} opacity={0.3}/>
                <circle cx={p.x} cy={130} r={4} fill="#818cf8" opacity={0.9}/>
              </g>
            ))}
            <line x1={40} y1={130} x2={260} y2={130} stroke="#30363d" strokeWidth={1.5}/>
            <text x={145} y={148} textAnchor="middle" fill="#6b7785" fontSize={9}>1D projection (PC1)</text>
          </svg>
        )}
        {activeTab === "Anomaly Detection" && (
          <svg viewBox="0 0 290 150" className="unsupwhat-svg">
            {UNSUPERVISED_POINTS.map((p,i) => (
              <circle key={i} cx={p.x} cy={p.y} r={6} fill="#56d364" opacity={0.8}/>
            ))}
            <circle cx={145} cy={30} r={8} fill="#f97316"/>
            <circle cx={20} cy={100} r={8} fill="#f97316"/>
            <text x={153} y={27} fill="#f97316" fontSize={9}>anomaly</text>
            <text x={28} y={97} fill="#f97316" fontSize={9}>anomaly</text>
          </svg>
        )}
      </div>
    </div>
  );
}
