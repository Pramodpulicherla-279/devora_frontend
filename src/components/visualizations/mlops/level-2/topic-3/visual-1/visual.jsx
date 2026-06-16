import { useState } from 'react';
import './visual.css';

const STAGES = [
  {
    id: 'push', label: 'Code Push', icon: '📤',
    color: '#56d364',
    yaml: `on: [push]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pip install ruff && ruff check .`,
    desc: 'A git push to main triggers the pipeline. Lint and unit tests run first — fast feedback loop.',
    gate: null,
  },
  {
    id: 'test', label: 'Lint / Tests', icon: '🧪',
    color: '#56d364',
    yaml: `  test:
    needs: lint
    steps:
      - run: pytest tests/ -v --cov=src
      - run: coverage report --fail-under=80`,
    desc: 'Unit tests run with coverage gate at 80%. Any failure stops the pipeline here.',
    gate: 'Coverage ≥ 80%',
  },
  {
    id: 'docker', label: 'Build Docker', icon: '🐳',
    color: '#56d364',
    yaml: `  build:
    needs: test
    steps:
      - uses: docker/build-push-action@v5
        with:
          tags: myregistry/model-api:\${{ github.sha }}
          push: true`,
    desc: 'Docker image built and pushed to registry with the commit SHA as tag.',
    gate: null,
  },
  {
    id: 'eval', label: 'Model Eval', icon: '📊',
    color: '#f97316',
    yaml: `  eval:
    needs: build
    steps:
      - run: python evaluate.py --model $IMAGE
      - run: |
          if [ "$ACCURACY" -lt "85" ]; then
            echo "Accuracy below threshold" && exit 1
          fi`,
    desc: 'Model is evaluated on a holdout set. Pipeline fails if accuracy drops below threshold.',
    gate: 'Accuracy ≥ 85%',
  },
  {
    id: 'staging', label: 'Staging', icon: '🔬',
    color: '#818cf8',
    yaml: `  staging:
    needs: eval
    environment: staging
    steps:
      - run: kubectl set image deploy/model \\
          model=$IMAGE --namespace=staging
      - run: python smoke_tests.py --env staging`,
    desc: 'Deploy to staging and run smoke tests against the live endpoint.',
    gate: 'Smoke tests pass',
  },
  {
    id: 'prod', label: 'Production', icon: '🚀',
    color: '#818cf8',
    yaml: `  production:
    needs: staging
    environment: production
    steps:
      - run: kubectl set image deploy/model \\
          model=$IMAGE --namespace=prod
      # Blue-green or canary rollout`,
    desc: 'Blue-green deploy to production. Rollback is a single kubectl command.',
    gate: 'Manual approval',
  },
];

export default function MlopsCicdVisualization() {
  const [active, setActive] = useState(0);
  const s = STAGES[active];

  return (
    <div className="mlopscicd-wrap">
      <h3 className="mlopscicd-title">CI/CD Pipeline for Machine Learning</h3>
      <p className="mlopscicd-sub">Click a stage to see its GitHub Actions YAML and gate condition</p>
      <div className="mlopscicd-pipeline">
        {STAGES.map((stage, i) => (
          <div key={stage.id} className="mlopscicd-step-wrap">
            <button
              className={`mlopscicd-step ${active === i ? 'mlopscicd-step-active' : ''}`}
              style={active === i ? { borderColor: stage.color, background: stage.color + '15' } : {}}
              onClick={() => setActive(i)}>
              <span className="mlopscicd-icon">{stage.icon}</span>
              <span className="mlopscicd-step-label" style={active === i ? { color: stage.color } : {}}>{stage.label}</span>
              {stage.gate && <span className="mlopscicd-gate-icon" title={stage.gate}>🔒</span>}
            </button>
            {i < STAGES.length - 1 && <div className="mlopscicd-arrow">→</div>}
          </div>
        ))}
      </div>
      <div className="mlopscicd-detail" style={{ borderTopColor: s.color }}>
        <div className="mlopscicd-detail-row">
          <span className="mlopscicd-icon">{s.icon}</span>
          <span className="mlopscicd-detail-name" style={{ color: s.color }}>{s.label}</span>
          {s.gate && <span className="mlopscicd-gate-badge" style={{ borderColor: s.color, color: s.color }}>Gate: {s.gate}</span>}
        </div>
        <pre className="mlopscicd-yaml">{s.yaml}</pre>
        <div className="mlopscicd-desc">{s.desc}</div>
      </div>
    </div>
  );
}
