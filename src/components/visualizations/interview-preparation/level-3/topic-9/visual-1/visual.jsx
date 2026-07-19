/* Lesson: A Simple Framework for Approaching System Design Questions
 * 2D animated: the five-step interview flow, walked in order with what to say at each stage. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const STEPS = [
  { t: '1 · Clarify requirements', c: '#58a6ff', say: '"Who uses it? Reads vs writes? How many users at peak?" Never design in silence.' },
  { t: '2 · Estimate scale', c: '#4fce78', say: 'Back-of-envelope: requests/sec, storage/year. Rough numbers steer every later choice.' },
  { t: '3 · Sketch the high level', c: '#f0a35e', say: 'Client → LB → app → cache → DB. Boxes and arrows first; no detail yet.' },
  { t: '4 · Deep-dive one component', c: '#a78bfa', say: 'Let the interviewer pick — the data model, the cache policy, the sharding key.' },
  { t: '5 · Address the -ilities', c: '#e46e9b', say: 'Failure modes, bottlenecks, monitoring. "What breaks first, and how would I know?"' },
];
export default function SysdFrameworkVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 2.4, auto);
  const s = STEPS[i];
  return (
    <Stage2D title="The 5-Step System Design Script" subtitle="Beginner rounds aren't judged on the perfect architecture — they're judged on process. This sequence keeps you structured for the full 35 minutes."
      accent={s.c} viewBox="0 0 640 260"
      controls={<>{STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<>Common failure: jumping to step 3 (drawing boxes) without steps 1–2 — the interviewer learns you build before you think. Spend the first five minutes asking and estimating; it visibly separates you from most candidates.</>}>
      {/* progress rail */}
      {STEPS.map((st, k) => (
        <g key={k}>
          {k < STEPS.length - 1 && <line x1={95 + k * 115} y1="70" x2={185 + k * 115} y2="70" stroke={k < i ? STEPS[k + 1].c : '#30363d'} strokeWidth="3" style={{ transition: 'stroke .3s' }} />}
          <circle cx={80 + k * 115} cy="70" r="20" fill={k <= i ? st.c : '#161b22'} stroke={k <= i ? st.c : '#30363d'} strokeWidth="2" className={k === i ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s' }} />
          <text x={80 + k * 115} y="76" fill={k <= i ? '#0d1117' : '#8b949e'} fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{k + 1}</text>
        </g>
      ))}
      <rect x="70" y="112" width="500" height="106" rx="14" fill="#0b0f15" stroke={s.c} strokeWidth="1.5" />
      <text x="320" y="146" fill={s.c} fontSize="17" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{s.t}</text>
      <foreignObject x="96" y="158" width="448" height="52"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '13.5px system-ui', lineHeight: 1.45, textAlign: 'center' }}>{s.say}</div></foreignObject>
      <text x="320" y="246" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">step {i + 1} of {STEPS.length}</text>
    </Stage2D>
  );
}
