import { useState } from 'react';
import './visual.css';

const INPUTS = {
  safe: { text: 'How do I bake sourdough bread?', flagged: false },
  flagged: { text: '[harmful request content]', flagged: true },
};

const CATEGORIES = ['hate', 'violence', 'self-harm', 'sexual', 'harassment'];

export default function BaiContentSafetyVisualization() {
  const [input, setInput] = useState('safe');
  const i = INPUTS[input];

  const inputBlocked = i.flagged;
  const reachesLlm = !inputBlocked;

  return (
    <div className="baicnt-wrap">
      <h3 className="baicnt-title">Content Moderation & Output Safety</h3>
      <p className="baicnt-sub">Screen on the way in and on the way out</p>

      <div className="baicnt-toggle">
        <button className={`baicnt-tog ${input === 'safe' ? 'baicnt-tog-safe' : ''}`} onClick={() => setInput('safe')}>😊 Safe input</button>
        <button className={`baicnt-tog ${input === 'flagged' ? 'baicnt-tog-flag' : ''}`} onClick={() => setInput('flagged')}>⚠️ Harmful input</button>
      </div>

      <div className="baicnt-pipeline">
        <div className="baicnt-stage">📥 Input<div className="baicnt-stage-val">"{i.text}"</div></div>
        <div className="baicnt-arrow">→</div>
        <div className={`baicnt-stage baicnt-gate ${inputBlocked ? 'baicnt-blocked' : 'baicnt-passed'}`}>
          🛡️ Moderation<div className="baicnt-stage-val">{inputBlocked ? '🚫 BLOCKED' : '✓ pass'}</div>
        </div>
        <div className="baicnt-arrow">→</div>
        <div className={`baicnt-stage ${reachesLlm ? '' : 'baicnt-skipped'}`}>🤖 LLM<div className="baicnt-stage-val">{reachesLlm ? 'generates' : 'never reached'}</div></div>
        <div className="baicnt-arrow">→</div>
        <div className={`baicnt-stage baicnt-gate ${reachesLlm ? 'baicnt-passed' : 'baicnt-skipped'}`}>🛡️ Output check<div className="baicnt-stage-val">{reachesLlm ? '✓ safe' : '—'}</div></div>
      </div>

      <div className="baicnt-cats">
        <div className="baicnt-cats-h">Moderation categories scored</div>
        <div className="baicnt-cats-list">
          {CATEGORIES.map(c => (
            <span key={c} className={`baicnt-cat ${inputBlocked && c === 'hate' ? 'baicnt-cat-hit' : ''}`}>{c}</span>
          ))}
        </div>
      </div>

      <pre className="baicnt-code">{`const mod = await moderate(userInput);
if (mod.flagged) return reject('Content violates policy');
const out = await llm(userInput);
if ((await moderate(out)).flagged) return filter(out);
return out;`}</pre>
    </div>
  );
}
