/* Lesson: When to Reach for Recursion in Real Code
 * 2D animated: flip through problem types, each with a verdict — recursion shines on
 * self-similar structures; a loop wins for flat, linear work. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const CASES = [
  { t: 'Walking a tree / nested JSON', use: true, why: 'The data is self-similar — each subtree is a smaller tree. Recursion mirrors the shape.' },
  { t: 'Divide & conquer (merge sort)', use: true, why: 'Split in half, solve each half, combine. Natural fit for recursion.' },
  { t: 'Backtracking (mazes, permutations)', use: true, why: 'Explore a choice, recurse, undo. Very hard to express as a plain loop.' },
  { t: 'Summing a flat list', use: false, why: 'Linear pass with no branching — a simple for-loop is clearer and uses O(1) space.' },
  { t: 'Counting to a huge n', use: false, why: 'Deep linear recursion risks stack overflow. Iterate instead.' },
];
export default function CrWhenRecursionVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % CASES.length), 2.3, auto);
  const c = CASES[i];

  return (
    <Stage2D
      title="When to Reach for Recursion"
      subtitle="Recursion isn't always the answer. Use it when the problem is self-similar; use a loop when the work is flat and linear."
      accent={c.use ? '#56d364' : '#f0883e'}
      viewBox="0 0 640 280"
      controls={
        <>
          {CASES.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={<>Rule of thumb: if the data structure or algorithm is <strong>defined in terms of itself</strong> (trees, divide-and-conquer, backtracking), recursion is elegant. For <strong>flat, sequential</strong> work, a loop is simpler and avoids stack-depth limits.</>}
    >
      <rect x="70" y="50" width="500" height="150" rx="14" fill="#0b0f15" stroke={c.use ? '#56d364' : '#f0883e'} strokeWidth="1.5" />
      <text x="320" y="92" fill="#e6edf3" fontSize="19" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{c.t}</text>
      <rect x={c.use ? 200 : 210} y="108" width={c.use ? 240 : 220} height="34" rx="17" fill={c.use ? 'rgba(86,211,100,.15)' : 'rgba(240,136,62,.15)'} stroke={c.use ? '#56d364' : '#f0883e'} />
      <text x="320" y="130" fill={c.use ? '#7ee787' : '#f8c088'} fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{c.use ? '✓ use recursion' : '✗ prefer a loop'}</text>
      <foreignObject x="96" y="152" width="448" height="44">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '14px system-ui', lineHeight: 1.35, textAlign: 'center' }}>{c.why}</div>
      </foreignObject>
      <text x="320" y="238" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">scenario {i + 1} of {CASES.length}</text>
    </Stage2D>
  );
}
