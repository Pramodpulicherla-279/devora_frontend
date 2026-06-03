import React, { useState } from 'react';
import './visual.css';

const EVENT_TYPES = [
  { event: 'onClick', color: '#61DAFB', desc: 'Fires when user clicks an element', example: `<button onClick={handleClick}>Click me</button>\n\nconst handleClick = (e) => {\n  console.log('Clicked!', e.target);\n};` },
  { event: 'onChange', color: '#68A063', desc: 'Fires when input value changes', example: `<input onChange={e => setVal(e.target.value)} />\n\n// e.target.value holds the new input string` },
  { event: 'onSubmit', color: '#E5C07B', desc: 'Fires when a form is submitted', example: `<form onSubmit={handleSubmit}>\n  ...\n</form>\n\nconst handleSubmit = (e) => {\n  e.preventDefault(); // stop page reload\n  // process form data\n};` },
  { event: 'onMouseEnter', color: '#C678DD', desc: 'Fires when mouse enters an element', example: `<div onMouseEnter={() => setHovered(true)}\n     onMouseLeave={() => setHovered(false)}>\n  Hover me\n</div>` },
];

const CONDITIONAL_EXAMPLES = {
  ternary: {
    label: 'Ternary ( ? : )',
    color: '#61DAFB',
    code: `// Show different content based on a condition
{isLoggedIn
  ? <Dashboard />
  : <LoginPage />
}`,
  },
  and: {
    label: 'Short-circuit ( && )',
    color: '#68A063',
    code: `// Show ONLY when condition is true
{isLoading && <Spinner />}

{user && <Avatar src={user.photo} />}

{errors.length > 0 && (
  <ErrorBanner errors={errors} />
)}`,
  },
  ifelse: {
    label: 'Early return',
    color: '#E5C07B',
    code: `const Widget = ({ data }) => {
  if (!data) return <p>Loading…</p>;
  if (data.error) return <ErrorMsg />;

  return (
    <div>{data.title}</div>
  );
};`,
  },
};

const ITEMS = ['🍎 Apple', '🍌 Banana', '🍇 Grape', '🍊 Orange'];

const RctEventsConditionalVisualization = () => {
  const [activeEvent, setActiveEvent] = useState('onClick');
  const [condTab, setCondTab] = useState('ternary');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [tab, setTab] = useState('events');
  const [hovered, setHovered] = useState(null);

  const ev = EVENT_TYPES.find(e => e.event === activeEvent);
  const cond = CONDITIONAL_EXAMPLES[condTab];

  const simulateLoad = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1800);
  };

  return (
    <div className="rctec-wrap">
      <header className="rctec-head">
        <span className="rctec-badge">React</span>
        <h2>Events &amp; Conditional Rendering</h2>
        <p>Handle user interactions and show/hide UI based on state</p>
      </header>

      <div className="rctec-tabs">
        {[['events', '🖱️ Event Handlers'], ['conditional', '❓ Conditional Rendering'], ['lists', '📋 List Rendering']].map(([key, label]) => (
          <button key={key} className={`rctec-tab ${tab === key ? 'rctec-tab--on' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {/* Events */}
      {tab === 'events' && (
        <div className="rctec-events">
          <div className="rctec-event-grid">
            <div className="rctec-event-list">
              {EVENT_TYPES.map(ev => (
                <button key={ev.event} className={`rctec-event-btn ${activeEvent === ev.event ? 'rctec-event-btn--on' : ''}`}
                  style={{ '--ec': ev.color }} onClick={() => setActiveEvent(ev.event)}>
                  <code>{ev.event}</code>
                  <span>{ev.desc}</span>
                </button>
              ))}
            </div>
            <div className="rctec-event-detail" style={{ borderColor: ev.color }}>
              <pre className="rctec-code"><code>{ev.example}</code></pre>
            </div>
          </div>

          {/* Live demos */}
          <div className="rctec-live-demos">
            <h3>Live Demos</h3>
            <div className="rctec-demo-row">
              <button className="rctec-demo-btn" onClick={() => setClickCount(c => c + 1)}>
                onClick — clicked {clickCount}×
              </button>
              <input className="rctec-demo-input" placeholder="onChange — type here" value={inputVal}
                onChange={e => setInputVal(e.target.value)} />
              {inputVal && <span className="rctec-demo-value">value: "{inputVal}"</span>}
              <div className={`rctec-demo-hover ${hovered ? 'rctec-demo-hover--on' : ''}`}
                onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                onMouseEnter — hover me
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conditional */}
      {tab === 'conditional' && (
        <div className="rctec-conditional">
          <div className="rctec-cond-tabs">
            {Object.entries(CONDITIONAL_EXAMPLES).map(([key, { label, color }]) => (
              <button key={key} className={`rctec-cond-tab ${condTab === key ? 'rctec-cond-tab--on' : ''}`}
                style={{ '--cc': color }} onClick={() => setCondTab(key)}>{label}</button>
            ))}
          </div>
          <pre className="rctec-code" style={{ borderColor: cond.color }}><code>{cond.code}</code></pre>

          <div className="rctec-cond-playground">
            <h3>Playground</h3>
            <div className="rctec-playground-row">
              <div className="rctec-pg-block">
                <button className="rctec-toggle-btn" onClick={() => setIsLoggedIn(l => !l)}>
                  Toggle login — currently: <strong>{isLoggedIn ? 'Logged In' : 'Logged Out'}</strong>
                </button>
                <div className="rctec-pg-result">
                  {isLoggedIn
                    ? <div className="rctec-pg-yes">✓ <Dashboard /></div>
                    : <div className="rctec-pg-no">⟶ <LoginPage /></div>
                  }
                </div>
              </div>
              <div className="rctec-pg-block">
                <button className="rctec-toggle-btn" onClick={simulateLoad}>
                  Simulate loading {isLoading ? '⏳' : '(click)'}
                </button>
                <div className="rctec-pg-result">
                  {isLoading && <div className="rctec-spinner">⏳ Loading…</div>}
                  {!isLoading && <div className="rctec-pg-yes">✓ Content ready</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* List Rendering */}
      {tab === 'lists' && (
        <div className="rctec-lists">
          <p className="rctec-desc">Use <code>array.map()</code> to render lists. Always provide a unique <code>key</code> prop.</p>
          <div className="rctec-list-grid">
            <div className="rctec-list-left">
              <pre className="rctec-code"><code>{`const items = ['🍎 Apple', '🍌 Banana',
              '🍇 Grape',  '🍊 Orange'];

// ✓ Each item has a unique key
{items.map((item, index) => (
  <li key={index}>{item}</li>
))}

// ✓ Better: use a unique ID as key
{users.map(user => (
  <UserCard key={user.id} user={user} />
))}`}</code></pre>
            </div>
            <div className="rctec-list-right">
              <div className="rctec-list-result">
                <div className="rctec-list-label">Rendered list:</div>
                <ul className="rctec-rendered-list">
                  {ITEMS.map((item, i) => <li key={i} className="rctec-list-item">{item}</li>)}
                </ul>
              </div>
              <div className="rctec-key-rule">
                <strong>⚠️ Why keys matter</strong>
                <p>Keys help React identify which items changed, added, or removed — for efficient re-renders.</p>
                <p>Use unique IDs. Avoid array index when list can be reordered.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Dashboard = () => <span className="rctec-pg-component">{'<Dashboard />'}</span>;
const LoginPage = () => <span className="rctec-pg-component">{'<LoginPage />'}</span>;

export default RctEventsConditionalVisualization;
