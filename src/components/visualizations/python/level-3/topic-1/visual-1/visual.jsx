/* Lesson: Error Handling — Writing Python That Doesn't Crash on Bad Data
 * Visual type: INTERACTIVE
 * Step through a try/except block with 3 scenarios — clean, missing, wrong type */
import React, { useState } from 'react';
import './visual.css';

const SCENARIOS = [
  {
    id: 'ok',
    label: '✓ Good data',
    row: { city:'Mumbai', amount:'4200' },
    trace: [
      { line:'try:', active:true, result:'', cls:'' },
      { line:"    amount = float(row['amount'])", active:true, result:'→ 4200.0', cls:'pyerr-ok' },
      { line:"    tier = 'Premium' if amount >= 10000 else 'Standard'", active:true, result:'→ "Standard"', cls:'pyerr-ok' },
      { line:'except ValueError:', active:false, result:'skipped', cls:'pyerr-skip' },
      { line:'except KeyError:', active:false, result:'skipped', cls:'pyerr-skip' },
    ],
    outcome: '✓ Row processed: Mumbai, ₹4,200, Standard',
    outcomeClass: 'pyerr-outcome--ok',
  },
  {
    id: 'missing',
    label: '✗ Missing key',
    row: { city:'Pune' },
    trace: [
      { line:'try:', active:true, result:'', cls:'' },
      { line:"    amount = float(row['amount'])", active:true, result:"→ KeyError: 'amount'", cls:'pyerr-err' },
      { line:"    tier = 'Premium' if amount >= 10000 else 'Standard'", active:false, result:'never reached', cls:'pyerr-skip' },
      { line:'except ValueError:', active:false, result:'skipped (wrong error)', cls:'pyerr-skip' },
      { line:'except KeyError:', active:true, result:"→ caught! log and continue", cls:'pyerr-ok' },
    ],
    outcome: '⚠ Bad row logged, script continues',
    outcomeClass: 'pyerr-outcome--warn',
  },
  {
    id: 'badtype',
    label: '✗ Wrong type',
    row: { city:'Delhi', amount:'N/A' },
    trace: [
      { line:'try:', active:true, result:'', cls:'' },
      { line:"    amount = float(row['amount'])", active:true, result:"→ ValueError: could not convert 'N/A' to float", cls:'pyerr-err' },
      { line:"    tier = 'Premium' if amount >= 10000 else 'Standard'", active:false, result:'never reached', cls:'pyerr-skip' },
      { line:'except ValueError:', active:true, result:'→ caught! set amount = 0.0', cls:'pyerr-ok' },
      { line:'except KeyError:', active:false, result:'skipped (wrong error)', cls:'pyerr-skip' },
    ],
    outcome: '⚠ amount set to 0.0, row kept',
    outcomeClass: 'pyerr-outcome--warn',
  },
];

const CODE_TOP = `for row in rows:
    try:
        amount = float(row['amount'])
        tier = 'Premium' if amount >= 10000 else 'Standard'
    except ValueError:
        amount = 0.0   # non-numeric amount
    except KeyError:
        continue       # row missing 'amount' key — skip it`;

const PyErrorHandlingVisualization = () => {
  const [sel, setSel] = useState('ok');
  const sc = SCENARIOS.find(s=>s.id===sel);

  return (
    <div className="pyerr-wrap">
      <header className="pyerr-head">
        <span className="pyerr-badge">Python Basics</span>
        <h2>Error Handling</h2>
        <p>Pick a data scenario — see which branch executes</p>
      </header>

      <pre className="pyerr-code-top"><code>{CODE_TOP}</code></pre>

      <div className="pyerr-scenarios">
        {SCENARIOS.map(s=>(
          <button key={s.id} className={`pyerr-scenario ${sel===s.id?'pyerr-scenario--on':''}`} onClick={()=>setSel(s.id)}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="pyerr-row-view">
        <span className="pyerr-row-label">Current row:</span>
        <code className="pyerr-row-code">{JSON.stringify(sc.row)}</code>
      </div>

      <div className="pyerr-trace">
        {sc.trace.map((t,i)=>(
          <div key={i} className={`pyerr-trace-line ${!t.active?'pyerr-trace-line--dim':''}`}>
            <code className="pyerr-line-code">{t.line}</code>
            {t.result && <span className={`pyerr-result ${t.cls}`}>{t.result}</span>}
          </div>
        ))}
      </div>

      <div className={`pyerr-outcome ${sc.outcomeClass}`}>{sc.outcome}</div>

      <div className="pyerr-note">
        <strong>Rule:</strong> catch specific exceptions (ValueError, KeyError, TypeError), never bare <code>except:</code>. Log the row and continue rather than crashing the whole batch.
      </div>
    </div>
  );
};

export default PyErrorHandlingVisualization;
