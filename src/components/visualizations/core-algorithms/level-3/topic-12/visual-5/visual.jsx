/* Problem: Restore IP Addresses
 * 2D animated: place three dots into "25525511135" so all four segments are valid octets
 * (0–255, no leading zeros). Watch valid and invalid placements. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const STEPS = [
  { segs: ['255', '255', '11', '135'], ok: true, log: '255 . 255 . 11 . 135 — all octets 0–255 ✓ valid IP' },
  { segs: ['255', '255', '111', '35'], ok: true, log: '255 . 255 . 111 . 35 — also valid ✓ (second answer)' },
  { segs: ['2', '55', '255', '11135'], ok: false, badIdx: 3, log: '"11135" > 255 → segment invalid → prune this branch' },
  { segs: ['255', '2', '551', '1135'], ok: false, badIdx: 2, log: '"551" > 255 → prune — most dot placements die instantly' },
];
export default function BtRestoreIpVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 2.1, auto);
  const s = STEPS[i];
  return (
    <Stage2D title='Restore IPs from "25525511135"' subtitle="Each segment is a choice of 1, 2 or 3 characters — at most 3×3×3×3 possibilities, but the 0–255 and no-leading-zero rules prune almost all of them mid-flight."
      accent={s.ok ? '#56d364' : '#f85149'} viewBox="0 0 640 200"
      controls={<>{STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{s.log}</span></>}
      legend={<>Constraints: exactly 4 segments, each 0–255, no leading zeros ("01" is invalid). Because segment length is capped at 3, the search space is tiny (≤ 81 shapes) — backtracking with early validation checks each in O(1). This string yields exactly <strong>2</strong> valid IPs.</>}>
      {s.segs.map((seg, k) => {
        const isBad = s.badIdx === k;
        const x = 90 + s.segs.slice(0, k).reduce((a, t) => a + t.length * 26 + 42, 0);
        return (
          <g key={k} className="dsa2d-fade">
            <rect x={x} y="66" width={seg.length * 26 + 26} height="52" rx="10" fill={isBad ? 'rgba(248,81,73,.16)' : 'rgba(86,211,100,.14)'} stroke={isBad ? '#f85149' : '#56d364'} strokeWidth="2.5" className={isBad ? 'dsa2d-pulse' : ''} />
            <text x={x + (seg.length * 26 + 26) / 2} y="99" fill={isBad ? '#ff9d95' : '#e6edf3'} fontSize="19" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{seg}</text>
            {k < 3 && <text x={x + seg.length * 26 + 33} y="100" fill="#8b949e" fontSize="22" fontWeight="700">.</text>}
            <text x={x + (seg.length * 26 + 26) / 2} y="136" fill={isBad ? '#f85149' : '#56d364'} fontSize="11" textAnchor="middle" fontFamily="Consolas">{isBad ? '> 255 ✗' : '≤ 255 ✓'}</text>
          </g>
        );
      })}
      <text x="320" y="176" fill={s.ok ? '#56d364' : '#f85149'} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{s.ok ? '✓ valid IP recorded' : '✗ invalid segment → backtrack, move the dots'}</text>
    </Stage2D>
  );
}
