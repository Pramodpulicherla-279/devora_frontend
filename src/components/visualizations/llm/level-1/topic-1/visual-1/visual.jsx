/* Lesson: What is an LLM
 * Visual type: ILLUSTRATION (light interactivity)
 * Reason: The core idea — an LLM predicts the next token from probabilities —
 * is best shown as an annotated "given context → ranked next tokens" diagram. */
import React, { useState } from 'react';
import './visual.css';

const PREDICTIONS = {
  'The cat sat on the': [['mat', 42], ['floor', 21], ['chair', 14], ['roof', 9], ['couch', 7]],
  'I love to': [['code', 28], ['eat', 22], ['travel', 18], ['read', 16], ['sleep', 9]],
  'JavaScript is a': [['language', 38], ['programming', 24], ['popular', 15], ['scripting', 12], ['dynamic', 8]],
};

const LlmWhatIsVisualization = () => {
  const [prompt, setPrompt] = useState('The cat sat on the');
  const [picked, setPicked] = useState(null);
  const preds = PREDICTIONS[prompt];
  return (
    <div className="llmwhat-wrap">
      <header className="llmwhat-head">
        <span className="llmwhat-badge">LLM</span>
        <h2>What is an LLM?</h2>
        <p>At its core: a very good next-token predictor</p>
      </header>
      <div className="llmwhat-prompts">
        {Object.keys(PREDICTIONS).map((p) => (
          <button key={p} className={`llmwhat-prompt ${prompt === p ? 'llmwhat-prompt--on' : ''}`} onClick={() => { setPrompt(p); setPicked(null); }}>"{p}…"</button>
        ))}
      </div>
      <div className="llmwhat-context">
        <span className="llmwhat-ctx-label">context</span>
        <span className="llmwhat-ctx-text">{prompt} <span className="llmwhat-cursor">{picked || '▮'}</span></span>
      </div>
      <div className="llmwhat-preds">
        <div className="llmwhat-preds-label">predicted next token →</div>
        {preds.map(([tok, prob]) => (
          <button key={tok} className={`llmwhat-pred ${picked === tok ? 'llmwhat-pred--picked' : ''}`} onClick={() => setPicked(tok)}>
            <span className="llmwhat-tok">{tok}</span>
            <span className="llmwhat-bar"><span className="llmwhat-fill" style={{ width: `${prob}%` }} /></span>
            <span className="llmwhat-prob">{prob}%</span>
          </button>
        ))}
      </div>
      <div className="llmwhat-note">The model assigns a probability to every possible next token, then samples one. Repeat token-by-token → a full response. No "understanding" — just learned statistical patterns over trillions of words.</div>
    </div>
  );
};
export default LlmWhatIsVisualization;
