/* Problem: Gas Station
 * 2D animated: drive the circuit tracking the tank. The moment it dips below zero, no start
 * point in that stretch can work — restart candidacy from the NEXT station. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const GAS = [1, 2, 3, 4, 5], COST = [3, 4, 5, 1, 2];
const STEPS = [
  { at: 0, tank: -2, start: 0, fail: true, log: 'start 0: tank = 1−3 = −2 < 0 → start 0 dead → candidate = 1' },
  { at: 1, tank: -2, start: 1, fail: true, log: 'start 1: tank = 2−4 = −2 < 0 → candidate = 2' },
  { at: 2, tank: -2, start: 2, fail: true, log: 'start 2: tank = 3−5 = −2 < 0 → candidate = 3' },
  { at: 3, tank: 3, start: 3, log: 'start 3: tank = 4−1 = +3 → keep driving' },
  { at: 4, tank: 6, start: 3, log: 'station 4: tank = 3+5−2 = +6 → keep driving' },
  { at: 0, tank: 4, start: 3, log: 'station 0: 6+1−3 = +4 …' },
  { at: 2, tank: 0, start: 3, done: true, log: 'completes the loop (total gas 15 ≥ total cost 15) → answer: start at 3' },
];
export default function GreedyGasStationVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 1.7, auto);
  const s = STEPS[i];
  const POS = GAS.map((_, k) => { const a = (k / GAS.length) * Math.PI * 2 - Math.PI / 2; return [320 + Math.cos(a) * 120, 118 + Math.sin(a) * 78]; });
  return (
    <Stage2D title="Gas Station" subtitle="The greedy leap: if you run dry travelling from start S to station i, then EVERY start between S and i also fails (they'd arrive with even less fuel). So skip them all — restart at i+1."
      accent={s.fail ? '#f85149' : '#56d364'} viewBox="0 0 640 250"
      controls={<>{STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{s.log}</span></>}
      legend={<>Two facts make it O(n): the skip argument above, plus "if total gas ≥ total cost a solution exists". One sweep, each station visited at most twice. Answer here: station <strong>3</strong> — the only start that survives the full lap.</>}>
      {POS.map(([x, y], k) => {
        const isAt = k === s.at, isStart = k === s.start;
        return (
          <g key={k}>
            <circle cx={x} cy={y} r="24" fill={isAt && s.fail ? 'rgba(248,81,73,.2)' : isStart ? 'rgba(86,211,100,.2)' : isAt ? 'rgba(255,212,59,.16)' : '#161b22'} stroke={isAt && s.fail ? '#f85149' : isStart ? '#56d364' : isAt ? '#ffd43b' : '#6e7681'} strokeWidth={isAt || isStart ? 3 : 2} className={isAt ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s' }} />
            <text x={x} y={y - 2} fill="#e6edf3" fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="Consolas">⛽{k}</text>
            <text x={x} y={y + 14} fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">+{GAS[k]}/−{COST[k]}</text>
            {isStart && <text x={x} y={y - 34} fill="#56d364" fontSize="11" textAnchor="middle" fontWeight="700" fontFamily="Consolas">start</text>}
          </g>
        );
      })}
      <text x="320" y="122" fill={s.tank < 0 ? '#f85149' : '#56d364'} fontSize="17" textAnchor="middle" fontWeight="700" fontFamily="Consolas">tank: {s.tank >= 0 ? '+' : ''}{s.tank}</text>
      <text x="320" y="240" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">a failed stretch condemns every start inside it — that's the whole trick</text>
    </Stage2D>
  );
}
