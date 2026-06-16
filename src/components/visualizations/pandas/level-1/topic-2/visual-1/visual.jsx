/* Lesson: Creating and Loading DataFrames — From CSV, Excel, and Dicts
 * Visual type: ILLUSTRATION
 * Shows 4 data sources, each with its pd.read_* call and what the resulting DataFrame looks like */
import React, { useState } from 'react';
import './visual.css';

const SOURCES = [
  {
    id: 'csv',
    icon: '📄',
    label: 'CSV file',
    code: "df = pd.read_csv('orders.csv')\n# optional: parse_dates=['date']",
    preview: [
      ['order_id', 'city', 'amount'],
      ['1001', 'Mumbai', '4200'],
      ['1002', 'Pune', '1850'],
      ['1003', 'Delhi', '6700'],
    ],
    note: 'Most common source. Use encoding="utf-8" if you see strange characters.',
  },
  {
    id: 'excel',
    icon: '📊',
    label: 'Excel (.xlsx)',
    code: "df = pd.read_excel('report.xlsx',\n  sheet_name='Sales Q1')",
    preview: [
      ['rep', 'region', 'target'],
      ['Aisha', 'West', '500000'],
      ['Ravi', 'South', '420000'],
      ['Priya', 'North', '380000'],
    ],
    note: 'Specify sheet_name or you get the first sheet. Requires openpyxl.',
  },
  {
    id: 'dict',
    icon: '📦',
    label: 'Dictionary',
    code: "df = pd.DataFrame({\n  'city': ['Mumbai','Pune','Delhi'],\n  'orders': [230, 140, 190]\n})",
    preview: [
      ['city', 'orders'],
      ['Mumbai', '230'],
      ['Pune', '140'],
      ['Delhi', '190'],
    ],
    note: 'Great for small hand-crafted DataFrames in notebooks and tests.',
  },
  {
    id: 'json',
    icon: '🔗',
    label: 'JSON / API',
    code: "df = pd.read_json('data.json')\n# or: pd.DataFrame(requests.get(url).json())",
    preview: [
      ['product', 'sold', 'returned'],
      ['Laptop', '45', '3'],
      ['Phone', '210', '12'],
      ['Tablet', '88', '7'],
    ],
    note: 'Works with JSON files or by wrapping API response dicts directly.',
  },
];

const PdLoadingVisualization = () => {
  const [sel, setSel] = useState('csv');
  const s = SOURCES.find(x => x.id === sel);

  return (
    <div className="pdload-wrap">
      <header className="pdload-head">
        <span className="pdload-badge">Pandas &amp; NumPy</span>
        <h2>Loading DataFrames</h2>
        <p>Four entry points — one consistent DataFrame</p>
      </header>

      <div className="pdload-tabs">
        {SOURCES.map(src => (
          <button key={src.id} className={`pdload-tab ${sel === src.id ? 'pdload-tab--on' : ''}`} onClick={() => setSel(src.id)}>
            <span>{src.icon}</span> {src.label}
          </button>
        ))}
      </div>

      <div className="pdload-body">
        <pre className="pdload-code"><code>{s.code}</code></pre>
        <div className="pdload-preview-label">Result →</div>
        <div className="pdload-table-wrap">
          <table className="pdload-table">
            <thead>
              <tr>{s.preview[0].map((h, i) => <th key={i}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {s.preview.slice(1).map((row, i) => (
                <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pdload-tip">{s.note}</div>
      </div>
    </div>
  );
};

export default PdLoadingVisualization;
