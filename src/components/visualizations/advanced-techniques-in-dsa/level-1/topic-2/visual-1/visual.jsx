/* Lesson: When Greedy Works, and When It Quietly Fails
 * 2D animated: the same greedy rule on two coin systems — optimal on {25,10,5,1}, wrong on
 * {1,3,4}. Greedy fails silently: it still returns an answer, just not the best one. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const CASES = [
  { coins: [25, 10, 5, 1], target: 30, greedy: [25, 5], optimal: [25, 5], ok: true, label: 'US coins, 30¢' },
  { coins: [4, 3, 1], target: 6, greedy: [4, 1, 1], optimal: [3, 3], ok: false, label: 'coins {1,3,4}, target 6' },
];
export default function GreedyWhenFailsVisualization() {
  const [i, setI] = useState(1);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % CASES.length), 2.8, auto);
  const c = CASES[i];
  return (
    <Stage2D title="When Greedy Quietly Fails" subtitle="Greedy never announces its mistakes — it happily returns a suboptimal answer. The same 'take the biggest' rule is perfect for one coin system and wrong for another."
      accent={c.ok ? '#56d364' : '#f85149'} viewBox="0 0 640 260"
      controls={<>{CASES.map((cc, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{cc.label}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={c.ok
        ? <>US-style coin systems are <strong>canonical</strong>: every larger coin is "compatible" with the smaller ones, so the biggest-first rule is provably optimal. Greedy works — but only because the <em>structure</em> of the problem guarantees it.</>
        : <>With coins {'{1,3,4}'} and target 6, greedy grabs 4 and is stuck with 1+1 → <strong>3 coins</strong>, while 3+3 needs only <strong>2</strong>. The local best (take 4) ruined the global best. This is the failure mode to test for before trusting greedy — and where DP takes over.</>}>
      <text x="180" y="52" fill="#f0a35e" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="system-ui">greedy picks</text>
      {c.greedy.map((v, k) => <g key={'g' + k}><circle cx={120 + k * 55} cy={100} r="23" fill={c.ok ? 'rgba(86,211,100,.2)' : 'rgba(248,81,73,.15)'} stroke={c.ok ? '#56d364' : '#f85149'} strokeWidth="2.5" className="dsa2d-fade" /><text x={120 + k * 55} y={106} fill="#e6edf3" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text></g>)}
      <text x={180} y={150} fill={c.ok ? '#56d364' : '#f85149'} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{c.greedy.length} coins {c.ok ? '✓' : '✗'}</text>
      <line x1="320" y1="44" x2="320" y2="170" stroke="#30363d" strokeDasharray="4 4" />
      <text x="470" y="52" fill="#58a6ff" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="system-ui">true optimum</text>
      {c.optimal.map((v, k) => <g key={'o' + k}><circle cx={420 + k * 55} cy={100} r="23" fill="rgba(88,166,255,.18)" stroke="#58a6ff" strokeWidth="2.5" className="dsa2d-fade" /><text x={420 + k * 55} y={106} fill="#e6edf3" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text></g>)}
      <text x={470} y={150} fill="#58a6ff" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{c.optimal.length} coins</text>
      <rect x="90" y="180" width="460" height="46" rx="10" fill="#0b0f15" stroke={c.ok ? '#56d364' : '#f85149'} strokeWidth="1.5" />
      <text x="320" y="208" fill={c.ok ? '#7ee787' : '#ff9d95'} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{c.ok ? 'greedy = optimal on this structure' : 'greedy returned an answer — just the wrong one'}</text>
    </Stage2D>
  );
}
