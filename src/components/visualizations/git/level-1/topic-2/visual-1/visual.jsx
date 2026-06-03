import React, { useState } from 'react';
import './visual.css';

const INITIAL_FILES = [
  { id: 1, name: 'index.html', status: 'untracked', icon: '📄' },
  { id: 2, name: 'style.css', status: 'untracked', icon: '🎨' },
  { id: 3, name: 'app.js', status: 'untracked', icon: '⚡' },
  { id: 4, name: '.gitignore', status: 'untracked', icon: '🚫' },
];

const COMMANDS = [
  { cmd: 'git init', desc: 'Initialize a new Git repository. Creates the hidden .git folder.', action: 'init' },
  { cmd: 'git add .', desc: 'Stage ALL files. Moves them from Working Directory → Staging Area.', action: 'add' },
  { cmd: 'git commit -m "..."', desc: 'Snapshot staged files. Moves them → Local Repository permanently.', action: 'commit' },
  { cmd: 'git status', desc: 'Show the state of your working tree. Your most-used command.', action: 'status' },
  { cmd: 'git log', desc: 'Show commit history. Each commit has a unique SHA hash.', action: 'log' },
];

const GITIGNORE_PATTERNS = [
  { pattern: 'node_modules/', reason: 'Dependencies — too large, reinstalled via npm install' },
  { pattern: '.env', reason: 'Environment variables — contains secrets & passwords' },
  { pattern: 'dist/', reason: 'Build output — generated automatically, not source code' },
  { pattern: '*.log', reason: 'Log files — machine-generated, not needed in repo' },
  { pattern: '.DS_Store', reason: 'macOS folder metadata — irrelevant to other devs' },
];

const GitFirstRepoVisualization = () => {
  const [step, setStep] = useState(0);
  const [commitMsg, setCommitMsg] = useState('Initial commit');
  const [files, setFiles] = useState(INITIAL_FILES);
  const [log, setLog] = useState([]);
  const [activeCmd, setActiveCmd] = useState(null);
  const [gitignoreOpen, setGitignoreOpen] = useState(false);

  const runStep = (action) => {
    if (action === 'init') {
      setStep(1);
      setFiles(files.map(f => ({ ...f, status: 'untracked' })));
    } else if (action === 'add' && step >= 1) {
      setStep(2);
      setFiles(files.map(f => ({ ...f, status: 'staged' })));
    } else if (action === 'commit' && step >= 2) {
      const hash = Math.random().toString(16).slice(2, 9);
      setLog(prev => [{ hash, msg: commitMsg, time: 'just now' }, ...prev]);
      setFiles(files.map(f => ({ ...f, status: 'committed' })));
      setStep(3);
    } else if (action === 'status') {
      setActiveCmd('status');
    } else if (action === 'log') {
      setActiveCmd('log');
    }
  };

  const reset = () => { setStep(0); setFiles(INITIAL_FILES); setLog([]); setActiveCmd(null); };

  const zoneColor = (status) => ({ untracked: '#7d8590', staged: '#61AFEF', committed: '#6cc644' }[status] || '#7d8590');
  const zoneLabel = (status) => ({ untracked: 'Working Dir', staged: 'Staging', committed: 'Repository' }[status]);

  return (
    <div className="gitfr-wrap">
      <header className="gitfr-head">
        <span className="gitfr-badge">Git</span>
        <h2>Your First Repository</h2>
        <p>Follow the workflow: init → add → commit</p>
      </header>

      <div className="gitfr-grid">
        {/* ── Command Panel ── */}
        <div className="gitfr-panel">
          <h3>Commands</h3>
          <div className="gitfr-cmds">
            {COMMANDS.map((c) => (
              <button
                key={c.cmd}
                className={`gitfr-cmd-btn ${activeCmd === c.action ? 'gitfr-cmd-btn--active' : ''}`}
                onClick={() => { setActiveCmd(c.action); runStep(c.action); }}
              >
                <code className="gitfr-cmd-text">{c.cmd}</code>
                <span className="gitfr-cmd-desc">{c.desc}</span>
              </button>
            ))}
          </div>
          <button className="gitfr-reset" onClick={reset}>↺ Reset</button>
        </div>

        {/* ── File Pipeline ── */}
        <div className="gitfr-panel">
          <h3>File Pipeline</h3>
          <div className="gitfr-zones">
            {['Working Dir', 'Staging', 'Repository'].map((zone, zi) => (
              <div key={zone} className="gitfr-zone">
                <div className="gitfr-zone-label">{zone}</div>
                <div className="gitfr-zone-files">
                  {files.filter(f => zoneLabel(f.status) === zone).map(f => (
                    <div key={f.id} className="gitfr-file-chip" style={{ borderColor: zoneColor(f.status) }}>
                      {f.icon} {f.name}
                    </div>
                  ))}
                  {files.filter(f => zoneLabel(f.status) === zone).length === 0 && (
                    <span className="gitfr-empty">—</span>
                  )}
                </div>
                {zi < 2 && <div className="gitfr-zone-arrow">↓</div>}
              </div>
            ))}
          </div>

          {/* Commit msg + log */}
          {step >= 2 && (
            <div className="gitfr-commit-input">
              <label>Commit message</label>
              <input className="gitfr-input" value={commitMsg} onChange={e => setCommitMsg(e.target.value)} placeholder='Initial commit' />
            </div>
          )}

          {log.length > 0 && (
            <div className="gitfr-log">
              <div className="gitfr-log-head">git log</div>
              {log.map(e => (
                <div key={e.hash} className="gitfr-log-entry">
                  <span className="gitfr-log-hash">{e.hash}</span>
                  <span className="gitfr-log-msg">{e.msg}</span>
                  <span className="gitfr-log-time">{e.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── .gitignore Section ── */}
      <div className="gitfr-gitignore">
        <button className="gitfr-ignore-toggle" onClick={() => setGitignoreOpen(!gitignoreOpen)}>
          📄 .gitignore — What to exclude from Git {gitignoreOpen ? '▲' : '▼'}
        </button>
        {gitignoreOpen && (
          <div className="gitfr-ignore-list">
            {GITIGNORE_PATTERNS.map(p => (
              <div key={p.pattern} className="gitfr-ignore-row">
                <code className="gitfr-ignore-pat">{p.pattern}</code>
                <span className="gitfr-ignore-reason">{p.reason}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GitFirstRepoVisualization;
