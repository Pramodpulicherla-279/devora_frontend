import { useState } from 'react';
import './visual.css';

const TEXT = 'Streaming sends tokens as they are generated.';

export default function BaiStreamingVisualization() {
  const [mode, setMode] = useState('stream');
  const [streamed, setStreamed] = useState('');
  const [buffering, setBuffering] = useState(false);
  const [bufferDone, setBufferDone] = useState(false);

  const run = () => {
    setStreamed(''); setBufferDone(false);
    if (mode === 'stream') {
      const words = TEXT.split(' ');
      let i = 0;
      const tick = () => {
        if (i < words.length) {
          setStreamed(s => (s ? s + ' ' : '') + words[i]);
          i++;
          setTimeout(tick, 180);
        }
      };
      tick();
    } else {
      setBuffering(true);
      setTimeout(() => { setBuffering(false); setBufferDone(true); }, 2200);
    }
  };

  return (
    <div className="baistm-wrap">
      <h3 className="baistm-title">Streaming Responses</h3>
      <p className="baistm-sub">Show tokens as they arrive — perceived latency drops dramatically</p>

      <div className="baistm-toggle">
        <button className={`baistm-tog ${mode === 'buffer' ? 'baistm-tog-active' : ''}`} onClick={() => { setMode('buffer'); setStreamed(''); setBufferDone(false); }}>Buffered</button>
        <button className={`baistm-tog ${mode === 'stream' ? 'baistm-tog-active' : ''}`} onClick={() => { setMode('stream'); setStreamed(''); setBufferDone(false); }}>Streaming</button>
      </div>

      <button className="baistm-run" onClick={run}>▶ Simulate request</button>

      <div className="baistm-screen">
        {mode === 'buffer' ? (
          buffering ? <span className="baistm-wait">⏳ waiting ~2s for full response…</span>
            : bufferDone ? <span className="baistm-text">{TEXT}</span>
            : <span className="baistm-idle">Response appears all at once</span>
        ) : (
          <span className="baistm-text">{streamed}<span className="baistm-cursor">▋</span></span>
        )}
      </div>

      <pre className="baistm-code">{`data: {"type":"content_block_delta",
       "delta":{"type":"text_delta","text":"Hello"}}

// Node.js
const stream = await client.messages.stream({...});
for await (const chunk of stream) {
  process.stdout.write(chunk.delta?.text ?? '');
}`}</pre>
    </div>
  );
}
