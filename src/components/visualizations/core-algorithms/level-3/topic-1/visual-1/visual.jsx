/* Lesson: What Is Backtracking? Recursion With a Way to Undo Mistakes
 * 2D animated: a DFS pointer explores a decision tree, hits dead ends (red), backs up, and
 * finds the goal (green) — the essence of backtracking. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

// pre-laid decision tree; visit order with dead-ends and the goal
const NODES = [
  { id: 0, x: 320, y: 40, p: null }, { id: 1, x: 200, y: 110, p: 0 }, { id: 2, x: 440, y: 110, p: 0 },
  { id: 3, x: 130, y: 190, p: 1 }, { id: 4, x: 270, y: 190, p: 1 }, { id: 5, x: 380, y: 190, p: 2 }, { id: 6, x: 510, y: 190, p: 2 },
];
const DEAD = new Set([3, 4, 5]);
const GOAL = 6;
// DFS visit sequence with backtracks
const SEQ = [0, 1, 3, 1, 4, 1, 0, 2, 5, 2, 6];
export default function BtIntroVisualization() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setStep(v => (v >= SEQ.length - 1 ? 0 : v + 1)), 0.8, auto);
  const cur = SEQ[step];
  const visited = new Set(SEQ.slice(0, step + 1));
  const atGoal = cur === GOAL;
  const backtracking = step > 0 && SEQ[step] === NODES[SEQ[step - 1]].p;
  return (
    <Stage2D title="What Is Backtracking?" subtitle="Backtracking is DFS that can undo a choice. It commits to an option, explores it, and if that leads to a dead end, it steps back and tries the next — systematically searching all possibilities."
      accent="#a78bfa" viewBox="0 0 640 250"
      controls={<><button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setStep(v => (v >= SEQ.length - 1 ? 0 : v + 1))}>step</button><button className="dsa2d-btn" onClick={() => setStep(0)}>↺</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{atGoal ? 'goal reached!' : backtracking ? 'backtracking ↩' : 'exploring ↓'}</span></>}
      legend={<>The pattern: <strong>choose</strong> an option, <strong>explore</strong> it recursively, and if it fails, <strong>un-choose</strong> and try the next. Red nodes are dead ends that force a backtrack; the green node is the goal. This systematic trial-and-error powers puzzles, permutations, and constraint problems.</>}>
      {NODES.filter(n => n.p !== null).map(n => { const par = NODES[n.p]; const on = visited.has(n.id); return <line key={n.id} x1={par.x} y1={par.y} x2={n.x} y2={n.y} stroke={on ? '#a78bfa' : '#30363d'} strokeWidth={on ? 3 : 2} style={{ transition: 'stroke .3s' }} />; })}
      {NODES.map(n => {
        const isCur = n.id === cur, seen = visited.has(n.id), dead = DEAD.has(n.id), goal = n.id === GOAL;
        const fill = isCur && goal ? '#56d364' : isCur && dead ? '#f85149' : goal && seen ? 'rgba(86,211,100,.2)' : dead && seen ? 'rgba(248,81,73,.18)' : seen ? 'rgba(167,139,250,.2)' : '#161b22';
        const stroke = goal ? '#56d364' : dead ? '#f85149' : seen ? '#a78bfa' : '#8b949e';
        return <g key={n.id}><circle cx={n.x} cy={n.y} r="19" fill={fill} stroke={stroke} strokeWidth={isCur ? 3.5 : 2} className={isCur ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s' }} />{(dead && seen) && <text x={n.x} y={n.y + 5} fill="#f85149" fontSize="16" textAnchor="middle" fontWeight="700">✕</text>}{goal && seen && <text x={n.x} y={n.y + 5} fill="#56d364" fontSize="15" textAnchor="middle" fontWeight="700">★</text>}</g>;
      })}
      <text x="320" y="234" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">✕ dead end → back up · ★ goal</text>
    </Stage2D>
  );
}
