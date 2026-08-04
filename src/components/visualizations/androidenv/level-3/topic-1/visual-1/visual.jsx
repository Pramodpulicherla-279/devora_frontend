/* Lesson: ADB & Android Device Setup
 * Concept: adb is the "phone line" between your laptop and an Android device. That line can run
 * over three transports — a software emulator, a USB cable, or wireless TCP/IP — but either way
 * the device only shows up in `adb devices` once the connection is live. Cycle the modes. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const MODES = [
  { id: 'emulator', label: 'Emulator', wire: 'virtual', serial: 'emulator-5554', note: 'a fake phone running as software', color: '#a78bfa' },
  { id: 'usb', label: 'Real device · USB', wire: 'cable', serial: 'R58N20xxxxx', note: 'USB debugging ON, cable plugged in', color: '#4fce78' },
  { id: 'wifi', label: 'Real device · Wi-Fi', wire: 'wireless', serial: '192.168.0.9:5555', note: 'adb connect <ip> over the network', color: '#58a6ff' },
];

export default function AenvAdbBridgeVisualization() {
  const [m, setM] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setM(v => (v + 1) % MODES.length), 2.2, auto);
  const mode = MODES[m];

  return (
    <Stage2D
      title="adb: the phone line between laptop and device"
      subtitle="Appium leans on adb for every action on the device. The same bridge runs over three transports — an emulator, a USB cable, or Wi-Fi — and each shows up as an entry in `adb devices`."
      accent={mode.color}
      viewBox="0 0 640 250"
      controls={<>
        {MODES.map((x, k) => (
          <button key={x.id} className={`dsa2d-btn ${k === m ? 'dsa2d-btn--on' : ''}`} onClick={() => setM(k)}>{x.label.split(' · ')[0]}</button>
        ))}
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">adb devices → {mode.serial}</span>
      </>}
      legend={<>Turn on <strong>Developer Options</strong> → <strong>USB debugging</strong> on a real phone (tap Build Number 7×). Confirm the link with <code>adb devices</code> — the serial you see there is what you pass to Appium as the <code>udid</code> / <code>deviceName</code>. For wireless: <code>adb tcpip 5555</code> then <code>adb connect &lt;ip&gt;:5555</code>.</>}
    >
      {/* laptop */}
      <rect x="30" y="80" width="150" height="90" rx="12" fill="#161b22" stroke="#30363d" strokeWidth="2" />
      <rect x="46" y="96" width="118" height="46" rx="4" fill="#0d1117" stroke="#484f58" />
      <text x="105" y="124" fill="#7ee787" fontSize="12" textAnchor="middle" fontFamily="Consolas">adb</text>
      <text x="105" y="160" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">your laptop</text>

      {/* connection */}
      {mode.wire === 'virtual' && (
        <g>
          <path d="M 180 125 L 440 125" stroke={mode.color} strokeWidth="3" strokeDasharray="2 6" className="dsa2d-flow" />
          <text x="310" y="112" fill={mode.color} fontSize="12" textAnchor="middle" fontFamily="system-ui">same machine (virtual)</text>
        </g>
      )}
      {mode.wire === 'cable' && (
        <g>
          <path d="M 180 125 L 440 125" stroke={mode.color} strokeWidth="6" strokeLinecap="round" />
          <text x="310" y="112" fill={mode.color} fontSize="12" textAnchor="middle" fontFamily="system-ui">USB cable</text>
        </g>
      )}
      {mode.wire === 'wireless' && (
        <g>
          {[0, 1, 2].map(k => <path key={k} d={`M ${250 + k * 60} 110 q 15 15 0 30`} fill="none" stroke={mode.color} strokeWidth="2.5" className="dsa2d-pulse" />)}
          <path d="M 180 125 L 440 125" stroke={mode.color} strokeWidth="2" strokeDasharray="6 6" />
          <text x="310" y="98" fill={mode.color} fontSize="12" textAnchor="middle" fontFamily="system-ui">Wi-Fi (TCP/IP)</text>
        </g>
      )}
      <text x="310" y="150" fill="#8b949e" fontSize="11.5" textAnchor="middle" fontFamily="system-ui">{mode.note}</text>

      {/* device */}
      <rect x="440" y="66" width="80" height="118" rx="12" fill="rgba(255,255,255,.03)" stroke={mode.color} strokeWidth="2.5" />
      <rect x="450" y="80" width="60" height="82" rx="3" fill="#0d1117" stroke="#484f58" />
      <circle cx="480" cy="174" r="4" fill="#484f58" />
      <text x="480" y="126" fill={mode.color} fontSize="22" textAnchor="middle">{mode.id === 'emulator' ? '🖥' : '📱'}</text>

      {/* adb devices output */}
      <rect x="30" y="196" width="580" height="34" rx="7" fill="#0d1117" stroke="#30363d" />
      <text x="44" y="218" fill="#8b949e" fontSize="12.5" fontFamily="Consolas">$ adb devices  →  </text>
      <text x="205" y="218" fill="#7ee787" fontSize="12.5" fontFamily="Consolas">{mode.serial}</text>
      <text x="600" y="218" fill={mode.color} fontSize="12.5" textAnchor="end" fontFamily="Consolas">device ✓</text>
    </Stage2D>
  );
}
