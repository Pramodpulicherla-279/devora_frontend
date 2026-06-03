/* Lesson: A/B Testing Prompts
 * Visual type: INTERACTIVE
 * Reason: Prompt A/B testing = compare two prompt variants on a metric. A
 * side-by-side with adjustable win counts and a significance read mirrors a real
 * prompt-experiment dashboard. */
import React, { useState } from 'react';
import './visual.css';

const AiAppAbPromptsVisualization = () => {
  const [aWins, setAWins] = useState(48);
  const [bWins, setBWins] = useState(67);
  const total = aWins + bWins;
  const pA = total ? aWins / total : 0.5;
  const pB = total ? bWins / total : 0.5;
  const se = total ? Math.sqrt((pA * (1 - pA)) / total + (pB * (1 - pB)) / total) : 1;
  const z = se ? Math.abs(pB - pA) / se : 0;
  const sig = z > 1.96 && total > 30;

  return (
    <div className="aiab-wrap">
      <header className="aiab-head">
        <span className="aiab-badge">AI Apps</span>
        <h2>A/B Testing Prompts</h2>
        <p>Which prompt produces better outputs? Measure it</p>
      </header>
      <div className="aiab-variants">
        <div className="aiab-variant aiab-variant--a">
          <div className="aiab-vtag">Prompt A</div>
          <code className="aiab-prompt">"Summarize this."</code>
          <div className="aiab-wins">{aWins} wins</div>
          <input type="range" min="0" max="120" value={aWins} onChange={(e) => setAWins(Number(e.target.value))} className="aiab-slider" />
        </div>
        <div className="aiab-vs">vs</div>
        <div className="aiab-variant aiab-variant--b">
          <div className="aiab-vtag">Prompt B</div>
          <code className="aiab-prompt">"Summarize in 3 bullet points for a busy exec."</code>
          <div className="aiab-wins">{bWins} wins</div>
          <input type="range" min="0" max="120" value={bWins} onChange={(e) => setBWins(Number(e.target.value))} className="aiab-slider aiab-slider--b" />
        </div>
      </div>
      <div className={`aiab-verdict ${sig ? (pB > pA ? 'aiab-verdict--b' : 'aiab-verdict--a') : 'aiab-verdict--none'}`}>
        {sig ? `${pB > pA ? 'Prompt B' : 'Prompt A'} wins — significant (z=${z.toFixed(2)})` : `Too close / too few samples (z=${z.toFixed(2)})`}
      </div>
      <div className="aiab-note">Run both prompts on the same test inputs, judge outputs (human or LLM), and only ship the winner when the lead is <strong>statistically significant</strong> — not just a few lucky runs.</div>
    </div>
  );
};
export default AiAppAbPromptsVisualization;
