/* Lesson: Functions — Parameters, Return Values, and Why They Matter
 * 2D animated: arguments flow into the function machine, the body runs, and the
 * return value pops out. Auto-calls with changing inputs. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

const FUNCS = {
  'square(x)': { n: 1, calc: ([a]) => a * a, body: 'return x * x' },
  'add(a, b)': { n: 2, calc: ([a, b]) => a + b, body: 'return a + b' },
  'max2(a, b)': { n: 2, calc: ([a, b]) => Math.max(a, b), body: 'return a if a>b else b' },
};

export default function PfFunctionsVisualization() {
  const [fname, setFname] = useState('add(a, b)');
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const [called, setCalled] = useState(false);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => { setCalled(c => !c); setA(v => (v % 9) + 1); }, 1.6, auto);
  const f = FUNCS[fname];
  const args = f.n === 1 ? [a] : [a, b];
  const result = f.calc(args);

  return (
    <Stage2D
      title="Functions: input → machine → return"
      subtitle="A function is a reusable machine — arguments go in the top, the body runs, exactly one return value drops out."
      accent="#58a6ff"
      viewBox="0 0 640 300"
      controls={
        <>
          <div className="pf2d-group">{Object.keys(FUNCS).map(k => <button key={k} className={`pf2d-btn ${fname === k ? 'pf2d-btn--on' : ''}`} onClick={() => { setFname(k); setCalled(false); }}>{k}</button>)}</div>
          <div className="pf2d-group"><span className="pf2d-label">a={a}</span><input className="pf2d-slider" type="range" min="0" max="9" value={a} onChange={e => setA(+e.target.value)} />
            {f.n === 2 && <><span className="pf2d-label">b={b}</span><input className="pf2d-slider" type="range" min="0" max="9" value={b} onChange={e => setB(+e.target.value)} /></>}</div>
          <AutoButton playing={auto} onToggle={() => setAuto(x => !x)} />
          <span className="pf2d-readout">{called ? `→ ${result}` : 'idle'}</span>
        </>
      }
      legend={<>Parameters (<code>{fname.match(/\((.*)\)/)[1]}</code>) are the input slots; arguments ({args.join(', ')}) are the values you pour in. The body runs in its own workspace and <code>return</code> hands one value back. No <code>return</code>? You get <code>None</code>.</>}
    >
      {/* args */}
      {args.map((v, k) => (
        <g key={k} style={{ transform: called ? 'translateY(28px)' : 'translateY(0)', transition: 'transform .5s' }}>
          <rect x={130 + k * 90} y="34" width="64" height="44" rx="8" fill="#ffd43b" />
          <text x={162 + k * 90} y="62" fill="#0d1117" fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{v}</text>
        </g>
      ))}
      <text x="180" y="24" fill="#8b949e" fontSize="12" fontFamily="system-ui">arguments</text>
      {/* machine */}
      <rect x="120" y="110" width="240" height="96" rx="14" fill="#161b22" stroke="#58a6ff" strokeWidth="2" className={called ? 'pf2d-pulse' : ''} />
      <text x="240" y="146" fill="#58a6ff" fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">def {fname}:</text>
      <text x="240" y="178" fill="#c9d1d9" fontSize="13" textAnchor="middle" fontFamily="Consolas">{f.body}</text>
      {/* return flow */}
      <path d="M360 158 L452 158" fill="none" stroke="#56d364" strokeWidth="2.5" className="pf2d-flow" />
      <polygon points="452,152 464,158 452,164" fill="#56d364" />
      <g style={{ transform: called ? 'scale(1)' : 'scale(0)', transformBox: 'fill-box', transformOrigin: 'center', transition: 'transform .4s cubic-bezier(.3,1.5,.5,1)' }}>
        <rect x="470" y="130" width="120" height="56" rx="12" fill="#56d364" />
        <text x="530" y="166" fill="#0d1117" fontSize="24" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{result}</text>
      </g>
      <text x="530" y="210" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">return value</text>
    </Stage2D>
  );
}
