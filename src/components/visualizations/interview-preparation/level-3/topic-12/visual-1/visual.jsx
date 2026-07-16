/* Lesson: What Interviewers Actually Look for in Beginner System Design Rounds
 * 2D animated: the real scoring rubric — process signals over architecture perfection. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const RUBRIC = [
  { t: 'Asks before building', good: 'clarifies users, scale, and read/write mix first', bad: 'draws boxes in the first 60 seconds', c: '#58a6ff' },
  { t: 'Reasons with numbers', good: 'back-of-envelope QPS and storage estimates', bad: '"we\'ll just make it scalable" (hand-wave)', c: '#4fce78' },
  { t: 'Names trade-offs', good: '"cache adds staleness — acceptable here because…"', bad: 'presents every choice as free', c: '#f0a35e' },
  { t: 'Connects to fundamentals', good: 'cache = hash map, index = B-tree, queue = FIFO', bad: 'treats infra boxes as magic', c: '#a78bfa' },
  { t: 'Thinks about failure', good: '"if this node dies, then…" unprompted', bad: 'assumes everything always works', c: '#e46e9b' },
];
export default function SysdInterviewerVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % RUBRIC.length), 2.4, auto);
  const r = RUBRIC[i];
  return (
    <Stage2D title="The Real Scoring Rubric" subtitle="Beginner system design rounds don't expect distributed-systems mastery. They score how you think: questions, numbers, trade-offs, fundamentals, and failure awareness."
      accent={r.c} viewBox="0 0 640 270"
      controls={<>{RUBRIC.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<>Every signal here is practicable: rehearse the 5-step script, memorise three estimation constants (1M req/day ≈ 12 QPS; 1 char = 1 byte; a server handles ~1k QPS), and end every design with one failure scenario. Process beats architecture at this level — full stop.</>}>
      <text x="320" y="52" fill={r.c} fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{r.t}</text>
      <rect x="46" y="72" width="268" height="120" rx="12" fill="rgba(86,211,100,.08)" stroke="#56d364" strokeWidth="1.5" />
      <text x="180" y="98" fill="#56d364" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="system-ui">✓ strong signal</text>
      <foreignObject x="60" y="108" width="240" height="76"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '13px system-ui', lineHeight: 1.45, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{r.good}</div></foreignObject>
      <rect x="326" y="72" width="268" height="120" rx="12" fill="rgba(248,81,73,.07)" stroke="#f85149" strokeWidth="1.5" />
      <text x="460" y="98" fill="#f85149" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="system-ui">✗ red flag</text>
      <foreignObject x="340" y="108" width="240" height="76"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '13px system-ui', lineHeight: 1.45, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{r.bad}</div></foreignObject>
      <text x="320" y="230" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">signal {i + 1} of {RUBRIC.length}</text>
    </Stage2D>
  );
}
