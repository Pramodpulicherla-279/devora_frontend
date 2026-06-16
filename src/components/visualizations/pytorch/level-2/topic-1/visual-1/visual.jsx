import { useState } from 'react';
import './visual.css';

const OPS = [
  {
    id: 'matmul',
    label: 'matmul',
    a: [[1,2],[3,4]], shapeA: '(2,2)',
    b: [[5,6],[7,8]], shapeB: '(2,2)',
    result: [[19,22],[43,50]], shapeR: '(2,2)',
    note: 'Row × Column dot products',
    code: 'C = torch.matmul(A, B)  # (2,2) @ (2,2) → (2,2)',
  },
  {
    id: 'elemwise',
    label: 'element-wise ×',
    a: [[1,2],[3,4]], shapeA: '(2,2)',
    b: [[2,2],[2,2]], shapeB: '(2,2)',
    result: [[2,4],[6,8]], shapeR: '(2,2)',
    note: 'Multiply each cell independently',
    code: 'C = A * B  # same shape required',
  },
  {
    id: 'broadcast',
    label: 'broadcasting',
    a: [[1,2,3],[4,5,6]], shapeA: '(2,3)',
    b: [[10,20,30]], shapeB: '(1,3)',
    result: [[11,22,33],[14,25,36]], shapeR: '(2,3)',
    note: '(1,3) broadcast → (2,3) then add',
    code: 'C = A + B  # (2,3) + (1,3) → (2,3)',
  },
  {
    id: 'reshape',
    label: 'reshape / view',
    a: [[1,2,3,4,5,6]], shapeA: '(1,6)',
    b: null, shapeB: '',
    result: [[1,2,3],[4,5,6]], shapeR: '(2,3)',
    note: 'Same data, new shape (no copy)',
    code: 'B = A.view(2, 3)  # or .reshape(2, 3)',
  },
];

function Matrix({ data, color, label, shape }) {
  return (
    <div className="pttops-mat">
      <div className="pttops-mat-label">{label} <span className="pttops-shape">{shape}</span></div>
      <div className="pttops-mat-grid" style={{ '--cols': data[0]?.length || 1 }}>
        {data.map((row, r) => row.map((v, c) => (
          <div key={`${r}-${c}`} className="pttops-cell" style={{ borderColor: color + '60', color }}>
            {v}
          </div>
        )))}
      </div>
    </div>
  );
}

export default function PtTensorOpsVisualization() {
  const [active, setActive] = useState(0);
  const op = OPS[active];

  return (
    <div className="pttops-root">
      <h3 className="pttops-title">Tensor Operations Deep Dive</h3>

      <div className="pttops-tabs">
        {OPS.map((o, i) => (
          <button key={o.id} className={`pttops-tab ${active === i ? 'pttops-tab-active' : ''}`}
            onClick={() => setActive(i)}>{o.label}</button>
        ))}
      </div>

      <div className="pttops-stage">
        <Matrix data={op.a} color="#58a6ff" label="A" shape={op.shapeA} />
        {op.b && (
          <>
            <div className="pttops-op-sym">{op.id === 'matmul' ? '@' : op.id === 'elemwise' ? '×' : '+'}</div>
            <Matrix data={op.b} color="#a78bfa" label="B" shape={op.shapeB} />
          </>
        )}
        {op.id === 'reshape' && (
          <div className="pttops-op-sym">→</div>
        )}
        <div className="pttops-eq">=</div>
        <Matrix data={op.result} color="#f97316" label="Result" shape={op.shapeR} />
      </div>

      <div className="pttops-note">{op.note}</div>
      <pre className="pttops-code">{op.code}</pre>
    </div>
  );
}
