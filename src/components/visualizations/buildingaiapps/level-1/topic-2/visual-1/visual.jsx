import { useState } from 'react';
import './visual.css';

const ERRORS = [
  { code: 400, name: 'Bad Request', cause: 'Malformed payload — bad params or message format.', fix: 'Validate inputs before sending. Check the error.message for the exact field.' },
  { code: 401, name: 'Unauthorized', cause: 'Missing or invalid API key.', fix: 'Check the key is set in env vars and not expired. Never hardcode it.' },
  { code: 429, name: 'Rate Limited', cause: 'Too many requests or tokens per minute.', fix: 'Exponential backoff + retry. Respect the Retry-After header.' },
  { code: 500, name: 'Server Error', cause: 'Provider-side outage or transient failure.', fix: 'Retry with backoff. Fall back to another model/provider if persistent.' },
  { code: 0, name: 'Timeout', cause: 'Request took too long (large output / slow network).', fix: 'Set a sensible timeout, stream the response, or reduce max_tokens.' },
];

export default function BaiErrorResponsesVisualization() {
  const [sel, setSel] = useState(2);
  const e = ERRORS[sel];

  return (
    <div className="baierr-wrap">
      <h3 className="baierr-title">Handling Errors & Responses</h3>
      <p className="baierr-sub">Every AI call can fail — handle each case deliberately</p>

      <div className="baierr-codes">
        {ERRORS.map((err, i) => (
          <button key={i} className={`baierr-code-btn ${sel === i ? 'baierr-code-active' : ''}`} onClick={() => setSel(i)}>
            {err.code === 0 ? '⏱' : err.code}
          </button>
        ))}
      </div>

      <div className="baierr-detail">
        <div className="baierr-detail-name">{e.code === 0 ? 'Timeout' : `${e.code} — ${e.name}`}</div>
        <div className="baierr-row"><span className="baierr-k">Cause</span><span>{e.cause}</span></div>
        <div className="baierr-row"><span className="baierr-k">Fix</span><span>{e.fix}</span></div>
      </div>

      <pre className="baierr-codeblock">{`async function callWithRetry(fn, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (err.status === 429 || err.status >= 500) {
        await sleep(2 ** i * 1000);   // backoff
        continue;
      }
      throw err;   // 400/401 — don't retry, fix the request
    }
  }
  throw new Error('Max retries exceeded');
}`}</pre>
    </div>
  );
}
