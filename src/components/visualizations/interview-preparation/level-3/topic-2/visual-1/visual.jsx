/* Lesson: Scalability — What Happens When Your App Gets 100x More Users
 * 2D animated: slide the user count and watch a single server saturate — response time
 * explodes past capacity, motivating everything else in this part. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function SysdScalabilityVisualization() {
  const [load, setLoad] = useState(30);        // % of capacity ×100 (0-300)
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setLoad(v => (v >= 300 ? 10 : v + 29)), 1.0, auto);
  const util = Math.min(load, 100);
  const latency = load <= 80 ? 50 + load : load <= 100 ? 130 + (load - 80) * 15 : 430 + (load - 100) * 20;
  const failing = load > 100;
  return (
    <Stage2D title="One Server Meets 100× Traffic" subtitle="Systems don't slow down linearly — they behave until ~80% capacity, degrade sharply, then fail. Scalability is the art of moving that wall, not hoping users stay away."
      accent={failing ? '#f85149' : util > 80 ? '#f0a35e' : '#56d364'} viewBox="0 0 640 250"
      controls={<><div className="dsa2d-group"><span className="dsa2d-label">traffic: {load}% of capacity</span><input className="dsa2d-slider" type="range" min="10" max="300" value={load} onChange={e => setLoad(+e.target.value)} /></div><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{failing ? 'requests dropped!' : `~${latency}ms response`}</span></>}
      legend={failing
        ? <>Past capacity the queue grows faster than it drains: latency spikes, timeouts cascade, and retries make it worse (the "thundering herd"). The fixes — caching, load balancing, horizontal scaling — are the next lessons.</>
        : <>Below ~80% utilisation the server answers steadily. Watch the knee of the curve as you push load: <strong>queueing theory</strong> guarantees latency rises non-linearly near saturation, which is why capacity planning targets 60–80%, never 100%.</>}>
      {/* server box */}
      <rect x="80" y="60" width="130" height="120" rx="14" fill="#161b22" stroke={failing ? '#f85149' : util > 80 ? '#f0a35e' : '#56d364'} strokeWidth="3" className={failing ? 'dsa2d-pulse' : ''} />
      <text x="145" y="90" fill="#e6edf3" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="system-ui">🖥 server</text>
      <rect x="100" y="105" width="90" height="16" rx="5" fill="#0d1117" stroke="#30363d" />
      <rect x="100" y="105" width={Math.min(90, 90 * util / 100)} height="16" rx="5" fill={failing ? '#f85149' : util > 80 ? '#f0a35e' : '#56d364'} style={{ transition: 'width .3s, fill .3s' }} />
      <text x="145" y="145" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">CPU {util}%</text>
      <text x="145" y="165" fill={failing ? '#f85149' : '#8b949e'} fontSize="11" textAnchor="middle" fontFamily="Consolas">{failing ? `+${load - 100}% queued/dropped` : 'healthy'}</text>
      {/* latency curve */}
      <text x="430" y="52" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">response time vs load</text>
      <line x1="290" y1="190" x2="600" y2="190" stroke="#30363d" /><line x1="290" y1="60" x2="290" y2="190" stroke="#30363d" />
      <polyline points={Array.from({ length: 30 }, (_, k) => { const l = 10 + k * 10; const lat = l <= 80 ? 50 + l : l <= 100 ? 130 + (l - 80) * 15 : 430 + (l - 100) * 20; return `${290 + (l / 300) * 310},${190 - Math.min(lat, 4400) / 4400 * 125}`; }).join(' ')} fill="none" stroke="#58a6ff" strokeWidth="2.5" />
      <circle cx={290 + (load / 300) * 310} cy={190 - Math.min(latency, 4400) / 4400 * 125} r="6" fill={failing ? '#f85149' : '#56d364'} className="dsa2d-pulse" />
      <line x1={290 + (100 / 300) * 310} y1="60" x2={290 + (100 / 300) * 310} y2="190" stroke="#f85149" strokeWidth="1.5" strokeDasharray="4 4" />
      <text x={290 + (100 / 300) * 310} y="208" fill="#f85149" fontSize="10" textAnchor="middle" fontFamily="Consolas">capacity</text>
    </Stage2D>
  );
}
