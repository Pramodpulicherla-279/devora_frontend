import { useState } from 'react';
import './visual.css';

export default function TstMockingVisualization() {
  const [mocked, setMocked] = useState(true);

  return (
    <div className="tstmock-wrap">
      <h3 className="tstmock-title">Mocking External Services</h3>
      <p className="tstmock-sub">Replace slow, flaky dependencies with controlled fakes</p>

      <div className="tstmock-toggle">
        <button className={`tstmock-tog ${!mocked ? 'tstmock-tog-real' : ''}`} onClick={() => setMocked(false)}>Real service</button>
        <button className={`tstmock-tog ${mocked ? 'tstmock-tog-mock' : ''}`} onClick={() => setMocked(true)}>Mocked</button>
      </div>

      <div className="tstmock-compare">
        <div className={`tstmock-col ${!mocked ? 'tstmock-col-on' : ''}`}>
          <div className="tstmock-col-h">🌐 Real call</div>
          <div className="tstmock-attr">⏱ slow (network)</div>
          <div className="tstmock-attr">🎲 can fail randomly</div>
          <div className="tstmock-attr">💸 costs money</div>
          <div className="tstmock-attr">🔌 needs the service up</div>
        </div>
        <div className={`tstmock-col ${mocked ? 'tstmock-col-on' : ''}`}>
          <div className="tstmock-col-h">🎭 Mock</div>
          <div className="tstmock-attr">⚡ instant</div>
          <div className="tstmock-attr">🎯 deterministic</div>
          <div className="tstmock-attr">🆓 free</div>
          <div className="tstmock-attr">🔒 fully controlled</div>
        </div>
      </div>

      <div className="tstmock-speed">
        Test suite time: <strong style={{ color: mocked ? '#56d364' : '#f0883e' }}>{mocked ? '0.4s' : '38s'}</strong>
      </div>

      <pre className="tstmock-code">{mocked
        ? `jest.mock('../services/email');
sendEmail.mockResolvedValue({ id: 'fake-123' });

// now the test never hits the real email API`
        : `// hits the real provider — slow & flaky
await sendEmail(user.email);`}</pre>
    </div>
  );
}
