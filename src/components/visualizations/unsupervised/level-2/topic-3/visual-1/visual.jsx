import { useState } from "react";
import "./visual.css";

// Parallel coords data (4 features, 12 samples, 3 clusters)
const FEATURES = ["Sepal L","Sepal W","Petal L","Petal W"];
const COLORS = ["#818cf8","#56d364","#f97316"];
const SAMPLES = [
  {vals:[5.1,3.5,1.4,0.2],c:0},{vals:[4.9,3.0,1.4,0.2],c:0},{vals:[6.3,2.9,5.6,1.8],c:2},
  {vals:[6.7,3.1,4.7,1.5],c:1},{vals:[5.8,2.7,5.1,1.9],c:2},{vals:[5.5,2.4,3.8,1.1],c:1},
  {vals:[4.7,3.2,1.3,0.2],c:0},{vals:[6.1,2.8,4.0,1.3],c:1},{vals:[6.4,2.8,5.6,2.1],c:2},
  {vals:[5.0,3.4,1.5,0.2],c:0},{vals:[5.9,3.0,4.2,1.5],c:1},{vals:[7.0,3.2,4.7,1.4],c:1},
];
// Normalize vals 0-1 within each feature
const MIN_V = [4.7,2.4,1.3,0.2], MAX_V = [7.0,3.5,5.6,2.1];
function norm(v,fi){ return (v-MIN_V[fi])/(MAX_V[fi]-MIN_V[fi]); }

// Pre-computed PCA 2D positions
const PCA_PTS = [
  {x:60,y:100,c:0},{x:55,y:110,c:0},{x:210,y:70,c:2},{x:180,y:120,c:1},
  {x:220,y:80,c:2},{x:160,y:130,c:1},{x:50,y:95,c:0},{x:170,y:115,c:1},
  {x:215,y:60,c:2},{x:58,y:105,c:0},{x:175,y:125,c:1},{x:165,y:140,c:1},
];

const W=280, H=160, PAD=30;
const FX = FEATURES.map((_,i)=>PAD+i*(W-PAD*2)/3);

export default function UnsupPcaVizVisualization() {
  const [view, setView] = useState("parallel");

  return (
    <div className="unsuppcav-wrap">
      <div className="unsuppcav-header">
        <h3 className="unsuppcav-title">Visualizing High-Dimensional Data with PCA</h3>
        <div className="unsuppcav-tabs">
          <button className={`unsuppcav-tab ${view==="parallel"?"unsuppcav-tab--on":""}`} onClick={()=>setView("parallel")}>
            4D: Parallel Coords
          </button>
          <button className={`unsuppcav-tab ${view==="pca"?"unsuppcav-tab--on":""}`} onClick={()=>setView("pca")}>
            2D: After PCA
          </button>
        </div>
      </div>

      {view==="parallel" && (
        <div className="unsuppcav-chart">
          <p className="unsuppcav-note">4 features — hard to see cluster structure in parallel coordinates.</p>
          <svg viewBox={`0 0 ${W} ${H}`} className="unsuppcav-svg">
            {FX.map((x,i)=>(
              <g key={i}>
                <line x1={x} y1={14} x2={x} y2={H-14} stroke="#30363d" strokeWidth={1.5}/>
                <text x={x} y={H} textAnchor="middle" fill="#a3adbb" fontSize={8}>{FEATURES[i]}</text>
              </g>
            ))}
            {SAMPLES.map((s,si)=>{
              const pts = s.vals.map((v,fi)=>({x:FX[fi], y:14+(1-norm(v,fi))*(H-28)}));
              const d = pts.map((p,i)=>`${i===0?"M":"L"}${p.x},${p.y}`).join(" ");
              return <path key={si} d={d} fill="none" stroke={COLORS[s.c]} strokeWidth={1.2} opacity={0.7}/>;
            })}
          </svg>
        </div>
      )}

      {view==="pca" && (
        <div className="unsuppcav-chart">
          <p className="unsuppcav-note">After PCA: 2 components clearly separate 3 clusters.</p>
          <svg viewBox={`0 0 ${W} ${H}`} className="unsuppcav-svg">
            <line x1={20} y1={H-18} x2={W-10} y2={H-18} stroke="#30363d" strokeWidth={1}/>
            <line x1={20} y1={10} x2={20} y2={H-18} stroke="#30363d" strokeWidth={1}/>
            <text x={(W+20)/2} y={H-4} textAnchor="middle" fill="#6b7785" fontSize={8}>PC1</text>
            <text x={8} y={H/2} fill="#6b7785" fontSize={8} transform={`rotate(-90,8,${H/2})`}>PC2</text>
            {PCA_PTS.map((p,i)=>(
              <circle key={i} cx={p.x} cy={p.y} r={6} fill={COLORS[p.c]} opacity={0.85}/>
            ))}
            {COLORS.map((c,i)=>(
              <g key={i}>
                <circle cx={40+i*70} cy={H-8} r={4} fill={c}/>
                <text x={48+i*70} y={H-5} fill="#a3adbb" fontSize={7}>Cluster {i+1}</text>
              </g>
            ))}
          </svg>
        </div>
      )}

      <div className="unsuppcav-footer">
        PCA reduced 4 features → 2 principal components retaining <strong>~92%</strong> of variance.
      </div>
    </div>
  );
}
