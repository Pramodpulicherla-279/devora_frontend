/* Lesson: Random Forest — Why Ensembles Beat Single Models
 * Visual type: ILLUSTRATION
 * Reason: A random forest is literally many trees voting. Showing 5 trees each
 * making a different prediction, then counting votes, turns the ensemble
 * principle into a concrete democracy metaphor. */
import React, { useState } from 'react';
import './visual.css';

const TREES = [
  { id: 1, features: ['amount > ₹18k', 'city = Mumbai'], vote: 'Return', prob: 0.74 },
  { id: 2, features: ['category = Electronics', 'num_items > 3'], vote: 'Return', prob: 0.68 },
  { id: 3, features: ['amount > ₹22k', 'weekend = yes'], vote: 'Keep', prob: 0.44 },
  { id: 4, features: ['city = Mumbai', 'num_prev_returns > 0'], vote: 'Return', prob: 0.81 },
  { id: 5, features: ['category = Electronics', 'amount > ₹15k'], vote: 'Return', prob: 0.61 },
];

const MlRandomForestVisualization = () => {
  const [revealed, setRevealed] = useState(0);

  const votes = TREES.slice(0, revealed);
  const returns = votes.filter(t => t.vote === 'Return').length;
  const keeps = votes.filter(t => t.vote === 'Keep').length;
  const verdict = revealed > 0 ? (returns > keeps ? 'RETURN' : 'KEEP') : '—';
  const avgProb = votes.length ? (votes.reduce((s, t) => s + t.prob, 0) / votes.length) : 0;

  return (
    <div className="mlrf-wrap">
      <header className="mlrf-head">
        <span className="mlrf-badge">Machine Learning</span>
        <h2>Random Forest</h2>
        <p>Many trees vote — majority wins</p>
      </header>

      <div className="mlrf-trees">
        {TREES.map((t, i) => (
          <div key={t.id} className={`mlrf-tree ${i < revealed ? 'mlrf-tree--on' : ''}`}>
            <div className="mlrf-tree-id">Tree {t.id}</div>
            {i < revealed ? (
              <>
                <div className="mlrf-features">
                  {t.features.map((f, j) => <span key={j} className="mlrf-feat">{f}</span>)}
                </div>
                <div className={`mlrf-vote ${t.vote === 'Return' ? 'mlrf-vote--ret' : 'mlrf-vote--keep'}`}>
                  {t.vote}
                </div>
              </>
            ) : (
              <div className="mlrf-hidden">?</div>
            )}
          </div>
        ))}
      </div>

      <div className="mlrf-controls">
        <button className="mlrf-btn" onClick={() => setRevealed(Math.min(5, revealed + 1))} disabled={revealed >= 5}>
          + Reveal next tree
        </button>
        <button className="mlrf-btn mlrf-btn--reset" onClick={() => setRevealed(0)}>Reset</button>
      </div>

      <div className="mlrf-result">
        <div className="mlrf-stat"><span>Return votes</span><strong style={{ color: '#f85149' }}>{returns}</strong></div>
        <div className="mlrf-stat"><span>Keep votes</span><strong style={{ color: '#56d364' }}>{keeps}</strong></div>
        <div className="mlrf-stat"><span>Avg probability</span><strong style={{ color: '#a78bfa' }}>{revealed > 0 ? (avgProb * 100).toFixed(0) + '%' : '—'}</strong></div>
        <div className="mlrf-stat"><span>Forest verdict</span><strong style={{ color: verdict === 'RETURN' ? '#f85149' : verdict === 'KEEP' ? '#56d364' : '#a3adbb' }}>{verdict}</strong></div>
      </div>

      <div className="mlrf-note">
        Each tree is trained on a <strong>random subset of rows</strong> (bagging) and a <strong>random subset of features</strong> at each split. This decorrelates the trees so their errors don't all point the same direction — the ensemble is more robust than any single tree.
      </div>
    </div>
  );
};

export default MlRandomForestVisualization;
