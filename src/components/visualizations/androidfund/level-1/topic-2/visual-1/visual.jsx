/* Lesson: Appium Capabilities — Configuring Your Session
 * Concept: capabilities are a hotel check-in form (key/value) handed to the Appium server. Some
 * keys say WHERE (platformName, deviceName, automationName); two competing keys say WHAT app —
 * `app` (install a fresh .apk) vs `appPackage`+`appActivity` (wake an already-installed app).
 * Fill the form and toggle the two "what" strategies; a complete form → session created. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function AfundCapabilitiesFormVisualization() {
  const [mode, setMode] = useState('installed'); // 'installed' or 'apk'
  const [row, setRow] = useState(0);
  const [auto, setAuto] = useState(true);

  const where = [
    ['platformName', '"Android"'],
    ['deviceName', 'emulator-5554'],
    ['automationName', '"UiAutomator2"'],
  ];
  const what = mode === 'installed'
    ? [['appPackage', 'com.kisankart.app'], ['appActivity', '.MainActivity']]
    : [['app', '/path/to/KisanKart.apk']];
  const rows = [...where, ...what];
  const N = rows.length + 1;
  useAutoPlay(() => setRow(r => (r + 1) % N), 1.1, auto);
  const filled = Math.min(row, rows.length);
  const done = row >= rows.length;

  return (
    <Stage2D
      title="Capabilities = your session's check-in form"
      subtitle="Each capability is a key/value the Appium server reads to set up your session. Get them right and the session launches; get one wrong and you meet 'session not created'."
      accent="#a78bfa"
      viewBox="0 0 640 250"
      controls={<>
        <button className={`dsa2d-btn ${mode === 'installed' ? 'dsa2d-btn--on' : ''}`} onClick={() => { setMode('installed'); setRow(0); }}>appPackage + appActivity</button>
        <button className={`dsa2d-btn ${mode === 'apk' ? 'dsa2d-btn--on' : ''}`} onClick={() => { setMode('apk'); setRow(0); }}>app (.apk)</button>
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{done ? 'form complete → session created ✓' : `filling row ${filled + 1}…`}</span>
      </>}
      legend={<>The <strong>where</strong> keys (platformName, deviceName, automationName) rarely change. The <strong>what</strong> choice matters: <code>app</code> installs a fresh APK ("bring your own bottle"); <code>appPackage</code>+<code>appActivity</code> wake an already-installed app ("order from the shelf"). The <code>UiAutomator2Options</code> helper sets automationName for you.</>}
    >
      {/* form header */}
      <rect x="30" y="26" width="380" height="30" rx="7" fill="#161b22" stroke="#a78bfa" strokeWidth="1.5" />
      <text x="44" y="46" fill="#c9bdf5" fontSize="13" fontWeight="700" fontFamily="system-ui">Appium check-in form</text>
      <text x="396" y="46" fill="#8b949e" fontSize="11" textAnchor="end" fontFamily="system-ui">key → value</text>

      {rows.map(([k, v], idx) => {
        const on = idx < filled || done;
        const active = idx === filled && !done;
        const group = idx < where.length ? '#a78bfa' : '#f0883e';
        return (
          <g key={idx}>
            <rect x="30" y={64 + idx * 34} width="380" height="30" rx="6"
              fill={active ? 'rgba(167,139,250,.14)' : on ? '#12161d' : '#0d1117'}
              stroke={active ? '#a78bfa' : on ? group : '#30363d'} strokeWidth={active ? 2.5 : 1.5}
              className={active ? 'dsa2d-pulse' : ''} />
            <text x="44" y={84 + idx * 34} fill={on ? '#e6edf3' : '#6e7681'} fontSize="12.5" fontFamily="Consolas">{k}</text>
            <text x="240" y={84 + idx * 34} fill={on ? group : '#6e7681'} fontSize="12" fontFamily="Consolas">{on ? v : '…'}</text>
            {on && <text x="398" y={84 + idx * 34} fill="#56d364" fontSize="13" textAnchor="end">✓</text>}
          </g>
        );
      })}
      <text x="34" y={64 + rows.length * 34 + 20} fill="#6e7681" fontSize="10.5" fontFamily="system-ui">
        {mode === 'installed' ? 'orange = which already-installed app to wake' : 'orange = APK to install fresh, then launch'}
      </text>

      {/* server / session result */}
      <rect x="440" y="64" width="170" height="150" rx="12"
        fill={done ? 'rgba(86,211,100,.1)' : '#161b22'} stroke={done ? '#56d364' : '#30363d'} strokeWidth="2" />
      <text x="525" y="92" fill="#a78bfa" fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="Consolas">Appium server</text>
      <text x="525" y="128" fill={done ? '#56d364' : '#8b949e'} fontSize="34" textAnchor="middle">{done ? '✓' : '⋯'}</text>
      <text x="525" y="158" fill="#e6edf3" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{done ? 'session' : 'reading'}</text>
      <text x="525" y="176" fill="#e6edf3" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{done ? 'created' : 'form…'}</text>
      <text x="525" y="200" fill="#8b949e" fontSize="10.5" textAnchor="middle" fontFamily="system-ui">{done ? 'app launches' : `${filled}/${rows.length} keys`}</text>
    </Stage2D>
  );
}
