import React, { useState } from 'react';
import './visual.css';

const WITHOUT_GIT = [
  { name: 'project_final.zip', icon: '📁', bad: false },
  { name: 'project_final2.zip', icon: '📁', bad: true },
  { name: 'project_FINAL_v3.zip', icon: '📁', bad: true },
  { name: 'project_USE_THIS.zip', icon: '📁', bad: true },
  { name: 'project_DO_NOT_TOUCH.zip', icon: '📁', bad: true },
];

const COMMITS = [
  { hash: 'a1b2c3d', msg: 'Initial project setup', author: 'Ali', time: '3 days ago', color: '#6cc644' },
  { hash: 'e4f5g6h', msg: 'Add login page UI', author: 'Ali', time: '2 days ago', color: '#6cc644' },
  { hash: 'i7j8k9l', msg: 'Fix: password validation bug', author: 'Sam', time: '1 day ago', color: '#F05032' },
  { hash: 'm1n2o3p', msg: 'Add dark mode toggle', author: 'Ali', time: '5 hours ago', color: '#6cc644' },
  { hash: 'q4r5s6t', msg: 'Refactor auth middleware', author: 'Sam', time: '1 hour ago', color: '#F05032' },
];

const THREE_STATES = [
  {
    id: 'working',
    label: 'Working Directory',
    icon: '📝',
    color: '#E5C07B',
    desc: 'Where you write code. Files are modified here but Git is not tracking the changes yet.',
    cmd: null,
  },
  {
    id: 'staging',
    label: 'Staging Area',
    icon: '📋',
    color: '#61AFEF',
    desc: 'A "draft zone". Files added here are ready to be committed. You choose exactly what goes in each snapshot.',
    cmd: 'git add <file>',
  },
  {
    id: 'repo',
    label: 'Local Repository',
    icon: '🗄️',
    color: '#6cc644',
    desc: 'The permanent history. Every commit is saved here forever. You can always travel back to any commit.',
    cmd: 'git commit -m "message"',
  },
];

const GitWhatIsGitVisualization = () => {
  const [activeCommit, setActiveCommit] = useState(null);
  const [activeState, setActiveState] = useState('working');

  return (
    <div className="gitwg-wrap">
      <header className="gitwg-head">
        <span className="gitwg-badge">Git</span>
        <h2>What is Git &amp; Why You Need It</h2>
        <p>Version control = a time machine for your code</p>
      </header>

      {/* ── Without vs With Git ── */}
      <div className="gitwg-compare">
        <div className="gitwg-side gitwg-side--bad">
          <div className="gitwg-side-head">
            <span className="gitwg-x">✗</span> Without Git
          </div>
          <div className="gitwg-files">
            {WITHOUT_GIT.map((f) => (
              <div key={f.name} className={`gitwg-file ${f.bad ? 'gitwg-file--bad' : ''}`}>
                <span>{f.icon}</span>
                <span className="gitwg-filename">{f.name}</span>
              </div>
            ))}
          </div>
          <p className="gitwg-side-note">Which one was working? No one knows. 😰</p>
        </div>

        <div className="gitwg-divider">vs</div>

        <div className="gitwg-side gitwg-side--good">
          <div className="gitwg-side-head">
            <span className="gitwg-check">✓</span> With Git
          </div>
          <div className="gitwg-commits">
            {COMMITS.map((c, i) => (
              <button
                key={c.hash}
                className={`gitwg-commit ${activeCommit === i ? 'gitwg-commit--active' : ''}`}
                onClick={() => setActiveCommit(activeCommit === i ? null : i)}
              >
                <span className="gitwg-dot" style={{ background: c.color }} />
                <span className="gitwg-hash">{c.hash.slice(0, 7)}</span>
                <span className="gitwg-cmsg">{c.msg}</span>
                {activeCommit === i && (
                  <div className="gitwg-commit-detail">
                    <span>👤 {c.author}</span>
                    <span>🕐 {c.time}</span>
                    <span className="gitwg-restore">git checkout {c.hash.slice(0, 7)}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
          <p className="gitwg-side-note">Click any commit to restore it instantly ✅</p>
        </div>
      </div>

      {/* ── Three States ── */}
      <section className="gitwg-states">
        <h3>The Three States of Git</h3>
        <div className="gitwg-states-row">
          {THREE_STATES.map((s, i) => (
            <React.Fragment key={s.id}>
              <button
                className={`gitwg-state-card ${activeState === s.id ? 'gitwg-state-card--on' : ''}`}
                style={{ '--gc': s.color }}
                onClick={() => setActiveState(s.id)}
              >
                <span className="gitwg-state-icon">{s.icon}</span>
                <span className="gitwg-state-label">{s.label}</span>
                {s.cmd && <code className="gitwg-state-cmd">{s.cmd}</code>}
              </button>
              {i < 2 && <div className="gitwg-state-arrow">→</div>}
            </React.Fragment>
          ))}
        </div>
        <div className="gitwg-state-detail" style={{ '--gc': THREE_STATES.find(s => s.id === activeState).color }}>
          {THREE_STATES.find(s => s.id === activeState).desc}
        </div>
      </section>
    </div>
  );
};

export default GitWhatIsGitVisualization;
