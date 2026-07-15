/* Lesson: Searching for Words and Prefixes
 * 2D animated: cycle through three queries — "car" (a stored WORD), "ca" (a PREFIX only), and
 * "cab" (NOT present). Walk the trie and show how is_end distinguishes word from prefix. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';
import { TRIE, nodeAt, walk } from '../../../../_dsa-shared/trieData';

const QUERIES = ['car', 'ca', 'cab'];
export default function TrieSearchVisualization() {
  const [qi, setQi] = useState(0);
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  const q = QUERIES[qi];
  const res = walk(q);
  const maxStep = q.length;
  useAutoPlay(() => setStep(s => { if (s >= maxStep) { setQi(x => (x + 1) % QUERIES.length); return 0; } return s + 1; }), 0.9, auto, [qi]);
  const litPath = res.path.slice(0, step + 1);
  const done = step >= maxStep;
  const verdict = !res.matched ? 'not found' : res.endHit ? 'WORD found ✓' : 'prefix only (not a word)';
  const vcol = !res.matched ? '#f85149' : res.endHit ? '#56d364' : '#f0883e';

  return (
    <Stage2D
      title="Searching: Word vs Prefix"
      subtitle="Walk the trie one character at a time. Falling off the tree means 'not present'. Reaching the end means the prefix exists — but it's only a stored WORD if is_end is True."
      accent="#58a6ff"
      viewBox="0 0 640 350"
      controls={
        <>
          {QUERIES.map((w, k) => <button key={w} className={`dsa2d-btn ${k === qi ? 'dsa2d-btn--on' : ''}`} onClick={() => { setQi(k); setStep(0); }}>"{w}"</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          {done && <span className="dsa2d-readout" style={{ color: vcol }}>{verdict}</span>}
        </>
      }
      legend={<><code>search("car")</code> ends on a node with <code>is_end=True</code> → it's a word. <code>startsWith("ca")</code> reaches a node but <code>is_end=False</code> → a valid prefix, not a stored word. <code>search("cab")</code> can't find child <code>'b'</code> → absent. All are <code>O(L)</code>.</>}
    >
      {q.split('').map((c, k) => <text key={k} x={280 + k * 30} y="28" fill={k < step ? (res.path.length > k + 1 ? '#79c0ff' : '#f85149') : '#484f58'} fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{c}</text>)}
      {TRIE.filter(n => n.parent !== null).map(n => {
        const idx = litPath.indexOf(n.id);
        const on = idx !== -1 && litPath.includes(n.parent);
        const p = nodeAt(n.parent);
        return <line key={n.id} x1={p.x} y1={p.y} x2={n.x} y2={n.y} stroke={on ? '#58a6ff' : '#30363d'} strokeWidth={on ? 3.5 : 2} style={{ transition: 'stroke .3s' }} />;
      })}
      {TRIE.map(n => {
        const on = litPath.includes(n.id);
        const isTip = litPath[litPath.length - 1] === n.id && done;
        return (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r="18" fill={isTip ? vcol : on ? 'rgba(88,166,255,.25)' : '#161b22'} stroke={n.end ? '#56d364' : on ? '#58a6ff' : '#8b949e'} strokeWidth={n.end ? 3 : 2} className={litPath[Math.min(step, litPath.length - 1)] === n.id ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s' }} />
            <text x={n.x} y={n.y + 5} fill={isTip ? '#0d1117' : '#e6edf3'} fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{n.ch}</text>
          </g>
        );
      })}
      <text x="320" y="344" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">green ring = is_end (a real word ends there)</text>
    </Stage2D>
  );
}
