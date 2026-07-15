/* Lesson: Type Conversion — Casting Between int, str, list, and More
 * 2D animated: a value flows through the cast machine into a new value (or sparks an
 * error). Auto-cycles value/target pairs, surfacing the classic conversion traps. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

const VALUES = ['"42"', '"3.9"', '"abc"', '3.9', '0', '"110"'];
const TARGETS = ['int', 'float', 'str', 'bool', 'list'];
const PAIRS = [['"42"', 'int'], ['3.9', 'int'], ['"abc"', 'int'], ['0', 'bool'], ['"110"', 'list'], ['"42"', 'str']];

function cast(vRaw, target) {
  const isStr = vRaw.startsWith('"'); const inner = isStr ? vRaw.slice(1, -1) : vRaw;
  if (target === 'int') { if (isStr) { if (!/^-?\d+$/.test(inner)) return { err: 'ValueError' }; return { out: String(parseInt(inner, 10)) }; } return { out: String(Math.trunc(parseFloat(inner))), note: inner === '3.9' ? 'truncates!' : '' }; }
  if (target === 'float') { if (isStr && isNaN(parseFloat(inner))) return { err: 'ValueError' }; return { out: String(parseFloat(inner)) + (Number.isInteger(parseFloat(inner)) ? '.0' : '') }; }
  if (target === 'str') return { out: `"${inner}"` };
  if (target === 'bool') { const f = inner === '0' && !isStr; return { out: String(!f), note: isStr && inner === '0' ? '"0" is True!' : '' }; }
  if (target === 'list') { if (!isStr) return { err: 'TypeError' }; return { out: `[${[...inner].map(c => `"${c}"`).join(',')}]` }; }
  return { out: '' };
}

export default function PfTypeConversionVisualization() {
  const [val, setVal] = useState('"42"');
  const [tgt, setTgt] = useState('int');
  const [auto, setAuto] = useState(true);
  const [seq, setSeq] = useState(0);
  useAutoPlay(() => { const [v, t] = PAIRS[seq % PAIRS.length]; setVal(v); setTgt(t); setSeq(s => s + 1); }, 2.0, auto, [seq]);
  const r = cast(val, tgt); const ok = !r.err;

  return (
    <Stage2D
      title="Type conversion: the casting machine"
      subtitle="Pick a value, pick a target type, watch the result — including the classic traps."
      accent="#f97316"
      viewBox="0 0 640 250"
      controls={
        <>
          <div className="pf2d-group"><span className="pf2d-label">value:</span>{VALUES.map(v => <button key={v} className={`pf2d-btn ${val === v ? 'pf2d-btn--on' : ''}`} onClick={() => setVal(v)}>{v}</button>)}</div>
          <div className="pf2d-group"><span className="pf2d-label">to:</span>{TARGETS.map(t => <button key={t} className={`pf2d-btn ${tgt === t ? 'pf2d-btn--on' : ''}`} onClick={() => setTgt(t)}>{t}()</button>)}</div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="pf2d-readout">{tgt}({val}) → {ok ? r.out : `💥 ${r.err}`}</span>
        </>
      }
      legend={<>Burn in the traps: <code>int(3.9)</code> <strong>truncates</strong> to 3 (never rounds); <code>int("abc")</code> raises ValueError; <code>bool("0")</code> is <strong>True</strong> (non-empty string); <code>list("abc")</code> explodes into characters. Conversion always builds a new object.</>}
    >
      {/* input */}
      <rect x="40" y="90" width="120" height="56" rx="10" fill="#58a6ff" />
      <text x="100" y="126" fill="#0d1117" fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{val}</text>
      {/* flow in */}
      <line x1="160" y1="118" x2="250" y2="118" stroke="#f97316" strokeWidth="2.5" className="pf2d-flow" /><polygon points="250,112 262,118 250,124" fill="#f97316" />
      {/* machine */}
      <rect x="266" y="80" width="108" height="76" rx="14" fill="#161b22" stroke="#f97316" strokeWidth="2" className="pf2d-pulse" />
      <text x="320" y="124" fill="#f97316" fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{tgt}()</text>
      {/* flow out */}
      <line x1="374" y1="118" x2="464" y2="118" stroke={ok ? '#56d364' : '#f85149'} strokeWidth="2.5" className="pf2d-flow" /><polygon points={`464,112 476,118 464,124`} fill={ok ? '#56d364' : '#f85149'} />
      {/* output */}
      <g className="pf2d-fade"><rect x="480" y="88" width="130" height="60" rx="10" fill={ok ? '#56d364' : '#f85149'} opacity={ok ? 1 : 0.6} />
        <text x="545" y="124" fill="#0d1117" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{ok ? r.out : r.err}</text></g>
      {ok && r.note && <text x="545" y="172" fill="#ffd43b" fontSize="12" textAnchor="middle" fontFamily="system-ui">{r.note}</text>}
    </Stage2D>
  );
}
