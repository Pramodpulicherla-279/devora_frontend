import { useState } from 'react';
import './visual.css';

const STRATEGIES = [
  { name: 'Exact match', reliability: 'High', use: 'Structured outputs, classifications', code: "expect(result).toBe('positive')" },
  { name: 'Contains check', reliability: 'Medium', use: 'Key facts must appear', code: "expect(result).toContain('refund')" },
  { name: 'JSON schema', reliability: 'High', use: 'Validate structured JSON output', code: 'expect(() => schema.parse(json)).not.toThrow()' },
  { name: 'LLM-as-judge', reliability: 'Medium', use: 'Semantic / open-ended quality', code: "const score = await judge('Is this helpful?', out)" },
  { name: 'Regex pattern', reliability: 'Medium', use: 'Format checks (dates, emails)', code: 'expect(result).toMatch(/^\\d{4}-\\d{2}/)' },
];

export default function BaiTestingAiVisualization() {
  const [sel, setSel] = useState(0);
  const [ran, setRan] = useState(false);
  const s = STRATEGIES[sel];

  return (
    <div className="baitst-wrap">
      <h3 className="baitst-title">Testing AI Outputs</h3>
      <p className="baitst-sub">LLM outputs vary — pick an assertion that fits the task</p>

      <div className="baitst-cards">
        {STRATEGIES.map((st, i) => (
          <button key={i} className={`baitst-card ${sel === i ? 'baitst-card-active' : ''}`} onClick={() => { setSel(i); setRan(false); }}>
            <span className="baitst-card-name">{st.name}</span>
            <span className={`baitst-rel baitst-rel-${st.reliability.toLowerCase()}`}>{st.reliability}</span>
          </button>
        ))}
      </div>

      <div className="baitst-detail">
        <div className="baitst-row"><span className="baitst-k">Use for</span>{s.use}</div>
        <pre className="baitst-code">{s.code}</pre>
      </div>

      <button className="baitst-run" onClick={() => setRan(true)}>▶ Run test</button>
      {ran && (
        <div className="baitst-results">
          <div className="baitst-result baitst-pass">✓ case 1 passed</div>
          <div className="baitst-result baitst-pass">✓ case 2 passed</div>
          <div className="baitst-result baitst-fail">✗ case 3 failed — output drifted</div>
        </div>
      )}
    </div>
  );
}
