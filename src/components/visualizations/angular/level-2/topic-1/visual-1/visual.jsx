/* Lesson: Services & Dependency Injection
 * Visual type: ILLUSTRATION
 * Reason: DI is a wiring concept — a diagram showing a service provided once and
 * injected into multiple components (shared singleton) makes it click. */
import React, { useState } from 'react';
import './visual.css';

const NgDiVisualization = () => {
  const [injected, setInjected] = useState(false);
  return (
    <div className="ngdi-wrap">
      <header className="ngdi-head">
        <span className="ngdi-badge">Angular</span>
        <h2>Services &amp; Dependency Injection</h2>
        <p>Write logic once, inject it anywhere</p>
      </header>
      <div className="ngdi-diagram">
        <div className={`ngdi-service ${injected ? 'ngdi-service--on' : ''}`}>
          <span className="ngdi-svc-icon">⚙️</span>
          <strong>DataService</strong>
          <span className="ngdi-svc-tag">@Injectable (singleton)</span>
        </div>
        <div className="ngdi-arrows">
          <span className={`ngdi-arrow ${injected ? 'ngdi-arrow--on' : ''}`}>↓ inject ↓</span>
        </div>
        <div className="ngdi-consumers">
          {['HeaderComponent', 'ListComponent', 'DetailComponent'].map((c) => (
            <div key={c} className={`ngdi-consumer ${injected ? 'ngdi-consumer--on' : ''}`}>{c}</div>
          ))}
        </div>
      </div>
      <button className="ngdi-btn" onClick={() => setInjected((v) => !v)}>{injected ? 'Reset' : '▶ Inject the service'}</button>
      <pre className="ngdi-code"><code>{`@Injectable({ providedIn: 'root' })
export class DataService {
  getUsers() { return this.http.get('/api/users'); }
}

// Any component — just ask for it in the constructor:
constructor(private data: DataService) {}`}</code></pre>
      <div className="ngdi-note">Angular's injector creates <strong>one shared instance</strong> and hands it to every component that asks. No manual wiring, easy to mock in tests, single source of truth.</div>
    </div>
  );
};
export default NgDiVisualization;
