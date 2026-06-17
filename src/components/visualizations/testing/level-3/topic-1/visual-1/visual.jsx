import { useState } from 'react';
import './visual.css';

const QUERIES = [
  { q: 'getByRole', target: 'button', priority: 1, note: 'Preferred — matches how users & a11y tools see the page.' },
  { q: 'getByLabelText', target: 'email-input', priority: 2, note: 'Best for form fields tied to a <label>.' },
  { q: 'getByPlaceholderText', target: 'email-input', priority: 3, note: 'Use when there is no label (less ideal).' },
  { q: 'getByText', target: 'heading', priority: 4, note: 'For non-interactive text content.' },
  { q: 'getByTestId', target: 'form', priority: 6, note: 'Escape hatch — last resort only.' },
  { q: 'getByAltText', target: 'logo', priority: 5, note: 'For images via their alt text.' },
];

export default function TstRtlVisualization() {
  const [sel, setSel] = useState(0);
  const q = QUERIES[sel];

  return (
    <div className="tstrtl-wrap">
      <h3 className="tstrtl-title">React Testing Library Queries</h3>
      <p className="tstrtl-sub">Query the DOM the way a user would — by role, label, text</p>

      <div className="tstrtl-preview">
        <div className="tstrtl-preview-h">Rendered login form</div>
        <div className={`tstrtl-el ${q.target === 'heading' ? 'tstrtl-hl' : ''}`}>Sign In</div>
        <div className={`tstrtl-el tstrtl-input ${q.target === 'email-input' ? 'tstrtl-hl' : ''}`}>📧 Email (placeholder "you@example.com")</div>
        <div className={`tstrtl-el tstrtl-input ${q.target === 'form' ? 'tstrtl-hl' : ''}`}>🔒 Password</div>
        <div className={`tstrtl-el tstrtl-btn ${q.target === 'button' ? 'tstrtl-hl' : ''}`}>Log in</div>
        <div className={`tstrtl-el ${q.target === 'logo' ? 'tstrtl-hl' : ''}`}>🖼️ alt="Acme logo"</div>
      </div>

      <div className="tstrtl-queries">
        {QUERIES.map((query, i) => (
          <button key={i} className={`tstrtl-query ${sel === i ? 'tstrtl-query-active' : ''}`} onClick={() => setSel(i)}>
            <span className="tstrtl-query-name">{query.q}</span>
            <span className="tstrtl-query-pri">#{query.priority}</span>
          </button>
        ))}
      </div>

      <div className="tstrtl-note">{q.note}</div>
      <pre className="tstrtl-code">{`const btn = screen.${q.q}(${q.q === 'getByRole' ? "'button', { name: /log in/i }" : "/.../i"});
await userEvent.click(btn);`}</pre>
    </div>
  );
}
