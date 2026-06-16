/* Lesson: Subplots — Combining Multiple Charts in One Figure
 * Visual: 2×2 dashboard of mini SVG charts */
import React from 'react';
import './visual.css';

const MONTHS=['Jan','Feb','Mar','Apr','May','Jun'];
const REV=[42,38,51,47,29,62];
const CAT=['Elec','Cloth','Furn'];
const CAT_V=[62,31,47];
const CATS_C=['#58a6ff','#56d364','#a78bfa'];
const SCATTER=[[42,5],[18,2],[95,12],[31,4],[67,8],[23,3],[78,9]];

const DvSubplotsVisualization = () => (
  <div className="dvsub-wrap">
    <header className="dvsub-head">
      <span className="dvsub-badge">Matplotlib</span>
      <h2>Subplots — Building a Dashboard</h2>
      <p>fig, axes = plt.subplots(2, 2, figsize=(12, 8))</p>
    </header>
    <pre className="dvsub-code"><code>{`fig, axes = plt.subplots(2, 2, figsize=(12, 8))

axes[0,0].plot(months, revenue, marker='o')
axes[0,0].set_title('Revenue Trend')

axes[0,1].bar(categories, cat_revenue, color=palette)
axes[0,1].set_title('Revenue by Category')

axes[1,0].scatter(ad_spend, revenue, alpha=0.6)
axes[1,0].set_title('Ad Spend vs Revenue')

axes[1,1].hist(order_amounts, bins=8)
axes[1,1].set_title('Order Distribution')

plt.tight_layout()
plt.savefig('dashboard.png', dpi=150)`}</code></pre>
    <div className="dvsub-dashboard">
      {/* Top-left: line chart */}
      <div className="dvsub-panel">
        <div className="dvsub-panel-title">Revenue Trend</div>
        <svg viewBox="0 0 130 80" className="dvsub-svg">
          <polyline points={MONTHS.map((_,i)=>`${10+i*20},${70-Math.round(REV[i]/65*55)}`).join(' ')} fill="none" stroke="#58a6ff" strokeWidth="2"/>
          {MONTHS.map((_,i)=><circle key={i} cx={10+i*20} cy={70-Math.round(REV[i]/65*55)} r="3" fill="#58a6ff"/>)}
          <line x1="8" y1="5" x2="8" y2="72" stroke="#30363d"/><line x1="8" y1="72" x2="128" y2="72" stroke="#30363d"/>
        </svg>
      </div>
      {/* Top-right: bar chart */}
      <div className="dvsub-panel">
        <div className="dvsub-panel-title">By Category</div>
        <svg viewBox="0 0 130 80" className="dvsub-svg">
          {CAT.map((c,i)=>{const h=Math.round(CAT_V[i]/65*55);return<rect key={i} x={10+i*38} y={70-h} width={28} height={h} fill={CATS_C[i]} rx="2" opacity="0.85"/>;})}{CAT.map((c,i)=><text key={i} x={24+i*38} y="78" textAnchor="middle" fontSize="7" fill="#6b7785">{c}</text>)}
          <line x1="8" y1="5" x2="8" y2="72" stroke="#30363d"/><line x1="8" y1="72" x2="128" y2="72" stroke="#30363d"/>
        </svg>
      </div>
      {/* Bottom-left: scatter */}
      <div className="dvsub-panel">
        <div className="dvsub-panel-title">Ad Spend vs Revenue</div>
        <svg viewBox="0 0 130 80" className="dvsub-svg">
          {SCATTER.map(([x,y],i)=><circle key={i} cx={10+Math.round(x/100*110)} cy={70-Math.round(y/13*55)} r="4" fill="#56d364" opacity="0.7"/>)}
          <line x1="8" y1="5" x2="8" y2="72" stroke="#30363d"/><line x1="8" y1="72" x2="128" y2="72" stroke="#30363d"/>
        </svg>
      </div>
      {/* Bottom-right: histogram */}
      <div className="dvsub-panel">
        <div className="dvsub-panel-title">Order Distribution</div>
        <svg viewBox="0 0 130 80" className="dvsub-svg">
          {[5,9,7,3,2,1].map((c,i)=>{const h=Math.round(c/9*55);return<rect key={i} x={8+i*20} y={70-h} width={17} height={h} fill="#a78bfa" rx="1" opacity="0.8"/>;})}<line x1="8" y1="5" x2="8" y2="72" stroke="#30363d"/><line x1="8" y1="72" x2="128" y2="72" stroke="#30363d"/>
        </svg>
      </div>
    </div>
    <div className="dvsub-note">plt.tight_layout() prevents overlapping titles and labels. plt.savefig() exports to PNG/PDF for reports and presentations.</div>
  </div>
);
export default DvSubplotsVisualization;
