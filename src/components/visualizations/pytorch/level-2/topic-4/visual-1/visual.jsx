import { useState } from 'react';
import './visual.css';

const EPOCHS = 30;
const CHECKPOINTS = [10, 20, 30];
const BEST_EPOCH = 20;

function lossCurve(epoch) {
  return +(2.4 * Math.exp(-0.12 * epoch) + 0.18 + Math.sin(epoch * 0.7) * 0.04).toFixed(3);
}

const points = Array.from({ length: EPOCHS }, (_, i) => ({ e: i + 1, loss: lossCurve(i + 1) }));

const SAVE_CODE = `torch.save({
  'epoch': epoch,
  'model_state_dict': model.state_dict(),
  'optimizer_state_dict': opt.state_dict(),
  'val_loss': val_loss,
}, 'checkpoint.pth')`;

const LOAD_CODE = `ckpt = torch.load('checkpoint.pth')
model.load_state_dict(ckpt['model_state_dict'])
opt.load_state_dict(ckpt['optimizer_state_dict'])
start_epoch = ckpt['epoch'] + 1`;

const W = 420, H = 160, PAD = 32;

export default function PtCheckpointVisualization() {
  const [showResume, setShowResume] = useState(false);

  const xScale = e => PAD + ((e - 1) / (EPOCHS - 1)) * (W - PAD * 2);
  const yScale = v => PAD + (1 - (v - 0.15) / (2.3 - 0.15)) * (H - PAD * 1.5);

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${xScale(p.e).toFixed(1)},${yScale(p.loss).toFixed(1)}`).join(' ');

  return (
    <div className="ptckpt-root">
      <h3 className="ptckpt-title">Model Checkpointing</h3>

      <div className="ptckpt-chart-wrap">
        <div className="ptckpt-chart-label">Validation Loss over 30 Epochs</div>
        <svg className="ptckpt-svg" viewBox={`0 0 ${W} ${H}`}>
          <path d={pathD} fill="none" stroke="#58a6ff" strokeWidth="2" strokeLinecap="round" />
          {CHECKPOINTS.map(e => (
            <g key={e}>
              <line x1={xScale(e)} y1={PAD} x2={xScale(e)} y2={H - PAD * 0.5} stroke="#30363d" strokeWidth="1" strokeDasharray="4 3" />
              <circle cx={xScale(e)} cy={yScale(lossCurve(e))} r={e === BEST_EPOCH ? 7 : 5}
                fill={e === BEST_EPOCH ? '#f97316' : '#21262d'}
                stroke={e === BEST_EPOCH ? '#f97316' : '#58a6ff'} strokeWidth="2" />
              <text x={xScale(e)} y={H - 4} textAnchor="middle" fontSize="9" fill={e === BEST_EPOCH ? '#f97316' : '#6b7785'}>
                {e === BEST_EPOCH ? '★' : ''} ep{e}
              </text>
            </g>
          ))}
          <text x={PAD} y={PAD - 6} fontSize="9" fill="#6b7785">loss</text>
        </svg>
        <div className="ptckpt-legend">
          <span className="ptckpt-dot ptckpt-dot--best" /> Best checkpoint (ep{BEST_EPOCH}, loss {lossCurve(BEST_EPOCH)})
          <span className="ptckpt-dot ptckpt-dot--ckpt" style={{marginLeft:12}} /> Checkpoint saved
        </div>
      </div>

      <div className="ptckpt-tabs">
        <button className={`ptckpt-tab ${!showResume ? 'ptckpt-tab--active' : ''}`} onClick={() => setShowResume(false)}>torch.save()</button>
        <button className={`ptckpt-tab ${showResume ? 'ptckpt-tab--active' : ''}`} onClick={() => setShowResume(true)}>Resume from checkpoint</button>
      </div>

      <pre className="ptckpt-code">{showResume ? LOAD_CODE : SAVE_CODE}</pre>

      <div className="ptckpt-tip">
        Save the full state dict — not just <code>model.state_dict()</code> — so training can resume exactly where it left off.
      </div>
    </div>
  );
}
