import { useState } from 'react';
import './visual.css';

const traffic = [10,12,11,13,15,14,40,72,85,60,30,16,13,11,10,9];
const W=400, H=110, PX=10, PY=10;
function tx(i){ return PX + (i/(traffic.length-1))*(W-PX*2); }
function ty(v){ return H - PY - ((v-8)/80)*(H-PY*2); }

const COMPARE = [
  { name:'AWS Lambda',   alwaysOn:'No',  cost:'Per-request', coldStart:'~300ms' },
  { name:'ECS Fargate',  alwaysOn:'Yes', cost:'Per-hour',    coldStart:'~0ms'   },
  { name:'Kubernetes',   alwaysOn:'Yes', cost:'Node-based',  coldStart:'~0ms'   },
];

const SPIKE_IDX = [6,7,8,9];

export default function MlopsServerlessVisualization() {
  const [hover, setHover] = useState(null);
  const instanceCount = hover !== null ? (traffic[hover] > 30 ? Math.ceil(traffic[hover]/20) : 1) : 1;
  const isColdStart = hover === 6;
  const pts = traffic.map((v,i)=>`${tx(i)},${ty(v)}`).join(' ');

  return (
    <div className="mlopsserverless-wrap">
      <p className="mlopsserverless-title">Incoming Request Traffic (RPS)</p>
      <div className="mlopsserverless-chart-area">
        <svg viewBox={`0 0 ${W} ${H}`} className="mlopsserverless-svg">
          <defs>
            <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#58a6ff" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="#58a6ff" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <polygon points={`${tx(0)},${H-PY} ${pts} ${tx(traffic.length-1)},${H-PY}`} fill="url(#tg)"/>
          <polyline points={pts} fill="none" stroke="#58a6ff" strokeWidth="2"/>
          {traffic.map((v,i)=>(
            <circle key={i} cx={tx(i)} cy={ty(v)} r={hover===i?6:4}
              fill={SPIKE_IDX.includes(i)?'#f97316':'#58a6ff'}
              stroke="#0d1117" strokeWidth="1.5"
              style={{cursor:'pointer'}}
              onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)}/>
          ))}
          {hover!==null && isColdStart && (
            <g>
              <rect x={tx(hover)-38} y={ty(traffic[hover])-32} width="90" height="24" rx="4" fill="#21262d" stroke="#f97316"/>
              <text x={tx(hover)+7} y={ty(traffic[hover])-16} textAnchor="middle" fontSize="10" fill="#f97316">Cold start +300ms</text>
            </g>
          )}
          <line x1={PX} y1={H-PY} x2={W-PX} y2={H-PY} stroke="#30363d"/>
        </svg>
      </div>

      <div className="mlopsserverless-instances">
        <span className="mlopsserverless-inst-label">Active instances during spike:</span>
        <div className="mlopsserverless-icons">
          {Array.from({length: Math.min(instanceCount,8)}).map((_,i)=>(
            <div key={i} className={`mlopsserverless-icon${i>=1?' mlopsserverless-icon--new':''}`}>
              <svg viewBox="0 0 24 24" width="28" height="28">
                <rect x="2" y="4" width="20" height="16" rx="3" fill="#161b22" stroke="#56d364" strokeWidth="1.5"/>
                <circle cx="8" cy="12" r="2" fill="#56d364"/>
                <line x1="12" y1="10" x2="20" y2="10" stroke="#30363d" strokeWidth="1.2"/>
                <line x1="12" y1="13" x2="20" y2="13" stroke="#30363d" strokeWidth="1.2"/>
              </svg>
            </div>
          ))}
        </div>
        <span className="mlopsserverless-inst-note">{instanceCount} instance{instanceCount>1?'s':''} (hover spike points above)</span>
      </div>

      <div className="mlopsserverless-table-wrap">
        <table className="mlopsserverless-table">
          <thead><tr>
            {['Platform','Always-On','Cost Model','Cold Start'].map(h=>(
              <th key={h} className="mlopsserverless-th">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {COMPARE.map(r=>(
              <tr key={r.name} className="mlopsserverless-tr">
                <td className="mlopsserverless-td mlopsserverless-td--name">{r.name}</td>
                <td className="mlopsserverless-td">{r.alwaysOn}</td>
                <td className="mlopsserverless-td">{r.cost}</td>
                <td className={`mlopsserverless-td${r.coldStart!=='~0ms'?' mlopsserverless-cold':''}`}>{r.coldStart}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
