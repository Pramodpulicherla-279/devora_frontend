/* Lesson: Regular Expressions for Analysts
 * Visual type: INTERACTIVE
 * Reason: Regex is uniquely suited to a live tester — type a pattern, see matches
 * highlight in sample text instantly. Trial-and-error IS how regex is learned. */
import React, { useState } from 'react';
import './visual.css';

const SAMPLE = 'Contact: ali@example.com, bob@test.org. Call 555-1234 or 555-9876.';

const PRESETS = {
  email: '[\\w.]+@[\\w.]+',
  phone: '\\d{3}-\\d{4}',
  word: '\\b\\w+\\b',
};

const PyRegexVisualization = () => {
  const [pattern, setPattern] = useState('[\\w.]+@[\\w.]+');
  let parts = [{ text: SAMPLE, match: false }];
  let count = 0; let error = null;
  try {
    const re = new RegExp(pattern, 'g');
    parts = [];
    let last = 0; let m;
    while ((m = re.exec(SAMPLE)) !== null) {
      if (m.index > last) parts.push({ text: SAMPLE.slice(last, m.index), match: false });
      parts.push({ text: m[0], match: true });
      last = m.index + m[0].length;
      count++;
      if (m.index === re.lastIndex) re.lastIndex++;
      if (count > 50) break;
    }
    if (last < SAMPLE.length) parts.push({ text: SAMPLE.slice(last), match: false });
  } catch (e) { error = e.message; parts = [{ text: SAMPLE, match: false }]; }

  return (
    <div className="pyregex-wrap">
      <header className="pyregex-head">
        <span className="pyregex-badge">Python</span>
        <h2>Regular Expressions</h2>
        <p>Pattern-match &amp; extract text — live tester</p>
      </header>
      <div className="pyregex-presets">
        {Object.entries(PRESETS).map(([k, p]) => (
          <button key={k} className={`pyregex-preset ${pattern === p ? 'pyregex-preset--on' : ''}`} onClick={() => setPattern(p)}>{k}</button>
        ))}
      </div>
      <label className="pyregex-field">Pattern
        <input className={`pyregex-input ${error ? 'pyregex-input--err' : ''}`} value={pattern} onChange={(e) => setPattern(e.target.value)} spellCheck={false} />
      </label>
      <div className="pyregex-sample">
        {parts.map((p, i) => p.match ? <mark key={i} className="pyregex-match">{p.text}</mark> : <span key={i}>{p.text}</span>)}
      </div>
      <div className="pyregex-count">{error ? <span className="pyregex-error">⚠ {error}</span> : `${count} match${count !== 1 ? 'es' : ''}`}</div>
      <pre className="pyregex-code"><code>{`import re
re.findall(r"${pattern}", text)   # → list of matches`}</code></pre>
      <div className="pyregex-note"><code>\\d</code> digit · <code>\\w</code> word char · <code>+</code> one-or-more · <code>{'{3}'}</code> exactly 3 · <code>\\b</code> word boundary. Use raw strings <code>r"..."</code> in Python.</div>
    </div>
  );
};
export default PyRegexVisualization;
