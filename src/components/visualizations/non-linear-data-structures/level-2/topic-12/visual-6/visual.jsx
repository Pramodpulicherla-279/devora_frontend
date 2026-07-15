/* Problem: Task Scheduler With Cooldown
 * 2D animated: a max-heap by remaining count always runs the most frequent available task.
 * The cooldown n forces gaps (idles) between repeats of the same task. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

// tasks A×3, B×3, cooldown n=2 → A B idle A B idle A B  (8 slots)
const SCHEDULE = ['A', 'B', '·', 'A', 'B', '·', 'A', 'B'];
export default function HeapTaskSchedulerVisualization() {
  const [t, setT] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setT(v => (v > SCHEDULE.length ? 0 : v + 1)), 0.7, auto);
  const done = t > SCHEDULE.length;
  const CW = 58, gap = 8;
  const startX = 320 - (SCHEDULE.length * (CW + gap) - gap) / 2;
  const idles = SCHEDULE.filter(s => s === '·').length;

  return (
    <Stage2D
      title="Task Scheduler With Cooldown"
      subtitle="Identical tasks must be at least n slots apart. Greedily run the most frequent ready task (max-heap); if nothing is ready, the CPU idles."
      accent="#f0883e"
      viewBox="0 0 640 230"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setT(v => (v > SCHEDULE.length ? 0 : v + 1))}>next slot</button>
          <button className="dsa2d-btn" onClick={() => setT(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">tasks A×3 B×3 · cooldown 2 · {done ? `${SCHEDULE.length} slots` : `slot ${Math.min(t, SCHEDULE.length)}`}</span>
        </>
      }
      legend={<>Each cycle of length <code>n+1</code>, pop the most frequent tasks from a max-heap, run them, then push back any with remaining count. When the heap has too few ready tasks, the gaps become <strong>idle</strong> slots. Total time = <code>max(len, (maxCount−1)×(n+1) + #maxTasks)</code> = <strong>8</strong> here.</>}
    >
      <text x="320" y="46" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">CPU timeline →</text>
      {SCHEDULE.map((task, k) => {
        const run = k < t;
        const idle = task === '·';
        return (
          <g key={k} style={{ opacity: run || done ? 1 : 0.25, transition: 'opacity .3s' }}>
            <rect x={startX + k * (CW + gap)} y="70" width={CW} height="58" rx="9"
              fill={idle ? 'rgba(139,148,158,.12)' : task === 'A' ? 'rgba(240,136,62,.25)' : 'rgba(88,166,255,.22)'}
              stroke={idle ? '#484f58' : task === 'A' ? '#f0883e' : '#58a6ff'} strokeWidth="2"
              strokeDasharray={idle ? '4 3' : '0'} className={run && k === t - 1 ? 'dsa2d-pulse' : ''} />
            <text x={startX + k * (CW + gap) + CW / 2} y="106" fill={idle ? '#8b949e' : '#e6edf3'} fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{idle ? 'idle' : task}</text>
            <text x={startX + k * (CW + gap) + CW / 2} y="146" fill="#6b7785" fontSize="10" textAnchor="middle" fontFamily="Consolas">{k}</text>
          </g>
        );
      })}
      <text x="320" y="184" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">same task ≥ 2 slots apart → {idles} forced idle slot{idles !== 1 ? 's' : ''}</text>
      {done && <text x="320" y="210" fill="#f0883e" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">minimum time = 8 slots</text>}
    </Stage2D>
  );
}
