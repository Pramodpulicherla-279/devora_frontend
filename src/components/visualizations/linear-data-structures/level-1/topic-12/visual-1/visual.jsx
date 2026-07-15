/* Lesson: Common Array Interview Problems, Solved Step by Step
 * 2D animated: flip through the classic array problems, each showing the naive cost, the key
 * insight, and the optimized complexity. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const PROBS = [
  { t: 'Two Sum', naive: 'O(n²) check all pairs', key: 'Store seen values in a hash map; look up target − x.', opt: 'O(n)' },
  { t: 'Max Subarray (Kadane)', naive: 'O(n²) sum every subarray', key: 'Track best sum ending here; reset when it goes negative.', opt: 'O(n)' },
  { t: 'Move Zeroes', naive: 'O(n) extra array', key: 'Two pointers: swap non-zeros forward in place.', opt: 'O(1) space' },
  { t: 'Merge Intervals', naive: 'compare all pairs', key: 'Sort by start, then merge overlapping neighbours.', opt: 'O(n log n)' },
  { t: 'Product Except Self', naive: 'O(n²) or use division', key: 'Prefix products left, then sweep right.', opt: 'O(n), no division' },
];
export default function ArrInterviewProblemsVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % PROBS.length), 2.4, auto);
  const p = PROBS[i];

  return (
    <Stage2D
      title="Array Interview Problems"
      subtitle="The pattern behind most array questions: start with the brute-force, then spot the structure (hashing, two pointers, prefix, sorting) that removes a whole loop."
      accent="#58a6ff"
      viewBox="0 0 640 280"
      controls={
        <>
          {PROBS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={<>Recurring tools: <strong>hash maps</strong> (Two Sum), <strong>running state</strong> (Kadane), <strong>two pointers</strong> (Move Zeroes), <strong>sorting</strong> (Merge Intervals), and <strong>prefix products/sums</strong> (Product Except Self). Recognising which one applies is the whole game.</>}
    >
      <rect x="60" y="46" width="520" height="180" rx="14" fill="#0b0f15" stroke="#58a6ff" strokeWidth="1.5" />
      <text x="86" y="86" fill="#79c0ff" fontSize="21" fontWeight="700" fontFamily="system-ui">{p.t}</text>
      {/* naive */}
      <rect x="86" y="102" width="220" height="30" rx="8" fill="rgba(248,81,73,.12)" stroke="#f85149" />
      <text x="98" y="122" fill="#ff9d95" fontSize="12" fontFamily="Consolas">naive: {p.naive}</text>
      {/* optimized */}
      <rect x="326" y="102" width="228" height="30" rx="8" fill="rgba(86,211,100,.12)" stroke="#56d364" />
      <text x="338" y="122" fill="#7ee787" fontSize="12" fontFamily="Consolas">optimized: {p.opt}</text>
      {/* insight */}
      <text x="86" y="162" fill="#ffd43b" fontSize="13" fontFamily="system-ui">💡 key insight</text>
      <foreignObject x="86" y="170" width="468" height="48">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#e6edf3', font: '15px system-ui', lineHeight: 1.35 }}>{p.key}</div>
      </foreignObject>
      <text x="320" y="256" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">problem {i + 1} of {PROBS.length}</text>
    </Stage2D>
  );
}
