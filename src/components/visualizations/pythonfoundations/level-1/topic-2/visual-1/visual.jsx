/* Lesson: Variables and Basic Data Types at a Glance
 * 2D animated: the variable name-tag points to a value box that morphs (colour + type
 * badge) as you re-assign — showing a variable is just a label bound to a value. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

const VALUES = [
  { label: '42', type: 'int', c: '#58a6ff', py: "type(x) → <class 'int'>" },
  { label: '3.14', type: 'float', c: '#56d364', py: "type(x) → <class 'float'>" },
  { label: '"hello"', type: 'str', c: '#ffd43b', py: "type(x) → <class 'str'>" },
  { label: 'True', type: 'bool', c: '#f97316', py: "type(x) → <class 'bool'>" },
  { label: 'None', type: 'NoneType', c: '#8b949e', py: "type(x) → <class 'NoneType'>" },
];

export default function PfVariablesTypesVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % VALUES.length), 2.1, auto);
  const v = VALUES[i];

  return (
    <Stage2D
      title="Variables & Basic Data Types"
      subtitle="A variable is a name-tag bound to a value. Re-assign it and the value — and its type — changes; Python is dynamically typed."
      accent="#58a6ff"
      viewBox="0 0 640 280"
      controls={
        <>
          <span className="pf2d-label">x =</span>
          <div className="pf2d-group">
            {VALUES.map((val, k) => <button key={val.type} className={`pf2d-btn ${i === k ? 'pf2d-btn--on' : ''}`} onClick={() => setI(k)}>{val.label}</button>)}
          </div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="pf2d-readout">{v.py}</span>
        </>
      }
      legend={<>The label <code>x</code> never changes — but what it points to does. The <em>value</em> carries the type, which is why <code>type(x)</code> reports a different class after each assignment. This flexibility is Python being <strong>dynamically typed</strong>.</>}
    >
      <g fontFamily="Consolas, monospace">
        {/* name tag */}
        <rect x="70" y="110" width="90" height="60" rx="10" fill="#161b22" stroke="#58a6ff" strokeWidth="2" />
        <text x="115" y="147" fill="#58a6ff" fontSize="28" textAnchor="middle" fontWeight="700">x</text>
        <text x="115" y="196" fill="#8b949e" fontSize="12" textAnchor="middle">name</text>
        {/* binding arrow (animated) */}
        <line x1="160" y1="140" x2="300" y2="140" stroke={v.c} strokeWidth="2.5" className="pf2d-flow" />
        <polygon points="300,134 312,140 300,146" fill={v.c} />
        <text x="228" y="128" fill="#c9d1d9" fontSize="12" textAnchor="middle" fontFamily="system-ui">points to</text>
        {/* value box (morphs) */}
        <g key={v.type} className="pf2d-pop" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          <rect x="320" y="96" width="200" height="88" rx="14" fill="#161b22" stroke={v.c} strokeWidth="2.5" className="pf2d-fade" />
          <text x="420" y="146" fill={v.c} fontSize="30" textAnchor="middle" fontWeight="700">{v.label}</text>
        </g>
        {/* type badge */}
        <rect x="360" y="196" width="120" height="30" rx="15" fill={v.c} className="pf2d-fade" />
        <text x="420" y="216" fill="#0d1117" fontSize="14" textAnchor="middle" fontWeight="700">{v.type}</text>
        <text x="420" y="72" fill="#c9d1d9" fontSize="12" textAnchor="middle" fontFamily="system-ui">value in memory</text>
      </g>
    </Stage2D>
  );
}
