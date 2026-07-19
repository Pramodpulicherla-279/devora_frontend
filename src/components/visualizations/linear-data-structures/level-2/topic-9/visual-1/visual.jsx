/* Lesson: Naive Pattern Matching — Finding One String Inside Another
 * 2D animated: slide the pattern across the text one position at a time, comparing characters
 * until a full match or a mismatch forces a shift. O(n·m) in the worst case. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const TEXT = 'ABABCABAB';
const PAT = 'ABC';
export default function StrNaiveMatchVisualization() {
  const [offset, setOffset] = useState(0);
  const [auto, setAuto] = useState(true);
  const maxOff = TEXT.length - PAT.length;
  // first matching offset
  const matchOff = [...Array(maxOff + 1).keys()].find(o => TEXT.substr(o, PAT.length) === PAT);
  useAutoPlay(() => setOffset(v => (v >= (matchOff ?? maxOff) ? 0 : v + 1)), 0.9, auto);
  const matchLen = [...PAT].findIndex((c, i) => TEXT[offset + i] !== c);
  const isMatch = matchLen === -1;
  const CW = 52, gap = 6;
  const startX = 60;

  return (
    <Stage2D
      title="Naive Pattern Matching"
      subtitle="Try the pattern at every position in the text. Compare left-to-right; on a mismatch, shift the pattern one step and start over."
      accent="#58a6ff"
      viewBox="0 0 640 240"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setOffset(v => (v >= (matchOff ?? maxOff) ? 0 : v + 1))}>shift →</button>
          <button className="dsa2d-btn" onClick={() => setOffset(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">offset {offset} · {isMatch ? 'MATCH ✓' : `mismatch at +${matchLen < 0 ? PAT.length : matchLen}`}</span>
        </>
      }
      legend={<>At each of up to <code>n−m+1</code> offsets we may compare up to <code>m</code> characters → <strong>O(n·m)</strong> worst case. The waste: after a mismatch, naive search forgets everything it just learned and re-checks from scratch. Smarter algorithms (next lesson) avoid that.</>}
    >
      {/* text */}
      <text x="20" y="72" fill="#8b949e" fontSize="12" fontFamily="Consolas">text</text>
      {TEXT.split('').map((ch, k) => {
        const inWin = k >= offset && k < offset + PAT.length;
        const cmpIdx = k - offset;
        const isCmp = inWin && (matchLen === -1 || cmpIdx <= matchLen);
        const good = inWin && (matchLen === -1 || cmpIdx < matchLen);
        const bad = inWin && matchLen !== -1 && cmpIdx === matchLen;
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="54" width={CW} height="48" rx="7"
              fill={bad ? 'rgba(248,81,73,.22)' : good ? 'rgba(86,211,100,.18)' : '#161b22'}
              stroke={bad ? '#f85149' : good ? '#56d364' : '#30363d'} strokeWidth="2" />
            <text x={startX + k * (CW + gap) + CW / 2} y="85" fill="#e6edf3" fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{ch}</text>
          </g>
        );
      })}
      {/* pattern (slides) */}
      <text x="20" y="150" fill="#8b949e" fontSize="12" fontFamily="Consolas">pat</text>
      <g style={{ transform: `translateX(${offset * (CW + gap)}px)`, transition: 'transform .35s' }}>
        {PAT.split('').map((ch, k) => {
          const good = matchLen === -1 || k < matchLen;
          const bad = matchLen !== -1 && k === matchLen;
          return (
            <g key={k}>
              <rect x={startX + k * (CW + gap)} y="132" width={CW} height="48" rx="7"
                fill={bad ? 'rgba(248,81,73,.22)' : good ? 'rgba(86,211,100,.18)' : '#0b0f15'}
                stroke={bad ? '#f85149' : good ? '#56d364' : '#58a6ff'} strokeWidth="2" />
              <text x={startX + k * (CW + gap) + CW / 2} y="163" fill="#79c0ff" fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{ch}</text>
            </g>
          );
        })}
      </g>
      {isMatch && <text x="320" y="216" fill="#56d364" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">✓ pattern found at index {offset}</text>}
    </Stage2D>
  );
}
