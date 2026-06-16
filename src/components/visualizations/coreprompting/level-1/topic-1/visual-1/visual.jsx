import React, { useState } from 'react';
import './visual.css';

const tasks = [
  {
    id: 'sentiment',
    label: 'Classify Sentiment',
    prompt: 'Classify the sentiment of the following text as Positive, Negative, or Neutral.\n\nText: "The new software update completely ruined my workflow. Nothing works as expected."\n\nSentiment:',
    output: 'Negative',
    explanation: 'The model identifies negative language ("completely ruined", "nothing works") without any prior examples.',
  },
  {
    id: 'translate',
    label: 'Translate Text',
    prompt: 'Translate the following English sentence into French.\n\nEnglish: "The quick brown fox jumps over the lazy dog."\n\nFrench:',
    output: 'Le renard brun rapide saute par-dessus le chien paresseux.',
    explanation: 'The model uses its training knowledge to translate directly — no translation examples needed.',
  },
  {
    id: 'summarize',
    label: 'Summarize',
    prompt: 'Summarize the following paragraph in one sentence.\n\nParagraph: "Artificial intelligence has transformed industries ranging from healthcare to finance. Machine learning models can now diagnose diseases, detect fraud, and personalize content at scale. However, concerns about bias, privacy, and job displacement remain significant challenges."\n\nSummary:',
    output: 'AI is revolutionizing multiple industries but raises important concerns around bias, privacy, and employment.',
    explanation: 'The model produces a concise summary purely from the instruction — no summarization examples were provided.',
  },
];

const CptZeroShotVisualization = () => {
  const [activeTab, setActiveTab] = useState('sentiment');

  const active = tasks.find(t => t.id === activeTab);

  return (
    <div className="cptzero-root">
      <div className="cptzero-header">
        <span className="cptzero-badge">Zero-Shot</span>
        <h2 className="cptzero-title">Prompt → Model → Output</h2>
        <p className="cptzero-subtitle">No examples. Just an instruction.</p>
      </div>

      <div className="cptzero-flow">
        <div className="cptzero-flow-node cptzero-node-prompt">
          <div className="cptzero-node-icon">✍️</div>
          <div className="cptzero-node-label">Prompt</div>
          <div className="cptzero-node-sub">Instruction only</div>
        </div>
        <div className="cptzero-flow-arrow">
          <svg width="60" height="24" viewBox="0 0 60 24">
            <line x1="0" y1="12" x2="48" y2="12" stroke="#a78bfa" strokeWidth="2"/>
            <polygon points="48,7 60,12 48,17" fill="#a78bfa"/>
          </svg>
        </div>
        <div className="cptzero-flow-node cptzero-node-model">
          <div className="cptzero-node-icon">🤖</div>
          <div className="cptzero-node-label">LLM</div>
          <div className="cptzero-node-sub">No examples given</div>
        </div>
        <div className="cptzero-flow-arrow">
          <svg width="60" height="24" viewBox="0 0 60 24">
            <line x1="0" y1="12" x2="48" y2="12" stroke="#a78bfa" strokeWidth="2"/>
            <polygon points="48,7 60,12 48,17" fill="#a78bfa"/>
          </svg>
        </div>
        <div className="cptzero-flow-node cptzero-node-output">
          <div className="cptzero-node-icon">💡</div>
          <div className="cptzero-node-label">Output</div>
          <div className="cptzero-node-sub">Direct answer</div>
        </div>
      </div>

      <div className="cptzero-no-examples-banner">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="#a78bfa" strokeWidth="1.5"/>
          <line x1="5" y1="8" x2="11" y2="8" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="8" y1="5" x2="8" y2="11" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        No examples needed — the model relies entirely on its training
      </div>

      <div className="cptzero-tabs">
        {tasks.map(t => (
          <button
            key={t.id}
            className={`cptzero-tab${activeTab === t.id ? ' cptzero-tab-active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="cptzero-panels">
        <div className="cptzero-panel cptzero-panel-prompt">
          <div className="cptzero-panel-header">
            <span className="cptzero-dot cptzero-dot-violet"></span>
            Raw Prompt
          </div>
          <pre className="cptzero-code">{active.prompt}</pre>
        </div>

        <div className="cptzero-panel cptzero-panel-output">
          <div className="cptzero-panel-header">
            <span className="cptzero-dot cptzero-dot-green"></span>
            Model Output
          </div>
          <div className="cptzero-output-text">{active.output}</div>
          <div className="cptzero-explanation">{active.explanation}</div>
        </div>
      </div>
    </div>
  );
};

export default CptZeroShotVisualization;
