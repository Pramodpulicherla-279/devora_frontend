/* Lesson: Colour Contrast & Testing
 * Visual: WCAG contrast-ratio checker — pick foreground/background, see AA/AAA pass/fail */
import { useState, useMemo } from 'react';
import './visual.css';

const PAIRS = [
  { fg: '#ffffff', bg: '#0d1117' },
  { fg: '#8b949e', bg: '#0d1117' },
  { fg: '#777777', bg: '#ffffff' },
  { fg: '#e34c26', bg: '#ffffff' },
  { fg: '#1a1a1a', bg: '#f5f5f5' },
];

function lum(hex) {
  const c = hex.replace('#', '');
  const rgb = [0, 2, 4].map(i => parseInt(c.substr(i, 2), 16) / 255).map(v =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}
function ratio(fg, bg) {
  const l1 = lum(fg), l2 = lum(bg);
  return ((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05));
}

export default function HtmlColorContrastVisualization() {
  const [i, setI] = useState(1);
  const { fg, bg } = PAIRS[i];
  const r = useMemo(() => ratio(fg, bg), [fg, bg]);
  const aaNormal = r >= 4.5, aaLarge = r >= 3, aaaNormal = r >= 7;

  return (
    <div className="contrast-wrap">
      <h3 className="contrast-title">Colour Contrast & Testing</h3>
      <p className="contrast-sub">Low contrast text fails users with low vision — WCAG sets the bar</p>

      <div className="contrast-swatches">
        {PAIRS.map((p, idx) => (
          <button key={idx} className={`contrast-sw ${i === idx ? 'contrast-sw-on' : ''}`}
            style={{ background: p.bg, color: p.fg }} onClick={() => setI(idx)}>Aa</button>
        ))}
      </div>

      <div className="contrast-preview" style={{ background: bg, color: fg }}>
        <div className="contrast-big">The quick brown fox</div>
        <div className="contrast-small">jumps over the lazy dog — small body text sample</div>
      </div>

      <div className="contrast-ratio">
        <span className="contrast-ratio-num">{r.toFixed(2)}:1</span>
        <span className="contrast-ratio-label">contrast ratio ({fg} on {bg})</span>
      </div>

      <div className="contrast-badges">
        <div className={`contrast-badge ${aaLarge ? 'pass' : 'fail'}`}>AA Large {aaLarge ? '✓' : '✗'}<small>≥ 3:1</small></div>
        <div className={`contrast-badge ${aaNormal ? 'pass' : 'fail'}`}>AA Normal {aaNormal ? '✓' : '✗'}<small>≥ 4.5:1</small></div>
        <div className={`contrast-badge ${aaaNormal ? 'pass' : 'fail'}`}>AAA {aaaNormal ? '✓' : '✗'}<small>≥ 7:1</small></div>
      </div>
    </div>
  );
}
