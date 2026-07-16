/* Lesson: Common Greedy Interview Problems, Solved Step by Step (overview)
 * 2D animated: flip through the classic greedy problems and the one-line rule each one uses. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const PROBS = [
  { t: 'Jump Game', pat: 'track the farthest reach', c: '#f0a35e', why: 'Sweep once, keeping max(i + nums[i]); if the sweep passes the reach, you\'re stuck.' },
  { t: 'Gas Station', pat: 'reset start when tank < 0', c: '#4fce78', why: 'If you fail at station i, no station before it can work — restart from i+1.' },
  { t: 'Non-overlapping Intervals', pat: 'keep the earliest end', c: '#58a6ff', why: 'Activity selection in disguise: sort by end, count what fits, delete the rest.' },
  { t: 'Assign Cookies', pat: 'smallest cookie → smallest kid', c: '#a78bfa', why: 'Sort both; match greedily so bigger cookies stay available for greedier kids.' },
  { t: 'Partition Labels', pat: 'extend to each char\'s last index', c: '#ffd43b', why: 'Grow the current partition until it covers the final occurrence of every char inside it.' },
];
export default function GreedyInterviewVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % PROBS.length), 2.3, auto);
  const p = PROBS[i];
  return (
    <Stage2D title="Common Greedy Interview Problems" subtitle="Greedy questions reward finding the ONE rule you can commit to. Each classic below compresses to a single sweeping decision — usually after a sort."
      accent={p.c} viewBox="0 0 640 300"
      controls={<>{PROBS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<>The greedy toolkit: <strong>sort by the right key</strong> (end time, ratio, size), <strong>sweep once</strong> with a running commitment (reach, tank, boundary), and <strong>argue the exchange</strong>. If the interviewer's example breaks your rule, that's your cue to pivot to DP.</>}>
      <rect x="60" y="46" width="520" height="150" rx="14" fill="#0b0f15" stroke={p.c} strokeWidth="1.5" />
      <text x="320" y="88" fill="#e6edf3" fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{p.t}</text>
      <rect x="160" y="104" width="320" height="32" rx="16" fill={p.c + '22'} stroke={p.c} />
      <text x="320" y="125" fill={p.c} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{p.pat}</text>
      <foreignObject x="86" y="146" width="468" height="46"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '14px system-ui', lineHeight: 1.4, textAlign: 'center' }}>{p.why}</div></foreignObject>
      {PROBS.map((_, k) => <circle key={k} cx={320 - (PROBS.length - 1) * 12 + k * 24} cy="228" r="5" fill={k === i ? p.c : '#30363d'} />)}
      <text x="320" y="266" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">problem {i + 1} of {PROBS.length} — each detailed step-by-step in the lesson below</text>
    </Stage2D>
  );
}
