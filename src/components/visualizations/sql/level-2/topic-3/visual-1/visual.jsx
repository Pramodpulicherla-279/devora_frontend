import React, { useState } from 'react';
import './visual.css';

const RAW = [
  { id: 1, dept: 'Engineering', name: 'Alice', salary: 95000 },
  { id: 2, dept: 'Engineering', name: 'Carol', salary: 88000 },
  { id: 3, dept: 'Engineering', name: 'Frank', salary: 102000 },
  { id: 4, dept: 'Design', name: 'Bob', salary: 72000 },
  { id: 5, dept: 'Design', name: 'Dan', salary: 68000 },
  { id: 6, dept: 'Marketing', name: 'Eve', salary: 61000 },
  { id: 7, dept: 'Marketing', name: 'Grace', salary: 58000 },
];

const addWindowFuncs = () => {
  const byDept = {};
  RAW.forEach(r => { byDept[r.dept] = byDept[r.dept] || []; byDept[r.dept].push(r); });
  return RAW.map(row => {
    const deptRows = [...byDept[row.dept]].sort((a, b) => b.salary - a.salary);
    const rank_idx = deptRows.findIndex(r => r.id === row.id);
    const sameAbove = deptRows.filter((r, i) => i < rank_idx && r.salary !== deptRows[rank_idx].salary);
    const denseSameAbove = [...new Set(deptRows.slice(0, rank_idx).map(r => r.salary))].length;
    const sorted = [...byDept[row.dept]].sort((a, b) => b.salary - a.salary);
    const rowNum = sorted.findIndex(r => r.id === row.id) + 1;
    const rank = sameAbove.length + 1;
    const denseRank = denseSameAbove + 1;
    const allSorted = [...RAW].sort((a, b) => b.salary - a.salary);
    const globalRank = allSorted.findIndex(r => r.id === row.id) + 1;
    return { ...row, row_number: rowNum, rank, dense_rank: denseRank, global_rank: globalRank };
  });
};

const DEPT_COLORS = { Engineering: '#4EA5D9', Design: '#68A063', Marketing: '#E5C07B' };

const WF_EXAMPLES = [
  { fn: 'ROW_NUMBER()', color: '#4EA5D9', desc: 'Assigns a unique sequential integer to each row within the partition. No ties — always unique.', col: 'row_number' },
  { fn: 'RANK()', color: '#68A063', desc: 'Assigns rank. Ties get the SAME rank, but the next rank SKIPS (1,1,3 — no 2).', col: 'rank' },
  { fn: 'DENSE_RANK()', color: '#C678DD', desc: 'Like RANK() but no skipping. Ties get the same rank, next rank is always consecutive (1,1,2).', col: 'dense_rank' },
];

