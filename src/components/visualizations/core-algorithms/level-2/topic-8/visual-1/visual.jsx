/* Lesson: Comparing Sorting Algorithms — Time, Space, and Stability
 * 2D animated table: highlight each algorithm's best/avg/worst time, space, and stability.
 * Cycle through rows to compare trade-offs. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const ROWS = [
  { n: 'Bubble', best: 'n', avg: 'n²', worst: 'n²', space: '1', stable: 'yes' },
  { n: 'Selection', best: 'n²', avg: 'n²', worst: 'n²', space: '1', stable: 'no' },
  { n: 'Insertion', best: 'n', avg: 'n²', worst: 'n²', space: '1', stable: 'yes' },
  { n: 'Merge', best: 'n log n', avg: 'n log n', worst: 'n log n', space: 'n', stable: 'yes' },
  { n: 'Quick', best: 'n log n', avg: 'n log n', worst: 'n²', space: 'log n', stable: 'no' },
  { n: 'Counting', best: 'n+k', avg: 'n+k', worst: 'n+k', space: 'k', stable: 'yes' },
];
const COLS = ['best', 'avg', 'worst', 'space', 'stable'];
export default function SortCompareVisualization() {
  const [i, setI] = useState(3);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % ROWS.length), 1.8, auto);
  const colX = { name: 60, best: 210, avg: 300, worst: 390, space: 480, stable: 560 };
  return (
    <Stage2D title="Comparing Sorting Algorithms" subtitle="No sort is best at everything. The choice trades time against space and stability — merge is reliably fast but uses O(n) memory; quick is fast in place but risks O(n²); counting beats them all when values are small integers."
      accent="#58a6ff" viewBox="0 0 640 280"
      controls={<>{ROWS.map((r, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{r.n}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<><strong>Stable</strong> means equal elements keep their original order — essential when sorting by multiple keys. Merge and Timsort are the go-to stable O(n log n) sorts; quick sort is often fastest in practice but unstable; counting/radix break the comparison barrier for bounded integers.</>}>
      {/* header */}
      {['algorithm', 'best', 'avg', 'worst', 'space', 'stable'].map((h, k) => <text key={h} x={[80, 210, 300, 390, 480, 560][k]} y="40" fill="#8b949e" fontSize="12" textAnchor={k === 0 ? 'start' : 'middle'} fontFamily="Consolas" fontWeight="700">{h}</text>)}
      <line x1="40" y1="50" x2="600" y2="50" stroke="#30363d" />
      {ROWS.map((r, k) => {
        const on = k === i, y = 76 + k * 34;
        return (
          <g key={k} style={{ opacity: on ? 1 : 0.5, transition: 'opacity .3s' }}>
            {on && <rect x="40" y={y - 22} width="560" height="30" rx="6" fill="rgba(88,166,255,.1)" />}
            <text x="60" y={y} fill={on ? '#79c0ff' : '#c9d1d9'} fontSize="14" fontWeight="700" fontFamily="system-ui">{r.n}</text>
            <text x="210" y={y} fill="#56d364" fontSize="12.5" textAnchor="middle" fontFamily="Consolas">{r.best}</text>
            <text x="300" y={y} fill="#c9d1d9" fontSize="12.5" textAnchor="middle" fontFamily="Consolas">{r.avg}</text>
            <text x="390" y={y} fill={r.worst === 'n²' ? '#f0883e' : '#c9d1d9'} fontSize="12.5" textAnchor="middle" fontFamily="Consolas">{r.worst}</text>
            <text x="480" y={y} fill="#c9d1d9" fontSize="12.5" textAnchor="middle" fontFamily="Consolas">{r.space}</text>
            <text x="560" y={y} fill={r.stable === 'yes' ? '#56d364' : '#8b949e'} fontSize="12.5" textAnchor="middle" fontFamily="Consolas">{r.stable}</text>
          </g>
        );
      })}
    </Stage2D>
  );
}
