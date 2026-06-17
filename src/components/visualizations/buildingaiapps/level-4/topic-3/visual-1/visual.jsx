import { useState } from 'react';
import './visual.css';

const TREE = [
  { q: 'Is the prompt clear & specific?', no: 'Rewrite — add context, constraints, examples', yes: 1 },
  { q: 'Is the model right for the task?', no: 'Switch to a more capable model', yes: 2 },
  { q: 'Are the few-shot examples good?', no: 'Improve examples — diverse, consistent format', yes: 3 },
  { q: 'Is temperature too high?', no: 'Lower temperature for consistency', yes: 4 },
  { q: 'Is the context window exceeded?', no: 'Chunk input / summarise history', yes: 'done' },
];

export default function BaiDebuggingAiVisualization() {
  const [step, setStep] = useState(0);
  const [path, setPath] = useState([]);

  const node = typeof step === 'number' ? TREE[step] : null;

  const answer = (val) => {
    if (val === 'no') {
      setPath(p => [...p, { q: node.q, fix: node.no }]);
      setStep('fixed');
    } else {
      if (node.yes === 'done') setStep('done');
      else { setPath(p => [...p, { q: node.q, fix: 'OK ✓' }]); setStep(node.yes); }
    }
  };

  const reset = () => { setStep(0); setPath([]); };

  return (
    <div className="baidbg-wrap">
      <h3 className="baidbg-title">Debugging Bad AI Outputs</h3>
      <p className="baidbg-sub">Work down the decision tree to find the root cause</p>

      <div className="baidbg-start">😞 Bad output received — let's diagnose</div>

      {typeof step === 'number' && (
        <div className="baidbg-question">
          <div className="baidbg-q">{node.q}</div>
          <div className="baidbg-btns">
            <button className="baidbg-btn baidbg-no" onClick={() => answer('no')}>❌ No</button>
            <button className="baidbg-btn baidbg-yes" onClick={() => answer('yes')}>✅ Yes</button>
          </div>
        </div>
      )}

      {step === 'fixed' && (
        <div className="baidbg-result baidbg-result-fix">
          🔧 Found it! Fix: <strong>{path[path.length - 1].fix}</strong>
          <button className="baidbg-reset" onClick={reset}>↺ Start over</button>
        </div>
      )}
      {step === 'done' && (
        <div className="baidbg-result baidbg-result-done">
          ✅ All checks pass — the issue may be inherent model limitation. Consider RAG or fine-tuning.
          <button className="baidbg-reset" onClick={reset}>↺ Start over</button>
        </div>
      )}

      {path.length > 0 && (
        <div className="baidbg-path">
          {path.map((p, i) => (
            <div key={i} className="baidbg-path-row"><span className="baidbg-path-q">{p.q}</span><span className="baidbg-path-fix">{p.fix}</span></div>
          ))}
        </div>
      )}
    </div>
  );
}
