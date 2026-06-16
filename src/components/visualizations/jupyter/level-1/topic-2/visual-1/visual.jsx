import { useState } from 'react';
import './visual.css';

const TABS = ['Code Cell', 'Markdown Cell', 'Raw Cell'];

const MAGIC = [
  { cmd: '%timeit', desc: 'Time a single-line expression' },
  { cmd: '%%bash', desc: 'Run the whole cell in bash' },
  { cmd: '%matplotlib inline', desc: 'Show plots inside the notebook' },
  { cmd: '%who', desc: 'List all variables in scope' },
  { cmd: '%%writefile', desc: 'Write cell contents to a file' },
];

function CodeCell() {
  return (
    <div className="jnbcells-panel">
      <div className="jnbcells-cell-header">In [3]:</div>
      <div className="jnbcells-code">
        <span className="jnbcells-kw">import</span> numpy <span className="jnbcells-kw">as</span> np{'\n'}
        x = np.linspace(0, 10, 5){'\n'}
        <span className="jnbcells-fn">print</span>(x)
      </div>
      <div className="jnbcells-cell-header">Out [3]:</div>
      <div className="jnbcells-output">[ 0.   2.5  5.   7.5 10. ]</div>
      <p className="jnbcells-note">Press <kbd>Shift+Enter</kbd> to run. Output appears directly below the cell.</p>
    </div>
  );
}

function MarkdownCell() {
  const [rendered, setRendered] = useState(true);
  const raw = `# Section Title\n**Bold**, *italic*, \`code\`\n- Item one\n- Item two`;
  return (
    <div className="jnbcells-panel">
      <div className="jnbcells-toggle-row">
        <button className={`jnbcells-toggle ${rendered ? 'jnbcells-toggle--on' : ''}`} onClick={() => setRendered(true)}>Rendered</button>
        <button className={`jnbcells-toggle ${!rendered ? 'jnbcells-toggle--on' : ''}`} onClick={() => setRendered(false)}>Raw Markdown</button>
      </div>
      {rendered ? (
        <div className="jnbcells-rendered">
          <h3 className="jnbcells-md-h">Section Title</h3>
          <p><strong>Bold</strong>, <em>italic</em>, <code className="jnbcells-inline-code">code</code></p>
          <ul className="jnbcells-md-list"><li>Item one</li><li>Item two</li></ul>
        </div>
      ) : (
        <pre className="jnbcells-code">{raw}</pre>
      )}
      <p className="jnbcells-note">Double-click a rendered cell to edit; <kbd>Shift+Enter</kbd> to render.</p>
    </div>
  );
}

function RawCell() {
  return (
    <div className="jnbcells-panel">
      <div className="jnbcells-cell-header">Raw</div>
      <pre className="jnbcells-code jnbcells-raw">.. code-block:: python{'\n\n'}   x = 42{'\n'}   print(x)</pre>
      <p className="jnbcells-note">Raw cells pass content through unchanged — useful for Sphinx / LaTeX directives. No execution.</p>
    </div>
  );
}

const PANELS = [<CodeCell />, <MarkdownCell />, <RawCell />];

export default function JnbCellsVisualization() {
  const [tab, setTab] = useState(0);

  return (
    <div className="jnbcells-root">
      <h2 className="jnbcells-title">Cells, Markdown, and Magic</h2>
      <div className="jnbcells-tabs">
        {TABS.map((t, i) => (
          <button key={i} className={`jnbcells-tab ${i === tab ? 'jnbcells-tab--active' : ''}`} onClick={() => setTab(i)}>{t}</button>
        ))}
      </div>
      {PANELS[tab]}
      <h3 className="jnbcells-subtitle">Magic Commands</h3>
      <div className="jnbcells-magic-grid">
        {MAGIC.map(m => (
          <div key={m.cmd} className="jnbcells-magic-card">
            <code className="jnbcells-magic-cmd">{m.cmd}</code>
            <span className="jnbcells-magic-desc">{m.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
