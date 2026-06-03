/* Lesson: Complete Pandas Workflow
 * Visual type: ILLUSTRATION (pipeline walk)
 * Reason: Ties the course together — a clickable end-to-end pipeline from load to
 * export shows where each skill fits in a real analysis. */
import React, { useState } from 'react';
import './visual.css';

const STAGES = [
  { icon: '📥', label: 'Load', code: "df = pd.read_csv('sales.csv')", d: 'Read the raw data into a DataFrame.' },
  { icon: '🔍', label: 'Explore', code: 'df.info(); df.describe()', d: 'Understand shape, types & missing values.' },
  { icon: '🧹', label: 'Clean', code: "df = df.dropna().drop_duplicates()", d: 'Fix NaN, dupes, types, casing.' },
  { icon: '🔧', label: 'Transform', code: "df['total'] = df['price'] * df['qty']", d: 'Engineer the columns you need.' },
  { icon: '📊', label: 'Aggregate', code: "df.groupby('region')['total'].sum()", d: 'Summarize with groupby.' },
  { icon: '📤', label: 'Export', code: "result.to_csv('report.csv')", d: 'Save or visualize the result.' },
];

const PdWorkflowVisualization = () => {
  const [s, setS] = useState(0);
  return (
    <div className="pdflow-wrap">
      <header className="pdflow-head">
        <span className="pdflow-badge">Pandas</span>
        <h2>Complete Pandas Workflow</h2>
        <p>How every skill fits into one analysis</p>
      </header>
      <div className="pdflow-track">
        {STAGES.map((st, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div className={`pdflow-conn ${i <= s ? 'pdflow-conn--on' : ''}`} />}
            <button className={`pdflow-stage ${s === i ? 'pdflow-stage--on' : ''} ${i < s ? 'pdflow-stage--done' : ''}`} onClick={() => setS(i)}>
              <span className="pdflow-icon">{st.icon}</span>
              <span className="pdflow-label">{st.label}</span>
            </button>
          </React.Fragment>
        ))}
      </div>
      <div className="pdflow-detail"><strong>{STAGES[s].icon} {STAGES[s].label}</strong><p>{STAGES[s].d}</p></div>
      <pre className="pdflow-code"><code>{STAGES[s].code}</code></pre>
      <div className="pdflow-note">Real analysis loops through load → explore → clean → transform → aggregate → export. Pandas covers the whole pipeline.</div>
    </div>
  );
};
export default PdWorkflowVisualization;
