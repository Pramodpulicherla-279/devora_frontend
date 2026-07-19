/* Lesson: Autocomplete — Building a Simple Suggestion Engine
 * 2D animated: type a prefix and the trie surfaces every completion from the subtree below it.
 * Cycles through prefixes to show suggestions updating live. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';
import { TRIE, nodeAt, walk, WORDS } from '../../../../_dsa-shared/trieData';

const PREFIXES = ['c', 'ca', 'car', 'do'];
const wordsWithPrefix = pre => Object.keys(WORDS).filter(w => w.startsWith(pre));
export default function TrieAutocompleteVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % PREFIXES.length), 1.8, auto);
  const pre = PREFIXES[i];
  const res = walk(pre);
  const litPath = new Set(res.path);
  const suggestions = wordsWithPrefix(pre);
  const subtreeIds = new Set(suggestions.flatMap(w => WORDS[w]));

  return (
    <Stage2D
      title="Autocomplete With a Trie"
      subtitle="As you type, walk the trie to the prefix node, then list every word in the subtree below it. That's exactly how search bars suggest completions in real time."
      accent="#58a6ff"
      viewBox="0 0 640 350"
      controls={
        <>
          {PREFIXES.map((p, k) => <button key={p} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>type "{p}"</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={<>Autocomplete = <strong>prefix walk</strong> (O(L)) + <strong>subtree collection</strong> (DFS gathering <code>is_end</code> nodes). Rank suggestions by frequency or recency for real products. The trie makes "words starting with…" instant, no matter how big the dictionary.</>}
    >
      {/* search box */}
      <rect x="200" y="18" width="240" height="34" rx="8" fill="#0b0f15" stroke="#58a6ff" strokeWidth="2" />
      <text x="216" y="41" fill="#e6edf3" fontSize="17" fontFamily="Consolas">{pre}<tspan fill="#58a6ff" className="dsa2d-blink">|</tspan></text>
      <text x="428" y="41" fill="#8b949e" fontSize="14" textAnchor="end" fontFamily="system-ui">🔍</text>

      {TRIE.filter(n => n.parent !== null).map(n => {
        const inPath = litPath.has(n.id) && litPath.has(n.parent);
        const inSub = subtreeIds.has(n.id) && (subtreeIds.has(n.parent) || litPath.has(n.parent));
        const p = nodeAt(n.parent);
        return <line key={n.id} x1={p.x} y1={p.y + 40} x2={n.x} y2={n.y + 40} stroke={inPath ? '#58a6ff' : inSub ? 'rgba(88,166,255,.5)' : '#30363d'} strokeWidth={inPath || inSub ? 3 : 2} style={{ transition: 'stroke .3s' }} />;
      })}
      {TRIE.map(n => {
        const inPath = litPath.has(n.id), inSub = subtreeIds.has(n.id);
        return (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y + 40} r="17" fill={inPath ? '#58a6ff' : inSub ? 'rgba(88,166,255,.2)' : '#161b22'} stroke={n.end && inSub ? '#56d364' : (inPath || inSub) ? '#58a6ff' : '#8b949e'} strokeWidth={n.end ? 3 : 2} style={{ transition: 'fill .3s' }} />
            <text x={n.x} y={n.y + 45} fill={inPath ? '#0d1117' : '#e6edf3'} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{n.ch}</text>
          </g>
        );
      })}
      {/* suggestions dropdown */}
      <text x="90" y="150" fill="#8b949e" fontSize="12" fontFamily="system-ui">suggestions:</text>
      {suggestions.map((s, k) => (
        <g key={s} className="dsa2d-fade">
          <rect x="60" y={162 + k * 34} width="120" height="28" rx="6" fill="rgba(88,166,255,.1)" stroke="#58a6ff" />
          <text x="76" y={181 + k * 34} fill="#79c0ff" fontSize="14" fontFamily="Consolas">{s}</text>
        </g>
      ))}
    </Stage2D>
  );
}
