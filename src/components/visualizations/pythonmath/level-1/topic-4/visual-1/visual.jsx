import { useState } from 'react';
import './visual.css';

const SOURCE = 'Hello, World!';

const methods = [
  {
    tab: '.upper()',
    code: `s = "${SOURCE}"\nresult = s.upper()`,
    output: SOURCE.toUpperCase(),
    note: 'Returns a new string with all characters uppercased.',
  },
  {
    tab: '.lower()',
    code: `s = "${SOURCE}"\nresult = s.lower()`,
    output: SOURCE.toLowerCase(),
    note: 'Useful for case-insensitive comparisons.',
  },
  {
    tab: '.split()',
    code: `s = "${SOURCE}"\nresult = s.split(", ")`,
    output: JSON.stringify(SOURCE.split(', ')),
    note: 'Splits into a list at every separator. Default splits on whitespace.',
  },
  {
    tab: '.strip()',
    code: `s = "  ${SOURCE}  "\nresult = s.strip()`,
    output: `"${SOURCE}"`,
    note: '.lstrip() and .rstrip() strip only one side.',
  },
  {
    tab: '.replace()',
    code: `s = "${SOURCE}"\nresult = s.replace("World", "Python")`,
    output: SOURCE.replace('World', 'Python'),
    note: 'Replace every occurrence. Pass a count arg to limit.',
  },
  {
    tab: 'f-string',
    code: `name = "Python"\nver = 3.12\nresult = f"{name} {ver:.1f}"`,
    output: 'Python 3.1',
    note: 'f-strings evaluate expressions inside {}. Format spec after :',
  },
];

export default function PyMathStringsVisualization() {
  const [active, setActive] = useState(0);
  const m = methods[active];

  return (
    <div className="pymstr-root">
      <h3 className="pymstr-title">String Methods Explorer</h3>
      <div className="pymstr-source">
        Source string: <code className="pymstr-src-code">"{SOURCE}"</code>
      </div>
      <div className="pymstr-tabs">
        {methods.map((m, i) => (
          <button key={m.tab} className={`pymstr-tab ${i === active ? 'pymstr-tab--active' : ''}`}
            onClick={() => setActive(i)}>{m.tab}</button>
        ))}
      </div>
      <div className="pymstr-panel">
        <div className="pymstr-label">Code</div>
        <pre className="pymstr-code">{m.code}</pre>
        <div className="pymstr-label">Output</div>
        <div className="pymstr-output">{m.output}</div>
        <p className="pymstr-note">{m.note}</p>
      </div>
    </div>
  );
}
