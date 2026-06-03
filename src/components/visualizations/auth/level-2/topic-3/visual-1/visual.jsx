import React, { useState } from 'react';
import './visual.css';

const ROLES = {
  guest: { label: 'Guest', color: '#7d8590', perms: ['read:public'] },
  user: { label: 'User', color: '#61AFEF', perms: ['read:public', 'read:own', 'write:own'] },
  editor: { label: 'Editor', color: '#00ED64', perms: ['read:public', 'read:own', 'write:own', 'write:any', 'publish'] },
  admin: { label: 'Admin', color: '#FBBF24', perms: ['read:public', 'read:own', 'write:own', 'write:any', 'publish', 'delete:any', 'manage:users'] },
};

const ACTIONS = [
  { id: 'read:public', label: 'View public posts', icon: '👁️' },
  { id: 'write:own', label: 'Edit own posts', icon: '✏️' },
  { id: 'write:any', label: 'Edit any post', icon: '📝' },
  { id: 'publish', label: 'Publish content', icon: '🚀' },
  { id: 'delete:any', label: 'Delete any post', icon: '🗑️' },
  { id: 'manage:users', label: 'Manage users', icon: '👥' },
];

const AuthRbacVisualization = () => {
  const [role, setRole] = useState('user');
  const r = ROLES[role];

  return (
    <div className="authrbac-wrap">
      <header className="authrbac-head">
        <span className="authrbac-badge">Auth</span>
        <h2>Role-Based Access Control</h2>
        <p>Assign roles to users, grant permissions to roles — check before every action</p>
      </header>

      <div className="authrbac-role-picker">
        <span className="authrbac-picker-label">Logged in as:</span>
        {Object.entries(ROLES).map(([key, ro]) => (
          <button key={key} className={`authrbac-role-btn ${role === key ? 'authrbac-role-btn--on' : ''}`}
            style={{ '--rc': ro.color }} onClick={() => setRole(key)}>{ro.label}</button>
        ))}
      </div>

      <div className="authrbac-grid">
        <div className="authrbac-panel">
          <h3>What can <span style={{ color: r.color }}>{r.label}</span> do?</h3>
          <div className="authrbac-actions">
            {ACTIONS.map(a => {
              const allowed = r.perms.includes(a.id);
              return (
                <div key={a.id} className={`authrbac-action ${allowed ? 'authrbac-action--allow' : 'authrbac-action--deny'}`}>
                  <span className="authrbac-action-icon">{a.icon}</span>
                  <span className="authrbac-action-label">{a.label}</span>
                  <span className="authrbac-action-status">{allowed ? '✓ Allowed' : '✗ Denied'}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="authrbac-panel">
          <h3>Role hierarchy</h3>
          <div className="authrbac-hierarchy">
            {Object.entries(ROLES).map(([key, ro]) => (
              <div key={key} className={`authrbac-tier ${role === key ? 'authrbac-tier--on' : ''}`} style={{ '--rc': ro.color }}>
                <span className="authrbac-tier-name">{ro.label}</span>
                <span className="authrbac-tier-count">{ro.perms.length} permissions</span>
              </div>
            ))}
          </div>
          <pre className="authrbac-code"><code>{`// Permission-check middleware
function requireRole(...allowed) {
  return (req, res, next) => {
    if (!allowed.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}

// Usage
app.delete('/posts/:id',
  authMiddleware,
  requireRole('admin', 'editor'),
  deleteHandler
);`}</code></pre>
        </div>
      </div>

      <div className="authrbac-note">
        <strong>401 vs 403:</strong> <code>401 Unauthorized</code> = "I don't know who you are" (not logged in). <code>403 Forbidden</code> = "I know you, but you can't do this" (wrong role).
      </div>
    </div>
  );
};

export default AuthRbacVisualization;
