/* Lesson: Implementing a Stack Using a Python List
 * 2D animated: a Python list where the END is the top. append() pushes, pop() removes the last
 * element — both O(1) amortized. Steps through operations. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const SNAPS = [
  { s: [3], code: 'stack.append(3)' },
  { s: [3, 7], code: 'stack.append(7)' },
  { s: [3, 7, 1], code: 'stack.append(1)' },
  { s: [3, 7], code: 'stack.pop() → 1' },
  { s: [3, 7, 9], code: 'stack.append(9)' },
  { s: [3], code: 'pop 9, pop 7' },
];
export default function SqStackListVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % SNAPS.length), 1.1, auto);
  const { s, code } = SNAPS[i];
  const CW = 60, gap = 8, startX = 130;

  return (
    <Stage2D
      title="Stack From a Python List"
      subtitle="A plain list makes a perfect stack: treat the END as the top. append() and pop() both act on the last slot, so they're O(1) — no shifting."
      accent="#56d364"
      viewBox="0 0 640 220"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v + 1) % SNAPS.length)}>next op</button>
          <button className="dsa2d-btn" onClick={() => setI(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{code}</span>
        </>
      }
      legend={<>Why the end and not the front? <code>append</code>/<code>pop()</code> at the end are O(1), but <code>insert(0)</code>/<code>pop(0)</code> at the front are O(n) (everything shifts). So the list's tail is the natural stack top — simple and fast.</>}
    >
      <text x={startX} y="70" fill="#8b949e" fontSize="12" fontFamily="Consolas">stack = [ ... ]  (index 0 on the left)</text>
      {s.map((v, k) => {
        const isTop = k === s.length - 1;
        return (
          <g key={k} className="dsa2d-fade">
            <rect x={startX + k * (CW + gap)} y="82" width={CW} height="52" rx="8" fill={isTop ? 'rgba(86,211,100,.25)' : '#161b22'} stroke={isTop ? '#56d364' : '#30363d'} strokeWidth="2" className={isTop ? 'dsa2d-pop' : ''} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
            <text x={startX + k * (CW + gap) + CW / 2} y="114" fill="#e6edf3" fontSize="19" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
            <text x={startX + k * (CW + gap) + CW / 2} y="74" fill="#6b7785" fontSize="10" textAnchor="middle" fontFamily="Consolas">[{k}]</text>
            {isTop && <text x={startX + k * (CW + gap) + CW / 2} y="154" fill="#56d364" fontSize="12" textAnchor="middle" fontFamily="Consolas">↑ top</text>}
          </g>
        );
      })}
      <text x="320" y="196" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">append() and pop() work on the end → O(1)</text>
    </Stage2D>
  );
}
