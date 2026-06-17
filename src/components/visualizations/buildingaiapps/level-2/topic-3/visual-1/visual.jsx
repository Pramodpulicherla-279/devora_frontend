import { useState } from 'react';
import './visual.css';

const CASES = [
  { input: 'Refund policy?', a: { correct: 5, relevant: 5, faith: 5, concise: 4 }, b: { correct: 3, relevant: 4, faith: 2, concise: 5 } },
  { input: 'Shipping time?', a: { correct: 4, relevant: 5, faith: 5, concise: 5 }, b: { correct: 3, relevant: 3, faith: 3, concise: 4 } },
  { input: 'Cancel order?', a: { correct: 5, relevant: 4, faith: 5, concise: 4 }, b: { correct: 4, relevant: 4, faith: 3, concise: 3 } },
];

const METRICS = [['correct', 'Correctness'], ['relevant', 'Relevance'], ['faith', 'Faithfulness'], ['concise', 'Conciseness']];

export default function BaiPromptEvalVisualization() {
  const [variant, setVariant] = useState('a');
  const [caseIdx, setCaseIdx] = useState(0);
  const scores = CASES[caseIdx][variant];

  const avg = (v) => (CASES.reduce((sum, c) => sum + Object.values(c[v]).reduce((a, b) => a + b, 0) / 4, 0) / CASES.length).toFixed(1);

  return (
    <div className="baieval-wrap">
      <h3 className="baieval-title">Prompt Evaluation</h3>
      <p className="baieval-sub">Score prompt variants against test cases — A/B systematically</p>

      <div className="baieval-variants">
        <button className={`baieval-var ${variant === 'a' ? 'baieval-var-a' : ''}`} onClick={() => setVariant('a')}>Prompt A — avg {avg('a')}</button>
        <button className={`baieval-var ${variant === 'b' ? 'baieval-var-b' : ''}`} onClick={() => setVariant('b')}>Prompt B — avg {avg('b')}</button>
      </div>

      <div className="baieval-cases">
        {CASES.map((c, i) => (
          <button key={i} className={`baieval-case ${caseIdx === i ? 'baieval-case-active' : ''}`} onClick={() => setCaseIdx(i)}>{c.input}</button>
        ))}
      </div>

      <div className="baieval-scores">
        {METRICS.map(([k, label]) => (
          <div key={k} className="baieval-metric">
            <div className="baieval-metric-head"><span>{label}</span><span>{scores[k]}/5</span></div>
            <div className="baieval-bar"><div className="baieval-fill" style={{ width: `${(scores[k] / 5) * 100}%`, background: scores[k] >= 4 ? '#56d364' : scores[k] >= 3 ? '#f0883e' : '#f85149' }} /></div>
          </div>
        ))}
      </div>

      <div className="baieval-verdict">🏆 Prompt {avg('a') >= avg('b') ? 'A' : 'B'} wins overall ({Math.max(avg('a'), avg('b'))} avg). Always compare on the same test set.</div>
    </div>
  );
}
