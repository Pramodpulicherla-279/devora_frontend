/* Lesson: Allure Report Deployment — A Shareable URL for Your Results
 * Concept: `allure serve` is showing someone your screen; `allure generate` + GitHub Pages is
 * publishing a real page with a permanent address. The subtle killer is history: generate without
 * carrying the previous history/ folder forward and every report is amnesiac — it looks perfect
 * and the trend graphs are permanently empty. Toggle the carry-forward across three runs. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const RUNS = [
  { n: 1, pass: 88 },
  { n: 2, pass: 74 },
  { n: 3, pass: 96 },
];

export default function AcicdReportDeployVisualization() {
  const [history, setHistory] = useState(true);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setHistory(v => !v), 2.9, auto);

  return (
    <Stage2D
      title="Deploying the report — and the history that makes it worth deploying"
      subtitle="An artifact your manager must download and unzip is an artifact nobody opens. Publish to GitHub Pages and the link always shows the latest run — but only carry-forward history gives you trends."
      accent={history ? '#4fce78' : '#f0a35e'}
      viewBox="0 0 640 300"
      controls={<>
        <button className={`dsa2d-btn ${!history ? 'dsa2d-btn--on' : ''}`} onClick={() => setHistory(false)}>generate --clean only</button>
        <button className={`dsa2d-btn ${history ? 'dsa2d-btn--on' : ''}`} onClick={() => setHistory(true)}>carry history/ forward</button>
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">
          {history ? 'run 3 shows 3 builds of trend — flaky tests become visible ✓' : 'run 3 shows 1 build — every report is amnesiac 💥'}
        </span>
      </>}
      legend={<><code>allure generate</code> produces a self-contained static site (unlike the temporary, local <code>allure serve</code>), and pushing it to the <code>gh-pages</code> branch gets it hosted free at a public URL. Check out the existing <code>gh-pages</code> and copy its <code>history/</code> folder into <code>allure-results</code> <em>before</em> generating, or Allure has nothing to build trends from. Keep <code>if: always()</code> on every deploy step — the run you most want published is the one that failed. This closes the CI/CD loop: code change → tests → published report → a link anyone can open.</>}
    >
      <text x="18" y="28" fill="#8b949e" fontSize="10.5" fontFamily="system-ui">three CI runs, each regenerating the deployed report</text>

      {RUNS.map((r, k) => {
        // With history, run k shows k+1 bars of trend. Without, always just 1.
        const bars = history ? r.n : 1;
        const shown = RUNS.slice(0, bars).map((x, j) => (history ? RUNS[r.n - bars + j] : r));
        return (
          <g key={r.n}>
            <rect x={18 + k * 208} y="38" width="188" height="170" rx="11"
              fill="#0d1117" stroke={history ? '#56d364' : '#f0a35e'} strokeWidth="1.7" />
            <text x={112 + k * 208} y="58" fill="#e6edf3" fontSize="10.5" textAnchor="middle" fontWeight="700" fontFamily="system-ui">
              {`build #${r.n}`}
            </text>
            <text x={112 + k * 208} y="73" fill="#8b949e" fontSize="8" textAnchor="middle" fontFamily="Consolas">
              {`${r.pass}% passed`}
            </text>

            {/* trend panel */}
            <rect x={32 + k * 208} y="82" width="160" height="88" rx="7" fill="#010409" stroke="#21262d" strokeWidth="1" />
            <text x={40 + k * 208} y="96" fill="#6e7681" fontSize="7.5" fontFamily="system-ui">TREND</text>
            {shown.map((b, j) => {
              const h = Math.round(b.pass * 0.52);
              const bw = 26;
              const gap = 12;
              const totalW = shown.length * bw + (shown.length - 1) * gap;
              const startX = 32 + k * 208 + (160 - totalW) / 2;
              return (
                <g key={j} className="dsa2d-pop">
                  <rect x={startX + j * (bw + gap)} y={162 - h} width={bw} height={h} rx="3"
                    fill={b.pass >= 85 ? 'rgba(86,211,100,.5)' : 'rgba(240,163,94,.5)'}
                    stroke={b.pass >= 85 ? '#56d364' : '#f0a35e'} strokeWidth="1" />
                  <text x={startX + j * (bw + gap) + bw / 2} y={158 - h} fill="#8b949e" fontSize="7" textAnchor="middle" fontFamily="Consolas">
                    {b.pass}
                  </text>
                </g>
              );
            })}
            <text x={112 + k * 208} y="190" fill={history ? '#56d364' : '#f0a35e'} fontSize="8.5" textAnchor="middle" fontFamily="Consolas">
              {history ? `${bars} build${bars > 1 ? 's' : ''} of history` : 'no history — 1 build'}
            </text>
            <text x={112 + k * 208} y="202" fill="#6e7681" fontSize="7.5" textAnchor="middle" fontFamily="system-ui">
              {history ? 'flaky tests surface here' : 'trends never populate'}
            </text>

            {/* the history hand-off arrow */}
            {k < 2 && (
              <g opacity={history ? 1 : 0.3} className="dsa2d-fade">
                <text x={212 + k * 208} y="118" fill={history ? '#56d364' : '#6e7681'} fontSize="15" textAnchor="middle">→</text>
                <text x={212 + k * 208} y="136" fill={history ? '#56d364' : '#6e7681'} fontSize="7" textAnchor="middle" fontFamily="Consolas">history/</text>
                {!history && <text x={212 + k * 208} y="150" fill="#f85149" fontSize="10" textAnchor="middle">✕</text>}
              </g>
            )}
          </g>
        );
      })}

      {/* the published URL */}
      <rect x="18" y="222" width="606" height="42" rx="10" fill="rgba(88,166,255,.06)" stroke="#58a6ff" strokeWidth="1.6" />
      <text x="34" y="240" fill="#58a6ff" fontSize="10" fontWeight="700" fontFamily="system-ui">🔗 published to the gh-pages branch</text>
      <text x="34" y="256" fill="#79c0ff" fontSize="9.5" fontFamily="Consolas">https://yourname.github.io/kisankart-automation</text>
      <text x="608" y="248" fill="#8b949e" fontSize="8.5" textAnchor="end" fontFamily="system-ui">one click · always the latest run · no artifact to unzip</text>

      <text x="18" y="284" fill="#6e7681" fontSize="9.5" fontFamily="system-ui">
        {'Without history the report generates fine and publishes fine — which is exactly why the mistake survives so long unnoticed.'}
      </text>
      <text x="18" y="298" fill="#6e7681" fontSize="9.5" fontFamily="system-ui">
        {'A live report URL linked from your README is proof of a professional setup that employers rarely see from candidates.'}
      </text>
    </Stage2D>
  );
}
