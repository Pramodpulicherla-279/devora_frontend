/* Lesson: Time Series Basics — Resampling and Rolling Windows
 * Visual type: INTERACTIVE
 * Show daily Zephyr order data; let user toggle between daily / weekly / monthly resample + 7-day rolling */
import React, { useState, useMemo } from 'react';
import './visual.css';

const DAILY = [
  { d:'Jun 01', v:4200 }, { d:'Jun 02', v:1850 }, { d:'Jun 03', v:6700 }, { d:'Jun 04', v:980  },
  { d:'Jun 05', v:12400},{ d:'Jun 06', v:2300 }, { d:'Jun 07', v:7800 }, { d:'Jun 08', v:450  },
  { d:'Jun 09', v:3100 }, { d:'Jun 10', v:5500 }, { d:'Jun 11', v:8200 }, { d:'Jun 12', v:1600 },
  { d:'Jun 13', v:9800 }, { d:'Jun 14', v:3400 },
];

function resampleWeekly(data) {
  const weeks = [data.slice(0,7), data.slice(7,14)];
  return weeks.map((w, i) => ({ d: `Week ${i+1}`, v: Math.round(w.reduce((s,x)=>s+x.v,0)/w.length) }));
}
function resampleMonthly(data) {
  const total = data.reduce((s,x)=>s+x.v,0);
  return [{ d:'June', v: Math.round(total/data.length) }];
}
function rolling7(data) {
  return data.map((x,i) => {
    const window = data.slice(Math.max(0,i-6), i+1);
    return { d:x.d, v:Math.round(window.reduce((s,w)=>s+w.v,0)/window.length) };
  });
}

const VIEWS = [
  { id:'daily',   label:'Daily (raw)',       code:"df_daily = df.set_index('date').resample('D')['amount'].sum()",          data: () => DAILY },
  { id:'weekly',  label:'Weekly resample(W)', code:"df_weekly = df.set_index('date').resample('W')['amount'].mean()",       data: () => resampleWeekly(DAILY) },
  { id:'monthly', label:'Monthly resample(M)', code:"df_monthly = df.set_index('date').resample('M')['amount'].mean()",     data: () => resampleMonthly(DAILY) },
  { id:'rolling', label:'7-day rolling mean', code:"df['rolling_7'] = df['amount'].rolling(window=7).mean()",              data: () => rolling7(DAILY) },
];

const PdTimeSeriesVisualization = () => {
  const [sel, setSel] = useState('daily');
  const view = VIEWS.find(v => v.id === sel);
  const data = useMemo(() => view.data(), [sel]);

  const max = Math.max(...data.map(d=>d.v));
  const H = 120;

  return (
    <div className="pdts-wrap">
      <header className="pdts-head">
        <span className="pdts-badge">Pandas &amp; NumPy</span>
        <h2>Time Series</h2>
        <p>Zephyr daily orders — resample and smooth</p>
      </header>

      <div className="pdts-tabs">
        {VIEWS.map(v => (
          <button key={v.id} className={`pdts-tab ${sel===v.id?'pdts-tab--on':''}`} onClick={()=>setSel(v.id)}>{v.label}</button>
        ))}
      </div>

      <pre className="pdts-code"><code>{view.code}</code></pre>

      <div className="pdts-chart-wrap">
        <svg viewBox={`0 0 ${Math.max(data.length*44+20,300)} ${H+40}`} width="100%" preserveAspectRatio="xMidYMid meet">
          {data.map((d, i) => {
            const barH = Math.max(2, (d.v / max) * H);
            const x = i * 44 + 22;
            const y = H - barH + 10;
            return (
              <g key={d.d}>
                <rect x={x-14} y={y} width={28} height={barH} rx={3} fill={sel==='rolling'?'#a78bfa':'#58a6ff'} opacity={0.85} />
                <text x={x} y={H+22} textAnchor="middle" fontSize="8" fill="#6b7785">{d.d.replace('Jun ','')}</text>
                <text x={x} y={y-3} textAnchor="middle" fontSize="7.5" fill="#a3adbb">{d.v>=1000?`${(d.v/1000).toFixed(1)}k`:d.v}</text>
              </g>
            );
          })}
          <line x1="8" y1={H+10} x2={data.length*44+16} y2={H+10} stroke="#30363d" strokeWidth="1"/>
        </svg>
      </div>

      <div className="pdts-note">
        <strong>resample()</strong> needs the DatetimeIndex set first: <code>df.set_index('date')</code>. Rule strings: 'D'=daily, 'W'=weekly, 'M'=monthly, 'Q'=quarterly. <strong>rolling(7).mean()</strong> produces a smoothed trend line without collapsing the rows.
      </div>
    </div>
  );
};

export default PdTimeSeriesVisualization;
