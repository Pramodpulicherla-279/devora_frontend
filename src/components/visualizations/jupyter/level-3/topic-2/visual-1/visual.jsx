import { useState } from 'react';
import './visual.css';

const PRACTICES = [
  { icon: '🧹', title: 'Clear outputs before commit', detail: 'Kernel → Restart & Clear Output. Outputs bloat the repo and cause meaningless diffs on every run.' },
  { icon: '🚫', title: 'Add .ipynb_checkpoints/ to .gitignore', detail: 'Jupyter auto-saves checkpoints here. They are temp files and should never be committed.' },
  { icon: '✂️', title: 'Use nbstripout', detail: 'pip install nbstripout → nbstripout --install. Automatically strips outputs on git add, so you never forget.' },
];

const TABLE = [
  { aspect: 'Repo size', with: '❌ Large (images, arrays)', without: '✅ Minimal' },
  { aspect: 'Diff readability', with: '❌ JSON output noise', without: '✅ Only code changes' },
  { aspect: 'Reproducibility', with: '✅ Others see results', without: '⚠️ Must run to see output' },
  { aspect: 'Merge conflicts', with: '❌ Common on output cells', without: '✅ Rare' },
];

const MOCK_NB = [
  { type: 'md', content: '# My Analysis\nLoading dataset and exploring key metrics.' },
  { type: 'code', prompt: '1', content: "import pandas as pd\ndf = pd.read_csv('data.csv')\ndf.head()" },
  { type: 'out', content: '<DataFrame with 5 rows rendered here>' },
  { type: 'code', prompt: '2', content: 'df.describe()' },
];

export default function JnbGithubVisualization() {
  const [activeRow, setActiveRow] = useState(null);

  return (
    <div className="jnbgit-root">
      <h2 className="jnbgit-title">Jupyter on GitHub</h2>
      <p className="jnbgit-sub">GitHub renders .ipynb files automatically — here's what it looks like:</p>

      <div className="jnbgit-mock-gh">
        <div className="jnbgit-gh-header">
          <span className="jnbgit-gh-repo">my-repo / analysis.ipynb</span>
          <span className="jnbgit-gh-badge">Jupyter Notebook</span>
        </div>
        <div className="jnbgit-nb-render">
          {MOCK_NB.map((cell, i) => (
            <div key={i} className={`jnbgit-cell jnbgit-cell--${cell.type}`}>
              {cell.prompt && <span className="jnbgit-prompt">In [{cell.prompt}]:</span>}
              <pre className="jnbgit-cell-content">{cell.content}</pre>
            </div>
          ))}
        </div>
      </div>

      <h3 className="jnbgit-section">Best Practices</h3>
      <div className="jnbgit-practices">
        {PRACTICES.map((p, i) => (
          <div key={i} className="jnbgit-practice">
            <span className="jnbgit-practice-icon">{p.icon}</span>
            <div>
              <div className="jnbgit-practice-title">{p.title}</div>
              <div className="jnbgit-practice-detail">{p.detail}</div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="jnbgit-section">Commit with outputs vs without</h3>
      <table className="jnbgit-table">
        <thead><tr><th>Aspect</th><th>With outputs</th><th>Without outputs</th></tr></thead>
        <tbody>{TABLE.map(r => (
          <tr key={r.aspect} className={activeRow === r.aspect ? 'jnbgit-row--active' : ''} onClick={() => setActiveRow(activeRow === r.aspect ? null : r.aspect)}>
            <td className="jnbgit-td-aspect">{r.aspect}</td>
            <td className="jnbgit-td-bad">{r.with}</td>
            <td className="jnbgit-td-good">{r.without}</td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}
