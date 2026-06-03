/* Lesson: String Cleaning and Text Operations
 * Visual type: ILLUSTRATION (interactive method picker)
 * Reason: The .str accessor vectorizes string ops over a column — a before/after
 * per method shows exactly what each does. */
import React, { useState } from 'react';
import './visual.css';

const OPS = {
  lower: { call: ".str.lower()", before: 'ALICE', after: 'alice' },
  strip: { call: ".str.strip()", before: '"  bob  "', after: '"bob"' },
  replace: { call: ".str.replace('-', '')", before: '555-1234', after: '5551234' },
  contains: { call: ".str.contains('@')", before: 'a@x.com', after: 'True' },
  split: { call: ".str.split('@')", before: 'a@x.com', after: "['a', 'x.com']" },
  title: { call: ".str.title()", before: 'john doe', after: 'John Doe' },
};

const PdStrVisualization = () => {
  const [op, setOp] = useState('lower');
  const o = OPS[op];
  return (
    <div className="pdstr-wrap">
      <header className="pdstr-head">
        <span className="pdstr-badge">Pandas</span>
        <h2>String Cleaning</h2>
        <p>The <code>.str</code> accessor — vectorized text ops</p>
      </header>
      <div className="pdstr-tabs">
        {Object.keys(OPS).map((k) => (
          <button key={k} className={`pdstr-tab ${op === k ? 'pdstr-tab--on' : ''}`} onClick={() => setOp(k)}>{k}</button>
        ))}
      </div>
      <div className="pdstr-flow">
        <div className="pdstr-box"><span className="pdstr-l">before</span><code>{o.before}</code></div>
        <div className="pdstr-op">{o.call}</div>
        <div className="pdstr-box pdstr-box--out"><span className="pdstr-l">after</span><code>{o.after}</code></div>
      </div>
      <pre className="pdstr-code"><code>{`df['col']${o.call}`}</code></pre>
      <div className="pdstr-note"><code>.str</code> applies the operation to every value in the column at once — no loop needed. Chain them: <code>df['email'].str.strip().str.lower()</code>.</div>
    </div>
  );
};
export default PdStrVisualization;
