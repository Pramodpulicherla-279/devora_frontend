import { useState, useEffect, useRef } from 'react';
import LessonEditor from './LessonEditor';
import CourseManager from './CourseManager';
import DeleteManager from './DeleteManager';
import './admin.css';
import { API_BASE_URL } from '../../config';

const ADMIN_PASSWORD = 'dev.el@2026';

const NAV = [
  { id: 'courses', label: 'Technology Courses', icon: '📚', section: 'MAIN' },
  { id: 'tracks', label: 'Learning Tracks', icon: '🛤️', section: 'MAIN' },
  { id: 'lesson-editor', label: 'Add New Lesson', icon: '✏️', section: 'CONTENT' },
  { id: 'visualizations', label: 'Visualizations', icon: '📊', section: 'CONTENT' },
  { id: 'delete-manager', label: 'Delete Manager', icon: '🗑️', section: 'DANGER' },
];

/* ─── Admin Login Screen ─── */
function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem('admin_auth', 'true');
        onLogin();
      } else {
        setError('Incorrect password. Please try again.');
        setPassword('');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="admin-login-screen">
      <div className="admin-login-box">
        <div className="admin-login-brand">
          <div className="admin-login-icon">D</div>
          <div className="admin-login-title">Dev.EL Admin</div>
          <div className="admin-login-sub">Enter your admin password to access the studio</div>
        </div>
        <input
          className="modal-input"
          type="password"
          placeholder="Admin password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          autoFocus
        />
        {error && <div className="admin-login-error">{error}</div>}
        <button
          className="modal-confirm"
          style={{ width: '100%', marginTop: '4px' }}
          onClick={handleLogin}
          disabled={loading || !password}
        >
          {loading ? 'Verifying…' : 'Sign In'}
        </button>
      </div>
    </div>
  );
}

const TRACK_EMOJIS = [
  '🧩','🔷','🎨','⚙️','🤖','🎭','📱','📊','🔥','🚀',
  '💡','🌐','🛤️','📚','🧠','⚡','🔧','🎯','🌟','💻',
  '🗄️','🔐','📡','🧪','🎮','🔬','📈','🏗️','🌊','🦾',
];

