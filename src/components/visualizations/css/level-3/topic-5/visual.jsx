import { useState } from 'react';
import './visual.css';

const PRESETS = [
  { name: 'Bounce', keyframes: `@keyframes bounce {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-40px); }\n}`, anim: 'bounce 1s ease infinite' },
  { name: 'Pulse', keyframes: `@keyframes pulse {\n  0%, 100% { opacity: 1; transform: scale(1); }\n  50% { opacity: 0.5; transform: scale(0.85); }\n}`, anim: 'pulse 1.2s ease-in-out infinite' },
  { name: 'Spin', keyframes: `@keyframes spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}`, anim: 'spin 1s linear infinite' },
  { name: 'Shake', keyframes: `@keyframes shake {\n  0%, 100% { transform: translateX(0); }\n  25% { transform: translateX(-8px); }\n  75% { transform: translateX(8px); }\n}`, anim: 'shake 0.5s ease infinite' },
  { name: 'Fade In', keyframes: `@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(12px); }\n  to { opacity: 1; transform: translateY(0); }\n}`, anim: 'fadeIn 0.8s ease forwards' },
];

export default function CssKeyframesVisualization() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const preset = PRESETS[active];

  return (
    <div className="csskf-wrap">
      <style>{`
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-40px); } }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.85); } }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-8px); } 75% { transform: translateX(8px); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <h3 className="csskf-title">CSS Keyframe Animations</h3>
      <p className="csskf-sub">Select a preset to see the @keyframes code and live preview</p>

      <div className="csskf-tabs">
        {PRESETS.map((p, i) => (
          <button key={p.name} className={`csskf-tab ${active === i ? 'csskf-tab-active' : ''}`}
            onClick={() => { setActive(i); setPlaying(true); }}>{p.name}</button>
        ))}
      </div>

      <div className="csskf-stage">
        <div
          className="csskf-box"
          style={{ animation: playing ? preset.anim : 'none' }}
        />
        <button className="csskf-play-btn" onClick={() => setPlaying(p => !p)}>
          {playing ? '⏸ Pause' : '▶ Play'}
        </button>
      </div>

      <pre className="csskf-code">{preset.keyframes + '\n\n.element {\n  animation: ' + preset.anim + ';\n}'}</pre>

      <div className="csskf-props">
        {[['animation-name', preset.anim.split(' ')[0]], ['animation-duration', preset.anim.split(' ')[1]], ['animation-timing-function', preset.anim.split(' ')[2]], ['animation-iteration-count', preset.anim.includes('infinite') ? 'infinite' : '1']].map(([k, v]) => (
          <div key={k} className="csskf-prop"><span className="csskf-prop-k">{k}:</span> <span className="csskf-prop-v">{v}</span></div>
        ))}
      </div>
    </div>
  );
}
