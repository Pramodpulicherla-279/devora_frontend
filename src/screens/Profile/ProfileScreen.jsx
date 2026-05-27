import { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { API_BASE_URL } from '../../../config';
import logo from '../../assets/logo.png';
import './ProfileScreen.css';

/* ─── Static data ─── */
const KNOWN_COURSES = [
  { id: '6919f6286409cc0505808ac5', name: 'HTML',                   icon: '🌐', color: '#e34c26', slug: 'html/introduction-to-html' },
  { id: '6919f63e6409cc0505808ac7', name: 'CSS',                    icon: '🎨', color: '#264de4', slug: 'css/css-get-started' },
  { id: '6919f6516409cc0505808ac9', name: 'JavaScript',             icon: '⚡', color: '#e8a000', slug: 'javascript/variables-data-types' },
  { id: '693afba9252afa6fafc011af', name: 'Terminal / CLI',         icon: '💻', color: '#00897b', slug: 'terminal-command-line/terminal-basics-for-developers' },
  { id: '693afe6f252afa6fafc011ba', name: 'Git & GitHub',           icon: '🐙', color: '#e64a19', slug: 'git-and-github/introduction-to-git-and-github-version-control-essentials' },
  { id: '693c1db01270c2a321fa0356', name: 'Backend (Node/Express)', icon: '🚀', color: '#2e7d32', slug: 'backend-nodejs-express/introduction-to-nodejs-and-node-repl' },
  { id: '6a0ecfdc690db01f804cb1d5', name: 'SQL',                    icon: '🗄️', color: '#1565c0', slug: 'sql/introduction-to-sql-and-databases' },
];

const KNOWN_TRACKS = [
  { name: 'MERN Stack',           icon: '🧩', color: '#7c3aed', slug: 'mern-stack',           courseIds: ['6919f6286409cc0505808ac5','6919f63e6409cc0505808ac7','6919f6516409cc0505808ac9','693afba9252afa6fafc011af','693afe6f252afa6fafc011ba','693c1db01270c2a321fa0356'] },
  { name: 'Frontend Development', icon: '🎨', color: '#7b1fa2', slug: 'frontend-development',  courseIds: ['6919f6286409cc0505808ac5','6919f63e6409cc0505808ac7','6919f6516409cc0505808ac9'] },
  { name: 'Backend Development',  icon: '⚙️', color: '#2e7d32', slug: 'backend-development',   courseIds: ['693c1db01270c2a321fa0356','693afba9252afa6fafc011af','693afe6f252afa6fafc011ba'] },
  { name: 'Data Analytics',       icon: '📊', color: '#0277bd', slug: 'data-analytics',        courseIds: ['6a0ecfdc690db01f804cb1d5'] },
  { name: 'DevOps',               icon: '🛠️', color: '#5d4037', slug: 'devops',                courseIds: ['693afba9252afa6fafc011af','693afe6f252afa6fafc011ba'] },
];

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

/* ─── Mini progress bar ─── */
function MiniBar({ pct, color }) {
  return (
    <div className="pr-mini-bar">
      <div className="pr-mini-fill" style={{ width: `${Math.min(pct, 100)}%`, background: color }} />
    </div>
  );
}

export default function ProfileScreen() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState({});       // { courseId: percent }
  const [enrolledSlugs, setEnrolledSlugs] = useState([]); // track slugs from API
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const raw = localStorage.getItem('userInfo');
    if (!raw) { navigate('/'); return; }
    setUser(JSON.parse(raw));
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    let done = 0;
    KNOWN_COURSES.forEach(async (c) => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/progress/courses/${c.id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json();
        if (data?.percent != null) setProgress(p => ({ ...p, [c.id]: data.percent }));
      } catch { /* keep 0 */ } finally {
        done++;
        if (done === KNOWN_COURSES.length) setLoading(false);
      }
    });
  }, [user]);

  // Fetch explicitly enrolled tracks from API
  useEffect(() => {
    if (!user) return;
    fetch(`${API_BASE_URL}/api/users/tracks/enrolled`, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then(r => r.json())
      .then(d => { if (d.success) setEnrolledSlugs(d.enrolledTracks || []); })
      .catch(() => {});
  }, [user]);

  if (!user) return null;

  /* ── Derived stats ── */
  const started   = KNOWN_COURSES.filter(c => (progress[c.id] ?? 0) > 0);
  const completed = KNOWN_COURSES.filter(c => (progress[c.id] ?? 0) >= 100);
  // Use explicitly enrolled tracks from API (not inferred from progress)
  const enrolledTracks = KNOWN_TRACKS.filter(t => enrolledSlugs.includes(t.slug));
  const overallPct = started.length === 0 ? 0 :
    Math.round(started.reduce((s, c) => s + (progress[c.id] ?? 0), 0) / started.length);

  return (
    <div className="ps-screen">
      <Helmet><title>My Profile — Dev.EL</title></Helmet>

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
          <h1 className="ps-name">{user.name}</h1>
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

      {/* ── Enrolled tracks ── */}
      {enrolledTracks.length > 0 && (
        <section className="ps-section">
          <div className="ps-section-header">
            <h2 className="ps-section-title">My Learning Tracks</h2>
            <span className="ps-section-sub">{enrolledTracks.length} active track{enrolledTracks.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="ps-tracks-grid">
            {enrolledTracks.map(track => {
              const avgPct = Math.round(
                track.courseIds.reduce((s, id) => s + (progress[id] ?? 0), 0) / track.courseIds.length
              );
              const doneCourses = track.courseIds.filter(id => (progress[id] ?? 0) >= 100).length;
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
            const pct = progress[c.id] ?? 0;
            const status = pct >= 100 ? 'completed' : pct > 0 ? 'in-progress' : 'not-started';
            return (
              <div
                key={c.id}
                className={`ps-course-card ${status}`}
                onClick={() => navigate(`/course/${c.slug}`)}
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
      {started.length === 0 && !loading && (
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
