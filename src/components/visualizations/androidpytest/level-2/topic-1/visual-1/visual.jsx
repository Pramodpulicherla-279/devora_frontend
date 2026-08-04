/* Lesson: Pytest Markers and Parametrization
 * Two ideas: MARKERS tag tests into groups (@pytest.mark.smoke) so you can run just a subset;
 * PARAMETRIZE feeds one test function many inputs so it runs once per data set instead of being
 * copy-pasted. Toggle between the two. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const TESTS = [
  { name: 'test_login', mark: 'smoke' },
  { name: 'test_checkout', mark: 'smoke' },
  { name: 'test_search_filters', mark: 'regression' },
  { name: 'test_edge_prices', mark: 'regression' },
  { name: 'test_profile_edit', mark: 'regression' },
];
const CROPS = ['tomato', 'onion', 'potato', 'wheat'];

export default function ApytestMarkersVisualization() {
  const [mode, setMode] = useState('markers');
  const [sel, setSel] = useState('smoke');
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => {
    if (mode === 'markers') setSel(s => (s === 'smoke' ? 'regression' : 'smoke'));
    else setMode('markers');
  }, 2.2, auto);

  return (
    <Stage2D
      title="Markers & parametrization: run the right tests, written once"
      subtitle="Markers are labels — tag tests @smoke or @regression and run just that group. Parametrize is one recipe cooked with many ingredients — one test function, many inputs, run once per set."
      accent="#a78bfa"
      viewBox="0 0 640 250"
      controls={<>
        <button className={`dsa2d-btn ${mode === 'markers' ? 'dsa2d-btn--on' : ''}`} onClick={() => setMode('markers')}>markers</button>
        <button className={`dsa2d-btn ${mode === 'param' ? 'dsa2d-btn--on' : ''}`} onClick={() => setMode('param')}>parametrize</button>
        {mode === 'markers' && <button className="dsa2d-btn" onClick={() => setSel(s => s === 'smoke' ? 'regression' : 'smoke')}>run: {sel}</button>}
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{mode === 'markers' ? `pytest -m ${sel} → ${TESTS.filter(t => t.mark === sel).length} tests` : `one test × ${CROPS.length} inputs → ${CROPS.length} runs`}</span>
      </>}
      legend={<>Tag with <code>@pytest.mark.smoke</code>, then run a group with <code>pytest -m smoke</code> — perfect for a quick pre-demo sanity pass. <code>@pytest.mark.parametrize("crop", [...])</code> feeds one function many data sets; pytest runs it once per set and reports each separately. Built-ins like <code>@pytest.mark.skip</code> exclude tests. Together they keep a big suite compact and controllable.</>}
    >
      {mode === 'markers' ? (
        <>
          <text x="30" y="40" fill="#8b949e" fontSize="12" fontFamily="system-ui">tag tests, then filter to a group with <tspan fill="#c9bdf5" fontFamily="Consolas">pytest -m {sel}</tspan></text>
          {TESTS.map((t, k) => {
            const on = t.mark === sel;
            const c = t.mark === 'smoke' ? '#4fce78' : '#58a6ff';
            return (
              <g key={k} opacity={on ? 1 : 0.4}>
                <rect x="30" y={54 + k * 36} width="360" height="30" rx="7" fill={on ? `${c}18` : '#161b22'} stroke={on ? c : '#30363d'} strokeWidth={on ? 2.5 : 1.5} className={on ? 'dsa2d-pulse' : ''} />
                <text x="44" y={74 + k * 36} fill="#c9d1d9" fontSize="12" fontFamily="Consolas">{t.name}</text>
                <rect x="290" y={59 + k * 36} width="92" height="20" rx="10" fill={`${c}22`} stroke={c} />
                <text x="336" y={73 + k * 36} fill={c} fontSize="10.5" textAnchor="middle" fontFamily="Consolas">@{t.mark}</text>
                {on && <text x="404" y={74 + k * 36} fill={c} fontSize="12">▶ run</text>}
              </g>
            );
          })}
          <rect x="450" y="90" width="160" height="80" rx="10" fill="#0d1117" stroke="#a78bfa" strokeWidth="2" />
          <text x="530" y="118" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="system-ui">selected group</text>
          <text x="530" y="146" fill="#c9bdf5" fontSize="22" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{TESTS.filter(t => t.mark === sel).length}</text>
          <text x="530" y="164" fill="#8b949e" fontSize="10.5" textAnchor="middle" fontFamily="system-ui">of {TESTS.length} run</text>
        </>
      ) : (
        <>
          <text x="30" y="42" fill="#8b949e" fontSize="12" fontFamily="system-ui">one function, many inputs — <tspan fill="#c9bdf5" fontFamily="Consolas">@pytest.mark.parametrize</tspan></text>
          <rect x="30" y="56" width="230" height="70" rx="11" fill="rgba(167,139,250,.12)" stroke="#a78bfa" strokeWidth="2" />
          <text x="145" y="82" fill="#c9bdf5" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="Consolas">test_list_crop(crop)</text>
          <text x="145" y="104" fill="#8b949e" fontSize="10.5" textAnchor="middle" fontFamily="system-ui">one recipe</text>
          {CROPS.map((c, k) => (
            <g key={k} className="dsa2d-fade">
              <path d={`M 260 91 L 320 ${52 + k * 46 + 15}`} stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
              <rect x="322" y={52 + k * 46} width="290" height="30" rx="7" fill="#161b22" stroke="#56d364" strokeWidth="1.5" />
              <text x="336" y={72 + k * 46} fill="#c9d1d9" fontSize="11.5" fontFamily="Consolas">test_list_crop[{c}]</text>
              <text x="600" y={72 + k * 46} fill="#7ee787" fontSize="12" textAnchor="end">✓ run</text>
            </g>
          ))}
          <text x="145" y="150" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="system-ui">no copy-paste;</text>
          <text x="145" y="166" fill="#e6edf3" fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{CROPS.length} runs, one test</text>
        </>
      )}
    </Stage2D>
  );
}
