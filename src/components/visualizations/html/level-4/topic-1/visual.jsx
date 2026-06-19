/* Lesson: What Is Accessibility & ARIA Roles
 * Visual: Landmark & ARIA role explorer — click regions to hear what a screen reader announces */
import { useState } from 'react';
import './visual.css';

const REGIONS = [
  { id: 'banner', tag: '<header>', role: 'banner', sr: '"banner landmark"', desc: 'Top of page — logo, site title, primary nav.' },
  { id: 'nav', tag: '<nav>', role: 'navigation', sr: '"navigation landmark"', desc: 'A set of navigation links.' },
  { id: 'main', tag: '<main>', role: 'main', sr: '"main landmark"', desc: 'The primary content. Only one per page.' },
  { id: 'aside', tag: '<aside>', role: 'complementary', sr: '"complementary landmark"', desc: 'Supporting content — related links, ads.' },
  { id: 'footer', tag: '<footer>', role: 'contentinfo', sr: '"contentinfo landmark"', desc: 'Copyright, contact, site info.' },
];

export default function HtmlAccessibilityAriaVisualization() {
  const [sel, setSel] = useState('main');
  const [srMode, setSrMode] = useState(false);
  const r = REGIONS.find(x => x.id === sel);

  return (
    <div className="a11yaria-wrap">
      <h3 className="a11yaria-title">Accessibility & ARIA Roles</h3>
      <p className="a11yaria-sub">Semantic landmarks give screen-reader users a map of the page</p>

      <div className="a11yaria-toggle">
        <span>Screen-reader view</span>
        <button className={`a11yaria-tog ${srMode ? 'a11yaria-tog-on' : ''}`} onClick={() => setSrMode(s => !s)}>{srMode ? 'ON' : 'OFF'}</button>
      </div>

      <div className={`a11yaria-page ${srMode ? 'a11yaria-page-sr' : ''}`}>
        {REGIONS.map(reg => (
          <button key={reg.id} className={`a11yaria-region a11yaria-${reg.id} ${sel === reg.id ? 'a11yaria-region-on' : ''}`}
            onClick={() => setSel(reg.id)}>
            <span className="a11yaria-region-tag">{reg.tag}</span>
            {srMode && <span className="a11yaria-region-sr">🔊 {reg.sr}</span>}
          </button>
        ))}
      </div>

      <div className="a11yaria-detail">
        <div className="a11yaria-detail-head">
          <code className="a11yaria-detail-tag">{r.tag}</code>
          <span className="a11yaria-detail-role">role="{r.role}"</span>
        </div>
        <p className="a11yaria-detail-desc">{r.desc}</p>
        <div className="a11yaria-detail-sr">Screen reader announces: <strong>{r.sr}</strong></div>
      </div>

      <p className="a11yaria-note">💡 Prefer native semantic tags (<code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>) — they carry the role for free. Use explicit <code>role="…"</code> only when no native element fits.</p>
    </div>
  );
}
