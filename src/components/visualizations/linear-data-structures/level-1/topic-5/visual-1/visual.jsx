/* Lesson: Traversing and Searching an Unsorted Array
 * 2D animated: a linear search scans left to right until it finds the target (or runs off the
 * end). Every element might need checking → O(n). */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const VALS = [17, 4, 42, 8, 23, 15, 9, 31];
const TARGET = 23;
export default function ArrLinearSearchVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const foundAt = VALS.indexOf(TARGET);
  useAutoPlay(() => setI(v => (v > foundAt ? 0 : v + 1)), 0.6, auto);
  const found = i === foundAt;
  const CW = 58, gap = 8;
  const startX = 320 - (VALS.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Linear Search (Unsorted)"
      subtitle="With no ordering to exploit, the only way to find a value is to check each element in turn until you hit it — or reach the end."
      accent="#58a6ff"
      viewBox="0 0 640 220"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v > foundAt ? 0 : v + 1))}>check next</button>
          <button className="dsa2d-btn" onClick={() => setI(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">target {TARGET} · {found ? `found at [${foundAt}]!` : `checking [${Math.min(i, VALS.length - 1)}]`}</span>
        </>
      }
      legend={<>Traversal visits each index once: <code>for x in arr: ...</code>. Searching is the same walk with a comparison — stop when <code>x == target</code>. Best case it's the first element (O(1)); worst case it's last or absent (<strong>O(n)</strong>). Sorting first would let you do better (binary search).</>}
    >
      {VALS.map((v, k) => {
        const checked = k < i;
        const cur = k === i && !found;
        const hit = k === foundAt && found;
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="70" width={CW} height="56" rx="8"
              fill={hit ? 'rgba(86,211,100,.25)' : cur ? 'rgba(88,166,255,.22)' : checked ? '#161b22' : '#0d1117'}
              stroke={hit ? '#56d364' : cur ? '#58a6ff' : checked ? '#6e7681' : '#30363d'} strokeWidth="2"
              className={cur || hit ? 'dsa2d-pulse' : ''} />
            <text x={startX + k * (CW + gap) + CW / 2} y="104" fill={checked && !hit ? '#8b949e' : '#e6edf3'} fontSize="19" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
            <text x={startX + k * (CW + gap) + CW / 2} y="62" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">[{k}]</text>
          </g>
        );
      })}
      {!found && i < VALS.length && <g style={{ transform: `translate(${startX + i * (CW + gap) + CW / 2}px, 46px)`, transition: 'transform .3s' }}><polygon points="-8,-13 8,-13 0,0" fill="#58a6ff" /></g>}
      <text x="320" y="164" fill={found ? '#56d364' : '#8b949e'} fontSize="14" textAnchor="middle" fontFamily="Consolas">{found ? `✓ found after ${foundAt + 1} comparisons` : 'grey = already ruled out'}</text>
    </Stage2D>
  );
}
