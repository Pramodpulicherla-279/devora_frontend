/* Lesson: Tuples and Why Immutability Is a Feature
 * 2D animated: the list slot happily changes; the tuple's locked case flashes and
 * rejects the write with TypeError. Auto-cycles the mutation attempts. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

export default function PfTuplesVisualization() {
  const [listVals, setListVals] = useState([3, 1, 4]);
  const [flash, setFlash] = useState(null);
  const [msg, setMsg] = useState('try mutating each →');
  const [auto, setAuto] = useState(true);
  const [seq, setSeq] = useState(0);
  const mutList = () => { setListVals(v => [99, v[1], v[2]]); setFlash('list'); setMsg('nums[0] = 99  ✓ mutable'); setTimeout(() => setFlash(null), 700); };
  const mutTuple = () => { setFlash('tuple'); setMsg("point[0] = 99  💥 TypeError"); setTimeout(() => setFlash(null), 900); };
  const reset = () => { setListVals([3, 1, 4]); setMsg('try mutating each →'); };
  useAutoPlay(() => { [mutList, mutTuple, reset][seq % 3](); setSeq(s => s + 1); }, 2.0, auto, [seq]);

  const Cell = ({ x, v, hot }) => (
    <g className="pf2d-fade"><rect x={x} y="0" width="58" height="58" rx="8" fill={hot ? '#f97316' : '#161b22'} stroke="#30363d" />
      <text x={x + 29} y="37" fill={hot ? '#0d1117' : '#e6edf3'} fontSize="24" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text></g>
  );

  return (
    <Stage2D
      title="Tuple vs List: the locked case"
      subtitle="Same items, different contract. The list is an open row; the tuple is sealed at creation — forever."
      accent="#a78bfa"
      viewBox="0 0 640 260"
      controls={
        <>
          <button className="pf2d-btn" onClick={mutList}>nums[0] = 99</button>
          <button className="pf2d-btn" onClick={mutTuple}>point[0] = 99</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <button className="pf2d-btn" onClick={reset}>↺</button>
          <span className="pf2d-readout">{msg}</span>
        </>
      }
      legend={<>Immutability is a <strong>guarantee</strong>, not a handicap: tuples can be dict keys and set members (lists can't), they're safe to share without defensive copies, and they signal intent. Python even uses them silently — <code>return a, b</code> returns a tuple.</>}
    >
      {/* list */}
      <text x="150" y="48" fill="#56d364" fontSize="14" textAnchor="middle" fontFamily="Consolas">nums = [{listVals.join(', ')}]</text>
      <g transform="translate(63 70)">{listVals.map((v, i) => <Cell key={i} x={i * 68} v={v} hot={flash === 'list' && i === 0} />)}</g>
      <text x="150" y="164" fill="#56d364" fontSize="12" textAnchor="middle" fontFamily="system-ui">mutable — open shelf</text>
      {/* tuple with lock case */}
      <text x="470" y="48" fill="#a78bfa" fontSize="14" textAnchor="middle" fontFamily="Consolas">point = (3, 1, 4)</text>
      <g transform="translate(383 70)">{[3, 1, 4].map((v, i) => <Cell key={i} x={i * 68} v={v} hot={false} />)}</g>
      <rect x="378" y="64" width="204" height="70" rx="12" fill={flash === 'tuple' ? '#f85149' : '#a78bfa'} opacity={flash === 'tuple' ? 0.35 : 0.14} stroke={flash === 'tuple' ? '#f85149' : '#a78bfa'} strokeWidth="2" className="pf2d-fade" />
      <text x="470" y="164" fill="#a78bfa" fontSize="12" textAnchor="middle" fontFamily="system-ui">immutable — sealed 🔒</text>
      {flash === 'tuple' && <text x="470" y="196" fill="#f85149" fontSize="15" textAnchor="middle" fontFamily="Consolas" className="pf2d-pop">TypeError!</text>}
    </Stage2D>
  );
}
