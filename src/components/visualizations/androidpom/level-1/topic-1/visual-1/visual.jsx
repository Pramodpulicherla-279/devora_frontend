/* Lesson: Base Page — The Shared Toolbox Every Screen Inherits
 * Concept: every page method repeats "wait for the element, then act". The BasePage is a shared
 * toolbox holding wait-backed helpers (find, click, type, get_text, screenshot) once, so every
 * page class inherits reliable methods for free. Cycle the tools; show pages drawing from it. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const TOOLS = [
  { name: 'click(loc)', does: 'wait until clickable → click', color: '#4fce78' },
  { name: 'type(loc, s)', does: 'wait until visible → send_keys', color: '#58a6ff' },
  { name: 'find(loc)', does: 'wait until present → return element', color: '#f0883e' },
  { name: 'get_text(loc)', does: 'wait → read .text', color: '#a78bfa' },
  { name: 'screenshot()', does: 'capture the screen on demand', color: '#f778ba' },
];

export default function ApomBasePageVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % TOOLS.length), 1.8, auto);
  const t = TOOLS[i];

  return (
    <Stage2D
      title="BasePage: one toolbox the whole crew shares"
      subtitle="Every screen's methods do the same dance — wait, then click; wait, then type. Write that once in a BasePage and every page class inherits reliable, wait-backed helpers instead of re-implementing them."
      accent={t.color}
      viewBox="0 0 640 250"
      controls={<>
        {TOOLS.map((tl, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{tl.name.split('(')[0]}</button>)}
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{t.name} → {t.does}</span>
      </>}
      legend={<>The BasePage bundles the common element interactions — <code>find</code>, <code>click</code>, <code>type</code>, <code>get_text</code>, a screenshot helper — each with an <strong>explicit wait baked in</strong>. Every page class <code>extends BasePage</code>, so all screens get robust, consistent, synchronized methods without repeating the waiting logic. This is what makes the Page Object Model both clean and reliable.</>}
    >
      {/* toolbox */}
      <rect x="30" y="46" width="230" height="180" rx="12" fill="rgba(255,255,255,.03)" stroke={t.color} strokeWidth="2" />
      <rect x="30" y="46" width="230" height="30" rx="12" fill="rgba(255,255,255,.04)" />
      <text x="145" y="66" fill={t.color} fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">class BasePage 🧰</text>
      {TOOLS.map((tl, k) => {
        const active = k === i;
        return (
          <g key={k}>
            <rect x="44" y={84 + k * 27} width="202" height="23" rx="5" fill={active ? `${tl.color}22` : '#161b22'} stroke={active ? tl.color : '#30363d'} strokeWidth={active ? 2 : 1} className={active ? 'dsa2d-pulse' : ''} />
            <text x="54" y={100 + k * 27} fill={active ? tl.color : '#c9d1d9'} fontSize="11" fontFamily="Consolas">{tl.name}</text>
            {active && <text x="238" y={100 + k * 27} fill={tl.color} fontSize="10" textAnchor="end" fontFamily="system-ui">← wait + act</text>}
          </g>
        );
      })}

      {/* pages inherit */}
      <text x="410" y="42" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="system-ui">every screen inherits the toolbox</text>
      {['LoginPage', 'SellPage', 'CheckoutPage'].map((p, k) => (
        <g key={k}>
          <rect x="330" y={54 + k * 56} width="160" height="44" rx="9" fill="#161b22" stroke={t.color} strokeWidth="1.5" />
          <text x="410" y={74 + k * 56} fill="#e6edf3" fontSize="12.5" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{p}</text>
          <text x="410" y={90 + k * 56} fill="#8b949e" fontSize="9.5" textAnchor="middle" fontFamily="Consolas">(BasePage)</text>
          <path d={`M 260 136 L 328 ${76 + k * 56}`} stroke={t.color} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.55" />
        </g>
      ))}
      <text x="510" y="120" fill="#8b949e" fontSize="10.5" fontFamily="system-ui">write the</text>
      <text x="510" y="136" fill="#e6edf3" fontSize="11.5" fontWeight="700" fontFamily="system-ui">waiting logic</text>
      <text x="510" y="152" fill="#e6edf3" fontSize="11.5" fontWeight="700" fontFamily="system-ui">once, reuse</text>
      <text x="510" y="168" fill="#e6edf3" fontSize="11.5" fontWeight="700" fontFamily="system-ui">everywhere</text>
    </Stage2D>
  );
}
