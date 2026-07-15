/* Lesson: Encapsulation — Keeping Your Data Safe Inside Objects
 * 2D animated: the balance lives inside a vault; deposits/withdrawals go through
 * validating methods, while a direct write breaks the invariant. Auto-cycles attacks. */
import { useState } from 'react';
import Stage2D from '../../../_shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../_shared/util';

export default function PfEncapsulationVisualization() {
  const [balance, setBalance] = useState(100);
  const [shield, setShield] = useState(true);
  const [flash, setFlash] = useState(null);
  const [log, setLog] = useState('use the interface — or bypass it');
  const [auto, setAuto] = useState(true);
  const [seq, setSeq] = useState(0);
  const deposit = () => { setBalance(b => b + 50); setFlash('ok'); setLog('deposit(50) ✓ validated'); setTimeout(() => setFlash(null), 500); };
  const badWithdraw = () => { setFlash('block'); setLog('withdraw(huge) ✗ rejected — protected'); setTimeout(() => setFlash(null), 600); };
  const hack = () => { if (shield) { setFlash('block'); setLog('__balance = -999 blocked (name-mangled)'); } else { setBalance(-999); setFlash('bad'); setLog('_balance = -999 😱 corrupted'); } setTimeout(() => setFlash(null), 600); };
  const reset = () => { setBalance(100); setLog('reset'); };
  useAutoPlay(() => { [deposit, badWithdraw, hack, deposit, reset][seq % 5](); setSeq(s => s + 1); }, 2.0, auto, [seq, shield, balance]);
  const bad = balance < 0;

  return (
    <Stage2D
      title="Encapsulation: the vault"
      subtitle="State lives INSIDE the object; the world talks to it only through methods that validate. Try to break in."
      accent="#f97316"
      viewBox="0 0 640 250"
      controls={
        <>
          <button className="pf2d-btn pf2d-btn--primary" onClick={deposit}>deposit(50)</button>
          <button className="pf2d-btn" onClick={badWithdraw}>withdraw(huge)</button>
          <button className="pf2d-btn" onClick={hack}>set directly</button>
          <button className={`pf2d-btn ${shield ? 'pf2d-btn--on' : ''}`} onClick={() => setShield(s => !s)}>{shield ? '✓ __balance' : '_balance'}</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="pf2d-readout">{log}</span>
        </>
      }
      legend={bad
        ? <>With no barrier, outside code wrote an impossible value — every method that trusts <code>balance ≥ 0</code> is now broken. This is why heaps, BSTs and queues hide their internals: one rogue write destroys the structure's <em>invariant</em>.</>
        : <>Convention: <code>_balance</code> = "internal, don't touch"; <code>__balance</code> adds name-mangling for real resistance. The public methods are the vault door — <code>deposit</code>/<code>withdraw</code> validate every change, so <strong>balance ≥ 0</strong> always holds.</>}
    >
      {/* vault */}
      <circle cx="320" cy="125" r="95" fill={flash === 'block' ? '#f85149' : flash === 'ok' ? '#56d364' : shield ? '#f97316' : '#30363d'} opacity={shield ? 0.14 : 0.06} stroke={shield ? '#f97316' : '#30363d'} strokeWidth="2" strokeDasharray={shield ? '0' : '6 5'} className="pf2d-fade" />
      <rect x="272" y="98" width="96" height="56" rx="10" fill={bad ? '#f85149' : '#161b22'} stroke="#30363d" />
      <text x="320" y="118" fill={bad ? '#fff' : '#f97316'} fontSize="12" textAnchor="middle" fontFamily="Consolas">{shield ? '__balance' : '_balance'}</text>
      <text x="320" y="142" fill={bad ? '#fff' : '#e6edf3'} fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{balance}</text>
      {/* interface ports */}
      <rect x="90" y="102" width="120" height="46" rx="10" fill="#56d364" /><text x="150" y="130" fill="#0d1117" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">deposit()</text>
      <rect x="430" y="102" width="120" height="46" rx="10" fill="#58a6ff" /><text x="490" y="130" fill="#0d1117" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">withdraw()</text>
      <text x="320" y="242" fill={bad ? '#f85149' : '#c9d1d9'} fontSize="13" textAnchor="middle" fontFamily="system-ui">{bad ? 'invariant broken: balance < 0' : 'invariant: balance ≥ 0 ✓'}</text>
    </Stage2D>
  );
}
