/* Lesson: Using a Stack to Evaluate Expressions
 * 2D animated: evaluate a postfix (RPN) expression. Push numbers; on an operator, pop two,
 * compute, and push the result. The stack ends with the answer. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const TOKENS = ['3', '4', '+', '5', '*'];   // (3+4)*5 = 35
function stackAt(n) {
  const st = [];
  for (let i = 0; i < n; i++) {
    const t = TOKENS[i];
    if ('+-*/'.includes(t)) { const b = st.pop(), a = st.pop(); st.push(t === '+' ? a + b : t === '-' ? a - b : t === '*' ? a * b : a / b); }
    else st.push(+t);
  }
  return st;
}
export default function SqExpressionEvalVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v >= TOKENS.length ? 0 : v + 1)), 1.0, auto);
  const st = stackAt(i);
  const done = i >= TOKENS.length;
  const cur = i < TOKENS.length ? TOKENS[i] : null;
  const isOp = cur && '+-*/'.includes(cur);
  const CW = 56, gap = 8;
  const startX = 320 - (TOKENS.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Evaluate Postfix With a Stack"
      subtitle="Postfix (Reverse Polish) needs no parentheses. Push operands; when an operator appears, pop the top two, apply it, and push the result."
      accent="#56d364"
      viewBox="0 0 640 260"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v >= TOKENS.length ? 0 : v + 1))}>next token</button>
          <button className="dsa2d-btn" onClick={() => setI(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{done ? `result = ${st[0]}` : isOp ? `pop 2, apply '${cur}'` : `push ${cur}`}</span>
        </>
      }
      legend={<>Expression <code>3 4 + 5 *</code> means <code>(3+4)×5 = 35</code>. Each operator consumes the two most-recent values — exactly what a stack provides. This is how calculators and interpreters evaluate arithmetic, in a single <strong>O(n)</strong> pass.</>}
    >
      {/* tokens */}
      {TOKENS.map((t, k) => {
        const scanned = k < i, isCur = k === i && !done;
        const op = '+-*/'.includes(t);
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="44" width={CW} height="46" rx="7" fill={isCur ? 'rgba(88,166,255,.22)' : scanned ? '#161b22' : '#0d1117'} stroke={isCur ? '#58a6ff' : op ? '#f0883e' : scanned ? '#6e7681' : '#30363d'} strokeWidth="2" className={isCur ? 'dsa2d-pulse' : ''} />
            <text x={startX + k * (CW + gap) + CW / 2} y="75" fill={op ? '#f0883e' : scanned && !isCur ? '#8b949e' : '#e6edf3'} fontSize="21" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{t}</text>
          </g>
        );
      })}
      {/* stack */}
      <text x="320" y="120" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">stack</text>
      <line x1="256" y1="232" x2="384" y2="232" stroke="#8b949e" strokeWidth="2" />
      {st.map((v, k) => (
        <g key={k} className="dsa2d-fade">
          <rect x="266" y={230 - (k + 1) * 32} width="108" height="28" rx="6" fill={k === st.length - 1 ? 'rgba(86,211,100,.25)' : '#161b22'} stroke={k === st.length - 1 ? '#56d364' : '#30363d'} strokeWidth="2" />
          <text x="320" y={250 - (k + 1) * 32} fill="#e6edf3" fontSize="17" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
        </g>
      ))}
      {done && <text x="320" y="252" fill="#56d364" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">✓ (3+4)×5 = 35</text>}
    </Stage2D>
  );
}
