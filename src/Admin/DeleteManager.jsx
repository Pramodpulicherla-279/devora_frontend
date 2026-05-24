import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config';

const ADMIN_PASSWORD = 'dev.el@2026';

/* ─── Confirm dialog ─── */
function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="dm-confirm-dialog">
      <div className="dm-confirm-box">
        <div className="dm-confirm-title">⚠️ Confirm Deletion</div>
        <div className="dm-confirm-msg">{message}</div>
        <div className="dm-confirm-actions">
          <button className="modal-cancel" onClick={onCancel}>Cancel</button>
          <button className="dm-confirm-btn" style={{ width: 'auto', padding: '8px 20px' }} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Password gate ─── */
function PasswordGate({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  const handleUnlock = () => {
    setChecking(true);
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        onUnlock();
      } else {
        setError('Incorrect password. Access denied.');
        setPassword('');
      }
      setChecking(false);
    }, 500);
  };

  return (
    <div className="dm-gate">
      <div className="dm-gate-box">
        <div className="dm-gate-icon">🔐</div>
        <div className="dm-gate-title">Danger Zone</div>
        <div className="dm-gate-sub">
          This area allows permanent deletion of content.<br />
          Enter your admin password to proceed.
        </div>
        <input
          className="modal-input"
          type="password"
          placeholder="Admin password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleUnlock()}
          autoFocus
        />
        {error && <div className="dm-gate-error">{error}</div>}
        <button
          className="dm-confirm-btn"
          onClick={handleUnlock}
          disabled={checking || !password}
        >
          {checking ? 'Verifying…' : 'Unlock Delete Manager'}
        </button>
      </div>
    </div>
  );
}

/* ─── Collapsible section ─── */
function DmSection({ title, icon, count, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="dm-section">
      <div className="dm-section-header" onClick={() => setOpen(o => !o)}>
        <span>{icon} {title} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({count})</span></span>
        <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{open ? '▲' : '▼'}</span>
      </div>
      {open && <div className="dm-section-body">{children}</div>}
    </div>
  );
}

