/* Lesson: Dictionary Methods and Common Patterns
 * 2D animated: run get/keys/values/items — the matching halves light up — and the
 * counter pattern grows a value bar. Auto-cycles the methods. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

const BASE = { apple: 3, banana: 1, cherry: 2 };
const SEQ = ['get', 'keys', 'values', 'items', 'count', 'count', 'reset'];

export default function PfDictMethodsVisualization() {
  const [d, setD] = useState({ ...BASE });
  const [hl, setHl] = useState({ k: false, v: false });
  const [out, setOut] = useState('run a method →');
  const [auto, setAuto] = useState(true);
  const [seq, setSeq] = useState(0);
  const keys = Object.keys(d);
  const run = m => {
    setHl({ k: false, v: false });
    if (m === 'get') setOut('d.get("apple") → 3');
    if (m === 'keys') { setHl({ k: true, v: false }); setOut('d.keys() → apple, banana, cherry'); }
    if (m === 'values') { setHl({ k: false, v: true }); setOut('d.values() → 3, 1, 2'); }
    if (m === 'items') { setHl({ k: true, v: true }); setOut('d.items() → (key, value) pairs'); }
    if (m === 'count') { setD(p => ({ ...p, apple: (p.apple || 0) + 1 })); setOut('d["apple"] = d.get("apple",0)+1'); }
    if (m === 'reset') { setD({ ...BASE }); setOut('reset'); }
  };
  useAutoPlay(() => { run(SEQ[seq % SEQ.length]); setSeq(s => s + 1); }, 1.8, auto, [seq]);
  const CW = 150, gap = 24;
  const startX = 320 - (keys.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Dict methods & the counter pattern"
      subtitle="Each column is a key→value pair. Run methods to see which half lights up, and press count to grow apple's value bar."
      accent="#f97316"
      viewBox="0 0 640 260"
      controls={
        <>
          <div className="pf2d-group">
            {['get', 'keys', 'values', 'items'].map(m => <button key={m} className="pf2d-btn" onClick={() => run(m)}>{m}()</button>)}
            <button className="pf2d-btn pf2d-btn--primary" onClick={() => run('count')}>count</button>
            <button className="pf2d-btn" onClick={() => run('reset')}>↺</button>
          </div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="pf2d-readout">{out}</span>
        </>
      }
      legend={<><code>.get(key, default)</code> is the crash-proof lookup — no KeyError. The <strong>counter pattern</strong> <code>d[k] = d.get(k,0)+1</code> is the most common dict idiom in DSA: frequency maps for anagrams, duplicates and sliding windows. Press count and watch apple grow.</>}
    >
      {keys.map((k, i) => {
        const x = startX + i * (CW + gap);
        const vh = 30 + d[k] * 26;
        return (
          <g key={k}>
            <rect x={x} y="34" width={CW} height="42" rx="8" fill={hl.k ? '#58a6ff' : '#161b22'} stroke="#30363d" className="pf2d-fade" />
            <text x={x + CW / 2} y="61" fill={hl.k ? '#0d1117' : '#ffd43b'} fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">"{k}"</text>
            <rect x={x + CW / 2 - 40} y={210 - vh} width="80" height={vh} rx="8" fill={hl.v ? '#56d364' : '#21262d'} className="pf2d-fade" style={{ transition: 'height .4s, y .4s, fill .3s' }} />
            <text x={x + CW / 2} y={200 - vh} fill="#e6edf3" fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{d[k]}</text>
          </g>
        );
      })}
      <text x={startX - 12} y="61" fill="#58a6ff" fontSize="11" textAnchor="end" fontFamily="system-ui">keys</text>
      <text x={startX - 12} y="200" fill="#56d364" fontSize="11" textAnchor="end" fontFamily="system-ui">values</text>
    </Stage2D>
  );
}