function CreateTrackModal({ onClose, onCreated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Web Development');
  const [icon, setIcon] = useState('🛤️');
  const [saving, setSaving] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/tracks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), description, type, icon }),
      });
      const data = await res.json();
      if (data.success) onCreated(data.data);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-title">Create Learning Track</div>
        <div className="modal-sub">Tracks are curated learning paths shown on the landing page.</div>

        <label className="modal-label">Track Icon</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '12px',
            background: 'var(--bg-input)', border: '2px solid var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', flexShrink: 0,
          }}>
            {icon}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {TRACK_EMOJIS.map(e => (
              <button
                key={e}
                onClick={() => setIcon(e)}
                style={{
                  width: '32px', height: '32px', border: icon === e ? '2px solid var(--accent)' : '1px solid var(--border)',
                  borderRadius: '6px', background: icon === e ? 'rgba(99,102,241,0.15)' : 'var(--bg-input)',
                  cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <label className="modal-label">Track Name</label>
        <input className="modal-input" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. MERN Stack" autoFocus />
        <label className="modal-label">Category / Type</label>
        <input className="modal-input" value={type} onChange={e => setType(e.target.value)} placeholder="e.g. Web Development, Data Science" />
        <label className="modal-label">Description</label>
        <textarea className="modal-textarea" value={description} onChange={e => setDescription(e.target.value)} placeholder="What will learners achieve?" rows={3} />
        <div className="modal-actions">
          <button className="modal-cancel" onClick={onClose}>Cancel</button>
          <button className="modal-confirm" onClick={handleCreate} disabled={saving || !name.trim()}>
            {saving ? 'Creating…' : 'Create Track'}
          </button>
        </div>
      </div>
    </div>
  );
}

function CoursesView({ onSelectCourse, onNewLesson }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const load = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/courses`)
      .then(r => r.json())
      .then(d => { if (d.success) setCourses(d.data); })
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="view-header">
        <div>
          <div className="view-title">Technology Courses</div>
          <div className="view-subtitle">Manage all courses, parts, and lessons.</div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="topbar-btn" onClick={() => setShowCreateModal(true)}>+ New Course</button>
        </div>
      </div>

      {loading ? (
        <div className="empty-state"><div className="empty-state-icon">⏳</div><div>Loading...</div></div>
      ) : courses.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <div className="empty-state-title">No courses yet</div>
          <div className="empty-state-desc">Create your first course to get started.</div>
        </div>
      ) : (
        <div className="course-grid">
          {courses.map(course => {
            const totalParts = course.parts?.length || 0;
            return (
              <div key={course._id} className="course-card" onClick={() => onSelectCourse(course._id, course.slug)}>
                <div className="course-card-header">
                  <div className="course-card-title">{course.title}</div>
                  <span className={`status-badge ${course.status || 'draft'}`}>{course.status || 'draft'}</span>
                </div>
                <div className="course-card-desc">{course.description || 'No description provided.'}</div>
                <div className="course-stats">
                  <div className="stat-item">
                    <div className="stat-value">{totalParts}</div>
                    <div className="stat-label">Parts</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{(course.domains?.length || 0) + (course.tracks?.length || 0)}</div>
                    <div className="stat-label">Assigned</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{course.status === 'published' ? '●' : '○'}</div>
                    <div className="stat-label">Status</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <CreateCourseModalInner onClose={() => setShowCreateModal(false)} onCreated={load} />
          </div>
        </div>
      )}
    </div>
  );
}

function CreateCourseModalInner({ onClose, onCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), description }),
      });
      const data = await res.json();
      if (data.success) { onCreated(); onClose(); }
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="modal-title">Create New Course</div>
      <div className="modal-sub">Fill in the details to create a new course.</div>
      <label className="modal-label">Course Title</label>
      <input className="modal-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. MongoDB Fundamentals" autoFocus />
      <label className="modal-label">Description</label>
      <textarea className="modal-textarea" value={description} onChange={e => setDescription(e.target.value)} rows={3} />
      <div className="modal-actions">
        <button className="modal-cancel" onClick={onClose}>Cancel</button>
        <button className="modal-confirm" onClick={handleCreate} disabled={saving || !title.trim()}>
          {saving ? 'Creating…' : 'Create Course'}
        </button>
      </div>
    </>
  );
}

function ManageCoursesModal({ track, onClose }) {
  const [courses, setCourses] = useState([...(track.courses || [])]);
  const [saving, setSaving] = useState(false);

  const move = async (fromIndex, toIndex) => {
    const prev = [...courses];
    const next = [...courses];
    const [item] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, item);
    setCourses(next);
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/tracks/${track._id}/reorder`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseIds: next.map(c => c._id) }),
      });
      const data = await res.json();
      if (!data.success) setCourses(prev);
    } catch {
      setCourses(prev);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-title">Course Order — {track.name}</div>
        <div className="modal-sub">Use arrows to reorder. Order is saved immediately and reflected on the track page.</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '420px', overflowY: 'auto', marginBottom: '16px' }}>
          {courses.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', fontSize: '13px', padding: '24px 0', textAlign: 'center' }}>
              No courses assigned yet. Use Course Manager to assign courses to this track.
            </div>
          ) : courses.map((course, i) => (
            <div
              key={course._id}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 12px', borderRadius: '8px',
                background: 'var(--bg-input)', border: '1px solid var(--border)',
              }}
            >
              <div style={{
                width: '26px', height: '26px', borderRadius: '6px', flexShrink: 0,
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {course.title}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {course.status || 'draft'} · {course.parts?.length || 0} parts
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flexShrink: 0 }}>
                {[
                  { label: '↑', disabled: i === 0, action: () => move(i, i - 1) },
                  { label: '↓', disabled: i === courses.length - 1, action: () => move(i, i + 1) },
                ].map(btn => (
                  <button
                    key={btn.label}
                    onClick={btn.action}
                    disabled={btn.disabled || saving}
                    style={{
                      width: '26px', height: '26px', border: '1px solid var(--border)',
                      borderRadius: '5px', background: 'var(--bg-card)',
                      cursor: btn.disabled || saving ? 'not-allowed' : 'pointer',
                      opacity: btn.disabled ? 0.25 : 1,
                      fontSize: '12px', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', color: 'var(--text-secondary)', padding: 0,
                    }}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="modal-actions">
          <button className="modal-confirm" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}

function EditTrackModal({ track, onClose, onSaved }) {
  const [name, setName] = useState(track.name || '');
  const [description, setDescription] = useState(track.description || '');
  const [type, setType] = useState(track.type || 'Web Development');
  const [icon, setIcon] = useState(track.icon || '🛤️');
  const [isOptional, setIsOptional] = useState(track.isOptional || false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/tracks/${track._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), description, type, icon, isOptional }),
      });
      const data = await res.json();
      if (data.success) onSaved();
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-title">Edit Track</div>
        <div className="modal-sub">Update the details for this learning track.</div>

        <label className="modal-label">Track Icon</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '12px',
            background: 'var(--bg-input)', border: '2px solid var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', flexShrink: 0,
          }}>
            {icon}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {TRACK_EMOJIS.map(e => (
              <button
                key={e}
                onClick={() => setIcon(e)}
                style={{
                  width: '32px', height: '32px',
                  border: icon === e ? '2px solid var(--accent)' : '1px solid var(--border)',
                  borderRadius: '6px',
                  background: icon === e ? 'rgba(99,102,241,0.15)' : 'var(--bg-input)',
                  cursor: 'pointer', fontSize: '16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <label className="modal-label">Track Name</label>
        <input className="modal-input" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. MERN Stack" autoFocus />

        <label className="modal-label">Category / Type</label>
        <input className="modal-input" value={type} onChange={e => setType(e.target.value)} placeholder="e.g. Web Development, Data Science" />

        <label className="modal-label">Description</label>
        <textarea className="modal-textarea" value={description} onChange={e => setDescription(e.target.value)} placeholder="What will learners achieve?" rows={3} />

        <label className="modal-label">Visibility</label>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
          {[{ label: 'Required', value: false }, { label: 'Optional', value: true }].map(opt => (
            <button
              key={opt.label}
              onClick={() => setIsOptional(opt.value)}
              style={{
                flex: 1, padding: '8px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px',
                border: isOptional === opt.value ? '2px solid var(--accent)' : '1px solid var(--border)',
                background: isOptional === opt.value ? 'rgba(99,102,241,0.15)' : 'var(--bg-input)',
                color: isOptional === opt.value ? 'var(--accent-hover)' : 'var(--text-secondary)',
                fontWeight: isOptional === opt.value ? 600 : 400,
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="modal-actions">
          <button className="modal-cancel" onClick={onClose}>Cancel</button>
          <button className="modal-confirm" onClick={handleSave} disabled={saving || !name.trim()}>
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

function TracksView() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTrack, setEditingTrack] = useState(null);
  const [managingTrack, setManagingTrack] = useState(null);

  const load = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/tracks`)
      .then(r => r.json())
      .then(d => { if (d.success) setTracks(d.data); })
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="view-header">
        <div>
          <div className="view-title">Learning Tracks</div>
          <div className="view-subtitle">Curated course sequences for specific learning goals.</div>
        </div>
        <button className="topbar-btn" onClick={() => setShowModal(true)}>+ New Track</button>
      </div>

      {loading ? (
        <div className="empty-state"><div>Loading...</div></div>
      ) : tracks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🛤️</div>
          <div className="empty-state-title">No tracks yet</div>
          <div className="empty-state-desc">Create learning tracks that sequence courses into a path.</div>
        </div>
      ) : (
        <div className="dt-grid">
          {tracks.map(t => (
            <div key={t._id} className="dt-card">
              <div className="dt-card-header">
                <div className="dt-icon">{t.icon || '🛤️'}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="dt-card-name">{t.name}</div>
                  {t.domain?.name && (
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{t.domain.name}</div>
                  )}
                </div>
                <span className={`status-badge ${t.isOptional ? 'draft' : 'published'}`}>
                  {t.isOptional ? 'Optional' : 'Required'}
                </span>
              </div>
              <div className="dt-card-desc">{t.description || 'No description'}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                <div className="dt-courses-count">{t.type} • {t.courses?.length || 0} courses</div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={e => { e.stopPropagation(); setManagingTrack(t); }}
                    style={{
                      padding: '4px 12px', borderRadius: '6px', fontSize: '12px',
                      border: '1px solid var(--border)', background: 'var(--bg-input)',
                      color: 'var(--text-secondary)', cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent-hover)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  >
                    ↕ Order
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); setEditingTrack(t); }}
                    style={{
                      padding: '4px 12px', borderRadius: '6px', fontSize: '12px',
                      border: '1px solid var(--border)', background: 'var(--bg-input)',
                      color: 'var(--text-secondary)', cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent-hover)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  >
                    ✏️ Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <CreateTrackModal onClose={() => setShowModal(false)} onCreated={load} />
      )}

      {managingTrack && (
        <ManageCoursesModal
          track={managingTrack}
          onClose={() => { setManagingTrack(null); load(); }}
        />
      )}

      {editingTrack && (
        <EditTrackModal
          track={editingTrack}
          onClose={() => setEditingTrack(null)}
          onSaved={() => { setEditingTrack(null); load(); }}
        />
      )}
    </div>
  );
}

function AdminDashboard() {
  const [isAuthed, setIsAuthed] = useState(() => sessionStorage.getItem('admin_auth') === 'true');
  const [currentView, setCurrentView] = useState('courses');
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  /* ── Search ── */
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCourses, setSearchCourses] = useState([]);
  const [searchTracks, setSearchTracks] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (!isAuthed) return;
    Promise.all([
      fetch(`${API_BASE_URL}/api/courses`).then(r => r.json()),
      fetch(`${API_BASE_URL}/api/tracks`).then(r => r.json()),
    ]).then(([co, tr]) => {
      if (co.success) setSearchCourses(co.data);
      if (tr.success) setSearchTracks(tr.data);
    });
  }, [isAuthed]);

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const q = searchQuery.trim().toLowerCase();
  const filteredCourses = q.length >= 2
    ? searchCourses.filter(c => c.title.toLowerCase().includes(q)).slice(0, 5)
    : [];
  const filteredTracks = q.length >= 2
    ? searchTracks.filter(t => t.name.toLowerCase().includes(q)).slice(0, 3)
    : [];
  const hasResults = filteredCourses.length > 0 || filteredTracks.length > 0;

  const sections = [...new Set(NAV.map(n => n.section))];

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthed(false);
  };

  const navigate = (viewId) => {
    setCurrentView(viewId);
    if (viewId !== 'course-manager') setSelectedCourseId(null);
  };

  const handleSelectCourse = (courseId) => {
    setSelectedCourseId(courseId);
    setCurrentView('course-manager');
  };

  const renderView = () => {
    switch (currentView) {
      case 'courses':
        return (
          <CoursesView
            onSelectCourse={handleSelectCourse}
            onNewLesson={() => navigate('lesson-editor')}
          />
        );
      case 'course-manager':
        return (
          <CourseManager
            courseId={selectedCourseId}
            onBack={() => navigate('courses')}
          />
        );
      case 'lesson-editor':
        return (
          <LessonEditor
            onBack={() => navigate('courses')}
          />
        );
      case 'tracks':
        return <TracksView />;
      case 'visualizations':
        return (
          <div className="empty-state" style={{ height: '100%' }}>
            <div className="empty-state-icon">📊</div>
            <div className="empty-state-title">Visualization Registry</div>
            <div className="empty-state-desc">Visualization components are managed in the codebase under src/components/visualizations/. Use the embed button in the lesson editor to insert them.</div>
          </div>
        );
      case 'delete-manager':
        return <DeleteManager />;
      default:
        return <CoursesView onSelectCourse={handleSelectCourse} onNewLesson={() => navigate('lesson-editor')} />;
    }
  };

  /* Show login screen if not authenticated */
  if (!isAuthed) {
    return <AdminLogin onLogin={() => setIsAuthed(true)} />;
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">D</div>
          {!sidebarCollapsed && (
            <div className="sidebar-brand-text">
              <div className="sidebar-brand-name">Dev.EL</div>
              <div className="sidebar-brand-sub">Admin Studio</div>
            </div>
          )}
        </div>

        <div className="sidebar-nav">
          {sections.map(section => (
            <div key={section}>
              {!sidebarCollapsed && (
                section === 'DANGER'
                  ? <div className="sidebar-danger-label">{section}</div>
                  : <div className="sidebar-section-label">{section}</div>
              )}
              {NAV.filter(n => n.section === section).map(item => (
                <div
                  key={item.id}
                  className={`sidebar-item ${currentView === item.id || (item.id === 'courses' && currentView === 'course-manager') ? 'active' : ''} ${item.section === 'DANGER' ? 'danger-item' : ''}`}
                  onClick={() => navigate(item.id)}
                  title={sidebarCollapsed ? item.label : ''}
                  style={item.section === 'DANGER' ? { color: currentView === item.id ? '#f87171' : 'rgba(239,68,68,0.7)' } : {}}
                >
                  <span className="icon">{item.icon}</span>
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          {!sidebarCollapsed && (
            <div
              className="sidebar-item"
              onClick={handleLogout}
              title="Sign out"
              style={{ color: 'var(--text-muted)', fontSize: '13px' }}
            >
              <span className="icon">🚪</span>
              <span>Sign Out</span>
            </div>
          )}
          <div
            className="sidebar-item"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title="Toggle sidebar"
          >
            <span className="icon">{sidebarCollapsed ? '→' : '←'}</span>
            {!sidebarCollapsed && <span>Collapse</span>}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="admin-main">
        <div className="admin-topbar">
          <button className="topbar-toggle" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
            ☰
          </button>

          {/* Search with dropdown */}
          <div className="search-wrap" ref={searchRef}>
            <input
              className="topbar-search"
              placeholder="Search courses, tracks… (type 2+ chars)"
              autoComplete="off"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setSearchOpen(true); }}
              onFocus={() => setSearchOpen(true)}
              onKeyDown={e => { if (e.key === 'Escape') { setSearchOpen(false); setSearchQuery(''); } }}
            />
            {searchOpen && searchQuery.length >= 2 && (
              <div className="search-dropdown">
                {!hasResults ? (
                  <div className="search-empty">No results for "{searchQuery}"</div>
                ) : (
                  <>
                    {filteredCourses.length > 0 && (
                      <div className="search-group">
                        <div className="search-group-label">Courses</div>
                        {filteredCourses.map(c => (
                          <div
                            key={c._id}
                            className="search-result-item"
                            onClick={() => {
                              handleSelectCourse(c._id);
                              setSearchOpen(false);
                              setSearchQuery('');
                            }}
                          >
                            <span className="search-result-icon">📘</span>
                            <span className="search-result-name">{c.title}</span>
                            <span className={`status-badge ${c.status || 'draft'}`}>{c.status || 'draft'}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {filteredTracks.length > 0 && (
                      <div className="search-group">
                        <div className="search-group-label">Tracks</div>
                        {filteredTracks.map(t => (
                          <div
                            key={t._id}
                            className="search-result-item"
                            onClick={() => {
                              navigate('tracks');
                              setSearchOpen(false);
                              setSearchQuery('');
                            }}
                          >
                            <span className="search-result-icon">{t.icon || '🛤️'}</span>
                            <span className="search-result-name">{t.name}</span>
                            <span className="search-result-meta">{t.type || 'Track'}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {/* <div className="topbar-actions">
            <button className="topbar-btn" onClick={() => navigate('lesson-editor')}>
              + Create New
            </button>
          </div> */}
        </div>

        <div className="admin-content">
          {renderView()}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
