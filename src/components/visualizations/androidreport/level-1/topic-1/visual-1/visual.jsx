/* Lesson: Allure Reporting — Turning Test Results Into Something People Can Read
 * Concept: raw pytest output is a shoebox of receipts; Allure is the accountant that turns them
 * into a clean visual HTML dashboard. It works in TWO stages: during the run the allure-pytest
 * plugin writes result files; afterward `allure` generates the HTML report. Step through it. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const STEPS = [
  { log: 'raw pytest output — a shoebox of receipts nobody wants to read' },
  { log: 'stage 1: during the run, allure-pytest writes result files (JSON)' },
  { log: 'stage 2: `allure serve` turns those into an HTML dashboard' },
  { log: 'a shareable report: pass/fail overview, steps, screenshots, severity' },
];

export default function ArepAllureVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % STEPS.length), 2, auto);

  return (
    <Stage2D
      title="Allure: from a shoebox of receipts to a clean report"
      subtitle="Terminal pass/fail is for you; a report is for everyone else. Allure turns raw pytest results into a polished HTML dashboard the whole team can open, click through, and share."
      accent="#4fce78"
      viewBox="0 0 640 250"
      controls={<>
        {STEPS.map((_, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{k + 1}</button>)}
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{STEPS[i].log}</span>
      </>}
      legend={<>Allure runs in two stages: during the test run the <code>allure-pytest</code> plugin writes raw <strong>result files</strong> (<code>--alluredir</code>); afterward <code>allure serve</code>/<code>generate</code> turns them into an <strong>HTML dashboard</strong> with a pass/fail overview, readable steps, attached screenshots, and severity levels. Understanding the split (record now, render later) avoids a lot of confusion.</>}
    >
      {/* raw pytest */}
      <text x="90" y="42" fill="#8b949e" fontSize="10.5" textAnchor="middle" fontFamily="system-ui">raw pytest output</text>
      <rect x="24" y="50" width="132" height="150" rx="10" fill="#0d1117" stroke={i === 0 ? '#f0a35e' : '#30363d'} strokeWidth={i === 0 ? 2.5 : 1.5} className={i === 0 ? 'dsa2d-pulse' : ''} />
      {['. . F . .', 'test_x PASS', 'test_y FAIL', 'test_z PASS', '4 passed,', '1 failed'].map((ln, k) => (
        <text key={k} x="38" y={74 + k * 20} fill="#6e7681" fontSize="10" fontFamily="Consolas">{ln}</text>
      ))}
      <text x="90" y="214" fill="#6e7681" fontSize="9" textAnchor="middle" fontFamily="system-ui">📦 shoebox</text>

      <text x="176" y="120" fill={i >= 1 ? '#56d364' : '#484f58'} fontSize="18" textAnchor="middle">→</text>

      {/* result files (stage 1) */}
      <text x="256" y="42" fill="#8b949e" fontSize="10.5" textAnchor="middle" fontFamily="system-ui">stage 1: result files</text>
      <rect x="196" y="50" width="120" height="150" rx="10" fill="#161b22" stroke={i >= 1 ? '#58a6ff' : '#30363d'} strokeWidth={i === 1 ? 2.5 : 1.5} opacity={i >= 1 ? 1 : 0.4} className={i === 1 ? 'dsa2d-pulse' : ''} />
      {i >= 1 && [0, 1, 2].map(k => (
        <g key={k}>
          <rect x={210} y={68 + k * 42} width="92" height="32" rx="5" fill="#0d1117" stroke="#58a6ff" strokeWidth="1" />
          <text x="256" y={88 + k * 42} fill="#79c0ff" fontSize="9.5" textAnchor="middle" fontFamily="Consolas">result-{k + 1}.json</text>
        </g>
      ))}
      <text x="256" y="214" fill="#6e7681" fontSize="9" textAnchor="middle" fontFamily="system-ui">allure-pytest writes</text>

      <text x="336" y="120" fill={i >= 2 ? '#56d364' : '#484f58'} fontSize="18" textAnchor="middle">→</text>

      {/* HTML dashboard (stage 2) */}
      <text x="480" y="42" fill="#8b949e" fontSize="10.5" textAnchor="middle" fontFamily="system-ui">stage 2: HTML dashboard</text>
      <rect x="356" y="50" width="260" height="150" rx="10" fill={i >= 2 ? 'rgba(86,211,100,.06)' : '#161b22'} stroke={i >= 2 ? '#56d364' : '#30363d'} strokeWidth={i >= 2 ? 2.5 : 1.5} opacity={i >= 2 ? 1 : 0.4} className={i >= 3 ? 'dsa2d-pop' : ''} />
      {i >= 2 && (
        <>
          {/* donut */}
          <circle cx="410" cy="110" r="30" fill="none" stroke="#30363d" strokeWidth="10" />
          <circle cx="410" cy="110" r="30" fill="none" stroke="#56d364" strokeWidth="10" strokeDasharray="150 38" transform="rotate(-90 410 110)" />
          <text x="410" y="114" fill="#e6edf3" fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="Consolas">80%</text>
          {/* bars / rows */}
          <rect x="456" y="72" width="144" height="14" rx="3" fill="rgba(86,211,100,.3)" />
          <rect x="456" y="92" width="110" height="14" rx="3" fill="rgba(88,166,255,.3)" />
          <rect x="456" y="112" width="130" height="14" rx="3" fill="rgba(240,163,94,.3)" />
          <text x="370" y="170" fill="#8b949e" fontSize="9.5" fontFamily="system-ui">overview · steps · 📷 screenshots · severity</text>
          <text x="370" y="188" fill="#56d364" fontSize="9.5" fontFamily="system-ui">✓ click through & share with the team</text>
        </>
      )}
    </Stage2D>
  );
}
