/* Lesson: Databases — SQL vs NoSQL, From a Performance Angle
 * 2D animated: cycle through the axes that actually decide the choice — shape, scaling,
 * consistency, and query power. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const ROWS = [
  { k: 'Data shape', sql: 'tables + joins — relations enforced', nosql: 'documents / key-value — nest what you read together' },
  { k: 'Scaling default', sql: 'vertical first; sharding is manual work', nosql: 'horizontal by design (partition keys)' },
  { k: 'Consistency', sql: 'ACID transactions out of the box', nosql: 'often eventual — you trade certainty for speed' },
  { k: 'Query power', sql: 'ad-hoc SQL over anything, anytime', nosql: 'fast for planned access patterns, awkward outside them' },
  { k: 'Under the hood', sql: 'B-tree indexes', nosql: 'hash partitions + LSM trees' },
];
export default function SysdSqlNosqlVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % ROWS.length), 2.4, auto);
  const r = ROWS[i];
  return (
    <Stage2D title="SQL vs NoSQL" subtitle="Not a religion — an engineering trade. The deciding questions: how relational is the data, how big will it get, and how strictly must every reader see the same truth?"
      accent="#a78bfa" viewBox="0 0 640 270"
      controls={<>{ROWS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<>Interview-safe default: <strong>start with SQL</strong> (Postgres) until scale or shape forces a change, then move specific hot paths to NoSQL. Note the DSA connection: SQL indexes are <strong>B-trees</strong> (ordered, range queries); many NoSQL stores are giant <strong>hash maps</strong> (exact-key, O(1)).</>}>
      <text x="180" y="46" fill="#6b8cff" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="system-ui">SQL 🗄</text>
      <text x="460" y="46" fill="#f0a35e" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="system-ui">NoSQL 📦</text>
      <line x1="320" y1="34" x2="320" y2="200" stroke="#30363d" strokeDasharray="4 4" />
      <rect x="46" y="60" width="268" height="126" rx="12" fill="#0b0f15" stroke="#6b8cff" strokeWidth="1.5" />
      <rect x="326" y="60" width="268" height="126" rx="12" fill="#0b0f15" stroke="#f0a35e" strokeWidth="1.5" />
      <foreignObject x="60" y="80" width="240" height="96"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '13.5px system-ui', lineHeight: 1.45, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{r.sql}</div></foreignObject>
      <foreignObject x="340" y="80" width="240" height="96"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '13.5px system-ui', lineHeight: 1.45, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{r.nosql}</div></foreignObject>
      <text x="320" y="216" fill="#e6edf3" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{r.k}</text>
      <text x="320" y="248" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">axis {i + 1} of {ROWS.length}</text>
    </Stage2D>
  );
}
