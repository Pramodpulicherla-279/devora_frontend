/* Lesson: Working with Dates and Times in Python
 * Visual type: ILLUSTRATION
 * Common date operations — parse, format, diff, extract — with before/after */
import React, { useState } from 'react';
import './visual.css';

const OPS = [
  {
    id: 'parse',
    label: 'Parse string → date',
    code: `from datetime import datetime

raw = '2024-06-15'          # string from CSV
date = datetime.strptime(raw, '%Y-%m-%d')
# date → datetime(2024, 6, 15, 0, 0)

# pandas shortcut:
df['date'] = pd.to_datetime(df['date'])`,
    note: 'Dates in CSVs arrive as strings. strptime() converts them. %Y=4-digit year, %m=month, %d=day.',
  },
  {
    id: 'format',
    label: 'Format → string',
    code: `date = datetime(2024, 6, 15)
date.strftime('%d %b %Y')   # '15 Jun 2024'
date.strftime('%d/%m/%Y')   # '15/06/2024'
date.strftime('%B %Y')      # 'June 2024'  (report header)`,
    note: 'strftime() goes the other way — datetime to display string. Useful for report titles and filenames.',
  },
  {
    id: 'extract',
    label: 'Extract parts',
    code: `date = datetime(2024, 6, 15)
date.year     # 2024
date.month    # 6
date.day      # 15
date.weekday()  # 5  (Saturday, 0=Monday)

# In pandas:
df['month'] = df['date'].dt.month
df['year']  = df['date'].dt.year
df['dow']   = df['date'].dt.day_name()`,
    note: 'Extract parts to group by month or year. df.dt accessor brings datetime methods to pandas columns.',
  },
  {
    id: 'diff',
    label: 'Date arithmetic',
    code: `from datetime import timedelta

order_date = datetime(2024, 6, 1)
ship_date  = datetime(2024, 6, 8)
days_to_ship = (ship_date - order_date).days  # 7

next_week = order_date + timedelta(weeks=1)
deadline  = order_date + timedelta(days=30)`,
    note: 'Subtracting two datetimes gives a timedelta. .days extracts the integer. timedelta lets you add/subtract intervals.',
  },
];

const PyDatesVisualization = () => {
  const [sel, setSel] = useState('parse');
  const op = OPS.find(o=>o.id===sel);

  return (
    <div className="pydt-wrap">
      <header className="pydt-head">
        <span className="pydt-badge">Python Basics</span>
        <h2>Dates &amp; Times</h2>
        <p>The four operations that cover 90% of date work</p>
      </header>

      <div className="pydt-tabs">
        {OPS.map(o=><button key={o.id} className={`pydt-tab ${sel===o.id?'pydt-tab--on':''}`} onClick={()=>setSel(o.id)}>{o.label}</button>)}
      </div>

      <pre className="pydt-code"><code>{op.code}</code></pre>
      <div className="pydt-note">{op.note}</div>

      <div className="pydt-cheatsheet">
        <div className="pydt-cs-label">Format codes</div>
        <div className="pydt-cs-grid">
          {[['%Y','2024'],['%m','06'],['%d','15'],['%b','Jun'],['%B','June'],['%A','Saturday'],['%H:%M','14:30']].map(([code,ex])=>(
            <div key={code} className="pydt-cs-item"><code>{code}</code><span>{ex}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PyDatesVisualization;
