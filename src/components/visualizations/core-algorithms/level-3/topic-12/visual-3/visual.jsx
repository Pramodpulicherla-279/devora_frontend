/* Problem: Generate Parentheses
 * 2D animated: build strings char by char with two counters — you may add '(' while any
 * remain, and ')' only if it wouldn't exceed the opens. Invalid branches never exist. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

// n=2: valid strings (()), ()()
const STEPS = [
  { path: '(', open: 1, close: 0, log: "start: only '(' is legal (close would go negative)" },
  { path: '((', open: 2, close: 0, log: "branch A: another '(' — opens exhausted (2/2)" },
  { path: '(()', open: 2, close: 1, log: "now only ')' is legal" },
  { path: '(())', open: 2, close: 2, ok: true, log: 'complete & balanced → record "(())"' },
  { path: '()', open: 1, close: 1, log: "backtrack to '(' … branch B: close it early" },
  { path: '()(', open: 2, close: 1, log: "open the second pair" },
  { path: '()()', open: 2, close: 2, ok: true, done: true, log: 'record "()()" — all 2 valid strings found' },
];
export default function BtGenParensVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 1.6, auto);
  const s = STEPS[i];
  return (
    <Stage2D title="Generate Parentheses (n = 2)" subtitle="Two rules prune the tree before bad strings are ever built: add '(' only while open < n, add ')' only while close < open. Every leaf reached is automatically valid."
      accent="#4fce78" viewBox="0 0 640 220"
      controls={<>{STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{s.log}</span></>}
      legend={<>This is <strong>pruning as constraint</strong>: instead of generating all 2²ⁿ strings and filtering, the two counters make invalid prefixes unreachable. Output count is the Catalan number C(n) — 2 for n=2, 5 for n=3, 14 for n=4.</>}>
      {/* the growing string */}
      {s.path.split('').map((ch, k) => (
        <g key={k} className="dsa2d-fade">
          <rect x={200 + k * 64} y="56" width="54" height="56" rx="10" fill={ch === '(' ? 'rgba(88,166,255,.18)' : 'rgba(240,163,94,.18)'} stroke={ch === '(' ? '#58a6ff' : '#f0a35e'} strokeWidth="2.5" />
          <text x={227 + k * 64} y="93" fill="#e6edf3" fontSize="24" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{ch}</text>
        </g>
      ))}
      {/* counters */}
      <text x="200" y="150" fill="#79c0ff" fontSize="13" fontWeight="700" fontFamily="Consolas">open: {s.open}/2</text>
      <text x="330" y="150" fill="#f8c088" fontSize="13" fontWeight="700" fontFamily="Consolas">close: {s.close}/2</text>
      {s.ok && <text x="470" y="150" fill="#56d364" fontSize="13" fontWeight="700" fontFamily="Consolas" className="dsa2d-pulse">✓ recorded</text>}
      <text x="320" y="192" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">legal moves: '(' if open&lt;2 · ')' if close&lt;open — nothing else exists</text>
    </Stage2D>
  );
}
