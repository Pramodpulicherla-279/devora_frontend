/* Lesson: What Is Object-Oriented Programming, and Why Does DSA Need It?
 * 2D animated: one class blueprint stamps out multiple objects, each with its OWN data
 * but shared behavior. Auto-stamps instances one by one. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

const COLORS = ['#58a6ff', '#56d364', '#f97316', '#a78bfa'];
const NAMES = ['alice', 'bob', 'carol', 'dave'];

export default function PfWhatIsOopVisualization() {
  const [count, setCount] = useState(1);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setCount(c => (c >= 4 ? 1 : c + 1)), 1.7, auto);

  return (
    <Stage2D
      title="OOP: one blueprint, many objects"
      subtitle="A class is the blueprint; objects are stamped from it. Each object carries its OWN data but shares the behavior."
      accent="#58a6ff"
      viewBox="0 0 640 270"
      controls={
        <>
          <button className="pf2d-btn pf2d-btn--primary" disabled={count >= 4} onClick={() => setCount(c => Math.min(4, c + 1))}>+ Player(…) stamp</button>
          <button className="pf2d-btn" onClick={() => setCount(1)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="pf2d-readout">{count} object{count > 1 ? 's' : ''} from 1 class</span>
        </>
      }
      legend={<>Why DSA cares: a <strong>linked list</strong> is thousands of Node objects from one <code>Node</code> class; a <strong>tree</strong> is TreeNode objects; a <strong>graph</strong> is Vertex objects. OOP bundles state (<code>name, score</code>) with behavior (<code>move()</code>) so each piece manages itself.</>}
    >
      {/* blueprint */}
      <rect x="220" y="20" width="200" height="70" rx="12" fill="#161b22" stroke="#58a6ff" strokeWidth="2" strokeDasharray="6 4" />
      <text x="320" y="50" fill="#58a6ff" fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">class Player:</text>
      <text x="320" y="74" fill="#c9d1d9" fontSize="12" textAnchor="middle" fontFamily="Consolas">name · score · move()</text>
      {/* instances */}
      {Array.from({ length: count }).map((_, i) => {
        const x = 60 + i * 140;
        return (
          <g key={i} className="pf2d-pop" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
            <line x1="320" y1="90" x2={x + 60} y2="150" stroke={COLORS[i]} strokeWidth="1.5" opacity="0.5" />
            <rect x={x} y="150" width="120" height="90" rx="10" fill={COLORS[i]} />
            <text x={x + 60} y="180" fill="#0d1117" fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{NAMES[i]}</text>
            <text x={x + 60} y="204" fill="#0d1117" fontSize="13" textAnchor="middle" fontFamily="Consolas">score: {(i + 1) * 10}</text>
            <text x={x + 60} y="226" fill="#0d1117" fontSize="12" textAnchor="middle" fontFamily="Consolas">move()</text>
          </g>
        );
      })}
      <text x="320" y="112" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="system-ui">stamps objects ↓ (independent data)</text>
    </Stage2D>
  );
}
