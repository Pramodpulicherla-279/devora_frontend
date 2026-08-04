/* Lesson: Appium Gestures and Touch Actions
 * Concept: locators can't tap what's off-screen. Gestures give the test a "thumb" — tap, swipe,
 * scroll, long-press, drag — all expressed through the W3C Actions API. The star is scroll-to-
 * reveal, which turns "element not found" into a non-issue. Cycle the gestures. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const G = [
  { id: 'tap', name: 'Tap', code: 'el.click()', note: 'a single press' },
  { id: 'swipe', name: 'Swipe', code: 'ActionChains(driver)…move…', note: 'fast drag between points' },
  { id: 'scroll', name: 'Scroll to reveal', code: 'scroll until el.is_displayed()', note: 'fixes "element not found"' },
  { id: 'long', name: 'Long press', code: 'press().wait(800).release()', note: 'open a context menu' },
  { id: 'drag', name: 'Drag & drop', code: 'press → move → release', note: 'reorder items' },
];

export default function AlocGesturesVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % G.length), 1.9, auto);
  const g = G[i];

  return (
    <Stage2D
      title="Gestures: giving your test a thumb"
      subtitle="Point-and-tap isn't enough — a target 300px below the fold can't be tapped until you scroll to it. Gestures add swipe, scroll, long-press, and drag, all built on the W3C Actions API."
      accent="#f0883e"
      viewBox="0 0 640 250"
      controls={<>
        {G.map((x, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{x.name.split(' ')[0]}</button>)}
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{g.name} — {g.note}</span>
      </>}
      legend={<>Under every gesture sits one standard, the <strong>W3C Actions API</strong> — a "finger instruction set" of press-down / move / pause / release. The most-used gesture is <strong>scroll-to-reveal</strong>: a locator can’t tap an element that isn’t on screen yet, so scrolling it into view is what makes long lists and forms testable.</>}
    >
      {/* phone */}
      <rect x="245" y="30" width="150" height="204" rx="16" fill="#0d1117" stroke="#30363d" strokeWidth="2" />
      <clipPath id="aloc-scr"><rect x="255" y="42" width="130" height="180" rx="8" /></clipPath>
      <g clipPath="url(#aloc-scr)">
        <rect x="255" y="42" width="130" height="180" fill="#12161d" />
        {[0, 1, 2, 3, 4].map(k => {
          const shifted = g.id === 'scroll' ? k * 40 - 20 : k * 40;
          return <rect key={k} x="266" y={54 + shifted} width="108" height="30" rx="6" fill="#161b22" stroke="#30363d" style={{ transition: 'y .5s' }} />;
        })}
        {/* revealed target for scroll */}
        {g.id === 'scroll' && <rect x="266" y="174" width="108" height="30" rx="6" fill="rgba(240,136,62,.2)" stroke="#f0883e" strokeWidth="2" className="dsa2d-pulse" />}
        {g.id === 'scroll' && <text x="320" y="194" fill="#f8c088" fontSize="10" textAnchor="middle" fontFamily="system-ui">now visible</text>}
      </g>

      {/* gesture overlay on the phone */}
      {g.id === 'tap' && <circle cx="320" cy="120" r="14" fill="none" stroke="#f0883e" strokeWidth="3" className="dsa2d-pulse" />}
      {g.id === 'swipe' && <g><path d="M 360 120 L 275 120" stroke="#f0883e" strokeWidth="3" markerEnd="url(#aloc-a)" /><circle cx="360" cy="120" r="7" fill="#f0883e" /></g>}
      {g.id === 'scroll' && <g><path d="M 320 190 L 320 90" stroke="#f0883e" strokeWidth="3" strokeDasharray="6 4" markerEnd="url(#aloc-a)" className="dsa2d-flow" /></g>}
      {g.id === 'long' && <g><circle cx="320" cy="120" r="16" fill="rgba(240,136,62,.25)" stroke="#f0883e" strokeWidth="3" /><text x="320" y="150" fill="#f8c088" fontSize="10" textAnchor="middle">hold…</text></g>}
      {g.id === 'drag' && <g><circle cx="300" cy="90" r="8" fill="#f0883e" /><path d="M 300 90 Q 350 140 320 180" fill="none" stroke="#f0883e" strokeWidth="3" strokeDasharray="5 4" markerEnd="url(#aloc-a)" /></g>}
      <defs><marker id="aloc-a" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#f0883e" /></marker></defs>

      {/* gesture info */}
      <text x="30" y="60" fill="#f0883e" fontSize="18" fontWeight="700" fontFamily="system-ui">{g.name}</text>
      <text x="30" y="86" fill="#8b949e" fontSize="12" fontFamily="system-ui">{g.note}</text>
      <rect x="30" y="104" width="185" height="30" rx="6" fill="#0d1117" stroke="#f0883e" />
      <text x="42" y="124" fill="#f8c088" fontSize="10.5" fontFamily="Consolas">{g.code.length > 26 ? g.code.slice(0, 26) : g.code}</text>
      <text x="30" y="170" fill="#8b949e" fontSize="11" fontFamily="system-ui">all gestures compile down to the</text>
      <text x="30" y="188" fill="#e6edf3" fontSize="12" fontWeight="700" fontFamily="system-ui">W3C Actions API</text>
      <text x="30" y="204" fill="#8b949e" fontSize="11" fontFamily="system-ui">press · move · pause · release</text>

      <text x="450" y="120" fill="#8b949e" fontSize="11" fontFamily="system-ui">off-screen</text>
      <text x="450" y="136" fill="#8b949e" fontSize="11" fontFamily="system-ui">elements need</text>
      <text x="450" y="152" fill="#f0883e" fontSize="11" fontWeight="700" fontFamily="system-ui">a scroll first</text>
    </Stage2D>
  );
}
