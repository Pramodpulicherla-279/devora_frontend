/* Problem: Word Break (Trie-Optimised)
 * 2D animated: can "leetcode" be split into dictionary words? Scan from each start position,
 * matching dictionary words via a trie; a valid split reaches the end. → leet | code. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const S = 'leetcode';
// steps: try 'leet' (0-3) match, then 'code' (4-7) match → success
const STEPS = [
  { hi: [0, 3], msg: "match dict word 'leet' from index 0", cut: null },
  { hi: [0, 3], msg: "'leet' ✓ → cut after index 3", cut: 4 },
  { hi: [4, 7], msg: "match dict word 'code' from index 4", cut: 4 },
  { hi: [4, 7], msg: "'code' ✓ → reached the end → breakable ✓", cut: 8 },
];

export default function TrieWordBreakVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v >= STEPS.length - 1 ? 0 : v + 1)), 1.4, auto);
  const s = STEPS[i];
  const CW = 58, ox = 320 - (S.length * CW) / 2, Y = 90;

  return (
    <Stage2D
      title="Word Break" subtitle="Can the string be segmented into dictionary words? Walk a trie of the dictionary from each start position; whenever a word ends, jump the cursor forward and continue from there."
      accent="#a78bfa" viewBox="0 0 640 220"
      controls={<><button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v >= STEPS.length - 1 ? 0 : v + 1))}>step</button><button className="dsa2d-btn" onClick={() => setI(0)}>↺</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">dict = {'{leet, code}'}</span></>}
      legend={<>Use DP or memoised recursion: <code>break(i)</code> is True if some dictionary word matches at <code>i</code> and <code>break(j)</code> is True for the next index <code>j</code>. A trie makes the "does a dict word start here?" check efficient by walking characters directly. Here <code>leet | code</code> → <strong>True</strong>.</>}
    >
      {S.split('').map((c, k) => { const inHi = k >= s.hi[0] && k <= s.hi[1]; const cut = s.cut != null && k === s.cut; return (
        <g key={k}><rect x={ox + k * CW} y={Y} width={CW - 6} height="54" rx="8" fill={inHi ? 'rgba(167,139,250,.28)' : k < (s.cut || 0) ? 'rgba(86,211,100,.15)' : '#161b22'} stroke={inHi ? '#a78bfa' : k < (s.cut || 0) ? '#56d364' : '#30363d'} strokeWidth={inHi ? 3 : 2} className={inHi ? 'dsa2d-pulse' : ''} /><text x={ox + k * CW + (CW - 6) / 2} y={Y + 34} fill="#e6edf3" fontSize="22" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{c}</text><text x={ox + k * CW + (CW - 6) / 2} y={Y + 72} fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">{k}</text></g>); })}
      {s.cut != null && s.cut < S.length && <line x1={ox + s.cut * CW - 3} y1={Y - 8} x2={ox + s.cut * CW - 3} y2={Y + 62} stroke="#56d364" strokeWidth="3" strokeDasharray="5 3" />}
      <text x="320" y="184" fill="#c9d1d9" fontSize="13" textAnchor="middle" fontFamily="system-ui">{s.msg}</text>
    </Stage2D>
  );
}
