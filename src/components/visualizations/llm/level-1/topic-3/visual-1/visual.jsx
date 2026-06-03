/* Lesson: Temperature & Parameters
 * Visual type: INTERACTIVE
 * Reason: Temperature reshapes the token probability distribution. Sliding it and
 * watching the bars flatten (creative) or sharpen (deterministic) is the clearest
 * possible demonstration. */
import React, { useState } from 'react';
import './visual.css';

const BASE = [['mat', 4.0], ['floor', 2.6], ['chair', 1.8], ['roof', 1.0], ['couch', 0.6]];

function softmax(logits, temp) {
  const t = Math.max(0.01, temp);
  const exps = logits.map((l) => Math.exp(l / t));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / sum);
}

const LlmTemperatureVisualization = () => {
  const [temp, setTemp] = useState(0.7);
  const [topP, setTopP] = useState(1);
  const probs = softmax(BASE.map((b) => b[1]), temp);
  const max = Math.max(...probs);
  const desc = temp < 0.4 ? 'Deterministic — almost always picks the top token. Good for facts, code.' : temp < 0.9 ? 'Balanced — coherent but with some variety. Good default.' : 'Creative — flatter distribution, more surprising picks. Good for brainstorming.';

  return (
    <div className="llmtemp-wrap">
      <header className="llmtemp-head">
        <span className="llmtemp-badge">LLM</span>
        <h2>Temperature &amp; Parameters</h2>
        <p>How "random" the next-token pick is</p>
      </header>
      <div className="llmtemp-bars">
        {BASE.map(([tok], i) => (
          <div key={tok} className="llmtemp-row">
            <span className="llmtemp-tok">{tok}</span>
            <span className="llmtemp-bar"><span className="llmtemp-fill" style={{ width: `${(probs[i] / max) * 100}%`, opacity: 0.5 + probs[i] }} /></span>
            <span className="llmtemp-prob">{(probs[i] * 100).toFixed(0)}%</span>
          </div>
        ))}
      </div>
      <div className="llmtemp-controls">
        <label>Temperature: {temp.toFixed(1)}
          <input type="range" min="0.1" max="1.5" step="0.1" value={temp} onChange={(e) => setTemp(Number(e.target.value))} className="llmtemp-slider" />
        </label>
        <label>top_p: {topP.toFixed(2)}
          <input type="range" min="0.1" max="1" step="0.05" value={topP} onChange={(e) => setTopP(Number(e.target.value))} className="llmtemp-slider llmtemp-slider--p" />
        </label>
      </div>
      <div className="llmtemp-desc">{desc}</div>
      <div className="llmtemp-params">
        <div className="llmtemp-param"><code>temperature</code> — flattens/sharpens probabilities</div>
        <div className="llmtemp-param"><code>top_p</code> — only sample from the top {Math.round(topP * 100)}% probability mass</div>
        <div className="llmtemp-param"><code>max_tokens</code> — cap the response length</div>
      </div>
    </div>
  );
};
export default LlmTemperatureVisualization;
