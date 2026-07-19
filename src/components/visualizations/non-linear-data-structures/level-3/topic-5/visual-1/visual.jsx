/* Lesson: Deleting a Word From a Trie Without Breaking Other Words
 * 2D animated: two cases. Deleting "card" removes a leaf node safely. Deleting "car" can't
 * remove nodes (they're needed by "card") — it only clears the is_end flag. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';
import { TRIE, nodeAt } from '../../../../_dsa-shared/trieData';

export default function TrieDeleteVisualization() {
  const [mode, setMode] = useState('card');   // 'card' | 'car'
  const [phase, setPhase] = useState(0);       // 0 locate, 1 act
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setPhase(p => { if (p >= 1) { setMode(m => m === 'card' ? 'car' : 'card'); return 0; } return p + 1; }), 1.6, auto);
  const removeLeaf = mode === 'card' && phase >= 1;    // id 5 removed
  const unmark = mode === 'car' && phase >= 1;         // id 4 end -> false
  const target = mode === 'card' ? 5 : 4;

  return (
    <Stage2D
      title="Deleting From a Trie"
      subtitle="Deletion must not break other words. Only remove nodes that no other word needs; if a node is still on someone else's path, just clear its end-of-word flag."
      accent="#f0883e"
      viewBox="0 0 640 350"
      controls={
        <>
          <button className={`dsa2d-btn ${mode === 'card' ? 'dsa2d-btn--on' : ''}`} onClick={() => { setMode('card'); setPhase(0); }}>delete "card"</button>
          <button className={`dsa2d-btn ${mode === 'car' ? 'dsa2d-btn--on' : ''}`} onClick={() => { setMode('car'); setPhase(0); }}>delete "car"</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{phase === 0 ? `locating "${mode}"…` : removeLeaf ? "leaf 'd' removed" : "kept nodes, cleared is_end"}</span>
        </>
      }
      legend={mode === 'card'
        ? <>"card" ends at a <strong>leaf</strong> ('d') that no other word uses → safely remove it. "car" is untouched because its nodes weren't part of the deletion.</>
        : <>"car"'s last node ('r') is also on the path to "card", so we <strong>can't delete the node</strong> — doing so would erase "card" too. Instead we just set <code>is_end = False</code>. Prefixes stay shared; only the word-marker is removed.</>}
    >
      {TRIE.filter(n => n.parent !== null).map(n => {
        const removed = removeLeaf && n.id === 5;
        const p = nodeAt(n.parent);
        return <line key={n.id} x1={p.x} y1={p.y} x2={n.x} y2={n.y} stroke={removed ? '#f85149' : '#30363d'} strokeWidth="2" strokeDasharray={removed ? '5 4' : 'none'} style={{ opacity: removed ? 0.4 : 1, transition: 'opacity .4s' }} />;
      })}
      {TRIE.map(n => {
        const removed = removeLeaf && n.id === 5;
        const isTarget = n.id === target && phase === 0;
        const nowEnd = n.end && !(unmark && n.id === 4);
        return (
          <g key={n.id} style={{ opacity: removed ? 0.25 : 1, transition: 'opacity .4s' }}>
            <circle cx={n.x} cy={n.y} r="18"
              fill={removed ? 'rgba(248,81,73,.15)' : isTarget ? '#ffd43b' : nowEnd ? 'rgba(86,211,100,.2)' : '#161b22'}
              stroke={removed ? '#f85149' : isTarget ? '#ffd43b' : nowEnd ? '#56d364' : '#8b949e'} strokeWidth={nowEnd ? 3 : 2}
              className={isTarget ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s, stroke .3s' }} />
            <text x={n.x} y={n.y + 5} fill={isTarget ? '#0d1117' : '#e6edf3'} fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{n.ch}</text>
            {unmark && n.id === 4 && phase >= 1 && <text x={n.x + 24} y={n.y - 12} fill="#f0883e" fontSize="11" fontFamily="Consolas">end=✗</text>}
          </g>
        );
      })}
      <text x="320" y="344" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">{mode === 'car' ? 'nodes kept for "card"; only the word-marker cleared' : "unshared leaf removed bottom-up"}</text>
    </Stage2D>
  );
}
