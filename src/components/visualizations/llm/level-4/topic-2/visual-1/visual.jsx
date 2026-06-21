/* Lesson: Choosing the Right Model for Your Task
 * Visual: Requirements selector → recommended model tier (cost vs capability vs speed) */
import { useState, useMemo } from 'react';
import './visual.css';

const TIERS = {
  small: { name: 'Small / fast (Haiku, GPT-4o-mini)', cost: '$', speed: '⚡⚡⚡', use: 'High volume, simple tasks, classification, extraction.' },
  mid: { name: 'Mid (Sonnet, GPT-4o)', cost: '$$', speed: '⚡⚡', use: 'Balanced — most production features, good reasoning.' },
  large: { name: 'Frontier (Opus, GPT-4.1)', cost: '$$$', speed: '⚡', use: 'Hard reasoning, agents, nuanced writing, research.' },
};

export default function LlmChoosingModelVisualization() {
  const [req, setReq] = useState({ complex: false, volume: false, budget: false, longctx: false });

  const tier = useMemo(() => {
    if (req.complex && !req.budget) return 'large';
    if (req.budget || (req.volume && !req.complex)) return 'small';
    return 'mid';
  }, [req]);
  const t = TIERS[tier];

  return (
    <div className="llmchoose-wrap">
      <h3 className="llmchoose-title">Choosing the Right Model</h3>
      <p className="llmchoose-sub">Match the model to the job — bigger isn't always better</p>

      <div className="llmchoose-reqs">
        {[
          { k: 'complex', label: '🧠 Needs deep reasoning' },
          { k: 'volume', label: '📈 High request volume' },
          { k: 'budget', label: '💰 Tight cost budget' },
          { k: 'longctx', label: '📄 Long documents' },
        ].map(r => (
          <button key={r.k} className={`llmchoose-req ${req[r.k] ? 'llmchoose-req-on' : ''}`}
            onClick={() => setReq(s => ({ ...s, [r.k]: !s[r.k] }))}>{r.label}</button>
        ))}
      </div>

      <div className="llmchoose-result">
        <div className="llmchoose-result-h">Recommended tier</div>
        <div className="llmchoose-result-name">{t.name}</div>
        <div className="llmchoose-result-meta"><span>Cost: {t.cost}</span><span>Speed: {t.speed}</span></div>
        <div className="llmchoose-result-use">{t.use}</div>
      </div>

      <div className="llmchoose-tiers">
        {Object.entries(TIERS).map(([k, v]) => (
          <div key={k} className={`llmchoose-tier ${tier === k ? 'llmchoose-tier-on' : ''}`}>
            <span>{v.cost}</span><small>{k}</small>
          </div>
        ))}
      </div>
      <p className="llmchoose-note">💡 Start small, measure quality, and only upgrade the tier if the task actually needs it. {req.longctx ? 'For long docs, also check the model\'s max context window.' : ''}</p>
    </div>
  );
}
