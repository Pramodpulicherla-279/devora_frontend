import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthPopup from '../../components/AuthPopup/AuthPopup';
import DonateModal from '../../components/DonateModal/donateModal';
import { getAnalytics, logEvent } from 'firebase/analytics';
import emailjs from '@emailjs/browser';
import { Helmet } from 'react-helmet';
import logo from '../../assets/logo.png';
import './LandingPage.css';
import { API_BASE_URL } from '../../../config';
import { authFetch } from '../../utils/authFetch';
import { getStreak } from '../../utils/userStats';

/* ─── COURSES ─────────────────────────────── */
const STATIC_COURSES = [
  { id: '6919f6286409cc0505808ac5', name: 'HTML', slug: 'html/introduction-to-html', description: 'Build the structure of websites with clean, semantic markup.', icon: '🌐', color: '#e34c26' },
  { id: '6919f63e6409cc0505808ac7', name: 'CSS', slug: 'css/css-get-started', description: 'Style and design beautiful, responsive web pages.', icon: '🎨', color: '#264de4' },
  { id: '6919f6516409cc0505808ac9', name: 'JavaScript', slug: 'javascript/variables-data-types', description: 'Add interactivity, logic, and dynamic behavior to your apps.', icon: '⚡', color: '#e8a000' },
  { id: '693afba9252afa6fafc011af', name: 'Terminal / CLI', slug: 'terminal-command-line/terminal-basics-for-developers', description: 'Control your system efficiently with essential CLI commands.', icon: '💻', color: '#00897b' },
  { id: '693afe6f252afa6fafc011ba', name: 'Git & GitHub', slug: 'git-and-github/introduction-to-git-and-github-version-control-essentials', description: 'Track changes, collaborate with teams, and manage your code.', icon: '🐙', color: '#e64a19' },
  { id: '693c1db01270c2a321fa0356', name: 'Backend (Node / Express)', slug: 'backend-nodejs-express/introduction-to-nodejs-and-node-repl', description: 'Power your application with APIs, servers, and business logic.', icon: '🚀', color: '#2e7d32' },
  { id: '6a0ecfdc690db01f804cb1d5', name: 'SQL', slug: 'sql/every-app-runs-on-a-database', description: 'Hands-On Guide to Mastering Structured Query Language.', icon: '🗄️', color: '#1565c0' },
];

/* ─── TRACK → COURSE MAPPING ─────────────── */
const TRACK_COURSE_IDS = {
  'MERN Stack': ['6919f6286409cc0505808ac5', '6919f63e6409cc0505808ac7', '6919f6516409cc0505808ac9', '693afba9252afa6fafc011af', '693afe6f252afa6fafc011ba', '693c1db01270c2a321fa0356'],
  'MEAN Stack': ['6919f6286409cc0505808ac5', '6919f63e6409cc0505808ac7', '6919f6516409cc0505808ac9', '693afba9252afa6fafc011af', '693afe6f252afa6fafc011ba', '693c1db01270c2a321fa0356'],
  'Frontend Development': ['6919f6286409cc0505808ac5', '6919f63e6409cc0505808ac7', '6919f6516409cc0505808ac9'],
  'Backend Development': ['693c1db01270c2a321fa0356', '693afba9252afa6fafc011af', '693afe6f252afa6fafc011ba'],
  'Data Analytics': ['6a0ecfdc690db01f804cb1d5'],
  'DevOps': ['693afba9252afa6fafc011af', '693afe6f252afa6fafc011ba'],
};

/* ─── STATIC DB TRACKS — instant seed, no cold-start wait ───────── */
// Mirrors the shape returned by GET /api/tracks (populated courses+parts).
// Only include tracks that actually exist in MongoDB.
// The API fetch will silently overwrite this once Render wakes up.
const STATIC_DB_TRACKS = [
  {
    _id: '6a11ee5865bcdb08d4ee66b3',
    name: 'MERN Stack',
    slug: 'mern-stack',
    type: 'Full Stack',
    description: 'Build full-stack JavaScript applications with MongoDB, Express, React and Node.js.',
    courses: [
      { _id: '6919f6286409cc0505808ac5', title: 'HTML',                    slug: 'html',                  status: 'published', parts: [] },
      { _id: '6919f63e6409cc0505808ac7', title: 'CSS',                     slug: 'css',                   status: 'published', parts: [] },
      { _id: '6919f6516409cc0505808ac9', title: 'JavaScript',              slug: 'javascript',            status: 'published', parts: [] },
      { _id: '693afba9252afa6fafc011af', title: 'Terminal / CLI',          slug: 'terminal-command-line', status: 'published', parts: [] },
      { _id: '693afe6f252afa6fafc011ba', title: 'Git & GitHub',            slug: 'git-and-github',        status: 'published', parts: [] },
      { _id: '693c1db01270c2a321fa0356', title: 'Backend (Node / Express)',slug: 'backend-nodejs-express',status: 'published', parts: [] },
    ],
  },
];

/* ─── LEARNING TRACKS ─────────────────────── */
const LEARNING_TRACKS = [
  { name: 'MERN Stack', icon: '🧩', techs: ['MongoDB', 'Express', 'React', 'Node.js'], lessons: 42, level: 'Beginner → Advanced', hours: '30+', color: '#7c3aed' },
  { name: 'MEAN Stack', icon: '🔷', techs: ['MongoDB', 'Express', 'Angular', 'Node.js'], lessons: 40, level: 'Beginner → Advanced', hours: '28+', color: '#1565c0' },
  { name: 'Frontend Development', icon: '🎨', techs: ['HTML', 'CSS', 'JavaScript', 'React'], lessons: 38, level: 'Beginner → Advanced', hours: '25+', color: '#7b1fa2' },
  { name: 'Backend Development', icon: '⚙️', techs: ['Node.js', 'Express', 'MongoDB'], lessons: 36, level: 'Beginner → Advanced', hours: '24+', color: '#2e7d32' },
  { name: 'Prompt Engineering', icon: '🤖', techs: ['ChatGPT', 'Claude', 'RAG', 'LangChain'], lessons: 25, level: 'Beginner → Advanced', hours: '18+', color: '#6a1b9a' },
  { name: 'Playwright Automation', icon: '🎭', techs: ['Playwright', 'TypeScript', 'CI/CD'], lessons: 32, level: 'Intermediate', hours: '20+', color: '#00695c' },
  { name: 'Appium Automation', icon: '📱', techs: ['Appium', 'Java', 'Android', 'iOS'], lessons: 28, level: 'Intermediate', hours: '22+', color: '#bf360c' },
  { name: 'Data Analytics', icon: '📊', techs: ['Python', 'SQL', 'Power BI', 'Pandas'], lessons: 22, level: 'Beginner → Advanced', hours: '24+', color: '#0277bd' },
  { name: 'AI Engineering', icon: '🧠', techs: ['Python', 'PyTorch', 'LLMs', 'APIs'], lessons: 30, level: 'Intermediate → Adv.', hours: '26+', color: '#e65100' },
];

