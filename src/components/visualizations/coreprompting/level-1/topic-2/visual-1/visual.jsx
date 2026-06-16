import React, { useState, useMemo } from 'react';
import './visual.css';

const EXAMPLES = [
  { input: '"I love this movie!" → Positive', label: 'Positive' },
  { input: '"This product is terrible." → Negative', label: 'Negative' },
  { input: '"It was okay, nothing special." → Neutral', label: 'Neutral' },
  { input: '"Absolutely fantastic experience!" → Positive', label: 'Positive' },
  { input: '"Worst purchase I ever made." → Negative', label: 'Negative' },
];

const QUERY = '"The app crashed twice but the support team was helpful."';

const ACCURACY = [52, 68, 79, 87, 92];

const CptFewShotVisualization = () => {
  const [shotCount, setShotCount] = useState(0);

  const shownExamples = useMemo(() => EXAMPLES.slice(0, shotCount), [shotCount]);

  const accuracy = ACCURACY[shotCount];

  const promptText = useMemo(() => {
    let text = '';
    if (shotCount === 0) {
      text += 'Classify the sentiment: positive, negative, or neutral.\n\n';
    } else {
      text += 'Classify the sentiment: positive, negative, or neutral.\n\n';
      shownExamples.forEach((ex) => {
        text += ex.input + '\n';
      });
      text += '\n';
    }
    text += QUERY + ' →';
    return text;
  }, [shotCount, shownExamples]);

  return (
    <div className="cptfew-root">
      <div className="cptfew-header">
        <span className="cptfew-badge">Few-Shot</span>
        <h2 className="cptfew-title">Shot Count Builder</h2>
        <p className="cptfew-subtitle">Add examples to see accuracy improve</p>
      </div>

      <div className="cptfew-controls">
        <div className="cptfew-counter-label">
          <span className="cptfew-shot-num">{shotCount}</span>
          <span className="cptfew-shot-text">{shotCount === 0 ? 'Zero-Shot' : shotCount === 1 ? '1-Shot' : `${shotCount}-Shot`}</span>
        </div>
        <div className="cptfew-btn-group">
          <button
            className="cptfew-btn"
            onClick={() => setShotCount(c => Math.max(0, c - 1))}
            disabled={shotCount === 0}
          >−</button>
          {[0, 1, 3, 5].map(n => (
            <button
              key={n}
              className={`cptfew-btn cptfew-btn-preset${shotCount === n ? ' cptfew-btn-active' : ''}`}
              onClick={() => setShotCount(n)}
            >{n}</button>
          ))}
          <button
            className="cptfew-btn"
            onClick={() => setShotCount(c => Math.min(5, c + 1))}
            disabled={shotCount === 5}
          >+</button>
        </div>
      </div>

      <div className="cptfew-accuracy-bar-wrap">
        <div className="cptfew-accuracy-header">
          <span className="cptfew-accuracy-label">Estimated Accuracy</span>
          <span className="cptfew-accuracy-val">{accuracy}%</span>
        </div>
        <div className="cptfew-bar-track">
          <div
            className="cptfew-bar-fill"
            style={{ width: accuracy + '%' }}
          />
        </div>
        <div className="cptfew-bar-ticks">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>

      <div className="cptfew-panels">
        <div className="cptfew-panel">
          <div className="cptfew-panel-title">
            <span className="cptfew-dot cptfew-dot-violet"></span>
            Full Prompt ({shotCount} example{shotCount !== 1 ? 's' : ''})
          </div>
          <pre className="cptfew-code">{promptText}</pre>
        </div>

        <div className="cptfew-panel">
          <div className="cptfew-panel-title">
            <span className="cptfew-dot cptfew-dot-green"></span>
            Examples Added
          </div>
          {shownExamples.length === 0 ? (
            <div className="cptfew-empty">No examples — zero-shot mode</div>
          ) : (
            <div className="cptfew-examples-list">
              {shownExamples.map((ex, i) => (
                <div key={i} className="cptfew-example-row">
                  <span className="cptfew-ex-num">{i + 1}</span>
                  <div className="cptfew-ex-content">
                    <div className="cptfew-ex-input">{ex.input.split(' → ')[0]}</div>
                    <div className={`cptfew-ex-label cptfew-label-${ex.label.toLowerCase()}`}>
                      → {ex.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="cptfew-query-box">
            <div className="cptfew-query-label">Query:</div>
            <div className="cptfew-query-text">{QUERY}</div>
            <div className="cptfew-query-answer">
              → <span className={shotCount >= 2 ? 'cptfew-answer-ok' : 'cptfew-answer-unsure'}>
                {shotCount >= 2 ? 'Mixed / Neutral' : '???'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CptFewShotVisualization;
