import { useState } from 'react';
import './visual.css';

const steps = [
  {
    title: 'Install Python',
    cmd: 'winget install Python.Python.3.12\n# or download from python.org',
    note: 'Adds python and pip to your PATH automatically.',
    check: 'python --version',
  },
  {
    title: 'Create a virtual env',
    cmd: 'python -m venv .venv',
    note: 'Creates an isolated .venv/ folder — keeps project deps separate.',
    check: 'ls .venv/',
  },
  {
    title: 'Activate the env',
    cmd: '# macOS / Linux\nsource .venv/bin/activate\n\n# Windows PowerShell\n.venv\\Scripts\\Activate.ps1',
    note: 'Your prompt gains a (.venv) prefix when active.',
    check: 'which python',
  },
  {
    title: 'pip install packages',
    cmd: 'pip install numpy pandas scikit-learn\n# or use a requirements.txt\npip install -r requirements.txt',
    note: 'Packages land inside .venv — not your global Python.',
    check: 'pip list',
  },
  {
    title: 'Verify everything',
    cmd: 'python -c "import numpy, pandas; print(\'Ready!\')"',
    note: 'No errors = your environment is healthy.',
    check: 'python -c "import sys; print(sys.prefix)"',
  },
];

export default function PyMathSetupVisualization() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <div className="pymsetup-root">
      <h3 className="pymsetup-title">Environment Setup</h3>
      <div className="pymsetup-stepper">
        {steps.map((s, i) => (
          <button
            key={i}
            className={`pymsetup-step ${i === active ? 'pymsetup-step--active' : ''} ${i < active ? 'pymsetup-step--done' : ''}`}
            onClick={() => setActive(i)}
          >
            <span className="pymsetup-num">{i < active ? '✓' : i + 1}</span>
            <span className="pymsetup-step-label">{s.title}</span>
          </button>
        ))}
      </div>
      <div className="pymsetup-panel">
        <div className="pymsetup-cmd-label">Command</div>
        <pre className="pymsetup-code">{step.cmd}</pre>
        <p className="pymsetup-note">{step.note}</p>
        <div className="pymsetup-check-row">
          <span className="pymsetup-check-label">Verify with:</span>
          <code className="pymsetup-check-code">{step.check}</code>
        </div>
      </div>
      <div className="pymsetup-nav">
        <button className="pymsetup-btn" disabled={active === 0} onClick={() => setActive(a => a - 1)}>← Back</button>
        <span className="pymsetup-progress">{active + 1} / {steps.length}</span>
        <button className="pymsetup-btn" disabled={active === steps.length - 1} onClick={() => setActive(a => a + 1)}>Next →</button>
      </div>
    </div>
  );
}
