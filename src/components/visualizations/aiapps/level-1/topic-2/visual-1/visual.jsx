/* Lesson: Claude API & Streaming
 * Visual type: ANIMATION
 * Reason: Streaming is intrinsically temporal — tokens arriving one chunk at a
 * time. Animating the response materializing vs waiting for the whole thing shows
 * exactly why streaming feels faster. */
import React, { useState, useEffect, useRef } from 'react';
import './visual.css';

const FULL = "Streaming sends the response token-by-token, so users see text appear instantly instead of waiting.";
const WORDS = FULL.split(' ');

const AiAppStreamingVisualization = () => {
  const [mode, setMode] = useState(null); // 'stream' | 'block'
  const [shown, setShown] = useState(0);
  const [blockDone, setBlockDone] = useState(false);
  const ref = useRef(null);

  const run = (m) => {
    setMode(m); setShown(0); setBlockDone(false);
    clearInterval(ref.current); clearTimeout(ref.current);
    if (m === 'stream') {
      let i = 0; ref.current = setInterval(() => { i++; setShown(i); if (i >= WORDS.length) clearInterval(ref.current); }, 130);
    } else {
      ref.current = setTimeout(() => { setShown(WORDS.length); setBlockDone(true); }, WORDS.length * 130);
    }
  };
  useEffect(() => () => { clearInterval(ref.current); clearTimeout(ref.current); }, []);

  return (
    <div className="aistream-wrap">
      <header className="aistream-head">
        <span className="aistream-badge">AI Apps</span>
        <h2>Claude API &amp; Streaming</h2>
        <p>Why streamed responses feel instant</p>
      </header>
      <div className="aistream-screen">
        <div className="aistream-output">
          {mode === 'block' && !blockDone ? <span className="aistream-spinner">⏳ waiting for full response…</span>
            : (mode ? WORDS.slice(0, shown).join(' ') : <span className="aistream-placeholder">Response appears here…</span>)}
          {mode === 'stream' && shown < WORDS.length && <span className="aistream-cursor">▮</span>}
        </div>
      </div>
      <div className="aistream-controls">
        <button className="aistream-btn aistream-btn--stream" onClick={() => run('stream')}>▶ Streamed (token-by-token)</button>
        <button className="aistream-btn" onClick={() => run('block')}>▶ Blocking (wait for all)</button>
      </div>
      <pre className="aistream-code"><code>{`# Anthropic streaming
with client.messages.stream(
    model="claude-...", max_tokens=1024,
    messages=[{"role":"user","content":"Hi"}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)`}</code></pre>
      <div className="aistream-note">Same total time — but streaming shows the first token in ~100ms instead of after the whole generation. Massively better UX for chat.</div>
    </div>
  );
};
export default AiAppStreamingVisualization;
