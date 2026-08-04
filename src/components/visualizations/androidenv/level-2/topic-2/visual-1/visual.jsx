/* Lesson: Appium 2 Server Setup — Server, Drivers, and Inspector
 * Concept: Appium 2's core server is deliberately minimal — "a phone with no apps yet". It can't
 * automate anything until you install DRIVERS (UiAutomator2 for Android, XCUITest for iOS…).
 * Watch the bare server gain capability as each driver is plugged in. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const DRIVERS = [
  { id: 'uiautomator2', label: 'uiautomator2', platform: 'Android', color: '#4fce78' },
  { id: 'xcuitest', label: 'xcuitest', platform: 'iOS', color: '#79c0ff' },
];

export default function AenvAppiumDriversVisualization() {
  const [installed, setInstalled] = useState(0); // 0 = bare core, 1..2 drivers added
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setInstalled(v => (v + 1) % (DRIVERS.length + 1)), 1.8, auto);

  return (
    <Stage2D
      title="Appium 2 = a small core + the drivers you install"
      subtitle="Appium 2 ships a lean core server that automates nothing on its own. You add capability by installing drivers — for Android you install UiAutomator2. Same server, plug in what each platform needs."
      accent="#a78bfa"
      viewBox="0 0 640 250"
      controls={<>
        <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setInstalled(v => (v + 1) % (DRIVERS.length + 1))}>install next driver</button>
        <button className="dsa2d-btn" onClick={() => setInstalled(0)}>↺ bare core</button>
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{installed === 0 ? 'appium (core only) — cannot automate yet' : `appium driver install ${DRIVERS[installed - 1].id} ✓`}</span>
      </>}
      legend={<>Install with <code>npm i -g appium</code>, then add a driver: <code>appium driver install uiautomator2</code>. Check what's installed with <code>appium driver list</code>. The <strong>Appium Inspector</strong> is a separate GUI app that connects to the running server so you can explore a live app's elements. Start the server with just <code>appium</code>.</>}
    >
      {/* the core server */}
      <rect x="230" y="30" width="180" height="70" rx="12" fill="rgba(167,139,250,.12)" stroke="#a78bfa" strokeWidth="2.5" />
      <text x="320" y="58" fill="#c9bdf5" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">Appium 2 core</text>
      <text x="320" y="80" fill="#8b949e" fontSize="11.5" textAnchor="middle" fontFamily="system-ui">HTTP server · routes requests</text>

      {/* driver slots */}
      {DRIVERS.map((d, i) => {
        const on = installed >= i + 1;
        const cx = 150 + i * 250;
        return (
          <g key={d.id}>
            {/* connector */}
            <path d={`M ${cx > 320 ? cx - 30 : cx + 130} 150 L ${cx > 320 ? 380 : 260} 100`} stroke={on ? d.color : '#30363d'} strokeWidth="2.5" strokeDasharray={on ? '0' : '5 4'} opacity={on ? 1 : 0.5} />
            <rect x={cx - 65} y="150" width="150" height="66" rx="10"
              fill={on ? `${d.color}1f` : '#161b22'} stroke={on ? d.color : '#30363d'}
              strokeWidth={on ? 2.5 : 1.5} strokeDasharray={on ? '0' : '6 4'}
              className={on && installed === i + 1 ? 'dsa2d-pop' : ''} />
            <text x={cx + 10} y="178" fill={on ? d.color : '#8b949e'} fontSize="13.5" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{d.label}</text>
            <text x={cx + 10} y="198" fill="#8b949e" fontSize="11.5" textAnchor="middle" fontFamily="system-ui">drives {d.platform}</text>
            {!on && <text x={cx + 10} y="240" fill="#6e7681" fontSize="11" textAnchor="middle" fontFamily="system-ui">empty slot</text>}
          </g>
        );
      })}

      {/* capability meter */}
      <text x="470" y="52" fill="#8b949e" fontSize="12" fontFamily="system-ui">can automate:</text>
      <text x="470" y="74" fill={installed === 0 ? '#f85149' : '#56d364'} fontSize="13" fontWeight="700" fontFamily="system-ui">
        {installed === 0 ? 'nothing yet' : DRIVERS.slice(0, installed).map(d => d.platform).join(' + ')}
      </text>

      <text x="30" y="52" fill="#8b949e" fontSize="12" fontFamily="system-ui">for this track</text>
      <text x="30" y="72" fill="#a78bfa" fontSize="12" fontWeight="700" fontFamily="system-ui">you need</text>
      <text x="30" y="90" fill="#a78bfa" fontSize="12" fontWeight="700" fontFamily="Consolas">uiautomator2</text>
    </Stage2D>
  );
}
