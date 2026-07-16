/* Lesson: Building Your Own Pattern Cheat Sheet
 * 2D animated: the one-screen master table — every pattern, its trigger, and its complexity.
 * Rows highlight in rotation; this IS the cheat sheet to rebuild from memory. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const ROWS = [
  { pat: 'Sliding Window', trig: 'contiguous run', cx: 'O(n)' },
  { pat: 'Two Pointers', trig: 'sorted / in-place', cx: 'O(n)' },
  { pat: 'Fast & Slow', trig: 'cycle, midpoint', cx: 'O(n)·O(1)' },
  { pat: 'Merge Intervals', trig: 'ranges overlap', cx: 'O(n log n)' },
  { pat: 'Top-K (heap)', trig: 'k best of many', cx: 'O(n log k)' },
  { pat: 'Monotonic Stack', trig: 'next greater', cx: 'O(n)' },
  { pat: 'BFS / DFS', trig: 'reach / order / group', cx: 'O(V+E)' },
  { pat: 'Backtracking', trig: 'list all configs', cx: 'exponential + prune' },
  { pat: 'DP', trig: 'count / optimise + overlap', cx: 'O(states·work)' },
];
export default function PatCheatsheetVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % ROWS.length), 1.5, auto);
  return (
    <Stage2D title="The Pattern Cheat Sheet" subtitle="Nine rows cover the vast majority of coding interviews. Don't download someone else's sheet — rebuilding this table from memory is the actual exercise that makes it stick."
      accent="#58a6ff" viewBox="0 0 640 320"
      controls={<><button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v + 1) % ROWS.length)}>next row</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<>Suggested practice loop: pick a random solved problem, name its row in this table <em>before</em> re-reading your solution, and add one example problem per row per week. A sheet you built beats any you downloaded.</>}>
      {['pattern', 'trigger phrase', 'complexity'].map((h, k) => <text key={h} x={[150, 380, 545][k]} y="40" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="Consolas" fontWeight="700">{h}</text>)}
      <line x1="45" y1="50" x2="595" y2="50" stroke="#30363d" />
      {ROWS.map((r, k) => {
        const on = k === i;
        return (
          <g key={k} style={{ opacity: on ? 1 : 0.55, transition: 'opacity .25s' }}>
            {on && <rect x="45" y={60 + k * 27 - 17} width="550" height="24" rx="6" fill="rgba(88,166,255,.12)" />}
            <text x="60" y={60 + k * 27} fill={on ? '#79c0ff' : '#c9d1d9'} fontSize="13" fontWeight="700" fontFamily="system-ui">{r.pat}</text>
            <text x="380" y={60 + k * 27} fill="#c9d1d9" fontSize="12" textAnchor="middle" fontFamily="system-ui">{r.trig}</text>
            <text x="545" y={60 + k * 27} fill={on ? '#7ee787' : '#8b949e'} fontSize="12" textAnchor="middle" fontFamily="Consolas">{r.cx}</text>
          </g>
        );
      })}
    </Stage2D>
  );
}
