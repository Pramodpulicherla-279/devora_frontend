/* Lesson: Config Management — Settings That Live Outside Your Code
 * Concept: config is the car's dashboard, not the engine — device name, server URL, timeouts live
 * in a config file you edit freely, not buried in code. Secrets (API keys, passwords) get a
 * special channel: environment variables / .env, never committed. Toggle hardcoded vs externalized. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

export default function AarchConfigVisualization() {
  const [ext, setExt] = useState(true); // externalized vs hardcoded
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setExt(v => !v), 2.4, auto);

  return (
    <Stage2D
      title="Config: the dashboard, not the engine"
      subtitle="You change the radio from the dashboard, not by rewiring the engine. Device name, server URL, and timeouts belong in a config file you can edit freely — and secrets belong in env vars, never in code."
      accent="#a78bfa"
      viewBox="0 0 640 250"
      controls={<>
        <button className={`dsa2d-btn ${!ext ? 'dsa2d-btn--on' : ''}`} onClick={() => setExt(false)}>hardcoded in code</button>
        <button className={`dsa2d-btn ${ext ? 'dsa2d-btn--on' : ''}`} onClick={() => setExt(true)}>externalized config</button>
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{ext ? 'one file change repoints the whole framework; secrets stay out of git ✓' : 'device id copied everywhere · secret about to leak 💥'}</span>
      </>}
      legend={<>Keep settings (device, server URL, app package, timeouts) in a <code>config.json</code>/<code>.ini</code> you can edit without touching code — so pointing the suite at a new device is one change. Handle <strong>secrets</strong> (API keys, passwords) via environment variables or a <code>.env</code> that is git-ignored, and read them with <code>os.environ</code>. Never commit a secret to a repo.</>}
    >
      {/* code file */}
      <text x="30" y="42" fill="#8b949e" fontSize="11" fontFamily="system-ui">driver_setup.py</text>
      <rect x="30" y="50" width="270" height="160" rx="10" fill="#0d1117" stroke={ext ? '#56d364' : '#f85149'} strokeWidth="1.5" />
      {ext ? (
        <>
          <text x="44" y="76" fill="#8b949e" fontSize="11" fontFamily="Consolas">cfg = load_config()</text>
          <text x="44" y="98" fill="#79c0ff" fontSize="11" fontFamily="Consolas">device = cfg["device"]</text>
          <text x="44" y="120" fill="#79c0ff" fontSize="11" fontFamily="Consolas">server = cfg["server_url"]</text>
          <text x="44" y="142" fill="#79c0ff" fontSize="11" fontFamily="Consolas">key = os.environ["API_KEY"]</text>
          <text x="44" y="180" fill="#56d364" fontSize="10.5" fontFamily="system-ui">✓ no values hardcoded</text>
          <text x="44" y="196" fill="#56d364" fontSize="10.5" fontFamily="system-ui">✓ no secret in the file</text>
        </>
      ) : (
        <>
          <text x="44" y="76" fill="#ff9d95" fontSize="11" fontFamily="Consolas">device = "emulator-5554"</text>
          <text x="44" y="98" fill="#ff9d95" fontSize="11" fontFamily="Consolas">server = "http://localhost:4723"</text>
          <text x="44" y="120" fill="#f85149" fontSize="11" fontFamily="Consolas">API_KEY = "sk-live-9f3a…"</text>
          <text x="44" y="150" fill="#f85149" fontSize="10.5" fontFamily="system-ui" className="dsa2d-blink">💥 secret committed to git!</text>
          <text x="44" y="180" fill="#8b949e" fontSize="10.5" fontFamily="system-ui">device id repeated in 20 files</text>
          <text x="44" y="196" fill="#8b949e" fontSize="10.5" fontFamily="system-ui">change one → grep them all</text>
        </>
      )}

      {/* external files */}
      <g opacity={ext ? 1 : 0.3}>
        <rect x="330" y="50" width="130" height="70" rx="9" fill="#161b22" stroke="#a78bfa" strokeWidth="1.5" />
        <text x="344" y="70" fill="#c9bdf5" fontSize="11" fontWeight="700" fontFamily="Consolas">config.json</text>
        <text x="344" y="90" fill="#8b949e" fontSize="9.5" fontFamily="Consolas">"device": "…"</text>
        <text x="344" y="104" fill="#8b949e" fontSize="9.5" fontFamily="Consolas">"server_url": "…"</text>

        <rect x="330" y="132" width="130" height="76" rx="9" fill="#161b22" stroke="#f0883e" strokeWidth="1.5" />
        <text x="344" y="152" fill="#f8c088" fontSize="11" fontWeight="700" fontFamily="Consolas">.env (git-ignored)</text>
        <text x="344" y="172" fill="#8b949e" fontSize="9.5" fontFamily="Consolas">API_KEY=sk-live-…</text>
        <text x="344" y="192" fill="#8b949e" fontSize="9" fontFamily="system-ui">never committed</text>
      </g>

      {/* the switch benefit */}
      <rect x="478" y="50" width="140" height="158" rx="10" fill={ext ? 'rgba(86,211,100,.08)' : 'rgba(248,81,73,.08)'} stroke={ext ? '#56d364' : '#f85149'} strokeWidth="2" />
      <text x="548" y="74" fill={ext ? '#56d364' : '#f85149'} fontSize="30" textAnchor="middle">{ext ? '✓' : '⚠'}</text>
      <text x="548" y="104" fill="#e6edf3" fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{ext ? 'portable' : 'brittle'}</text>
      <text x="548" y="122" fill="#e6edf3" fontSize="12" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{ext ? '& safe' : '& risky'}</text>
      <text x="548" y="150" fill="#8b949e" fontSize="9.5" textAnchor="middle" fontFamily="system-ui">{ext ? 'repoint in one' : 'edit many files;'}</text>
      <text x="548" y="164" fill="#8b949e" fontSize="9.5" textAnchor="middle" fontFamily="system-ui">{ext ? 'edit; secrets' : 'leaked secret'}</text>
      <text x="548" y="178" fill="#8b949e" fontSize="9.5" textAnchor="middle" fontFamily="system-ui">{ext ? 'stay private' : 'on the internet'}</text>
    </Stage2D>
  );
}
