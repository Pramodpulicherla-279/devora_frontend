import { useState } from 'react';
import './visual.css';

const DIMENSIONS = [
  { key: 'diversity', label: 'Diversity', desc: 'Examples cover edge cases, not just the easy path' },
  { key: 'clarity', label: 'Clarity', desc: 'Labels are unambiguous and consistent' },
  { key: 'format', label: 'Format consistency', desc: 'Every example follows the exact same structure' },
  { key: 'relevance', label: 'Relevance', desc: 'Examples match the real task distribution' },
];

const BAD = [
  { text: '"Great product"', label: 'positive' },
  { text: '"Great product, love it"', label: 'positive' },
  { text: '"Amazing, so good"', label: 'positive' },
];

const GOOD = [
  { text: '"Love it!"', label: 'positive' },
  { text: '"Broke after a day."', label: 'negative' },
  { text: '"It\'s fine, nothing special."', label: 'neutral' },
  { text: '"Not bad, but overpriced."', label: 'negative' },
];

export default function CptExamplesVisualization() {
  const [mode, setMode] = useState('good');
  const [dim, setDim] = useState('diversity');
  const examples = mode === 'good' ? GOOD : BAD;

  return (
    <div className="cptex-root">
      <div className="cptex-header">
        <h3 className="cptex-title">Crafting Effective Examples</h3>
        <p className="cptex-subtitle">Good few-shot examples follow four rules</p>
      </div>

      <div className="cptex-dims">
        {DIMENSIONS.map(d => (
          <button key={d.key} className={`cptex-dim ${dim === d.key ? 'cptex-dim-active' : ''}`}
            onClick={() => setDim(d.key)}>{d.label}</button>
        ))}
      </div>
      <div className="cptex-dim-desc">{DIMENSIONS.find(d => d.key === dim).desc}</div>

      <div className="cptex-toggle">
        <button className={`cptex-tog ${mode === 'bad' ? 'cptex-tog-bad' : ''}`} onClick={() => setMode('bad')}>❌ Weak set</button>
        <button className={`cptex-tog ${mode === 'good' ? 'cptex-tog-good' : ''}`} onClick={() => setMode('good')}>✅ Strong set</button>
      </div>

      <div className="cptex-examples">
        {examples.map((ex, i) => (
          <div key={i} className="cptex-ex">
            <span className="cptex-ex-text">{ex.text}</span>
            <span className={`cptex-ex-label cptex-label-${ex.label}`}>{ex.label}</span>
          </div>
        ))}
      </div>

      <div className={`cptex-verdict ${mode === 'good' ? 'cptex-verdict-good' : 'cptex-verdict-bad'}`}>
        {mode === 'good'
          ? '✅ Balanced labels, varied phrasing, covers all 3 classes — the model learns the real boundary.'
          : '❌ All positive, near-identical wording — the model never learns what negative or neutral looks like.'}
      </div>
    </div>
  );
}
