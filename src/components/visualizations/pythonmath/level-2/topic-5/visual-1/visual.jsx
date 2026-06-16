import { useState } from 'react';
import './visual.css';

const examples = [
  {
    label: 'Filter',
    loopCode: `evens = []\nfor x in range(10):\n    if x % 2 == 0:\n        evens.append(x)\n# [0, 2, 4, 6, 8]`,
    compCode: `evens = [x for x in range(10)\n         if x % 2 == 0]\n# [0, 2, 4, 6, 8]`,
    result: [0, 2, 4, 6, 8],
    note: 'The condition goes at the end of the comprehension.',
  },
  {
    label: 'Transform',
    loopCode: `squares = []\nfor x in range(6):\n    squares.append(x ** 2)\n# [0, 1, 4, 9, 16, 25]`,
    compCode: `squares = [x**2 for x in range(6)]\n# [0, 1, 4, 9, 16, 25]`,
    result: [0, 1, 4, 9, 16, 25],
    note: 'The expression (x**2) goes before the for clause.',
  },
  {
    label: 'Nested',
    loopCode: `flat = []\nfor row in [[1,2],[3,4]]:\n    for n in row:\n        flat.append(n)\n# [1, 2, 3, 4]`,
    compCode: `flat = [n for row in [[1,2],[3,4]]\n        for n in row]\n# [1, 2, 3, 4]`,
    result: [1, 2, 3, 4],
    note: 'Nested loops: outer for first, inner for second.',
  },
];

export default function PyMathComprehensionVisualization() {
  const [ex, setEx] = useState(0);
  const e = examples[ex];

  return (
    <div className="pymcomp-root">
      <h3 className="pymcomp-title">List Comprehensions</h3>
      <div className="pymcomp-tabs">
        {examples.map((e, i) => (
          <button key={e.label} className={`pymcomp-tab ${i === ex ? 'pymcomp-tab--active' : ''}`}
            onClick={() => setEx(i)}>{e.label}</button>
        ))}
      </div>
      <div className="pymcomp-compare">
        <div className="pymcomp-col">
          <div className="pymcomp-col-label" style={{ color: '#6b7785' }}>Traditional for-loop</div>
          <pre className="pymcomp-code pymcomp-code--loop">{e.loopCode}</pre>
        </div>
        <div className="pymcomp-arrow">→</div>
        <div className="pymcomp-col">
          <div className="pymcomp-col-label" style={{ color: '#a78bfa' }}>List comprehension</div>
          <pre className="pymcomp-code pymcomp-code--comp">{e.compCode}</pre>
        </div>
      </div>
      <div className="pymcomp-result-row">
        <span className="pymcomp-result-label">Result:</span>
        <div className="pymcomp-result">
          {e.result.map((v, i) => (
            <span key={i} className="pymcomp-chip">{v}</span>
          ))}
        </div>
      </div>
      <p className="pymcomp-note">{e.note}</p>
    </div>
  );
}
