/* Lesson: Collisions — What Happens When Two Keys Hash to the Same Spot
 * 2D animated: two different keys hash to the SAME bucket index. That's a collision — the
 * table must have a strategy to store both without losing one. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const SIZE = 5;
const hash = k => [...k].reduce((a, c) => a + c.charCodeAt(0), 0) % SIZE;
// find two colliding keys deterministically
const KEYS = ['owl', 'ant'];   // both hash to same bucket under SIZE 5
export default function HtCollisionVisualization() {
  const [step, setStep] = useState(0);   // 0: insert owl, 1: insert ant (collision)
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setStep(v => (v + 1) % 2), 1.6, auto);
  const idxOwl = hash('owl'), idxAnt = hash('ant');
  const collide = idxOwl === idxAnt;
  const CW = 76, gap = 10;
  const startX = 320 - (SIZE * (CW + gap) - gap) / 2;

  return (
    <Stage2D
      title="Collisions"
      subtitle="Because a hash function squeezes unlimited keys into limited buckets, two different keys can map to the same index. That's a collision — unavoidable in general."
      accent="#f85149"
      viewBox="0 0 640 230"
      controls={
        <>
          <button className={`dsa2d-btn ${step === 0 ? 'dsa2d-btn--on' : ''}`} onClick={() => setStep(0)}>insert "owl"</button>
          <button className={`dsa2d-btn ${step === 1 ? 'dsa2d-btn--on' : ''}`} onClick={() => setStep(1)}>insert "ant"</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">owl→{idxOwl} · ant→{idxAnt} {collide ? '⚠ collision' : ''}</span>
        </>
      }
      legend={<>The <strong>pigeonhole principle</strong> guarantees collisions once you have more keys than buckets. Both <code>"owl"</code> and <code>"ant"</code> want bucket {idxOwl}. A hash table needs a resolution strategy — chaining or open addressing (next lesson) — so no key is overwritten.</>}
    >
      {Array.from({ length: SIZE }).map((_, k) => {
        const hot = collide && k === idxOwl;
        const occupants = [];
        if (idxOwl === k) occupants.push('owl');
        if (step >= 1 && idxAnt === k) occupants.push('ant');
        return (
          <g key={k}>
            <rect x={startX + k * (CW + gap)} y="80" width={CW} height="60" rx="8"
              fill={hot && step >= 1 ? 'rgba(248,81,73,.2)' : occupants.length ? '#161b22' : '#0d1117'}
              stroke={hot && step >= 1 ? '#f85149' : occupants.length ? '#30363d' : '#30363d'} strokeWidth="2"
              className={hot && step >= 1 ? 'dsa2d-pulse' : ''} />
            <text x={startX + k * (CW + gap) + CW / 2} y="72" fill="#6b7785" fontSize="11" textAnchor="middle" fontFamily="Consolas">[{k}]</text>
            {occupants.map((o, oi) => (
              <text key={o} x={startX + k * (CW + gap) + CW / 2} y={106 + oi * 22} fill={oi === 1 ? '#ff9d95' : '#e6edf3'} fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{o}</text>
            ))}
          </g>
        );
      })}
      {collide && step >= 1 && <text x="320" y="176" fill="#f85149" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">⚠ both keys landed in bucket {idxOwl}</text>}
      {step === 0 && <text x="320" y="176" fill="#8b949e" fontSize="13" textAnchor="middle" fontFamily="Consolas">now insert "ant" and watch the clash…</text>}
    </Stage2D>
  );
}
