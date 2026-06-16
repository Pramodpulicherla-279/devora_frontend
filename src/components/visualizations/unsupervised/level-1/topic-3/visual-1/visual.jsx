import { useState } from "react";
import "./visual.css";

const INERTIA = [2200,1400,700,420,330,290,265,255];
const SILHOUETTE = [0,0.58,0.72,0.61,0.50,0.42,0.36,0.30];
const KS = [1,2,3,4,5,6,7,8];

const W=270, H=160, PL=36, PR=10, PT=14, PB=28;
const iMax=2200, iMin=200;

function scaleX(k){ return PL + ((k-1)/7)*(W-PL-PR); }
function scaleIY(v){ return PT + (1-(v-iMin)/(iMax-iMin))*(H-PT-PB); }
function scaleSY(v){ return PT + (1-v)*(H-PT-PB); }

export default function UnsupClustersNumVisualization() {
  const [tab, setTab] = useState("elbow");
  const [hovered, setHovered] = useState(null);

  const elbowPath = KS.map((k,i) => `${i===0?"M":"L"}${scaleX(k)},${scaleIY(INERTIA[i])}`).join(" ");
  const silPath = KS.slice(1).map((k,i) => `${i===0?"M":"L"}${scaleX(k)},${scaleSY(SILHOUETTE[i+1])}`).join(" ");

  return (
    <div className="unsupknum-wrap">
      <div className="unsupknum-header">
        <h3 className="unsupknum-title">Choosing k: How Many Clusters?</h3>
        <div className="unsupknum-tabs">
          <button className={`unsupknum-tab ${tab==="elbow"?"unsupknum-tab--on":""}`} onClick={()=>setTab("elbow")}>Elbow Method</button>
          <button className={`unsupknum-tab ${tab==="sil"?"unsupknum-tab--on":""}`} onClick={()=>setTab("sil")}>Silhouette Score</button>
        </div>
      </div>

      {tab==="elbow" && (
        <div className="unsupknum-chart-wrap">
          <div className="unsupknum-insight">The "elbow" at k=3 suggests 3 clusters is optimal.</div>
          <svg viewBox={`0 0 ${W+6} ${H+6}`} className="unsupknum-svg">
            <line x1={PL} y1={PT} x2={PL} y2={H-PB+4} stroke="#30363d" strokeWidth={1}/>
            <line x1={PL} y1={H-PB+4} x2={W-PR} y2={H-PB+4} stroke="#30363d" strokeWidth={1}/>
            {[2200,1400,700,200].map(v => (
              <g key={v}>
                <line x1={PL-4} y1={scaleIY(v)} x2={W-PR} y2={scaleIY(v)} stroke="#21262d" strokeWidth={0.7}/>
                <text x={PL-6} y={scaleIY(v)+3} textAnchor="end" fill="#6b7785" fontSize={7}>{v}</text>
              </g>
            ))}
            <path d={elbowPath} fill="none" stroke="#818cf8" strokeWidth={2.5}/>
            {KS.map((k,i) => (
              <circle key={k} cx={scaleX(k)} cy={scaleIY(INERTIA[i])} r={k===3?7:4.5}
                fill={k===3?"#f97316":"#818cf8"}
                stroke={k===3?"#fff":"none"} strokeWidth={1.5}
                onMouseEnter={()=>setHovered({k,v:INERTIA[i]})}
                onMouseLeave={()=>setHovered(null)}
                style={{cursor:"pointer"}}/>
            ))}
            {hovered && (
              <g>
                <rect x={scaleX(hovered.k)+8} y={scaleIY(hovered.v)-16} width={64} height={20} rx={3} fill="#21262d"/>
                <text x={scaleX(hovered.k)+40} y={scaleIY(hovered.v)-2} textAnchor="middle" fill="#e6edf3" fontSize={8}>k={hovered.k} → {hovered.v}</text>
              </g>
            )}
            {KS.map(k => <text key={k} x={scaleX(k)} y={H-PB+16} textAnchor="middle" fill="#6b7785" fontSize={8}>{k}</text>)}
            <text x={PL-22} y={H/2} fill="#a3adbb" fontSize={8} transform={`rotate(-90,${PL-22},${H/2})`}>Inertia</text>
            <text x={(W+PL)/2} y={H+4} textAnchor="middle" fill="#a3adbb" fontSize={8}>k (clusters)</text>
            <circle cx={scaleX(3)} cy={scaleIY(INERTIA[2])} r={14} fill="none" stroke="#f97316" strokeWidth={1.5} strokeDasharray="3,2"/>
            <text x={scaleX(3)+16} y={scaleIY(INERTIA[2])+14} fill="#f97316" fontSize={8}>← elbow</text>
          </svg>
        </div>
      )}

      {tab==="sil" && (
        <div className="unsupknum-chart-wrap">
          <div className="unsupknum-insight">Higher silhouette score = better-defined clusters. Peak at k=3.</div>
          <svg viewBox={`0 0 ${W+6} ${H+6}`} className="unsupknum-svg">
            <line x1={PL} y1={PT} x2={PL} y2={H-PB+4} stroke="#30363d" strokeWidth={1}/>
            <line x1={PL} y1={H-PB+4} x2={W-PR} y2={H-PB+4} stroke="#30363d" strokeWidth={1}/>
            {KS.slice(1).map((k,i) => {
              const bw=22, x=scaleX(k)-bw/2, h=(H-PT-PB)*SILHOUETTE[i+1];
              return (
                <g key={k}>
                  <rect x={x} y={scaleSY(SILHOUETTE[i+1])} width={bw} height={h} fill={k===3?"#56d364":"#818cf8"} opacity={0.8} rx={2}/>
                  <text x={scaleX(k)} y={scaleSY(SILHOUETTE[i+1])-3} textAnchor="middle" fill="#e6edf3" fontSize={7}>{SILHOUETTE[i+1]}</text>
                  <text x={scaleX(k)} y={H-PB+14} textAnchor="middle" fill="#6b7785" fontSize={8}>{k}</text>
                </g>
              );
            })}
            <text x={(W+PL)/2} y={H+4} textAnchor="middle" fill="#a3adbb" fontSize={8}>k (clusters)</text>
            <text x={PL-6} y={PT} fill="#6b7785" fontSize={7}>1.0</text>
            <text x={PL-6} y={H-PB+4} fill="#6b7785" fontSize={7}>0</text>
          </svg>
        </div>
      )}
    </div>
  );
}
