/* Problem: Longest Common Prefix (Trie Approach)
 * 2D animated: insert every word, then walk down from the root while there's exactly ONE child
 * and no word ends. The path walked spells the longest common prefix. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

// trie for flower, flow, flight  → after f-l the node branches (o / i) → LCP = "fl"
const N = [
  { id: 0, ch: '•', x: 320, y: 40 }, { id: 1, ch: 'f', x: 320, y: 100 }, { id: 2, ch: 'l', x: 320, y: 160 },
  { id: 3, ch: 'o', x: 230, y: 225 }, { id: 4, ch: 'i', x: 410, y: 225 },
  { id: 5, ch: 'w', x: 230, y: 285 }, { id: 6, ch: 'g', x: 410, y: 285 },
];
const E = [[0, 1], [1, 2], [2, 3], [2, 4], [3, 5], [4, 6]];
const WALK = [0, 1, 2];   // stops at 'l' because it has 2 children
const STEPS = ['start at root', "'f' → single child, add to prefix", "'l' → single child, add to prefix", "node has 2 children → stop. LCP = \"fl\""];

export default function TrieLongestPrefixVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v >= STEPS.length - 1 ? 0 : v + 1)), 1.2, auto);
  const litN = new Set(WALK.slice(0, Math.min(i, WALK.length - 1) + 1));
  const prefix = ['', 'f', 'fl', 'fl'][i];

  return (
    <Stage2D
      title="Longest Common Prefix (Trie)" subtitle="Put all the words in a trie. The longest common prefix is the path from the root that stays a single chain — the moment a node branches (or a word ends), the shared prefix is over."
      accent="#56d364" viewBox="0 0 640 330"
      controls={<><button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v >= STEPS.length - 1 ? 0 : v + 1))}>step</button><button className="dsa2d-btn" onClick={() => setI(0)}>↺</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">prefix = "{prefix}"</span></>}
      legend={<>Words: <code>flower</code>, <code>flow</code>, <code>flight</code>. Walk down while the current node has exactly one child and isn't a word-end. Here <code>f→l</code> is a single chain, then <code>l</code> branches into <code>o</code> and <code>i</code> → stop. LCP = <strong>"fl"</strong>. Time <code>O(total characters)</code>.</>}
    >
      {E.map(([a, b], k) => { const on = litN.has(a) && litN.has(b); return <line key={k} x1={N[a].x} y1={N[a].y} x2={N[b].x} y2={N[b].y} stroke={on ? '#56d364' : '#30363d'} strokeWidth={on ? 3.5 : 2} />; })}
      {N.map(n => { const on = litN.has(n.id); const isStop = i >= 3 && n.id === 2; return (
        <g key={n.id}><circle cx={n.x} cy={n.y} r="18" fill={isStop ? '#f0883e' : on ? 'rgba(86,211,100,.25)' : '#161b22'} stroke={isStop ? '#f0883e' : on ? '#56d364' : '#8b949e'} strokeWidth="2.5" className={on && n.id === WALK[Math.min(i, WALK.length - 1)] ? 'dsa2d-pulse' : ''} /><text x={n.x} y={n.y + 5} fill={on ? '#0d1117' : '#e6edf3'} fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{n.ch}</text></g>); })}
      <text x="320" y="318" fill="#c9d1d9" fontSize="13" textAnchor="middle" fontFamily="system-ui">{STEPS[i]}</text>
    </Stage2D>
  );
}
