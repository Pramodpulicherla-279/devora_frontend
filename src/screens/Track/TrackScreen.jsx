import { useState, useEffect, useLayoutEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';
import { API_BASE_URL } from '../../../config';
import { authFetch } from '../../utils/authFetch';
import logo from '../../assets/logo.png';
import TrackScene3D from './TrackScene3D';
import DevLoader from '../../components/DevLoader/DevLoader';
import './TrackScreen.css';

/* ─── Track meta: color palette, tagline, 3D nodes, skills ─── */
const TRACK_META = {
  'MERN Stack': {
    color: '#7c3aed', accent: '#22d3ee',
    tagline: 'Build full-stack JavaScript apps end-to-end',
    icon: '🧩',
    nodes: [
      { label: 'MongoDB', icon: '🍃', color: '#22c55e' },
      { label: 'Express', icon: '🚂', color: '#64748b' },
      { label: 'React',   icon: '⚛️', color: '#22d3ee' },
      { label: 'Node.js', icon: '🟢', color: '#16a34a' },
      { label: 'REST API',icon: '🔌', color: '#f59e0b' },
      { label: 'JWT Auth',icon: '🔐', color: '#a855f7' },
    ],
    skills: [
      { icon: '🏗️', label: 'Build production-grade REST APIs' },
      { icon: '⚛️', label: 'Design responsive React UIs with hooks' },
      { icon: '🍃', label: 'Model & query data in MongoDB' },
      { icon: '🔐', label: 'Implement secure JWT authentication' },
      { icon: '🚀', label: 'Deploy full-stack apps to the cloud' },
      { icon: '🧪', label: 'Write tests for both API and UI layers' },
    ],
  },
  'Mern Stack': null, // alias, filled below
  'MEAN Stack': {
    color: '#1565c0', accent: '#42a5f5',
    tagline: 'Enterprise-grade full-stack with Angular',
    icon: '🔷',
    nodes: [
      { label: 'MongoDB', icon: '🍃', color: '#22c55e' },
      { label: 'Express', icon: '🚂', color: '#64748b' },
      { label: 'Angular', icon: '🅰️', color: '#dd0031' },
      { label: 'Node.js', icon: '🟢', color: '#16a34a' },
      { label: 'TypeScript', icon: '📘', color: '#3178c6' },
      { label: 'RxJS', icon: '🔁', color: '#b7178c' },
    ],
    skills: [
      { icon: '🅰️', label: 'Master Angular components & services' },
      { icon: '📘', label: 'Write type-safe code with TypeScript' },
      { icon: '🔁', label: 'Handle async streams with RxJS' },
      { icon: '🍃', label: 'Build scalable MongoDB schemas' },
      { icon: '🏢', label: 'Architect enterprise-grade applications' },
      { icon: '🚀', label: 'Ship production-ready full-stack apps' },
    ],
  },
  'Frontend Development': {
    color: '#7b1fa2', accent: '#ec4899',
    tagline: 'Craft beautiful, responsive interfaces',
    icon: '🎨',
    nodes: [
      { label: 'HTML',       icon: '🌐', color: '#e34c26' },
      { label: 'CSS',        icon: '🎨', color: '#264de4' },
      { label: 'JavaScript', icon: '⚡', color: '#f0db4f' },
      { label: 'React',      icon: '⚛️', color: '#22d3ee' },
      { label: 'Tailwind',   icon: '💨', color: '#06b6d4' },
      { label: 'Vite',       icon: '⚡', color: '#a855f7' },
    ],
    skills: [
      { icon: '🎨', label: 'Design pixel-perfect, responsive layouts' },
      { icon: '⚡', label: 'Build interactive UIs with JavaScript' },
      { icon: '⚛️', label: 'Compose reusable React components' },
      { icon: '📱', label: 'Make apps work across every device' },
      { icon: '🎭', label: 'Add smooth animations and transitions' },
      { icon: '♿', label: 'Ship accessible, performant web apps' },
    ],
  },
  'Backend Development': {
    color: '#2e7d32', accent: '#84cc16',
    tagline: 'Build robust servers, APIs and data layers',
    icon: '⚙️',
    nodes: [
      { label: 'Node.js',  icon: '🟢', color: '#16a34a' },
      { label: 'Express',  icon: '🚂', color: '#64748b' },
      { label: 'MongoDB',  icon: '🍃', color: '#22c55e' },
      { label: 'REST API', icon: '🔌', color: '#f59e0b' },
      { label: 'JWT',      icon: '🔐', color: '#a855f7' },
      { label: 'Docker',   icon: '🐳', color: '#0ea5e9' },
    ],
    skills: [
      { icon: '🔌', label: 'Design RESTful APIs that scale' },
      { icon: '🗄️', label: 'Model and query databases efficiently' },
      { icon: '🔐', label: 'Implement secure authentication' },
      { icon: '⚡', label: 'Optimize performance & caching' },
      { icon: '🐳', label: 'Containerize and deploy services' },
      { icon: '📊', label: 'Monitor and debug production systems' },
    ],
  },
  'Data Analytics': {
    color: '#0277bd', accent: '#06b6d4',
    tagline: 'Turn raw data into insights and decisions',
    icon: '📊',
    nodes: [
      { label: 'SQL',       icon: '🗄️', color: '#1565c0' },
      { label: 'Python',    icon: '🐍', color: '#facc15' },
      { label: 'Pandas',    icon: '🐼', color: '#a855f7' },
      { label: 'Power BI',  icon: '📊', color: '#f59e0b' },
      { label: 'Excel',     icon: '📈', color: '#22c55e' },
      { label: 'Stats',     icon: '📐', color: '#ec4899' },
    ],
    skills: [
      { icon: '🗄️', label: 'Query data fluently with SQL' },
      { icon: '🐍', label: 'Process datasets with Python & Pandas' },
      { icon: '📊', label: 'Build compelling dashboards' },
      { icon: '📐', label: 'Apply statistical analysis correctly' },
      { icon: '🧹', label: 'Clean and transform messy data' },
      { icon: '💡', label: 'Tell stories with data visualization' },
    ],
  },
  'DevOps': {
    color: '#5d4037', accent: '#fb923c',
    tagline: 'Ship faster with automation and reliability',
    icon: '🛠️',
    nodes: [
      { label: 'Git',         icon: '🐙', color: '#e64a19' },
      { label: 'Docker',      icon: '🐳', color: '#0ea5e9' },
      { label: 'CI/CD',       icon: '🔄', color: '#22c55e' },
      { label: 'Linux',       icon: '🐧', color: '#facc15' },
      { label: 'Kubernetes',  icon: '☸️', color: '#3b82f6' },
      { label: 'Monitoring',  icon: '📡', color: '#ec4899' },
    ],
    skills: [
      { icon: '🐙', label: 'Master Git workflows and collaboration' },
      { icon: '🐳', label: 'Containerize apps with Docker' },
      { icon: '🔄', label: 'Set up CI/CD pipelines' },
      { icon: '☁️', label: 'Deploy to cloud providers' },
      { icon: '📡', label: 'Monitor and alert on production systems' },
      { icon: '🛡️', label: 'Implement infrastructure as code' },
    ],
  },
};
TRACK_META['Mern Stack'] = TRACK_META['MERN Stack'];

const DEFAULT_META = {
  color: '#6366f1', accent: '#a78bfa',
  tagline: 'Master this track step by step',
  icon: '🛤️',
  nodes: [
    { label: 'Concepts', icon: '💡', color: '#f59e0b' },
    { label: 'Practice', icon: '🛠️', color: '#22c55e' },
    { label: 'Projects', icon: '🚀', color: '#ec4899' },
    { label: 'Skills',   icon: '🎯', color: '#22d3ee' },
  ],
  skills: [
    { icon: '💡', label: 'Learn core concepts step by step' },
    { icon: '🛠️', label: 'Practice with hands-on exercises' },
    { icon: '🚀', label: 'Build real-world projects' },
    { icon: '🎯', label: 'Master in-demand skills' },
  ],
};

/* ─── Static track data — instant render, no API cold-start wait ─── */
// Keyed by slug AND _id so both URL formats work:
//   /track/mern-stack          (if DB row has a slug)
//   /track/6a11ee5865bcdb08d4ee66b3  (if no slug)
const _mernCourses = [
  { _id: '6919f6286409cc0505808ac5', title: 'HTML',                    slug: 'html',                  status: 'published', parts: [] },
  { _id: '6919f63e6409cc0505808ac7', title: 'CSS',                     slug: 'css',                   status: 'published', parts: [] },
  { _id: '6919f6516409cc0505808ac9', title: 'JavaScript',              slug: 'javascript',             status: 'published', parts: [] },
  { _id: '693afba9252afa6fafc011af', title: 'Terminal / CLI',          slug: 'terminal-command-line',  status: 'published', parts: [] },
  { _id: '693afe6f252afa6fafc011ba', title: 'Git & GitHub',            slug: 'git-and-github',         status: 'published', parts: [] },
  { _id: '693c1db01270c2a321fa0356', title: 'Backend (Node / Express)',slug: 'backend-nodejs-express', status: 'published', parts: [] },
];

const _frontendCourses = [
  { _id: '6919f6286409cc0505808ac5', title: 'HTML',       slug: 'html',       status: 'published', parts: [] },
  { _id: '6919f63e6409cc0505808ac7', title: 'CSS',        slug: 'css',        status: 'published', parts: [] },
  { _id: '6919f6516409cc0505808ac9', title: 'JavaScript', slug: 'javascript', status: 'published', parts: [] },
];

const _backendCourses = [
  { _id: '693c1db01270c2a321fa0356', title: 'Backend (Node / Express)', slug: 'backend-nodejs-express',           status: 'published', parts: [] },
  { _id: '693afba9252afa6fafc011af', title: 'Terminal / CLI',           slug: 'terminal-command-line',             status: 'published', parts: [] },
  { _id: '693afe6f252afa6fafc011ba', title: 'Git & GitHub',             slug: 'git-and-github',                    status: 'published', parts: [] },
];

const _analyticsCourses = [
  { _id: '6a0ecfdc690db01f804cb1d5', title: 'SQL', slug: 'sql', status: 'published', parts: [] },
];

const _devopsCourses = [
  { _id: '693afba9252afa6fafc011af', title: 'Terminal / CLI', slug: 'terminal-command-line', status: 'published', parts: [] },
  { _id: '693afe6f252afa6fafc011ba', title: 'Git & GitHub',   slug: 'git-and-github',        status: 'published', parts: [] },
];

const STATIC_TRACKS = {};

// helper to register under multiple keys
function _reg(keys, data) { keys.forEach(k => { STATIC_TRACKS[k] = data; }); }

_reg(['mern-stack', '6a11ee5865bcdb08d4ee66b3'], {
  _id: '6a11ee5865bcdb08d4ee66b3', name: 'MERN Stack', slug: 'mern-stack',
  type: 'Full Stack',
  description: 'Build full-stack JavaScript applications with MongoDB, Express, React and Node.js.',
  courses: _mernCourses,
});
_reg(['mean-stack'], {
  _id: null, name: 'MEAN Stack', slug: 'mean-stack',
  type: 'Full Stack',
  description: 'Enterprise-grade full-stack development with MongoDB, Express, Angular and Node.js.',
  courses: _mernCourses, // same base courses; Angular replaces React in meta
});
_reg(['frontend-development'], {
  _id: null, name: 'Frontend Development', slug: 'frontend-development',
  type: 'Frontend',
  description: 'Craft beautiful, accessible and responsive user interfaces from scratch.',
  courses: _frontendCourses,
});
_reg(['backend-development'], {
  _id: null, name: 'Backend Development', slug: 'backend-development',
  type: 'Backend',
  description: 'Build robust servers, REST APIs and data layers that power modern apps.',
  courses: _backendCourses,
});
_reg(['data-analytics'], {
  _id: null, name: 'Data Analytics', slug: 'data-analytics',
  type: 'Data',
  description: 'Turn raw data into insights and data-driven decisions with SQL, Python and Power BI.',
  courses: _analyticsCourses,
});
_reg(['devops'], {
  _id: null, name: 'DevOps', slug: 'devops',
  type: 'DevOps',
  description: 'Ship faster and more reliably with CI/CD, Docker, Kubernetes and cloud automation.',
  courses: _devopsCourses,
});

/* ─── Reverse map: courseId → [{name, slug}] across all tracks ─── */
// Built once at module load — powers the "already in progress" floating badge.
const COURSE_TO_TRACKS = (() => {
  const map = {};
  const seen = new Set();
  Object.values(STATIC_TRACKS).forEach(t => {
    if (!t || seen.has(t.slug)) return;
    seen.add(t.slug);
    (t.courses || []).forEach(c => {
      if (!map[c._id]) map[c._id] = [];
      map[c._id].push({ name: t.name, slug: t.slug });
    });
  });
  return map;
})();

/* ─── Course icon/color enrichment for static courses ─── */
const STATIC_COURSE_META = {
  '6919f6286409cc0505808ac5': { icon: '🌐', color: '#e34c26', desc: 'Build the structure of websites with clean, semantic markup.', slug: 'html/introduction-to-html' },
  '6919f63e6409cc0505808ac7': { icon: '🎨', color: '#264de4', desc: 'Style and design beautiful, responsive web pages.',           slug: 'css/css-get-started' },
  '6919f6516409cc0505808ac9': { icon: '⚡', color: '#e8a000', desc: 'Add interactivity, logic, and dynamic behavior.',              slug: 'javascript/variables-data-types' },
  '693afba9252afa6fafc011af': { icon: '💻', color: '#00897b', desc: 'Control your system efficiently with essential CLI commands.', slug: 'terminal-command-line/terminal-basics-for-developers' },
  '693afe6f252afa6fafc011ba': { icon: '🐙', color: '#e64a19', desc: 'Track changes, collaborate with teams, and manage code.',      slug: 'git-and-github/introduction-to-git-and-github-version-control-essentials' },
  '693c1db01270c2a321fa0356': { icon: '🚀', color: '#2e7d32', desc: 'Power your application with APIs, servers, and business logic.', slug: 'backend-nodejs-express/introduction-to-nodejs-and-node-repl' },
  '6a0ecfdc690db01f804cb1d5': { icon: '🗄️', color: '#1565c0', desc: 'Hands-on guide to mastering Structured Query Language.',      slug: 'sql/every-app-runs-on-a-database' },
};

/* ─── Animated counter ─── */
function useCountUp(target, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf, start;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

function StatNum({ value }) {
  const n = useCountUp(value || 0);
  return <span className="ts-stat-num">{n}</span>;
}

/* ─── Circular progress ring (used in hero progress card) ─── */
function ProgressRing({ pct, color, size = 56 }) {
  const r = (size / 2) - 5, circ = 2 * Math.PI * r;
  return (
    <div className="ts-ring" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e5e7eb" strokeWidth="5" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={circ} strokeDashoffset={circ - (pct / 100) * circ}
          strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`}
          style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
      </svg>
      <span style={{ color }}>{Math.round(pct)}%</span>
    </div>
  );
}

export default function TrackScreen() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Static seed provides instant fallback content if the API fails.
  // loading always starts true — resolved only when the API responds.
  const staticSeed = STATIC_TRACKS[slug] || null;
  const [track, setTrack] = useState(staticSeed);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Read user synchronously from localStorage — no async flash
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('userInfo');
    return raw ? JSON.parse(raw) : null;
  });
  const [courseProgress, setCourseProgress] = useState({});
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);

  // Reset scroll before first paint — no visible jump
  useLayoutEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    // Always fetch fresh data from the API.
    // loading=true until the response arrives; static seed is the fallback
    // if the API fails (network error, cold-start, etc.).
    setLoading(true);
    fetch(`${API_BASE_URL}/api/tracks/${slug}`)
      .then(r => r.json())
      .then(d => {
        if (d.success) setTrack(d.data);
        else if (!staticSeed) setError(d.error || 'Track not found');
        // if we have static seed and API errored, keep showing static data silently
      })
      .catch(() => { if (!staticSeed) setError('Failed to load track'); })
      .finally(() => setLoading(false));
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  // Persist canonical track slug in localStorage so the lesson page can scope its progress records
  useEffect(() => {
    const canonicalSlug = staticSeed?.slug || slug;
    localStorage.setItem('currentTrackSlug', canonicalSlug);
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!user || !track?.courses) return;
    const trackSlug = track.slug || slug; // canonical slug (never the MongoDB ID)
    track.courses.forEach(async (c) => {
      try {
        const res = await authFetch(`${API_BASE_URL}/api/progress/courses/${c._id}?trackSlug=${trackSlug}`);
        const data = await res.json();
        if (data?.percent != null) setCourseProgress(p => ({ ...p, [c._id]: data.percent }));
      } catch { }
    });
  }, [user, track]);

  // Fetch enrollment status
  useEffect(() => {
    if (!user) return;
    authFetch(`${API_BASE_URL}/api/users/tracks/enrolled`)
      .then(r => r.json())
      .then(d => {
        if (d.success) setIsEnrolled((d.enrolledTracks || []).includes(slug));
      })
      .catch(() => {});
  }, [user, slug]);

  const handleEnroll = async () => {
    if (!user) { navigate('/'); return; }
    setEnrollLoading(true);
    try {
      const res = await authFetch(`${API_BASE_URL}/api/users/tracks/enroll`, {
        method: 'POST',
        body: JSON.stringify({ slug, action: 'enroll' }),
      });
      const data = await res.json();
      if (data.success) setIsEnrolled((data.enrolledTracks || []).includes(slug));
    } catch { }
    setEnrollLoading(false);
  };

  const handleLeaveTrack = async () => {
    setShowLeaveConfirm(false);
    setEnrollLoading(true);
    try {
      const [unenrollRes] = await Promise.all([
        authFetch(`${API_BASE_URL}/api/users/tracks/enroll`, {
          method: 'POST',
          body: JSON.stringify({ slug, action: 'unenroll' }),
        }),
        authFetch(`${API_BASE_URL}/api/progress/tracks/${slug}`, { method: 'DELETE' }),
      ]);
      const data = await unenrollRes.json();
      if (data.success) {
        setIsEnrolled(false);
        setCourseProgress({});
      }
    } catch { }
    setEnrollLoading(false);
  };

  // ── SEO — must be called unconditionally, before any early returns ────────
  useSEO({
    title:       track ? `${track.name} Learning Track — Dev.EL` : null,
    description: track
      ? `${track.description || (TRACK_META[track.name] || DEFAULT_META).tagline || ''} Learn with free interactive lessons, quizzes, and live coding on Dev.EL.`
      : null,
    canonical:   `/track/${slug}`,
    jsonLd: track
      ? [{
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home',     item: 'https://www.dev-el.co/' },
            { '@type': 'ListItem', position: 2, name: track.name, item: `https://www.dev-el.co/track/${slug}` },
          ],
        }]
      : null,
  });
  // ─────────────────────────────────────────────────────────────────────────

  if (loading) return <DevLoader />;

  if (error || !track) {
    return (
      <div className="ts-error">
        <div className="ts-error-icon">⚠️</div>
        <h2>Track not found</h2>
        <p>{error || 'This track does not exist or has been removed.'}</p>
        <button className="ts-btn-primary" onClick={() => navigate('/')}>← Back to Home</button>
      </div>
    );
  }

  const meta = TRACK_META[track.name] || DEFAULT_META;
  const totalLessons = (track.courses || []).reduce((sum, c) =>
    sum + ((c.parts || []).reduce((s, p) => s + (p.lessons?.length || 0), 0)), 0);
  const totalParts = (track.courses || []).reduce((sum, c) => sum + (c.parts?.length || 0), 0);
  const completedCount = (track.courses || []).filter(c => (courseProgress[c._id] ?? 0) >= 100).length;
  const overallPct = (track.courses?.length || 0) > 0
    ? Math.round((track.courses).reduce((s, c) => s + (courseProgress[c._id] ?? 0), 0) / track.courses.length)
    : 0;

  const handleCourseClick = (course) => {
    const cmeta = STATIC_COURSE_META[course._id?.toString()];
    const goSlug = cmeta?.slug || course.slug;
    if (goSlug) {
      localStorage.setItem('lastTrackSlug', staticSeed?.slug || slug);
      navigate(`/course/${goSlug}`);
    }
  };

  return (
    <div className="ts-screen" style={{ '--tc': meta.color, '--ta': meta.accent }}>
      {/* Header */}
      <header className="ts-header">
        <button className="ts-back" onClick={() => navigate('/')}>
          <span className="ts-back-arrow">←</span> Back
        </button>
        <Link to="/" className="ts-logo">
          <img src={logo} alt="Dev.EL" />
          <span>Dev<span style={{ color: meta.color }}>.</span>EL</span>
        </Link>
        <div className="ts-header-right">
          {user ? (
            <div className="ts-user" style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')}>
              <div className="ts-avatar" style={{ background: `linear-gradient(135deg, ${meta.color}, ${meta.accent})` }}>{user.name.charAt(0).toUpperCase()}</div>
              <span>{user.name}</span>
            </div>
          ) : (
            <button className="ts-btn-primary" onClick={() => navigate('/')}>Login</button>
          )}
        </div>
      </header>

      {/* HERO with full-bleed interactive 3D background */}
      <section className="ts-hero">
        {/* 3D scene as background — fills entire hero */}
        <div className="ts-hero-3d-bg">
          <TrackScene3D color={meta.color} accent={meta.accent} nodes={meta.nodes} />
        </div>

        {/* Soft color orbs for depth */}
        <div className="ts-hero-bg">
          <div className="ts-orb ts-orb-1" />
          <div className="ts-orb ts-orb-2" />
        </div>

        {/* Bottom fade overlay so text section reads cleanly */}
        <div className="ts-hero-fade" />

        {/* "Drag to explore" hint */}
        {/* <div className="ts-3d-hint">
          <span className="ts-3d-hint-icon">✦</span>
          Drag to rotate · Hover the shapes
        </div> */}

        <div className="ts-hero-inner">
          <div className="ts-breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <Link to="/">Learning Tracks</Link>
            <span>›</span>
            <span className="ts-current">{track.name}</span>
          </div>

          <div className="ts-hero-text">
            <div className="ts-hero-pill">
              <span className="ts-pulse" />
              {track.type || 'Learning Track'}
            </div>
            <h1 className="ts-hero-title">{track.name}</h1>
            <p className="ts-hero-tagline">{track.description || meta.tagline}</p>

            <div className="ts-hero-stats">
              <div className="ts-stat">
                <StatNum value={track.courses?.length || 0} />
                <span className="ts-stat-label">Courses</span>
              </div>
              <div className="ts-stat-sep" />
              <div className="ts-stat">
                <StatNum value={totalParts} />
                <span className="ts-stat-label">Modules</span>
              </div>
              <div className="ts-stat-sep" />
              <div className="ts-stat">
                <StatNum value={totalLessons} />
                <span className="ts-stat-label">Lessons</span>
              </div>
            </div>

            {track.courses?.length > 0 && (
              <div className="ts-hero-ctas">
                <button className="ts-btn-primary ts-btn-lg" onClick={() => handleCourseClick(track.courses[0])}>
                  {user && overallPct > 0 ? 'Continue Learning' : 'Start Track'}
                  <span className="ts-btn-arrow">→</span>
                </button>
                {user ? (
                  isEnrolled ? (
                    <>
                      <span className="ts-enrolled-badge">✓ Enrolled</span>
                      <button
                        className="ts-btn-leave ts-btn-lg"
                        onClick={() => setShowLeaveConfirm(true)}
                        disabled={enrollLoading}
                      >
                        Leave Track
                      </button>
                    </>
                  ) : (
                    <button
                      className="ts-btn-enroll ts-btn-lg"
                      onClick={handleEnroll}
                      disabled={enrollLoading}
                    >
                      {enrollLoading ? '…' : '+ Enroll in Track'}
                    </button>
                  )
                ) : (
                  <button className="ts-btn-outline ts-btn-lg" onClick={() => {
                    document.querySelector('.ts-learn-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    What you'll learn
                  </button>
                )}
              </div>
            )}

            {user && track.courses?.length > 0 && (
              <div className="ts-hero-progress">
                <ProgressRing pct={overallPct} color={meta.color} size={48} />
                <div>
                  <div className="ts-hero-progress-label">Your progress</div>
                  <div className="ts-hero-progress-meta">{completedCount} of {track.courses.length} courses completed</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL LEARN */}
      <section className="ts-learn-section">
        <div className="ts-section-inner">
          <div className="ts-section-header">
            <div className="ts-section-tag" style={{ color: meta.color, background: `${meta.color}10`, borderColor: `${meta.color}30` }}>
              What you'll learn
            </div>
            <h2>Skills you'll <span className="ts-grad-text">walk away with</span></h2>
            <p>By the end of this track, you'll have mastered these capabilities through hands-on practice.</p>
          </div>

          <div className="ts-skills-grid">
            {meta.skills.map((skill, i) => (
              <div
                key={i}
                className="ts-skill-card"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="ts-skill-icon" style={{ background: `linear-gradient(135deg, ${meta.color}15, ${meta.accent}15)`, color: meta.color }}>
                  {skill.icon}
                </div>
                <p className="ts-skill-label">{skill.label}</p>
                <div className="ts-skill-check" style={{ color: meta.color }}>✓</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEARNING PATH */}
      <section className="ts-courses-section">
        <div className="ts-section-inner">
          <div className="ts-section-header">
            <div className="ts-section-tag" style={{ color: meta.color, background: `${meta.color}10`, borderColor: `${meta.color}30` }}>
              Curriculum
            </div>
            <h2>Your <span className="ts-grad-text">Learning Path</span></h2>
            <p>Follow the courses in order — each one builds on the last.</p>
          </div>

          {track.courses?.length === 0 ? (
            <div className="ts-empty">
              <div className="ts-empty-icon">📚</div>
              <h3>No courses yet</h3>
              <p>This track is being set up. Check back soon!</p>
            </div>
          ) : (
            <div className="ts-courses-list">
              {track.courses.map((course, i) => {
                const meta2 = STATIC_COURSE_META[course._id?.toString()] || {};
                const courseIcon = course.icon || meta2.icon || '📘';
                const courseColor = meta2.color || meta.color;
                const courseDesc = meta2.desc || course.description || `Master the fundamentals of ${course.title}.`;
                const partsCount = course.parts?.length || 0;
                const lessonsCount = (course.parts || []).reduce((s, p) => s + (p.lessons?.length || 0), 0);
                // Real course progress (course-level, not track-level)
                const pct = courseProgress[course._id] ?? 0;
                // Only show enrolled-track UI when user is enrolled here
                const enrolledPct = isEnrolled ? pct : 0;
                const isCompleted = isEnrolled && pct >= 100;
                const isStarted   = isEnrolled && pct > 0;

                // Floating badge: show when NOT enrolled but course has progress from another track
                const sharedBadgeTracks = (!isEnrolled && user && pct > 0)
                  ? (COURSE_TO_TRACKS[course._id] || []).filter(t => t.slug !== slug)
                  : [];

                return (
                  <div
                    key={course._id}
                    className={`ts-course-card ${isCompleted ? 'completed' : isStarted ? 'in-progress' : ''}`}
                    style={{ animationDelay: `${i * 90}ms` }}
                    onClick={() => handleCourseClick(course)}
                  >
                    <div className="ts-course-num">{String(i + 1).padStart(2, '0')}</div>

                    <div className="ts-course-icon" style={{ background: `${courseColor}15`, border: `1px solid ${courseColor}40`, color: courseColor }}>
                      <span>{courseIcon}</span>
                    </div>

                    <div className="ts-course-body">
                      <div className="ts-course-top">
                        <h3 className="ts-course-name">{course.title}</h3>
                        <div className="ts-course-badges">
                          {course.status === 'published' && <span className="ts-badge published">● Published</span>}
                          {isCompleted && <span className="ts-badge done">✓ Completed</span>}
                          {isStarted && !isCompleted && <span className="ts-badge progress">In Progress</span>}
                          {/* Shared-course badge: progress exists but user not enrolled here */}
                          {sharedBadgeTracks.length > 0 && (
                            <span className="ts-badge ts-badge-shared" title={`You have progress in this course from ${sharedBadgeTracks.map(t => t.name).join(', ')}`}>
                              ↗ {Math.round(pct)}% from {sharedBadgeTracks[0].name}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="ts-course-desc">{courseDesc}</p>
                      <div className="ts-course-meta">
                        <span>📂 {partsCount} module{partsCount !== 1 ? 's' : ''}</span>
                        <span>📝 {lessonsCount} lesson{lessonsCount !== 1 ? 's' : ''}</span>
                      </div>
                      {isEnrolled && enrolledPct > 0 && (
                        <div className="ts-course-progress-bar">
                          <div className="ts-course-progress-fill" style={{ width: `${enrolledPct}%`, background: `linear-gradient(90deg, ${courseColor}, ${meta.accent})` }} />
                        </div>
                      )}
                    </div>

                    <div className="ts-course-action">
                      {isEnrolled && enrolledPct > 0
                        ? <ProgressRing pct={enrolledPct} color={courseColor} size={52} />
                        : <span className="ts-arrow">→</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* FOOTER CTA */}
      {track.courses?.length > 0 && (
        <section className="ts-cta">
          <div className="ts-cta-inner">
            <h2>Ready to {user && overallPct > 0 ? 'continue' : 'begin'}?</h2>
            <p>Jump in and start mastering {track.name}.</p>
            <button className="ts-btn-primary ts-btn-lg" onClick={() => handleCourseClick(track.courses[0])}>
              {user && overallPct > 0 ? 'Continue Learning' : 'Start Now'} <span className="ts-btn-arrow">→</span>
            </button>
          </div>
        </section>
      )}

      {/* LEAVE TRACK CONFIRMATION */}
      {showLeaveConfirm && (
        <div className="ts-leave-overlay" onClick={() => setShowLeaveConfirm(false)}>
          <div className="ts-leave-box" onClick={e => e.stopPropagation()}>
            <div className="ts-leave-icon">🚪</div>
            <h3 className="ts-leave-title">Leave this track?</h3>
            <p className="ts-leave-body">
              You'll be unenrolled from <strong>{track.name}</strong>. Your progress in individual courses will be saved.
            </p>
            <div className="ts-leave-actions">
              <button className="ts-leave-cancel" onClick={() => setShowLeaveConfirm(false)}>
                Cancel
              </button>
              <button className="ts-leave-confirm" onClick={handleLeaveTrack} disabled={enrollLoading}>
                {enrollLoading ? '…' : 'Yes, Leave Track'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
