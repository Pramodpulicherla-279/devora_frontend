import { useState } from 'react';
import './visual.css';

const STEPS = [
  { label: 'Epoch Loop', code: 'for epoch in range(num_epochs):', color: '#a78bfa' },
  { label: 'Batch Loop', code: 'for X, y in dataloader:', color: '#58a6ff' },
  { label: 'Forward Pass', code: 'pred = model(X)', color: '#56d364' },
  { label: 'Compute Loss', code: 'loss = criterion(pred, y)', color: '#f97316' },
  { label: 'Backward', code: 'optimizer.zero_grad(); loss.backward()', color: '#f85149' },
  { label: 'Update Weights', code: 'optimizer.step()', color: '#a78bfa' },
];

const LR_SCHEDULES = {
  Constant: (epoch) => 0.01,
  'Step Decay': (epoch) => 0.01 * Math.pow(0.5, Math.floor(epoch / 10)),
  'Cosine Annealing': (epoch) => 0.01 * 0.5 * (1 + Math.cos(Math.PI * epoch / 30)),
};

const EPOCHS = 30;
const W = 320, H = 120;
const xScale = (e) => 20 + (e / EPOCHS) * (W - 40);
const yScale = (lr) => H - 10 - (lr / 0.011) * (H - 20);

export default function NnTrainingLoopsVisualization() {
  const [tab, setTab] = useState(0);
  const [active, setActive] = useState(null);

  const buildPath = (fn) =>
    Array.from({ length: EPOCHS + 1 }, (_, e) => `${xScale(e)},${yScale(fn(e))}`).join(' ');

  return (
    <div className="nntrain-root">
      <div className="nntrain-tabs">
        {['Loop Anatomy', 'LR Schedules'].map((t, i) => (
          <button key={t} className={`nntrain-tab${tab === i ? ' nntrain-tab--active' : ''}`} onClick={() => setTab(i)}>{t}</button>
        ))}
      </div>

      {tab === 0 && (
        <div className="nntrain-panel">
          <div className="nntrain-steps">
            {STEPS.map((s, i) => (
              <div key={i} className={`nntrain-step${active === i ? ' nntrain-step--active' : ''}`} style={{ '--sc': s.color }} onClick={() => setActive(active === i ? null : i)}>
                <div className="nntrain-step-num" style={{ background: s.color }}>{i + 1}</div>
                <div className="nntrain-step-label">{s.label}</div>
              </div>
            ))}
          </div>
          {active !== null && (
            <pre className="nntrain-code">{STEPS[active].code}</pre>
          )}
        </div>
      )}

      {tab === 1 && (
        <div className="nntrain-panel">
          <svg className="nntrain-svg" viewBox={`0 0 ${W} ${H + 30}`}>
            <line x1="20" y1={H - 10} x2={W - 10} y2={H - 10} stroke="#30363d" strokeWidth="1" />
            <line x1="20" y1="10" x2="20" y2={H - 10} stroke="#30363d" strokeWidth="1" />
            <text x={W / 2} y={H + 22} textAnchor="middle" fill="#6b7785" fontSize="10">Epoch</text>
            <text x="8" y={H / 2} textAnchor="middle" fill="#6b7785" fontSize="10" transform={`rotate(-90,8,${H / 2})`}>LR</text>
            {Object.entries(LR_SCHEDULES).map(([name, fn], i) => {
              const colors = ['#a78bfa', '#58a6ff', '#56d364'];
              return (
                <g key={name}>
                  <polyline points={buildPath(fn)} fill="none" stroke={colors[i]} strokeWidth="2" />
                  <text x={xScale(EPOCHS) - 5} y={yScale(fn(EPOCHS)) - 5} fill={colors[i]} fontSize="9" textAnchor="end">{name}</text>
                </g>
              );
            })}
          </svg>
        </div>
      )}
    </div>
  );
}
