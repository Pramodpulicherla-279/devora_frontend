import { useState } from 'react';
import './visual.css';

const PLATFORMS = [
  { id:'sage',  name:'AWS SageMaker',     training:'✓ Managed', serving:'✓ Endpoints', automl:'✓ Autopilot', cost:'High',    bestFor:'Enterprise teams already on AWS, large-scale training.' },
  { id:'vertex',name:'Google Vertex AI',  training:'✓ Custom',  serving:'✓ Prediction',automl:'✓ AutoML',   cost:'Medium',  bestFor:'GCP-native teams, BigQuery integration, fast experimentation.' },
  { id:'azure', name:'Azure ML',          training:'✓ Compute', serving:'✓ ACI/AKS',  automl:'✓ AutoML',   cost:'Medium',  bestFor:'Microsoft shops, MLflow-first workflows, hybrid cloud.' },
  { id:'self',  name:'Self-Hosted',       training:'Manual',    serving:'Manual',      automl:'None',       cost:'Variable',bestFor:'Full control, no vendor lock-in, strong DevOps team required.' },
];

const COLS = ['Platform','Training Jobs','Serving','AutoML','Cost'];

export default function MlopsCloudVisualization() {
  const [selected, setSelected] = useState(null);
  const active = PLATFORMS.find(p=>p.id===selected);

  return (
    <div className="mlopscloud-wrap">
      <div className="mlopscloud-table-wrap">
        <table className="mlopscloud-table">
          <thead>
            <tr>{COLS.map(c=><th key={c} className="mlopscloud-th">{c}</th>)}</tr>
          </thead>
          <tbody>
            {PLATFORMS.map(p=>(
              <tr key={p.id}
                className={`mlopscloud-tr${selected===p.id?' mlopscloud-tr--active':''}`}
                onClick={()=>setSelected(selected===p.id ? null : p.id)}>
                <td className="mlopscloud-td mlopscloud-td--name">{p.name}</td>
                <td className="mlopscloud-td">{p.training}</td>
                <td className="mlopscloud-td">{p.serving}</td>
                <td className="mlopscloud-td">{p.automl}</td>
                <td className={`mlopscloud-td mlopscloud-cost mlopscloud-cost--${p.cost.toLowerCase()}`}>{p.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {active ? (
        <div className="mlopscloud-detail">
          <span className="mlopscloud-detail-label">Best for:</span>
          <span className="mlopscloud-detail-text">{active.bestFor}</span>
        </div>
      ) : (
        <p className="mlopscloud-hint">Click a row to see when to choose that platform.</p>
      )}
    </div>
  );
}
