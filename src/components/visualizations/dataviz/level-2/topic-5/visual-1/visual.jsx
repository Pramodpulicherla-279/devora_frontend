/* Lesson: Pair Plots — Exploring Multiple Variables at Once
 * Visual: 3×3 mini matrix of scatter/histogram charts */
import React, { useState } from 'react';
import './visual.css';

const VARS3 = ['amount','units','days'];
const COLORS = ['#58a6ff','#56d364','#a78bfa'];
const DATA_POINTS = [
  [42,5,3],[18,2,7],[95,12,1],[31,4,5],[67,8,2],[23,3,9],[78,9,1],[15,2,11],[54,6,4],[86,11,2],
];
const mini = (xi,yi) => DATA_POINTS.map(p=>[p[xi],p[yi]]);

const DvPairplotVisualization = () => {
  const [sel, setSel] = useState(null);
  return (
    <div className="dvpair-wrap">
      <header className="dvpair-head">
        <span className="dvpair-badge">Seaborn</span>
        <h2>Pair Plots</h2>
        <p>Every variable vs every other variable — in one call</p>
      </header>
      <pre className="dvpair-code"><code>{`sns.pairplot(df[['amount','units','days']],\n  diag_kind='kde', plot_kws={'alpha':0.6})`}</code></pre>
      <div className="dvpair-matrix">
        {VARS3.map((row,ri)=>(
          <div key={row} className="dvpair-row">
            {VARS3.map((col,ci)=>(
              <div key={col} className={`dvpair-cell ${sel===`${ri}-${ci}`?'dvpair-cell--on':''}`}
                onClick={()=>setSel(sel===`${ri}-${ci}`?null:`${ri}-${ci}`)}>
                {ri===ci ? (
                  <svg viewBox="0 0 60 55" className="dvpair-svg">
                    {[0,1,2,3,4].map(b=>{
                      const vals=DATA_POINTS.map(p=>p[ri]);
                      const mn=Math.min(...vals),mx=Math.max(...vals),w=(mx-mn)/5;
                      const c=vals.filter(v=>v>=mn+b*w&&v<mn+(b+1)*w).length;
                      const h=Math.max(2,c/5*40);
                      return <rect key={b} x={4+b*11} y={48-h} width={9} height={h} fill={COLORS[ri]} opacity="0.8" rx="1"/>;
                    })}
                    <text x="30" y="55" textAnchor="middle" fontSize="6.5" fill="#6b7785">{row}</text>
                  </svg>
                ) : (
                  <svg viewBox="0 0 60 55" className="dvpair-svg">
                    {mini(ci,ri).map(([x,y],k)=>{
                      const vals_x=DATA_POINTS.map(p=>p[ci]);
                      const vals_y=DATA_POINTS.map(p=>p[ri]);
                      const cx=8+Math.round((x-Math.min(...vals_x))/(Math.max(...vals_x)-Math.min(...vals_x))*44);
                      const cy=48-Math.round((y-Math.min(...vals_y))/(Math.max(...vals_y)-Math.min(...vals_y))*40);
                      return <circle key={k} cx={cx} cy={cy} r="3" fill={COLORS[ri]} opacity="0.7"/>;
                    })}
                  </svg>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="dvpair-labels">
        {VARS3.map((v,i)=><span key={v} className="dvpair-label" style={{color:COLORS[i]}}>{v}</span>)}
      </div>
      <div className="dvpair-note">Diagonal = distribution of each variable. Off-diagonal = scatter of variable A vs B. Click any cell to focus. With <code>hue='category'</code> each point would be coloured by group.</div>
    </div>
  );
};
export default DvPairplotVisualization;
