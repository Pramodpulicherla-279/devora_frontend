/* Lesson: Alt Text & Semantic Images
 * Visual: Image type selector — informative / decorative / functional / complex, with screen-reader output */
import { useState } from 'react';
import './visual.css';

const TYPES = [
  { id: 'informative', label: 'Informative', icon: '📊', alt: 'alt="Bar chart: Q4 sales up 32% vs Q3"', sr: 'Bar chart: Q4 sales up 32% vs Q3', rule: 'Describe the information the image conveys.' },
  { id: 'decorative', label: 'Decorative', icon: '🎨', alt: 'alt=""', sr: '(skipped — announces nothing)', rule: 'Empty alt so screen readers ignore it.' },
  { id: 'functional', label: 'Functional', icon: '🔍', alt: 'alt="Search"', sr: 'Search, button', rule: 'Describe the action, not the picture.' },
  { id: 'complex', label: 'Complex', icon: '🗺️', alt: 'alt="Sales map" + long description', sr: 'Sales map. Full description below.', rule: 'Short alt + a longer text description nearby.' },
];

const BAD = { informative: 'alt="image123.png"', decorative: 'alt="decorative swirl graphic"', functional: 'alt="magnifying glass icon"', complex: 'alt="map"' };

export default function HtmlAltTextVisualization() {
  const [id, setId] = useState('informative');
  const t = TYPES.find(x => x.id === id);

  return (
    <div className="alttext-wrap">
      <h3 className="alttext-title">Alt Text & Semantic Images</h3>
      <p className="alttext-sub">The right alt text depends on the image's <em>purpose</em></p>

      <div className="alttext-tabs">
        {TYPES.map(x => (
          <button key={x.id} className={`alttext-tab ${id === x.id ? 'alttext-tab-on' : ''}`} onClick={() => setId(x.id)}>{x.icon} {x.label}</button>
        ))}
      </div>

      <div className="alttext-stage">
        <div className="alttext-img">{t.icon}</div>
        <div className="alttext-rule">{t.rule}</div>
      </div>

      <div className="alttext-compare">
        <div className="alttext-good">
          <div className="alttext-ch">✅ Good</div>
          <code>{t.alt}</code>
          <div className="alttext-sr">🔊 reads: "{t.sr}"</div>
        </div>
        <div className="alttext-bad">
          <div className="alttext-ch">❌ Avoid</div>
          <code>{BAD[id]}</code>
          <div className="alttext-srbad">{id === 'decorative' ? 'noise — reads a useless description' : id === 'functional' ? 'describes the icon, not the action' : 'filename / vague — no information'}</div>
        </div>
      </div>
    </div>
  );
}
