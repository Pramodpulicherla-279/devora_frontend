import { useState } from 'react';
import './visual.css';

const SECTIONS = [
  { name: 'API Keys', icon: '🔑', items: ['Store in env vars', 'Never hardcode or commit', 'Rotate regularly', 'Restrict by scope'] },
  { name: 'Rate Limiting', icon: '🚦', items: ['Protect your endpoint', 'Per-user quotas', 'Queue overflow requests'] },
  { name: 'Caching', icon: '💾', items: ['Cache identical prompts', 'Use prompt caching', 'Set sensible TTLs'] },
  { name: 'Monitoring', icon: '📡', items: ['Log inputs & outputs', 'Track token costs', 'Alert on error spikes'] },
];

const TOTAL = SECTIONS.reduce((n, s) => n + s.items.length, 0);

export default function BaiDeployAiVisualization() {
  const [checked, setChecked] = useState({});
  const count = Object.values(checked).filter(Boolean).length;
  const key = (s, i) => `${s}-${i}`;

  return (
    <div className="baidep-wrap">
      <h3 className="baidep-title">Deploying Your First AI App</h3>
      <p className="baidep-sub">Four pillars before you expose an AI endpoint to the world</p>

      <div className="baidep-arch">
        <span className="baidep-arch-node">👤 User</span>
        <span className="baidep-arch-arrow">→</span>
        <span className="baidep-arch-node baidep-arch-you">🖥️ Your API</span>
        <span className="baidep-arch-arrow">→</span>
        <span className="baidep-arch-node">💾 Cache?</span>
        <span className="baidep-arch-arrow">→</span>
        <span className="baidep-arch-node baidep-arch-llm">🤖 LLM</span>
      </div>

      <div className="baidep-progress">{count}/{TOTAL} configured</div>

      <div className="baidep-sections">
        {SECTIONS.map((sec) => (
          <div key={sec.name} className="baidep-section">
            <div className="baidep-section-h">{sec.icon} {sec.name}</div>
            {sec.items.map((item, i) => (
              <button key={i} className={`baidep-item ${checked[key(sec.name, i)] ? 'baidep-item-on' : ''}`} onClick={() => setChecked(c => ({ ...c, [key(sec.name, i)]: !c[key(sec.name, i)] }))}>
                <span className="baidep-box">{checked[key(sec.name, i)] ? '✓' : ''}</span>{item}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
