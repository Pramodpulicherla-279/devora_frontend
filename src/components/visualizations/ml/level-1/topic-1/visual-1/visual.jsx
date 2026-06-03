/* Lesson: What Is Machine Learning
 * Visual type: ILLUSTRATION
 * Reason: The "rules vs learned-from-data" paradigm shift and the three ML
 * families (supervised/unsupervised/RL) are conceptual taxonomy — a clear
 * comparison diagram communicates them best. */
import React, { useState } from 'react';
import './visual.css';

const TYPES = {
  supervised: { label: 'Supervised', icon: '🏷️', desc: 'Learn from labeled examples (input → known output). Predict labels for new data.', ex: 'Spam detection, price prediction' },
  unsupervised: { label: 'Unsupervised', icon: '🔍', desc: 'Find hidden structure in unlabeled data. No "right answer" given.', ex: 'Customer segmentation, anomaly detection' },
  reinforcement: { label: 'Reinforcement', icon: '🎮', desc: 'Learn by trial &amp; error via rewards/penalties from the environment.', ex: 'Game AI, robotics, recommendations' },
};

const MlWhatIsVisualization = () => {
  const [type, setType] = useState('supervised');
  return (
    <div className="mlwhat-wrap">
      <header className="mlwhat-head">
        <span className="mlwhat-badge">Machine Learning</span>
        <h2>What Is Machine Learning?</h2>
        <p>Programs that learn patterns from data instead of being told the rules</p>
      </header>
      <div className="mlwhat-paradigm">
        <div className="mlwhat-pcol">
          <div className="mlwhat-ptitle">Traditional Programming</div>
          <div className="mlwhat-pflow"><span>Rules</span><span>+</span><span>Data</span><span className="mlwhat-arrow">→</span><span className="mlwhat-out">Answers</span></div>
        </div>
        <div className="mlwhat-pcol mlwhat-pcol--ml">
          <div className="mlwhat-ptitle">Machine Learning</div>
          <div className="mlwhat-pflow"><span>Data</span><span>+</span><span>Answers</span><span className="mlwhat-arrow">→</span><span className="mlwhat-out">Rules (model)</span></div>
        </div>
      </div>
      <div className="mlwhat-types-title">Three families of ML</div>
      <div className="mlwhat-tabs">
        {Object.entries(TYPES).map(([k, t]) => (
          <button key={k} className={`mlwhat-tab ${type === k ? 'mlwhat-tab--on' : ''}`} onClick={() => setType(k)}>
            <span className="mlwhat-ticon">{t.icon}</span>{t.label}
          </button>
        ))}
      </div>
      <div className="mlwhat-detail">
        <p dangerouslySetInnerHTML={{ __html: TYPES[type].desc }} />
        <div className="mlwhat-ex">Examples: {TYPES[type].ex}</div>
      </div>
    </div>
  );
};
export default MlWhatIsVisualization;
