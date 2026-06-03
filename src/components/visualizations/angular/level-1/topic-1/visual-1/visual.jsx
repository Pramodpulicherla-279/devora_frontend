/* Lesson: Angular CLI & Project Structure
 * Visual type: ILLUSTRATION
 * Reason: Project structure is a file tree — a clickable tree mapping each
 * folder/file to its purpose is the clearest way to orient a beginner. */
import React, { useState } from 'react';
import './visual.css';

const TREE = [
  { p: 'src/', d: 'All your app source code lives here.', depth: 0 },
  { p: 'src/main.ts', d: 'Entry point — bootstraps the root component.', depth: 1 },
  { p: 'src/app/', d: 'Your application module & components.', depth: 1 },
  { p: 'src/app/app.component.ts', d: 'Root component (class + decorator).', depth: 2 },
  { p: 'src/app/app.component.html', d: 'Root component template.', depth: 2 },
  { p: 'src/app/app.config.ts', d: 'App-wide providers & configuration.', depth: 2 },
  { p: 'angular.json', d: 'CLI build/serve config for the workspace.', depth: 0 },
  { p: 'package.json', d: 'Dependencies & npm scripts.', depth: 0 },
];

const CMDS = [
  ['ng new my-app', 'Scaffold a new project'],
  ['ng serve', 'Run the dev server (localhost:4200)'],
  ['ng generate component foo', 'Create a component (+ files)'],
  ['ng build', 'Production build to dist/'],
];

const NgCliVisualization = () => {
  const [sel, setSel] = useState('src/app/app.component.ts');
  const cur = TREE.find((t) => t.p === sel);
  return (
    <div className="ngcli-wrap">
      <header className="ngcli-head">
        <span className="ngcli-badge">Angular</span>
        <h2>Angular CLI &amp; Project Structure</h2>
        <p>What the CLI generates and what each piece does</p>
      </header>
      <div className="ngcli-grid">
        <div className="ngcli-tree">
          {TREE.map((t) => (
            <button key={t.p} className={`ngcli-node ${sel === t.p ? 'ngcli-node--on' : ''}`} style={{ paddingLeft: `${10 + t.depth * 16}px` }} onClick={() => setSel(t.p)}>
              <span className="ngcli-icon">{t.p.endsWith('/') ? '📁' : '📄'}</span>
              {t.p.replace(/.*\//, (m) => m).split('/').filter(Boolean).pop()}{t.p.endsWith('/') ? '/' : ''}
            </button>
          ))}
        </div>
        <div className="ngcli-detail">
          <code className="ngcli-path">{sel}</code>
          <p>{cur.d}</p>
        </div>
      </div>
      <div className="ngcli-cmds">
        <h3>Essential CLI commands</h3>
        {CMDS.map(([c, d]) => (
          <div key={c} className="ngcli-cmd"><code>{c}</code><span>{d}</span></div>
        ))}
      </div>
    </div>
  );
};
export default NgCliVisualization;
