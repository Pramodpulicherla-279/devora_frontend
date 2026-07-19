/* Lesson: Checking if a Number Is a Power of Two
 * 2D animated: powers of two have exactly ONE set bit, so n & (n-1) == 0. Cycle through
 * examples and watch the test succeed or fail. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const CASES = [16, 12, 64, 6, 1, 96];
export default function BitPowerOfTwoVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % CASES.length), 1.8, auto);
  const n = CASES[i];
  const isPow = n > 0 && (n & (n - 1)) === 0;
  const CW = 48, gap = 6, startX = 175;
  const row = (v, y, label) => (
    <g key={label}>
      <text x={startX - 12} y={y + 19} textAnchor="end" fill="#8b949e" fontSize="12" fontWeight="700" fontFamily="Consolas">{label}</text>
      {Array.from({ length: 8 }, (_, k) => (v >> (7 - k)) & 1).map((b, k) => (
        <g key={k}>
          <rect x={startX + k * (CW + gap)} y={y} width={CW} height={26} rx="5" fill={b ? 'rgba(88,166,255,.2)' : '#161b22'} stroke={b ? '#58a6ff' : '#30363d'} strokeWidth={b ? 2 : 1.5} style={{ transition: 'fill .25s' }} />
          <text x={startX + k * (CW + gap) + CW / 2} y={y + 19} fill={b ? '#e6edf3' : '#6e7681'} fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{b}</text>
        </g>
      ))}
    </g>
  );
  return (
    <Stage2D title="Power of Two in One Line" subtitle="A power of two is a single 1-bit followed by zeros. Subtract 1 and that bit falls while everything below rises — so n AND (n−1) has no overlap: exactly zero."
      accent={isPow ? '#56d364' : '#f0883e'} viewBox="0 0 640 230"
      controls={<>{CASES.map((c, k) => <button key={c} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{c}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{n} & {n - 1} = {n & (n - 1)}</span></>}
      legend={isPow
        ? <><strong>{n}</strong> has a single set bit, so <code>{n} &amp; {n - 1} == 0</code> → power of two ✓. Don't forget the <code>n &gt; 0</code> guard — zero passes the AND test but isn't a power of two.</>
        : <><strong>{n}</strong> has multiple set bits; subtracting 1 only clears the lowest one, so the AND keeps the higher bits → <code>{n & (n - 1)} ≠ 0</code> → not a power of two ✗.</>}>
      {row(n, 44, `n=${n}`)}
      {row(n - 1, 88, `n-1=${n - 1}`)}
      <line x1={startX} y1="128" x2={startX + 8 * 54 - 6} y2="128" stroke="#30363d" strokeWidth="2" />
      <text x={startX - 12} y="124" textAnchor="end" fill={isPow ? '#56d364' : '#f0883e'} fontSize="13" fontWeight="700" fontFamily="Consolas">&</text>
      {row(n & (n - 1), 136, `= ${n & (n - 1)}`)}
      <rect x="200" y="182" width="240" height="36" rx="10" fill={isPow ? 'rgba(86,211,100,.14)' : 'rgba(240,136,62,.14)'} stroke={isPow ? '#56d364' : '#f0883e'} />
      <text x="320" y="205" fill={isPow ? '#7ee787' : '#f8c088'} fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{isPow ? `✓ ${n} is a power of two` : `✗ ${n} is not a power of two`}</text>
    </Stage2D>
  );
}
