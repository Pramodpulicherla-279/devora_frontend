/* Lesson: Why Every Linked List and Tree Starts With a Node Class
 * 2D animated LINKED LIST: create Node objects (value | next) and wire the .next
 * pointers into a chain. Auto-builds node-by-node, then wires them together. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

const VALS = [7, 3, 12, 9, 5];

export default function PfNodeClassVisualization() {
  const [count, setCount] = useState(2);
  const [linked, setLinked] = useState(1);
  const [auto, setAuto] = useState(true);
  const addNode = () => setCount(c => Math.min(VALS.length, c + 1));
  const wire = () => setLinked(l => Math.min(count - 1, l + 1));
  const reset = () => { setCount(2); setLinked(1); };
  useAutoPlay(() => { if (linked < count - 1) wire(); else if (count < VALS.length) addNode(); else reset(); }, 1.4, auto, [count, linked]);

  const NW = 96, gap = 30;
  const startX = 320 - (count * (NW + gap) - gap) / 2;

  return (
    <Stage2D
      title="The Node class: value + next"
      subtitle="class Node stores a value and a .next pointer (None at first). Stamp nodes, then wire them — that IS a linked list."
      accent="#58a6ff"
      viewBox="0 0 640 250"
      controls={
        <>
          <button className="pf2d-btn pf2d-btn--primary" disabled={count >= VALS.length} onClick={addNode}>Node({VALS[count] ?? '…'}) create</button>
          <button className="pf2d-btn" disabled={linked >= count - 1} onClick={wire}>wire .next →</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <button className="pf2d-btn" onClick={reset}>↺</button>
          <span className="pf2d-readout">{count} nodes · {linked} pointer{linked !== 1 ? 's' : ''}</span>
        </>
      }
      legend={<>Each node knows only two things: its <code>value</code> (left) and <code>next</code> (right pocket — a reference to another node, or <code>None</code>). No array, no indexes: the structure IS the pointers. Traverse with <code>cur = head; while cur: cur = cur.next</code>. Swap <code>next</code> for <code>left/right</code> and you have a tree node.</>}
    >
      <text x={startX} y="60" fill="#ffd43b" fontSize="13" fontFamily="Consolas">head</text>
      <line x1={startX + 10} y1="66" x2={startX + 10} y2="96" stroke="#ffd43b" strokeWidth="2" /><polygon points={`${startX + 5},92 ${startX + 15},92 ${startX + 10},100`} fill="#ffd43b" />
      {Array.from({ length: count }).map((_, i) => {
        const x = startX + i * (NW + gap);
        const hasNext = i < linked;
        return (
          <g key={i} className="pf2d-pop" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
            <rect x={x} y="104" width={NW * 0.62} height="56" rx="8" fill="#58a6ff" />
            <text x={x + NW * 0.31} y="140" fill="#0d1117" fontSize="22" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{VALS[i]}</text>
            <rect x={x + NW * 0.62} y="104" width={NW * 0.38} height="56" rx="8" fill={hasNext ? '#56d364' : '#161b22'} stroke="#30363d" />
            <text x={x + NW * 0.81} y="137" fill={hasNext ? '#0d1117' : '#8b949e'} fontSize="12" textAnchor="middle" fontFamily="Consolas">{hasNext ? '●' : 'None'}</text>
            {hasNext && (
              <g className="pf2d-fade">
                <line x1={x + NW} y1="132" x2={x + NW + gap} y2="132" stroke="#56d364" strokeWidth="2.5" className="pf2d-flow" />
                <polygon points={`${x + NW + gap},132 ${x + NW + gap - 10},127 ${x + NW + gap - 10},137`} fill="#56d364" />
              </g>
            )}
          </g>
        );
      })}
      <text x="320" y="204" fill="#c9d1d9" fontSize="12" textAnchor="middle" fontFamily="Consolas">Node: self.value = v; self.next = None</text>
    </Stage2D>
  );
}
