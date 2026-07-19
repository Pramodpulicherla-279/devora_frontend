/* Lesson: An Introduction to Efficient String Matching (Why Naive Search Isn't Always Enough)
 * 2D animated: build the KMP "prefix table" (LPS) for a pattern — the values that let matching
 * skip ahead on a mismatch instead of restarting. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const PAT = 'ABABACA';
// longest proper prefix that is also suffix, for each prefix length
function buildLPS(p) {
  const lps = Array(p.length).fill(0); let len = 0, i = 1;
  while (i < p.length) { if (p[i] === p[len]) { lps[i++] = ++len; } else if (len) { len = lps[len - 1]; } else { lps[i++] = 0; } }
  return lps;
}
const LPS = buildLPS(PAT);
export default function StrEfficientMatchVisualization() {
  const [k, setK] = useState(1);                 // cells revealed
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setK(v => (v >= PAT.length ? 1 : v + 1)), 0.9, auto);
  const CW = 66, gap = 8;
  const startX = 320 - (PAT.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Smarter Matching: The Prefix Table"
      subtitle="Naive search re-checks characters it already matched. KMP precomputes how far it can safely jump on a mismatch — so the text is scanned only once, O(n+m)."
      accent="#a78bfa"
      viewBox="0 0 640 250"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setK(v => (v >= PAT.length ? 1 : v + 1))}>build next</button>
          <button className="dsa2d-btn" onClick={() => setK(1)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">pattern "{PAT}" · LPS[{Math.min(k, PAT.length) - 1}] = {LPS[Math.min(k, PAT.length) - 1]}</span>
        </>
      }
      legend={<>The <strong>LPS</strong> value at each position is the length of the longest prefix of the pattern that also ends here. On a mismatch, KMP shifts the pattern by (matched − LPS) instead of 1 — never re-reading the text. Result: <strong>O(n + m)</strong> instead of naive O(n·m).</>}
    >
      <text x={startX - 30} y="82" fill="#8b949e" fontSize="12" fontFamily="Consolas">pat</text>
      <text x={startX - 30} y="152" fill="#a78bfa" fontSize="12" fontFamily="Consolas">LPS</text>
      {PAT.split('').map((ch, i) => {
        const shown = i < k;
        const cur = i === k - 1;
        return (
          <g key={i} style={{ opacity: shown ? 1 : 0.15, transition: 'opacity .3s' }}>
            <rect x={startX + i * (CW + gap)} y="56" width={CW} height="48" rx="7" fill={cur ? 'rgba(88,166,255,.2)' : '#161b22'} stroke={cur ? '#58a6ff' : '#30363d'} strokeWidth="2" />
            <text x={startX + i * (CW + gap) + CW / 2} y="87" fill="#e6edf3" fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{ch}</text>
            <rect x={startX + i * (CW + gap)} y="120" width={CW} height="46" rx="7"
              fill={cur ? 'rgba(167,139,250,.25)' : 'rgba(167,139,250,.1)'} stroke={cur ? '#a78bfa' : '#7c6bb0'} strokeWidth="2"
              className={cur ? 'dsa2d-pop' : ''} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
            <text x={startX + i * (CW + gap) + CW / 2} y="150" fill="#c9bdf5" fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{LPS[i]}</text>
          </g>
        );
      })}
      <text x="320" y="204" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">each LPS = length of the longest prefix that reappears ending at this character</text>
    </Stage2D>
  );
}
