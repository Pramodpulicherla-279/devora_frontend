/* Lesson: What Is Python, and Why Is It the Language of Choice for Learning DSA?
 * 2D animated: source flows through the interpreter to output, plus an auto-cycling
 * lines-of-code comparison that grows/shrinks as the task changes. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

const TASKS = {
  'Swap two variables': { py: 1, java: 4, cpp: 4, code: 'a, b = b, a' },
  'Sum a list': { py: 1, java: 5, cpp: 6, code: 'total = sum(nums)' },
  'Read a number': { py: 1, java: 3, cpp: 4, code: 'n = int(input())' },
  'Reverse a string': { py: 1, java: 4, cpp: 5, code: 's = s[::-1]' },
};
const KEYS = Object.keys(TASKS);
const LANGS = [{ k: 'py', label: 'Python', c: '#ffd43b' }, { k: 'java', label: 'Java', c: '#f85149' }, { k: 'cpp', label: 'C++', c: '#58a6ff' }];
const MAXW = 300;

export default function PfWhatIsPythonVisualization() {
  const [task, setTask] = useState('Sum a list');
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setTask(t => KEYS[(KEYS.indexOf(t) + 1) % KEYS.length]), 2.4, auto);
  const t = TASKS[task];

  return (
    <Stage2D
      title="Why Python for DSA?"
      subtitle="Python runs your code directly — no compile step — and expresses the same task in far fewer lines, so you focus on the algorithm."
      accent="#ffd43b"
      viewBox="0 0 640 300"
      controls={
        <>
          <span className="pf2d-label">Task:</span>
          <div className="pf2d-group">
            {KEYS.map(k => <button key={k} className={`pf2d-btn ${task === k ? 'pf2d-btn--on' : ''}`} onClick={() => setTask(k)}>{k}</button>)}
          </div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="pf2d-readout">{t.code}</span>
        </>
      }
      legend={<>Python is <strong>interpreted</strong> and <strong>dynamically typed</strong>: the code above runs straight through the interpreter with no boilerplate. Bar length = lines of code — the yellow Python bar is always shortest, which is why DSA courses teach the <em>logic</em> in Python first.</>}
    >
      {/* interpreter pipeline */}
      <g fontFamily="Consolas, monospace">
        <rect x="24" y="24" width="150" height="46" rx="8" fill="#161b22" stroke="#30363d" />
        <text x="99" y="46" fill="#ffd43b" fontSize="13" textAnchor="middle">source.py</text>
        <text x="99" y="62" fill="#8b949e" fontSize="10" textAnchor="middle">{t.code}</text>
        <line x1="176" y1="47" x2="242" y2="47" stroke="#ffd43b" strokeWidth="2" className="pf2d-flow" />
        <polygon points="242,42 252,47 242,52" fill="#ffd43b" />
        <rect x="256" y="22" width="128" height="50" rx="10" fill="#1a1000" stroke="#ffd43b" />
        <text x="320" y="44" fill="#ffd43b" fontSize="12" textAnchor="middle">Python</text>
        <text x="320" y="60" fill="#c9d1d9" fontSize="10" textAnchor="middle">interpreter</text>
        <line x1="386" y1="47" x2="452" y2="47" stroke="#56d364" strokeWidth="2" className="pf2d-flow" />
        <polygon points="452,42 462,47 452,52" fill="#56d364" />
        <rect x="466" y="24" width="150" height="46" rx="8" fill="#0d2818" stroke="#238636" />
        <text x="541" y="51" fill="#56d364" fontSize="12" textAnchor="middle">runs → output ✓</text>
      </g>
      {/* LOC bars */}
      {LANGS.map((l, i) => {
        const y = 118 + i * 52;
        const r = t[l.k] / 6;
        return (
          <g key={l.k}>
            <text x="24" y={y + 22} fill={l.c} fontSize="13" fontFamily="system-ui">{l.label}</text>
            <rect x="100" y={y} width={MAXW} height="30" rx="6" fill="#161b22" />
            <rect x="100" y={y} width={MAXW} height="30" rx="6" fill={l.c}
              style={{ transform: `scaleX(${r})`, transformBox: 'fill-box', transformOrigin: 'left', transition: 'transform .55s cubic-bezier(.4,1.2,.5,1)' }} />
            <text x={112 + t[l.k] / 6 * MAXW} y={y + 20} fill="#0d1117" fontSize="13" fontWeight="700" fontFamily="Consolas">{t[l.k]}</text>
            <text x={412} y={y + 20} fill="#8b949e" fontSize="11" fontFamily="system-ui">{t[l.k]} line{t[l.k] > 1 ? 's' : ''}</text>
          </g>
        );
      })}
    </Stage2D>
  );
}
