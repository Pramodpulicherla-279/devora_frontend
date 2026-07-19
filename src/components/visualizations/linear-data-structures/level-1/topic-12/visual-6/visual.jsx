/* Problem: Best Time to Buy and Sell Stock
 * 2D animated: one pass tracking the lowest price seen so far; at each day the best profit is
 * price − minSoFar. Keep the maximum. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const PRICE = [7, 2, 5, 1, 6, 4, 8, 3];
function stateAt(day) {
  let minP = Infinity, best = 0, buyDay = 0, sellDay = 0, curMinDay = 0;
  for (let i = 0; i <= day && i < PRICE.length; i++) {
    if (PRICE[i] < minP) { minP = PRICE[i]; curMinDay = i; }
    if (PRICE[i] - minP > best) { best = PRICE[i] - minP; buyDay = curMinDay; sellDay = i; }
  }
  return { minP, best, buyDay, sellDay };
}
export default function ArrBuySellStockVisualization() {
  const [day, setDay] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setDay(v => (v >= PRICE.length - 1 ? 0 : v + 1)), 0.85, auto);
  const { minP, best, buyDay, sellDay } = stateAt(day);
  const CW = 56, gap = 8, baseY = 176, unit = 16;
  const startX = 320 - (PRICE.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Best Time to Buy and Sell Stock"
      subtitle="You must buy before you sell. Track the cheapest price so far; at each day, the best possible profit is today's price minus that minimum."
      accent="#56d364"
      viewBox="0 0 640 230"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setDay(v => (v >= PRICE.length - 1 ? 0 : v + 1))}>next day</button>
          <button className="dsa2d-btn" onClick={() => setDay(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">min so far {minP} · best profit {best}</span>
        </>
      }
      legend={<>A single sweep keeps <code>min_price</code> and <code>max_profit</code>. No nested loop needed → <strong>O(n)</strong> time, <strong>O(1)</strong> space. Here: buy at {PRICE[buyDay]} (day {buyDay}), sell at {PRICE[sellDay]} (day {sellDay}) → profit <strong>{best}</strong>.</>}
    >
      {PRICE.map((p, k) => {
        const scanned = k <= day;
        const isMin = scanned && p === minP && k === buyDay;
        const isBuy = k === buyDay && day >= sellDay, isSell = k === sellDay && sellDay > 0 && day >= sellDay;
        return (
          <g key={k} style={{ opacity: scanned ? 1 : 0.3, transition: 'opacity .3s' }}>
            <rect x={startX + k * (CW + gap)} y={baseY - p * unit} width={CW} height={p * unit} rx="4"
              fill={isSell ? 'rgba(86,211,100,.4)' : isBuy ? 'rgba(240,136,62,.35)' : '#161b22'}
              stroke={isSell ? '#56d364' : isBuy ? '#f0883e' : k === day ? '#58a6ff' : '#30363d'} strokeWidth="2" />
            <text x={startX + k * (CW + gap) + CW / 2} y={baseY + 16} fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="Consolas">{p}</text>
            {isBuy && day >= sellDay && <text x={startX + k * (CW + gap) + CW / 2} y={baseY - p * unit - 6} fill="#f0883e" fontSize="11" textAnchor="middle" fontFamily="Consolas">buy</text>}
            {isSell && <text x={startX + k * (CW + gap) + CW / 2} y={baseY - p * unit - 6} fill="#56d364" fontSize="11" textAnchor="middle" fontFamily="Consolas">sell</text>}
          </g>
        );
      })}
      <text x="320" y="212" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">buy low (orange) before selling high (green) — one pass</text>
    </Stage2D>
  );
}
