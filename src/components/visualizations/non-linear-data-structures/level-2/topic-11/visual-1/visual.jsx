/* Lesson: Where Heaps Show Up — Scheduling, Dijkstra's, and More
 * 2D animated: flip through real systems that rely on a heap/priority queue, each with the
 * reason a heap is the right tool. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const USES = [
  { t: "Dijkstra's Shortest Path", why: 'A min-heap always pops the closest unvisited node next — the core of the algorithm.' },
  { t: 'OS / Task Scheduling', why: 'Run the highest-priority ready task first; the heap keeps it at the root.' },
  { t: 'Merge K Sorted Lists', why: 'A min-heap of the K current heads yields the overall next-smallest each step.' },
  { t: 'Median of a Data Stream', why: 'Two heaps (a max-heap + a min-heap) track the middle in O(log n) per value.' },
  { t: 'Huffman Coding', why: 'Repeatedly merge the two least-frequent symbols — pop-pop-push on a min-heap.' },
];
export default function HeapRealWorldVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % USES.length), 2.2, auto);
  const u = USES[i];

  return (
    <Stage2D
      title="Heaps in the Wild"
      subtitle="Whenever a system repeatedly needs 'the smallest/largest/most-urgent thing next', a heap gives it in O(log n) — far better than re-scanning."
      accent="#f0883e"
      viewBox="0 0 640 250"
      controls={
        <>
          {USES.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        </>
      }
      legend={<>The tell-tale sign you want a heap: a loop that keeps asking for the current extreme (min or max) while the data changes. Sorting once won't do — the set keeps updating, and a heap maintains the order incrementally in O(log n).</>}
    >
      <rect x="60" y="46" width="520" height="150" rx="14" fill="#0b0f15" stroke="#f0883e" strokeWidth="1.5" />
      <text x="320" y="94" fill="#f8c088" fontSize="21" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{u.t}</text>
      <rect x="230" y="110" width="180" height="30" rx="15" fill="rgba(240,136,62,.15)" stroke="#f0883e" />
      <text x="320" y="130" fill="#f0883e" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">powered by a heap</text>
      <foreignObject x="96" y="148" width="448" height="44">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '15px system-ui', lineHeight: 1.35, textAlign: 'center' }}>{u.why}</div>
      </foreignObject>
      <text x="320" y="228" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">example {i + 1} of {USES.length}</text>
    </Stage2D>
  );
}
