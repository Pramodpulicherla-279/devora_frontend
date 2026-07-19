/* Lesson: The Merge Intervals Pattern  [AlgoStage]
 * Sort intervals by start, then sweep once: overlap → extend the current merged block,
 * gap → close it and start a new one. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const IV = [[1, 4], [2, 6], [8, 10], [9, 12], [15, 18]]; // sorted by start
function buildFrames() {
  const f = []; const merged = [];
  const snap = o => f.push(Object.assign({ merged: merged.map(m => [...m]) }, o));
  snap({ line: 1, log: 'intervals sorted by start' });
  for (let i = 0; i < IV.length; i++) {
    const [s, e] = IV[i];
    const last = merged[merged.length - 1];
    snap({ line: 3, i, log: `[${s},${e}]: ${last ? `does ${s} ≤ ${last[1]} (current end)?` : 'first interval'}` });
    if (last && s <= last[1]) { last[1] = Math.max(last[1], e); snap({ line: 4, i, extend: true, log: `overlap → extend merged block to [${last[0]},${last[1]}]` }); }
    else { merged.push([s, e]); snap({ line: 6, i, newBlock: true, log: `gap → start new block [${s},${e}]` }); }
  }
  snap({ line: 7, log: `result: ${merged.map(m => '[' + m + ']').join(' ')}`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: 'intervals.sort(key=<span class="kw">lambda</span> x: x[0])' },
  { n: 2, t: '<span class="kw">for</span> s, e <span class="kw">in</span> intervals:' },
  { n: 3, t: '    <span class="kw">if</span> merged <span class="kw">and</span> s <= merged[-1][1]:' },
  { n: 4, t: '        merged[-1][1] = <span class="fn">max</span>(merged[-1][1], e)' },
  { n: 5, t: '    <span class="kw">else</span>:' },
  { n: 6, t: '        merged.append([s, e])' },
  { n: 7, t: '<span class="kw">return</span> merged' },
];
const SCALE = 28, ox = 60;

export default function PatMergeIntervalsVisualization() {
  return (
    <AlgoStage
      title="Merge Intervals"
      subtitle="After sorting by start, overlap detection is one comparison: does the next interval start before the current merged block ends? If yes, absorb it; if no, the block is finished forever."
      accent="#f0a35e" viewBox="0 0 640 240"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'interval', type: 'pair', prev: prev && prev.i != null ? `[${IV[prev.i]}]` : '—', cur: fr.i != null ? `[${IV[fr.i]}]` : '—' },
        { name: 'merged blocks', type: 'int', prev: prev ? String(prev.merged.length) : '0', cur: String(fr.merged.length) },
        { name: 'current end', type: 'int', prev: '—', cur: fr.merged.length ? String(fr.merged[fr.merged.length - 1][1]) : '—' },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(extend merged block[^!]*|start new block[^!]*|result:.*)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Sorting is the insight: once ordered by start, all overlap information is <em>local</em> — you never look back. <strong>O(n log n)</strong> total. The same skeleton answers meeting-rooms, insert-interval, and employee-free-time questions.</>}
      renderCanvas={fr => (
        <>
          {Array.from({ length: 19 }).map((_, t) => <text key={t} x={ox + t * SCALE} y="22" textAnchor="middle" style={{ font: '8px ui-monospace, monospace', fill: 'var(--a-faint)' }}>{t}</text>)}
          {IV.map(([s, e], k) => {
            const isCur = k === fr.i;
            return (
              <g key={k}>
                <rect x={ox + s * SCALE} y={34 + k * 26} width={(e - s) * SCALE} height="20" rx="6" fill={isCur ? 'var(--a-current-soft)' : 'var(--a-surface-2)'} stroke={isCur ? 'var(--a-current)' : 'var(--a-faint)'} strokeWidth={isCur ? 2.5 : 1.5} className={isCur ? 'algo-pulse' : ''} style={{ transition: 'fill .25s' }} />
                <text x={ox + s * SCALE + 8} y={48 + k * 26} style={{ font: '700 10px ui-monospace, monospace', fill: 'var(--a-ink)' }}>[{s},{e}]</text>
              </g>
            );
          })}
          <text x={ox} y="182" style={{ font: '600 11px ui-monospace, monospace', fill: 'var(--a-faint)' }}>merged:</text>
          {fr.merged.map(([s, e], k) => (
            <g key={'m' + k}>
              <rect x={ox + s * SCALE} y={190} width={(e - s) * SCALE} height="22" rx="7" fill={k === fr.merged.length - 1 && (fr.extend || fr.newBlock) ? 'var(--a-visited)' : 'var(--a-visited-soft)'} stroke="var(--a-visited)" strokeWidth="2" className={k === fr.merged.length - 1 && fr.extend ? 'algo-pulse' : ''} style={{ transition: 'width .3s, fill .25s' }} />
              <text x={ox + s * SCALE + 8} y={205} style={{ font: '700 10px ui-monospace, monospace', fill: 'var(--a-ink)' }}>[{s},{e}]</text>
            </g>
          ))}
        </>
      )}
    />
  );
}
