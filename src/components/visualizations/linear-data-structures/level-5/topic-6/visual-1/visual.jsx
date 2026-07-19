/* Lesson: Time Complexity of Hash Table Operations (and When It Gets Worse)
 * 2D animated: with a good hash, keys spread out → O(1). With a bad hash, everything collides
 * into one long chain → O(n). Toggle between the two. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const SIZE = 6;
const KEYS = ['a', 'b', 'c', 'd', 'e'];
export default function HtComplexityVisualization() {
  const [bad, setBad] = useState(false);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setBad(b => !b), 2.4, auto);
  const CW = 74, gap = 8;
  const startX = 320 - (SIZE * (CW + gap) - gap) / 2;
  // good: spread a..e into distinct buckets; bad: all into bucket 1
  const placement = bad ? KEYS.map(() => 1) : [0, 1, 2, 3, 4];

  return (
    <Stage2D
      title="Hash Table Complexity: O(1) vs O(n)"
      subtitle="Hash table operations are O(1) on average — but only if the hash function distributes keys evenly. A poor hash can collapse everything into one bucket."
      accent={bad ? '#f85149' : '#56d364'}
      viewBox="0 0 640 250"
      controls={
        <>
          <button className={`dsa2d-btn ${!bad ? 'dsa2d-btn--on' : ''}`} onClick={() => setBad(false)}>good hash — O(1)</button>
          <button className={`dsa2d-btn ${bad ? 'dsa2d-btn--on' : ''}`} onClick={() => setBad(true)}>bad hash — O(n)</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={bad
        ? <>When every key hashes to the same bucket, the table degenerates into a single <strong>linked list</strong> — lookups become <strong>O(n)</strong>. This is the worst case (and a denial-of-service vector if an attacker can force collisions).</>
        : <>With a good hash and a reasonable load factor, each bucket holds ~1 item, so insert, lookup, and delete are all <strong>O(1) average</strong>. This is why dicts/sets are the go-to for fast membership and counting.</>}
    >
      {Array.from({ length: SIZE }).map((_, k) => {
        const occupants = KEYS.filter((_, i) => placement[i] === k);
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="56" width={CW} height="46" rx="8" fill={occupants.length ? '#161b22' : '#0d1117'} stroke={occupants.length && bad ? '#f85149' : occupants.length ? '#56d364' : '#30363d'} strokeWidth="2" />
            <text x={startX + k * (CW + gap) + CW / 2} y="48" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">[{k}]</text>
            {!bad && occupants[0] && <text x={startX + k * (CW + gap) + CW / 2} y="85" fill="#7ee787" fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{occupants[0]}</text>}
            {/* bad: chain hanging from bucket 1 */}
            {bad && k === 1 && occupants.map((o, oi) => (
              <g key={o} className="dsa2d-fade">
                <line x1={startX + k * (CW + gap) + CW / 2} y1={102 + oi * 28} x2={startX + k * (CW + gap) + CW / 2} y2={110 + oi * 28} stroke="#f85149" strokeWidth="2" />
                <rect x={startX + k * (CW + gap) + 10} y={110 + oi * 28} width={CW - 20} height="24" rx="5" fill="rgba(248,81,73,.14)" stroke="#f85149" strokeWidth="1.5" />
                <text x={startX + k * (CW + gap) + CW / 2} y={127 + oi * 28} fill="#ff9d95" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{o}</text>
              </g>
            ))}
          </g>
        );
      })}
      <text x="320" y="238" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">{bad ? 'all 5 keys chained in one bucket → scan them one by one' : 'one key per bucket → direct O(1) access'}</text>
    </Stage2D>
  );
}
