/* Lesson: Appium Waits and Synchronization
 * Concept: the test runs in milliseconds; the app needs real time to load. Without synchronization
 * the test taps a button that isn't there yet → race condition → flaky failure. Three approaches:
 * static sleep (bad), implicit wait (ok), explicit wait (best — polls until a condition is true). */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const MODES = [
  { id: 'none', name: 'No wait', verdict: 'fail', color: '#f85149', desc: 'test taps before the button exists → race condition', code: 'driver.find_element(...).click()' },
  { id: 'sleep', name: 'time.sleep(5)', verdict: 'slow', color: '#f0a35e', desc: 'always waits 5s — wastes time if ready early, fails if slower', code: 'time.sleep(5); el.click()' },
  { id: 'implicit', name: 'implicit wait', verdict: 'ok', color: '#58a6ff', desc: 'standing rule: poll up to N s for any find_element', code: 'driver.implicitly_wait(10)' },
  { id: 'explicit', name: 'explicit wait', verdict: 'best', color: '#4fce78', desc: 'poll until THIS condition is true, then proceed instantly', code: 'WebDriverWait(driver,10).until(EC.element_to_be_clickable(...))' },
];

export default function AlocWaitsVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % MODES.length), 2.2, auto);
  const m = MODES[i];
  // app becomes ready at t=3 (of 0..10 timeline). Show where the test "acts".
  const readyAt = 3;
  const actAt = m.id === 'none' ? 0 : m.id === 'sleep' ? 5 : readyAt; // explicit/implicit act right when ready
  const success = m.id !== 'none' && actAt >= readyAt;

  return (
    <Stage2D
      title="Waits: move at the app's pace, not ahead of it"
      subtitle="Your code runs in milliseconds; the app needs real time to load a screen. Tap too early and you hit a race condition — the #1 cause of flaky tests. There are three ways to wait; two are good."
      accent={m.color}
      viewBox="0 0 640 250"
      controls={<>
        {MODES.map((x, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{x.name.split(/[.( ]/)[0]}</button>)}
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{m.name}: {success ? 'element ready → click ✓' : m.id === 'none' ? 'element not present ✗' : 'wasted time / brittle'}</span>
      </>}
      legend={<>Avoid <code>time.sleep()</code> — it’s slow when the app is fast and fails when it’s slow. An <strong>implicit wait</strong> is a global "retry finds for up to N seconds". An <strong>explicit wait</strong> (<code>WebDriverWait…until(EC…)</code>) polls for a specific condition and continues the instant it’s met — the most precise and reliable, and the one to reach for.</>}
    >
      {/* timeline */}
      <text x="30" y="44" fill="#8b949e" fontSize="11" fontFamily="system-ui">time →</text>
      <line x1="30" y1="70" x2="610" y2="70" stroke="#30363d" strokeWidth="2" />
      {[0, 2, 4, 6, 8, 10].map(t => (
        <g key={t}><line x1={30 + t * 58} y1="64" x2={30 + t * 58} y2="76" stroke="#484f58" /><text x={30 + t * 58} y="92" fill="#6e7681" fontSize="9" textAnchor="middle" fontFamily="Consolas">{t}s</text></g>
      ))}
      {/* app-ready marker */}
      <line x1={30 + readyAt * 58} y1="56" x2={30 + readyAt * 58} y2="84" stroke="#4fce78" strokeWidth="2.5" strokeDasharray="4 3" />
      <text x={30 + readyAt * 58} y="52" fill="#56d364" fontSize="10" textAnchor="middle" fontFamily="system-ui">app ready</text>

      {/* app loading bar */}
      <rect x="30" y="108" width={readyAt * 58} height="20" rx="5" fill="rgba(86,211,100,.15)" stroke="#56d364" />
      <text x={34 + readyAt * 58} y="123" fill="#8b949e" fontSize="10.5" fontFamily="system-ui">← screen loads (button appears)</text>

      {/* where the test acts */}
      <g>
        <circle cx={30 + actAt * 58} cy="150" r="9" fill={success ? '#4fce78' : '#f85149'} className="dsa2d-pulse" />
        <text x={30 + actAt * 58} y="176" fill={success ? '#56d364' : '#f85149'} fontSize="10.5" textAnchor="middle" fontFamily="system-ui">test acts</text>
        {m.id === 'sleep' && <rect x="30" y="144" width={5 * 58} height="12" rx="4" fill="rgba(240,163,94,.2)" stroke="#f0a35e" />}
        {m.id === 'sleep' && <text x={30 + 5 * 58 + 6} y="153" fill="#f0a35e" fontSize="9.5" fontFamily="system-ui">slept fixed 5s</text>}
        {(m.id === 'implicit' || m.id === 'explicit') && <rect x="30" y="144" width={readyAt * 58} height="12" rx="4" fill="rgba(88,166,255,.18)" stroke={m.color} />}
        {(m.id === 'implicit' || m.id === 'explicit') && <text x={30 + readyAt * 58 + 6} y="153" fill={m.color} fontSize="9.5" fontFamily="system-ui">polled, then acted the instant it was ready</text>}
      </g>

      {/* verdict + code */}
      <rect x="30" y="192" width="580" height="46" rx="9" fill={`${m.color}18`} stroke={m.color} strokeWidth="2" />
      <text x="44" y="212" fill={m.color} fontSize="13" fontWeight="700" fontFamily="system-ui">{m.name} — {m.verdict.toUpperCase()}</text>
      <text x="44" y="230" fill="#c9d1d9" fontSize="11" fontFamily="system-ui">{m.desc}</text>
    </Stage2D>
  );
}
