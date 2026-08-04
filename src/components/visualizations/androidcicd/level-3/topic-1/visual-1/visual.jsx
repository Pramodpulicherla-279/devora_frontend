/* Lesson: Parallel and Cloud Scaling — Running Tests at Real-World Speed
 * Concept: ten checkout lanes instead of one. pytest-xdist opens the lanes, but each lane needs
 * its OWN cash register — a unique device and a unique systemPort per worker. Share either and
 * four sessions fight over one register: sessions fail to start, commands land on the wrong
 * session, and nothing reproduces. Toggle shared vs per-worker isolation. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const WORKERS = ['gw0', 'gw1', 'gw2', 'gw3'];

export default function AcicdParallelWorkersVisualization() {
  const [isolated, setIsolated] = useState(true);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setIsolated(v => !v), 2.8, auto);

  return (
    <Stage2D
      title="pytest -n 4: four lanes, and each one needs its own register"
      subtitle="200 tests run one after another is a two-hour CI run — by then you have mentally moved on and fast feedback has quietly become no feedback. Parallelism fixes it, if every worker is genuinely isolated."
      accent={isolated ? '#4fce78' : '#f85149'}
      viewBox="0 0 640 300"
      controls={<>
        <button className={`dsa2d-btn ${!isolated ? 'dsa2d-btn--on' : ''}`} onClick={() => setIsolated(false)}>one shared port + device</button>
        <button className={`dsa2d-btn ${isolated ? 'dsa2d-btn--on' : ''}`} onClick={() => setIsolated(true)}>systemPort per worker_id</button>
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">
          {isolated ? '4 isolated sessions → ~2h suite finishes in ~20 min ✓' : '4 workers collide on port 8200 → chaotic, non-reproducible failures 💥'}
        </span>
      </>}
      legend={<><code>pytest-xdist</code> runs the suite across worker processes (<code>pytest -n 4</code>), and <code>worker_id</code> (<code>"gw0"</code>, <code>"gw1"</code>, … or <code>"master"</code>) is what you derive a unique <code>systemPort</code> from. This only works because earlier phases built for it: the <strong>Driver Factory</strong> hands each worker a fresh driver instead of a shared global, <strong>function-scoped fixtures</strong> give every test its own lifecycle, and <strong>independent tests</strong> can run in any order. Point the same driver at a <strong>cloud device farm</strong> hub for real-device breadth — and treat <code>--reruns</code> as a sparing bandage, never a cure for a genuinely broken test.</>}
    >
      <text x="18" y="28" fill="#8b949e" fontSize="10.5" fontFamily="system-ui">pytest -n 4 → four xdist worker processes</text>

      {WORKERS.map((w, k) => (
        <g key={w}>
          <rect x="18" y={40 + k * 52} width="150" height="42" rx="9"
            fill="rgba(88,166,255,.08)" stroke="#58a6ff" strokeWidth="1.5" />
          <text x="34" y={58 + k * 52} fill="#e6edf3" fontSize="11" fontWeight="700" fontFamily="Consolas">{w}</text>
          <text x="34" y={73 + k * 52} fill="#8b949e" fontSize="8" fontFamily="Consolas">
            {isolated ? `systemPort ${8200 + k}` : 'systemPort 8200'}
          </text>
          <text x="156" y={66 + k * 52} fill={isolated ? '#56d364' : '#f85149'} fontSize="11" textAnchor="end">
            {isolated ? '✓' : '✗'}
          </text>
        </g>
      ))}

      {isolated ? (
        /* four parallel lanes, each to its own device */
        <>
          {WORKERS.map((w, k) => (
            <g key={w} className="dsa2d-pop">
              <line x1="176" y1={61 + k * 52} x2="418" y2={61 + k * 52} stroke="#56d364" strokeWidth="1.8" />
              <text x="297" y={55 + k * 52} fill="#56d364" fontSize="7.5" textAnchor="middle" fontFamily="Consolas">
                {`isolated session · port ${8200 + k}`}
              </text>
              <text x="424" y={66 + k * 52} fill="#56d364" fontSize="12">▸</text>
              <rect x="436" y={40 + k * 52} width="186" height="42" rx="9"
                fill="rgba(86,211,100,.08)" stroke="#56d364" strokeWidth="1.5" />
              <text x="452" y={58 + k * 52} fill="#e6edf3" fontSize="10" fontFamily="Consolas">
                {k < 2 ? `emulator-${k + 1}` : k === 2 ? 'Pixel 7 (cloud)' : 'Galaxy S23 (cloud)'}
              </text>
              <text x="452" y={73 + k * 52} fill="#8b949e" fontSize="7.5" fontFamily="Consolas">
                {k < 2 ? 'local · own udid' : 'BrowserStack hub · own udid'}
              </text>
            </g>
          ))}
        </>
      ) : (
        /* four lanes converging on one device */
        <>
          {WORKERS.map((w, k) => (
            <path key={w} d={`M 176 ${61 + k * 52} C 300 ${61 + k * 52}, 340 148, 430 148`}
              fill="none" stroke="#f85149" strokeWidth="1.6" className="dsa2d-blink" />
          ))}
          <g className="dsa2d-pop">
            <rect x="436" y="94" width="186" height="108" rx="11"
              fill="rgba(248,81,73,.09)" stroke="#f85149" strokeWidth="2.2" className="dsa2d-pulse" />
            <text x="529" y="118" fill="#e6edf3" fontSize="11" textAnchor="middle" fontWeight="700" fontFamily="Consolas">one emulator</text>
            <text x="529" y="134" fill="#f85149" fontSize="9" textAnchor="middle" fontFamily="Consolas">systemPort 8200</text>
            <text x="529" y="158" fill="#f85149" fontSize="20" textAnchor="middle">💥</text>
            <text x="529" y="178" fill="#f85149" fontSize="8" textAnchor="middle" fontFamily="system-ui">sessions fail to start</text>
            <text x="529" y="192" fill="#f85149" fontSize="8" textAnchor="middle" fontFamily="system-ui">commands hit the wrong session</text>
          </g>
        </>
      )}

      <rect x="18" y="252" width="604" height="38" rx="9"
        fill={isolated ? 'rgba(86,211,100,.06)' : 'rgba(248,81,73,.06)'}
        stroke={isolated ? '#56d364' : '#f85149'} strokeWidth="1.5" />
      <text x="34" y="268" fill={isolated ? '#56d364' : '#f85149'} fontSize="10" fontWeight="700" fontFamily="system-ui">
        {isolated ? '✓ 200 tests · 6 workers · ~20 minutes' : '✗ passes with -n 1, collapses with -n 4'}
      </text>
      <text x="34" y="282" fill="#8b949e" fontSize="9" fontFamily="system-ui">
        {isolated
          ? 'Every worker owns its driver, its port, and its device — so nothing is shared and nothing can collide.'
          : 'It looks like your tests broke. They did not — they are colliding, which is why the failures never reproduce the same way twice.'}
      </text>
    </Stage2D>
  );
}
