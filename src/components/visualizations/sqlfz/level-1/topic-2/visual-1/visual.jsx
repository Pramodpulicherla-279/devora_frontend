/* Lesson: Setting Up Your SQL Environment (SQLite + DB Browser)
 * Visual type: ILLUSTRATION
 * Shows the 3-component setup: SQLite file, DB Browser GUI, SQL query → result */
import React, { useState } from 'react';
import './visual.css';

const STEPS = [
  { id:'sqlite', icon:'🗄️', title:'SQLite',       body:'A single .db file IS the database — no server, no installation. Perfect for learning and small projects. Works offline.' },
  { id:'dbbrow', icon:'🖥️', title:'DB Browser',    body:'Free GUI tool — open your .db file, see tables, write queries in a text box, see results as a table. Like Excel but for SQL.' },
  { id:'query',  icon:'⌨️', title:'Write SQL',     body:'Type your query in the SQL editor, press ▶ Run. Results appear instantly below. You\'ll be doing this within 5 minutes of setup.' },
];

const QUERY_DEMO = `-- The Zephyr orders database has one table: orders
SELECT * FROM orders LIMIT 5;`;
const RESULT_ROWS = [
  ['1','Mumbai','4200','Electronics','Aisha'],
  ['2','Pune','1850','Accessories','Ravi'],
  ['3','Delhi','6700','Electronics','Priya'],
];

const SqlFzSetupVisualization = () => {
  const [step, setStep] = useState('sqlite');
  const s = STEPS.find(x=>x.id===step);

  return (
    <div className="sqlfzset-wrap">
      <header className="sqlfzset-head">
        <span className="sqlfzset-badge">SQL</span>
        <h2>Your SQL Environment</h2>
        <p>Three pieces — set up in under 10 minutes</p>
      </header>

      <div className="sqlfzset-pipeline">
        {STEPS.map((st, i)=>(
          <div key={st.id} className="sqlfzset-step-wrap">
            <button className={`sqlfzset-step ${step===st.id?'sqlfzset-step--on':''}`} onClick={()=>setStep(st.id)}>
              <span className="sqlfzset-step-icon">{st.icon}</span>
              <span className="sqlfzset-step-title">{st.title}</span>
            </button>
            {i<STEPS.length-1 && <span className="sqlfzset-arr">→</span>}
          </div>
        ))}
      </div>

      <div className="sqlfzset-body">{s.body}</div>

      <div className="sqlfzset-demo-label">What it looks like when you run a query:</div>
      <pre className="sqlfzset-code"><code>{QUERY_DEMO}</code></pre>
      <div className="sqlfzset-result-wrap">
        <table className="sqlfzset-result">
          <thead><tr><th>id</th><th>city</th><th>amount</th><th>category</th><th>rep</th></tr></thead>
          <tbody>{RESULT_ROWS.map((r,i)=><tr key={i}>{r.map((c,j)=><td key={j}>{c}</td>)}</tr>)}</tbody>
        </table>
        <div className="sqlfzset-row-count">3 rows in set</div>
      </div>
    </div>
  );
};

export default SqlFzSetupVisualization;
