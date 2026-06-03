/* Lesson: Decision Trees and Random Forests
 * Visual type: INTERACTIVE
 * Reason: A decision tree IS a flowchart of if/else splits — walking a sample
 * down the branches to a leaf, then showing how a "forest" votes, makes both
 * concepts concrete. */
import React, { useState } from 'react';
import './visual.css';

const MlDecisionTreeVisualization = () => {
  const [age, setAge] = useState(35);
  const [income, setIncome] = useState(40);
  const [tab, setTab] = useState('tree');
  // simple tree: age<30? -> no ; else income>50? approve : review
  const path = age < 30 ? ['root', 'l', 'l-leaf'] : income > 50 ? ['root', 'r', 'r-approve'] : ['root', 'r', 'r-review'];
  const decision = age < 30 ? 'Reject' : income > 50 ? 'Approve' : 'Review';
  // forest: 5 trees vote
  const votes = [age < 30 ? 'Reject' : 'Approve', income > 45 ? 'Approve' : 'Reject', age < 25 ? 'Reject' : 'Approve', income > 55 ? 'Approve' : 'Review', age > 40 && income > 35 ? 'Approve' : 'Reject'];
  const tally = votes.reduce((m, v) => ({ ...m, [v]: (m[v] || 0) + 1 }), {});
  const winner = Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0];

  return (
    <div className="mldt-wrap">
      <header className="mldt-head">
        <span className="mldt-badge">Machine Learning</span>
        <h2>Decision Trees &amp; Random Forests</h2>
        <p>Splitting questions → a prediction; many trees → a vote</p>
      </header>
      <div className="mldt-tabs">
        <button className={`mldt-tab ${tab === 'tree' ? 'mldt-tab--on' : ''}`} onClick={() => setTab('tree')}>🌳 Single Tree</button>
        <button className={`mldt-tab ${tab === 'forest' ? 'mldt-tab--on' : ''}`} onClick={() => setTab('forest')}>🌲 Random Forest</button>
      </div>
      <div className="mldt-inputs">
        <label>Age: {age}<input type="range" min="18" max="60" value={age} onChange={(e) => setAge(Number(e.target.value))} className="mldt-slider" /></label>
        <label>Income (k): {income}<input type="range" min="10" max="90" value={income} onChange={(e) => setIncome(Number(e.target.value))} className="mldt-slider" /></label>
      </div>
      {tab === 'tree' ? (
        <div className="mldt-tree">
          <div className={`mldt-node ${path.includes('root') ? 'mldt-node--on' : ''}`}>age &lt; 30 ?</div>
          <div className="mldt-branches">
            <div className={`mldt-node mldt-node--leaf ${path.includes('l-leaf') ? 'mldt-node--hit' : ''}`}>yes → Reject</div>
            <div className={`mldt-node ${path.includes('r') ? 'mldt-node--on' : ''}`}>no → income &gt; 50 ?</div>
          </div>
          <div className="mldt-branches mldt-branches--end">
            <div className={`mldt-node mldt-node--leaf ${path.includes('r-approve') ? 'mldt-node--hit' : ''}`}>yes → Approve</div>
            <div className={`mldt-node mldt-node--leaf ${path.includes('r-review') ? 'mldt-node--hit' : ''}`}>no → Review</div>
          </div>
          <div className="mldt-decision">Decision: <strong>{decision}</strong></div>
        </div>
      ) : (
        <div className="mldt-forest">
          <div className="mldt-votes">
            {votes.map((v, i) => <div key={i} className={`mldt-vote mldt-vote--${v.toLowerCase()}`}>🌲 {v}</div>)}
          </div>
          <div className="mldt-tally">Majority vote → <strong>{winner}</strong></div>
          <div className="mldt-note">A random forest trains many trees on different data/feature subsets, then averages their votes — far more robust than one tree.</div>
        </div>
      )}
    </div>
  );
};
export default MlDecisionTreeVisualization;
