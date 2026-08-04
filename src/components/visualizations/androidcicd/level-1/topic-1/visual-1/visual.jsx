/* Lesson: Jenkins Pipeline — Making Your Tests Run Themselves
 * Concept: a Jenkinsfile is a factory QC line — ordered stages every code change rides down.
 * The trap that catches everyone: each `sh` step is its OWN shell process, so activating a venv
 * in one step is gone by the next. Toggle the two Setup/Run Tests wirings and watch pytest
 * disappear and reappear. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const STAGES = [
  { name: 'Checkout', sub: 'checkout scm' },
  { name: 'Setup', sub: 'venv + pip install' },
  { name: 'Start Emulator', sub: 'adb wait-for-device' },
  { name: 'Run Tests', sub: 'pytest --alluredir' },
  { name: 'post: always', sub: 'publish Allure' },
];

export default function AcicdJenkinsStagesVisualization() {
  const [chained, setChained] = useState(true);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setChained(v => !v), 2.8, auto);

  return (
    <Stage2D
      title="A Jenkinsfile is stages — and every sh step is a brand-new shell"
      subtitle="The pipeline runs itself on every push: check out, install, boot an emulator, run pytest, publish the report. Then one detail about shells quietly breaks it for almost every beginner."
      accent={chained ? '#4fce78' : '#f85149'}
      viewBox="0 0 640 300"
      controls={<>
        <button className={`dsa2d-btn ${!chained ? 'dsa2d-btn--on' : ''}`} onClick={() => setChained(false)}>activate in its own step</button>
        <button className={`dsa2d-btn ${chained ? 'dsa2d-btn--on' : ''}`} onClick={() => setChained(true)}>{'chain with &&'}</button>
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">
          {chained ? 'venv active in the same shell as pytest → tests run ✓' : 'pytest: command not found 💥'}
        </span>
      </>}
      legend={<>A <code>Jenkinsfile</code> at the repo root defines the pipeline as code, and each stage reuses an earlier phase: <code>--env=${'{ENV}'}</code> for config switching, <code>--alluredir</code> for reporting, and an emulator stage for the device. Because every <code>sh</code> block is a <strong>separate shell process</strong>, environment changes like <code>. .venv/bin/activate</code> die with that block — chain dependent commands with <code>&amp;&amp;</code> inside one step, or call tools by their full venv path. The <code>post {'{ always { … } }'}</code> block publishes the report whether the suite passed or failed.</>}
    >
      {/* stage chain */}
      <text x="20" y="28" fill="#8b949e" fontSize="10.5" fontFamily="system-ui">pipeline stages, in order</text>
      {STAGES.map((s, k) => {
        const broken = !chained && k === 3;
        const stroke = broken ? '#f85149' : k === 4 ? '#a371f7' : '#58a6ff';
        return (
          <g key={s.name}>
            <rect x={18 + k * 124} y="38" width="110" height="52" rx="9"
              fill={broken ? 'rgba(248,81,73,.1)' : 'rgba(88,166,255,.07)'}
              stroke={stroke} strokeWidth={broken ? 2.2 : 1.5}
              className={broken ? 'dsa2d-blink' : ''} />
            <text x={73 + k * 124} y="60" fill="#e6edf3" fontSize="10" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{s.name}</text>
            <text x={73 + k * 124} y="76" fill="#8b949e" fontSize="8" textAnchor="middle" fontFamily="Consolas">{s.sub}</text>
            {k < 4 && <text x={134 + k * 124} y="70" fill="#484f58" fontSize="13" textAnchor="middle">→</text>}
          </g>
        );
      })}

      {/* the two shells */}
      <text x="20" y="118" fill="#8b949e" fontSize="10.5" fontFamily="system-ui">inside the agent: each sh step is its own process</text>

      <rect x="30" y="128" width="250" height="112" rx="11" fill="#010409" stroke="#30363d" strokeWidth="1.6" />
      <text x="44" y="148" fill="#6e7681" fontSize="9" fontFamily="Consolas">sh #1 — Setup</text>
      <text x="44" y="168" fill="#79c0ff" fontSize="8.5" fontFamily="Consolas">$ python -m venv .venv</text>
      <text x="44" y="184" fill="#79c0ff" fontSize="8.5" fontFamily="Consolas">$ . .venv/bin/activate</text>
      <text x="44" y="200" fill="#56d364" fontSize="8.5" fontFamily="Consolas">(.venv) pip install -r …</text>
      <rect x="44" y="210" width="222" height="20" rx="5" fill="rgba(240,163,94,.1)" stroke="#f0a35e" strokeWidth="1" />
      <text x="155" y="224" fill="#f0a35e" fontSize="8" textAnchor="middle" fontFamily="system-ui">shell exits → venv state evaporates</text>

      <text x="300" y="188" fill="#484f58" fontSize="15" textAnchor="middle">⇢</text>

      <rect x="320" y="128" width="290" height="112" rx="11" fill="#010409"
        stroke={chained ? '#56d364' : '#f85149'} strokeWidth="2" />
      <text x="334" y="148" fill="#6e7681" fontSize="9" fontFamily="Consolas">sh #2 — Run Tests (fresh shell)</text>
      {chained ? (
        <g className="dsa2d-pop">
          <text x="334" y="170" fill="#79c0ff" fontSize="8.5" fontFamily="Consolas">{'$ . .venv/bin/activate && pytest …'}</text>
          <text x="334" y="188" fill="#56d364" fontSize="8.5" fontFamily="Consolas">(.venv) collected 42 items</text>
          <text x="334" y="204" fill="#56d364" fontSize="8.5" fontFamily="Consolas">42 passed in 118.4s</text>
          <text x="334" y="226" fill="#56d364" fontSize="9" fontFamily="system-ui">✓ activation and pytest share one shell</text>
        </g>
      ) : (
        <g className="dsa2d-pop">
          <text x="334" y="170" fill="#79c0ff" fontSize="8.5" fontFamily="Consolas">$ pytest --alluredir=reports/…</text>
          <text x="334" y="190" fill="#f85149" fontSize="8.5" fontFamily="Consolas">pytest: command not found</text>
          <text x="334" y="212" fill="#f85149" fontSize="9" fontFamily="system-ui">✗ no venv here — the install looks broken,</text>
          <text x="334" y="226" fill="#f85149" fontSize="9" fontFamily="system-ui">but the activation simply did not persist</text>
        </g>
      )}

      <text x="20" y="264" fill="#6e7681" fontSize="9.5" fontFamily="system-ui">
        {'CI removes the human from the loop: if someone has to remember to run the suite, sooner or later nobody does and a bug ships.'}
      </text>
      <text x="20" y="282" fill="#6e7681" fontSize="9.5" fontFamily="system-ui">
        {'Every run happens in the same clean environment — which is what finally ends "but it works on my machine".'}
      </text>
    </Stage2D>
  );
}
