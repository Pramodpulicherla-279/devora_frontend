/* Lesson: Lists, Dicts and Sets
 * Visual type: INTERACTIVE
 * Reason: The three core collections differ in ordering, duplicates, and access.
 * A side-by-side comparison you can switch between makes "which to use" clear. */
import React, { useState } from 'react';
import './visual.css';

const COLL = {
  list: { sym: '[ ]', ordered: 'Yes', dupes: 'Yes', access: 'By index [0]', ex: 'nums = [3, 1, 1, 2]', use: 'Ordered sequence you iterate/modify.' },
  dict: { sym: '{ : }', ordered: 'Insertion', dupes: 'Unique keys', access: "By key ['name']", ex: 'user = {"name": "Ali", "age": 28}', use: 'Lookup by a meaningful key.' },
  set: { sym: '{ }', ordered: 'No', dupes: 'No', access: 'Membership (in)', ex: 'tags = {"a", "b", "a"}  # → {a, b}', use: 'Unique items & fast membership tests.' },
};

const PyCollectionsVisualization = () => {
  const [c, setC] = useState('list');
  const o = COLL[c];
  return (
    <div className="pycoll-wrap">
      <header className="pycoll-head">
        <span className="pycoll-badge">Python</span>
        <h2>Lists, Dicts &amp; Sets</h2>
        <p>Three collections — pick the right one</p>
      </header>
      <div className="pycoll-tabs">
        {Object.entries(COLL).map(([k, v]) => (
          <button key={k} className={`pycoll-tab ${c === k ? 'pycoll-tab--on' : ''}`} onClick={() => setC(k)}>
            <span className="pycoll-sym">{v.sym}</span>{k}
          </button>
        ))}
      </div>
      <pre className="pycoll-code"><code>{o.ex}</code></pre>
      <div className="pycoll-props">
        <div className="pycoll-prop"><span>Ordered</span><strong>{o.ordered}</strong></div>
        <div className="pycoll-prop"><span>Duplicates</span><strong>{o.dupes}</strong></div>
        <div className="pycoll-prop"><span>Access</span><strong>{o.access}</strong></div>
      </div>
      <div className="pycoll-use">✓ Use when: {o.use}</div>
    </div>
  );
};
export default PyCollectionsVisualization;
