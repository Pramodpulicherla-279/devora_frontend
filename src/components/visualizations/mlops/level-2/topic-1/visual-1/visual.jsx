import { useState } from 'react';
import './visual.css';

const runs = [
  { id: 'run_a1b2', lr: 0.01, layers: 4, dropout: 0.2, val_acc: 0.912, loss: 0.241, epochs: 30 },
  { id: 'run_c3d4', lr: 0.001, layers: 6, dropout: 0.3, val_acc: 0.934, loss: 0.198, epochs: 50 },
  { id: 'run_e5f6', lr: 0.001, layers: 8, dropout: 0.1, val_acc: 0.921, loss: 0.217, epochs: 40 },
  { id: 'run_g7h8', lr: 0.0001, layers: 6, dropout: 0.4, val_acc: 0.887, loss: 0.302, epochs: 20 },
  { id: 'run_i9j0', lr: 0.005, layers: 4, dropout: 0.2, val_acc: 0.943, loss: 0.181, epochs: 60 },
];

const artifacts = [
  { name: 'config.json', icon: '⚙️' },
  { name: 'model.pkl', icon: '🤖' },
  { name: 'metrics.json', icon: '📊' },
  { name: 'confusion_matrix.png', icon: '🖼️' },
];

export default function MlopsExperimentVisualization() {
  const [sortBy, setSortBy] = useState('val_acc');
  const [sortDir, setSortDir] = useState(-1);
  const [selected, setSelected] = useState(null);

  const sorted = [...runs].sort((a, b) => sortDir * (a[sortBy] > b[sortBy] ? 1 : -1));

  const handleSort = (col) => {
    if (sortBy === col) setSortDir(d => -d);
    else { setSortBy(col); setSortDir(-1); }
  };

  const best = sorted[0];

  return (
    <div className="mlopsexp-container">
      <h3 className="mlopsexp-title">Experiment Tracking & Reproducibility</h3>

      <div className="mlopsexp-table-wrap">
        <table className="mlopsexp-table">
          <thead>
            <tr>
              {['id','lr','layers','dropout','val_acc','loss','epochs'].map(col => (
                <th key={col} className={`mlopsexp-th ${sortBy === col ? 'mlopsexp-th--active' : ''}`} onClick={() => handleSort(col)}>
                  {col} {sortBy === col ? (sortDir === -1 ? '↓' : '↑') : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((r, i) => (
              <tr key={r.id} className={`mlopsexp-row ${selected === r.id ? 'mlopsexp-row--sel' : ''} ${r.id === best.id ? 'mlopsexp-row--best' : ''}`} onClick={() => setSelected(selected === r.id ? null : r.id)}>
                <td className="mlopsexp-id">{r.id}{r.id === best.id && <span className="mlopsexp-best-badge">best</span>}</td>
                <td>{r.lr}</td>
                <td>{r.layers}</td>
                <td>{r.dropout}</td>
                <td className="mlopsexp-metric">{r.val_acc.toFixed(3)}</td>
                <td className="mlopsexp-metric mlopsexp-metric--loss">{r.loss.toFixed(3)}</td>
                <td>{r.epochs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mlopsexp-hint">Click column headers to sort. Click a row to see logged artifacts.</p>

      {selected && (
        <div className="mlopsexp-artifacts">
          <div className="mlopsexp-artifacts-title">Logged artifacts for {selected}</div>
          <div className="mlopsexp-artifacts-grid">
            {artifacts.map((a, i) => (
              <div key={i} className="mlopsexp-artifact">
                <span className="mlopsexp-artifact-icon">{a.icon}</span>
                <span className="mlopsexp-artifact-name">{a.name}</span>
              </div>
            ))}
          </div>
          <p className="mlopsexp-artifacts-note">MLflow / W&amp;B stores these automatically. Reproduce any run with its run_id.</p>
        </div>
      )}
    </div>
  );
}
