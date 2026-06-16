import { useState } from 'react';
import './visual.css';

const STEPS = [
  { label: 'PyTorch Model', color: '#f97316' },
  { label: 'torch.onnx.export()', color: '#58a6ff' },
  { label: 'ONNX Graph', color: '#a78bfa' },
];
const TARGETS = [
  { label: 'ONNX Runtime', color: '#56d364' },
  { label: 'TensorRT', color: '#58a6ff' },
  { label: 'CoreML', color: '#a78bfa' },
];

const TABLE = [
  { name: 'FP32 (original)', size: '98 MB', latency: '42 ms', accuracy: '76.1%', bar: 1.0, color: '#f97316' },
  { name: 'FP16 (half)', size: '49 MB', latency: '24 ms', accuracy: '76.0%', bar: 0.5, color: '#58a6ff' },
  { name: 'INT8 (quantized)', size: '25 MB', latency: '12 ms', accuracy: '75.4%', bar: 0.25, color: '#56d364' },
];

const EXPORT_CODE = `import torch
model = MyModel().eval()
dummy = torch.randn(1, 3, 224, 224)

torch.onnx.export(
  model, dummy, "model.onnx",
  input_names=["input"],
  output_names=["output"],
  dynamic_axes={"input": {0: "batch"}}
)`;

export default function CnnExportVisualization() {
  const [tab, setTab] = useState('pipeline');

  return (
    <div className="cnnexport-wrap">
      <h3 className="cnnexport-title">Exporting &amp; Optimizing Models</h3>
      <div className="cnnexport-tabs">
        {['pipeline', 'sizes', 'code'].map(t => (
          <button key={t} className={`cnnexport-tab${tab === t ? ' cnnexport-tab--active' : ''}`}
            onClick={() => setTab(t)}>
            {t === 'pipeline' ? 'Export Pipeline' : t === 'sizes' ? 'Size / Latency' : 'ONNX Code'}
          </button>
        ))}
      </div>

      {tab === 'pipeline' && (
        <div className="cnnexport-pipeline">
          {STEPS.map((s, i) => (
            <div key={i} className="cnnexport-pipe-row">
              <div className="cnnexport-pipe-box" style={{ borderColor: s.color, color: s.color }}>{s.label}</div>
              {i < STEPS.length - 1 && <div className="cnnexport-arrow">↓</div>}
            </div>
          ))}
          <div className="cnnexport-targets">
            {TARGETS.map(t => (
              <div key={t.label} className="cnnexport-target" style={{ borderColor: t.color, color: t.color }}>{t.label}</div>
            ))}
          </div>
          <p className="cnnexport-note">ONNX is the universal intermediate format — export once, run anywhere.</p>
        </div>
      )}

      {tab === 'sizes' && (
        <div className="cnnexport-table-wrap">
          <table className="cnnexport-table">
            <thead>
              <tr><th>Format</th><th>Size</th><th>Latency</th><th>Top-1 Acc</th><th>Relative size</th></tr>
            </thead>
            <tbody>
              {TABLE.map(r => (
                <tr key={r.name}>
                  <td style={{ color: r.color }}>{r.name}</td>
                  <td>{r.size}</td>
                  <td>{r.latency}</td>
                  <td>{r.accuracy}</td>
                  <td>
                    <div className="cnnexport-bar-track">
                      <div className="cnnexport-bar-fill" style={{ width: `${r.bar * 100}%`, background: r.color }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="cnnexport-note" style={{ marginTop: 10 }}>INT8 quantization gives ~4× size reduction with minimal accuracy loss.</p>
        </div>
      )}

      {tab === 'code' && (
        <div className="cnnexport-code-panel">
          <pre className="cnnexport-code">{EXPORT_CODE}</pre>
          <p className="cnnexport-note">Use <code>dynamic_axes</code> to support variable batch sizes at runtime.</p>
        </div>
      )}
    </div>
  );
}
