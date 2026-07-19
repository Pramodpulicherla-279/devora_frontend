/* Lesson: Deletion — Removing Nodes Without Breaking the Chain
 * 2D animated: delete a middle node by pointing the previous node's next PAST it. The removed
 * node is unlinked (and garbage-collected); the chain stays intact. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const VALS = [4, 8, 15, 16, 23];
const DEL = 2; // delete node index 2 (value 15)
export default function LlDeletionVisualization() {
  const [phase, setPhase] = useState(0); // 0 before, 1 rewired, 2 removed
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setPhase(v => (v + 1) % 3), 1.4, auto);
  const NW = 78, gap = 32;
  const startX = 320 - (VALS.length * (NW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Deleting a Node"
      subtitle="To remove a node, reroute the previous node's pointer to skip it. Once nothing references the node, it's gone — the chain never breaks."
      accent="#f0883e"
      viewBox="0 0 640 230"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setPhase(v => (v + 1) % 3)}>step</button>
          <button className="dsa2d-btn" onClick={() => setPhase(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{phase === 0 ? 'target: node 15' : phase === 1 ? 'prev.next = node.next' : 'node unlinked ✓'}</span>
        </>
      }
      legend={<><code>prev.next = target.next</code> is the whole operation. The deleted node no longer sits on any path, so Python reclaims it. Deletion is <strong>O(1)</strong> if you already hold the previous node — otherwise finding it is <strong>O(n)</strong>. (A doubly linked list makes finding prev instant.)</>}
    >
      {VALS.map((v, k) => {
        const x = startX + k * (NW + gap);
        const isDel = k === DEL;
        const removed = isDel && phase >= 2;
        const dimmed = isDel && phase >= 1;
        return (
          <g key={k} style={{ opacity: removed ? 0.25 : 1, transition: 'opacity .4s' }}>
            <rect x={x} y={removed ? 130 : 80} width={NW} height="52" rx="8"
              fill={isDel ? 'rgba(240,136,62,.2)' : '#161b22'} stroke={isDel ? '#f0883e' : '#a78bfa'} strokeWidth="2"
              style={{ transition: 'y .4s' }} />
            <text x={x + NW / 2} y={(removed ? 130 : 80) + 32} fill="#e6edf3" fontSize="19" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
            {isDel && !removed && <text x={x + NW / 2} y="72" fill="#f0883e" fontSize="11" textAnchor="middle" fontFamily="Consolas">delete</text>}
            {/* normal next pointer */}
            {k < VALS.length - 1 && !(k === DEL - 1 && phase >= 1) && !(isDel) &&
              <line x1={x + NW} y1="106" x2={x + NW + gap} y2="106" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#a5)" />}
            {isDel && !removed && k < VALS.length - 1 &&
              <line x1={x + NW} y1="106" x2={x + NW + gap} y2="106" stroke={phase >= 1 ? '#6e7681' : '#a78bfa'} strokeWidth="2" markerEnd="url(#a5)" />}
            {k === VALS.length - 1 && <text x={x + NW + gap - 6} y="111" fill="#8b949e" fontSize="13" fontFamily="Consolas">None</text>}
          </g>
        );
      })}
      {/* bypass pointer prev -> next of deleted */}
      {phase >= 1 && (() => {
        const px = startX + (DEL - 1) * (NW + gap) + NW;
        const nx = startX + (DEL + 1) * (NW + gap);
        return <path d={`M ${px} 100 Q ${(px + nx) / 2} 40 ${nx} 100`} fill="none" stroke="#56d364" strokeWidth="2.5" markerEnd="url(#a5g)" className="dsa2d-fade" />;
      })()}
      <defs>
        <marker id="a5" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><polygon points="0,0 7,3 0,6" fill="#a78bfa" /></marker>
        <marker id="a5g" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><polygon points="0,0 7,3 0,6" fill="#56d364" /></marker>
      </defs>
      {phase >= 1 && <text x="320" y="200" fill="#56d364" fontSize="12" textAnchor="middle" fontFamily="Consolas">green arrow skips the deleted node</text>}
    </Stage2D>
  );
}
