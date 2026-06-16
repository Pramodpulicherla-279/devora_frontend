/* Lesson: Jupyter Notebooks — Your Interactive Data Playground
 * Visual type: ILLUSTRATION
 * Mock notebook with 3 cell types — Code / Markdown / Output — user can click each to see it */
import React, { useState } from 'react';
import './visual.css';

const CELLS = [
  {
    id: 'md',
    type: 'Markdown',
    content: '# Zephyr Orders Analysis\nLoad and inspect the June dataset.',
    rendered: <div className="pyjup-md-rendered"><h3>Zephyr Orders Analysis</h3><p>Load and inspect the June dataset.</p></div>,
    note: 'Markdown cells render formatted text — headings, bullet points, bold. Use them to explain your analysis.',
  },
  {
    id: 'code1',
    type: 'Code',
    content: `import pandas as pd
df = pd.read_csv('orders.csv')
df.shape`,
    output: '(500, 8)',
    note: 'Code cells run Python. The last expression is auto-printed as output. Press Shift+Enter to run.',
  },
  {
    id: 'code2',
    type: 'Code',
    content: `df.head()`,
    output: (
      <table className="pyjup-output-table">
        <thead><tr><th>city</th><th>amount</th><th>category</th></tr></thead>
        <tbody>
          <tr><td>Mumbai</td><td>4200</td><td>Electronics</td></tr>
          <tr><td>Pune</td><td>1850</td><td>Accessories</td></tr>
          <tr><td>Delhi</td><td>6700</td><td>Electronics</td></tr>
        </tbody>
      </table>
    ),
    note: 'DataFrames render as interactive HTML tables in Jupyter — no print() needed.',
  },
  {
    id: 'code3',
    type: 'Code',
    content: `df['amount'].hist(bins=20)`,
    output: <div className="pyjup-chart-mock">📊 [histogram rendered inline]</div>,
    note: 'matplotlib/seaborn charts appear directly under the cell — this is Jupyter\'s superpower.',
  },
];

const PyJupyterVisualization = () => {
  const [active, setActive] = useState('code1');
  const cell = CELLS.find(c=>c.id===active);

  return (
    <div className="pyjup-wrap">
      <header className="pyjup-head">
        <span className="pyjup-badge">Python Basics</span>
        <h2>Jupyter Notebooks</h2>
        <p>Click a cell to see what each type does</p>
      </header>

      <div className="pyjup-notebook">
        {CELLS.map((c, i) => (
          <div key={c.id} className={`pyjup-cell ${active===c.id?'pyjup-cell--on':''}`} onClick={()=>setActive(c.id)}>
            <div className="pyjup-cell-meta">
              <span className={`pyjup-cell-type pyjup-cell-type--${c.type.toLowerCase()}`}>{c.type}</span>
              <span className="pyjup-cell-num">In [{i+1}]:</span>
            </div>
            <pre className="pyjup-cell-code"><code>{typeof c.content === 'string' ? c.content : ''}</code></pre>
            {c.output && active===c.id && (
              <div className="pyjup-output">
                <span className="pyjup-output-label">Out [{i+1}]:</span>
                {typeof c.output === 'string' ? <code className="pyjup-output-text">{c.output}</code> : c.output}
              </div>
            )}
            {c.id==='md' && active===c.id && c.rendered}
          </div>
        ))}
      </div>

      <div className="pyjup-note">{cell.note}</div>
    </div>
  );
};

export default PyJupyterVisualization;
