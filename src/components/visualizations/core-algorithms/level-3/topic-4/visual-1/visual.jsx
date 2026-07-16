/* Lesson: Generating All Permutations  [AlgoStage framework]
 * Backtracking builds every ordering of [1,2,3]: pick an unused element, recurse, then release
 * it. Fully stepped with path/used/results inspector, synced code, console. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const NUMS = [1, 2, 3];
function buildFrames() {
  const f = [], res = [], path = [], used = [false, false, false];
  const snap = o => f.push(Object.assign({ path: [...path], used: [...used], res: res.map(p => [...p]) }, o));
  snap({ action: 'start', log: 'build orderings of length 3' });
  function dfs() {
    if (path.length === NUMS.length) { res.push([...path]); snap({ action: 'record', log: `complete permutation [${path.join(',')}]` }); return; }
    for (let i = 0; i < NUMS.length; i++) {
      if (used[i]) { snap({ action: 'skip', pick: i, log: `${NUMS[i]} already used → skip` }); continue; }
      used[i] = true; path.push(NUMS[i]);
      snap({ action: 'choose', pick: i, log: `pick ${NUMS[i]} → [${path.join(',')}]` });
      dfs();
      used[i] = false; path.pop();
      snap({ action: 'undo', pick: i, log: `release ${NUMS[i]} → [${path.join(',')}]` });
    }
  }
  dfs();
  snap({ action: 'done', log: `${res.length} permutations generated`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">permute</span>(nums):' },
  { n: 2, t: '    res, path, used = [], [], [<span class="kw">False</span>]*n' },
  { n: 3, t: '    <span class="kw">def</span> <span class="fn">dfs</span>():' },
  { n: 4, t: '        <span class="kw">if</span> <span class="fn">len</span>(path) == n:' },
  { n: 5, t: '            res.append(path[:]); <span class="kw">return</span>' },
  { n: 6, t: '        <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(n):' },
  { n: 7, t: '            <span class="kw">if</span> used[i]: <span class="kw">continue</span>' },
  { n: 8, t: '            used[i]=<span class="kw">True</span>; path.append(nums[i])' },
  { n: 9, t: '            <span class="fn">dfs</span>()' },
  { n: 10, t: '            used[i]=<span class="kw">False</span>; path.pop()' },
];
const lineFor = fr => fr.action === 'record' ? 5 : fr.action === 'choose' ? 8 : fr.action === 'undo' ? 10 : fr.action === 'skip' ? 7 : fr.action === 'done' ? 5 : 3;

export default function BtPermutationsVisualization() {
  return (
    <AlgoStage
      title="Generating All Permutations"
      subtitle="Every position can hold any unused element. Pick one, mark it used, recurse to fill the rest, then release it and try the next — the choose/explore/un-choose pattern again."
      accent="#a78bfa" viewBox="0 0 640 140"
      frames={FRAMES} code={CODE} lineFor={lineFor}
      variables={(fr, prev) => [
        { name: 'path', type: 'list', prev: prev ? `[${prev.path.join(',')}]` : '[]', cur: `[${fr.path.join(',')}]` },
        { name: 'used', type: 'list', prev: prev ? `[${prev.used.map(u => u ? 'T' : 'F').join(',')}]` : '[F,F,F]', cur: `[${fr.used.map(u => u ? 'T' : 'F').join(',')}]` },
        { name: 'permutations', type: 'int', prev: prev ? String(prev.res.length) : '0', cur: String(fr.res.length) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(complete permutation [^\]]*\]|\d+ permutations generated)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>There are <strong>n!</strong> permutations (3! = 6 here). The <code>used</code> array prevents reusing an element within one ordering. Releasing it on the way back (<code>used[i]=False</code>) is essential — forget it and you'll only ever produce one permutation.</>}
      aside={fr => (
        <div>
          <div style={{ font: '600 10.5px ui-monospace, monospace', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--a-faint)', marginBottom: 6 }}>Permutations ({fr.res.length})</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {fr.res.map((s, k) => <span key={k} style={{ display: 'inline-flex', padding: '2px 9px', borderRadius: 7, background: k === fr.res.length - 1 ? 'color-mix(in srgb, var(--algo-accent) 18%, transparent)' : 'var(--a-surface-2)', border: '1px solid ' + (k === fr.res.length - 1 ? 'var(--algo-accent)' : 'var(--a-faint)'), font: '700 12px ui-monospace, monospace', color: 'var(--a-ink)' }}>{s.join('')}</span>)}
          </div>
        </div>
      )}
      renderCanvas={fr => (
        <>
          {NUMS.map((v, k) => {
            const isUsed = fr.used[k], isPick = fr.pick === k;
            return (
              <g key={k}>
                <rect x={200 + k * 60} y={30} width="50" height="50" rx="10" fill={isUsed ? 'color-mix(in srgb, var(--algo-accent) 22%, transparent)' : 'var(--a-surface-2)'} stroke={isPick ? 'var(--a-current)' : isUsed ? 'var(--algo-accent)' : 'var(--a-faint)'} strokeWidth={isPick ? 3.5 : 2} className={isPick ? 'algo-pulse' : ''} style={{ transition: 'fill .25s' }} />
                <text x={225 + k * 60} y={62} textAnchor="middle" style={{ font: '700 20px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
                <text x={225 + k * 60} y={98} textAnchor="middle" style={{ font: '9px ui-monospace, monospace', fill: isUsed ? 'var(--algo-accent)' : 'var(--a-faint)' }}>{isUsed ? 'used' : 'free'}</text>
              </g>
            );
          })}
          <text x={430} y={62} style={{ font: '700 16px ui-monospace, monospace', fill: 'var(--algo-accent)' }}>→ [{fr.path.join(', ')}]</text>
        </>
      )}
    />
  );
}
