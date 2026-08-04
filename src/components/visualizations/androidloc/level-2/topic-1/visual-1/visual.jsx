/* Lesson: Choosing Stable Locators — The Anti-Flakiness Playbook
 * Concept: pick landmarks, not step-counts. There's a priority ladder from most stable
 * (accessibility id / resource-id) down to brittle (xpath by position). When the app team nudges
 * the layout, stable locators survive while brittle ones snap. Toggle a layout change. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const LADDER = [
  { name: 'Accessibility ID', ex: 'content-desc="Login"', stable: true },
  { name: 'resource-id', ex: 'id/login', stable: true },
  { name: 'unique text', ex: 'text="Log in"', stable: 'mid' },
  { name: 'UiAutomator query', ex: 'UiSelector().text(...)', stable: 'mid' },
  { name: 'XPath by position', ex: '//Button[2] / [3]/[1]', stable: false },
];

export default function AlocStabilityLadderVisualization() {
  const [changed, setChanged] = useState(false); // app team nudged the layout
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setChanged(v => !v), 2.4, auto);

  const survives = s => s === true || s === 'mid'; // brittle (false) breaks when changed

  return (
    <Stage2D
      title="The locator stability ladder"
      subtitle="A stable locator is a landmark (‘the big red barn’); a brittle one is a step-count (‘200 steps then left’). Reach for the top of the ladder — when the layout shifts, only the landmarks keep working."
      accent="#4fce78"
      viewBox="0 0 640 250"
      controls={<>
        <button className={`dsa2d-btn ${!changed ? 'dsa2d-btn--on' : ''}`} onClick={() => setChanged(false)}>today</button>
        <button className={`dsa2d-btn ${changed ? 'dsa2d-btn--on' : ''}`} onClick={() => setChanged(true)}>app team nudges layout</button>
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{changed ? 'layout changed → brittle locators break 💥' : 'all green — but will they survive tomorrow?'}</span>
      </>}
      legend={<>Priority order: <strong>Accessibility ID → resource-id → unique text → UiAutomator → XPath-by-position</strong>. The higher you pick, the more the locator ties to something the element genuinely owns. Brittle locators depend on position or exact nesting, so a harmless layout tweak turns your suite red for no real reason.</>}
    >
      {LADDER.map((r, k) => {
        const broke = changed && !survives(r.stable);
        const ok = !broke;
        const barW = 250 - k * 34;
        return (
          <g key={k}>
            {/* rung */}
            <rect x="40" y={40 + k * 38} width={barW} height="28" rx="7"
              fill={ok ? 'rgba(86,211,100,.12)' : 'rgba(248,81,73,.12)'}
              stroke={ok ? (r.stable === true ? '#56d364' : '#f0a35e') : '#f85149'} strokeWidth="2"
              className={broke ? 'dsa2d-blink' : ''} />
            <text x="54" y={59 + k * 38} fill="#e6edf3" fontSize="12.5" fontWeight="700" fontFamily="system-ui">{r.name}</text>
            <text x={54} y={59 + k * 38} fill="transparent">.</text>
            <text x="308" y={59 + k * 38} fill={ok ? '#7ee787' : '#ff9d95'} fontSize="12" fontFamily="Consolas">{r.ex}</text>
            <text x="590" y={59 + k * 38} fill={ok ? '#56d364' : '#f85149'} fontSize="14" textAnchor="end">{ok ? '✓' : '✗ broke'}</text>
          </g>
        );
      })}
      {/* ladder labels */}
      <text x="40" y="30" fill="#56d364" fontSize="11" fontWeight="700" fontFamily="system-ui">▲ more stable — prefer these</text>
      <text x="40" y="240" fill="#f85149" fontSize="11" fontWeight="700" fontFamily="system-ui">▼ more brittle — avoid when possible</text>
    </Stage2D>
  );
}
