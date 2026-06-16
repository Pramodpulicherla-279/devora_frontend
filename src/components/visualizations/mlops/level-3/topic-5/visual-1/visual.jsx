import { useState } from 'react';
import './visual.css';

const COMPONENTS = [
  { id:'frontend',  label:'Frontend\n(React)',     x:20,  y:80,  w:90,  h:44, color:'#58a6ff', tech:'React + Vite',       role:'User interface, chat or query input.', sla:'<100ms TTFB via CDN' },
  { id:'cdn',       label:'CDN',                   x:130, y:80,  w:70,  h:44, color:'#a3adbb', tech:'Cloudflare / S3',    role:'Static asset delivery and caching.', sla:'<20ms edge latency' },
  { id:'gateway',   label:'API Gateway',            x:220, y:80,  w:95,  h:44, color:'#f97316', tech:'Kong / AWS APIGW',   role:'Auth, rate limiting, routing.', sla:'<5ms overhead' },
  { id:'fastapi',   label:'FastAPI',                x:335, y:80,  w:80,  h:44, color:'#56d364', tech:'Python FastAPI',     role:'Orchestration, RAG pipeline, caching.', sla:'p99 <500ms' },
  { id:'vllm',      label:'Model Service\n(vLLM)', x:130, y:190, w:100, h:44, color:'#56d364', tech:'vLLM on GPU',        role:'High-throughput LLM inference.', sla:'<2s first token' },
  { id:'pinecone',  label:'Vector DB\n(Pinecone)', x:255, y:190, w:100, h:44, color:'#58a6ff', tech:'Pinecone Serverless', role:'Semantic search for RAG context.', sla:'<50ms p99 query' },
  { id:'llmapi',    label:'LLM API\n(Anthropic)',  x:380, y:190, w:105, h:44, color:'#f97316', tech:'Claude via API',     role:'Managed LLM for complex reasoning.', sla:'Provider SLA ~99.9%' },
];

const EDGES = [
  ['frontend','cdn'],['cdn','gateway'],['gateway','fastapi'],
  ['fastapi','vllm'],['fastapi','pinecone'],['fastapi','llmapi'],
];

function midpoint(a,b){ return { x:(a[0]+b[0])/2, y:(a[1]+b[1])/2 }; }

export default function MlopsEndToEndVisualization() {
  const [selected, setSelected] = useState(null);
  const active = COMPONENTS.find(c=>c.id===selected);

  const compMap = Object.fromEntries(COMPONENTS.map(c=>[c.id,c]));

  function cx(c){ return c.x + c.w/2; }
  function cy(c){ return c.y + c.h/2; }

  return (
    <div className="mlopsend-wrap">
      <p className="mlopsend-hint">Click a component to see its role and SLA.</p>
      <svg viewBox="0 0 500 260" className="mlopsend-svg">
        {EDGES.map(([a,b])=>{
          const ca=compMap[a], cb=compMap[b];
          return <line key={a+b} x1={cx(ca)} y1={cy(ca)} x2={cx(cb)} y2={cy(cb)}
            stroke="#30363d" strokeWidth="1.5" markerEnd="url(#ea)"/>;
        })}
        <defs>
          <marker id="ea" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#30363d"/>
          </marker>
        </defs>
        {COMPONENTS.map(c=>{
          const isActive = selected===c.id;
          const lines = c.label.split('\n');
          return (
            <g key={c.id} style={{cursor:'pointer'}} onClick={()=>setSelected(selected===c.id?null:c.id)}>
              <rect x={c.x} y={c.y} width={c.w} height={c.h} rx="6"
                fill={isActive?c.color+'22':'#161b22'}
                stroke={isActive?c.color:'#30363d'} strokeWidth={isActive?2:1.5}/>
              {lines.map((l,i)=>(
                <text key={i} x={c.x+c.w/2} y={c.y+c.h/2+(i-(lines.length-1)/2)*13+2}
                  textAnchor="middle" fontSize="10"
                  fill={isActive?c.color:'#a3adbb'} fontWeight={isActive?'700':'400'}>
                  {l}
                </text>
              ))}
            </g>
          );
        })}
      </svg>

      {active ? (
        <div className="mlopsend-detail">
          <div className="mlopsend-detail-grid">
            <div className="mlopsend-detail-item"><span className="mlopsend-dl">Tech</span><span className="mlopsend-dv">{active.tech}</span></div>
            <div className="mlopsend-detail-item"><span className="mlopsend-dl">Role</span><span className="mlopsend-dv">{active.role}</span></div>
            <div className="mlopsend-detail-item"><span className="mlopsend-dl">SLA Target</span><span className="mlopsend-dv mlopsend-sla">{active.sla}</span></div>
          </div>
        </div>
      ) : (
        <div className="mlopsend-placeholder">Select a component above</div>
      )}
    </div>
  );
}
