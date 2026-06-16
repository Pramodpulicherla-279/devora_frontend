import { useState } from 'react';
import './visual.css';

const options = [
  { name: 'vLLM', latency: 'Low', throughput: 'Very High', hardware: 'NVIDIA GPU', cost: '$$$', best: 'Self-hosted high-traffic APIs', oss: true },
  { name: 'TGI', latency: 'Low', throughput: 'High', hardware: 'NVIDIA/AMD GPU', cost: '$$$', best: 'HuggingFace models on your infra', oss: true },
  { name: 'Ollama', latency: 'Medium', throughput: 'Low', hardware: 'CPU / Apple M-chip', cost: '$', best: 'Local dev & prototyping', oss: true },
  { name: 'OpenAI API', latency: 'Medium', throughput: 'High', hardware: 'None (managed)', cost: '$$$$', best: 'Production without infra burden', oss: false },
];

const cols = ['latency', 'throughput', 'hardware', 'cost', 'best'];

export default function MlopsServeLlmVisualization() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="mlopsserve-container">
      <h3 className="mlopsserve-title">LLM Serving Options</h3>
      <p className="mlopsserve-sub">Click a row to highlight. Self-hosted = you manage the GPU; managed = provider does.</p>

      <div className="mlopsserve-table-wrap">
        <table className="mlopsserve-table">
          <thead>
            <tr>
              <th>Framework</th>
              <th>Latency</th>
              <th>Throughput</th>
              <th>Hardware</th>
              <th>Cost</th>
              <th>Best For</th>
            </tr>
          </thead>
          <tbody>
            {options.map((o, i) => (
              <tr key={i} className={`mlopsserve-row ${selected === i ? 'mlopsserve-row--active' : ''}`} onClick={() => setSelected(selected === i ? null : i)}>
                <td>
                  <span className="mlopsserve-name">{o.name}</span>
                  {o.oss && <span className="mlopsserve-badge">OSS</span>}
                </td>
                <td className={o.latency === 'Low' ? 'mlopsserve-good' : 'mlopsserve-mid'}>{o.latency}</td>
                <td className={o.throughput === 'Very High' ? 'mlopsserve-good' : o.throughput === 'High' ? 'mlopsserve-mid' : 'mlopsserve-low'}>{o.throughput}</td>
                <td className="mlopsserve-hw">{o.hardware}</td>
                <td className={o.cost.length <= 2 ? 'mlopsserve-good' : o.cost.length === 3 ? 'mlopsserve-mid' : 'mlopsserve-low'}>{o.cost}</td>
                <td className="mlopsserve-best">{o.best}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected !== null && (
        <div className="mlopsserve-detail">
          <strong>{options[selected].name}</strong> — {options[selected].best}.
          {options[selected].oss
            ? ' Open-source: deploy on your own GPU, full control over model weights and inference.'
            : ' Managed API: no GPU setup, but you pay per token and share infrastructure.'}
        </div>
      )}
    </div>
  );
}
