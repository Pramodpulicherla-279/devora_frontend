import { useState } from 'react';
import './visual.css';

const STEPS = [
  { label: 'Create test user', code: "const user = await User.create({ email, password: hash });" },
  { label: 'Login → get JWT', code: "const { body } = await request(app)\n  .post('/login').send({ email, password });\nconst token = body.token;" },
  { label: 'Use token in header', code: ".set('Authorization', `Bearer ${token}`)" },
  { label: 'Test protected route', code: "await request(app).get('/me')\n  .set('Authorization', `Bearer ${token}`)\n  .expect(200);" },
  { label: 'Test invalid token', code: "await request(app).get('/me')\n  .set('Authorization', 'Bearer bad')\n  .expect(401);" },
];

export default function TstAuthTestingVisualization() {
  const [sel, setSel] = useState(0);

  return (
    <div className="tstauth-wrap">
      <h3 className="tstauth-title">Testing Authenticated Routes</h3>
      <p className="tstauth-sub">Get a real token, then exercise protected endpoints</p>

      <div className="tstauth-flow">
        {STEPS.map((s, i) => (
          <div key={i} className="tstauth-step-wrap">
            <button className={`tstauth-step ${sel === i ? 'tstauth-step-active' : ''}`} onClick={() => setSel(i)}>
              <span className="tstauth-step-num">{i + 1}</span>{s.label}
            </button>
            {i < STEPS.length - 1 && <span className="tstauth-arrow">↓</span>}
          </div>
        ))}
      </div>

      <pre className="tstauth-code">{STEPS[sel].code}</pre>

      <pre className="tstauth-setup">{`// Run setup once for the whole suite
beforeAll(async () => {
  await connectTestDb();
  token = await loginTestUser();
});`}</pre>
    </div>
  );
}
