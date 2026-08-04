/* Lesson: Debugging Failures Fast — Page Source and Report Triage
 * Concept: four artifacts are captured at the failure moment, and each one answers a different
 * question. The screenshot is the photo; driver.page_source is the X-ray. Pick a symptom and see
 * which artifact actually cracks it — the habit that replaces "re-run it until it fails again". */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const ARTIFACTS = [
  { key: 'error', icon: '⚠', name: 'error message', answers: 'WHAT operation failed' },
  { key: 'shot', icon: '📷', name: 'screenshot', answers: 'WHAT the screen looked like' },
  { key: 'log', icon: '🧾', name: 'log file', answers: 'THE TIMELINE of steps' },
  { key: 'src', icon: '🩻', name: 'page source', answers: 'THE ELEMENT TREE (XML)' },
];

const CASES = [
  {
    label: 'blocking dialog',
    symptom: 'NoSuchElementException on the Submit button',
    winner: 'shot',
    verdict: 'The screenshot shows a permission dialog sitting over the button. No amount of locator tweaking would have found it.',
  },
  {
    label: 'renamed locator',
    symptom: 'NoSuchElementException on id "crop_name"',
    winner: 'src',
    verdict: 'The button is visible in the photo, so pixels cannot explain it. The page source shows the real id: it was renamed to "produce_name".',
  },
  {
    label: 'timing / order',
    symptom: 'test passes alone, fails in the full suite',
    winner: 'log',
    verdict: 'The log timestamps show the tap landed 200 ms before the list finished loading — a synchronisation problem, not a locator one.',
  },
];

export default function ArepTriageKitVisualization() {
  const [ci, setCi] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setCi(v => (v + 1) % CASES.length), 3.2, auto);

  const c = CASES[ci];

  return (
    <Stage2D
      title="Triage kit: four artifacts, four different questions"
      subtitle="A screenshot shows what a failure looked like; the page source shows the structure behind it. Different failures hide in different artifacts — which is exactly why you capture all four."
      accent="#58a6ff"
      viewBox="0 0 640 300"
      controls={<>
        {CASES.map((x, k) => (
          <button key={x.label} className={`dsa2d-btn ${k === ci ? 'dsa2d-btn--on' : ''}`} onClick={() => setCi(k)}>{x.label}</button>
        ))}
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{`symptom: ${c.symptom}`}</span>
      </>}
      legend={<>Extend the failure hook to attach <code>driver.page_source</code> alongside the PNG (as <code>attachment_type.XML</code>) and every failed run carries its own evidence file. Then triage <strong>in order</strong> — error, screenshot, log, page source — because each reveals a different class of bug. The professional habit is to <em>read</em> a captured failure rather than <em>reproduce</em> it: CI and flaky failures frequently will not recur on your machine, and the artifacts were already collected at the exact moment of truth.</>}
    >
      <text x="20" y="30" fill="#8b949e" fontSize="10.5" fontFamily="system-ui">captured automatically at the failure moment</text>

      {ARTIFACTS.map((a, k) => {
        const hit = a.key === c.winner;
        return (
          <g key={a.key}>
            <rect x={18 + k * 153} y="40" width="137" height="112" rx="11"
              fill={hit ? 'rgba(88,166,255,.1)' : '#161b22'}
              stroke={hit ? '#58a6ff' : '#30363d'} strokeWidth={hit ? 2.4 : 1.4}
              className={hit ? 'dsa2d-pulse' : ''} />
            <text x={86 + k * 153} y="70" fill={hit ? '#58a6ff' : '#6e7681'} fontSize="20" textAnchor="middle">{a.icon}</text>
            <text x={86 + k * 153} y="94" fill={hit ? '#e6edf3' : '#8b949e'} fontSize="11" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{a.name}</text>
            <text x={86 + k * 153} y="112" fill="#6e7681" fontSize="8" textAnchor="middle" fontFamily="system-ui">{a.answers}</text>
            <text x={86 + k * 153} y="138" fill={hit ? '#56d364' : '#484f58'} fontSize="9" textAnchor="middle" fontWeight="700" fontFamily="Consolas">
              {hit ? '★ cracks this one' : 'no answer here'}
            </text>
            <text x={86 + k * 153} y="34" fill="#484f58" fontSize="8" textAnchor="middle" fontFamily="Consolas">{k + 1}</text>
          </g>
        );
      })}

      {/* the verdict */}
      <rect x="16" y="168" width="608" height="72" rx="11" fill="rgba(88,166,255,.05)" stroke="#58a6ff" strokeWidth="1.6" />
      <text x="32" y="190" fill="#58a6ff" fontSize="10.5" fontWeight="700" fontFamily="system-ui">diagnosis from the evidence</text>
      <foreignObject x="32" y="196" width="576" height="40">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '11px system-ui', lineHeight: 1.45 }}>
          {c.verdict}
        </div>
      </foreignObject>

      {/* the wrong habit vs the right one */}
      <rect x="16" y="252" width="296" height="38" rx="9" fill="rgba(248,81,73,.06)" stroke="#f85149" strokeWidth="1.4" />
      <text x="30" y="268" fill="#f85149" fontSize="9.5" fontWeight="700" fontFamily="system-ui">✗ re-run and hope</text>
      <text x="30" y="282" fill="#8b949e" fontSize="8.5" fontFamily="Consolas">pytest … / pytest … / pytest … — hours gone</text>

      <rect x="328" y="252" width="296" height="38" rx="9" fill="rgba(86,211,100,.06)" stroke="#56d364" strokeWidth="1.4" />
      <text x="342" y="268" fill="#56d364" fontSize="9.5" fontWeight="700" fontFamily="system-ui">✓ read what was captured</text>
      <text x="342" y="282" fill="#8b949e" fontSize="8.5" fontFamily="Consolas">error → screenshot → log → page source</text>
    </Stage2D>
  );
}
