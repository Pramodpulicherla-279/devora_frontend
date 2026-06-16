/* Lesson: String Operations in Pandas — the .str Accessor
 * Visual type: INTERACTIVE
 * Pick a .str method — see before/after for sample values */
import React, { useState } from 'react';
import './visual.css';

const SAMPLE = ['  Mumbai ', 'pune', 'DELHI ', 'Bengaluru', ' hyderabad'];

const METHODS = [
  { id:'strip',   call:'.str.strip()',         fn: s => s.trim(),                           note:'Removes leading and trailing whitespace. Always run this on city/name columns.' },
  { id:'lower',   call:'.str.lower()',         fn: s => s.trim().toLowerCase(),             note:'Normalises case. Run before comparing city names or email addresses.' },
  { id:'upper',   call:'.str.upper()',         fn: s => s.trim().toUpperCase(),             note:'Useful for code/ID columns where consistent casing matters.' },
  { id:'title',   call:'.str.title()',         fn: s => s.trim().replace(/\b\w/g,c=>c.toUpperCase()), note:'Title-cases each word — ideal for display names.' },
  { id:'contains',call:".str.contains('bad')", fn: s => String(s.toLowerCase().includes('bad')), input: ['mumbai_bad', 'pune', 'delhi_bad', 'beng', 'hyd_bad'], note:'Returns boolean mask. Chain with df[mask] to filter.' },
  { id:'replace', call:".str.replace('_',' ')", fn: s => s.replace(/_/g,' '),              input: ['mumbai_west', 'pune_east', 'delhi_north', 'beng_south', 'hyd_central'], note:'Works like Python .replace() but vectorised across the whole column.' },
  { id:'split',   call:".str.split('_').str[0]", fn: s => s.split('_')[0],                 input: ['mumbai_west', 'pune_east', 'delhi_north', 'beng_south', 'hyd_central'], note:'Split then index: extracts part of compound strings like "category_subcategory".' },
  { id:'len',     call:'.str.len()',           fn: s => String(s.trim().length),            note:'Character count per value. Useful for detecting data entry errors (city name of length 1).' },
];

const PdStrAccessorVisualization = () => {
  const [sel, setSel] = useState('strip');
  const m = METHODS.find(x => x.id === sel);
  const input = m.input || SAMPLE;

  return (
    <div className="pdstr-wrap">
      <header className="pdstr-head">
        <span className="pdstr-badge">Pandas &amp; NumPy</span>
        <h2>String Operations — .str accessor</h2>
        <p>Select a method — see before and after</p>
      </header>

      <div className="pdstr-methods">
        {METHODS.map(me => (
          <button key={me.id} className={`pdstr-method ${sel===me.id?'pdstr-method--on':''}`} onClick={()=>setSel(me.id)}>
            {me.call}
          </button>
        ))}
      </div>

      <pre className="pdstr-code"><code>{`df['city']${m.call}`}</code></pre>

      <div className="pdstr-table-wrap">
        <table className="pdstr-table">
          <thead><tr><th>Before</th><th>After</th></tr></thead>
          <tbody>
            {input.map((v, i) => (
              <tr key={i}>
                <td className="pdstr-before">{v}</td>
                <td className="pdstr-after">{m.fn(v)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pdstr-note">{m.note}</div>
    </div>
  );
};

export default PdStrAccessorVisualization;
