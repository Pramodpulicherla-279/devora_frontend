import { useState } from 'react';
import './visual.css';

const PROVIDERS = [
  { id:'openai',    label:'OpenAI',     inPrice:0.005, outPrice:0.015, model:'gpt-4o',       rateLimit:'10k RPM',  retry:'Exp backoff + jitter' },
  { id:'anthropic', label:'Anthropic',  inPrice:0.003, outPrice:0.015, model:'claude-3-5',   rateLimit:'4k RPM',   retry:'Retry-After header' },
  { id:'google',    label:'Google',     inPrice:0.00125,outPrice:0.005,model:'gemini-1.5',   rateLimit:'1k RPM',   retry:'429 → wait 60s' },
];

const RETRY = [
  { label:'1st attempt', delay:'0s', status:'429' },
  { label:'Retry 1',     delay:'1s', status:'429' },
  { label:'Retry 2',     delay:'2s', status:'200' },
];

export default function MlopsManagedApisVisualization() {
  const [provider, setProvider] = useState('openai');
  const [tokensIn, setTokensIn] = useState(1000);
  const [tokensOut, setTokensOut] = useState(500);
  const p = PROVIDERS.find(x=>x.id===provider);
  const cost = ((tokensIn/1000)*p.inPrice + (tokensOut/1000)*p.outPrice).toFixed(4);

  const FLOW = ['App','Auth Header',`${p.label} API`,'Response'];

  return (
    <div className="mlopsapis-wrap">
      <div className="mlopsapis-provider-row">
        {PROVIDERS.map(pr=>(
          <button key={pr.id}
            className={`mlopsapis-ptab${provider===pr.id?' mlopsapis-ptab--active':''}`}
            onClick={()=>setProvider(pr.id)}>{pr.label}</button>
        ))}
      </div>

      <div className="mlopsapis-flow">
        {FLOW.map((step,i)=>(
          <div key={step} className="mlopsapis-flow-item">
            <div className={`mlopsapis-box${i===2?' mlopsapis-box--provider':''}`}>{step}</div>
            {i<FLOW.length-1 && <div className="mlopsapis-arrow">→</div>}
          </div>
        ))}
      </div>
      <div className="mlopsapis-meta">
        <span className="mlopsapis-badge">Model: {p.model}</span>
        <span className="mlopsapis-badge">Rate limit: {p.rateLimit}</span>
        <span className="mlopsapis-badge">tokens_in → tokens_out</span>
      </div>

      <div className="mlopsapis-calc">
        <p className="mlopsapis-calc-title">Cost Calculator</p>
        <div className="mlopsapis-inputs">
          <label className="mlopsapis-input-label">Input tokens
            <input type="number" className="mlopsapis-input" value={tokensIn} min={0} onChange={e=>setTokensIn(+e.target.value)}/>
          </label>
          <label className="mlopsapis-input-label">Output tokens
            <input type="number" className="mlopsapis-input" value={tokensOut} min={0} onChange={e=>setTokensOut(+e.target.value)}/>
          </label>
          <div className="mlopsapis-cost-out">
            <span className="mlopsapis-cost-label">Est. cost</span>
            <span className="mlopsapis-cost-val">${cost}</span>
          </div>
        </div>
      </div>

      <div className="mlopsapis-retry">
        <p className="mlopsapis-calc-title">Rate-limit retry strategy: {p.retry}</p>
        <div className="mlopsapis-retry-row">
          {RETRY.map((r,i)=>(
            <div key={i} className="mlopsapis-retry-step">
              <div className={`mlopsapis-retry-status mlopsapis-retry-status--${r.status}`}>{r.status}</div>
              <div className="mlopsapis-retry-label">{r.label}</div>
              {i<RETRY.length-1 && <div className="mlopsapis-retry-delay">{RETRY[i+1].delay}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
