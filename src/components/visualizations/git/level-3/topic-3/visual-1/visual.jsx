import React, { useState } from 'react';
import './visual.css';

const COMMIT_TYPES = [
  { type: 'feat', color: '#6cc644', desc: 'A new feature for the user' },
  { type: 'fix', color: '#E06C75', desc: 'A bug fix' },
  { type: 'docs', color: '#61AFEF', desc: 'Documentation changes only' },
  { type: 'style', color: '#C678DD', desc: 'Formatting, missing semicolons (no logic change)' },
  { type: 'refactor', color: '#E5C07B', desc: 'Code restructure without fixing bug or adding feature' },
  { type: 'test', color: '#56B6C2', desc: 'Adding or fixing tests' },
  { type: 'chore', color: '#7d8590', desc: 'Build process, dependency updates, tooling' },
];

const HOOK_PIPELINE = [
  { name: 'pre-commit', trigger: 'Before commit is created', tools: ['lint-staged', 'ESLint', 'Prettier'], color: '#F05032', icon: '🔍' },
  { name: 'commit-msg', trigger: 'After commit message is written', tools: ['commitlint'], color: '#E5C07B', icon: '📝' },
  { name: 'pre-push', trigger: 'Before git push runs', tools: ['npm test', 'tsc --noEmit'], color: '#61AFEF', icon: '🧪' },
  { name: 'post-commit', trigger: 'After commit is done', tools: ['notifications', 'analytics'], color: '#6cc644', icon: '✅' },
];

const GitHooksConventionalCommitsVisualization = () => {
  const [selectedType, setSelectedType] = useState('feat');
  const [scope, setScope] = useState('auth');
  const [description, setDescription] = useState('add Google OAuth login');
  const [breaking, setBreaking] = useState(false);
  const [activeHook, setActiveHook] = useState('pre-commit');
  const [hookRunning, setHookRunning] = useState(false);
  const [hookPassed, setHookPassed] = useState(null);

  const breakingStr = breaking ? '!' : '';
  const scopeStr = scope ? `(${scope})` : '';
  const fullCommit = `${selectedType}${scopeStr}${breakingStr}: ${description}`;
  const selectedTypeObj = COMMIT_TYPES.find(t => t.type === selectedType);

  const runHook = () => {
    setHookRunning(true);
    setHookPassed(null);
    setTimeout(() => { setHookRunning(false); setHookPassed(true); }, 1400);
  };

  return (
    <div className="githc-wrap">
      <header className="githc-head">
        <span className="githc-badge">Git</span>
        <h2>Hooks &amp; Conventional Commits</h2>
        <p>Automate quality checks and standardize commit history</p>
      </header>

      <div className="githc-grid">
        {/* ── Conventional Commits Builder ── */}
        <div className="githc-panel">
          <h3>Conventional Commit Builder</h3>
          <p className="githc-sub">Format: <code>type(scope)!: description</code></p>

          {/* Type picker */}
          <div className="githc-type-grid">
            {COMMIT_TYPES.map(t => (
              <button
                key={t.type}
                className={`githc-type-btn ${selectedType === t.type ? 'githc-type-btn--on' : ''}`}
                style={{ '--tc': t.color }}
                onClick={() => setSelectedType(t.type)}
              >
                {t.type}
              </button>
            ))}
          </div>
          <p className="githc-type-desc" style={{ color: selectedTypeObj.color }}>{selectedTypeObj.desc}</p>

          {/* Scope + description */}
          <div className="githc-fields">
            <label>
              Scope <span className="githc-optional">(optional)</span>
              <input className="githc-input" value={scope} onChange={e => setScope(e.target.value)} placeholder="auth, ui, api..." />
            </label>
            <label>
              Description
              <input className="githc-input" value={description} onChange={e => setDescription(e.target.value)} placeholder="short description..." />
            </label>
            <label className="githc-breaking-label">
              <input type="checkbox" checked={breaking} onChange={e => setBreaking(e.target.checked)} />
              Breaking change (adds <code>!</code>)
            </label>
          </div>

          {/* Live preview */}
          <div className="githc-preview">
            <div className="githc-preview-label">Result</div>
            <div className="githc-preview-commit">
              <span style={{ color: selectedTypeObj.color }}>{selectedType}</span>
              {scope && <span className="githc-preview-scope">({scope})</span>}
              {breaking && <span className="githc-preview-bang">!</span>}
              <span className="githc-preview-colon">: </span>
              <span className="githc-preview-desc">{description || '…'}</span>
            </div>
            <pre className="githc-commit-cmd">
              <code>{`git commit -m "${fullCommit}"`}</code>
            </pre>
          </div>
        </div>

        {/* ── Git Hooks Pipeline ── */}
        <div className="githc-panel">
          <h3>Git Hooks Pipeline</h3>
          <p className="githc-sub">Hooks = scripts that auto-run at specific Git events.</p>

          <div className="githc-hooks-list">
            {HOOK_PIPELINE.map(hook => (
              <button
                key={hook.name}
                className={`githc-hook ${activeHook === hook.name ? 'githc-hook--on' : ''}`}
                style={{ '--hc': hook.color }}
                onClick={() => { setActiveHook(hook.name); setHookPassed(null); }}
              >
                <span className="githc-hook-icon">{hook.icon}</span>
                <div>
                  <div className="githc-hook-name">{hook.name}</div>
                  <div className="githc-hook-trigger">{hook.trigger}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Hook detail */}
          {(() => {
            const hook = HOOK_PIPELINE.find(h => h.name === activeHook);
            return (
              <div className="githc-hook-detail" style={{ borderColor: hook.color }}>
                <div className="githc-hook-tools">
                  {hook.tools.map(tool => (
                    <span key={tool} className="githc-tool-chip" style={{ borderColor: hook.color }}>{tool}</span>
                  ))}
                </div>
                <div className="githc-hook-run">
                  <button className="githc-run-btn" onClick={runHook} disabled={hookRunning}>
                    {hookRunning ? '⏳ Running…' : `▶ Simulate ${hook.name}`}
                  </button>
                  {hookPassed === true && <span className="githc-pass">✓ All checks passed</span>}
                </div>
                <pre className="githc-code">
                  <code>{`.husky/${hook.name}\n#!/bin/sh\n${hook.tools[0] === 'lint-staged' ? 'npx lint-staged' : hook.tools[0] === 'commitlint' ? 'npx commitlint --edit $1' : hook.tools[0]}`}</code>
                </pre>
              </div>
            );
          })()}

          <div className="githc-husky-note">
            <strong>Husky</strong> — the easiest way to set up Git hooks in a Node.js project.
            <pre className="githc-code"><code>{'npx husky init'}</code></pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHooksConventionalCommitsVisualization;
