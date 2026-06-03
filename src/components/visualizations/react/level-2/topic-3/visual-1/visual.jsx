import React, { useState, createContext, useContext } from 'react';
import './visual.css';

const PROP_DRILLING_TREE = ['App', 'Page', 'Section', 'Card', 'Avatar'];

const ThemeCtx = createContext('light');
const UserCtx = createContext(null);

const ContextBadge = () => {
  const theme = useContext(ThemeCtx);
  const user = useContext(UserCtx);
  return (
    <div className={`rctux-ctx-badge ${theme === 'dark' ? 'rctux-ctx-badge--dark' : 'rctux-ctx-badge--light'}`}>
      <span>🎨 Theme: <strong>{theme}</strong></span>
      {user && <span>👤 User: <strong>{user.name}</strong></span>}
    </div>
  );
};

const RctUseContextVisualization = () => {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({ name: 'Alice', role: 'Admin' });
  const [tab, setTab] = useState('problem');
  const [drillingStep, setDrillingStep] = useState(0);

  return (
    <div className="rctux-wrap">
      <header className="rctux-head">
        <span className="rctux-badge">React</span>
        <h2>useContext — Share State Without Prop Drilling</h2>
        <p>Beam data directly to any component in the tree — no middlemen</p>
      </header>

      <div className="rctux-tabs">
        {[['problem', '😩 The Problem'], ['solution', '✅ Context Solution'], ['demo', '🎮 Live Demo']].map(([key, label]) => (
          <button key={key} className={`rctux-tab ${tab === key ? 'rctux-tab--on' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {/* Problem */}
      {tab === 'problem' && (
        <div className="rctux-problem">
          <p className="rctux-desc">Prop drilling = passing props through many layers just to reach one deep component. Every middle component becomes a relay — messy and fragile.</p>
          <div className="rctux-drill-steps">
            {PROP_DRILLING_TREE.map((comp, i) => (
              <button key={comp}
                className={`rctux-drill-step ${drillingStep >= i ? 'rctux-drill-step--on' : ''}`}
                onClick={() => setDrillingStep(i)}>
                <span className="rctux-drill-comp">{'<'}{comp}{'/>'}</span>
                {i < PROP_DRILLING_TREE.length - 1 && <span className="rctux-drill-arrow">↓ passes user={'{user}'}</span>}
              </button>
            ))}
          </div>
          <pre className="rctux-code rctux-code--bad"><code>{`// ❌ Prop drilling — user passed through 4 layers
const App = () => <Page user={user} />;
const Page = ({ user }) => <Section user={user} />;
const Section = ({ user }) => <Card user={user} />;
const Card = ({ user }) => <Avatar user={user} />;
// Avatar is the ONLY one that needs user!
// Page, Section, Card don't use it — just relay it.`}</code></pre>
        </div>
      )}

      {/* Solution */}
      {tab === 'solution' && (
        <div className="rctux-solution">
          <div className="rctux-solution-grid">
            <div className="rctux-panel">
              <h3>Step 1: Create a context</h3>
              <pre className="rctux-code"><code>{`// UserContext.js
import { createContext } from 'react';

export const UserContext = createContext(null);
//                                        ↑ default value`}</code></pre>

              <h3 style={{ marginTop: '14px' }}>Step 2: Provide it at the top</h3>
              <pre className="rctux-code"><code>{`// App.js — wrap the tree in Provider
const App = () => {
  const [user, setUser] = useState(currentUser);

  return (
    <UserContext.Provider value={user}>
      <Page />   {/* no user prop needed! */}
    </UserContext.Provider>
  );
};`}</code></pre>
            </div>
            <div className="rctux-panel">
              <h3>Step 3: Consume anywhere in the tree</h3>
              <pre className="rctux-code"><code>{`// Avatar.js — deep inside the tree
import { useContext } from 'react';
import { UserContext } from './UserContext';

const Avatar = () => {
  const user = useContext(UserContext);
  // ✓ No prop drilling needed!

  return (
    <img src={user.photo} alt={user.name} />
  );
};`}</code></pre>
              <div className="rctux-flow">
                <div className="rctux-flow-provider">Provider (App)</div>
                <div className="rctux-flow-line">⚡ Context beam ⚡</div>
                <div className="rctux-flow-consumer">useContext(UserContext) — anywhere in tree</div>
              </div>
              <div className="rctux-when">
                <strong>Use Context for:</strong>
                <ul>
                  <li>Theme (dark/light mode)</li>
                  <li>Logged-in user data</li>
                  <li>Language / locale</li>
                  <li>App-wide notifications</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Demo */}
      {tab === 'demo' && (
        <ThemeCtx.Provider value={theme}>
          <UserCtx.Provider value={user}>
            <div className="rctux-demo">
              <p className="rctux-desc">Change the context values below — all consumers update instantly.</p>
              <div className="rctux-demo-controls">
                <div className="rctux-control-group">
                  <label>Theme</label>
                  <div className="rctux-demo-btns">
                    {['light', 'dark'].map(t => (
                      <button key={t} className={`rctux-demo-btn ${theme === t ? 'rctux-demo-btn--on' : ''}`}
                        onClick={() => setTheme(t)}>{t}</button>
                    ))}
                  </div>
                </div>
                <div className="rctux-control-group">
                  <label>User</label>
                  <div className="rctux-demo-btns">
                    {[{ name: 'Alice', role: 'Admin' }, { name: 'Bob', role: 'Editor' }].map(u => (
                      <button key={u.name} className={`rctux-demo-btn ${user.name === u.name ? 'rctux-demo-btn--on' : ''}`}
                        onClick={() => setUser(u)}>{u.name}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rctux-consumers">
                <h3>Components reading from Context</h3>
                {['Header', 'Sidebar', 'UserProfile', 'Avatar'].map(comp => (
                  <div key={comp} className="rctux-consumer-row">
                    <code className="rctux-consumer-name">{'<'}{comp}{'/>'}</code>
                    <ContextBadge />
                  </div>
                ))}
              </div>

              <pre className="rctux-code"><code>{`// Every consumer sees the same values
const theme = useContext(ThemeCtx);  // "${theme}"
const user  = useContext(UserCtx);   // { name: "${user.name}", role: "${user.role}" }`}</code></pre>
            </div>
          </UserCtx.Provider>
        </ThemeCtx.Provider>
      )}
    </div>
  );
};

export default RctUseContextVisualization;
