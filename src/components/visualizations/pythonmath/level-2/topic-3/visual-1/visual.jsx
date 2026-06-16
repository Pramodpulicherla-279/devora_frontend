import { useState, useEffect, useRef } from 'react';
import './visual.css';

const ITEMS = ['alpha', 'beta', 'gamma', 'delta', 'epsilon'];

const tabs = [
  {
    label: 'for loop',
    code: (i) => `for i, item in enumerate(items):\n    # i=${i}, item="${ITEMS[i]}"`,
  },
  {
    label: 'while loop',
    code: (i) => `i = 0\nwhile i < len(items):\n    # items[${i}] = "${ITEMS[i]}"\n    i += 1`,
  },
  {
    label: 'enumerate',
    code: (i) => `for idx, val in enumerate(items):\n    print(f"{idx}: {val}")\n# now: ${i}, "${ITEMS[i]}"`,
  },
  {
    label: 'zip',
    code: (i) => `keys = ["a","b","c","d","e"]\nfor k, v in zip(keys, items):\n    # k="${'abcde'[i]}", v="${ITEMS[i]}"`,
  },
];

export default function PyMathLoopsVisualization() {
  const [tab, setTab] = useState(0);
  const [cur, setCur] = useState(0);
  const [running, setRunning] = useState(false);
  const timer = useRef(null);

  const step = () => setCur(c => (c + 1) % ITEMS.length);

  useEffect(() => {
    if (running) {
      timer.current = setInterval(step, 800);
    } else {
      clearInterval(timer.current);
    }
    return () => clearInterval(timer.current);
  }, [running]);

  return (
    <div className="pymloops-root">
      <h3 className="pymloops-title">Loop Animation</h3>
      <div className="pymloops-tabs">
        {tabs.map((t, i) => (
          <button key={t.label} className={`pymloops-tab ${tab === i ? 'pymloops-tab--active' : ''}`}
            onClick={() => setTab(i)}>{t.label}</button>
        ))}
      </div>
      <div className="pymloops-items">
        {ITEMS.map((item, i) => (
          <div key={item} className={`pymloops-item ${i === cur ? 'pymloops-item--active' : ''}`}>
            <span className="pymloops-item-idx">[{i}]</span>
            <span className="pymloops-item-val">"{item}"</span>
            {i === cur && <span className="pymloops-pointer">◀</span>}
          </div>
        ))}
      </div>
      <pre className="pymloops-code">{tabs[tab].code(cur)}</pre>
      <div className="pymloops-controls">
        <button className="pymloops-btn" onClick={() => setCur(c => (c - 1 + ITEMS.length) % ITEMS.length)}>← Prev</button>
        <button className={`pymloops-btn pymloops-btn--run ${running ? 'pymloops-btn--stop' : ''}`}
          onClick={() => setRunning(r => !r)}>
          {running ? '⏸ Pause' : '▶ Run'}
        </button>
        <button className="pymloops-btn" onClick={() => setCur(c => (c + 1) % ITEMS.length)}>Next →</button>
      </div>
    </div>
  );
}
