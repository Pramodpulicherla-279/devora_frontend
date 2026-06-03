import React, { useState } from 'react';
import './visual.css';

const SUBQUERY_TYPES = {
  scalar: {
    label: 'Scalar Subquery',
    color: '#4EA5D9',
    desc: 'Returns a single value. Used anywhere a single value is expected.',
    code: `-- Find employees earning more than the average salary
SELECT name, salary
FROM   employees
WHERE  salary > (
         SELECT AVG(salary)   -- ← scalar: returns one number
         FROM   employees
       );`,
    highlight: 'Returns: one row, one column (a single value)',
  },
  in: {
    label: 'IN Subquery',
    color: '#68A063',
    desc: 'Checks if a value exists in a list returned by the subquery.',
    code: `-- Find employees in departments with more than 2 people
SELECT name, dept
FROM   employees
WHERE  dept IN (
         SELECT dept           -- ← returns a list of depts
         FROM   employees
         GROUP BY dept
         HAVING COUNT(*) > 2
       );`,
    highlight: 'Returns: one column, multiple rows (a list)',
  },
  exists: {
    label: 'EXISTS Subquery',
    color: '#C678DD',
    desc: 'Returns true if the subquery returns ANY rows at all. Stops at first match — faster than IN for large data.',
    code: `-- Find customers who have placed at least one order
SELECT name
FROM   customers c
WHERE  EXISTS (
         SELECT 1               -- ← just checks existence
         FROM   orders o
         WHERE  o.customer_id = c.id
       );`,
    highlight: 'Returns: boolean (true/false per outer row)',
  },
  correlated: {
    label: 'Correlated Subquery',
    color: '#E5C07B',
    desc: 'References the outer query. Re-executed once per outer row — powerful but can be slow on large tables.',
    code: `-- Find employees earning more than their own dept average
SELECT name, dept, salary
FROM   employees e1
WHERE  salary > (
         SELECT AVG(salary)
         FROM   employees e2
         WHERE  e2.dept = e1.dept   -- ← references outer row
       );`,
    highlight: 'Runs once per outer row — references the outer query',
  },
};

const EXEC_STEPS = [
  { label: '① Inner query runs first', color: '#4EA5D9' },
  { label: '② Inner result is passed to outer query', color: '#68A063' },
  { label: '③ Outer query filters/processes using the result', color: '#E5C07B' },
  { label: '④ Final result returned to client', color: '#c9d1d9' },
];

const SqlSubqueriesVisualization = () => {
  const [activeType, setActiveType] = useState('scalar');
  const [step, setStep] = useState(-1);

  const t = SUBQUERY_TYPES[activeType];

  return (
    <div className="sqlsq-wrap">
      <header className="sqlsq-head">
        <span className="sqlsq-badge">SQL</span>
        <h2>Subqueries</h2>
        <p>Nest queries inside queries to answer complex questions</p>
      </header>

      <div className="sqlsq-type-tabs">
        {Object.entries(SUBQUERY_TYPES).map(([key, { label, color }]) => (
          <button key={key} className={`sqlsq-type-tab ${activeType === key ? 'sqlsq-type-tab--on' : ''}`}
            style={{ '--tc': color }} onClick={() => { setActiveType(key); setStep(-1); }}>
            {label}
          </button>
        ))}
      </div>

      <div className="sqlsq-grid">
        {/* Left: description + anatomy */}
        <div className="sqlsq-panel">
          <div className="sqlsq-type-badge" style={{ background: t.color }}>{t.label}</div>
          <p className="sqlsq-desc">{t.desc}</p>
          <div className="sqlsq-highlight" style={{ borderColor: t.color }}>
            <span className="sqlsq-hl-icon">ℹ</span> {t.highlight}
          </div>

          {/* Execution Order */}
          <h3>Execution Order</h3>
          <div className="sqlsq-steps">
            {EXEC_STEPS.map((s, i) => (
              <div key={i} className={`sqlsq-step ${step >= i ? 'sqlsq-step--on' : ''}`} style={{ '--sc': s.color }}>
                <div className="sqlsq-step-dot" />
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="sqlsq-step-controls">
            <button className="sqlsq-btn" onClick={() => setStep(s => Math.min(3, s + 1))} disabled={step === 3}>Next step →</button>
            <button className="sqlsq-btn sqlsq-btn--reset" onClick={() => setStep(-1)}>Reset</button>
          </div>
        </div>

        {/* Right: query */}
        <div className="sqlsq-panel">
          <h3>Query</h3>
          <div className="sqlsq-query-wrap">
            <div className="sqlsq-outer-label">Outer query</div>
            <pre className="sqlsq-code" style={{ borderColor: t.color }}><code>{t.code}</code></pre>
          </div>

          <div className="sqlsq-vs">
            <h3>When to use what?</h3>
            <div className="sqlsq-vs-grid">
              {[
                { kw: 'Scalar', use: 'When you need a single value in WHERE or SELECT', color: '#4EA5D9' },
                { kw: 'IN', use: 'When checking membership in a list', color: '#68A063' },
                { kw: 'EXISTS', use: 'When you only need to know if rows exist', color: '#C678DD' },
                { kw: 'Correlated', use: 'When inner query depends on each outer row', color: '#E5C07B' },
              ].map(row => (
                <div key={row.kw} className="sqlsq-vs-row" style={{ borderColor: row.color }}>
                  <code style={{ color: row.color }}>{row.kw}</code>
                  <span>{row.use}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SqlSubqueriesVisualization;
