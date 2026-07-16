/* Lesson: Choosing a Good Pivot — Why Quick Sort Can Go Wrong
 * 2D animated: compare a bad pivot (already-sorted input, last-element pivot → lopsided splits,
 * O(n²)) with a good pivot (median-ish → balanced splits, O(n log n)). */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function SortPivotVisualization() {
  const [good, setGood] = useState(false);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setGood(g => !g), 2.4, auto);
  // recursion depth bars: bad = n levels (each peels 1); good = log n levels (halving)
  const levels = good
    ? [{ w: 8, l: '8' }, { w: 4, l: '4' }, { w: 2, l: '2' }, { w: 1, l: '1' }]
    : [{ w: 8, l: '8' }, { w: 7, l: '7' }, { w: 6, l: '6' }, { w: 5, l: '5' }, { w: 4, l: '4' }, { w: 3, l: '3' }, { w: 2, l: '2' }, { w: 1, l: '1' }];
  return (
    <Stage2D title="Choosing a Good Pivot" subtitle="Quick sort's speed lives or dies by the pivot. A pivot that splits the array in half gives O(n log n); one that peels off a single element each time collapses to O(n²)."
      accent={good ? '#56d364' : '#f85149'} viewBox="0 0 640 280"
      controls={<><button className={`dsa2d-btn ${!good ? 'dsa2d-btn--on' : ''}`} onClick={() => setGood(false)}>bad pivot (last elem)</button><button className={`dsa2d-btn ${good ? 'dsa2d-btn--on' : ''}`} onClick={() => setGood(true)}>good pivot (median)</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{good ? '~log n levels' : 'n levels'}</span></>}
      legend={good
        ? <>A near-<strong>median</strong> pivot splits work roughly in half, so recursion is only <code>~log n</code> deep → <strong>O(n log n)</strong>. Practical strategies: median-of-three, or a <strong>random</strong> pivot (which makes worst cases astronomically unlikely).</>
        : <>On already-sorted input, always picking the last element as pivot puts everything on one side — the recursion is <code>n</code> levels deep and does <strong>O(n²)</strong> work. This is quick sort's Achilles heel; never use a fixed-position pivot on possibly-sorted data.</>}>
      <text x="320" y="30" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">partition sizes as recursion descends</text>
      {levels.map((lv, k) => (
        <g key={k} className="dsa2d-fade">
          <rect x={320 - lv.w * 30} y={46 + k * 26} width={lv.w * 60} height="20" rx="5" fill={good ? 'rgba(86,211,100,.25)' : 'rgba(248,81,73,.2)'} stroke={good ? '#56d364' : '#f85149'} />
          <text x="320" y={61 + k * 26} fill="#e6edf3" fontSize="12" textAnchor="middle" fontFamily="Consolas">{lv.l}</text>
        </g>
      ))}
      <text x="320" y={46 + levels.length * 26 + 20} fill={good ? '#56d364' : '#f85149'} fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{good ? 'depth ≈ log₂(8) = 3 → O(n log n)' : 'depth = 8 → O(n²)'}</text>
    </Stage2D>
  );
}
