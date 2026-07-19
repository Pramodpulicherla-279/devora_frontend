/* Lesson: Caching — Why Big-O Isn't the Whole Performance Story
 * 2D animated: requests hit the cache first. Hits return in ~1ms; misses fall through to the
 * database (~100ms) and populate the cache on the way back. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const REQS = ['user:7', 'user:12', 'user:7', 'user:7', 'user:3', 'user:12', 'user:7'];
export default function SysdCachingVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % REQS.length), 1.5, auto);
  const cache = new Set(); let hit = false; let hits = 0, misses = 0;
  for (let k = 0; k <= i; k++) { const key = REQS[k]; const h = cache.has(key); if (k === i) hit = h; if (h) hits++; else { misses++; cache.add(key); } }
  return (
    <Stage2D title="Cache Hit vs Cache Miss" subtitle="A cache is a hash map in front of something slow. Same Big-O as the database lookup — utterly different real-world latency. This is why complexity analysis alone doesn't explain production performance."
      accent={hit ? '#56d364' : '#f0a35e'} viewBox="0 0 640 270"
      controls={<><button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v + 1) % REQS.length)}>next request</button><button className="dsa2d-btn" onClick={() => setI(0)}>↺</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{REQS[i]} → {hit ? 'HIT ~1ms' : 'MISS ~100ms'}</span></>}
      legend={<>Hot keys (like <code>user:7</code>) get served from memory after their first miss — here {hits} hits vs {misses} misses so far. Real caches add an <strong>eviction policy</strong> (LRU — the linked-list + hash-map structure you built earlier) and a <strong>TTL</strong> to avoid stale data, the classic hard problem.</>}>
      <rect x="60" y="100" width="100" height="50" rx="10" fill="#161b22" stroke="#8b949e" strokeWidth="2" />
      <text x="110" y="130" fill="#e6edf3" fontSize="13" textAnchor="middle" fontWeight="700">🖥 app</text>
      <line x1="160" y1="125" x2="250" y2="125" stroke={hit ? '#56d364' : '#f0a35e'} strokeWidth="3" className="dsa2d-pulse" />
      <rect x="252" y="92" width="140" height="66" rx="12" fill={hit ? 'rgba(86,211,100,.16)' : 'rgba(240,163,94,.12)'} stroke={hit ? '#56d364' : '#f0a35e'} strokeWidth="2.5" style={{ transition: 'fill .3s' }} />
      <text x="322" y="118" fill="#e6edf3" fontSize="13" textAnchor="middle" fontWeight="700">⚡ cache (hash map)</text>
      <text x="322" y="140" fill={hit ? '#7ee787' : '#f8c088'} fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{hit ? 'HIT — return now' : 'MISS — go deeper'}</text>
      <line x1="392" y1="125" x2="470" y2="125" stroke={hit ? '#30363d' : '#f0a35e'} strokeWidth={hit ? 2 : 3} strokeDasharray={hit ? '4 5' : 'none'} style={{ transition: 'stroke .3s' }} />
      <rect x="472" y="98" width="110" height="54" rx="10" fill="#161b22" stroke={hit ? '#6e7681' : '#f0a35e'} strokeWidth="2" style={{ transition: 'stroke .3s' }} />
      <text x="527" y="122" fill="#e6edf3" fontSize="13" textAnchor="middle" fontWeight="700">🗄 database</text>
      <text x="527" y="142" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">~100ms + load</text>
      {/* cached keys */}
      <text x="100" y="205" fill="#8b949e" fontSize="12" fontFamily="system-ui">cached keys:</text>
      {[...cache].map((k, idx) => <g key={k}><rect x={190 + idx * 96} y="190" width="86" height="26" rx="7" fill="rgba(86,211,100,.12)" stroke="#56d364" /><text x={233 + idx * 96} y="208" fill="#7ee787" fontSize="12" textAnchor="middle" fontFamily="Consolas">{k}</text></g>)}
      <text x="320" y="252" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">requests: {REQS.map((r, k) => (k === i ? '▶' + r : r.split(':')[1])).join(' · ')}</text>
    </Stage2D>
  );
}
