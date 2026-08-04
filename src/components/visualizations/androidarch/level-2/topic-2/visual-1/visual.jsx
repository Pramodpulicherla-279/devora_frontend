/* Lesson: Python Modules, Packages, and Imports
 * Concept: a module is a book (.py file), a package is a shelf (folder), imports are the library
 * catalog that lets one book reference another. ModuleNotFoundError usually means Python was run
 * from the wrong place / the package root isn't on the path. Step from files → import resolves. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const STEPS = [
  { log: 'a module is a book — one .py file of code', ok: null },
  { log: 'a package is a shelf — a folder of modules (with __init__.py)', ok: null },
  { log: 'run from the wrong folder → ModuleNotFoundError: No module named "utils"', ok: false },
  { log: 'run from the project root → import resolves ✓', ok: true },
];

export default function AarchImportsVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 2.1, auto);
  const s = STEPS[i];

  return (
    <Stage2D
      title="Modules, packages & imports: making folders talk"
      subtitle="Split into tidy folders and Python greets you with ModuleNotFoundError — the folder is right there! A module is a book, a package a shelf, and imports the catalog that lets one reference another."
      accent="#58a6ff"
      viewBox="0 0 640 250"
      controls={<>
        {STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{s.log}</span>
      </>}
      legend={<>An <code>import</code> is resolved relative to where Python starts, not where the file sits. The fix for <code>ModuleNotFoundError</code> is almost always to run from the <strong>project root</strong> (e.g. <code>python -m pytest</code>) so the top package is importable, and to add <code>__init__.py</code> where needed. Then <code>from utils.driver_factory import DriverFactory</code> just works.</>}
    >
      {/* project tree */}
      <text x="30" y="42" fill="#8b949e" fontSize="11" fontFamily="system-ui">kisankart/  ← project root (the library)</text>
      <rect x="30" y="50" width="250" height="170" rx="10" fill="#0d1117" stroke={i >= 1 ? '#58a6ff' : '#30363d'} strokeWidth="1.5" />
      {/* shelves (packages) */}
      <text x="46" y="76" fill={i >= 1 ? '#79c0ff' : '#8b949e'} fontSize="12" fontFamily="Consolas">📁 utils/  <tspan fill="#6e7681" fontSize="10">(shelf)</tspan></text>
      <text x="66" y="96" fill="#8b949e" fontSize="11" fontFamily="Consolas">📄 __init__.py</text>
      <text x="66" y="114" fill={i >= 0 ? '#7ee787' : '#8b949e'} fontSize="11" fontFamily="Consolas">📄 driver_factory.py <tspan fill="#6e7681" fontSize="9">(book)</tspan></text>
      <text x="46" y="138" fill={i >= 1 ? '#79c0ff' : '#8b949e'} fontSize="12" fontFamily="Consolas">📁 pages/</text>
      <text x="46" y="160" fill={i >= 1 ? '#79c0ff' : '#8b949e'} fontSize="12" fontFamily="Consolas">📁 tests/</text>
      <text x="66" y="180" fill="#8b949e" fontSize="11" fontFamily="Consolas">📄 test_login.py</text>
      <text x="46" y="204" fill="#8b949e" fontSize="11" fontFamily="Consolas">📄 conftest.py</text>

      {/* import statement + catalog */}
      <rect x="310" y="66" width="308" height="40" rx="8" fill="#161b22" stroke="#58a6ff" strokeWidth="1.5" />
      <text x="324" y="90" fill="#c9d1d9" fontSize="11" fontFamily="Consolas">from utils.driver_factory import DriverFactory</text>
      <text x="310" y="120" fill="#8b949e" fontSize="10.5" fontFamily="system-ui">↑ the catalog: one book references another</text>

      {/* run context + result */}
      <rect x="310" y="140" width="308" height="80" rx="10"
        fill={s.ok === true ? 'rgba(86,211,100,.1)' : s.ok === false ? 'rgba(248,81,73,.1)' : '#0d1117'}
        stroke={s.ok === true ? '#56d364' : s.ok === false ? '#f85149' : '#30363d'} strokeWidth="2" />
      {s.ok === null && <text x="464" y="184" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">books on shelves, waiting for the catalog</text>}
      {s.ok === false && (
        <>
          <text x="324" y="164" fill="#8b949e" fontSize="10.5" fontFamily="Consolas">$ cd tests && python test_login.py</text>
          <text x="324" y="188" fill="#ff9d95" fontSize="11" fontFamily="Consolas" className="dsa2d-blink">ModuleNotFoundError: 'utils'</text>
          <text x="324" y="206" fill="#8b949e" fontSize="9.5" fontFamily="system-ui">Python started below the root</text>
        </>
      )}
      {s.ok === true && (
        <>
          <text x="324" y="164" fill="#8b949e" fontSize="10.5" fontFamily="Consolas">$ cd kisankart && python -m pytest</text>
          <text x="324" y="188" fill="#7ee787" fontSize="11" fontFamily="Consolas">✓ import resolved — tests run</text>
          <text x="324" y="206" fill="#8b949e" fontSize="9.5" fontFamily="system-ui">run from the project root</text>
        </>
      )}
    </Stage2D>
  );
}
