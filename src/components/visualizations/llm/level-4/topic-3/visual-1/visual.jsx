/* Lesson: What LLMs Can / Can't Do
 * Visual: Task classifier — good fit vs risky vs needs-tools */
import { useState } from 'react';
import './visual.css';

const TASKS = [
  { t: 'Summarise a document', verdict: 'good', why: 'Core strength — condensing provided text.' },
  { t: 'Translate languages', verdict: 'good', why: 'Strong across major languages.' },
  { t: 'Write & explain code', verdict: 'good', why: 'Excellent for common patterns and explanations.' },
  { t: 'Today\'s news / live data', verdict: 'tools', why: 'Training data is frozen — needs web/search tools.' },
  { t: 'Exact arithmetic on big numbers', verdict: 'tools', why: 'Predicts tokens, not a calculator — use a tool.' },
  { t: 'Cite real sources / facts', verdict: 'risky', why: 'May hallucinate — ground with retrieval (RAG).' },
  { t: 'Know what it doesn\'t know', verdict: 'risky', why: 'Often confidently wrong — verify critical output.' },
];

const META = {
  good: { label: '✅ Good fit', color: '#56d364' },
  risky: { label: '⚠️ Risky', color: '#f0883e' },
  tools: { label: '🔧 Needs tools', color: '#58a6ff' },
};

export default function LlmCapabilitiesVisualization() {
  const [sel, setSel] = useState(0);
  const task = TASKS[sel];
  const m = META[task.verdict];

  return (
    <div className="llmcap-wrap">
      <h3 className="llmcap-title">What LLMs Can &amp; Can't Do</h3>
      <p className="llmcap-sub">Click a task to see whether an LLM handles it well on its own</p>

      <div className="llmcap-tasks">
        {TASKS.map((x, i) => (
          <button key={i} className={`llmcap-task ${sel === i ? 'llmcap-task-on' : ''}`} onClick={() => setSel(i)}
            style={sel === i ? { borderColor: META[x.verdict].color } : {}}>
            <span className="llmcap-dot" style={{ background: META[x.verdict].color }} />{x.t}
          </button>
        ))}
      </div>

      <div className="llmcap-detail" style={{ borderColor: m.color }}>
        <div className="llmcap-verdict" style={{ color: m.color }}>{m.label}</div>
        <div className="llmcap-why">{task.why}</div>
      </div>

      <div className="llmcap-legend">
        {Object.values(META).map(v => (
          <span key={v.label} className="llmcap-leg"><span className="llmcap-dot" style={{ background: v.color }} />{v.label}</span>
        ))}
      </div>
    </div>
  );
}
