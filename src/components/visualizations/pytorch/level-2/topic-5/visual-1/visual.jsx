import { useState } from 'react';
import './visual.css';

const PROFILE_OPS = [
  { op: 'conv2d',          cpu: '48.2ms', pct: 62 },
  { op: 'batch_norm',      cpu: '12.1ms', pct: 16 },
  { op: 'relu_',           cpu: '7.8ms',  pct: 10 },
  { op: 'max_pool2d',      cpu: '5.3ms',  pct: 7  },
  { op: 'linear',          cpu: '3.9ms',  pct: 5  },
];

const SCALER_CODE = `scaler = torch.cuda.amp.GradScaler()

with torch.autocast(device_type='cuda'):
  output = model(x)
  loss   = criterion(output, y)

scaler.scale(loss).backward()
scaler.step(optimizer)
scaler.update()`;

const PROFILER_CODE = `with torch.profiler.profile(
  activities=[ProfilerActivity.CPU, ProfilerActivity.CUDA],
  record_shapes=True
) as prof:
  model(x)

print(prof.key_averages().table(
  sort_by='cpu_time_total', row_limit=10))`;

export default function PtMixedPrecisionVisualization() {
  const [tab, setTab] = useState('mp');

  return (
    <div className="ptmp-root">
      <h3 className="ptmp-title">Mixed Precision Training &amp; Profiling</h3>

      <div className="ptmp-tabs">
        {[['mp', 'Mixed Precision'], ['prof', 'Profiling']].map(([k, l]) => (
          <button key={k} className={`ptmp-tab ${tab === k ? 'ptmp-tab--active' : ''}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {tab === 'mp' ? (
        <div className="ptmp-panel">
          <div className="ptmp-mem-section">
            <div className="ptmp-mem-label">Memory per parameter</div>
            {[{ label: 'FP32', bytes: 4, color: '#a3adbb', pct: 100 }, { label: 'FP16', bytes: 2, color: '#f97316', pct: 50 }].map(t => (
              <div key={t.label} className="ptmp-mem-row">
                <span className="ptmp-mem-type" style={{ color: t.color }}>{t.label}</span>
                <div className="ptmp-mem-track"><div className="ptmp-mem-bar" style={{ width: `${t.pct}%`, background: t.color }} /></div>
                <span className="ptmp-mem-val">{t.bytes} bytes <span className="ptmp-mem-sub">({t.pct}%)</span></span>
              </div>
            ))}
            <div className="ptmp-note">FP16 halves memory → larger batch sizes. GradScaler prevents underflow.</div>
          </div>
          <pre className="ptmp-code">{SCALER_CODE}</pre>
        </div>
      ) : (
        <div className="ptmp-panel">
          <div className="ptmp-table-wrap">
            <table className="ptmp-table">
              <thead>
                <tr><th>Op</th><th>CPU Time</th><th>% of total</th></tr>
              </thead>
              <tbody>
                {PROFILE_OPS.map(o => (
                  <tr key={o.op}>
                    <td className="ptmp-op-cell">{o.op}</td>
                    <td className="ptmp-time-cell">{o.cpu}</td>
                    <td>
                      <div className="ptmp-pct-wrap">
                        <div className="ptmp-pct-bar" style={{ width: `${o.pct}%` }} />
                        <span className="ptmp-pct-val">{o.pct}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <pre className="ptmp-code">{PROFILER_CODE}</pre>
        </div>
      )}
    </div>
  );
}
