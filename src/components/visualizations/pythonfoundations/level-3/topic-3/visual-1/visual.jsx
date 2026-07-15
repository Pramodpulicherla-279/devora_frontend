/* Lesson: Methods — Giving Your Objects Behavior
 * 2D animated: call methods on an object and watch ITS state (self.charge) change —
 * some methods mutate state, some just report it. Auto-cycles the calls. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

export default function PfMethodsVisualization() {
  const [charge, setCharge] = useState(80);
  const [log, setLog] = useState('call a method →');
  const [auto, setAuto] = useState(true);
  const [seq, setSeq] = useState(0);
  const wave = () => { if (charge < 10) { setLog('wave() → battery too low'); return; } setCharge(c => Math.max(0, c - 20)); setLog('robot.wave() — self.charge -= 20'); };
  const recharge = () => { setCharge(100); setLog('robot.recharge() — self.charge = 100'); };
  const status = () => setLog(`robot.status() → "charge ${charge}%"`);
  useAutoPlay(() => { [wave, status, wave, recharge][seq % 4](); setSeq(s => s + 1); }, 2.0, auto, [seq, charge]);
  const col = charge > 60 ? '#56d364' : charge > 25 ? '#ffd43b' : '#f85149';

  return (
    <Stage2D
      title="Methods: behavior attached to state"
      subtitle="A method is a function that lives on the object and works on ITS data (self.charge). Call them and watch the robot respond."
      accent="#56d364"
      viewBox="0 0 640 250"
      controls={
        <>
          <button className="pf2d-btn pf2d-btn--primary" onClick={wave}>robot.wave()</button>
          <button className="pf2d-btn" onClick={recharge}>robot.recharge()</button>
          <button className="pf2d-btn" onClick={status}>robot.status()</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="pf2d-readout">{log}</span>
        </>
      }
      legend={<>Each call is really <code>Robot.wave(robot)</code> — the object slides in as <code>self</code>, so the method reads/writes <em>this robot's</em> charge, nobody else's. Methods that <strong>change</strong> state (wave/recharge) vs those that <strong>report</strong> it (status) — the same split you'll meet in every stack's push/pop vs peek.</>}
    >
      {/* robot */}
      <rect x="250" y="70" width="140" height="130" rx="14" fill="#161b22" stroke="#30363d" strokeWidth="2" />
      <rect x="278" y="46" width="84" height="34" rx="8" fill="#0d1117" stroke="#30363d" />
      <circle cx="300" cy="63" r="7" fill={col} className="pf2d-pulse" /><circle cx="340" cy="63" r="7" fill={col} className="pf2d-pulse" />
      {/* battery bar */}
      <rect x="272" y="96" width="96" height="90" rx="6" fill="#0d1117" stroke="#30363d" />
      <rect x="276" y={182 - (charge / 100) * 82} width="88" height={(charge / 100) * 82} rx="4" fill={col} style={{ transition: 'height .4s, y .4s, fill .3s' }} />
      <text x="320" y="145" fill="#0d1117" fontSize="18" textAnchor="middle" fontWeight="700" fontFamily="Consolas" opacity="0.5">{charge}%</text>
      <text x="320" y="222" fill="#e6edf3" fontSize="14" textAnchor="middle" fontFamily="Consolas">self.charge = {charge}</text>
      <text x="320" y="34" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="Consolas">robot = Robot()</text>
    </Stage2D>
  );
}
