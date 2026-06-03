import { useState, useEffect, useRef } from 'react';
import LessonEditor from './LessonEditor';
import { API_BASE_URL } from '../../config';

/* ─── Content health ─────────────────────────────────────────────
   Returns how complete a lesson's content is across four sections.
   The course API returns full lesson documents (content, quiz,
   interviewQuestions are all present in the payload).
   Visualization is detected by the presence of a viz embed
   placeholder in the HTML content:
     <div data-type="…" class="visualization-embed"></div>
───────────────────────────────────────────────────────────────── */
function getLessonHealth(lesson) {
  const content = lesson.content || '';
  return {
    theory:        content.trim().length > 100,
    quiz:          Array.isArray(lesson.quiz) && lesson.quiz.length > 0,
    interview:     Array.isArray(lesson.interviewQuestions) && lesson.interviewQuestions.length > 0,
    visualization: content.includes('visualization-embed') || content.includes('data-type='),
  };
}

const HEALTH_CONFIG = [
  { key: 'theory',        label: 'T', title: 'Theory',          color: '#7c3aed' },
  { key: 'quiz',          label: 'Q', title: 'Quiz',            color: '#f59e0b' },
  { key: 'interview',     label: 'I', title: 'Interview Qs',    color: '#06b6d4' },
  { key: 'visualization', label: 'V', title: 'Visualization',   color: '#10b981' },
];

function HealthDots({ lesson }) {
  const h = getLessonHealth(lesson);
  const tip = HEALTH_CONFIG
    .map(c => `${c.title}: ${h[c.key] ? '✓' : '✗'}`)
    .join(' | ');
  return (
    <div
      className="cm-health-dots"
      title={tip}
    >
      {HEALTH_CONFIG.map(c => (
        <span
          key={c.key}
          className={`cm-health-dot ${h[c.key] ? 'filled' : ''}`}
          style={{ '--hc': c.color }}
        >
          {c.label}
        </span>
      ))}
    </div>
  );
}

const COURSE_EMOJIS = [
  '📘','🌐','🎨','⚡','💻','🗄️','🔐','🚀','🧪','🔧',
  '🧩','⚙️','📊','🔬','🏗️','🐍','🐙','🟢','☁️','🎯',
  '📱','🔌','🤖','🦾','📡','💡','🌟','🔥','🛠️','🗺️',
];

