/* Lesson: Keeping Tests Independent and Idempotent
 * Concept: each test should be a self-contained episode — set up its own state, clean up after,
 * and never lean on another test or the run order. Coupled tests pass together but fail alone or
 * when shuffled; independent + idempotent tests pass in any order and enable parallel runs.
 * Toggle coupled vs independent and watch a shuffled run. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function AdataIndependenceVisualization() {
  const [independent, setIndependent] = useState(true);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setIndependent(v => !v), 2.6, auto);

  // order: A creates data, B relies on it, C cleans. Shuffled order runs B before A.
  const tests = [
    { name: 'test_B (run first, shuffled)', needs: "A's leftover listing" },
    { name: 'test_A', needs: 'nothing' },
    { name: 'test_C', needs: 'nothing' },
  ];

  return (
    <Stage2D
      title="Independent & idempotent: every test a self-contained episode"
      subtitle="Run one test alone to debug it and it fails; shuffle the order and three collapse — nothing changed but when they ran. Tests secretly leaning on each other are a house of cards."
      accent={independent ? '#4fce78' : '#f85149'}
      viewBox="0 0 640 250"
      controls={<>
        <button className={`dsa2d-btn ${!independent ? 'dsa2d-btn--on' : ''}`} onClick={() => setIndependent(false)}>coupled tests</button>
        <button className={`dsa2d-btn ${independent ? 'dsa2d-btn--on' : ''}`} onClick={() => setIndependent(true)}>independent tests</button>
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{independent ? 'each sets up & tears down its own state → passes in any order ✓' : 'shuffled order → tests that leaned on leftovers fail 💥'}</span>
      </>}
      legend={<>An <strong>independent</strong> test creates the state it needs and cleans up after itself (via fixtures), so it never depends on another test or the run order. <strong>Idempotent</strong> means running it again gives the same result — no accumulating leftover data. This discipline keeps a suite trustworthy and is what makes <strong>parallel execution</strong> possible at all.</>}
    >
      <text x="30" y="42" fill="#8b949e" fontSize="11" fontFamily="system-ui">run order (shuffled):</text>
      {tests.map((t, k) => {
        // coupled: test_B (first) fails because A hasn't run; independent: all pass
        const fails = !independent && k === 0;
        return (
          <g key={k}>
            <rect x="30" y={54 + k * 50} width="330" height="40" rx="9"
              fill={fails ? 'rgba(248,81,73,.1)' : 'rgba(86,211,100,.1)'}
              stroke={fails ? '#f85149' : '#56d364'} strokeWidth="1.8"
              className={fails ? 'dsa2d-blink' : ''} />
            <text x="44" y={72 + k * 50} fill="#e6edf3" fontSize="12" fontWeight="700" fontFamily="Consolas">{t.name}</text>
            <text x="44" y={88 + k * 50} fill="#8b949e" fontSize="9.5" fontFamily="system-ui">
              {independent ? 'sets up its own state, tears it down' : `needs: ${t.needs}`}
            </text>
            <text x="346" y={78 + k * 50} fill={fails ? '#f85149' : '#56d364'} fontSize="14" textAnchor="end">{fails ? '✗' : '✓'}</text>
          </g>
        );
      })}

      {/* the state box */}
      <rect x="384" y="54" width="226" height="136" rx="12"
        fill={independent ? 'rgba(86,211,100,.06)' : 'rgba(248,81,73,.06)'}
        stroke={independent ? '#56d364' : '#f85149'} strokeWidth="2" />
      <text x="497" y="78" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="system-ui">shared state</text>
      {independent ? (
        <>
          <text x="497" y="112" fill="#56d364" fontSize="26" textAnchor="middle">♻</text>
          <text x="497" y="138" fill="#e6edf3" fontSize="11.5" textAnchor="middle" fontWeight="700" fontFamily="system-ui">each test isolates itself</text>
          <text x="497" y="158" fill="#8b949e" fontSize="9.5" textAnchor="middle" fontFamily="system-ui">fresh setup + cleanup per test</text>
          <text x="497" y="176" fill="#8b949e" fontSize="9.5" textAnchor="middle" fontFamily="system-ui">→ safe to run in parallel</text>
        </>
      ) : (
        <>
          <text x="497" y="112" fill="#f85149" fontSize="26" textAnchor="middle">🃏</text>
          <text x="497" y="138" fill="#e6edf3" fontSize="11.5" textAnchor="middle" fontWeight="700" fontFamily="system-ui">house of cards</text>
          <text x="497" y="158" fill="#8b949e" fontSize="9.5" textAnchor="middle" fontFamily="system-ui">B leans on A's leftover data</text>
          <text x="497" y="176" fill="#8b949e" fontSize="9.5" textAnchor="middle" fontFamily="system-ui">order change → collapse</text>
        </>
      )}
    </Stage2D>
  );
}
