import { useState } from 'react';
import './visual.css';

const A = [[1, 2], [3, 4]];
const B = [[5, 6], [7, 8]];

function addMat(a, b) { return a.map((r, i) => r.map((v, j) => v + b[i][j])); }
function subMat(a, b) { return a.map((r, i) => r.map((v, j) => v - b[i][j])); }
function mulMat(a, b) {
  return a.map((r, i) => b[0].map((_, j) => r.reduce((s, _, k) => s + a[i][k] * b[k][j], 0)));
}

const OPS = {
  Add: { fn: addMat, sym: '+', step: (i, j) => `C[${i}][${j}] = ${A[i][j]} + ${B[i][j]} = ${A[i][j] + B[i][j]}` },
  Subtract: { fn: subMat, sym: '−', step: (i, j) => `C[${i}][${j}] = ${A[i][j]} − ${B[i][j]} = ${A[i][j] - B[i][j]}` },
  Multiply: { fn: mulMat, sym: '×', step: (i, j) => {
    const terms = A[i].map((v, k) => `${v}×${B[k][j]}`).join(' + ');
    const val = A[i].reduce((s, _, k) => s + A[i][k] * B[k][j], 0);
    return `C[${i}][${j}] = ${terms} = ${val}`;
  }},
};

function MatrixDisplay({ mat, label, highlight }) {
  return (
    <div className="mfmatops-mat-wrap">
      <div className="mfmatops-mat-label">{label}</div>
      <div className="mfmatops-mat-grid">
        {mat.map((row, r) => row.map((v, c) => (
          <div key={`${r}-${c}`}
            className={`mfmatops-cell ${highlight && highlight.r === r && highlight.c === c ? 'mfmatops-hl' : ''}`}>
            {v}
          </div>
        )))}
      </div>
    </div>
  );
}

export default function MfMatrixOpsVisualization() {
  const [tab, setTab] = useState('Add');
  const [focus, setFocus] = useState({ r: 0, c: 0 });
  const op = OPS[tab];
  const result = op.fn(A, B);

  return (
    <div className="mfmatops-root">
      <h3 className="mfmatops-title">Matrix Operations</h3>
      <div className="mfmatops-tabs">
        {Object.keys(OPS).map(k => (
          <button key={k} onClick={() => setTab(k)}
            className={`mfmatops-tab ${tab === k ? 'mfmatops-tab-active' : ''}`}>
            {k}
          </button>
        ))}
      </div>

      <div className="mfmatops-matrices">
        <MatrixDisplay mat={A} label="A" />
        <div className="mfmatops-op-sym">{op.sym}</div>
        <MatrixDisplay mat={B} label="B" />
        <div className="mfmatops-op-sym">=</div>
        <div className="mfmatops-mat-wrap">
          <div className="mfmatops-mat-label">C (result)</div>
          <div className="mfmatops-mat-grid">
            {result.map((row, r) => row.map((v, c) => (
              <button key={`${r}-${c}`}
                className={`mfmatops-cell mfmatops-cell-result ${focus.r === r && focus.c === c ? 'mfmatops-hl' : ''}`}
                onClick={() => setFocus({ r, c })}>
                {v}
              </button>
            )))}
          </div>
        </div>
      </div>

      <div className="mfmatops-step">
        <span className="mfmatops-step-label">Step ↓ click a result cell</span>
        <code>{op.step(focus.r, focus.c)}</code>
      </div>
    </div>
  );
}
