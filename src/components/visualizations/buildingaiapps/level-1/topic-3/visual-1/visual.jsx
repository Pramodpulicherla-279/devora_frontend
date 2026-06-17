import { useState, useMemo } from 'react';
import './visual.css';

const MODELS = [
  { name: 'GPT-4o', inP: 2.5, outP: 10 },
  { name: 'Claude Opus 4.8', inP: 15, outP: 75 },
  { name: 'Claude Haiku', inP: 0.8, outP: 4 },
];

export default function BaiCostRateLimitsVisualization() {
  const [tab, setTab] = useState('cost');
  const [words, setWords] = useState(500);
  const [model, setModel] = useState(0);
  const [reqLoad, setReqLoad] = useState(20);

  const tokens = Math.round(words / 0.75);
  const m = MODELS[model];
  const costPer = useMemo(() => {
    const inCost = (tokens / 1e6) * m.inP;
    const outCost = (tokens / 1e6) * m.outP;
    return inCost + outCost;
  }, [tokens, model]);

  return (
    <div className="baicost-wrap">
      <h3 className="baicost-title">Managing Costs & Rate Limits</h3>
      <p className="baicost-sub">Estimate spend and watch your throughput budget</p>

      <div className="baicost-tabs">
        <button className={`baicost-tab ${tab === 'cost' ? 'baicost-tab-active' : ''}`} onClick={() => setTab('cost')}>💰 Cost estimator</button>
        <button className={`baicost-tab ${tab === 'rate' ? 'baicost-tab-active' : ''}`} onClick={() => setTab('rate')}>📊 Rate limits</button>
      </div>

      {tab === 'cost' ? (
        <>
          <label className="baicost-label">Prompt size: {words} words (~{tokens} tokens)</label>
          <input className="baicost-slider" type="range" min="50" max="4000" step="50" value={words} onChange={e => setWords(+e.target.value)} />
          <div className="baicost-models">
            {MODELS.map((mod, i) => (
              <button key={i} className={`baicost-model ${model === i ? 'baicost-model-active' : ''}`} onClick={() => setModel(i)}>{mod.name}</button>
            ))}
          </div>
          <div className="baicost-out">
            <div className="baicost-out-card"><div className="baicost-num">${costPer.toFixed(4)}</div><div className="baicost-cap">per call</div></div>
            <div className="baicost-out-card"><div className="baicost-num">${(costPer * 1000).toFixed(2)}</div><div className="baicost-cap">per 1,000 calls</div></div>
          </div>
          <p className="baicost-note">Output tokens usually cost 3–5× input tokens. Trim prompts and cap max_tokens to save money.</p>
        </>
      ) : (
        <>
          <label className="baicost-label">Simulated load: {reqLoad} req/min</label>
          <input className="baicost-slider" type="range" min="0" max="100" value={reqLoad} onChange={e => setReqLoad(+e.target.value)} />
          <div className="baicost-gauges">
            <div className="baicost-gauge">
              <div className="baicost-gauge-head"><span>Requests / min</span><span>{reqLoad} / 60</span></div>
              <div className="baicost-track"><div className="baicost-fill" style={{ width: `${Math.min(100, (reqLoad / 60) * 100)}%`, background: reqLoad > 60 ? '#f85149' : '#56d364' }} /></div>
            </div>
            <div className="baicost-gauge">
              <div className="baicost-gauge-head"><span>Tokens / min</span><span>{(reqLoad * 700).toLocaleString()} / 40k</span></div>
              <div className="baicost-track"><div className="baicost-fill" style={{ width: `${Math.min(100, ((reqLoad * 700) / 40000) * 100)}%`, background: reqLoad * 700 > 40000 ? '#f85149' : '#56d364' }} /></div>
            </div>
          </div>
          {(reqLoad > 60 || reqLoad * 700 > 40000) && <div className="baicost-warn">⚠️ Over the limit — requests will get 429s. Add a queue or request a higher tier.</div>}
        </>
      )}
    </div>
  );
}
