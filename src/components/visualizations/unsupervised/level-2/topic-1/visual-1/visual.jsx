import { useState } from "react";
import "./visual.css";

const DIMS = [
  { d: 1, label: "1D", volume: 1, sparsity: "Dense", points: 10, svgDesc: "Line segment" },
  { d: 2, label: "2D", volume: 10, sparsity: "Manageable", points: 100, svgDesc: "Square grid" },
  { d: 3, label: "3D", volume: 100, sparsity: "Sparse", points: 1000, svgDesc: "Cube" },
  { d: 10, label: "10D", volume: 10000000000, sparsity: "Very Sparse", points: "10^10", svgDesc: "Hypercube" },
];

function Line1D() {
  return (
    <svg viewBox="0 0 120 60" className="unsupcurse-shape-svg">
      <line x1={10} y1={30} x2={110} y2={30} stroke="#818cf8" strokeWidth={3} strokeLinecap="round"/>
      {[15,30,48,62,78,92,105].map((x,i)=>(
        <circle key={i} cx={x} cy={30} r={3.5} fill="#818cf8"/>
      ))}
    </svg>
  );
}
function Square2D() {
  const pts = [];
  for(let x=0;x<4;x++) for(let y=0;y<4;y++) pts.push({x:20+x*22,y:12+y*14});
  return (
    <svg viewBox="0 0 120 70" className="unsupcurse-shape-svg">
      <rect x={10} y={8} width={100} height={56} fill="none" stroke="#818cf8" strokeWidth={1.5} strokeDasharray="3,2"/>
      {pts.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r={3} fill="#818cf8" opacity={0.7}/>)}
    </svg>
  );
}
function Cube3D() {
  return (
    <svg viewBox="0 0 120 80" className="unsupcurse-shape-svg">
      <polygon points="20,55 80,55 80,20 20,20" fill="none" stroke="#818cf8" strokeWidth={1.5}/>
      <polygon points="80,20 100,10 100,45 80,55" fill="#818cf8" opacity={0.12} stroke="#818cf8" strokeWidth={1.5}/>
      <polygon points="20,20 40,10 100,10 80,20" fill="#818cf8" opacity={0.08} stroke="#818cf8" strokeWidth={1.5}/>
      {[[30,45],[50,45],[70,45],[30,32],[50,32],[70,32],[38,25],[58,25],[78,25]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={2.5} fill="#818cf8" opacity={0.7}/>
      ))}
    </svg>
  );
}
function HyperN() {
  return (
    <svg viewBox="0 0 120 80" className="unsupcurse-shape-svg">
      {[0,1,2,3].map(i=>(
        <g key={i} transform={`translate(${i*8},${i*5})`}>
          <rect x={15} y={12} width={62} height={48} fill="none" stroke="#818cf8" strokeWidth={0.8} opacity={0.4-i*0.06}/>
        </g>
      ))}
      {[30,50,70].map((x,i)=>(
        <circle key={i} cx={x} cy={36} r={2} fill="#f97316" opacity={0.9}/>
      ))}
      <text x={60} y={74} textAnchor="middle" fill="#f97316" fontSize={9}>mostly empty!</text>
    </svg>
  );
}

export default function UnsupCurseVisualization() {
  const [dim, setDim] = useState(0);
  const current = DIMS[dim];

  return (
    <div className="unsupcurse-wrap">
      <h3 className="unsupcurse-title">The Curse of Dimensionality</h3>
      <p className="unsupcurse-sub">As dimensions increase, data becomes exponentially sparse.</p>

      <div className="unsupcurse-steps">
        {DIMS.map((d,i)=>(
          <button key={i} className={`unsupcurse-step ${dim===i?"unsupcurse-step--on":""}`} onClick={()=>setDim(i)}>
            {d.label}
          </button>
        ))}
      </div>

      <div className="unsupcurse-main">
        <div className="unsupcurse-shape">
          {dim===0&&<Line1D/>}
          {dim===1&&<Square2D/>}
          {dim===2&&<Cube3D/>}
          {dim===3&&<HyperN/>}
          <div className="unsupcurse-shape-label">{current.svgDesc}</div>
        </div>
        <div className="unsupcurse-stats">
          <div className="unsupcurse-stat">
            <div className="unsupcurse-stat-label">Dimensions</div>
            <div className="unsupcurse-stat-val">{current.d}</div>
          </div>
          <div className="unsupcurse-stat">
            <div className="unsupcurse-stat-label">Relative Volume</div>
            <div className="unsupcurse-stat-val">{current.volume > 999 ? current.volume.toExponential(0) : current.volume}x</div>
          </div>
          <div className="unsupcurse-stat">
            <div className="unsupcurse-stat-label">Points Needed</div>
            <div className="unsupcurse-stat-val">{current.points}</div>
          </div>
          <div className="unsupcurse-stat">
            <div className="unsupcurse-stat-label">Data Density</div>
            <div className="unsupcurse-stat-val" style={{color: dim===0?"#56d364":dim===1?"#818cf8":dim===2?"#f97316":"#f97316"}}>{current.sparsity}</div>
          </div>
        </div>
      </div>
      <div className="unsupcurse-insight">
        In high-dimensional spaces, all points become roughly equidistant — making distance-based algorithms unreliable.
      </div>
    </div>
  );
}
