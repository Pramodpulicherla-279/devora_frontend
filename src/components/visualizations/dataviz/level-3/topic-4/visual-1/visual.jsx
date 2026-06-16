/* Lesson: Plotly — Interactive Charts for the Web
 * Visual: Feature showcase — hover, zoom, filter demo with SVG annotation */
import React, { useState } from 'react';
import './visual.css';

const DATA = [
  {month:'Jan',revenue:42,category:'Electronics'},{month:'Feb',revenue:38,category:'Electronics'},
  {month:'Mar',revenue:51,category:'Electronics'},{month:'Apr',revenue:47,category:'Electronics'},
  {month:'Jan',revenue:18,category:'Clothing'},   {month:'Feb',revenue:21,category:'Clothing'},
  {month:'Mar',revenue:25,category:'Clothing'},   {month:'Apr',revenue:19,category:'Clothing'},
  {month:'Jan',revenue:31,category:'Furniture'},  {month:'Feb',revenue:29,category:'Furniture'},
  {month:'Mar',revenue:38,category:'Furniture'},  {month:'Apr',revenue:34,category:'Furniture'},
];
const COLORS = {Electronics:'#58a6ff',Clothing:'#56d364',Furniture:'#a78bfa'};
const MONTHS = ['Jan','Feb','Mar','Apr'];
const CATS = ['Electronics','Clothing','Furniture'];

const FEATURES = [
  {id:'hover',  label:'Hover tooltips',   desc:'Plotly shows rich tooltips on hover automatically. Use hovertemplate= to customise what appears.'},
  {id:'filter', label:'Show/hide series', desc:'Click a category in the legend to toggle it on/off. Double-click to isolate. Built in with no extra code.'},
  {id:'zoom',   label:'Zoom & pan',       desc:'Click-drag to zoom into a region. Double-click to reset. Plotly adds a full toolbar automatically.'},
];

const CODE = `import plotly.express as px

fig = px.line(df, x='month', y='revenue',
              color='category',
              title='Revenue by Category',
              markers=True)

fig.show()  # Opens in browser
# fig.write_html('chart.html')  # Save for sharing`;

const DvPlotlyVisualization = () => {
  const [feat, setFeat] = useState('hover');
  const [hovered, setHovered] = useState(null);
  const [hidden, setHidden] = useState(new Set());
  const f = FEATURES.find(x=>x.id===feat);

  const toggleCat = (cat) => {
    if(feat!=='filter') return;
    setHidden(prev=>{const s=new Set(prev); s.has(cat)?s.delete(cat):s.add(cat); return s;});
  };

  return (
    <div className="dvply-wrap">
      <header className="dvply-head">
        <span className="dvply-badge">Plotly</span>
        <h2>Plotly — Interactive Charts</h2>
        <p>Static → interactive in one import</p>
      </header>
      <div className="dvply-tabs">
        {FEATURES.map(f=><button key={f.id} className={`dvply-tab ${feat===f.id?'dvply-tab--on':''}`} onClick={()=>setFeat(f.id)}>{f.label}</button>)}
      </div>
      <div className="dvply-legend">
        {CATS.map(c=>(
          <span key={c} className={`dvply-leg ${hidden.has(c)?'dvply-leg--off':''}`} style={{borderColor:COLORS[c]}} onClick={()=>toggleCat(c)}>
            <span className="dvply-dot" style={{background:COLORS[c]}}></span>{c}
          </span>
        ))}
      </div>
      <svg viewBox="0 0 360 160" className="dvply-svg">
        {CATS.filter(c=>!hidden.has(c)).map(cat=>{
          const pts = MONTHS.map((m,i)=>{
            const row=DATA.find(d=>d.month===m&&d.category===cat);
            return `${25+i*95},${145-Math.round(row.revenue/55*110)}`;
          });
          return (
            <g key={cat}>
              <polyline points={pts.join(' ')} fill="none" stroke={COLORS[cat]} strokeWidth="2.5" strokeLinejoin="round"/>
              {MONTHS.map((m,i)=>{
                const row=DATA.find(d=>d.month===m&&d.category===cat);
                const cx=25+i*95, cy=145-Math.round(row.revenue/55*110);
                const isH=hovered&&hovered.cat===cat&&hovered.month===m;
                return (
                  <g key={m}>
                    <circle cx={cx} cy={cy} r={isH?6:4} fill={COLORS[cat]} opacity="0.9"
                      onMouseEnter={()=>feat==='hover'&&setHovered({cat,month:m,val:row.revenue})}
                      onMouseLeave={()=>setHovered(null)} style={{cursor:'pointer'}}/>
                    {isH&&<>
                      <rect x={cx-30} y={cy-28} width={60} height={20} fill="#161b22" rx="4" stroke={COLORS[cat]} strokeWidth="1"/>
                      <text x={cx} y={cy-14} textAnchor="middle" fontSize="8.5" fill="#e6edf3">{cat.substring(0,4)}: ₹{row.revenue}k</text>
                    </>}
                  </g>
                );
              })}
            </g>
          );
        })}
        {MONTHS.map((m,i)=><text key={m} x={25+i*95} y="158" textAnchor="middle" fontSize="8.5" fill="#6b7785">{m}</text>)}
        <line x1="14" y1="10" x2="14" y2="148" stroke="#30363d"/>
        <line x1="14" y1="148" x2="350" y2="148" stroke="#30363d"/>
      </svg>
      <div className="dvply-hint">{f.desc}</div>
      <pre className="dvply-code"><code>{CODE}</code></pre>
    </div>
  );
};
export default DvPlotlyVisualization;
