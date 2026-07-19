/* Lesson: Hash Functions — Turning Data Into an Index
 * 2D animated: watch a key become an index. Sum the character codes, then take modulo the
 * table size. Different keys spread across the buckets. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const SIZE = 7;
const KEYS = ['cat', 'dog', 'fox', 'owl'];
const codes = k => [...k].map(c => c.charCodeAt(0));
const sum = k => codes(k).reduce((a, b) => a + b, 0);
export default function HtHashFunctionVisualization() {
  const [ki, setKi] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setKi(v => (v + 1) % KEYS.length), 1.6, auto);
  const key = KEYS[ki];
  const s = sum(key), idx = s % SIZE;
  const CW = 62, gap = 7;
  const startX = 320 - (SIZE * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="A Hash Function in Action"
      subtitle="A hash function maps any key to a fixed range of indices. A simple one: add the character codes, then take the remainder modulo the table size."
      accent="#58a6ff"
      viewBox="0 0 640 250"
      controls={
        <>
          {KEYS.map((k, i) => <button key={k} className={`dsa2d-btn ${i === ki ? 'dsa2d-btn--on' : ''}`} onClick={() => setKi(i)}>"{k}"</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{s} % {SIZE} = {idx}</span>
        </>
      }
      legend={<>A good hash function is <strong>deterministic</strong> (same key → same index), <strong>fast</strong>, and spreads keys <strong>uniformly</strong> to avoid clustering. Real hashes (like Python's) are far more sophisticated than summing codes, but the modulo-into-range idea is the same.</>}
    >
      {/* computation */}
      <text x="60" y="52" fill="#8b949e" fontSize="13" fontFamily="Consolas">"{key}"</text>
      {codes(key).map((code, k) => (
        <g key={k}>
          <rect x={130 + k * 74} y="34" width="60" height="34" rx="6" fill="#161b22" stroke="#58a6ff" strokeWidth="1.5" />
          <text x={160 + k * 74} y="56" fill="#e6edf3" fontSize="15" textAnchor="middle" fontFamily="Consolas">{code}</text>
          {k < codes(key).length - 1 && <text x={130 + k * 74 + 66} y="56" fill="#8b949e" fontSize="16" textAnchor="middle" fontFamily="Consolas">+</text>}
        </g>
      ))}
      <text x="400" y="56" fill="#58a6ff" fontSize="15" fontFamily="Consolas">= {s}</text>
      <text x="320" y="96" fill="#c9d1d9" fontSize="15" textAnchor="middle" fontFamily="Consolas">{s} mod {SIZE} = bucket {idx}</text>
      {/* buckets */}
      {Array.from({ length: SIZE }).map((_, k) => {
        const on = k === idx;
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="130" width={CW} height="52" rx="8" fill={on ? 'rgba(88,166,255,.25)' : '#161b22'} stroke={on ? '#58a6ff' : '#30363d'} strokeWidth="2" className={on ? 'dsa2d-pulse' : ''} />
            <text x={startX + k * (CW + gap) + CW / 2} y="162" fill={on ? '#79c0ff' : '#8b949e'} fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{k}</text>
          </g>
        );
      })}
      <g style={{ transform: `translate(${startX + idx * (CW + gap) + CW / 2}px, 108px)`, transition: 'transform .4s' }}><polygon points="-8,-14 8,-14 0,0" fill="#58a6ff" /></g>
      <text x="320" y="212" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">same key always lands in the same bucket</text>
    </Stage2D>
  );
}
