/* Lesson: Loops and Conditionals
 * Visual type: ANIMATION
 * Reason: A loop's flow (iterate, test condition, branch) is temporal — stepping
 * through iterations with the current item & branch highlighted shows control flow. */
import React, { useState, useEffect } from 'react';
import './visual.css';

const ITEMS = [4, 7, 2, 9, 6];

const PyLoopVisualization = () => {
  const [i, setI] = useState(-1);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    if (i >= ITEMS.length - 1) { setPlaying(false); return; }
    const t = setTimeout(() => setI((x) => x + 1), 800);
    return () => clearTimeout(t);
  }, [playing, i]);
  const cur = ITEMS[i];
  const branch = cur === undefined ? null : cur % 2 === 0 ? 'even' : 'odd';

  return (
    <div className="pyloop-wrap">
      <header className="pyloop-head">
        <span className="pyloop-badge">Python</span>
        <h2>Loops &amp; Conditionals</h2>
        <p>Iterate a sequence, branch on each item</p>
      </header>
      <pre className="pyloop-code"><code>{`for n in [4, 7, 2, 9, 6]:
    if n % 2 == 0:
        print(n, "even")
    else:
        print(n, "odd")`}</code></pre>
      <div className="pyloop-items">
        {ITEMS.map((n, idx) => (
          <div key={idx} className={`pyloop-item ${i === idx ? 'pyloop-item--on' : ''} ${i > idx ? 'pyloop-item--done' : ''}`}>{n}</div>
        ))}
      </div>
      <div className="pyloop-branches">
        <div className={`pyloop-branch pyloop-branch--even ${branch === 'even' ? 'pyloop-branch--lit' : ''}`}>n % 2 == 0 → even</div>
        <div className={`pyloop-branch pyloop-branch--odd ${branch === 'odd' ? 'pyloop-branch--lit' : ''}`}>else → odd</div>
      </div>
      <div className="pyloop-output">{i >= 0 && cur !== undefined ? `print(${cur}, "${branch}")` : 'output appears here…'}</div>
      <div className="pyloop-controls">
        <button className="pyloop-btn" onClick={() => { setI(0); setPlaying(true); }} disabled={playing}>▶ Run loop</button>
        <button className="pyloop-btn pyloop-btn--reset" onClick={() => { setI(-1); setPlaying(false); }}>Reset</button>
      </div>
      <div className="pyloop-note">Python loops iterate items directly (<code>for n in items</code>), not indices. Indentation — not braces — defines the loop &amp; if/else blocks.</div>
    </div>
  );
};
export default PyLoopVisualization;
