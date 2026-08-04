/* Lesson: Pytest Basics — Turning Scripts Into a Real Test Suite
 * Concept: pytest is an automated grader. It discovers your tests, runs each, checks conditions
 * with `assert`, and prints a clean pass/fail report — showing actual vs expected on failure.
 * Watch it grade a small suite: dots for pass, F for fail, then a summary. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const TESTS = [
  { name: 'test_login_ok', pass: true, assertion: 'assert title == "Home"' },
  { name: 'test_add_to_cart', pass: true, assertion: 'assert count == 1' },
  { name: 'test_total_price', pass: false, assertion: 'assert total == 120', got: 'got 90' },
  { name: 'test_logout', pass: true, assertion: 'assert on_login_screen' },
];

export default function ApytestGraderVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % (TESTS.length + 1)), 1.4, auto);
  const graded = Math.min(i, TESTS.length);
  const done = i >= TESTS.length;
  const passed = TESTS.slice(0, graded).filter(t => t.pass).length;
  const failed = graded - passed;

  return (
    <Stage2D
      title="Pytest: the automated grader for your tests"
      subtitle="Instead of squinting at print statements across 50 scripts, pytest runs every test, marks each pass or fail with `assert`, and hands back a tidy report — the leap from 'I ran a script' to 'I have tests'."
      accent="#4fce78"
      viewBox="0 0 640 250"
      controls={<>
        <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setI(v => (v + 1) % (TESTS.length + 1))}>grade next</button>
        <button className="dsa2d-btn" onClick={() => setI(0)}>↺</button>
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{done ? `${passed} passed, ${failed} failed` : `running ${TESTS[graded]?.name}…`}</span>
      </>}
      legend={<>You state a condition with <code>assert</code>; if it’s false the test fails. Pytest’s trick: on failure it shows the <em>actual</em> values ("expected 120, got 90"), so you don’t need print statements. It auto-discovers files named <code>test_*.py</code> and functions named <code>test_*</code>. Run it with just <code>pytest</code>.</>}
    >
      {/* test list */}
      {TESTS.map((t, k) => {
        const isGraded = k < graded;
        const active = k === graded && !done;
        return (
          <g key={k}>
            <rect x="30" y={40 + k * 42} width="330" height="34" rx="7"
              fill={active ? 'rgba(255,212,59,.1)' : isGraded ? (t.pass ? 'rgba(86,211,100,.1)' : 'rgba(248,81,73,.1)') : '#161b22'}
              stroke={active ? '#ffd43b' : isGraded ? (t.pass ? '#56d364' : '#f85149') : '#30363d'} strokeWidth={active ? 2.5 : 1.5}
              className={active ? 'dsa2d-pulse' : ''} />
            <text x="44" y={62 + k * 42} fill="#c9d1d9" fontSize="12.5" fontFamily="Consolas">{t.name}</text>
            {isGraded && <text x="300" y={62 + k * 42} fill={t.pass ? '#7ee787' : '#ff9d95'} fontSize="12" fontFamily="Consolas">{t.pass ? 'PASS .' : 'FAIL F'}</text>}
          </g>
        );
      })}

      {/* assert / failure detail */}
      <rect x="378" y="40" width="232" height="86" rx="10" fill="#0d1117" stroke="#30363d" />
      <text x="392" y="60" fill="#8b949e" fontSize="10.5" fontFamily="system-ui">the "correct answer" = assert</text>
      <text x="392" y="82" fill="#79c0ff" fontSize="11.5" fontFamily="Consolas">{TESTS[Math.min(graded, TESTS.length - 1)].assertion}</text>
      {done ? null : (TESTS[graded] && !TESTS[graded].pass)
        ? <text x="392" y="106" fill="#ff9d95" fontSize="11.5" fontFamily="Consolas">✗ expected 120, {TESTS[graded].got}</text>
        : <text x="392" y="106" fill="#7ee787" fontSize="11.5" fontFamily="Consolas">✓ condition holds</text>}

      {/* report */}
      <rect x="378" y="138" width="232" height="80" rx="10" fill={done ? (failed ? 'rgba(248,81,73,.08)' : 'rgba(86,211,100,.1)') : '#161b22'} stroke={done ? (failed ? '#f85149' : '#56d364') : '#30363d'} strokeWidth="2" />
      <text x="392" y="160" fill="#8b949e" fontSize="10.5" fontFamily="system-ui">pytest report</text>
      <text x="494" y="186" fill={failed ? '#f0a35e' : '#56d364'} fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{graded ? TESTS.slice(0, graded).map(t => t.pass ? '.' : 'F').join(' ') : '…'}</text>
      <text x="494" y="208" fill="#e6edf3" fontSize="12" textAnchor="middle" fontFamily="Consolas">{done ? `${passed} passed, ${failed} failed` : `${graded}/${TESTS.length} run`}</text>
    </Stage2D>
  );
}
