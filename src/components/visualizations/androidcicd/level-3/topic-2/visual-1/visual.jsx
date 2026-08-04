/* Lesson: Capstone — Your Framework, Your Portfolio, Your Next Steps
 * Concept: step back and see the whole machine. Ten phases stacked into five professional layers,
 * each one a capability companies actually pay for — then the portfolio proof that turns the stack
 * into interviews. Step through to assemble it, then reach the proof layer. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const LAYERS = [
  {
    name: 'Environment & structure',
    phases: 'Phases 1, 5',
    color: '#8b949e',
    detail: 'venvs, the Android toolchain, and an organised folder layout — the ground everything else stands on.',
  },
  {
    name: 'Reliable interaction',
    phases: 'Phase 3',
    color: '#58a6ff',
    detail: 'stable locators, gestures, and explicit waits — the layer that beats flakiness instead of papering over it with sleeps.',
  },
  {
    name: 'Maintainable core',
    phases: 'Phases 5, 6, 7',
    color: '#a371f7',
    detail: 'Driver Factory, externalised config, the Page Object Model, and JSON-driven locators and data — a locator change touches one file, not fifty.',
  },
  {
    name: 'Professional reporting',
    phases: 'Phase 8',
    color: '#f0a35e',
    detail: 'Allure with steps and severity, screenshots on failure, structured logging, and page-source capture — failures explain themselves.',
  },
  {
    name: 'Version control & CI/CD',
    phases: 'Phases 9, 10',
    color: '#56d364',
    detail: 'Git and GitHub, Jenkins and Actions, a deployed live report, plus parallel and cloud execution — the framework now runs itself.',
  },
];

const PROOF = [
  { icon: '📗', label: 'clean repo + strong README' },
  { icon: '🟢', label: 'green CI badge from Actions' },
  { icon: '🔗', label: 'link to the live Allure report' },
  { icon: '💬', label: 'you can explain every decision' },
];

export default function AcicdCapstoneStackVisualization() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setStep(v => (v + 1) % (LAYERS.length + 1)), 2.4, auto);

  const built = Math.min(step + 1, LAYERS.length);
  const done = step >= LAYERS.length;
  const current = done ? null : LAYERS[step];

  return (
    <Stage2D
      title="What you actually built — five layers, ten phases"
      subtitle="Ten phases ago a terminal felt like defusing a bomb. What is in your repository now is not a tutorial toy: it is a framework a working engineer would recognise and respect."
      accent={done ? '#f0a35e' : current.color}
      viewBox="0 0 640 300"
      controls={<>
        {LAYERS.map((l, k) => (
          <button key={l.name} className={`dsa2d-btn ${k === step ? 'dsa2d-btn--on' : ''}`} onClick={() => setStep(k)}>{k + 1}</button>
        ))}
        <button className={`dsa2d-btn ${done ? 'dsa2d-btn--on' : ''}`} onClick={() => setStep(LAYERS.length)}>proof</button>
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{done ? 'now make it work for you →' : `${current.name} · ${current.phases}`}</span>
      </>}
      legend={<>Every one of these layers is a line in a real job listing — "experience building a test framework", "Appium and Python", "Page Object Model", "reporting", "CI/CD" — and you have hands-on experience with all of it, tied together in one project you understand end to end. The part that actually lands the offer is the <em>why</em>: why POM (a locator change touches one file), why a Driver Factory (parallel-safe, per-worker drivers), why waits over sleeps (flakiness has a cause). Never put anything on a résumé you cannot explain the reasoning behind — and thanks to how you learned this, you can explain all of it.</>}
    >
      {/* the stack, built bottom-up */}
      {LAYERS.map((l, k) => {
        const on = k < built;
        const isCurrent = !done && k === step;
        const y = 214 - k * 38;
        return (
          <g key={l.name} opacity={on ? 1 : 0.18} className="dsa2d-fade">
            <rect x="18" y={y} width="392" height="32" rx="8"
              fill={on ? `${l.color}1c` : '#161b22'}
              stroke={on ? l.color : '#30363d'} strokeWidth={isCurrent ? 2.4 : 1.4}
              className={isCurrent ? 'dsa2d-pulse' : ''} />
            <text x="34" y={y + 20} fill={on ? '#e6edf3' : '#484f58'} fontSize="11" fontWeight="700" fontFamily="system-ui">{l.name}</text>
            <text x="396" y={y + 20} fill={on ? l.color : '#484f58'} fontSize="8.5" textAnchor="end" fontFamily="Consolas">{l.phases}</text>
          </g>
        );
      })}
      <text x="18" y="246" fill="#6e7681" fontSize="8.5" fontFamily="system-ui">↑ each layer rests on the one below it</text>

      {/* right panel: current layer detail, or the portfolio proof */}
      <rect x="426" y="24" width="198" height="222" rx="11"
        fill={done ? 'rgba(240,163,94,.06)' : '#0d1117'}
        stroke={done ? '#f0a35e' : current.color} strokeWidth="1.8" />

      {done ? (
        <g className="dsa2d-pop">
          <text x="525" y="48" fill="#f0a35e" fontSize="10.5" textAnchor="middle" fontWeight="700" fontFamily="system-ui">turn it into a job</text>
          {PROOF.map((p, k) => (
            <g key={p.label}>
              <text x="442" y={78 + k * 40} fill="#f0a35e" fontSize="13">{p.icon}</text>
              <foreignObject x="462" y={64 + k * 40} width="150" height="34">
                <div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '9.5px system-ui', lineHeight: 1.35 }}>
                  {p.label}
                </div>
              </foreignObject>
            </g>
          ))}
          <text x="525" y="234" fill="#8b949e" fontSize="8" textAnchor="middle" fontFamily="system-ui">next: iOS · API · BDD</text>
        </g>
      ) : (
        <g className="dsa2d-pop" key={current.name}>
          <text x="525" y="48" fill={current.color} fontSize="10.5" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{`layer ${step + 1} of 5`}</text>
          <line x1="446" y1="58" x2="604" y2="58" stroke="#21262d" strokeWidth="1" />
          <foreignObject x="442" y="68" width="166" height="170">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '10.5px system-ui', lineHeight: 1.55 }}>
              {current.detail}
            </div>
          </foreignObject>
        </g>
      )}

      <text x="18" y="272" fill="#6e7681" fontSize="9.5" fontFamily="system-ui">
        {'"Built a hybrid Appium + Python framework: POM, JSON data-driven tests, Allure reporting, CI/CD via GitHub Actions, and parallel'}
      </text>
      <text x="18" y="288" fill="#6e7681" fontSize="9.5" fontFamily="system-ui">
        {'execution — reducing a 2-hour suite to ~20 minutes." That is a résumé bullet with numbers behind it, and you can defend every clause.'}
      </text>
    </Stage2D>
  );
}
