/* Lesson: Conditionals — Making Decisions With if, elif, and else
 * 2D animated FLOWCHART: a token flows down through if → elif → else diamonds, taking
 * the first branch that is True. Auto-sweeps the input so the flow re-routes live. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

const DEMO = [85, 55, 15];

export default function PfConditionalsVisualization() {
  const [x, setX] = useState(55);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setX(v => DEMO[(DEMO.indexOf(v) + 1) % DEMO.length] ?? 85), 2.4, auto);

  const branch = x > 70 ? 'high' : x > 30 ? 'medium' : 'low';
  // token target position for chosen outcome
  const tokenPos = branch === 'high' ? [500, 78] : branch === 'medium' ? [500, 168] : [320, 262];

  const Diamond = ({ cx, cy, label, active, taken }) => (
    <g className="pf2d-fade">
      <polygon points={`${cx},${cy - 34} ${cx + 96},${cy} ${cx},${cy + 34} ${cx - 96},${cy}`}
        fill={active ? '#161b22' : '#0d1117'} stroke={taken ? '#56d364' : '#30363d'} strokeWidth={taken ? 2.5 : 1.5} />
      <text x={cx} y={cy + 5} fill="#e6edf3" fontSize="14" textAnchor="middle" fontFamily="Consolas">{label}</text>
    </g>
  );
  const Out = ({ x: ox, y: oy, label, on, color }) => (
    <g className="pf2d-fade">
      <rect x={ox} y={oy} width="120" height="44" rx="8" fill={on ? color : '#161b22'} stroke={on ? color : '#30363d'} strokeWidth="2" />
      <text x={ox + 60} y={oy + 28} fill={on ? '#0d1117' : '#8b949e'} fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{label}</text>
    </g>
  );

  return (
    <Stage2D
      title="Conditionals: if / elif / else flow"
      subtitle="Exactly one branch runs. Python tests top-to-bottom and takes the FIRST condition that is True — order matters."
      accent="#56d364"
      viewBox="0 0 640 300"
      controls={
        <>
          <div className="pf2d-group"><span className="pf2d-label">x = {x}</span>
            <input className="pf2d-slider" type="range" min="0" max="100" value={x} onChange={e => setX(+e.target.value)} /></div>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="pf2d-readout">took the <b>{branch}</b> branch</span>
        </>
      }
      legend={<>The token enters at the top and only ever exits through <strong>one</strong> door. Even though 80 satisfies both <code>x&gt;70</code> and <code>x&gt;30</code>, it stops at the first True test — that's why <code>if/elif</code> ordering changes behaviour.</>}
    >
      {/* input */}
      <rect x="40" y="20" width="110" height="40" rx="8" fill="#161b22" stroke="#56d364" />
      <text x="95" y="45" fill="#56d364" fontSize="15" textAnchor="middle" fontFamily="Consolas">x = {x}</text>
      {/* flow spine */}
      <g stroke="#30363d" strokeWidth="2" fill="none">
        <path d="M95 60 L95 78 L156 78" className="pf2d-flow" stroke="#8b949e" />
        <path d="M252 78 L500 78" stroke={branch === 'high' ? '#56d364' : '#30363d'} className={branch === 'high' ? 'pf2d-flow' : ''} />
        <path d="M156 78 L156 168 L156 168" stroke={x <= 70 ? '#8b949e' : '#30363d'} />
        <path d="M156 168 L252 168" stroke={x <= 70 ? '#8b949e' : '#30363d'} />
        <path d="M348 168 L500 168" stroke={branch === 'medium' ? '#56d364' : '#30363d'} className={branch === 'medium' ? 'pf2d-flow' : ''} />
        <path d="M252 168 L252 168 M252 202 L252 240 L380 240" stroke={branch === 'low' ? '#56d364' : '#30363d'} className={branch === 'low' ? 'pf2d-flow' : ''} />
      </g>
      <Diamond cx={204} cy={78} label="x > 70 ?" active taken={branch === 'high'} />
      <Diamond cx={300} cy={168} label="x > 30 ?" active={x <= 70} taken={branch === 'medium'} />
      <text x={310} y={230} fill="#8b949e" fontSize="13" textAnchor="middle" fontFamily="Consolas">else</text>
      <Out x={500} y={56} label='"high"' on={branch === 'high'} color="#56d364" />
      <Out x={500} y={146} label='"medium"' on={branch === 'medium'} color="#ffd43b" />
      <Out x={380} y={218} label='"low"' on={branch === 'low'} color="#f97316" />
      {/* True/False labels */}
      <text x={360} y={70} fill="#56d364" fontSize="11" fontFamily="system-ui">True</text>
      <text x={140} y={130} fill="#f85149" fontSize="11" fontFamily="system-ui">False</text>
      {/* the flowing token */}
      <circle r="11" fill="#e6edf3" className="pf2d-pulse"
        style={{ transform: `translate(${tokenPos[0] + 60}px, ${tokenPos[1] + 22}px)`, transition: 'transform .5s cubic-bezier(.4,1.1,.5,1)' }} />
    </Stage2D>
  );
}
