import { useState } from 'react';
import './visual.css';

const STEPS = [
  { label: '.ipynb', sub: 'Notebook', cmd: null, color: '#f97316' },
  { label: 'nbconvert', sub: 'jupyter nbconvert --to script notebook.ipynb', cmd: 'jupyter nbconvert --to script', color: '#ffa657' },
  { label: '.py script', sub: 'Plain Python file', cmd: null, color: '#79c0ff' },
  { label: 'Python Module', sub: 'Add __init__.py, clean imports', cmd: null, color: '#7ee787' },
  { label: 'Package', sub: 'setup.py / pyproject.toml', cmd: null, color: '#d2a8ff' },
];

const TABLE = [
  { aspect: 'Version control (git diff)', nb: '❌ JSON noise', py: '✅ Clean diffs' },
  { aspect: 'Import as module', nb: '❌ Cannot import', py: '✅ import my_mod' },
  { aspect: 'Unit testing', nb: '⚠️ Hard', py: '✅ pytest' },
  { aspect: 'CI/CD pipelines', nb: '⚠️ Requires nbconvert', py: '✅ Native' },
  { aspect: 'Code review', nb: '❌ Rendered only', py: '✅ Standard PR diff' },
];

export default function JnbProductionVisualization() {
  const [activeStep, setActiveStep] = useState(null);

  return (
    <div className="jnbprod-root">
      <h2 className="jnbprod-title">Notebook to Production</h2>
      <p className="jnbprod-sub">Click any stage to see the conversion command.</p>

      <div className="jnbprod-pipeline">
        {STEPS.map((s, i) => (
          <div key={i} className="jnbprod-pipe-row">
            <div
              className={`jnbprod-box ${activeStep === i ? 'jnbprod-box--active' : ''}`}
              style={{ borderColor: activeStep === i ? s.color : '#21262d' }}
              onClick={() => setActiveStep(activeStep === i ? null : i)}
            >
              <span className="jnbprod-box-label" style={{ color: s.color }}>{s.label}</span>
              <span className="jnbprod-box-sub">{s.sub}</span>
            </div>
            {i < STEPS.length - 1 && <div className="jnbprod-arrow">→</div>}
          </div>
        ))}
      </div>

      {activeStep !== null && STEPS[activeStep].cmd && (
        <div className="jnbprod-cmd-box">
          <span className="jnbprod-cmd-label">Command:</span>
          <code className="jnbprod-cmd">{STEPS[activeStep].cmd}</code>
        </div>
      )}

      <h3 className="jnbprod-table-title">Why .py beats .ipynb in production</h3>
      <table className="jnbprod-table">
        <thead><tr><th>Aspect</th><th>.ipynb</th><th>.py</th></tr></thead>
        <tbody>
          {TABLE.map(r => (
            <tr key={r.aspect}>
              <td className="jnbprod-aspect">{r.aspect}</td>
              <td className="jnbprod-nb">{r.nb}</td>
              <td className="jnbprod-py">{r.py}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
