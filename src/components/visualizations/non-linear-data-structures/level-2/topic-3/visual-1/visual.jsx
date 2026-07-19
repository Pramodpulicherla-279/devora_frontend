/* Lesson: Representing a Heap as an Array (No Pointers Needed)
 * 2D animated: a heap needs no node objects — it lives in a flat array. Index math links
 * parents and children: children of i are 2i+1 and 2i+2; parent is (i−1)//2. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const VALS = [5, 8, 12, 15, 20, 30, 25];
const POS = [[320, 40], [210, 96], [430, 96], [150, 150], [270, 150], [390, 150], [510, 150]];
const EDGES = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]];
export default function HeapArrayVisualization() {
  const [i, setI] = useState(1);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % VALS.length), 1.2, auto);
  const parent = i > 0 ? Math.floor((i - 1) / 2) : null;
  const left = 2 * i + 1 < VALS.length ? 2 * i + 1 : null;
  const right = 2 * i + 2 < VALS.length ? 2 * i + 2 : null;
  const CW = 62, gap = 6;
  const startX = 320 - (VALS.length * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="A Heap Is Just an Array"
      subtitle="Because a heap is a complete tree, it maps perfectly onto a flat array — no pointers, no node objects. Simple arithmetic finds any node's family."
      accent="#a78bfa"
      viewBox="0 0 640 260"
      controls={
        <>
          <div className="dsa2d-group"><span className="dsa2d-label">node i = {i}</span><input className="dsa2d-slider" type="range" min="0" max={VALS.length - 1} value={i} onChange={e => setI(+e.target.value)} /></div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">parent {parent ?? '—'} · L {left ?? '—'} · R {right ?? '—'}</span>
        </>
      }
      legend={<>For index <code>i</code>: <strong>left child = 2i+1</strong>, <strong>right child = 2i+2</strong>, <strong>parent = (i−1)//2</strong>. This is why heaps are so memory-efficient and cache-friendly — everything's contiguous, and there are no pointers to chase.</>}
    >
      {/* tree */}
      {EDGES.map(([a, b], k) => {
        const on = (a === i && (b === left || b === right)) || (b === i && a === parent);
        return <line key={k} x1={POS[a][0]} y1={POS[a][1]} x2={POS[b][0]} y2={POS[b][1]} stroke={on ? '#a78bfa' : '#30363d'} strokeWidth={on ? 3 : 2} style={{ transition: 'stroke .3s' }} />;
      })}
      {VALS.map((v, k) => {
        const isI = k === i, isFam = k === parent || k === left || k === right;
        return (
          <g key={k}>
            <circle cx={POS[k][0]} cy={POS[k][1]} r="19" fill={isI ? 'rgba(167,139,250,.35)' : isFam ? 'rgba(88,166,255,.16)' : '#161b22'} stroke={isI ? '#a78bfa' : isFam ? '#58a6ff' : '#7c6bb0'} strokeWidth="2" className={isI ? 'dsa2d-pulse' : ''} />
            <text x={POS[k][0]} y={POS[k][1] + 5} fill="#e6edf3" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
          </g>
        );
      })}
      {/* array */}
      {VALS.map((v, k) => {
        const isI = k === i, isFam = k === parent || k === left || k === right;
        return (
          <g key={'a' + k}>
            <rect x={startX + k * (CW + gap)} y="196" width={CW} height="44" rx="7" fill={isI ? 'rgba(167,139,250,.3)' : isFam ? 'rgba(88,166,255,.14)' : '#161b22'} stroke={isI ? '#a78bfa' : isFam ? '#58a6ff' : '#30363d'} strokeWidth="2" />
            <text x={startX + k * (CW + gap) + CW / 2} y="224" fill="#e6edf3" fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
            <text x={startX + k * (CW + gap) + CW / 2} y="190" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">{k}</text>
          </g>
        );
      })}
    </Stage2D>
  );
}
