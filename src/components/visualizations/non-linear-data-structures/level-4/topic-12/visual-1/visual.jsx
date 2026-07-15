/* Lesson: Common Graph Interview Problems, Solved Step by Step (overview)
 * 2D animated: flip through the classic graph problems, each tagged with the traversal
 * pattern that cracks it. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const PROBS = [
  { t: 'Number of Islands', pat: 'flood-fill (DFS/BFS)', c: '#56d364', why: 'Count connected components in a grid — each unvisited land cell launches a flood-fill.' },
  { t: 'Course Schedule', pat: 'topological sort', c: '#58a6ff', why: 'Can all courses finish? Detect a cycle in the prerequisite DAG via in-degrees.' },
  { t: 'Clone Graph', pat: 'DFS/BFS + hash map', c: '#a78bfa', why: 'Copy each node once; a visited→clone map stops infinite loops on cycles.' },
  { t: 'Word Ladder', pat: 'BFS shortest path', c: '#f0883e', why: 'Words are nodes, one-letter edits are edges. BFS finds the fewest transformations.' },
  { t: 'Rotting Oranges', pat: 'multi-source BFS', c: '#ffd43b', why: 'Start BFS from all rotten cells at once; the level count is the minutes elapsed.' },
];
export default function GraphInterviewProblemsVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % PROBS.length), 2.3, auto);
  const p = PROBS[i];

  return (
    <Stage2D
      title="Common Graph Interview Problems"
      subtitle="Almost every graph interview question reduces to a traversal (BFS or DFS) plus a twist. Recognise the pattern and the solution follows."
      accent={p.c}
      viewBox="0 0 640 300"
      controls={
        <>
          {PROBS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={<>The graph toolkit: <strong>BFS</strong> for shortest paths and levels, <strong>DFS</strong> for connectivity and cycles, <strong>topological sort</strong> for dependencies, and a <strong>visited set/map</strong> to stay O(V+E) and avoid infinite loops. Map the problem to one of these and you're most of the way there.</>}
    >
      <rect x="60" y="46" width="520" height="150" rx="14" fill="#0b0f15" stroke={p.c} strokeWidth="1.5" />
      <text x="320" y="88" fill="#e6edf3" fontSize="21" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{p.t}</text>
      <rect x="205" y="104" width="230" height="32" rx="16" fill={p.c + '22'} stroke={p.c} />
      <text x="320" y="125" fill={p.c} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{p.pat}</text>
      <foreignObject x="86" y="146" width="468" height="46">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '14px system-ui', lineHeight: 1.4, textAlign: 'center' }}>{p.why}</div>
      </foreignObject>
      {/* progress dots */}
      {PROBS.map((_, k) => <circle key={k} cx={320 - (PROBS.length - 1) * 12 + k * 24} cy="228" r="5" fill={k === i ? p.c : '#30363d'} />)}
      <text x="320" y="266" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">problem {i + 1} of {PROBS.length} — each detailed step-by-step in the lesson below</text>
    </Stage2D>
  );
}
