/* Problem: Counting Bits for a Range (0..n)
 * 2D animated: bits meet DP — count[i] = count[i >> 1] + (i & 1). Halving drops the last bit,
 * which the +(i&1) puts back. Fill 0..7 in O(n). */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const FULL = [0, 1, 1, 2, 1, 2, 2, 3];
export default function BitCountingBitsVisualization() {
  const [upto, setUpto] = useState(1);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setUpto(v => (v >= 8 ? 1 : v + 1)), 1.1, auto);
  const cur = upto < 8 ? upto : null;
  const CW = 66, gap = 8, startX = (640 - (8 * (CW + gap) - gap)) / 2;
  return (
    <Stage2D title="Counting Bits 0..n in O(n)" subtitle="Calling popcount on every number costs O(n log n). The DP shortcut: i>>1 is i without its last bit — a value already solved! count[i] = count[i>>1] + (i & 1)."
      accent="#4fce78" viewBox="0 0 640 240"
      controls={<><button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setUpto(v => (v >= 8 ? 1 : v + 1))}>fill next</button><button className="dsa2d-btn" onClick={() => setUpto(1)}>↺</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{cur != null ? `count[${cur}] = count[${cur >> 1}] + ${cur & 1} = ${FULL[cur]}` : 'table complete — one lookup per number'}</span></>}
      legend={<>Each entry reuses a smaller solved entry → <strong>O(n)</strong> total. This is the "bits + DP" hybrid interviewers love: recognise that <code>i &gt;&gt; 1</code> is a subproblem. Alternative recurrence: <code>count[i] = count[i &amp; (i-1)] + 1</code> (Kernighan's identity as DP).</>}>
      {FULL.map((v, k) => {
        const filled = k < upto, isCur = k === cur, isSrc = cur != null && k === (cur >> 1);
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="56" width={CW} height="72" rx="9" fill={isCur ? 'rgba(255,212,59,.16)' : isSrc ? 'rgba(86,211,100,.2)' : filled ? 'rgba(86,211,100,.08)' : '#161b22'} stroke={isCur ? '#ffd43b' : isSrc ? '#56d364' : filled ? '#56d364' : '#30363d'} strokeWidth={isCur || isSrc ? 3 : 1.5} className={isCur ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .25s' }} />
            <text x={startX + k * (CW + gap) + CW / 2} y="80" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">{k} = {k.toString(2).padStart(3, '0')}</text>
            <text x={startX + k * (CW + gap) + CW / 2} y="110" fill={filled || isCur ? '#e6edf3' : '#6e7681'} fontSize="19" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{filled || isCur ? v : '·'}</text>
          </g>
        );
      })}
      {cur != null && <path d={`M ${startX + (cur >> 1) * (CW + gap) + CW / 2} 140 Q ${startX + ((cur + (cur >> 1)) / 2) * (CW + gap) + CW / 2} 185 ${startX + cur * (CW + gap) + CW / 2} 140`} fill="none" stroke="#56d364" strokeWidth="2.5" strokeDasharray="5 4" className="dsa2d-pulse" />}
      <text x="320" y="220" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">green arc: the already-solved half-value feeding the current cell</text>
    </Stage2D>
  );
}
