/* Problem: Letter Combinations of a Phone Number
 * 2D animated: digits "23" — each digit fans out into its keypad letters; DFS walks the tree
 * collecting every path. 3 × 3 = 9 combinations. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const L2 = ['a', 'b', 'c'], L3 = ['d', 'e', 'f'];
const COMBOS = L2.flatMap(a => L3.map(b => a + b));
export default function BtPhoneCombosVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % COMBOS.length), 1.0, auto);
  const cur = COMBOS[i];
  return (
    <Stage2D title='Letter Combinations of "23"' subtitle="Digit 2 → {a,b,c}, digit 3 → {d,e,f}. Backtracking picks one letter per digit, recurses to the next digit, then un-picks — the Cartesian product enumerated as a DFS."
      accent="#a78bfa" viewBox="0 0 640 280"
      controls={<><button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v + 1) % COMBOS.length)}>next path</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">building "{cur}" · {i + 1}/{COMBOS.length}</span></>}
      legend={<>Output size is the product of the letter-group sizes (3×3=9 here; up to 4ⁿ for n digits) — enumeration problems are exponential <em>by definition</em>, so backtracking is the right tool, not a failure of cleverness. The template: <code>for ch in letters[digit]: path.append(ch); dfs(digit+1); path.pop()</code>.</>}>
      {/* level 1: digit 2 letters */}
      <circle cx="320" cy="42" r="18" fill="#161b22" stroke="#a78bfa" strokeWidth="2.5" />
      <text x="320" y="48" fill="#e6edf3" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">""</text>
      {L2.map((ch, k) => {
        const x = 160 + k * 160;
        const active = cur[0] === ch;
        return (
          <g key={ch}>
            <line x1="320" y1="60" x2={x} y2="102" stroke={active ? '#a78bfa' : '#30363d'} strokeWidth={active ? 3 : 2} style={{ transition: 'stroke .25s' }} />
            <circle cx={x} cy="120" r="18" fill={active ? 'rgba(167,139,250,.28)' : '#161b22'} stroke={active ? '#a78bfa' : '#6e7681'} strokeWidth="2.5" style={{ transition: 'fill .25s' }} />
            <text x={x} y="126" fill="#e6edf3" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{ch}</text>
            {L3.map((ch2, j) => {
              const x2 = x - 48 + j * 48;
              const active2 = active && cur[1] === ch2;
              return (
                <g key={ch2}>
                  <line x1={x} y1="138" x2={x2} y2="180" stroke={active2 ? '#56d364' : '#30363d'} strokeWidth={active2 ? 3 : 1.5} style={{ transition: 'stroke .25s' }} />
                  <circle cx={x2} cy="196" r="15" fill={active2 ? 'rgba(86,211,100,.3)' : '#161b22'} stroke={active2 ? '#56d364' : '#3d4450'} strokeWidth="2" className={active2 ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .25s' }} />
                  <text x={x2} y="201" fill="#e6edf3" fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{ch2}</text>
                </g>
              );
            })}
          </g>
        );
      })}
      <text x="320" y="248" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="Consolas">collected: {COMBOS.slice(0, i + 1).join(' ')}</text>
    </Stage2D>
  );
}
