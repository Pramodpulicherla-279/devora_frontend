/* Lesson: Latency vs Throughput — Two Numbers That Often Trade Off
 * 2D animated: a highway metaphor — one fast lane (low latency, low throughput) vs many
 * batched lanes (higher latency per car, far more cars per minute). */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function SysdLatencyThroughputVisualization() {
  const [mode, setMode] = useState('latency');
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setMode(m => m === 'latency' ? 'throughput' : 'latency'), 2.6, auto);
  const lat = mode === 'latency';
  return (
    <Stage2D title="Latency vs Throughput" subtitle="Latency = how long ONE request takes (ms). Throughput = how MANY finish per second. Batching, buffering and queues raise throughput — usually by making individuals wait."
      accent={lat ? '#4fce78' : '#f0a35e'} viewBox="0 0 640 260"
      controls={<><button className={`dsa2d-btn ${lat ? 'dsa2d-btn--on' : ''}`} onClick={() => setMode('latency')}>optimise latency</button><button className={`dsa2d-btn ${!lat ? 'dsa2d-btn--on' : ''}`} onClick={() => setMode('throughput')}>optimise throughput</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={lat
        ? <>Latency-first (a chat message, a page load): process each request <em>immediately</em>, even if servers sit idle between them. Metrics: p50/p95/p99 — the tail (p99) is what users complain about.</>
        : <>Throughput-first (nightly billing, log ingestion): <em>batch</em> work so machines stay saturated. Each item waits longer, but total items/second soars. Most systems pick a point between the two — that's the trade-off interviewers probe.</>}>
      {/* single lane vs batch */}
      <text x="320" y="46" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">{lat ? 'one at a time — each request served instantly' : 'batched — requests grouped, pipeline always full'}</text>
      {lat ? (
        <>
          <rect x="90" y="70" width="460" height="46" rx="10" fill="#161b22" stroke="#4fce78" strokeWidth="2" />
          <circle cx="150" cy="93" r="12" fill="#56d364" className="dsa2d-pulse" />
          <text x="150" y="98" fill="#0d1117" fontSize="11" textAnchor="middle" fontWeight="700">1</text>
          <text x="320" y="150" fill="#7ee787" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">latency ≈ 20ms · throughput ≈ 50/s</text>
        </>
      ) : (
        <>
          {[0, 1, 2].map(row => (
            <g key={row}>
              <rect x="90" y={62 + row * 34} width="460" height="26" rx="8" fill="#161b22" stroke="#f0a35e" strokeWidth="2" />
              {[0, 1, 2, 3, 4, 5].map(k => <circle key={k} cx={130 + k * 70} cy={75 + row * 34} r="9" fill="#f0a35e" opacity="0.85" />)}
            </g>
          ))}
          <text x="320" y="192" fill="#f8c088" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">latency ≈ 200ms · throughput ≈ 5000/s</text>
        </>
      )}
      <text x="320" y="230" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">same hardware — different promise to the user</text>
    </Stage2D>
  );
}
