/* Lesson: Inheritance — Reusing and Extending Code
 * 2D animated INHERITANCE TREE: Puppy → Dog → Animal. Calling a method makes the lookup
 * climb the tree, highlighting the path until it finds (or fails to find) the method. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

const CALLS = {
  'dog.speak()': { path: ['Dog'], found: 'Dog', out: '"Woof!" — overridden in Dog' },
  'dog.eat()': { path: ['Dog', 'Animal'], found: 'Animal', out: '"eating…" — inherited from Animal' },
  'puppy.speak()': { path: ['Puppy', 'Dog'], found: 'Dog', out: '"Woof!" — found one level up' },
  'puppy.fly()': { path: ['Puppy', 'Dog', 'Animal'], found: null, out: '💥 AttributeError' },
};
const NODES = { Animal: { y: 40, m: 'eat() · sleep()', ext: '' }, Dog: { y: 120, m: 'speak() ← override', ext: '(Animal)' }, Puppy: { y: 200, m: '(nothing new)', ext: '(Dog)' } };
const CK = Object.keys(CALLS);

export default function PfInheritanceVisualization() {
  const [call, setCall] = useState('dog.eat()');
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setCall(v => CK[(CK.indexOf(v) + 1) % CK.length]), 2.3, auto);
  const c = CALLS[call];

  return (
    <Stage2D
      title="Inheritance: the lookup climbs the tree"
      subtitle="Puppy(Dog) · Dog(Animal). Call a method — Python searches the object's class first, then climbs parent by parent (the MRO)."
      accent="#56d364"
      viewBox="0 0 640 260"
      controls={
        <>
          <div className="pf2d-group">{CK.map(k => <button key={k} className={`pf2d-btn ${call === k ? 'pf2d-btn--on' : ''}`} onClick={() => setCall(k)}>{k}</button>)}</div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="pf2d-readout">{c.out}</span>
        </>
      }
      legend={c.found
        ? <>Search order: {c.path.join(' → ')} — found in <strong>{c.found}</strong>. A child <em>overrides</em> by redefining a name (Dog's <code>speak</code> shadows the parent); everything else is <em>inherited free</em>. Need the parent too? <code>super().speak()</code>.</>
        : <>The lookup climbed the whole chain — {c.path.join(' → ')} → object — and found nothing, so Python raises <strong>AttributeError</strong>. Inheritance only reuses what some ancestor actually defines.</>}
    >
      {/* edges */}
      <line x1="200" y1="90" x2="200" y2="120" stroke="#8b949e" strokeWidth="2" />
      <line x1="200" y1="170" x2="200" y2="200" stroke="#8b949e" strokeWidth="2" />
      <text x="214" y="108" fill="#8b949e" fontSize="11" fontFamily="system-ui">is-a</text>
      <text x="214" y="188" fill="#8b949e" fontSize="11" fontFamily="system-ui">is-a</text>
      {Object.entries(NODES).map(([name, n]) => {
        const visited = c.path.includes(name); const isFound = c.found === name;
        return (
          <g key={name} className="pf2d-fade">
            <rect x="40" y={n.y} width="320" height="50" rx="10"
              fill={isFound ? '#56d364' : visited ? '#ffd43b' : '#161b22'} opacity={visited || isFound ? 1 : 0.6}
              stroke={isFound ? '#56d364' : visited ? '#ffd43b' : '#30363d'} strokeWidth="2" className={isFound ? 'pf2d-pulse' : ''} />
            <text x="56" y={n.y + 24} fill={visited || isFound ? '#0d1117' : '#e6edf3'} fontSize="15" fontWeight="700" fontFamily="Consolas">class {name}{n.ext}</text>
            <text x="56" y={n.y + 42} fill={visited || isFound ? '#0d1117' : '#8b949e'} fontSize="11" fontFamily="Consolas">{n.m}</text>
          </g>
        );
      })}
      {/* climb pointer */}
      <g style={{ transform: `translate(384px, ${NODES[c.path[c.path.length - 1]] ? NODES[c.path[c.path.length - 1]].y + 25 : 225}px)`, transition: 'transform .5s cubic-bezier(.4,1.1,.5,1)' }}>
        <polygon points="0,-9 0,9 -14,0" fill={c.found ? '#56d364' : '#f85149'} className="pf2d-pulse" />
      </g>
      {!c.found && <text x="470" y="120" fill="#f85149" fontSize="14" textAnchor="middle" fontFamily="system-ui">AttributeError</text>}
    </Stage2D>
  );
}
