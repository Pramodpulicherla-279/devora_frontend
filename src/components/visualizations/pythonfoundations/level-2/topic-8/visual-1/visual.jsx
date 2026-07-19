/* Lesson: Choosing the Right Data Type for the Job
 * 2D animated decision flow: pick a scenario and an arrow routes from the question to
 * the correct container (list / tuple / dict / set), which lights up with the reason. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

const TYPES = { list: { x: 70, c: '#58a6ff', t: 'ordered · mutable' }, tuple: { x: 220, c: '#a78bfa', t: 'ordered · frozen' }, dict: { x: 370, c: '#ffd43b', t: 'key → value' }, set: { x: 520, c: '#56d364', t: 'unique · fast in' } };
const SCEN = {
  'Ordered tasks to process': { pick: 'list', why: 'need order, duplicates and edits' },
  '(x, y) coordinates': { pick: 'tuple', why: 'fixed pair that must not change' },
  'username → profile': { pick: 'dict', why: 'direct key-to-value in O(1)' },
  'visited graph nodes': { pick: 'set', why: 'O(1) membership + uniqueness' },
  'count word frequencies': { pick: 'dict', why: 'word → count mapping' },
};
const SKEYS = Object.keys(SCEN);

export default function PfChoosingTypeVisualization() {
  const [scen, setScen] = useState('visited graph nodes');
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setScen(v => SKEYS[(SKEYS.indexOf(v) + 1) % SKEYS.length]), 2.4, auto);
  const s = SCEN[scen];
  const tgt = TYPES[s.pick];

  return (
    <Stage2D
      title="Choosing the right data type"
      subtitle="The four workhorses. Pick a real scenario — an arrow routes to the container that fits, and it lights up with why."
      accent="#ffd43b"
      viewBox="0 0 640 250"
      controls={
        <>
          <div className="pf2d-group">{SKEYS.map(k => <button key={k} className={`pf2d-btn ${scen === k ? 'pf2d-btn--on' : ''}`} onClick={() => setScen(k)}>{k}</button>)}</div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={<><strong>{s.pick}</strong> — {s.why}. The drill: need <em>order</em>? list/tuple. Need it <em>frozen</em>? tuple. Need <em>lookup by key</em>? dict. Need <em>uniqueness / fast membership</em>? set. Choosing right here often IS the optimisation.</>}
    >
      {/* scenario */}
      <rect x="200" y="20" width="240" height="42" rx="10" fill="#161b22" stroke="#ffd43b" />
      <text x="320" y="47" fill="#ffd43b" fontSize="14" textAnchor="middle" fontFamily="system-ui">{scen}</text>
      {/* routing arrow */}
      <path d={`M320 62 L${tgt.x + 60} 150`} fill="none" stroke={tgt.c} strokeWidth="2.5" className="pf2d-flow" />
      <polygon points={`${tgt.x + 60},150 ${tgt.x + 54},140 ${tgt.x + 66},140`} fill={tgt.c} />
      {/* type cards */}
      {Object.entries(TYPES).map(([name, ty]) => {
        const on = name === s.pick;
        return (
          <g key={name} className="pf2d-fade">
            <rect x={ty.x} y="150" width="120" height="72" rx="12" fill={on ? ty.c : '#161b22'} stroke={ty.c} strokeWidth="2" className={on ? 'pf2d-pulse' : ''} />
            <text x={ty.x + 60} y="184" fill={on ? '#0d1117' : ty.c} fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{name}</text>
            <text x={ty.x + 60} y="206" fill={on ? '#0d1117' : '#8b949e'} fontSize="11" textAnchor="middle" fontFamily="system-ui">{ty.t}</text>
          </g>
        );
      })}
    </Stage2D>
  );
}
