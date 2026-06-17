import { useState, useMemo } from 'react';
import './visual.css';

const WINDOWS = [
  { label: '4K', tokens: 4000 },
  { label: '16K', tokens: 16000 },
  { label: '100K', tokens: 100000 },
  { label: '200K', tokens: 200000 },
];

const MESSAGES = [
  { role: 'system', text: 'You are a helpful assistant.', tokens: 8 },
  { role: 'user', text: 'Summarise this 20-page report…', tokens: 9200 },
  { role: 'assistant', text: 'Here is the summary: …', tokens: 480 },
  { role: 'user', text: 'Now translate it to French.', tokens: 9 },
  { role: 'assistant', text: 'Voici la traduction: …', tokens: 9100 },
  { role: 'user', text: 'And add a bullet list.', tokens: 8 },
];

export default function LlmContextWindowsVisualization() {
  const [winIdx, setWinIdx] = useState(1);
  const [msgCount, setMsgCount] = useState(4);
  const win = WINDOWS[winIdx];

  const { used, truncated, visibleMsgs } = useMemo(() => {
    const active = MESSAGES.slice(0, msgCount);
    let total = 0;
    const vis = [];
    let trunc = 0;
    // fill from the most recent backwards (sliding window keeps recent context)
    for (let i = active.length - 1; i >= 0; i--) {
      if (total + active[i].tokens <= win.tokens) {
        total += active[i].tokens;
        vis.unshift({ ...active[i], dropped: false });
      } else {
        vis.unshift({ ...active[i], dropped: true });
        trunc += active[i].tokens;
      }
    }
    return { used: total, truncated: trunc, visibleMsgs: vis };
  }, [winIdx, msgCount, win.tokens]);

  const pct = Math.min(100, Math.round((used / win.tokens) * 100));
  const words = Math.round(used * 0.75);

  return (
    <div className="llmctx-wrap">
      <h3 className="llmctx-title">Context Windows & Tokens</h3>
      <p className="llmctx-sub">The context window is everything the model can "see" at once</p>

      <div className="llmctx-controls">
        <div className="llmctx-ctrl">
          <span className="llmctx-ctrl-label">Context window size</span>
          <div className="llmctx-chips">
            {WINDOWS.map((w, i) => (
              <button key={w.label} className={`llmctx-chip ${winIdx === i ? 'llmctx-chip-active' : ''}`}
                onClick={() => setWinIdx(i)}>{w.label}</button>
            ))}
          </div>
        </div>
        <div className="llmctx-ctrl">
          <span className="llmctx-ctrl-label">Conversation length: {msgCount} messages</span>
          <input className="llmctx-slider" type="range" min="1" max={MESSAGES.length}
            value={msgCount} onChange={e => setMsgCount(+e.target.value)} />
        </div>
      </div>

      <div className="llmctx-gauge">
        <div className="llmctx-gauge-head">
          <span>{used.toLocaleString()} / {win.tokens.toLocaleString()} tokens</span>
          <span className={pct >= 100 ? 'llmctx-gauge-full' : ''}>{pct}% full</span>
        </div>
        <div className="llmctx-gauge-track">
          <div className="llmctx-gauge-fill" style={{
            width: pct + '%',
            background: pct >= 100 ? '#f85149' : pct > 80 ? '#f0883e' : '#56d364'
          }} />
        </div>
        <div className="llmctx-gauge-note">≈ {words.toLocaleString()} words ({'~'}0.75 words/token)</div>
      </div>

      <div className="llmctx-tape">
        {visibleMsgs.map((m, i) => (
          <div key={i} className={`llmctx-msg llmctx-msg-${m.role} ${m.dropped ? 'llmctx-msg-dropped' : ''}`}>
            <div className="llmctx-msg-head">
              <span className="llmctx-msg-role">{m.role}</span>
              <span className="llmctx-msg-tokens">{m.tokens.toLocaleString()} tok</span>
            </div>
            <div className="llmctx-msg-text">{m.text}</div>
            {m.dropped && <div className="llmctx-msg-drop-tag">✂️ truncated — outside window</div>}
          </div>
        ))}
      </div>

      {truncated > 0 && (
        <div className="llmctx-warn">
          ⚠️ {truncated.toLocaleString()} tokens fell outside the {win.label} window. The model can no longer see the oldest messages — it has "forgotten" them.
        </div>
      )}
    </div>
  );
}
