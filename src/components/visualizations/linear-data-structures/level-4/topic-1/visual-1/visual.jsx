/* Lesson: What Is a Stack? Understanding LIFO With Real Examples
 * 2D animated: a vertical stack of plates. push adds to the top, pop removes from the top —
 * Last In, First Out. Steps through a push/pop sequence. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const SNAPS = [
  { s: [], op: 'empty stack' },
  { s: ['A'], op: 'push A' },
  { s: ['A', 'B'], op: 'push B' },
  { s: ['A', 'B', 'C'], op: 'push C' },
  { s: ['A', 'B'], op: 'pop → C (last in, first out)' },
  { s: ['A'], op: 'pop → B' },
];
export default function SqStackIntroVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % SNAPS.length), 1.1, auto);
  const { s, op } = SNAPS[i];
  const BW = 120, BH = 34, baseY = 210, cx = 320;

  return (
    <Stage2D
      title="Stacks: Last In, First Out"
      subtitle="A stack only touches one end — the top. The last item pushed is the first one popped, like a stack of plates or the browser back button."
      accent="#58a6ff"
      viewBox="0 0 640 260"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v + 1) % SNAPS.length)}>next op</button>
          <button className="dsa2d-btn" onClick={() => setI(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{op}</span>
        </>
      }
      legend={<>Only two core operations, both <strong>O(1)</strong>: <code>push</code> (add to top) and <code>pop</code> (remove from top), plus <code>peek</code> to look. LIFO order shows up everywhere: function call stacks, undo history, expression evaluation, and DFS.</>}
    >
      {/* base */}
      <line x1={cx - BW / 2 - 10} y1={baseY + BH} x2={cx + BW / 2 + 10} y2={baseY + BH} stroke="#8b949e" strokeWidth="3" />
      {s.map((v, k) => {
        const y = baseY - k * (BH + 4);
        const isTop = k === s.length - 1;
        return (
          <g key={k} className="dsa2d-fade">
            <rect x={cx - BW / 2} y={y} width={BW} height={BH} rx="6" fill={isTop ? 'rgba(88,166,255,.28)' : '#161b22'} stroke={isTop ? '#58a6ff' : '#30363d'} strokeWidth="2" className={isTop ? 'dsa2d-pop' : ''} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
            <text x={cx} y={y + 23} fill="#e6edf3" fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
            {isTop && <text x={cx + BW / 2 + 20} y={y + 22} fill="#58a6ff" fontSize="13" fontFamily="Consolas">← top</text>}
          </g>
        );
      })}
      {s.length === 0 && <text x={cx} y={baseY + 20} fill="#6b7785" fontSize="14" textAnchor="middle" fontFamily="Consolas">(empty)</text>}
      <text x={cx} y="34" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">push/pop happen only at the top</text>
    </Stage2D>
  );
}
