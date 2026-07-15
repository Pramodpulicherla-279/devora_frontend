/* Lesson: The self Keyword, Finally Explained Without Confusion
 * 2D animated: one shared bark() method; calling it on a dog sends a spotlight to that
 * dog — self is simply "the caller". Auto-cycles which dog calls. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

const DOGS = [{ name: 'rex', x: 110, c: '#58a6ff' }, { name: 'buddy', x: 320, c: '#56d364' }, { name: 'luna', x: 530, c: '#a78bfa' }];

export default function PfSelfKeywordVisualization() {
  const [caller, setCaller] = useState('rex');
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setCaller(c => { const n = DOGS.map(d => d.name); return n[(n.indexOf(c) + 1) % n.length]; }), 2.0, auto);
  const d = DOGS.find(x => x.name === caller);

  return (
    <Stage2D
      title="self: a pointer to the caller"
      subtitle="ONE bark() method exists on the class. self is just 'whichever object the call came from' — watch the spotlight follow it."
      accent="#ffd43b"
      viewBox="0 0 640 250"
      controls={
        <>
          {DOGS.map(dog => <button key={dog.name} className={`pf2d-btn ${caller === dog.name ? 'pf2d-btn--on' : ''}`} onClick={() => setCaller(dog.name)}>{dog.name}.bark()</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="pf2d-readout">{d.name} says woof! (self is {d.name})</span>
        </>
      }
      legend={<><code>rex.bark()</code> is sugar for <code>Dog.bark(rex)</code> — Python passes the caller in as the first parameter, named <code>self</code> by convention. Not magic, just the slot that receives <em>this</em> object. That's why <code>f"{'{self.name}'} says woof!"</code> prints a different name for each dog.</>}
    >
      {/* shared method */}
      <rect x="220" y="18" width="200" height="42" rx="10" fill="#161b22" stroke="#ffd43b" />
      <text x="320" y="44" fill="#ffd43b" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">def bark(self): ×1</text>
      {/* spotlight beam */}
      <line x1="320" y1="60" x2={d.x} y2="130" stroke="#ffd43b" strokeWidth="3" className="pf2d-flow" />
      {DOGS.map(dog => {
        const lit = caller === dog.name;
        return (
          <g key={dog.name} className="pf2d-fade">
            <rect x={dog.x - 55} y="130" width="110" height="80" rx="12" fill={dog.c} opacity={lit ? 1 : 0.4} stroke={dog.c} strokeWidth="2" className={lit ? 'pf2d-pulse' : ''} />
            <text x={dog.x} y="172" fill="#0d1117" fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{dog.name}</text>
            <text x={dog.x} y="196" fill="#0d1117" fontSize="11" textAnchor="middle" fontFamily="Consolas">Dog object</text>
            {lit && <text x={dog.x} y="124" fill="#ffd43b" fontSize="13" textAnchor="middle" fontFamily="Consolas">self → {dog.name}</text>}
          </g>
        );
      })}
    </Stage2D>
  );
}