/* ─── OTHER DATA ──────────────────────────── */
const WHY_FEATURES = [
  { icon: '🤖', title: 'AI Tutor While Practicing', desc: 'Get instant hints, explanations and code help from your AI tutor exactly when you need it.' },
  { icon: '✨', title: 'Interactive Visualizations', desc: 'Understand complex topics with animated, interactive diagrams.' },
  { icon: '⌨️', title: 'Live Coding Sandbox', desc: 'Practice directly in the browser with instant feedback.' },
  { icon: '🎯', title: 'Interview Preparation', desc: 'Curated interview questions organized by difficulty level.' },
  { icon: '📝', title: 'Smart Quizzes', desc: 'Reinforce learning with MCQs, quizzes, and knowledge tests.' },
  { icon: '💬', title: 'Context-Based AI Chat', desc: 'Ask questions about the current lesson — your AI assistant already knows what you\'re reading.' },
  { icon: '📈', title: 'Beginner to Advanced', desc: 'Every track takes you from zero to production-ready.' },
  { icon: '🌍', title: 'Real-World Projects', desc: 'Build projects you can put on your portfolio.' },
  { icon: '🗺️', title: 'Structured Roadmaps', desc: 'Curated learning paths guide you from zero to job-ready in the right order.' },
  { icon: '👁️', title: 'Visual-First Learning', desc: 'Architecture diagrams and flow charts before the code.' },
];

const TESTIMONIALS = [
  { name: 'Sarah Johnson', role: 'Frontend Developer', avatar: 'SJ', rating: 5, text: 'Dev.EL changed the way I learn. The visualizations and interactive tools make complex topics so easy!' },
  { name: 'Rohit Verma', role: 'Full Stack Developer', avatar: 'RV', rating: 5, text: 'The explanations are super clear and beginner-friendly. The AI tutor helped me whenever I got stuck. Highly recommended!' },
  { name: 'Alex Morgan', role: 'Backend Developer', avatar: 'AM', rating: 5, text: 'Best platform for mastering modern development. The practice sandbox is amazing!' },
  { name: 'Priya Shah', role: 'Software Engineer', avatar: 'PS', rating: 5, text: 'The interview preparation section literally helped me crack my dream job!' },
  { name: 'James Liu', role: 'DevOps Engineer', avatar: 'JL', rating: 5, text: 'The roadmap feature is a game changer. I always know exactly what to learn next.' },
  { name: 'Aisha Patel', role: 'Data Analyst', avatar: 'AP', rating: 5, text: 'Finally a platform that treats learners like professionals. The content quality is top-tier.' },
];

const PIPELINE_STEPS = [
  { icon: '👤', label: 'Expert Curated', desc: 'Topics & outlines crafted by developers' },
  { icon: '📖', label: 'Clear Lessons', desc: 'Conversational, easy to understand' },
  { icon: '✨', label: 'Visualizations', desc: 'Diagrams & interactive visuals' },
  { icon: '📝', label: 'Quizzes', desc: 'MCQs, assessments & tests' },
  { icon: '⌨️', label: 'Practice Sandbox', desc: 'Hands-on coding practice' },
  { icon: '🤖', label: 'AI Tutor & Chat', desc: 'Context-aware help while you learn' },
  { icon: '🎓', label: 'Students Learn', desc: 'Track progress & master skills' },
];

const EDITOR_CODE_HTML = [
  '<span class="tok-kw">import</span> { useState, useEffect } <span class="tok-kw">from</span> <span class="tok-str">\'react\'</span>;',
  '',
  '<span class="tok-fn">function</span> <span class="tok-name">App</span>() {',
  '  <span class="tok-kw">const</span> [count, setCount] = useState(<span class="tok-num">0</span>);',
  '',
  '  useEffect(<span class="tok-fn">() =&gt;</span> {',
  '    console.<span class="tok-fn">log</span>(<span class="tok-str">\'rendered\'</span>);',
  '  }, [count]);',
  '',
  '  <span class="tok-kw">return</span> (',
  '    <span class="tok-tag">&lt;div&gt;</span>',
  '      <span class="tok-tag">&lt;h1&gt;</span>Count: {count}<span class="tok-tag">&lt;/h1&gt;</span>',
  '      <span class="tok-tag">&lt;button</span> onClick=<span class="tok-fn">{() =&gt; setCount(c =&gt; c+1)}</span><span class="tok-tag">&gt;</span>',
  '        Increment',
  '      <span class="tok-tag">&lt;/button&gt;</span>',
  '    <span class="tok-tag">&lt;/div&gt;</span>',
  '  );',
  '}',
].join('\n');

const INDEX_CODE_HTML = [
  '<span class="tok-kw">import</span> React <span class="tok-kw">from</span> <span class="tok-str">\'react\'</span>;',
  '<span class="tok-kw">import</span> ReactDOM <span class="tok-kw">from</span> <span class="tok-str">\'react-dom/client\'</span>;',
  '<span class="tok-kw">import</span> App <span class="tok-kw">from</span> <span class="tok-str">\'./App\'</span>;',
  '',
  '<span class="tok-com">// Mount the React app to the DOM</span>',
  '<span class="tok-kw">const</span> root = ReactDOM.<span class="tok-fn">createRoot</span>(',
  '  document.<span class="tok-fn">getElementById</span>(<span class="tok-str">\'root\'</span>)',
  ');',
  '',
  'root.<span class="tok-fn">render</span>(',
  '  <span class="tok-tag">&lt;React.StrictMode&gt;</span>',
  '    <span class="tok-tag">&lt;App</span> <span class="tok-tag">/&gt;</span>',
  '  <span class="tok-tag">&lt;/React.StrictMode&gt;</span>',
  ');',
].join('\n');

/* ─── HELPERS ─────────────────────────────── */
function getTrackCourses(trackName) {
  const ids = TRACK_COURSE_IDS[trackName] || [];
  return ids.map(id => STATIC_COURSES.find(c => c.id === id)).filter(Boolean);
}

function CourseProgressRing({ pct, color }) {
  const r = 20, circ = 2 * Math.PI * r;
  return (
    <div className="lp-ring-wrap">
      <svg viewBox="0 0 48 48" width="48" height="48">
        <circle cx="24" cy="24" r={r} fill="none" stroke="#e5e7eb" strokeWidth="4" />
        <circle cx="24" cy="24" r={r} fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={circ} strokeDashoffset={circ - (pct / 100) * circ}
          strokeLinecap="round" transform="rotate(-90 24 24)"
          style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
      </svg>
      <span style={{ color }}>{Math.round(pct)}%</span>
    </div>
  );
}

