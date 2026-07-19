/* Lesson: What Is System Design, and Why Does a DSA Course Cover It?
 * 2D animated: a request's journey — browser → load balancer → app servers → cache → database —
 * with a pulse travelling the path. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const NODES = [
  { id: 'client', label: '📱 client', x: 70, y: 140 },
  { id: 'lb', label: '⚖ load balancer', x: 210, y: 140 },
  { id: 'app', label: '🖥 app servers', x: 360, y: 140 },
  { id: 'cache', label: '⚡ cache', x: 500, y: 70 },
  { id: 'db', label: '🗄 database', x: 500, y: 210 },
];
const HOPS = ['client', 'lb', 'app', 'cache', 'db'];
export default function SysdIntroVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % HOPS.length), 1.2, auto);
  const active = HOPS[i];
  return (
    <Stage2D title="A Request's Journey" subtitle="System design zooms out from one function to the whole machine: how a request travels, where data lives, and what breaks when a million users arrive at once."
      accent="#58a6ff" viewBox="0 0 640 280"
      controls={<><button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v + 1) % HOPS.length)}>follow request</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">at: {NODES.find(n => n.id === active).label}</span></>}
      legend={<>Why in a DSA course? Because every box is a data structure at scale: the cache is a <strong>hash map</strong>, the database index is a <strong>B-tree</strong>, the load balancer keeps a <strong>queue</strong>. Big-O thinking is the entry ticket; system design is where it earns money.</>}>
      {/* edges */}
      {[['client', 'lb'], ['lb', 'app'], ['app', 'cache'], ['app', 'db']].map(([a, b], k) => {
        const na = NODES.find(n => n.id === a), nb = NODES.find(n => n.id === b);
        const on = HOPS.indexOf(a) < i || (HOPS.indexOf(a) === i);
        return <line key={k} x1={na.x + 45} y1={na.y} x2={nb.x - 45} y2={nb.y} stroke={on ? '#58a6ff' : '#30363d'} strokeWidth={on ? 3 : 2} style={{ transition: 'stroke .3s' }} />;
      })}
      {NODES.map(n => {
        const isOn = n.id === active, passed = HOPS.indexOf(n.id) < i;
        return (
          <g key={n.id}>
            <rect x={n.x - 55} y={n.y - 26} width="110" height="52" rx="12" fill={isOn ? 'rgba(88,166,255,.24)' : passed ? 'rgba(88,166,255,.1)' : '#161b22'} stroke={isOn ? '#58a6ff' : passed ? '#3d5b8c' : '#30363d'} strokeWidth={isOn ? 3 : 2} className={isOn ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s' }} />
            <text x={n.x} y={n.y + 5} fill="#e6edf3" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{n.label}</text>
          </g>
        );
      })}
      <text x="320" y="268" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">the app checks the cache first (fast), falls back to the database (slow but authoritative)</text>
    </Stage2D>
  );
}
