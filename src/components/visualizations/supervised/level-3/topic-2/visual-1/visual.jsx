import { useState } from "react";
import "./visual.css";

const FOLDS = 5;
const foldScores = [0.88, 0.91, 0.87, 0.93, 0.90];
const avg = (foldScores.reduce((a, b) => a + b, 0) / FOLDS).toFixed(3);

export default function SvCrossValVisualization() {
  const [activeStep, setActiveStep] = useState(null);

  const handleNext = () => {
    setActiveStep(prev => {
      if (prev === null) return 0;
      if (prev >= FOLDS - 1) return null;
      return prev + 1;
    });
  };

  const handleReset = () => setActiveStep(null);

  return (
    <div className="svcv-wrap">
      <h2 className="svcv-title">5-Fold Cross-Validation</h2>
      <p className="svcv-desc">Each fold takes a turn as the validation set while the rest are used for training.</p>

      <div className="svcv-grid">
        {Array.from({ length: FOLDS }, (_, foldIdx) => (
          <div key={foldIdx} className={`svcv-fold-row ${activeStep === foldIdx ? "svcv-fold-row--active" : ""}`}>
            <span className="svcv-fold-name">Fold {foldIdx + 1}</span>
            <div className="svcv-blocks">
              {Array.from({ length: FOLDS }, (_, blockIdx) => {
                const isVal = blockIdx === foldIdx;
                const isActive = activeStep === foldIdx;
                return (
                  <div key={blockIdx}
                    className={`svcv-block ${isVal ? "svcv-block--val" : "svcv-block--train"}`}
                    style={{
                      borderColor: isVal ? "#f97316" : "#56d364",
                      background: isVal ? (isActive ? "#2a1600" : "#1a0e00") : (isActive ? "#0f2a1a" : "#0b1f13"),
                      opacity: isActive ? 1 : 0.5,
                    }}>
                    {isVal ? "VAL" : "TR"}
                  </div>
                );
              })}
            </div>
            <span className="svcv-score" style={{color: activeStep === foldIdx ? "#56d364" : "#6b7785"}}>
              {activeStep !== null && activeStep >= foldIdx ? foldScores[foldIdx].toFixed(2) : "--"}
            </span>
          </div>
        ))}
      </div>

      <div className="svcv-result">
        <div className="svcv-result-row">
          <span className="svcv-result-lbl">Individual scores:</span>
          <span className="svcv-result-scores">
            {foldScores.map((s, i) => (
              <span key={i} className="svcv-score-badge"
                style={{color: activeStep !== null && activeStep >= i ? "#56d364" : "#6b7785"}}>
                {s.toFixed(2)}
              </span>
            ))}
          </span>
        </div>
        <div className="svcv-result-row">
          <span className="svcv-result-lbl">CV Score (mean):</span>
          <span className="svcv-cv-score" style={{color: activeStep === FOLDS - 1 ? "#56d364" : "#6b7785"}}>
            {activeStep === FOLDS - 1 ? avg : "--"}
          </span>
        </div>
      </div>

      <div className="svcv-actions">
        <button className="svcv-btn svcv-btn--primary" onClick={handleNext}
          disabled={activeStep === FOLDS - 1}>
          {activeStep === null ? "Start" : activeStep === FOLDS - 1 ? "Done" : `Next Fold (${activeStep + 2}/${FOLDS})`}
        </button>
        <button className="svcv-btn" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
