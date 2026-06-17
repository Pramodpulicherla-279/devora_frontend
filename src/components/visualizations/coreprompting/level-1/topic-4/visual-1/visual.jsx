import { useState } from 'react';
import './visual.css';

const STEPS = [
  'Roger starts with 5 tennis balls.',
  'He buys 2 cans, each with 3 balls.',
  '2 cans × 3 balls = 6 new balls.',
  '5 + 6 = 11 balls total.',
];

export default function CptChainOfThoughtVisualization() {
  const [mode, setMode] = useState('cot');
  const [revealed, setRevealed] = useState(0);

  const reveal = () => setRevealed(r => Math.min(r + 1, STEPS.length));

  return (
    <div className="cptcot-root">
      <h3 className="cptcot-title">Chain-of-Thought Prompting</h3>
      <p className="cptcot-subtitle">Ask the model to reason step by step before answering</p>

      <div className="cptcot-problem">
        <span className="cptcot-q-label">Q:</span> Roger has 5 tennis balls. He buys 2 cans of 3 balls each. How many balls does he have now?
      </div>

      <div className="cptcot-toggle">
        <button className={`cptcot-tog ${mode === 'standard' ? 'cptcot-tog-active' : ''}`}
          onClick={() => setMode('standard')}>Standard prompt</button>
        <button className={`cptcot-tog ${mode === 'cot' ? 'cptcot-tog-active' : ''}`}
          onClick={() => { setMode('cot'); setRevealed(0); }}>Chain-of-Thought</button>
      </div>

      {mode === 'standard' ? (
        <div className="cptcot-standard">
          <div className="cptcot-trigger-text">Prompt: "...How many balls? Answer:"</div>
          <div className="cptcot-answer cptcot-answer-wrong">8 ❌</div>
          <div className="cptcot-note">Jumps straight to an answer — and gets it wrong.</div>
        </div>
      ) : (
        <div className="cptcot-cot">
          <div className="cptcot-trigger-text">Prompt adds: "Let's think step by step."</div>
          <div className="cptcot-steps">
            {STEPS.map((s, i) => (
              <div key={i} className={`cptcot-step ${i < revealed ? 'cptcot-step-shown' : 'cptcot-step-hidden'}`}>
                <span className="cptcot-step-num">{i + 1}</span>{s}
              </div>
            ))}
          </div>
          {revealed < STEPS.length
            ? <button className="cptcot-reveal" onClick={reveal}>▶ Reveal next step</button>
            : <div className="cptcot-answer cptcot-answer-right">11 ✅</div>}
        </div>
      )}
    </div>
  );
}
