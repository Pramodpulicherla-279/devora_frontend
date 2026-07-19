/* Lesson: Bit Manipulation in Real Systems — Flags, Permissions, and Compression
 * 2D animated: Unix-style rwx permission bits. Toggle permissions and watch the mask, the
 * octal value, and the familiar `ls -l` string update together. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const FLAGS = [{ n: 'read', ch: 'r', bit: 4 }, { n: 'write', ch: 'w', bit: 2 }, { n: 'execute', ch: 'x', bit: 1 }];
export default function BitFlagsVisualization() {
  const [mask, setMask] = useState(6);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setMask(v => (v + 1) % 8), 1.4, auto);
  const str = FLAGS.map(f => (mask & f.bit) ? f.ch : '-').join('');
  return (
    <Stage2D title="Flags & Permissions (rwx)" subtitle="Unix file permissions are literally a bitmask: read=4, write=2, execute=1. chmod 755 is three masks; checking access is one AND. Click a flag to toggle it."
      accent="#4fce78" viewBox="0 0 640 250"
      controls={<><div className="dsa2d-group"><span className="dsa2d-label">mask = {mask}</span><input className="dsa2d-slider" type="range" min="0" max="7" value={mask} onChange={e => setMask(+e.target.value)} /></div><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">chmod {mask}·· → {str}</span></>}
      legend={<>One integer stores many booleans: <code>mask &amp; READ</code> tests, <code>mask | WRITE</code> grants, <code>mask &amp; ~EXEC</code> revokes. The same pattern packs feature toggles, network headers, chess boards (bitboards), and compression codes — bits are the cheapest data structure there is.</>}>
      {FLAGS.map((f, i) => {
        const on = mask & f.bit;
        return (
          <g key={f.n} onClick={() => setMask(m => m ^ f.bit)} style={{ cursor: 'pointer' }}>
            <rect x={120 + i * 140} y="52" width="120" height="76" rx="12" fill={on ? 'rgba(86,211,100,.22)' : '#161b22'} stroke={on ? '#56d364' : '#30363d'} strokeWidth={on ? 3 : 2} style={{ transition: 'fill .25s' }} />
            <text x={180 + i * 140} y="82" fill={on ? '#7ee787' : '#6e7681'} fontSize="22" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{on ? f.ch : '-'}</text>
            <text x={180 + i * 140} y="108" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="Consolas">{f.n} = {f.bit}</text>
          </g>
        );
      })}
      <rect x="170" y="156" width="300" height="58" rx="12" fill="#0b0f15" stroke="#4fce78" strokeWidth="1.5" />
      <text x="320" y="180" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="Consolas">ls -l shows:</text>
      <text x="320" y="204" fill="#7ee787" fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">-{str}······  ({mask} = {mask.toString(2).padStart(3, '0')}₂)</text>
      <text x="320" y="242" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">click a card (or slide) to grant / revoke — that's mask ^ flag</text>
    </Stage2D>
  );
}
