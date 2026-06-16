/* Lesson: Charts — Choosing the Right Chart Type
 * Visual: Decision guide — pick your question, see which chart fits and why */
import React, { useState } from 'react';
import './visual.css';

const QUESTIONS = [
  {
    id:'compare',
    label:'Compare values across categories',
    chart:'Bar / Column Chart',
    icon:'▦',
    color:'#58a6ff',
    example:['Mumbai: ₹82k','Delhi: ₹65k','Pune: ₹41k'],
    rule:'Use when categories are discrete (cities, products). Bar = horizontal for long names. Column = vertical for short names.',
    avoid:'Pie chart — hard to compare sizes accurately when bars of the same length appear next to each other.',
  },
  {
    id:'trend',
    label:'Show how a value changes over time',
    chart:'Line Chart',
    icon:'╱',
    color:'#56d364',
    example:['Jan: 42k','Feb: 58k','Mar: 63k'],
    rule:'Use when the x-axis is a continuous time series. Lines show direction and rate of change at a glance.',
    avoid:'Bar chart — makes time look like independent categories instead of a continuous flow.',
  },
  {
    id:'proportion',
    label:'Show parts of a whole (≤5 categories)',
    chart:'Pie / Donut Chart',
    icon:'◑',
    color:'#a78bfa',
    example:['Sales: 55%','Service: 30%','Other: 15%'],
    rule:'Works only when you have 3-5 slices and the total is meaningful (budget allocation, market share). Always show percentages.',
    avoid:'More than 5 slices — use a bar chart instead. Small differences are invisible in a pie.',
  },
  {
    id:'relationship',
    label:'Find correlation between two variables',
    chart:'Scatter Plot',
    icon:'⋅⋅⋅',
    color:'#f97316',
    example:['Ad spend vs Revenue','Height vs Weight'],
    rule:'Both axes are numeric and continuous. The pattern of dots shows positive, negative, or no correlation.',
    avoid:'Line chart — implies a time sequence that doesn\'t exist.',
  },
];

const XlChartTypeVisualization = () => {
  const [sel, setSel] = useState('compare');
  const q = QUESTIONS.find(x=>x.id===sel);
  return (
    <div className="xlctype-wrap">
      <header className="xlctype-head">
        <span className="xlctype-badge">Spreadsheets</span>
        <h2>Choosing the Right Chart</h2>
        <p>Start with the question, not the chart</p>
      </header>
      <div className="xlctype-tabs">
        {QUESTIONS.map(x=><button key={x.id} className={`xlctype-tab ${sel===x.id?'xlctype-tab--on':''}`} onClick={()=>setSel(x.id)}>{x.label}</button>)}
      </div>
      <div className="xlctype-card">
        <div className="xlctype-chart-name" style={{color:q.color}}>
          <span className="xlctype-icon">{q.icon}</span> {q.chart}
        </div>
        <div className="xlctype-examples">
          {q.example.map((e,i)=><div key={i} className="xlctype-ex-pill" style={{borderColor:q.color+'60'}}>{e}</div>)}
        </div>
        <div className="xlctype-rule"><strong>Use when:</strong> {q.rule}</div>
        <div className="xlctype-avoid"><strong>Avoid:</strong> {q.avoid}</div>
      </div>
    </div>
  );
};
export default XlChartTypeVisualization;
