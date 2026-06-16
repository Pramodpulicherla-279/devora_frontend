import { useState } from "react";
import "./visual.css";

const W = 300, H = 220, P = 28;

const classColors = ["#56d364", "#a78bfa", "#f97316"];
const trainPoints = [
  {x:1.2,y:3.5,c:0},{x:1.8,y:4.2,c:0},{x:2.1,y:3.0,c:0},{x:2.5,y:4.8,c:0},
  {x:5.5,y:6.8,c:1},{x:6.0,y:5.5,c:1},{x:5.8,y:7.2,c:1},{x:6.5,y:6.0,c:1},
  {x:3.8,y:1.2,c:2},{x:4.5,y:1.8,c:2},{x:3.2,y:1.5,c:2},{x:4.2,y:2.2,c:2},
];

const queryPt = {x:4.0, y:4.0};

function dist(a, b) {
  return Math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2);
}

function toSx(x) { return P + ((x - 0) / 8) * (W - 2 * P); }
function toSy(y) { return H - P - ((y - 0) / 9) * (H - 2 * P); }

export default function SvKnnVisualization() {
  const [k, setK] = useState(3);

  const dists = trainPoints.map((p, i) => ({ ...p, i, d: dist(p, queryPt) }))
    .sort((a, b) => a.d - b.d);
  const neighbors = dists.slice(0, k);

  const votes = [0, 0, 0];
  neighbors.forEach(n => votes[n.c]++);
  const predicted = votes.indexOf(Math.max(...votes));

  const labels = ["Class A", "Class B", "Class C"];

  return (
    <div className="svknn-wrap">
      <h2 className="svknn-title">k-Nearest Neighbors</h2>

      <svg viewBox={`0 0 ${W} ${H}`} className="svknn-svg">
        <line x1={P} y1={P} x2={P} y2={H-P} stroke="#30363d" strokeWidth="1"/>
        <line x1={P} y1={H-P} x2={W-P} y2={H-P} stroke="#30363d" strokeWidth="1"/>

        {neighbors.map((n, i) => (
          <line key={i}
            x1={toSx(queryPt.x)} y1={toSy(queryPt.y)}
            x2={toSx(n.x)} y2={toSy(n.y)}
            stroke="#6b7785" strokeWidth="1" strokeDasharray="3 2" opacity="0.6"/>
        ))}

        {trainPoints.map((p, i) => {
          const isNeighbor = neighbors.some(n => n.i === i);
          return (
            <circle key={i}
              cx={toSx(p.x)} cy={toSy(p.y)} r={isNeighbor ? 7 : 5}
              fill={classColors[p.c]} stroke={isNeighbor ? "#fff" : "none"} strokeWidth="1.5"
              opacity={isNeighbor ? 1 : 0.5}/>
          );
        })}

        <circle cx={toSx(queryPt.x)} cy={toSy(queryPt.y)} r="8"
          fill={classColors[predicted]} stroke="#fff" strokeWidth="2.5" opacity="0.9"/>
        <text x={toSx(queryPt.x)} y={toSy(queryPt.y)-12} textAnchor="middle"
          fill="#e6edf3" fontSize="8" fontWeight="600">?</text>
      </svg>

      <label className="svknn-label">
        k (neighbors): <strong style={{color:"#58a6ff"}}>{k}</strong>
        <input type="range" min="1" max="7" step="1" value={k}
          onChange={e => setK(parseInt(e.target.value))} className="svknn-slider"/>
      </label>

      <div className="svknn-votes">
        {labels.map((l, i) => (
          <div key={i} className="svknn-vote" style={{borderColor: votes[i] > 0 ? classColors[i] : "#21262d"}}>
            <span className="svknn-vote-count" style={{color: classColors[i]}}>{votes[i]}</span>
            <span className="svknn-vote-label">{l}</span>
            {i === predicted && <span className="svknn-winner">✓</span>}
          </div>
        ))}
      </div>

      <div className="svknn-result" style={{borderColor: classColors[predicted]}}>
        Predicted: <strong style={{color: classColors[predicted]}}>{labels[predicted]}</strong>
        {" "}by majority vote of {k} neighbors
      </div>
    </div>
  );
}
