import { useState, useEffect } from 'react';
import LessonEditor from './LessonEditor';
import { API_BASE_URL } from '../../config';

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

  const togglePart = (partId) => setExpandedParts(prev => ({ ...prev, [partId]: !prev[partId] }));

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
                    <div className="cm-part-header" onClick={() => togglePart(part._id)}>
                      <div className="cm-part-num">{pi + 1}</div>
                      <span style={{ flex: 1 }}>{part.title}</span>
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
                          part.lessons.map(lesson => (
                            <div
                              key={lesson._id}
                              className={`cm-lesson-item ${selectedLesson?._id === lesson._id ? 'selected' : ''}`}
                              onClick={() => setSelectedLesson({ ...lesson, partId: part._id, partTitle: part.title })}
                            >
                              <div className="cm-lesson-dot" />
                              {lesson.title}
                              {lesson.status === 'published' && (
                                <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'var(--green)' }}>●</span>
                              )}
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
