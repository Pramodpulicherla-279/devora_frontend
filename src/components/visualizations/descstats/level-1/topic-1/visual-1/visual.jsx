/* Lesson: What is statistics
 * Visual type: ILLUSTRATION
 * Reason: The opening lesson asks "do you know what these numbers actually mean?" —
 * an illustration that turns a column of raw order values into four interpretive
 * lenses (centre, spread, shape, position) frames the whole course at a glance. */
import React, { useState } from 'react';
import './visual.css';

const ORDERS = [950, 1000, 1050, 1100, 1200, 1300, 900, 8000];
const LENSES = {
  center:  { label: 'Centre',   q: 'What is a typical order?',   a: 'Mean ₹1,937 vs median ₹1,075 — the gap already hints at a big outlier.' },
  spread:  { label: 'Spread',   q: 'How consistent are orders?', a: 'Range ₹900–₹8,000. Most cluster near ₹1,000; one is 8× larger.' },
  shape:   { label: 'Shape',    q: 'Symmetric or skewed?',       a: 'Right-skewed — a long tail dragged out by the ₹8,000 order.' },
  position:{ label: 'Position', q: 'Where does a value rank?',   a: 'The ₹1,300 order sits around the 70th percentile.' },
};

const DescStatsWhatIsVisualization = () => {
  const [lens, setLens] = useState('center');
  const L = LENSES[lens];
  return (
    <div className="dswhat-wrap">
      <header className="dswhat-head">
        <span className="dswhat-badge">Statistics</span>
        <h2>What Is Statistics?</h2>
        <p>Turning raw numbers into meaning</p>
      </header>
      <div className="dswhat-body">
        <div className="dswhat-raw">
          <div className="dswhat-raw-label">Raw orders (₹)</div>
          {ORDERS.map((o, i) => (
            <div key={i} className={`dswhat-num ${o === 8000 ? 'dswhat-num--out' : ''}`}>{o.toLocaleString('en-IN')}</div>
          ))}
        </div>
        <div className="dswhat-arrow">→</div>
        <div className="dswhat-lenses">
          {Object.keys(LENSES).map((k) => (
            <button key={k} className={`dswhat-lens ${lens === k ? 'dswhat-lens--on' : ''}`} onClick={() => setLens(k)}>
              {LENSES[k].label}
            </button>
          ))}
        </div>
      </div>
      <div className="dswhat-detail">
        <strong>{L.q}</strong>
        <p>{L.a}</p>
      </div>
      <div className="dswhat-note">Statistics is the toolkit for answering these four questions. The rest of this course builds one lens at a time.</div>
    </div>
  );
};

export default DescStatsWhatIsVisualization;
