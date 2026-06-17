import { useState } from 'react';
import './visual.css';

const HEADERS = [
  { name: 'Content-Security-Policy', protects: 'Restricts what scripts/styles can load — blocks most XSS', helmet: true },
  { name: 'X-Frame-Options', protects: 'Stops your site being embedded in an iframe (clickjacking)', helmet: true },
  { name: 'X-Content-Type-Options', protects: 'Stops browsers MIME-sniffing responses', helmet: true },
  { name: 'Strict-Transport-Security', protects: 'Forces HTTPS for future visits', helmet: true },
  { name: 'X-DNS-Prefetch-Control', protects: 'Controls DNS prefetching leaks', helmet: true },
  { name: 'X-Powered-By', protects: 'Removed — hides that you run Express', helmet: 'removed' },
];

export default function EnvHelmetVisualization() {
  const [on, setOn] = useState(true);
  const [sel, setSel] = useState(0);

  return (
    <div className="envhelm-wrap">
      <h3 className="envhelm-title">Helmet & Security Headers</h3>
      <p className="envhelm-sub">One line of middleware sets a dozen protective HTTP headers</p>

      <div className="envhelm-toggle-row">
        <span className="envhelm-toggle-label">app.use(helmet())</span>
        <button className={`envhelm-toggle ${on ? 'envhelm-toggle-on' : ''}`} onClick={() => setOn(o => !o)}>
          {on ? 'ENABLED' : 'DISABLED'}
        </button>
      </div>

      <div className="envhelm-headers">
        {HEADERS.map((h, i) => (
          <button key={i} className={`envhelm-header ${sel === i ? 'envhelm-header-sel' : ''} ${on ? 'envhelm-header-on' : 'envhelm-header-off'}`}
            onClick={() => setSel(i)}>
            <span className="envhelm-header-name">{h.name}</span>
            <span className="envhelm-header-status">{on ? (h.helmet === 'removed' ? '✓ removed' : '✓ set') : '✗ missing'}</span>
          </button>
        ))}
      </div>

      <div className="envhelm-detail">
        <div className="envhelm-detail-name">{HEADERS[sel].name}</div>
        <div className="envhelm-detail-desc">🛡️ {HEADERS[sel].protects}</div>
        {!on && <div className="envhelm-warn">Without Helmet, this header is absent — the app is exposed.</div>}
      </div>

      <pre className="envhelm-code">{`import helmet from 'helmet';

app.use(helmet());  // sets all the headers above
// fine-tune one:
app.use(helmet.contentSecurityPolicy({
  directives: { defaultSrc: ["'self'"] },
}));`}</pre>
    </div>
  );
}
