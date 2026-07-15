/* Lesson: String Methods Every Developer Uses Daily
 * 2D animated transform line: "  Hello World  " flows down through method stations,
 * each returning a NEW string. Auto-builds the chain; split() ends it with a list. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

const START = '  Hello World  ';
const METHODS = {
  'strip()': s => s.trim(),
  'lower()': s => s.toLowerCase(),
  'replace("o","0")': s => s.replaceAll('o', '0').replaceAll('O', '0'),
  'split(" ")': s => JSON.stringify(s.trim().split(/\s+/)),
};
const MK = Object.keys(METHODS);

export default function PfStringMethodsVisualization() {
  const [chain, setChain] = useState(['strip()']);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setChain(c => { const nx = MK.find(m => !c.includes(m)); return nx ? [...c, nx] : []; }), 1.7, auto);

  let v = START, isList = false;
  for (const m of chain) { if (isList) break; v = METHODS[m](v); if (m.startsWith('split')) isList = true; }
  const toggle = m => setChain(c => c.includes(m) ? c.filter(x => x !== m) : [...c, m]);

  return (
    <Stage2D
      title="String methods: the transform line"
      subtitle={'Start with "  Hello World  " (note the spaces). Build a method chain — order matters, and split() ends the line with a list.'}
      accent="#56d364"
      viewBox="0 0 640 290"
      controls={
        <>
          <div className="pf2d-group">{MK.map(m => <button key={m} className={`pf2d-btn ${chain.includes(m) ? 'pf2d-btn--on' : ''}`} onClick={() => toggle(m)}>{chain.includes(m) ? `${chain.indexOf(m) + 1}. ` : ''}{m}</button>)}
            <button className="pf2d-btn" onClick={() => setChain([])}>clear</button></div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={<>Every method returns a <strong>new</strong> string — the original is untouched (immutability!), which is why chaining works: <code>s.strip().lower().split()</code>. In DSA these are your text-cleaning front line: normalise, tokenise, rebuild with <code>" ".join(words)</code>.</>}
    >
      {/* input plate */}
      <rect x="180" y="18" width="280" height="38" rx="8" fill="#161b22" stroke="#30363d" />
      <text x="320" y="42" fill="#e6edf3" fontSize="15" textAnchor="middle" fontFamily="Consolas">"␣␣Hello World␣␣"</text>
      {chain.map((m, i) => (
        <g key={m} className="pf2d-fade">
          <line x1="320" y1={56 + i * 46} x2="320" y2={82 + i * 46} stroke="#56d364" strokeWidth="2" className="pf2d-flow" />
          <rect x="230" y={70 + i * 46} width="180" height="34" rx="8" fill="#56d364" />
          <text x="320" y={92 + i * 46} fill="#0d1117" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">.{m}</text>
        </g>
      ))}
      {/* output plate */}
      <rect x="150" y={70 + chain.length * 46 + 12} width="340" height="40" rx="8" fill={isList ? '#332900' : '#0d2818'} stroke={isList ? '#ffd43b' : '#238636'} />
      <text x="320" y={70 + chain.length * 46 + 37} fill={isList ? '#ffd43b' : '#56d364'} fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{isList ? v : `"${v}"`}</text>
    </Stage2D>
  );
}
