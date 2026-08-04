/* Lesson: Python Virtual Environment Setup for Appium
 * Concept: without a venv, every project's libraries pile into ONE shared system Python →
 * version conflicts. A venv gives each project its own private, isolated Python + libraries.
 * Toggle between the two worlds and watch the conflict appear / disappear. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function AenvVenvIsolationVisualization() {
  const [venv, setVenv] = useState(false); // false = shared system python, true = isolated venvs
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setVenv(v => !v), 2.2, auto);

  const projects = [
    { name: 'KisanKart tests', need: 'Client 3.1', y: 74 },
    { name: 'old side-project', need: 'Client 2.4', y: 150 },
  ];

  return (
    <Stage2D
      title="Virtual Environment = a private pantry per project"
      subtitle="Without a venv, two projects share ONE system-wide Python — and fight over the same library version. A venv seals each project's Python + libraries off from everything else."
      accent="#4fce78"
      viewBox="0 0 640 250"
      controls={<>
        <button className={`dsa2d-btn ${!venv ? 'dsa2d-btn--on' : ''}`} onClick={() => setVenv(false)}>no venv</button>
        <button className={`dsa2d-btn ${venv ? 'dsa2d-btn--on' : ''}`} onClick={() => setVenv(true)}>with venv</button>
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{venv ? 'each project: its own Python + libraries → no conflict' : 'one shared Python → version conflict 💥'}</span>
      </>}
      legend={<>A <strong>venv</strong> is an isolated copy of Python and its libraries for one project. Create with <code>python -m venv venv</code>, activate it, then <code>pip install</code> lands <em>inside</em> it. A <code>requirements.txt</code> snapshot lets a teammate or CI server rebuild the exact same setup with one command — the reproducibility that kills "works on my machine".</>}
    >
      {/* project cards */}
      {projects.map((p, i) => (
        <g key={i}>
          <rect x="24" y={p.y} width="180" height="56" rx="10" fill="#161b22" stroke="#30363d" strokeWidth="1.5" />
          <text x="114" y={p.y + 23} fill="#e6edf3" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{p.name}</text>
          <text x="114" y={p.y + 43} fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="Consolas">needs {p.need}</text>
        </g>
      ))}

      {/* arrows */}
      {projects.map((p, i) => (
        <path key={i} d={`M 204 ${p.y + 28} L 250 ${venv ? p.y + 28 : 112}`} fill="none" stroke={venv ? '#56d364' : '#f85149'} strokeWidth="2.5" markerEnd="url(#aenv-arrow)" className={auto ? '' : ''} />
      ))}
      <defs>
        <marker id="aenv-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={venv ? '#56d364' : '#f85149'} /></marker>
      </defs>

      {venv ? (
        /* two isolated venvs */
        projects.map((p, i) => (
          <g key={i}>
            <rect x="252" y={p.y - 4} width="150" height="64" rx="10" fill="rgba(86,211,100,.1)" stroke="#56d364" strokeWidth="2" strokeDasharray="6 4" />
            <text x="327" y={p.y + 16} fill="#56d364" fontSize="11" textAnchor="middle" fontWeight="700" fontFamily="Consolas">venv (isolated)</text>
            <rect x="266" y={p.y + 24} width="122" height="26" rx="6" fill="#0d1117" stroke="#56d364" />
            <text x="327" y={p.y + 41} fill="#7ee787" fontSize="12" textAnchor="middle" fontFamily="Consolas">{p.need} ✓</text>
          </g>
        ))
      ) : (
        /* one shared system python — conflict */
        <g>
          <rect x="252" y="70" width="170" height="86" rx="12" fill="rgba(248,81,73,.08)" stroke="#f85149" strokeWidth="2" />
          <text x="337" y="92" fill="#f85149" fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="Consolas">system Python (one shelf)</text>
          <rect x="268" y="104" width="138" height="24" rx="6" fill="#0d1117" stroke="#f85149" />
          <text x="337" y="120" fill="#ff9d95" fontSize="11.5" textAnchor="middle" fontFamily="Consolas">Client 3.1 vs 2.4 ✗</text>
          <text x="337" y="146" fill="#f85149" fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="system-ui" className="dsa2d-blink">version conflict</text>
        </g>
      )}

      {/* outcome panel */}
      <rect x="446" y="70" width="170" height="110" rx="12" fill={venv ? 'rgba(86,211,100,.08)' : '#161b22'} stroke={venv ? '#56d364' : '#30363d'} strokeWidth="2" />
      <text x="531" y="98" fill={venv ? '#56d364' : '#8b949e'} fontSize="30" textAnchor="middle">{venv ? '✓' : '💥'}</text>
      <text x="531" y="128" fill="#e6edf3" fontSize="13" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{venv ? 'both pass' : 'one breaks'}</text>
      <text x="531" y="150" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="system-ui">{venv ? 'reproducible' : '"works on'}</text>
      <text x="531" y="166" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="system-ui">{venv ? 'anywhere' : 'my machine"'}</text>

      <text x="24" y="226" fill="#8b949e" fontSize="12" fontFamily="system-ui">Same two projects, same libraries — the only difference is whether each gets its own sealed environment.</text>
    </Stage2D>
  );
}
