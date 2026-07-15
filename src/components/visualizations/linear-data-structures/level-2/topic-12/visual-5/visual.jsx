/* Problem: Decode String
 * 2D animated: "3[a]2[bc]" → "aaabcbc". A stack remembers the repeat count and the text built
 * so far each time a '[' opens; ']' pops and repeats. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const ENC = '3[a]2[bc]';
const PHASES = [
  { out: '', note: 'scan left to right, using a stack for counts + text' },
  { out: 'aaa', note: "']' closes 3[a] → repeat 'a' 3 times" },
  { out: 'aaabcbc', note: "']' closes 2[bc] → repeat 'bc' 2 times" },
  { out: 'aaabcbc', note: 'decoded ✓' },
];
export default function StrDecodeStringVisualization() {
  const [p, setP] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setP(v => (v + 1) % PHASES.length), 1.5, auto);
  const { out, note } = PHASES[p];
  const CW = 46, gap = 5;
  const startX = 320 - (ENC.length * (CW + gap) - gap) / 2;
  const hiRange = p === 1 ? [0, 3] : p === 2 ? [4, 8] : null;

  return (
    <Stage2D
      title="Decode String"
      subtitle="Encoded as count[substring], possibly nested. A stack is the natural fit: push context on '[', and on ']' pop the count and repeat the inner text."
      accent="#a78bfa"
      viewBox="0 0 640 240"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setP(v => (v + 1) % PHASES.length)}>step</button>
          <button className="dsa2d-btn" onClick={() => setP(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">"{out || '…'}"</span>
        </>
      }
      legend={<>Keep two stacks (or a stack of pairs): on <code>[</code> push the current string and repeat count; on <code>]</code> pop them and append <code>prev + inner × count</code>. The stack transparently handles nesting like <code>2[a3[b]]</code>. Linear in the length of the decoded output.</>}
    >
      {ENC.split('').map((ch, k) => {
        const hot = hiRange && k >= hiRange[0] && k < hiRange[1];
        const bracket = ch === '[' || ch === ']';
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="54" width={CW} height="44" rx="6" fill={hot ? 'rgba(167,139,250,.25)' : '#161b22'} stroke={hot ? '#a78bfa' : bracket ? '#f0883e' : '#30363d'} strokeWidth="2" />
            <text x={startX + k * (CW + gap) + CW / 2} y="82" fill={bracket ? '#f0883e' : '#e6edf3'} fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{ch}</text>
          </g>
        );
      })}
      <text x="60" y="150" fill="#8b949e" fontSize="13" fontFamily="Consolas">output:</text>
      <rect x="140" y="132" width="360" height="40" rx="8" fill="#0b0f15" stroke="#a78bfa" strokeWidth="1.5" />
      <text x="320" y="158" fill="#c9bdf5" fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{out || '(building…)'}</text>
      <text x="320" y="202" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">{note}</text>
    </Stage2D>
  );
}
