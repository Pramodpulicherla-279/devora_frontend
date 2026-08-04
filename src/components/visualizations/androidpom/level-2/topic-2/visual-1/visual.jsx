/* Lesson: Page Object Best Practices and Anti-Patterns
 * Concept: "witnesses report; judges decide." A page object should REPORT facts/state (return the
 * status text, return a page), never DELIVER verdicts (assert). Assertions belong in tests. Baking
 * assert into login() breaks the negative test (login fails with wrong OTP). Toggle the two. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function ApomBestPracticesVisualization() {
  const [good, setGood] = useState(true);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setGood(v => !v), 2.6, auto);

  return (
    <Stage2D
      title="Witnesses report; judges decide"
      subtitle="A witness states what they saw; the judge delivers the verdict. A page object should report facts (return the status text) — assertions (the verdict) belong in the test, so the page stays reusable."
      accent={good ? '#4fce78' : '#f85149'}
      viewBox="0 0 640 250"
      controls={<>
        <button className={`dsa2d-btn ${!good ? 'dsa2d-btn--on' : ''}`} onClick={() => setGood(false)}>anti-pattern</button>
        <button className={`dsa2d-btn ${good ? 'dsa2d-btn--on' : ''}`} onClick={() => setGood(true)}>best practice</button>
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{good ? 'page reports; test asserts → both happy & sad paths testable ✓' : 'assert baked into login() → can’t test the failure case 💥'}</span>
      </>}
      legend={<>Keep page objects as <strong>witnesses</strong>: methods perform actions and <em>return</em> state (text, booleans, or the next page object) — no assertions, no test logic, no <code>sleep</code>. Put every <code>assert</code> in the <strong>test</strong> (the judge). This keeps pages reusable across both success and failure scenarios; an assert baked into <code>login()</code> makes a "login should fail" test impossible.</>}
    >
      {/* page object = witness */}
      <text x="150" y="42" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="system-ui">LoginPage (the witness)</text>
      <rect x="30" y="50" width="240" height="120" rx="10" fill="#0d1117" stroke={good ? '#56d364' : '#f85149'} strokeWidth="1.5" />
      {good ? (
        <>
          <text x="44" y="76" fill="#79c0ff" fontSize="11" fontFamily="Consolas">def login(self, u, p):</text>
          <text x="44" y="96" fill="#c9d1d9" fontSize="11" fontFamily="Consolas">  self.type(USER, u)</text>
          <text x="44" y="114" fill="#c9d1d9" fontSize="11" fontFamily="Consolas">  self.tap(SUBMIT)</text>
          <text x="44" y="134" fill="#7ee787" fontSize="11" fontFamily="Consolas">  return HomePage(self.driver)</text>
          <text x="44" y="158" fill="#56d364" fontSize="10" fontFamily="system-ui">✓ reports (returns), no verdict</text>
        </>
      ) : (
        <>
          <text x="44" y="76" fill="#79c0ff" fontSize="11" fontFamily="Consolas">def login(self, u, p):</text>
          <text x="44" y="96" fill="#c9d1d9" fontSize="11" fontFamily="Consolas">  self.type(USER, u); self.tap(SUBMIT)</text>
          <text x="44" y="116" fill="#ff9d95" fontSize="11" fontFamily="Consolas">  assert self.is_home()  ← verdict!</text>
          <text x="44" y="140" fill="#f85149" fontSize="10" fontFamily="system-ui">💥 always insists login succeeded</text>
          <text x="44" y="156" fill="#8b949e" fontSize="10" fontFamily="system-ui">so a "wrong OTP" test can’t run</text>
        </>
      )}

      {/* test = judge */}
      <text x="470" y="42" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="system-ui">the test (the judge)</text>
      <rect x="350" y="50" width="270" height="120" rx="10" fill="#0d1117" stroke={good ? '#56d364' : '#30363d'} strokeWidth="1.5" />
      {good ? (
        <>
          <text x="364" y="76" fill="#7ee787" fontSize="10.5" fontFamily="Consolas">home = login.login("ravi","pw")</text>
          <text x="364" y="98" fill="#f8c088" fontSize="10.5" fontFamily="Consolas">assert home.is_loaded()   # happy</text>
          <text x="364" y="126" fill="#7ee787" fontSize="10.5" fontFamily="Consolas">login.login("ravi","bad")</text>
          <text x="364" y="148" fill="#f8c088" fontSize="10.5" fontFamily="Consolas">assert login.error_shown()  # sad</text>
        </>
      ) : (
        <>
          <text x="364" y="86" fill="#8b949e" fontSize="10.5" fontFamily="Consolas">login.login("ravi","bad")</text>
          <text x="364" y="112" fill="#ff9d95" fontSize="10.5" fontFamily="Consolas"># explodes inside login()'s</text>
          <text x="364" y="128" fill="#ff9d95" fontSize="10.5" fontFamily="Consolas"># own assert — test can't even</text>
          <text x="364" y="144" fill="#ff9d95" fontSize="10.5" fontFamily="Consolas"># reach its own check</text>
        </>
      )}

      {/* verdict banner */}
      <rect x="30" y="182" width="590" height="42" rx="9" fill={good ? 'rgba(86,211,100,.1)' : 'rgba(248,81,73,.1)'} stroke={good ? '#56d364' : '#f85149'} strokeWidth="2" />
      <text x="44" y="202" fill={good ? '#56d364' : '#f85149'} fontSize="12.5" fontWeight="700" fontFamily="system-ui">{good ? 'Best practice: pages act & return; tests assert' : 'Anti-pattern: assertions (and waits/test logic) buried in the page object'}</text>
      <text x="44" y="218" fill="#8b949e" fontSize="10.5" fontFamily="system-ui">{good ? 'Also avoid: sleeps in pages, and no test logic inside a page.' : 'It quietly recreates the exact rigidity POM was meant to remove.'}</text>
    </Stage2D>
  );
}
