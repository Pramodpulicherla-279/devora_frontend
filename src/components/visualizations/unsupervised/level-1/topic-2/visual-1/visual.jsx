import { useState } from "react";
import "./visual.css";

const INIT_POINTS = [
  {x:60,y:70},{x:80,y:55},{x:65,y:90},{x:90,y:75},{x:75,y:60},
  {x:200,y:60},{x:220,y:80},{x:210,y:50},{x:230,y:70},{x:195,y:85},
  {x:140,y:170},{x:160,y:185},{x:150,y:160},{x:170,y:178},{x:135,y:190},
];
const TRUE_CENTROIDS = [{x:74,y:70},{x:211,y:69},{x:151,y:177}];
const COLORS = ["#818cf8","#56d364","#f97316"];

function dist(a,b){ return Math.hypot(a.x-b.x, a.y-b.y); }
function assign(pts, cents){ return pts.map(p => { let mi=0,md=1e9; cents.forEach((c,i)=>{ const d=dist(p,c); if(d<md){md=d;mi=i;} }); return mi; }); }
function moveCentroids(pts, labels, k){
  return Array.from({length:k},(_,i)=>{
    const g = pts.filter((_,j)=>labels[j]===i);
    if(!g.length) return {x:pts[0].x,y:pts[0].y};
    return {x:g.reduce((s,p)=>s+p.x,0)/g.length, y:g.reduce((s,p)=>s+p.y,0)/g.length};
  });
}

const INIT_CENTS = [{x:70,y:120},{x:150,y:50},{x:220,y:150}];

export default function UnsupKMeansVisualization() {
  const [centroids, setCentroids] = useState(INIT_CENTS);
  const [step, setStep] = useState(0);
  const [converged, setConverged] = useState(false);

  const labels = assign(INIT_POINTS, centroids);

  const handleStep = () => {
    const newCents = moveCentroids(INIT_POINTS, assign(INIT_POINTS, centroids), 3);
    const moved = newCents.some((c,i) => dist(c, centroids[i]) > 0.5);
    setCentroids(newCents);
    setStep(s => s+1);
    if(!moved) setConverged(true);
  };

  const handleReset = () => { setCentroids(INIT_CENTS); setStep(0); setConverged(false); };

  return (
    <div className="unsupkm-wrap">
      <div className="unsupkm-header">
        <h3 className="unsupkm-title">K-Means Clustering (k=3)</h3>
        <div className="unsupkm-actions">
          <span className="unsupkm-step-badge">Step {step}</span>
          <button className="unsupkm-btn" onClick={handleStep} disabled={converged}>Next Step</button>
          <button className="unsupkm-btn unsupkm-btn--reset" onClick={handleReset}>Reset</button>
        </div>
      </div>

      {converged && <div className="unsupkm-converged">Converged! Centroids stabilized after {step} steps.</div>}

      <svg viewBox="0 0 290 230" className="unsupkm-svg">
        {centroids.map((c,i) => (
          <circle key={`ring-${i}`} cx={c.x} cy={c.y} r={35} fill={COLORS[i]} opacity={0.06}/>
        ))}
        {INIT_POINTS.map((p,i) => (
          <g key={i}>
            <line x1={p.x} y1={p.y} x2={centroids[labels[i]].x} y2={centroids[labels[i]].y}
              stroke={COLORS[labels[i]]} strokeWidth={0.6} opacity={0.25}/>
            <circle cx={p.x} cy={p.y} r={6} fill={COLORS[labels[i]]} opacity={0.8}/>
          </g>
        ))}
        {centroids.map((c,i) => (
          <g key={`c-${i}`}>
            <circle cx={c.x} cy={c.y} r={11} fill="#0d1117" stroke={COLORS[i]} strokeWidth={2}/>
            <text x={c.x} y={c.y+4} textAnchor="middle" fill={COLORS[i]} fontSize={10} fontWeight="bold">✕</text>
          </g>
        ))}
        <text x={8} y={220} fill="#6b7785" fontSize={8}>● data point   ✕ centroid</text>
      </svg>

      <div className="unsupkm-legend">
        {COLORS.map((c,i) => (
          <div key={i} className="unsupkm-legend-item">
            <span className="unsupkm-dot" style={{background:c}}/>
            <span className="unsupkm-legend-label">Cluster {i+1}: {labels.filter(l=>l===i).length} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}
