/* Lesson: Composition vs Inheritance — Choosing the Right Relationship
 * 2D animated: toggle between an is-a inheritance TREE (Vehicle→Car→SportsCar) and a
 * has-a composition assembly (Car contains Engine, Wheels, GPS). Auto-toggles. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

export default function PfCompositionVisualization() {
  const [mode, setMode] = useState('composition');
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setMode(m => m === 'composition' ? 'inheritance' : 'composition'), 3.0, auto);

  return (
    <Stage2D
      title="Composition vs Inheritance"
      subtitle='Inheritance says "Car IS-A Vehicle" (a tree). Composition says "Car HAS-A Engine, Wheels" (an assembly). Toggle and compare.'
      accent="#f97316"
      viewBox="0 0 640 250"
      controls={
        <>
          <button className={`pf2d-btn ${mode === 'inheritance' ? 'pf2d-btn--on' : ''}`} onClick={() => setMode('inheritance')}>is-a (inheritance)</button>
          <button className={`pf2d-btn ${mode === 'composition' ? 'pf2d-btn--on' : ''}`} onClick={() => setMode('composition')}>has-a (composition)</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={mode === 'inheritance'
        ? <>The vertical tree: Car inherits everything Vehicle defines — great when the relationship truly is "is-a". But deep trees turn rigid: change Vehicle and every descendant shakes. A LinkedStack <em>is not</em> a LinkedList — don't inherit just to reuse code.</>
        : <>The horizontal assembly: Car <em>contains</em> parts and delegates (<code>self.engine.start()</code>). Swap parts freely. Rule of thumb: <strong>favor composition</strong>; reserve inheritance for genuine is-a. A Stack HAS-A list inside — that's composition.</>}
    >
      {mode === 'inheritance' ? (
        <g className="pf2d-fade">
          {[{ n: 'Vehicle', y: 24, c: '#58a6ff' }, { n: 'Car', y: 96, c: '#f97316' }, { n: 'SportsCar', y: 168, c: '#f85149' }].map((b, i) => (
            <g key={b.n} className="pf2d-pop" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
              {i > 0 && <line x1="320" y1={b.y - 22} x2="320" y2={b.y} stroke="#8b949e" strokeWidth="2" />}
              <rect x="200" y={b.y} width="240" height="50" rx="10" fill={b.c} />
              <text x="320" y={b.y + 31} fill="#0d1117" fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{b.n}</text>
              {i > 0 && <text x="340" y={b.y - 6} fill="#8b949e" fontSize="11" fontFamily="system-ui">is-a</text>}
            </g>
          ))}
        </g>
      ) : (
        <g className="pf2d-fade">
          <rect x="90" y="70" width="460" height="150" rx="14" fill="#f97316" opacity="0.1" stroke="#f97316" strokeWidth="2" />
          <text x="320" y="58" fill="#f97316" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">class Car  (the whole)</text>
          {[{ n: 'Engine', x: 130, c: '#56d364', m: 'start()' }, { n: 'Wheel ×4', x: 270, c: '#58a6ff', m: 'spin()' }, { n: 'GPS', x: 410, c: '#a78bfa', m: 'route()' }].map(p => (
            <g key={p.n} className="pf2d-pop" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
              <rect x={p.x} y="110" width="120" height="72" rx="12" fill={p.c} />
              <text x={p.x + 60} y="142" fill="#0d1117" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{p.n}</text>
              <text x={p.x + 60} y="164" fill="#0d1117" fontSize="12" textAnchor="middle" fontFamily="Consolas">{p.m}</text>
              <text x={p.x + 60} y="102" fill="#c9d1d9" fontSize="11" textAnchor="middle" fontFamily="system-ui">has-a</text>
            </g>
          ))}
        </g>
      )}
    </Stage2D>
  );
}
