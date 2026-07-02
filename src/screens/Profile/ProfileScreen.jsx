import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';
import { API_BASE_URL } from '../../../config';
import { authFetch } from '../../utils/authFetch';
import { getStreak, getQuizStats } from '../../utils/userStats';
import logo from '../../assets/logo.png';
import DevLoader from '../../components/DevLoader/DevLoader';
import './ProfileScreen.css';

/* ─── Static data ─── */
const KNOWN_COURSES = [
  { id: '6919f6286409cc0505808ac5', name: 'HTML',                   icon: '🌐', color: '#e34c26', slug: 'html/introduction-to-html' },
  { id: '6919f63e6409cc0505808ac7', name: 'CSS',                    icon: '🎨', color: '#264de4', slug: 'css/css-get-started' },
  { id: '6919f6516409cc0505808ac9', name: 'JavaScript',             icon: '⚡', color: '#e8a000', slug: 'javascript/variables-data-types' },
  { id: '693afba9252afa6fafc011af', name: 'Terminal / CLI',         icon: '💻', color: '#00897b', slug: 'terminal-command-line/terminal-basics-for-developers' },
  { id: '693afe6f252afa6fafc011ba', name: 'Git & GitHub',           icon: '🐙', color: '#e64a19', slug: 'git-and-github/introduction-to-git-and-github-version-control-essentials' },
  { id: '693c1db01270c2a321fa0356', name: 'Backend (Node/Express)', icon: '🚀', color: '#2e7d32', slug: 'backend-nodejs-express/introduction-to-nodejs-and-node-repl' },
  { id: '6a0ecfdc690db01f804cb1d5', name: 'SQL',                    icon: '🗄️', color: '#1565c0', slug: 'sql/every-app-runs-on-a-database' },
];

/* Fallback colors for tracks; unknown tracks get indigo */
const TRACK_COLORS = {
  'mern-stack':           '#7c3aed',
  'frontend-development': '#7b1fa2',
  'backend-development':  '#2e7d32',
  'data-analytics':       '#0277bd',
  'devops':               '#5d4037',
  'mean-stack':           '#0097a7',
};

/* ─── Progress ring ─── */
function ProgressRing({ pct, color, size = 52 }) {
  const r = size / 2 - 5;
  const circ = 2 * Math.PI * r;
  const offset = circ - (Math.min(pct, 100) / 100) * circ;
  return (
    <div className="pr-ring" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e5e7eb" strokeWidth="5" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}
          style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
      </svg>
      <span style={{ color }}>{Math.round(pct)}%</span>
    </div>
  );
}

/* ─── Card 3D tilt hook ─── */
function useCardTilt(maxDeg = 20) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 0.5, my: 0.5, on: false });

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const mx = Math.min(1, Math.max(0, (e.clientX - left) / width));
    const my = Math.min(1, Math.max(0, (e.clientY - top) / height));
    setTilt({ rx: (my - 0.5) * maxDeg, ry: (mx - 0.5) * -maxDeg, mx, my, on: true });
  }, [maxDeg]);

  const onLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0, mx: 0.5, my: 0.5, on: false });
  }, []);

  return { ref, tilt, onMove, onLeave };
}

