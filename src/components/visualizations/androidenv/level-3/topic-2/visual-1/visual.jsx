/* Lesson: How Appium Works — the Client–Server–Driver Model
 * Concept: like ordering at a restaurant. Your test (client) sends an HTTP request in the W3C
 * WebDriver format to the Appium server (waiter), which hands it to the driver (kitchen /
 * UiAutomator2), which acts on the device — then the result travels back the same way.
 * Step a single command through all four layers and back. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const LAYERS = [
  { id: 'client', label: 'Your test', role: 'client · you order', x: 20, color: '#58a6ff' },
  { id: 'server', label: 'Appium server', role: 'waiter · takes the order', x: 175, color: '#a78bfa' },
  { id: 'driver', label: 'UiAutomator2', role: 'kitchen · cooks it', x: 330, color: '#f0883e' },
  { id: 'device', label: 'Device', role: 'the meal · app taps', x: 485, color: '#4fce78' },
];

const STEPS = [
  { edge: 0, dir: 1, log: 'test calls driver.find_element(...).click()' },
  { edge: 1, dir: 1, log: 'sent as an HTTP POST in W3C WebDriver JSON' },
  { edge: 2, dir: 1, log: 'driver translates it to a real UiAutomator2 action' },
  { edge: 2, dir: -1, log: 'device performs the tap, returns result' },
  { edge: 1, dir: -1, log: 'server passes the JSON response back' },
  { edge: 0, dir: -1, log: 'your test gets the result — command complete ✓' },
];

export default function AenvClientServerDriverVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 1.6, auto);
  const s = STEPS[i];
  const activeNodes = new Set([s.edge, s.edge + 1]);

  return (
    <Stage2D
      title="Client → Server → Driver → Device (and back)"
      subtitle="Ordering at a restaurant: you (the client) tell the waiter (Appium server) what you want, in a shared order format (HTTP + the W3C WebDriver protocol). The waiter hands it to the kitchen (the driver), which acts on the device."
      accent="#a78bfa"
      viewBox="0 0 640 250"
      controls={<>
        {STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{s.log}</span>
      </>}
      legend={<>Because the middle "order format" is the standard <strong>W3C WebDriver protocol</strong> over HTTP, the same test code can drive Appium regardless of platform — only the <em>driver</em> changes (UiAutomator2 for Android, XCUITest for iOS). This client/server split is also why you start the server first, then run your test against it.</>}
    >
      {LAYERS.map((l, idx) => {
        const active = activeNodes.has(idx);
        return (
          <g key={l.id}>
            <rect x={l.x} y="66" width="120" height="72" rx="12"
              fill={active ? `${l.color}22` : '#161b22'} stroke={active ? l.color : '#30363d'}
              strokeWidth={active ? 3 : 1.5} className={active ? 'dsa2d-pulse' : ''} />
            <text x={l.x + 60} y="98" fill="#e6edf3" fontSize="13.5" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{l.label}</text>
            <text x={l.x + 60} y="120" fill="#8b949e" fontSize="10.5" textAnchor="middle" fontFamily="system-ui">{l.role}</text>
          </g>
        );
      })}

      {/* edges between the 4 layers */}
      {[0, 1, 2].map(e => {
        const active = s.edge === e;
        const fwd = s.dir === 1;
        const x1 = LAYERS[e].x + 120, x2 = LAYERS[e + 1].x;
        return (
          <g key={e}>
            <line x1={x1} y1="102" x2={x2} y2="102" stroke={active ? LAYERS[e + 1].color : '#30363d'} strokeWidth={active ? 3 : 2} strokeDasharray={active ? '6 4' : '0'} className={active ? 'dsa2d-flow' : ''} />
            {active && (
              <text x={(x1 + x2) / 2} y={fwd ? 92 : 122} fill={LAYERS[e + 1].color} fontSize="15" textAnchor="middle">{fwd ? '▶' : '◀'}</text>
            )}
          </g>
        );
      })}

      {/* request/response band */}
      <rect x="20" y="162" width="585" height="30" rx="7" fill="#0d1117" stroke="#30363d" />
      <text x="34" y="182" fill={s.dir === 1 ? '#79c0ff' : '#7ee787'} fontSize="12.5" fontFamily="Consolas">
        {s.dir === 1 ? '→ request  (HTTP · W3C WebDriver JSON)' : '← response  (status + value JSON)'}
      </text>
      <text x="595" y="182" fill="#8b949e" fontSize="12" textAnchor="end" fontFamily="Consolas">step {i + 1}/6</text>

      <text x="20" y="222" fill="#8b949e" fontSize="12" fontFamily="system-ui">One line of your test becomes a round-trip through four layers — understanding it turns cryptic errors into obvious ones.</text>
    </Stage2D>
  );
}
