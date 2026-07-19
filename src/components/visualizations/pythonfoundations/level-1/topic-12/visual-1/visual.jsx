/* Lesson: Input and Output — Talking to the User From Your Code
 * 2D animated pipeline: a value packet flows input() → int() → age+1 → print(). Type a
 * real value; non-numeric input makes int() throw. Auto-steps through the pipe. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

const STATIONS = [
  { x: 60, label: 'input()', c: '#ffd43b', desc: 'reads a line → str' },
  { x: 210, label: 'int(...)', c: '#58a6ff', desc: 'str → number' },
  { x: 360, label: 'age + 1', c: '#a78bfa', desc: 'your logic' },
  { x: 510, label: 'print()', c: '#56d364', desc: 'to the screen' },
];

export default function PfInputOutputVisualization() {
  const [raw, setRaw] = useState('17');
  const [stage, setStage] = useState(0);
  const [auto, setAuto] = useState(true);
  const isNum = /^-?\d+$/.test(raw.trim());
  const willCrash = stage >= 1 && !isNum;
  useAutoPlay(() => setStage(s => (willCrash ? 0 : (s + 1) % 4)), 1.6, auto, [willCrash]);
  const num = isNum ? parseInt(raw.trim(), 10) : null;
  const packets = [`"${raw}" (str)`, isNum ? `${num} (int)` : 'ValueError', isNum ? `${num + 1}` : '—', isNum ? `you'll be ${num + 1}` : '—'];

  return (
    <Stage2D
      title="Input & Output pipeline"
      subtitle={'age = int(input("Age? "))  →  print(f"Next year: {age+1}"). Watch a value flow through the pipe.'}
      accent="#56d364"
      viewBox="0 0 640 250"
      controls={
        <>
          <div className="pf2d-group"><span className="pf2d-label">user types:</span>
            <input className="pf2d-input" value={raw} onChange={e => { setRaw(e.target.value); setStage(0); }} /></div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <button className="pf2d-btn" onClick={() => setStage(0)}>↺</button>
          <span className="pf2d-readout">{willCrash ? `int("${raw}") 💥` : packets[stage]}</span>
        </>
      }
      legend={willCrash
        ? <><code>input()</code> gave the string <code>"{raw}"</code> and <code>int()</code> can't parse it — <strong>ValueError</strong>. Guard it with <code>try/except</code> or validate before converting.</>
        : <>The #1 beginner trap: <code>input()</code> always returns a <strong>string</strong>, even for digits. <code>"17" + 1</code> is a TypeError — you must <code>int()</code> first. Then f-strings format the output.</>}
    >
      {/* pipe */}
      <line x1="60" y1="120" x2="600" y2="120" stroke="#30363d" strokeWidth="6" />
      {STATIONS.map((s, i) => (
        <g key={s.label} className="pf2d-fade">
          <rect x={s.x} y="96" width="90" height="48" rx="10" fill={i === stage ? s.c : '#161b22'} stroke={s.c} strokeWidth="2" className={i === stage ? 'pf2d-pulse' : ''} />
          <text x={s.x + 45} y="125" fill={i === stage ? '#0d1117' : s.c} fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{s.label}</text>
          <text x={s.x + 45} y="168" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="system-ui">{s.desc}</text>
        </g>
      ))}
      {/* packet */}
      <g style={{ transform: `translate(${STATIONS[stage].x + 45}px, 68px)`, transition: 'transform .5s cubic-bezier(.4,1.1,.5,1)' }}>
        <rect x="-58" y="-16" width="116" height="30" rx="8" fill={willCrash ? '#f85149' : '#e6edf3'} />
        <text y="5" fill="#0d1117" fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{packets[stage]}</text>
      </g>
      {/* screen */}
      <rect x="440" y="188" width="176" height="42" rx="8" fill="#0d1117" stroke="#21262d" />
      <text x="528" y="214" fill={stage === 3 && !willCrash ? '#56d364' : '#30363d'} fontSize="12" textAnchor="middle" fontFamily="Consolas">{stage === 3 && !willCrash ? `Next year: ${num + 1}` : '(stdout)'}</text>
    </Stage2D>
  );
}
