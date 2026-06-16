/* Lesson: Virtual Environments and pip — Managing Your Python Projects
 * Visual type: ILLUSTRATION
 * Shows the problem (global dependency conflict) → solution (venv per project) */
import React, { useState } from 'react';
import './visual.css';

const TABS = [
  {
    id: 'problem',
    label: 'The Problem',
    content: (
      <div className="pyvenv-problem">
        <div className="pyvenv-global">
          <div className="pyvenv-global-label">Global Python</div>
          <div className="pyvenv-pkg pyvenv-pkg--conflict">pandas 1.5 (Project A needs this)</div>
          <div className="pyvenv-pkg pyvenv-pkg--conflict">pandas 2.0 (Project B needs this)</div>
          <div className="pyvenv-pkg">scikit-learn 1.2</div>
        </div>
        <div className="pyvenv-error">ImportError: pandas version conflict!</div>
        <p className="pyvenv-p">Installing conflicting versions in the same Python breaks both projects.</p>
      </div>
    ),
  },
  {
    id: 'solution',
    label: 'The Solution',
    content: (
      <div className="pyvenv-solution">
        <div className="pyvenv-venv">
          <div className="pyvenv-venv-label">Project A / venv</div>
          <div className="pyvenv-pkg pyvenv-pkg--ok">pandas 1.5.3</div>
          <div className="pyvenv-pkg pyvenv-pkg--ok">numpy 1.24</div>
        </div>
        <div className="pyvenv-venv">
          <div className="pyvenv-venv-label">Project B / venv</div>
          <div className="pyvenv-pkg pyvenv-pkg--ok">pandas 2.1.0</div>
          <div className="pyvenv-pkg pyvenv-pkg--ok">numpy 1.26</div>
        </div>
        <p className="pyvenv-p">Isolated environments — each project has exactly what it needs, nothing more.</p>
      </div>
    ),
  },
  {
    id: 'commands',
    label: 'Commands',
    content: (
      <div className="pyvenv-cmds">
        {[
          { cmd:'python -m venv venv',       note:'Create a virtual environment in a folder called "venv"' },
          { cmd:'venv\\Scripts\\activate',   note:'Activate it (Windows). Mac/Linux: source venv/bin/activate' },
          { cmd:'pip install pandas numpy',  note:'Installs into the venv, not globally' },
          { cmd:'pip freeze > requirements.txt', note:'Saves your exact package list for teammates' },
          { cmd:'pip install -r requirements.txt', note:'Teammates run this to get the same environment' },
          { cmd:'deactivate',                note:'Return to global Python' },
        ].map((c, i) => (
          <div key={i} className="pyvenv-cmd-row">
            <code className="pyvenv-cmd">{c.cmd}</code>
            <span className="pyvenv-cmd-note">{c.note}</span>
          </div>
        ))}
      </div>
    ),
  },
];

const PyVenvVisualization = () => {
  const [tab, setTab] = useState('problem');
  const t = TABS.find(x=>x.id===tab);

  return (
    <div className="pyvenv-wrap">
      <header className="pyvenv-head">
        <span className="pyvenv-badge">Python Basics</span>
        <h2>Virtual Environments &amp; pip</h2>
        <p>One environment per project — no dependency chaos</p>
      </header>
      <div className="pyvenv-tabs">
        {TABS.map(tb=><button key={tb.id} className={`pyvenv-tab ${tab===tb.id?'pyvenv-tab--on':''}`} onClick={()=>setTab(tb.id)}>{tb.label}</button>)}
      </div>
      <div className="pyvenv-body">{t.content}</div>
    </div>
  );
};

export default PyVenvVisualization;
