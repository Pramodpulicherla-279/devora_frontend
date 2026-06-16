import { useState } from 'react';
import './visual.css';

const GOOD_CELLS = [
  { num: 0, type: 'md', label: '# Setup', color: '#f97316', detail: 'Imports, config, constants. Always run first.' },
  { num: 1, type: 'md', label: '# 1 · Load Data', color: '#79c0ff', detail: 'pd.read_csv / SQL / API. Log shape + dtypes.' },
  { num: 2, type: 'md', label: '# 2 · EDA', color: '#7ee787', detail: 'df.describe(), histograms, correlation matrix.' },
  { num: 3, type: 'md', label: '# 3 · Clean', color: '#d2a8ff', detail: 'Nulls, duplicates, type casting, outliers.' },
  { num: 4, type: 'md', label: '# 4 · Model', color: '#ffa657', detail: 'Train/test split → fit → predict → evaluate.' },
  { num: 5, type: 'md', label: '# 5 · Results', color: '#f97316', detail: 'Metrics, confusion matrix, feature importance.' },
  { num: 6, type: 'md', label: '# 6 · Conclusions', color: '#58a6ff', detail: 'Summary bullets. Next steps. Caveats.' },
];

const MESSY = '# Notebook\nimport pandas as pd, sklearn, matplotlib\ndf = pd.read_csv("data.csv")\ndf.dropna(inplace=True)\nfrom sklearn.ensemble import RandomForestClassifier\nX=df.drop("target",axis=1); y=df["target"]\nclf=RandomForestClassifier().fit(X,y)\nprint(clf.score(X,y))  # wait which split??';

const DOS = ['One concept per cell', 'Use Markdown headers for sections', 'Restart & Run All before sharing', 'Pin library versions in setup cell', 'Name variables descriptively'];
const DONTS = ['All code in one cell', 'Undocumented magic numbers', 'Cells run out of order', 'print() debugging left in', 'Unnamed df, df2, df3…'];

export default function JnbOrganiseVisualization() {
  const [messy, setMessy] = useState(false);
  const [active, setActive] = useState(0);

  return (
    <div className="jnborg-root">
      <h2 className="jnborg-title">Organising Analysis Notebooks</h2>
      <div className="jnborg-toggle-bar">
        <button className={`jnborg-mode-btn ${!messy ? 'jnborg-mode-btn--active' : ''}`} onClick={() => setMessy(false)}>Structured Template</button>
        <button className={`jnborg-mode-btn jnborg-mode-btn--bad ${messy ? 'jnborg-mode-btn--active' : ''}`} onClick={() => setMessy(true)}>Messy Anti-Pattern</button>
      </div>

      {!messy ? (
        <div className="jnborg-cell-list">
          {GOOD_CELLS.map((c, i) => (
            <div key={i} className={`jnborg-cell ${i === active ? 'jnborg-cell--active' : ''}`} style={{ borderLeftColor: c.color }} onClick={() => setActive(i)}>
              <span className="jnborg-cell-num" style={{ background: c.color + '30', color: c.color }}>In [{c.num}]</span>
              <span className="jnborg-cell-label">{c.label}</span>
              {i === active && <p className="jnborg-cell-detail">{c.detail}</p>}
            </div>
          ))}
        </div>
      ) : (
        <div className="jnborg-messy-box">
          <div className="jnborg-messy-badge">Anti-Pattern: Everything in one cell</div>
          <pre className="jnborg-messy-code">{MESSY}</pre>
        </div>
      )}

      <div className="jnborg-checklist">
        <div className="jnborg-check-col">
          <div className="jnborg-check-head jnborg-do">Do</div>
          {DOS.map(d => <div key={d} className="jnborg-check-item jnborg-do-item">✓ {d}</div>)}
        </div>
        <div className="jnborg-check-col">
          <div className="jnborg-check-head jnborg-dont">Don't</div>
          {DONTS.map(d => <div key={d} className="jnborg-check-item jnborg-dont-item">✗ {d}</div>)}
        </div>
      </div>
    </div>
  );
}
