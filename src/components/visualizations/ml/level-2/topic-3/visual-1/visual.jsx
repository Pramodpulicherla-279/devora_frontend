/* Lesson: Decision Trees — Rules That a Machine Learns
 * Visual type: INTERACTIVE (stepped)
 * Reason: A decision tree is literally a flowchart. Stepping through the tree's
 * decision nodes (amount > ₹20k? → category?) for a sample order makes the
 * "rules discovered automatically" claim concrete. */
import React, { useState } from 'react';
import './visual.css';

const TREE = {
  q: 'Amount > ₹20,000?',
  left: {
    q: 'Category = Electronics?',
    left: { result: 'Return risk: LOW', prob: '18%', color: '#56d364' },
    right: { result: 'Return risk: LOW', prob: '12%', color: '#56d364' },
  },
  right: {
    q: 'City = Mumbai?',
    left: { result: 'Return risk: HIGH', prob: '71%', color: '#f85149' },
    right: { result: 'Return risk: MEDIUM', prob: '44%', color: '#f0883e' },
  },
};

const MlDecisionTreeVisualization = () => {
  const [amount, setAmount] = useState(15000);
  const [cat, setCat] = useState('Electronics');
  const [city, setCity] = useState('Delhi');

  const step1 = amount > 20000 ? 'right' : 'left';
  const step2leaf = step1 === 'left'
    ? (cat === 'Electronics' ? TREE.left.left : TREE.left.right)
    : (city === 'Mumbai' ? TREE.right.left : TREE.right.right);

  const step2node = TREE[step1];

  return (
    <div className="mltree-wrap">
      <header className="mltree-head">
        <span className="mltree-badge">Machine Learning</span>
        <h2>Decision Trees</h2>
        <p>Follow the flowchart — the model learned these rules</p>
      </header>

      <div className="mltree-inputs">
        <label className="mltree-field"><span>Order amount</span>
          <input type="range" min={5000} max={40000} step={1000} value={amount} onChange={e => setAmount(+e.target.value)} className="mltree-slider" />
          <code>₹{amount.toLocaleString('en-IN')}</code>
        </label>
        <label className="mltree-field"><span>Category</span>
          <select className="mltree-sel" value={cat} onChange={e => setCat(e.target.value)}>
            <option>Electronics</option><option>Accessories</option><option>Furniture</option>
          </select>
        </label>
        <label className="mltree-field"><span>City</span>
          <select className="mltree-sel" value={city} onChange={e => setCity(e.target.value)}>
            <option>Mumbai</option><option>Delhi</option><option>Bengaluru</option><option>Pune</option>
          </select>
        </label>
      </div>

      <div className="mltree-flow">
        <div className="mltree-node mltree-node--root">
          <span className="mltree-q">{TREE.q}</span>
          <span className={`mltree-ans ${step1 === 'right' ? 'mltree-ans--yes' : 'mltree-ans--no'}`}>
            {step1 === 'right' ? '✓ Yes' : '✗ No'}
          </span>
        </div>
        <div className="mltree-arr">↓</div>
        <div className="mltree-node mltree-node--mid">
          <span className="mltree-q">{step2node.q}</span>
          <span className={`mltree-ans ${(step1 === 'left' ? cat === 'Electronics' : city === 'Mumbai') ? 'mltree-ans--yes' : 'mltree-ans--no'}`}>
            {(step1 === 'left' ? cat === 'Electronics' : city === 'Mumbai') ? '✓ Yes' : '✗ No'}
          </span>
        </div>
        <div className="mltree-arr">↓</div>
        <div className="mltree-leaf" style={{ borderColor: step2leaf.color, background: `${step2leaf.color}18` }}>
          <strong style={{ color: step2leaf.color }}>{step2leaf.result}</strong>
          <span>P(return) = {step2leaf.prob}</span>
        </div>
      </div>

      <div className="mltree-note">
        The tree learned these thresholds from training data — not hard-coded by a human. <code>max_depth</code> controls how many levels deep it goes before stopping. Deeper = more overfit.
      </div>
    </div>
  );
};

export default MlDecisionTreeVisualization;
