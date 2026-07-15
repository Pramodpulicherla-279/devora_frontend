/* Lesson: Common Heap Interview Problems, Solved Step by Step
 * 2D animated: flip through the classic heap questions and the size-k or two-heap trick that
 * cracks each. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const PROBS = [
  { t: 'Kth Largest Element', key: 'Maintain a min-heap of size k; its root is the answer.', opt: 'O(n log k)' },
  { t: 'Top K Frequent Elements', key: 'Count with a hash map, then a size-k heap over the counts.', opt: 'O(n log k)' },
  { t: 'Merge K Sorted Lists', key: 'Min-heap of the K list heads; pop, output, push its successor.', opt: 'O(N log k)' },
  { t: 'Median From Data Stream', key: 'Balance a max-heap (low half) and min-heap (high half).', opt: 'O(log n)/add' },
  { t: 'Task Scheduler', key: 'Max-heap by frequency; run the most frequent that is not cooling down.', opt: 'O(n log n)' },
];
export default function HeapInterviewProblemsVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % PROBS.length), 2.3, auto);
  const p = PROBS[i];

  return (
    <Stage2D
      title="Heap Interview Problems"
      subtitle="The heap patterns to recognise: a size-k heap for 'top/kth' questions, and a two-heap split for running-median problems."
      accent="#58a6ff"
      viewBox="0 0 640 260"
      controls={
        <>
          {PROBS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={<>Reach for a heap when you see "<strong>kth largest/smallest</strong>", "<strong>top k</strong>", "<strong>merge k</strong>", or "<strong>running median</strong>". A size-k heap beats full sorting when k ≪ n, and the two-heap trick maintains a stream's median in O(log n) per element.</>}
    >
      <rect x="60" y="46" width="520" height="160" rx="14" fill="#0b0f15" stroke="#58a6ff" strokeWidth="1.5" />
      <text x="86" y="88" fill="#79c0ff" fontSize="19" fontWeight="700" fontFamily="system-ui">{p.t}</text>
      <rect x="430" y="66" width="126" height="30" rx="8" fill="rgba(86,211,100,.12)" stroke="#56d364" />
      <text x="493" y="86" fill="#7ee787" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{p.opt}</text>
      <text x="86" y="132" fill="#ffd43b" fontSize="13" fontFamily="system-ui">💡 approach</text>
      <foreignObject x="86" y="142" width="468" height="54">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#e6edf3', font: '16px system-ui', lineHeight: 1.4 }}>{p.key}</div>
      </foreignObject>
      <text x="320" y="238" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">problem {i + 1} of {PROBS.length}</text>
    </Stage2D>
  );
}
