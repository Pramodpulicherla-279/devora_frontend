/* Lesson: Common String Interview Problems, Solved Step by Step
 * 2D animated: flip through the classic string problems with the pattern that cracks each one. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const PROBS = [
  { t: 'Longest Substring, No Repeats', key: 'Sliding window + last-seen hash map.', opt: 'O(n)' },
  { t: 'Group Anagrams', key: 'Bucket words by their sorted form (or letter-count key).', opt: 'O(n·k log k)' },
  { t: 'Valid Palindrome', key: 'Two pointers inward, skip non-alphanumerics, lowercase.', opt: 'O(n)' },
  { t: 'Longest Common Prefix', key: 'Scan characters vertically across all strings; stop at first diff.', opt: 'O(n·m)' },
  { t: 'String to Integer (atoi)', key: 'Handle sign, skip spaces, parse digits, clamp overflow.', opt: 'O(n)' },
];
export default function StrInterviewProblemsVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % PROBS.length), 2.4, auto);
  const p = PROBS[i];

  return (
    <Stage2D
      title="String Interview Problems"
      subtitle="Most string questions reduce to a handful of tools: sliding windows, hashing, two pointers, and careful character-by-character parsing."
      accent="#58a6ff"
      viewBox="0 0 640 260"
      controls={
        <>
          {PROBS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={<>Watch for the immutability trap: build results with a <strong>list + join</strong>, not repeated <code>+=</code>. And remember hashing letter counts beats sorting when you only need to know <em>which</em> characters, not their order.</>}
    >
      <rect x="60" y="46" width="520" height="160" rx="14" fill="#0b0f15" stroke="#58a6ff" strokeWidth="1.5" />
      <text x="86" y="88" fill="#79c0ff" fontSize="20" fontWeight="700" fontFamily="system-ui">{p.t}</text>
      <rect x="426" y="66" width="128" height="30" rx="8" fill="rgba(86,211,100,.12)" stroke="#56d364" />
      <text x="490" y="86" fill="#7ee787" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{p.opt}</text>
      <text x="86" y="132" fill="#ffd43b" fontSize="13" fontFamily="system-ui">💡 approach</text>
      <foreignObject x="86" y="142" width="468" height="52">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#e6edf3', font: '16px system-ui', lineHeight: 1.4 }}>{p.key}</div>
      </foreignObject>
      <text x="320" y="238" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">problem {i + 1} of {PROBS.length}</text>
    </Stage2D>
  );
}
