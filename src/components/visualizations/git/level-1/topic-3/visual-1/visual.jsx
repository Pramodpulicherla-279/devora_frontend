import React, { useState } from 'react';
import './visual.css';

const BRANCH_DATA = {
  main: [
    { id: 'm1', hash: 'a1b2c3d', msg: 'Initial commit', x: 0 },
    { id: 'm2', hash: 'e4f5g6h', msg: 'Add homepage', x: 1 },
    { id: 'm3', hash: 'i7j8k9l', msg: 'Merge feature/login', x: 3, isMerge: true },
    { id: 'm4', hash: 'q4r5s6t', msg: 'Release v1.0', x: 4 },
  ],
  feature: [
    { id: 'f1', hash: 'p1q2r3s', msg: 'Add login form', x: 2, branch: 'feature/login' },
    { id: 'f2', hash: 't4u5v6w', msg: 'Validate password', x: 3, branch: 'feature/login' },
  ],
};

const MERGE_TYPES = {
  fastforward: {
    label: 'Fast-Forward Merge',
    color: '#6cc644',
    desc: 'When the target branch has no new commits since the feature branched off. Git simply moves the pointer forward — no merge commit created.',
    code: 'git checkout main\ngit merge feature/login\n# Fast-forward: main pointer moves up',
  },
  threeway: {
    label: '3-Way Merge',
    color: '#61AFEF',
    desc: "Both branches have diverged. Git creates a new 'merge commit' combining both histories. This preserves the full branch context.",
    code: 'git checkout main\ngit merge feature/login\n# Creates merge commit M joining both branches',
  },
  conflict: {
    label: 'Merge Conflict',
    color: '#E06C75',
    desc: 'Two branches edited the same lines differently. Git can\'t decide which to keep — you must resolve manually, then commit.',
    code: '<<<<<<< HEAD\ncurrent branch content\n=======\nincoming branch content\n>>>>>>> feature/login\n# Edit file to resolve, then: git add . && git commit',
  },
};

const GitBranchingMergingVisualization = () => {
  const [tab, setTab] = useState('visual');
  const [mergeType, setMergeType] = useState('fastforward');
  const [conflictResolved, setConflictResolved] = useState(false);

  return (
    <div className="gitbm-wrap">
      <header className="gitbm-head">
        <span className="gitbm-badge">Git</span>
        <h2>Branching &amp; Merging</h2>
        <p>Branches let you work on features without breaking main</p>
      </header>

      <div className="gitbm-tabs">
        {[['visual', '🌿 Branch Tree'], ['merge', '🔀 Merge Types'], ['commands', '💻 Commands']].map(([key, label]) => (
          <button key={key} className={`gitbm-tab ${tab === key ? 'gitbm-tab--on' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {/* ── Branch Tree ── */}
      {tab === 'visual' && (
        <div className="gitbm-tree-panel">
          <div className="gitbm-branch-row gitbm-main-row">
            <span className="gitbm-branch-name" style={{ color: '#6cc644' }}>main</span>
            {BRANCH_DATA.main.map((c, i) => (
              <React.Fragment key={c.id}>
                {i > 0 && <div className={`gitbm-line ${c.isMerge ? 'gitbm-line--merge' : ''}`} />}
                <div className={`gitbm-commit-node ${c.isMerge ? 'gitbm-commit-node--merge' : ''}`}>
                  <div className="gitbm-node-dot" style={{ background: '#6cc644' }} />
                  <div className="gitbm-node-label">
                    <code>{c.hash.slice(0, 7)}</code>
                    <span>{c.msg}</span>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="gitbm-branch-connector">
            <div className="gitbm-connector-line" />
          </div>

          <div className="gitbm-branch-row gitbm-feature-row">
            <span className="gitbm-branch-name" style={{ color: '#F05032' }}>feature/login</span>
            <div className="gitbm-feature-offset" />
            {BRANCH_DATA.feature.map((c, i) => (
              <React.Fragment key={c.id}>
                {i > 0 && <div className="gitbm-line" />}
                <div className="gitbm-commit-node">
                  <div className="gitbm-node-dot" style={{ background: '#F05032' }} />
                  <div className="gitbm-node-label">
                    <code>{c.hash.slice(0, 7)}</code>
                    <span>{c.msg}</span>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="gitbm-branch-cmds">
            <code>git checkout -b feature/login</code>
            <span>→ Create &amp; switch to new branch</span>
            <code>git merge feature/login</code>
            <span>→ Merge back into main</span>
          </div>
        </div>
      )}

      {/* ── Merge Types ── */}
      {tab === 'merge' && (
        <div className="gitbm-merge-panel">
          <div className="gitbm-merge-tabs">
            {Object.entries(MERGE_TYPES).map(([key, { label, color }]) => (
              <button
                key={key}
                className={`gitbm-merge-tab ${mergeType === key ? 'gitbm-merge-tab--on' : ''}`}
                style={{ '--mc': color }}
                onClick={() => { setMergeType(key); setConflictResolved(false); }}
              >{label}</button>
            ))}
          </div>
          <div className="gitbm-merge-detail" style={{ borderColor: MERGE_TYPES[mergeType].color }}>
            <p className="gitbm-merge-desc">{MERGE_TYPES[mergeType].desc}</p>
            <pre className="gitbm-code"><code>{MERGE_TYPES[mergeType].code}</code></pre>
            {mergeType === 'conflict' && (
              <button
                className={`gitbm-resolve-btn ${conflictResolved ? 'gitbm-resolve-btn--done' : ''}`}
                onClick={() => setConflictResolved(true)}
              >
                {conflictResolved ? '✓ Conflict resolved — ready to commit' : '🔧 Resolve conflict'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Commands ── */}
      {tab === 'commands' && (
        <div className="gitbm-cmds-panel">
          {[
            ['git branch', 'List all local branches'],
            ['git branch feature/login', 'Create a new branch'],
            ['git checkout feature/login', 'Switch to a branch'],
            ['git checkout -b feature/login', 'Create AND switch in one step'],
            ['git merge feature/login', 'Merge branch into current branch'],
            ['git branch -d feature/login', 'Delete a merged branch'],
            ['git branch -D feature/login', 'Force-delete (even if unmerged)'],
          ].map(([cmd, desc]) => (
            <div key={cmd} className="gitbm-cmd-row">
              <code className="gitbm-cmd">{cmd}</code>
              <span className="gitbm-cmd-desc">{desc}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GitBranchingMergingVisualization;
