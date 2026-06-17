import { useState } from 'react';
import './visual.css';

const MODES = {
  free: { label: 'Free text', output: 'Sure! The sentiment seems mostly positive, maybe around 0.8 or so.', valid: false, note: 'Unparseable — you cannot reliably extract a number.' },
  json: { label: 'JSON mode', output: '{ "sentiment": "positive", "score": 0.8, "extra": "nice!" }', valid: true, note: 'Valid JSON, but no guarantee it matches your schema.' },
  structured: { label: 'Structured output', output: '{ "sentiment": "positive", "score": 0.8 }', valid: true, note: 'Conforms exactly to the schema — safe to use directly.' },
};

export default function BaiStructuredOutputVisualization() {
  const [mode, setMode] = useState('structured');
  const m = MODES[mode];

  return (
    <div className="baistruct-wrap">
      <h3 className="baistruct-title">Structured Outputs & JSON Mode</h3>
      <p className="baistruct-sub">Force the model to return data your code can parse</p>

      <div className="baistruct-grid">
        <div className="baistruct-schema">
          <div className="baistruct-h">📋 Your schema</div>
          <pre className="baistruct-code">{`{
  "type": "object",
  "properties": {
    "sentiment": { "enum": ["positive","negative","neutral"] },
    "score": { "type": "number" }
  },
  "required": ["sentiment", "score"]
}`}</pre>
        </div>
        <div className="baistruct-output">
          <div className="baistruct-h">🤖 Model output</div>
          <div className="baistruct-modes">
            {Object.entries(MODES).map(([k, v]) => (
              <button key={k} className={`baistruct-mode ${mode === k ? 'baistruct-mode-active' : ''}`} onClick={() => setMode(k)}>{v.label}</button>
            ))}
          </div>
          <pre className={`baistruct-result ${m.valid ? 'baistruct-valid' : 'baistruct-invalid'}`}>{m.output}</pre>
          <div className={`baistruct-status ${m.valid ? 'baistruct-ok' : 'baistruct-bad'}`}>
            {m.valid ? '✓ parseable' : '✗ cannot parse'} — {m.note}
          </div>
        </div>
      </div>

      <pre className="baistruct-api">{`// Anthropic: use a tool to force structure
tools: [{ name: 'extract', input_schema: schema }],
tool_choice: { type: 'tool', name: 'extract' }`}</pre>
    </div>
  );
}
