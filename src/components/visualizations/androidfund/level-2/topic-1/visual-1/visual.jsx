/* Lesson: Your First Appium Script — the Session Lifecycle
 * Concept: every test is the same 4-stage loop — build caps → webdriver.Remote() opens the
 * session and launches the app → find elements & act (click/send_keys) → driver.quit() closes
 * the session and frees the device. The discipline that matters most: ALWAYS close. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const STAGES = [
  { label: 'Build the order', code: 'options = UiAutomator2Options()...', note: 'assemble capabilities', color: '#a78bfa' },
  { label: 'Open the session', code: 'driver = webdriver.Remote(url, options=options)', note: 'connect → app launches', color: '#58a6ff' },
  { label: 'Find & act', code: "driver.find_element(...).click()", note: 'tap, type, assert', color: '#f0883e' },
  { label: 'Close the session', code: 'driver.quit()', note: 'free the device — always!', color: '#4fce78' },
];

export default function AfundSessionLifecycleVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STAGES.length), 1.7, auto);
  const s = STAGES[i];

  // positions on a loop
  const pos = [{ x: 130, y: 70 }, { x: 430, y: 70 }, { x: 430, y: 158 }, { x: 130, y: 158 }];

  return (
    <Stage2D
      title="The session lifecycle: every test's skeleton"
      subtitle="Your first script is the shape of every script that follows: build capabilities, open a session (the app launches), drive the UI, then close. Skipping the close is what leaves devices wedged."
      accent="#58a6ff"
      viewBox="0 0 640 250"
      controls={<>
        {STAGES.map((st, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{s.note}</span>
      </>}
      legend={<>Wrap the body in <code>try / finally</code> and put <code>driver.quit()</code> in the <code>finally</code> so the session closes even when an assertion fails. A leaked session keeps the device busy and makes the <em>next</em> run fail with a confusing error — so the close matters more than any single tap.</>}
    >
      {/* loop arrows */}
      {[0, 1, 2, 3].map(k => {
        const a = pos[k], b = pos[(k + 1) % 4];
        const active = i === k;
        return <line key={k} x1={a.x + (k === 0 ? 120 : k === 2 ? -120 : 60)} y1={a.y + (k % 2 === 0 && k === 0 ? 0 : 0) + (k === 1 ? 44 : k === 3 ? -44 : 22)}
          x2={b.x + (k === 0 ? -60 : k === 2 ? 60 : 60)} y2={b.y + (k === 1 ? -44 : k === 3 ? 44 : 22)}
          stroke={active ? s.color : '#30363d'} strokeWidth={active ? 3 : 2} strokeDasharray={active ? '6 4' : '0'} className={active ? 'dsa2d-flow' : ''} />;
      })}

      {STAGES.map((st, k) => {
        const active = i === k;
        return (
          <g key={k}>
            <rect x={pos[k].x} y={pos[k].y} width="140" height="52" rx="11"
              fill={active ? `${st.color}22` : '#161b22'} stroke={active ? st.color : '#30363d'}
              strokeWidth={active ? 3 : 1.5} className={active ? 'dsa2d-pulse' : ''} />
            <text x={pos[k].x + 70} y={pos[k].y + 23} fill="#e6edf3" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{k + 1}. {st.label}</text>
            <text x={pos[k].x + 70} y={pos[k].y + 41} fill="#8b949e" fontSize="10.5" textAnchor="middle" fontFamily="system-ui">{st.note}</text>
          </g>
        );
      })}

      {/* center label */}
      <text x="300" y="110" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">session</text>
      <text x="300" y="126" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">lifecycle</text>

      {/* current code line */}
      <rect x="30" y="216" width="580" height="30" rx="7" fill="#0d1117" stroke={s.color} strokeWidth="1.5" />
      <text x="44" y="236" fill={s.color} fontSize="12.5" fontFamily="Consolas">{s.code}</text>
    </Stage2D>
  );
}
