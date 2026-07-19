/* Lesson: Operators and Expressions for Algorithmic Thinking
 * 2D animated EXPRESSION TREE: (a + b) * c is evaluated bottom-up, lighting each node
 * in turn and showing the intermediate value — the flow of expression evaluation. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

export default function PfOperatorsVisualization() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const [c, setC] = useState(2);
  const [step, setStep] = useState(0); // 0 leaves, 1 (a+b), 2 *c/result
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setStep(s => (s + 1) % 3), 1.6, auto);

  const sum = a + b;
  const result = sum * c;
  const leafLit = step >= 0;
  const plusLit = step >= 1;
  const rootLit = step >= 2;

  const Node = ({ x, y, label, lit, color, val }) => (
    <g style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
      <circle cx={x} cy={y} r="26" fill={lit ? color : '#161b22'} stroke={lit ? color : '#30363d'} strokeWidth="2" className={lit ? 'pf2d-pulse pf2d-fade' : 'pf2d-fade'} />
      <text x={x} y={y + 7} fill={lit ? '#0d1117' : '#8b949e'} fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{label}</text>
      {val !== undefined && lit && <text x={x} y={y - 36} fill={color} fontSize="14" textAnchor="middle" fontFamily="Consolas">={val}</text>}
    </g>
  );

  return (
    <Stage2D
      title="Operators & Expressions — the eval tree"
      subtitle="Python builds an expression tree and evaluates it bottom-up: leaves first, then inner operators, then the root. Parentheses reshape the tree."
      accent="#ffd43b"
      viewBox="0 0 640 300"
      controls={
        <>
          <div className="pf2d-group"><span className="pf2d-label">a={a}</span><input className="pf2d-slider" type="range" min="0" max="9" value={a} onChange={e => setA(+e.target.value)} /></div>
          <div className="pf2d-group"><span className="pf2d-label">b={b}</span><input className="pf2d-slider" type="range" min="0" max="9" value={b} onChange={e => setB(+e.target.value)} /></div>
          <div className="pf2d-group"><span className="pf2d-label">c={c}</span><input className="pf2d-slider" type="range" min="0" max="9" value={c} onChange={e => setC(+e.target.value)} /></div>
          <AutoButton playing={auto} onToggle={() => setAuto(x => !x)} />
          <span className="pf2d-readout">(a + b) * c = {result}</span>
        </>
      }
      legend={<>Evaluation order is the heart of algorithmic thinking: the <code>+</code> node fires before the <code>*</code> node because parentheses bind it lower in the tree. Change the parentheses and the tree — and the answer — changes. Precedence is just tree depth.</>}
    >
      {/* edges */}
      <g stroke="#30363d" strokeWidth="2">
        <line x1="320" y1="86" x2="210" y2="166" className={plusLit ? 'pf2d-flow' : ''} stroke={plusLit ? '#ffd43b' : '#30363d'} />
        <line x1="320" y1="86" x2="440" y2="166" className={rootLit ? 'pf2d-flow' : ''} stroke={rootLit ? '#ffd43b' : '#30363d'} />
        <line x1="210" y1="166" x2="140" y2="246" className={leafLit ? 'pf2d-flow' : ''} stroke={leafLit ? '#58a6ff' : '#30363d'} />
        <line x1="210" y1="166" x2="280" y2="246" className={leafLit ? 'pf2d-flow' : ''} stroke={leafLit ? '#58a6ff' : '#30363d'} />
      </g>
      <Node x={320} y={60} label="*" lit={rootLit} color="#ffd43b" val={rootLit ? result : undefined} />
      <Node x={210} y={166} label="+" lit={plusLit} color="#ffd43b" val={plusLit ? sum : undefined} />
      <Node x={440} y={166} label="c" lit={leafLit} color="#56d364" val={leafLit ? c : undefined} />
      <Node x={140} y={246} label="a" lit={leafLit} color="#58a6ff" val={leafLit ? a : undefined} />
      <Node x={280} y={246} label="b" lit={leafLit} color="#58a6ff" val={leafLit ? b : undefined} />
      <text x={520} y={60} fill="#8b949e" fontSize="12" fontFamily="system-ui">
        {step === 0 ? '1. read leaves' : step === 1 ? `2. a+b = ${sum}` : `3. ×c = ${result}`}
      </text>
    </Stage2D>
  );
}
