/* Lesson: Histograms — Understanding Distributions
 * Visual: Slider for bins, shows shape description */
import React, { useState, useMemo } from 'react';
import './visual.css';

const VALUES = [4200,4800,5100,5400,5600,5700,5900,6100,6200,6300,6400,6500,6500,6700,6800,7000,7100,7200,7500,8000,8500,9000,10000,12000,16000,22000];

const buildHist = (bins) => {
  const mn=4000, mx=23000, step=(mx-mn)/bins;
  const counts = Array(bins).fill(0);
  VALUES.forEach(v=>{
    const i=Math.min(bins-1, Math.floor((v-mn)/step));
    counts[i]++;
  });
  return counts.map((c,i)=>({from:Math.round(mn+i*step), to:Math.round(mn+(i+1)*step), count:c}));
};

const DvHistogramVisualization = () => {
  const [bins, setBins] = useState(8);
  const hist = useMemo(()=>buildHist(bins),[bins]);
  const maxC = Math.max(...hist.map(h=>h.count));
  const svgW = 330, svgH = 140, barW = Math.floor(svgW / bins) - 1;

  const shape = bins<=4 ? 'Too few bins — detail lost' : bins>=16 ? 'Too many bins — noise dominates' : 'Right-skewed — most orders are small, few are very large';

  return (
    <div className="dvhist-wrap">
      <header className="dvhist-head">
        <span className="dvhist-badge">Matplotlib</span>
        <h2>Histograms</h2>
        <p>Understanding distributions — not just averages</p>
      </header>
      <div className="dvhist-slider-row">
        <label>Bins: <strong>{bins}</strong></label>
        <input type="range" min={3} max={18} value={bins} onChange={e=>setBins(Number(e.target.value))} className="dvhist-slider"/>
      </div>
      <svg viewBox={`0 0 ${svgW+30} ${svgH+20}`} xmlns="http://www.w3.org/2000/svg" className="dvhist-svg">
        {hist.map((h,i)=>{
          const bh = h.count===0?0:Math.max(4,Math.round(h.count/maxC*(svgH-10)));
          const x = 20+i*(barW+1);
          return (
            <g key={i}>
              <rect x={x} y={svgH-bh} width={barW} height={bh} fill="#58a6ff" opacity="0.8" rx="1"/>
              {h.count>0&&<text x={x+barW/2} y={svgH-bh-3} textAnchor="middle" fontSize="8" fill="#6b7785">{h.count}</text>}
            </g>
          );
        })}
        <line x1="18" y1="5" x2="18" y2={svgH+2} stroke="#30363d"/>
        <line x1="18" y1={svgH+2} x2={svgW+20} y2={svgH+2} stroke="#30363d"/>
      </svg>
      <div className="dvhist-code-row">
        <pre className="dvhist-code"><code>{`plt.hist(order_amounts, bins=${bins}, color='steelblue', edgecolor='white')\nplt.xlabel('Order Amount (₹)')\nplt.ylabel('Frequency')`}</code></pre>
      </div>
      <div className="dvhist-shape">{shape}</div>
      <div className="dvhist-note">The mean (₹{Math.round(VALUES.reduce((a,b)=>a+b,0)/VALUES.length).toLocaleString()}) is pulled right by outliers. The histogram shows most orders cluster below ₹10,000.</div>
    </div>
  );
};
export default DvHistogramVisualization;
