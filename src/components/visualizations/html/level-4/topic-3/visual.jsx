/* Lesson: Keyboard Navigation
 * Visual: Tab-order walkthrough — step focus through interactive elements */
import { useState } from 'react';
import './visual.css';

const ELEMENTS = [
  { id: 'skip', label: 'Skip to content', tag: 'a.skip-link', note: 'First stop — lets keyboard users jump past nav.' },
  { id: 'logo', label: 'Home (logo)', tag: 'a', note: 'Links are focusable by default.' },
  { id: 'nav', label: 'Products', tag: 'a', note: 'Tab order follows DOM order.' },
  { id: 'search', label: 'Search field', tag: 'input', note: 'Inputs receive focus; type when focused.' },
  { id: 'submit', label: 'Submit', tag: 'button', note: 'Activate with Enter or Space.' },
];

export default function HtmlKeyboardNavVisualization() {
  const [focus, setFocus] = useState(0);

  const next = () => setFocus(f => (f + 1) % ELEMENTS.length);
  const prev = () => setFocus(f => (f - 1 + ELEMENTS.length) % ELEMENTS.length);

  return (
    <div className="kbdnav-wrap">
      <h3 className="kbdnav-title">Keyboard Navigation</h3>
      <p className="kbdnav-sub">Every interactive element must be reachable with <kbd>Tab</kbd> alone</p>

      <div className="kbdnav-bar">
        {ELEMENTS.map((el, i) => (
          <button key={el.id} className={`kbdnav-el ${focus === i ? 'kbdnav-el-focus' : ''}`} onClick={() => setFocus(i)}>
            {el.label}
            {focus === i && <span className="kbdnav-ring" />}
          </button>
        ))}
      </div>

      <div className="kbdnav-controls">
        <button className="kbdnav-key" onClick={prev}>⇧ + Tab ←</button>
        <span className="kbdnav-pos">focus {focus + 1} / {ELEMENTS.length}</span>
        <button className="kbdnav-key" onClick={next}>Tab →</button>
      </div>

      <div className="kbdnav-detail">
        <code className="kbdnav-detail-tag">&lt;{ELEMENTS[focus].tag}&gt;</code>
        <span className="kbdnav-detail-note">{ELEMENTS[focus].note}</span>
      </div>

      <p className="kbdnav-tip">💡 A visible focus ring (<code>:focus-visible</code>) is essential — never <code>outline: none</code> without a replacement. Use <code>tabindex="0"</code> to add custom widgets to the tab order, <code>-1</code> to remove.</p>
    </div>
  );
}
