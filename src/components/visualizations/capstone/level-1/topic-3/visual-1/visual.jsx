/* Lesson: EDA — The Full Process
 * Visual: 6-step EDA checklist with expandable steps */
import React, { useState } from 'react';
import './visual.css';

const STEPS = [
  {id:1, title:'Shape & types', cmd:'df.shape, df.dtypes', desc:'How many rows/cols? What types are each column? Are there columns that look numeric but are stored as object?'},
  {id:2, title:'Missing values', cmd:'df.isnull().sum()', desc:'Which columns have NaN? What % is missing? Is the missingness random or systematic (e.g., all blanks for one region)?'},
  {id:3, title:'Univariate stats', cmd:'df.describe()', desc:'Min, max, mean, std, quartiles for numeric columns. Does the range make sense? Flag impossibly large or negative values.'},
  {id:4, title:'Distributions', cmd:'df[col].hist()', desc:'Skewed right? Bimodal? Any obvious outliers? Run this for every numeric column before modelling.'},
  {id:5, title:'Correlations', cmd:'df.corr()', desc:'Which variables move together? Heatmap is fastest. Correlation > 0.7 or < -0.7 is worth noting.'},
  {id:6, title:'Categorical breakdowns', cmd:'df.groupby(cat).describe()', desc:'How do numeric columns differ across categories? Reveals segmentation opportunities and data quality issues by group.'},
];

const CapEdaVisualization = () => {
  const [open, setOpen] = useState(1);
  return (
    <div className="capeda-wrap">
      <header className="capeda-head">
        <span className="capeda-badge">Capstone</span>
        <h2>EDA — The Full Process</h2>
        <p>Six steps before you touch any chart or model</p>
      </header>
      <div className="capeda-steps">
        {STEPS.map(s=>(
          <div key={s.id} className={`capeda-step ${open===s.id?'capeda-step--on':''}`} onClick={()=>setOpen(open===s.id?null:s.id)}>
            <div className="capeda-step-head">
              <span className="capeda-step-n">{s.id}</span>
              <span className="capeda-step-title">{s.title}</span>
              <code className="capeda-step-cmd">{s.cmd}</code>
              <span className="capeda-step-toggle">{open===s.id?'▲':'▼'}</span>
            </div>
            {open===s.id && <div className="capeda-step-desc">{s.desc}</div>}
          </div>
        ))}
      </div>
      <div className="capeda-note">EDA is iterative — findings at step 4 often send you back to step 2. Don't skip it to "get to the model faster." The cleaning you skip in EDA bites you in production.</div>
    </div>
  );
};
export default CapEdaVisualization;
