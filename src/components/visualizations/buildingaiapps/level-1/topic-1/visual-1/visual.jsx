import { useState } from 'react';
import './visual.css';

const FIELDS = [
  { key: 'model', val: '"claude-opus-4-8"', desc: 'Which model to call — balances cost, speed, capability.' },
  { key: 'messages', val: '[ {role, content}, … ]', desc: 'The conversation: system + user turns.' },
  { key: 'max_tokens', val: '1024', desc: 'Hard cap on the length of the response.' },
  { key: 'temperature', val: '0.7', desc: '0 = deterministic, higher = more creative/random.' },
];

const PROVIDERS = {
  anthropic: `const res = await anthropic.messages.create({
  model: 'claude-opus-4-8',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello!' }],
});
res.content[0].text;`,
  openai: `const res = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Hello!' }],
});
res.choices[0].message.content;`,
};

export default function BaiUsingApisVisualization() {
  const [sel, setSel] = useState(0);
  const [prov, setProv] = useState('anthropic');

  return (
    <div className="baiapi-wrap">
      <h3 className="baiapi-title">Using AI APIs</h3>
      <p className="baiapi-sub">Anatomy of a chat completion request and response</p>

      <div className="baiapi-fields">
        {FIELDS.map((f, i) => (
          <button key={i} className={`baiapi-field ${sel === i ? 'baiapi-field-active' : ''}`} onClick={() => setSel(i)}>
            <span className="baiapi-field-key">{f.key}</span>
            <span className="baiapi-field-val">{f.val}</span>
          </button>
        ))}
      </div>

      <div className="baiapi-detail">{FIELDS[sel].desc}</div>

      <div className="baiapi-prov">
        {Object.keys(PROVIDERS).map(p => (
          <button key={p} className={`baiapi-prov-btn ${prov === p ? 'baiapi-prov-active' : ''}`} onClick={() => setProv(p)}>{p}</button>
        ))}
      </div>
      <pre className="baiapi-code">{PROVIDERS[prov]}</pre>

      <div className="baiapi-resp">
        <div className="baiapi-resp-h">Response shape</div>
        <div className="baiapi-resp-row"><span>content / message</span> the generated text</div>
        <div className="baiapi-resp-row"><span>usage</span> input_tokens + output_tokens (you pay per token)</div>
        <div className="baiapi-resp-row"><span>stop_reason</span> why it stopped (end_turn, max_tokens)</div>
      </div>
    </div>
  );
}
