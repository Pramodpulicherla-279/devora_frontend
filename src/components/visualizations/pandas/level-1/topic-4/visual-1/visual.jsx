/* Lesson: Exploring and Summarizing Data
 * Visual type: ILLUSTRATION
 * Reason: The first-look methods (head/info/describe/value_counts) each produce a
 * distinct output — a method picker showing each result teaches what to reach for. */
import React, { useState } from 'react';
import './visual.css';

const METHODS = {
  head: { call: 'df.head()', out: 'First 5 rows\n   name   age\n0  Alice   28\n1  Bob     34\n…' },
  info: { call: 'df.info()', out: 'RangeIndex: 100 entries\nColumns: 4\nname   100 non-null object\nage     98 non-null int64' },
  describe: { call: 'df.describe()', out: '        age    salary\ncount  98.0   100.0\nmean   31.2   82.4\nstd    8.1    21.3\nmin    18.0   40.0' },
  shape: { call: 'df.shape', out: '(100, 4)\n# 100 rows, 4 columns' },
  counts: { call: "df['city'].value_counts()", out: 'Mumbai  42\nDelhi   31\nPune    27' },
};

const PdExploreVisualization = () => {
  const [m, setM] = useState('head');
  return (
    <div className="pdexplore-wrap">
      <header className="pdexplore-head">
        <span className="pdexplore-badge">Pandas</span>
        <h2>Exploring &amp; Summarizing</h2>
        <p>Your first 5 commands on any new dataset</p>
      </header>
      <div className="pdexplore-tabs">
        {Object.entries(METHODS).map(([k, v]) => (
          <button key={k} className={`pdexplore-tab ${m === k ? 'pdexplore-tab--on' : ''}`} onClick={() => setM(k)}><code>{v.call}</code></button>
        ))}
      </div>
      <pre className="pdexplore-out"><code>{METHODS[m].out}</code></pre>
      <div className="pdexplore-guide">
        <div className="pdexplore-g"><code>head()</code> — peek at the data</div>
        <div className="pdexplore-g"><code>info()</code> — dtypes &amp; null counts</div>
        <div className="pdexplore-g"><code>describe()</code> — numeric summary stats</div>
        <div className="pdexplore-g"><code>shape</code> — (rows, cols)</div>
        <div className="pdexplore-g"><code>value_counts()</code> — category frequencies</div>
      </div>
      <div className="pdexplore-note">Always start here. <code>info()</code> instantly reveals missing data &amp; wrong types — the two issues you'll fix most.</div>
    </div>
  );
};
export default PdExploreVisualization;
