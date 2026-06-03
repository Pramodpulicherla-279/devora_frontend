import React, { useState, useEffect, useRef } from 'react';
import './visual.css';

const SAMPLE = Array.from({ length: 12 }, (_, i) => ({ _id: i + 1, email: `user${i + 1}@x.com` }));

const INDEX_TYPES = [
  { name: 'Single Field', color: '#00ED64', desc: 'Index on one field. Most common. Speeds up queries & sorts on that field.', code: `db.users.createIndex({ email: 1 })\n// 1 = ascending, -1 = descending` },
  { name: 'Compound', color: '#61AFEF', desc: 'Index on multiple fields. Order matters! Follows the ESR rule (Equality, Sort, Range).', code: `db.users.createIndex({ role: 1, age: -1 })\n// Supports queries on role, or role+age` },
  { name: 'Text', color: '#E5C07B', desc: 'Full-text search across string fields. Enables $text queries.', code: `db.articles.createIndex({ body: "text" })\ndb.articles.find({ $text: { $search: "mongodb" } })` },
  { name: 'Unique', color: '#C678DD', desc: 'Enforces uniqueness — no two documents can share the same value.', code: `db.users.createIndex(\n  { email: 1 },\n  { unique: true }\n)` },
];

const MdbIndexesVisualization = () => {
  const [hasIndex, setHasIndex] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState(-1);
  const [done, setDone] = useState(false);
  const [activeType, setActiveType] = useState(0);
  const scanRef = useRef(null);

  const startScan = () => {
    setScanStep(-1); setDone(false); setScanning(true);
    const target = hasIndex ? 3 : SAMPLE.length;
    let i = 0;
    clearInterval(scanRef.current);
    scanRef.current = setInterval(() => {
      setScanStep(i); i++;
      if (i > target) { clearInterval(scanRef.current); setScanning(false); setDone(true); }
    }, hasIndex ? 280 : 130);
  };
  useEffect(() => () => clearInterval(scanRef.current), []);

  const scanTime = hasIndex ? '~1ms (index seek)' : `~${SAMPLE.length * 8}ms (collection scan)`;

  return (
    <div className="mdbix-wrap">
      <header className="mdbix-head">
        <span className="mdbix-badge">MongoDB</span>
        <h2>Indexes — ms vs Minutes</h2>
        <p>Without indexes, MongoDB scans every document. With them, it jumps straight to the answer.</p>
      </header>

      <div className="mdbix-grid">
        {/* Scan simulator */}
        <div className="mdbix-panel">
          <h3>Collection Scan vs Index Seek</h3>
          <div className="mdbix-toggle-row">
            <span className={!hasIndex ? 'mdbix-active' : ''}>No Index (COLLSCAN)</span>
            <button className={`mdbix-toggle ${hasIndex ? 'mdbix-toggle--on' : ''}`} onClick={() => { setHasIndex(h => !h); setScanStep(-1); setDone(false); }}>
              <span className="mdbix-knob" />
            </button>
            <span className={hasIndex ? 'mdbix-active' : ''}>Indexed (IXSCAN)</span>
          </div>

          <div className="mdbix-docs-grid">
            {SAMPLE.map((d, i) => (
              <div key={d._id} className={`mdbix-doc-chip
                ${!hasIndex && scanStep >= i ? 'mdbix-doc-chip--scanned' : ''}
                ${!hasIndex && scanStep === i ? 'mdbix-doc-chip--current' : ''}
                ${hasIndex && i === 3 && scanStep >= 3 ? 'mdbix-doc-chip--found' : ''}
                ${hasIndex && i !== 3 ? 'mdbix-doc-chip--skip' : ''}
              `}>{d._id}</div>
            ))}
          </div>

          <button className="mdbix-scan-btn" onClick={startScan} disabled={scanning}>
            {scanning ? 'Searching…' : '▶ find({ email: "user4@x.com" })'}
          </button>
          {done && (
            <div className={`mdbix-result ${hasIndex ? 'mdbix-result--fast' : 'mdbix-result--slow'}`}>
              {hasIndex ? '✓ Jumped straight to match' : `✗ Scanned all ${SAMPLE.length} docs`} — {scanTime}
            </div>
          )}
          <pre className="mdbix-code"><code>{hasIndex
            ? '// explain() shows:\n"stage": "IXSCAN"  // index scan ✓\n"totalDocsExamined": 1'
            : '// explain() shows:\n"stage": "COLLSCAN"  // full scan ✗\n"totalDocsExamined": 12'}</code></pre>
        </div>

        {/* Index types */}
        <div className="mdbix-panel">
          <h3>Index Types</h3>
          <div className="mdbix-type-tabs">
            {INDEX_TYPES.map((t, i) => (
              <button key={t.name} className={`mdbix-type-tab ${activeType === i ? 'mdbix-type-tab--on' : ''}`}
                style={{ '--ic': t.color }} onClick={() => setActiveType(i)}>{t.name}</button>
            ))}
          </div>
          <div className="mdbix-type-detail" style={{ borderColor: INDEX_TYPES[activeType].color }}>
            <p className="mdbix-type-desc">{INDEX_TYPES[activeType].desc}</p>
            <pre className="mdbix-code"><code>{INDEX_TYPES[activeType].code}</code></pre>
          </div>
          <div className="mdbix-tradeoff">
            <h3>⚖️ The trade-off</h3>
            <div className="mdbix-tradeoff-row mdbix-tradeoff-row--good">✓ Reads become dramatically faster</div>
            <div className="mdbix-tradeoff-row mdbix-tradeoff-row--bad">✗ Writes get slightly slower (index must update)</div>
            <div className="mdbix-tradeoff-row mdbix-tradeoff-row--bad">✗ Indexes consume disk &amp; RAM</div>
            <p className="mdbix-tradeoff-note">Index the fields you query/sort on most — not every field.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MdbIndexesVisualization;
