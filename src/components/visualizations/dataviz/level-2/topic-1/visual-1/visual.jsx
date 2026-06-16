/* Lesson: What Seaborn Does That Matplotlib Doesn't
 * Visual: Side-by-side code comparison for same chart */
import React, { useState } from 'react';
import './visual.css';

const MPLCODE = `import matplotlib.pyplot as plt
import numpy as np

# Manual color palette
colors = ['#1f77b4','#ff7f0e','#2ca02c']
categories = ['Electronics','Clothing','Furniture']
means = [62000, 31000, 47000]
errors = [8000, 4500, 6000]

fig, ax = plt.subplots(figsize=(7, 5))
bars = ax.bar(categories, means, color=colors,
              yerr=errors, capsize=5)
ax.set_title('Revenue by Category', fontsize=14)
ax.set_ylabel('Mean Revenue (₹)')
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
plt.tight_layout()
plt.show()
# ~15 lines for a basic styled bar chart`;

const SNSCODE = `import seaborn as sns
import pandas as pd

df = pd.DataFrame({
    'category': ['Electronics','Clothing','Furniture'],
    'revenue':  [62000, 31000, 47000]
})

sns.barplot(data=df, x='category', y='revenue',
            palette='Set2', errorbar='sd')
sns.despine()
plt.title('Revenue by Category')
plt.tight_layout()
plt.show()
# ~6 lines — same result, built-in styling & CI bars`;

const DATA = [{cat:'Electronics',val:62},{cat:'Clothing',val:31},{cat:'Furniture',val:47}];
const PALETTE = ['#58a6ff','#56d364','#a78bfa'];

const DvSeabornIntroVisualization = () => {
  const [side, setSide] = useState('compare');
  return (
    <div className="dvsns-wrap">
      <header className="dvsns-head">
        <span className="dvsns-badge">Seaborn</span>
        <h2>Seaborn vs Matplotlib</h2>
        <p>Same chart — dramatically less code, better defaults</p>
      </header>
      <div className="dvsns-tabs">
        <button className={`dvsns-tab ${side==='compare'?'dvsns-tab--on':''}`} onClick={()=>setSide('compare')}>Side by side</button>
        <button className={`dvsns-tab ${side==='mpl'?'dvsns-tab--on':''}`} onClick={()=>setSide('mpl')}>Matplotlib code</button>
        <button className={`dvsns-tab ${side==='sns'?'dvsns-tab--on':''}`} onClick={()=>setSide('sns')}>Seaborn code</button>
      </div>
      {side==='compare' && (
        <div className="dvsns-compare">
          {[{label:'Matplotlib',lines:15,color:'#f85149'},{label:'Seaborn',lines:6,color:'#56d364'}].map(x=>(
            <div key={x.label} className="dvsns-cmp-col">
              <div className="dvsns-cmp-label">{x.label}</div>
              <svg viewBox="0 0 140 130" className="dvsns-cmp-svg">
                {DATA.map((d,i)=>{
                  const h=Math.round(d.val/70*100);
                  return <rect key={i} x={15+i*40} y={115-h} width={28} height={h} fill={PALETTE[i]} rx="2" opacity="0.85"/>;
                })}
                {DATA.map((d,i)=><text key={i} x={29+i*40} y="126" textAnchor="middle" fontSize="7.5" fill="#6b7785">{d.cat.substring(0,5)}</text>)}
                <line x1="12" y1="10" x2="12" y2="117" stroke="#30363d"/>
                <line x1="12" y1="117" x2="138" y2="117" stroke="#30363d"/>
              </svg>
              <div className="dvsns-cmp-lines" style={{color:x.color}}>~{x.lines} lines of code</div>
            </div>
          ))}
        </div>
      )}
      {side==='mpl' && <pre className="dvsns-code"><code>{MPLCODE}</code></pre>}
      {side==='sns' && <pre className="dvsns-code"><code>{SNSCODE}</code></pre>}
      <div className="dvsns-note">Seaborn is built on Matplotlib — it doesn't replace it. Think of Seaborn as a high-level API that handles the repetitive styling work so you can focus on the analysis.</div>
    </div>
  );
};
export default DvSeabornIntroVisualization;
