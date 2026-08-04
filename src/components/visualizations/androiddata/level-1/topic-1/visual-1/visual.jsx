/* Lesson: JSON Test Data — Feeding Tests from Outside the Code
 * Concept: parametrization was "one recipe, many ingredients", but the ingredient list lived
 * inside the recipe. JSON test data moves that list onto the fridge — a separate file anyone
 * (even non-coders) can edit. The test stays fixed: "for each item on the list, run the case".
 * Toggle hardcoded-in-test vs external JSON; adding rows adds runs with no code change. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function AdataJsonDataVisualization() {
  const [ext, setExt] = useState(true);
  const [rows, setRows] = useState(3);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => { if (ext) setRows(r => (r >= 5 ? 3 : r + 1)); else setExt(true); }, 1.6, auto);
  const cases = ['tomato', 'onion', 'potato', 'wheat', 'rice'].slice(0, ext ? rows : 3);

  return (
    <Stage2D
      title="JSON test data: the ingredient list on the fridge"
      subtitle="The recipe (test) stays fixed; the ingredient list moves onto the fridge — a JSON file QA can edit without writing Python. Adding a hundred cases becomes editing data, not code."
      accent="#f778ba"
      viewBox="0 0 640 250"
      controls={<>
        <button className={`dsa2d-btn ${!ext ? 'dsa2d-btn--on' : ''}`} onClick={() => setExt(false)}>data hardcoded in test</button>
        <button className={`dsa2d-btn ${ext ? 'dsa2d-btn--on' : ''}`} onClick={() => setExt(true)}>data in JSON</button>
        {ext && <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setRows(r => (r >= 5 ? 3 : r + 1))}>+ add case</button>}
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{ext ? `${cases.length} cases from JSON → ${cases.length} runs (no code edit)` : '3 cases baked into the test — QA must edit Python 💥'}</span>
      </>}
      legend={<>Lift test inputs out of the code into a JSON <strong>data</strong> file, then load it and feed each row to a parametrized test. Adding coverage becomes editing a file — no Python, so non-coders can contribute cases. Combined with JSON locators, this makes the framework fully <strong>data-driven</strong>: logic in code, data outside it.</>}
    >
      {/* the recipe (test) — fixed */}
      <text x="120" y="42" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="system-ui">the recipe (fixed test)</text>
      <rect x="30" y="50" width="185" height="94" rx="10" fill="#161b22" stroke="#a78bfa" strokeWidth="1.5" />
      <text x="44" y="74" fill="#79c0ff" fontSize="10.5" fontFamily="Consolas">@parametrize(cases)</text>
      <text x="44" y="94" fill="#c9d1d9" fontSize="10.5" fontFamily="Consolas">def test_list(crop):</text>
      <text x="44" y="112" fill="#c9d1d9" fontSize="10.5" fontFamily="Consolas">  sell.create(crop)</text>
      <text x="44" y="130" fill="#c9d1d9" fontSize="10.5" fontFamily="Consolas">  assert listed(crop)</text>

      {/* data source */}
      {ext ? (
        <g>
          <text x="320" y="42" fill="#f9a8d4" fontSize="11" textAnchor="middle" fontFamily="system-ui">📋 the fridge: crops.json</text>
          <rect x="245" y="50" width="150" height="150" rx="10" fill="rgba(247,120,186,.1)" stroke="#f778ba" strokeWidth="2" />
          <text x="259" y="72" fill="#8b949e" fontSize="10" fontFamily="Consolas">[</text>
          {cases.map((c, k) => (
            <text key={k} x="273" y={90 + k * 20} fill="#7ee787" fontSize="11" fontFamily="Consolas" className={k >= 3 ? 'dsa2d-pop' : ''}>"{c}",</text>
          ))}
          <text x="259" y={92 + cases.length * 20} fill="#8b949e" fontSize="10" fontFamily="Consolas">]</text>
          <text x="320" y="214" fill="#56d364" fontSize="9.5" textAnchor="middle" fontFamily="system-ui">edit the list, not the recipe</text>
        </g>
      ) : (
        <g>
          <rect x="245" y="70" width="150" height="90" rx="10" fill="rgba(248,81,73,.06)" stroke="#f85149" strokeWidth="2" />
          <text x="320" y="104" fill="#f85149" fontSize="26" textAnchor="middle">📌</text>
          <text x="320" y="130" fill="#e6edf3" fontSize="11" textAnchor="middle" fontWeight="700" fontFamily="system-ui">list stuck inside</text>
          <text x="320" y="146" fill="#8b949e" fontSize="10" textAnchor="middle" fontFamily="system-ui">the recipe — Python only</text>
        </g>
      )}

      {/* runs produced */}
      <text x="510" y="42" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="system-ui">one run per item</text>
      {cases.map((c, k) => (
        <g key={k} className={ext && k >= 3 ? 'dsa2d-fade' : ''}>
          <rect x="425" y={52 + k * 27} width="170" height="22" rx="5" fill="#161b22" stroke="#56d364" strokeWidth="1.2" />
          <text x="437" y={67 + k * 27} fill="#c9d1d9" fontSize="10.5" fontFamily="Consolas">test_list[{c}]</text>
          <text x="586" y={67 + k * 27} fill="#7ee787" fontSize="11" textAnchor="end">✓</text>
        </g>
      ))}
      {ext && <path d="M 395 125 L 423 100" stroke="#f778ba" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />}
    </Stage2D>
  );
}
