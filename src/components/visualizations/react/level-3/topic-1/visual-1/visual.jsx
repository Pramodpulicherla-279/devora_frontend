import React, { useState } from 'react';
import './visual.css';

const ROUTES = [
  { path: '/', label: 'Home', component: 'HomePage', color: '#61DAFB', content: 'Welcome to the app! This is the home page.' },
  { path: '/about', label: 'About', component: 'AboutPage', color: '#68A063', content: 'About us — our story, mission, and team.' },
  { path: '/users', label: 'Users', component: 'UsersPage', color: '#E5C07B', content: 'A list of all users in the system.' },
  { path: '/users/:id', label: 'User Detail', component: 'UserPage', color: '#C678DD', content: 'Showing details for user ID: {id}', isParam: true },
  { path: '/404', label: '404', component: 'NotFound', color: '#E06C75', content: '404 — Page not found.' },
];

const HOOKS = [
  { hook: 'useNavigate', color: '#61DAFB', desc: 'Programmatically navigate to a route', code: `const navigate = useNavigate();\n\n// Go to a route\nnavigate('/dashboard');\n\n// Go back\nnavigate(-1);\n\n// Replace history entry\nnavigate('/login', { replace: true });` },
  { hook: 'useParams', color: '#68A063', desc: 'Access dynamic URL parameters (:id, :slug)', code: `// Route: /users/:id\n// URL:   /users/42\n\nconst { id } = useParams();\nconsole.log(id); // "42"\n\n// Use to fetch specific data:\nuseEffect(() => fetchUser(id), [id]);` },
  { hook: 'useLocation', color: '#E5C07B', desc: 'Access current URL, pathname, search, state', code: `const location = useLocation();\n\nconsole.log(location.pathname); // "/users"\nconsole.log(location.search);   // "?page=2"\nconsole.log(location.state);    // passed via navigate()` },
  { hook: 'useSearchParams', color: '#C678DD', desc: 'Read & update URL query string parameters', code: `const [searchParams, setSearchParams] = useSearchParams();\n\n// URL: /search?q=react&page=2\nconst q = searchParams.get('q');     // "react"\nconst page = searchParams.get('page'); // "2"\n\n// Update query string:\nsetSearchParams({ q: 'hooks', page: '1' });` },
];

