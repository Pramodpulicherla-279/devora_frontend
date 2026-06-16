/* Lesson: Customizing Plots — Titles, Labels, Colors, Annotations
 * Visual: Toggle each customization layer on a base bar chart */
import React, { useState } from 'react';
import './visual.css';

const DATA = [{label:'Jan',v:42},{label:'Feb',v:38},{label:'Mar',v:51},{label:'Apr',v:47},{label:'May',v:29},{label:'Jun',v:62}];
const MAX_V = 65;

const LAYERS = [
  {id:'title',   label:'Add title/labels', desc:'plt.title() + plt.xlabel() + plt.ylabel()'},
  {id:'color',   label:'Custom colors',    desc:'color= parameter or colormap'},
  {id:'annot',   label:'Annotations',      desc:'plt.annotate() — highlight outliers'},
  {id:'grid',    label:'Grid + style',     desc:"plt.grid() + plt.style.use('seaborn-v0_8')"},
];

const DvCustomizeVisualization = () => {
  const [on, setOn] = useState(new Set());
  const toggle = id => setOn(prev=>{const s=new Set(prev); s.has(id)?s.delete(id):s.add(id); return s;});

  const barColor = (d) => on.has('color') ? (d.v===62?'#56d364':d.v===29?'#f85149':'#58a6ff') : '#4b5563';
  const showGrid = on.has('grid');
  const showAnnot = on.has('annot');
  const showTitle = on.has('title');

  const codeLines = [
    'plt.bar(months, revenue)',
    on.has('title') ? "plt.title('Monthly Revenue')\nplt.xlabel('Month')\nplt.ylabel('Revenue (₹k)')" : null,
    on.has('color') ? "colors = ['red' if v==min(revenue) else 'green' if v==max(revenue) else 'steelblue' for v in revenue]\nplt.bar(months, revenue, color=colors)" : null,
    on.has('annot') ? "plt.annotate('Peak!', xy=('Jun',62), xytext=('May',55),\n  arrowprops=dict(arrowstyle='->'))" : null,
    on.has('grid') ? "plt.style.use('seaborn-v0_8')\nplt.grid(axis='y', alpha=0.3)" : null,
  ].filter(Boolean);

  return (
    <div className="dvctm-wrap">
      <header className="dvctm-head">
        <span className="dvctm-badge">Matplotlib</span>
        <h2>Customizing Plots</h2>
        <p>Toggle each layer to see how it enhances the chart</p>
      </header>
      <div className="dvctm-toggles">
        {LAYERS.map(l=>(
          <button key={l.id} className={`dvctm-tog ${on.has(l.id)?'dvctm-tog--on':''}`} onClick={()=>toggle(l.id)}>
            <span className="dvctm-tog-check">{on.has(l.id)?'☑':'☐'}</span> {l.label}
          </button>
        ))}
      </div>
      <div className="dvctm-chart-wrap">
        <svg viewBox="0 0 360 195" xmlns="http://www.w3.org/2000/svg" className="dvctm-svg">
          {showTitle && <>
            <text x="180" y="16" textAnchor="middle" fontSize="11" fill="#e6edf3" fontWeight="600">Monthly Revenue</text>
            <text x="10"  y="100" textAnchor="middle" fontSize="9" fill="#6b7785" transform="rotate(-90,10,100)">Revenue (₹k)</text>
            <text x="195" y="193" textAnchor="middle" fontSize="9" fill="#6b7785">Month</text>
          </>}
          {showGrid && [20,40,60].map(v=>(
            <line key={v} x1="35" x2="345" y1={170-Math.round(v/MAX_V*140)} y2={170-Math.round(v/MAX_V*140)} stroke="#30363d" strokeDasharray="4 2"/>
          ))}
          {DATA.map((d,i)=>{
            const bh=Math.round(d.v/MAX_V*140); const x=38+i*51;
            return (
              <g key={i}>
                <rect x={x} y={170-bh} width={34} height={bh} fill={barColor(d)} rx="2" opacity="0.9"/>
                {showAnnot&&d.v===62&&(
                  <>
                    <text x={x+17} y={170-bh-18} textAnchor="middle" fontSize="8" fill="#56d364">Peak!</text>
                    <line x1={x+17} y1={170-bh-14} x2={x+17} y2={170-bh-4} stroke="#56d364" markerEnd="url(#arr)"/>
                  </>
                )}
                {showAnnot&&d.v===29&&<text x={x+17} y={170-bh-6} textAnchor="middle" fontSize="8" fill="#f85149">Low</text>}
                <text x={x+17} y="182" textAnchor="middle" fontSize="8.5" fill="#6b7785">{d.label}</text>
              </g>
            );
          })}
          <line x1="35" y1="25" x2="35" y2="172" stroke="#30363d"/>
          <line x1="35" y1="172" x2="345" y2="172" stroke="#30363d"/>
        </svg>
      </div>
      <pre className="dvctm-code"><code>{codeLines.join('\n')}</code></pre>
    </div>
  );
};
export default DvCustomizeVisualization;
