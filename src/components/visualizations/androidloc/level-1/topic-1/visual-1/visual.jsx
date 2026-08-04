/* Lesson: Appium Locator Strategies — Finding Any Element on Screen
 * Concept: a locator is how you single out one element in a crowded screen. Android has five
 * strategies, with different reliability. Cycle them against the same "Login" button and see the
 * syntax plus how robust each is. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const STRATS = [
  { name: 'Accessibility ID', by: 'AppiumBy.ACCESSIBILITY_ID', val: '"login_button"', rank: 'the name badge · best', stars: 5, color: '#4fce78' },
  { name: 'ID (resource-id)', by: 'AppiumBy.ID', val: '"com.kisankart:id/login"', rank: 'unique attendee no. · great', stars: 5, color: '#4fce78' },
  { name: 'Class Name', by: 'AppiumBy.CLASS_NAME', val: '"android.widget.Button"', rank: 'job title · matches many', stars: 2, color: '#f0a35e' },
  { name: 'UiAutomator', by: 'AppiumBy.ANDROID_UIAUTOMATOR', val: 'new UiSelector().text("Login")', rank: 'powerful native query', stars: 4, color: '#58a6ff' },
  { name: 'XPath', by: 'AppiumBy.XPATH', val: '//android.widget.Button[@text="Login"]', rank: 'position · last resort', stars: 1, color: '#f85149' },
];

export default function AlocStrategiesVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STRATS.length), 2, auto);
  const s = STRATS[i];

  return (
    <Stage2D
      title="Five ways to point at one element"
      subtitle="A locator is strategy + value passed to find_element(). Like finding one person in a crowd — by name badge, ID number, job title, or position — some strategies are far more reliable than others."
      accent={s.color}
      viewBox="0 0 640 250"
      controls={<>
        {STRATS.map((st, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{st.name.split(' ')[0]}</button>)}
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{s.name} — {s.rank}</span>
      </>}
      legend={<>Prefer <strong>Accessibility ID</strong> and <strong>resource-id</strong> — they’re intentional, unique, and stable. <code>Class Name</code> usually matches many elements; <code>XPath</code> by position is powerful but brittle and slow, so keep it as a last resort. The next lessons cover choosing for stability and confirming with the Inspector.</>}
    >
      {/* phone screen with elements */}
      <rect x="30" y="34" width="150" height="196" rx="14" fill="#0d1117" stroke="#30363d" strokeWidth="2" />
      <rect x="44" y="52" width="122" height="24" rx="5" fill="#161b22" stroke="#30363d" />
      <text x="105" y="68" fill="#8b949e" fontSize="10" textAnchor="middle" fontFamily="system-ui">KisanKart</text>
      <rect x="44" y="86" width="122" height="22" rx="5" fill="#12161d" stroke="#30363d" />
      <rect x="44" y="114" width="122" height="22" rx="5" fill="#12161d" stroke="#30363d" />
      {/* target button */}
      <rect x="44" y="150" width="122" height="34" rx="7" fill={`${s.color}22`} stroke={s.color} strokeWidth="2.5" className="dsa2d-pulse" />
      <text x="105" y="172" fill={s.color} fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="system-ui">Login</text>
      <text x="105" y="206" fill="#8b949e" fontSize="10" textAnchor="middle" fontFamily="system-ui">← target element</text>

      {/* locator card */}
      <rect x="210" y="44" width="400" height="120" rx="12" fill="#161b22" stroke={s.color} strokeWidth="2" />
      <text x="228" y="72" fill="#e6edf3" fontSize="14" fontWeight="700" fontFamily="system-ui">{s.name}</text>
      {/* reliability stars */}
      {[0, 1, 2, 3, 4].map(k => <text key={k} x={430 + k * 30} y="72" fill={k < s.stars ? s.color : '#30363d'} fontSize="16">★</text>)}
      <rect x="228" y="88" width="364" height="30" rx="6" fill="#0d1117" stroke="#30363d" />
      <text x="240" y="108" fill="#79c0ff" fontSize="11.5" fontFamily="Consolas">{s.by}</text>
      <rect x="228" y="124" width="364" height="30" rx="6" fill="#0d1117" stroke="#30363d" />
      <text x="240" y="144" fill="#7ee787" fontSize="11.5" fontFamily="Consolas">{s.val.length > 44 ? s.val.slice(0, 44) : s.val}</text>

      <text x="210" y="196" fill="#8b949e" fontSize="12" fontFamily="Consolas">driver.find_element(strategy, value)</text>
      <text x="210" y="222" fill={s.color} fontSize="12" fontWeight="700" fontFamily="system-ui">reliability: {s.rank}</text>
    </Stage2D>
  );
}
