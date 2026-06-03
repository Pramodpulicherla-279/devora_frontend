import React, { useState } from 'react';
import './visual.css';

const LABEL_COLORS = {
  bug: '#d73a4a', feature: '#0075ca', docs: '#0075ca',
  enhancement: '#a2eeef', question: '#d876e3', good_first_issue: '#7057ff',
};

const INITIAL_ISSUES = [
  { id: 7, title: 'Login button not working on Safari', label: 'bug', status: 'todo', assignee: 'Sam', priority: '🔴' },
  { id: 8, title: 'Add dark mode toggle', label: 'feature', status: 'inprogress', assignee: 'Ali', priority: '🟡' },
  { id: 9, title: 'Update README with setup steps', label: 'docs', status: 'todo', assignee: null, priority: '🟢' },
  { id: 10, title: 'Improve mobile nav UX', label: 'enhancement', status: 'inprogress', assignee: 'Mia', priority: '🟡' },
  { id: 11, title: 'Add unit tests for auth', label: 'good_first_issue', status: 'todo', assignee: null, priority: '🟢' },
  { id: 12, title: 'Fix typo in pricing page', label: 'bug', status: 'done', assignee: 'Sam', priority: '🟢' },
];

const COLUMNS = [
  { id: 'todo', label: '📋 To Do', color: '#7d8590' },
  { id: 'inprogress', label: '🔧 In Progress', color: '#61AFEF' },
  { id: 'done', label: '✅ Done', color: '#6cc644' },
];

const GitIssuesProjectsVisualization = () => {
  const [issues, setIssues] = useState(INITIAL_ISSUES);
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState('kanban');

  const moveIssue = (id, newStatus) => {
    setIssues(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i));
  };

  const selectedIssue = issues.find(i => i.id === selected);

  return (
    <div className="gitip-wrap">
      <header className="gitip-head">
        <span className="gitip-badge">GitHub</span>
        <h2>Issues &amp; Projects</h2>
        <p>Track bugs, features, and work as a team</p>
      </header>

      <div className="gitip-tabs">
        {[['kanban', '📊 Kanban Board'], ['issues', '📋 Issues List'], ['linking', '🔗 Linking Commits']].map(([key, label]) => (
          <button key={key} className={`gitip-tab ${activeTab === key ? 'gitip-tab--on' : ''}`} onClick={() => setActiveTab(key)}>{label}</button>
        ))}
      </div>

      {/* ── Kanban Board ── */}
      {activeTab === 'kanban' && (
        <div className="gitip-board">
          {COLUMNS.map(col => (
            <div key={col.id} className="gitip-col">
              <div className="gitip-col-head" style={{ borderColor: col.color }}>
                {col.label}
                <span className="gitip-col-count">{issues.filter(i => i.status === col.id).length}</span>
              </div>
              <div className="gitip-col-body">
                {issues.filter(i => i.status === col.id).map(issue => (
                  <div
                    key={issue.id}
                    className={`gitip-card ${selected === issue.id ? 'gitip-card--selected' : ''}`}
                    onClick={() => setSelected(selected === issue.id ? null : issue.id)}
                  >
                    <div className="gitip-card-top">
                      <span className="gitip-priority">{issue.priority}</span>
                      <span className="gitip-issue-num">#{issue.id}</span>
                    </div>
                    <p className="gitip-card-title">{issue.title}</p>
                    <div className="gitip-card-foot">
                      <span className="gitip-label" style={{ background: LABEL_COLORS[issue.label] }}>{issue.label}</span>
                      {issue.assignee && <span className="gitip-assignee">👤 {issue.assignee}</span>}
                    </div>
                    {selected === issue.id && (
                      <div className="gitip-move-btns">
                        {COLUMNS.filter(c => c.id !== col.id).map(c => (
                          <button
                            key={c.id}
                            className="gitip-move-btn"
                            style={{ borderColor: c.color, color: c.color }}
                            onClick={e => { e.stopPropagation(); moveIssue(issue.id, c.id); setSelected(null); }}
                          >Move → {c.label}</button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Issues List ── */}
      {activeTab === 'issues' && (
        <div className="gitip-issues-list">
          {issues.map(issue => (
            <div key={issue.id} className="gitip-issue-row">
              <span className="gitip-issue-icon">{issue.status === 'done' ? '✅' : '🔵'}</span>
              <div className="gitip-issue-info">
                <span className="gitip-issue-title">{issue.title}</span>
                <span className="gitip-issue-meta">#{issue.id} · <span className="gitip-label" style={{ background: LABEL_COLORS[issue.label] }}>{issue.label}</span></span>
              </div>
              <span className="gitip-issue-status" style={{ color: COLUMNS.find(c => c.id === issue.status)?.color }}>{issue.status}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Linking Commits ── */}
      {activeTab === 'linking' && (
        <div className="gitip-linking">
          <p className="gitip-link-desc">Reference or close issues directly from commit messages. GitHub automatically links and closes them.</p>
          {[
            { commit: 'git commit -m "fix: resolve login crash (closes #7)"', effect: '→ Closes issue #7 when merged to main', color: '#6cc644' },
            { commit: 'git commit -m "feat: dark mode toggle (refs #8)"', effect: '→ Mentions issue #8 without closing it', color: '#61AFEF' },
            { commit: 'git commit -m "docs: update README (fixes #9)"', effect: '→ Closes issue #9 on merge', color: '#6cc644' },
          ].map((ex, i) => (
            <div key={i} className="gitip-link-example" style={{ borderColor: ex.color }}>
              <pre className="gitip-link-code"><code>{ex.commit}</code></pre>
              <span className="gitip-link-effect" style={{ color: ex.color }}>{ex.effect}</span>
            </div>
          ))}
          <div className="gitip-keywords">
            <span className="gitip-kw-label">Magic keywords:</span>
            {['closes', 'fixes', 'resolves', 'refs'].map(k => (
              <code key={k} className="gitip-kw">{k}</code>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GitIssuesProjectsVisualization;
