/* Lesson: Utilities and Wrappers — The Framework's Shared Tool Belt
 * Concept: the same open()+json.load() block written three times, a UiScrollable string copy-pasted
 * around — each duplicate is a bug to fix in triplicate. A utils/ layer is a shared tool belt (DRY):
 * centralize small reusable helpers once, and every layer borrows the same reliable tool. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function AdataToolbeltVisualization() {
  const [dry, setDry] = useState(true); // true = centralized util, false = duplicated
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setDry(v => !v), 2.6, auto);

  const callers = ['config loader', 'locators loader', 'test-data loader'];

  return (
    <Stage2D
      title="A utils/ tool belt: write the helper once"
      subtitle="You've written open(path) + json.load(f) three times, and that gnarly scroll string lives in two places. Every duplicate is a bug to fix in triplicate. A shared utils layer keeps one reliable copy."
      accent="#f0883e"
      viewBox="0 0 640 250"
      controls={<>
        <button className={`dsa2d-btn ${!dry ? 'dsa2d-btn--on' : ''}`} onClick={() => setDry(false)}>duplicated everywhere</button>
        <button className={`dsa2d-btn ${dry ? 'dsa2d-btn--on' : ''}`} onClick={() => setDry(true)}>one shared util (DRY)</button>
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{dry ? 'read_json() lives once → fix bugs in one place ✓' : 'same block copied 3× → patch one, forget two 💥'}</span>
      </>}
      legend={<>The principle is <strong>DRY</strong> (Don’t Repeat Yourself). A <code>utils/</code> folder holds small, cross-cutting helpers every layer reaches for — reading files, performing gestures, running ADB commands, custom assertions. Centralize them once and pages, tests, and fixtures all borrow the same tool, so a fix or improvement lands everywhere at once.</>}
    >
      {/* callers */}
      {callers.map((c, k) => (
        <g key={k}>
          <rect x="30" y={54 + k * 56} width="150" height="44" rx="9" fill="#161b22" stroke={dry ? '#30363d' : '#f0a35e'} strokeWidth="1.5" />
          <text x="105" y={74 + k * 56} fill="#c9d1d9" fontSize="11.5" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{c}</text>
          {dry
            ? <text x="105" y={90 + k * 56} fill="#8b949e" fontSize="9" textAnchor="middle" fontFamily="Consolas">read_json(path)</text>
            : <text x="105" y={90 + k * 56} fill="#ff9d95" fontSize="8.5" textAnchor="middle" fontFamily="Consolas">open()+json.load() copy</text>}
          {dry && <path d={`M 180 ${76 + k * 56} L 388 125`} stroke="#f0883e" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.55" />}
        </g>
      ))}

      {dry ? (
        /* one tool belt */
        <g>
          <rect x="388" y="78" width="222" height="96" rx="12" fill="rgba(240,136,62,.1)" stroke="#f0883e" strokeWidth="2" />
          <text x="499" y="102" fill="#f8c088" fontSize="12.5" textAnchor="middle" fontWeight="700" fontFamily="Consolas">utils/ 🧰 (the belt)</text>
          <text x="404" y="126" fill="#c9d1d9" fontSize="11" fontFamily="Consolas">read_json(path)</text>
          <text x="404" y="145" fill="#8b949e" fontSize="10" fontFamily="Consolas">scroll_to(text)  ·  run_adb(cmd)</text>
          <rect x="404" y="152" width="190" height="16" rx="4" fill="rgba(86,211,100,.1)" />
          <text x="499" y="164" fill="#7ee787" fontSize="9.5" textAnchor="middle" fontFamily="system-ui">one copy — everyone borrows it</text>
        </g>
      ) : (
        <g>
          <rect x="388" y="78" width="222" height="96" rx="12" fill="rgba(248,81,73,.06)" stroke="#f85149" strokeWidth="2" />
          <text x="499" y="118" fill="#f85149" fontSize="28" textAnchor="middle">💥×3</text>
          <text x="499" y="146" fill="#e6edf3" fontSize="11" textAnchor="middle" fontWeight="700" fontFamily="system-ui">three copies to maintain</text>
          <text x="499" y="163" fill="#8b949e" fontSize="9.5" textAnchor="middle" fontFamily="system-ui">a fix in one leaves two broken</text>
        </g>
      )}
      <text x="30" y="228" fill="#8b949e" fontSize="11" fontFamily="system-ui">Pages, tests and fixtures all reach for the same small helpers — give them one home.</text>
    </Stage2D>
  );
}
