import React, { useState } from 'react';
import './visual.css';

const COMMANDS = {
  stash: {
    label: 'git stash',
    icon: '🗃️',
    color: '#E5C07B',
    desc: 'Temporarily shelve uncommitted changes so you can switch context without losing work.',
    steps: [
      { label: 'Working directory', before: ['📝 modified: login.js', '📝 modified: auth.css'], after: [] },
      { label: 'Stash', before: [], after: ['📦 stash@{0}: WIP: login feature'] },
    ],
    code: `git stash              # save changes
git stash list         # see all stashes
git stash pop          # restore latest stash
git stash apply stash@{1}  # restore specific stash
git stash drop         # delete stash without restoring`,
  },
  rebase: {
    label: 'git rebase',
    icon: '🔄',
    color: '#61AFEF',
    desc: 'Reapply your commits on top of another base commit. Creates a clean linear history instead of a merge commit.',
    steps: [
      { label: 'Before (diverged)', before: ['main: A→B→C', 'feature: A→B→X→Y'], after: [] },
      { label: 'After rebase', before: [], after: ['main: A→B→C', 'feature: A→B→C→X\'→Y\''] },
    ],
    code: `git checkout feature/login
git rebase main        # reapply on top of main

# Interactive rebase (squash, reword, drop)
git rebase -i HEAD~3   # edit last 3 commits`,
  },
  cherrypick: {
    label: 'git cherry-pick',
    icon: '🍒',
    color: '#C678DD',
    desc: 'Apply a specific commit from one branch onto another. Useful when you only need one particular fix.',
    steps: [
      { label: 'Source branch', before: ['A → B → C(hotfix) → D'], after: [] },
      { label: 'Target branch gets C', before: [], after: ['main: X → Y → C\''] },
    ],
    code: `# Copy commit abc1234 to current branch
git cherry-pick abc1234

# Cherry-pick a range
git cherry-pick abc1234..def5678

# Cherry-pick without committing
git cherry-pick abc1234 --no-commit`,
  },
  reset: {
    label: 'git reset',
    icon: '⏪',
    color: '#E06C75',
    desc: 'Move HEAD backwards to undo commits. Three modes: soft, mixed, hard. Use with care.',
    steps: [
      { label: 'Before: committed', before: ['Commit A → B → C (HEAD)'], after: [] },
      { label: 'After reset', before: [], after: ['--soft: A → B (changes staged)', '--mixed: A → B (changes unstaged)', '--hard: A → B (changes LOST ⚠️)'] },
    ],
    code: `git reset --soft HEAD~1   # undo commit, keep staged
git reset --mixed HEAD~1  # undo commit, unstage changes
git reset --hard HEAD~1   # undo commit + discard changes ⚠️

# Safe alternative to hard reset
git revert HEAD           # creates new "undo" commit`,
  },
};

const GitAdvancedCommandsVisualization = () => {
  const [active, setActive] = useState('stash');
  const [showAfter, setShowAfter] = useState(false);

  const cmd = COMMANDS[active];

  const changeCmd = (key) => { setActive(key); setShowAfter(false); };

  return (
    <div className="gitac-wrap">
      <header className="gitac-head">
        <span className="gitac-badge">Git</span>
        <h2>Advanced Git Commands</h2>
        <p>stash · rebase · cherry-pick · reset</p>
      </header>

      {/* Command Tabs */}
      <div className="gitac-cmd-tabs">
        {Object.entries(COMMANDS).map(([key, { label, icon, color }]) => (
          <button
            key={key}
            className={`gitac-cmd-tab ${active === key ? 'gitac-cmd-tab--on' : ''}`}
            style={{ '--cc': color }}
            onClick={() => changeCmd(key)}
          >
            <span className="gitac-tab-icon">{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="gitac-grid">
        {/* Before/After */}
        <div className="gitac-panel">
          <h3>Before &amp; After</h3>
          <p className="gitac-desc">{cmd.desc}</p>

          <div className="gitac-before-after">
            <div className={`gitac-state ${!showAfter ? 'gitac-state--active' : ''}`}>
              <div className="gitac-state-head">Before</div>
              {cmd.steps[0].before.map((line, i) => (
                <div key={i} className="gitac-state-line">{line}</div>
              ))}
            </div>
            <button className="gitac-run-btn" style={{ borderColor: cmd.color, color: cmd.color }} onClick={() => setShowAfter(true)}>
              Run {cmd.label} →
            </button>
            <div className={`gitac-state ${showAfter ? 'gitac-state--active' : 'gitac-state--dim'}`} style={{ borderColor: showAfter ? cmd.color : undefined }}>
              <div className="gitac-state-head" style={{ color: showAfter ? cmd.color : undefined }}>After</div>
              {cmd.steps[1].after.map((line, i) => (
                <div key={i} className={`gitac-state-line ${line.includes('⚠️') ? 'gitac-state-line--warn' : ''}`}>{line}</div>
              ))}
              {!showAfter && <div className="gitac-state-placeholder">Run the command →</div>}
            </div>
          </div>
        </div>

        {/* Code */}
        <div className="gitac-panel">
          <h3>Full Syntax</h3>
          <pre className="gitac-code"><code>{cmd.code}</code></pre>

          {active === 'reset' && (
            <div className="gitac-warning">
              <strong>⚠️ git reset --hard</strong> permanently discards changes. Use <code>git revert</code> for a safer alternative that preserves history.
            </div>
          )}
          {active === 'rebase' && (
            <div className="gitac-tip">
              <strong>💡 Golden rule:</strong> Never rebase branches that others are working on. Only rebase your own local/private branches.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GitAdvancedCommandsVisualization;
