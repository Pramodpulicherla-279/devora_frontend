/* Lesson: Inserting Words Into a Trie
 * 2D animated: insert "care" — walk the existing c–a–r path (reused), then create a new 'e'
 * node and mark it end. Shows how insertion reuses shared prefixes. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';
import { TRIE, nodeAt } from '../../../../_dsa-shared/trieData';

// existing path for "car" = 0,1,2,4 ; new node 'e' (id 9) under r(4)
const NEW = { id: 9, ch: 'e', x: 360, y: 305, parent: 4, end: true };
const WORD = 'care';
const STEPS = [
  { d: 0, msg: 'start at root' },
  { d: 1, msg: "'c' exists → reuse" },
  { d: 2, msg: "'a' exists → reuse" },
  { d: 3, msg: "'r' exists → reuse" },
  { d: 4, msg: "'e' missing → create node", create: true },
  { d: 5, msg: 'mark is_end = True → "care" stored', mark: true },
];
const PATH = [0, 1, 2, 4, 9];

export default function TrieInsertVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v >= STEPS.length - 1 ? 0 : v + 1)), 1.0, auto);
  const s = STEPS[i];
  const litCount = s.d;                     // how many chars of PATH matched/created
  const created = s.d >= 4;
  const nodes = created ? [...TRIE, NEW] : TRIE;

  return (
    <Stage2D
      title='Inserting "care" Into the Trie'
      subtitle="Insertion walks character by character. If the child exists, reuse it; if not, create a new node. Mark the final node as the end of a word."
      accent="#56d364"
      viewBox="0 0 640 350"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v >= STEPS.length - 1 ? 0 : v + 1))}>step ▶</button>
          <button className="dsa2d-btn" onClick={() => setI(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{s.msg}</span>
        </>
      }
      legend={<>Because "car" already exists, inserting "care" only adds <strong>one</strong> node (<code>e</code>) — the shared prefix costs nothing. Insertion is <code>O(L)</code> for a word of length L, regardless of how many words the trie already holds.</>}
    >
      {/* progress spelling */}
      {WORD.split('').map((c, k) => <text key={k} x={250 + k * 32} y="28" fill={k < litCount ? '#7ee787' : '#6e7681'} fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{c}</text>)}

      {nodes.filter(n => n.parent !== null).map(n => {
        const idx = PATH.indexOf(n.id), pidx = PATH.indexOf(n.parent);
        const on = idx !== -1 && idx <= litCount && pidx !== -1;
        const isNew = n.id === 9;
        const p = nodeAt(n.parent) || (n.parent === 4 ? nodeAt(4) : null);
        return <line key={n.id} x1={p.x} y1={p.y} x2={n.x} y2={n.y} stroke={isNew ? (created ? '#ffd43b' : 'transparent') : on ? '#56d364' : '#30363d'} strokeWidth={on || isNew ? 3.5 : 2} style={{ transition: 'stroke .3s' }} />;
      })}
      {nodes.map(n => {
        const idx = PATH.indexOf(n.id);
        const on = idx !== -1 && idx <= litCount;
        const isNew = n.id === 9;
        const marked = isNew && s.mark;
        return (
          <g key={n.id} style={{ opacity: isNew && !created ? 0 : 1, transition: 'opacity .3s' }}>
            <circle cx={n.x} cy={n.y} r="18" fill={isNew ? (marked ? '#56d364' : '#ffd43b') : on ? 'rgba(86,211,100,.25)' : '#161b22'} stroke={n.end || marked ? '#56d364' : on ? '#3fb950' : '#8b949e'} strokeWidth={n.end || marked ? 3 : 2} className={(isNew && idx === litCount) || (on && idx === litCount) ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s' }} />
            <text x={n.x} y={n.y + 5} fill={isNew && !marked ? '#0d1117' : '#e6edf3'} fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{n.ch}</text>
          </g>
        );
      })}
      <text x="320" y="344" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">yellow = newly created node · green ring = end of word</text>
    </Stage2D>
  );
}
