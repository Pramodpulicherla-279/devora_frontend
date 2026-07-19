/* Lesson: Longest Common Subsequence  [AlgoStage]
 * The classic string-DP table for "CAT" vs "CUT": match → diagonal + 1; mismatch → max of
 * up / left. Fully stepped cell-by-cell. */
import AlgoStage from '../../../../_dsa-shared/AlgoStage';

const S1 = 'CAT', S2 = 'CUT';
function buildFrames() {
  const f = []; const dp = Array.from({ length: S1.length + 1 }, () => Array(S2.length + 1).fill(null));
  const snap = o => f.push(Object.assign({ dp: dp.map(r => [...r]) }, o));
  for (let i = 0; i <= S1.length; i++) dp[i][0] = 0;
  for (let j = 0; j <= S2.length; j++) dp[0][j] = 0;
  snap({ line: 2, log: 'empty string vs anything → LCS 0 (base row & column)' });
  for (let i = 1; i <= S1.length; i++) {
    for (let j = 1; j <= S2.length; j++) {
      const a = S1[i - 1], b = S2[j - 1];
      if (a === b) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        snap({ line: 4, cur: [i, j], srcs: [[i - 1, j - 1]], match: true, log: `'${a}' == '${b}' → diagonal + 1 = ${dp[i][j]}` });
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        snap({ line: 6, cur: [i, j], srcs: [[i - 1, j], [i, j - 1]], log: `'${a}' ≠ '${b}' → max(up ${dp[i - 1][j]}, left ${dp[i][j - 1]}) = ${dp[i][j]}` });
      }
    }
  }
  snap({ line: 7, log: `LCS("${S1}", "${S2}") = ${dp[S1.length][S2.length]}  ("CT")`, done: true });
  return f;
}
const FRAMES = buildFrames();

const CODE = [
  { n: 1, t: '<span class="kw">for</span> i <span class="kw">in</span> 1..len(s1):' },
  { n: 2, t: '  <span class="kw">for</span> j <span class="kw">in</span> 1..len(s2):' },
  { n: 3, t: '    <span class="kw">if</span> s1[i-1] == s2[j-1]:' },
  { n: 4, t: '        dp[i][j] = dp[i-1][j-1] + 1' },
  { n: 5, t: '    <span class="kw">else</span>:' },
  { n: 6, t: '        dp[i][j] = <span class="fn">max</span>(dp[i-1][j], dp[i][j-1])' },
  { n: 7, t: '<span class="kw">return</span> dp[m][n]' },
];
const CW = 70, CH = 42, ox = 220, oy = 52;

export default function DpLcsVisualization() {
  return (
    <AlgoStage
      title="Longest Common Subsequence"
      subtitle="dp[i][j] = LCS length of the first i chars of one string and first j of the other. Matching characters extend the diagonal; mismatches inherit the best of dropping a character from either side."
      accent="#6b8cff" viewBox="0 0 640 260"
      frames={FRAMES} code={CODE} lineFor={fr => fr.line}
      variables={(fr, prev) => [
        { name: 'cell', type: 'tuple', prev: prev && prev.cur ? `[${prev.cur.join(',')}]` : '—', cur: fr.cur ? `[${fr.cur.join(',')}]` : '—' },
        { name: 'chars', type: 'str', prev: '—', cur: fr.cur ? `'${S1[fr.cur[0] - 1]}' vs '${S2[fr.cur[1] - 1]}'` : '—' },
        { name: 'match?', type: 'bool', prev: '—', cur: fr.cur ? String(!!fr.match) : '—' },
        { name: 'value', type: 'int', prev: '—', cur: fr.cur ? String(fr.dp[fr.cur[0]][fr.cur[1]]) : '—' },
      ]}
      logFor={fr => `<span class="${fr.done ? 'done' : ''}">${fr.log.replace(/(= \d+|LCS\([^)]*\) = \d+[^)]*\))/, '<span class="pre">$1</span>')}</span>`}
      legend={<>Time and space are <strong>O(m·n)</strong> — one cell per character pair. LCS underlies <code>diff</code> tools, DNA alignment, and edit distance (a sibling recurrence). Trace the arrows backwards from the corner to reconstruct the subsequence itself.</>}
      renderCanvas={fr => (
        <>
          {['', '∅', ...S2.split('')].map((ch, j) => <text key={'h' + j} x={j === 0 ? ox - 44 : ox + (j - 1) * CW + CW / 2 - 2} y={oy - 10} textAnchor="middle" style={{ font: '700 13px ui-monospace, monospace', fill: 'var(--algo-accent)' }}>{ch}</text>)}
          {['∅', ...S1.split('')].map((ch, r) => <text key={'v' + r} x={ox - 20} y={oy + r * CH + 26} textAnchor="middle" style={{ font: '700 13px ui-monospace, monospace', fill: 'var(--algo-accent)' }}>{ch}</text>)}
          {fr.dp.map((row, r) => row.map((v, c) => {
            const isCur = fr.cur && fr.cur[0] === r && fr.cur[1] === c;
            const isSrc = fr.srcs && fr.srcs.some(([sr, sc]) => sr === r && sc === c);
            const isAns = fr.done && r === S1.length && c === S2.length;
            const has = v != null;
            return (
              <g key={r + '-' + c}>
                <rect x={ox + c * CW} y={oy + r * CH} width={CW - 5} height={CH - 5} rx="7" fill={isAns ? 'var(--a-visited)' : isCur ? (fr.match ? 'var(--a-visited-soft)' : 'var(--a-current-soft)') : isSrc ? 'color-mix(in srgb, var(--algo-accent) 20%, transparent)' : has ? 'var(--a-surface-2)' : 'var(--a-code)'} stroke={isAns ? 'var(--a-visited)' : isCur ? (fr.match ? 'var(--a-visited)' : 'var(--a-current)') : isSrc ? 'var(--algo-accent)' : 'var(--a-border)'} strokeWidth={isCur || isSrc || isAns ? 2.5 : 1} className={isCur ? 'algo-pulse' : ''} style={{ transition: 'fill .2s' }} />
                <text x={ox + c * CW + (CW - 5) / 2} y={oy + r * CH + 26} textAnchor="middle" style={{ font: '700 15px ui-monospace, monospace', fill: isAns ? '#fff' : has ? 'var(--a-ink)' : 'var(--a-faint)' }}>{has ? v : '·'}</text>
              </g>
            );
          }))}
        </>
      )}
    />
  );
}
