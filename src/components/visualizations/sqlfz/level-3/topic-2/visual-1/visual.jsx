/* Lesson: INNER, LEFT, RIGHT Joins — The Visual Guide
 * Visual type: INTERACTIVE
 * Toggle join type, see which rows appear in the result */
import React, { useState } from 'react';
import './visual.css';

const ORDERS = [
  { id:1, cust_id:1, amount:4200  },
  { id:2, cust_id:2, amount:1850  },
  { id:3, cust_id:3, amount:6700  },
  { id:4, cust_id:5, amount:980   },
];
const CUSTOMERS = [
  { id:1, name:'Aisha', plan:'Premium'  },
  { id:2, name:'Ravi',  plan:'Standard' },
  { id:3, name:'Priya', plan:'Premium'  },
  { id:4, name:'Meera', plan:'Basic'    },
];

const JOINS = [
  {
    id:'inner', label:'INNER JOIN',
    code:`SELECT o.id, c.name, o.amount\nFROM orders o\nINNER JOIN customers c\n  ON o.cust_id = c.id;`,
    result: ORDERS.filter(o=>CUSTOMERS.find(c=>c.id===o.cust_id)).map(o=>({orderId:o.id,custId:o.cust_id,amount:o.amount,name:CUSTOMERS.find(c=>c.id===o.cust_id)?.name,plan:CUSTOMERS.find(c=>c.id===o.cust_id)?.plan})),
    note:'Only rows that MATCH in BOTH tables. cust_id=5 (no customer) and Meera (no order) are excluded.',
  },
  {
    id:'left', label:'LEFT JOIN',
    code:`SELECT o.id, c.name, o.amount\nFROM orders o\nLEFT JOIN customers c\n  ON o.cust_id = c.id;`,
    result: ORDERS.map(o=>{const c=CUSTOMERS.find(x=>x.id===o.cust_id);return{orderId:o.id,custId:o.cust_id,amount:o.amount,name:c?.name??null,plan:c?.plan??null};}),
    note:'ALL rows from the LEFT table (orders). cust_id=5 gets NULL for name/plan. Meera (no order) excluded.',
  },
  {
    id:'right', label:'RIGHT JOIN',
    code:`SELECT o.id, c.name, o.amount\nFROM orders o\nRIGHT JOIN customers c\n  ON o.cust_id = c.id;`,
    result: CUSTOMERS.map(c=>{const o=ORDERS.find(x=>x.cust_id===c.id);return{orderId:o?.id??null,custId:c.id,amount:o?.amount??null,name:c.name,plan:c.plan};}),
    note:'ALL rows from the RIGHT table (customers). Meera appears with NULL order. cust_id=5 excluded.',
  },
];

const SqlFzJoinsVisualization = () => {
  const [sel, setSel] = useState('inner');
  const j = JOINS.find(x=>x.id===sel);
  const fmt = (col, val) => val===null ? <span className="sqlfzjoin-null">NULL</span> : col==='amount' ? `₹${val.toLocaleString()}` : val;

  return (
    <div className="sqlfzjoin-wrap">
      <header className="sqlfzjoin-head">
        <span className="sqlfzjoin-badge">SQL</span>
        <h2>SQL JOINs</h2>
        <p>Which rows appear depends on the join type</p>
      </header>

      <div className="sqlfzjoin-tabs">
        {JOINS.map(jj=><button key={jj.id} className={`sqlfzjoin-tab ${sel===jj.id?'sqlfzjoin-tab--on':''}`} onClick={()=>setSel(jj.id)}>{jj.label}</button>)}
      </div>

      <pre className="sqlfzjoin-code"><code>{j.code}</code></pre>

      <div className="sqlfzjoin-table-wrap">
        <table className="sqlfzjoin-table">
          <thead><tr><th>order id</th><th>name</th><th>amount</th><th>plan</th></tr></thead>
          <tbody>
            {j.result.map((r,i)=>(
              <tr key={i}>
                <td>{fmt('id',r.orderId)}</td>
                <td>{fmt('name',r.name)}</td>
                <td>{fmt('amount',r.amount)}</td>
                <td>{fmt('plan',r.plan)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sqlfzjoin-note">{j.note}</div>
    </div>
  );
};

export default SqlFzJoinsVisualization;
