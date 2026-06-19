/* Lesson: What Is a Prompt Really?
 * Visual: Prompt anatomy — instruction + context + input become tokens the model continues */
import { useState } from 'react';
import './visual.css';

const PARTS = [
  { id: 'instruction', label: 'Instruction', color: '#a78bfa', text: 'Summarise the email below in one sentence.', desc: 'What you want the model to do.' },
  { id: 'context', label: 'Context', color: '#58a6ff', text: 'You are a helpful assistant for a busy manager.', desc: 'Background / role that shapes the answer.' },
  { id: 'input', label: 'Input', color: '#56d364', text: '"Hi team, the Q3 review is moved to Friday 3pm..."', desc: 'The actual data to act on.' },
];

export default function LlmWhatIsPromptVisualization() {
  const [on, setOn] = useState({ instruction: true, context: true, input: true });
  const active = PARTS.filter(p => on[p.id]);
  const tokenEst = Math.round(active.reduce((n, p) => n + p.text.length, 0) / 4);

  return (
    <div className="llmprompt-wrap">
      <h3 className="llmprompt-title">What Is a Prompt, Really?</h3>
      <p className="llmprompt-sub">A prompt is just text the model continues — usually three ingredients</p>

      <div className="llmprompt-toggles">
        {PARTS.map(p => (
          <button key={p.id} className={`llmprompt-tog ${on[p.id] ? 'llmprompt-tog-on' : ''}`}
            style={on[p.id] ? { borderColor: p.color, color: p.color } : {}}
            onClick={() => setOn(s => ({ ...s, [p.id]: !s[p.id] }))}>
            {on[p.id] ? '✓ ' : '+ '}{p.label}
          </button>
        ))}
      </div>

      <div className="llmprompt-assembled">
        {active.length === 0 && <span className="llmprompt-empty">Add ingredients to build a prompt…</span>}
        {active.map(p => (
          <span key={p.id} className="llmprompt-seg" style={{ borderLeftColor: p.color }}>
            <span className="llmprompt-seg-label" style={{ color: p.color }}>{p.label}</span>
            {p.text}
          </span>
        ))}
      </div>

      <div className="llmprompt-flow">
        <span className="llmprompt-node">📝 Prompt text</span>
        <span className="llmprompt-arrow">→</span>
        <span className="llmprompt-node">🔢 ~{tokenEst} tokens</span>
        <span className="llmprompt-arrow">→</span>
        <span className="llmprompt-node llmprompt-model">🤖 model continues</span>
        <span className="llmprompt-arrow">→</span>
        <span className="llmprompt-node llmprompt-out">✨ completion</span>
      </div>

      <p className="llmprompt-note">💡 There's no magic syntax — the model simply predicts what text should come next. Clear instruction + relevant context + the input = a good prompt.</p>
    </div>
  );
}
