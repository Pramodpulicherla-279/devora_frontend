/* Lesson: Screenshots on Failure — A Photo of the Crime Scene
 * Concept: a camera wired to a motion sensor. The sensor is the pytest_runtest_makereport hook,
 * which fires for ALL THREE phases of every test — setup, call, teardown. Without the
 * report.when == "call" guard the camera also snaps during setup and teardown, sometimes when the
 * driver is already being torn down. Toggle the guard and watch which phases trip the shutter. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const PHASES = [
  { key: 'setup', label: 'setup', sub: 'fixtures run — driver is being built', outcome: 'fixture error' },
  { key: 'call', label: 'call', sub: 'the test body runs — this is the real test', outcome: 'assertion failed' },
  { key: 'teardown', label: 'teardown', sub: 'cleanup — driver is being quit', outcome: 'cleanup error' },
];

export default function ArepFailureHookVisualization() {
  const [guarded, setGuarded] = useState(true);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setGuarded(v => !v), 2.8, auto);

  // With the guard only "call" trips the shutter; without it, every failed phase does.
  const fires = p => (guarded ? p.key === 'call' : true);
  const shots = PHASES.filter(fires);

  return (
    <Stage2D
      title="The failure hook: a camera that must fire on exactly one phase"
      subtitle="pytest_runtest_makereport runs three times per test — setup, call, teardown. Forget the phase check and your crime-scene camera starts snapping during cleanup, when the driver is already gone."
      accent={guarded ? '#4fce78' : '#f85149'}
      viewBox="0 0 640 300"
      controls={<>
        <button className={`dsa2d-btn ${!guarded ? 'dsa2d-btn--on' : ''}`} onClick={() => setGuarded(false)}>no phase check</button>
        <button className={`dsa2d-btn ${guarded ? 'dsa2d-btn--on' : ''}`} onClick={() => setGuarded(true)}>{'report.when == "call"'}</button>
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">
          {guarded
            ? 'shutter trips once — one clean PNG attached to the failed test ✓'
            : 'shutter trips on all three phases — duplicate and broken captures 💥'}
        </span>
      </>}
      legend={<>The hook fires after <em>every</em> phase, so <code>report.failed</code> alone is not enough — you also need <code>report.when == "call"</code> to act only on the real test body. Pull the driver from <code>item.funcargs.get("driver")</code> and attach the PNG with <code>allure.attach(...)</code> so the photo lands beside the failed test, its steps, and its error. Capture <strong>only on failure</strong>: screenshotting every test buries the report under hundreds of identical green screens.</>}
    >
      <text x="20" y="32" fill="#8b949e" fontSize="10.5" fontFamily="system-ui">one test → three phases → the hook runs three times</text>

      {PHASES.map((p, k) => {
        const armed = fires(p);
        const isCall = p.key === 'call';
        const stroke = armed ? (isCall ? '#56d364' : '#f85149') : '#30363d';
        return (
          <g key={p.key}>
            <rect x={20 + k * 202} y="44" width="186" height="96" rx="11"
              fill={armed ? (isCall ? 'rgba(86,211,100,.08)' : 'rgba(248,81,73,.08)') : '#161b22'}
              stroke={stroke} strokeWidth={armed ? 2.2 : 1.4}
              className={armed && !isCall ? 'dsa2d-blink' : ''} />
            <text x={113 + k * 202} y="66" fill="#e6edf3" fontSize="12.5" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{p.label}</text>
            <text x={113 + k * 202} y="83" fill="#8b949e" fontSize="8.5" textAnchor="middle" fontFamily="system-ui">{p.sub}</text>
            <text x={113 + k * 202} y="106" fill={armed ? stroke : '#484f58'} fontSize="19" textAnchor="middle">{armed ? '📸' : '—'}</text>
            <text x={113 + k * 202} y="128" fill={armed ? stroke : '#484f58'} fontSize="8.5" textAnchor="middle" fontFamily="Consolas">
              {armed ? 'shutter trips' : 'correctly ignored'}
            </text>
            {k < 2 && <text x={212 + k * 202} y="98" fill="#484f58" fontSize="15" textAnchor="middle">→</text>}
          </g>
        );
      })}

      {/* what lands in the Allure report */}
      <text x="20" y="170" fill="#8b949e" fontSize="10.5" fontFamily="system-ui">attached to the Allure report</text>
      <rect x="16" y="180" width="608" height="76" rx="11"
        fill={guarded ? 'rgba(86,211,100,.05)' : 'rgba(248,81,73,.05)'}
        stroke={guarded ? '#56d364' : '#f85149'} strokeWidth="1.8" />
      {shots.map((p, k) => {
        const ok = p.key === 'call';
        return (
          <g key={p.key} className="dsa2d-pop">
            <rect x={32 + k * 196} y="194" width="180" height="48" rx="8" fill="#0d1117" stroke={ok ? '#56d364' : '#f85149'} strokeWidth="1.4" />
            <text x={122 + k * 196} y="212" fill={ok ? '#79c0ff' : '#f85149'} fontSize="9" textAnchor="middle" fontFamily="Consolas">
              {ok ? 'failure_test_create_listing' : `failure (${p.key})`}
            </text>
            <text x={122 + k * 196} y="230" fill={ok ? '#8b949e' : '#f85149'} fontSize="8.5" textAnchor="middle" fontFamily="system-ui">
              {ok ? 'PNG of the exact failure screen' : p.key === 'teardown' ? 'driver already quit → error' : 'duplicate, no test context'}
            </text>
          </g>
        );
      })}

      <text x="20" y="278" fill={guarded ? '#56d364' : '#f85149'} fontSize="10" fontFamily="system-ui">
        {guarded
          ? '✓ One photo, taken at the moment the test body failed — enough to diagnose a UI failure you never watched happen.'
          : '✗ Three captures per test: confusing duplicates, and a teardown attempt against a driver that no longer exists.'}
      </text>
      <text x="20" y="293" fill="#6e7681" fontSize="9.5" fontFamily="system-ui">
        {'The BasePage take_screenshot() helper still covers deliberate mid-flow captures — the hook only handles the automatic failure case.'}
      </text>
    </Stage2D>
  );
}
