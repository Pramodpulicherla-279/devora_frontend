import { useState } from "react";
import "./visual.css";

const rawData = [
  { age: 25, salary: 50000, score: null },
  { age: null, salary: 72000, score: 88 },
  { age: 34, salary: null, score: 75 },
  { age: 29, salary: 65000, score: null },
  { age: null, salary: 58000, score: 92 },
];

function impute(strategy) {
  const ages = rawData.map(r => r.age).filter(v => v !== null);
  const salaries = rawData.map(r => r.salary).filter(v => v !== null);
  const scores = rawData.map(r => r.score).filter(v => v !== null);

  const mean = arr => Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
  const median = arr => { const s = [...arr].sort((a, b) => a - b); return s[Math.floor(s.length / 2)]; };

  return rawData.map((row, i) => ({
    age: row.age ?? (strategy === "mean" ? mean(ages) : strategy === "median" ? median(ages) : strategy === "drop" ? null : i > 0 ? rawData[i - 1].age ?? mean(ages) : mean(ages)),
    salary: row.salary ?? (strategy === "mean" ? mean(salaries) : strategy === "median" ? median(salaries) : strategy === "drop" ? null : i > 0 ? rawData[i - 1].salary ?? mean(salaries) : mean(salaries)),
    score: row.score ?? (strategy === "mean" ? mean(scores) : strategy === "median" ? median(scores) : strategy === "mode" ? 88 : strategy === "drop" ? null : i > 0 ? rawData[i - 1].score ?? mean(scores) : mean(scores)),
    dropped: strategy === "drop" && (row.age === null || row.salary === null || row.score === null),
  }));
}

const tabs = ["mean", "median", "mode", "ffill", "drop"];
const labels = { mean: "Mean", median: "Median", mode: "Mode", ffill: "Forward-fill", drop: "Drop Row" };
const cols = ["age", "salary", "score"];

export default function FeMissingVisualization() {
  const [tab, setTab] = useState("mean");
  const filled = impute(tab);

  return (
    <div className="femissing-wrap">
      <h3 className="femissing-title">Missing Data Imputation</h3>
      <div className="femissing-tabs">
        {tabs.map(t => (
          <button key={t} className={`femissing-tab ${tab === t ? "femissing-tab--on" : ""}`} onClick={() => setTab(t)}>{labels[t]}</button>
        ))}
      </div>
      <div className="femissing-table-wrap">
        <table className="femissing-table">
          <thead>
            <tr>{cols.map(c => <th key={c}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {rawData.map((row, i) => (
              <tr key={i} className={filled[i].dropped ? "femissing-row--drop" : ""}>
                {cols.map(c => {
                  const missing = row[c] === null;
                  const val = filled[i][c];
                  return (
                    <td key={c} className={missing ? (tab === "drop" ? "femissing-cell--drop" : "femissing-cell--filled") : "femissing-cell--ok"}>
                      {val === null ? "—" : typeof val === "number" && c === "salary" ? val.toLocaleString() : val}
                      {missing && tab !== "drop" && <span className="femissing-badge">{labels[tab]}</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="femissing-note">
        {tab === "drop" ? "Rows with any missing value are removed entirely." : `Missing cells filled using the column ${labels[tab].toLowerCase()}.`}
      </p>
    </div>
  );
}
