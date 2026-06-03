import React, { useState } from 'react';
import './visual.css';

const STRATEGIES = {
  githubflow: {
    label: 'GitHub Flow',
    color: '#6cc644',
    tagline: 'Simple. Always deployable main.',
    steps: [
      'Branch off main for every feature/fix',
      'Commit small, push often',
      'Open a Pull Request',
      'Get reviewed & approved',
      'Merge to main → deploy immediately',
    ],
    branches: [
      { name: 'main', color: '#6cc644', commits: 5 },
      { name: 'feature/auth', color: '#61AFEF', commits: 3, from: 2 },
      { name: 'fix/header', color: '#F05032', commits: 2, from: 3 },
    ],
    bestFor: 'Web apps with continuous deployment. Small to mid-size teams.',
  },
  gitflow: {
    label: 'Git Flow',
    color: '#61AFEF',
    tagline: 'Structured releases. Multiple branches.',
    steps: [
      'develop branch for ongoing work',
      'feature/* branches off develop',
      'release/* branch for release prep',
      'hotfix/* off main for urgent fixes',
      'Merge to both main AND develop',
    ],
    branches: [
      { name: 'main', color: '#6cc644', commits: 3 },
      { name: 'develop', color: '#61AFEF', commits: 5 },
      { name: 'feature/x', color: '#C678DD', commits: 3, from: 1 },
      { name: 'release/1.0', color: '#E5C07B', commits: 2, from: 4 },
    ],
    bestFor: 'Versioned software (desktop apps, libraries). Scheduled releases.',
  },
  trunk: {
    label: 'Trunk-Based',
    color: '#F05032',
    tagline: 'Everything directly on main. Fast CI.',
    steps: [
      'All developers commit to main (trunk)',
      'Short-lived feature branches (< 1 day)',
      'Feature flags for incomplete work',
      'Automated CI runs on every push',
      'Deploy multiple times per day',
    ],
    branches: [
      { name: 'main', color: '#F05032', commits: 8 },
      { name: 'short-lived', color: '#E5C07B', commits: 1, from: 5 },
    ],
    bestFor: 'High-performing teams with strong CI/CD. Google, Facebook use this.',
  },
};

const GitBranchingStrategiesVisualization = () => {
  const [active, setActive] = useState('githubflow');
  const s = STRATEGIES[active];

  return (
    <div className="gitbs-wrap">
      <header className="gitbs-head">
        <span className="gitbs-badge">Git</span>
        <h2>Branching Strategies</h2>
        <p>Choose the workflow that fits your team and release cadence</p>
      </header>

      {/* Strategy Selector */}
      <div className="gitbs-selector">
        {Object.entries(STRATEGIES).map(([key, { label, color }]) => (
          <button
            key={key}
            className={`gitbs-sel-btn ${active === key ? 'gitbs-sel-btn--on' : ''}`}
            style={{ '--sc': color }}
            onClick={() => setActive(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="gitbs-grid">
        {/* Branch diagram */}
        <div className="gitbs-panel">
          <h3 style={{ color: s.color }}>{s.label}</h3>
          <p className="gitbs-tagline">"{s.tagline}"</p>
          <div className="gitbs-diagram">
            {s.branches.map((b) => (
              <div key={b.name} className="gitbs-branch-row">
                <span className="gitbs-branch-name" style={{ color: b.color }}>{b.name}</span>
                <div className="gitbs-branch-track">
                  {b.from !== undefined && (
                    <div className="gitbs-branch-offset" style={{ flex: b.from }} />
                  )}
                  <div className="gitbs-branch-line" style={{ background: b.color, flex: b.commits }}>
                    {Array.from({ length: b.commits }).map((_, i) => (
                      <div key={i} className="gitbs-dot" style={{ background: b.color }} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="gitbs-best-for">
            <span className="gitbs-best-label">Best for:</span> {s.bestFor}
          </div>
        </div>

        {/* Steps */}
        <div className="gitbs-panel">
          <h3>How it works</h3>
          <ol className="gitbs-steps">
            {s.steps.map((step, i) => (
              <li key={i} className="gitbs-step">
                <span className="gitbs-step-num" style={{ background: s.color }}>{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="gitbs-table-wrap">
        <h3>Quick Comparison</h3>
        <table className="gitbs-table">
          <thead>
            <tr>
              <th>Criteria</th>
              <th style={{ color: '#6cc644' }}>GitHub Flow</th>
              <th style={{ color: '#61AFEF' }}>Git Flow</th>
              <th style={{ color: '#F05032' }}>Trunk-Based</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Complexity', 'Low', 'High', 'Low'],
              ['Release cadence', 'Continuous', 'Scheduled', 'Multiple/day'],
              ['Branch count', '2–3', '5+', '1–2'],
              ['Best team size', 'Any', 'Large', 'Expert'],
            ].map(([label, ...vals]) => (
              <tr key={label}>
                <td className="gitbs-td-label">{label}</td>
                {vals.map((v, i) => <td key={i}>{v}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GitBranchingStrategiesVisualization;
