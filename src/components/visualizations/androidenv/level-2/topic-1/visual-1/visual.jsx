/* Lesson: Terminal and Environment Variables
 * Concept: PATH is an ordered list of folders the shell searches when you type a command.
 * It scans left → right; the first folder that contains the program wins. If the SDK's
 * platform-tools folder isn't on PATH, `adb` gives "command not found" even though it exists.
 * Step through the scan with and without the folder added. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function AenvPathLookupVisualization() {
  const [added, setAdded] = useState(false); // is platform-tools on PATH?
  const [scan, setScan] = useState(0);
  const [auto, setAuto] = useState(true);

  const base = [
    { name: '/usr/local/bin', has: false },
    { name: '/usr/bin', has: false },
  ];
  const folders = added ? [...base, { name: '…/platform-tools', has: true }] : base;
  const foundAt = folders.findIndex(f => f.has);
  const N = folders.length + 1; // +1 for the verdict frame

  useAutoPlay(() => setScan(s => (s + 1) % N), 1.1, auto);
  // clamp scan when toggling
  const step = Math.min(scan, N - 1);
  const scannedTo = step; // how many folders checked
  const done = step >= folders.length;
  const found = done && foundAt !== -1;

  return (
    <Stage2D
      title="How the terminal finds a command: the PATH scan"
      subtitle="Type `adb` and the shell walks PATH folder by folder, left to right, running the first match it finds. No folder contains adb? You get 'command not found' — even though adb sits right there on disk."
      accent="#58a6ff"
      viewBox="0 0 640 250"
      controls={<>
        <button className={`dsa2d-btn ${!added ? 'dsa2d-btn--on' : ''}`} onClick={() => { setAdded(false); setScan(0); }}>PATH without SDK</button>
        <button className={`dsa2d-btn ${added ? 'dsa2d-btn--on' : ''}`} onClick={() => { setAdded(true); setScan(0); }}>add platform-tools</button>
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{done ? (found ? 'found adb → run it ✓' : 'command not found ✗') : `checking folder ${scannedTo + 1}…`}</span>
      </>}
      legend={<>Set a variable permanently in your shell profile (<code>~/.zshrc</code>, <code>~/.bashrc</code>) or Windows System Properties — not just for the current window. <code>export PATH="$PATH:…/platform-tools"</code> appends the SDK's tools folder. Open a <em>new</em> terminal (or re-source the file) for the change to take effect, then confirm with <code>adb --version</code>.</>}
    >
      {/* the typed command */}
      <rect x="20" y="26" width="600" height="34" rx="7" fill="#0d1117" stroke="#30363d" />
      <text x="34" y="48" fill="#7ee787" fontSize="14" fontFamily="Consolas">$ adb devices</text>
      <text x="606" y="48" fill="#8b949e" fontSize="12" textAnchor="end" fontFamily="Consolas">shell reads $PATH →</text>

      {/* PATH folders */}
      {folders.map((f, i) => {
        const active = i === step && !done;
        const rejected = !done ? i < step : (!f.has);
        const isHit = f.has && (done ? found : i <= step);
        return (
          <g key={i}>
            <rect x={20 + i * 205} y="86" width="190" height="64" rx="10"
              fill={isHit && (done || active) ? 'rgba(86,211,100,.12)' : active ? 'rgba(88,166,255,.14)' : '#161b22'}
              stroke={isHit && done ? '#56d364' : active ? '#58a6ff' : '#30363d'}
              strokeWidth={active || (isHit && done) ? 3 : 1.5}
              className={active ? 'dsa2d-pulse' : ''} />
            <text x={115 + i * 205} y="112" fill="#c9d1d9" fontSize="12.5" textAnchor="middle" fontFamily="Consolas">{f.name}</text>
            <text x={115 + i * 205} y="134" fill={f.has ? '#7ee787' : '#8b949e'} fontSize="11.5" textAnchor="middle" fontFamily="Consolas">
              {f.has ? 'adb ✓ here' : 'no adb'}
            </text>
            {/* scan status badge */}
            {!done && i < step && <text x={195 + i * 205} y="102" fill={f.has ? '#56d364' : '#f85149'} fontSize="14" textAnchor="middle">{f.has ? '✓' : '✗'}</text>}
          </g>
        );
      })}

      {/* verdict */}
      <rect x="20" y="170" width="600" height="52" rx="10"
        fill={done ? (found ? 'rgba(86,211,100,.1)' : 'rgba(248,81,73,.08)') : '#0d1117'}
        stroke={done ? (found ? '#56d364' : '#f85149') : '#30363d'} strokeWidth="2" />
      <text x="320" y="202" fill={done ? (found ? '#7ee787' : '#ff9d95') : '#8b949e'} fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">
        {done ? (found ? 'List of devices attached ✓' : "adb: command not found ✗") : 'scanning PATH, left → right…'}
      </text>
    </Stage2D>
  );
}
