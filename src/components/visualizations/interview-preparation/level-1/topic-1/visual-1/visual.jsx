/* Lesson: Recognizing Patterns — Why Interview Prep Isn't About Memorizing Solutions
 * 2D animated: five "different" problems collapse onto the same handful of patterns. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const PAIRS = [
  { prob: '"Longest substring without repeats"', pat: 'Sliding Window', c: '#4fce78' },
  { prob: '"Is this linked list circular?"', pat: 'Fast & Slow Pointers', c: '#6b8cff' },
  { prob: '"Merge overlapping meetings"', pat: 'Merge Intervals', c: '#f0a35e' },
  { prob: '"K most frequent words"', pat: 'Top-K (heap)', c: '#a78bfa' },
  { prob: '"Daily temperatures until warmer"', pat: 'Monotonic Stack', c: '#e46e9b' },
];
export default function PatRecognizingVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % PAIRS.length), 2.1, auto);
  const p = PAIRS[i];
  return (
    <Stage2D title="Patterns, Not Memorized Solutions" subtitle="Thousands of LeetCode problems reduce to a couple dozen patterns. Interviewers reword the story; the underlying shape stays the same. Learn shapes, not solutions."
      accent={p.c} viewBox="0 0 640 250"
      controls={<>{PAIRS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<>The rest of this part revisits each major pattern as a reusable <strong>template</strong>: what signals it, the skeleton code, and its complexity. When a new problem appears, the question isn't "have I seen this?" but "which shape is this?"</>}>
      <rect x="60" y="60" width="240" height="110" rx="14" fill="#0b0f15" stroke="#30363d" strokeWidth="1.5" />
      <text x="180" y="92" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">problem you're given</text>
      <foreignObject x="72" y="102" width="216" height="60"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#e6edf3', font: '700 14px system-ui', lineHeight: 1.35, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{p.prob}</div></foreignObject>
      <g className="dsa2d-pulse"><line x1="305" y1="115" x2="335" y2="115" stroke={p.c} strokeWidth="3" /><polygon points="335,109 347,115 335,121" fill={p.c} /></g>
      <rect x="352" y="60" width="228" height="110" rx="14" fill={p.c + '14'} stroke={p.c} strokeWidth="2" />
      <text x="466" y="92" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">the pattern underneath</text>
      <text x="466" y="126" fill={p.c} fontSize="17" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{p.pat}</text>
      <text x="320" y="216" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">disguise {i + 1} of {PAIRS.length} — same skeleton, different story</text>
    </Stage2D>
  );
}
