/* Lesson: Generating All Subsets  [AlgoStage framework]
 * Backtracking builds every subset of [1,2,3]: at each step extend the current path, record it,
 * then undo. Fully stepped with path/results inspector, synced code, console. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const NUMS = [1, 2, 3];
function buildFrames() {
  const f = [], res = []; const path = [];
  const snap = o => f.push(Object.assign({ path: [...path], res: res.map(s => [...s]) }, o));
  function dfs(i) {
    res.push([...path]);
    snap({ i, action: 'record', log: `record subset [${path.join(',')}]` });
    for (let j = i; j < NUMS.length; j++) {
      path.push(NUMS[j]);
      snap({ i, j, action: 'choose', log: `choose ${NUMS[j]} → path [${path.join(',')}]` });
      dfs(j + 1);
      path.pop();
      snap({ i, j, action: 'undo', log: `backtrack → path [${path.join(',')}]` });
    }
  }
  snap({ i: 0, action: 'start', log: 'start with empty path' });
  dfs(0);
  snap({ i: 0, action: 'done', log: `${res.length} subsets generated`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">subsets</span>(nums):' },
  { n: 2, t: '    res = []' },
  { n: 3, t: '    <span class="kw">def</span> <span class="fn">dfs</span>(i, path):' },
  { n: 4, t: '        res.append(path[:])' },
  { n: 5, t: '        <span class="kw">for</span> j <span class="kw">in</span> <span class="fn">range</span>(i, <span class="fn">len</span>(nums)):' },
  { n: 6, t: '            path.append(nums[j])' },
  { n: 7, t: '            <span class="fn">dfs</span>(j+1, path)' },
  { n: 8, t: '            path.pop()   <span class="st"># backtrack</span>' },
];
const lineFor = fr => fr.action === 'record' ? 4 : fr.action === 'choose' ? 6 : fr.action === 'undo' ? 8 : fr.action === 'done' ? 4 : 3;

export default function BtSubsetsVisualization() {
  return (
    <AlgoStage
      title="Generating All Subsets"
      subtitle="Backtracking explores an include/skip decision for each element. Record the path at every node, extend by one element, recurse, then undo the choice to try the next branch."
      accent="#4fce78" viewBox="0 0 640 130"
      frames={FRAMES} code={CODE} lineFor={lineFor}
      variables={(fr, prev) => [
        { name: 'path', type: 'list', prev: prev ? `[${prev.path.join(',')}]` : '[]', cur: `[${fr.path.join(',')}]` },
        { name: 'action', type: 'str', prev: prev ? prev.action : '', cur: fr.action },
        { name: 'subsets found', type: 'int', prev: prev ? String(prev.res.length) : '0', cur: String(fr.res.length) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(record subset [^\]]*\]|\d+ subsets generated)/, '<span class="pre">$1</span>')}</span>`}
      legend={<>For <code>n</code> elements there are <strong>2ⁿ</strong> subsets — each element is independently in or out. Recording <code>path[:]</code> (a copy) at every node captures partial subsets too. The <code>append</code>/<code>pop</code> pair is the "choose then un-choose" heart of backtracking.</>}
      aside={fr => (
        <div>
          <div style={{ font: '600 10.5px ui-monospace, monospace', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--a-faint)', marginBottom: 6 }}>Subsets collected ({fr.res.length})</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {fr.res.map((s, k) => <span key={k} style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 9px', borderRadius: 7, background: k === fr.res.length - 1 ? 'var(--a-visited-soft)' : 'var(--a-surface-2)', border: '1px solid ' + (k === fr.res.length - 1 ? 'var(--a-visited)' : 'var(--a-faint)'), font: '700 12px ui-monospace, monospace', color: 'var(--a-ink)' }}>{'{' + s.join(',') + '}'}</span>)}
          </div>
        </div>
      )}
      renderCanvas={fr => (
        <>
          <text x="320" y="26" textAnchor="middle" style={{ font: '600 11px ui-monospace, monospace', fill: 'var(--a-faint)' }}>current path</text>
          {NUMS.map((v, k) => {
            const inPath = fr.path.includes(v);
            return (
              <g key={k}>
                <rect x={250 + k * 50} y={44} width="42" height="42" rx="9" fill={inPath ? 'var(--a-visited-soft)' : 'var(--a-surface-2)'} stroke={inPath ? 'var(--a-visited)' : 'var(--a-faint)'} strokeWidth={inPath ? 3 : 2} className={inPath ? 'algo-pulse' : ''} style={{ transition: 'fill .25s' }} />
                <text x={271 + k * 50} y={71} textAnchor="middle" style={{ font: '700 18px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{v}</text>
              </g>
            );
          })}
          <text x="320" y="112" textAnchor="middle" style={{ font: '700 14px ui-monospace, monospace', fill: 'var(--a-visited)' }}>path = [{fr.path.join(', ')}]</text>
        </>
      )}
    />
  );
}
