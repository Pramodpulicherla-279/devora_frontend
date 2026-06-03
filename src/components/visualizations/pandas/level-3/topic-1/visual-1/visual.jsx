/* Lesson: Data Cleaning with Pandas
 * Visual type: ILLUSTRATION (animated messy → clean)
 * Reason: Cleaning is a sequence of fixes. Stepping a messy table through each
 * fix (dedupe, types, casing, NaN) to a clean result shows the whole workflow. */
import React, { useState } from 'react';
import './visual.css';

const STEPS = [
  { label: 'Raw (messy)', code: 'df  # the mess', rows: [['  ALICE ', '28', 'mumbai'], ['Bob', 'NaN', 'Delhi'], ['Bob', 'NaN', 'Delhi'], ['carol', '22', ' PUNE']] },
  { label: 'Drop duplicates', code: 'df.drop_duplicates()', rows: [['  ALICE ', '28', 'mumbai'], ['Bob', 'NaN', 'Delhi'], ['carol', '22', ' PUNE']] },
  { label: 'Strip + title case', code: "df['name'] = df['name'].str.strip().str.title()", rows: [['Alice', '28', 'mumbai'], ['Bob', 'NaN', 'Delhi'], ['Carol', '22', ' PUNE']] },
  { label: 'Fill NaN', code: "df['age'] = df['age'].fillna(df['age'].median())", rows: [['Alice', '28', 'mumbai'], ['Bob', '25', 'Delhi'], ['Carol', '22', ' PUNE']] },
  { label: 'Normalize city', code: "df['city'] = df['city'].str.strip().str.title()", rows: [['Alice', '28', 'Mumbai'], ['Bob', '25', 'Delhi'], ['Carol', '22', 'Pune']] },
];

const PdCleanVisualization = () => {
  const [step, setStep] = useState(0);
  const s = STEPS[step];
  return (
    <div className="pdclean-wrap">
      <header className="pdclean-head">
        <span className="pdclean-badge">Pandas</span>
        <h2>Data Cleaning</h2>
        <p>Messy real data → analysis-ready, one fix at a time</p>
      </header>
      <div className="pdclean-track">
        {STEPS.map((st, i) => (
          <button key={i} className={`pdclean-dot ${step === i ? 'pdclean-dot--on' : ''} ${i < step ? 'pdclean-dot--done' : ''}`} onClick={() => setStep(i)}>{i}</button>
        ))}
      </div>
      <div className="pdclean-label">{s.label}</div>
      <pre className="pdclean-code"><code>{s.code}</code></pre>
      <div className="pdclean-table-wrap">
        <table className="pdclean-table">
          <thead><tr><th>name</th><th>age</th><th>city</th></tr></thead>
          <tbody>{s.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className={c.includes('NaN') ? 'pdclean-bad' : ''}>{c}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <div className="pdclean-nav">
        <button className="pdclean-btn" disabled={step === 0} onClick={() => setStep((x) => x - 1)}>← Prev</button>
        <button className="pdclean-btn pdclean-btn--next" disabled={step === STEPS.length - 1} onClick={() => setStep((x) => x + 1)}>Next fix →</button>
      </div>
      {step === STEPS.length - 1 && <div className="pdclean-done">✅ Clean: deduped, typed, consistent casing, no NaN.</div>}
    </div>
  );
};
export default PdCleanVisualization;
