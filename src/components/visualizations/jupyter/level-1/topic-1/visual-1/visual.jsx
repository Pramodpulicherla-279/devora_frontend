import { useState } from 'react';
import './visual.css';

const STEPS = [
  {
    label: 'Install Python',
    cmd: 'https://python.org/downloads — grab 3.10+',
    detail: 'Download and run the installer. Check "Add Python to PATH".',
    icon: '🐍',
  },
  {
    label: 'pip install jupyter',
    cmd: 'pip install jupyter',
    detail: 'Installs the Jupyter package and all dependencies into your environment.',
    icon: '📦',
  },
  {
    label: 'Run jupyter notebook',
    cmd: 'jupyter notebook',
    detail: 'Starts the notebook server locally on port 8888.',
    icon: '🚀',
  },
  {
    label: 'Browser opens',
    cmd: 'http://localhost:8888/tree',
    detail: 'The Notebook Dashboard appears — your file browser inside Jupyter.',
    icon: '🌐',
  },
];

const UI_PARTS = [
  { id: 'toolbar', label: 'Toolbar', desc: 'Run, stop, add/delete cells, change cell type.' },
  { id: 'cell', label: 'Cell Area', desc: 'Write code or Markdown here. Shift+Enter to execute.' },
  { id: 'kernel', label: 'Kernel Indicator', desc: 'Shows language and ● when busy (running code).' },
  { id: 'menu', label: 'Menu Bar', desc: 'File, Edit, View, Insert, Kernel, Help.' },
];

export default function JnbSetupVisualization() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeUi, setActiveUi] = useState(null);

  return (
    <div className="jnbsetup-root">
      <h2 className="jnbsetup-title">Setting Up Jupyter</h2>

      <div className="jnbsetup-stepper">
        {STEPS.map((s, i) => (
          <button
            key={i}
            className={`jnbsetup-step ${i === activeStep ? 'jnbsetup-step--active' : ''} ${i < activeStep ? 'jnbsetup-step--done' : ''}`}
            onClick={() => setActiveStep(i)}
          >
            <span className="jnbsetup-step-num">{i < activeStep ? '✓' : i + 1}</span>
            <span className="jnbsetup-step-label">{s.label}</span>
          </button>
        ))}
      </div>

      <div className="jnbsetup-detail">
        <span className="jnbsetup-icon">{STEPS[activeStep].icon}</span>
        <code className="jnbsetup-cmd">{STEPS[activeStep].cmd}</code>
        <p className="jnbsetup-desc">{STEPS[activeStep].detail}</p>
        <div className="jnbsetup-nav">
          <button disabled={activeStep === 0} onClick={() => setActiveStep(s => s - 1)} className="jnbsetup-btn">← Back</button>
          <button disabled={activeStep === STEPS.length - 1} onClick={() => setActiveStep(s => s + 1)} className="jnbsetup-btn jnbsetup-btn--primary">Next →</button>
        </div>
      </div>

      <h3 className="jnbsetup-subtitle">Jupyter UI Diagram</h3>
      <p className="jnbsetup-hint">Click a region to learn what it does.</p>
      <div className="jnbsetup-ui-diagram">
        <div className={`jnbsetup-ui-menu jnbsetup-ui-part ${activeUi === 'menu' ? 'jnbsetup-ui-part--active' : ''}`} onClick={() => setActiveUi(activeUi === 'menu' ? null : 'menu')}>File &nbsp; Edit &nbsp; View &nbsp; Insert &nbsp; Kernel &nbsp; Help</div>
        <div className={`jnbsetup-ui-toolbar jnbsetup-ui-part ${activeUi === 'toolbar' ? 'jnbsetup-ui-part--active' : ''}`} onClick={() => setActiveUi(activeUi === 'toolbar' ? null : 'toolbar')}>▶ ■ + ✂ ⬆ ⬇ &nbsp;|&nbsp; Code ▾ &nbsp;|&nbsp; Toolbar</div>
        <div className={`jnbsetup-ui-cell jnbsetup-ui-part ${activeUi === 'cell' ? 'jnbsetup-ui-part--active' : ''}`} onClick={() => setActiveUi(activeUi === 'cell' ? null : 'cell')}>
          <div className="jnbsetup-cell-prompt">In [1]:</div>
          <div className="jnbsetup-cell-body">print("Hello, Jupyter!")</div>
        </div>
        <div className={`jnbsetup-ui-kernel jnbsetup-ui-part ${activeUi === 'kernel' ? 'jnbsetup-ui-part--active' : ''}`} onClick={() => setActiveUi(activeUi === 'kernel' ? null : 'kernel')}>Python 3 ○ &nbsp;Kernel Indicator</div>
      </div>

      {activeUi && (
        <div className="jnbsetup-ui-info">
          {UI_PARTS.find(p => p.id === activeUi)?.desc}
        </div>
      )}
    </div>
  );
}
