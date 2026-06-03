import React, { useState } from 'react';
import './visual.css';

const RAW_DATA = [
  { id: 1, dept: 'Engineering', name: 'Alice', salary: 95000 },
  { id: 2, dept: 'Design', name: 'Bob', salary: 72000 },
  { id: 3, dept: 'Engineering', name: 'Carol', salary: 88000 },
  { id: 4, dept: 'Design', name: 'Dan', salary: 68000 },
  { id: 5, dept: 'Marketing', name: 'Eve', salary: 61000 },
  { id: 6, dept: 'Engineering', name: 'Frank', salary: 102000 },
  { id: 7, dept: 'Marketing', name: 'Grace', salary: 58000 },
];

const AGG_FUNCS = [
  { fn: 'COUNT(*)', color: '#4EA5D9', compute: rows => rows.length, desc: 'Count total rows' },
  { fn: 'SUM(salary)', color: '#68A063', compute: rows => rows.reduce((s, r) => s + r.salary, 0).toLocaleString(), desc: 'Sum all salaries' },
  { fn: 'AVG(salary)', color: '#E5C07B', compute: rows => Math.round(rows.reduce((s, r) => s + r.salary, 0) / rows.length).toLocaleString(), desc: 'Average salary' },
  { fn: 'MAX(salary)', color: '#C678DD', compute: rows => Math.max(...rows.map(r => r.salary)).toLocaleString(), desc: 'Highest salary' },
  { fn: 'MIN(salary)', color: '#E06C75', compute: rows => Math.min(...rows.map(r => r.salary)).toLocaleString(), desc: 'Lowest salary' },
];

const DEPTS = [...new Set(RAW_DATA.map(r => r.dept))];

const groupBy = () => DEPTS.map(dept => {
  const rows = RAW_DATA.filter(r => r.dept === dept);
  return { dept, count: rows.length, avg: Math.round(rows.reduce((s, r) => s + r.salary, 0) / rows.length), max: Math.max(...rows.map(r => r.salary)) };
});

