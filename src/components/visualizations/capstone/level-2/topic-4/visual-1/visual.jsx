/* Lesson: Interpreting Results — Building the Profitability Predictor
 * Visual: Model metrics dashboard */
import React, { useState } from 'react';
import './visual.css';

const MODELS = [
  {
    id:'lr', label:'Logistic Regression',
    acc:0.74, prec:0.71, rec:0.69, f1:0.70,
    features:[{name:'category_Electronics',coef:1.42},{name:'discount_pct',coef:-0.87},{name:'quarter_Q4',coef:0.63},{name:'region_North',coef:0.41}],
    note:'Baseline model. Interpretable coefficients — good for stakeholder communication.',
  },
  {
    id:'rf', label:'Random Forest',
    acc:0.83, prec:0.81, rec:0.79, f1:0.80,
    features:[{name:'amount',coef:0.34},{name:'discount_pct',coef:0.28},{name:'category_Electronics',coef:0.21},{name:'quarter_Q4',coef:0.12}],
    note:'Best performer. Feature importances show amount and discount are the strongest predictors.',
  },
];

const BAR_MAX = 0.9;

const CapResultsVisualization = () => {
  const [sel, setSel] = useState('rf');
  const m = MODELS.find(x=>x.id===sel);
  return (
    <div className="capres-wrap">
      <header className="capres-head">
        <span className="capres-badge">Capstone</span>
        <h2>Model Results</h2>
        <p>Which model wins — and what drives the prediction</p>
      </header>
      <div className="capres-tabs">
        {MODELS.map(mo=><button key={mo.id} className={`capres-tab ${sel===mo.id?'capres-tab--on':''}`} onClick={()=>setSel(mo.id)}>{mo.label}</button>)}
      </div>
      <div className="capres-metrics">
        {['acc','prec','rec','f1'].map(k=>({
          acc:'Accuracy',prec:'Precision',rec:'Recall',f1:'F1 Score'
        }[k] && (
          <div key={k} className="capres-metric">
            <div className="capres-metric-label">{{acc:'Accuracy',prec:'Precision',rec:'Recall',f1:'F1'}[k]}</div>
            <div className="capres-metric-bar"><div className="capres-metric-fill" style={{width:`${m[k]*100}%`, background:m[k]>=0.8?'#56d364':m[k]>=0.7?'#f97316':'#f85149'}}></div></div>
            <div className="capres-metric-val">{(m[k]*100).toFixed(0)}%</div>
          </div>
        )))}
      </div>
      <div className="capres-fi-label">Feature importances:</div>
      {m.features.map((f,i)=>(
        <div key={i} className="capres-fi-row">
          <div className="capres-fi-name">{f.name}</div>
          <div className="capres-fi-bar-track">
            <div className="capres-fi-bar" style={{width:`${Math.abs(f.coef)/1.5*100}%`, background:f.coef>0?'#56d364':'#f85149'}}></div>
          </div>
          <div className="capres-fi-val">{f.coef>0?'+':''}{f.coef}</div>
        </div>
      ))}
      <div className="capres-note">{m.note}</div>
    </div>
  );
};
export default CapResultsVisualization;
