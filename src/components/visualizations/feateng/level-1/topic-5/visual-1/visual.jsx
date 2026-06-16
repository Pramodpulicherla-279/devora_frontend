import { useState } from "react";
import "./visual.css";

const timestamps = ["2024-03-15 08:32:00", "2024-07-04 17:45:00", "2024-11-28 23:00:00"];

function extract(ts) {
  const d = new Date(ts);
  return {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    day: d.getDate(),
    hour: d.getHours(),
    day_of_week: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()],
    is_weekend: d.getDay() === 0 || d.getDay() === 6 ? 1 : 0,
  };
}

const features = ["year", "month", "day", "hour", "day_of_week", "is_weekend"];
const colors = ["#58a6ff", "#f97316", "#56d364", "#a78bfa", "#f97316", "#56d364"];

export default function FeDatetimeVisualization() {
  const [selected, setSelected] = useState(0);
  const ts = timestamps[selected];
  const feats = extract(ts);

  return (
    <div className="fedatetime-wrap">
      <h3 className="fedatetime-title">Datetime Feature Extraction</h3>

      <div className="fedatetime-ts-row">
        {timestamps.map((t, i) => (
          <button key={i} className={`fedatetime-ts-btn ${selected === i ? "fedatetime-ts-btn--on" : ""}`} onClick={() => setSelected(i)}>{t}</button>
        ))}
      </div>

      <div className="fedatetime-diagram">
        <div className="fedatetime-source">
          <div className="fedatetime-src-label">timestamp</div>
          <div className="fedatetime-src-val">{ts}</div>
        </div>
        <div className="fedatetime-lines">
          {features.map((_, i) => (
            <svg key={i} className="fedatetime-svg" viewBox="0 0 60 20" preserveAspectRatio="none">
              <line x1="0" y1="10" x2="50" y2="10" stroke="#30363d" strokeWidth="1.5" />
              <polygon points="48,6 56,10 48,14" fill={colors[i]} />
            </svg>
          ))}
        </div>
        <div className="fedatetime-feats">
          {features.map((f, i) => (
            <div key={f} className="fedatetime-feat" style={{ borderColor: colors[i] }}>
              <span className="fedatetime-feat-name" style={{ color: colors[i] }}>{f}</span>
              <span className="fedatetime-feat-val">{feats[f]}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="fedatetime-note">
        One timestamp column becomes <strong>{features.length} features</strong> — each capturing a different time dimension useful for the model.
      </p>
    </div>
  );
}
