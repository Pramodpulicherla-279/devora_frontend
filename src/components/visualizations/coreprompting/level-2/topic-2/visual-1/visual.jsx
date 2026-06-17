import { useState, useMemo } from 'react';
import './visual.css';

const PATHS = [
  { reasoning: 'Split into 12 + 3, then ×4…', answer: '60' },
  { reasoning: 'Distribute 4 across 15…', answer: '60' },
  { reasoning: 'Estimate 15×4 directly…', answer: '60' },
  { reasoning: 'Misread as 15×3…', answer: '45' },
  { reasoning: 'Carry error in multiply…', answer: '54' },
  { reasoning: 'Group as (10+5)×4…', answer: '60' },
  { reasoning: 'Double twice: 15→30→60', answer: '60' },
];

export default function CptSelfConsistencyVisualization() {
  const [n, setN] = useState(5);
  const active = PATHS.slice(0, n);

  const tally = useMemo(() => {
    const counts = {};
    active.forEach(p => { counts[p.answer] = (counts[p.answer] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [n]);

  const winner = tally[0]?.[0];

  return (
    <div className="cptsc-root">
      <h3 className="cptsc-title">Self-Consistency</h3>
      <p className="cptsc-subtitle">Sample multiple reasoning paths, then take the majority vote</p>

      <div className="cptsc-control">
        <span className="cptsc-control-label">Number of samples: {n}</span>
        <div className="cptsc-btns">
          {[3, 5, 7].map(v => (
            <button key={v} className={`cptsc-btn ${n === v ? 'cptsc-btn-active' : ''}`} onClick={() => setN(v)}>{v}</button>
          ))}
        </div>
      </div>

      <div className="cptsc-paths">
        {active.map((p, i) => (
          <div key={i} className={`cptsc-path ${p.answer === winner ? 'cptsc-path-win' : 'cptsc-path-lose'}`}>
            <span className="cptsc-path-reason">Path {i + 1}: {p.reasoning}</span>
            <span className="cptsc-path-ans">→ {p.answer}</span>
          </div>
        ))}
      </div>

      <div className="cptsc-tally">
        <div className="cptsc-tally-h">Vote tally</div>
        {tally.map(([ans, count]) => (
          <div key={ans} className="cptsc-vote">
            <span className="cptsc-vote-ans">{ans}</span>
            <div className="cptsc-vote-bar">
              <div className="cptsc-vote-fill" style={{ width: `${(count / n) * 100}%`, background: ans === winner ? '#56d364' : '#8b949e' }} />
            </div>
            <span className="cptsc-vote-count">{count}</span>
          </div>
        ))}
      </div>

      <div className="cptsc-result">🏆 Majority answer: <strong>{winner}</strong> — more robust than trusting a single chain.</div>
    </div>
  );
}
