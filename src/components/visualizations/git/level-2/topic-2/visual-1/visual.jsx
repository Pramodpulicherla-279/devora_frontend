import React, { useState } from 'react';
import './visual.css';

const PR_STAGES = [
  { id: 'branch', icon: '🌿', label: 'Create branch', desc: 'Branch off main for your feature or fix.' },
  { id: 'code', icon: '💻', label: 'Write code', desc: 'Make commits on your feature branch.' },
  { id: 'push', icon: '⬆️', label: 'Push branch', desc: 'Push the branch to GitHub remote.' },
  { id: 'open', icon: '📬', label: 'Open PR', desc: 'Click "Compare & pull request" on GitHub.' },
  { id: 'review', icon: '👀', label: 'Code review', desc: 'Team reviews, leaves comments, approves or requests changes.' },
  { id: 'merge', icon: '✅', label: 'Merge', desc: 'Approved PR is merged into main. Branch can be deleted.' },
];

const REVIEW_STATES = [
  { state: 'approved', icon: '✓', label: 'Approved', color: '#6cc644', desc: 'LGTM! Ready to merge.' },
  { state: 'changes', icon: '△', label: 'Changes Requested', color: '#E5C07B', desc: 'Reviewer found issues — fix and re-request review.' },
  { state: 'commented', icon: '💬', label: 'Commented', color: '#61AFEF', desc: 'General feedback, no explicit approval or rejection.' },
];

const MERGE_STRATEGIES = [
  {
    id: 'merge',
    label: 'Merge Commit',
    color: '#6cc644',
    pro: 'Preserves full history',
    con: 'Creates extra merge commit',
    cmd: 'git merge feature/login',
  },
  {
    id: 'squash',
    label: 'Squash & Merge',
    color: '#61AFEF',
    pro: 'Clean, single commit per feature',
    con: 'Loses individual commit history',
    cmd: 'git merge --squash feature/login',
  },
  {
    id: 'rebase',
    label: 'Rebase & Merge',
    color: '#C678DD',
    pro: 'Linear history, no merge commit',
    con: 'Rewrites commit SHAs',
    cmd: 'git rebase main',
  },
];

const GitPullRequestsVisualization = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [reviewState, setReviewState] = useState('approved');
  const [strategy, setStrategy] = useState('merge');

  const strat = MERGE_STRATEGIES.find(s => s.id === strategy);

  return (
    <div className="gitpr-wrap">
      <header className="gitpr-head">
        <span className="gitpr-badge">Git</span>
        <h2>Pull Requests</h2>
        <p>The collaboration engine of every professional team</p>
      </header>

      {/* ── PR Lifecycle ── */}
      <section className="gitpr-lifecycle">
        <h3>PR Lifecycle — click each stage</h3>
        <div className="gitpr-stages">
          {PR_STAGES.map((s, i) => (
            <React.Fragment key={s.id}>
              <button
                className={`gitpr-stage ${i <= activeStage ? 'gitpr-stage--done' : ''} ${i === activeStage ? 'gitpr-stage--active' : ''}`}
                onClick={() => setActiveStage(i)}
              >
                <span className="gitpr-stage-icon">{s.icon}</span>
                <span className="gitpr-stage-label">{s.label}</span>
              </button>
              {i < PR_STAGES.length - 1 && (
                <div className={`gitpr-stage-line ${i < activeStage ? 'gitpr-stage-line--done' : ''}`} />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="gitpr-stage-detail">
          <strong>{PR_STAGES[activeStage].icon} {PR_STAGES[activeStage].label}</strong>
          <p>{PR_STAGES[activeStage].desc}</p>
          {activeStage < PR_STAGES.length - 1 && (
            <button className="gitpr-next" onClick={() => setActiveStage(activeStage + 1)}>Next step →</button>
          )}
        </div>
      </section>

      <div className="gitpr-grid">
        {/* ── Review States ── */}
        <div className="gitpr-panel">
          <h3>Review Outcomes</h3>
          <div className="gitpr-review-states">
            {REVIEW_STATES.map(r => (
              <button
                key={r.state}
                className={`gitpr-review-btn ${reviewState === r.state ? 'gitpr-review-btn--on' : ''}`}
                style={{ '--rc': r.color }}
                onClick={() => setReviewState(r.state)}
              >
                <span className="gitpr-review-icon" style={{ color: r.color }}>{r.icon}</span>
                <span className="gitpr-review-label">{r.label}</span>
              </button>
            ))}
          </div>
          <p className="gitpr-review-desc">
            {REVIEW_STATES.find(r => r.state === reviewState).desc}
          </p>
          <div className="gitpr-pr-card">
            <div className="gitpr-pr-title">feat: add user authentication #42</div>
            <div className="gitpr-pr-meta">
              <span>base: <code>main</code></span>
              <span>compare: <code>feature/auth</code></span>
              <span>+142 −18 lines</span>
            </div>
          </div>
        </div>

        {/* ── Merge Strategies ── */}
        <div className="gitpr-panel">
          <h3>Merge Strategies</h3>
          <div className="gitpr-strats">
            {MERGE_STRATEGIES.map(s => (
              <button
                key={s.id}
                className={`gitpr-strat-btn ${strategy === s.id ? 'gitpr-strat-btn--on' : ''}`}
                style={{ '--sc': s.color }}
                onClick={() => setStrategy(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="gitpr-strat-detail" style={{ borderColor: strat.color }}>
            <div className="gitpr-strat-row">
              <span className="gitpr-pro">✓ {strat.pro}</span>
            </div>
            <div className="gitpr-strat-row">
              <span className="gitpr-con">✗ {strat.con}</span>
            </div>
            <pre className="gitpr-code"><code>{strat.cmd}</code></pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitPullRequestsVisualization;
