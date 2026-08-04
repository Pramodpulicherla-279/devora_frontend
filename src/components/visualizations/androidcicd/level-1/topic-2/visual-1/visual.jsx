/* Lesson: GitHub Actions — CI Built Right Into Your Repo
 * Concept: no printing press to maintain — GitHub hands you a fresh runner on every push. The
 * step list runs top to bottom, and the default rule is brutal: the first failure halts the job
 * and skips everything after it. That is exactly when your reports matter most. Toggle
 * `if: always()` on the upload step and watch the evidence survive or vanish. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const STEPS = [
  { name: 'actions/checkout@v4', kind: 'ok' },
  { name: 'setup-python (cache: pip)', kind: 'ok' },
  { name: 'pip install -r requirements', kind: 'ok' },
  { name: 'appium driver install uiautomator2', kind: 'ok' },
  { name: 'android-emulator-runner → pytest', kind: 'fail' },
  { name: 'upload-artifact: allure-results', kind: 'upload' },
];

export default function AcicdActionsWorkflowVisualization() {
  const [always, setAlways] = useState(true);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setAlways(v => !v), 2.8, auto);

  return (
    <Stage2D
      title="One push, a fresh runner — and the step that must never be skipped"
      subtitle="GitHub Actions is CI with no server to maintain: a YAML workflow, a clean cloud machine per run, and a green check on the PR. Until a test fails and takes your evidence down with it."
      accent={always ? '#4fce78' : '#f85149'}
      viewBox="0 0 640 300"
      controls={<>
        <button className={`dsa2d-btn ${!always ? 'dsa2d-btn--on' : ''}`} onClick={() => setAlways(false)}>plain upload step</button>
        <button className={`dsa2d-btn ${always ? 'dsa2d-btn--on' : ''}`} onClick={() => setAlways(true)}>{'if: always()'}</button>
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">
          {always ? 'tests failed — but the artifacts uploaded anyway ✓' : 'tests failed → upload skipped → red X with no evidence 💥'}
        </span>
      </>}
      legend={<>A workflow lives in <code>.github/workflows/</code>, triggers <code>on: push</code> / <code>pull_request</code>, and runs on a runner GitHub provides and destroys. <code>reactivecircus/android-emulator-runner</code> boots the emulator and runs your Appium server and pytest inside it. By default a failed step <strong>halts the job</strong> and skips the rest — so any step that collects reports, logs, or screenshots needs <code>if: always()</code>, or a failed test throws away the very artifacts from Phase 8 you need to diagnose it.</>}
    >
      {/* trigger */}
      <text x="18" y="30" fill="#8b949e" fontSize="10.5" fontFamily="system-ui">trigger</text>
      <rect x="16" y="40" width="122" height="60" rx="10" fill="rgba(163,113,247,.08)" stroke="#a371f7" strokeWidth="1.6" />
      <text x="77" y="62" fill="#a371f7" fontSize="15" textAnchor="middle">⇧</text>
      <text x="77" y="80" fill="#e6edf3" fontSize="9.5" textAnchor="middle" fontFamily="Consolas">git push</text>
      <text x="77" y="93" fill="#8b949e" fontSize="8" textAnchor="middle" fontFamily="system-ui">or pull_request</text>
      <text x="152" y="76" fill="#484f58" fontSize="14" textAnchor="middle">→</text>

      {/* runner */}
      <text x="172" y="30" fill="#8b949e" fontSize="10.5" fontFamily="system-ui">ubuntu-latest runner (fresh, then destroyed)</text>
      <rect x="170" y="40" width="300" height="212" rx="11" fill="#0d1117" stroke="#30363d" strokeWidth="1.6" />
      {STEPS.map((s, k) => {
        const isUpload = s.kind === 'upload';
        const failed = s.kind === 'fail';
        const skipped = isUpload && !always;
        const stroke = failed ? '#f85149' : skipped ? '#30363d' : isUpload ? '#56d364' : '#238636';
        return (
          <g key={s.name} opacity={skipped ? 0.35 : 1} className="dsa2d-fade">
            <rect x={182} y={52 + k * 33} width="276" height="27" rx="6"
              fill={failed ? 'rgba(248,81,73,.12)' : isUpload && !skipped ? 'rgba(86,211,100,.12)' : '#161b22'}
              stroke={stroke} strokeWidth={failed || (isUpload && !skipped) ? 1.8 : 1}
              className={failed ? 'dsa2d-blink' : ''} />
            <text x={194} y={69 + k * 33} fill={failed ? '#f85149' : skipped ? '#6e7681' : '#c9d1d9'} fontSize="8.5" fontFamily="Consolas">
              {s.name}
            </text>
            <text x={446} y={69 + k * 33} fill={failed ? '#f85149' : skipped ? '#6e7681' : '#56d364'} fontSize="10" textAnchor="end">
              {failed ? '✗' : skipped ? '⊘' : '✓'}
            </text>
          </g>
        );
      })}
      {always && (
        <g className="dsa2d-pop">
          <rect x={330} y={182} width="76" height="17" rx="4" fill="#0d1117" stroke="#56d364" strokeWidth="1" />
          <text x={368} y={194} fill="#56d364" fontSize="8" textAnchor="middle" fontFamily="Consolas">if: always()</text>
        </g>
      )}

      <text x="484" y="76" fill="#484f58" fontSize="14" textAnchor="middle">→</text>

      {/* outcome */}
      <text x="502" y="30" fill="#8b949e" fontSize="10.5" fontFamily="system-ui">what you get</text>
      <rect x="500" y="40" width="124" height="212" rx="11"
        fill={always ? 'rgba(86,211,100,.06)' : 'rgba(248,81,73,.06)'}
        stroke={always ? '#56d364' : '#f85149'} strokeWidth="1.8" />
      <text x="562" y="72" fill={always ? '#56d364' : '#f85149'} fontSize="24" textAnchor="middle">{always ? '📦' : '🚫'}</text>
      {always ? (
        <g className="dsa2d-pop">
          <text x="562" y="102" fill="#e6edf3" fontSize="9.5" textAnchor="middle" fontWeight="700" fontFamily="system-ui">artifacts saved</text>
          <text x="562" y="126" fill="#8b949e" fontSize="8.5" textAnchor="middle" fontFamily="system-ui">allure-results</text>
          <text x="562" y="142" fill="#8b949e" fontSize="8.5" textAnchor="middle" fontFamily="system-ui">screenshots</text>
          <text x="562" y="158" fill="#8b949e" fontSize="8.5" textAnchor="middle" fontFamily="system-ui">page source</text>
          <text x="562" y="174" fill="#8b949e" fontSize="8.5" textAnchor="middle" fontFamily="system-ui">run logs</text>
          <text x="562" y="206" fill="#56d364" fontSize="9" textAnchor="middle" fontFamily="system-ui">downloadable</text>
          <text x="562" y="220" fill="#56d364" fontSize="9" textAnchor="middle" fontFamily="system-ui">from any run</text>
        </g>
      ) : (
        <g className="dsa2d-pop">
          <text x="562" y="102" fill="#e6edf3" fontSize="9.5" textAnchor="middle" fontWeight="700" fontFamily="system-ui">nothing</text>
          <text x="562" y="128" fill="#f85149" fontSize="8.5" textAnchor="middle" fontFamily="system-ui">a red X on the PR</text>
          <text x="562" y="146" fill="#f85149" fontSize="8.5" textAnchor="middle" fontFamily="system-ui">and no report,</text>
          <text x="562" y="162" fill="#f85149" fontSize="8.5" textAnchor="middle" fontFamily="system-ui">no screenshot,</text>
          <text x="562" y="178" fill="#f85149" fontSize="8.5" textAnchor="middle" fontFamily="system-ui">no page source</text>
          <text x="562" y="208" fill="#8b949e" fontSize="8.5" textAnchor="middle" fontFamily="system-ui">exactly when</text>
          <text x="562" y="222" fill="#8b949e" fontSize="8.5" textAnchor="middle" fontFamily="system-ui">you needed them</text>
        </g>
      )}

      <text x="18" y="276" fill="#6e7681" fontSize="9.5" fontFamily="system-ui">
        {'Zero infrastructure: no server to provision, patch, or keep alive — and the pass/fail lands as a check right on the pull request.'}
      </text>
      <text x="18" y="292" fill="#6e7681" fontSize="9.5" fontFamily="system-ui">
        {'Free for public repos, so a green CI badge on your README is portfolio proof that costs nothing.'}
      </text>
    </Stage2D>
  );
}
