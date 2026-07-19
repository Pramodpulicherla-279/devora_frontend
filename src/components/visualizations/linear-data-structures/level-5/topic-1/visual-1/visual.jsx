/* Lesson: What Is a Hash Table, and Why Is It So Fast?
 * 2D animated: a lookup key is hashed straight to a bucket index — one jump, O(1) — versus
 * scanning a list element by element, O(n). */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const SIZE = 6;
const KEYS = ['cat', 'dog', 'sun', 'key'];
const hash = k => [...k].reduce((a, c) => a + c.charCodeAt(0), 0) % SIZE;
export default function HtIntroVisualization() {
  const [ki, setKi] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setKi(v => (v + 1) % KEYS.length), 1.2, auto);
  const key = KEYS[ki];
  const idx = hash(key);
  const CW = 70, gap = 8;
  const startX = 320 - (SIZE * (CW + gap) - gap) / 2;
  const buckets = {}; KEYS.forEach(k => { buckets[hash(k)] = k; });

  return (
    <Stage2D
      title="Why Hash Tables Are Fast"
      subtitle="Instead of searching for a key, a hash table computes WHERE the key belongs. A hash function turns the key straight into an array index."
      accent="#56d364"
      viewBox="0 0 640 230"
      controls={
        <>
          <div className="dsa2d-group"><span className="dsa2d-label">look up</span>{KEYS.map((k, i) => <button key={k} className={`dsa2d-btn ${i === ki ? 'dsa2d-btn--on' : ''}`} onClick={() => setKi(i)}>"{k}"</button>)}</div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">hash("{key}") = {idx}</span>
        </>
      }
      legend={<>A list lookup checks each element until it finds the key — <strong>O(n)</strong>. A hash table computes <code>hash(key) → index</code> and jumps straight there — <strong>O(1)</strong> on average. That constant-time access is why dicts and sets are everywhere.</>}
    >
      {Array.from({ length: SIZE }).map((_, k) => {
        const on = k === idx;
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="90" width={CW} height="56" rx="8" fill={on ? 'rgba(86,211,100,.25)' : '#161b22'} stroke={on ? '#56d364' : '#30363d'} strokeWidth="2" className={on ? 'dsa2d-pulse' : ''} />
            <text x={startX + k * (CW + gap) + CW / 2} y="124" fill={buckets[k] ? '#e6edf3' : '#6e7681'} fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{buckets[k] || '·'}</text>
            <text x={startX + k * (CW + gap) + CW / 2} y="82" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">[{k}]</text>
          </g>
        );
      })}
      {/* key + arrow */}
      <rect x="280" y="30" width="80" height="30" rx="8" fill="#0b0f15" stroke="#56d364" strokeWidth="1.5" />
      <text x="320" y="50" fill="#7ee787" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">"{key}"</text>
      <g style={{ transform: `translate(${startX + idx * (CW + gap) + CW / 2}px, 66px)`, transition: 'transform .4s cubic-bezier(.4,1.3,.5,1)' }}>
        <polygon points="-9,-14 9,-14 0,0" fill="#56d364" />
      </g>
      <text x="320" y="180" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">the key computes its own address — no searching</text>
    </Stage2D>
  );
}
