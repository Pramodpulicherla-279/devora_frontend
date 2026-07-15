/* Lesson: Spell Checkers and Dictionary Lookups
 * 2D animated: check a word against the trie. If the walk falls off the tree, the word is
 * misspelled — suggest the closest dictionary word (edit distance 1). */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';
import { TRIE, nodeAt, walk } from '../../../../_dsa-shared/trieData';

const QUERIES = [
  { w: 'car', ok: true, suggest: null },
  { w: 'cet', ok: false, suggest: 'cat' },
  { w: 'dof', ok: false, suggest: 'dog' },
];
export default function TrieSpellcheckVisualization() {
  const [qi, setQi] = useState(0);
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  const q = QUERIES[qi];
  const res = walk(q.w);
  const failAt = res.path.length;              // index where it fell off (if < len)
  const maxStep = q.w.length + 1;
  useAutoPlay(() => setStep(s => { if (s >= maxStep) { setQi(x => (x + 1) % QUERIES.length); return 0; } return s + 1; }), 0.85, auto, [qi]);
  const litPath = res.path.slice(0, Math.min(step, res.path.length));
  const done = step >= maxStep;
  const misspelled = !res.matched || !res.endHit;

  return (
    <Stage2D
      title="Spell Check With a Trie"
      subtitle="A dictionary trie makes 'is this a real word?' an O(L) walk. If the path breaks — or ends on a non-word node — flag it and suggest the nearest valid word."
      accent="#f0883e"
      viewBox="0 0 640 350"
      controls={
        <>
          {QUERIES.map((qq, k) => <button key={qq.w} className={`dsa2d-btn ${k === qi ? 'dsa2d-btn--on' : ''}`} onClick={() => { setQi(k); setStep(0); }}>"{qq.w}"</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          {done && <span className="dsa2d-readout" style={{ color: misspelled ? '#f0883e' : '#56d364' }}>{misspelled ? `did you mean "${q.suggest}"?` : 'correct ✓'}</span>}
        </>
      }
      legend={<>Walk the letters: a missing child means the word isn't in the dictionary. Real spell-checkers then search the trie for words within a small <strong>edit distance</strong> (one insert/delete/substitute) and rank them as suggestions. Here <code>"{q.w}"</code>{misspelled ? <> → <strong>{q.suggest}</strong></> : <> is valid</>}.</>}
    >
      {q.w.split('').map((c, k) => {
        const matched = k < res.path.length - 1 || (res.matched && k < q.w.length);
        const isFail = !res.matched && k === failAt - 1 + 0 && k === res.path.length - 1;
        return <text key={k} x={270 + k * 30} y="30" fill={k < step ? (k < res.path.length - 1 || res.matched ? '#79c0ff' : '#f85149') : '#484f58'} fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{c}</text>;
      })}
      {TRIE.filter(n => n.parent !== null).map(n => {
        const on = litPath.includes(n.id) && litPath.includes(n.parent);
        const p = nodeAt(n.parent);
        return <line key={n.id} x1={p.x} y1={p.y + 20} x2={n.x} y2={n.y + 20} stroke={on ? '#58a6ff' : '#30363d'} strokeWidth={on ? 3 : 2} style={{ transition: 'stroke .3s' }} />;
      })}
      {TRIE.map(n => {
        const on = litPath.includes(n.id);
        const isSuggest = done && misspelled && q.suggest && walk(q.suggest).path.includes(n.id) && nodeAt(n.id).end;
        return (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y + 20} r="17" fill={isSuggest ? '#f0883e' : on ? 'rgba(88,166,255,.25)' : '#161b22'} stroke={n.end ? '#56d364' : on ? '#58a6ff' : '#8b949e'} strokeWidth={n.end ? 3 : 2} className={isSuggest || litPath[litPath.length - 1] === n.id ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s' }} />
            <text x={n.x} y={n.y + 25} fill={isSuggest ? '#0d1117' : '#e6edf3'} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{n.ch}</text>
          </g>
        );
      })}
      {done && (
        <g className="dsa2d-fade">
          <rect x="200" y="300" width="240" height="38" rx="10" fill={misspelled ? 'rgba(240,136,62,.14)' : 'rgba(86,211,100,.14)'} stroke={misspelled ? '#f0883e' : '#56d364'} />
          <text x="320" y="324" fill={misspelled ? '#f8c088' : '#7ee787'} fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{misspelled ? `✗ misspelled → ${q.suggest}` : '✓ valid word'}</text>
        </g>
      )}
    </Stage2D>
  );
}
