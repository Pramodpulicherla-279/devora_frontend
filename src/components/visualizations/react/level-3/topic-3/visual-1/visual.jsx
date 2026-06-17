import { useState } from 'react';
import './visual.css';

const TABS = ['Nested Routes', 'Protected Routes', 'Lazy Loading'];

const NESTED_ROUTES = `// App.jsx — Nested layout routes
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <>
      <Header />
      <Sidebar />
      <main>
        <Outlet />  {/* child routes render here */}
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}`;

const PROTECTED = `// PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

function PrivateRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

// Usage in App.jsx
<Route element={<PrivateRoute />}>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/settings" element={<Settings />} />
</Route>`;

const LAZY = `// Lazy load heavy routes
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Analytics = lazy(() => import('./pages/Analytics'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Suspense>
  );
}
// Each route = separate JS chunk (code splitting)`;

const CODES = [NESTED_ROUTES, PROTECTED, LAZY];

const TREE_NODES = {
  0: [
    { label: 'AppLayout (renders Header + Sidebar + Outlet)', depth: 0, active: true },
    { label: '/ → <Home />', depth: 1, active: false },
    { label: '/dashboard → <Dashboard />', depth: 1, active: false },
    { label: '/settings → <Settings />', depth: 1, active: false },
  ],
  1: [
    { label: 'Router check: isAuthenticated?', depth: 0, active: true },
    { label: '✅ Yes → render child route', depth: 1, active: false },
    { label: '❌ No → <Navigate to="/login" />', depth: 1, active: false },
  ],
  2: [
    { label: 'Initial bundle (small, loads fast)', depth: 0, active: false },
    { label: 'Dashboard.chunk.js — loads on demand', depth: 1, active: true },
    { label: 'Analytics.chunk.js — loads on demand', depth: 1, active: true },
    { label: '<Suspense> shows fallback while loading', depth: 0, active: false },
  ],
};

export default function RctNestedRoutesVisualization() {
  const [tab, setTab] = useState(0);

  return (
    <div className="rctnest-wrap">
      <h3 className="rctnest-title">Nested Routes, Protected Routes & Lazy Loading</h3>
      <div className="rctnest-tabs">
        {TABS.map((t, i) => (
          <button key={t} className={`rctnest-tab ${tab === i ? 'rctnest-tab-active' : ''}`}
            onClick={() => setTab(i)}>{t}</button>
        ))}
      </div>

      <div className="rctnest-body">
        <div className="rctnest-tree">
          {TREE_NODES[tab].map((n, i) => (
            <div key={i} className={`rctnest-node ${n.active ? 'rctnest-node-active' : ''}`}
              style={{ marginLeft: n.depth * 20 + 'px' }}>
              {n.active ? '▶ ' : '· '}{n.label}
            </div>
          ))}
        </div>
        <pre className="rctnest-code">{CODES[tab]}</pre>
      </div>
    </div>
  );
}
