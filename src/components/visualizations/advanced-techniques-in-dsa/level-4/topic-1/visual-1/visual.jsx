/* Lesson: Binary Numbers — How Computers Actually Store Data
 * 2D animated: slide a decimal number and watch its 8 bits light up, each worth a power of 2.
 * The value is just the sum of the lit place-values. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function BitBinaryVisualization() {
  const [n, setN] = useState(77);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setN(v => (v + 13) % 256), 1.4, auto);
  const bits = Array.from({ length: 8 }, (_, i) => (n >> (7 - i)) & 1);
  const CW = 62, gap = 8, startX = (640 - (8 * (CW + gap) - gap)) / 2;
  return (
    <Stage2D title="Binary: Powers of Two" subtitle="Every integer is stored as bits. Each position is worth a power of 2; a bit that's ON contributes its place value. 8 bits cover 0–255 — that's a byte."
      accent="#58a6ff" viewBox="0 0 640 230"
      controls={<><div className="dsa2d-group"><span className="dsa2d-label">n = {n}</span><input className="dsa2d-slider" type="range" min="0" max="255" value={n} onChange={e => setN(+e.target.value)} /></div><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{n} = {bits.join('')}₂</span></>}
      legend={<>Read it right-to-left: bit k is worth <code>2ᵏ</code>. {n} = {bits.map((b, i) => b ? 128 >> i : null).filter(Boolean).join(' + ') || '0'}. Everything else in this part — masks, shifts, XOR tricks — is arithmetic on these switches.</>}>
      {bits.map((b, i) => {
        const pv = 128 >> i;
        return (
          <g key={i}>
            <rect x={startX + i * (CW + gap)} y="60" width={CW} height="60" rx="9" fill={b ? 'rgba(88,166,255,.3)' : '#161b22'} stroke={b ? '#58a6ff' : '#30363d'} strokeWidth={b ? 3 : 2} className={b ? 'dsa2d-fade' : ''} style={{ transition: 'fill .25s, stroke .25s' }} />
            <text x={startX + i * (CW + gap) + CW / 2} y="98" fill={b ? '#79c0ff' : '#6e7681'} fontSize="26" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{b}</text>
            <text x={startX + i * (CW + gap) + CW / 2} y="140" fill={b ? '#c9d1d9' : '#6e7681'} fontSize="12" textAnchor="middle" fontFamily="Consolas">{pv}</text>
          </g>
        );
      })}
      <text x="320" y="185" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">place values (2⁷ … 2⁰) — lit bits sum to the number</text>
      <text x="320" y="212" fill="#79c0ff" fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{bits.map((b, i) => b ? 128 >> i : null).filter(Boolean).join(' + ') || '0'} = {n}</text>
    </Stage2D>
  );
}
