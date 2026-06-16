import { useState } from 'react';
import './visual.css';

const types = [
  {
    name: 'int', color: '#f97316',
    memory: '28 bytes (CPython)',
    example: 'age = 25\ncount = -3\nbig = 10_000_000',
    ops: ['+  →  int', '-  →  int', '*  →  int', '/  →  float', '//  →  int', '%  →  int', '**  →  int'],
    note: 'Integers in Python have unlimited precision — no overflow.',
  },
  {
    name: 'float', color: '#58a6ff',
    memory: '24 bytes (64-bit IEEE 754)',
    example: 'pi = 3.14159\nrate = 0.001\nsci = 1.5e-10',
    ops: ['+  →  float', '-  →  float', '*  →  float', '/  →  float', 'round()  →  float', 'int()  →  int'],
    note: 'Floats can have tiny rounding errors: 0.1 + 0.2 ≠ 0.3.',
  },
  {
    name: 'str', color: '#a78bfa',
    memory: '49 + n bytes',
    example: 'name = "Alice"\ngreeting = \'Hi\'\nmulti = """line1\nline2"""',
    ops: ['+  →  str (concat)', '*  →  str (repeat)', 'len()  →  int', 'in  →  bool', '[i]  →  str', '[a:b]  →  str'],
    note: 'Strings are immutable — every operation returns a new string.',
  },
  {
    name: 'bool', color: '#56d364',
    memory: '28 bytes (subclass of int)',
    example: 'is_ready = True\nhas_error = False\ncheck = 5 > 3  # True',
    ops: ['and  →  bool', 'or  →  bool', 'not  →  bool', 'True == 1', 'False == 0', 'bool(0) → False'],
    note: 'True and False are just 1 and 0 — you can do True + True = 2.',
  },
  {
    name: 'None', color: '#6b7785',
    memory: '16 bytes (singleton)',
    example: 'result = None\ndef f(): pass  # returns None\nx = None',
    ops: ['x is None  →  bool', 'x is not None  →  bool', 'bool(None)  →  False'],
    note: 'None is a singleton — always check with "is", never "==".',
  },
];

export default function PyMathVarsVisualization() {
  const [active, setActive] = useState(0);
  const t = types[active];

  return (
    <div className="pymvars-root">
      <h3 className="pymvars-title">Python Type Explorer</h3>
      <div className="pymvars-tabs">
        {types.map((t, i) => (
          <button key={t.name} className={`pymvars-tab ${i === active ? 'pymvars-tab--active' : ''}`}
            style={{ '--tc': t.color }} onClick={() => setActive(i)}>
            {t.name}
          </button>
        ))}
      </div>
      <div className="pymvars-body">
        <div className="pymvars-col">
          <div className="pymvars-section-label">Example</div>
          <pre className="pymvars-code" style={{ borderColor: t.color }}>{t.example}</pre>
          <div className="pymvars-mem"><span className="pymvars-mem-label">Memory:</span> {t.memory}</div>
          <p className="pymvars-note">{t.note}</p>
        </div>
        <div className="pymvars-col">
          <div className="pymvars-section-label">Operators / conversions</div>
          <ul className="pymvars-ops">
            {t.ops.map(op => <li key={op}><code>{op}</code></li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
