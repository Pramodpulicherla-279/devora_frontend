/* Lesson: Load Balancers — Spreading Traffic Across Servers
 * 2D animated: requests arrive and the balancer deals them across three servers round-robin.
 * Kill a server and watch traffic reroute around it. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function SysdLoadBalancerVisualization() {
  const [tick, setTick] = useState(0);
  const [dead, setDead] = useState(null);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setTick(v => v + 1), 0.8, auto);
  const alive = [0, 1, 2].filter(s => s !== dead);
  const target = alive[tick % alive.length];
  const counts = [0, 1, 2].map(s => { let c = 0; for (let t = Math.max(0, tick - 8); t <= tick; t++) { if (alive.includes(s) && alive[t % alive.length] === s) c++; } return c; });
  return (
    <Stage2D title="Load Balancer (Round-Robin)" subtitle="A single front door that deals incoming requests across a pool of identical servers. Health checks drop dead servers from rotation — click a server to 'kill' it and watch traffic reroute."
      accent="#58a6ff" viewBox="0 0 640 280"
      controls={<>{[0, 1, 2].map(s => <button key={s} className={`dsa2d-btn ${dead === s ? 'dsa2d-btn--on' : ''}`} onClick={() => setDead(d => d === s ? null : s)}>{dead === s ? 'revive' : 'kill'} S{s + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">routing to S{target + 1}</span></>}
      legend={<>Round-robin is the simplest policy; real balancers also use <strong>least-connections</strong>, latency, or consistent hashing (sticky sessions). The balancer + health checks is what makes horizontal scaling usable: servers become replaceable cattle, not precious pets.</>}>
      <rect x="60" y="110" width="90" height="46" rx="10" fill="#161b22" stroke="#8b949e" strokeWidth="2" />
      <text x="105" y="139" fill="#e6edf3" fontSize="13" textAnchor="middle" fontWeight="700">📱 users</text>
      <line x1="150" y1="133" x2="230" y2="133" stroke="#58a6ff" strokeWidth="2.5" />
      <rect x="232" y="106" width="130" height="54" rx="11" fill="rgba(88,166,255,.14)" stroke="#58a6ff" strokeWidth="2.5" />
      <text x="297" y="138" fill="#79c0ff" fontSize="13" textAnchor="middle" fontWeight="700">⚖ balancer</text>
      {[0, 1, 2].map(s => {
        const y = 60 + s * 76;
        const isDead = dead === s, isTarget = target === s && !isDead;
        return (
          <g key={s} onClick={() => setDead(d => d === s ? null : s)} style={{ cursor: 'pointer' }}>
            <line x1="362" y1="133" x2="450" y2={y + 24} stroke={isDead ? '#30363d' : isTarget ? '#56d364' : '#3d5b8c'} strokeWidth={isTarget ? 3.5 : 2} strokeDasharray={isDead ? '4 5' : 'none'} className={isTarget ? 'dsa2d-pulse' : ''} style={{ transition: 'stroke .25s' }} />
            <rect x="452" y={y} width="120" height="50" rx="10" fill={isDead ? 'rgba(248,81,73,.1)' : isTarget ? 'rgba(86,211,100,.16)' : '#161b22'} stroke={isDead ? '#f85149' : isTarget ? '#56d364' : '#6e7681'} strokeWidth={isTarget ? 3 : 2} style={{ transition: 'fill .25s' }} />
            <text x="512" y={y + 22} fill={isDead ? '#f85149' : '#e6edf3'} fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{isDead ? '💀 S' + (s + 1) : '🖥 S' + (s + 1)}</text>
            <text x="512" y={y + 40} fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">{isDead ? 'out of rotation' : `${counts[s]} recent reqs`}</text>
          </g>
        );
      })}
    </Stage2D>
  );
}
