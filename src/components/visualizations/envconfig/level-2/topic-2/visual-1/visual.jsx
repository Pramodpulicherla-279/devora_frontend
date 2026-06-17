import { useState } from 'react';
import './visual.css';

const MAX = 5;

export default function EnvRateLimitingVisualization() {
  const [tokens, setTokens] = useState(MAX);
  const [log, setLog] = useState([]);

  const sendRequest = () => {
    if (tokens > 0) {
      setTokens(t => t - 1);
      setLog(l => [{ ok: true, msg: '200 OK', id: Date.now() }, ...l].slice(0, 6));
    } else {
      setLog(l => [{ ok: false, msg: '429 Too Many Requests', id: Date.now() }, ...l].slice(0, 6));
    }
  };

  const refill = () => { setTokens(MAX); setLog(l => [{ ok: true, msg: '🔄 bucket refilled', id: Date.now() }, ...l].slice(0, 6)); };

  return (
    <div className="envrate-wrap">
      <h3 className="envrate-title">Rate Limiting — Token Bucket</h3>
      <p className="envrate-sub">Each request consumes a token. Empty bucket → 429.</p>

      <div className="envrate-bucket-area">
        <div className="envrate-bucket">
          {Array.from({ length: MAX }).map((_, i) => (
            <div key={i} className={`envrate-token ${i < tokens ? 'envrate-token-full' : 'envrate-token-empty'}`} />
          ))}
        </div>
        <div className="envrate-count">{tokens} / {MAX} tokens</div>
      </div>

      <div className="envrate-buttons">
        <button className="envrate-btn envrate-send" onClick={sendRequest}>📤 Send request</button>
        <button className="envrate-btn envrate-refill" onClick={refill}>🔄 Refill</button>
      </div>

      <div className="envrate-log">
        {log.length === 0 && <div className="envrate-log-empty">Send a request to see the response…</div>}
        {log.map(e => (
          <div key={e.id} className={`envrate-log-row ${e.ok ? 'envrate-log-ok' : 'envrate-log-err'}`}>{e.msg}</div>
        ))}
      </div>

      <pre className="envrate-code">{`import rateLimit from 'express-rate-limit';

app.use(rateLimit({
  windowMs: 60 * 1000,  // 1 minute
  max: 5,               // 5 requests per window per IP
  message: 'Too many requests, slow down.',
}));`}</pre>
    </div>
  );
}