/* ─── Main DeleteManager ─── */
function DeleteManager() {
  const [unlocked, setUnlocked] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [parts, setParts] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(null); // { message, action }
  const [searchQuery, setSearchQuery] = useState('');

  const loadAll = async () => {
    setLoading(true);
    try {
      const [tr, co, pa, le] = await Promise.all([
        fetch(`${API_BASE_URL}/api/tracks`).then(r => r.json()),
        fetch(`${API_BASE_URL}/api/courses`).then(r => r.json()),
        fetch(`${API_BASE_URL}/api/parts`).then(r => r.json()),
        fetch(`${API_BASE_URL}/api/lessons`).then(r => r.json()),
      ]);
      if (tr.success) setTracks(tr.data);
      if (co.success) setCourses(co.data);
      if (pa.success) setParts(pa.data);
      if (le.success) setLessons(le.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (unlocked) loadAll();
  }, [unlocked]);

  const ask = (message, action) => setConfirm({ message, action });

  const handleConfirm = async () => {
    if (confirm?.action) await confirm.action();
    setConfirm(null);
    loadAll();
  };

  const deleteTrack = (id, name) => ask(
    `Delete track "${name}"? This will unassign all its courses but will NOT delete them.`,
    () => fetch(`${API_BASE_URL}/api/tracks/${id}`, { method: 'DELETE' })
  );

  const deleteCourse = (id, name) => ask(
    `Permanently delete course "${name}" and ALL its parts and lessons? This cannot be undone.`,
    () => fetch(`${API_BASE_URL}/api/courses/${id}`, { method: 'DELETE' })
  );

  const deletePart = (id, name) => ask(
    `Permanently delete part "${name}" and all its lessons?`,
    () => fetch(`${API_BASE_URL}/api/parts/${id}`, { method: 'DELETE' })
  );

  const deleteLesson = (id, name) => ask(
    `Permanently delete lesson "${name}"?`,
    () => fetch(`${API_BASE_URL}/api/lessons/${id}`, { method: 'DELETE' })
  );

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;

  const q = searchQuery.trim().toLowerCase();
  const filteredTracks  = q ? tracks.filter(t  => t.name?.toLowerCase().includes(q))  : tracks;
  const filteredCourses = q ? courses.filter(c  => c.title?.toLowerCase().includes(q)) : courses;
  const filteredParts   = q ? parts.filter(p    => p.title?.toLowerCase().includes(q) || p.courseTitle?.toLowerCase().includes(q)) : parts;
  const filteredLessons = q ? lessons.filter(l  => l.title?.toLowerCase().includes(q)) : lessons;

  const totalResults = filteredTracks.length + filteredCourses.length + filteredParts.length + filteredLessons.length;

  return (
    <div className="dm-layout">
      <div className="view-header">
        <div>
          <div className="view-title" style={{ color: 'var(--red)' }}>🗑️ Delete Manager</div>
          <div className="view-subtitle">Permanently remove tracks, courses, parts, and lessons.</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="dm-search-wrap">
            <span className="dm-search-icon">🔍</span>
            <input
              className="dm-search-input"
              type="search"
              placeholder="Search courses, parts, lessons…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
            {searchQuery && (
              <button className="dm-search-clear" onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>
          <button className="topbar-btn outline" onClick={loadAll} disabled={loading}>
            {loading ? 'Refreshing…' : '↺ Refresh'}
          </button>
        </div>
      </div>

      <div className="dm-content">
        <div className="dm-warning-banner">
          <span style={{ fontSize: '20px' }}>⚠️</span>
          <span>All deletions are <strong>permanent and irreversible</strong>. A confirmation prompt will appear before each action.</span>
        </div>

        {q && (
          <div className="dm-search-status">
            {totalResults === 0
              ? `No results for "${searchQuery}"`
              : `${totalResults} result${totalResults !== 1 ? 's' : ''} for "${searchQuery}"`}
          </div>
        )}

        {loading ? (
          <div className="empty-state"><div className="empty-state-icon">⏳</div><div>Loading...</div></div>
        ) : (
          <>
            {/* TRACKS */}
            {(!q || filteredTracks.length > 0) && (
              <DmSection title="Learning Tracks" icon="🛤️" count={filteredTracks.length}>
                {filteredTracks.length === 0 ? (
                  <div style={{ padding: '14px 16px', color: 'var(--text-muted)', fontSize: '13px' }}>No tracks found.</div>
                ) : filteredTracks.map(t => (
                  <div key={t._id} className="dm-item">
                    <div className="dm-item-icon">{t.icon || '🛤️'}</div>
                    <div className="dm-item-info">
                      <div className="dm-item-name">{t.name}</div>
                      <div className="dm-item-meta">{t.type || 'Track'} • {t.courses?.length || 0} courses</div>
                    </div>
                    <button className="dm-delete-btn" onClick={() => deleteTrack(t._id, t.name)}>Delete</button>
                  </div>
                ))}
              </DmSection>
            )}

            {/* COURSES */}
            {(!q || filteredCourses.length > 0) && (
              <DmSection title="Courses" icon="📚" count={filteredCourses.length}>
                {filteredCourses.length === 0 ? (
                  <div style={{ padding: '14px 16px', color: 'var(--text-muted)', fontSize: '13px' }}>No courses found.</div>
                ) : filteredCourses.map(c => (
                  <div key={c._id} className="dm-item">
                    <div className="dm-item-icon">📘</div>
                    <div className="dm-item-info">
                      <div className="dm-item-name">{c.title}</div>
                      <div className="dm-item-meta">{c.parts?.length || 0} parts • <span className={`status-badge ${c.status || 'draft'}`}>{c.status || 'draft'}</span></div>
                    </div>
                    <button className="dm-delete-btn" onClick={() => deleteCourse(c._id, c.title)}>Delete</button>
                  </div>
                ))}
              </DmSection>
            )}

            {/* PARTS */}
            {(!q || filteredParts.length > 0) && (
              <DmSection title="Parts / Modules" icon="📂" count={filteredParts.length}>
                {filteredParts.length === 0 ? (
                  <div style={{ padding: '14px 16px', color: 'var(--text-muted)', fontSize: '13px' }}>No parts found.</div>
                ) : filteredParts.map(p => (
                  <div key={p._id} className="dm-item">
                    <div className="dm-item-icon">📂</div>
                    <div className="dm-item-info">
                      <div className="dm-item-name">{p.title}</div>
                      <div className="dm-item-meta">{p.courseTitle} • {p.lessons?.length || 0} lessons</div>
                    </div>
                    <button className="dm-delete-btn" onClick={() => deletePart(p._id, p.title)}>Delete</button>
                  </div>
                ))}
              </DmSection>
            )}

            {/* LESSONS */}
            {(!q || filteredLessons.length > 0) && (
              <DmSection title="Lessons" icon="📝" count={filteredLessons.length}>
                {filteredLessons.length === 0 ? (
                  <div style={{ padding: '14px 16px', color: 'var(--text-muted)', fontSize: '13px' }}>No lessons found.</div>
                ) : filteredLessons.map(l => (
                  <div key={l._id} className="dm-item">
                    <div className="dm-item-icon">📝</div>
                    <div className="dm-item-info">
                      <div className="dm-item-name">{l.title}</div>
                      <div className="dm-item-meta">
                        {l.difficulty || 'beginner'} • <span className={`status-badge ${l.status || 'draft'}`}>{l.status || 'draft'}</span>
                      </div>
                    </div>
                    <button className="dm-delete-btn" onClick={() => deleteLesson(l._id, l.title)}>Delete</button>
                  </div>
                ))}
              </DmSection>
            )}

            {q && totalResults === 0 && (
              <div className="empty-state" style={{ marginTop: '32px' }}>
                <div className="empty-state-icon">🔍</div>
                <div className="empty-state-title">No results found</div>
                <div className="empty-state-desc">No items match "{searchQuery}". Try a different search term.</div>
              </div>
            )}
          </>
        )}
      </div>

      {confirm && (
        <ConfirmDialog
          message={confirm.message}
          onConfirm={handleConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
}

export default DeleteManager;
