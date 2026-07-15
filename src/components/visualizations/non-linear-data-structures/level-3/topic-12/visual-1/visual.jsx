/* Lesson: Common Trie Interview Problems, Solved Step by Step (overview)
 * 2D animated: flip through the classic trie problems, each tagged with the trie technique it
 * relies on. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const PROBS = [
  { t: 'Implement Trie (Prefix Tree)', pat: 'insert / search / startsWith', c: '#56d364', why: 'The foundation: build the node class and the three core O(L) operations from scratch.' },
  { t: 'Add & Search Word', pat: 'DFS with "." wildcard', c: '#58a6ff', why: 'A dot matches any child, so search branches into every child — DFS over the trie.' },
  { t: 'Word Search II', pat: 'trie + grid DFS/backtracking', c: '#a78bfa', why: 'Load all target words into a trie, then DFS the board once, pruning dead prefixes.' },
  { t: 'Replace Words', pat: 'shortest-root prefix walk', c: '#f0883e', why: 'For each word, walk the trie until the first is_end root and swap it in.' },
  { t: 'Longest Word in Dictionary', pat: 'walk built one letter at a time', c: '#ffd43b', why: 'Only words whose every prefix is also a word qualify — verify along the path.' },
];
export default function TrieInterviewProblemsVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % PROBS.length), 2.3, auto);
  const p = PROBS[i];

  return (
    <Stage2D
      title="Common Trie Interview Problems"
      subtitle="Trie questions reward recognising when prefix-sharing beats a hash set. Each of these reduces to insert/search plus a DFS twist."
      accent={p.c}
      viewBox="0 0 640 300"
      controls={
        <>
          {PROBS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={<>The trie toolkit: <strong>insert/search/startsWith</strong> in O(L), <strong>DFS over children</strong> for wildcards and enumeration, and <strong>backtracking</strong> when combined with a grid. Reach for a trie whenever a problem says "prefix", "starts with", or "dictionary of words".</>}
    >
      <rect x="60" y="46" width="520" height="150" rx="14" fill="#0b0f15" stroke={p.c} strokeWidth="1.5" />
      <text x="320" y="88" fill="#e6edf3" fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{p.t}</text>
      <rect x="180" y="104" width="280" height="32" rx="16" fill={p.c + '22'} stroke={p.c} />
      <text x="320" y="125" fill={p.c} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{p.pat}</text>
      <foreignObject x="86" y="146" width="468" height="46">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '14px system-ui', lineHeight: 1.4, textAlign: 'center' }}>{p.why}</div>
      </foreignObject>
      {PROBS.map((_, k) => <circle key={k} cx={320 - (PROBS.length - 1) * 12 + k * 24} cy="228" r="5" fill={k === i ? p.c : '#30363d'} />)}
      <text x="320" y="266" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">problem {i + 1} of {PROBS.length} — each detailed step-by-step in the lesson below</text>
    </Stage2D>
  );
}
