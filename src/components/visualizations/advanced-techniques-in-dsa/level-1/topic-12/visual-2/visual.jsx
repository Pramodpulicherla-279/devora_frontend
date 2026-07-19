/* Problem: Jump Game
 * 2D animated: sweep once tracking the farthest reachable index. If the sweep ever passes the
 * reach, you're stranded; if reach covers the last index, you can win. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const A = [2, 3, 1, 1, 4];
function buildSteps() {
  const steps = []; let reach = 0;
  for (let i = 0; i < A.length; i++) {
    if (i > reach) { steps.push({ i, reach, stuck: true, log: `index ${i} > reach ${reach} → stranded` }); break; }
    const nr = Math.max(reach, i + A[i]);
    steps.push({ i, reach: nr, prev: reach, log: `at ${i} (jump ${A[i]}): reach = max(${reach}, ${i}+${A[i]}) = ${nr}` });
    reach = nr;
  }
  steps.push({ i: A.length - 1, reach, done: true, log: `reach ${reach} ≥ last index ${A.length - 1} → reachable ✓` });
  return steps;
}
const STEPS = buildSteps();
const CW = 80, gap = 14, startX = (640 - (A.length * (CW + gap) - gap)) / 2;
export default function GreedyJumpGameVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 1.6, auto);
  const s = STEPS[i];
  return (
    <Stage2D title="Jump Game" subtitle="No need to try every jump sequence — one number summarises all of them: the farthest index reachable so far. Sweep left to right, keep it updated, and compare it to the finish line."
      accent="#f0a35e" viewBox="0 0 640 210"
      controls={<>{STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{s.log}</span></>}
      legend={<>The greedy insight: if index i is reachable, so is everything the max-reach covers — individual jump paths don't matter. One pass, <strong>O(n)</strong>, O(1) space. Jump Game II (minimum jumps) extends this with a second boundary counter.</>}>
      {A.map((v, k) => {
        const isCur = k === s.i, inReach = k <= s.reach, isLast = k === A.length - 1;
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="60" width={CW} height="54" rx="9" fill={isCur ? 'rgba(255,212,59,.18)' : inReach ? 'rgba(240,163,94,.14)' : '#161b22'} stroke={isCur ? '#ffd43b' : isLast ? '#56d364' : inReach ? '#f0a35e' : '#6e7681'} strokeWidth={isCur || isLast ? 3 : 2} className={isCur ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s' }} />
            <text x={startX + k * (CW + gap) + CW / 2} y="94" fill="#e6edf3" fontSize="19" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
            <text x={startX + k * (CW + gap) + CW / 2} y="130" fill={isLast ? '#56d364' : '#8b949e'} fontSize="11" textAnchor="middle" fontFamily="Consolas">{isLast ? 'goal' : k}</text>
          </g>
        );
      })}
      {/* reach bar */}
      <rect x={startX} y="150" width={(s.reach + 1) * (CW + gap) - gap} height="12" rx="5" fill="rgba(240,163,94,.35)" stroke="#f0a35e" style={{ transition: 'width .4s' }} />
      <text x="320" y="188" fill={s.done ? '#56d364' : '#f8c088'} fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{s.done ? '✓ last index inside the reach — reachable' : `farthest reach: index ${s.reach}`}</text>
    </Stage2D>
  );
}
