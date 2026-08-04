/* Lesson: JSON Locators — One Source of Truth for Every Element
 * Concept: a JSON locators file is the framework's "contacts app" — every element's address
 * (strategy + value), organized by screen, looked up by name and loaded at runtime. When the app
 * renames ids, you edit one JSON file, not eight Python page classes. Toggle scattered vs central. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function ApomJsonLocatorsVisualization() {
  const [central, setCentral] = useState(true);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setCentral(v => !v), 2.6, auto);

  const pages = ['login_page.py', 'sell_page.py', 'cart_page.py'];

  return (
    <Stage2D
      title="JSON locators: one contacts app for every element"
      subtitle="You don't hardcode phone numbers into each conversation — you keep them in contacts and look them up by name. A JSON locators file holds every element's address in one place, loaded at runtime."
      accent="#f778ba"
      viewBox="0 0 640 250"
      controls={<>
        <button className={`dsa2d-btn ${!central ? 'dsa2d-btn--on' : ''}`} onClick={() => setCentral(false)}>locators in Python (scattered)</button>
        <button className={`dsa2d-btn ${central ? 'dsa2d-btn--on' : ''}`} onClick={() => setCentral(true)}>locators in JSON (central)</button>
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{central ? 'app renames 20 ids → edit ONE json file ✓' : 'app renames 20 ids → hunt through 8 page files 💥'}</span>
      </>}
      legend={<>Lift locators out of page classes into a JSON <strong>data</strong> file, organized by screen and looked up by name at runtime. This is the final layer of separation that makes the framework truly <strong>hybrid</strong>: page <em>logic</em> in Python, locator <em>data</em> in JSON — each maintained independently. A non-coder can update a locator without touching Python.</>}
    >
      {/* page classes */}
      {pages.map((p, k) => (
        <g key={k}>
          <rect x="30" y={54 + k * 56} width="170" height="46" rx="9"
            fill="#161b22" stroke={central ? '#30363d' : '#f0a35e'} strokeWidth="1.5" />
          <text x="44" y={74 + k * 56} fill="#c9d1d9" fontSize="11.5" fontFamily="Consolas">{p}</text>
          {central
            ? <text x="44" y={90 + k * 56} fill="#8b949e" fontSize="9" fontFamily="Consolas">loc = load("login", "user")</text>
            : <text x="44" y={90 + k * 56} fill="#ff9d95" fontSize="9" fontFamily="Consolas">ID, "...:id/hardcoded"</text>}
          {/* arrows to json when central */}
          {central && <path d={`M 200 ${77 + k * 56} L 388 ${118}`} stroke="#f778ba" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />}
        </g>
      ))}
      <text x="115" y="228" fill="#8b949e" fontSize="10.5" textAnchor="middle" fontFamily="system-ui">{central ? 'page logic (Python) — no locators' : 'locators baked into every file'}</text>

      {central ? (
        /* one JSON source of truth */
        <g>
          <rect x="388" y="46" width="230" height="168" rx="12" fill="rgba(247,120,186,.1)" stroke="#f778ba" strokeWidth="2" />
          <text x="503" y="68" fill="#f9a8d4" fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="Consolas">locators.json 📇</text>
          <text x="404" y="92" fill="#8b949e" fontSize="10" fontFamily="Consolas">"login": {'{'}</text>
          <text x="418" y="110" fill="#c9d1d9" fontSize="10" fontFamily="Consolas">"user": {'{'} "by":"id",</text>
          <text x="432" y="126" fill="#7ee787" fontSize="10" fontFamily="Consolas">"value":"…:id/user" {'}'}</text>
          <text x="418" y="144" fill="#c9d1d9" fontSize="10" fontFamily="Consolas">"pass": {'{'} … {'}'}</text>
          <text x="404" y="162" fill="#8b949e" fontSize="10" fontFamily="Consolas">{'}'}, "sell": {'{'} … {'}'}</text>
          <rect x="404" y="176" width="198" height="28" rx="6" fill="rgba(86,211,100,.1)" stroke="#56d364" />
          <text x="503" y="194" fill="#7ee787" fontSize="10.5" textAnchor="middle" fontFamily="system-ui">edit here once → all pages update</text>
        </g>
      ) : (
        <g>
          <rect x="388" y="70" width="230" height="120" rx="12" fill="rgba(248,81,73,.06)" stroke="#f85149" strokeWidth="2" />
          <text x="503" y="110" fill="#f85149" fontSize="34" textAnchor="middle">💥</text>
          <text x="503" y="140" fill="#e6edf3" fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="system-ui">no single source</text>
          <text x="503" y="162" fill="#8b949e" fontSize="10.5" textAnchor="middle" fontFamily="system-ui">same id copied across files;</text>
          <text x="503" y="178" fill="#8b949e" fontSize="10.5" textAnchor="middle" fontFamily="system-ui">a rename means a file hunt</text>
        </g>
      )}
    </Stage2D>
  );
}
