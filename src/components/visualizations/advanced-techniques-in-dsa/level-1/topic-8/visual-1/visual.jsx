/* Lesson: Job Sequencing With Deadlines  [AlgoStage]
 * Sort jobs by profit, then slot each into the LATEST free time-slot before its deadline —
 * keeping earlier slots open for tighter deadlines. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const JOBS = [
  { n: 'A', d: 2, p: 100 }, { n: 'C', d: 2, p: 27 }, { n: 'D', d: 1, p: 25 },
  { n: 'B', d: 1, p: 19 }, { n: 'E', d: 3, p: 15 },
]; // sorted by profit desc
const SLOTS = 3;
function buildFrames() {
  const f = []; const slots = Array(SLOTS).fill(null); let profit = 0;
  const snap = o => f.push(Object.assign({ slots: [...slots], profit }, o));
  snap({ line: 1, log: 'jobs sorted by profit (desc); 3 time slots available' });
  for (let i = 0; i < JOBS.length; i++) {
    const j = JOBS[i];
    snap({ line: 3, i, log: `job ${j.n}: profit ${j.p}, deadline slot ${j.d}` });
    let placed = -1;
    for (let s = Math.min(j.d, SLOTS) - 1; s >= 0; s--) if (slots[s] == null) { placed = s; break; }
    if (placed >= 0) { slots[placed] = i; profit += j.p; snap({ line: 5, i, placed, log: `slot ${placed + 1} free → schedule ${j.n} (+${j.p})` }); }
    else snap({ line: 6, i, rejected: true, log: `no free slot before deadline → drop ${j.n}` });
  }
  snap({ line: 7, log: `total profit = ${profit}`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: 'jobs.sort(key=profit, reverse=<span class="kw">True</span>)' },
  { n: 2, t: '<span class="kw">for</span> job <span class="kw">in</span> jobs:' },
  { n: 3, t: '    s = latest free slot <= job.deadline' },
  { n: 4, t: '    <span class="kw">if</span> s exists:' },
  { n: 5, t: '        schedule(job, s)' },
  { n: 6, t: '    <span class="kw">else</span>: drop(job)' },
  { n: 7, t: '<span class="kw">return</span> total_profit' },
];

export default function GreedyJobSequencingVisualization() {
  return (
    <AlgoStage
      title="Job Sequencing With Deadlines"
      subtitle="Two greedy ideas stacked: consider jobs in profit order, and place each as LATE as its deadline allows — hoarding early slots for jobs that have no other option."
      accent="#f0a35e" viewBox="0 0 640 220"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'job', type: 'str', prev: prev && prev.i != null ? JOBS[prev.i].n : '—', cur: fr.i != null ? JOBS[fr.i].n : '—' },
        { name: 'slots', type: 'list', prev: prev ? `[${prev.slots.map(s => s == null ? '·' : JOBS[s].n).join(',')}]` : '[·,·,·]', cur: `[${fr.slots.map(s => s == null ? '·' : JOBS[s].n).join(',')}]` },
        { name: 'profit', type: 'int', prev: prev ? String(prev.profit) : '0', cur: String(fr.profit) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(schedule [A-E][^)]*\)|drop [A-E]|total profit = \d+)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Placing each job in the <strong>latest</strong> legal slot is the subtle part — a job with deadline 3 shouldn't squat in slot 1 that a deadline-1 job needs. With a disjoint-set to find free slots, this runs in near <strong>O(n log n)</strong>.</>}
      renderCanvas={fr => (
        <>
          {/* slots */}
          <text x="320" y="26" textAnchor="middle" style={{ font: '600 11px ui-monospace, monospace', fill: 'var(--a-faint)' }}>time slots (deadline = latest slot allowed)</text>
          {fr.slots.map((s, k) => (
            <g key={k}>
              <rect x={170 + k * 110} y="38" width="96" height="52" rx="9" fill={fr.placed === k ? 'var(--a-visited-soft)' : s != null ? 'color-mix(in srgb, var(--a-visited) 10%, transparent)' : 'var(--a-surface-2)'} stroke={fr.placed === k ? 'var(--a-visited)' : s != null ? 'var(--a-visited)' : 'var(--a-faint)'} strokeWidth={fr.placed === k ? 3 : 2} className={fr.placed === k ? 'algo-pulse' : ''} style={{ transition: 'fill .25s' }} />
              <text x={218 + k * 110} y="60" textAnchor="middle" style={{ font: '600 10px ui-monospace, monospace', fill: 'var(--a-faint)' }}>slot {k + 1}</text>
              <text x={218 + k * 110} y="80" textAnchor="middle" style={{ font: '700 15px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{s != null ? JOBS[s].n + ' (+' + JOBS[s].p + ')' : '—'}</text>
            </g>
          ))}
          {/* job queue */}
          {JOBS.map((j, k) => {
            const isCur = k === fr.i, isRejected = fr.rejected && k === fr.i;
            const isDone = fr.slots.includes(k);
            return (
              <g key={k} opacity={isDone ? 0.45 : 1} style={{ transition: 'opacity .25s' }}>
                <rect x={60 + k * 108} y="120" width="96" height="52" rx="9" fill={isRejected ? 'color-mix(in srgb, #f85149 18%, transparent)' : isCur ? 'var(--a-current-soft)' : 'var(--a-surface-2)'} stroke={isRejected ? '#f85149' : isCur ? 'var(--a-current)' : 'var(--a-faint)'} strokeWidth={isCur ? 3 : 1.5} className={isCur && !isRejected ? 'algo-pulse' : ''} style={{ transition: 'fill .25s' }} />
                <text x={108 + k * 108} y="142" textAnchor="middle" style={{ font: '700 13px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{j.n} · {j.p}</text>
                <text x={108 + k * 108} y="162" textAnchor="middle" style={{ font: '11px ui-monospace, monospace', fill: 'var(--a-muted)' }}>due slot {j.d}</text>
              </g>
            );
          })}
          <text x="320" y="204" textAnchor="middle" style={{ font: '700 13px ui-monospace, monospace', fill: 'var(--a-visited)' }}>profit: {fr.profit}</text>
        </>
      )}
    />
  );
}
