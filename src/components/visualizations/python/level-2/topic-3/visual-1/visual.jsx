/* Lesson: Reading CSV and JSON Files with Python
 * Visual type: ILLUSTRATION
 * Shows csv module vs pandas read_csv vs json.load — toggle and see code + result */
import React, { useState } from 'react';
import './visual.css';

const APPROACHES = [
  {
    id: 'csv_builtin',
    label: 'csv module',
    code: `import csv
orders = []
with open('orders.csv', 'r') as f:
    for row in csv.DictReader(f):
        orders.append(row)

# orders[0] → {'city': 'Mumbai', 'amount': '4200'}
# NOTE: all values are strings — must convert manually`,
    warning: "amount is a string '4200' — you must do float(row['amount']) to do math.",
    good: false,
  },
  {
    id: 'pandas_csv',
    label: 'pd.read_csv()',
    code: `import pandas as pd
df = pd.read_csv('orders.csv',
    parse_dates=['date'])

# df['amount'] is already float64
# df['date'] is already datetime — no conversion needed`,
    warning: null,
    good: true,
    note: 'pandas infers dtypes automatically. parse_dates= converts date strings to datetime objects.',
  },
  {
    id: 'json_builtin',
    label: 'json module',
    code: `import json
with open('api_response.json', 'r') as f:
    data = json.load(f)        # dict or list

# For API responses — wrap in pd.DataFrame()
import pandas as pd
df = pd.DataFrame(data['orders'])`,
    warning: null,
    good: true,
    note: 'json.load() parses the file. pd.DataFrame() converts a list of dicts to a DataFrame.',
  },
  {
    id: 'pandas_json',
    label: 'pd.read_json()',
    code: `import pandas as pd
# Direct from file
df = pd.read_json('orders.json',
    orient='records')

# Direct from API
import requests
response = requests.get('https://api.example.com/orders')
df = pd.DataFrame(response.json())`,
    warning: null,
    good: true,
    note: 'orient tells pandas the JSON structure. records = list of dicts (most common API format).',
  },
];

const PyReadCsvJsonVisualization = () => {
  const [sel, setSel] = useState('pandas_csv');
  const a = APPROACHES.find(x=>x.id===sel);

  return (
    <div className="pyrcj-wrap">
      <header className="pyrcj-head">
        <span className="pyrcj-badge">Python Basics</span>
        <h2>Reading CSV &amp; JSON</h2>
        <p>Four approaches — one recommended path</p>
      </header>

      <div className="pyrcj-tabs">
        {APPROACHES.map(ap=>(
          <button key={ap.id} className={`pyrcj-tab ${sel===ap.id?'pyrcj-tab--on':''}${!ap.good?'pyrcj-tab--warn':''}`} onClick={()=>setSel(ap.id)}>
            {!ap.good && <span>⚠ </span>}{ap.label}
          </button>
        ))}
      </div>

      <pre className="pyrcj-code"><code>{a.code}</code></pre>

      {a.warning && <div className="pyrcj-warning"><strong>⚠ Gotcha:</strong> {a.warning}</div>}
      {a.note    && <div className="pyrcj-note">{a.note}</div>}
    </div>
  );
};

export default PyReadCsvJsonVisualization;
