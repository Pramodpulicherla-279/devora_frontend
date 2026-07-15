/* Problem: Add and Search Word With Wildcards
 * 2D animated: search "c.t" where '.' matches ANY child. At the wildcard the search branches
 * into every child, exploring "cat" and "cot" until one reaches is_end. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

// trie holding cat, cot, cut
const N = [
  { id: 0, ch: '•', x: 320, y: 40 }, { id: 1, ch: 'c', x: 320, y: 105 },
  { id: 2, ch: 'a', x: 200, y: 170 }, { id: 3, ch: 'o', x: 320, y: 170 }, { id: 4, ch: 'u', x: 440, y: 170 },
  { id: 5, ch: 't', x: 200, y: 235, end: true }, { id: 6, ch: 't', x: 320, y: 235, end: true }, { id: 7, ch: 't', x: 440, y: 235, end: true },
];
const E = [[0, 1], [1, 2], [1, 3], [1, 4], [2, 5], [3, 6], [4, 7]];
// query "c.t": step0 root, step1 c, step2 '.' → branch to a,o,u, step3 t (all match) → is_end
const STEPS = [
  { active: [0], msg: "start at root" },
  { active: [1], msg: "'c' → single child" },
  { active: [2, 3, 4], msg: "'.' wildcard → try ALL children (a, o, u)" },
  { active: [5, 6, 7], msg: "'t' → matches under each → is_end ✓ (found 'cat','cot','cut')" },
];

export default function TrieWildcardSearchVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v >= STEPS.length - 1 ? 0 : v + 1)), 1.3, auto);
  const s = STEPS[i], lit = new Set(); STEPS.slice(0, i + 1).forEach(st => st.active.forEach(a => lit.add(a)));
  const cur = new Set(s.active);

  return (
    <Stage2D
      title="Add & Search Word With Wildcards" subtitle="A '.' in the query matches any single character. Where a normal search follows one child, a wildcard forces the search to branch into every child of the current node."
      accent="#f0883e" viewBox="0 0 640 300"
      controls={<><button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v >= STEPS.length - 1 ? 0 : v + 1))}>step</button><button className="dsa2d-btn" onClick={() => setI(0)}>↺</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">query: c.t</span></>}
      legend={<>Implement it with <strong>DFS</strong>: on a normal letter, descend into that one child; on <code>.</code>, recurse into <em>all</em> children. A match succeeds only if some branch reaches an <code>is_end</code> node at the query's end. Worst case a query of all dots explores the whole trie.</>}
    >
      {E.map(([a, b], k) => { const on = lit.has(a) && lit.has(b); return <line key={k} x1={N[a].x} y1={N[a].y} x2={N[b].x} y2={N[b].y} stroke={on ? '#f0883e' : '#30363d'} strokeWidth={on ? 3 : 2} />; })}
      {N.map(n => { const isCur = cur.has(n.id); const on = lit.has(n.id); return (
        <g key={n.id}><circle cx={n.x} cy={n.y} r="18" fill={isCur ? '#f0883e' : on ? 'rgba(240,136,62,.2)' : '#161b22'} stroke={n.end ? '#56d364' : on ? '#f0883e' : '#8b949e'} strokeWidth={n.end ? 3 : 2} className={isCur ? 'dsa2d-pulse' : ''} /><text x={n.x} y={n.y + 5} fill={isCur ? '#0d1117' : '#e6edf3'} fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{n.ch}</text></g>); })}
      <text x="320" y="288" fill="#c9d1d9" fontSize="13" textAnchor="middle" fontFamily="system-ui">{s.msg}</text>
    </Stage2D>
  );
}
