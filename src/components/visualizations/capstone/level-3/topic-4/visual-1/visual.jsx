/* Lesson: Publishing to GitHub
 * Visual: Repo structure diagram + README anatomy */
import React, { useState } from 'react';
import './visual.css';

const TREE = [
  {path:'sales-analysis-2024/', type:'folder', top:true, desc:'Root repository'},
  {path:'  README.md', type:'file', star:true, desc:'Project overview, findings summary, how to run'},
  {path:'  data/', type:'folder', desc:'Raw and cleaned datasets'},
  {path:'    raw_orders.csv', type:'file', desc:'Original dataset (never modify)'},
  {path:'    clean_orders.csv', type:'file', desc:'Output of 01_cleaning.py'},
  {path:'  notebooks/', type:'folder', desc:'Analysis notebooks'},
  {path:'    01_cleaning.ipynb', type:'file', desc:'EDA + data cleaning'},
  {path:'    02_analysis.ipynb', type:'file', desc:'SQL + pandas analysis'},
  {path:'    03_modelling.ipynb', type:'file', desc:'ML model training'},
  {path:'  visuals/', type:'folder', desc:'Exported chart images'},
  {path:'    dashboard.png', type:'file', desc:'Main dashboard output'},
  {path:'  report/', type:'folder', desc:'Stakeholder deliverables'},
  {path:'    stakeholder_report.pdf', type:'file', desc:'Final report'},
  {path:'  requirements.txt', type:'file', desc:'pip install -r requirements.txt'},
];

const README = `# Sales Analysis 2024

## Overview
End-to-end analysis of 1,791 sales orders to identify
profitability drivers.

## Key Findings
1. Electronics drives 47% of revenue (highest AOV)
2. Q4 revenue is 28% above average (p<0.001)
3. Discounts >15% reduce order value by 43%

## How to run
\`\`\`bash
pip install -r requirements.txt
jupyter notebook notebooks/01_cleaning.ipynb
\`\`\`

## Tools Used
Python 3.11 · pandas · scikit-learn · matplotlib`;

const CapGithubVisualization = () => {
  const [view, setView] = useState('tree');
  const [hovFile, setHovFile] = useState(null);
  return (
    <div className="capgh-wrap">
      <header className="capgh-head">
        <span className="capgh-badge">Capstone</span>
        <h2>Publishing to GitHub</h2>
        <p>Turn your project into a portfolio piece</p>
      </header>
      <div className="capgh-tabs">
        <button className={`capgh-tab ${view==='tree'?'capgh-tab--on':''}`} onClick={()=>setView('tree')}>Repo structure</button>
        <button className={`capgh-tab ${view==='readme'?'capgh-tab--on':''}`} onClick={()=>setView('readme')}>README.md</button>
      </div>
      {view==='tree' ? (
        <>
          <div className="capgh-tree">
            {TREE.map((f,i)=>(
              <div key={i} className={`capgh-file ${f.top?'capgh-file--top':''} ${hovFile===i?'capgh-file--hov':''}`}
                onMouseEnter={()=>setHovFile(i)} onMouseLeave={()=>setHovFile(null)}>
                <span className="capgh-file-path">{f.type==='folder'?'📁':'📄'} {f.path.trim()}{f.star?<span className="capgh-star"> ⭐</span>:''}</span>
              </div>
            ))}
          </div>
          {hovFile!==null && <div className="capgh-tooltip">{TREE[hovFile].desc}</div>}
        </>
      ) : (
        <pre className="capgh-readme"><code>{README}</code></pre>
      )}
      <div className="capgh-note">Star ⭐ your own repo and share the link on LinkedIn. Recruiters check GitHub — a clean, documented repo with a clear README is worth more than 10 certificate screenshots.</div>
    </div>
  );
};
export default CapGithubVisualization;
