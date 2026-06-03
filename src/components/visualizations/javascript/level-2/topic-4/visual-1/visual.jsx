import React, { useState, useEffect } from 'react';
import './visual.css';

const THIS_SCENARIOS = {
  regular: {
    label: 'Regular Function',
    code: `const user = {
  name: "Alice",
  greet: function() {
    console.log(this.name); // "Alice" ✓
  },
  delayed: function() {
    setTimeout(function() {
      console.log(this.name); // undefined ✗
    }, 1000);
  }
};`,
    thisValue: 'Depends on how the function is called',
    color: '#E06C75',
    note: 'Inside a method: this = the object. Inside a nested function / callback: this = undefined (strict) or window.',
  },
  arrow: {
    label: 'Arrow Function',
    code: `const user = {
  name: "Alice",
  greet: () => {
    console.log(this.name); // undefined ✗
  },
  delayed: function() {
    setTimeout(() => {
      console.log(this.name); // "Alice" ✓
    }, 1000);
  }
};`,
    thisValue: 'Lexical — inherited from surrounding scope',
    color: '#98C379',
    note: 'Arrow functions capture this from where they were DEFINED, not where they are called. Perfect for callbacks!',
  },
};

const TIMER_STEPS = [
  { ms: 0, label: 'setTimeout(fn, 2000) called', color: '#61AFEF' },
  { ms: 500, label: 'Other code runs (non-blocking)', color: '#F7DF1E' },
  { ms: 1000, label: 'More synchronous code', color: '#F7DF1E' },
  { ms: 2000, label: 'Timer fires → callback executes', color: '#56d364' },
];

const JsThisArrowAsyncVisualization = () => {
  const [scene, setScene] = useState('regular');
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerStep, setTimerStep] = useState(-1);
  const [tryMode, setTryMode] = useState(false);

  useEffect(() => {
    if (!timerRunning) return;
    let s = 0;
    setTimerStep(0);
    const id = setInterval(() => {
      s++;
      if (s >= TIMER_STEPS.length) { clearInterval(id); setTimerRunning(false); return; }
      setTimerStep(s);
    }, 600);
    return () => clearInterval(id);
  }, [timerRunning]);

  const sc = THIS_SCENARIOS[scene];

  const trycatchCode = `try {
  const data = JSON.parse("invalid json");
  console.log(data); // never reached
} catch (error) {
  console.log("Caught:", error.message);
  // → Caught: Unexpected token i…
} finally {
  console.log("Always runs");
}`;

  return (
    <div className="jsta-wrap">
      <header className="jsta-head">
        <span className="jsta-badge">JS</span>
        <h2>'this', Arrow Functions &amp; Async Timers</h2>
      </header>

      <div className="jsta-grid">
        {/* ─── this panel ─── */}
        <div className="jsta-panel">
          <h3>Understanding <code>this</code></h3>
          <div className="jsta-tabs">
            {Object.entries(THIS_SCENARIOS).map(([key, { label }]) => (
              <button
                key={key}
                className={`jsta-tab ${scene === key ? 'jsta-tab--on' : ''}`}
                onClick={() => setScene(key)}
              >{label}</button>
            ))}
          </div>

          <div className="jsta-this-badge" style={{ background: sc.color + '22', borderColor: sc.color }}>
            <span className="jsta-this-label">this =</span>
            <span className="jsta-this-val" style={{ color: sc.color }}>{sc.thisValue}</span>
          </div>

          <pre className="jsta-code"><code>{sc.code}</code></pre>
          <p className="jsta-note">{sc.note}</p>
        </div>

        {/* ─── Timer + Try/Catch ─── */}
        <div className="jsta-panel">
          <h3>Async Timers</h3>
          <p className="jsta-sub">setTimeout is non-blocking — JS continues while waiting.</p>
          <div className="jsta-timeline">
            {TIMER_STEPS.map((step, idx) => (
              <div
                key={idx}
                className={`jsta-tstep ${timerStep >= idx ? 'jsta-tstep--on' : ''}`}
                style={{ '--sc': step.color }}
              >
                <div className="jsta-tstep-dot" />
                <div className="jsta-tstep-info">
                  <span className="jsta-tstep-ms">{step.ms}ms</span>
                  <span className="jsta-tstep-label">{step.label}</span>
                </div>
              </div>
            ))}
          </div>
          <button
            className="jsta-btn"
            onClick={() => { setTimerStep(-1); setTimerRunning(true); }}
            disabled={timerRunning}
          >
            {timerRunning ? 'Running…' : timerStep >= 0 ? 'Replay' : 'Run setTimeout'}
          </button>

          <div className="jsta-trycatch">
            <div className="jsta-trycatch-head">
              <h3>Error Handling</h3>
              <button
                className={`jsta-toggle ${tryMode ? 'jsta-toggle--on' : ''}`}
                onClick={() => setTryMode(!tryMode)}
              >
                {tryMode ? 'Hide error' : 'Show error'}
              </button>
            </div>
            {tryMode && (
              <>
                <pre className="jsta-code"><code>{trycatchCode}</code></pre>
                <div className="jsta-error-badge">
                  <span className="jsta-err">Caught: Unexpected token…</span>
                  <span className="jsta-fin">Always runs</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsThisArrowAsyncVisualization;
