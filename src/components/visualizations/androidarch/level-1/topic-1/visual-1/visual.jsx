/* Lesson: Framework Structure — Giving Your Automation a Real Home
 * Concept: a real framework lives in "rooms", not one junk-drawer folder. Separation of concerns:
 * tests/, pages/, utils/, config/, data/ each do one job. Cycle the rooms to see each folder's
 * single responsibility and how they compose into a scalable structure. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const ROOMS = [
  { dir: 'tests/', job: 'what to verify — the test files', ex: 'test_create_listing.py', color: '#4fce78' },
  { dir: 'pages/', job: 'how to interact — one Page Object per screen', ex: 'login_page.py', color: '#58a6ff' },
  { dir: 'utils/', job: 'reusable helpers & wrappers', ex: 'driver_factory.py', color: '#f0883e' },
  { dir: 'config/', job: 'settings that live outside code', ex: 'config.json', color: '#a78bfa' },
  { dir: 'data/', job: 'test data fed from outside', ex: 'crops.json', color: '#f778ba' },
];

export default function AarchStructureVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % ROOMS.length), 1.9, auto);
  const r = ROOMS[i];

  return (
    <Stage2D
      title="A framework is a house with rooms, each with one job"
      subtitle="A pile of files becomes a junk drawer at 50 files. A real framework separates concerns: each folder does one job and doesn't meddle in the others — so the suite scales to hundreds of tests."
      accent={r.color}
      viewBox="0 0 640 250"
      controls={<>
        {ROOMS.map((rm, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{rm.dir}</button>)}
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{r.dir} — {r.job}</span>
      </>}
      legend={<>The principle is <strong>separation of concerns</strong>: <code>tests/</code> say what to verify, <code>pages/</code> know how to interact, <code>utils/</code> hold reusable helpers, <code>config/</code> keeps settings outside code, <code>data/</code> feeds test inputs. Plus <code>conftest.py</code> for fixtures and <code>requirements.txt</code>. Every later phase drops neatly into one of these rooms.</>}
    >
      {/* house outline */}
      <path d="M 60 70 L 320 30 L 580 70 L 580 220 L 60 220 Z" fill="none" stroke="#30363d" strokeWidth="2" />
      <line x1="60" y1="70" x2="580" y2="70" stroke="#30363d" strokeWidth="2" />
      <text x="320" y="56" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="system-ui">KisanKart framework/</text>

      {/* rooms grid */}
      {ROOMS.map((rm, k) => {
        const active = k === i;
        const col = k % 3, rowi = Math.floor(k / 3);
        const x = 78 + col * 168, y = 84 + rowi * 66;
        return (
          <g key={k}>
            <rect x={x} y={y} width="152" height="56" rx="9"
              fill={active ? `${rm.color}22` : '#161b22'} stroke={active ? rm.color : '#30363d'}
              strokeWidth={active ? 3 : 1.5} className={active ? 'dsa2d-pulse' : ''} />
            <text x={x + 12} y={y + 24} fill={active ? rm.color : '#c9d1d9'} fontSize="13" fontWeight="700" fontFamily="Consolas">{rm.dir}</text>
            <text x={x + 12} y={y + 44} fill="#8b949e" fontSize="9.5" fontFamily="system-ui">{rm.job.length > 24 ? rm.job.slice(0, 24) + '…' : rm.job}</text>
          </g>
        );
      })}

      {/* example file for active room */}
      <rect x="410" y="150" width="152" height="56" rx="9" fill="#0d1117" stroke={r.color} strokeWidth="1.5" />
      <text x="424" y="170" fill="#8b949e" fontSize="9.5" fontFamily="system-ui">e.g. inside {r.dir}</text>
      <text x="424" y="190" fill={r.color} fontSize="12" fontFamily="Consolas">{r.ex}</text>
    </Stage2D>
  );
}
