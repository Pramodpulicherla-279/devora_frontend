/* Lesson: Python OOP Essentials for Test Frameworks
 * Concept: a class is a cookie-cutter (blueprint); an object is a cookie (instance). driver is an
 * object; find_element is a method it owns. The framework ahead (Driver Factory, Page Objects) is
 * built from classes + inheritance. Step: blueprint → stamp objects → inherit from a base. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const STEPS = [
  { log: 'a class is a blueprint (cookie cutter) — defined once' },
  { log: '__init__ stores state; methods are the actions it can do' },
  { log: 'stamp out objects (cookies) — each its own instance' },
  { log: 'inheritance: LoginPage extends BasePage and reuses its methods' },
];

export default function ApytestOopVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 2, auto);

  return (
    <Stage2D
      title="Classes & objects: the framework's building blocks"
      subtitle="The dot in driver.find_element() means driver is an OBJECT and find_element is its METHOD. A class is the cookie cutter; objects are the cookies. Everything in Phases 5–6 is built from these."
      accent="#f0883e"
      viewBox="0 0 640 250"
      controls={<>
        {STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{STEPS[i].log}</span>
      </>}
      legend={<>A <strong>class</strong> defines shape once (attributes = data via <code>__init__</code>, methods = actions); an <strong>object</strong> is a concrete instance you build from it. <strong>Inheritance</strong> lets a child class (LoginPage) reuse a parent’s methods (BasePage) and add its own — the exact pattern behind the Driver Factory and Page Object Model coming next. <code>self</code> refers to the current object.</>}
    >
      {/* the class blueprint */}
      <rect x="30" y="40" width="200" height="150" rx="12" fill="rgba(240,136,62,.1)" stroke="#f0883e" strokeWidth="2" strokeDasharray={i >= 3 ? '0' : '6 4'} />
      <text x="130" y="62" fill="#f8c088" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">class {i >= 3 ? 'LoginPage' : 'BasePage'}</text>
      <line x1="42" y1="72" x2="218" y2="72" stroke="#f0883e" strokeWidth="1" opacity="0.4" />
      <text x="46" y="94" fill={i >= 1 ? '#e6edf3' : '#6e7681'} fontSize="11" fontFamily="Consolas">__init__(self, driver)</text>
      <text x="46" y="112" fill={i >= 1 ? '#8b949e' : '#484f58'} fontSize="10" fontFamily="Consolas">  self.driver = driver</text>
      <text x="46" y="136" fill={i >= 1 ? '#79c0ff' : '#6e7681'} fontSize="11" fontFamily="Consolas">tap(locator)</text>
      <text x="46" y="154" fill={i >= 1 ? '#79c0ff' : '#6e7681'} fontSize="11" fontFamily="Consolas">type_text(loc, s)</text>
      {i >= 3 && <text x="46" y="176" fill="#7ee787" fontSize="11" fontFamily="Consolas">login(user, pw)  ← new</text>}
      <text x="130" y="206" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="system-ui">the cookie cutter</text>

      {/* objects stamped out */}
      {i >= 2 && [0, 1, 2].map(k => (
        <g key={k} className="dsa2d-pop">
          <rect x="300" y={44 + k * 50} width="180" height="40" rx="9" fill="#161b22" stroke="#f0883e" strokeWidth="1.5" />
          <text x="314" y={62 + k * 50} fill="#e6edf3" fontSize="11.5" fontFamily="Consolas">page{k + 1} = LoginPage(drv)</text>
          <text x="314" y={78 + k * 50} fill="#8b949e" fontSize="9.5" fontFamily="system-ui">object · own state, shared methods</text>
        </g>
      ))}
      {i >= 2 && <text x="390" y="212" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="system-ui">the cookies (instances)</text>}
      {i >= 2 && <path d="M 232 115 L 298 90" stroke="#f0883e" strokeWidth="2" markerEnd="url(#apy-a)" />}
      <defs><marker id="apy-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#f0883e" /></marker></defs>

      {/* inheritance arrow */}
      {i >= 3 && (
        <g className="dsa2d-fade">
          <rect x="500" y="60" width="120" height="60" rx="10" fill="rgba(88,166,255,.1)" stroke="#58a6ff" strokeWidth="1.5" />
          <text x="560" y="84" fill="#79c0ff" fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="Consolas">BasePage</text>
          <text x="560" y="104" fill="#8b949e" fontSize="9.5" textAnchor="middle" fontFamily="system-ui">shared methods</text>
          <path d="M 500 90 L 232 90" stroke="#58a6ff" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#apy-b)" opacity="0.7" />
          <text x="365" y="82" fill="#58a6ff" fontSize="10" textAnchor="middle" fontFamily="system-ui">inherits ↑</text>
          <marker id="apy-b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#58a6ff" /></marker>
        </g>
      )}
    </Stage2D>
  );
}
