/* Problem: Count and Say
 * 2D animated: each term is produced by "reading aloud" the previous one as run-lengths:
 * 1 → "one 1" → 11 → "two 1s" → 21 → "one 2, one 1" → 1211 → ... */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

function next(s) {
  let out = '', i = 0;
  while (i < s.length) { let j = i; while (s[j] === s[i]) j++; out += (j - i) + s[i]; i = j; }
  return out;
}
const TERMS = ['1']; for (let i = 0; i < 5; i++) TERMS.push(next(TERMS[i]));
export default function StrCountSayVisualization() {
  const [n, setN] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setN(v => (v >= TERMS.length - 1 ? 0 : v + 1)), 1.3, auto);
  const cur = TERMS[n], nxt = TERMS[n + 1];
  // groups of current
  const groups = []; let i = 0;
  while (i < cur.length) { let j = i; while (cur[j] === cur[i]) j++; groups.push({ ch: cur[i], count: j - i }); i = j; }

  return (
    <Stage2D
      title="Count and Say"
      subtitle="Build each term by describing the previous one in run-length: how many of each digit, in a row. '21' is read 'one 2, one 1' → '1211'."
      accent="#58a6ff"
      viewBox="0 0 640 220"
      controls={
        <>
          <div className="dsa2d-group"><span className="dsa2d-label">term {n + 1}</span><input className="dsa2d-slider" type="range" min="0" max={TERMS.length - 2} value={n} onChange={e => setN(+e.target.value)} /></div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">"{cur}" → "{nxt}"</span>
        </>
      }
      legend={<>Each term is a run-length encoding of the one before it: scan for consecutive equal digits, then emit <code>count</code> then <code>digit</code>. The sequence is 1, 11, 21, 1211, 111221, … — grows fast, but each step is a simple <strong>O(length)</strong> scan.</>}
    >
      <text x="80" y="62" fill="#8b949e" fontSize="13" fontFamily="Consolas">term {n + 1}:</text>
      <text x="200" y="66" fill="#e6edf3" fontSize="30" fontWeight="700" fontFamily="Consolas">{cur}</text>
      {/* group breakdown */}
      {groups.map((g, gi) => (
        <g key={gi}>
          <rect x={110 + gi * 110} y="96" width="96" height="52" rx="10" fill="rgba(88,166,255,.14)" stroke="#58a6ff" strokeWidth="2" className="dsa2d-fade" />
          <text x={158 + gi * 110} y="120" fill="#79c0ff" fontSize="14" textAnchor="middle" fontFamily="Consolas">{g.count}×"{g.ch}"</text>
          <text x={158 + gi * 110} y="140" fill="#e6edf3" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">→ {g.count}{g.ch}</text>
        </g>
      ))}
      <text x="80" y="192" fill="#8b949e" fontSize="13" fontFamily="Consolas">term {n + 2}:</text>
      <text x="200" y="196" fill="#56d364" fontSize="28" fontWeight="700" fontFamily="Consolas">{nxt}</text>
    </Stage2D>
  );
}
