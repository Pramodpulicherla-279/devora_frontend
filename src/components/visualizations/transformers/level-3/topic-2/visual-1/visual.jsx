import { useState } from 'react';
import './visual.css';

const METHODS = [
  { key: 'full', label: 'Full Fine-Tune', trainParams: '7B', pct: 100, costPerStep: '$12.40', color: '#a3adbb' },
  { key: 'lora', label: 'LoRA', trainParams: '4M', pct: 0.057, costPerStep: '$0.42', color: '#818cf8' },
  { key: 'adapters', label: 'Adapters', trainParams: '8M', pct: 0.11, costPerStep: '$0.78', color: '#f97316' },
];

export default function TrLoraVisualization() {
  const [active, setActive] = useState('lora');
  const m = METHODS.find(x => x.key === active);

  return (
    <div className="trlora-wrap">
      <h3 className="trlora-title">Parameter-Efficient Fine-Tuning</h3>
      <p className="trlora-sub">LoRA and Adapters vs. full fine-tuning a 7B parameter model</p>

      <div className="trlora-tabs">
        {METHODS.map(method => (
          <button key={method.key}
            className={`trlora-tab ${active === method.key ? 'trlora-tab-active' : ''}`}
            style={active === method.key ? { borderColor: method.color, color: method.color, background: method.color + '15' } : {}}
            onClick={() => setActive(method.key)}>{method.label}</button>
        ))}
      </div>

      <div className="trlora-body">
        <div className="trlora-diagram">
          <div className="trlora-matrix-label">Weight Matrix W</div>
          <svg viewBox="0 0 260 160" className="trlora-svg">
            <rect x="10" y="10" width="110" height="140" rx="6" fill="#161b22" stroke="#30363d" strokeWidth="1.5" />
            <text x="65" y="85" textAnchor="middle" fontSize="13" fill="#6b7785" fontFamily="monospace">W</text>
            <text x="65" y="102" textAnchor="middle" fontSize="9" fill="#6b7785">(d × d, frozen)</text>

            {active !== 'full' ? (
              <>
                <rect x="135" y="10" width="40" height="140" rx="4" fill="#818cf815" stroke="#818cf8" strokeWidth="1.5" />
                <text x="155" y="82" textAnchor="middle" fontSize="11" fill="#818cf8" fontFamily="monospace">A</text>
                <text x="155" y="95" textAnchor="middle" fontSize="8" fill="#818cf880">(d×r)</text>
                <rect x="185" y="55" width="65" height="50" rx="4" fill="#f9731615" stroke="#f97316" strokeWidth="1.5" />
                <text x="217" y="84" textAnchor="middle" fontSize="11" fill="#f97316" fontFamily="monospace">B</text>
                <text x="217" y="97" textAnchor="middle" fontSize="8" fill="#f9731680">(r×d)</text>
                <text x="163" y="155" textAnchor="middle" fontSize="9" fill="#a3adbb">rank r ≪ d</text>
              </>
            ) : (
              <>
                <rect x="10" y="10" width="110" height="140" rx="6" fill="#a3adbb18" stroke="#a3adbb" strokeWidth="1.5" />
                <text x="65" y="85" textAnchor="middle" fontSize="13" fill="#a3adbb" fontFamily="monospace">W</text>
                <text x="65" y="102" textAnchor="middle" fontSize="9" fill="#a3adbb80">(all params trainable)</text>
              </>
            )}
          </svg>
          {active !== 'full' && (
            <div className="trlora-formula">
              W' = W + <span style={{ color: '#818cf8' }}>A</span> × <span style={{ color: '#f97316' }}>B</span>
            </div>
          )}
        </div>

        <div className="trlora-stats">
          <div className="trlora-stat">
            <span className="trlora-stat-label">Trainable Params</span>
            <span className="trlora-stat-val" style={{ color: m.color }}>{m.trainParams}</span>
          </div>
          <div className="trlora-stat">
            <span className="trlora-stat-label">% of Total (7B)</span>
            <div className="trlora-bar-bg">
              <div className="trlora-bar-fill" style={{ width: `${Math.min(m.pct, 100)}%`, background: m.color }} />
            </div>
            <span className="trlora-stat-val" style={{ color: m.color }}>{m.pct}%</span>
          </div>
          <div className="trlora-stat">
            <span className="trlora-stat-label">Cost / Training Step</span>
            <span className="trlora-stat-val" style={{ color: m.color }}>{m.costPerStep}</span>
          </div>
          <table className="trlora-table">
            <thead><tr><th>Method</th><th>Params</th><th>Cost/Step</th></tr></thead>
            <tbody>
              {METHODS.map(me => (
                <tr key={me.key} className={active === me.key ? 'trlora-row-active' : ''}>
                  <td style={{ color: me.color }}>{me.label}</td>
                  <td>{me.trainParams}</td>
                  <td>{me.costPerStep}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
