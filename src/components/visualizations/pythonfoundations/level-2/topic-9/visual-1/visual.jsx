/* Lesson: Strings as Sequences — Indexing, Slicing, and Iteration
 * 2D animated: "PYTHON" as character cells; index / slice / reverse highlight the chosen
 * characters. Auto-cycles the three modes so string ops play out like list ops. */
import { useState, useEffect } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

const S = 'PYTHON';

export default function PfStringsSequencesVisualization() {
  const [mode, setMode] = useState('index');
  const [idx, setIdx] = useState(0);
  const [a, setA] = useState(1);
  const [b, setB] = useState(4);
  const [auto, setAuto] = useState(true);
  const [seq, setSeq] = useState(0);
  useAutoPlay(() => setSeq(s => s + 1), 1.4, auto);
  useEffect(() => {
    if (!auto) return;
    const p = seq % 9;
    if (p < 5) { setMode('index'); setIdx(p - 2); }
    else if (p < 7) { setMode('slice'); setA(p === 5 ? 1 : 2); setB(p === 5 ? 4 : 6); }
    else setMode('reverse');
  }, [seq, auto]);

  const n = S.length;
  const norm = idx < 0 ? n + idx : idx;
  const picked = mode === 'index' ? [norm] : mode === 'slice' ? Array.from({ length: Math.max(0, b - a) }, (_, k) => a + k).filter(i => i < n) : Array.from({ length: n }, (_, k) => n - 1 - k);
  const readout = mode === 'index' ? `s[${idx}] → "${S[norm] ?? '💥'}"` : mode === 'slice' ? `s[${a}:${b}] → "${S.slice(a, b)}"` : `s[::-1] → "${[...S].reverse().join('')}"`;
  const CW = 74, gap = 8;
  const startX = 320 - (n * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Strings are sequences"
      subtitle={'s = "PYTHON" — every trick from lists (indexing, slicing, iteration) works on a string\'s characters.'}
      accent="#a78bfa"
      viewBox="0 0 640 250"
      controls={
        <>
          <div className="pf2d-group">
            <button className={`pf2d-btn ${mode === 'index' ? 'pf2d-btn--on' : ''}`} onClick={() => setMode('index')}>index</button>
            <button className={`pf2d-btn ${mode === 'slice' ? 'pf2d-btn--on' : ''}`} onClick={() => setMode('slice')}>slice</button>
            <button className={`pf2d-btn ${mode === 'reverse' ? 'pf2d-btn--on' : ''}`} onClick={() => setMode('reverse')}>[::-1]</button>
          </div>
          {mode === 'index' && <div className="pf2d-group"><span className="pf2d-label">i={idx}</span><input className="pf2d-slider" type="range" min={-n} max={n - 1} value={idx} onChange={e => setIdx(+e.target.value)} /></div>}
          <AutoButton playing={auto} onToggle={() => setAuto(v => !v)} />
          <span className="pf2d-readout">{readout}</span>
        </>
      }
      legend={<>Strings are <strong>immutable</strong> character sequences — you can read any position but never write one (<code>s[0]="J"</code> is a TypeError; build a new string). Palindrome check in one line: <code>s == s[::-1]</code>.</>}
    >
      {[...S].map((ch, i) => {
        const x = startX + i * (CW + gap);
        const on = picked.includes(i);
        return (
          <g key={i} className="pf2d-fade">
            <rect x={x} y="88" width={CW} height="76" rx="10" fill={on ? '#a78bfa' : '#161b22'} stroke={on ? '#a78bfa' : '#30363d'} strokeWidth="2" />
            <text x={x + CW / 2} y="138" fill={on ? '#0d1117' : '#e6edf3'} fontSize="30" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{ch}</text>
            <text x={x + CW / 2} y="186" fill="#56d364" fontSize="13" textAnchor="middle" fontFamily="Consolas">{i}</text>
            {mode === 'reverse' && on && <text x={x + CW / 2} y="78" fill="#ffd43b" fontSize="12" textAnchor="middle" fontFamily="Consolas">#{picked.indexOf(i)}</text>}
          </g>
        );
      })}
      <text x="320" y="40" fill="#a78bfa" fontSize="16" textAnchor="middle" fontFamily="Consolas">{readout}</text>
    </Stage2D>
  );
}
