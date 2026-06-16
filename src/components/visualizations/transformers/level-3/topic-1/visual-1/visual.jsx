import { useState } from 'react';
import './visual.css';

const MODES = [
  {
    key: 'zero',
    label: 'Zero-Shot',
    accuracy: 64,
    color: '#818cf8',
    sections: [
      { type: 'system', label: 'System', text: 'Classify the sentiment of the following review as Positive or Negative.' },
      { type: 'query', label: 'Input', text: '"The camera on this phone is absolutely stunning."' },
    ],
    desc: 'No examples given. Model relies entirely on instruction and pretrained knowledge.',
  },
  {
    key: 'one',
    label: 'One-Shot',
    accuracy: 78,
    color: '#56d364',
    sections: [
      { type: 'system', label: 'System', text: 'Classify the sentiment of the following review as Positive or Negative.' },
      { type: 'example', label: 'Example', text: 'Review: "The battery life is terrible." → Negative' },
      { type: 'query', label: 'Input', text: '"The camera on this phone is absolutely stunning."' },
    ],
    desc: 'One labelled example gives the model context about the expected format and task.',
  },
  {
    key: 'few',
    label: 'Few-Shot',
    accuracy: 91,
    color: '#f97316',
    sections: [
      { type: 'system', label: 'System', text: 'Classify the sentiment of the following review as Positive or Negative.' },
      { type: 'example', label: 'Example 1', text: 'Review: "The battery life is terrible." → Negative' },
      { type: 'example', label: 'Example 2', text: 'Review: "Super fast delivery, love it!" → Positive' },
      { type: 'example', label: 'Example 3', text: 'Review: "Arrived broken and support was unhelpful." → Negative' },
      { type: 'query', label: 'Input', text: '"The camera on this phone is absolutely stunning."' },
    ],
    desc: 'Multiple examples help the model generalise the pattern and dramatically improve accuracy.',
  },
];

const TYPE_COLORS = {
  system: '#6b7785',
  example: '#56d364',
  query: '#818cf8',
};

export default function TrPromptingVisualization() {
  const [tab, setTab] = useState('zero');
  const m = MODES.find(x => x.key === tab);

  return (
    <div className="trprompt-wrap">
      <h3 className="trprompt-title">Prompting & In-Context Learning</h3>
      <p className="trprompt-sub">How the number of examples affects model accuracy on sentiment classification</p>
      <div className="trprompt-tabs">
        {MODES.map(mode => (
          <button key={mode.key}
            className={`trprompt-tab ${tab === mode.key ? 'trprompt-tab-active' : ''}`}
            style={tab === mode.key ? { borderColor: mode.color, color: mode.color, background: mode.color + '15' } : {}}
            onClick={() => setTab(mode.key)}>{mode.label}</button>
        ))}
      </div>

      <div className="trprompt-prompt-box">
        {m.sections.map((sec, i) => (
          <div key={i} className="trprompt-section" style={{ borderLeftColor: TYPE_COLORS[sec.type] }}>
            <span className="trprompt-sec-label" style={{ color: TYPE_COLORS[sec.type] }}>{sec.label}</span>
            <span className="trprompt-sec-text">{sec.text}</span>
          </div>
        ))}
        <div className="trprompt-output" style={{ borderLeftColor: m.color }}>
          <span className="trprompt-sec-label" style={{ color: m.color }}>Output</span>
          <span className="trprompt-sec-text" style={{ color: m.color, fontWeight: 600 }}>Positive</span>
        </div>
      </div>

      <div className="trprompt-stats">
        <div>
          <div className="trprompt-acc-label">Accuracy</div>
          <div className="trprompt-bar-bg">
            <div className="trprompt-bar-fill" style={{ width: `${m.accuracy}%`, background: m.color }} />
          </div>
          <div className="trprompt-acc-val" style={{ color: m.color }}>{m.accuracy}%</div>
        </div>
        <div className="trprompt-desc">{m.desc}</div>
      </div>
    </div>
  );
}
