/* Lesson: Memoization vs Tabulation — Which One Should You Reach For?
 * 2D animated: cycle through the trade-offs between top-down caching and bottom-up tables. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const ROWS = [
  { k: 'Code shape', memo: 'mirrors the recurrence — natural to write', tab: 'explicit loops — you control the order' },
  { k: 'Subproblems solved', memo: 'only the ones actually needed (lazy)', tab: 'every cell, needed or not' },
  { k: 'Stack safety', memo: 'deep recursion can overflow', tab: 'no recursion — no overflow risk' },
  { k: 'Space optimisation', memo: 'hard — cache keeps everything', tab: 'easy — often keep just the last row/two cells' },
  { k: 'Best first move', memo: 'prototype the recurrence quickly', tab: 'production / tight memory / huge n' },
];
export default function DpMemoVsTabVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % ROWS.length), 2.2, auto);
  const r = ROWS[i];
  return (
    <Stage2D title="Memoization vs Tabulation" subtitle="Same answers, opposite directions: memoization starts at the goal and recurses down with a cache; tabulation starts at the base cases and iterates up a table."
      accent="#58a6ff" viewBox="0 0 640 270"
      controls={<>{ROWS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}<AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /></>}
      legend={<>Practical rule: <strong>write the memoized version first</strong> — it's a direct translation of the recurrence. Convert to tabulation when you need guaranteed stack safety, tighter memory, or the loop order enables an optimisation (rolling arrays). Both are O(states × work-per-state).</>}>
      <text x="180" y="46" fill="#4fce78" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="system-ui">Memoization ↓ (top-down)</text>
      <text x="460" y="46" fill="#6b8cff" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="system-ui">Tabulation ↑ (bottom-up)</text>
      <line x1="320" y1="34" x2="320" y2="200" stroke="#30363d" strokeDasharray="4 4" />
      <rect x="46" y="66" width="268" height="120" rx="12" fill="#0b0f15" stroke="#4fce78" strokeWidth="1.5" />
      <rect x="326" y="66" width="268" height="120" rx="12" fill="#0b0f15" stroke="#6b8cff" strokeWidth="1.5" />
      <text x="320" y="216" fill="#e6edf3" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{r.k}</text>
      <foreignObject x="60" y="86" width="240" height="90"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '13.5px system-ui', lineHeight: 1.45, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{r.memo}</div></foreignObject>
      <foreignObject x="340" y="86" width="240" height="90"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '13.5px system-ui', lineHeight: 1.45, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{r.tab}</div></foreignObject>
      <text x="320" y="248" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">trade-off {i + 1} of {ROWS.length}</text>
    </Stage2D>
  );
}
