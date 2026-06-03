/* Lesson: What is Pandas
 * Visual type: ILLUSTRATION
 * Reason: The Series (1D) vs DataFrame (2D = dict of Series) relationship is
 * structural — a labeled diagram showing columns as Series sharing an index. */
import React, { useState } from 'react';
import './visual.css';

const PdWhatVisualization = () => {
  const [view, setView] = useState('dataframe');
  return (
    <div className="pdwhat-wrap">
      <header className="pdwhat-head">
        <span className="pdwhat-badge">Pandas</span>
        <h2>What is Pandas?</h2>
        <p>Series &amp; DataFrames — spreadsheets for Python</p>
      </header>
      <div className="pdwhat-tabs">
        <button className={`pdwhat-tab ${view === 'series' ? 'pdwhat-tab--on' : ''}`} onClick={() => setView('series')}>Series (1D)</button>
        <button className={`pdwhat-tab ${view === 'dataframe' ? 'pdwhat-tab--on' : ''}`} onClick={() => setView('dataframe')}>DataFrame (2D)</button>
      </div>
      {view === 'series' ? (
        <div className="pdwhat-series">
          <table className="pdwhat-table"><thead><tr><th>index</th><th className="pdwhat-hl">ages</th></tr></thead>
            <tbody><tr><td>0</td><td>28</td></tr><tr><td>1</td><td>34</td></tr><tr><td>2</td><td>22</td></tr></tbody></table>
          <div className="pdwhat-desc">A <strong>Series</strong> is a single labeled column: values + an index.</div>
        </div>
      ) : (
        <div className="pdwhat-df">
          <table className="pdwhat-table"><thead><tr><th>index</th><th className="pdwhat-hl">name</th><th className="pdwhat-hl2">age</th><th className="pdwhat-hl3">city</th></tr></thead>
            <tbody>
              <tr><td>0</td><td>Alice</td><td>28</td><td>Mumbai</td></tr>
              <tr><td>1</td><td>Bob</td><td>34</td><td>Delhi</td></tr>
              <tr><td>2</td><td>Carol</td><td>22</td><td>Pune</td></tr>
            </tbody></table>
          <div className="pdwhat-desc">A <strong>DataFrame</strong> is many Series sharing one index — each column is a Series.</div>
        </div>
      )}
      <pre className="pdwhat-code"><code>{view === 'series' ? `ages = pd.Series([28, 34, 22])` : `df = pd.DataFrame({
  "name": ["Alice", "Bob", "Carol"],
  "age":  [28, 34, 22],
  "city": ["Mumbai", "Delhi", "Pune"],
})`}</code></pre>
      <div className="pdwhat-note">Think of a DataFrame as a dict of Series. Columns can have different types; all share the same row index for alignment.</div>
    </div>
  );
};
export default PdWhatVisualization;
