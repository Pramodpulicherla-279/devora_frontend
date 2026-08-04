/* Lesson: Driver Factory — The Engine Room of Your Framework
 * Concept: like a car assembly line, a Driver Factory takes a config spec (device, app, server)
 * and manufactures a ready-to-drive Appium session behind one clean call. Switching device or
 * environment, or running in parallel, becomes "what you ask for", not rewriting code. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const SPECS = [
  { name: 'local emulator', device: 'emulator-5554', server: 'http://localhost:4723', color: '#a78bfa' },
  { name: 'real phone', device: 'R58N20xxxxx', server: 'http://localhost:4723', color: '#4fce78' },
  { name: 'cloud device', device: 'Pixel 7 · cloud', server: 'https://farm/wd/hub', color: '#58a6ff' },
];

export default function AarchDriverFactoryVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % SPECS.length), 2, auto);
  const s = SPECS[i];

  return (
    <Stage2D
      title="Driver Factory: one assembly line for every session"
      subtitle="Hand the factory a spec — which device, which app, which server — and it runs it down the line and returns a fully-configured driver. Switch devices or run in parallel by changing the spec, not the code."
      accent={s.color}
      viewBox="0 0 640 250"
      controls={<>
        {SPECS.map((sp, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{sp.name}</button>)}
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">create_driver("{s.name}") → ready session ✓</span>
      </>}
      legend={<>Centralizing driver creation means all the messy capability logic lives in one place behind a single call like <code>DriverFactory.create(config)</code>. Tests and fixtures just ask for a driver; the factory reads config and builds it. Changing device, environment, or going parallel becomes a config choice — no capability edits scattered across the suite.</>}
    >
      {/* spec in */}
      <rect x="20" y="80" width="140" height="90" rx="11" fill="#161b22" stroke={s.color} strokeWidth="2" />
      <text x="90" y="102" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="system-ui">config spec</text>
      <text x="34" y="126" fill="#c9d1d9" fontSize="10.5" fontFamily="Consolas">device:</text>
      <text x="34" y="141" fill={s.color} fontSize="10" fontFamily="Consolas">{s.device}</text>
      <text x="34" y="160" fill="#c9d1d9" fontSize="10.5" fontFamily="Consolas">server: …</text>

      <path d="M 160 125 L 220 125" stroke={s.color} strokeWidth="3" markerEnd="url(#aarch-a)" className="dsa2d-flow" strokeDasharray="6 4" />
      <defs><marker id="aarch-a" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={s.color} /></marker></defs>

      {/* the factory / assembly line */}
      <rect x="222" y="72" width="200" height="106" rx="12" fill="rgba(255,255,255,.03)" stroke={s.color} strokeWidth="2" />
      <text x="322" y="94" fill={s.color} fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">DriverFactory</text>
      {['read config', 'build options', 'start session'].map((step, k) => (
        <g key={k}>
          <rect x={236 + k * 60} y="108" width="52" height="30" rx="6" fill="#0d1117" stroke="#30363d" />
          <text x={262 + k * 60} y="127" fill="#8b949e" fontSize="8.5" textAnchor="middle" fontFamily="system-ui">{step}</text>
          {k < 2 && <text x={294 + k * 60} y="127" fill={s.color} fontSize="12" textAnchor="middle">›</text>}
        </g>
      ))}
      <text x="322" y="162" fill="#8b949e" fontSize="9.5" textAnchor="middle" fontFamily="system-ui">one assembly line, every session</text>

      <path d="M 422 125 L 482 125" stroke={s.color} strokeWidth="3" markerEnd="url(#aarch-a)" className="dsa2d-flow" strokeDasharray="6 4" />

      {/* ready driver out */}
      <rect x="484" y="86" width="134" height="78" rx="11" fill={`${s.color}18`} stroke={s.color} strokeWidth="2" className="dsa2d-pop" />
      <text x="551" y="112" fill="#e6edf3" fontSize="26" textAnchor="middle">🚗</text>
      <text x="551" y="136" fill="#e6edf3" fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="system-ui">ready driver</text>
      <text x="551" y="153" fill="#8b949e" fontSize="9.5" textAnchor="middle" fontFamily="system-ui">fully configured</text>

      <text x="20" y="210" fill="#8b949e" fontSize="11.5" fontFamily="system-ui">Same call, different spec → the test never changes when the device does.</text>
    </Stage2D>
  );
}