const SqlAggregationsVisualization = () => {
  const [activeFn, setActiveFn] = useState(0);
  const [havingMin, setHavingMin] = useState(70000);
  const [tab, setTab] = useState('funcs');

  const fn = AGG_FUNCS[activeFn];
  const grouped = groupBy();
  const filtered = grouped.filter(g => g.avg >= havingMin);
  const maxAvg = Math.max(...grouped.map(g => g.avg));

  return (
    <div className="sqlag-wrap">
      <header className="sqlag-head">
        <span className="sqlag-badge">SQL</span>
        <h2>Aggregations</h2>
        <p>COUNT · SUM · AVG · MIN · MAX · GROUP BY · HAVING</p>
      </header>

      <div className="sqlag-tabs">
        {[['funcs', '∑ Aggregate Functions'], ['groupby', '📦 GROUP BY'], ['having', '🔍 HAVING']].map(([key, label]) => (
          <button key={key} className={`sqlag-tab ${tab === key ? 'sqlag-tab--on' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {/* Aggregate Functions */}
      {tab === 'funcs' && (
        <div className="sqlag-funcs">
          <div className="sqlag-fn-btns">
            {AGG_FUNCS.map((f, i) => (
              <button key={f.fn} className={`sqlag-fn-btn ${activeFn === i ? 'sqlag-fn-btn--on' : ''}`}
                style={{ '--fc': f.color }} onClick={() => setActiveFn(i)}>
                <code>{f.fn}</code>
                <span>{f.desc}</span>
              </button>
            ))}
          </div>
          <div className="sqlag-fn-result" style={{ borderColor: fn.color }}>
            <div className="sqlag-result-label">Result</div>
            <div className="sqlag-result-val" style={{ color: fn.color }}>{fn.compute(RAW_DATA)}</div>
            <pre className="sqlag-code"><code>{`SELECT ${fn.fn}\nFROM employees;`}</code></pre>
          </div>
          <div className="sqlag-raw-table">
            <div className="sqlag-raw-label">Source table (employees)</div>
            <table className="sqlag-table">
              <thead><tr><th>id</th><th>dept</th><th>name</th><th>salary</th></tr></thead>
              <tbody>
                {RAW_DATA.map(r => (
                  <tr key={r.id}><td>{r.id}</td><td>{r.dept}</td><td>{r.name}</td>
                    <td className="sqlag-salary">{r.salary.toLocaleString()}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* GROUP BY */}
      {tab === 'groupby' && (
        <div className="sqlag-groupby">
          <p className="sqlag-desc">GROUP BY collapses rows with the same value into one row per group, then applies aggregate functions to each group.</p>
          <div className="sqlag-groups-visual">
            {DEPTS.map(dept => {
              const dRows = RAW_DATA.filter(r => r.dept === dept);
              const colors = { Engineering: '#4EA5D9', Design: '#68A063', Marketing: '#E5C07B' };
              return (
                <div key={dept} className="sqlag-group-box" style={{ borderColor: colors[dept] }}>
                  <div className="sqlag-group-label" style={{ color: colors[dept] }}>{dept}</div>
                  <div className="sqlag-group-rows">
                    {dRows.map(r => <span key={r.id} className="sqlag-group-chip">{r.name}</span>)}
                  </div>
                  <div className="sqlag-group-stats">
                    <span>COUNT: {dRows.length}</span>
                    <span>AVG: {Math.round(dRows.reduce((s, r) => s + r.salary, 0) / dRows.length).toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <pre className="sqlag-code"><code>{`SELECT   dept,
         COUNT(*)          AS headcount,
         AVG(salary)       AS avg_salary,
         MAX(salary)       AS top_salary
FROM     employees
GROUP BY dept
ORDER BY avg_salary DESC;`}</code></pre>
          <table className="sqlag-table">
            <thead><tr><th>dept</th><th>headcount</th><th>avg_salary</th><th>top_salary</th></tr></thead>
            <tbody>
              {grouped.map(g => (
                <tr key={g.dept}><td>{g.dept}</td><td>{g.count}</td>
                  <td>{g.avg.toLocaleString()}</td><td>{g.max.toLocaleString()}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* HAVING */}
      {tab === 'having' && (
        <div className="sqlag-having">
          <div className="sqlag-having-compare">
            <div className="sqlag-where-box">
              <strong>WHERE</strong> filters individual <em>rows</em> BEFORE grouping
              <pre className="sqlag-code"><code>{`WHERE salary > 70000`}</code></pre>
            </div>
            <div className="sqlag-having-box">
              <strong>HAVING</strong> filters <em>groups</em> AFTER aggregation
              <pre className="sqlag-code"><code>{`HAVING AVG(salary) > 70000`}</code></pre>
            </div>
          </div>
          <div className="sqlag-having-slider">
            <label>Min average salary: <strong>{havingMin.toLocaleString()}</strong></label>
            <input type="range" min={50000} max={100000} step={5000} value={havingMin} onChange={e => setHavingMin(Number(e.target.value))} className="sqlag-slider" />
          </div>
          <pre className="sqlag-code"><code>{`SELECT   dept, AVG(salary) AS avg_salary\nFROM     employees\nGROUP BY dept\nHAVING   AVG(salary) >= ${havingMin.toLocaleString().replace(',', '')};`}</code></pre>
          <table className="sqlag-table">
            <thead><tr><th>dept</th><th>avg_salary</th><th>included?</th></tr></thead>
            <tbody>
              {grouped.map(g => (
                <tr key={g.dept} className={g.avg < havingMin ? 'sqlag-excluded' : 'sqlag-included'}>
                  <td>{g.dept}</td><td>{g.avg.toLocaleString()}</td>
                  <td>{g.avg >= havingMin ? '✓' : '✗'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="sqlag-having-note">{filtered.length} of {grouped.length} groups pass the HAVING filter.</p>
        </div>
      )}
    </div>
  );
};

export default SqlAggregationsVisualization;
