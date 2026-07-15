/* Lesson: IP Routing and Other Surprising Trie Use Cases
 * 2D animated: a binary trie of routing prefixes. An incoming address walks the bit-trie; the
 * DEEPEST matching prefix wins (longest-prefix match). */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

// binary trie nodes: routes on some nodes. id, bits label, x,y, parent, route
const N = [
  { id: 0, b: 'root', x: 320, y: 40, parent: null, route: 'default' },
  { id: 1, b: '0', x: 180, y: 120, parent: 0, route: 'Net-A' },
  { id: 2, b: '1', x: 460, y: 120, parent: 0, route: null },
  { id: 3, b: '10', x: 380, y: 200, parent: 2, route: 'Net-B' },
  { id: 4, b: '11', x: 540, y: 200, parent: 2, route: null },
  { id: 5, b: '110', x: 540, y: 280, parent: 4, route: 'Net-C' },
];
const bitChild = (nodeId, bit) => N.find(n => n.parent === nodeId && n.b.endsWith(bit) && n.b !== 'root');
const ADDRESSES = [
  { addr: '110', path: [0, 2, 4, 5], match: 'Net-C', matchNode: 5 },
  { addr: '0', path: [0, 1], match: 'Net-A', matchNode: 1 },
  { addr: '10', path: [0, 2, 3], match: 'Net-B', matchNode: 3 },
];
export default function TrieIpRoutingVisualization() {
  const [ai, setAi] = useState(0);
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  const a = ADDRESSES[ai];
  useAutoPlay(() => setStep(s => { if (s >= a.path.length) { setAi(x => (x + 1) % ADDRESSES.length); return 0; } return s + 1; }), 0.95, auto, [ai]);
  const lit = new Set(a.path.slice(0, step));
  const done = step >= a.path.length;

  return (
    <Stage2D
      title="IP Routing = Longest Prefix Match"
      subtitle="Routers store network prefixes in a binary trie (each bit is a branch). An incoming address walks the bits; the deepest matching prefix decides where the packet goes."
      accent="#a78bfa"
      viewBox="0 0 640 340"
      controls={
        <>
          {ADDRESSES.map((aa, k) => <button key={aa.addr} className={`dsa2d-btn ${k === ai ? 'dsa2d-btn--on' : ''}`} onClick={() => { setAi(k); setStep(0); }}>addr {aa.addr}</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          {done && <span className="dsa2d-readout" style={{ color: '#7ee787' }}>route → {a.match}</span>}
        </>
      }
      legend={<>Each bit (0/1) is a branch; nodes tagged with a route are stored prefixes. The router follows the address bits and remembers the <strong>deepest</strong> route it passed — <strong>longest-prefix match</strong>. The same idea (bit-tries / radix trees) powers IP lookup tables at line speed.</>}
    >
      {N.filter(n => n.parent !== null).map(n => {
        const on = lit.has(n.id) && lit.has(n.parent);
        const p = N.find(x => x.id === n.parent);
        const bit = n.b.slice(-1);
        return (
          <g key={n.id}>
            <line x1={p.x} y1={p.y} x2={n.x} y2={n.y} stroke={on ? '#a78bfa' : '#30363d'} strokeWidth={on ? 3.5 : 2} style={{ transition: 'stroke .3s' }} />
            <text x={(p.x + n.x) / 2 + (bit === '0' ? -12 : 12)} y={(p.y + n.y) / 2} fill={on ? '#c9bdf5' : '#6e7681'} fontSize="13" textAnchor="middle" fontFamily="Consolas">{bit}</text>
          </g>
        );
      })}
      {N.map(n => {
        const on = lit.has(n.id);
        const isMatch = done && n.id === a.matchNode;
        return (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r="19" fill={isMatch ? '#56d364' : on ? 'rgba(167,139,250,.28)' : '#161b22'} stroke={n.route ? '#a78bfa' : on ? '#a78bfa' : '#8b949e'} strokeWidth={n.route ? 3 : 2} className={isMatch ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s' }} />
            <text x={n.x} y={n.y + 5} fill={isMatch ? '#0d1117' : '#e6edf3'} fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{n.b === 'root' ? '•' : n.b}</text>
            {n.route && <text x={n.x} y={n.y + 34} fill={isMatch ? '#7ee787' : '#8b949e'} fontSize="11" textAnchor="middle" fontFamily="Consolas">{n.route}</text>}
          </g>
        );
      })}
      <text x="320" y="330" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">walking address "{a.addr}" · deepest tagged node wins</text>
    </Stage2D>
  );
}
