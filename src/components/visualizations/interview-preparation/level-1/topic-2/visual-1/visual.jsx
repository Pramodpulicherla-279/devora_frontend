/* Lesson: The Sliding Window Pattern, Revisited and Generalized  [AlgoStage]
 * The VARIABLE-size window: grow the right edge every step, shrink the left edge only while
 * the window is invalid. Longest substring without repeating characters on "abcabcbb". */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const S = 'abcabcbb';
function buildFrames() {
  const f = []; let left = 0, best = 0; const seen = new Set();
  const snap = o => f.push(Object.assign({ left, best, seen: [...seen] }, o));
  snap({ line: 2, right: -1, log: 'window empty; grow right, shrink left only on conflict' });
  for (let right = 0; right < S.length; right++) {
    snap({ line: 3, right, log: `right → '${S[right]}' (index ${right})` });
    while (seen.has(S[right])) {
      seen.delete(S[left]);
      snap({ line: 5, right, shrink: left, log: `'${S[right]}' already in window → drop '${S[left]}' (left → ${left + 1})` });
      left++;
    }
    seen.add(S[right]);
    if (right - left + 1 > best) best = right - left + 1;
    snap({ line: 7, right, log: `window "${S.slice(left, right + 1)}" (len ${right - left + 1}) · best = ${best}` });
  }
  snap({ line: 8, right: S.length - 1, log: `longest without repeats = ${best} ("abc")`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">def</span> <span class="fn">longest_unique</span>(s):' },
  { n: 2, t: '    seen, left, best = <span class="fn">set</span>(), 0, 0' },
  { n: 3, t: '    <span class="kw">for</span> right <span class="kw">in</span> <span class="fn">range</span>(<span class="fn">len</span>(s)):' },
  { n: 4, t: '        <span class="kw">while</span> s[right] <span class="kw">in</span> seen:' },
  { n: 5, t: '            seen.remove(s[left]); left += 1' },
  { n: 6, t: '        seen.add(s[right])' },
  { n: 7, t: '        best = <span class="fn">max</span>(best, right-left+1)' },
  { n: 8, t: '    <span class="kw">return</span> best' },
];
const CW = 64, gap = 8, startX = (640 - (S.length * (CW + gap) - gap)) / 2, Y = 66;

export default function PatSlidingWindowVisualization() {
  return (
    <AlgoStage
      title="Sliding Window, Generalized"
      subtitle="The fixed-size window you learned earlier is the special case. The general template: the right edge always advances; the left edge chases it just enough to restore validity."
      accent="#4fce78" viewBox="0 0 640 170"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'left', type: 'int', prev: prev ? String(prev.left) : '0', cur: String(fr.left) },
        { name: 'right', type: 'int', prev: prev ? String(prev.right) : '—', cur: String(fr.right) },
        { name: 'window', type: 'str', prev: '', cur: fr.right >= 0 ? `"${S.slice(fr.left, fr.right + 1)}"` : '""' },
        { name: 'best', type: 'int', prev: prev ? String(prev.best) : '0', cur: String(fr.best) },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(best = \d+|longest without repeats = \d+[^)]*\))/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Both pointers only move forward, so the whole scan is <strong>O(n)</strong> even with the inner while. The template adapts by swapping the <em>validity rule</em>: "no repeats" here, "sum ≤ k", "at most k distinct", "contains all of t" — same skeleton every time.</>}
      renderCanvas={fr => (
        <>
          {fr.right >= 0 && fr.right >= fr.left && <rect x={startX + fr.left * (CW + gap) - 4} y={Y - 6} width={(fr.right - fr.left + 1) * (CW + gap) - gap + 8} height="64" rx="10" fill="none" stroke="var(--a-visited)" strokeWidth="2.5" strokeDasharray="6 4" style={{ transition: 'x .3s, width .3s' }} />}
          {S.split('').map((ch, k) => {
            const inWin = fr.right >= 0 && k >= fr.left && k <= fr.right;
            const isR = k === fr.right, isShrink = fr.shrink === k;
            return (
              <g key={k}>
                <rect x={startX + k * (CW + gap)} y={Y} width={CW} height="52" rx="8" fill={isShrink ? 'color-mix(in srgb, #f85149 20%, transparent)' : isR ? 'var(--a-current-soft)' : inWin ? 'color-mix(in srgb, var(--a-visited) 14%, transparent)' : 'var(--a-surface-2)'} stroke={isShrink ? '#f85149' : isR ? 'var(--a-current)' : inWin ? 'var(--a-visited)' : 'var(--a-faint)'} strokeWidth={isR || isShrink ? 3 : 1.5} className={isR ? 'algo-pulse' : ''} style={{ transition: 'fill .25s' }} />
                <text x={startX + k * (CW + gap) + CW / 2} y={Y + 33} textAnchor="middle" style={{ font: '700 20px ui-monospace, monospace', fill: 'var(--a-ink)' }}>{ch}</text>
              </g>
            );
          })}
          <text x="320" y="152" textAnchor="middle" style={{ font: '600 11px ui-monospace, monospace', fill: 'var(--a-faint)' }}>right always advances · left chases only when the window breaks its rule</text>
        </>
      )}
    />
  );
}
