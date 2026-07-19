/* Lesson: Building a Trie Node by Node
 * 2D animated: zoom in on ONE trie node to reveal its two fields — a children map (char → node)
 * and an is_end flag. Cycle through nodes to see how the fields differ. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';
import { TRIE, childrenOf, nodeAt } from '../../../../_dsa-shared/trieData';

const FOCUS = [0, 2, 4, 3]; // root, 'a' (2 children), 'r' (end + child), 't' (leaf end)
export default function TrieNodeVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % FOCUS.length), 2.0, auto);
  const node = nodeAt(FOCUS[i]), kids = childrenOf(node.id);

  return (
    <Stage2D
      title="Anatomy of a Trie Node"
      subtitle="Each node is tiny: a dictionary mapping the next character to a child node, plus a boolean marking whether a word ends here. That's the whole structure."
      accent="#a78bfa"
      viewBox="0 0 640 300"
      controls={
        <>
          {FOCUS.map((f, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{nodeAt(f).ch === '•' ? 'root' : `'${nodeAt(f).ch}'`}</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={<><code>class TrieNode: children = {'{}'}; is_end = False</code>. The map's keys are single characters, its values are more TrieNodes — the recursion that builds the tree. <code>is_end</code> distinguishes a stored word ("car") from a mere prefix ("ca").</>}
    >
      {/* the node card */}
      <rect x="60" y="60" width="250" height="170" rx="14" fill="#0b0f15" stroke="#a78bfa" strokeWidth="2" />
      <text x="185" y="90" fill="#c9bdf5" fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">TrieNode {node.ch === '•' ? '(root)' : `'${node.ch}'`}</text>
      <text x="80" y="122" fill="#8b949e" fontSize="13" fontFamily="Consolas">children = {'{'}</text>
      {kids.length ? kids.map((k, idx) => <text key={k.id} x="100" y={146 + idx * 22} fill="#7ee787" fontSize="14" fontFamily="Consolas">'{k.ch}': ●{idx < kids.length - 1 ? ',' : ''}</text>) : <text x="100" y="146" fill="#8b949e" fontSize="14" fontFamily="Consolas">(empty)</text>}
      <text x="80" y={146 + Math.max(kids.length, 1) * 22} fill="#8b949e" fontSize="13" fontFamily="Consolas">{'}'}</text>
      <text x="80" y="212" fill="#8b949e" fontSize="13" fontFamily="Consolas">is_end = <tspan fill={node.end ? '#56d364' : '#f0883e'} fontWeight="700">{node.end ? 'True' : 'False'}</tspan></text>

      {/* mini trie with focus highlighted */}
      {TRIE.filter(n => n.parent !== null).map(n => { const p = nodeAt(n.parent); return <line key={n.id} x1={p.x * 0.5 + 360} y1={p.y * 0.55 + 50} x2={n.x * 0.5 + 360} y2={n.y * 0.55 + 50} stroke="#30363d" strokeWidth="1.5" />; })}
      {TRIE.map(n => { const foc = n.id === node.id; return <g key={n.id}><circle cx={n.x * 0.5 + 360} cy={n.y * 0.55 + 50} r="12" fill={foc ? '#a78bfa' : n.end ? 'rgba(86,211,100,.2)' : '#161b22'} stroke={foc ? '#a78bfa' : n.end ? '#56d364' : '#8b949e'} strokeWidth="2" className={foc ? 'dsa2d-pulse' : ''} /><text x={n.x * 0.5 + 360} y={n.y * 0.55 + 54} fill={foc ? '#0d1117' : '#c9d1d9'} fontSize="11" textAnchor="middle" fontFamily="Consolas">{n.ch}</text></g>; })}
      <text x="470" y="285" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="system-ui">highlighted node ↑ shown in the card</text>
    </Stage2D>
  );
}
