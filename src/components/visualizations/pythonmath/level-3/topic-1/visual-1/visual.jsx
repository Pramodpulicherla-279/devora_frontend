import { useState } from 'react';
import './visual.css';

const modes = [
  {
    mode: 'r',
    label: 'r  — read',
    color: '#58a6ff',
    desc: 'Opens file for reading. File must exist.',
    code: `with open("data.txt", "r") as f:\n    content = f.read()\n    # or: f.readlines()`,
    fileAction: 'READ',
  },
  {
    mode: 'w',
    label: 'w  — write',
    color: '#f97316',
    desc: 'Creates or OVERWRITES the file. Data is lost!',
    code: `with open("output.txt", "w") as f:\n    f.write("Hello\\n")\n    f.write("World")`,
    fileAction: 'OVERWRITE',
  },
  {
    mode: 'a',
    label: 'a  — append',
    color: '#56d364',
    desc: 'Adds to end of file. Creates if not exists.',
    code: `with open("log.txt", "a") as f:\n    f.write("2024-01-01: event\\n")`,
    fileAction: 'APPEND',
  },
  {
    mode: 'rb',
    label: 'rb  — read binary',
    color: '#a78bfa',
    desc: 'Reads raw bytes. Used for images, PDFs, models.',
    code: `with open("model.pkl", "rb") as f:\n    import pickle\n    model = pickle.load(f)`,
    fileAction: 'READ BYTES',
  },
];

const files = ['data.txt', 'output.txt', 'log.txt', 'model.pkl'];

export default function PyMathFileVisualization() {
  const [active, setActive] = useState(0);
  const m = modes[active];

  return (
    <div className="pymfile-root">
      <h3 className="pymfile-title">File I/O Modes</h3>
      <div className="pymfile-body">
        <div className="pymfile-left">
          <div className="pymfile-tabs">
            {modes.map((mo, i) => (
              <button key={mo.mode} className={`pymfile-tab ${i === active ? 'pymfile-tab--active' : ''}`}
                style={{ '--mc': mo.color }} onClick={() => setActive(i)}>
                <code>{mo.mode}</code>
              </button>
            ))}
          </div>
          <div className="pymfile-label" style={{ color: m.color }}>{m.label}</div>
          <p className="pymfile-desc">{m.desc}</p>
          <pre className="pymfile-code" style={{ borderColor: m.color }}>{m.code}</pre>
        </div>
        <div className="pymfile-right">
          <div className="pymfile-fs-label">Filesystem</div>
          <div className="pymfile-fs">
            {files.map(f => (
              <div key={f} className={`pymfile-file ${f === (active === 0 ? 'data.txt' : active === 1 ? 'output.txt' : active === 2 ? 'log.txt' : 'model.pkl') ? 'pymfile-file--active' : ''}`}
                style={{ '--mc': m.color }}>
                <span className="pymfile-file-icon">📄</span>
                <span className="pymfile-file-name">{f}</span>
                {f === (active === 0 ? 'data.txt' : active === 1 ? 'output.txt' : active === 2 ? 'log.txt' : 'model.pkl') && (
                  <span className="pymfile-action" style={{ color: m.color }}>{m.fileAction}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
