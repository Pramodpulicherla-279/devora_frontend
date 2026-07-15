/* Problem: Group Anagrams
 * 2D animated: every word gets a canonical key (its sorted letters). Words with the same key
 * land in the same hash-map bucket → the anagram groups. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const WORDS = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
const keyOf = w => [...w].sort().join('');
export default function HtGroupAnagramsVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v > WORDS.length ? 0 : v + 1)), 0.9, auto);
  const placed = WORDS.slice(0, Math.min(i, WORDS.length));
  const groups = {}; placed.forEach(w => { const k = keyOf(w); (groups[k] = groups[k] || []).push(w); });
  const keys = [...new Set(WORDS.map(keyOf))];
  const done = i > WORDS.length;
  const CW = 60, gap = 10;
  const startX = 320 - (WORDS.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Group Anagrams"
      subtitle="Anagrams share the same letters, so their sorted form is identical. Use that sorted string as a hash-map key and words fall into groups automatically."
      accent="#56d364"
      viewBox="0 0 640 250"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v > WORDS.length ? 0 : v + 1))}>bucket next</button>
          <button className="dsa2d-btn" onClick={() => setI(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{done ? `${Object.keys(groups).length} groups` : i < WORDS.length ? `"${WORDS[i]}" → key "${keyOf(WORDS[i])}"` : ''}</span>
        </>
      }
      legend={<>Compute each word's key by sorting its letters (<code>"eat"→"aet"</code>), then append it to <code>map[key]</code>. Words sharing a key are anagrams. Cost: <strong>O(n · k log k)</strong> for n words of length k — one pass, using the hash map as the grouper.</>}
    >
      {/* incoming words */}
      {WORDS.map((w, k) => {
        const cur = k === i && !done;
        const scanned = k < i;
        return (
          <g key={k} style={{ opacity: scanned ? 0.35 : 1, transition: 'opacity .3s' }}>
            <rect x={startX + k * (CW + gap)} y="42" width={CW} height="40" rx="7" fill={cur ? 'rgba(88,166,255,.22)' : '#161b22'} stroke={cur ? '#58a6ff' : '#30363d'} strokeWidth="2" className={cur ? 'dsa2d-pulse' : ''} />
            <text x={startX + k * (CW + gap) + CW / 2} y="68" fill="#e6edf3" fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{w}</text>
          </g>
        );
      })}
      {/* buckets */}
      {keys.map((key, ki) => {
        const members = groups[key] || [];
        return (
          <g key={key}>
            <rect x={70 + ki * 190} y="120" width="170" height="100" rx="10" fill="#0b0f15" stroke="#56d364" strokeWidth="1.5" />
            <text x={155 + ki * 190} y="140" fill="#7ee787" fontSize="12" textAnchor="middle" fontFamily="Consolas">key "{key}"</text>
            {members.map((m, mi) => (
              <g key={m} className="dsa2d-fade">
                <rect x={90 + ki * 190 + (mi % 2) * 66} y={150 + Math.floor(mi / 2) * 32} width="58" height="26" rx="6" fill="rgba(86,211,100,.16)" stroke="#3fb950" />
                <text x={119 + ki * 190 + (mi % 2) * 66} y={168 + Math.floor(mi / 2) * 32} fill="#e6edf3" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{m}</text>
              </g>
            ))}
          </g>
        );
      })}
    </Stage2D>
  );
}
