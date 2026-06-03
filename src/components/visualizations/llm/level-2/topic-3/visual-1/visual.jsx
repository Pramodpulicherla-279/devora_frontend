/* Lesson: Open-Source (Llama, Mistral)
 * Visual type: ILLUSTRATION
 * Reason: The closed-vs-open trade-off (control/cost/privacy vs convenience) is
 * conceptual — a comparison plus a decision guide communicates it best. */
import React, { useState } from 'react';
import './visual.css';

const LlmOpenSourceVisualization = () => {
  const [view, setView] = useState('compare');
  return (
    <div className="llmos-wrap">
      <header className="llmos-head">
        <span className="llmos-badge">Open-Source</span>
        <h2>Open-Source LLMs</h2>
        <p>Llama, Mistral &amp; friends — run them yourself</p>
      </header>
      <div className="llmos-tabs">
        <button className={`llmos-tab ${view === 'compare' ? 'llmos-tab--on' : ''}`} onClick={() => setView('compare')}>Open vs Closed</button>
        <button className={`llmos-tab ${view === 'models' ? 'llmos-tab--on' : ''}`} onClick={() => setView('models')}>The Models</button>
      </div>
      {view === 'compare' ? (
        <div className="llmos-compare">
          <div className="llmos-col llmos-col--open">
            <div className="llmos-col-head">🔓 Open-Source</div>
            <ul><li>✓ Run on your own hardware</li><li>✓ Full data privacy</li><li>✓ No per-token cost</li><li>✓ Fine-tune freely</li><li>✗ You manage infra/GPUs</li><li>✗ Often behind frontier models</li></ul>
          </div>
          <div className="llmos-col llmos-col--closed">
            <div className="llmos-col-head">🔒 Closed (API)</div>
            <ul><li>✓ Best quality, zero ops</li><li>✓ Instant scaling</li><li>✗ Data leaves your servers</li><li>✗ Pay per token</li><li>✗ Vendor lock-in</li></ul>
          </div>
        </div>
      ) : (
        <div className="llmos-models">
          {[['Llama 3', 'Meta', 'Strong general open model, many sizes (8B–405B)'], ['Mistral / Mixtral', 'Mistral AI', 'Efficient; Mixtral uses Mixture-of-Experts'], ['Qwen, Gemma, Phi', 'Various', 'Compact models that punch above their size']].map(([n, m, d]) => (
            <div key={n} className="llmos-model"><strong>{n}</strong><span className="llmos-maker">{m}</span><p>{d}</p></div>
          ))}
        </div>
      )}
      <div className="llmos-note">Run them via Ollama, LM Studio, or vLLM. Great when privacy, cost-at-scale, or customization matter more than squeezing out the last few % of quality.</div>
    </div>
  );
};
export default LlmOpenSourceVisualization;
