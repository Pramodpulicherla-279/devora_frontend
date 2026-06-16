import { useState } from 'react';
import './visual.css';

const GLOBAL = { x: 10, greeting: '"hello"' };

const frames = [
  {
    name: 'global',
    color: '#6b7785',
    vars: GLOBAL,
    code: 'x = 10\ngreeting = "hello"\n\ndef add(a, b):\n    ...\ndef greet(name):\n    ...',
  },
  {
    name: 'add(3, 7)',
    color: '#58a6ff',
    vars: { a: 3, b: 7, result: 10 },
    code: 'def add(a, b):\n    result = a + b   # 10\n    return result',
  },
  {
    name: 'greet("Alice")',
    color: '#a78bfa',
    vars: { name: '"Alice"', msg: '"hello, Alice"' },
    code: 'def greet(name):\n    msg = greeting + ", " + name\n    return msg',
  },
];

export default function PyMathFunctionsVisualization() {
  const [stack, setStack] = useState([frames[0]]);
  const [returned, setReturned] = useState(null);

  const push = (frame) => {
    setStack(s => [...s, frame]);
    setReturned(null);
  };
  const pop = () => {
    if (stack.length > 1) {
      const top = stack[stack.length - 1];
      setReturned(`${top.name} returned`);
      setStack(s => s.slice(0, -1));
    }
  };

  return (
    <div className="pymfuncs-root">
      <h3 className="pymfuncs-title">Call Stack Visualizer</h3>
      <div className="pymfuncs-body">
        <div className="pymfuncs-stack-col">
          <div className="pymfuncs-stack-label">Call Stack (top = current)</div>
          <div className="pymfuncs-stack">
            {[...stack].reverse().map((f, i) => (
              <div key={i} className="pymfuncs-frame" style={{ borderColor: f.color }}>
                <span className="pymfuncs-frame-name" style={{ color: f.color }}>{f.name}</span>
                <div className="pymfuncs-vars">
                  {Object.entries(f.vars).map(([k, v]) => (
                    <div key={k} className="pymfuncs-var">
                      <span className="pymfuncs-var-name">{k}</span>
                      <span className="pymfuncs-var-val">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {returned && <div className="pymfuncs-returned">↩ {returned}</div>}
        </div>
        <div className="pymfuncs-code-col">
          <pre className="pymfuncs-code">{stack[stack.length - 1].code}</pre>
          <div className="pymfuncs-btns">
            {frames.slice(1).map((f, i) => (
              <button key={i} className="pymfuncs-btn" style={{ '--fc': f.color }}
                onClick={() => push(f)} disabled={stack.find(s => s.name === f.name)}>
                call {f.name}
              </button>
            ))}
            <button className="pymfuncs-btn pymfuncs-btn--pop" onClick={pop} disabled={stack.length <= 1}>
              return ↩
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
