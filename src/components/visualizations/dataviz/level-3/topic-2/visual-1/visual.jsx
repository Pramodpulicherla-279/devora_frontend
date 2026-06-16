/* Lesson: Choosing the Right Chart — A Decision Guide
 * Visual: Decision flowchart — answer questions to land on a chart type */
import React, { useState } from 'react';
import './visual.css';

const TREE = {
  id:'q1', q:'What are you trying to show?',
  children:[
    {label:'Trend over time', id:'q2', q:'How many series?',
      children:[
        {label:'1–3 series', result:{chart:'Line chart',code:`sns.lineplot(data=df, x='date', y='revenue')`,color:'#58a6ff'}},
        {label:'4+ series', result:{chart:'Area chart / Small multiples',code:`df.plot(subplots=True, kind='area')`,color:'#58a6ff'}},
      ]},
    {label:'Compare categories', id:'q3', q:'Continuous or grouped?',
      children:[
        {label:'Single value per category', result:{chart:'Bar chart',code:`sns.barplot(data=df, x='cat', y='val')`,color:'#56d364'}},
        {label:'Distribution per category', result:{chart:'Box / Violin plot',code:`sns.boxplot(data=df, x='cat', y='val')`,color:'#56d364'}},
      ]},
    {label:'Part of a whole', id:'q4', q:'How many parts?',
      children:[
        {label:'≤5 parts', result:{chart:'Pie / Donut chart',code:`plt.pie(sizes, labels=labels, autopct='%1.0f%%')`,color:'#a78bfa'}},
        {label:'>5 parts', result:{chart:'Stacked bar (better for >5)',code:`df.plot(kind='bar', stacked=True)`,color:'#a78bfa'}},
      ]},
    {label:'Relationship / correlation', id:'q5', q:'How many variables?',
      children:[
        {label:'2 variables', result:{chart:'Scatter plot',code:`plt.scatter(x, y, alpha=0.6)`,color:'#f97316'}},
        {label:'3+ variables', result:{chart:'Pair plot / bubble chart',code:`sns.pairplot(df[num_cols])`,color:'#f97316'}},
      ]},
  ],
};

const DvChartDecisionVisualization = () => {
  const [path, setPath] = useState([]);
  const [result, setResult] = useState(null);

  const reset = () => {setPath([]); setResult(null);};
  const node = path.reduce((n,ci)=>n.children[ci], TREE);

  return (
    <div className="dvchd-wrap">
      <header className="dvchd-head">
        <span className="dvchd-badge">Data Viz</span>
        <h2>Chart Decision Guide</h2>
        <p>Answer the questions to find the right chart type</p>
      </header>
      {!result ? (
        <>
          <div className="dvchd-question">{node.q}</div>
          <div className="dvchd-choices">
            {node.children.map((child,i)=>(
              <button key={i} className="dvchd-choice" onClick={()=>{
                if(child.result){setResult(child.result);}
                else{setPath([...path,i]);}
              }}>{child.label}</button>
            ))}
          </div>
          {path.length>0 && <button className="dvchd-back" onClick={()=>setPath(path.slice(0,-1))}>← Back</button>}
        </>
      ) : (
        <div className="dvchd-result">
          <div className="dvchd-result-name" style={{color:result.color}}>{result.chart}</div>
          <pre className="dvchd-code"><code>{result.code}</code></pre>
          <button className="dvchd-reset" onClick={reset}>Start over</button>
        </div>
      )}
      <div className="dvchd-note">Start with the question, not the chart. "What does my audience need to understand?" determines the chart type more than the data structure.</div>
    </div>
  );
};
export default DvChartDecisionVisualization;
