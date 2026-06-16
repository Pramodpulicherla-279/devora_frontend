import { useState, useEffect } from "react";
import "./visual.css";

const TOTAL = 20;
const TRAIN_N = 16;

function makeDataset(shuffled = false) {
  const base = Array.from({ length: TOTAL }, (_, i) => ({ id: i + 1, val: i + 1 }));
  if (!shuffled) return base;
  const arr = [...base];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function SvSplitsVisualization() {
  const [data, setData] = useState(makeDataset(false));
  const [shuffled, setShuffled] = useState(false);
  const [animating, setAnimating] = useState(false);

  const train = data.slice(0, TRAIN_N);
  const test = data.slice(TRAIN_N);

  const handleShuffle = () => {
    setAnimating(true);
    setTimeout(() => {
      setData(makeDataset(true));
      setShuffled(true);
      setAnimating(false);
    }, 400);
  };

  const handleReset = () => {
    setData(makeDataset(false));
    setShuffled(false);
  };

  return (
    <div className="svsplits-wrap">
      <h2 className="svsplits-title">Train / Test Split</h2>
      <div className="svsplits-stats">
        <div className="svsplits-stat" style={{ color: "#56d364" }}>
          <span className="svsplits-stat-num">80%</span>
          <span className="svsplits-stat-lbl">Train ({TRAIN_N} samples)</span>
        </div>
        <div className="svsplits-divider">|</div>
        <div className="svsplits-stat" style={{ color: "#f97316" }}>
          <span className="svsplits-stat-num">20%</span>
          <span className="svsplits-stat-lbl">Test ({TOTAL - TRAIN_N} samples)</span>
        </div>
      </div>

      <div className={`svsplits-grid ${animating ? "svsplits-animate" : ""}`}>
        <div className="svsplits-section">
          <div className="svsplits-section-label" style={{ color: "#56d364" }}>Training Set</div>
          <div className="svsplits-cells">
            {train.map((d) => (
              <div key={d.id} className="svsplits-cell svsplits-cell--train" title={`Sample #${d.id}`}>
                {d.id}
              </div>
            ))}
          </div>
        </div>
        <div className="svsplits-section">
          <div className="svsplits-section-label" style={{ color: "#f97316" }}>Test Set</div>
          <div className="svsplits-cells">
            {test.map((d) => (
              <div key={d.id} className="svsplits-cell svsplits-cell--test" title={`Sample #${d.id}`}>
                {d.id}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="svsplits-bar">
        <div className="svsplits-bar-train" style={{ width: "80%" }}>80% Train</div>
        <div className="svsplits-bar-test" style={{ width: "20%" }}>20% Test</div>
      </div>

      <div className="svsplits-actions">
        <button className="svsplits-btn svsplits-btn--primary" onClick={handleShuffle} disabled={animating}>
          {animating ? "Shuffling…" : "Shuffle & Split"}
        </button>
        <button className="svsplits-btn" onClick={handleReset}>Reset</button>
      </div>

      <p className="svsplits-hint">
        {shuffled
          ? "Random split ensures every sample has an equal chance of being in test — preventing order bias."
          : "Without shuffling, the test set may only contain the last samples (e.g. the newest data), causing bias."}
      </p>
    </div>
  );
}
