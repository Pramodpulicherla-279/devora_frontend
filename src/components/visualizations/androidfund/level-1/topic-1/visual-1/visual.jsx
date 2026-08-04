/* Lesson: Android App Internals — Finding appPackage and appActivity
 * Concept: an APK is a sealed "shipping box" (a ZIP). Inside sits AndroidManifest.xml — the
 * shipping label — which declares appPackage (the unique barcode ID) and appActivity (the first
 * screen to open). Step from the box → open it → read the two values Appium needs. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const STEPS = [
  { log: 'an APK is a single installable file — a sealed box' },
  { log: 'unzip it: manifest + classes.dex + res/ + assets/' },
  { log: 'AndroidManifest.xml is the shipping label — read it' },
  { log: 'appPackage = com.kisankart.app (the unique barcode)' },
  { log: 'appActivity = .MainActivity (the first screen to open)' },
];

export default function AfundApkAnatomyVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 2, auto);

  const open = i >= 1;
  const contents = [
    { name: 'AndroidManifest.xml', tag: 'the label', hot: i >= 2 },
    { name: 'classes.dex', tag: 'compiled code', hot: false },
    { name: 'res/  assets/', tag: 'images, layouts', hot: false },
  ];

  return (
    <Stage2D
      title="Inside an APK: where appPackage & appActivity live"
      subtitle="An APK is just a ZIP — a labelled shipping box. The AndroidManifest.xml inside is the label that declares the app's identity. Two values from it configure every Appium session."
      accent="#4fce78"
      viewBox="0 0 640 250"
      controls={<>
        {STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{STEPS[i].log}</span>
      </>}
      legend={<>Extract the values with <code>appium driver run uiautomator2 ...</code>, Appium Inspector, or <code>adb shell dumpsys window | grep -i mCurrentFocus</code> while the app is open. <strong>appPackage</strong> is the app's unique reverse-domain ID (no two apps share one); <strong>appActivity</strong> is the screen Appium opens first. Both come straight from the manifest.</>}
    >
      {/* the box */}
      <g>
        {/* lid */}
        <path d={`M 40 ${open ? 58 : 78} L 150 ${open ? 40 : 60} L 250 ${open ? 58 : 78} L 140 ${open ? 76 : 96} Z`} fill="#1b2230" stroke="#4fce78" strokeWidth="2" style={{ transition: 'all .4s' }} />
        {/* body */}
        <path d="M 40 78 L 140 96 L 140 190 L 40 172 Z" fill="#161b22" stroke="#4fce78" strokeWidth="2" />
        <path d="M 140 96 L 250 78 L 250 172 L 140 190 Z" fill="#12161d" stroke="#4fce78" strokeWidth="2" />
        <text x="90" y="140" fill="#7ee787" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas" transform="rotate(9 90 140)">APK</text>
        <text x="145" y="212" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="system-ui">KisanKart.apk (a ZIP)</text>
      </g>

      {/* contents revealed */}
      {open && contents.map((c, k) => (
        <g key={k} className="dsa2d-fade">
          <rect x="290" y={38 + k * 46} width="230" height="38" rx="8"
            fill={c.hot ? 'rgba(86,211,100,.14)' : '#161b22'} stroke={c.hot ? '#56d364' : '#30363d'}
            strokeWidth={c.hot ? 2.5 : 1.5} className={c.hot && i === 2 ? 'dsa2d-pulse' : ''} />
          <text x="304" y={56 + k * 46} fill={c.hot ? '#7ee787' : '#c9d1d9'} fontSize="12.5" fontFamily="Consolas">{c.name}</text>
          <text x="304" y={70 + k * 46} fill="#8b949e" fontSize="10.5" fontFamily="system-ui">{c.tag}</text>
        </g>
      ))}

      {/* the two extracted values */}
      {i >= 3 && (
        <g className="dsa2d-pop">
          <rect x="290" y="188" width="330" height="30" rx="7" fill="rgba(88,166,255,.12)" stroke="#58a6ff" strokeWidth="2" />
          <text x="300" y="208" fill="#79c0ff" fontSize="12.5" fontFamily="Consolas">appPackage = com.kisankart.app</text>
        </g>
      )}
      {i >= 4 && (
        <g className="dsa2d-pop">
          <rect x="290" y="222" width="330" height="26" rx="7" fill="rgba(240,136,62,.12)" stroke="#f0883e" strokeWidth="2" />
          <text x="300" y="240" fill="#f8c088" fontSize="12.5" fontFamily="Consolas">appActivity = .MainActivity</text>
        </g>
      )}
      {i < 3 && <text x="405" y="205" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">the manifest answers "which app?" and "which screen?"</text>}
    </Stage2D>
  );
}
