import React, { useState, useEffect, useRef } from 'react';
import './visual.css';

const ITEMS = ['🍎', '🍌', '🍇', '🍊', '🍓', '🥝', '🍑', '🍋'];

const LOOPS = {
  for: {
    label: 'for loop',
    code: (i) => `for (let i = 0; i < ${ITEMS.length}; i++) {\n  console.log(items[i]); // i = ${i}\n}`,
    desc: 'Classic loop with initializer, condition, and updater. Best when you know the exact count.',
  },
  while: {
    label: 'while loop',
    code: (i) => `let i = 0;\nwhile (i < ${ITEMS.length}) {\n  console.log(items[i]); // i = ${i}\n  i++;\n}`,
    desc: "Loops while a condition is true. Best when you don't know upfront how many times to loop.",
  },
  forEach: {
    label: 'forEach',
    code: (i) => `items.forEach((item, i) => {\n  console.log(item); // i = ${i}\n});`,
    desc: 'Array method that calls a function once per item. Clean syntax, no manual index management.',
  },
};

const JsLoopsVisualization = () => {
  const [type, setType] = useState('for');
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    setStep(0);
    setPlaying(true);
  };

  const reset = () => {
    setPlaying(false);
    setStep(-1);
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setStep((s) => {
          if (s >= ITEMS.length - 1) {
            setPlaying(false);
            return s;
          }
          return s + 1;
        });
      }, 700);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing]);

  useEffect(() => { reset(); }, [type]);

  const loop = LOOPS[type];
  const currentIndex = step;
  const isDone = step === ITEMS.length - 1 && !playing;

  return (
    <div className="jslp-wrap">
      <header className="jslp-head">
        <span className="jslp-badge">JS</span>
        <h2>Loops in JavaScript</h2>
        <p>Watch the loop iterate through an array step by step</p>
      </header>

      {/* Loop type tabs */}
      <div className="jslp-tabs">
        {Object.entries(LOOPS).map(([key, { label }]) => (
          <button
            key={key}
            className={`jslp-tab ${type === key ? 'jslp-tab--on' : ''}`}
            onClick={() => setType(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="jslp-desc">{loop.desc}</p>

      {/* Array display */}
      <div className="jslp-array">
        {ITEMS.map((item, idx) => (
          <div
            key={idx}
            className={`jslp-item
              ${idx === currentIndex ? 'jslp-item--active' : ''}
              ${idx < currentIndex ? 'jslp-item--done' : ''}
            `}
          >
            <span className="jslp-emoji">{item}</span>
            <span className="jslp-idx">[{idx}]</span>
          </div>
        ))}
      </div>

      {/* Status bar */}
      <div className="jslp-status">
        {step === -1 && <span className="jslp-status-idle">Press Run to start</span>}
        {step >= 0 && !isDone && <span className="jslp-status-run">i = {step} → processing {ITEMS[step]}</span>}
        {isDone && <span className="jslp-status-done">Loop complete! Iterated {ITEMS.length} items.</span>}
      </div>

      {/* Controls */}
      <div className="jslp-controls">
        <button className="jslp-btn jslp-btn--run" onClick={start} disabled={playing}>
          {playing ? 'Running…' : step === -1 ? 'Run' : 'Restart'}
        </button>
        <button className="jslp-btn jslp-btn--reset" onClick={reset} disabled={step === -1}>Reset</button>
      </div>

      {/* Code */}
      <pre className="jslp-code">
        <code>{loop.code(Math.max(step, 0))}</code>
      </pre>
    </div>
  );
};

export default JsLoopsVisualization;
