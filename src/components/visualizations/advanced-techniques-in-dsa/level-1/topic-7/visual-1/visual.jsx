/* Lesson: Huffman Coding — Greedy Algorithms in Data Compression
 * 2D animated: repeatedly merge the two LOWEST-frequency nodes into one. Rare symbols end up
 * deep (long codes), common ones shallow (short codes) — optimal prefix codes, greedily. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const NODES = [
  { id: 'A', label: 'A:5', x: 110, y: 235, leaf: true, step: 0 },
  { id: 'B', label: 'B:7', x: 210, y: 235, leaf: true, step: 0 },
  { id: 'C', label: 'C:10', x: 300, y: 170, leaf: true, step: 0 },
  { id: 'D', label: 'D:15', x: 410, y: 105, leaf: true, step: 0 },
  { id: 'AB', label: '12', x: 160, y: 170, step: 1, kids: ['A', 'B'] },
  { id: 'ABC', label: '22', x: 230, y: 105, step: 2, kids: ['AB', 'C'] },
  { id: 'ROOT', label: '37', x: 320, y: 40, step: 3, kids: ['ABC', 'D'] },
];
const byId = id => NODES.find(n => n.id === id);
const MSGS = [
  'four symbols with frequencies 5, 7, 10, 15',
  'merge the two smallest (A:5 + B:7) → node 12',
  'merge the two smallest (12 + C:10) → node 22',
  'merge the last pair (22 + D:15) → root; codes = path of 0s/1s',
];
export default function GreedyHuffmanVisualization() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setStep(v => (v + 1) % 4), 1.8, auto);
  return (
    <Stage2D title="Huffman Coding" subtitle="To build the shortest possible prefix codes, greedily merge the two least-frequent nodes over and over. Frequent symbols stay near the root and get short bit-codes."
      accent="#a78bfa" viewBox="0 0 640 290"
      controls={<>{[0, 1, 2, 3].map(k => <button key={k} className={`dsa2d-btn ${k === step ? 'dsa2d-btn--on' : ''}`} onClick={() => setStep(k)}>{k}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">{MSGS[step]}</span></>}
      legend={<>Each merge is the greedy choice — and the exchange argument proves optimality: any tree that puts a rarer symbol shallower than a commoner one can be improved by swapping them. Result here: D=1 (1 bit), C=01, B=001, A=000. This greedy powers ZIP, JPEG, MP3 and more.</>}>
      {NODES.filter(n => n.kids).map(n => n.kids.map((kid, ki) => {
        const on = n.step <= step;
        const k = byId(kid);
        return <g key={n.id + kid} style={{ opacity: on ? 1 : 0.08, transition: 'opacity .4s' }}>
          <line x1={n.x} y1={n.y} x2={k.x} y2={k.y} stroke="#a78bfa" strokeWidth="2" />
          <text x={(n.x + k.x) / 2 - 10} y={(n.y + k.y) / 2} fill="#8b949e" fontSize="11" fontFamily="Consolas">{ki === 0 ? '0' : '1'}</text>
        </g>;
      }))}
      {NODES.map(n => {
        const on = n.step <= step;
        const isNew = n.step === step && step > 0;
        return (
          <g key={n.id} style={{ opacity: on ? 1 : n.leaf ? 1 : 0.08, transition: 'opacity .4s' }}>
            <circle cx={n.x} cy={n.y} r="22" fill={isNew ? 'rgba(167,139,250,.3)' : n.leaf ? 'rgba(86,211,100,.14)' : '#161b22'} stroke={isNew ? '#a78bfa' : n.leaf ? '#56d364' : '#a78bfa'} strokeWidth={isNew ? 3 : 2} className={isNew ? 'dsa2d-pulse' : ''} />
            <text x={n.x} y={n.y + 5} fill="#e6edf3" fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{n.label}</text>
          </g>
        );
      })}
      {step === 3 && <text x="530" y="235" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="Consolas">A=000 B=001{' '} C=01 D=1</text>}
    </Stage2D>
  );
}
