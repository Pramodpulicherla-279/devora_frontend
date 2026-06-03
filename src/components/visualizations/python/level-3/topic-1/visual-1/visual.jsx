/* Lesson: List Comprehensions and Patterns
 * Visual type: INTERACTIVE
 * Reason: A comprehension is a compressed loop. Showing the loop and its
 * one-line comprehension equivalent side by side — both producing the same
 * output — makes the syntax click. */
import React, { useState } from 'react';
import './visual.css';

const EXAMPLES = {
  squares: { loop: 'result = []\nfor n in nums:\n    result.append(n**2)', comp: '[n**2 for n in nums]', input: '[1, 2, 3, 4]', output: '[1, 4, 9, 16]' },
  filter: { loop: 'result = []\nfor n in nums:\n    if n % 2 == 0:\n        result.append(n)', comp: '[n for n in nums if n % 2 == 0]', input: '[1, 2, 3, 4]', output: '[2, 4]' },
  dict: { loop: 'result = {}\nfor w in words:\n    result[w] = len(w)', comp: '{w: len(w) for w in words}', input: "['hi', 'bye']", output: "{'hi': 2, 'bye': 3}" },
};

const PyComprehensionVisualization = () => {
  const [ex, setEx] = useState('squares');
  const e = EXAMPLES[ex];
  return (
    <div className="pycomp-wrap">
      <header className="pycomp-head">
        <span className="pycomp-badge">Python</span>
        <h2>List Comprehensions</h2>
        <p>The Pythonic one-liner for building lists</p>
      </header>
      <div className="pycomp-tabs">
        {Object.keys(EXAMPLES).map((k) => (
          <button key={k} className={`pycomp-tab ${ex === k ? 'pycomp-tab--on' : ''}`} onClick={() => setEx(k)}>{k}</button>
        ))}
      </div>
      <div className="pycomp-compare">
        <div className="pycomp-side">
          <div className="pycomp-side-label">😓 Loop (verbose)</div>
          <pre className="pycomp-code"><code>{e.loop}</code></pre>
        </div>
        <div className="pycomp-side">
          <div className="pycomp-side-label pycomp-side-label--good">✨ Comprehension</div>
          <pre className="pycomp-code pycomp-code--good"><code>{e.comp}</code></pre>
        </div>
      </div>
      <div className="pycomp-io">
        <span className="pycomp-in">{e.input}</span><span className="pycomp-arrow">→</span><span className="pycomp-out">{e.output}</span>
      </div>
      <div className="pycomp-note">Pattern: <code>[expression for item in iterable if condition]</code>. Shorter, faster, and idiomatic — but don't nest too deep or readability suffers.</div>
    </div>
  );
};
export default PyComprehensionVisualization;
