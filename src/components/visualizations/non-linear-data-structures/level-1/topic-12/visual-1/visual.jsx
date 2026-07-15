/* Lesson: Common Tree Interview Problems, Solved Step by Step
 * 2D animated: flip through the classic tree questions and the traversal/recursion pattern that
 * solves each. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const PROBS = [
  { t: 'Maximum Depth', key: '1 + max(depth(left), depth(right)). Pure recursion.', opt: 'O(n)' },
  { t: 'Invert / Mirror Tree', key: 'Swap left & right at every node, recursively.', opt: 'O(n)' },
  { t: 'Validate BST', key: 'Inorder must be strictly increasing — or pass down (min, max) bounds.', opt: 'O(n)' },
  { t: 'Lowest Common Ancestor', key: 'Recurse; the node where left and right both return a match is the LCA.', opt: 'O(n)' },
  { t: 'Level-Order / Zigzag', key: 'BFS with a queue, grouping nodes per level.', opt: 'O(n)' },
];
export default function TreeInterviewProblemsVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % PROBS.length), 2.3, auto);
  const p = PROBS[i];

  return (
    <Stage2D
      title="Tree Interview Problems"
      subtitle="Nearly every tree question is a traversal in disguise. Pick DFS (recursion) for depth/path problems and BFS (queue) for level problems."
      accent="#58a6ff"
      viewBox="0 0 640 260"
      controls={
        <>
          {PROBS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={<>Two master patterns: <strong>DFS recursion</strong> (depth, paths, validation, LCA) and <strong>BFS with a queue</strong> (levels, shortest hops). Most "hard" tree problems are just one of these with a small twist in what you track.</>}
    >
      <rect x="60" y="46" width="520" height="160" rx="14" fill="#0b0f15" stroke="#58a6ff" strokeWidth="1.5" />
      <text x="86" y="88" fill="#79c0ff" fontSize="20" fontWeight="700" fontFamily="system-ui">{p.t}</text>
      <rect x="450" y="66" width="106" height="30" rx="8" fill="rgba(86,211,100,.12)" stroke="#56d364" />
      <text x="503" y="86" fill="#7ee787" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{p.opt}</text>
      <text x="86" y="132" fill="#ffd43b" fontSize="13" fontFamily="system-ui">💡 approach</text>
      <foreignObject x="86" y="142" width="468" height="54">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#e6edf3', font: '16px system-ui', lineHeight: 1.4 }}>{p.key}</div>
      </foreignObject>
      <text x="320" y="238" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">problem {i + 1} of {PROBS.length}</text>
    </Stage2D>
  );
}
