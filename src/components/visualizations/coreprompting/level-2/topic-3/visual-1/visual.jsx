import { useState } from 'react';
import './visual.css';

const PERSONAS = [
  { id: 'expert', label: 'Expert Python Dev', system: 'You are a senior Python engineer. Be precise, idiomatic, and mention performance trade-offs.', answer: 'Use a set for O(1) membership: `seen = set(items)`. Lists give O(n) lookups — quadratic in a loop.' },
  { id: 'teacher', label: 'Friendly Teacher', system: 'You are a patient teacher for beginners. Use simple words and an everyday analogy.', answer: 'Think of a set like a guest list — checking a name is instant, no matter how long the list. A list makes you read every name!' },
  { id: 'socratic', label: 'Socratic Tutor', system: 'You are a Socratic tutor. Never give the answer directly — ask guiding questions.', answer: 'Good question! What happens to lookup time as your list grows? Which data structure is built for fast membership checks?' },
  { id: 'reviewer', label: 'Senior Code Reviewer', system: 'You are a strict code reviewer. Point out issues and suggest concrete fixes.', answer: 'NIT: this `in list` check inside a loop is O(n²). Convert to a set before the loop. Also add a type hint.' },
];

export default function CptRolePersonaVisualization() {
  const [id, setId] = useState('expert');
  const p = PERSONAS.find(x => x.id === id);

  return (
    <div className="cptrole-root">
      <h3 className="cptrole-title">Role & Persona Prompting</h3>
      <p className="cptrole-subtitle">The same question, four personas — tone and depth change completely</p>

      <div className="cptrole-cards">
        {PERSONAS.map(per => (
          <button key={per.id} className={`cptrole-card ${id === per.id ? 'cptrole-card-active' : ''}`}
            onClick={() => setId(per.id)}>{per.label}</button>
        ))}
      </div>

      <div className="cptrole-system">
        <span className="cptrole-sys-tag">SYSTEM</span>
        <span className="cptrole-sys-text">{p.system}</span>
      </div>

      <div className="cptrole-user">
        <span className="cptrole-user-tag">USER</span>
        <span className="cptrole-user-text">"How do I check if an item is in a big list quickly?"</span>
      </div>

      <div className="cptrole-answer">
        <span className="cptrole-ans-tag">ASSISTANT</span>
        <div className="cptrole-ans-text">{p.answer}</div>
      </div>
    </div>
  );
}
