/* Lesson: INDEX-MATCH & XLOOKUP — the VLOOKUP upgrade
 * Visual: Side-by-side comparison showing left-lookup, multi-column, XLOOKUP */
import React, { useState } from 'react';
import './visual.css';

const PRODUCTS = [
  {id:'P01', name:'Laptop',  price:45000, stock:12},
  {id:'P02', name:'Phone',   price:18000, stock:0},
  {id:'P03', name:'Tablet',  price:22000, stock:7},
  {id:'P04', name:'Headset', price: 5500, stock:34},
];

const METHODS = [
  {
    id:'vlookup',
    label:'VLOOKUP (old)',
    color:'#f85149',
    formula:`=VLOOKUP("Phone", B2:D5, 2, FALSE)
-- Only looks RIGHT from the key column
-- "Phone" is in column B → can return C or D
-- CANNOT return column A (id)`,
    note:'VLOOKUP is locked to searching the leftmost column of your range. You can only return columns to the right of it.',
    lookup:'Phone',
    resultCol:'price',
    limitMsg:'Cannot look left (cannot return id)',
  },
  {
    id:'indexmatch',
    label:'INDEX-MATCH',
    color:'#56d364',
    formula:`=INDEX(A2:A5, MATCH("Phone", B2:B5, 0))
-- MATCH finds "Phone" in column B → row 2
-- INDEX returns that row from column A (id!)
-- Can look LEFT ✓`,
    note:'INDEX-MATCH separates the "where to look" (MATCH) from "what to return" (INDEX). This lets you look in any direction.',
    lookup:'Phone',
    resultCol:'id',
    limitMsg: null,
  },
  {
    id:'xlookup',
    label:'XLOOKUP (modern)',
    color:'#58a6ff',
    formula:`=XLOOKUP("Phone", B2:B5, D2:D5, "not found")
-- Lookup array: B2:B5 (name column)
-- Return array: D2:D5 (stock column)
-- Can look left, return multiple columns`,
    note:'XLOOKUP (Excel 365 + Google Sheets) is the cleanest syntax. One formula — find value, pick return range, set a not-found fallback.',
    lookup:'Phone',
    resultCol:'stock',
    limitMsg: null,
  },
];

const XlIndexMatchVisualization = () => {
  const [sel, setSel] = useState('vlookup');
  const m = METHODS.find(x=>x.id===sel);
  const row = PRODUCTS.find(p=>p.name===m.lookup);
  const result = row ? row[m.resultCol] : null;

  return (
    <div className="xlim-wrap">
      <header className="xlim-head">
        <span className="xlim-badge">Spreadsheets</span>
        <h2>INDEX-MATCH & XLOOKUP</h2>
        <p>The VLOOKUP upgrades — look left, return anything</p>
      </header>
      <div className="xlim-tabs">
        {METHODS.map(me=>(
          <button key={me.id} className={`xlim-tab ${sel===me.id?'xlim-tab--on':''}`}
            style={sel===me.id?{borderColor:me.color,color:me.color}:{}} onClick={()=>setSel(me.id)}>{me.label}</button>
        ))}
      </div>
      <div className="xlim-table-wrap">
        <table className="xlim-table">
          <thead><tr><th>id (A)</th><th>name (B)</th><th>price (C)</th><th>stock (D)</th></tr></thead>
          <tbody>
            {PRODUCTS.map((p,i)=>(
              <tr key={i} className={p.name===m.lookup?'xlim-tr--on':''}>
                <td className={m.resultCol==='id'?'xlim-td-hi':''}>{p.id}</td>
                <td>{p.name}</td>
                <td className={m.resultCol==='price'?'xlim-td-hi':''}>₹{p.price.toLocaleString()}</td>
                <td className={m.resultCol==='stock'?'xlim-td-hi':''}>{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <pre className="xlim-code"><code>{m.formula}</code></pre>
      <div className="xlim-result">
        Result for "Phone":&nbsp;
        {m.limitMsg
          ? <span className="xlim-err">{m.limitMsg}</span>
          : <strong style={{color:m.color}}>{m.resultCol} = {m.resultCol==='price'?`₹${result?.toLocaleString()}`:result}</strong>}
      </div>
      <div className="xlim-note">{m.note}</div>
    </div>
  );
};
export default XlIndexMatchVisualization;
