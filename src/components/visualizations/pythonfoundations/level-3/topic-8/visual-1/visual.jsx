/* Lesson: Dunder Methods — __init__, __str__, and __repr__
 * 2D animated: the syntax you write flows through Python and is routed to a __dunder__
 * method on your class, producing the output. Auto-cycles the triggers. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

const TRIG = {
  'Point(2, 3)': { d: '__init__', out: 'a new Point' },
  'print(p)': { d: '__str__', out: '"(2, 3)"' },
  'repr(p)': { d: '__repr__', out: '"Point(x=2, y=3)"' },
  'len(path)': { d: '__len__', out: '4' },
  'p == q': { d: '__eq__', out: 'True' },
};
const KEYS = Object.keys(TRIG);

export default function PfDunderMethodsVisualization() {
  const [trig, setTrig] = useState('print(p)');
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setTrig(v => KEYS[(KEYS.indexOf(v) + 1) % KEYS.length]), 2.2, auto);
  const t = TRIG[trig];

  return (
    <Stage2D
      title="Dunder methods: Python's hidden hooks"
      subtitle="You write the pretty syntax on the left — Python secretly routes it to a __dunder__ method on your class."
      accent="#a78bfa"
      viewBox="0 0 640 240"
      controls={
        <>
          <div className="pf2d-group">{KEYS.map(k => <button key={k} className={`pf2d-btn ${trig === k ? 'pf2d-btn--on' : ''}`} onClick={() => setTrig(k)}>{k}</button>)}</div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="pf2d-readout">{trig} → {t.d} → {t.out}</span>
        </>
      }
      legend={<>Implementing dunders is how your classes join the language: define <code>__eq__</code> and <code>==</code> works; define <code>__len__</code> and <code>len()</code> works. Rule of thumb — <code>__str__</code> for humans, <code>__repr__</code> for developers (something you could paste back into code).</>}
    >
      {/* syntax */}
      <rect x="30" y="70" width="150" height="56" rx="10" fill="#58a6ff" />
      <text x="105" y="104" fill="#0d1117" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{trig}</text>
      <text x="105" y="60" fill="#58a6ff" fontSize="11" textAnchor="middle" fontFamily="system-ui">what you write</text>
      {/* arrow */}
      <line x1="180" y1="98" x2="248" y2="98" stroke="#8b949e" strokeWidth="2.5" className="pf2d-flow" /><polygon points="248,92 260,98 248,104" fill="#8b949e" />
      {/* python */}
      <rect x="264" y="76" width="112" height="44" rx="10" fill="#a78bfa" opacity="0.3" stroke="#a78bfa" className="pf2d-pulse" />
      <text x="320" y="103" fill="#a78bfa" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">Python</text>
      <line x1="380" y1="98" x2="448" y2="98" stroke="#8b949e" strokeWidth="2.5" className="pf2d-flow" /><polygon points="448,92 460,98 448,104" fill="#8b949e" />
      {/* dunder */}
      <rect x="464" y="70" width="150" height="56" rx="10" fill="#a78bfa" />
      <text x="539" y="104" fill="#0d1117" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{t.d}</text>
      <text x="539" y="60" fill="#a78bfa" fontSize="11" textAnchor="middle" fontFamily="system-ui">method on YOUR class</text>
      {/* output */}
      <rect x="230" y="164" width="180" height="44" rx="10" fill="#0d2818" stroke="#238636" className="pf2d-fade" />
      <text x="320" y="192" fill="#56d364" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">→ {t.out}</text>
    </Stage2D>
  );
}
