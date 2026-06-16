import { useState } from "react";
import "./visual.css";

const transactions = [
  { cid: "C1", amount: 120, date: "2024-01-05" },
  { cid: "C2", amount: 45,  date: "2024-01-08" },
  { cid: "C1", amount: 200, date: "2024-02-12" },
  { cid: "C3", amount: 80,  date: "2024-02-20" },
  { cid: "C2", amount: 95,  date: "2024-03-01" },
  { cid: "C1", amount: 60,  date: "2024-03-15" },
];

const ref = new Date("2024-04-01");

function aggregate(txns) {
  const map = {};
  txns.forEach(t => {
    if (!map[t.cid]) map[t.cid] = { cid: t.cid, amounts: [], dates: [] };
    map[t.cid].amounts.push(t.amount);
    map[t.cid].dates.push(new Date(t.date));
  });
  return Object.values(map).map(c => ({
    cid: c.cid,
    total_orders: c.amounts.length,
    avg_amount: Math.round(c.amounts.reduce((a, b) => a + b, 0) / c.amounts.length),
    max_amount: Math.max(...c.amounts),
    last_purchase_days: Math.round((ref - Math.max(...c.dates)) / 86400000),
  }));
}

const steps = ["Raw Transactions", "Group by Customer", "Aggregate Features"];

export default function FeAggregateVisualization() {
  const [step, setStep] = useState(0);
  const agg = aggregate(transactions);

  return (
    <div className="feagg-wrap">
      <h3 className="feagg-title">Aggregated Feature Engineering</h3>

      <div className="feagg-steps">
        {steps.map((s, i) => (
          <button key={i} className={`feagg-step ${step === i ? "feagg-step--on" : ""}`} onClick={() => setStep(i)}>
            <span className="feagg-step-num">{i + 1}</span> {s}
          </button>
        ))}
      </div>

      {step === 0 && (
        <div className="feagg-table-wrap">
          <table className="feagg-table">
            <thead><tr><th>customer_id</th><th>amount</th><th>date</th></tr></thead>
            <tbody>{transactions.map((t, i) => (
              <tr key={i}><td className="feagg-cid">{t.cid}</td><td className="feagg-amt">₹{t.amount}</td><td className="feagg-date">{t.date}</td></tr>
            ))}</tbody>
          </table>
        </div>
      )}

      {step === 1 && (
        <div className="feagg-groups">
          {["C1","C2","C3"].map(cid => {
            const txns = transactions.filter(t => t.cid === cid);
            return (
              <div key={cid} className="feagg-group">
                <div className="feagg-group-head">{cid}</div>
                {txns.map((t, i) => <div key={i} className="feagg-group-row">₹{t.amount} — {t.date}</div>)}
              </div>
            );
          })}
        </div>
      )}

      {step === 2 && (
        <div className="feagg-table-wrap">
          <table className="feagg-table">
            <thead><tr><th>customer_id</th><th>total_orders</th><th>avg_amount</th><th>max_amount</th><th>last_purchase_days</th></tr></thead>
            <tbody>{agg.map((r, i) => (
              <tr key={i}>
                <td className="feagg-cid">{r.cid}</td>
                <td className="feagg-new">{r.total_orders}</td>
                <td className="feagg-new">₹{r.avg_amount}</td>
                <td className="feagg-new">₹{r.max_amount}</td>
                <td className="feagg-new">{r.last_purchase_days}d</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}

      <p className="feagg-note">
        {step === 0 && "Start: raw transaction log — one row per purchase."}
        {step === 1 && "Group rows by customer_id to prepare for aggregation."}
        {step === 2 && "Result: one row per customer with 4 engineered features ready for ML."}
      </p>
    </div>
  );
}
