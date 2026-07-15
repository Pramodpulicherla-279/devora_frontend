/* Lesson: Space Trade-Offs — When a Trie Is Worth the Memory
 * 2D animated: compare characters stored as separate strings vs shared trie nodes. Add words
 * one at a time and watch shared prefixes save space (or not, when prefixes don't overlap). */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const WORDS = ['cat', 'car', 'card', 'do', 'dog'];
// cumulative unique trie nodes as each word is added (excluding root)
const TRIE_NODES = [3, 4, 5, 7, 8];        // c,a,t | +r | +d | +d,o | +g
export default function TrieSpaceVisualization() {
  const [n, setN] = useState(1);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setN(v => (v >= WORDS.length ? 1 : v + 1)), 1.2, auto);
  const shown = WORDS.slice(0, n);
  const rawChars = shown.reduce((a, w) => a + w.length, 0);
  const trieNodes = TRIE_NODES[n - 1];
  const saved = rawChars - trieNodes;
  const barW = v => Math.min(v * 22, 300);

  return (
    <Stage2D
      title="Trie Space Trade-Offs"
      subtitle="A trie shares prefixes, so overlapping words cost less than storing each string in full. But nodes carry overhead — tries win when words share lots of prefixes."
      accent="#58a6ff"
      viewBox="0 0 640 280"
      controls={
        <>
          <div className="dsa2d-group"><span className="dsa2d-label">words: {n}</span><input className="dsa2d-slider" type="range" min="1" max={WORDS.length} value={n} onChange={e => setN(+e.target.value)} /></div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{shown.join(', ')}</span>
        </>
      }
      legend={<>Stored separately, these words need <strong>{rawChars}</strong> characters; the trie reuses shared prefixes and needs only <strong>{trieNodes}</strong> nodes ({saved} saved). Tries shine for large dictionaries with common prefixes; for random unique strings, a hash set is lighter.</>}
    >
      <text x="40" y="70" fill="#8b949e" fontSize="13" fontFamily="system-ui">separate strings</text>
      <rect x="200" y="54" width="300" height="30" rx="6" fill="#161b22" />
      <rect x="200" y="54" width={barW(rawChars)} height="30" rx="6" fill="#f0883e" style={{ transition: 'width .4s' }} />
      <text x={210 + barW(rawChars)} y="74" fill="#f8c088" fontSize="14" fontFamily="Consolas">{rawChars} chars</text>

      <text x="40" y="140" fill="#8b949e" fontSize="13" fontFamily="system-ui">trie nodes</text>
      <rect x="200" y="124" width="300" height="30" rx="6" fill="#161b22" />
      <rect x="200" y="124" width={barW(trieNodes)} height="30" rx="6" fill="#58a6ff" style={{ transition: 'width .4s' }} />
      <text x={210 + barW(trieNodes)} y="144" fill="#79c0ff" fontSize="14" fontFamily="Consolas">{trieNodes} nodes</text>

      <rect x="200" y="186" width="240" height="44" rx="10" fill={saved > 0 ? 'rgba(86,211,100,.12)' : 'rgba(240,136,62,.12)'} stroke={saved > 0 ? '#56d364' : '#f0883e'} />
      <text x="320" y="205" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">saved by shared prefixes</text>
      <text x="320" y="224" fill={saved > 0 ? '#7ee787' : '#f8c088'} fontSize="17" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{saved} characters</text>
    </Stage2D>
  );
}
