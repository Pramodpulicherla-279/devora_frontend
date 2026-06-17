import { useState } from 'react';
import './visual.css';

const TRAINING = [
  { label: 'Text Corpus', desc: 'Trillions of tokens from books, web, code', icon: '📚' },
  { label: 'Tokenize', desc: 'Split text into tokens, convert to IDs', icon: '🔢' },
  { label: 'Forward Pass', desc: 'Predict the next token for each position', icon: '➡️' },
  { label: 'Loss', desc: 'Compare prediction vs actual next token', icon: '📉' },
  { label: 'Backward Pass', desc: 'Compute gradients via backpropagation', icon: '⬅️' },
  { label: 'Update Weights', desc: 'Adjust billions of parameters — repeat', icon: '🔄' },
];

const INFERENCE = [
  { label: 'User Prompt', desc: 'Your question or instruction', icon: '💬' },
  { label: 'Tokenize', desc: 'Convert prompt into token IDs', icon: '🔢' },
  { label: 'Forward Pass', desc: 'Run through FROZEN weights — no learning', icon: '➡️' },
  { label: 'Sample Token', desc: 'Pick next token from probability distribution', icon: '🎲' },
  { label: 'Output', desc: 'Append token, repeat until done', icon: '✨' },
];

export default function LlmTrainingInferenceVisualization() {
  const [mode, setMode] = useState('training');
  const [step, setStep] = useState(0);
  const steps = mode === 'training' ? TRAINING : INFERENCE;
  const isLoop = mode === 'training';

  const switchMode = (m) => { setMode(m); setStep(0); };

  return (
    <div className="llmtrain-wrap">
      <h3 className="llmtrain-title">Training vs Inference</h3>
      <p className="llmtrain-sub">Two fundamentally different phases of a language model's life</p>

      <div className="llmtrain-toggle">
        <button className={`llmtrain-tog-btn ${mode === 'training' ? 'llmtrain-tog-active' : ''}`}
          onClick={() => switchMode('training')}>🏋️ Training</button>
        <button className={`llmtrain-tog-btn ${mode === 'inference' ? 'llmtrain-tog-active' : ''}`}
          onClick={() => switchMode('inference')}>⚡ Inference</button>
      </div>

      <div className="llmtrain-flow">
        {steps.map((s, i) => (
          <div key={i} className="llmtrain-step-wrap">
            <button className={`llmtrain-step ${step === i ? 'llmtrain-step-active' : ''}`}
              onClick={() => setStep(i)}>
              <span className="llmtrain-step-icon">{s.icon}</span>
              <span className="llmtrain-step-label">{s.label}</span>
            </button>
            {i < steps.length - 1 && <span className="llmtrain-arrow">→</span>}
          </div>
        ))}
        {isLoop && <span className="llmtrain-loop-badge">↻ loops millions of times</span>}
      </div>

      <div className="llmtrain-detail">
        <span className="llmtrain-detail-icon">{steps[step].icon}</span>
        <div>
          <div className="llmtrain-detail-name">{steps[step].label}</div>
          <div className="llmtrain-detail-desc">{steps[step].desc}</div>
        </div>
      </div>

      <div className="llmtrain-compare">
        <div className="llmtrain-cmp-card">
          <div className="llmtrain-cmp-h">🏋️ Training</div>
          <ul className="llmtrain-cmp-list">
            <li>Weights <strong>change</strong> every step</li>
            <li>Costs millions of $, GPU-weeks</li>
            <li>Done once (then fine-tuned)</li>
            <li>Needs labelled/raw corpus</li>
          </ul>
        </div>
        <div className="llmtrain-cmp-card">
          <div className="llmtrain-cmp-h">⚡ Inference</div>
          <ul className="llmtrain-cmp-list">
            <li>Weights are <strong>frozen</strong></li>
            <li>Costs fractions of a cent</li>
            <li>Runs on every request</li>
            <li>Milliseconds to seconds</li>
          </ul>
        </div>
      </div>

      <p className="llmtrain-note">💡 Fine-tuning is a <em>lighter</em> round of training: same loop, but starting from a pretrained model with a small dataset.</p>
    </div>
  );
}
