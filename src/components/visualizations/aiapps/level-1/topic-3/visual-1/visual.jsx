/* Lesson: Function Calling & Cost Optimisation
 * Visual type: INTERACTIVE
 * Reason: Token cost is best understood with a live calculator — adjust model,
 * input/output tokens and call volume to watch the monthly bill change. */
import React, { useState } from 'react';
import './visual.css';

const MODELS = {
  'gpt-4o-mini': { in: 0.15, out: 0.60 },
  'gpt-4o': { in: 2.5, out: 10 },
  'o-series': { in: 15, out: 60 },
};

const AiAppCostVisualization = () => {
  const [model, setModel] = useState('gpt-4o-mini');
  const [inTok, setInTok] = useState(1000);
  const [outTok, setOutTok] = useState(500);
  const [calls, setCalls] = useState(10000);
  const m = MODELS[model];
  const perCall = (inTok / 1e6) * m.in + (outTok / 1e6) * m.out;
  const monthly = perCall * calls;

  return (
    <div className="aicost-wrap">
      <header className="aicost-head">
        <span className="aicost-badge">AI Apps</span>
        <h2>Function Calling &amp; Cost</h2>
        <p>Estimate your token bill before it surprises you</p>
      </header>
      <div className="aicost-models">
        {Object.keys(MODELS).map((k) => (
          <button key={k} className={`aicost-model ${model === k ? 'aicost-model--on' : ''}`} onClick={() => setModel(k)}>{k}</button>
        ))}
      </div>
      <div className="aicost-controls">
        <label>Input tokens/call: {inTok.toLocaleString()}<input type="range" min="100" max="8000" step="100" value={inTok} onChange={(e) => setInTok(Number(e.target.value))} className="aicost-slider" /></label>
        <label>Output tokens/call: {outTok.toLocaleString()}<input type="range" min="50" max="4000" step="50" value={outTok} onChange={(e) => setOutTok(Number(e.target.value))} className="aicost-slider" /></label>
        <label>Calls/month: {calls.toLocaleString()}<input type="range" min="1000" max="1000000" step="1000" value={calls} onChange={(e) => setCalls(Number(e.target.value))} className="aicost-slider" /></label>
      </div>
      <div className="aicost-result">
        <div className="aicost-per"><span>Per call</span><strong>${perCall.toFixed(5)}</strong></div>
        <div className="aicost-month"><span>Per month</span><strong>${monthly.toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong></div>
      </div>
      <div className="aicost-tips">
        <div className="aicost-tip">💡 Use a smaller model (mini) for simple tasks — often 15× cheaper</div>
        <div className="aicost-tip">💡 Trim prompts &amp; cap max_tokens — output tokens cost most</div>
        <div className="aicost-tip">💡 Cache repeated context; batch where possible</div>
      </div>
    </div>
  );
};
export default AiAppCostVisualization;
