/* Problem: Sort Colors (Dutch National Flag)
 * 2D animated: three pointers sort 0s, 1s, 2s in ONE pass — low collects 0s at the front,
 * high collects 2s at the back, mid scans between them. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

function buildSteps() {
  const a = [2, 0, 1, 2, 0, 1]; let low = 0, mid = 0, high = 5;
  const steps = [{ a: [...a], low, mid, high, log: 'low=mid=0, high=5 — scan with mid' }];
  let g = 0;
  while (mid <= high && g++ < 20) {
    if (a[mid] === 0) { [a[low], a[mid]] = [a[mid], a[low]]; low++; mid++; steps.push({ a: [...a], low, mid, high, log: '0 → swap to front, low++ mid++' }); }
    else if (a[mid] === 2) { [a[mid], a[high]] = [a[high], a[mid]]; high--; steps.push({ a: [...a], low, mid, high, log: '2 → swap to back, high-- (recheck mid!)' }); }
    else { mid++; steps.push({ a: [...a], low, mid, high, log: '1 → already in the middle zone, mid++' }); }
  }
  steps.push({ a: [...a], low, mid, high, done: true, log: 'mid passed high → sorted in one pass' });
  return steps;
}
const STEPS = buildSteps();
const COLORS = ['#f85149', '#e6edf3', '#58a6ff'];
const CW = 74, gap = 12, startX = (640 - (6 * (CW + gap) - gap)) / 2;
export default function SortDutchFlagVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 1.4, auto);
  const s = STEPS[i];
  return (
    <Stage2D title="Sort Colors — Dutch National Flag" subtitle="Only three distinct values, so a full sort is overkill. Three pointers partition in place: everything before low is 0, everything after high is 2, mid classifies what's between."
      accent="#f0a35e" viewBox="0 0 640 200"
      controls={<><button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v + 1) % STEPS.length)}>step</button><button className="dsa2d-btn" onClick={() => setI(0)}>↺</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{s.log}</span></>}
      legend={<>One pass, <strong>O(n)</strong> time, O(1) space, no counting arrays. The trap interviewers watch for: after swapping a 2 from <code>high</code>, <em>don't advance mid</em> — the swapped-in value is unclassified. Named for the Dutch flag's three bands.</>}>
      {s.a.map((v, k) => {
        const isLow = k === s.low, isMid = k === s.mid, isHigh = k === s.high;
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="66" width={CW} height="52" rx="8" fill={`color-mix(in srgb, ${COLORS[v]} ${v === 1 ? 12 : 26}%, transparent)`} stroke={COLORS[v]} strokeWidth={isMid ? 3.5 : 2} className={isMid && !s.done ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s' }} />
            <text x={startX + k * (CW + gap) + CW / 2} y="99" fill="#e6edf3" fontSize="19" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
            {isLow && <text x={startX + k * (CW + gap) + CW / 2} y="56" fill="#f85149" fontSize="11" textAnchor="middle" fontWeight="700" fontFamily="Consolas">low</text>}
            {isMid && !s.done && <text x={startX + k * (CW + gap) + CW / 2} y="136" fill="#ffd43b" fontSize="11" textAnchor="middle" fontWeight="700" fontFamily="Consolas">mid</text>}
            {isHigh && <text x={startX + k * (CW + gap) + CW / 2} y={isLow ? 44 : 56} fill="#58a6ff" fontSize="11" textAnchor="middle" fontWeight="700" fontFamily="Consolas">high</text>}
          </g>
        );
      })}
      <text x="320" y="172" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">red zone grows from the left · blue zone from the right · mid works the middle</text>
    </Stage2D>
  );
}
