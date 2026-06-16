/* Lesson: List Comprehensions — Writing Faster, Cleaner Python
 * Visual type: INTERACTIVE
 * Side-by-side: for-loop vs list comprehension — pick a transformation, see both */
import React, { useState } from 'react';
import './visual.css';

const ORDERS = [4200, 1850, 6700, 980, 12400, 2300, 7800];

const EXAMPLES = [
  {
    id: 'gst',
    label: 'Add 18% GST',
    loop: `results = []
for amount in amounts:
    results.append(amount * 1.18)`,
    comp: `results = [amt * 1.18 for amt in amounts]`,
    apply: a => Math.round(a * 1.18),
    fmt: v => `₹${v.toLocaleString()}`,
  },
  {
    id: 'filter',
    label: 'Filter > ₹5,000',
    loop: `results = []
for amount in amounts:
    if amount > 5000:
        results.append(amount)`,
    comp: `results = [amt for amt in amounts if amt > 5000]`,
    apply: a => a > 5000 ? a : null,
    fmt: v => v !== null ? `₹${v.toLocaleString()}` : '—',
  },
  {
    id: 'tier',
    label: 'Classify tier',
    loop: `results = []
for amount in amounts:
    if amount >= 10000:
        results.append('Premium')
    elif amount >= 3000:
        results.append('Standard')
    else:
        results.append('Budget')`,
    comp: `results = [
    'Premium' if amt >= 10000
    else 'Standard' if amt >= 3000
    else 'Budget'
    for amt in amounts
]`,
    apply: a => a >= 10000 ? 'Premium' : a >= 3000 ? 'Standard' : 'Budget',
    fmt: v => v,
  },
  {
    id: 'dict',
    label: 'Dict comprehension',
    loop: `mapping = {}
for amount in amounts:
    key = f'₹{amount}'
    mapping[key] = amount * 1.18`,
    comp: `mapping = {
    f'₹{amt}': amt * 1.18
    for amt in amounts
}`,
    apply: a => `₹${Math.round(a * 1.18).toLocaleString()}`,
    fmt: v => v,
  },
];

const PyComprehensionVisualization = () => {
  const [sel, setSel] = useState('gst');
  const ex = EXAMPLES.find(e=>e.id===sel);
  const results = ORDERS.map(ex.apply).filter(v=>v!==null);

  return (
    <div className="pycomp-wrap">
      <header className="pycomp-head">
        <span className="pycomp-badge">Python Basics</span>
        <h2>List Comprehensions</h2>
        <p>The same result — fewer lines, more Pythonic</p>
      </header>

      <div className="pycomp-tabs">
        {EXAMPLES.map(e=><button key={e.id} className={`pycomp-tab ${sel===e.id?'pycomp-tab--on':''}`} onClick={()=>setSel(e.id)}>{e.label}</button>)}
      </div>

      <div className="pycomp-compare">
        <div className="pycomp-side">
          <div className="pycomp-side-label">for loop (old way)</div>
          <pre className="pycomp-code pycomp-code--loop"><code>{ex.loop}</code></pre>
        </div>
        <div className="pycomp-arrow">→</div>
        <div className="pycomp-side">
          <div className="pycomp-side-label">Comprehension</div>
          <pre className="pycomp-code pycomp-code--comp"><code>{ex.comp}</code></pre>
        </div>
      </div>

      <div className="pycomp-results">
        <div className="pycomp-results-label">Output: results</div>
        <div className="pycomp-pills">
          {results.map((v,i)=><span key={i} className="pycomp-pill">{ex.fmt(v)}</span>)}
        </div>
      </div>

      <div className="pycomp-note">
        Comprehensions are not just shorter — they're faster. Python optimises list construction internally when you use comprehension syntax instead of .append() in a loop.
      </div>
    </div>
  );
};

export default PyComprehensionVisualization;
