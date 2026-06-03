import React, { useState } from 'react';
import './visual.css';

const AuthProtectedRoutesVisualization = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState('user');
  const [target, setTarget] = useState('/dashboard');
  const [tab, setTab] = useState('demo');

  const ROUTES = {
    '/': { protected: false, label: 'Home', adminOnly: false },
    '/dashboard': { protected: true, label: 'Dashboard', adminOnly: false },
    '/admin': { protected: true, label: 'Admin Panel', adminOnly: true },
  };

  const route = ROUTES[target];
  let outcome;
  if (!route.protected) outcome = { type: 'allow', text: `✓ Public route — rendering ${route.label}` };
  else if (!isAuth) outcome = { type: 'redirect', text: '→ Not logged in — redirect to /login' };
  else if (route.adminOnly && role !== 'admin') outcome = { type: 'forbid', text: '✗ Logged in but not admin — show 403 / redirect' };
  else outcome = { type: 'allow', text: `✓ Authorized — rendering ${route.label}` };

  return (
    <div className="authpr-wrap">
      <header className="authpr-head">
        <span className="authpr-badge">Auth + React</span>
        <h2>Protecting React Routes</h2>
        <p>Wrap private routes in a guard that checks auth before rendering</p>
      </header>

      <div className="authpr-tabs">
        {[['demo', '🎮 Route Guard Demo'], ['code', '💻 The Code']].map(([key, label]) => (
          <button key={key} className={`authpr-tab ${tab === key ? 'authpr-tab--on' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {tab === 'demo' && (
        <div className="authpr-demo">
          <div className="authpr-state-controls">
            <div className="authpr-ctrl">
              <span className="authpr-ctrl-label">Auth status</span>
              <button className={`authpr-toggle ${isAuth ? 'authpr-toggle--on' : ''}`} onClick={() => setIsAuth(a => !a)}>
                {isAuth ? '🔓 Logged in' : '🔒 Logged out'}
              </button>
            </div>
            <div className="authpr-ctrl">
              <span className="authpr-ctrl-label">Role</span>
              <div className="authpr-role-btns">
                {['user', 'admin'].map(rr => (
                  <button key={rr} className={`authpr-role ${role === rr ? 'authpr-role--on' : ''}`} onClick={() => setRole(rr)} disabled={!isAuth}>{rr}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="authpr-nav">
            <span className="authpr-nav-label">Navigate to:</span>
            {Object.entries(ROUTES).map(([path, r]) => (
              <button key={path} className={`authpr-nav-link ${target === path ? 'authpr-nav-link--on' : ''}`} onClick={() => setTarget(path)}>
                {path} {r.protected && <span className="authpr-lock">🔒</span>} {r.adminOnly && <span className="authpr-star">★</span>}
              </button>
            ))}
          </div>

          <div className={`authpr-screen authpr-screen--${outcome.type}`}>
            <div className="authpr-url">URL: <code>{target}</code></div>
            <div className="authpr-outcome">{outcome.text}</div>
          </div>

          <div className="authpr-legend">
            <span>🔒 = protected route</span>
            <span>★ = admin only</span>
          </div>
        </div>
      )}

      {tab === 'code' && (
        <div className="authpr-code-tab">
          <pre className="authpr-code"><code>{`// ProtectedRoute.jsx — a route guard component
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;

  // Not logged in → bounce to login
  if (!user) return <Navigate to="/login" replace />;

  // Logged in but wrong role
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/403" replace />;
  }

  return children;   // ✓ authorized
}`}</code></pre>
          <pre className="authpr-code"><code>{`// App.jsx — wrap private routes
<Routes>
  <Route path="/" element={<Home />} />

  <Route path="/dashboard" element={
    <ProtectedRoute><Dashboard /></ProtectedRoute>
  } />

  <Route path="/admin" element={
    <ProtectedRoute adminOnly><AdminPanel /></ProtectedRoute>
  } />
</Routes>`}</code></pre>
          <div className="authpr-warn">⚠️ Client-side guards are UX only — they hide UI. The <strong>real</strong> protection must be on the API (auth middleware). Never trust the frontend alone.</div>
        </div>
      )}
    </div>
  );
};

export default AuthProtectedRoutesVisualization;
