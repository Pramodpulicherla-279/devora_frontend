/* Lesson: Building the Dashboard
 * Visual: 4-panel mini dashboard with chart labels */
import React from 'react';
import './visual.css';

const MONTHS=['Jan','Feb','Mar','Apr','May','Jun'];
const REV=[142,138,161,179,152,198];
const CATS=['Electronics','Clothing','Furniture'];
const CAT_V=[842,318,531];
const COLORS=['#58a6ff','#56d364','#a78bfa'];
const MAX_R=210,MAX_C=900;

const CapDashboardVisualization = () => (
  <div className="capdash-wrap">
    <header className="capdash-head">
      <span className="capdash-badge">Capstone</span>
      <h2>Building the Dashboard</h2>
      <p>Four charts — one analyst story</p>
    </header>
    <pre className="capdash-code"><code>{`fig, axes = plt.subplots(2, 2, figsize=(14, 9))\nfig.suptitle('2024 Sales Dashboard', fontsize=16, fontweight='bold')\n\n# axes[0,0] — Revenue trend\n# axes[0,1] — Category breakdown  \n# axes[1,0] — Regional heatmap\n# axes[1,1] — KPI cards\n\nplt.tight_layout()\nplt.savefig('dashboard.png', dpi=150, bbox_inches='tight')`}</code></pre>
    <div className="capdash-dashboard">
      <div className="capdash-panel">
        <div className="capdash-panel-title">Revenue Trend (₹k)</div>
        <svg viewBox="0 0 140 85" className="capdash-svg">
          <polyline points={MONTHS.map((_,i)=>`${12+i*21},${75-Math.round(REV[i]/MAX_R*60)}`).join(' ')} fill="none" stroke="#58a6ff" strokeWidth="2"/>
          {MONTHS.map((_,i)=><circle key={i} cx={12+i*21} cy={75-Math.round(REV[i]/MAX_R*60)} r="3" fill="#58a6ff"/>)}
          <line x1="8" y1="10" x2="8" y2="77" stroke="#30363d"/><line x1="8" y1="77" x2="138" y2="77" stroke="#30363d"/>
          {MONTHS.map((m,i)=><text key={i} x={12+i*21} y="84" textAnchor="middle" fontSize="6" fill="#6b7785">{m}</text>)}
        </svg>
      </div>
      <div className="capdash-panel">
        <div className="capdash-panel-title">Revenue by Category</div>
        <svg viewBox="0 0 140 85" className="capdash-svg">
          {CATS.map((c,i)=>{const h=Math.round(CAT_V[i]/MAX_C*65); return<rect key={i} x={15+i*38} y={75-h} width={28} height={h} fill={COLORS[i]} rx="2" opacity="0.85"/>;})}{CATS.map((c,i)=><text key={i} x={29+i*38} y="83" textAnchor="middle" fontSize="5.5" fill="#6b7785">{c.substring(0,5)}</text>)}
          <line x1="8" y1="8" x2="8" y2="77" stroke="#30363d"/><line x1="8" y1="77" x2="138" y2="77" stroke="#30363d"/>
        </svg>
      </div>
      <div className="capdash-panel">
        <div className="capdash-panel-title">Discount Impact</div>
        <svg viewBox="0 0 140 85" className="capdash-svg">
          {[['0-5%',42],['5-15%',36],['15-30%',29],['>30%',18]].map(([l,v],i)=>{
            const h=Math.round(v/45*60);
            return <g key={i}><rect x={15+i*30} y={75-h} width={22} height={h} fill="#f97316" rx="2" opacity={0.6+i*0.08}/><text x={26+i*30} y="83" textAnchor="middle" fontSize="5.5" fill="#6b7785">{l}</text></g>;
          })}
          <line x1="8" y1="8" x2="8" y2="77" stroke="#30363d"/><line x1="8" y1="77" x2="138" y2="77" stroke="#30363d"/>
        </svg>
      </div>
      <div className="capdash-panel capdash-kpis">
        <div className="capdash-panel-title">KPIs</div>
        {[['₹16.9L','Total Revenue'],['₹2,940','Avg Order'],['83%','Model Acc.'],['580','Q4 Orders']].map(([v,l])=>(
          <div key={l} className="capdash-kpi"><div className="capdash-kpi-val">{v}</div><div className="capdash-kpi-label">{l}</div></div>
        ))}
      </div>
    </div>
    <div className="capdash-note">Use plt.tight_layout() to prevent labels overlapping. Export at 150 dpi for a crisp PDF or presentation image.</div>
  </div>
);
export default CapDashboardVisualization;
