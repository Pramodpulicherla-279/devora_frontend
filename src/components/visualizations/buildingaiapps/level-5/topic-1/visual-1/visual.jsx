import { useState } from 'react';
import './visual.css';

const REQUESTS = [
  { label: 'Simple FAQ', task: 'simple', ctx: 'short', route: 'fast', model: 'Haiku — cheap & fast' },
  { label: 'Complex reasoning', task: 'hard', ctx: 'short', route: 'powerful', model: 'Opus 4.8 — best reasoning' },
  { label: 'Sensitive data', task: 'simple', ctx: 'short', route: 'local', model: 'Local model — privacy' },
  { label: 'Huge document', task: 'hard', ctx: 'long', route: 'powerful', model: 'Opus 4.8 — large context' },
];

export default function BaiRoutingVisualization() {
  const [sel, setSel] = useState(0);
  const [failPrimary, setFailPrimary] = useState(false);
  const r = REQUESTS[sel];

  const routeColor = { fast: '#56d364', powerful: '#a78bfa', local: '#58a6ff' }[r.route];

  return (
    <div className="bairou-wrap">
      <h3 className="bairou-title">Model Routing & Fallbacks</h3>
      <p className="bairou-sub">Send each request to the cheapest model that can handle it</p>

      <div className="bairou-requests">
        {REQUESTS.map((req, i) => (
          <button key={i} className={`bairou-req ${sel === i ? 'bairou-req-active' : ''}`} onClick={() => setSel(i)}>{req.label}</button>
        ))}
      </div>

      <div className="bairou-router">
        <div className="bairou-in">Request<div className="bairou-in-meta">task: {r.task} · context: {r.ctx}</div></div>
        <div className="bairou-arrow">→</div>
        <div className="bairou-logic">⚙️ Router<div className="bairou-logic-rules">task type · context length · cost · latency</div></div>
        <div className="bairou-arrow">→</div>
        <div className="bairou-out" style={{ borderColor: routeColor, color: routeColor }}>{r.model}</div>
      </div>

      <div className="bairou-fallback">
        <div className="bairou-fb-head">
          <span>Fallback chain</span>
          <button className="bairou-fb-btn" onClick={() => setFailPrimary(f => !f)}>{failPrimary ? 'Primary OK' : 'Simulate failure'}</button>
        </div>
        <div className="bairou-chain">
          <span className={`bairou-fb ${failPrimary ? 'bairou-fb-fail' : 'bairou-fb-ok'}`}>Primary{failPrimary ? ' ✗' : ' ✓'}</span>
          <span className="bairou-arrow">→</span>
          <span className={`bairou-fb ${failPrimary ? 'bairou-fb-ok' : 'bairou-fb-idle'}`}>Secondary{failPrimary ? ' ✓' : ''}</span>
          <span className="bairou-arrow">→</span>
          <span className="bairou-fb bairou-fb-idle">Tertiary</span>
        </div>
        {failPrimary && <div className="bairou-fb-note">Primary failed → automatically retried on the secondary provider. Users never see the error.</div>}
      </div>

      <pre className="bairou-code">{`function route(req) {
  if (req.sensitive) return localModel;
  if (req.complex || req.tokens > 50000) return opus;
  return haiku;   // default: cheap & fast
}`}</pre>
    </div>
  );
}
