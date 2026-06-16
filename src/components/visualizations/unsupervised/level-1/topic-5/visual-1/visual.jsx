import { useState } from "react";
import "./visual.css";

// Dendrogram: 8 leaves, merge steps from bottom up
const LEAVES = [{x:30},{x:65},{x:100},{x:135},{x:175},{x:210},{x:245},{x:280}];
const MERGES = [
  {left:0,right:1,height:20,mid:47.5},
  {left:2,right:3,height:20,mid:117.5},
  {left:4,right:5,height:25,mid:192.5},
  {left:6,right:7,height:25,mid:262.5},
  {left:0,right:1,height:55,mid:82.5,merged:[0,1]},   // merge clusters A+B
  {left:2,right:3,height:55,mid:227.5,merged:[2,3]},   // merge clusters C+D
  {left:0,right:2,height:100,mid:155,merged:[0,1,2,3]},
];
// simplified: we draw a static dendrogram manually
const COLORS = ["#818cf8","#56d364","#f97316","#58a6ff"];

const NODES = [
  {x:30,y:200},{x:65,y:200},{x:100,y:200},{x:135,y:200},
  {x:175,y:200},{x:210,y:200},{x:245,y:200},{x:280,y:200},
];

// pre-computed dendrogram paths per cut threshold
const SEGMENTS = [
  {x1:30,y1:200,x2:30,y2:175,x2b:47.5,color:"#a3adbb"},
  {x1:65,y1:200,x2:65,y2:175,color:"#a3adbb"},
  {x1:30,y1:175,x2:65,y2:175,color:"#a3adbb"},

  {x1:100,y1:200,x2:100,y2:175,color:"#a3adbb"},
  {x1:135,y1:200,x2:135,y2:175,color:"#a3adbb"},
  {x1:100,y1:175,x2:135,y2:175,color:"#a3adbb"},

  {x1:175,y1:200,x2:175,y2:170,color:"#a3adbb"},
  {x1:210,y1:200,x2:210,y2:170,color:"#a3adbb"},
  {x1:175,y1:170,x2:210,y2:170,color:"#a3adbb"},

  {x1:245,y1:200,x2:245,y2:170,color:"#a3adbb"},
  {x1:280,y1:200,x2:280,y2:170,color:"#a3adbb"},
  {x1:245,y1:170,x2:280,y2:170,color:"#a3adbb"},

  {x1:47.5,y1:175,x2:47.5,y2:130,color:"#818cf8"},
  {x1:117.5,y1:175,x2:117.5,y2:130,color:"#818cf8"},
  {x1:47.5,y1:130,x2:117.5,y2:130,color:"#818cf8"},

  {x1:192.5,y1:170,x2:192.5,y2:125,color:"#56d364"},
  {x1:262.5,y1:170,x2:262.5,y2:125,color:"#56d364"},
  {x1:192.5,y1:125,x2:262.5,y2:125,color:"#56d364"},

  {x1:82.5,y1:130,x2:82.5,y2:70,color:"#f97316"},
  {x1:227.5,y1:125,x2:227.5,y2:70,color:"#f97316"},
  {x1:82.5,y1:70,x2:227.5,y2:70,color:"#f97316"},
];

const THRESHOLDS = [
  {label:"High cut (2 clusters)", line:90, nClusters:2},
  {label:"Mid cut (4 clusters)", line:145, nClusters:4},
  {label:"Low cut (8 clusters)", line:195, nClusters:8},
];

export default function UnsupHierarchVisualization() {
  const [thresh, setThresh] = useState(1);
  const cut = THRESHOLDS[thresh];

  return (
    <div className="unsuphi-wrap">
      <h3 className="unsuphi-title">Hierarchical Clustering — Dendrogram</h3>
      <div className="unsuphi-controls">
        {THRESHOLDS.map((t,i)=>(
          <button key={i} className={`unsuphi-btn ${thresh===i?"unsuphi-btn--on":""}`} onClick={()=>setThresh(i)}>{t.label}</button>
        ))}
      </div>
      <div className="unsuphi-badge">Cutting at this height → <strong>{cut.nClusters} clusters</strong></div>
      <svg viewBox="0 0 310 230" className="unsuphi-svg">
        {SEGMENTS.map((s,i)=>(
          <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke={s.color} strokeWidth={2}/>
        ))}
        <line x1={10} y1={cut.line} x2={300} y2={cut.line} stroke="#f97316" strokeWidth={1.5} strokeDasharray="5,3"/>
        <text x={12} y={cut.line-4} fill="#f97316" fontSize={9}>cut threshold</text>
        {NODES.map((n,i)=>(
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={5} fill="#818cf8" stroke="#0d1117" strokeWidth={1.5}/>
            <text x={n.x} y={n.y+16} textAnchor="middle" fill="#6b7785" fontSize={8}>{String.fromCharCode(65+i)}</text>
          </g>
        ))}
        <text x={8} y={70} fill="#6b7785" fontSize={7}>high</text>
        <text x={8} y={202} fill="#6b7785" fontSize={7}>low</text>
        <line x1={20} y1={75} x2={20} y2={200} stroke="#30363d" strokeWidth={1}/>
        <text x={13} y={140} fill="#a3adbb" fontSize={7} transform="rotate(-90,13,140)">distance</text>
      </svg>
    </div>
  );
}
