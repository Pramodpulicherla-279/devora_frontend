/* Lesson: Common Hash Table Interview Problems, Solved Step by Step
 * 2D animated: flip through the classic hash-map problems and the trick that makes each O(n). */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const PROBS = [
  { t: 'Two Sum', key: 'Map value → index; look up target − x.', opt: 'O(n)' },
  { t: 'Group Anagrams', key: 'Bucket words by sorted form or letter-count key.', opt: 'O(n·k)' },
  { t: 'First Unique Character', key: 'Count frequencies, then find the first with count 1.', opt: 'O(n)' },
  { t: 'Subarray Sum = K', key: 'Store prefix-sum counts; check for (prefix − k).', opt: 'O(n)' },
  { t: 'LRU Cache', key: 'Hash map + doubly linked list for O(1) get/put.', opt: 'O(1)' },
];
export default function HtInterviewProblemsVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % PROBS.length), 2.3, auto);
  const p = PROBS[i];

  return (
    <Stage2D
      title="Hash Table Interview Problems"
      subtitle="When a question involves 'have I seen this?', 'how many of each?', or 'find the pair/complement', a hash map usually turns an O(n²) scan into O(n)."
      accent="#58a6ff"
      viewBox="0 0 640 260"
      controls={
        <>
          {PROBS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={<>Signals that scream "hash map": membership tests, frequency counts, complement/pair lookups, and prefix-sum bookkeeping. The recurring win is turning a repeated inner search into an <strong>O(1)</strong> lookup — and pairing a map with a linked list gives O(1) caches (LRU).</>}
    >
      <rect x="60" y="46" width="520" height="160" rx="14" fill="#0b0f15" stroke="#58a6ff" strokeWidth="1.5" />
      <text x="86" y="88" fill="#79c0ff" fontSize="20" fontWeight="700" fontFamily="system-ui">{p.t}</text>
      <rect x="440" y="66" width="116" height="30" rx="8" fill="rgba(86,211,100,.12)" stroke="#56d364" />
      <text x="498" y="86" fill="#7ee787" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{p.opt}</text>
      <text x="86" y="132" fill="#ffd43b" fontSize="13" fontFamily="system-ui">💡 approach</text>
      <foreignObject x="86" y="142" width="468" height="52">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#e6edf3', font: '16px system-ui', lineHeight: 1.4 }}>{p.key}</div>
      </foreignObject>
      <text x="320" y="238" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">problem {i + 1} of {PROBS.length}</text>
    </Stage2D>
  );
}
