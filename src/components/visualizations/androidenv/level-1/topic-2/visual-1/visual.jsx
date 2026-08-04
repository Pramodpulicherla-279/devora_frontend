/* Lesson: Java JDK and Android SDK Setup for Appium
 * Concept: your test → Appium server → adb → device is a chain. ANDROID_HOME + PATH are what
 * let Appium FIND adb. If they're not set, the chain snaps at the adb link — no automation.
 * Toggle the env vars and watch the chain connect or break. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function AenvSdkChainVisualization() {
  const [set, setSet] = useState(false); // ANDROID_HOME / PATH configured?
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setSet(v => !v), 2.2, auto);

  const links = [
    { label: 'Python\ntest code', x: 20, ok: true },
    { label: 'Appium\nserver', x: 175, ok: true },
    { label: 'adb', x: 330, ok: set },
    { label: 'Android\ndevice', x: 485, ok: set },
  ];

  return (
    <Stage2D
      title="ANDROID_HOME & PATH: the link that reaches the device"
      subtitle="Your code never talks to the phone directly. It flows test → Appium server → adb → device. ANDROID_HOME and PATH are the address labels that let Appium locate adb — miss them and the chain snaps."
      accent="#f0883e"
      viewBox="0 0 640 250"
      controls={<>
        <button className={`dsa2d-btn ${!set ? 'dsa2d-btn--on' : ''}`} onClick={() => setSet(false)}>vars NOT set</button>
        <button className={`dsa2d-btn ${set ? 'dsa2d-btn--on' : ''}`} onClick={() => setSet(true)}>vars set ✓</button>
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{set ? 'ANDROID_HOME + PATH set → Appium finds adb → device reachable' : 'ANDROID_HOME missing → "Could not find adb" 💥'}</span>
      </>}
      legend={<>The <strong>JDK</strong> is the engine Android's tools run on; the <strong>Android SDK</strong> is the toolbox that contains <code>adb</code> (in <code>platform-tools</code>). <code>ANDROID_HOME</code> says "the SDK lives here" and <code>PATH</code> lets you type <code>adb</code> from anywhere. Verify with <code>java -version</code> and <code>adb devices</code> before writing any test. Install the <strong>JDK</strong>, not the JRE.</>}
    >
      {links.map((l, i) => (
        <g key={i}>
          <rect x={l.x} y="70" width="115" height="60" rx="10"
            fill={l.ok ? 'rgba(240,136,62,.1)' : 'rgba(248,81,73,.08)'}
            stroke={l.ok ? '#f0883e' : '#f85149'} strokeWidth="2" />
          {l.label.split('\n').map((t, k) => (
            <text key={k} x={l.x + 57} y={l.label.includes('\n') ? 96 + k * 17 : 105} fill="#e6edf3" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{t}</text>
          ))}
        </g>
      ))}

      {/* connectors between links */}
      {links.slice(0, -1).map((l, i) => {
        const broken = i === 1 && !set; // the adb link (server → adb) is where it snaps
        return (
          <g key={i}>
            {broken ? (
              <>
                <path d={`M ${l.x + 115} 100 L ${l.x + 135} 100`} stroke="#f85149" strokeWidth="3" />
                <path d={`M ${l.x + 155} 100 L ${l.x + 175} 100`} stroke="#f85149" strokeWidth="3" />
                <text x={l.x + 145} y="88" fill="#f85149" fontSize="16" textAnchor="middle" className="dsa2d-blink">✂</text>
              </>
            ) : (
              <path d={`M ${l.x + 115} 100 L ${l.x + 175} 100`} stroke="#f0883e" strokeWidth="3" markerEnd="url(#aenv-c)" />
            )}
          </g>
        );
      })}
      <defs><marker id="aenv-c" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#f0883e" /></marker></defs>

      {/* env var labels feeding the adb link */}
      <g opacity={set ? 1 : 0.5}>
        <rect x="250" y="158" width="230" height="52" rx="8" fill="#161b22" stroke={set ? '#f0883e' : '#30363d'} strokeWidth="1.5" strokeDasharray={set ? '0' : '5 4'} />
        <text x="365" y="178" fill={set ? '#f8c088' : '#8b949e'} fontSize="12" textAnchor="middle" fontFamily="Consolas">ANDROID_HOME = …/Android/Sdk</text>
        <text x="365" y="198" fill={set ? '#f8c088' : '#8b949e'} fontSize="12" textAnchor="middle" fontFamily="Consolas">PATH += …/platform-tools</text>
      </g>
      <path d={`M 365 158 L 387 130`} stroke={set ? '#f0883e' : '#484f58'} strokeWidth="2" strokeDasharray="4 3" opacity={set ? 1 : 0.4} />

      <text x="20" y="238" fill={set ? '#56d364' : '#f85149'} fontSize="13" fontWeight="700" fontFamily="system-ui">{set ? '✓ every link connected — Appium can drive the device' : '✗ Appium literally cannot locate adb — no test can start'}</text>
    </Stage2D>
  );
}
