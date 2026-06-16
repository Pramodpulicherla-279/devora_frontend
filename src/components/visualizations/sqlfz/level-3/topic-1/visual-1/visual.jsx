/* Lesson: Understanding Table Relationships — Why Data Lives in Multiple Tables
 * Visual type: ILLUSTRATION
 * Shows orders table pointing to customers table via customer_id (foreign key) */
import React, { useState } from 'react';
import './visual.css';

const ORDERS = [
  { id:1, customer_id:3, amount:4200, category:'Electronics' },
  { id:2, customer_id:1, amount:1850, category:'Accessories' },
  { id:3, customer_id:3, amount:6700, category:'Electronics' },
  { id:4, customer_id:2, amount:980,  category:'Accessories' },
  { id:5, customer_id:1, amount:12400,category:'Electronics' },
];
const CUSTOMERS = [
  { id:1, name:'Aisha Khan', city:'Mumbai', plan:'Premium' },
  { id:2, name:'Ravi Patel', city:'Pune',   plan:'Standard'},
  { id:3, name:'Priya Singh',city:'Delhi',  plan:'Premium' },
];

const SqlFzRelationsVisualization = () => {
  const [highlight, setHighlight] = useState(null);

  const orderRows = highlight ? ORDERS.filter(o=>o.customer_id===highlight) : ORDERS;
  const custRows  = highlight ? CUSTOMERS.filter(c=>c.id===highlight) : CUSTOMERS;

  return (
    <div className="sqlfzrel-wrap">
      <header className="sqlfzrel-head">
        <span className="sqlfzrel-badge">SQL</span>
        <h2>Table Relationships</h2>
        <p>Click a customer row to see their orders — that's what JOIN does</p>
      </header>

      <div className="sqlfzrel-tables">
        <div className="sqlfzrel-table-wrap">
          <div className="sqlfzrel-table-label">customers (parent)</div>
          <table className="sqlfzrel-table">
            <thead><tr><th>id 🔑</th><th>name</th><th>city</th><th>plan</th></tr></thead>
            <tbody>
              {CUSTOMERS.map(c=>(
                <tr key={c.id} className={highlight===c.id?'sqlfzrel-tr--on':'sqlfzrel-tr'} onClick={()=>setHighlight(highlight===c.id?null:c.id)}>
                  <td>{c.id}</td><td>{c.name}</td><td>{c.city}</td><td>{c.plan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="sqlfzrel-arrow">⟶ customer_id</div>
        <div className="sqlfzrel-table-wrap">
          <div className="sqlfzrel-table-label">orders (child)</div>
          <table className="sqlfzrel-table">
            <thead><tr><th>id</th><th>customer_id 🔗</th><th>amount</th></tr></thead>
            <tbody>
              {ORDERS.map(o=>(
                <tr key={o.id} className={o.customer_id===highlight?'sqlfzrel-tr--on':'sqlfzrel-tr'}>
                  <td>{o.id}</td><td>{o.customer_id}</td><td>₹{o.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="sqlfzrel-note">
        <strong>Foreign key</strong>: orders.customer_id references customers.id. Instead of storing the customer's name in every order row (duplicated, error-prone), you store just the id and JOIN to look it up. This is called <em>normalisation</em>.
      </div>
    </div>
  );
};

export default SqlFzRelationsVisualization;
