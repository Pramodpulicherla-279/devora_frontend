/* Lesson: Evaluation Metrics
 * Visual type: INTERACTIVE
 * Reason: LLM-app eval metrics (relevance, faithfulness, etc.) are abstract until
 * you score a sample answer and watch an overall grade update — a mini eval bench. */
import React, { useState } from 'react';
import './visual.css';

const METRICS = [
  { k: 'Relevance', d: 'Does the answer address the question?' },
  { k: 'Faithfulness', d: 'Is it grounded in the retrieved context (no hallucination)?' },
  { k: 'Completeness', d: 'Does it cover everything asked?' },
  { k: 'Conciseness', d: 'No rambling or filler?' },
];

const AiAppEvalVisualization = () => {
  const [scores, setScores] = useState({ Relevance: 4, Faithfulness: 3, Completeness: 4, Conciseness: 5 });
  const avg = Object.values(scores).reduce((a, b) => a + b, 0) / 4;
  const grade = avg >= 4.5 ? 'Excellent' : avg >= 3.5 ? 'Good' : avg >= 2.5 ? 'Fair' : 'Poor';
  const color = avg >= 4.5 ? '#34d399' : avg >= 3.5 ? '#38bdf8' : avg >= 2.5 ? '#f59e0b' : '#f85149';

  return (
    <div className="aieval-wrap">
      <header className="aieval-head">
        <span className="aieval-badge">AI Apps</span>
        <h2>Evaluation Metrics</h2>
        <p>Grade an LLM answer across the dimensions that matter</p>
      </header>
      <div className="aieval-sample">
        <div className="aieval-q">Q: "What's the refund window?"</div>
        <div className="aieval-a">A: "You can request a refund within 30 days of purchase per §4.2."</div>
      </div>
      <div className="aieval-metrics">
        {METRICS.map((m) => (
          <div key={m.k} className="aieval-metric">
            <div className="aieval-mhead"><span>{m.k}</span><strong>{scores[m.k]}/5</strong></div>
            <input type="range" min="1" max="5" value={scores[m.k]} onChange={(e) => setScores((s) => ({ ...s, [m.k]: Number(e.target.value) }))} className="aieval-slider" />
            <div className="aieval-mdesc">{m.d}</div>
          </div>
        ))}
      </div>
      <div className="aieval-overall" style={{ borderColor: color }}>
        Overall: <strong style={{ color }}>{avg.toFixed(1)}/5 — {grade}</strong>
      </div>
      <div className="aieval-note">In practice, an <strong>LLM-as-judge</strong> scores these automatically across hundreds of test cases — turning vibes into a number you can track over time.</div>
    </div>
  );
};
export default AiAppEvalVisualization;
