/* Problem: Subarray Sum Equals K
 * 2D animated: running prefix sum + a hash map of how many times each prefix has occurred.
 * At each step, (prefix − k) already seen means that many valid subarrays end here. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const NUMS = [1, 2, 3, -2, 5];
const K = 3;
function stateAt(step) {
  const map = { 0: 1 }; let run = 0, count = 0, added = 0;
  for (let i = 0; i < step; i++) { run += NUMS[i]; added = map[run - K] || 0; count += added; map[run] = (map[run] || 0) + 1; }
  return { map, run, count, added };
}
export default function HtSubarraySumVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v > NUMS.length ? 0 : v + 1)), 1.0, auto);
  const { map, run, count, added } = stateAt(Math.min(i, NUMS.length));
  const done = i > NUMS.length;
  const CW = 62, gap = 10;
  const startX = 320 - (NUMS.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Subarray Sum Equals K"
      subtitle="A subarray sums to k when prefix[j] − prefix[i] = k. Store how often each prefix has appeared, so each step just looks up (prefix − k)."
      accent="#a78bfa"
      viewBox="0 0 640 250"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v > NUMS.length ? 0 : v + 1))}>step</button>
          <button className="dsa2d-btn" onClick={() => setI(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">prefix {run} · need {run - K} · count {count}</span>
        </>
      }
      legend={<>Rewrite <code>sum(i..j)=k</code> as <code>prefix[j]−prefix[i]=k</code>, i.e. <code>prefix[i]=prefix[j]−k</code>. A hash map of prefix→frequency lets each step add the number of earlier matching prefixes in <strong>O(1)</strong> → <strong>O(n)</strong> total. (Seed the map with <code>{'{0:1}'}</code> so full-length subarrays count.)</>}
    >
      {NUMS.map((v, k) => {
        const scanned = k < i, cur = k === i - 1;
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="48" width={CW} height="48" rx="8" fill={cur ? 'rgba(167,139,250,.25)' : scanned ? '#161b22' : '#0d1117'} stroke={cur ? '#a78bfa' : scanned ? '#6e7681' : '#30363d'} strokeWidth="2" className={cur ? 'dsa2d-pulse' : ''} />
            <text x={startX + k * (CW + gap) + CW / 2} y="78" fill="#e6edf3" fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
          </g>
        );
      })}
      <text x="320" y="120" fill="#c9d1d9" fontSize="14" textAnchor="middle" fontFamily="Consolas">running prefix = {run} · looking for prefix {run - K} {added > 0 ? `(found ×${added})` : ''}</text>
      {/* map */}
      <text x="60" y="156" fill="#8b949e" fontSize="12" fontFamily="Consolas">prefix counts:</text>
      {Object.entries(map).map(([pfx, c], mi) => (
        <g key={pfx} className="dsa2d-fade">
          <rect x={180 + mi * 62} y="138" width="56" height="34" rx="7" fill={(run - K) == pfx && !done ? 'rgba(86,211,100,.2)' : 'rgba(167,139,250,.1)'} stroke={(run - K) == pfx && !done ? '#56d364' : '#7c6bb0'} strokeWidth="1.5" />
          <text x={208 + mi * 62} y="160" fill="#c9d1d9" fontSize="13" textAnchor="middle" fontFamily="Consolas">{pfx}:{c}</text>
        </g>
      ))}
      <text x="320" y="216" fill={done ? '#56d364' : '#8b949e'} fontSize={done ? 16 : 12} textAnchor="middle" fontWeight={done ? 700 : 400} fontFamily="Consolas">{done ? `${count} subarrays sum to ${K}` : 'green = the prefix we need this step'}</text>
    </Stage2D>
  );
}
