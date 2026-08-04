/* Lesson: Logging — Giving Your Framework a Flight Recorder
 * Concept: print() is a note shouted across the room — no timestamp, no severity, gone when the
 * run ends. Logging is the black box: every event stamped and leveled, written to the console AND
 * a saved per-run file. The lever that makes it usable is the LEVEL THRESHOLD — raise it for a
 * clean everyday trail, drop it to DEBUG when hunting a bug, with zero edits to the log calls
 * themselves. Move the threshold and watch the same code produce a different trail. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const LEVELS = [
  { name: 'DEBUG', rank: 10, color: '#8b949e' },
  { name: 'INFO', rank: 20, color: '#58a6ff' },
  { name: 'WARNING', rank: 30, color: '#f0a35e' },
  { name: 'ERROR', rank: 40, color: '#f85149' },
  { name: 'CRITICAL', rank: 50, color: '#db61a2' },
];

const RANK = Object.fromEntries(LEVELS.map(l => [l.name, l.rank]));
const COLOR = Object.fromEntries(LEVELS.map(l => [l.name, l.color]));

const EVENTS = [
  { lvl: 'INFO', time: '09:12:04', msg: 'Starting listing creation test' },
  { lvl: 'DEBUG', time: '09:12:05', msg: 'filled the crop name field' },
  { lvl: 'DEBUG', time: '09:12:06', msg: 'submitted the listing form' },
  { lvl: 'WARNING', time: '09:12:07', msg: 'retried a stale element once' },
  { lvl: 'ERROR', time: '09:12:09', msg: 'element not found: crop_name' },
  { lvl: 'CRITICAL', time: '09:12:09', msg: 'driver session died' },
];

export default function ArepLoggingLevelsVisualization() {
  const [ti, setTi] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setTi(v => (v + 1) % LEVELS.length), 2.4, auto);

  const threshold = LEVELS[ti];
  const passes = e => RANK[e.lvl] >= threshold.rank;
  const shown = EVENTS.filter(passes);

  return (
    <Stage2D
      title="Log levels: one threshold, two very different trails"
      subtitle="print() has no timestamp, no severity, and vanishes when the run ends. A logger stamps every event and saves it — and the level threshold decides how much of it you actually see."
      accent={threshold.color}
      viewBox="0 0 640 300"
      controls={<>
        {LEVELS.map((l, k) => (
          <button key={l.name} className={`dsa2d-btn ${k === ti ? 'dsa2d-btn--on' : ''}`} onClick={() => setTi(k)}>{l.name}</button>
        ))}
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">
          {`setLevel(${threshold.name}) → ${shown.length} of ${EVENTS.length} events reach the console + file`}
        </span>
      </>}
      legend={<>Your code always calls every one of these <code>log.*</code> lines — the <strong>threshold</strong> alone decides which ones survive. Run day-to-day at <code>INFO</code> for a clean trail; drop to <code>DEBUG</code> when investigating and the detail appears without touching a single log statement. Each surviving line is stamped by the <strong>formatter</strong> and sent by the <strong>handlers</strong> to both the console and <code>reports/logs/run_&lt;timestamp&gt;.log</code> — the black box you read when the failure happened at 3 a.m. in CI and nobody was watching.</>}
    >
      {/* ---- left: the log calls in your code (never change) ---- */}
      <text x="20" y="34" fill="#8b949e" fontSize="10.5" fontFamily="system-ui">your code logs all of this — unchanged</text>
      <rect x="16" y="42" width="300" height="212" rx="10" fill="#0d1117" stroke="#30363d" strokeWidth="1.5" />
      {EVENTS.map((e, k) => {
        const on = passes(e);
        return (
          <g key={k} opacity={on ? 1 : 0.28} className="dsa2d-fade">
            <rect x={28} y={54 + k * 33} width="70" height="20" rx="5" fill={`${COLOR[e.lvl]}22`} stroke={COLOR[e.lvl]} strokeWidth="1.2" />
            <text x={63} y={68 + k * 33} fill={COLOR[e.lvl]} fontSize="9" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{e.lvl}</text>
            <text x={106} y={68 + k * 33} fill="#c9d1d9" fontSize="9.5" fontFamily="Consolas">{e.msg}</text>
            {!on && <line x1="28" y1={64 + k * 33} x2="300" y2={64 + k * 33} stroke="#6e7681" strokeWidth="1" />}
          </g>
        );
      })}

      {/* ---- middle: the threshold gate ---- */}
      <text x="358" y="34" fill="#8b949e" fontSize="10.5" textAnchor="middle" fontFamily="system-ui">threshold</text>
      <path d="M 330 60 L 386 60 L 366 152 L 350 152 Z" fill={`${threshold.color}1f`} stroke={threshold.color} strokeWidth="2" className="dsa2d-pulse" />
      <text x="358" y="104" fill={threshold.color} fontSize="9" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{threshold.name}</text>
      <text x="358" y="120" fill="#8b949e" fontSize="8" textAnchor="middle" fontFamily="Consolas">and above</text>
      <text x="358" y="176" fill={threshold.color} fontSize="16" textAnchor="middle">↓</text>
      <text x="358" y="200" fill="#6e7681" fontSize="8.5" textAnchor="middle" fontFamily="system-ui">handlers</text>
      <text x="358" y="214" fill="#6e7681" fontSize="8.5" textAnchor="middle" fontFamily="system-ui">+ formatter</text>

      {/* ---- right: what actually comes out ---- */}
      <text x="400" y="34" fill="#8b949e" fontSize="10.5" fontFamily="system-ui">console + run_20260314_091204.log</text>
      <rect x="398" y="42" width="226" height="212" rx="10" fill="#010409" stroke={threshold.color} strokeWidth="1.8" />
      {shown.map((e, k) => (
        <g key={k} className="dsa2d-pop">
          <text x={410} y={64 + k * 33} fill="#6e7681" fontSize="8.5" fontFamily="Consolas">{e.time}</text>
          <text x={462} y={64 + k * 33} fill={COLOR[e.lvl]} fontSize="8.5" fontWeight="700" fontFamily="Consolas">{e.lvl}</text>
          <text x={410} y={77 + k * 33} fill="#c9d1d9" fontSize="8.5" fontFamily="Consolas">{e.msg.length > 30 ? `${e.msg.slice(0, 29)}…` : e.msg}</text>
        </g>
      ))}
      {shown.length === 0 && (
        <text x="511" y="150" fill="#6e7681" fontSize="10" textAnchor="middle" fontFamily="Consolas">(nothing survives the threshold)</text>
      )}

      <text x="20" y="276" fill="#6e7681" fontSize="9.5" fontFamily="system-ui">
        {'print() gives you none of this: no level to filter by, no timestamp to rebuild a timeline, no file to read afterward.'}
      </text>
      <text x="20" y="292" fill="#6e7681" fontSize="9.5" fontFamily="system-ui">
        {'Guard setup with  if logger.handlers:  — loggers are shared, so re-running setup stacks handlers and duplicates every line.'}
      </text>
    </Stage2D>
  );
}
