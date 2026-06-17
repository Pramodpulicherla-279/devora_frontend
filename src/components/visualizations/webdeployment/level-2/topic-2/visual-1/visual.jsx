import { useState } from 'react';
import './visual.css';

const STEPS = [
  { cmd: 'firebase login', desc: 'Authenticate the CLI with your Google account' },
  { cmd: 'firebase init hosting', desc: 'Pick a project, set public dir to "dist"' },
  { cmd: 'configure firebase.json', desc: 'SPA rewrite: all routes → /index.html' },
  { cmd: 'npm run build', desc: 'Produce the dist/ folder Vite generates' },
  { cmd: 'firebase deploy', desc: 'Upload dist/ → live at your-app.web.app' },
];

export default function DepFirebaseVisualization() {
  const [done, setDone] = useState(Array(STEPS.length).fill(false));
  const [sel, setSel] = useState(0);
  const allDone = done.every(Boolean);

  const toggle = (i) => setDone(d => d.map((v, j) => j === i ? !v : v));

  return (
    <div className="depfb-wrap">
      <h3 className="depfb-title">Firebase Hosting Deploy</h3>
      <p className="depfb-sub">Five commands to ship a static SPA</p>

      <div className="depfb-steps">
        {STEPS.map((s, i) => (
          <div key={i} className={`depfb-step ${sel === i ? 'depfb-step-sel' : ''}`} onClick={() => setSel(i)}>
            <button className={`depfb-check ${done[i] ? 'depfb-check-on' : ''}`}
              onClick={(e) => { e.stopPropagation(); toggle(i); }}>{done[i] ? '✓' : ''}</button>
            <code className="depfb-cmd">{s.cmd}</code>
          </div>
        ))}
      </div>

      <div className="depfb-detail">{STEPS[sel].desc}</div>

      {allDone && <div className="depfb-live">🎉 Deployed: <code>https://your-app.web.app</code></div>}

      <div className="depfb-config-label">firebase.json — the critical SPA rewrite</div>
      <pre className="depfb-code">{`{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      { "source": "**", "destination": "/index.html" }
    ]
  }
}`}</pre>
      <p className="depfb-note">Without the rewrite, refreshing on <code>/dashboard</code> returns a 404 — the server has no such file; React Router needs index.html for every route.</p>
    </div>
  );
}
