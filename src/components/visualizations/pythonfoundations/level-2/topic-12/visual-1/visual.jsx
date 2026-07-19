/* Lesson: Mutable vs Immutable — Why It Quietly Breaks Beginner Code
 * 2D animated aliasing trap: b = a wires TWO name-tags to ONE list; mutating via b
 * changes a too. b = a.copy() makes two objects. Auto-alternates the two cases. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

export default function PfMutableImmutableVisualization() {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState([1, 2, 3]);
  const [own, setOwn] = useState([1, 2, 3]);
  const [msg, setMsg] = useState('b = a → both names, one object');
  const [auto, setAuto] = useState(true);
  const [seq, setSeq] = useState(0);

  const mutate = () => {
    if (copied) { setOwn(v => [...v, 99]); setMsg('b.append(99) — only b changed ✓'); }
    else { setShared(v => [...v, 99]); setMsg('b.append(99) — a changed too! 🐛'); }
  };
  const toggle = () => { setCopied(c => !c); setShared([1, 2, 3]); setOwn([1, 2, 3]); setMsg(!copied ? 'b = a.copy() → two objects' : 'b = a → both names, one object'); };
  useAutoPlay(() => { if (seq % 3 === 2) toggle(); else mutate(); setSeq(s => s + 1); }, 1.9, auto, [seq, copied]);

  const aList = shared, bList = copied ? own : shared;
  const Box = ({ x, items, hot }) => (
    <g className="pf2d-fade"><rect x={x} y="150" width={30 + items.length * 34} height="46" rx="8" fill={hot ? '#f97316' : '#161b22'} stroke={hot ? '#f97316' : '#30363d'} strokeWidth="2" />
      <text x={x + (30 + items.length * 34) / 2} y="180" fill={hot ? '#0d1117' : '#e6edf3'} fontSize="18" textAnchor="middle" fontFamily="Consolas" fontWeight="700">[{items.join(', ')}]</text></g>
  );

  return (
    <Stage2D
      title="The aliasing trap"
      subtitle="a = [1,2,3]; b = a does NOT copy the list — it wires a second name to the same object."
      accent="#f85149"
      viewBox="0 0 640 250"
      controls={
        <>
          <button className={`pf2d-btn ${!copied ? 'pf2d-btn--on' : ''}`} onClick={toggle}>b = a</button>
          <button className={`pf2d-btn ${copied ? 'pf2d-btn--on' : ''}`} onClick={toggle}>b = a.copy()</button>
          <button className="pf2d-btn pf2d-btn--primary" onClick={mutate}>b.append(99)</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <button className="pf2d-btn" onClick={() => { setShared([1, 2, 3]); setOwn([1, 2, 3]); }}>↺</button>
          <span className="pf2d-readout">{msg}</span>
        </>
      }
      legend={copied
        ? <><code>a.copy()</code> (or <code>a[:]</code>) builds a <strong>second object</strong> — the wires go to different boxes, so mutating one can't touch the other. Immutables (int, str, tuple) never have this problem: they can't change, so sharing is always safe.</>
        : <>One box, two wires. <code>b.append(99)</code> reaches down b's wire and mutates the shared object — so <code>a</code> sees it too. THE classic beginner bug (also strikes passing a list into a function). Check with <code>a is b</code>.</>}
    >
      {/* name tags */}
      <rect x="120" y="34" width="70" height="46" rx="8" fill="#58a6ff" /><text x="155" y="64" fill="#0d1117" fontSize="24" textAnchor="middle" fontWeight="700" fontFamily="Consolas">a</text>
      <rect x="450" y="34" width="70" height="46" rx="8" fill="#ffd43b" /><text x="485" y="64" fill="#0d1117" fontSize="24" textAnchor="middle" fontWeight="700" fontFamily="Consolas">b</text>
      {copied ? (
        <>
          <line x1="155" y1="80" x2="200" y2="150" stroke="#58a6ff" strokeWidth="2.5" />
          <line x1="485" y1="80" x2="470" y2="150" stroke="#ffd43b" strokeWidth="2.5" />
          <Box x="120" items={aList} hot={false} />
          <Box x="410" items={bList} hot={bList.length > 3} />
          <text x="320" y="180" fill="#56d364" fontSize="13" textAnchor="middle" fontFamily="system-ui">two objects ✓</text>
        </>
      ) : (
        <>
          <line x1="155" y1="80" x2="300" y2="150" stroke="#58a6ff" strokeWidth="2.5" />
          <line x1="485" y1="80" x2="340" y2="150" stroke="#ffd43b" strokeWidth="2.5" />
          <Box x="260" items={aList} hot={aList.length > 3} />
          <text x="320" y="222" fill={aList.length > 3 ? '#f85149' : '#8b949e'} fontSize="13" textAnchor="middle" fontFamily="system-ui">{aList.length > 3 ? 'ONE object — both see 99' : 'one shared object'}</text>
        </>
      )}
    </Stage2D>
  );
}
