import { useState } from 'react';
import './visual.css';

const MODES = [
  {
    key: 'full',
    label: 'Full Fine-Tune',
    color: '#818cf8',
    params: '110M',
    pct: 100,
    accuracy: 93,
    cost: 'High',
    desc: 'All BERT parameters are updated. Best accuracy, most compute and memory.',
    layers: [true, true, true, true, true, true],
    headActive: true,
  },
  {
    key: 'head',
    label: 'Head Only',
    color: '#56d364',
    params: '768',
    pct: 0.001,
    accuracy: 81,
    cost: 'Low',
    desc: 'Only the classification head trains. Fast and cheap but weaker performance.',
    layers: [false, false, false, false, false, false],
    headActive: true,
  },
  {
    key: 'lora',
    label: 'LoRA',
    color: '#f97316',
    params: '~0.5M',
    pct: 0.45,
    accuracy: 91,
    cost: 'Medium',
    desc: 'Low-rank adapters injected into attention layers. Near full-tune accuracy at fraction of cost.',
    layers: [false, false, false, false, false, false],
    headActive: true,
    lora: true,
  },
];

const BLOCK_LABELS = ['Encoder 1', 'Encoder 2', 'Encoder 3', 'Encoder 4', 'Encoder 5', 'Encoder 6'];

export default function TrFinetuneVisualization() {
  const [active, setActive] = useState('full');
  const m = MODES.find(x => x.key === active);

  return (
    <div className="trft-wrap">
      <h3 className="trft-title">Fine-Tuning Strategies</h3>
      <p className="trft-sub">Compare three approaches to adapting a pretrained BERT model</p>
      <div className="trft-tabs">
        {MODES.map(mode => (
          <button key={mode.key}
            className={`trft-tab ${active === mode.key ? 'trft-tab-active' : ''}`}
            style={active === mode.key ? { borderColor: mode.color, color: mode.color, background: mode.color + '15' } : {}}
            onClick={() => setActive(mode.key)}>{mode.label}</button>
        ))}
      </div>

      <div className="trft-body">
        <div className="trft-arch">
          <div className={`trft-head ${m.headActive ? 'trft-trainable' : ''}`} style={{ borderColor: m.color, color: m.color }}>
            [CLS] → Classification Head {m.headActive && <span className="trft-badge" style={{ background: m.color }}>trainable</span>}
          </div>
          {BLOCK_LABELS.map((label, i) => (
            <div key={i} className="trft-block-row">
              <div className={`trft-block ${m.layers[i] ? 'trft-trainable' : 'trft-frozen'}`}
                style={m.layers[i] ? { borderColor: m.color } : {}}>
                {label}
                {m.layers[i] && <span className="trft-badge" style={{ background: m.color }}>trainable</span>}
                {!m.layers[i] && <span className="trft-badge trft-badge-frozen">frozen</span>}
              </div>
              {m.lora && (
                <div className="trft-lora-box">
                  <span style={{ color: '#f97316', fontSize: '0.75rem' }}>A×B</span>
                  <span className="trft-badge" style={{ background: '#f97316' }}>LoRA</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="trft-stats">
          <div className="trft-stat">
            <span className="trft-stat-label">Trainable Params</span>
            <span className="trft-stat-val" style={{ color: m.color }}>{m.params}</span>
          </div>
          <div className="trft-stat">
            <span className="trft-stat-label">% of Total</span>
            <span className="trft-stat-val" style={{ color: m.color }}>{m.pct}%</span>
          </div>
          <div className="trft-stat">
            <span className="trft-stat-label">Accuracy (SST-2)</span>
            <div className="trft-bar-bg">
              <div className="trft-bar-fill" style={{ width: `${m.accuracy}%`, background: m.color }} />
            </div>
            <span className="trft-stat-val" style={{ color: m.color }}>{m.accuracy}%</span>
          </div>
          <div className="trft-stat">
            <span className="trft-stat-label">Training Cost</span>
            <span className="trft-stat-val" style={{ color: m.color }}>{m.cost}</span>
          </div>
          <div className="trft-desc">{m.desc}</div>
        </div>
      </div>
    </div>
  );
}
