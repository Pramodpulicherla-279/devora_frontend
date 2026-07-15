/* Lesson: Immutability's Hidden Cost — Why String Concatenation in a Loop Is Slow
 * 2D animated: each += builds a WHOLE NEW string, copying every existing character. Costs
 * pile up 1+2+3+... = O(n²). The ''.join() approach copies once → O(n). */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const CHARS = ['a', 'b', 'c', 'd', 'e', 'f'];
export default function StrImmutabilityVisualization() {
  const [n, setN] = useState(1);
  const [join, setJoin] = useState(false);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setN(v => (v >= CHARS.length ? 1 : v + 1)), 0.8, auto);
  // concat cost = 1+2+...+n ; join cost = n
  const concatCost = (n * (n + 1)) / 2;
  const CW = 40, gap = 5;

  return (
    <Stage2D
      title="The Hidden Cost of += on Strings"
      subtitle="Because strings are immutable, s += c can't extend s — it allocates a new string and copies all the old characters plus the new one."
      accent="#f85149"
      viewBox="0 0 640 250"
      controls={
        <>
          <button className={`dsa2d-btn ${!join ? 'dsa2d-btn--on' : ''}`} onClick={() => setJoin(false)}>s += c  (loop)</button>
          <button className={`dsa2d-btn ${join ? 'dsa2d-btn--on' : ''}`} onClick={() => setJoin(true)}>''.join(list)</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{join ? `copies ≈ ${n} (O(n))` : `copies = 1+…+${n} = ${concatCost} (O(n²))`}</span>
        </>
      }
      legend={join
        ? <>Collect characters in a <strong>list</strong> (append is O(1)) and build the string once with <code>''.join(parts)</code> — everything is copied a single time → <strong>O(n)</strong>. This is the idiomatic fix.</>
        : <>Each <code>+=</code> rebuilds the entire string. Iteration <code>k</code> copies <code>k</code> characters, so the total is <code>1+2+…+n = n(n+1)/2</code> → <strong>O(n²)</strong>. Silent, and brutal on long strings.</>}
    >
      {Array.from({ length: n }).map((_, row) => {
        const copies = join ? 1 : row + 1;         // chars copied at this step
        return (
          <g key={row}>
            <text x="60" y={44 + row * 32} fill="#8b949e" fontSize="12" fontFamily="Consolas">step {row + 1}</text>
            {Array.from({ length: row + 1 }).map((_, c) => {
              const recopied = !join && c < row;     // old chars re-copied
              return (
                <rect key={c} x={130 + c * (CW + gap)} y={28 + row * 32} width={CW} height="24" rx="4"
                  fill={c === row ? '#56d364' : recopied ? 'rgba(248,81,73,.4)' : '#30363d'}
                  stroke={c === row ? '#56d364' : recopied ? '#f85149' : '#30363d'} strokeWidth="1.5" />
              );
            })}
            {!join && <text x={130 + (row + 1) * (CW + gap) + 8} y={45 + row * 32} fill="#f85149" fontSize="11" fontFamily="Consolas">{copies} copied</text>}
          </g>
        );
      })}
      <text x="320" y="240" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">{join ? 'green = appended once, no recopying' : 'red = characters copied AGAIN this step'}</text>
    </Stage2D>
  );
}