const RctRouterVisualization = () => {
  const [activeRoute, setActiveRoute] = useState('/');
  const [activeHook, setActiveHook] = useState('useNavigate');
  const [userId, setUserId] = useState('42');
  const [tab, setTab] = useState('routes');

  const currentRoute = ROUTES.find(r => r.path === activeRoute) || ROUTES[0];
  const hook = HOOKS.find(h => h.hook === activeHook);

  const renderContent = (route) => {
    if (route.isParam) return route.content.replace('{id}', userId);
    return route.content;
  };

  return (
    <div className="rctrt-wrap">
      <header className="rctrt-head">
        <span className="rctrt-badge">React</span>
        <h2>React Router v6</h2>
        <p>Declarative client-side routing for React applications</p>
      </header>

      <div className="rctrt-tabs">
        {[['routes', '🗺️ Routes'], ['hooks', '🪝 Router Hooks'], ['setup', '⚙️ Setup']].map(([key, label]) => (
          <button key={key} className={`rctrt-tab ${tab === key ? 'rctrt-tab--on' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {/* Routes */}
      {tab === 'routes' && (
        <div className="rctrt-routes">
          <p className="rctrt-desc">Each URL path maps to a React component. Click a route to "navigate" to it.</p>
          <div className="rctrt-grid">
            {/* Nav simulation */}
            <div className="rctrt-panel">
              <h3>Navigation</h3>
              <div className="rctrt-nav-bar">
                {ROUTES.filter(r => !r.isParam).map(r => (
                  <button key={r.path} className={`rctrt-nav-link ${activeRoute === r.path ? 'rctrt-nav-link--active' : ''}`}
                    style={{ '--rc': r.color }} onClick={() => setActiveRoute(r.path)}>
                    {r.label}
                  </button>
                ))}
                <div className="rctrt-param-row">
                  <button className={`rctrt-nav-link ${activeRoute === '/users/:id' ? 'rctrt-nav-link--active' : ''}`}
                    style={{ '--rc': '#C678DD' }} onClick={() => setActiveRoute('/users/:id')}>
                    User/{userId}
                  </button>
                  <input className="rctrt-id-input" type="number" value={userId} onChange={e => setUserId(e.target.value)} min="1" max="99" />
                </div>
              </div>

              <div className="rctrt-url-bar">
                <span className="rctrt-url-label">URL:</span>
                <code>{activeRoute.replace(':id', userId)}</code>
              </div>

              {/* Rendered component */}
              <div className="rctrt-browser-window">
                <div className="rctrt-browser-header" style={{ borderColor: currentRoute.color }}>
                  <code style={{ color: currentRoute.color }}>{'<'}{currentRoute.component}{'/>'}</code>
                </div>
                <div className="rctrt-browser-content">{renderContent(currentRoute)}</div>
              </div>
            </div>

            {/* Route definitions */}
            <div className="rctrt-panel">
              <h3>Route definitions</h3>
              <pre className="rctrt-code"><code>{`import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      {/* Navigation */}
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users">Users</Link>
      </nav>

      {/* Route matching */}
      <Routes>
        <Route path="/"           element={<HomePage />} />
        <Route path="/about"      element={<AboutPage />} />
        <Route path="/users"      element={<UsersPage />} />
        <Route path="/users/:id"  element={<UserPage />} />
        <Route path="*"           element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}`}</code></pre>
              <div className="rctrt-nested">
                <strong>Nested routes</strong>
                <pre className="rctrt-code"><code>{`<Route path="/dashboard" element={<Dashboard />}>
  <Route index         element={<Overview />} />
  <Route path="stats"  element={<Stats />} />
  <Route path="users"  element={<Users />} />
</Route>
{/* Use <Outlet /> inside Dashboard */}`}</code></pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hooks */}
      {tab === 'hooks' && (
        <div className="rctrt-hooks">
          <div className="rctrt-hook-tabs">
            {HOOKS.map(h => (
              <button key={h.hook} className={`rctrt-hook-tab ${activeHook === h.hook ? 'rctrt-hook-tab--on' : ''}`}
                style={{ '--hc': h.color }} onClick={() => setActiveHook(h.hook)}>
                <code>{h.hook}</code>
              </button>
            ))}
          </div>
          <div className="rctrt-hook-detail" style={{ borderColor: hook.color }}>
            <p className="rctrt-hook-desc">{hook.desc}</p>
            <pre className="rctrt-code"><code>{hook.code}</code></pre>
          </div>
        </div>
      )}

      {/* Setup */}
      {tab === 'setup' && (
        <div className="rctrt-setup">
          <pre className="rctrt-code"><code>{`# Install React Router
npm install react-router-dom`}</code></pre>
          <div className="rctrt-setup-grid">
            {[
              { comp: 'BrowserRouter', color: '#61DAFB', desc: 'Wraps the whole app. Provides routing context. Use once at root.' },
              { comp: 'Routes', color: '#68A063', desc: 'Renders only the first matching Route. Replaces old Switch.' },
              { comp: 'Route', color: '#E5C07B', desc: 'Maps a path to a component. Use path="*" for 404 catch-all.' },
              { comp: 'Link', color: '#C678DD', desc: 'Like <a href> but prevents page reload. Use instead of <a>.' },
              { comp: 'NavLink', color: '#E06C75', desc: 'Like Link but adds active class when URL matches. For navbars.' },
              { comp: 'Outlet', color: '#56B6C2', desc: 'Renders nested child routes. Place inside parent route component.' },
            ].map(c => (
              <div key={c.comp} className="rctrt-setup-card" style={{ borderColor: c.color }}>
                <code style={{ color: c.color }}>{'<'}{c.comp}{' />'}</code>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RctRouterVisualization;
