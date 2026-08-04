/* Lesson: Reading Appium Session Errors and Server Logs
 * Concept: two logs tell two stories. The CLIENT log (Python traceback) says WHAT failed —
 * usually the generic "session not created". The SERVER log (the kitchen ticket) says WHY —
 * the real underlying cause. Cycle real failures and compare the vague client line with the
 * precise server line that actually points at the fix. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const CASES = [
  { client: 'session not created', server: "Could not find 'adb' — ANDROID_HOME not set", fix: 'set ANDROID_HOME / PATH' },
  { client: 'session not created', server: 'app com.kisankart.app is not installed on the device', fix: 'install the APK first' },
  { client: 'session not created', server: 'automationName UiAutomator2 driver not installed', fix: 'appium driver install uiautomator2' },
  { client: 'NoSuchElementException', server: 'element not found for locator id=login_btn', fix: 'fix the locator / add a wait' },
];

export default function AfundTwoLogsVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % CASES.length), 2.4, auto);
  const c = CASES[i];

  return (
    <Stage2D
      title="Two logs: the client says WHAT, the server says WHY"
      subtitle="The Python traceback tells you a test failed — often just 'session not created'. The Appium server log is the kitchen's order ticket: it shows the real reason. Always read the server log."
      accent="#f85149"
      viewBox="0 0 640 250"
      controls={<>
        {CASES.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>case {k + 1}</button>)}
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">fix → {c.fix}</span>
      </>}
      legend={<>The client log is you at your table ("my order never came"); the server log is the kitchen ticket showing exactly what broke. When a session fails, stop tweaking capabilities at random — open the terminal running <code>appium</code> and read downward to the first real error. Add <code>--log-level debug</code> for more detail.</>}
    >
      {/* client log */}
      <rect x="24" y="34" width="270" height="150" rx="10" fill="#0d1117" stroke="#f85149" strokeWidth="1.5" />
      <rect x="24" y="34" width="270" height="26" rx="10" fill="rgba(248,81,73,.12)" />
      <text x="38" y="52" fill="#ff9d95" fontSize="12" fontWeight="700" fontFamily="Consolas">CLIENT log · Python</text>
      <text x="280" y="52" fill="#8b949e" fontSize="10" textAnchor="end" fontFamily="system-ui">"what"</text>
      <text x="38" y="82" fill="#8b949e" fontSize="11" fontFamily="Consolas">Traceback (most recent…):</text>
      <text x="38" y="102" fill="#8b949e" fontSize="11" fontFamily="Consolas">  driver = webdriver.Remote(…)</text>
      <rect x="34" y="118" width="250" height="46" rx="6" fill="rgba(248,81,73,.1)" stroke="#f85149" className="dsa2d-pulse" />
      <text x="44" y="138" fill="#ff9d95" fontSize="11.5" fontFamily="Consolas">{c.client.length > 30 ? c.client.slice(0, 30) : c.client}</text>
      <text x="44" y="155" fill="#8b949e" fontSize="10" fontFamily="system-ui">generic — tells you little</text>

      {/* arrow */}
      <text x="312" y="114" fill="#8b949e" fontSize="22" textAnchor="middle">→</text>
      <text x="312" y="134" fill="#8b949e" fontSize="9.5" textAnchor="middle" fontFamily="system-ui">read the</text>
      <text x="312" y="146" fill="#8b949e" fontSize="9.5" textAnchor="middle" fontFamily="system-ui">server</text>

      {/* server log */}
      <rect x="332" y="34" width="284" height="150" rx="10" fill="#0d1117" stroke="#56d364" strokeWidth="1.5" />
      <rect x="332" y="34" width="284" height="26" rx="10" fill="rgba(86,211,100,.12)" />
      <text x="346" y="52" fill="#7ee787" fontSize="12" fontWeight="700" fontFamily="Consolas">SERVER log · appium</text>
      <text x="602" y="52" fill="#8b949e" fontSize="10" textAnchor="end" fontFamily="system-ui">"why"</text>
      <text x="346" y="80" fill="#8b949e" fontSize="10.5" fontFamily="Consolas">[HTTP] POST /session</text>
      <text x="346" y="96" fill="#8b949e" fontSize="10.5" fontFamily="Consolas">[UiAutomator2] starting session…</text>
      <rect x="342" y="106" width="264" height="62" rx="6" fill="rgba(240,136,62,.1)" stroke="#f0883e" className="dsa2d-pulse" />
      <text x="352" y="124" fill="#f0883e" fontSize="10.5" fontWeight="700" fontFamily="Consolas">[error] the real cause:</text>
      {c.server.match(/.{1,34}(\s|$)/g).slice(0, 3).map((line, k) => (
        <text key={k} x="352" y={140 + k * 14} fill="#f8c088" fontSize="10.5" fontFamily="Consolas">{line.trim()}</text>
      ))}

      <text x="24" y="208" fill="#8b949e" fontSize="12" fontFamily="system-ui">Same failure, two accounts — the fix always comes from the server side.</text>
      <text x="24" y="228" fill="#56d364" fontSize="12" fontWeight="700" fontFamily="system-ui">→ {c.fix}</text>
    </Stage2D>
  );
}
