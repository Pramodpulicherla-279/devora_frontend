/* Lesson: Evaluating Fine-Tuned Models
 * Visual type: INTERACTIVE
 * Reason: Evaluation means comparing base vs fine-tuned on metrics. A toggle
 * between the two showing metric bars move makes "did it actually help?" tangible. */
import React, { useState } from 'react';
import './visual.css';

const METRICS = [
  { k: 'Accuracy', base: 71, ft: 89 },
  { k: 'Format adherence', base: 55, ft: 96 },
  { k: 'Tone match', base: 60, ft: 92 },
  { k: 'Latency (lower=better)', base: 40, ft: 38, invert: true },
];

const RagEvalVisualization = () => {
  const [model, setModel] = useState('ft');
  return (
    <div className="rageval-wrap">
      <header className="rageval-head">
        <span className="rageval-badge">Fine-Tuning</span>
        <h2>Evaluating Fine-Tuned Models</h2>
        <p>Did fine-tuning actually help? Measure, don't guess</p>
      </header>
      <div className="rageval-toggle">
        <button className={`rageval-tbtn ${model === 'base' ? 'rageval-tbtn--on' : ''}`} onClick={() => setModel('base')}>Base model</button>
        <button className={`rageval-tbtn rageval-tbtn--ft ${model === 'ft' ? 'rageval-tbtn--on' : ''}`} onClick={() => setModel('ft')}>Fine-tuned</button>
      </div>
      <div className="rageval-metrics">
        {METRICS.map((m) => {
          const v = model === 'ft' ? m.ft : m.base;
          const better = m.invert ? m.ft < m.base : m.ft > m.base;
          return (
            <div key={m.k} className="rageval-metric">
              <span className="rageval-mk">{m.k}</span>
              <span className="rageval-bar"><span className="rageval-fill" style={{ width: `${v}%`, background: model === 'ft' && better ? '#34d399' : '#60a5fa' }} /></span>
              <span className="rageval-val">{v}{m.invert ? 'ms' : '%'}</span>
            </div>
          );
        })}
      </div>
      <div className="rageval-methods">
        <div className="rageval-method"><strong>Held-out test set</strong><p>Score on examples the model never trained on.</p></div>
        <div className="rageval-method"><strong>LLM-as-judge</strong><p>Use a strong model to grade outputs at scale.</p></div>
        <div className="rageval-method"><strong>Human review</strong><p>Spot-check the cases that matter most.</p></div>
      </div>
      <div className="rageval-note">Always compare against the <strong>base model</strong> baseline. If fine-tuning doesn't beat a good prompt + RAG, it wasn't worth the cost.</div>
    </div>
  );
};
export default RagEvalVisualization;
