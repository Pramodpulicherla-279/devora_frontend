import { useState } from "react";
import "./visual.css";

const POINTS = [
  // Cluster A
  {x:60,y:80,type:"core"},{x:75,y:70,type:"core"},{x:65,y:95,type:"border"},
  {x:80,y:85,type:"core"},{x:55,y:70,type:"border"},
  // Cluster B
  {x:190,y:65,type:"core"},{x:205,y:75,type:"core"},{x:195,y:85,type:"border"},
  {x:215,y:68,type:"core"},{x:185,y:55,type:"border"},
  // Cluster C (dense)
  {x:140,y:160,type:"core"},{x:155,y:170,type:"core"},{x:148,y:148,type:"border"},
  {x:162,y:162,type:"core"},{x:130,y:168,type:"border"},
  // Noise
  {x:110,y:35,type:"noise"},{x:250,y:140,type:"noise"},{x:30,y:150,type:"noise"},
];
const CLUSTER_MAP = [0,0,0,0,0,1,1,1,1,1,2,2,2,2,2,-1,-1,-1];
const COLORS = ["#818cf8","#56d364","#f97316"];

export default function UnsupDbscanVisualization() {
  const [selected, setSelected] = useState(0);
  const [eps, setEps] = useState(40);
  const pt = POINTS[selected];
  const cluster = CLUSTER_MAP[selected];

  const neighbors = POINTS.filter((p,i) =>
    i !== selected && Math.hypot(p.x-pt.x, p.y-pt.y) <= eps
  );

  const typeColor = (t) => t==="core"?"#818cf8":t==="border"?"#56d364":"#f97316";

  return (
    <div className="unsupdbscan-wrap">
      <div className="unsupdbscan-header">
        <h3 className="unsupdbscan-title">DBSCAN — Density-Based Clustering</h3>
        <div className="unsupdbscan-eps">
          <span className="unsupdbscan-eps-label">ε radius: {eps}</span>
          <input type="range" min={20} max={70} value={eps} onChange={e=>setEps(+e.target.value)} className="unsupdbscan-slider"/>
        </div>
      </div>

      <p className="unsupdbscan-tip">Click a point to inspect it. The ε circle shows its neighborhood.</p>

      <svg viewBox="0 0 280 215" className="unsupdbscan-svg">
        {/* eps circle around selected */}
        <circle cx={pt.x} cy={pt.y} r={eps} fill="#818cf8" opacity={0.08} stroke="#818cf8" strokeWidth={1} strokeDasharray="4,3"/>

        {POINTS.map((p,i) => {
          const isNeighbor = i!==selected && Math.hypot(p.x-pt.x, p.y-pt.y) <= eps;
          const col = CLUSTER_MAP[i]===-1?"#f97316":COLORS[CLUSTER_MAP[i]];
          return (
            <g key={i} onClick={()=>setSelected(i)} style={{cursor:"pointer"}}>
              {isNeighbor && <circle cx={p.x} cy={p.y} r={10} fill="#818cf8" opacity={0.2}/>}
              <circle cx={p.x} cy={p.y} r={i===selected?9:6}
                fill={col} opacity={i===selected?1:0.75}
                stroke={i===selected?"#fff":isNeighbor?"#818cf8":"none"}
                strokeWidth={i===selected?2:1.5}/>
            </g>
          );
        })}
      </svg>

      <div className="unsupdbscan-panel">
        <div className="unsupdbscan-info">
          <div className="unsupdbscan-info-row">
            <span>Point Type</span>
            <span style={{color:typeColor(pt.type)}}>{pt.type.charAt(0).toUpperCase()+pt.type.slice(1)} Point</span>
          </div>
          <div className="unsupdbscan-info-row">
            <span>Cluster</span>
            <span style={{color:cluster===-1?"#f97316":COLORS[cluster]}}>
              {cluster===-1?"Noise (outlier)":`Cluster ${cluster+1}`}
            </span>
          </div>
          <div className="unsupdbscan-info-row">
            <span>Neighbors within ε</span>
            <span>{neighbors.length}</span>
          </div>
        </div>
        <div className="unsupdbscan-legend">
          {[{c:"#818cf8",l:"Core point (dense)"},{c:"#56d364",l:"Border point"},{c:"#f97316",l:"Noise (outlier)"}].map(({c,l})=>(
            <div key={l} className="unsupdbscan-legend-row">
              <span className="unsupdbscan-dot" style={{background:c}}/>
              <span>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
