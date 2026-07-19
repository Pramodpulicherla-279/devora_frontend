/* Lesson: Activity Selection — Scheduling Without Conflicts  [AlgoStage]
 * Sort activities by END time, then sweep: take anything that starts after the last taken one
 * ends. The classic provably-correct greedy. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const ACTS = [
  { n: 'A', s: 1, e: 4 }, { n: 'B', s: 3, e: 5 }, { n: 'C', s: 0, e: 6 },
  { n: 'D', s: 5, e: 7 }, { n: 'E', s: 6, e: 10 }, { n: 'F', s: 8, e: 11 },
]; // already sorted by end time
function buildFrames() {
  const f = []; const taken = []; let lastEnd = -1;
  const snap = o => f.push(Object.assign({ taken: [...taken], lastEnd }, o));
  snap({ line: 1, log: 'activities sorted by END time — earliest finisher first' });
  for (let i = 0; i < ACTS.length; i++) {
    const a = ACTS[i];
    const ok = a.s >= lastEnd;
    snap({ line: 3, i, ok, log: `${a.n} [${a.s}–${a.e}]: starts ${a.s} ${ok ? '≥' : '<'} last end ${lastEnd < 0 ? '—' : lastEnd}` });
    if (ok) { taken.push(i); lastEnd = a.e; snap({ line: 4, i, ok, log: `take ${a.n} → room is busy until ${a.e}` }); }
    else snap({ line: 5, i, ok, log: `${a.n} overlaps → skip` });
  }
  snap({ line: 6, log: `${taken.length} activities scheduled: ${taken.map(i => ACTS[i].n).join(', ')}`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: 'acts.sort(key=<span class="kw">lambda</span> a: a.end)' },
  { n: 2, t: 'last_end = -inf' },
  { n: 3, t: '<span class="kw">for</span> a <span class="kw">in</span> acts:' },
  { n: 4, t: '    <span class="kw">if</span> a.start >= last_end:' },
  { n: 5, t: '        take(a); last_end = a.end' },
  { n: 6, t: '<span class="st"># provably maximal set</span>' },
];
const SCALE = 46, ox = 90, oy = 40, RH = 30;

export default function GreedyActivitySelectionVisualization() {
  return (
    <AlgoStage
      title="Activity Selection (Interval Scheduling)"
      subtitle="To fit the most non-overlapping activities, always take the one that ENDS earliest — it leaves the most room for everything after. Sorting by start time or duration both fail; end time is the provable choice."
      accent="#4fce78" viewBox="0 0 640 270"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'activity', type: 'str', prev: prev && prev.i != null ? ACTS[prev.i].n : '—', cur: fr.i != null ? ACTS[fr.i].n : '—' },
        { name: 'last end', type: 'int', prev: prev ? (prev.lastEnd < 0 ? '—' : String(prev.lastEnd)) : '—', cur: fr.lastEnd < 0 ? '—' : String(fr.lastEnd) },
        { name: 'scheduled', type: 'int', prev: prev ? String(prev.taken.length) : '0', cur: String(fr.taken.length) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(take [A-F][^→]*|\d+ activities scheduled[^!]*)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>The exchange argument proves it: if an optimal schedule takes a later-ending activity first, swapping in the earliest finisher never causes a conflict — so greedy is optimal. With the sort, total time is <strong>O(n log n)</strong>.</>}
      renderCanvas={fr => (
        <>
          {/* time axis */}
          {Array.from({ length: 12 }).map((_, t) => <text key={t} x={ox + t * SCALE} y={oy - 10} textAnchor="middle" style={{ font: '9px ui-monospace, monospace', fill: 'var(--a-faint)' }}>{t}</text>)}
          {ACTS.map((a, k) => {
            const isCur = k === fr.i, isTaken = fr.taken.includes(k);
            const skipped = !isTaken && (fr.i != null && k < fr.i || fr.done);
            return (
              <g key={k} opacity={skipped && !isTaken ? 0.35 : 1} style={{ transition: 'opacity .25s' }}>
                <rect x={ox + a.s * SCALE} y={oy + k * RH} width={(a.e - a.s) * SCALE} height={RH - 7} rx="6" fill={isTaken ? 'var(--a-visited-soft)' : isCur ? 'var(--a-current-soft)' : 'var(--a-surface-2)'} stroke={isTaken ? 'var(--a-visited)' : isCur ? 'var(--a-current)' : 'var(--a-faint)'} strokeWidth={isCur || isTaken ? 2.5 : 1.5} className={isCur ? 'algo-pulse' : ''} style={{ transition: 'fill .25s' }} />
                <text x={ox + a.s * SCALE + 10} y={oy + k * RH + 16} style={{ font: '700 12px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{a.n} [{a.s}–{a.e}]</text>
              </g>
            );
          })}
          {fr.lastEnd >= 0 && <line x1={ox + fr.lastEnd * SCALE} y1={oy - 4} x2={ox + fr.lastEnd * SCALE} y2={oy + ACTS.length * RH} stroke="var(--a-visited)" strokeWidth="2" strokeDasharray="5 4" />}
        </>
      )}
    />
  );
}
