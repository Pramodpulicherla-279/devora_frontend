/* Lesson: Distribution Plots — histplot, kdeplot, distplot
 * Visual: Tab between chart types on same data with SVG */
import React, { useState } from 'react';
import './visual.css';

const VALS = [4.2,4.8,5.1,5.4,5.6,5.7,5.9,6.1,6.2,6.3,6.4,6.5,6.5,6.7,6.8,7.0,7.1,7.2,7.5,8.0,8.5,9.0,10.0,12.0,16.0,22.0];

const buildBins = (n) => {
  const mn=4,mx=23,w=(mx-mn)/n;
  const b=Array(n).fill(0);
  VALS.forEach(v=>{const i=Math.min(n-1,Math.floor((v-mn)/w));b[i]++;});
  return b.map((c,i)=>({from:mn+i*w,c}));
};

const PLOTS = [
  {
    id:'hist', label:'histplot', color:'#58a6ff',
    code:`sns.histplot(data=df, x='order_amount',\n  bins=8, kde=False, color='steelblue')`,
    note:'histplot replaces the deprecated distplot. Draws frequency bars — shows where values cluster.',
  },
  {
    id:'kde', label:'kdeplot', color:'#56d364',
    code:`sns.kdeplot(data=df, x='order_amount',\n  fill=True, color='mediumseagreen')`,
    note:'kdeplot draws a smooth probability density curve — shows the shape of the distribution without the "blocky" bin effect.',
  },
  {
    id:'both', label:'hist + kde', color:'#a78bfa',
    code:`sns.histplot(data=df, x='order_amount',\n  bins=8, kde=True, color='mediumpurple')`,
    note:'Setting kde=True adds the smooth curve on top of the histogram — best of both worlds for exploratory analysis.',
  },
];

const BINS = buildBins(8);
const MAX_C = Math.max(...BINS.map(b=>b.c));
const SVG_H=130, SVG_W=320, barW=Math.floor(SVG_W/BINS.length)-2;

const kdeY = (x) => {
  const bw=3;
  return VALS.reduce((sum,v)=>sum+Math.exp(-0.5*((x-v)/bw)**2)/bw,0);
};
const KDE_PTS = Array.from({length:40},(_,i)=>{
  const xv=4+i*0.5;
  return [20+Math.round((xv-4)/19*(SVG_W-10)), SVG_H-10-Math.round(kdeY(xv)*160)];
});

const DvDistplotVisualization = () => {
  const [sel, setSel] = useState('hist');
  const p = PLOTS.find(x=>x.id===sel);
  return (
    <div className="dvdist-wrap">
      <header className="dvdist-head">
        <span className="dvdist-badge">Seaborn</span>
        <h2>Distribution Plots</h2>
        <p>histplot, kdeplot — reveal the shape of your data</p>
      </header>
      <div className="dvdist-tabs">
        {PLOTS.map(x=><button key={x.id} className={`dvdist-tab ${sel===x.id?'dvdist-tab--on':''}`} style={sel===x.id?{borderColor:x.color,color:x.color}:{}} onClick={()=>setSel(x.id)}>{x.label}</button>)}
      </div>
      <svg viewBox={`0 0 ${SVG_W+20} ${SVG_H+10}`} className="dvdist-svg">
        {(sel==='hist'||sel==='both') && BINS.map((b,i)=>{
          const bh=Math.max(2,Math.round(b.c/MAX_C*(SVG_H-20)));
          return <rect key={i} x={15+i*(barW+2)} y={SVG_H-10-bh} width={barW} height={bh} fill={sel==='both'?'#a78bfa':'#58a6ff'} opacity="0.7" rx="1"/>;
        })}
        {(sel==='kde'||sel==='both') && (
          <polyline points={KDE_PTS.map(([x,y])=>`${x},${Math.max(10,y)}`).join(' ')} fill={sel==='kde'?'rgba(86,211,100,0.25)':'rgba(86,211,100,0.15)'} stroke={sel==='kde'?'#56d364':'#56d364'} strokeWidth="2.5" strokeLinejoin="round"/>
        )}
        <line x1="14" y1="8" x2="14" y2={SVG_H} stroke="#30363d"/>
        <line x1="14" y1={SVG_H} x2={SVG_W+14} y2={SVG_H} stroke="#30363d"/>
      </svg>
      <pre className="dvdist-code"><code>{p.code}</code></pre>
      <div className="dvdist-note">{p.note}</div>
    </div>
  );
};
export default DvDistplotVisualization;
