/* Lesson: Introduction to Power BI
 * Visual: Ecosystem diagram — how data flows from source to dashboard */
import React, { useState } from 'react';
import './visual.css';

const STEPS = [
  {id:'source', label:'Data Sources', color:'#58a6ff', icon:'🗄️',
   desc:'Excel files, SQL databases, SharePoint, APIs, CSV — Power BI connects to 100+ sources via Get Data.',
   detail:'CSV / Excel → direct upload\nSQL Server → live connection\nSharePoint → automatic refresh',
  },
  {id:'transform', label:'Power Query', color:'#a78bfa', icon:'⚙️',
   desc:'Built-in ETL tool. Clean, reshape, join tables without writing code. Think pandas but with a GUI.',
   detail:'Remove duplicates\nChange data types\nMerge queries (VLOOKUP-style)\nUnpivot columns',
  },
  {id:'model', label:'Data Model', color:'#f97316', icon:'🔗',
   desc:'Define relationships between tables (like SQL JOINs) and write DAX measures for custom calculations.',
   detail:'Star schema (fact + dimension tables)\nDAX: Revenue = SUM(Sales[amount])\nTime intelligence: YTD, MTD',
  },
  {id:'visual', label:'Visuals', color:'#56d364', icon:'📊',
   desc:'Drag fields onto charts, slicers, maps, and KPI cards. No code required for 90% of dashboards.',
   detail:'Bar / Line / Pie charts\nSlicers (filters)\nKPI cards\nMap visuals\nCustom visuals marketplace',
  },
  {id:'share', label:'Share', color:'#e879f9', icon:'🌐',
   desc:'Publish to Power BI Service (web). Share with colleagues, embed in SharePoint, or schedule refresh.',
   detail:'Publish to workspace\nShare dashboard link\nScheduled refresh daily/hourly\nRow-level security',
  },
];

const DvPowerBiVisualization = () => {
  const [sel, setSel] = useState('source');
  const s = STEPS.find(x=>x.id===sel);
  return (
    <div className="dvpbi-wrap">
      <header className="dvpbi-head">
        <span className="dvpbi-badge">Power BI</span>
        <h2>Power BI — Data to Dashboard</h2>
        <p>The end-to-end flow from raw data to shared report</p>
      </header>
      <div className="dvpbi-flow">
        {STEPS.map((st,i)=>(
          <React.Fragment key={st.id}>
            <button className={`dvpbi-step ${sel===st.id?'dvpbi-step--on':''}`}
              style={sel===st.id?{borderColor:st.color,background:st.color+'20'}:{}} onClick={()=>setSel(st.id)}>
              <span>{st.icon}</span>
              <span className="dvpbi-step-label" style={sel===st.id?{color:st.color}:{}}>{st.label}</span>
            </button>
            {i<STEPS.length-1&&<span className="dvpbi-arrow">→</span>}
          </React.Fragment>
        ))}
      </div>
      <div className="dvpbi-detail-card">
        <div className="dvpbi-detail-head" style={{color:s.color}}>{s.icon} {s.label}</div>
        <p className="dvpbi-detail-desc">{s.desc}</p>
        <pre className="dvpbi-detail-list"><code>{s.detail}</code></pre>
      </div>
      <div className="dvpbi-note">Power BI is free to install (Desktop). You need a Pro licence (or Power BI Premium) to share reports with others in your organisation.</div>
    </div>
  );
};
export default DvPowerBiVisualization;
