import { useState } from 'react';
import './visual.css';

const STAGES = [
  { id: 'push', label: 'Push to main', icon: '📤', yaml: `on:
  push:
    branches: [main]`, desc: 'A push to main triggers the whole workflow.' },
  { id: 'build', label: 'Build frontend', icon: '🏗️', yaml: `  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build`, desc: 'Install deps and produce the dist/ bundle.' },
  { id: 'test', label: 'Run tests', icon: '🧪', yaml: `  test:
    needs: build
    steps:
      - run: npm test -- --run`, desc: 'Tests must pass before anything deploys.' },
  { id: 'backend', label: 'Deploy backend', icon: '🚀', yaml: `  deploy-api:
    needs: test
    steps:
      - run: curl -X POST $RENDER_DEPLOY_HOOK`, desc: 'Trigger Render to redeploy the API.' },
  { id: 'frontend', label: 'Deploy frontend', icon: '🔥', yaml: `  deploy-web:
    needs: test
    steps:
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          channelId: live`, desc: 'Publish dist/ to Firebase Hosting.' },
];

export default function DepGhActionsVisualization() {
  const [active, setActive] = useState(0);
  const s = STAGES[active];

  return (
    <div className="depgh-wrap">
      <h3 className="depgh-title">Full-Stack CI/CD with GitHub Actions</h3>
      <p className="depgh-sub">Click a stage to see its YAML and where it sits in the pipeline</p>

      <div className="depgh-flow">
        {STAGES.map((st, i) => (
          <div key={st.id} className="depgh-stage-wrap">
            <button className={`depgh-stage ${active === i ? 'depgh-stage-active' : ''}`} onClick={() => setActive(i)}>
              <span className="depgh-stage-icon">{st.icon}</span>
              <span className="depgh-stage-label">{st.label}</span>
            </button>
            {i < STAGES.length - 1 && <span className="depgh-arrow">{i === 2 ? '⇊' : '→'}</span>}
          </div>
        ))}
      </div>

      <div className="depgh-detail">
        <div className="depgh-detail-head">{s.icon} {s.label}</div>
        <div className="depgh-detail-desc">{s.desc}</div>
        <pre className="depgh-code">{s.yaml}</pre>
      </div>

      <p className="depgh-note">💡 <code>needs:</code> creates dependencies — deploy jobs wait for tests. Backend &amp; frontend deploy in parallel once tests pass.</p>
    </div>
  );
}
