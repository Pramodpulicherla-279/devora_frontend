import { useState } from 'react';
import './visual.css';

const SCAFFOLD = [
  { step: 'Understand the error', detail: 'Read the stack trace, identify the exact line and exception type.' },
  { step: 'Identify the cause', detail: 'Trace back to why the value is undefined / null / wrong.' },
  { step: 'Propose a fix', detail: 'Write the minimal change that addresses the root cause.' },
  { step: 'Verify', detail: 'Explain how to confirm the fix works (test, edge cases).' },
];

export default function CptStepByStepVisualization() {
  const [scaffold, setScaffold] = useState(true);
  const [active, setActive] = useState(0);

  return (
    <div className="cptstep-root">
      <h3 className="cptstep-title">Step-by-Step Reasoning Prompts</h3>
      <p className="cptstep-subtitle">A reasoning scaffold guides the model through a structured process</p>

      <div className="cptstep-task">
        <span className="cptstep-task-label">Task:</span> "Fix this bug: TypeError: cannot read 'map' of undefined"
      </div>

      <div className="cptstep-toggle">
        <span className="cptstep-toggle-label">Reasoning scaffold</span>
        <button className={`cptstep-tog ${scaffold ? 'cptstep-tog-on' : ''}`} onClick={() => setScaffold(s => !s)}>
          {scaffold ? 'ON' : 'OFF'}
        </button>
      </div>

      {scaffold ? (
        <div className="cptstep-scaffold">
          {SCAFFOLD.map((s, i) => (
            <button key={i} className={`cptstep-node ${active === i ? 'cptstep-node-active' : ''}`}
              onClick={() => setActive(i)}>
              <span className="cptstep-node-num">{i + 1}</span>
              <div className="cptstep-node-body">
                <div className="cptstep-node-step">{s.step}</div>
                {active === i && <div className="cptstep-node-detail">{s.detail}</div>}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="cptstep-noscaffold">
          <div className="cptstep-blob">"Add a null check."</div>
          <div className="cptstep-warn">⚠️ The model jumps to a surface fix without finding the root cause — it patches the symptom, not the bug.</div>
        </div>
      )}

      <pre className="cptstep-code">{scaffold
        ? `Debug this step by step:
1. Understand the error
2. Identify the cause
3. Propose a fix
4. Verify it works

Error: <paste here>`
        : `Fix this: <paste error>`}</pre>
    </div>
  );
}
