import { useState } from 'react';
import './visual.css';

const SEGMENTS = [
  { part: 'request(app)', desc: 'Wrap your Express app — no real server/port needed.' },
  { part: ".post('/api/users')", desc: 'Choose the HTTP method and route.' },
  { part: ".send({ name: 'Ada' })", desc: 'Attach the request body (JSON).' },
  { part: '.expect(201)', desc: 'Assert the status code.' },
  { part: '.expect(res => ...)', desc: 'Assert on the response body.' },
];

export default function TstSupertestVisualization() {
  const [sel, setSel] = useState(0);
  const [ran, setRan] = useState(false);

  return (
    <div className="tstsup-wrap">
      <h3 className="tstsup-title">Supertest — HTTP Endpoint Testing</h3>
      <p className="tstsup-sub">Fire real HTTP requests at your app, in-process</p>

      <div className="tstsup-builder">
        {SEGMENTS.map((s, i) => (
          <button key={i} className={`tstsup-seg ${sel === i ? 'tstsup-seg-active' : ''}`} onClick={() => setSel(i)}>{s.part}</button>
        ))}
      </div>

      <div className="tstsup-detail">{SEGMENTS[sel].desc}</div>

      <pre className="tstsup-code">{`test('creates a user', async () => {
  const res = await request(app)
    .post('/api/users')
    .send({ name: 'Ada' })
    .expect(201);
  expect(res.body.name).toBe('Ada');
});`}</pre>

      <button className="tstsup-run" onClick={() => setRan(true)}>▶ Run test</button>
      {ran && (
        <div className="tstsup-result">
          <div className="tstsup-line">POST /api/users → 201 Created</div>
          <div className="tstsup-line tstsup-pass">✓ creates a user (24ms)</div>
        </div>
      )}
    </div>
  );
}
