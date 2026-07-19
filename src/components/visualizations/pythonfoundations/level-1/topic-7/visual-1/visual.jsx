/* Lesson: Writing Clean, Readable Python
 * 2D animated: toggle four clean-code practices and watch a messy code card transform
 * into clean code while a readability meter fills. Auto-cycles the practices on. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

const P = [
  { key: 'names', label: 'Descriptive names', bad: 'x2 = a * t', good: 'total = price * tax' },
  { key: 'spacing', label: 'PEP 8 spacing', bad: 'if(x>0):y=x+1', good: 'if x > 0:  y = x + 1' },
  { key: 'comments', label: 'Explain the WHY', bad: '#add 1', good: '# skip header row' },
  { key: 'small', label: 'Small functions', bad: '1 func · 80 lines', good: '4 funcs · ~15 lines' },
];

export default function PfCleanCodeVisualization() {
  const [on, setOn] = useState({});
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setOn(s => {
    const off = P.find(p => !s[p.key]);
    return off ? { ...s, [off.key]: true } : {};
  }), 1.5, auto);
  const score = Object.values(on).filter(Boolean).length;

  return (
    <Stage2D
      title="Clean, Readable Python"
      subtitle="Each habit you switch on rewrites a line of messy code into clean code and fills the readability meter."
      accent="#56d364"
      viewBox="0 0 640 300"
      controls={
        <>
          <div className="pf2d-group">
            {P.map(p => <button key={p.key} className={`pf2d-btn ${on[p.key] ? 'pf2d-btn--on' : ''}`} onClick={() => setOn(s => ({ ...s, [p.key]: !s[p.key] }))}>{on[p.key] ? '✓ ' : ''}{p.label}</button>)}
          </div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="pf2d-readout">readability {score}/4{score === 4 ? ' — solid' : ''}</span>
        </>
      }
      legend={<>Readable code is a DSA superpower: when an algorithm breaks at 2am, <code>left_pointer</code> beats <code>x2</code>. All four green means the next developer (probably you) can actually follow the logic.</>}
    >
      {/* meter */}
      <text x="24" y="40" fill="#8b949e" fontSize="13" fontFamily="system-ui">readability</text>
      <rect x="24" y="50" width="592" height="18" rx="9" fill="#161b22" stroke="#21262d" />
      <rect x="24" y="50" width="592" height="18" rx="9" fill={score === 4 ? '#56d364' : score >= 2 ? '#ffd43b' : '#f85149'}
        style={{ transform: `scaleX(${score / 4})`, transformBox: 'fill-box', transformOrigin: 'left', transition: 'transform .5s, fill .3s' }} />
      {/* code lines */}
      {P.map((p, idx) => {
        const y = 96 + idx * 48;
        const clean = on[p.key];
        return (
          <g key={p.key} className="pf2d-fade">
            <rect x="24" y={y} width="592" height="38" rx="8" fill={clean ? '#0d2818' : '#2d1416'} stroke={clean ? '#238636' : '#6e2a2a'} />
            <text x="40" y={y + 24} fill={clean ? '#56d364' : '#f0a39f'} fontSize="15" fontFamily="Consolas">{clean ? p.good : p.bad}</text>
            <text x="600" y={y + 24} fill={clean ? '#56d364' : '#f85149'} fontSize="16" textAnchor="end">{clean ? '✓' : '✗'}</text>
          </g>
        );
      })}
    </Stage2D>
  );
}
