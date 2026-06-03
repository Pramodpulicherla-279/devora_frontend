/* Lesson: Reading CSV, Excel, JSON and SQL
 * Visual type: ILLUSTRATION
 * Reason: The key idea is "many sources → one DataFrame via read_*". A source
 * picker mapping each format to its read function + resulting table communicates it. */
import React, { useState } from 'react';
import './visual.css';

const SOURCES = {
  csv: { icon: '📄', fn: "pd.read_csv('data.csv')", note: 'Most common. Comma-separated text.' },
  excel: { icon: '📊', fn: "pd.read_excel('book.xlsx', sheet_name='Sales')", note: 'Pick a sheet by name or index.' },
  json: { icon: '🔗', fn: "pd.read_json('data.json')", note: 'Records or nested JSON.' },
  sql: { icon: '🗄️', fn: "pd.read_sql('SELECT * FROM users', conn)", note: 'Query a database directly.' },
};

const PdReadVisualization = () => {
  const [src, setSrc] = useState('csv');
  return (
    <div className="pdread-wrap">
      <header className="pdread-head">
        <span className="pdread-badge">Pandas</span>
        <h2>Reading Data</h2>
        <p>Any source → one DataFrame with <code>read_*</code></p>
      </header>
      <div className="pdread-sources">
        {Object.entries(SOURCES).map(([k, s]) => (
          <button key={k} className={`pdread-src ${src === k ? 'pdread-src--on' : ''}`} onClick={() => setSrc(k)}>
            <span className="pdread-icon">{s.icon}</span>{k.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="pdread-flow">
        <div className="pdread-file">{SOURCES[src].icon} {src} file</div>
        <div className="pdread-arrow">→</div>
        <div className="pdread-df">
          <div className="pdread-df-label">DataFrame</div>
          <table className="pdread-table"><thead><tr><th></th><th>name</th><th>age</th></tr></thead>
            <tbody><tr><td>0</td><td>Alice</td><td>28</td></tr><tr><td>1</td><td>Bob</td><td>34</td></tr></tbody></table>
        </div>
      </div>
      <pre className="pdread-code"><code>{`df = ${SOURCES[src].fn}`}</code></pre>
      <div className="pdread-note">{SOURCES[src].note} Once loaded, every source behaves identically — the DataFrame is pandas' universal table.</div>
    </div>
  );
};
export default PdReadVisualization;
