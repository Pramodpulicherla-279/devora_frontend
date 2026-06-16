/* Lesson: What Is Machine Learning and Where Does It Fit
 * Visual type: ILLUSTRATION
 * Reason: The lesson positions ML within the analyst's toolkit — after descriptive
 * stats and inference. A clickable map of the three ML paradigms (Supervised /
 * Unsupervised / RL), each showing what "labelled" means in the Zephyr context,
 * makes the landscape tangible. */
import React, { useState } from 'react';
import './visual.css';

const PARADIGMS = {
  supervised: {
    label: 'Supervised Learning',
    color: '#a78bfa',
    icon: '🏷',
    desc: 'You have labelled examples. The model learns the mapping from inputs to known outputs.',
    example: 'Predict whether an order will be returned — dataset has "returned: yes/no" label.',
    tasks: ['Classification (returned? yes/no)', 'Regression (predict order value)'],
  },
  unsupervised: {
    label: 'Unsupervised Learning',
    color: '#56d364',
    icon: '🔍',
    desc: 'No labels — the model discovers hidden structure in the data on its own.',
    example: 'Segment customers by purchase behaviour without telling the model how many segments to find.',
    tasks: ['Clustering (k-means, DBSCAN)', 'Dimensionality reduction (PCA)'],
  },
  reinforcement: {
    label: 'Reinforcement Learning',
    color: '#f0883e',
    icon: '🎮',
    desc: 'An agent learns by taking actions and receiving rewards. Not common in data analysis.',
    example: 'Not used for Zephyr analysis — relevant for games, robotics, recommendation systems.',
    tasks: ['Game agents (AlphaGo)', 'Dynamic pricing algorithms'],
  },
};

const MlWhatIsVisualization = () => {
  const [sel, setSel] = useState('supervised');
  const p = PARADIGMS[sel];

  return (
    <div className="mlwhat-wrap">
      <header className="mlwhat-head">
        <span className="mlwhat-badge">Machine Learning</span>
        <h2>What Is Machine Learning?</h2>
        <p>Three paradigms — one toolkit added to your analyst stack</p>
      </header>

      <div className="mlwhat-map">
        {Object.keys(PARADIGMS).map(k => (
          <button key={k} className={`mlwhat-node ${sel === k ? 'mlwhat-node--on' : ''}`} style={sel === k ? { borderColor: PARADIGMS[k].color, background: `${PARADIGMS[k].color}18` } : {}} onClick={() => setSel(k)}>
            <span className="mlwhat-icon">{PARADIGMS[k].icon}</span>
            <span className="mlwhat-node-label" style={sel === k ? { color: PARADIGMS[k].color } : {}}>{PARADIGMS[k].label}</span>
          </button>
        ))}
      </div>

      <div className="mlwhat-detail">
        <p className="mlwhat-desc">{p.desc}</p>
        <div className="mlwhat-ex"><span className="mlwhat-ex-hd">Zephyr example</span>{p.example}</div>
        <div className="mlwhat-tasks">
          {p.tasks.map((t, i) => <div key={i} className="mlwhat-task" style={{ borderColor: p.color }}>{t}</div>)}
        </div>
      </div>

      <div className="mlwhat-spectrum">
        <div className="mlwhat-spec-item"><span>Descriptive stats</span><em>What happened?</em></div>
        <div className="mlwhat-spec-arr">→</div>
        <div className="mlwhat-spec-item"><span>Inferential stats</span><em>Is it real?</em></div>
        <div className="mlwhat-spec-arr">→</div>
        <div className="mlwhat-spec-item mlwhat-spec-item--hl"><span>Machine learning</span><em>What will happen?</em></div>
      </div>

      <div className="mlwhat-note">
        ML doesn't replace statistics — it extends it. You still need clean data, correct feature choices, and honest evaluation. The algorithms are new; the rigor is the same.
      </div>
    </div>
  );
};

export default MlWhatIsVisualization;
