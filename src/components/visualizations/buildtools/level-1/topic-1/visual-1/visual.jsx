/* Lesson: Why build tools exist
 * Visual type: ANIMATION
 * Reason: The core value — many source files bundled/optimized into a few
 * deliverables — is a transformation over time. Animating modules collapsing into
 * an optimized bundle shows what build tools do. */
import React, { useState, useEffect } from 'react';
import './visual.css';

const MODULES = ['app.jsx', 'utils.js', 'Button.jsx', 'api.js', 'styles.css', 'logo.svg', 'data.json'];

const BtWhyVisualization = () => {
  const [built, setBuilt] = useState(false);
  const [building, setBuilding] = useState(false);
  const run = () => { setBuilding(true); setBuilt(false); setTimeout(() => { setBuilding(false); setBuilt(true); }, 1300); };
  return (
    <div className="btwhy-wrap">
      <header className="btwhy-head">
        <span className="btwhy-badge">Build Tools</span>
        <h2>Why Build Tools Exist</h2>
        <p>Dozens of source files → a few optimized files the browser loves</p>
      </header>
      <div className="btwhy-flow">
        <div className="btwhy-modules">
          {MODULES.map((m, i) => (
            <div key={m} className={`btwhy-mod ${building ? 'btwhy-mod--building' : ''} ${built ? 'btwhy-mod--gone' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>{m}</div>
          ))}
        </div>
        <div className={`btwhy-arrow ${building || built ? 'btwhy-arrow--on' : ''}`}>⚙️→</div>
        <div className="btwhy-output">
          {built ? (
            <>
              <div className="btwhy-bundle">bundle.js <span className="btwhy-min">minified</span></div>
              <div className="btwhy-bundle">bundle.css</div>
              <div className="btwhy-bundle btwhy-bundle--small">assets/ (hashed)</div>
            </>
          ) : <div className="btwhy-placeholder">dist/</div>}
        </div>
      </div>
      <button className="btwhy-btn" onClick={run} disabled={building}>{building ? '⚙️ Building…' : built ? '↻ Rebuild' : '▶ Run build'}</button>
      <div className="btwhy-reasons">
        {[['📦', 'Bundling', 'Combine many files → fewer HTTP requests'],
          ['🗜️', 'Minification', 'Strip whitespace/comments → smaller files'],
          ['🔄', 'Transpiling', 'Modern JS/JSX/TS → browser-compatible JS'],
          ['#️⃣', 'Hashing', 'Cache-bust with content hashes in filenames']].map(([i, t, d]) => (
          <div key={t} className="btwhy-reason"><span>{i}</span><div><strong>{t}</strong><p>{d}</p></div></div>
        ))}
      </div>
    </div>
  );
};
export default BtWhyVisualization;
