/* Lesson: Slicing — Grabbing Exactly the Data You Need
 * 2D animated: start/stop fences slide and the selected cells lift out into a new list.
 * Auto-cycles through slice presets so the selection re-forms live. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

const DATA = [0, 1, 2, 3, 4, 5, 6, 7];
const PRESETS = [[1, 6, 2], [0, 4, 1], [2, 8, 1], [0, 8, 3]];

export default function PfSlicingVisualization() {
  const [start, setStart] = useState(1);
  const [stop, setStop] = useState(6);
  const [step, setStep] = useState(2);
  const [auto, setAuto] = useState(true);
  const [seq, setSeq] = useState(0);
  useAutoPlay(() => { const [s, e, st] = PRESETS[seq % PRESETS.length]; setStart(s); setStop(e); setStep(st); setSeq(v => v + 1); }, 2.2, auto, [seq]);

  const n = DATA.length;
  const picked = [];
  for (let i = start; i < stop; i += step) if (i >= 0 && i < n) picked.push(i);
  const result = picked.map(i => DATA[i]);
  const CW = 62, gap = 8;
  const startX = 320 - (n * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Slicing: nums[start:stop:step]"
      subtitle="Slide the three dials. Selected cells lift out into a NEW list — stop is EXCLUDED, and step sets the stride."
      accent="#56d364"
      viewBox="0 0 640 270"
      controls={
        <>
          <div className="pf2d-group"><span className="pf2d-label">start={start}</span><input className="pf2d-slider" type="range" min="0" max="7" value={start} onChange={e => setStart(+e.target.value)} /></div>
          <div className="pf2d-group"><span className="pf2d-label">stop={stop}</span><input className="pf2d-slider" type="range" min="0" max="8" value={stop} onChange={e => setStop(+e.target.value)} /></div>
          <div className="pf2d-group"><span className="pf2d-label">step={step}</span><input className="pf2d-slider" type="range" min="1" max="3" value={step} onChange={e => setStep(+e.target.value)} /></div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="pf2d-readout">[{result.join(', ')}]</span>
        </>
      }
      legend={<>A slice is a <strong>new list</strong> copied from the original (the row below is untouched). Defaults make <code>nums[:3]</code>, <code>nums[3:]</code>, <code>nums[:]</code> (full copy) and the famous <code>nums[::-1]</code> (reversed).</>}
    >
      {DATA.map((v, i) => {
        const x = startX + i * (CW + gap);
        const on = picked.includes(i);
        return (
          <g key={i} style={{ transform: on ? 'translateY(-46px)' : 'translateY(0)', transition: 'transform .4s cubic-bezier(.4,1.3,.5,1)' }}>
            <rect x={x} y="130" width={CW} height="58" rx="9" fill={on ? '#56d364' : '#161b22'} stroke={on ? '#56d364' : '#30363d'} strokeWidth="2" className="pf2d-fade" />
            <text x={x + CW / 2} y="167" fill={on ? '#0d1117' : '#e6edf3'} fontSize="22" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
            <text x={x + CW / 2} y="208" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="Consolas">{i}</text>
          </g>
        );
      })}
      {/* fences */}
      <line x1={startX + start * (CW + gap) - gap / 2} y1="118" x2={startX + start * (CW + gap) - gap / 2} y2="200" stroke="#58a6ff" strokeWidth="3" />
      <text x={startX + start * (CW + gap) - gap / 2} y="110" fill="#58a6ff" fontSize="11" textAnchor="middle" fontFamily="system-ui">start</text>
      <line x1={startX + stop * (CW + gap) - gap / 2} y1="118" x2={startX + stop * (CW + gap) - gap / 2} y2="200" stroke="#f97316" strokeWidth="3" />
      <text x={startX + stop * (CW + gap) - gap / 2} y="110" fill="#f97316" fontSize="11" textAnchor="middle" fontFamily="system-ui">stop (excl)</text>
      <text x="320" y="40" fill="#56d364" fontSize="15" textAnchor="middle" fontFamily="Consolas">new list → [{result.join(', ')}]</text>
    </Stage2D>
  );
}
