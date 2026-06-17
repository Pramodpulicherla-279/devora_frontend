import { useState } from 'react';
import './visual.css';

const MODES = {
  array: {
    label: "upload.array('photos', 10)",
    desc: 'One field, up to 10 files of the same kind.',
    files: [
      { field: 'photos', name: 'img1.jpg' },
      { field: 'photos', name: 'img2.jpg' },
      { field: 'photos', name: 'img3.jpg' },
    ],
    access: `// All files in one array
req.files          // [ {...}, {...}, {...} ]
req.files[0].originalname  // 'img1.jpg'`,
  },
  fields: {
    label: "upload.fields([{name:'avatar'},{name:'gallery'}])",
    desc: 'Multiple named fields, each with its own files.',
    files: [
      { field: 'avatar', name: 'me.jpg' },
      { field: 'gallery', name: 'g1.jpg' },
      { field: 'gallery', name: 'g2.jpg' },
    ],
    access: `// Files grouped by field name
req.files.avatar      // [ { me.jpg } ]
req.files.gallery     // [ { g1.jpg }, { g2.jpg } ]`,
  },
};

export default function FuMultipleFilesVisualization() {
  const [mode, setMode] = useState('array');
  const m = MODES[mode];

  return (
    <div className="fumulti-wrap">
      <h3 className="fumulti-title">Uploading Multiple Files</h3>
      <p className="fumulti-sub">Two multer methods for handling more than one file</p>

      <div className="fumulti-toggle">
        {Object.entries(MODES).map(([k, v]) => (
          <button key={k} className={`fumulti-tog ${mode === k ? 'fumulti-tog-active' : ''}`}
            onClick={() => setMode(k)}>{k === 'array' ? '.array()' : '.fields()'}</button>
        ))}
      </div>

      <div className="fumulti-method">{m.label}</div>
      <div className="fumulti-desc">{m.desc}</div>

      <div className="fumulti-queue">
        {m.files.map((f, i) => (
          <div key={i} className="fumulti-file" style={{ animationDelay: `${i * 0.1}s` }}>
            <span className="fumulti-file-icon">📄</span>
            <span className="fumulti-file-name">{f.name}</span>
            <span className="fumulti-file-field">{f.field}</span>
          </div>
        ))}
      </div>

      <pre className="fumulti-code">{m.access}</pre>
    </div>
  );
}
