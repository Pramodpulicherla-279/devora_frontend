import { useState } from 'react';
import './visual.css';

const STAGES = [
  { id:'monitor',  label:'Monitor',        angle:270 },
  { id:'detect',   label:'Detect Trigger', angle:321 },
  { id:'collect',  label:'Collect Data',   angle:12  },
  { id:'validate', label:'Validate',       angle:63  },
  { id:'retrain',  label:'Retrain',        angle:114 },
  { id:'evaluate', label:'Evaluate',       angle:165 },
  { id:'deploy',   label:'Deploy',         angle:216 },
];

const TRIGGERS = [
  { id:'schedule',  label:'Schedule',        desc:'Retrain weekly or monthly on a fixed calendar cadence regardless of performance.', stages:['monitor'] },
  { id:'drift',     label:'Drift Threshold', desc:'PSI score exceeds 0.25 — input data distribution has shifted significantly.', stages:['detect'] },
  { id:'accuracy',  label:'Accuracy Drop',   desc:'Live accuracy falls below the alert threshold (e.g. 0.82) for 3 consecutive hours.', stages:['monitor','detect'] },
];

const CX=140, CY=135, R=98;

function pos(angle) {
  const r = (angle * Math.PI) / 180;
  return { x: CX + R * Math.cos(r), y: CY + R * Math.sin(r) };
}

export default function MlopsRetrainVisualization() {
  const [active, setActive] = useState(null);
  const highlighted = active ? TRIGGERS.find(t=>t.id===active)?.stages ?? [] : [];

  return (
    <div className="mlopsretrain-wrap">
      <div className="mlopsretrain-top">
        <svg viewBox="0 0 280 270" className="mlopsretrain-svg">
          <defs>
            <marker id="ra" markerWidth="7" markerHeight="7" refX="3" refY="3" orient="auto">
              <path d="M0,0 L7,3 L0,6 Z" fill="#30363d"/>
            </marker>
            <marker id="ra-hi" markerWidth="7" markerHeight="7" refX="3" refY="3" orient="auto">
              <path d="M0,0 L7,3 L0,6 Z" fill="#56d364"/>
            </marker>
          </defs>
          {STAGES.map((s,i) => {
            const next = STAGES[(i+1) % STAGES.length];
            const p = pos(s.angle), q = pos(next.angle);
            const isHi = highlighted.includes(s.id);
            return (
              <line key={s.id} x1={p.x} y1={p.y} x2={q.x} y2={q.y}
                stroke={isHi ? '#56d364' : '#30363d'} strokeWidth="1.5"
                markerEnd={isHi ? 'url(#ra-hi)' : 'url(#ra)'}/>
            );
          })}
          {STAGES.map(s => {
            const { x, y } = pos(s.angle);
            const isHi = highlighted.includes(s.id);
            const words = s.label.split(' ');
            return (
              <g key={s.id}>
                <circle cx={x} cy={y} r="26"
                  fill={isHi ? '#1a3a1a' : '#161b22'}
                  stroke={isHi ? '#56d364' : '#30363d'} strokeWidth={isHi ? 2 : 1.5}/>
                {words.map((w,wi) => (
                  <text key={wi} x={x} y={y + (wi - (words.length-1)/2) * 11 + 3}
                    textAnchor="middle" fontSize="8.5"
                    fill={isHi ? '#56d364' : '#a3adbb'} fontWeight={isHi ? '700' : '400'}>
                    {w}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>

        {active && (
          <div className="mlopsretrain-desc">
            <div className="mlopsretrain-desc-title">{TRIGGERS.find(t=>t.id===active)?.label}</div>
            <div className="mlopsretrain-desc-text">{TRIGGERS.find(t=>t.id===active)?.desc}</div>
          </div>
        )}
      </div>

      <div className="mlopsretrain-triggers">
        <p className="mlopsretrain-hint">Click a trigger type to highlight its stage:</p>
        <div className="mlopsretrain-cards">
          {TRIGGERS.map(t => (
            <button key={t.id}
              className={`mlopsretrain-card${active===t.id?' mlopsretrain-card--active':''}`}
              onClick={()=>setActive(active===t.id ? null : t.id)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
