/* Problem: Word Break II
 * 2D animated: split "catsanddog" into dictionary sentences. Backtrack over dictionary-word
 * prefixes; two sentences emerge. Memoization rescues the exponential worst case. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const DICT = ['cat', 'cats', 'and', 'sand', 'dog'];
const STEPS = [
  { words: ['cat'], rest: 'sanddog', log: '"cat" ∈ dict → take it, recurse on "sanddog"' },
  { words: ['cat', 'sand'], rest: 'dog', log: '"sand" ∈ dict → recurse on "dog"' },
  { words: ['cat', 'sand', 'dog'], rest: '', ok: true, log: 'consumed → sentence "cat sand dog" ✓' },
  { words: ['cats'], rest: 'anddog', log: 'backtrack… "cats" is ALSO a dict prefix → branch' },
  { words: ['cats', 'and'], rest: 'dog', log: '"and" ∈ dict → recurse on "dog"' },
  { words: ['cats', 'and', 'dog'], rest: '', ok: true, done: true, log: 'sentence "cats and dog" ✓ — 2 sentences total' },
];
export default function BtWordBreakIiVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 1.8, auto);
  const s = STEPS[i];
  return (
    <Stage2D title='Word Break II — "catsanddog"' subtitle="Like palindrome partitioning, but the cut rule is 'prefix must be a dictionary word'. Both 'cat' and 'cats' match at the start — each spawns its own branch of the search."
      accent="#a78bfa" viewBox="0 0 640 210"
      controls={<>{STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{s.log}</span></>}
      legend={<>dict = {'{'}{DICT.join(', ')}{'}'}. The same suffix (like "dog") can be reached via many splits — <strong>memoize suffix → sentences</strong> to avoid recomputing it (backtracking + DP together). A trie over the dictionary makes each prefix check O(len) too.</>}>
      {s.words.map((w, k) => {
        const x = 90 + s.words.slice(0, k).reduce((a, t) => a + t.length * 22 + 40, 0);
        return (
          <g key={k} className="dsa2d-fade">
            <rect x={x} y="64" width={w.length * 22 + 24} height="52" rx="10" fill="rgba(167,139,250,.18)" stroke="#a78bfa" strokeWidth="2.5" className={k === s.words.length - 1 ? 'dsa2d-pulse' : ''} />
            <text x={x + (w.length * 22 + 24) / 2} y="97" fill="#e6edf3" fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{w}</text>
          </g>
        );
      })}
      {s.rest && <g><rect x={90 + s.words.reduce((a, t) => a + t.length * 22 + 40, 0)} y="70" width={s.rest.length * 20 + 20} height="42" rx="9" fill="#0d1117" stroke="#6e7681" strokeWidth="1.5" strokeDasharray="5 4" /><text x={90 + s.words.reduce((a, t) => a + t.length * 22 + 40, 0) + (s.rest.length * 20 + 20) / 2} y="97" fill="#8b949e" fontSize="15" textAnchor="middle" fontFamily="Consolas">{s.rest}</text></g>}
      <text x="320" y="156" fill={s.ok ? '#56d364' : '#8b949e'} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{s.ok ? `✓ "${s.words.join(' ')}"` : 'dashed = suffix still to break'}</text>
      <text x="320" y="190" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">sentences found: {i >= 2 ? '"cat sand dog"' : '—'}{i >= 5 ? ' · "cats and dog"' : ''}</text>
    </Stage2D>
  );
}
