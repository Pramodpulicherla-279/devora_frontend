import { useState } from 'react';
import './visual.css';

const TEMPLATES = {
  review: { label: 'Code Review', text: 'Review this {{language}} code for {{focus}}:\n\n{{code}}' },
  summary: { label: 'Summarization', text: 'Summarize the text below in {{count}} bullet points for a {{audience}} audience:\n\n{{text}}' },
  translate: { label: 'Translation', text: 'Translate the following into {{target}}, keeping a {{tone}} tone:\n\n{{source}}' },
};

const VARS = {
  review: { language: 'Python', focus: 'security bugs', code: 'def login(u, p): ...' },
  summary: { count: '3', audience: 'executive', text: 'Q3 revenue rose 12%...' },
  translate: { target: 'French', tone: 'formal', source: 'Hello, how are you?' },
};

export default function CptTemplatesVisualization() {
  const [key, setKey] = useState('review');
  const [vars, setVars] = useState(VARS);
  const [format, setFormat] = useState('text');

  const tpl = TEMPLATES[key];
  const current = vars[key];

  let filled = tpl.text;
  Object.entries(current).forEach(([k, v]) => {
    filled = filled.replaceAll(`{{${k}}}`, v || `{{${k}}}`);
  });
  if (format === 'json') filled += '\n\nRespond as JSON: { "result": ... }';
  if (format === 'markdown') filled += '\n\nFormat your response in Markdown.';

  const update = (k, v) => setVars(s => ({ ...s, [key]: { ...s[key], [k]: v } }));

  return (
    <div className="cpttpl-root">
      <h3 className="cpttpl-title">Prompt Templates & Formatting</h3>
      <p className="cpttpl-subtitle">Reusable templates with {'{{variables}}'} you fill at runtime</p>

      <div className="cpttpl-tabs">
        {Object.entries(TEMPLATES).map(([k, t]) => (
          <button key={k} className={`cpttpl-tab ${key === k ? 'cpttpl-tab-active' : ''}`} onClick={() => setKey(k)}>{t.label}</button>
        ))}
      </div>

      <div className="cpttpl-inputs">
        {Object.keys(current).map(k => (
          <div key={k} className="cpttpl-input-row">
            <label className="cpttpl-input-label">{k}</label>
            <input className="cpttpl-input" value={current[k]} onChange={e => update(k, e.target.value)} />
          </div>
        ))}
      </div>

      <div className="cpttpl-format">
        <span className="cpttpl-format-label">Output format:</span>
        {['text', 'json', 'markdown'].map(f => (
          <button key={f} className={`cpttpl-fmt ${format === f ? 'cpttpl-fmt-active' : ''}`} onClick={() => setFormat(f)}>{f}</button>
        ))}
      </div>

      <div className="cpttpl-preview-label">Live prompt preview</div>
      <pre className="cpttpl-preview">{filled}</pre>
    </div>
  );
}
