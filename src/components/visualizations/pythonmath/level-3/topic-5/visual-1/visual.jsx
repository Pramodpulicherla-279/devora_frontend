import { useState } from 'react';
import './visual.css';

const cellTypes = [
  {
    type: 'Code',
    color: '#a78bfa',
    prompt: 'In [1]:',
    input: `import numpy as np\narr = np.arange(1, 6)\nprint(arr ** 2)`,
    output: `[ 1  4  9 16 25]`,
    outputColor: '#56d364',
    note: 'Code cells execute Python. Output appears directly below.',
  },
  {
    type: 'Markdown',
    color: '#58a6ff',
    prompt: '',
    input: `## My Notebook\n\nThis is **bold** and *italic* text.\n- Bullet one\n- Bullet two`,
    output: `My Notebook\n──────────\nThis is bold and italic text.\n• Bullet one\n• Bullet two`,
    outputColor: '#e6edf3',
    note: 'Markdown cells render formatted text, LaTeX equations, and headers.',
  },
  {
    type: 'Raw',
    color: '#6b7785',
    prompt: '',
    input: `# This won't execute\nmodel = train(data)  # just notes`,
    output: '(No output — raw cells pass content to nbconvert as-is.)',
    outputColor: '#6b7785',
    note: 'Raw cells are for nbconvert directives or scratch notes.',
  },
];

export default function PyMathJupyterVisualization() {
  const [active, setActive] = useState(0);
  const [ran, setRan] = useState(false);
  const cell = cellTypes[active];

  const handleRun = () => setRan(true);
  const handleTab = (i) => { setActive(i); setRan(false); };

  return (
    <div className="pymjupyter-root">
      <div className="pymjupyter-toolbar">
        <span className="pymjupyter-logo">⬡ Jupyter</span>
        <div className="pymjupyter-types">
          {cellTypes.map((c, i) => (
            <button key={c.type} className={`pymjupyter-type-btn ${i === active ? 'pymjupyter-type-btn--active' : ''}`}
              style={{ '--jc': c.color }} onClick={() => handleTab(i)}>
              {c.type}
            </button>
          ))}
        </div>
      </div>
      <div className="pymjupyter-notebook">
        <div className="pymjupyter-cell" style={{ borderColor: ran ? cell.color : '#30363d' }}>
          <div className="pymjupyter-cell-head">
            <span className="pymjupyter-prompt" style={{ color: cell.color }}>{cell.prompt}</span>
            <span className="pymjupyter-cell-type" style={{ color: cell.color }}>{cell.type} cell</span>
            <button className="pymjupyter-run" onClick={handleRun} style={{ borderColor: cell.color, color: cell.color }}>
              ▶ Run
            </button>
          </div>
          <pre className="pymjupyter-input">{cell.input}</pre>
          {ran && (
            <div className="pymjupyter-output-box">
              <span className="pymjupyter-out-label">Out [{active === 0 ? '1' : ''}]:</span>
              <pre className="pymjupyter-output" style={{ color: cell.outputColor }}>{cell.output}</pre>
            </div>
          )}
        </div>
      </div>
      <p className="pymjupyter-note">{cell.note}</p>
    </div>
  );
}