const SqlWindowFunctionsVisualization = () => {
  const [activeWf, setActiveWf] = useState(0);
  const [partitioned, setPartitioned] = useState(true);
  const [tab, setTab] = useState('rank');

  const data = addWindowFuncs();
  const wf = WF_EXAMPLES[activeWf];

  const OVER_CODE = `SELECT name, dept, salary,
  ${wf.fn} OVER (
    ${partitioned ? 'PARTITION BY dept\n    ' : ''}ORDER BY salary DESC
  ) AS ${wf.col}
FROM employees;`;

  return (
    <div className="sqlwf-wrap">
      <header className="sqlwf-head">
        <span className="sqlwf-badge">SQL</span>
        <h2>Window Functions</h2>
        <p>Compute across rows without collapsing them like GROUP BY does</p>
      </header>

      <div className="sqlwf-tabs">
        {[['rank', '🏆 Ranking Functions'], ['over', '🪟 OVER Clause'], ['anatomy', '🔍 Anatomy']].map(([key, label]) => (
          <button key={key} className={`sqlwf-tab ${tab === key ? 'sqlwf-tab--on' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {/* Ranking */}
      {tab === 'rank' && (
        <div className="sqlwf-rank">
          <div className="sqlwf-wf-tabs">
            {WF_EXAMPLES.map((w, i) => (
              <button key={w.fn} className={`sqlwf-wf-tab ${activeWf === i ? 'sqlwf-wf-tab--on' : ''}`}
                style={{ '--wc': w.color }} onClick={() => setActiveWf(i)}>
                <code>{w.fn}</code>
              </button>
            ))}
          </div>
          <div className="sqlwf-wf-desc" style={{ borderColor: wf.color }}><p>{wf.desc}</p></div>

          <div className="sqlwf-partition-toggle">
            <label>
              <input type="checkbox" checked={partitioned} onChange={e => setPartitioned(e.target.checked)} />
              PARTITION BY dept (rank within each department)
            </label>
          </div>

          <div className="sqlwf-table-wrap">
            <table className="sqlwf-table">
              <thead>
                <tr>
                  <th>name</th><th>dept</th><th>salary</th>
                  <th style={{ color: wf.color }}>{wf.col}</th>
                </tr>
              </thead>
              <tbody>
                {(partitioned
                  ? Object.keys(DEPT_COLORS).flatMap(dept => data.filter(r => r.dept === dept).sort((a, b) => b.salary - a.salary))
                  : [...data].sort((a, b) => b.salary - a.salary)
                ).map((r, i) => (
                  <tr key={r.id}>
                    <td>{r.name}</td>
                    <td><span className="sqlwf-dept-chip" style={{ background: DEPT_COLORS[r.dept] }}>{r.dept}</span></td>
                    <td>{r.salary.toLocaleString()}</td>
                    <td className="sqlwf-rank-val" style={{ color: wf.color }}>
                      {partitioned ? r[wf.col] : r.global_rank}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <pre className="sqlwf-code"><code>{OVER_CODE}</code></pre>
        </div>
      )}

      {/* OVER Clause */}
      {tab === 'over' && (
        <div className="sqlwf-over">
          <p className="sqlwf-over-desc">The <code>OVER()</code> clause defines the window — which rows each function considers.</p>
          <pre className="sqlwf-code"><code>{`function_name() OVER (
  PARTITION BY column   -- divide into groups (optional)
  ORDER BY column       -- sort within each group
  ROWS BETWEEN ...      -- frame size (optional)
)`}</code></pre>
          <div className="sqlwf-over-parts">
            {[
              { part: 'PARTITION BY dept', color: '#4EA5D9', desc: 'Divide rows into groups. Function resets per group. Like GROUP BY but keeps all rows.' },
              { part: 'ORDER BY salary DESC', color: '#68A063', desc: 'Sort within each partition. Determines ranking and cumulative calculations.' },
              { part: 'ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW', color: '#E5C07B', desc: 'Frame — which rows are included. Default for SUM/AVG running totals.' },
            ].map(p => (
              <div key={p.part} className="sqlwf-over-part" style={{ borderColor: p.color }}>
                <code style={{ color: p.color }}>{p.part}</code>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
          <pre className="sqlwf-code"><code>{`-- Running total of salary by dept
SELECT name, dept, salary,
  SUM(salary) OVER (
    PARTITION BY dept
    ORDER BY salary
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total
FROM employees;`}</code></pre>
        </div>
      )}

      {/* Anatomy */}
      {tab === 'anatomy' && (
        <div className="sqlwf-anatomy">
          <p className="sqlwf-over-desc">Window functions vs GROUP BY — the key difference:</p>
          <div className="sqlwf-vs-grid">
            <div className="sqlwf-vs-box sqlwf-vs-box--groupby">
              <div className="sqlwf-vs-head">GROUP BY</div>
              <ul><li>Collapses rows into one per group</li><li>Loses individual row data</li><li>7 rows → 3 rows</li></ul>
              <pre className="sqlwf-code"><code>{`SELECT dept, AVG(salary)
FROM employees
GROUP BY dept;
-- Returns 3 rows (one per dept)`}</code></pre>
            </div>
            <div className="sqlwf-vs-box sqlwf-vs-box--window">
              <div className="sqlwf-vs-head">Window Function</div>
              <ul><li>Keeps all rows intact</li><li>Adds calculated column</li><li>7 rows → still 7 rows</li></ul>
              <pre className="sqlwf-code"><code>{`SELECT name, dept, salary,
  AVG(salary) OVER (PARTITION BY dept)
FROM employees;
-- Returns 7 rows (all preserved)`}</code></pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SqlWindowFunctionsVisualization;
