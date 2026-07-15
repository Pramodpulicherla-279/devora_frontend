/* Lesson: Dictionaries — Storing Data as Key-Value Pairs
 * 2D animated: the key is hashed, and a beam jumps STRAIGHT to one bucket (no scanning).
 * Auto-cycles keys; a missing key beams to an empty bucket → KeyError. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

const B = 6;
const ENTRIES = { alice: 91, bob: 78, carol: 85, dave: 62 };
const hashOf = k => { let h = 0; for (const c of k) h = (h * 31 + c.charCodeAt(0)) % B; return h; };
const KEYS = [...Object.keys(ENTRIES), 'eve'];

export default function PfDictionariesVisualization() {
  const [probe, setProbe] = useState('carol');
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setProbe(p => KEYS[(KEYS.indexOf(p) + 1) % KEYS.length]), 2.0, auto);
  const h = hashOf(probe);
  const found = probe in ENTRIES;
  const owners = {}; Object.keys(ENTRIES).forEach(k => { owners[hashOf(k)] = k; });
  const CW = 88, gap = 8;
  const startX = 320 - (B * (CW + gap) - gap) / 2;
  const bx = startX + h * (CW + gap) + CW / 2;

  return (
    <Stage2D
      title="Dictionaries: hash → bucket"
      subtitle="scores = {alice: 91, …}. A dict doesn't scan — it HASHES the key, and the hash points straight at one bucket."
      accent="#ffd43b"
      viewBox="0 0 640 280"
      controls={
        <>
          <span className="pf2d-label">lookup:</span>
          <div className="pf2d-group">{KEYS.map(k => <button key={k} className={`pf2d-btn ${probe === k ? 'pf2d-btn--on' : ''}`} onClick={() => setProbe(k)}>{k}</button>)}</div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="pf2d-readout">{found ? `hash → bucket ${h} → ${ENTRIES[probe]}` : `bucket ${h} empty → KeyError`}</span>
        </>
      }
      legend={found
        ? <>Hash the key → the number picks the bucket → done: <strong>O(1) average lookup</strong>, whether the dict holds 4 or 4 million entries. This powers caches, frequency counters, and graph adjacency in DSA.</>
        : <>"{probe}" hashes to bucket {h}, but nothing's stored there → <strong>KeyError</strong>. Guard with <code>"{probe}" in scores</code> or <code>scores.get("{probe}")</code>.</>}
    >
      {/* hash box */}
      <rect x="248" y="24" width="144" height="40" rx="10" fill="#ffd43b" />
      <text x="320" y="50" fill="#0d1117" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">hash("{probe}")</text>
      {/* beam */}
      <line x1="320" y1="66" x2={bx} y2="150" stroke={found ? '#56d364' : '#f85149'} strokeWidth="2.5" className="pf2d-flow" />
      {/* buckets */}
      {Array.from({ length: B }).map((_, i) => {
        const x = startX + i * (CW + gap);
        const owner = owners[i];
        const tgt = i === h;
        return (
          <g key={i} className="pf2d-fade">
            <rect x={x} y="150" width={CW} height="96" rx="10" fill={tgt ? (found ? '#56d364' : '#f85149') : '#161b22'} stroke={tgt ? (found ? '#56d364' : '#f85149') : '#30363d'} strokeWidth="2" opacity={tgt ? 0.95 : 1} />
            <text x={x + CW / 2} y="170" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="Consolas">bucket {i}</text>
            {owner && <><text x={x + CW / 2} y="200" fill={tgt ? '#0d1117' : '#ffd43b'} fontSize="14" textAnchor="middle" fontFamily="Consolas">{owner}</text>
              <text x={x + CW / 2} y="228" fill={tgt ? '#0d1117' : '#e6edf3'} fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{ENTRIES[owner]}</text></>}
          </g>
        );
      })}
    </Stage2D>
  );
}
