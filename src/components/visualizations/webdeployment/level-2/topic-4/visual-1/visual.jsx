import { useState } from 'react';
import './visual.css';

export default function DepSentryVisualization() {
  const [withSentry, setWithSentry] = useState(true);
  const [crashed, setCrashed] = useState(false);

  const triggerError = () => setCrashed(true);
  const reset = () => setCrashed(false);

  return (
    <div className="depsent-wrap">
      <h3 className="depsent-title">Error Monitoring with Sentry</h3>
      <p className="depsent-sub">Catch production errors before users report them</p>

      <div className="depsent-toggle">
        <button className={`depsent-tog ${withSentry ? 'depsent-tog-on' : ''}`} onClick={() => { setWithSentry(true); reset(); }}>With Sentry</button>
        <button className={`depsent-tog ${!withSentry ? 'depsent-tog-on' : ''}`} onClick={() => { setWithSentry(false); reset(); }}>Without Sentry</button>
      </div>

      <button className="depsent-trigger" onClick={triggerError}>💥 Trigger a production error</button>

      <div className="depsent-panels">
        <div className="depsent-panel">
          <div className="depsent-panel-h">👤 What the user sees</div>
          {!crashed ? <div className="depsent-empty">App working normally…</div>
            : withSentry
              ? <div className="depsent-graceful">⚠️ Something went wrong. Our team has been notified.</div>
              : <div className="depsent-whitescreen">⬜ White screen of death (no feedback)</div>}
        </div>

        <div className="depsent-panel">
          <div className="depsent-panel-h">📡 What Sentry captures</div>
          {!crashed ? <div className="depsent-empty">No events</div>
            : withSentry ? (
              <div className="depsent-event">
                <div className="depsent-ev-row"><span>Error</span> TypeError: cannot read 'id'</div>
                <div className="depsent-ev-row"><span>File</span> Checkout.jsx:42</div>
                <div className="depsent-ev-row"><span>User</span> user_8821 · Chrome 124</div>
                <div className="depsent-ev-row"><span>Breadcrumbs</span> /cart → /checkout → click Pay</div>
                <div className="depsent-ev-tag">🔔 Alert sent to #engineering</div>
              </div>
            ) : <div className="depsent-empty depsent-blind">🙈 Nothing — you're flying blind</div>}
        </div>
      </div>

      <pre className="depsent-code">{`import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  tracesSampleRate: 0.1,
  environment: process.env.NODE_ENV,
});`}</pre>
    </div>
  );
}
