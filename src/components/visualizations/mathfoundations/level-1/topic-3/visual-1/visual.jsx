import { useState } from 'react';
import './visual.css';

const initMatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

export default function MfMatricesVisualization() {
  const [matrix, setMatrix] = useState(initMatrix);
  const [showTranspose, setShowTranspose] = useState(false);
  const [hover, setHover] = useState({ row: null, col: null });

  const transposed = matrix[0].map((_, ci) => matrix.map(row => row[ci]));
  const display = showTranspose ? transposed : matrix;

  const update = (r, c, val) => {
    const n = matrix.map(row => [...row]);
    n[r][c] = isNaN(parseInt(val)) ? 0 : parseInt(val);
    setMatrix(n);
  };

  return (
    <div className="mfmat-root">
      <h3 className="mfmat-title">Matrix Explorer</h3>
      <div className="mfmat-meta">
        <span className="mfmat-badge">Dimensions: 3 × 3</span>
        <button
          className={`mfmat-btn ${showTranspose ? 'mfmat-btn-active' : ''}`}
          onClick={() => setShowTranspose(s => !s)}
        >
          {showTranspose ? 'Show Original' : 'Show Transpose Aᵀ'}
        </button>
      </div>

      <div className="mfmat-label">{showTranspose ? 'Aᵀ (Transposed)' : 'A (Original)'}</div>
      <div className="mfmat-bracket-wrap">
        <span className="mfmat-bracket">[</span>
        <div className="mfmat-grid">
          {display.map((row, r) => (
            <div key={r} className="mfmat-row">
              {row.map((val, c) => {
                const isHovRow = hover.row === r;
                const isHovCol = hover.col === c;
                return (
                  <input
                    key={c}
                    type="number"
                    className={`mfmat-cell ${isHovRow ? 'mfmat-row-hl' : ''} ${isHovCol ? 'mfmat-col-hl' : ''}`}
                    value={val}
                    onChange={e => !showTranspose && update(r, c, e.target.value)}
                    onMouseEnter={() => setHover({ row: r, col: c })}
                    onMouseLeave={() => setHover({ row: null, col: null })}
                    readOnly={showTranspose}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <span className="mfmat-bracket">]</span>
      </div>

      <div className="mfmat-hint">
        {showTranspose
          ? 'Transposing swaps rows and columns. Element [i][j] moves to [j][i].'
          : 'Hover cells to highlight rows/columns. Edit values to explore.'}
      </div>
    </div>
  );
}