/* ─── MAIN COMPONENT ──────────────────────── */
export default function LandingPage() {
  const navigate = useNavigate();
  const tracksRef = useRef(null);
  const featuresRef = useRef(null);
  const contactRef = useRef(null);
  const expandPanelRef = useRef(null);

  const [user, setUser] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [courseProgress, setCourseProgress] = useState({});
  const [trackProgress, setTrackProgress] = useState({}); // { [trackSlug]: { [courseId]: pct } }
  const [enrolledSlugs, setEnrolledSlugs] = useState([]);
  const [activeTab, setActiveTab] = useState('mcq');
  const [editorTab, setEditorTab] = useState('app');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [counters, setCounters] = useState({ learners: 0, lessons: 0, tracks: 0 });

  // Track drill-down states
  const [selectedCourseTrack, setSelectedCourseTrack] = useState(null); // for Courses section
  const [expandedLearningTrack, setExpandedLearningTrack] = useState(null); // for Learning Tracks section

  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dbTracks, setDbTracks] = useState(STATIC_DB_TRACKS);
  
  
  const handleOpenDonate = () => {
    setIsDonateModalOpen(true);
    setIsSidebarOpen(false);
    setMobileOpen(false);
  };

  const handleCloseDonate = () => {
    setIsDonateModalOpen(false);
  };

  // Auto-scroll to expand panel when it opens
  useEffect(() => {
    if (expandedLearningTrack && expandPanelRef.current) {
      setTimeout(() => {
        expandPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 60);
    }
  }, [expandedLearningTrack]);

  useEffect(() => {
    const info = localStorage.getItem('userInfo');
    if (info) setUser(JSON.parse(info));
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/tracks`)
      .then(r => r.json())
      .then(d => { if (d.success) setDbTracks(d.data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const targets = { learners: 10000, lessons: 500, tracks: 50 };
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const ease = 1 - Math.pow(1 - step / 60, 3);
      setCounters({
        learners: Math.round(targets.learners * ease),
        lessons: Math.round(targets.lessons * ease),
        tracks: Math.round(targets.tracks * ease),
      });
      if (step >= 60) clearInterval(timer);
    }, 2000 / 60);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!user) return;
    // Gather all unique course IDs: STATIC_COURSES + any DB track courses
    const dbCourseIds = dbTracks.flatMap(t =>
      (t.courses || []).map(c => (c._id || c).toString())
    );
    const allIds = [...new Set([...STATIC_COURSES.map(c => c.id), ...dbCourseIds])];
    allIds.forEach(async (id) => {
      try {
        const res = await authFetch(`${API_BASE_URL}/api/progress/courses/${id}`);
        const data = await res.json();
        if (data?.percent != null) setCourseProgress(p => ({ ...p, [id]: data.percent }));
      } catch { }
    });
  }, [user, dbTracks]);

  // Fetch explicitly enrolled tracks from API
  useEffect(() => {
    if (!user) return;
    authFetch(`${API_BASE_URL}/api/users/tracks/enrolled`)
      .then(r => r.json())
      .then(d => { if (d.success) setEnrolledSlugs(d.enrolledTracks || []); })
      .catch(() => {});
  }, [user]);

  // Fetch track-scoped progress for each enrolled track (powers "My Learning Journey")
  useEffect(() => {
    if (!user || enrolledSlugs.length === 0 || dbTracks.length === 0) return;
    enrolledSlugs.forEach(tSlug => {
      const dbTrack = dbTracks.find(dt => dt.slug === tSlug);
      if (!dbTrack?.courses) return;
      dbTrack.courses.forEach(async (c) => {
        const courseId = (c._id || c).toString();
        try {
          const res = await authFetch(
            `${API_BASE_URL}/api/progress/courses/${courseId}?trackSlug=${tSlug}`
          );
          const data = await res.json();
          if (data?.percent != null) {
            setTrackProgress(p => ({
              ...p,
              [tSlug]: { ...(p[tSlug] || {}), [courseId]: data.percent },
            }));
          }
        } catch { /* keep 0 */ }
      });
    });
  }, [user, enrolledSlugs, dbTracks]);

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth' });

  // Map a DB track's populated courses → display objects
  // getTracks already populates courses with { _id, title, slug, status, parts }
  const getDbTrackCourses = (track) => {
    if (!track || !track.courses) return [];
    return track.courses.map(c => {
      const cId = (c._id || c).toString();
      // Try to enrich with STATIC_COURSES data (icon, color, full nav slug)
      const s = STATIC_COURSES.find(sc => sc.id === cId);
      return {
        id: cId,
        name: s?.name || c.title || 'Course',
        slug: s?.slug || c.slug || '',
        description: s?.description || c.description || '',
        icon: s?.icon || '📘',
        color: s?.color || '#6366f1',
      };
    });
  };

  // Merged list: DB tracks first (real), then hardcoded ones not in DB (Coming Soon)
  const getMergedTracks = () => {
    const dbNames = new Set(dbTracks.map(t => t.name));
    const real = dbTracks.map(t => {
      const h = LEARNING_TRACKS.find(x => x.name === t.name) || {};
      // Real lesson count from populated parts
      const lessonCount = (t.courses || []).reduce((sum, c) => {
        return sum + ((c.parts || []).reduce((s2, p) => s2 + (p.lessons?.length || 0), 0));
      }, 0);
      return {
        ...h, ...t,
        isDB: true,
        icon: t.icon || h.icon || '🛤️',
        color: h.color || '#6366f1',
        techs: h.techs || [t.type || 'Programming'],
        lessons: lessonCount || h.lessons || 0,
        level: h.level || 'Beginner → Advanced',
        hours: h.hours || '20+',
        hasCourses: (t.courses?.length || 0) > 0,   // ← use raw DB count, not STATIC mapping
      };
    });
    const comingSoon = LEARNING_TRACKS
      .filter(t => !dbNames.has(t.name))
      .map(t => ({ ...t, isDB: false, hasCourses: false }));
    return [...real, ...comingSoon];
  };

  // Tracks the user has explicitly enrolled in — no false positives from shared courses.
  // Progress is scoped to each track (trackProgress) so HTML in MERN Stack ≠ HTML in Frontend Dev.
  const getMyTracks = () => {
    if (!user || enrolledSlugs.length === 0) return [];
    return dbTracks
      .map(t => {
        const tSlug = t.slug || '';
        if (!enrolledSlugs.includes(tSlug)) return null;
        const courses = getDbTrackCourses(t);
        if (courses.length === 0) return null;
        const tProg = trackProgress[tSlug] || {};
        const avgPct = Math.round(courses.reduce((s, c) => s + (tProg[c.id] ?? 0), 0) / courses.length);
        const h = LEARNING_TRACKS.find(x => x.name === t.name) || {};
        return { ...h, ...t, matchedCourses: courses, avgProgress: avgPct, icon: t.icon || h.icon || '🛤️', color: h.color || '#6366f1' };
      })
      .filter(Boolean);
  };

  const handleCourseClick = (course) => {
    if (!course.slug) return;
    try { logEvent(getAnalytics(), 'course_click', { course: course.name }); } catch { }
    navigate(`/course/${course.slug}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Sending...');
    emailjs.send('service_w68uiig', 'template_sxdk7m1', formData, 'a0HMfFE13KWXlWuFs')
      .then(() => { setFormStatus('Message sent!'); setFormData({ name: '', email: '', message: '' }); })
      .catch(() => setFormStatus('Failed. Please try again.'));
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    const u = localStorage.getItem('userInfo');
    if (u) setUser(JSON.parse(u));
  };

  // "Our Learning Tracks" section — built from DB tracks (admin-created), not hardcoded
  const selectedTrackDbObj = dbTracks.find(t => t.name === selectedCourseTrack);
  const selectedTrackObj = selectedTrackDbObj
    ? {
        name: selectedTrackDbObj.name,
        icon: selectedTrackDbObj.icon || LEARNING_TRACKS.find(h => h.name === selectedTrackDbObj.name)?.icon || '🛤️',
        color: LEARNING_TRACKS.find(h => h.name === selectedTrackDbObj.name)?.color || '#6366f1',
      }
    : null;
  const selectedTrackCourses = selectedCourseTrack && selectedTrackDbObj
    ? getDbTrackCourses(selectedTrackDbObj)
    : [];

  // For expanded learning track panel (top "Explore Popular Learning Tracks" section)
  const expandedDbTrack = dbTracks.find(t => t.name === expandedLearningTrack);
  const expandedTrackObj = getMergedTracks().find(t => t.name === expandedLearningTrack);
  const expandedTrackCourses = expandedDbTrack
    ? getDbTrackCourses(expandedDbTrack)
    : (expandedLearningTrack ? getTrackCourses(expandedLearningTrack) : []);

  const myTracks = getMyTracks();

  return (
    <>
      <Helmet>
        <title>Dev.EL — Interactive Developer Education Platform</title>
        <meta name="description" content="Learn MERN, MEAN, Prompt Engineering, Automation Testing, AI Tools through visual-first lessons, interactive coding sandboxes, quizzes, and real-world projects." />
        <link rel="canonical" href="https://www.dev-el.co" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Helmet>

      {/* ── HEADER ── */}
      <header className="lp-header">
        <div className="lp-header-inner">
          <Link to="/" className="lp-logo">
            <img src={logo} alt="Dev.EL" />
            <span>Dev<span className="lp-dot">.</span>EL</span>
          </Link>

          <nav className={`lp-nav ${mobileOpen ? 'open' : ''}`}>
            {/* Sidebar header */}
            <div className="lp-nav-header">
              <span className="lp-nav-brand">Dev<span className="lp-dot">.</span>EL</span>
              <button className="lp-nav-close" onClick={() => setMobileOpen(false)}>✕</button>
            </div>

            {/* Nav links */}
            <div className="lp-nav-links">
              <a href="#tracks" onClick={e => { e.preventDefault(); scrollTo(tracksRef); setMobileOpen(false); }}>Tracks</a>
              <Link to="/roadmaps" onClick={() => setMobileOpen(false)}>Roadmaps</Link>
              <a href="#features" onClick={e => { e.preventDefault(); scrollTo(featuresRef); setMobileOpen(false); }}>Features</a>
              <Link to="/privacy-policy" onClick={() => setMobileOpen(false)}>Privacy</Link>
              <Link to="/terms" onClick={() => setMobileOpen(false)}>Terms</Link>
            </div>

            {/* User section at bottom (mobile only) */}
            <div className="lp-nav-bottom">
              <div className="lp-nav-sep" />
              {user ? (
                <>
                  <div className="lp-nav-user">
                    <div className="lp-avatar-small">{user.name.charAt(0).toUpperCase()}</div>
                    <div className="lp-nav-user-info">
                      <span className="lp-nav-uname">{user.name}</span>
                      <span className="lp-nav-uemail">Logged in</span>
                    </div>
                  </div>
                  <button
                    className="lp-nav-logout-btn"
                    onClick={() => { localStorage.removeItem('userInfo'); window.location.reload(); }}
                  >
                    Logout
                  </button>
                </>
              ) : null}
              <button className="lp-nav-coffee-btn" onClick={handleOpenDonate}>
                ☕ Buy Me a Coffee
              </button>
            </div>
          </nav>

          <div className="lp-header-actions">
            {user ? (
              <>
                <div className="lp-user-info" style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')}>
                  <div className="lp-avatar-small">{user.name.charAt(0).toUpperCase()}</div>
                  <span className="lp-user-name">{user.name}</span>
                </div>
                <button className="lp-btn-ghost lp-desktop-only" onClick={() => { localStorage.removeItem('userInfo'); window.location.reload(); }}>Logout</button>
              </>
            ) : (
              <button className="lp-btn-primary lp-header-login-btn" onClick={() => setIsPopupOpen(true)}>Login & Start Learning</button>
            )}
            <button className="lp-hamburger" onClick={() => setMobileOpen(true)}>☰</button>
          </div>
        </div>
        {mobileOpen && <div className="lp-overlay" onClick={() => setMobileOpen(false)} />}
      </header>

      {/* ── HERO ── */}
      <section className="lp-hero">
        <div className="lp-hero-bg">
          <div className="lp-grid-lines" />
          <div className="lp-orb lp-orb-1" />
          <div className="lp-orb lp-orb-2" />
          <div className="lp-orb lp-orb-3" />
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="lp-particle" style={{ '--i': i }} />
          ))}
        </div>

        <div className="lp-hero-inner">
          <div className="lp-hero-text">
            <div className="lp-hero-badge">
              <span className="lp-badge-pulse" />
              Interactive Developer Education Platform
            </div>
            <h1 className="lp-hero-h1">
              Master Modern<br />
              Development with<br />
              <span className="lp-gradient-text">Visual & Interactive</span><br />
              Learning
            </h1>
            <p className="lp-hero-sub">
              Learn MERN, MEAN, Prompt Engineering, Automation Testing, AI Tools, and more through
              visual-first lessons, interactive coding sandboxes, quizzes, and real-world projects.
            </p>
            <div className="lp-hero-ctas">
              <button className="lp-btn-primary lp-btn-lg"
                onClick={() => { scrollTo(tracksRef); try { logEvent(getAnalytics(), 'start_learning_click'); } catch { } }}>
                Start Learning <span className="lp-cta-arrow">→</span>
              </button>
              <button className="lp-btn-outline lp-btn-lg" onClick={() => scrollTo(tracksRef)}>
                Explore Tracks
              </button>
            </div>
            <div className="lp-hero-stats">
              <div className="lp-stat">
                <span className="lp-stat-num">{counters.learners.toLocaleString()}+</span>
                <span className="lp-stat-label">Active Learners</span>
              </div>
              <div className="lp-stat-divider" />
              <div className="lp-stat">
                <span className="lp-stat-num">{counters.lessons}+</span>
                <span className="lp-stat-label">Interactive Lessons</span>
              </div>
              <div className="lp-stat-divider" />
              <div className="lp-stat">
                <span className="lp-stat-num">{counters.tracks}+</span>
                <span className="lp-stat-label">Learning Tracks</span>
              </div>
            </div>
          </div>

          <div className="lp-hero-visuals">
            <div className="lp-dash-card lp-float-a">
              <div className="lp-dash-titlebar">
                <span className="lp-win-btn red" /><span className="lp-win-btn yellow" /><span className="lp-win-btn green" />
                <span className="lp-dash-app-name">Dev.EL Dashboard</span>
              </div>
              <div className="lp-dash-content">
                <div className="lp-dash-ring-wrap">
                  <svg viewBox="0 0 80 80" className="lp-dash-ring-svg">
                    <circle cx="40" cy="40" r="32" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                    <circle cx="40" cy="40" r="32" fill="none" stroke="url(#rg1)" strokeWidth="6"
                      strokeDasharray="201" strokeDashoffset="56" strokeLinecap="round" transform="rotate(-90 40 40)" />
                    <defs>
                      <linearGradient id="rg1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#7c3aed" />
                        <stop offset="100%" stopColor="#0891b2" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="lp-dash-pct">72%</span>
                </div>
                <div className="lp-dash-meta">
                  <p className="lp-dash-overall">Overall Progress</p>
                  <p className="lp-dash-course-name">MERN Stack</p>
                  <p className="lp-dash-streak">🔥 12 day streak</p>
                  <div className="lp-dash-tags">
                    <span className="lp-tag-blue">248 Lessons</span>
                    <span className="lp-tag-purple">156 Quizzes</span>
                  </div>
                </div>
              </div>
              <div className="lp-dash-recent">
                {['MongoDB Aggregation', 'useEffect Hook', 'Express Middleware'].map((l, i) => (
                  <div key={i} className="lp-dash-row">
                    <span className="lp-dash-dot" />
                    <span className="lp-dash-lesson-name">{l}</span>
                    <span className="lp-dash-pct-small">{[100, 75, 40][i]}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lp-code-preview lp-float-b">
              <div className="lp-code-bar">
                <span className="lp-code-lang-tag">JSX</span>
                <span className="lp-code-filename">App.jsx</span>
              </div>
              <pre className="lp-code-body"><code>{`function Counter() {
  const [n, setN] = useState(0);

  useEffect(() => {
    document.title = \`Count \${n}\`;
  }, [n]);

  return (
    <button onClick={() => setN(n+1)}>
      Count: {n}
    </button>
  );
}`}</code></pre>
            </div>

            <div className="lp-ai-pill lp-float-c">
              <span className="lp-ai-glow-dot" />
              <div>
                <p className="lp-ai-pill-title">AI Tutor Ready</p>
                <p className="lp-ai-pill-sub">useEffect Hook — React</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROFILE CARD (logged-in users, below hero) ── */}
      {user && (
        <div className="lp-profile-card-wrap">
          <div className="lp-profile-card">
            <div className="lp-pc-avatar">{user.name.charAt(0).toUpperCase()}</div>
            <div className="lp-pc-main">
              <span className="lp-pc-name">{user.name}</span>
              <div className="lp-pc-tracks-row">
                {enrolledSlugs.length > 0 ? (
                  enrolledSlugs.map(slug => {
                    const dbTrack = dbTracks.find(t => t.slug === slug);
                    const ltTrack = LEARNING_TRACKS.find(t => t.name === dbTrack?.name);
                    return (
                      <span
                        key={slug}
                        className="lp-pc-track-pill"
                        style={{ '--tc': ltTrack?.color || '#6366f1' }}
                      >
                        {ltTrack?.icon || dbTrack?.icon || '🛤️'} {dbTrack?.name || slug}
                      </span>
                    );
                  })
                ) : (
                  <span className="lp-pc-no-tracks">No tracks enrolled yet — pick one below!</span>
                )}
              </div>
            </div>
            <div className="lp-pc-streak">
              <span className="lp-pc-streak-icon">🔥</span>
              <div className="lp-pc-streak-info">
                <span className="lp-pc-streak-num">{getStreak()}</span>
                <span className="lp-pc-streak-label">Day Streak</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MY LEARNING (logged-in users with progress) ── */}
      {user && myTracks.length > 0 && (
        <section className="lp-section lp-my-learning" style={{ paddingTop: '48px', paddingBottom: '16px' }}>
          <div className="lp-section-inner">
            <div className="lp-section-header" style={{ marginBottom: '20px' }}>
              <div className="lp-label-tag">Your Progress</div>
              <h2 className="lp-section-h2" style={{ marginBottom: '4px' }}>
                My <span className="lp-gradient-text">Learning Journey</span>
              </h2>
              <p className="lp-section-p">Continue where you left off</p>
            </div>
            <div className="lp-my-tracks-grid">
              {myTracks.map((track, i) => (
                <div
                  key={i}
                  className="lp-my-track-card"
                  style={{ '--tc': track.color }}
                  onClick={() => navigate(`/track/${track.slug}`)}
                >
                  <div className="lp-mt-glow" />
                  <div className="lp-mt-left">
                    <span className="lp-mt-icon">{track.icon}</span>
                    <div>
                      <div className="lp-mt-name">{track.name}</div>
                      <div className="lp-mt-meta">{track.matchedCourses.length} courses · {track.avgProgress}% done</div>
                    </div>
                  </div>
                  <div className="lp-mt-right">
                    <CourseProgressRing pct={track.avgProgress} color={track.color} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── LEARNING TRACKS (Section 2) ── */}
      <section className="lp-section lp-tracks" ref={tracksRef} id="tracks">
        <div className="lp-section-inner">
          <div className="lp-section-header">
            <div className="lp-label-tag">Learning Tracks</div>
            <h2 className="lp-section-h2">Explore Popular <span className="lp-gradient-text">Learning Tracks</span></h2>
            <p className="lp-section-p">Click a track to see its courses</p>
          </div>

          <div className="lp-tracks-grid">
            {getMergedTracks().map((track, i) => {
              const hasCourses = track.hasCourses;
              const trackIdentifier = track.slug || track._id;
              return (
                <div
                  key={i}
                  className={`lp-track-card ${!hasCourses ? 'coming-soon' : 'clickable'}`}
                  style={{ '--tc': track.color }}
                  onClick={() => {
                    if (!hasCourses) return;
                    try { logEvent(getAnalytics(), 'track_click', { track: track.name }); } catch { }
                    navigate(`/track/${trackIdentifier}`);
                  }}
                >
                  <div className="lp-tc-glow" />
                  <div className="lp-tc-top">
                    <span className="lp-tc-icon">{track.icon}</span>
                    {!hasCourses
                      ? <span className="lp-cs-badge">Coming Soon</span>
                      : <span className="lp-expand-icon">→</span>
                    }
                  </div>
                  <h3 className="lp-tc-name">{track.name}</h3>
                  <div className="lp-tc-techs">
                    {track.techs.map((t, j) => <span key={j} className="lp-tech">{t}</span>)}
                  </div>
                  <div className="lp-tc-meta">
                    <span>📚 {track.lessons} Lessons</span>
                    <span>⏱ {track.hours} hrs</span>
                  </div>
                  <div className="lp-tc-level">{track.level}</div>
                  <div className="lp-tc-bar"><div className="lp-tc-bar-fill" style={{ width: `${25 + i * 8}%` }} /></div>
                </div>
              );
            })}
          </div>

          {/* Expanded track courses panel */}
          {expandedLearningTrack && expandedTrackCourses.length > 0 && (
            <div
              className="lp-track-expand-panel"
              ref={expandPanelRef}
              style={{ borderColor: expandedTrackObj?.color ? `${expandedTrackObj.color}55` : undefined }}
            >
              <div className="lp-tep-header" style={{ background: expandedTrackObj?.color ? `${expandedTrackObj.color}12` : undefined }}>
                <span className="lp-tep-icon">{expandedTrackObj?.icon}</span>
                <div>
                  <h3 className="lp-tep-title" style={{ color: expandedTrackObj?.color }}>{expandedLearningTrack}</h3>
                  <p className="lp-tep-sub">{expandedTrackCourses.length} courses — click any to start learning</p>
                </div>
                <button className="lp-tep-close" onClick={() => setExpandedLearningTrack(null)}>✕</button>
              </div>
              <div className="lp-tep-courses">
                {expandedTrackCourses.map((course) => {
                  const pct = courseProgress[course.id] ?? 0;
                  return (
                    <div key={course.id} className="lp-tep-course-card" onClick={() => handleCourseClick(course)} style={{ '--cc': course.color }}>
                      <div className="lp-tep-cc-left">
                        <span className="lp-tep-cc-icon">{course.icon}</span>
                        <div>
                          <p className="lp-tep-cc-name">{course.name}</p>
                          <p className="lp-tep-cc-desc">{course.description}</p>
                        </div>
                      </div>
                      <div className="lp-tep-cc-right">
                        {user && pct > 0
                          ? <CourseProgressRing pct={pct} color={course.color} />
                          : <span className="lp-tep-start">Start →</span>
                        }
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── WHY DEV.EL ── */}
      <section className="lp-section lp-why" ref={featuresRef} id="features">
        <div className="lp-section-inner">
          <div className="lp-section-header">
            <div className="lp-label-tag">Why Dev.EL?</div>
            <h2 className="lp-section-h2">Everything you need to <span className="lp-gradient-text">learn & master</span> modern development</h2>
          </div>
          <div className="lp-features-grid">
            {WHY_FEATURES.map((f, i) => (
              <div key={i} className="lp-feature-card">
                <div className="lp-fc-icon">{f.icon}</div>
                <h3 className="lp-fc-title">{f.title}</h3>
                <p className="lp-fc-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE LEARNING ── */}
      <section className="lp-section lp-interactive">
        <div className="lp-section-inner">
          <div className="lp-section-header">
            <div className="lp-label-tag">Interactive Experience</div>
            <h2 className="lp-section-h2">Learn by <span className="lp-gradient-text">doing, not watching</span></h2>
          </div>
          <div className="lp-split">
            <div className="lp-split-left">
              <div className="lp-lesson-preview">
                <span className="lp-lesson-tag">📖 Lesson</span>
                <h3>React useEffect Hook</h3>
                <p>The useEffect hook lets you perform side effects — fetching data, subscribing to events, or updating the DOM — after React renders a component.</p>
                <div className="lp-lifecycle">
                  <div className="lp-lc-step">Mounting</div>
                  <div className="lp-lc-arr">→</div>
                  <div className="lp-lc-step active">Updating</div>
                  <div className="lp-lc-arr">→</div>
                  <div className="lp-lc-step">Unmounting</div>
                </div>
                <div className="lp-keypoint">
                  <span>💡</span>
                  <span><strong>Key Point:</strong> useEffect runs <em>after</em> the render is committed to the screen.</span>
                </div>
              </div>
            </div>
            <div className="lp-split-right">
              <div className="lp-editor">
                <div className="lp-editor-tabs">
                  <span
                    className={`lp-etab${editorTab === 'app' ? ' active' : ''}`}
                    onClick={() => setEditorTab('app')}
                  >App.jsx</span>
                  <span
                    className={`lp-etab${editorTab === 'index' ? ' active' : ''}`}
                    onClick={() => setEditorTab('index')}
                  >index.js</span>
                </div>
                <pre
                  className="lp-editor-body"
                  dangerouslySetInnerHTML={{
                    __html: `<code>${editorTab === 'app' ? EDITOR_CODE_HTML : INDEX_CODE_HTML}</code>`
                  }}
                />
                <div className="lp-output">
                  <div className="lp-output-top">
                    <span className="lp-out-label">Output</span>
                    <span className="lp-out-value">Count: <strong>3</strong></span>
                  </div>
                  <div className="lp-console">
                    <span className="lp-console-lbl">Console</span>
                    {['Component rendered', 'Component rendered', 'Component rendered'].map((l, i) => (
                      <div key={i} className="lp-console-line">&gt; {l}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI PIPELINE ── */}
      {/* <section className="lp-section lp-pipeline">
        <div className="lp-section-inner">
          <div className="lp-section-header">
            <div className="lp-label-tag">Learning Pipeline</div>
            <h2 className="lp-section-h2">How we craft the <span className="lp-gradient-text">best learning experience</span></h2>
          </div>
          <div className="lp-pipeline-flow">
            {PIPELINE_STEPS.map((step, i) => (
              <div key={i} className="lp-pipeline-item">
                <div className="lp-pipeline-node"><span>{step.icon}</span></div>
                <p className="lp-pipeline-name">{step.label}</p>
                <p className="lp-pipeline-desc">{step.desc}</p>
                {i < PIPELINE_STEPS.length - 1 && <div className="lp-pipeline-conn">↓</div>}
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── VISUAL SHOWCASE ── */}
      <section className="lp-section lp-showcase">
        <div className="lp-section-inner">
          <div className="lp-section-header">
            <div className="lp-label-tag">Visual Learning Showcase</div>
            <h2 className="lp-section-h2">See how <span className="lp-gradient-text">complex topics</span> come to life</h2>
          </div>
          <div className="lp-showcase-grid">
            <div className="lp-sc-card">
              <p className="lp-sc-title">System Architecture</p>
              <div className="lp-arch-row">
                <div className="lp-arch-node client">Client<br /><small>React</small></div>
                <div className="lp-arch-conn">⇄</div>
                <div className="lp-arch-node api">API<br /><small>Express</small></div>
                <div className="lp-arch-conn">⇄</div>
                <div className="lp-arch-node db">DB<br /><small>Mongo</small></div>
              </div>
            </div>
            <div className="lp-sc-card">
              <p className="lp-sc-title">API Request Flow</p>
              <div className="lp-flow-col">
                {['Request', 'Middleware', 'Controller', 'Model', 'Response'].map((s, i) => (
                  <div key={i} className="lp-flow-item">
                    <span className="lp-flow-badge">{s}</span>
                    {i < 4 && <span className="lp-flow-down">↓</span>}
                  </div>
                ))}
              </div>
            </div>
            <div className="lp-sc-card">
              <p className="lp-sc-title">CSS Box Model</p>
              <div className="lp-box-model">
                <div className="lp-bm-margin">margin
                  <div className="lp-bm-border">border
                    <div className="lp-bm-padding">padding
                      <div className="lp-bm-content">content</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lp-sc-card">
              <p className="lp-sc-title">React Lifecycle</p>
              <div className="lp-lc-col">
                <div className="lp-lc-phase mount">Mount</div>
                <div className="lp-lc-arrow">↓</div>
                <div className="lp-lc-phase update">Update</div>
                <div className="lp-lc-arrow">↓</div>
                <div className="lp-lc-phase unmount">Unmount</div>
              </div>
            </div>
            <div className="lp-sc-card">
              <p className="lp-sc-title">Database Relations</p>
              <div className="lp-db-row">
                <div className="lp-db-tbl">
                  <div className="lp-db-head">Users</div>
                  <div className="lp-db-field pk">🔑 _id</div>
                  <div className="lp-db-field">name</div>
                  <div className="lp-db-field">email</div>
                </div>
                <div className="lp-db-rel">1 : N</div>
                <div className="lp-db-tbl">
                  <div className="lp-db-head">Orders</div>
                  <div className="lp-db-field pk">🔑 _id</div>
                  <div className="lp-db-field fk">🔗 userId</div>
                  <div className="lp-db-field">total</div>
                </div>
              </div>
            </div>
            <div className="lp-sc-card">
              <p className="lp-sc-title">Full Stack Flow</p>
              <div className="lp-stack-col">
                <div className="lp-stack-layer fe">Frontend — React</div>
                <div className="lp-stack-arrow">⇅ HTTP</div>
                <div className="lp-stack-layer be">Backend — Express</div>
                <div className="lp-stack-arrow">⇅ Mongoose</div>
                <div className="lp-stack-layer db">Database — MongoDB</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRACTICE & INTERVIEW ── */}
      <section className="lp-section lp-practice">
        <div className="lp-section-inner">
          <div className="lp-section-header">
            <div className="lp-label-tag">Practice & Interview Prep</div>
            <h2 className="lp-section-h2">Get <span className="lp-gradient-text">job-ready</span> with real practice</h2>
          </div>
          <div className="lp-practice-layout">
            <div className="lp-tab-bar">
              {[['mcq', '📝 MCQ Quiz'], ['code', '💻 Coding'], ['debug', '🔍 Debugging'], ['interview', '🎯 Interview']].map(([k, label]) => (
                <button key={k} className={`lp-tab ${activeTab === k ? 'active' : ''}`} onClick={() => setActiveTab(k)}>{label}</button>
              ))}
            </div>
            <div className="lp-tab-panel">
              {activeTab === 'mcq' && (
                <div className="lp-mcq">
                  <p className="lp-q-text">What does useEffect's dependency array control?</p>
                  {['When the effect cleanup runs', 'When the effect runs based on value changes', 'The component re-render cycle', 'The order of hook execution'].map((opt, i) => (
                    <div key={i} className={`lp-option ${i === 1 ? 'correct' : ''}`}>
                      <span className="lp-opt-letter">{['A', 'B', 'C', 'D'][i]}</span>
                      <span>{opt}</span>
                      {i === 1 && <span className="lp-correct-tick">✓</span>}
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'code' && (
                <div className="lp-code-challenge">
                  <p className="lp-challenge-heading">🏆 Reverse a string in JavaScript</p>
                  <pre className="lp-ch-code"><code>{`function reverseString(str) {
  return str.split('').reverse().join('');
}
console.log(reverseString('Dev.EL'));
// Output: LE.veD`}</code></pre>
                </div>
              )}
              {activeTab === 'debug' && (
                <div className="lp-debug">
                  <p className="lp-challenge-heading">🔍 Find the bug:</p>
                  <pre className="lp-ch-code buggy"><code>{`useEffect(() => {
  fetchData();
}); // ⚠️ Missing dependency array!
   // Runs on EVERY render`}</code></pre>
                  <div className="lp-fix-hint">💡 Fix: Add <code>[]</code> as second argument to run only once</div>
                </div>
              )}
              {activeTab === 'interview' && (
                <div className="lp-interview">
                  {[
                    { q: 'Explain the Virtual DOM in React and how it works', level: 'Beginner' },
                    { q: 'What is Event Loop in Node.js?', level: 'Intermediate' },
                    { q: 'What are the differences between SQL and NoSQL?', level: 'Intermediate' },
                    { q: 'How does JWT Authentication work?', level: 'Advanced' },
                  ].map((item, i) => (
                    <div key={i} className="lp-iq-card">
                      <span className={`lp-level ${item.level.toLowerCase().split(' ')[0]}`}>{item.level}</span>
                      <p>{item.q}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── COURSES (Track drill-down) ── */}
      {/* <section className="lp-section lp-courses">
        <div className="lp-section-inner">
          <div className="lp-section-header">
            <div className="lp-label-tag">Start Learning Today</div>
            {!selectedCourseTrack
              ? <h2 className="lp-section-h2">Our <span className="lp-gradient-text">Learning Tracks</span></h2>
              : (
                <div className="lp-courses-drill-header">
                  <button className="lp-back-btn" onClick={() => setSelectedCourseTrack(null)}>
                    ← Back to Tracks
                  </button>
                  <h2 className="lp-section-h2">
                    {selectedTrackObj?.icon} <span className="lp-gradient-text">{selectedCourseTrack}</span>
                  </h2>
                </div>
              )
            }
            {!selectedCourseTrack && <p className="lp-section-p">Click a track to explore its courses</p>}
          </div>

          {!selectedCourseTrack && (
            <div className="lp-course-tracks-grid">
              {dbTracks.length === 0 ? (
                <p style={{ color: '#aaa', fontSize: '14px', padding: '24px 0' }}>No tracks available yet. Check back soon!</p>
              ) : dbTracks.map((track, i) => {
                const h = LEARNING_TRACKS.find(x => x.name === track.name) || {};
                const color = h.color || '#6366f1';
                const courses = getDbTrackCourses(track);
                const totalPct = user && courses.length > 0
                  ? Math.round(courses.reduce((s, c) => s + (courseProgress[c.id] ?? 0), 0) / courses.length)
                  : 0;
                const trackIdentifier = track.slug || track._id;
                return (
                  <div
                    key={i}
                    className="lp-ct-card"
                    style={{ '--cc': color, cursor: 'pointer' }}
                    onClick={() => {
                      try { logEvent(getAnalytics(), 'track_click', { track: track.name }); } catch { }
                      navigate(`/track/${trackIdentifier}`);
                    }}
                  >
                    <div className="lp-ct-glow" />
                    <div className="lp-ct-top">
                      <span className="lp-ct-icon">{track.icon || h.icon || '🛤️'}</span>
                      {user && totalPct > 0 && <CourseProgressRing pct={totalPct} color={color} />}
                    </div>
                    <h3 className="lp-ct-name">{track.name}</h3>
                    <p className="lp-ct-desc">{track.description || (h.techs ? h.techs.join(', ') + '.' : '')}</p>
                    <div className="lp-ct-footer">
                      <span className="lp-ct-count">{courses.length} course{courses.length !== 1 ? 's' : ''}</span>
                      <span className="lp-ct-cta">Explore →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {selectedCourseTrack && (
            <div className="lp-courses-grid">
              {selectedTrackCourses.map((course) => {
                const pct = courseProgress[course.id] ?? 0;
                return (
                  <div key={course.id} className="lp-course-card" style={{ '--cc': course.color }}
                    onClick={() => handleCourseClick(course)}>
                    <div className="lp-cc-glow" />
                    <div className="lp-cc-top">
                      <span className="lp-cc-icon">{course.icon}</span>
                      {user && pct > 0 && <CourseProgressRing pct={pct} color={course.color} />}
                    </div>
                    <h3 className="lp-cc-name">{course.name}</h3>
                    <p className="lp-cc-desc">{course.description}</p>
                    <div className="lp-cc-cta">Start Learning →</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section> */}

      {/* ── ANALYTICS ── */}
      <section className="lp-section lp-analytics">
        <div className="lp-section-inner">
          <div className="lp-section-header">
            <div className="lp-label-tag">Track. Analyze. Improve.</div>
            <h2 className="lp-section-h2">Powerful analytics to keep you <span className="lp-gradient-text">on track</span></h2>
          </div>
          <div className="lp-analytics-grid">
            <div className="lp-an-card">
              <div className="lp-an-icon">📊</div>
              <div className="lp-an-val">72%</div>
              <div className="lp-an-lbl">Overall Progress</div>
              <div className="lp-an-bar"><div className="lp-an-fill" style={{ width: '72%' }} /></div>
            </div>
            <div className="lp-an-card">
              <div className="lp-an-icon">📚</div>
              <div className="lp-an-val">248</div>
              <div className="lp-an-lbl">Lessons Completed</div>
              <div className="lp-an-trend up">↑ +18 this week</div>
            </div>
            <div className="lp-an-card">
              <div className="lp-an-icon">🎯</div>
              <div className="lp-an-val">85%</div>
              <div className="lp-an-lbl">Quiz Accuracy</div>
              <div className="lp-an-bar"><div className="lp-an-fill green" style={{ width: '85%' }} /></div>
            </div>
            <div className="lp-an-card">
              <div className="lp-an-icon">🔥</div>
              <div className="lp-an-val">12</div>
              <div className="lp-an-lbl">Day Streak</div>
              <div className="lp-an-trend up">Keep it up! 🚀</div>
            </div>
            <div className="lp-an-card wide">
              <div className="lp-an-lbl" style={{ marginBottom: '12px' }}>Weekly Activity</div>
              <div className="lp-bar-chart">
                {[40, 65, 45, 80, 70, 90, 60].map((h, i) => (
                  <div key={i} className="lp-bc-col">
                    <div className="lp-bc-bar" style={{ height: `${h}%` }} />
                    <span>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="lp-section lp-testimonials">
        <div className="lp-section-inner">
          <div className="lp-section-header">
            <div className="lp-label-tag">Loved by Developers</div>
            <h2 className="lp-section-h2">Join thousands of learners <span className="lp-gradient-text">growing with Dev.EL</span></h2>
          </div>
          <div className="lp-testi-track">
            <div className="lp-testi-inner">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <div key={i} className="lp-testi-card">
                  <div className="lp-testi-stars">{'★'.repeat(t.rating)}</div>
                  <p className="lp-testi-text">"{t.text}"</p>
                  <div className="lp-testi-author">
                    <div className="lp-testi-avatar">{t.avatar}</div>
                    <div>
                      <p className="lp-testi-name">{t.name}</p>
                      <p className="lp-testi-role">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="lp-section lp-cta">
        <div className="lp-cta-bg">
          <div className="lp-orb lp-cta-orb1" />
          <div className="lp-orb lp-cta-orb2" />
        </div>
        <div className="lp-cta-inner">
          <h2 className="lp-cta-h2">Build Real Skills.<br /><span className="lp-gradient-text">Learn Visually. Grow Faster.</span></h2>
          <p className="lp-cta-p">Join Dev.EL today and accelerate your developer journey with visual, hands-on interactive learning.</p>
          <div className="lp-cta-btns">
            <button className="lp-btn-primary lp-btn-lg" onClick={() => { scrollTo(tracksRef); try { logEvent(getAnalytics(), 'start_learning_click'); } catch { } }}>Start Learning Now</button>
            <button className="lp-btn-outline lp-btn-lg" onClick={() => scrollTo(tracksRef)}>Explore Courses</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <div className="lp-footer-top">
          <div className="lp-footer-brand">
            <div className="lp-footer-logo">
              <img src={logo} alt="Dev.EL" />
              <span>Dev<span className="lp-dot">.</span>EL</span>
            </div>
            <p>Interactive platform for developers to learn, practice and grow with an AI tutor by your side.</p>
            <div className="lp-socials">
              <a href="https://github.com" target="_blank" rel="noreferrer">🐙</a>
              <a href="https://discord.com" target="_blank" rel="noreferrer">💬</a>
              <a href="mailto:pramodpulicherla350@gmail.com">📧</a>
            </div>
          </div>
          <div className="lp-footer-col">
            <h4>Tracks</h4>
            {['MERN Stack', 'MEAN Stack', 'AI Engineering', 'DevOps', 'Backend Development', 'Prompt Engineering'].map(t => (
              <a key={t} onClick={() => scrollTo(tracksRef)} style={{ cursor: 'pointer' }}>{t}</a>
            ))}
          </div>
          <div className="lp-footer-col">
            <h4>Courses</h4>
            <a onClick={() => navigate('/course/html/introduction-to-html')} style={{ cursor: 'pointer' }}>HTML</a>
            <a onClick={() => navigate('/course/css/css-get-started')} style={{ cursor: 'pointer' }}>CSS</a>
            <a onClick={() => navigate('/course/javascript/variables-data-types')} style={{ cursor: 'pointer' }}>JavaScript</a>
            <a onClick={() => navigate('/course/backend-nodejs-express/introduction-to-nodejs-and-node-repl')} style={{ cursor: 'pointer' }}>Node.js / Express</a>
            <a onClick={() => navigate('/course/git-and-github/introduction-to-git-and-github-version-control-essentials')} style={{ cursor: 'pointer' }}>Git & GitHub</a>
          </div>
          <div className="lp-footer-col">
            <h4>Company</h4>
            <a onClick={() => scrollTo(featuresRef)} style={{ cursor: 'pointer' }}>About</a>
            <a onClick={() => scrollTo(contactRef)} style={{ cursor: 'pointer' }}>Contact</a>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>

        <div className="lp-footer-contact" ref={contactRef}>
          <h3>Get in Touch</h3>
          <form className="lp-contact-form" onSubmit={handleSubmit}>
            <div className="lp-form-row">
              <input className="lp-input" type="text" placeholder="Your name" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} required />
              <input className="lp-input" type="email" placeholder="Your email" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} required />
            </div>
            <textarea className="lp-input lp-textarea" placeholder="Your message" rows={4} value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} required />
            <button type="submit" className="lp-btn-primary" disabled={formStatus === 'Sending...'}>
              {formStatus === 'Sending...' ? 'Sending...' : 'Send Message'}
            </button>
            {formStatus && formStatus !== 'Sending...' && <p className="lp-form-status">{formStatus}</p>}
          </form>
        </div>

        <div className="lp-footer-bottom">
          <p>© {new Date().getFullYear()} Dev.EL — All rights reserved.</p>
        </div>
      </footer>

      {isPopupOpen && <AuthPopup onClose={closePopup} />}
      {isDonateModalOpen && <DonateModal onClose={handleCloseDonate} />}

    </>
  );
}
