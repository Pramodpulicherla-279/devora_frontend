import { useState, useMemo } from 'react';
import './visual.css';

const VARS = [
  { key: 'PORT', required: true },
  { key: 'DATABASE_URL', required: true },
  { key: 'JWT_SECRET', required: true },
  { key: 'NODE_ENV', required: true },
  { key: 'STRIPE_KEY', required: true },
  { key: 'REDIS_URL', required: false },
  { key: 'SENTRY_DSN', required: false },
  { key: 'LOG_LEVEL', required: false },
];

export default function EnvStartupValidationVisualization() {
  const [present, setPresent] = useState(Object.fromEntries(VARS.map(v => [v.key, true])));

  const missingRequired = useMemo(
    () => VARS.filter(v => v.required && !present[v.key]),
    [present]
  );
  const boots = missingRequired.length === 0;

  const toggle = (k) => setPresent(p => ({ ...p, [k]: !p[k] }));

  return (
    <div className="envstart-wrap">
      <h3 className="envstart-title">Startup Validation</h3>
      <p className="envstart-sub">Validate env vars on boot — fail fast instead of crashing later</p>

      <div className="envstart-vars">
        {VARS.map(v => (
          <button key={v.key} className={`envstart-var ${present[v.key] ? 'envstart-var-ok' : 'envstart-var-missing'}`}
            onClick={() => toggle(v.key)}>
            <span className="envstart-var-status">{present[v.key] ? '✓' : '✗'}</span>
            <span className="envstart-var-key">{v.key}</span>
            {v.required && <span className="envstart-var-req">required</span>}
          </button>
        ))}
      </div>

      <div className={`envstart-console ${boots ? 'envstart-console-ok' : 'envstart-console-fail'}`}>
        {boots ? (
          <>
            <div className="envstart-line envstart-line-ok">✓ All required env vars present</div>
            <div className="envstart-line">🚀 Server listening on port {present.PORT ? '3000' : '—'}</div>
          </>
        ) : (
          <>
            {missingRequired.map(v => (
              <div key={v.key} className="envstart-line envstart-line-err">✗ Missing required env var: {v.key}</div>
            ))}
            <div className="envstart-line envstart-line-exit">process.exit(1) — refusing to start</div>
          </>
        )}
      </div>

      <pre className="envstart-code">{`import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().default('3000'),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  STRIPE_KEY: z.string(),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error('Invalid env:', parsed.error.format());
  process.exit(1);   // fail fast on boot
}
export const env = parsed.data;`}</pre>
    </div>
  );
}
