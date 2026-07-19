/* Problem: Largest Number (Custom Comparator)
 * 2D animated: to build the largest concatenation, don't compare numbers — compare the two
 * possible JOININGS: put a before b iff a+b > b+a as strings. [3,30,34,9] → "9343330". */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const STEPS = [
  { pair: ['3', '30'], win: '3', log: '"3"+"30" = 330  vs  "30"+"3" = 303 → 330 wins → 3 before 30' },
  { pair: ['34', '3'], win: '34', log: '"34"+"3" = 343  vs  "3"+"34" = 334 → 343 wins → 34 before 3' },
  { pair: ['9', '34'], win: '9', log: '"9"+"34" = 934  vs  "34"+"9" = 349 → 934 wins → 9 first' },
  { pair: null, done: true, log: 'sorted by that rule: [9, 34, 3, 30] → concatenate → "9343330"' },
];
const ORDER = ['9', '34', '3', '30'];
export default function SortLargestNumberVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 2.1, auto);
  const s = STEPS[i];
  return (
    <Stage2D title="Largest Number — Custom Comparator" subtitle="Numeric order fails here (9 < 34, yet 9 must come first!). The right question for any pair: which concatenation is bigger, a+b or b+a? Hand that comparator to the sort and you're done."
      accent="#f0a35e" viewBox="0 0 640 220"
      controls={<>{STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{s.log}</span></>}
      legend={<>The comparator is <strong>transitive</strong> (provable), so a normal O(n log n) sort applies — the whole problem is realising the comparison isn't numeric. Edge case: all zeros → return "0", not "000". Lesson: sorts accept <em>any</em> consistent ordering rule, not just &lt;.</>}>
      {s.pair ? (
        <>
          <text x="320" y="46" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">comparing "{s.pair[0]}" and "{s.pair[1]}" — try both joinings</text>
          {[0, 1].map(side => {
            const a = side === 0 ? s.pair[0] : s.pair[1], b = side === 0 ? s.pair[1] : s.pair[0];
            const joined = a + b;
            const winning = (side === 0) === (s.win === s.pair[0]);
            return (
              <g key={side}>
                <rect x={120 + side * 220} y="66" width="180" height="60" rx="12" fill={winning ? 'rgba(86,211,100,.16)' : 'rgba(248,81,73,.08)'} stroke={winning ? '#56d364' : '#6e7681'} strokeWidth={winning ? 3 : 2} className={winning ? 'dsa2d-pulse' : ''} />
                <text x={210 + side * 220} y="92" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">"{a}" + "{b}"</text>
                <text x={210 + side * 220} y="115" fill={winning ? '#7ee787' : '#c9d1d9'} fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{joined}</text>
              </g>
            );
          })}
          <text x="320" y="164" fill="#f8c088" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">→ "{s.win}" goes first</text>
        </>
      ) : (
        <>
          {ORDER.map((v, k) => <g key={k} className="dsa2d-pop" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}><rect x={140 + k * 95} y="70" width="80" height="52" rx="10" fill="rgba(86,211,100,.18)" stroke="#56d364" strokeWidth="2.5" /><text x={180 + k * 95} y="103" fill="#7ee787" fontSize="19" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text></g>)}
          <text x="320" y="164" fill="#56d364" fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">"9343330"</text>
        </>
      )}
      <text x="320" y="198" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">sort rule: a before b ⟺ a+b &gt; b+a (as strings)</text>
    </Stage2D>
  );
}
