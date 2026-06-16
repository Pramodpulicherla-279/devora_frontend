/* Lesson: Text functions — TRIM, CONCATENATE, LEFT/RIGHT/MID
 * Visual: Method picker with before/after on 5 sample strings */
import React, { useState } from 'react';
import './visual.css';

const SAMPLES = [
  '  Aisha Sharma  ',
  'RAVI.KUMAR@GMAIL.COM',
  'IND-2024-00142',
  '  bengaluru  ',
  'First Name: Priya',
];

const FNS = [
  {
    id:'trim', label:'TRIM',
    formula: s => `=TRIM("${s.trim()}")`,
    before: s => s,
    after:  s => s.trim(),
    note:'TRIM removes leading, trailing, and extra internal spaces. Essential for cleaning imported data.',
  },
  {
    id:'lower', label:'LOWER / UPPER',
    formula: s => `=LOWER("${s}")`,
    before: s => s,
    after:  s => s.toLowerCase(),
    note:'LOWER converts to lowercase, UPPER to uppercase. Use before matching or deduplicating text columns.',
  },
  {
    id:'left', label:'LEFT / RIGHT',
    formula: s => `=LEFT("${s.trim()}",3)`,
    before: s => s.trim(),
    after:  s => s.trim().substring(0,3),
    note:'LEFT(text, n) returns the first n characters. RIGHT(text, n) returns the last n. Useful for extracting codes or prefixes.',
  },
  {
    id:'mid', label:'MID',
    formula: s => `=MID("${s.trim()}",5,4)`,
    before: s => s.trim(),
    after:  s => s.trim().substring(4,8),
    note:'MID(text, start, length) extracts from the middle. Start at position 5, take 4 characters.',
  },
  {
    id:'concat', label:'CONCAT',
    formula: (_,i) => `=CONCAT(A${i+2}," | row ",${i+2})`,
    before: s => s.trim(),
    after:  (s,i) => `${s.trim()} | row ${i+2}`,
    note:'CONCAT (or &) joins text together. TEXTJOIN lets you add a delimiter across a range automatically.',
  },
];

const XlTextFnVisualization = () => {
  const [sel, setSel] = useState('trim');
  const fn = FNS.find(f=>f.id===sel);
  return (
    <div className="xltext-wrap">
      <header className="xltext-head">
        <span className="xltext-badge">Spreadsheets</span>
        <h2>Text Functions</h2>
        <p>TRIM · LOWER/UPPER · LEFT/RIGHT · MID · CONCAT</p>
      </header>
      <div className="xltext-tabs">
        {FNS.map(f=><button key={f.id} className={`xltext-tab ${sel===f.id?'xltext-tab--on':''}`} onClick={()=>setSel(f.id)}>{f.label}</button>)}
      </div>
      <div className="xltext-table-wrap">
        <table className="xltext-table">
          <thead><tr><th>Before</th><th>Formula</th><th>After</th></tr></thead>
          <tbody>
            {SAMPLES.map((s,i)=>(
              <tr key={i}>
                <td className="xltext-before"><code>"{s}"</code></td>
                <td className="xltext-formula"><code>{fn.formula(s,i)}</code></td>
                <td className="xltext-after"><code>"{fn.after(s,i)}"</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="xltext-note">{fn.note}</div>
    </div>
  );
};
export default XlTextFnVisualization;
