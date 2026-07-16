/* Lesson: How Data Structures You Already Know Power Real Systems
 * 2D animated: the DSA → infrastructure map. Every box you studied is running in production
 * under a different name. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const PAIRS = [
  { ds: 'Hash map', sys: 'Redis / Memcached caches', why: 'O(1) key lookups serve millions of gets per second.', c: '#4fce78' },
  { ds: 'B-tree', sys: 'Database indexes (Postgres, MySQL)', why: 'Ordered, shallow, disk-friendly — range scans and point reads in a few page hops.', c: '#6b8cff' },
  { ds: 'LRU list + map', sys: 'Cache eviction everywhere', why: 'The linked-list-plus-hash-map you built IS how caches decide what to forget.', c: '#f0a35e' },
  { ds: 'Queue', sys: 'Kafka / RabbitMQ / task queues', why: 'FIFO buffering decouples fast producers from slow consumers.', c: '#a78bfa' },
  { ds: 'Heap', sys: 'Schedulers & load balancers', why: 'Priority queues pick the next job / least-loaded server in O(log n).', c: '#e46e9b' },
  { ds: 'Trie', sys: 'Routers & autocomplete', why: 'Longest-prefix match forwards every packet on the internet.', c: '#58a6ff' },
];
export default function SysdDsInSystemsVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % PAIRS.length), 2.2, auto);
  const p = PAIRS[i];
  return (
    <Stage2D title="Your DSA, Running in Production" subtitle="System design interviews reward connecting the two worlds: every infrastructure box is a data structure with an ops team. Name the structure inside the box and you sound senior."
      accent={p.c} viewBox="0 0 640 250"
      controls={<>{PAIRS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<>When an interviewer asks "how does the cache work?", the winning answer starts with "it's a hash map with an LRU eviction list…". The structures in this track aren't exam trivia — they're the parts list of every system you'll design.</>}>
      <rect x="60" y="60" width="220" height="100" rx="14" fill={p.c + '14'} stroke={p.c} strokeWidth="2" />
      <text x="170" y="95" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">the structure you learned</text>
      <text x="170" y="128" fill={p.c} fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{p.ds}</text>
      <g className="dsa2d-pulse"><line x1="285" y1="110" x2="335" y2="110" stroke={p.c} strokeWidth="3" /><polygon points="335,104 347,110 335,116" fill={p.c} /></g>
      <rect x="352" y="60" width="228" height="100" rx="14" fill="#0b0f15" stroke={p.c} strokeWidth="2" />
      <text x="466" y="95" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">where it lives in production</text>
      <foreignObject x="362" y="104" width="208" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#e6edf3', font: '700 14px system-ui', lineHeight: 1.3, textAlign: 'center' }}>{p.sys}</div></foreignObject>
      <foreignObject x="90" y="176" width="460" height="40"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '13px system-ui', lineHeight: 1.4, textAlign: 'center' }}>{p.why}</div></foreignObject>
      <text x="320" y="238" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">mapping {i + 1} of {PAIRS.length}</text>
    </Stage2D>
  );
}
