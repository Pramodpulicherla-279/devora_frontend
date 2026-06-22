import React, { useState, useEffect, useRef, useMemo, memo, useCallback } from 'react';
import { useParams, useSearchParams, useNavigate, useLoaderData } from 'react-router-dom'
import {
    SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, SandpackConsole,
} from '@codesandbox/sandpack-react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import './lessons.css'; // Import the new CSS file
import { API_BASE_URL } from '../../../config';
import { authFetch } from '../../utils/authFetch';
import { updateStreak, recordQuizResult } from '../../utils/userStats';
import Split from 'react-split';
import { TbBorderRadius, TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { parseLessonContent } from '../../components/visualizations/utils/lessonParser';
import AiTutorChat from '../../components/AiTutorChat/AiTutorChat';
import SandboxGuide from '../../components/SandboxGuide/SandboxGuide';
import FillBlanksSection from '../../components/FillBlanks/FillBlanks';

/* ── Dynamic Sandpack config by course ── */
function getSandpackConfig(courseSlug) {
    const s = (courseSlug || '').toLowerCase();
    if (s === 'html') return {
        template: 'static',
        files: {
            '/index.html': { code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>HTML Practice</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n\n  <h1>Hello, HTML! ✏️</h1>\n  <p>Edit this file to practice HTML.</p>\n\n</body>\n</html>`, active: true },
            '/styles.css': { code: `body {\n  font-family: sans-serif;\n  padding: 24px;\n  background: #f9fafb;\n  color: #111;\n}` },
        },
    };
    if (s === 'css') return {
        template: 'static',
        files: {
            '/index.html': { code: `<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <h1>CSS Practice 🎨</h1>\n  <p class="subtitle">Style me with CSS!</p>\n  <div class="box">A box</div>\n  <button class="btn">Click me</button>\n</body>\n</html>` },
            '/styles.css': { code: `/* ── Edit CSS here ── */\nbody {\n  font-family: sans-serif;\n  padding: 24px;\n}\n\n.subtitle { color: steelblue; font-size: 18px; }\n\n.box {\n  width: 120px;\n  height: 120px;\n  background: coral;\n  border-radius: 8px;\n  margin: 16px 0;\n}\n\n.btn {\n  padding: 10px 22px;\n  background: #6366f1;\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 15px;\n}`, active: true },
        },
    };
    if (s === 'javascript') return {
        template: 'vanilla',
        files: {
            '/index.html': { code: `<!DOCTYPE html>\n<html>\n<body>\n  <h2>JavaScript Practice ⚡</h2>\n  <div id="output"></div>\n  <script type="module" src="index.js"></script>\n</body>\n</html>` },
            '/index.js': { code: `// ── JavaScript Practice ──\n\nconst message = 'Hello, JavaScript!';\nconsole.log(message);\n\n// Render to the page\ndocument.getElementById('output').innerHTML =\n  \`<p style="color:#7c3aed;font-family:sans-serif">\${message}</p>\`;`, active: true },
        },
    };
    if (s === 'backend-nodejs-express') return {
        template: 'node',
        files: {
            '/index.js': { code: `// ── Node.js Practice 🟢 ──\n\nconsole.log('Hello from Node.js!');\n\nconst os = require('os');\nconsole.log('Platform:', os.platform());\nconsole.log('Node version:', process.version);\n\n// Try requiring a module:\nconst path = require('path');\nconsole.log('__dirname equivalent:', path.resolve('.'));`, active: true },
        },
    };
    if (s === 'sql') return {
        template: 'vanilla',
        files: {
            '/index.js': { code: `// ── SQL Practice (JS simulation) 🗄️ ──\n// Real SQL runs on a server. Here we simulate queries with JS arrays.\n\nconst users = [\n  { id: 1, name: 'Alice', age: 30, city: 'NYC' },\n  { id: 2, name: 'Bob',   age: 25, city: 'LA'  },\n  { id: 3, name: 'Charlie', age: 35, city: 'NYC' },\n];\n\n// SELECT * FROM users WHERE city = 'NYC'\nconst nycUsers = users.filter(u => u.city === 'NYC');\nconsole.log('NYC users:', nycUsers);\n\n// SELECT name, age ORDER BY age ASC\nconst sorted = [...users].sort((a,b)=>a.age-b.age).map(({name,age})=>({name,age}));\nconsole.log('By age:', sorted);`, active: true },
        },
    };
    // terminal / git / default
    return {
        template: 'static',
        files: {
            '/index.html': { code: `<!DOCTYPE html>\n<html>\n<head><link rel="stylesheet" href="styles.css"></head>\n<body>\n  <h1>Practice Zone 🛠️</h1>\n  <p>Edit the code and see your changes live.</p>\n</body>\n</html>`, active: true },
            '/styles.css': { code: `body { font-family: sans-serif; padding: 24px; color: #333; }` },
        },
    };
}

const DynamicSandbox = memo(function DynamicSandbox({ courseSlug, aiEnabled, lesson, onDisable }) {
    const config = useMemo(() => getSandpackConfig(courseSlug), [courseSlug]);
    // 'node' template runs on the server (no DOM preview) — show a console instead.
    const isServerSide = config.template === 'node';
    return (
        <SandpackProvider template={config.template} files={config.files} theme="dark">
            {/* Code Guide bar sits above the editor; its hint output is a floating
                modal (rendered via portal), so it never pushes the editor height. */}
            {aiEnabled && <SandboxGuide lesson={lesson} onDisable={onDisable} />}
            <SandpackLayout style={{ height: aiEnabled ? '64vh' : '70vh', borderRadius: 0 }}>
                <SandpackCodeEditor showLineNumbers showTabs style={{ height: '100%' }} />
                {isServerSide
                    ? <SandpackConsole style={{ height: '100%' }} />
                    : <SandpackPreview showOpenInCodeSandbox showRefreshButton style={{ height: '100%' }} />}
            </SandpackLayout>
            {!isServerSide && (
                <SandpackConsole showHeader resetOnPreviewRestart style={{ height: '16vh' }} />
            )}
        </SandpackProvider>
    );
});

/* ── Quiz Section with performance insights + retry ── */
function QuizSection({ quiz }) {
    // ── ALL hooks must be called unconditionally at the top ──
    const [selected, setSelected] = useState({});
    const [revealed, setRevealed] = useState({});
    const [attempt, setAttempt] = useState(1);
    const recordedRef = React.useRef(false); // guard: record once per attempt

    // Derived values needed by the effect — safe even when quiz is empty
    const hasQuiz = Array.isArray(quiz) && quiz.length > 0;
    const revealedCount = Object.keys(revealed).length;
    const score = hasQuiz
        ? Object.keys(revealed).reduce(
              (acc, qi) => acc + (selected[qi] === quiz[Number(qi)].correctIndex ? 1 : 0),
              0
          )
        : 0;
    const allRevealed = hasQuiz && revealedCount === quiz.length;

    // useEffect BEFORE the early return — keeps hook order stable on every render
    React.useEffect(() => {
        if (allRevealed && !recordedRef.current) {
            recordedRef.current = true;
            recordQuizResult(score, hasQuiz ? quiz.length : 0);
        }
    }, [allRevealed, score, hasQuiz, quiz?.length]); // eslint-disable-line react-hooks/exhaustive-deps

    // Early return AFTER all hooks
    if (!hasQuiz) return null;

    const handleSelect = (qi, oi) => { if (!revealed[qi]) setSelected(p => ({ ...p, [qi]: oi })); };
    const handleReveal = (qi) => setRevealed(p => ({ ...p, [qi]: true }));
    const handleRevealAll = () => {
        const all = {};
        quiz.forEach((_, i) => { all[i] = true; });
        setRevealed(all);
    };
    const handleRetry = () => {
        setSelected({});
        setRevealed({});
        setAttempt(a => a + 1);
        recordedRef.current = false; // allow recording on the next attempt
    };

    const pct = allRevealed ? Math.round((score / quiz.length) * 100) : 0;

    return (
        <div className="lesson-quiz-section">
            <div className="lqs-header">
                <div className="lqs-title">
                    <span className="lqs-icon">🧠</span>
                    Knowledge Check
                    {attempt > 1 && <span className="lqs-attempt-badge">Attempt #{attempt}</span>}
                </div>
                {!allRevealed && revealedCount > 0 && (
                    <button className="lqs-reveal-all-btn" onClick={handleRevealAll}>
                        Reveal All
                    </button>
                )}
            </div>

            {quiz.map((q, qi) => {
                const isRevealed = !!revealed[qi];
                const userAnswer = selected[qi];
                return (
                    <div key={`${attempt}-${qi}`} className="lqs-card">
                        <div className="lqs-q-num">Question {qi + 1} of {quiz.length}</div>
                        <div className="lqs-question">{q.question}</div>
                        <div className="lqs-options">
                            {q.options.map((opt, oi) => {
                                let cls = 'lqs-option';
                                if (isRevealed) {
                                    if (oi === q.correctIndex) cls += ' correct';
                                    else if (oi === userAnswer) cls += ' wrong';
                                } else if (oi === userAnswer) cls += ' selected';
                                return (
                                    <div key={oi} className={cls} onClick={() => handleSelect(qi, oi)}>
                                        <span className="lqs-opt-letter">{String.fromCharCode(65 + oi)}</span>
                                        <span className="lqs-opt-text">{opt}</span>
                                        {isRevealed && oi === q.correctIndex && <span className="lqs-tick">✓</span>}
                                        {isRevealed && oi === userAnswer && oi !== q.correctIndex && <span className="lqs-cross">✗</span>}
                                    </div>
                                );
                            })}
                        </div>
                        {!isRevealed && userAnswer !== undefined && (
                            <button className="lqs-reveal-btn" onClick={() => handleReveal(qi)}>Check Answer</button>
                        )}
                        {isRevealed && q.explanation && (
                            <div className="lqs-explanation">
                                <span className="lqs-exp-icon">💡</span>
                                <span>{q.explanation}</span>
                            </div>
                        )}
                    </div>
                );
            })}

            {/* ── Performance summary ── */}
            {allRevealed && (
                <div className="lqs-summary">
                    <div className="lqs-summary-top">
                        <div className="lqs-summary-score">
                            <span className="lqs-summary-num" style={{ color: pct === 100 ? '#22c55e' : pct >= 60 ? '#f59e0b' : '#ef4444' }}>
                                {score}/{quiz.length}
                            </span>
                            <span className="lqs-summary-label">
                                {pct === 100 ? '🎉 Perfect score!' : pct >= 60 ? '👍 Good job!' : '📚 Keep practising'}
                            </span>
                        </div>
                        <button className="lqs-retry-btn" onClick={handleRetry}>🔄 Retry Quiz</button>
                    </div>
                    <div className="lqs-perf-bar">
                        <div className="lqs-perf-correct" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="lqs-perf-legend">
                        <span className="lqs-legend-correct">✓ {score} correct</span>
                        <span className="lqs-legend-wrong">✗ {quiz.length - score} incorrect</span>
                        <span className="lqs-legend-pct">{pct}%</span>
                    </div>
                    {quiz.length - score > 0 && (
                        <div className="lqs-missed-list">
                            <p className="lqs-missed-title">Questions to review:</p>
                            {quiz.map((q, qi) => selected[qi] !== q.correctIndex && (
                                <div key={qi} className="lqs-missed-item">
                                    <span className="lqs-missed-num">Q{qi + 1}</span>
                                    <span className="lqs-missed-q">{q.question}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

/* ── Interview Questions Section ── */
function InterviewSection({ interviewQuestions }) {
    const [expanded, setExpanded] = useState({});

    if (!interviewQuestions || interviewQuestions.length === 0) return null;

    const levels = ['beginner', 'intermediate', 'advanced'];
    const levelConfig = {
        beginner: { label: 'Beginner', color: '#22c55e', bg: '#f0fdf4', icon: '🌱' },
        intermediate: { label: 'Intermediate', color: '#f59e0b', bg: '#fffbeb', icon: '🚀' },
        advanced: { label: 'Advanced', color: '#ef4444', bg: '#fef2f2', icon: '🧠' },
    };

    const toggle = (i) => setExpanded(prev => ({ ...prev, [i]: !prev[i] }));

    return (
        <div className="lesson-iq-section">
            <div className="liq-header">
                <span className="liq-icon">🎯</span>
                Interview Preparation
            </div>
            <p className="liq-sub">Practice these questions to prepare for technical interviews.</p>

            {levels.map(level => {
                const qs = interviewQuestions.filter(q => q.level === level);
                if (qs.length === 0) return null;
                const cfg = levelConfig[level];
                return (
                    <div key={level} className="liq-level-group">
                        <div className="liq-level-badge" style={{ color: cfg.color, borderColor: cfg.color }}>
                            {cfg.icon} {cfg.label} ({qs.length})
                        </div>
                        {qs.map((q, localIdx) => {
                            const globalIdx = interviewQuestions.indexOf(q);
                            const isOpen = !!expanded[globalIdx];
                            return (
                                <div key={globalIdx} className={`liq-card ${isOpen ? 'open' : ''}`}>
                                    <div className="liq-q-row" onClick={() => toggle(globalIdx)}>
                                        <span className="liq-q-text">{q.question}</span>
                                        <span className="liq-toggle">{isOpen ? '▲' : '▼'}</span>
                                    </div>
                                    {isOpen && (
                                        <div className="liq-answer" style={{ borderLeft: `3px solid ${cfg.color}` }}>
                                            {q.answer}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

function CourseScreen() {
    const params = useParams();
    const { courseSlug, lessonSlug } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Course data comes from the route loader (src/routes/course.jsx) so the page
    // prerenders with real lesson content. Seed state from it; the effect below
    // still refetches on the client for fresh + user-specific data.
    const loaderData = useLoaderData();
    const initialCourse = loaderData?.course ?? null;
    const seededTopic = (() => {
        if (!initialCourse?.parts) return null;
        for (const part of initialCourse.parts) {
            const l = part.lessons?.find((x) => x.slug === lessonSlug);
            if (l) return { lesson: l, partId: part._id };
        }
        const fp = initialCourse.parts[0];
        return fp?.lessons?.[0] ? { lesson: fp.lessons[0], partId: fp._id } : null;
    })();

    const [course, setCourse] = useState(initialCourse);
    const [expandedPart, setExpandedPart] = useState(seededTopic?.partId ?? null);
    const [activeTopic, setActiveTopic] = useState(seededTopic?.lesson ?? null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isPracticeOpen, setIsPracticeOpen] = useState(false);
    const contentAreaRef = useRef(null);
    const savedScrollRef = useRef(0);  // persists lesson scroll pos across practice toggle
    const [user, setUser] = useState(null);
    const [progressPercentage, setProgressPercentage] = useState(0);
    const [completedLessonIds, setCompletedLessonIds] = useState([]); // <-- add this
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isDesktop, setIsDesktop] = useState(true);
    const [showAiChatPopup, setShowAiChatPopup] = useState(false);
    const [aiSandboxEnabled, setAiSandboxEnabled] = useState(false);

    // Shared lesson context — passed to both the sandbox Code Guide and the chat popup
    // so the AI always knows which lesson/course the learner is working in.
    const lessonCtx = useMemo(() => ({
        course_id: course?._id || courseSlug,
        course_slug: courseSlug,
        module_id: activeTopic?.partId || activeTopic?.part || null,
        lesson_id: activeTopic?._id || activeTopic?.lessonId || null,
        lesson_title: activeTopic?.title || 'this lesson',
        lesson_slug: activeTopic?.slug || lessonSlug || '',
        topic: activeTopic?.title || course?.title || '',
    }), [course, courseSlug, activeTopic, lessonSlug]);

    // Track slug for progress scoping — read once at mount from localStorage (set by TrackScreen).
    // Falls back to 'global' when a lesson is opened directly without a track context.
    const trackSlugRef = useRef(typeof localStorage !== 'undefined' ? (localStorage.getItem('currentTrackSlug') || 'global') : 'global');

    // SEO meta + JSON-LD for this route is provided by the route module's
    // `meta` export (src/routes/course.jsx), so it lands in the prerendered HTML.

    // const currentCourseId = currentCourse?._id;

    const scrollContentToTop = () => {
        if (contentAreaRef.current) {
            contentAreaRef.current.scrollTo({ top: 0 });
        }
    };

    // Mock data for demonstration
    const exampleCode = {
        html: `<h1>Practice Zone</h1>\n<p>Edit the code to see changes.</p>`,
        css: `body { background-color: #fff; color: #333; }`,
        js: `console.log('Practice environment loaded.');`
    };

    // Debug logs
    // console.log("All params:", params);
    // console.log("Course slug:", courseSlug);
    // console.log("Current URL:", window.location.href);

    // useEffect(() => {

    // }, []);

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 768);
        // Sync the real viewport on mount — SSR seeds desktop defaults to keep
        // the server and first client render identical (no hydration mismatch).
        setIsDesktop(window.innerWidth >= 768);
        setIsSidebarOpen(window.innerWidth > 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');

        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }

        // if (!courseSlug) {
        //     console.log("No course slug provided in URL");
        //     return;
        // }

        const fetchCourseDetails = async () => {
            try {
                // This endpoint needs to be created on your backend.
                // It should fetch a course and populate its parts and lessons.
                const response = await fetch(`${API_BASE_URL}/api/courses/${courseSlug}`);
                const result = await response.json();

                if (result.success) {
                    const fetchedCourse = result.data;
                    // console.log('COURSE API result.data:', fetchedCourse);
                    setCourse(fetchedCourse);

                    // const lessonSlugFromUrl = searchParams.get('lesson');
                    // collect already-completed lessons from backend, if provided
                    const initialCompleted = [];
                    fetchedCourse.parts.forEach(part => {
                        part.lessons.forEach(lesson => {
                            if (lesson.completed) {
                                initialCompleted.push(String(lesson._id));
                            }
                        });
                    });
                    setCompletedLessonIds(initialCompleted);

                    // If a lesson ID is in the URL, find and set it as active
                    if (lessonSlug) {
                        for (const part of fetchedCourse.parts) {
                            const lesson = part.lessons.find(l => l.slug === lessonSlug);
                            if (lesson) {
                                setActiveTopic(lesson);
                                setExpandedPart(part._id);
                                break;
                            }
                        }
                    } else if (fetchedCourse.parts && fetchedCourse.parts.length > 0) {
                        // Otherwise, default to the first lesson of the first part
                        setExpandedPart(fetchedCourse.parts[0]._id);
                        if (fetchedCourse.parts[0].lessons && fetchedCourse.parts[0].lessons.length > 0) {
                            const firstLesson = fetchedCourse.parts[0].lessons[0];
                            setActiveTopic(firstLesson);
                            // Update URL to reflect the default selection
                            navigate(`/course/${courseSlug}/${firstLesson.slug}`, { replace: true });
                        }
                    }
                    // console.log(fetchedCourse)
                } else {
                    console.error("Failed to fetch course details:", result.error);
                }
            } catch (error) {
                console.error("Error fetching course details:", error);
            }
        };

        fetchCourseDetails();
    }, [courseSlug, navigate, searchParams]);

    // When user or course changes, load *course*-level progress
    useEffect(() => {
        // console.log('useEffect[user,course] fired. user:', user, 'course:', course);

        if (!user || !course) {
            console.log('Skipping fetchUserCourseProgress because user or course is missing');
            return;
        }

        // console.log('user token:', user.token);
        // console.log('Calling fetchUserCourseProgress with courseId:', course._id);
        fetchUserCourseProgress(course._id);
    }, [user, course]);

    // useEffect(() => {
    //     console.log('completedLessonIds state changed:', completedLessonIds);
    // }, [completedLessonIds]);

    useEffect(() => {
        // if (!user || !contentAreaRef.current || !activeTopic) return;

        const el = contentAreaRef.current;
        if (!el) return;

        const handleScroll = () => {
            // 1) update scroll progress (0–100)
            const maxScroll = el.scrollHeight - el.clientHeight;
            const percent = maxScroll > 0 ? (el.scrollTop / maxScroll) * 100 : 0;
            setScrollProgress(percent);

            // 2) if logged in, also run "near bottom" logic to mark lesson completed
            if (user && activeTopic && course) {
                const idStr = String(activeTopic._id);

                if (completedLessonIds.includes(idStr)) {
                    return;
                }

                const nearBottom =
                    el.scrollTop + el.clientHeight >= el.scrollHeight - 50; // 50px buffer

                if (nearBottom) {
                    markLessonCompleted();
                }
            }
        };

        // initialize once, in case the content is short
        handleScroll();

        el.addEventListener('scroll', handleScroll);
        return () => el.removeEventListener('scroll', handleScroll);
    }, [user, activeTopic, course, isPracticeOpen, completedLessonIds]); // dependencies


    const handlePartClick = (partId) => {
        setExpandedPart(expandedPart === partId ? null : partId); // Toggle expansion
    };

    const handleTopicClick = (topic) => {
        setActiveTopic(topic);
        navigate(`/course/${courseSlug}/${topic.slug}`);
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
        // Scroll to top of content area
        scrollContentToTop();
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const togglePractice = () => {
        setIsPracticeOpen((prev) => {
            const next = !prev;
            if (next) {
                // Save current scroll before the lesson-view ref gets a new DOM node
                savedScrollRef.current = contentAreaRef.current?.scrollTop ?? 0;
                setIsSidebarOpen(false);
            }
            return next;
        });
    };

    // Restore scroll position after Split mounts the new lesson-view DOM node
    useEffect(() => {
        if (!isPracticeOpen) return;
        const id = requestAnimationFrame(() => {
            if (contentAreaRef.current) {
                contentAreaRef.current.scrollTop = savedScrollRef.current;
            }
        });
        return () => cancelAnimationFrame(id);
    }, [isPracticeOpen]);

    // Navigation helper function
    const getNavigationInfo = () => {
        if (!course || !activeTopic) return { prev: null, next: null, nextPart: null };

        let currentPartIndex = -1;
        let currentLessonIndex = -1;

        // Find the current part and lesson indices
        for (let i = 0; i < course.parts.length; i++) {
            const lessonIndex = course.parts[i].lessons.findIndex(l => l._id === activeTopic._id);
            if (lessonIndex !== -1) {
                currentPartIndex = i;
                currentLessonIndex = lessonIndex;
                break;
            }
        }

        if (currentPartIndex === -1) return { prev: null, next: null, nextPart: null };

        const currentPart = course.parts[currentPartIndex];
        const lessons = currentPart.lessons;

        // Calculate previous lesson
        let prev = null;
        if (currentLessonIndex > 0) {
            prev = lessons[currentLessonIndex - 1];
        } else if (currentPartIndex > 0) {
            const previousPart = course.parts[currentPartIndex - 1];
            if (previousPart.lessons.length > 0) {
                prev = previousPart.lessons[previousPart.lessons.length - 1];
            }
        }

        // Calculate next lesson or next part
        let next = null;
        let nextPart = null;
        if (currentLessonIndex < lessons.length - 1) {
            next = lessons[currentLessonIndex + 1];
        } else if (currentPartIndex < course.parts.length - 1) {
            nextPart = course.parts[currentPartIndex + 1];
        }

        return { prev, next, nextPart };
    };

    const handleNavigation = (lesson, partId = null) => {
        if (lesson) {
            setActiveTopic(lesson);
            if (partId) setExpandedPart(partId);
            navigate(`/course/${courseSlug}/${lesson.slug}`, { replace: true });
            // Scroll to top when navigating
            scrollContentToTop();
            // if (contentAreaRef.current) {
            //     contentAreaRef.current.scrollTo = 0;
            // }
        } else if (partId) {
            // Navigate to the first lesson of the next part
            const part = course.parts.find(p => p._id === partId);
            if (part && part.lessons.length > 0) {
                const firstLesson = part.lessons[0];
                setActiveTopic(firstLesson);
                setExpandedPart(partId);
                navigate(`/course/${courseSlug}/${firstLesson.slug}`, { replace: true });
                // Scroll to top
                scrollContentToTop();
            }
        }
    };

    if (!course) {
        return (
            <div className="screen-container">
                <Header backToTrack={true} />
                <div className="page-container loading-container">
                    <h1>Loading course...</h1>
                </div>
                <Footer />
            </div>
        );
    }

    const { prev, next, nextPart } = getNavigationInfo();

    // Find the part that contains the current lesson
    const getCurrentPartForActiveLesson = () => {
        if (!course || !activeTopic) return null;
        return course.parts.find(part =>
            part.lessons.some(l => l._id === activeTopic._id)
        );
    };

    // Get user progress for that PART: /api/progress/parts/:partId
    const fetchUserCourseProgress = async (courseId) => {
        if (!user || !courseId) return;
        const token = user.token;

        try {
            const res = await authFetch(
                `${API_BASE_URL}/api/progress/courses/${courseId}?trackSlug=${trackSlugRef.current}`,
                { method: 'GET' }
            );

            if (!res.ok) {
                console.error('fetchUserCourseProgress failed with status', res.status);
                return;
            }

            const data = await res.json();
            // console.log('Progress API raw data:', data); 

            // many APIs wrap actual payload in data.data
            const payload = data.data || data;
            // console.log('Progress API payload:', payload);

            // course percent
            if (data && typeof data.percent === 'number') {
                setProgressPercentage(data.percent);
            }

            // ✅ fill completedLessonIds from progress API
            // adjust these field names to match your backend response
            if (Array.isArray(data.completedLessonIds)) {
                const ids = data.completedLessonIds.map((id) => String(id));
                // console.log('Completed lessons from API (ids -> strings):', ids);
                setCompletedLessonIds(ids);
            } else if (Array.isArray(data.completedLessons)) {
                // if backend sends objects, extract ids
                const ids = data.completedLessons.map((l) =>
                    String(typeof l === 'string' ? l : l._id || l.lessonId)
                );
                // console.log('Completed lessons from API (objects -> ids strings):', ids);
                setCompletedLessonIds(ids);
            }

        } catch (err) {
            console.error('Failed to fetch user course progress', err);
        }
    };




    const markLessonCompleted = async () => {
        if (!user || !activeTopic || !course) return;

        const token = user.token;

        try {
            // POST to your course-level progress endpoint
            const res = await authFetch(
                `${API_BASE_URL}/api/progress/lessons/${activeTopic._id}/complete`,
                {
                    method: 'POST',
                    body: JSON.stringify({ trackSlug: trackSlugRef.current }),
                }
            );

            if (!res.ok) {
                console.error('markLessonCompleted failed with status', res.status);
                return;
            }

            const data = await res.json();
            // saveProgress returns { success, total, completed, percent } at course level
            if (data && typeof data.percent === 'number') {
                setProgressPercentage(data.percent);

                // Update day-streak on every lesson completion
                updateStreak();

                // Auto-enroll in the track the user navigated from (stored by TrackScreen)
                const savedTrackSlug = localStorage.getItem('lastTrackSlug');
                if (savedTrackSlug) {
                    authFetch(`${API_BASE_URL}/api/users/tracks/enroll`, {
                        method: 'POST',
                        body: JSON.stringify({ slug: savedTrackSlug, action: 'enroll' }),
                    }).catch(() => {});
                    // Clear so we don't re-enroll on every lesson completion
                    localStorage.removeItem('lastTrackSlug');
                }

                // mark this lesson as completed in local state
                setCourse(prev => {
                    if (!prev) return prev;
                    return {
                        ...prev,
                        parts: prev.parts.map(part => ({
                            ...part,
                            lessons: part.lessons.map(lesson =>
                                lesson._id === activeTopic._id
                                    ? { ...lesson, completed: true }
                                    : lesson
                            ),
                        })),
                    };
                });
                // setActiveTopic(prev =>
                //     prev ? { ...prev, completed: true } : prev
                // );

                // also store id in our completed list (avoids losing it on navigation)
                // setCompletedLessonIds(prevIds =>
                //     prevIds.includes(activeTopic._id)
                //         ? prevIds
                //         : [...prevIds, activeTopic._id]
                // );
                setCompletedLessonIds(prevIds => {
                    const idStr = String(activeTopic._id);
                    return prevIds.includes(idStr) ? prevIds : [...prevIds, idStr];
                });
            } else {
                // fallback: re-fetch from GET /courses/:courseId
                await fetchUserCourseProgress(course._id);
            }
        } catch (err) {
            console.error('Failed to mark lesson as completed', err);
        }
    }

    // Circle configuration
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

    // Shared lesson body — rendered identically whether or not the
    // "Try Yourself" sandbox is open. Kept as an element (not a nested
    // component) so it isn't remounted on every parent re-render, which
    // would otherwise wipe quiz / fill-blank input state on scroll.
    const lessonBody = activeTopic && (
        <>
            {parseLessonContent(activeTopic.content)}
            <FillBlanksSection blanks={activeTopic.fillBlanks} />
            <QuizSection quiz={activeTopic.quiz} />
            <InterviewSection interviewQuestions={activeTopic.interviewQuestions} />
        </>
    );

    return (
        <div className="screen-container">
            <Header backToTrack={true} />
            <div className="page-container">
                <aside className={`sidebar hide-scrollbar ${isSidebarOpen ? 'open' : 'closed'}`}>
                     {!isDesktop && (
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="ls-sidebar-btn" style={{ margin: '12px 12px 4px' }}>
                        {isSidebarOpen ? <TbLayoutSidebarLeftCollapseFilled size={20} /> : <TbLayoutSidebarLeftExpandFilled size={20} />}
                        <span>Close</span>
                    </button>
                    )}

                    {user ? (
                        <div className="course-sidebar-header">

                            <h2 className="lesson-course-title">{course.title}</h2>
                            {/* Circular Progress Indicator */}
                            <div className="course-progress-circle">
                                <svg width="44" height="44" viewBox="0 0 44 44">
                                    <circle
                                        cx="22"
                                        cy="22"
                                        r={radius}
                                        fill="none"
                                        stroke="#e6e6e6"
                                        strokeWidth="4"
                                    />
                                    <circle
                                        cx="22"
                                        cy="22"
                                        r={radius}
                                        fill="none"
                                        stroke="#4caf50"
                                        strokeWidth="4"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={strokeDashoffset}
                                        strokeLinecap="round"
                                        transform="rotate(-90 22 22)"
                                        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                                    />
                                </svg>
                                <span className="course-progress-label">
                                    {Math.round(progressPercentage)}%
                                </span>
                            </div>
                        </div>
                    ) : (
                        <h2 className="lesson-course-title">{course.title}</h2>
                    )}


                    <nav>
                        {course.parts.map((part) => (
                            <div key={part._id}>
                                <div className="part-header" onClick={() => handlePartClick(part._id)}>
                                    {part.title}
                                    <span className="expand-icon">{expandedPart === part._id ? '−' : '+'}</span>
                                </div>
                                {expandedPart === part._id && (
                                    <ul className="topic-list">
                                        {part.lessons.map((lesson) => (
                                            <li
                                                key={lesson._id}
                                                className={`topic-item ${activeTopic?._id === lesson._id ? 'active-topic' : ''}`}
                                                onClick={() => handleTopicClick(lesson)}
                                            >
                                                <span>{lesson.title}</span>
                                                {(lesson.completed || completedLessonIds.includes(String(lesson._id))) && (
                                                    <span className="lesson-completed-icon">✔</span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </nav>
                </aside>

                {/* Mobile backdrop — closes sidebar when tapped */}
                {!isDesktop && isSidebarOpen && (
                    <div className="overlay" onClick={toggleSidebar} />
                )}

                <div className="main-content-wrapper">
                    {/* Right Content Area */}
                    <main className="content-area hide-scrollbar" >
                        {activeTopic ? (
                            <>
                                <div className="content-header">
                                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="ls-sidebar-btn">
                                        <span className="ls-sidebar-icon" aria-hidden="true">
                                            {isSidebarOpen ? <TbLayoutSidebarLeftCollapseFilled size={20} /> : <TbLayoutSidebarLeftExpandFilled size={20} />}
                                        </span>
                                        <span className="ls-sidebar-icon-fallback" aria-hidden="true">
                                            {isSidebarOpen ? '✕' : '☰'}
                                        </span>
                                        <span className="ls-sidebar-label">List of Lessons</span>
                                    </button>
                                    <p className='topic-title'>Topic: {activeTopic.title}</p>
                                    <div className="ls-header-actions">
                                        <button className="practice-toggle-btn" onClick={togglePractice}>
                                            {isPracticeOpen ? '✕ Close' : '✨ Try Yourself'}
                                        </button>
                                    </div>
                                </div>

                                {/* Scroll progress bar — sits below the top bar */}
                                <div className="lesson-scroll-progress">
                                    <div
                                        className="lesson-scroll-progress-fill"
                                        style={{ width: `${scrollProgress}%` }}
                                    />
                                </div>

                                <div className="content-body">
                                    {isPracticeOpen ? (
                                        <Split
                                            className="split"
                                            sizes={[50, 50]}
                                            minSize={200}
                                            gutterSize={10}
                                            cursor="col-resize"
                                        >
                                            <div className="lesson-view" ref={contentAreaRef}>
                                                {lessonBody}
                                            </div>
                                            <div className="practice-view">
                                                {/* When the Code Guide is off, show an Enable CTA bar.
                                                    When on, its own toolbar (with hint/fix actions and a
                                                    Disable button) renders inside the sandbox. */}
                                                {!aiSandboxEnabled && (
                                                    <div className="ls-ai-tutor-bar">
                                                        <span className="ls-ai-tutor-bar-icon">🤖</span>
                                                        <div className="ls-ai-tutor-bar-text">
                                                            <strong>Code Guide</strong>
                                                            <span>Real-time hints and debugging help while you code</span>
                                                        </div>
                                                        <button
                                                            className="ls-ai-tutor-bar-btn"
                                                            onClick={() => setAiSandboxEnabled(true)}
                                                        >
                                                            Enable →
                                                        </button>
                                                    </div>
                                                )}
                                                <div className="ls-sandbox-inner">
                                                    <DynamicSandbox
                                                        courseSlug={courseSlug}
                                                        aiEnabled={aiSandboxEnabled}
                                                        lesson={lessonCtx}
                                                        onDisable={() => setAiSandboxEnabled(false)}
                                                    />
                                                </div>
                                            </div>
                                        </Split>
                                    ) : (
                                        <div className="lesson-view" ref={contentAreaRef}>
                                            {lessonBody}
                                        </div>

                                    )}
                                </div>

                                {/* Navigation Buttons */}
                                <div className="navigation-buttons">
                                    {prev ? (
                                        <button
                                            className="nav-btn prev-btn"
                                            onClick={() => handleNavigation(prev)}
                                        >
                                            ← Previous
                                        </button>
                                    ) : (
                                        <div></div> // Empty div to maintain spacing
                                    )}

                                    {next ? (
                                        <button
                                            className="nav-btn next-btn"
                                            onClick={() => handleNavigation(next)}
                                        >
                                            Next →
                                        </button>
                                    ) : nextPart ? (
                                        <button
                                            className="nav-btn next-part-btn"
                                            onClick={() => handleNavigation(null, nextPart._id)}
                                        >
                                            Continue to {nextPart.title} →
                                        </button>
                                    ) : null}
                                </div>
                            </>
                        ) : (
                            <h1>Select a topic to start learning</h1>
                        )}
                    </main>
                </div>
            </div>
            {/* <Footer /> */}

            {/* ── Floating AI Chat widget (desktop + mobile) ── */}
            {!showAiChatPopup && (
                <div className="ls-ai-chat-fab-wrap">
                    <button
                        className="ls-ai-chat-fab"
                        onClick={() => setShowAiChatPopup(true)}
                        title="AI Chat — your context-aware tutor"
                    >
                        <span className="ls-ai-chat-fab-icon">💬</span>
                        <span className="ls-ai-chat-fab-label">AI Chat</span>
                    </button>
                </div>
            )}

            {/* ── AI Chat popup (context-aware tutor) ── */}
            {showAiChatPopup && (
                <AiTutorChat
                    onClose={() => setShowAiChatPopup(false)}
                    lesson={lessonCtx}
                />
            )}
        </div>
    );
}

export default CourseScreen;