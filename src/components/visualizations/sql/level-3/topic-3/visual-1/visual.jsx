import React, { useState } from 'react';
import './visual.css';

const PROC_PARTS = [
  { part: 'CREATE PROCEDURE', color: '#4EA5D9', desc: 'Declares a new stored procedure with its name' },
  { part: 'Parameters (IN/OUT/INOUT)', color: '#68A063', desc: 'IN = input value, OUT = return value, INOUT = both' },
  { part: 'BEGIN … END', color: '#E5C07B', desc: 'The body — contains all SQL statements to execute' },
  { part: 'DECLARE', color: '#C678DD', desc: 'Declares local variables inside the procedure' },
  { part: 'IF / ELSEIF / ELSE', color: '#E06C75', desc: 'Conditional logic — runs different SQL based on conditions' },
  { part: 'CALL', color: '#56B6C2', desc: 'Executes the procedure with supplied arguments' },
];

const EXAMPLE_PROC = `DELIMITER $$

CREATE PROCEDURE GetTopEarners(
  IN  dept_name VARCHAR(100),
  IN  min_salary INT,
  OUT total_count INT
)
BEGIN
  -- Declare local variable
  DECLARE emp_count INT DEFAULT 0;

  -- Conditional logic
  IF dept_name IS NULL THEN
    SELECT * FROM employees
    WHERE salary >= min_salary;
  ELSE
    SELECT * FROM employees
    WHERE dept = dept_name
      AND salary >= min_salary;
  END IF;

  -- Set output parameter
  SELECT COUNT(*) INTO total_count
  FROM employees
  WHERE salary >= min_salary;
END $$

DELIMITER ;

-- Call the procedure
CALL GetTopEarners('Engineering', 90000, @count);
SELECT @count AS result_count;`;

const WITHOUT_PROC = `-- Without procedure: paste this EVERYWHERE you need it
SELECT e.name, e.salary, d.budget
FROM employees e
JOIN departments d ON e.dept = d.name
WHERE e.salary > 80000
  AND e.is_active = true
ORDER BY e.salary DESC;

-- The same query duplicated in 10 different places
-- Change the logic? Update all 10 files.`;

const WITH_PROC = `-- With procedure: define once, call anywhere
CREATE PROCEDURE GetHighEarners(IN min_sal INT)
BEGIN
  SELECT e.name, e.salary, d.budget
  FROM employees e
  JOIN departments d ON e.dept = d.name
  WHERE e.salary > min_sal AND e.is_active = true
  ORDER BY e.salary DESC;
END;

-- Call from app, reports, scripts — all use the same logic
CALL GetHighEarners(80000);  -- app.js
CALL GetHighEarners(100000); -- report.sql`;

const SqlStoredProceduresVisualization = () => {
  const [activePart, setActivePart] = useState(null);
  const [callSalary, setCallSalary] = useState(90000);
  const [callDept, setCallDept] = useState('Engineering');
  const [executed, setExecuted] = useState(false);
  const [tab, setTab] = useState('anatomy');

  const DEMO_DATA = [
    { id: 3, name: 'Frank', dept: 'Engineering', salary: 102000 },
    { id: 1, name: 'Alice', dept: 'Engineering', salary: 95000 },
  ].filter(r => r.dept === callDept && r.salary >= callSalary);

  return (
    <div className="sqlsp-wrap">
      <header className="sqlsp-head">
        <span className="sqlsp-badge">SQL</span>
        <h2>Stored Procedures</h2>
        <p>Reusable SQL logic stored in the database — called with CALL</p>
      </header>

      <div className="sqlsp-tabs">
        {[['anatomy', '🔬 Anatomy'], ['why', '💡 Why Use Them'], ['demo', '▶ Live Demo']].map(([key, label]) => (
          <button key={key} className={`sqlsp-tab ${tab === key ? 'sqlsp-tab--on' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {/* Anatomy */}
      {tab === 'anatomy' && (
        <div className="sqlsp-anatomy">
          <div className="sqlsp-grid">
            <div className="sqlsp-panel">
              <h3>Procedure Parts — click to explore</h3>
              <div className="sqlsp-parts">
                {PROC_PARTS.map((p, i) => (
                  <button key={p.part}
                    className={`sqlsp-part-btn ${activePart === i ? 'sqlsp-part-btn--on' : ''}`}
                    style={{ '--pc': p.color }} onClick={() => setActivePart(activePart === i ? null : i)}>
                    <code>{p.part}</code>
                    {activePart === i && <span className="sqlsp-part-desc">{p.desc}</span>}
                  </button>
                ))}
              </div>
            </div>
            <div className="sqlsp-panel">
              <h3>Full Example</h3>
              <pre className="sqlsp-code sqlsp-code--scroll"><code>{EXAMPLE_PROC}</code></pre>
            </div>
          </div>
        </div>
      )}

      {/* Why */}
      {tab === 'why' && (
        <div className="sqlsp-why">
          <div className="sqlsp-why-grid">
            <div className="sqlsp-why-col">
              <div className="sqlsp-why-head sqlsp-why-head--bad">❌ Without Procedure</div>
              <pre className="sqlsp-code"><code>{WITHOUT_PROC}</code></pre>
            </div>
            <div className="sqlsp-why-col">
              <div className="sqlsp-why-head sqlsp-why-head--good">✓ With Procedure</div>
              <pre className="sqlsp-code"><code>{WITH_PROC}</code></pre>
            </div>
          </div>
          <div className="sqlsp-benefits">
            {[
              ['♻️ Reusability', 'Write once, call from any app or script'],
              ['🔒 Security', 'Grant EXECUTE permission — users never see the SQL'],
              ['⚡ Performance', 'Pre-compiled execution plan — faster than ad-hoc SQL'],
              ['📦 Encapsulation', 'Complex multi-step logic hidden behind a simple CALL'],
            ].map(([icon_label, desc]) => (
              <div key={icon_label} className="sqlsp-benefit">
                <strong>{icon_label}</strong><span>{desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Demo */}
      {tab === 'demo' && (
        <div className="sqlsp-demo">
          <h3>Call the procedure</h3>
          <div className="sqlsp-call-form">
            <label>dept_name (IN)
              <select className="sqlsp-select" value={callDept} onChange={e => { setCallDept(e.target.value); setExecuted(false); }}>
                {['Engineering', 'Design', 'Marketing'].map(d => <option key={d}>{d}</option>)}
              </select>
            </label>
            <label>min_salary (IN)
              <input className="sqlsp-input" type="number" value={callSalary} onChange={e => { setCallSalary(Number(e.target.value)); setExecuted(false); }} />
            </label>
          </div>
          <pre className="sqlsp-code"><code>{`CALL GetTopEarners('${callDept}', ${callSalary.toLocaleString()}, @count);\nSELECT @count AS result_count;`}</code></pre>
          <button className="sqlsp-call-btn" onClick={() => setExecuted(true)}>CALL ▶</button>
          {executed && (
            <div className="sqlsp-results">
              <div className="sqlsp-out-param">@count (OUT) = <strong>{DEMO_DATA.length}</strong></div>
              {DEMO_DATA.length > 0 ? (
                <table className="sqlsp-table">
                  <thead><tr><th>id</th><th>name</th><th>dept</th><th>salary</th></tr></thead>
                  <tbody>{DEMO_DATA.map(r => <tr key={r.id}><td>{r.id}</td><td>{r.name}</td><td>{r.dept}</td><td>{r.salary.toLocaleString()}</td></tr>)}</tbody>
                </table>
              ) : (
                <div className="sqlsp-empty">No employees match the criteria.</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SqlStoredProceduresVisualization;
