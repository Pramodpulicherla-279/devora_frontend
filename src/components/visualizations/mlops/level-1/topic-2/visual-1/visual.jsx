import { useState } from 'react';
import './visual.css';

export default function MlopsLatencyVisualization() {
  const [batchSize, setBatchSize] = useState(16);

  const latency = Math.round(5 + Math.log2(batchSize) * 18);
  const throughput = Math.round((batchSize / (latency / 1000)) * 0.9);
  const maxLatency = 150;
  const maxThroughput = 3000;

  const latencyPct = Math.min((latency / maxLatency) * 100, 100);
  const throughputPct = Math.min((throughput / maxThroughput) * 100, 100);

  const points = [1, 2, 4, 8, 16, 32, 64, 128].map((b, i) => {
    const lat = Math.round(5 + Math.log2(b) * 18);
    const tput = Math.round((b / (lat / 1000)) * 0.9);
    return { b, lat, tput, x: i * 62 + 30, latY: 150 - (lat / maxLatency) * 130, tputY: 150 - (tput / maxThroughput) * 130 };
  });

  const latLine = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.latY}`).join(' ');
  const tputLine = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.tputY}`).join(' ');
  const curIdx = [1,2,4,8,16,32,64,128].indexOf(batchSize);

  return (
    <div className="mlopslatency-container">
      <h3 className="mlopslatency-title">Batch Size vs Latency vs Throughput</h3>

      <div className="mlopslatency-slider-row">
        <span className="mlopslatency-label">Batch size: <strong>{batchSize}</strong></span>
        <input
          type="range" min="0" max="7" step="1"
          value={[1,2,4,8,16,32,64,128].indexOf(batchSize)}
          onChange={e => setBatchSize([1,2,4,8,16,32,64,128][+e.target.value])}
          className="mlopslatency-range"
        />
      </div>

      <svg className="mlopslatency-svg" viewBox="0 0 520 170" preserveAspectRatio="xMidYMid meet">
        <line x1="20" y1="10" x2="20" y2="155" stroke="#30363d" strokeWidth="1"/>
        <line x1="20" y1="155" x2="510" y2="155" stroke="#30363d" strokeWidth="1"/>
        {[1,2,4,8,16,32,64,128].map((b, i) => (
          <text key={b} x={i*62+30} y="168" textAnchor="middle" fill="#8b949e" fontSize="10">{b}</text>
        ))}
        <text x="265" y="180" textAnchor="middle" fill="#8b949e" fontSize="10">Batch Size</text>
        <path d={latLine} fill="none" stroke="#f85149" strokeWidth="2"/>
        <path d={tputLine} fill="none" stroke="#56d364" strokeWidth="2"/>
        {curIdx >= 0 && (
          <>
            <circle cx={points[curIdx].x} cy={points[curIdx].latY} r="5" fill="#f85149"/>
            <circle cx={points[curIdx].x} cy={points[curIdx].tputY} r="5" fill="#56d364"/>
          </>
        )}
        <circle cx="350" cy="14" r="5" fill="#f85149"/>
        <text x="360" y="18" fill="#f85149" fontSize="10">Latency (ms)</text>
        <circle cx="350" cy="28" r="5" fill="#56d364"/>
        <text x="360" y="32" fill="#56d364" fontSize="10">Throughput (req/s)</text>
      </svg>

      <div className="mlopslatency-metrics">
        <div className="mlopslatency-metric">
          <span className="mlopslatency-metric-label">Latency</span>
          <div className="mlopslatency-bar-track">
            <div className="mlopslatency-bar mlopslatency-bar--red" style={{width:`${latencyPct}%`}}/>
          </div>
          <span className="mlopslatency-metric-val">{latency} ms</span>
        </div>
        <div className="mlopslatency-metric">
          <span className="mlopslatency-metric-label">Throughput</span>
          <div className="mlopslatency-bar-track">
            <div className="mlopslatency-bar mlopslatency-bar--green" style={{width:`${throughputPct}%`}}/>
          </div>
          <span className="mlopslatency-metric-val">{throughput} req/s</span>
        </div>
      </div>

      <p className="mlopslatency-insight">
        {batchSize <= 4 ? 'Small batches: low latency but low throughput — good for real-time APIs.' :
         batchSize <= 16 ? 'Balanced tradeoff — common for production inference servers.' :
         'Large batches: high throughput but high latency — best for offline/async jobs.'}
      </p>
    </div>
  );
}
