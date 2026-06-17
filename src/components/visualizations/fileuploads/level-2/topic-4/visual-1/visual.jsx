import { useState } from 'react';
import './visual.css';

const ITEMS = [
  'Validate file type on the server (magic numbers, not extension)',
  'Set a strict file size limit in multer',
  'Rename files with UUIDs — never trust originalname',
  'Store files outside the web root or on cloud/CDN',
  'Scan uploads for malware where possible',
  'Serve user files from a separate domain / with attachment headers',
  'Strip EXIF & metadata from images',
  'Use HTTPS for every upload',
  'Rate-limit the upload endpoint',
  'Generate thumbnails async, not in the request',
];

export default function FuBestPracticesVisualization() {
  const [checked, setChecked] = useState(Array(ITEMS.length).fill(false));
  const score = checked.filter(Boolean).length;
  const allDone = score === ITEMS.length;

  const toggle = (i) => setChecked(c => c.map((v, j) => j === i ? !v : v));

  return (
    <div className="fubp-wrap">
      <h3 className="fubp-title">Upload Best Practices Checklist</h3>
      <p className="fubp-sub">Tick off each practice — get to 10/10 for production-ready uploads</p>

      <div className="fubp-scorebar">
        <div className="fubp-score-head">
          <span>Progress</span>
          <span className={allDone ? 'fubp-score-done' : ''}>{score}/{ITEMS.length}</span>
        </div>
        <div className="fubp-track">
          <div className="fubp-fill" style={{ width: `${(score / ITEMS.length) * 100}%` }} />
        </div>
      </div>

      {allDone && <div className="fubp-banner">🎉 Production Ready!</div>}

      <div className="fubp-list">
        {ITEMS.map((item, i) => (
          <button key={i} className={`fubp-item ${checked[i] ? 'fubp-item-on' : ''}`}
            onClick={() => toggle(i)}>
            <span className="fubp-box">{checked[i] ? '✓' : ''}</span>
            <span className="fubp-text">{item}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