/* ─── Quiz Pie Chart ─── */
function QuizPieChart({ correct, incorrect, attempted, tilt = {} }) {
  const { rx = 0, ry = 0, mx = 0.5, my = 0.5, on = false } = tilt;
  const SIZE = 196, STROKE = 22, EXTRUDE = 5;
  const r    = (SIZE - STROKE) / 2 - 8;
  const cx   = SIZE / 2, cy = SIZE / 2;
  const circ = 2 * Math.PI * r;
  const correctArc   = (correct   / attempted) * circ;
  const incorrectArc = (incorrect / attempted) * circ;
  const accuracy     = Math.round((correct / attempted) * 100);
  const rating = accuracy >= 90 ? { label: 'Excellent!', arrow: '↑', color: '#16a34a', bg: '#dcfce7' }
               : accuracy >= 75 ? { label: 'Great!',     arrow: '↑', color: '#16a34a', bg: '#dcfce7' }
               : accuracy >= 50 ? { label: 'Good',       arrow: '→', color: '#d97706', bg: '#fef3c7' }
               :                  { label: 'Keep Trying', arrow: '↓', color: '#dc2626', bg: '#fee2e2' };

  const spring = on
    ? 'transform 0.08s ease'
    : 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)';
  const dx = (mx - 0.5), dy = (my - 0.5);

  return (
    <div className="ps-qpc">
      {/* ── 3D Donut ── */}
      <div style={{ transform: `translate(${dx * -32}px, ${dy * -32}px)`, transition: spring }}>
        <div className="ps-qpc-chart-wrap" style={{
          width: SIZE, height: SIZE,
          transform: `perspective(520px) rotateX(${14 + rx * 0.35}deg) rotateY(${ry * 0.45}deg)`,
          transition: on ? 'transform 0.1s ease' : 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)',
        }}>
          <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}
            style={{ filter: 'drop-shadow(0 16px 28px rgba(0,0,0,0.24)) drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>
            <defs>
              <linearGradient id="qpc-green" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#16a34a" />
                <stop offset="100%" stopColor="#4ade80" />
              </linearGradient>
            </defs>
            {/* 3D extrusion — green shadow stack */}
            {Array.from({ length: EXTRUDE }, (_, i) => (
              <circle key={`eg${i}`} cx={cx} cy={cy + (EXTRUDE - i)} r={r} fill="none"
                stroke={`rgba(12, 100, 35, ${0.13 - i * 0.022})`}
                strokeWidth={STROKE}
                strokeDasharray={`${correctArc} ${circ - correctArc}`}
                strokeDashoffset={circ / 4}
              />
            ))}
            {/* 3D extrusion — red shadow stack */}
            {incorrect > 0 && Array.from({ length: EXTRUDE }, (_, i) => (
              <circle key={`er${i}`} cx={cx} cy={cy + (EXTRUDE - i)} r={r} fill="none"
                stroke={`rgba(160, 20, 20, ${0.13 - i * 0.022})`}
                strokeWidth={STROKE}
                strokeDasharray={`${incorrectArc} ${circ - incorrectArc}`}
                strokeDashoffset={circ / 4 - correctArc}
              />
            ))}
            {/* Track */}
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth={STROKE} />
            {/* Correct — green gradient */}
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="url(#qpc-green)" strokeWidth={STROKE}
              strokeDasharray={`${correctArc} ${circ - correctArc}`}
              strokeDashoffset={circ / 4}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 0.9s ease' }}
            />
            {/* Incorrect — red */}
            {incorrect > 0 && (
              <circle cx={cx} cy={cy} r={r} fill="none" stroke="#ef4444" strokeWidth={STROKE}
                strokeDasharray={`${incorrectArc} ${circ - incorrectArc}`}
                strokeDashoffset={circ / 4 - correctArc}
                strokeLinecap="round"
                style={{ transition: 'stroke-dasharray 0.9s ease' }}
              />
            )}
            {/* Inner specular highlight */}
            <circle cx={cx} cy={cy - 1} r={r} fill="none"
              stroke="rgba(255,255,255,0.18)" strokeWidth={STROKE - 8} />
          </svg>
          {/* Center overlay */}
          <div className="ps-qpc-center">
            <span className="ps-qpc-pct">{accuracy}%</span>
            <span className="ps-qpc-acc-lbl">Accuracy</span>
            <span className="ps-qpc-badge" style={{ color: rating.color, background: rating.bg }}>
              {rating.arrow} {rating.label}
            </span>
          </div>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="ps-qpc-stats"
        style={{ transform: `translate(${dx * -16}px, ${dy * -16}px)`, transition: spring }}>
        {[
          { icon: 'clipboard', label: 'Attempted', sub: 'Questions', val: attempted, cls: 'blue' },
          { icon: 'check',     label: 'Correct',   sub: 'Answers',   val: correct,   cls: 'green' },
          { icon: 'x',         label: 'Incorrect', sub: 'Answers',   val: incorrect, cls: 'red' },
        ].map(({ icon, label, sub, val, cls }) => (
          <div key={cls} className="ps-qpc-stat-card">
            <div className={`ps-qpc-stat-icon ps-qpc-icon-${cls}`}>
              {icon === 'clipboard' && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="8" y="2" width="8" height="4" rx="1"/>
                  <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/>
                  <line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/>
                </svg>
              )}
              {icon === 'check' && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
              {icon === 'x' && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              )}
            </div>
            <div className="ps-qpc-stat-body">
              <span className="ps-qpc-stat-title">{label}</span>
              <span className="ps-qpc-stat-sub">{sub}</span>
            </div>
            <span className={`ps-qpc-stat-num ps-qpc-num-${cls}`}>{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mini progress bar ─── */
function MiniBar({ pct, color }) {
  return (
    <div className="pr-mini-bar">
      <div className="pr-mini-fill" style={{ width: `${Math.min(pct, 100)}%`, background: color }} />
    </div>
  );
}

export default function ProfileScreen() {
  // Block Googlebot from indexing user-specific pages
  useSEO({ title: 'My Profile', noindex: true });

  const navigate = useNavigate();

  // Read user synchronously — no async flash, no useEffect needed for auth check.
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('userInfo');
    return raw ? JSON.parse(raw) : null;
  });

  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [nameSaving, setNameSaving] = useState(false);
  const [nameError, setNameError] = useState('');

  const [progress, setProgress] = useState({});            // { courseId: percent } — global / legacy
  const [trackProgress, setTrackProgress] = useState({}); // { [trackSlug]: { [courseId]: percent } }
  const [enrolledSlugs, setEnrolledSlugs] = useState([]);  // track slugs from API
  const [dbTracks, setDbTracks] = useState([]);             // all tracks from API
  const [loading, setLoading] = useState(true);
  // enrollLoading gates the full-page DevLoader — stays true until the
  // enrolled-tracks API call resolves (the first meaningful async wait).
  const [enrollLoading, setEnrollLoading] = useState(!!user);

  const { ref: quizCardRef, tilt: quizTilt, onMove: quizMove, onLeave: quizLeave } = useCardTilt(20);

  useLayoutEffect(() => { window.scrollTo(0, 0); }, []);

  // Redirect non-authenticated users immediately
  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  // Helper: if any API returns 401 (stale/deleted account), clear and redirect to login
  const handleAuthError = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    let done = 0;
    KNOWN_COURSES.forEach(async (c) => {
      try {
        const res = await authFetch(`${API_BASE_URL}/api/progress/courses/${c.id}`);
        if (res.status === 401) { handleAuthError(); return; }
        const data = await res.json();
        if (data?.percent != null) setProgress(p => ({ ...p, [c.id]: data.percent }));
      } catch { /* keep 0 */ } finally {
        done++;
        if (done === KNOWN_COURSES.length) setLoading(false);
      }
    });
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch all tracks from API so we're never limited by a hardcoded list
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/tracks`)
      .then(r => r.json())
      .then(d => { if (d.success) setDbTracks(d.data); })
      .catch(() => {});
  }, []);

  // Fetch explicitly enrolled tracks from API
  useEffect(() => {
    if (!user) return;
    authFetch(`${API_BASE_URL}/api/users/tracks/enrolled`)
      .then(r => {
        if (r.status === 401) { handleAuthError(); return null; }
        return r.json();
      })
      .then(d => {
        if (d?.success) setEnrolledSlugs(d.enrolledTracks || []);
        setEnrollLoading(false);
      })
      .catch(() => { setEnrollLoading(false); });
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch track-scoped progress for each enrolled track
  useEffect(() => {
    if (!user || enrolledSlugs.length === 0 || dbTracks.length === 0) return;
    enrolledSlugs.forEach(trackSlug => {
      const track = dbTracks.find(t => t.slug === trackSlug);
      if (!track) return;
      const courseIds = (track.courses || []).map(c => (typeof c === 'object' ? c._id?.toString() : c));
      courseIds.forEach(async (courseId) => {
        try {
          const res = await authFetch(
            `${API_BASE_URL}/api/progress/courses/${courseId}?trackSlug=${trackSlug}`
          );
          if (res.status === 401) { handleAuthError(); return; }
          const data = await res.json();
          if (data?.percent != null) {
            setTrackProgress(p => ({
              ...p,
              [trackSlug]: { ...(p[trackSlug] || {}), [courseId]: data.percent },
            }));
          }
        } catch { /* keep 0 */ }
      });
    });
  }, [user, enrolledSlugs, dbTracks]); // eslint-disable-line react-hooks/exhaustive-deps

  // Block render until both enrolled-tracks AND course-progress fetches have resolved.
  // enrollLoading: guards the enrolled tracks API call
  // loading: guards the course-progress API calls (7 parallel fetches)
  // Together they ensure the profile renders fully populated on first paint.
  if (!user || enrollLoading || loading) return <DevLoader />;

  /* ── Activity stats (localStorage) ── */
  const streak    = getStreak();
  const quizStats = getQuizStats(); // null if no quizzes taken yet

  /* ── Helpers ── */
  // Aggregate best progress for a course across global + all enrolled tracks
  const getCoursePct = (courseId) => {
    const globalPct = progress[courseId] ?? 0;
    const trackMax = enrolledSlugs.length > 0
      ? Math.max(0, ...enrolledSlugs.map(slug => trackProgress[slug]?.[courseId] ?? 0))
      : 0;
    return Math.max(globalPct, trackMax);
  };

  /* ── Derived stats ── */
  const started   = KNOWN_COURSES.filter(c => getCoursePct(c.id) > 0);
  const completed = KNOWN_COURSES.filter(c => getCoursePct(c.id) >= 100);
  // Build enrolled tracks from live API data — never limited by a hardcoded list
  const enrolledTracks = dbTracks
    .filter(t => enrolledSlugs.includes(t.slug))
    .map(t => ({
      ...t,
      color: TRACK_COLORS[t.slug] || '#6366f1',
      courseIds: (t.courses || []).map(c => (typeof c === 'object' ? c._id?.toString() : c)),
    }));

  // Overall progress = average of enrolled-track averages (track-scoped, not global).
  // Falls back to global course average only when user has no enrolled tracks.
  const overallPct = (() => {
    if (enrolledTracks.length > 0) {
      const trackAvgs = enrolledTracks.map(track => {
        const tProg = trackProgress[track.slug] || {};
        return track.courseIds.reduce((s, id) => s + (tProg[id] ?? 0), 0) / track.courseIds.length;
      });
      return Math.round(trackAvgs.reduce((s, v) => s + v, 0) / trackAvgs.length);
    }
    // No enrolled tracks — fall back to global average of started courses
    return started.length === 0 ? 0
      : Math.round(started.reduce((s, c) => s + getCoursePct(c.id), 0) / started.length);
  })();

  const startEditName = () => { setNameInput(user.name); setNameError(''); setEditingName(true); };
  const cancelEditName = () => { setEditingName(false); setNameError(''); };

  const handleSaveName = async () => {
    const trimmed = nameInput.trim();
    if (!trimmed) { setNameError('Name cannot be empty'); return; }
    if (trimmed === user.name) { setEditingName(false); return; }
    setNameSaving(true);
    setNameError('');
    try {
      const res = await authFetch(`${API_BASE_URL}/api/users/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmed }),
      });
      const data = await res.json();
      if (data.success) {
        const stored = JSON.parse(localStorage.getItem('userInfo'));
        stored.name = data.name;
        stored.token = data.token;
        localStorage.setItem('userInfo', JSON.stringify(stored));
        setUser(stored);
        setEditingName(false);
      } else {
        setNameError(data.error || 'Failed to update name');
      }
    } catch {
      setNameError('Network error. Try again.');
    } finally {
      setNameSaving(false);
    }
  };

  return (
    <div className="ps-screen">
      {/* ── Header ── */}
      <header className="ps-header">
        <button className="ps-back" onClick={() => navigate(-1)}>← Back</button>
        <Link to="/" className="ps-logo">
          <img src={logo} alt="Dev.EL" />
          <span>Dev<span className="ps-dot">.</span>EL</span>
        </Link>
        <div className="ps-header-right" />
      </header>

      {/* ── Hero / user card ── */}
      <section className="ps-hero">
        <div className="ps-avatar-wrap">
          {/* Ring is the outer container; avatar sits centred inside it */}
          <svg className="ps-avatar-ring-svg" viewBox="0 0 96 96" width="96" height="96">
            <circle cx="48" cy="48" r="44" fill="none" stroke="#e5e7eb" strokeWidth="4" />
            {overallPct > 0 && (
              <circle cx="48" cy="48" r="44" fill="none" stroke="#7c3aed" strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 44}`}
                strokeDashoffset={`${2 * Math.PI * 44 * (1 - overallPct / 100)}`}
                strokeLinecap="round" transform="rotate(-90 48 48)"
                style={{ transition: 'stroke-dashoffset 1s ease' }} />
            )}
          </svg>
          <div className="ps-avatar">{user.name.charAt(0).toUpperCase()}</div>
        </div>
        <div className="ps-user-info">
          {editingName ? (
            <div className="ps-name-edit">
              <input
                className="ps-name-input"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleSaveName();
                  if (e.key === 'Escape') cancelEditName();
                }}
                autoFocus
                maxLength={50}
              />
              <div className="ps-name-actions">
                <button className="ps-name-save" onClick={handleSaveName} disabled={nameSaving}>
                  {nameSaving ? 'Saving…' : 'Save'}
                </button>
                <button className="ps-name-cancel" onClick={cancelEditName}>Cancel</button>
              </div>
              {nameError && <span className="ps-name-error">{nameError}</span>}
            </div>
          ) : (
            <div className="ps-name-row">
              <h1 className="ps-name">{user.name}</h1>
              <button className="ps-name-edit-btn" onClick={startEditName} title="Edit name">✏️</button>
            </div>
          )}
          <p className="ps-email">{user.email}</p>
          <span className={`ps-role-badge ${user.role === 'admin' ? 'admin' : ''}`}>
            {user.role === 'admin' ? '⚡ Admin' : '🎓 Learner'}
          </span>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="ps-stats-bar">
        <div className="ps-stat">
          <span className="ps-stat-num">{started.length}</span>
          <span className="ps-stat-label">Courses Started</span>
        </div>
        <div className="ps-stat-sep" />
        <div className="ps-stat">
          <span className="ps-stat-num">{completed.length}</span>
          <span className="ps-stat-label">Completed</span>
        </div>
        <div className="ps-stat-sep" />
        <div className="ps-stat">
          <span className="ps-stat-num">{enrolledTracks.length}</span>
          <span className="ps-stat-label">Tracks Enrolled</span>
        </div>
        <div className="ps-stat-sep" />
        <div className="ps-stat">
          <span className="ps-stat-num">{overallPct}%</span>
          <span className="ps-stat-label">Overall Progress</span>
        </div>
      </section>

      {/* ── Streak ── */}
      <section className="ps-activity-bar">
        <div className="ps-activity-card ps-streak-card">
          <span className="ps-activity-icon">🔥</span>
          <div className="ps-activity-body">
            <span className="ps-activity-num">{streak}</span>
            <span className="ps-activity-label">Day Streak</span>
          </div>
          <div className="ps-activity-sub">
            {streak === 0
              ? 'Complete a lesson to start'
              : streak === 1
              ? 'Keep it up!'
              : `${streak} days in a row!`}
          </div>
        </div>
      </section>

      {/* ── Quiz Performance ── */}
      <section className="ps-quiz-section">
        <div
          ref={quizCardRef}
          className="ps-quiz-perf-card"
          onMouseMove={quizMove}
          onMouseLeave={quizLeave}
          style={{
            transform: `perspective(1000px) rotateX(${quizTilt.rx}deg) rotateY(${quizTilt.ry}deg) scale3d(${quizTilt.on ? 1.015 : 1}, ${quizTilt.on ? 1.015 : 1}, 1)`,
            boxShadow: quizTilt.on
              ? `${quizTilt.ry * -0.8}px ${quizTilt.rx * 0.8}px 56px rgba(0,0,0,0.18), 0 8px 32px rgba(0,0,0,0.1)`
              : '0 4px 24px rgba(0,0,0,0.06)',
            transition: quizTilt.on
              ? 'transform 0.08s ease, box-shadow 0.08s ease'
              : 'transform 0.7s cubic-bezier(0.23,1,0.32,1), box-shadow 0.7s ease',
          }}
        >
          {/* Glare overlay */}
          <div className="ps-quiz-glare" style={{
            background: `radial-gradient(circle at ${quizTilt.mx * 100}% ${quizTilt.my * 100}%, rgba(255,255,255,0.28) 0%, transparent 60%)`,
            opacity: quizTilt.on ? 1 : 0,
          }} />

          {/* Header with parallax */}
          <div className="ps-quiz-perf-header" style={{
            transform: `translate(${(quizTilt.mx - 0.5) * -14}px, ${(quizTilt.my - 0.5) * -14}px)`,
            transition: quizTilt.on ? 'transform 0.08s ease' : 'transform 0.7s cubic-bezier(0.23,1,0.32,1)',
          }}>
            <div className="ps-quiz-brain-icon">🧠</div>
            <div className="ps-quiz-perf-title-wrap">
              <h2 className="ps-quiz-perf-title">Quiz Performance</h2>
              <p className="ps-quiz-perf-sub">Track your progress and keep improving!</p>
            </div>
          </div>

          {quizStats
            ? <QuizPieChart {...quizStats} tilt={quizTilt} />
            : (
              <div className="ps-quiz-perf-empty">
                <span className="ps-quiz-perf-empty-icon">📝</span>
                <p>No quiz attempts yet — complete a lesson quiz to see your stats here.</p>
              </div>
            )
          }
        </div>
      </section>

      {/* ── Enrolled tracks ── */}
      {enrolledTracks.length > 0 && (
        <section className="ps-section">
          <div className="ps-section-header">
            <h2 className="ps-section-title">My Learning Tracks</h2>
            <span className="ps-section-sub">{enrolledTracks.length} active track{enrolledTracks.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="ps-tracks-grid">
            {enrolledTracks.map(track => {
              const tProg = trackProgress[track.slug] || {};
              const avgPct = Math.round(
                track.courseIds.reduce((s, id) => s + (tProg[id] ?? 0), 0) / track.courseIds.length
              );
              const doneCourses = track.courseIds.filter(id => (tProg[id] ?? 0) >= 100).length;
              return (
                <div key={track.slug} className="ps-track-card" onClick={() => navigate(`/track/${track.slug}`)}>
                  <div className="ps-track-icon" style={{ background: `${track.color}18`, color: track.color }}>{track.icon}</div>
                  <div className="ps-track-body">
                    <h3 className="ps-track-name">{track.name}</h3>
                    <p className="ps-track-meta">{doneCourses}/{track.courseIds.length} courses complete</p>
                    <MiniBar pct={avgPct} color={track.color} />
                  </div>
                  <ProgressRing pct={avgPct} color={track.color} size={52} />
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Course progress grid ── */}
      <section className="ps-section">
        <div className="ps-section-header">
          <h2 className="ps-section-title">Course Progress</h2>
          {loading && <span className="ps-loading-pill">⏳ Fetching progress…</span>}
        </div>
        <div className="ps-courses-grid">
          {KNOWN_COURSES.map(c => {
            const pct = getCoursePct(c.id);
            const status = pct >= 100 ? 'completed' : pct > 0 ? 'in-progress' : 'not-started';
            return (
              <div
                key={c.id}
                className={`ps-course-card ${status}`}
              >
                <div className="ps-course-icon" style={{ background: `${c.color}15`, color: c.color }}>{c.icon}</div>
                <div className="ps-course-info">
                  <h3 className="ps-course-name">{c.name}</h3>
                  <MiniBar pct={pct} color={pct > 0 ? c.color : '#e5e7eb'} />
                  <span className="ps-course-pct">
                    {pct >= 100 ? '✓ Completed' : pct > 0 ? `${Math.round(pct)}% complete` : 'Not started'}
                  </span>
                </div>
                <ProgressRing pct={pct} color={pct > 0 ? c.color : '#e5e7eb'} size={44} />
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Empty state for new users ── */}
      {started.length === 0 && !loading && !enrollLoading && enrolledSlugs.length === 0 && (
        <div className="ps-empty">
          <div className="ps-empty-icon">🚀</div>
          <h3>You haven't started any courses yet</h3>
          <p>Pick a track and start your learning journey today!</p>
          <button className="ps-start-btn" onClick={() => navigate('/')}>Explore Tracks →</button>
        </div>
      )}
    </div>
  );
}
