/* Lesson: Instance Variables vs Class Variables
 * 2D animated: one shared class-var slab wired to all objects, vs each object's own
 * instance var. Mutating a class var changes all; instance vars stay personal. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

const CATS = [{ name: 'tom', x: 110, c: '#58a6ff' }, { name: 'felix', x: 320, c: '#56d364' }, { name: 'milo', x: 530, c: '#f97316' }];

export default function PfInstanceClassVarsVisualization() {
  const [species, setSpecies] = useState('Cat');
  const [lives, setLives] = useState({ tom: 9, felix: 9, milo: 9 });
  const [log, setLog] = useState('class var is SHARED · instance vars are personal');
  const [auto, setAuto] = useState(true);
  const [seq, setSeq] = useState(0);
  const lose = n => { setLives(l => ({ ...l, [n]: Math.max(0, l[n] - 1) })); setLog(`${n}.lives -= 1 — only ${n} changed`); };
  const rename = () => { setSpecies(s => s === 'Cat' ? 'Felis catus' : 'Cat'); setLog('Cat.species changed — ALL objects see it'); };
  const reset = () => { setSpecies('Cat'); setLives({ tom: 9, felix: 9, milo: 9 }); setLog('reset'); };
  useAutoPlay(() => { [() => lose('tom'), () => lose('felix'), rename, () => lose('milo'), reset][seq % 5](); setSeq(s => s + 1); }, 1.9, auto, [seq]);

  return (
    <Stage2D
      title="Instance vs class variables"
      subtitle="species lives ON THE CLASS (one shared slab). lives lives ON EACH OBJECT (personal). Mutate both and compare."
      accent="#a78bfa"
      viewBox="0 0 640 250"
      controls={
        <>
          <button className="pf2d-btn pf2d-btn--primary" onClick={rename}>Cat.species = …</button>
          {CATS.map(c => <button key={c.name} className="pf2d-btn" onClick={() => lose(c.name)}>{c.name}.lives-=1</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="pf2d-readout">{log}</span>
        </>
      }
      legend={<>Lookup checks the <strong>object first</strong>, then the class — so reading <code>tom.species</code> finds the shared slab. But <em>assigning</em> <code>tom.species=…</code> creates a personal copy that shadows it (classic gotcha). Mutable class variables (a shared list) are the sneakiest bug: every instance appends into the same list.</>}
    >
      {/* shared class slab */}
      <rect x="120" y="18" width="400" height="44" rx="10" fill="#a78bfa" />
      <text x="320" y="46" fill="#0d1117" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">Cat.species = "{species}"  (shared)</text>
      {CATS.map(c => (
        <g key={c.name} className="pf2d-fade">
          <line x1="320" y1="62" x2={c.x} y2="120" stroke="#a78bfa" strokeWidth="1.5" opacity="0.5" />
          <rect x={c.x - 55} y="120" width="110" height="76" rx="12" fill={c.c} />
          <text x={c.x} y="150" fill="#0d1117" fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{c.name}</text>
          <text x={c.x} y="176" fill="#0d1117" fontSize="14" textAnchor="middle" fontFamily="Consolas">lives = {lives[c.name]}</text>
          <text x={c.x} y="216" fill={lives[c.name] < 9 ? '#f85149' : '#8b949e'} fontSize="11" textAnchor="middle" fontFamily="system-ui">instance var</text>
        </g>
      ))}
    </Stage2D>
  );
}
