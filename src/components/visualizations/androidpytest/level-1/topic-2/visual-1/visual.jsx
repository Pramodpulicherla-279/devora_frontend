/* Lesson: Pytest Fixtures and conftest.py — Sharing the Driver the Clean Way
 * Concept: a fixture is the "stage crew" — code before `yield` is setup, the yielded value is
 * handed to the test, code after `yield` is teardown (runs even if the test fails). One fixture
 * in conftest.py serves many tests, so setup/quit isn't copy-pasted 50 times. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const PHASES = [
  { id: 'setup', label: 'setup (before yield)', code: 'options = UiAutomator2Options()...\ndriver = webdriver.Remote(...)', note: 'stage crew builds the set', color: '#58a6ff' },
  { id: 'yield', label: 'yield driver', code: 'yield driver', note: 'hand the ready driver to the test', color: '#a78bfa' },
  { id: 'test', label: 'test runs', code: 'def test_x(driver): driver.find_element(...)', note: 'the actor just performs', color: '#f0883e' },
  { id: 'teardown', label: 'teardown (after yield)', code: 'driver.quit()', note: 'crew strikes the set — even on failure', color: '#4fce78' },
];

export default function ApytestFixturesVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % PHASES.length), 1.7, auto);
  const p = PHASES[i];

  return (
    <Stage2D
      title="Fixtures: setup and teardown, written once"
      subtitle="A fixture is the stage crew — it builds the driver before each test, hands it over, then tears it down afterward, even when the test fails. Put it in conftest.py and every test shares it."
      accent="#58a6ff"
      viewBox="0 0 640 250"
      controls={<>
        {PHASES.map((ph, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{p.label} — {p.note}</span>
      </>}
      legend={<>The magic ingredient is <code>yield</code>: code <em>before</em> it is setup, the yielded value is what the test receives, and code <em>after</em> it is teardown that always runs. Placing the fixture in <strong>conftest.py</strong> shares it across every test file automatically — no imports, no copy-pasted <code>try/finally</code>. Fixture <code>scope</code> controls how often setup runs.</>}
    >
      {/* the fixture timeline */}
      {PHASES.map((ph, k) => {
        const active = i === k;
        const isFixture = ph.id !== 'test';
        return (
          <g key={k}>
            <rect x={30 + k * 150} y="50" width="138" height="60" rx="11"
              fill={active ? `${ph.color}22` : '#161b22'} stroke={active ? ph.color : (isFixture ? '#30363d' : '#484f58')}
              strokeWidth={active ? 3 : 1.5} strokeDasharray={isFixture ? '0' : '5 4'}
              className={active ? 'dsa2d-pulse' : ''} />
            <text x={99 + k * 150} y="76" fill="#e6edf3" fontSize="11.5" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{ph.label.split(' (')[0]}</text>
            <text x={99 + k * 150} y="96" fill="#8b949e" fontSize="9.5" textAnchor="middle" fontFamily="system-ui">{ph.id === 'test' ? 'the actor' : 'stage crew'}</text>
            {k < PHASES.length - 1 && <text x={172 + k * 150} y="84" fill={i > k ? ph.color : '#484f58'} fontSize="16" textAnchor="middle">→</text>}
          </g>
        );
      })}
      <path d="M 30 44 L 618 44" stroke="#30363d" strokeWidth="1" strokeDasharray="3 3" />
      <text x="30" y="38" fill="#58a6ff" fontSize="10" fontFamily="system-ui">◄ conftest.py fixture ►</text>
      <text x="480" y="38" fill="#f0883e" fontSize="10" fontFamily="system-ui">test file</text>

      {/* many tests share one fixture */}
      <text x="30" y="140" fill="#8b949e" fontSize="11" fontFamily="system-ui">one fixture serves every test:</text>
      {['test_login', 'test_cart', 'test_search', 'test_checkout'].map((t, k) => (
        <g key={k}>
          <rect x={30 + k * 148} y="150" width="134" height="30" rx="6" fill="#161b22" stroke="#30363d" />
          <text x={97 + k * 148} y="169" fill="#c9d1d9" fontSize="11" textAnchor="middle" fontFamily="Consolas">{t}(driver)</text>
          <path d={`M ${97 + k * 148} 150 L ${97 + k * 148} 118`} stroke="#58a6ff" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
        </g>
      ))}

      {/* current code */}
      <rect x="30" y="196" width="588" height="42" rx="9" fill="#0d1117" stroke={p.color} strokeWidth="1.5" />
      {p.code.split('\n').map((ln, k) => (
        <text key={k} x="44" y={214 + k * 16} fill={p.color} fontSize="11.5" fontFamily="Consolas">{ln}</text>
      ))}
    </Stage2D>
  );
}
