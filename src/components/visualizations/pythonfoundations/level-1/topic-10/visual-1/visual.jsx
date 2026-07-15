/* Lesson: Handling Errors Gracefully With try/except
 * 2D animated: a risky operation drops an exception; the right except net catches it,
 * otherwise it falls through to the crash zone. Auto-cycles the operations. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

const OPS = {
  'int("42")': { throws: null, result: '42' },
  'int("abc")': { throws: 'ValueError', result: null },
  '10 / 0': { throws: 'ZeroDivisionError', result: null },
  'nums[99]': { throws: 'IndexError', result: null },
};
const KEYS = Object.keys(OPS);

export default function PfTryExceptVisualization() {
  const [op, setOp] = useState('int("abc")');
  const [catchType, setCatchType] = useState('ValueError');
  const [dropped, setDropped] = useState(false);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => {
    if (!dropped) setDropped(true);
    else { setOp(o => KEYS[(KEYS.indexOf(o) + 1) % KEYS.length]); setDropped(false); }
  }, 1.7, auto, [dropped]);

  const o = OPS[op];
  const isErr = o.throws !== null;
  const caught = dropped && isErr && (catchType === o.throws || catchType === 'Exception');
  const ok = dropped && !isErr;
  const crashed = dropped && isErr && !caught;
  const ballY = !dropped ? 0 : caught || ok ? 118 : 210;

  return (
    <Stage2D
      title="try / except: the safety net"
      subtitle="Run a risky line. If it raises, the exception falls — an except net of the right type catches it; otherwise the program crashes."
      accent="#f85149"
      viewBox="0 0 640 290"
      controls={
        <>
          <div className="pf2d-group">{KEYS.map(k => <button key={k} className={`pf2d-btn ${op === k ? 'pf2d-btn--on' : ''}`} onClick={() => { setOp(k); setDropped(false); }}>{k}</button>)}</div>
          <div className="pf2d-group"><span className="pf2d-label">except</span>{['ValueError', 'ZeroDivisionError', 'Exception'].map(t => <button key={t} className={`pf2d-btn ${catchType === t ? 'pf2d-btn--on' : ''}`} onClick={() => { setCatchType(t); setDropped(false); }}>{t}</button>)}</div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="pf2d-readout">{!dropped ? 'ready' : ok ? `→ ${o.result}` : caught ? `${o.throws} caught` : `💥 ${o.throws}`}</span>
        </>
      }
      legend={<>The net only catches its declared type: <code>except ValueError</code> misses a <code>ZeroDivisionError</code>. <code>except Exception</code> catches almost everything — handy, but it can hide real bugs. Catch the <em>narrowest</em> type you can handle.</>}
    >
      <rect x="220" y="18" width="200" height="34" rx="8" fill="#161b22" stroke="#30363d" />
      <text x="320" y="40" fill="#e6edf3" fontSize="14" textAnchor="middle" fontFamily="Consolas">try: {op}</text>
      {/* net */}
      <g>
        <path d="M180 150 L460 150 M200 150 L200 128 M260 150 L260 128 M320 150 L320 128 M380 150 L380 128 M440 150 L440 128 M180 128 L460 128"
          stroke={caught ? '#56d364' : '#58a6ff'} strokeWidth="2" fill="none" className="pf2d-fade" />
        <text x="320" y="176" fill={caught ? '#56d364' : '#58a6ff'} fontSize="13" textAnchor="middle" fontFamily="Consolas">except {catchType}:</text>
      </g>
      {/* crash zone */}
      <rect x="180" y="236" width="280" height="40" rx="8" fill={crashed ? '#2d1416' : '#111318'} stroke={crashed ? '#f85149' : '#21262d'} className="pf2d-fade" />
      <text x="320" y="261" fill={crashed ? '#f85149' : '#8b949e'} fontSize="12" textAnchor="middle" fontFamily="Consolas">{crashed ? 'Traceback… CRASH' : 'unhandled → crash zone'}</text>
      {/* falling exception ball */}
      <g style={{ transform: `translate(320px, ${72 + ballY}px)`, transition: 'transform .55s cubic-bezier(.5,0,.7,1)' }}>
        <circle r="15" fill={!dropped ? '#8b949e' : isErr ? '#f85149' : '#56d364'} className="pf2d-pulse" />
        <text y="5" fill="#0d1117" fontSize="12" textAnchor="middle" fontWeight="700">{isErr ? '!' : '✓'}</text>
      </g>
    </Stage2D>
  );
}
