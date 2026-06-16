/* Lesson: IF, AND, OR, IFS
 * Visual: Formula builder — pick condition, see formula + result column */
import React, { useState } from 'react';
import './visual.css';

const DATA = [
  {name:'Aisha',  score:87, region:'North'},
  {name:'Ravi',   score:54, region:'South'},
  {name:'Priya',  score:91, region:'North'},
  {name:'Meera',  score:67, region:'East'},
  {name:'Arjun',  score:45, region:'South'},
  {name:'Divya',  score:78, region:'North'},
];

const FNS = [
  {
    id:'if',
    label:'IF',
    formula: '=IF(B2>=60,"Pass","Fail")',
    result: r => r.score >= 60 ? 'Pass' : 'Fail',
    color: r => r.score >= 60 ? '#56d364' : '#f85149',
    note:'IF(condition, value_if_true, value_if_false). The condition must evaluate to TRUE or FALSE.',
  },
  {
    id:'and',
    label:'IF + AND',
    formula: '=IF(AND(B2>=60, C2="North"), "Priority", "Standard")',
    result: r => (r.score>=60 && r.region==='North') ? 'Priority' : 'Standard',
    color: r => (r.score>=60 && r.region==='North') ? '#a78bfa' : '#a3adbb',
    note:'AND requires ALL conditions to be true. Use to combine multiple filters into a single IF.',
  },
  {
    id:'or',
    label:'IF + OR',
    formula: '=IF(OR(B2>=90, C2="North"), "Review", "OK")',
    result: r => (r.score>=90 || r.region==='North') ? 'Review' : 'OK',
    color: r => (r.score>=90 || r.region==='North') ? '#58a6ff' : '#a3adbb',
    note:'OR requires at least ONE condition to be true. Useful for flagging either high scorers or important regions.',
  },
  {
    id:'ifs',
    label:'IFS',
    formula: '=IFS(B2>=80,"A", B2>=60,"B", B2>=40,"C", TRUE,"F")',
    result: r => r.score>=80?'A':r.score>=60?'B':r.score>=40?'C':'F',
    color: r => {const g=r.score>=80?'A':r.score>=60?'B':r.score>=40?'C':'F'; return g==='A'?'#56d364':g==='B'?'#58a6ff':g==='C'?'#f97316':'#f85149';},
    note:'IFS replaces nested IF(IF(IF(...))) chains. The first TRUE condition wins. The final TRUE acts as an "else".',
  },
];

const XlIfVisualization = () => {
  const [sel, setSel] = useState('if');
  const fn = FNS.find(f=>f.id===sel);
  return (
    <div className="xlif-wrap">
      <header className="xlif-head">
        <span className="xlif-badge">Spreadsheets</span>
        <h2>IF, AND, OR, IFS</h2>
        <p>Making your spreadsheet think with logic formulas</p>
      </header>
      <div className="xlif-tabs">
        {FNS.map(f=><button key={f.id} className={`xlif-tab ${sel===f.id?'xlif-tab--on':''}`} onClick={()=>setSel(f.id)}>{f.label}</button>)}
      </div>
      <pre className="xlif-code"><code>{fn.formula}</code></pre>
      <div className="xlif-table-wrap">
        <table className="xlif-table">
          <thead><tr><th>Name</th><th>Score</th><th>Region</th><th>Result</th></tr></thead>
          <tbody>
            {DATA.map((r,i)=>(
              <tr key={i}>
                <td>{r.name}</td>
                <td>{r.score}</td>
                <td>{r.region}</td>
                <td style={{color:fn.color(r),fontWeight:600}}>{fn.result(r)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="xlif-note">{fn.note}</div>
    </div>
  );
};
export default XlIfVisualization;
