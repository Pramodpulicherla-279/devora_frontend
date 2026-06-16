/* Lesson: Heatmaps — Visualizing Correlations
 * Visual: Interactive correlation matrix with hover values */
import React, { useState } from 'react';
import './visual.css';

const VARS = ['amount','units','gst','days','discount'];
const CORR = [
  [1.00, 0.82,-0.12, 0.04, 0.67],
  [0.82, 1.00, 0.09, 0.18, 0.44],
  [-0.12,0.09, 1.00,-0.31,-0.08],
  [0.04, 0.18,-0.31, 1.00, 0.21],
  [0.67, 0.44,-0.08, 0.21, 1.00],
];

const cellColor = (v) => {
  if(v>=0.7) return '#0d4a2a';
  if(v>=0.4) return '#1a3d1a';
  if(v>0.1)  return '#1c2128';
  if(v<=-0.4)return '#4a0d0d';
  if(v<-0.1) return '#2d1515';
  return '#161b22';
};
const textColor = (v) => v>=0.7||v<=-0.4 ? '#e6edf3' : '#a3adbb';

const DvHeatmapVisualization = () => {
  const [hover, setHover] = useState(null);
  return (
    <div className="dvheat-wrap">
      <header className="dvheat-head">
        <span className="dvheat-badge">Seaborn</span>
        <h2>Correlation Heatmap</h2>
        <p>sns.heatmap() — spot strong correlations at a glance</p>
      </header>
      <pre className="dvheat-code"><code>{`corr_matrix = df.corr()\nsns.heatmap(corr_matrix, annot=True, fmt='.2f',\n  cmap='RdYlGn', center=0, vmin=-1, vmax=1)`}</code></pre>
      <div className="dvheat-table-wrap">
        <table className="dvheat-table">
          <thead>
            <tr><th></th>{VARS.map(v=><th key={v}>{v}</th>)}</tr>
          </thead>
          <tbody>
            {VARS.map((row,ri)=>(
              <tr key={row}>
                <th>{row}</th>
                {VARS.map((col,ci)=>{
                  const v=CORR[ri][ci];
                  const isH=hover&&hover[0]===ri&&hover[1]===ci;
                  return (
                    <td key={col}
                      style={{background:cellColor(v),color:textColor(v),fontWeight:ri===ci?700:400,outline:isH?'2px solid #58a6ff':'none'}}
                      onMouseEnter={()=>setHover([ri,ci])}
                      onMouseLeave={()=>setHover(null)}>
                      {v.toFixed(2)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hover && (
        <div className="dvheat-tooltip">
          {VARS[hover[0]]} ↔ {VARS[hover[1]]}: r = <strong style={{color:CORR[hover[0]][hover[1]]>0.4?'#56d364':CORR[hover[0]][hover[1]]<-0.4?'#f85149':'#a3adbb'}}>{CORR[hover[0]][hover[1]].toFixed(2)}</strong>
        </div>
      )}
      <div className="dvheat-legend">
        <span style={{color:'#f85149'}}>■ negative</span>
        <span style={{color:'#a3adbb'}}>■ near zero</span>
        <span style={{color:'#56d364'}}>■ positive</span>
      </div>
      <div className="dvheat-note">Values closer to +1 or −1 are stronger correlations. Diagonal is always 1.0 (each variable is perfectly correlated with itself).</div>
    </div>
  );
};
export default DvHeatmapVisualization;
