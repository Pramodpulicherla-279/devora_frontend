import React, { useState } from 'react';
import './visual.css';

const OPERATIONS = [
  {
    id: 'push',
    label: 'git push',
    icon: '⬆️',
    color: '#F05032',
    direction: 'local-to-remote',
    desc: 'Upload local commits to the remote repository. Others can now see your changes.',
    code: 'git push origin main\n# or: git push -u origin main (first push)',
  },
  {
    id: 'pull',
    label: 'git pull',
    icon: '⬇️',
    color: '#6cc644',
    direction: 'remote-to-local',
    desc: 'Fetch + merge remote changes into your local branch. Keeps you in sync with the team.',
    code: 'git pull origin main\n# = git fetch + git merge',
  },
  {
    id: 'fetch',
    label: 'git fetch',
    icon: '🔍',
    color: '#61AFEF',
    direction: 'remote-to-local',
    desc: 'Download remote changes but do NOT merge yet. Safe to inspect before integrating.',
    code: 'git fetch origin\ngit diff main origin/main\n# Now decide to merge',
  },
  {
    id: 'clone',
    label: 'git clone',
    icon: '📋',
    color: '#C678DD',
    direction: 'remote-to-local',
    desc: 'Copy a remote repo to your machine. Sets up tracking automatically.',
    code: 'git clone https://github.com/user/repo.git\ngit clone git@github.com:user/repo.git',
  },
];

const LOCAL_COMMITS = [
  { hash: 'a1b2c3d', msg: 'Add feature X', synced: true },
  { hash: 'e4f5g6h', msg: 'Fix login bug', synced: true },
  { hash: 'i7j8k9l', msg: 'Update styles', synced: false },
  { hash: 'm1n2o3p', msg: 'WIP: dark mode', synced: false },
];

const REMOTE_COMMITS = [
  { hash: 'a1b2c3d', msg: 'Add feature X' },
  { hash: 'e4f5g6h', msg: 'Fix login bug' },
];

const GitRemoteReposVisualization = () => {
  const [activeOp, setActiveOp] = useState('push');
  const [pushed, setPushed] = useState(false);
  const [authMode, setAuthMode] = useState('https');

  const op = OPERATIONS.find(o => o.id === activeOp);
  const remoteDisplay = pushed
    ? LOCAL_COMMITS
    : REMOTE_COMMITS;

  return (
    <div className="gitrr-wrap">
      <header className="gitrr-head">
        <span className="gitrr-badge">Git</span>
        <h2>Remote Repositories</h2>
        <p>Local machine ↔ GitHub — staying in sync with your team</p>
      </header>

      {/* ── Operation Tabs ── */}
      <div className="gitrr-ops">
        {OPERATIONS.map(o => (
          <button
            key={o.id}
            className={`gitrr-op-btn ${activeOp === o.id ? 'gitrr-op-btn--on' : ''}`}
            style={{ '--oc': o.color }}
            onClick={() => { setActiveOp(o.id); setPushed(false); }}
          >
            <span className="gitrr-op-icon">{o.icon}</span>
            <span className="gitrr-op-label">{o.label}</span>
          </button>
        ))}
      </div>

      {/* ── Diagram ── */}
      <div className="gitrr-diagram">
        <div className="gitrr-machine">
          <div className="gitrr-machine-head">💻 Local Machine</div>
          <div className="gitrr-commits">
            {LOCAL_COMMITS.map(c => (
              <div key={c.hash} className={`gitrr-commit ${c.synced ? 'gitrr-commit--synced' : 'gitrr-commit--local'}`}>
                <code>{c.hash.slice(0, 7)}</code>
                <span>{c.msg}</span>
                {!c.synced && <span className="gitrr-unpushed">not pushed</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="gitrr-arrow-col">
          <div className="gitrr-arrow" style={{ color: op.color }}>
            {op.direction === 'local-to-remote' ? '→' : '←'}
          </div>
          <div className="gitrr-op-pill" style={{ background: op.color }}>
            {op.label}
          </div>
          <button
            className="gitrr-run-btn"
            style={{ borderColor: op.color, color: op.color }}
            onClick={() => setPushed(true)}
          >
            Run ▶
          </button>
        </div>

        <div className="gitrr-machine">
          <div className="gitrr-machine-head">☁️ GitHub (Remote)</div>
          <div className="gitrr-commits">
            {remoteDisplay.map(c => (
              <div key={c.hash} className="gitrr-commit gitrr-commit--synced">
                <code>{c.hash.slice(0, 7)}</code>
                <span>{c.msg}</span>
              </div>
            ))}
            {pushed && <div className="gitrr-synced-badge">✓ In sync</div>}
          </div>
        </div>
      </div>

      <p className="gitrr-op-desc">{op.desc}</p>
      <pre className="gitrr-code"><code>{op.code}</code></pre>

      {/* ── Auth Mode ── */}
      <div className="gitrr-auth">
        <h3>Remote URL Format</h3>
        <div className="gitrr-auth-tabs">
          {['https', 'ssh'].map(m => (
            <button
              key={m}
              className={`gitrr-auth-tab ${authMode === m ? 'gitrr-auth-tab--on' : ''}`}
              onClick={() => setAuthMode(m)}
            >{m.toUpperCase()}</button>
          ))}
        </div>
        <pre className="gitrr-code">
          <code>{authMode === 'https'
            ? 'git remote add origin https://github.com/user/repo.git\n# Uses username + password / token'
            : 'git remote add origin git@github.com:user/repo.git\n# Uses SSH key — no password needed each time'}</code>
        </pre>
        <p className="gitrr-auth-tip">
          {authMode === 'ssh'
            ? '✓ Recommended: generate an SSH key pair and add the public key to GitHub Settings.'
            : 'Use a Personal Access Token (PAT) instead of your password.'}
        </p>
      </div>
    </div>
  );
};

export default GitRemoteReposVisualization;
