/* Lesson: Loops and Conditionals — Making Python Do Repetitive Work
 * Visual type: INTERACTIVE
 * Stepped trace of a for loop + if/elif/else over the Zephyr order list */
import React, { useState } from 'react';
import './visual.css';

const ORDERS = [
  { id:1, city:'Mumbai',    amount:4200  },
  { id:2, city:'Pune',      amount:12400 },
  { id:3, city:'Delhi',     amount:980   },
  { id:4, city:'Bengaluru', amount:6700  },
  { id:5, city:'Hyderabad', amount:450   },
];

function classify(amount) {
  if (amount >= 10000) return { label:'Premium', cls:'py-tier py-tier--prem' };
  if (amount >= 3000)  return { label:'Standard', cls:'py-tier py-tier--std' };
  return { label:'Budget', cls:'py-tier py-tier--bud' };
}

const CODE = `orders = [...] # list of dicts
results = []
for order in orders:
    if order['amount'] >= 10000:
        tier = 'Premium'
    elif order['amount'] >= 3000:
        tier = 'Standard'
    else:
        tier = 'Budget'
    results.append({**order, 'tier': tier})`;

const PyLoopsVisualization = () => {
  const [step, setStep] = useState(0);
  const current = step < ORDERS.length ? ORDERS[step] : null;

  return (
    <div className="pyloop-wrap">
      <header className="pyloop-head">
        <span className="pyloop-badge">Python Basics</span>
        <h2>Loops &amp; Conditionals</h2>
        <p>Step through the loop — watch the classification happen</p>
      </header>

      <pre className="pyloop-code"><code>{CODE}</code></pre>

      <div className="pyloop-stepper">
        <button className="pyloop-btn" onClick={()=>setStep(Math.max(0,step-1))} disabled={step===0}>← Prev</button>
        <span className="pyloop-step-label">Iteration {Math.min(step+1, ORDERS.length)} / {ORDERS.length}</span>
        <button className="pyloop-btn" onClick={()=>setStep(Math.min(ORDERS.length-1,step+1))} disabled={step>=ORDERS.length-1}>Next →</button>
      </div>

      {current && (
        <div className="pyloop-current">
          <div className="pyloop-var"><span>order['city']</span> = <strong>{current.city}</strong></div>
          <div className="pyloop-var"><span>order['amount']</span> = <strong>₹{current.amount.toLocaleString()}</strong></div>
          <div className="pyloop-condition">
            {current.amount >= 10000 ? '✓ amount >= 10000 → "Premium"' :
             current.amount >= 3000  ? '✗ amount < 10000 · ✓ amount >= 3000 → "Standard"' :
                                       '✗ amount < 10000 · ✗ amount < 3000 → else → "Budget"'}
          </div>
          <div className={classify(current.amount).cls}>tier = "{classify(current.amount).label}"</div>
        </div>
      )}

      <div className="pyloop-results">
        <div className="pyloop-results-label">results so far ({step + 1} items)</div>
        {ORDERS.slice(0, step+1).map((o, i) => (
          <div key={o.id} className="pyloop-row">
            <span>{o.city}</span>
            <span>₹{o.amount.toLocaleString()}</span>
            <span className={classify(o.amount).cls}>{classify(o.amount).label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PyLoopsVisualization;
