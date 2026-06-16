import { useState } from 'react';
import './visual.css';

const RUNS = [
  { id: 'run_001', lr: 0.01,   batch: 32,  epochs: 20, val_acc: 0.812 },
  { id: 'run_002', lr: 0.001,  batch: 64,  epochs: 25, val_acc: 0.934 },
  { id: 'run_003', lr: 0.0005, batch: 64,  epochs: 30, val_acc: 0.891 },
  { id: 'run_004', lr: 0.001,  batch: 128, epochs: 20, val_acc: 0.876 },
];

const BEST_ID = 'run_002';

const SEED_CODE = `import random, numpy as np, torch

def set_seed(seed=42):
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)
    torch.backends.cudnn.deterministic = True

set_seed(42)`;

const WANDB_CODE = `import wandb
wandb.init(project="my-model", config={"lr": 0.001, "batch": 64})

# Inside training loop:
wandb.log({"loss": loss.item(), "val_acc": val_acc})`;

const TAB_CONTENT = { seed: SEED_CODE, wandb: WANDB_CODE };

export default function PtExperimentVisualization() {
  const [tab, setTab] = useState('runs');

  return (
    <div className="ptexp-root">
      <h3 className="ptexp-title">Experiment Tracking &amp; Reproducibility</h3>

      <div className="ptexp-tabs">
        {[['runs', 'Compare Runs'], ['seed', 'Set Seed'], ['wandb', 'WandB log']].map(([k, l]) => (
          <button key={k} className={`ptexp-tab ${tab === k ? 'ptexp-tab--active' : ''}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {tab === 'runs' ? (
        <div className="ptexp-table-wrap">
          <table className="ptexp-table">
            <thead>
              <tr><th>Run ID</th><th>LR</th><th>Batch</th><th>Epochs</th><th>Val Acc</th></tr>
            </thead>
            <tbody>
              {RUNS.map(r => (
                <tr key={r.id} className={r.id === BEST_ID ? 'ptexp-best-row' : ''}>
                  <td className="ptexp-id">{r.id}{r.id === BEST_ID && <span className="ptexp-crown">★ best</span>}</td>
                  <td className="ptexp-mono">{r.lr}</td>
                  <td className="ptexp-mono">{r.batch}</td>
                  <td className="ptexp-mono">{r.epochs}</td>
                  <td className="ptexp-acc">{(r.val_acc * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <pre className="ptexp-code">{TAB_CONTENT[tab]}</pre>
      )}

      <div className="ptexp-tip">Reproducibility = fixed seed + same data splits + same code version. Log everything to compare runs fairly.</div>
    </div>
  );
}
