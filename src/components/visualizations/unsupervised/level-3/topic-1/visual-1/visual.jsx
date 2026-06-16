import { useState } from "react";
import "./visual.css";

const TIME_SERIES = [
  14,16,15,17,16,14,18,15,17,16,14,15,
  42, // anomaly spike
  16,15,17,14,16,15,
  38, // anomaly
  17,14,16,15,17,14,16
];

const METHODS = ["Z-Score","IQR","Isolation Forest"];
const METHOD_THRESHOLDS = [
  {upper:24,lower:8},    // z-score ±2σ
  {upper:22,lower:9},    // IQR
  {upper:21,lower:8},    // isolation forest
];

const W=300, H=140, PL=28, PR=10, PT=12, PB=24;
function scaleX(i,n){ return PL+i*(W-PL-PR)/(n-1); }
function scaleY(v,mn,mx){ return PT+(1-(v-mn)/(mx-mn))*(H-PT-PB); }

const mn=6, mx=46;

export default function UnsupAnomalyVisualization() {
  const [method, setMethod] = useState(0);
  const thresh = METHOD_THRESHOLDS[method];
  const anomalies = TIME_SERIES.map((v,i)=>v>thresh.upper||v<thresh.lower);
  const flagCount = anomalies.filter(Boolean).length;

  const linePath = TIME_SERIES.map((v,i)=>`${i===0?"M":"L"}${scaleX(i,TIME_SERIES.length).toFixed(1)},${scaleY(v,mn,mx).toFixed(1)}`).join(" ");

  return (
    <div className="unsupanom-wrap">
      <div className="unsupanom-header">
        <h3 className="unsupanom-title">Anomaly Detection</h3>
        <div className="unsupanom-method-btns">
          {METHODS.map((m,i)=>(
            <button key={i} className={`unsupanom-mbtn ${method===i?"unsupanom-mbtn--on":""}`} onClick={()=>setMethod(i)}>{m}</button>
          ))}
        </div>
      </div>

      <svg viewBox={`0 0 ${W+6} ${H+10}`} className="unsupanom-svg">
        {/* Threshold band */}
        <rect x={PL} y={scaleY(thresh.upper,mn,mx)} width={W-PL-PR}
          height={scaleY(thresh.lower,mn,mx)-scaleY(thresh.upper,mn,mx)}
          fill="#56d364" opacity={0.07}/>
        <line x1={PL} y1={scaleY(thresh.upper,mn,mx)} x2={W-PR} y2={scaleY(thresh.upper,mn,mx)}
          stroke="#56d364" strokeWidth={1} strokeDasharray="4,3"/>
        <line x1={PL} y1={scaleY(thresh.lower,mn,mx)} x2={W-PR} y2={scaleY(thresh.lower,mn,mx)}
          stroke="#56d364" strokeWidth={1} strokeDasharray="4,3"/>
        <text x={W-PR+2} y={scaleY(thresh.upper,mn,mx)+3} fill="#56d364" fontSize={7}>upper</text>
        <text x={W-PR+2} y={scaleY(thresh.lower,mn,mx)+3} fill="#56d364" fontSize={7}>lower</text>

        {/* Line */}
        <path d={linePath} fill="none" stroke="#818cf8" strokeWidth={1.8}/>

        {/* Points */}
        {TIME_SERIES.map((v,i)=>(
          <circle key={i} cx={scaleX(i,TIME_SERIES.length)} cy={scaleY(v,mn,mx)}
            r={anomalies[i]?6:3.5}
            fill={anomalies[i]?"#f97316":"#818cf8"}
            stroke={anomalies[i]?"#fff":"none"} strokeWidth={1}/>
        ))}

        {/* Axes */}
        <line x1={PL} y1={H-PB+4} x2={W-PR} y2={H-PB+4} stroke="#30363d" strokeWidth={1}/>
        <line x1={PL} y1={PT} x2={PL} y2={H-PB+4} stroke="#30363d" strokeWidth={1}/>
        <text x={W/2} y={H+8} textAnchor="middle" fill="#6b7785" fontSize={8}>Time</text>
      </svg>

      <div className="unsupanom-stats">
        <div className="unsupanom-stat">
          <div className="unsupanom-stat-l">Method</div>
          <div className="unsupanom-stat-v">{METHODS[method]}</div>
        </div>
        <div className="unsupanom-stat">
          <div className="unsupanom-stat-l">Flagged Anomalies</div>
          <div className="unsupanom-stat-v" style={{color:"#f97316"}}>{flagCount} points</div>
        </div>
        <div className="unsupanom-stat">
          <div className="unsupanom-stat-l">Threshold (upper)</div>
          <div className="unsupanom-stat-v">{thresh.upper}</div>
        </div>
      </div>
    </div>
  );
}