function AssignModal({ courseId, allTracks, onClose, onAssigned }) {
  const [selectedId, setSelectedId] = useState('');

  const handleAssign = async () => {
    if (!selectedId) return;
    const res = await fetch(`${API_BASE_URL}/api/tracks/${selectedId}/assign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId }),
    });
    const data = await res.json();
    if (data.success) onAssigned();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-title">Assign Course to Track</div>
        <div className="modal-sub">Select the learning track this course belongs to.</div>

        <div className="assign-list">
          {allTracks.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', fontSize: '13px', padding: '12px 0' }}>
              No tracks found. Create a track first from Learning Tracks.
            </div>
          ) : (
            allTracks.map(item => (
              <div
                key={item._id}
                className={`assign-list-item ${selectedId === item._id ? 'selected' : ''}`}
                onClick={() => setSelectedId(item._id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '20px' }}>{item.icon || '🛤️'}</span>
                  <div>
                    <div className="assign-list-item-name">{item.name}</div>
                    <div className="assign-list-item-meta">{item.type || 'Track'} • {item.courses?.length || 0} courses</div>
                  </div>
                </div>
                {selectedId === item._id && <span className="assign-check">✓</span>}
              </div>
            ))
          )}
        </div>

        <div className="modal-actions">
          <button className="modal-cancel" onClick={onClose}>Cancel</button>
          <button className="modal-confirm" onClick={handleAssign} disabled={!selectedId}>
            Assign
          </button>
        </div>
      </div>
    </div>
  );
}

function CreateCourseModal({ onClose, onCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('📘');
  const [saving, setSaving] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), description, icon }),
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
        <div className="modal-title">Create New Course</div>
        <div className="modal-sub">Fill in the details to create a new course.</div>

        <label className="modal-label">Course Icon</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
          {COURSE_EMOJIS.map(e => (
            <button
              key={e} type="button" onClick={() => setIcon(e)}
              style={{
                fontSize: '20px', width: '36px', height: '36px', cursor: 'pointer',
                border: icon === e ? '2px solid var(--accent)' : '1px solid var(--border)',
                borderRadius: '6px',
                background: icon === e ? 'rgba(99,102,241,0.15)' : 'var(--bg-input)',
              }}
            >{e}</button>
          ))}
        </div>

        <label className="modal-label">Course Title</label>
        <input className="modal-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. MongoDB Fundamentals" />
        <label className="modal-label">Description</label>
        <textarea className="modal-textarea" value={description} onChange={e => setDescription(e.target.value)} placeholder="Course description..." rows={3} />
        <div className="modal-actions">
          <button className="modal-cancel" onClick={onClose}>Cancel</button>
          <button className="modal-confirm" onClick={handleCreate} disabled={saving || !title.trim()}>
            {saving ? 'Creating…' : 'Create Course'}
          </button>
        </div>
      </div>
    </div>
  );
}

function AddPartModal({ courseId, onClose, onCreated }) {
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/parts/${courseId}/parts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim() }),
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
        <div className="modal-title">Add Part / Module</div>
        <div className="modal-sub">Add a new module to this course.</div>
        <label className="modal-label">Part Title</label>
        <input className="modal-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Introduction to MongoDB" />
        <div className="modal-actions">
          <button className="modal-cancel" onClick={onClose}>Cancel</button>
          <button className="modal-confirm" onClick={handleCreate} disabled={saving || !title.trim()}>
            {saving ? 'Adding…' : 'Add Part'}
          </button>
        </div>
      </div>
    </div>
  );
}

function CourseManager({ courseId, onBack }) {
  const [course, setCourse] = useState(null);
  const [allTracks, setAllTracks] = useState([]);
  const [activeTab, setActiveTab] = useState('structure');
  const [expandedParts, setExpandedParts] = useState({});
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showAddPartModal, setShowAddPartModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [iconPickerOpen, setIconPickerOpen] = useState(false);
  const [editingPart, setEditingPart] = useState(null); // { id, title }
  const partEditRef = useRef(null);

  const loadCourse = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/courses/${courseId}`);
      const data = await res.json();
      if (data.success) setCourse(data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) loadCourse();
  }, [courseId]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/tracks`)
      .then(r => r.json())
      .then(d => { if (d.success) setAllTracks(d.data); });
  }, []);

  // Close icon picker on outside click
  useEffect(() => {
    if (!iconPickerOpen) return;
    const close = () => setIconPickerOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [iconPickerOpen]);

  const saveIcon = async (emoji) => {
    setIconPickerOpen(false);
    setCourse(prev => ({ ...prev, icon: emoji }));
    await fetch(`${API_BASE_URL}/api/courses/${courseId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ icon: emoji }),
    });
  };

  const togglePart = (partId) => setExpandedParts(prev => ({ ...prev, [partId]: !prev[partId] }));

  const savePartName = async (partId, newTitle) => {
    const trimmed = newTitle.trim();
    if (!trimmed) { setEditingPart(null); return; }
    // Optimistic update
    setCourse(prev => ({
      ...prev,
      parts: prev.parts.map(p => p._id === partId ? { ...p, title: trimmed } : p),
    }));
    setEditingPart(null);
    await fetch(`${API_BASE_URL}/api/parts/${partId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: trimmed }),
    });
  };

  const reorderLesson = async (partId, fromIndex, toIndex) => {
    const part = course.parts.find(p => p._id === partId);
    if (!part) return;

    const newLessons = [...part.lessons];
    const [moved] = newLessons.splice(fromIndex, 1);
    newLessons.splice(toIndex, 0, moved);

    // Optimistic update — reflect the new order instantly in the UI
    setCourse(prev => ({
      ...prev,
      parts: prev.parts.map(p =>
        p._id === partId ? { ...p, lessons: newLessons } : p
      ),
    }));

    try {
      await fetch(`${API_BASE_URL}/api/lessons/${partId}/reorder`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonIds: newLessons.map(l => l._id) }),
      });
    } catch {
      // Revert to server state on failure
      loadCourse();
    }
  };

  const handleRemoveTrack = async (trackId) => {
    await fetch(`${API_BASE_URL}/api/tracks/${trackId}/courses/${courseId}`, { method: 'DELETE' });
    loadCourse();
  };

  const totalLessons = course?.parts?.reduce((sum, p) => sum + (p.lessons?.length || 0), 0) || 0;
  const assignedToCount = course?.tracks?.length || 0;

  const assignedTracks = allTracks.filter(t => course?.tracks?.some(x => x._id === t._id || x === t._id));

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
        Loading course...
      </div>
    );
  }

  if (!course) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
        Course not found.
      </div>
    );
  }

  return (
    <div className="cm-layout" style={{ height: '100%' }}>
      {/* Left panel */}
      <div className={`cm-left ${leftCollapsed ? 'cm-left-collapsed' : ''}`}>
        <div className="cm-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            {onBack && (
              <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '14px' }}>
                ←
              </button>
            )}

            {/* ── Course icon — click to change ── */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <button
                title="Change course icon"
                onClick={e => { e.stopPropagation(); setIconPickerOpen(p => !p); }}
                style={{
                  background: 'var(--bg-input)', border: '1px solid var(--border)',
                  borderRadius: '6px', padding: '3px 6px', cursor: 'pointer',
                  fontSize: '18px', lineHeight: 1,
                }}
              >
                {course.icon || '📘'}
              </button>
              {iconPickerOpen && (
                <div
                  onClick={e => e.stopPropagation()}
                  style={{
                    position: 'absolute', top: 'calc(100% + 6px)', left: 0, zIndex: 100,
                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                    borderRadius: '10px', padding: '10px',
                    display: 'flex', flexWrap: 'wrap', gap: '5px', width: '220px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                  }}
                >
                  {COURSE_EMOJIS.map(e => (
                    <button
                      key={e} onClick={() => saveIcon(e)}
                      style={{
                        fontSize: '18px', width: '32px', height: '32px', cursor: 'pointer',
                        border: (course.icon || '📘') === e ? '2px solid var(--accent)' : '1px solid var(--border)',
                        borderRadius: '6px',
                        background: (course.icon || '📘') === e ? 'rgba(99,102,241,0.15)' : 'var(--bg-input)',
                      }}
                    >{e}</button>
                  ))}
                </div>
              )}
            </div>

            <div className="cm-course-title" style={{ flex: 1, minWidth: 0 }}>
              {course.title}
              <span className={`status-badge ${course.status || 'draft'}`}>{course.status || 'draft'}</span>
            </div>
            <button
              onClick={() => setLeftCollapsed(true)}
              title="Collapse panel"
              style={{
                background: 'none', border: 'none', color: 'var(--text-muted)',
                cursor: 'pointer', fontSize: '16px', padding: '2px 4px',
                borderRadius: '4px', lineHeight: 1, flexShrink: 0,
              }}
            >
              ✕
            </button>
          </div>
          <div className="cm-course-desc">{course.description || 'No description'}</div>
          <div className="cm-stats-row">
            <div className="cm-stat">
              <div className="cm-stat-value">{course.parts?.length || 0}</div>
              <div className="cm-stat-label">Parts</div>
            </div>
            <div className="cm-stat">
              <div className="cm-stat-value">{totalLessons}</div>
              <div className="cm-stat-label">Lessons</div>
            </div>
            <div className="cm-stat">
              <div className="cm-stat-value">{assignedToCount}</div>
              <div className="cm-stat-label">Assigned To</div>
            </div>
          </div>
        </div>

        <div className="cm-tabs">
          <div className={`cm-tab ${activeTab === 'structure' ? 'active' : ''}`} onClick={() => setActiveTab('structure')}>
            Parts & Lessons
          </div>
          <div className={`cm-tab ${activeTab === 'assignment' ? 'active' : ''}`} onClick={() => setActiveTab('assignment')}>
            Assigned ({assignedToCount})
          </div>
        </div>

        <div className="cm-body">
          {activeTab === 'structure' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <button className="cm-assign-btn" onClick={() => setShowAddPartModal(true)}>+ Add Part</button>
              </div>
              {(!course.parts || course.parts.length === 0) ? (
                <div className="empty-state">
                  <div className="empty-state-icon">📚</div>
                  <div className="empty-state-title">No parts yet</div>
                  <div className="empty-state-desc">Add a part to start organizing your lessons.</div>
                </div>
              ) : (
                course.parts.map((part, pi) => (
                  <div key={part._id} className="cm-part-item">
                    {/* ── Part header ── */}
                    <div
                      className="cm-part-header"
                      onClick={() => editingPart?.id !== part._id && togglePart(part._id)}
                    >
                      <div className="cm-part-num">{pi + 1}</div>

                      {editingPart?.id === part._id ? (
                        /* ── Inline edit input ── */
                        <input
                          ref={partEditRef}
                          className="cm-part-edit-input"
                          value={editingPart.title}
                          autoFocus
                          onChange={e => setEditingPart(p => ({ ...p, title: e.target.value }))}
                          onBlur={() => savePartName(part._id, editingPart.title)}
                          onKeyDown={e => {
                            if (e.key === 'Enter')  savePartName(part._id, editingPart.title);
                            if (e.key === 'Escape') setEditingPart(null);
                          }}
                          onClick={e => e.stopPropagation()}
                        />
                      ) : (
                        <span className="cm-part-title-text">{part.title}</span>
                      )}

                      {/* Edit pencil — hidden while editing */}
                      {editingPart?.id !== part._id && (
                        <button
                          className="cm-part-edit-btn"
                          title="Edit part name"
                          onClick={e => {
                            e.stopPropagation();
                            setEditingPart({ id: part._id, title: part.title });
                          }}
                        >
                          ✏️
                        </button>
                      )}

                      <span className="cm-part-lessons-count">{part.lessons?.length || 0} lessons</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '12px', marginLeft: '6px' }}>
                        {expandedParts[part._id] ? '▲' : '▼'}
                      </span>
                    </div>

                    {expandedParts[part._id] !== false && (
                      <div className="cm-lesson-list">
                        {(!part.lessons || part.lessons.length === 0) ? (
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)', padding: '6px 0' }}>No lessons yet.</div>
                        ) : (
                          part.lessons.map((lesson, li) => (
                            <div
                              key={lesson._id}
                              className={`cm-lesson-item ${selectedLesson?._id === lesson._id ? 'selected' : ''}`}
                              onClick={() => setSelectedLesson({ ...lesson, partId: part._id, partTitle: part.title })}
                            >
                              <div className="cm-lesson-dot" />
                              <span className="cm-lesson-title">{lesson.title}</span>
                              {/* ── Content health dots ── */}
                              <HealthDots lesson={lesson} />
                              <div className="cm-lesson-reorder-btns" onClick={e => e.stopPropagation()}>
                                <button
                                  className="cm-lesson-reorder-btn"
                                  disabled={li === 0}
                                  onClick={() => reorderLesson(part._id, li, li - 1)}
                                  title="Move up"
                                >▲</button>
                                <button
                                  className="cm-lesson-reorder-btn"
                                  disabled={li === part.lessons.length - 1}
                                  onClick={() => reorderLesson(part._id, li, li + 1)}
                                  title="Move down"
                                >▼</button>
                              </div>
                            </div>
                          ))
                        )}
                        <div
                          className="cm-lesson-item"
                          style={{ color: 'var(--accent-hover)', borderStyle: 'dashed', borderColor: 'rgba(99,102,241,0.3)' }}
                          onClick={() => setSelectedLesson({ _id: null, partId: part._id, partTitle: part.title, isNew: true })}
                        >
                          <span style={{ fontSize: '14px' }}>+</span>
                          New Lesson
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </>
          )}

          {activeTab === 'assignment' && (
            <div className="cm-assign-panel">
              <div className="cm-assign-title">
                Learning Tracks ({assignedTracks.length})
                <button className="cm-assign-btn" onClick={() => setShowAssignModal(true)}>+ Assign</button>
              </div>
              <div className="cm-assign-list">
                {assignedTracks.length === 0 ? (
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Not assigned to any track.</div>
                ) : (
                  assignedTracks.map(t => (
                    <div key={t._id} className="cm-assign-item">
                      <div className="cm-assign-item-icon">{t.icon || '🛤️'}</div>
                      <div className="cm-assign-item-info">
                        <div className="cm-assign-item-name">{t.name}</div>
                        <div className="cm-assign-item-meta">{t.type || 'Track'} • {t.courses?.length || 0} courses</div>
                      </div>
                      <button className="cm-assign-item-remove" onClick={() => handleRemoveTrack(t._id)}>✕</button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right panel: lesson editor */}
      <div className="cm-right" style={{ position: 'relative' }}>
        {leftCollapsed && (
          <button
            onClick={() => setLeftCollapsed(false)}
            title="Show course structure"
            style={{
              position: 'absolute', top: '12px', left: '12px', zIndex: 10,
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              color: 'var(--text-secondary)', borderRadius: '6px',
              padding: '5px 10px', cursor: 'pointer', fontSize: '12px',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}
          >
            ☰ Course Structure
          </button>
        )}
        {selectedLesson ? (
          <LessonEditor
            lessonId={selectedLesson.isNew ? null : selectedLesson._id}
            partId={selectedLesson.partId}
            courseTitle={course.title}
            partTitle={selectedLesson.partTitle}
            onBack={() => setSelectedLesson(null)}
            onSaved={() => loadCourse()}
          />
        ) : (
          <div className="empty-state" style={{ height: '100%' }}>
            <div className="empty-state-icon">📝</div>
            <div className="empty-state-title">Select a lesson to edit</div>
            <div className="empty-state-desc">Click a lesson in the left panel, or click "New Lesson" to create one.</div>
          </div>
        )}
      </div>

      {showAssignModal && (
        <AssignModal
          courseId={courseId}
          allTracks={allTracks}
          onClose={() => setShowAssignModal(false)}
          onAssigned={loadCourse}
        />
      )}

      {showAddPartModal && (
        <AddPartModal
          courseId={courseId}
          onClose={() => setShowAddPartModal(false)}
          onCreated={loadCourse}
        />
      )}
    </div>
  );
}

export default CourseManager;
