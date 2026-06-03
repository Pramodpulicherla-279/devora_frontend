/* Lesson: NumPy Arrays
 * Visual type: INTERACTIVE
 * Reason: reshape & broadcasting are spatial array operations — showing a flat
 * array fold into a 2D shape, and a scalar broadcast across cells, makes them click. */
import React, { useState } from 'react';
import './visual.css';

const PdNumpyVisualization = () => {
  const [tab, setTab] = useState('reshape');
  const [shape, setShape] = useState('2x3');
  const data = [1, 2, 3, 4, 5, 6];
  const dims = shape === '2x3' ? [2, 3] : shape === '3x2' ? [3, 2] : [1, 6];

  return (
    <div className="pdnp-wrap">
      <header className="pdnp-head">
        <span className="pdnp-badge">NumPy</span>
        <h2>NumPy Arrays</h2>
        <p>The fast n-dimensional arrays under pandas</p>
      </header>
      <div className="pdnp-tabs">
        <button className={`pdnp-tab ${tab === 'reshape' ? 'pdnp-tab--on' : ''}`} onClick={() => setTab('reshape')}>reshape</button>
        <button className={`pdnp-tab ${tab === 'broadcast' ? 'pdnp-tab--on' : ''}`} onClick={() => setTab('broadcast')}>broadcasting</button>
      </div>
      {tab === 'reshape' ? (
        <>
          <div className="pdnp-shapes">
            {['1x6', '2x3', '3x2'].map((s) => <button key={s} className={`pdnp-shape ${shape === s ? 'pdnp-shape--on' : ''}`} onClick={() => setShape(s)}>{s.replace('x', ' × ')}</button>)}
          </div>
          <div className="pdnp-grid" style={{ gridTemplateColumns: `repeat(${dims[1]}, 1fr)`, maxWidth: dims[1] * 52 }}>
            {data.map((v) => <div key={v} className="pdnp-cell">{v}</div>)}
          </div>
          <pre className="pdnp-code"><code>{`np.array([1,2,3,4,5,6]).reshape(${dims[0]}, ${dims[1]})`}</code></pre>
          <div className="pdnp-note">Same 6 values, different shape. reshape rearranges without copying — the data stays contiguous in memory.</div>
        </>
      ) : (
        <>
          <div className="pdnp-broadcast">
            <div className="pdnp-grid pdnp-grid--3" style={{ gridTemplateColumns: 'repeat(3,1fr)', maxWidth: 156 }}>
              {[1, 2, 3, 4, 5, 6].map((v) => <div key={v} className="pdnp-cell">{v}</div>)}
            </div>
            <div className="pdnp-op">× 10 →</div>
            <div className="pdnp-grid pdnp-grid--3" style={{ gridTemplateColumns: 'repeat(3,1fr)', maxWidth: 156 }}>
              {[10, 20, 30, 40, 50, 60].map((v) => <div key={v} className="pdnp-cell pdnp-cell--out">{v}</div>)}
            </div>
          </div>
          <pre className="pdnp-code"><code>{`arr * 10   # scalar broadcasts to every element`}</code></pre>
          <div className="pdnp-note"><strong>Broadcasting</strong> applies an operation across the whole array without a loop — the engine behind pandas' vectorized speed.</div>
        </>
      )}
    </div>
  );
};
export default PdNumpyVisualization;
