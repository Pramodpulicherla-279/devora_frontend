/* Lesson: NumPy Arrays — The Engine Under Pandas
 * Visual type: ILLUSTRATION
 * Shows pandas column → underlying NumPy array, and key NumPy array operations */
import React, { useState } from 'react';
import './visual.css';

const OPS = [
  {
    id: 'under',
    label: 'Under the hood',
    code: `col = df['amount']
type(col)            # pandas Series
col.values           # ndarray([4200, 1850, 6700, ...])
type(col.values)     # <class 'numpy.ndarray'>`,
    output: 'array([4200, 1850, 6700,  980, 12400, 2300])',
    note: 'Every pandas column is a thin wrapper around a NumPy ndarray. .values extracts it.',
  },
  {
    id: 'math',
    label: 'Vectorised math',
    code: `import numpy as np
arr = np.array([4200, 1850, 6700, 980, 12400, 2300])
arr * 1.18           # apply 18% GST to all — no loop needed
arr + 500            # flat discount`,
    output: 'array([ 4956., 2183., 7906., 1156.4, 14632., 2714.])',
    note: 'Operations apply element-wise without writing a for-loop. This is vectorisation.',
  },
  {
    id: 'agg',
    label: 'Aggregations',
    code: `np.sum(arr)          # 28430
np.mean(arr)         # 4738.33
np.std(arr)          # 4024.71
np.max(arr)          # 12400
np.percentile(arr, 75)  # 8050.0`,
    output: 'mean=4738.33  std=4024.71  max=12400',
    note: 'Pandas methods like .sum() and .mean() call these NumPy functions internally.',
  },
  {
    id: 'shape',
    label: 'Shape & dtype',
    code: `arr.shape            # (6,)  — 1-D, 6 elements
arr.dtype            # int64
arr.ndim             # 1

# 2-D array (like a DataFrame)
matrix = np.array([[1,2],[3,4]])
matrix.shape         # (2, 2)`,
    output: 'shape=(6,)  dtype=int64  ndim=1',
    note: 'shape tells you dimensions. dtype tells you the memory type. Both affect performance.',
  },
];

const PdNumpyArraysVisualization = () => {
  const [sel, setSel] = useState('under');
  const op = OPS.find(x => x.id === sel);

  return (
    <div className="pdnp-wrap">
      <header className="pdnp-head">
        <span className="pdnp-badge">Pandas &amp; NumPy</span>
        <h2>NumPy Arrays</h2>
        <p>The engine running under every pandas column</p>
      </header>

      <div className="pdnp-arch">
        <div className="pdnp-layer pdnp-layer--pd">pandas Series / DataFrame</div>
        <div className="pdnp-arrow">↓ wraps</div>
        <div className="pdnp-layer pdnp-layer--np">NumPy ndarray</div>
        <div className="pdnp-arrow">↓ stored as</div>
        <div className="pdnp-layer pdnp-layer--mem">contiguous memory block (C / Fortran order)</div>
      </div>

      <div className="pdnp-tabs">
        {OPS.map(o => (
          <button key={o.id} className={`pdnp-tab ${sel === o.id ? 'pdnp-tab--on' : ''}`} onClick={() => setSel(o.id)}>
            {o.label}
          </button>
        ))}
      </div>

      <div className="pdnp-body">
        <pre className="pdnp-code"><code>{op.code}</code></pre>
        <div className="pdnp-output-label">Output</div>
        <div className="pdnp-output">{op.output}</div>
      </div>

      <div className="pdnp-note">{op.note}</div>
    </div>
  );
};

export default PdNumpyArraysVisualization;
