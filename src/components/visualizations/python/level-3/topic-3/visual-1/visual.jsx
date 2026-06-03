/* Lesson: Python Project Structure
 * Visual type: ILLUSTRATION
 * Reason: Project layout is a file tree — a clickable tree mapping each file to
 * its role orients learners on how to organize a real analysis project. */
import React, { useState } from 'react';
import './visual.css';

const TREE = [
  { p: 'my_project/', d: 'Project root.', depth: 0 },
  { p: 'data/', d: 'Raw & processed datasets (often git-ignored).', depth: 1 },
  { p: 'notebooks/', d: 'Jupyter notebooks for exploration.', depth: 1 },
  { p: 'src/', d: 'Reusable Python modules.', depth: 1 },
  { p: 'src/clean.py', d: 'Data-cleaning functions.', depth: 2 },
  { p: 'src/analyze.py', d: 'Analysis logic.', depth: 2 },
  { p: 'requirements.txt', d: 'Pinned dependencies for reproducibility.', depth: 1 },
  { p: 'README.md', d: 'How to set up & run the project.', depth: 1 },
  { p: '.gitignore', d: 'Exclude data/, venv/, __pycache__/.', depth: 1 },
];

const PyProjectVisualization = () => {
  const [sel, setSel] = useState('requirements.txt');
  const cur = TREE.find((t) => t.p === sel);
  return (
    <div className="pyproj-wrap">
      <header className="pyproj-head">
        <span className="pyproj-badge">Python</span>
        <h2>Project Structure</h2>
        <p>Organize an analysis project like a pro</p>
      </header>
      <div className="pyproj-grid">
        <div className="pyproj-tree">
          {TREE.map((t) => (
            <button key={t.p} className={`pyproj-node ${sel === t.p ? 'pyproj-node--on' : ''}`} style={{ paddingLeft: `${10 + t.depth * 16}px` }} onClick={() => setSel(t.p)}>
              <span className="pyproj-icon">{t.p.endsWith('/') ? '📁' : '📄'}</span>
              {t.p.split('/').filter(Boolean).pop()}{t.p.endsWith('/') ? '/' : ''}
            </button>
          ))}
        </div>
        <div className="pyproj-detail">
          <code className="pyproj-path">{sel}</code>
          <p>{cur.d}</p>
        </div>
      </div>
      <div className="pyproj-note">Separate <strong>data</strong>, <strong>exploration</strong> (notebooks), and <strong>reusable code</strong> (src). Pin deps in requirements.txt so others can reproduce your environment.</div>
    </div>
  );
};
export default PyProjectVisualization;
