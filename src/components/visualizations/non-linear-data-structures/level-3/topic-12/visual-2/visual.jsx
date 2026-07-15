/* Problem: Implement a Trie (Prefix Tree)
 * 2D animated: the three core operations — insert, search (needs is_end), and startsWith
 * (prefix only) — demonstrated on a small trie holding "cat" and "car". */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const N = [
  { id: 0, ch: '•', x: 320, y: 40 }, { id: 1, ch: 'c', x: 320, y: 110 },
  { id: 2, ch: 'a', x: 320, y: 175 }, { id: 3, ch: 't', x: 250, y: 240, end: true },
  { id: 4, ch: 'r', x: 390, y: 240, end: true },
];
const E = [[0, 1], [1, 2], [2, 3], [2, 4]];
const OPS = [
  { label: "insert('cat')", path: [0, 1, 2, 3], res: 'stored', ok: true },
  { label: "insert('car')", path: [0, 1, 2, 4], res: 'stored', ok: true },
  { label: "search('car')", path: [0, 1, 2, 4], res: 'True — is_end ✓', ok: true },
  { label: "search('ca')", path: [0, 1, 2], res: 'False — prefix, not a word', ok: false },
  { label: "startsWith('ca')", path: [0, 1, 2], res: 'True — prefix exists', ok: true },
];

export default function TrieImplementVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % OPS.length), 1.8, auto);
  const op = OPS[i], lit = new Set(op.path);

  return (
    <Stage2D
      title="Implement a Trie" subtitle="A trie supports three operations, all O(L): insert stores a word, search checks a full word (must end on is_end), and startsWith checks a prefix."
      accent="#a78bfa" viewBox="0 0 640 300"
      controls={<>{OPS.map((o, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{op.label}</span></>}
      legend={<>The class is a node with a <code>children</code> map and an <code>is_end</code> flag. <strong>search</strong> vs <strong>startsWith</strong> differ only in the last check: search demands <code>is_end</code> is True, startsWith just needs the path to exist. All three walk one character at a time → <code>O(L)</code>.</>}
    >
      {E.map(([a, b], k) => { const on = lit.has(a) && lit.has(b); return <line key={k} x1={N[a].x} y1={N[a].y} x2={N[b].x} y2={N[b].y} stroke={on ? (op.ok ? '#56d364' : '#f0883e') : '#30363d'} strokeWidth={on ? 3.5 : 2} />; })}
      {N.map(n => { const on = lit.has(n.id); const tip = op.path[op.path.length - 1] === n.id; return (
        <g key={n.id}><circle cx={n.x} cy={n.y} r="18" fill={tip ? (op.ok ? '#56d364' : '#f0883e') : on ? 'rgba(167,139,250,.25)' : '#161b22'} stroke={n.end ? '#56d364' : on ? '#a78bfa' : '#8b949e'} strokeWidth={n.end ? 3 : 2} className={tip ? 'dsa2d-pulse' : ''} /><text x={n.x} y={n.y + 5} fill={tip ? '#0d1117' : '#e6edf3'} fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{n.ch}</text></g>); })}
      <text x="320" y="288" fill={op.ok ? '#56d364' : '#f0883e'} fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{op.res}</text>
    </Stage2D>
  );
}
