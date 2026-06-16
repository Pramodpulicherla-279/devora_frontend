import { useState } from 'react';
import './visual.css';

const VECTORS = [
  { id:'v1', x:80,  y:70,  label:'Doc A' },
  { id:'v2', x:130, y:90,  label:'Doc B' },
  { id:'v3', x:160, y:50,  label:'Doc C' },
  { id:'v4', x:220, y:130, label:'Doc D' },
  { id:'v5', x:290, y:80,  label:'Doc E' },
  { id:'v6', x:310, y:160, label:'Doc F' },
];
const QUERY = { x:170, y:85 };
const NEAREST = ['v2','v3','v1'];

const DB_COMPARE = [
  { name:'Pinecone',  managed:'Fully',  selfHost:'No',  filtering:'Yes', lang:'Any' },
  { name:'Weaviate',  managed:'Cloud',  selfHost:'Yes', filtering:'Yes', lang:'Python/Go' },
  { name:'Qdrant',    managed:'Cloud',  selfHost:'Yes', filtering:'Yes', lang:'Python/Rust' },
];

const INDEX_TYPES = [
  { name:'HNSW', desc:'Graph-based. Fast ANN search, higher memory. Best for low-latency production queries.' },
  { name:'IVF',  desc:'Inverted file index. Partitions space into clusters. Good for very large datasets.' },
];

function StarShape({ cx, cy, r }) {
  const pts = Array.from({length:10}).map((_,i)=>{
    const angle = (i*36 - 90)*Math.PI/180;
    const rad = i%2===0 ? r : r*0.45;
    return `${cx+rad*Math.cos(angle)},${cy+rad*Math.sin(angle)}`;
  }).join(' ');
  return <polygon points={pts} fill="#f97316" stroke="#0d1117" strokeWidth="1.5"/>;
}

export default function MlopsVectorDbVisualization() {
  const [idxTab, setIdxTab] = useState('HNSW');

  return (
    <div className="mlopsvdb-wrap">
      <div className="mlopsvdb-top">
        <div className="mlopsvdb-space-wrap">
          <p className="mlopsvdb-sec-title">2D Vector Space</p>
          <svg viewBox="0 0 400 220" className="mlopsvdb-svg">
            <rect x="0" y="0" width="400" height="220" fill="#161b22" rx="8"/>
            {VECTORS.map(v=>{
              const isNear = NEAREST.includes(v.id);
              return (
                <g key={v.id}>
                  {isNear && <line x1={QUERY.x} y1={QUERY.y} x2={v.x} y2={v.y} stroke="#56d364" strokeWidth="1" strokeDasharray="4 3" opacity="0.6"/>}
                  <circle cx={v.x} cy={v.y} r={isNear?8:6}
                    fill={isNear?'#56d364':'#30363d'}
                    stroke={isNear?'#56d364':'#21262d'} strokeWidth="1.5"/>
                  <text x={v.x+10} y={v.y+4} fontSize="10" fill={isNear?'#56d364':'#6b7785'}>{v.label}</text>
                </g>
              );
            })}
            <StarShape cx={QUERY.x} cy={QUERY.y} r={10}/>
            <text x={QUERY.x+14} y={QUERY.y+4} fontSize="10" fill="#f97316" fontWeight="700">Query</text>
            <text x={8} y={215} fontSize="9" fill="#6b7785">Green = nearest 3 neighbours</text>
          </svg>
        </div>

        <div className="mlopsvdb-right">
          <p className="mlopsvdb-sec-title">DB Comparison</p>
          <table className="mlopsvdb-table">
            <thead><tr>
              {['DB','Managed','Self-Host','Filtering','SDK'].map(h=>(
                <th key={h} className="mlopsvdb-th">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {DB_COMPARE.map(r=>(
                <tr key={r.name} className="mlopsvdb-tr">
                  <td className="mlopsvdb-td mlopsvdb-td--name">{r.name}</td>
                  <td className="mlopsvdb-td">{r.managed}</td>
                  <td className="mlopsvdb-td">{r.selfHost}</td>
                  <td className="mlopsvdb-td">{r.filtering}</td>
                  <td className="mlopsvdb-td">{r.lang}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mlopsvdb-index">
        <p className="mlopsvdb-sec-title">Index Types</p>
        <div className="mlopsvdb-idx-tabs">
          {INDEX_TYPES.map(t=>(
            <button key={t.name}
              className={`mlopsvdb-idx-tab${idxTab===t.name?' mlopsvdb-idx-tab--active':''}`}
              onClick={()=>setIdxTab(t.name)}>{t.name}</button>
          ))}
        </div>
        <p className="mlopsvdb-idx-desc">{INDEX_TYPES.find(t=>t.name===idxTab)?.desc}</p>
      </div>
    </div>
  );
}
