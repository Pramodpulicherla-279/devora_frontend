import { useState } from 'react';
import './visual.css';

const layers = [
  { cmd: 'FROM', value: 'python:3.11-slim', color: '#56d364', desc: 'Base image — OS + Python runtime already installed.' },
  { cmd: 'COPY', value: 'requirements.txt .', color: '#3fb950', desc: 'Copy dependency list before installing (layer caching).' },
  { cmd: 'RUN', value: 'pip install -r requirements.txt', color: '#2ea043', desc: 'Install packages — this layer is cached if requirements.txt unchanged.' },
  { cmd: 'COPY', value: '. /app', color: '#388bfd', desc: 'Copy your app source code into the image.' },
  { cmd: 'EXPOSE', value: '8000', color: '#d2a8ff', desc: 'Document the port the container listens on (doesn\'t publish it).' },
  { cmd: 'CMD', value: '["uvicorn", "main:app", "--host", "0.0.0.0"]', color: '#f97316', desc: 'Default command when the container starts.' },
];

export default function MlopsDockerVisualization() {
  const [active, setActive] = useState(null);
  const [phase, setPhase] = useState(0);

  const phases = ['Dockerfile', 'Build → Image', 'Run → Container'];

  return (
    <div className="mlopsdocker-container">
      <h3 className="mlopsdocker-title">Containerizing Models with Docker</h3>

      <div className="mlopsdocker-tabs">
        {phases.map((p, i) => (
          <button key={i} className={`mlopsdocker-tab ${phase === i ? 'mlopsdocker-tab--active' : ''}`} onClick={() => setPhase(i)}>{p}</button>
        ))}
      </div>

      {phase === 0 && (
        <div className="mlopsdocker-layers">
          {layers.map((l, i) => (
            <div key={i} className={`mlopsdocker-layer ${active === i ? 'mlopsdocker-layer--active' : ''}`} onClick={() => setActive(active === i ? null : i)}>
              <span className="mlopsdocker-cmd" style={{color: l.color}}>{l.cmd}</span>
              <span className="mlopsdocker-val">{l.value}</span>
            </div>
          ))}
          {active !== null && (
            <div className="mlopsdocker-desc">{layers[active].desc}</div>
          )}
          {active === null && <p className="mlopsdocker-hint">Click any layer to learn what it does.</p>}
        </div>
      )}

      {phase === 1 && (
        <div className="mlopsdocker-flow">
          <div className="mlopsdocker-flow-box mlopsdocker-flow-box--blue">
            <div className="mlopsdocker-flow-icon">📄</div>
            <div>Dockerfile</div>
          </div>
          <div className="mlopsdocker-flow-arrow">
            <code>docker build -t mymodel:v1 .</code>
          </div>
          <div className="mlopsdocker-flow-box mlopsdocker-flow-box--green">
            <div className="mlopsdocker-flow-icon">🖼️</div>
            <div>Image <span className="mlopsdocker-tag">mymodel:v1</span></div>
          </div>
          <p className="mlopsdocker-note">Image = frozen snapshot of your code + deps + OS. Push to Docker Hub or ECR to share.</p>
        </div>
      )}

      {phase === 2 && (
        <div className="mlopsdocker-flow">
          <div className="mlopsdocker-flow-box mlopsdocker-flow-box--green">
            <div className="mlopsdocker-flow-icon">🖼️</div>
            <div>Image <span className="mlopsdocker-tag">mymodel:v1</span></div>
          </div>
          <div className="mlopsdocker-flow-arrow">
            <code>docker run -p 8000:8000 mymodel:v1</code>
          </div>
          <div className="mlopsdocker-flow-box mlopsdocker-flow-box--accent">
            <div className="mlopsdocker-flow-icon">📦</div>
            <div>Container</div>
            <div className="mlopsdocker-tag">localhost:8000</div>
          </div>
          <p className="mlopsdocker-note">Container = running instance of an image. Isolated process, same code everywhere.</p>
        </div>
      )}
    </div>
  );
}
