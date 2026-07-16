/* Lesson: Combination Sum — Finding Combinations That Add Up  [AlgoStage]
 * Backtracking builds combinations (elements reusable) that sum to a target. Extend the path,
 * prune when the remainder goes negative, record when it hits zero. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const C = [2, 3, 5];
const TARGET = 8;
function buildFrames() {
  const f = [], res = [], path = [];
  const snap = o => f.push(Object.assign({ path: [...path], res: res.map(p => [...p]) }, o));
  snap({ action: 'start', remain: TARGET, log: `find combinations summing to ${TARGET}` });
  function dfs(i, remain) {
    if (remain === 0) { res.push([...path]); snap({ action: 'record', remain, log: `sum = ${TARGET} → record [${path.join('+')}]` }); return; }
    if (remain < 0) { snap({ action: 'prune', remain, log: `overshot (${remain}) → prune` }); return; }
    for (let j = i; j < C.length; j++) {
      path.push(C[j]);
      snap({ action: 'choose', pick: C[j], remain: remain - C[j], log: `add ${C[j]} → path [${path.join('+')}], need ${remain - C[j]}` });
      dfs(j, remain - C[j]);
      path.pop();
      snap({ action: 'undo', remain, log: `backtrack → path [${path.join('+')}]` });
    }
  }
  dfs(0, TARGET);
  snap({ action: 'done', remain: 0, log: `${res.length} combinations found`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">combination_sum</span>(cands, target):' },
  { n: 2, t: '    <span class="kw">def</span> <span class="fn">dfs</span>(i, path, remain):' },
  { n: 3, t: '        <span class="kw">if</span> remain == 0: res.append(path[:]); <span class="kw">return</span>' },
  { n: 4, t: '        <span class="kw">if</span> remain < 0: <span class="kw">return</span>   <span class="st"># prune</span>' },
  { n: 5, t: '        <span class="kw">for</span> j <span class="kw">in</span> <span class="fn">range</span>(i, <span class="fn">len</span>(cands)):' },
  { n: 6, t: '            path.append(cands[j])' },
  { n: 7, t: '            <span class="fn">dfs</span>(j, path, remain - cands[j])' },
  { n: 8, t: '            path.pop()   <span class="st"># backtrack</span>' },
];
const lineFor = fr => fr.action === 'record' ? 3 : fr.action === 'prune' ? 4 : fr.action === 'choose' ? 6 : fr.action === 'undo' ? 8 : 2;

export default function BtCombinationSumVisualization() {
  return (
    <AlgoStage
      title="Combination Sum"
      subtitle="Build a running combination, reusing candidates freely. Each step subtracts a candidate from the remaining target; stop when it reaches exactly zero, and prune the moment it goes negative."
      accent="#4fce78" viewBox="0 0 640 130"
      frames={FRAMES} code={CODE} lineFor={lineFor}
      variables={(fr, prev) => [
        { name: 'path', type: 'list', prev: prev ? `[${prev.path.join(',')}]` : '[]', cur: `[${fr.path.join(',')}]` },
        { name: 'remaining', type: 'int', prev: prev && prev.remain != null ? String(prev.remain) : '—', cur: fr.remain != null ? String(fr.remain) : '—' },
        { name: 'action', type: 'str', prev: prev ? prev.action : '', cur: fr.action },
        { name: 'found', type: 'int', prev: prev ? String(prev.res.length) : '0', cur: String(fr.res.length) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(record \[[^\]]*\]|\d+ combinations found|prune)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Passing <code>j</code> (not <code>j+1</code>) to the recursion lets a candidate repeat; starting the loop at <code>i</code> avoids duplicate combinations in different orders. The <strong>remain &lt; 0</strong> prune is what keeps the search tractable — cut branches the instant they can't succeed.</>}
      aside={fr => (
        <div>
          <div style={{ font: '600 10.5px ui-monospace, monospace', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--a-faint)', marginBottom: 6 }}>Combinations found ({fr.res.length})</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {fr.res.length ? fr.res.map((s, k) => <span key={k} style={{ display: 'inline-flex', padding: '2px 9px', borderRadius: 7, background: k === fr.res.length - 1 ? 'var(--a-visited-soft)' : 'var(--a-surface-2)', border: '1px solid ' + (k === fr.res.length - 1 ? 'var(--a-visited)' : 'var(--a-faint)'), font: '700 12px ui-monospace, monospace', color: 'var(--a-ink)' }}>{s.join('+')}={TARGET}</span>) : <span style={{ color: 'var(--a-faint)', fontStyle: 'italic', fontSize: 13 }}>searching…</span>}
          </div>
        </div>
      )}
      renderCanvas={fr => (
        <>
          <text x="40" y="30" style={{ font: '600 10px ui-monospace, monospace', fill: 'var(--a-faint)' }}>candidates (reusable): {C.join(', ')}</text>
          {C.map((v, k) => {
            const isPick = fr.pick === v && fr.action === 'choose';
            return <g key={k}><rect x={40 + k * 54} y={42} width="46" height="46" rx="9" fill={isPick ? 'var(--a-visited-soft)' : 'var(--a-surface-2)'} stroke={isPick ? 'var(--a-visited)' : 'var(--a-faint)'} strokeWidth={isPick ? 3 : 2} className={isPick ? 'algo-pulse' : ''} /><text x={63 + k * 54} y={71} textAnchor="middle" style={{ font: '700 18px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text></g>;
          })}
          <text x={240} y={58} style={{ font: '700 15px ui-monospace, monospace', fill: 'var(--a-ink)' }}>path = [{fr.path.join(' + ')}]</text>
          <text x={240} y={82} style={{ font: '700 14px ui-monospace, monospace', fill: fr.remain < 0 ? '#f85149' : fr.remain === 0 ? 'var(--a-visited)' : 'var(--a-current)' }}>remaining = {fr.remain}</text>
        </>
      )}
    />
  );
}
