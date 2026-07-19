/* Lesson: What Is a Trie, and What Problem Does It Solve?
 * 2D animated: a prefix tree where words sharing a prefix share a path. Cycle through the
 * stored words to see each one light up its root-to-end path. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';
import { TRIE, WORDS, nodeAt } from '../../../../_dsa-shared/trieData';

const NAMES = Object.keys(WORDS);
export default function TrieIntroVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % NAMES.length), 1.4, auto);
  const word = NAMES[i], path = new Set(WORDS[word]);

  return (
    <Stage2D
      title="What Is a Trie?"
      subtitle="A trie (prefix tree) stores words along paths of characters. Words with a common prefix share the same early nodes — 'cat', 'car', and 'card' all reuse the c–a path."
      accent="#56d364"
      viewBox="0 0 640 350"
      controls={
        <>
          {NAMES.map((w, k) => <button key={w} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{w}</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={<>Each edge is a character; each root-to-marked-node path spells a word. Shared prefixes are stored <strong>once</strong>, so lookups and prefix queries take <code>O(L)</code> time (L = word length) — independent of how many words are stored. That's why tries power autocomplete and spell-check.</>}
    >
      {TRIE.filter(n => n.parent !== null).map(n => {
        const p = nodeAt(n.parent), on = path.has(n.id) && path.has(n.parent);
        return <line key={n.id} x1={p.x} y1={p.y} x2={n.x} y2={n.y} stroke={on ? '#56d364' : '#30363d'} strokeWidth={on ? 3.5 : 2} style={{ transition: 'stroke .3s' }} />;
      })}
      {TRIE.map(n => {
        const on = path.has(n.id);
        return (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r="18" fill={on ? (n.end ? '#56d364' : 'rgba(86,211,100,.25)') : '#161b22'} stroke={n.end ? '#56d364' : on ? '#3fb950' : '#8b949e'} strokeWidth={n.end ? 3 : 2} className={on && n.end ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s' }} />
            <text x={n.x} y={n.y + 5} fill={on && n.end ? '#0d1117' : '#e6edf3'} fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{n.ch}</text>
          </g>
        );
      })}
      <text x="320" y="342" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">double ring = end of a word · stored: cat, car, card, do, dog</text>
    </Stage2D>
  );
}
