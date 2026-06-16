import { useState } from "react";
import "./visual.css";

const GOOD = [
  {id:0,cluster:0,sil:0.82},{id:1,cluster:0,sil:0.76},{id:2,cluster:0,sil:0.71},
  {id:3,cluster:0,sil:0.68},{id:4,cluster:1,sil:0.85},{id:5,cluster:1,sil:0.79},
  {id:6,cluster:1,sil:0.73},{id:7,cluster:2,sil:0.88},{id:8,cluster:2,sil:0.81},
  {id:9,cluster:2,sil:0.74},{id:10,cluster:2,sil:0.67},
];
const BAD = [
  {id:0,cluster:0,sil:0.31},{id:1,cluster:0,sil:0.22},{id:2,cluster:0,sil:-0.05},
  {id:3,cluster:1,sil:0.18},{id:4,cluster:1,sil:0.11},{id:5,cluster:1,sil:-0.12},
  {id:6,cluster:2,sil:0.25},{id:7,cluster:2,sil:0.08},{id:8,cluster:2,sil:-0.18},
  {id:9,cluster:2,sil:0.15},{id:10,cluster:2,sil:0.05},
];
const COLORS = ["#818cf8","#56d364","#f97316"];
const W=260,H=170,PL=30,PR=10,PT=12,PB=24;

function silColor(v){ return v>=0.5?"#56d364":v>=0.2?"#818cf8":"#f97316"; }

export default function UnsupEvalVisualization() {
  const [mode, setMode] = useState("good");
  const data = mode==="good"?GOOD:BAD;
  const avgSil = (data.reduce((s,d)=>s+d.sil,0)/data.length).toFixed(3);
  const inertia = mode==="good"?"342":"1180";

  const sorted = [...data].sort((a,b)=>b.cluster-a.cluster||(b.sil-a.sil));
  const maxW = W-PL-PR;

  return (
    <div className="unsupeval-wrap">
      <div className="unsupeval-header">
        <h3 className="unsupeval-title">Evaluating Cluster Quality</h3>
        <div className="unsupeval-toggle">
          <button className={`unsupeval-btn ${mode==="good"?"unsupeval-btn--on":""}`} onClick={()=>setMode("good")}>Good Clustering</button>
          <button className={`unsupeval-btn ${mode==="bad"?"unsupeval-btn--on":""}`} onClick={()=>setMode("bad")}>Bad Clustering</button>
        </div>
      </div>

      <div className="unsupeval-metrics">
        <div className="unsupeval-metric">
          <div className="unsupeval-metric-label">Avg Silhouette</div>
          <div className="unsupeval-metric-val" style={{color:mode==="good"?"#56d364":"#f97316"}}>{avgSil}</div>
        </div>
        <div className="unsupeval-metric">
          <div className="unsupeval-metric-label">Inertia</div>
          <div className="unsupeval-metric-val">{inertia}</div>
        </div>
        <div className="unsupeval-metric">
          <div className="unsupeval-metric-label">Negative Values</div>
          <div className="unsupeval-metric-val" style={{color:data.some(d=>d.sil<0)?"#f97316":"#56d364"}}>
            {data.filter(d=>d.sil<0).length} pts
          </div>
        </div>
      </div>

      <div className="unsupeval-chart-label">Silhouette Plot — each bar is one data point</div>
      <svg viewBox={`0 0 ${W+6} ${H+4}`} className="unsupeval-svg">
        <line x1={PL} y1={PT} x2={PL} y2={H-PB+6} stroke="#30363d" strokeWidth={1}/>
        <line x1={PL} y1={(PT+H-PB)/2+6} x2={W-PR} y2={(PT+H-PB)/2+6} stroke="#56d364" strokeWidth={0.8} strokeDasharray="3,2"/>
        {sorted.map((d,i) => {
          const bw=(W-PL-PR)/sorted.length-1;
          const x=PL+i*(bw+1);
          const midY=(PT+H-PB)/2+6;
          const barH=Math.abs(d.sil)*(H-PT-PB)/2;
          return (
            <rect key={d.id} x={x} y={d.sil>=0?midY-barH:midY} width={bw} height={barH}
              fill={COLORS[d.cluster]} opacity={0.85} rx={1}/>
          );
        })}
        <text x={PL-4} y={PT+4} textAnchor="end" fill="#6b7785" fontSize={7}>+1</text>
        <text x={PL-4} y={H-PB+8} textAnchor="end" fill="#6b7785" fontSize={7}>-1</text>
        <text x={PL-4} y={(PT+H-PB)/2+9} textAnchor="end" fill="#56d364" fontSize={7}>0</text>
        {COLORS.map((c,i)=>(
          <g key={i}>
            <rect x={PL+i*68} y={H-PB+14} width={8} height={8} fill={c} rx={1}/>
            <text x={PL+i*68+11} y={H-PB+21} fill="#a3adbb" fontSize={7}>Cluster {i+1}</text>
          </g>
        ))}
      </svg>
      <p className="unsupeval-note">Bars above 0 = well-clustered. Bars below 0 = misclassified points.</p>
    </div>
  );
}
