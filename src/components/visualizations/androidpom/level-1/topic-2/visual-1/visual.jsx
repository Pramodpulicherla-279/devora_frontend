/* Lesson: Page Classes — The Page Object Model in Action
 * Concept: a page object is a remote control. It exposes intent-named actions (login(),
 * create_listing()) and hides the wiring (locators, waits, clicks) behind them. Tests press
 * buttons and read like user stories; a locator change means editing ONE file. Toggle POM on/off. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function ApomRemoteControlVisualization() {
  const [pom, setPom] = useState(true);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setPom(v => !v), 2.6, auto);

  return (
    <Stage2D
      title="A page object is a remote control for one screen"
      subtitle="Press ‘volume up’ — you don't care about the infrared circuit. A page object exposes buttons like login() and hides the wiring (locators, waits, clicks). Tests press buttons and never touch the wiring."
      accent="#58a6ff"
      viewBox="0 0 640 250"
      controls={<>
        <button className={`dsa2d-btn ${!pom ? 'dsa2d-btn--on' : ''}`} onClick={() => setPom(false)}>test without POM</button>
        <button className={`dsa2d-btn ${pom ? 'dsa2d-btn--on' : ''}`} onClick={() => setPom(true)}>test with POM</button>
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{pom ? 'test reads like a user story; locator change → edit 1 file ✓' : 'wall of find_element; id change → hunt through 50 tests 💥'}</span>
      </>}
      legend={<>A page object exposes <strong>actions</strong> (<code>login()</code>, <code>create_listing()</code>) and hides <strong>locators + waits + clicks</strong> inside. Benefits: tests read like plain user stories, and when an id changes you edit the <em>one</em> page class, not every test. This is the pattern the whole industry builds mobile frameworks around.</>}
    >
      {/* the test file */}
      <text x="30" y="42" fill="#8b949e" fontSize="11" fontFamily="system-ui">test_login.py</text>
      <rect x="30" y="50" width="270" height="160" rx="10" fill="#0d1117" stroke={pom ? '#56d364' : '#f85149'} strokeWidth="1.5" />
      {pom ? (
        <>
          <text x="44" y="80" fill="#79c0ff" fontSize="12" fontFamily="Consolas">page = LoginPage(driver)</text>
          <text x="44" y="104" fill="#7ee787" fontSize="12" fontFamily="Consolas">page.login("ravi", "pw")</text>
          <text x="44" y="128" fill="#7ee787" fontSize="12" fontFamily="Consolas">assert page.is_home()</text>
          <text x="44" y="168" fill="#56d364" fontSize="10.5" fontFamily="system-ui">✓ reads like a user story</text>
          <text x="44" y="186" fill="#56d364" fontSize="10.5" fontFamily="system-ui">✓ no locators in the test</text>
        </>
      ) : (
        <>
          <text x="44" y="76" fill="#ff9d95" fontSize="9.5" fontFamily="Consolas">find(ID,"...:id/user").send_keys("ravi")</text>
          <text x="44" y="94" fill="#ff9d95" fontSize="9.5" fontFamily="Consolas">find(ID,"...:id/pass").send_keys("pw")</text>
          <text x="44" y="112" fill="#ff9d95" fontSize="9.5" fontFamily="Consolas">find(ID,"...:id/login_btn").click()</text>
          <text x="44" y="130" fill="#ff9d95" fontSize="9.5" fontFamily="Consolas">wait(EC.presence(ID,"...:id/home"))</text>
          <text x="44" y="164" fill="#f85149" fontSize="10.5" fontFamily="system-ui">💥 what does it even do?</text>
          <text x="44" y="182" fill="#8b949e" fontSize="10.5" fontFamily="system-ui">id changes → fix in 50 tests</text>
        </>
      )}

      {/* remote control */}
      <rect x="336" y="46" width="120" height="168" rx="18" fill="#161b22" stroke="#58a6ff" strokeWidth="2" />
      <text x="396" y="70" fill="#79c0ff" fontSize="11" textAnchor="middle" fontWeight="700" fontFamily="Consolas">LoginPage</text>
      {['login()', 'reset_pw()', 'is_home()'].map((b, k) => (
        <g key={k}>
          <rect x="352" y={82 + k * 40} width="88" height="30" rx="15" fill={pom ? 'rgba(88,166,255,.18)' : '#0d1117'} stroke="#58a6ff" strokeWidth="1.5" />
          <text x="396" y={101 + k * 40} fill="#c9d1d9" fontSize="11" textAnchor="middle" fontFamily="Consolas">{b}</text>
        </g>
      ))}
      <text x="396" y="228" fill="#8b949e" fontSize="10" textAnchor="middle" fontFamily="system-ui">exposes actions (buttons)</text>

      {/* the hidden wiring */}
      <rect x="478" y="46" width="140" height="168" rx="10" fill="#0d1117" stroke="#30363d" strokeWidth="1.5" strokeDasharray="5 4" />
      <text x="548" y="66" fill="#8b949e" fontSize="10" textAnchor="middle" fontFamily="system-ui">hidden wiring ⚡</text>
      <text x="492" y="90" fill="#6e7681" fontSize="9.5" fontFamily="Consolas">locators (ids)</text>
      <text x="492" y="112" fill="#6e7681" fontSize="9.5" fontFamily="Consolas">explicit waits</text>
      <text x="492" y="134" fill="#6e7681" fontSize="9.5" fontFamily="Consolas">find + click</text>
      <text x="492" y="156" fill="#6e7681" fontSize="9.5" fontFamily="Consolas">send_keys</text>
      <text x="548" y="192" fill="#8b949e" fontSize="9" textAnchor="middle" fontFamily="system-ui">tests never</text>
      <text x="548" y="204" fill="#8b949e" fontSize="9" textAnchor="middle" fontFamily="system-ui">touch this</text>
      <path d="M 456 130 L 476 130" stroke="#58a6ff" strokeWidth="2" markerEnd="url(#apom-a)" opacity="0.6" />
      <defs><marker id="apom-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#58a6ff" /></marker></defs>
    </Stage2D>
  );
}
