import { useState } from 'react';
import './visual.css';

const weeks = [0.92,0.91,0.90,0.88,0.87,0.85,0.83,0.80,0.78,0.75,0.73,0.71];
const THRESHOLD = 0.82;
const W = 480, H = 180, PAD = 40;

function toX(i) { return PAD + (i / 11) * (W - PAD * 2); }
function toY(v) { return H - PAD - ((v - 0.65) / 0.3) * (H - PAD * 2); }

const trainBins = [2,5,12,20,28,22,14,8,3,1];
const liveBins  = [1,3,7,12,18,24,20,16,10,5];

export default function MlopsMonitorVisualization() {
  const [tab, setTab] = useState('drift');
  const psi = 0.31;

  const points = weeks.map((v,i) => `${toX(i)},${toY(v)}`).join(' ');
  const thY = toY(THRESHOLD);
  const maxBin = Math.max(...trainBins, ...liveBins);

  return (
    <div className="mlopsmon-wrap">
      <div className="mlopsmon-tabs">
        {['drift','data'].map(t => (
          <button key={t} className={`mlopsmon-tab${tab===t?' mlopsmon-tab--active':''}`} onClick={()=>setTab(t)}>
            {t==='drift' ? 'Performance Drift' : 'Data Drift'}
          </button>
        ))}
      </div>

      {tab==='drift' && (
        <div className="mlopsmon-panel">
          <p className="mlopsmon-label">Model Accuracy Over 12 Weeks</p>
          <svg viewBox={`0 0 ${W} ${H}`} className="mlopsmon-svg">
            <line x1={PAD} y1={thY} x2={W-PAD} y2={thY} stroke="#f85149" strokeWidth="1.5" strokeDasharray="6 4"/>
            <text x={W-PAD+4} y={thY+4} fill="#f85149" fontSize="10">0.82</text>
            <polyline points={points} fill="none" stroke="#56d364" strokeWidth="2"/>
            {weeks.map((v,i) => (
              <circle key={i} cx={toX(i)} cy={toY(v)} r="4"
                fill={v < THRESHOLD ? '#f85149' : '#56d364'}
                stroke="#0d1117" strokeWidth="1.5"/>
            ))}
            {[0.70,0.75,0.80,0.85,0.90,0.95].map(v => (
              <g key={v}>
                <line x1={PAD-4} y1={toY(v)} x2={PAD} y2={toY(v)} stroke="#30363d"/>
                <text x={PAD-6} y={toY(v)+4} fill="#6b7785" fontSize="9" textAnchor="end">{v.toFixed(2)}</text>
              </g>
            ))}
            {[0,2,4,6,8,10].map(i => (
              <text key={i} x={toX(i)} y={H-8} fill="#6b7785" fontSize="9" textAnchor="middle">W{i+1}</text>
            ))}
            <line x1={PAD} y1={PAD} x2={PAD} y2={H-PAD} stroke="#30363d"/>
            <line x1={PAD} y1={H-PAD} x2={W-PAD} y2={H-PAD} stroke="#30363d"/>
          </svg>
          <div className="mlopsmon-legend">
            <span className="mlopsmon-dot mlopsmon-dot--green"/> Above threshold
            <span className="mlopsmon-dot mlopsmon-dot--red"/> Below threshold (alert)
            <span className="mlopsmon-dash"/> Alert threshold (0.82)
          </div>
        </div>
      )}

      {tab==='data' && (
        <div className="mlopsmon-panel">
          <div className="mlopsmon-hist-row">
            {[{label:'Training Distribution',bins:trainBins,color:'#58a6ff'},{label:'Live Distribution',bins:liveBins,color:'#f97316'}].map(({label,bins,color})=>(
              <div key={label} className="mlopsmon-hist">
                <p className="mlopsmon-label">{label}</p>
                <svg viewBox="0 0 220 120" className="mlopsmon-svg">
                  {bins.map((b,i)=>{
                    const bh = (b/maxBin)*80;
                    return <rect key={i} x={10+i*20} y={90-bh} width="16" height={bh} fill={color} opacity="0.8" rx="2"/>;
                  })}
                  <line x1="8" y1="90" x2="212" y2="90" stroke="#30363d"/>
                </svg>
              </div>
            ))}
          </div>
          <div className="mlopsmon-psi">
            <span className="mlopsmon-psi-label">PSI Score:</span>
            <span className="mlopsmon-psi-val" style={{color: psi>0.25?'#f85149':psi>0.1?'#f97316':'#56d364'}}>{psi.toFixed(2)}</span>
            <span className="mlopsmon-psi-note">{psi>0.25?'Significant shift — retrain recommended':psi>0.1?'Moderate shift — monitor closely':'Minimal shift'}</span>
          </div>
        </div>
      )}
    </div>
  );
}
