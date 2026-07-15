/* Lesson: Big O in Technical Interviews — What You're Really Being Asked
 * 2D animated: the interview arc — brute force → spot the bottleneck → optimize with the
 * right structure → state the trade-off. Auto-advances through the stages. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const STAGES = [
  { k: '1. Brute force first', c: '#f0883e', big: 'O(n²)', note: 'Say the obvious nested-loop solution out loud — it shows you understand the problem.' },
  { k: '2. Find the bottleneck', c: '#ffd43b', big: 'O(n²)', note: 'Point at the inner loop: "I\'m re-scanning to find matches — that\'s the slow part."' },
  { k: '3. Optimize', c: '#58a6ff', big: 'O(n)', note: 'Trade time for space: a hash set turns the inner scan into an O(1) lookup.' },
  { k: '4. State the trade-off', c: '#56d364', big: 'O(n) time · O(n) space', note: '"Faster, but I now use O(n) extra memory." Naming the trade-off is the point.' },
];

export default function CaBigOInterviewsVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STAGES.length), 2.2, auto);

  return (
    <Stage2D
      title="Big O in Interviews"
      subtitle="Interviewers aren't asking for a memorized table — they want to watch you move from a brute-force idea to an optimized one, naming the cost at each step."
      accent="#56d364"
      viewBox="0 0 640 300"
      controls={
        <>
          {STAGES.map((s, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={<>The script that lands offers: <strong>brute force → identify the bottleneck → optimize with the right data structure → state the time/space trade-off</strong>. Talking through the complexity at each step matters more than jumping straight to the optimal answer.</>}
    >
      {/* progress arc */}
      {STAGES.map((s, k) => {
        const x = 90 + k * 155;
        const on = k <= i;
        return (
          <g key={k}>
            {k < 3 && <line x1={x + 30} y1="70" x2={x + 125} y2="70" stroke={k < i ? STAGES[k + 1].c : '#30363d'} strokeWidth="3" style={{ transition: 'stroke .4s' }} />}
            <circle cx={x} cy="70" r="22" fill={on ? s.c : '#161b22'} stroke={on ? s.c : '#30363d'} strokeWidth="2" className={k === i ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s' }} />
            <text x={x} y="76" fill={on ? '#0d1117' : '#8b949e'} fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{k + 1}</text>
          </g>
        );
      })}
      {/* current stage card */}
      <rect x="60" y="120" width="520" height="130" rx="12" fill="#0b0f15" stroke={STAGES[i].c} strokeWidth="1.5" />
      <text x="86" y="158" fill={STAGES[i].c} fontSize="18" fontFamily="system-ui" fontWeight="700">{STAGES[i].k}</text>
      <rect x="440" y="136" width="120" height="30" rx="8" fill={STAGES[i].c + '22'} />
      <text x="500" y="157" fill={STAGES[i].c} fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{STAGES[i].big}</text>
      <foreignObject x="86" y="176" width="474" height="64">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#e6edf3', font: '15px system-ui', lineHeight: 1.4 }}>{STAGES[i].note}</div>
      </foreignObject>
    </Stage2D>
  );
}
