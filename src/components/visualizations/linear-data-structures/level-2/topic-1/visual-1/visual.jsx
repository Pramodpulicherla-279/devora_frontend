/* Lesson: Why Strings Deserve Dedicated Attention in DSA
 * 2D animated: a string is really an indexed sequence of characters (with codes). You can
 * jump to any index in O(1) — but unlike a list, you can't change a character in place. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const STR = 'STRINGS';
export default function StrIntroVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STR.length), 0.8, auto);
  const CW = 66, gap = 6;
  const startX = 320 - (STR.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="A String Is a Sequence of Characters"
      subtitle="Under the hood a string behaves like a read-only array of characters — indexable in O(1), but immutable: you build new strings rather than editing existing ones."
      accent="#58a6ff"
      viewBox="0 0 640 230"
      controls={
        <>
          <div className="dsa2d-group"><span className="dsa2d-label">s[{i}]</span><input className="dsa2d-slider" type="range" min="0" max={STR.length - 1} value={i} onChange={e => setI(+e.target.value)} /></div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">s[{i}] = '{STR[i]}' (code {STR.charCodeAt(i)})</span>
        </>
      }
      legend={<>Each character has an index and an underlying numeric code (ASCII/Unicode). Indexing <code>s[i]</code> is <strong>O(1)</strong>, and iterating is <strong>O(n)</strong>. The catch that drives most string algorithms: strings are <strong>immutable</strong>, so "changing" one actually builds a new one.</>}
    >
      {STR.split('').map((ch, k) => {
        const on = k === i;
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="70" width={CW} height="58" rx="8" fill={on ? 'rgba(88,166,255,.22)' : '#161b22'} stroke={on ? '#58a6ff' : '#30363d'} strokeWidth="2" className={on ? 'dsa2d-pulse' : ''} />
            <text x={startX + k * (CW + gap) + CW / 2} y="108" fill="#e6edf3" fontSize="24" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{ch}</text>
            <text x={startX + k * (CW + gap) + CW / 2} y="62" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">[{k}]</text>
            <text x={startX + k * (CW + gap) + CW / 2} y="146" fill={on ? '#79c0ff' : '#8b949e'} fontSize="11" textAnchor="middle" fontFamily="Consolas">{ch.charCodeAt(0)}</text>
          </g>
        );
      })}
      <text x="320" y="176" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">↑ character codes — letters are just numbers underneath</text>
    </Stage2D>
  );
}
