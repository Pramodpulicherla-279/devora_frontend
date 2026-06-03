/* Lesson: OpenAI GPT-4 & o-Series
 * Visual type: ILLUSTRATION
 * Reason: This is a model-family comparison — annotated cards comparing the
 * variants on speed/cost/reasoning are the right format. */
import React, { useState } from 'react';
import './visual.css';

const MODELS = [
  { id: 'gpt4o', name: 'GPT-4o', tag: 'Flagship multimodal', speed: 4, cost: 3, reason: 4, use: 'General chat, vision, fast multimodal tasks' },
  { id: 'gpt4omini', name: 'GPT-4o mini', tag: 'Cheap & fast', speed: 5, cost: 1, reason: 3, use: 'High-volume, cost-sensitive tasks' },
  { id: 'o1', name: 'o-series (o1/o3)', tag: 'Deep reasoning', speed: 2, cost: 5, reason: 5, use: 'Hard math, coding, multi-step logic' },
];
const Bars = ({ n, color }) => <span className="llmgpt-bars">{[1,2,3,4,5].map((i) => <span key={i} className="llmgpt-pip" style={{ background: i <= n ? color : '#30363d' }} />)}</span>;

const LlmGptVisualization = () => {
  const [active, setActive] = useState('gpt4o');
  const m = MODELS.find((x) => x.id === active);
  return (
    <div className="llmgpt-wrap">
      <header className="llmgpt-head">
        <span className="llmgpt-badge">OpenAI</span>
        <h2>GPT-4 &amp; o-Series</h2>
        <p>Picking the right model for the job</p>
      </header>
      <div className="llmgpt-tabs">
        {MODELS.map((x) => (
          <button key={x.id} className={`llmgpt-tab ${active === x.id ? 'llmgpt-tab--on' : ''}`} onClick={() => setActive(x.id)}>{x.name}</button>
        ))}
      </div>
      <div className="llmgpt-card">
        <div className="llmgpt-card-top"><span className="llmgpt-name">{m.name}</span><span className="llmgpt-tag">{m.tag}</span></div>
        <div className="llmgpt-metrics">
          <div className="llmgpt-metric"><span>Speed</span><Bars n={m.speed} color="#34d399" /></div>
          <div className="llmgpt-metric"><span>Reasoning</span><Bars n={m.reason} color="#60a5fa" /></div>
          <div className="llmgpt-metric"><span>Cost</span><Bars n={m.cost} color="#f59e0b" /></div>
        </div>
        <div className="llmgpt-use">Best for: {m.use}</div>
      </div>
      <div className="llmgpt-note">o-series models "think" before answering (chain-of-thought) — slower &amp; pricier, but far stronger on hard reasoning. GPT-4o family is the fast, multimodal default.</div>
    </div>
  );
};
export default LlmGptVisualization;
