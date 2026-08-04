/* Lesson: Handling Permission Dialogs and Unexpected Pop-ups
 * Concept: a runtime permission dialog or stray modal walks onto the stage mid-test, steals focus,
 * and blocks the element you wanted. Two defenses: PREVENT (grant permissions up front so no
 * dialog appears) and HANDLE (detect the dialog and dismiss it, then continue). Toggle the two. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function AlocPopupsVisualization() {
  const [mode, setMode] = useState('none'); // none = interrupted, prevent, handle
  const [auto, setAuto] = useState(true);
  const MODES = ['none', 'prevent', 'handle'];
  useAutoPlay(() => setMode(m => MODES[(MODES.indexOf(m) + 1) % 3]), 2.4, auto);

  const dialogShown = mode === 'none' || mode === 'handle';
  const succeeds = mode !== 'none';

  return (
    <Stage2D
      title="Surviving permission dialogs & surprise pop-ups"
      subtitle="A ‘Allow location?’ dialog appears mid-flow, blocks your target button, and the test gives up — nothing in your code was wrong, reality just interrupted. Two defenses keep tests real-world-proof."
      accent="#a78bfa"
      viewBox="0 0 640 250"
      controls={<>
        <button className={`dsa2d-btn ${mode === 'none' ? 'dsa2d-btn--on' : ''}`} onClick={() => setMode('none')}>unprepared</button>
        <button className={`dsa2d-btn ${mode === 'prevent' ? 'dsa2d-btn--on' : ''}`} onClick={() => setMode('prevent')}>prevent</button>
        <button className={`dsa2d-btn ${mode === 'handle' ? 'dsa2d-btn--on' : ''}`} onClick={() => setMode('handle')}>handle</button>
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{mode === 'none' ? 'dialog blocks the target → test fails ✗' : mode === 'prevent' ? 'granted up front → no dialog ✓' : 'dialog detected → dismissed → continue ✓'}</span>
      </>}
      legend={<>Since Android 6, apps ask for permissions at runtime. <strong>Prevent</strong>: grant them up front with the <code>autoGrantPermissions</code> capability or <code>adb shell pm grant</code>, so no dialog appears. <strong>Handle</strong>: wrap risky steps to detect a dialog and tap "Allow"/"While using the app" before proceeding. Prevention is cleaner; handling covers the modals you can’t predict.</>}
    >
      {/* phone with the test flow */}
      <rect x="245" y="30" width="150" height="204" rx="16" fill="#0d1117" stroke="#30363d" strokeWidth="2" />
      <rect x="258" y="46" width="124" height="26" rx="6" fill="#161b22" stroke="#30363d" />
      <text x="320" y="63" fill="#8b949e" fontSize="10" textAnchor="middle" fontFamily="system-ui">KisanKart onboarding</text>
      {/* target button */}
      <rect x="258" y="180" width="124" height="34" rx="7" fill={succeeds && !dialogShown ? 'rgba(86,211,100,.2)' : mode === 'handle' ? 'rgba(86,211,100,.2)' : 'rgba(88,166,255,.1)'} stroke={mode === 'none' ? '#484f58' : '#56d364'} strokeWidth="2" />
      <text x="320" y="202" fill={mode === 'none' ? '#6e7681' : '#7ee787'} fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="system-ui">Continue →</text>

      {/* the intruding dialog */}
      {dialogShown && (
        <g className={mode === 'handle' ? 'dsa2d-fade' : 'dsa2d-pop'} opacity={mode === 'handle' ? 0.55 : 1}>
          <rect x="256" y="92" width="128" height="86" rx="8" fill="#1b2230" stroke="#a78bfa" strokeWidth="2" />
          <text x="320" y="112" fill="#c9bdf5" fontSize="9.5" textAnchor="middle" fontFamily="system-ui">Allow KisanKart to</text>
          <text x="320" y="125" fill="#c9bdf5" fontSize="9.5" textAnchor="middle" fontFamily="system-ui">access location?</text>
          <rect x="268" y="140" width="48" height="24" rx="5" fill="#0d1117" stroke="#30363d" />
          <text x="292" y="156" fill="#8b949e" fontSize="9" textAnchor="middle">Deny</text>
          <rect x="324" y="140" width="48" height="24" rx="5" fill={mode === 'handle' ? 'rgba(86,211,100,.25)' : '#0d1117'} stroke={mode === 'handle' ? '#56d364' : '#a78bfa'} strokeWidth={mode === 'handle' ? 2 : 1} className={mode === 'handle' ? 'dsa2d-pulse' : ''} />
          <text x="348" y="156" fill={mode === 'handle' ? '#7ee787' : '#c9bdf5'} fontSize="9" textAnchor="middle">Allow</text>
          {mode === 'handle' && <text x="320" y="190" fill="#56d364" fontSize="9" textAnchor="middle" fontFamily="system-ui">← test dismisses it</text>}
        </g>
      )}
      {mode === 'prevent' && <text x="320" y="130" fill="#56d364" fontSize="11" textAnchor="middle" fontFamily="system-ui">(no dialog — pre-granted)</text>}

      {/* left explainer */}
      <text x="30" y="60" fill="#e6edf3" fontSize="14" fontWeight="700" fontFamily="system-ui">
        {mode === 'none' ? 'Unprepared' : mode === 'prevent' ? 'Prevent' : 'Handle gracefully'}
      </text>
      <text x="30" y="84" fill="#8b949e" fontSize="11" fontFamily="system-ui">{mode === 'none' ? 'pop-up steals focus,' : mode === 'prevent' ? 'grant permissions before' : 'detect the dialog, tap'}</text>
      <text x="30" y="100" fill="#8b949e" fontSize="11" fontFamily="system-ui">{mode === 'none' ? 'blocks the target button' : mode === 'prevent' ? 'the flow even starts' : 'Allow, then carry on'}</text>
      {mode !== 'none' && <rect x="30" y="116" width="196" height="30" rx="6" fill="#0d1117" stroke="#a78bfa" />}
      {mode === 'prevent' && <text x="40" y="136" fill="#c9bdf5" fontSize="10" fontFamily="Consolas">autoGrantPermissions=true</text>}
      {mode === 'handle' && <text x="40" y="136" fill="#c9bdf5" fontSize="10" fontFamily="Consolas">if dialog: tap "Allow"</text>}

      {/* verdict */}
      <text x="30" y="180" fill={succeeds ? '#56d364' : '#f85149'} fontSize="13" fontWeight="700" fontFamily="system-ui">{succeeds ? '✓ flow continues' : '✗ test fails'}</text>
      <text x="30" y="200" fill="#8b949e" fontSize="10.5" fontFamily="system-ui">a test that can’t handle</text>
      <text x="30" y="215" fill="#8b949e" fontSize="10.5" fontFamily="system-ui">interruptions is a lab demo,</text>
      <text x="30" y="230" fill="#8b949e" fontSize="10.5" fontFamily="system-ui">not a real-world test</text>
    </Stage2D>
  );
}
