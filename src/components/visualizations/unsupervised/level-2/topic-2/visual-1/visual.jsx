import { useState } from "react";
import "./visual.css";

// Synthetic 2D dataset with clear principal components
const RAW = [
  {x:120,y:95},{x:140,y:115},{x:100,y:75},{x:160,y:130},{x:130,y:105},
  {x:90,y:60},{x:150,y:120},{x:110,y:88},{x:170,y:135},{x:80,y:55},
  {x:145,y:118},{x:125,y:98},{x:105,y:80},{x:165,y:128},{x:95,y:68},
];

// PC1 direction ~(0.7, 0.7) — project onto it
function projectOnPC1(pts) {
  const cx = pts.reduce((s,p)=>s+p.x,0)/pts.length;
  const cy = pts.reduce((s,p)=>s+p.y,0)/pts.length;
  return pts.map(p => {
    const dx = p.x - cx, dy = p.y - cy;
    const t = (dx*0.707 + dy*0.707);
    return { x: cx + t*0.707, y: cy + t*0.707 };
  });
}

const W=280, H=200;

export default function UnsupPcaVisualization() {
  const [projected, setProjected] = useState(false);
  const proj = projectOnPC1(RAW);
  const cx = RAW.reduce((s,p)=>s+p.x,0)/RAW.length;
  const cy = RAW.reduce((s,p)=>s+p.y,0)/RAW.length;

  return (
    <div className="unsuppca-wrap">
      <div className="unsuppca-header">
        <h3 className="unsuppca-title">Principal Component Analysis (PCA)</h3>
        <button className="unsuppca-btn" onClick={()=>setProjected(v=>!v)}>
          {projected ? "Show Original" : "Project onto PC1"}
        </button>
      </div>

      <div className="unsuppca-info">
        {projected
          ? "Data projected onto PC1 — maximum variance direction. Some information is lost."
          : "PC1 runs along the direction of greatest variance. PC2 is orthogonal to it."}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="unsuppca-svg">
        {/* Axes */}
        <line x1={20} y1={H-20} x2={W-10} y2={H-20} stroke="#30363d" strokeWidth={1}/>
        <line x1={20} y1={10} x2={20} y2={H-20} stroke="#30363d" strokeWidth={1}/>

        {/* PC1 line */}
        <line x1={cx-100} y1={cy-100} x2={cx+100} y2={cy+100}
          stroke="#818cf8" strokeWidth={1.5} strokeDasharray={projected?"0":"4,3"} opacity={0.7}/>
        <text x={cx+95} y={cy+100} fill="#818cf8" fontSize={9}>PC1</text>

        {/* PC2 line (only in original view) */}
        {!projected && (
          <>
            <line x1={cx-60} y1={cy+60} x2={cx+60} y2={cy-60}
              stroke="#56d364" strokeWidth={1.5} strokeDasharray="4,3" opacity={0.7}/>
            <text x={cx+55} y={cy-62} fill="#56d364" fontSize={9}>PC2</text>
          </>
        )}

        {/* Projection lines */}
        {projected && RAW.map((p,i)=>(
          <line key={i} x1={p.x} y1={p.y} x2={proj[i].x} y2={proj[i].y}
            stroke="#818cf8" strokeWidth={0.7} strokeDasharray="2,2" opacity={0.4}/>
        ))}

        {/* Data points */}
        {RAW.map((p,i)=>(
          <circle key={i} cx={projected?proj[i].x:p.x} cy={projected?proj[i].y:p.y}
            r={5} fill="#818cf8" opacity={0.85} style={{transition:"cx 0.5s, cy 0.5s"}}/>
        ))}

        {/* Center */}
        <circle cx={cx} cy={cy} r={4} fill="#f97316" stroke="#0d1117" strokeWidth={1.5}/>
        <text x={cx+6} y={cy-4} fill="#f97316" fontSize={8}>mean</text>
      </svg>

      <div className="unsuppca-variance">
        <div className="unsuppca-bar-row">
          <span className="unsuppca-bar-label">PC1 variance explained</span>
          <div className="unsuppca-bar-track"><div className="unsuppca-bar-fill" style={{width:"78%",background:"#818cf8"}}/></div>
          <span className="unsuppca-bar-pct">78%</span>
        </div>
        <div className="unsuppca-bar-row">
          <span className="unsuppca-bar-label">PC2 variance explained</span>
          <div className="unsuppca-bar-track"><div className="unsuppca-bar-fill" style={{width:"22%",background:"#56d364"}}/></div>
          <span className="unsuppca-bar-pct">22%</span>
        </div>
      </div>
    </div>
  );
}
