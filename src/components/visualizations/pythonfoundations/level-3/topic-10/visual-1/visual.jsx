/* Lesson: Polymorphism — One Interface, Many Behaviors
 * 2D animated: one identical speak() call broadcasts to three different objects, each
 * answering in its own way. Auto-repeats the broadcast. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

const ANIMALS = [{ cls: 'Dog', x: 110, c: '#56d364', say: 'Woof!' }, { cls: 'Cat', x: 320, c: '#a78bfa', say: 'Meow!' }, { cls: 'Duck', x: 530, c: '#ffd43b', say: 'Quack!' }];

export default function PfPolymorphismVisualization() {
  const [on, setOn] = useState(false);
  const [auto, setAuto] = useState(true);
  const broadcast = () => { setOn(true); setTimeout(() => setOn(false), 1600); };
  useAutoPlay(broadcast, 2.8, auto);

  return (
    <Stage2D
      title="Polymorphism: one call, many answers"
      subtitle="for animal in animals: animal.speak() — the SAME line, and each object responds with its own behavior."
      accent="#a78bfa"
      viewBox="0 0 640 250"
      controls={
        <>
          <button className="pf2d-btn pf2d-btn--primary" onClick={broadcast}>▶ for a in animals: a.speak()</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="pf2d-readout">{on ? 'Woof! · Meow! · Quack!' : 'one loop, zero isinstance checks'}</span>
        </>
      }
      legend={<>The caller doesn't ask <em>what</em> each object is — it just calls <code>speak()</code> and trusts each class to do the right thing. That's why <code>for shape in shapes: total += shape.area()</code> works for circles, squares and triangles alike. Python's <strong>duck typing</strong> goes further: any object with a <code>speak()</code> method fits — "if it quacks like a duck…"</>}
    >
      {/* single call site */}
      <rect x="220" y="18" width="200" height="42" rx="10" fill="#161b22" stroke="#a78bfa" />
      <text x="320" y="45" fill="#a78bfa" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">animal.speak() ×1</text>
      {ANIMALS.map(a => (
        <g key={a.cls}>
          {on && <line x1="320" y1="60" x2={a.x} y2="120" stroke={a.c} strokeWidth="2" className="pf2d-flow" opacity="0.7" />}
          <circle cx={a.x} cy="150" r="42" fill={a.c} className={on ? 'pf2d-pulse' : ''} />
          <text x={a.x} y="156" fill="#0d1117" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{a.cls}</text>
          {on && <g className="pf2d-pop" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
            <rect x={a.x - 40} y="98" width="80" height="28" rx="14" fill="#e6edf3" />
            <text x={a.x} y="117" fill="#0d1117" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{a.say}</text>
          </g>}
          <text x={a.x} y="212" fill={a.c} fontSize="12" textAnchor="middle" fontFamily="Consolas">.speak()</text>
        </g>
      ))}
    </Stage2D>
  );
}
