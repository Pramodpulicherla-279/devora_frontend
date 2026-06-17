import { useState } from 'react';
import './visual.css';

const FILES = [
  { name: 'photo.jpg', mime: 'image/jpeg', size: 2.1, ext: 'jpg' },
  { name: 'resume.pdf', mime: 'application/pdf', size: 0.8, ext: 'pdf' },
  { name: 'malware.exe', mime: 'application/x-msdownload', size: 14.0, ext: 'exe' },
  { name: 'huge.png', mime: 'image/png', size: 45.0, ext: 'png' },
];

const ALLOWED_MIME = ['image/jpeg', 'image/png', 'application/pdf'];
const ALLOWED_EXT = ['jpg', 'jpeg', 'png', 'pdf'];
const MAX_MB = 10;

export default function FuValidationVisualization() {
  const [fileIdx, setFileIdx] = useState(0);
  const [gates, setGates] = useState({ mime: true, size: true, ext: true });
  const f = FILES[fileIdx];

  const checks = {
    mime: !gates.mime || ALLOWED_MIME.includes(f.mime),
    size: !gates.size || f.size <= MAX_MB,
    ext: !gates.ext || ALLOWED_EXT.includes(f.ext),
  };
  const passed = checks.mime && checks.size && checks.ext;

  return (
    <div className="fuval-wrap">
      <h3 className="fuval-title">File Validation Pipeline</h3>
      <p className="fuval-sub">Toggle each gate, pick a test file, and see if it passes</p>

      <div className="fuval-files">
        {FILES.map((file, i) => (
          <button key={i} className={`fuval-file ${fileIdx === i ? 'fuval-file-active' : ''}`}
            onClick={() => setFileIdx(i)}>
            <span className="fuval-file-name">{file.name}</span>
            <span className="fuval-file-meta">{file.size} MB</span>
          </button>
        ))}
      </div>

      <div className="fuval-gates">
        {[
          { key: 'mime', label: 'MIME type check', detail: f.mime, ok: checks.mime, rule: `allow: ${ALLOWED_MIME.join(', ')}` },
          { key: 'size', label: 'File size check', detail: `${f.size} MB`, ok: checks.size, rule: `max: ${MAX_MB} MB` },
          { key: 'ext', label: 'Extension check', detail: `.${f.ext}`, ok: checks.ext, rule: `allow: ${ALLOWED_EXT.join(', ')}` },
        ].map(g => (
          <div key={g.key} className={`fuval-gate ${!gates[g.key] ? 'fuval-gate-off' : g.ok ? 'fuval-gate-pass' : 'fuval-gate-fail'}`}>
            <div className="fuval-gate-head">
              <span className="fuval-gate-label">{g.label}</span>
              <button className={`fuval-gate-toggle ${gates[g.key] ? 'on' : ''}`}
                onClick={() => setGates(s => ({ ...s, [g.key]: !s[g.key] }))}>
                {gates[g.key] ? 'ON' : 'OFF'}
              </button>
            </div>
            <div className="fuval-gate-rule">{g.rule}</div>
            <div className="fuval-gate-result">
              {!gates[g.key] ? <span className="fuval-skip">⊘ skipped</span>
                : g.ok ? <span className="fuval-pass">✓ {g.detail}</span>
                : <span className="fuval-fail">✗ {g.detail} rejected</span>}
            </div>
          </div>
        ))}
      </div>

      <div className={`fuval-outcome ${passed ? 'fuval-outcome-ok' : 'fuval-outcome-no'}`}>
        {passed ? `✅ ${f.name} accepted — saved to server` : `🚫 ${f.name} rejected — 400 Bad Request`}
      </div>

      <pre className="fuval-code">{`const fileFilter = (req, file, cb) => {
  const okMime = ${JSON.stringify(ALLOWED_MIME)}.includes(file.mimetype);
  if (!okMime) return cb(new Error('Invalid type'), false);
  cb(null, true);
};
multer({ fileFilter, limits: { fileSize: ${MAX_MB} * 1024 * 1024 } });`}</pre>
    </div>
  );
}
