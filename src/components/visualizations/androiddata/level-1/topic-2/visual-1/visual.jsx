/* Lesson: Hybrid Framework Assembly — Making All the Pieces Play Together
 * Concept: an orchestra, not a pile of instruments. Config, Driver Factory, Page Objects, JSON
 * locators, JSON data, and fixtures all play together, with the test as conductor, to run a full
 * KisanKart journey end to end. Step through the journey and watch each layer come in on cue. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const STEPS = [
  { step: 'fixture asks Driver Factory for a driver', layers: ['config', 'factory'], journey: 'session starts' },
  { step: 'test opens LoginPage, calls login()', layers: ['pages', 'locators'], journey: 'logged in' },
  { step: 'SellPage.create() fed a crop from JSON data', layers: ['pages', 'data'], journey: 'listing created' },
  { step: 'CheckoutPage confirms; test asserts', layers: ['pages'], journey: 'order placed ✓' },
  { step: 'fixture teardown → driver.quit()', layers: ['factory'], journey: 'session closed' },
];
const LAYERS = [
  { id: 'config', label: 'config', color: '#a78bfa' },
  { id: 'factory', label: 'Driver Factory', color: '#58a6ff' },
  { id: 'pages', label: 'Page Objects', color: '#4fce78' },
  { id: 'locators', label: 'JSON locators', color: '#f778ba' },
  { id: 'data', label: 'JSON data', color: '#f0883e' },
];

export default function AdataOrchestraVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 2, auto);
  const s = STEPS[i];
  const active = new Set(s.layers);

  return (
    <Stage2D
      title="The hybrid framework: an orchestra playing together"
      subtitle="Six phases of separate pieces snap into one machine. Page Objects, the Driver Factory, JSON locators and data, config and fixtures each play their part — with the test as conductor running a full journey end to end."
      accent="#4fce78"
      viewBox="0 0 640 250"
      controls={<>
        {STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{s.step}</span>
      </>}
      legend={<>"Hybrid" means it deliberately blends approaches for the strengths of each: <strong>Page Object Model</strong> for structure, <strong>data-driven</strong> JSON for cheap coverage, plus a <strong>Driver Factory</strong> and <strong>config</strong> for portability. The test is the conductor that brings each section in on cue — and a full end-to-end run is the proof the framework is real, not just concepts.</>}
    >
      {/* orchestra sections (layers) */}
      {LAYERS.map((l, k) => {
        const on = active.has(l.id);
        return (
          <g key={l.id}>
            <rect x={30 + k * 120} y="52" width="106" height="52" rx="10"
              fill={on ? `${l.color}22` : '#161b22'} stroke={on ? l.color : '#30363d'}
              strokeWidth={on ? 3 : 1.5} className={on ? 'dsa2d-pulse' : ''} />
            <text x={83 + k * 120} y="74" fill={on ? l.color : '#8b949e'} fontSize="11.5" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{l.label}</text>
            <text x={83 + k * 120} y="92" fill="#6e7681" fontSize="9" textAnchor="middle" fontFamily="system-ui">section</text>
            {on && <path d={`M ${83 + k * 120} 104 L 320 148`} stroke={l.color} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />}
          </g>
        );
      })}

      {/* the conductor (test) */}
      <rect x="220" y="140" width="200" height="40" rx="10" fill="rgba(255,255,255,.04)" stroke="#e6edf3" strokeWidth="1.5" />
      <text x="320" y="165" fill="#e6edf3" fontSize="12.5" textAnchor="middle" fontWeight="700" fontFamily="Consolas">test = the conductor 🎼</text>

      {/* journey progress */}
      <text x="30" y="204" fill="#8b949e" fontSize="11" fontFamily="system-ui">end-to-end journey:</text>
      {STEPS.map((st, k) => (
        <g key={k}>
          <circle cx={175 + k * 88} cy="200" r={k === i ? 9 : 6} fill={k <= i ? '#56d364' : '#30363d'} stroke={k === i ? '#56d364' : '#484f58'} strokeWidth="2" className={k === i ? 'dsa2d-pulse' : ''} />
          {k < STEPS.length - 1 && <line x1={184 + k * 88} y1="200" x2={166 + (k + 1) * 88} y2="200" stroke={k < i ? '#56d364' : '#30363d'} strokeWidth="2" />}
        </g>
      ))}
      <text x="320" y="234" fill="#56d364" fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{s.journey}</text>
    </Stage2D>
  );
}
