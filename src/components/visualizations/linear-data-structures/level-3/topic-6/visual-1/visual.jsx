/* Lesson: Searching for a Value in a Linked List
 * 2D animated: walk node by node comparing data to the target. Found → stop; end → not present.
 * No shortcuts exist, so it's O(n). */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const VALS = [7, 3, 11, 5, 9];
const TARGET = 5;
export default function LlSearchVisualization() {
  const [cur, setCur] = useState(0);
  const [auto, setAuto] = useState(true);
  const foundAt = VALS.indexOf(TARGET);
  useAutoPlay(() => setCur(v => (v >= foundAt ? 0 : v + 1)), 0.8, auto);
  const found = cur === foundAt;
  const NW = 82, gap = 30;
  const startX = 320 - (VALS.length * (NW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Searching a Linked List"
      subtitle="Because nodes aren't indexed, searching means walking from the head, comparing each node's value until you find the target or reach the end."
      accent="#58a6ff"
      viewBox="0 0 640 210"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setCur(v => (v >= foundAt ? 0 : v + 1))}>check next</button>
          <button className="dsa2d-btn" onClick={() => setCur(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">target {TARGET} · {found ? `found at node ${foundAt}!` : `${VALS[cur]} ≠ ${TARGET}`}</span>
        </>
      }
      legend={<><code>cur = head; while cur and cur.data != target: cur = cur.next</code>. There's no ordering or index to exploit, so search is <strong>O(n)</strong> — the same as an unsorted array, but here you can't binary-search even if it were sorted (no random access).</>}
    >
      {VALS.map((v, k) => {
        const x = startX + k * (NW + gap);
        const on = k === cur && !found;
        const hit = k === foundAt && found;
        const checked = k < cur;
        return (
          <g key={k}>
            <rect x={x} y="80" width={NW} height="52" rx="8"
              fill={hit ? 'rgba(86,211,100,.25)' : on ? 'rgba(88,166,255,.22)' : checked ? '#161b22' : '#161b22'}
              stroke={hit ? '#56d364' : on ? '#58a6ff' : checked ? '#484f58' : '#a78bfa'} strokeWidth="2"
              className={on || hit ? 'dsa2d-pulse' : ''} />
            <text x={x + NW / 2} y="112" fill={checked && !hit ? '#6b7785' : '#e6edf3'} fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
            {k < VALS.length - 1
              ? <line x1={x + NW} y1="106" x2={x + NW + gap} y2="106" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#a6)" />
              : <text x={x + NW + gap - 6} y="111" fill="#6b7785" fontSize="13" fontFamily="Consolas">None</text>}
          </g>
        );
      })}
      {!found && <g style={{ transform: `translate(${startX + cur * (NW + gap) + NW / 2}px, 58px)`, transition: 'transform .3s' }}><polygon points="-8,-13 8,-13 0,0" fill="#58a6ff" /></g>}
      {found && <text x="320" y="170" fill="#56d364" fontSize="14" textAnchor="middle" fontFamily="Consolas">✓ found after {foundAt + 1} comparisons</text>}
      <defs><marker id="a6" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><polygon points="0,0 7,3 0,6" fill="#a78bfa" /></marker></defs>
    </Stage2D>
  );
}
