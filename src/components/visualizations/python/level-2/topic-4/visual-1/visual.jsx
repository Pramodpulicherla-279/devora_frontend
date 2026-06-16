/* Lesson: String Manipulation — Cleaning Messy Text Data
 * Visual type: INTERACTIVE
 * Dirty city name input → select cleaning methods → see cleaned output */
import React, { useState } from 'react';
import './visual.css';

const SAMPLES = ['  mumbai ', 'PUNE', ' Delhi\t', 'bengaluru!', 'hyderabad123'];

const METHODS = [
  { id:'strip',   call:'.strip()',          fn: s => s.trim(),                                    note:'Removes whitespace (spaces, tabs, \\n) from both ends. Always run first.' },
  { id:'lower',   call:'.lower()',          fn: s => s.trim().toLowerCase(),                      note:'.lower() after .strip() gives clean normalised strings for comparison.' },
  { id:'title',   call:'.title()',          fn: s => s.trim().toLowerCase().replace(/\b\w/g,c=>c.toUpperCase()), note:'Title-case for display: "mumbai" → "Mumbai".' },
  { id:'replace', call:".replace('!','')",  fn: s => s.trim().replace(/[!0-9]/g,''),             note:'.replace(old, new) swaps characters. Chain multiple calls for multiple replacements.' },
  { id:'split',   call:".split(' ')[0]",   fn: s => s.trim().split(' ')[0],                      note:'.split() on spaces and take [0] — extracts first word from compound strings.' },
  { id:'isdigit', call:'.isdigit()',        fn: s => String(s.trim().replace(/[^0-9]/g,'').length > 0), note:'.isdigit() checks if all chars are digits. Use to detect numeric strings before conversion.' },
];

const PyStrManipVisualization = () => {
  const [method, setMethod] = useState('lower');
  const m = METHODS.find(x=>x.id===method);

  return (
    <div className="pystrm-wrap">
      <header className="pystrm-head">
        <span className="pystrm-badge">Python Basics</span>
        <h2>String Manipulation</h2>
        <p>Cleaning messy city names — one method at a time</p>
      </header>

      <div className="pystrm-methods">
        {METHODS.map(me=>(
          <button key={me.id} className={`pystrm-method ${method===me.id?'pystrm-method--on':''}`} onClick={()=>setMethod(me.id)}>
            {me.call}
          </button>
        ))}
      </div>

      <pre className="pystrm-code"><code>{`city_name${m.call}`}</code></pre>

      <div className="pystrm-table-wrap">
        <table className="pystrm-table">
          <thead><tr><th>Raw input</th><th>After {m.call}</th></tr></thead>
          <tbody>
            {SAMPLES.map((v,i)=>(
              <tr key={i}>
                <td className="pystrm-raw">"{v}"</td>
                <td className="pystrm-out">"{m.fn(v)}"</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pystrm-note">{m.note}</div>

      <div className="pystrm-chain">
        <div className="pystrm-chain-label">Common cleaning chain:</div>
        <code className="pystrm-chain-code">city.strip().lower().replace('!','').replace('_',' ')</code>
      </div>
    </div>
  );
};

export default PyStrManipVisualization;
