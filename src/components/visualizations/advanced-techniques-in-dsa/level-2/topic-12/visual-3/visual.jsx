/* Problem: Edit Distance
 * 2D animated: the LCS-family 2D table for "cat" → "cut". Each cell = fewest edits to turn one
 * prefix into the other; the three neighbours are the three operations. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const S1 = 'cat', S2 = 'cut';
// dp filled progressively; final: [[0,1,2,3],[1,0,1,2],[2,1,1,2],[3,2,2,1]]
const FULL = [[0, 1, 2, 3], [1, 0, 1, 2], [2, 1, 1, 2], [3, 2, 2, 1]];
const STEPS = [
  { fillTo: [0, 3], cur: null, log: 'base row/column: turning a prefix into "" costs its length (all deletes)' },
  { fillTo: [1, 3], cur: [1, 1], log: "'c' == 'c' → free: copy the diagonal (0)" },
  { fillTo: [2, 3], cur: [2, 2], log: "'a' ≠ 'u' → 1 + min(replace 0, delete 1, insert 1) = 1 (replace a→u)" },
  { fillTo: [3, 3], cur: [3, 3], done: true, log: "'t' == 't' → diagonal → dp[3][3] = 1: ONE edit (a→u) turns cat into cut" },
];
const CW = 66, CH = 40, ox = 250, oy = 60;
export default function DpEditDistanceVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 2.0, auto);
  const s = STEPS[i];
  const visible = (r, c) => r < s.fillTo[0] || (r === s.fillTo[0] && c <= s.fillTo[1]) || r === 0 || c === 0;
  return (
    <Stage2D title='Edit Distance: "cat" → "cut"' subtitle="dp[i][j] = fewest edits turning the first i chars of one word into the first j of the other. Matching chars ride the diagonal free; otherwise pay 1 + the cheapest neighbour (replace / delete / insert)."
      accent="#f85149" viewBox="0 0 640 270"
      controls={<>{STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{s.log}</span></>}
      legend={<>The three neighbours ARE the three operations: <strong>diagonal</strong> = replace (or free match), <strong>up</strong> = delete, <strong>left</strong> = insert. <strong>O(m·n)</strong> time/space — the engine behind spell-checkers, diff tools and DNA alignment. Here: distance <strong>1</strong>.</>}>
      {['', '∅', ...S2.split('')].map((ch, j) => <text key={'h' + j} x={j === 0 ? ox - 44 : ox + (j - 1) * CW + CW / 2 - 3} y={oy - 10} textAnchor="middle" fill="#f0a35e" fontSize="13" fontWeight="700" fontFamily="Consolas">{ch}</text>)}
      {['∅', ...S1.split('')].map((ch, r) => <text key={'v' + r} x={ox - 20} y={oy + r * CH + 25} textAnchor="middle" fill="#f0a35e" fontSize="13" fontWeight="700" fontFamily="Consolas">{ch}</text>)}
      {FULL.map((row, r) => row.map((v, c) => {
        const show = visible(r, c);
        const isCur = s.cur && s.cur[0] === r && s.cur[1] === c;
        const isAns = s.done && r === 3 && c === 3;
        return (
          <g key={r + '-' + c}>
            <rect x={ox + c * CW} y={oy + r * CH} width={CW - 5} height={CH - 5} rx="7" fill={isAns ? 'rgba(86,211,100,.3)' : isCur ? 'rgba(255,212,59,.16)' : show ? '#161b22' : '#0d1117'} stroke={isAns ? '#56d364' : isCur ? '#ffd43b' : show ? '#6e7681' : '#21262d'} strokeWidth={isCur || isAns ? 3 : 1.5} className={isCur || isAns ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s' }} />
            <text x={ox + c * CW + (CW - 5) / 2} y={oy + r * CH + 25} fill={show ? '#e6edf3' : '#30363d'} fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{show ? v : '·'}</text>
          </g>
        );
      }))}
      <text x="120" y="130" textAnchor="middle" fill="#8b949e" fontSize="11" fontFamily="system-ui">diag = replace</text>
      <text x="120" y="148" textAnchor="middle" fill="#8b949e" fontSize="11" fontFamily="system-ui">up = delete</text>
      <text x="120" y="166" textAnchor="middle" fill="#8b949e" fontSize="11" fontFamily="system-ui">left = insert</text>
    </Stage2D>
  );
}
