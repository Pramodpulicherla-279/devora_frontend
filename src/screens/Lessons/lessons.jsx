import React, { useState, useEffect, useRef, useMemo, memo } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { Sandpack } from '@codesandbox/sandpack-react';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import './lessons.css'; // Import the new CSS file
import { API_BASE_URL } from '../../../config';
import Split from 'react-split';
import { TbBorderRadius, TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { parseLessonContent } from '../../components/visualizations/utils/lessonParser';

// A Code Editor component specifically for HTML, CSS, and JS
const CodeEditor = memo(function CodeEditor({ html = '', css = '', js = '' }) {
    const files = useMemo(
        () => ({
            '/index.html': { code: html, active: true },
            '/styles.css': css,
            '/index.js': `import './styles.css';\n\n${js}`,
        }),
        [html, css, js]
    );

    const options = useMemo(
        () => ({
            showLineNumbers: true,
            showTabs: true,
            showConsole: true,
            showConsoleButton: true,
            editorHeight: '80vh',
        }),
        []
    );

    return (
        <Sandpack
            template="vanilla"
            files={files}
            options={options}
            theme="dark"
        />
    );
});

function CourseScreen() {
    const params = useParams();
    const { courseSlug, lessonSlug } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [course, setCourse] = useState(null);
    const [expandedPart, setExpandedPart] = useState(null);
    const [activeTopic, setActiveTopic] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);;
    const [isPracticeOpen, setIsPracticeOpen] = useState(false);
    const contentAreaRef = useRef(null);
    const [user, setUser] = useState(null);
    const [progressPercentage, setProgressPercentage] = useState(0);
    const [completedLessonIds, setCompletedLessonIds] = useState([]); // <-- add this
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

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
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };

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
        // setIsPracticeOpen(!isPracticeOpen);
        setIsPracticeOpen((prev) => {
            const next = !prev;
            if (next) {
                // when practice opens, close the sidebar
                setIsSidebarOpen(false);
            }
            return next;
        });
    };

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
                <Header />
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
            const res = await fetch(`${API_BASE_URL}/api/progress/courses/${courseId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            });

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
            const res = await fetch(
                `${API_BASE_URL}/api/progress/lessons/${activeTopic._id}/complete`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
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

    return (
        <div className="screen-container">
            <Helmet>
                <title>{activeTopic ? `${activeTopic.title} - ${course?.title}` : course?.title || 'Course'} | Dev.eL</title>
                <meta
                    name="description"
                    content={activeTopic?.content?.substring(0, 155) || course?.description || 'Learn web development step by step with Dev.eL'}
                />
                <link rel="canonical" href={`https://dev-el.co/course/${courseSlug}${lessonSlug ? `/${lessonSlug}` : ''}`} />
            </Helmet>
            <Header />
            <div className="page-container">
                <aside className={`sidebar hide-scrollbar ${isSidebarOpen ? 'open' : 'closed'}`}>
                    {/* <div style={styles.bottomBar}> */}
                     {!isDesktop && (
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={styles.button}>
                        {isSidebarOpen ? <TbLayoutSidebarLeftCollapseFilled size={24} /> : <TbLayoutSidebarLeftExpandFilled size={24} />}
                        <span>List of Lessons</span>
                    </button>
                    )}
                    {/* </div> */}
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

                <div className="main-content-wrapper">
                    {/* <button type="button" className="hamburger-menu" onClick={toggleSidebar}>
                        {isSidebarOpen ? 'X' : '▶'}
                    </button> */}
                    {/* <button type="button" className="hamburger-menu" onClick={toggleSidebar}>
                        {isSidebarOpen ? <TbLayoutSidebarLeftCollapseFilled /> : <TbLayoutSidebarLeftExpandFilled />}
                    </button> */}
                    {/* <div style={styles.bottomBar}>
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={styles.button}>
                            {isSidebarOpen ? <TbLayoutSidebarLeftCollapseFilled size={24} /> : <TbLayoutSidebarLeftExpandFilled size={24} />}
                            <span>List of Lessons</span>
                        </button>
                    </div> */}
                    {/* {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>} */}


                    {/* Right Content Area */}
                    <main className="content-area hide-scrollbar" >
                        {activeTopic ? (
                            <>
                                {/* Scroll progress bar */}
                                <div className="lesson-scroll-progress">
                                    <div
                                        className="lesson-scroll-progress-fill"
                                        style={{ width: `${scrollProgress}%` }}
                                    />
                                </div>
                                <div className="content-header">
                                    {/* <div style={styles.bottomBar}> */}
                                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={styles.button}>
                                        {isSidebarOpen ? <TbLayoutSidebarLeftCollapseFilled size={24} /> : <TbLayoutSidebarLeftExpandFilled size={24} />}
                                        <span>List of Lessons</span>
                                    </button>
                                    {/* </div> */}
                                    <p className='topic-title'>Topic: {activeTopic.title}</p>
                                    <button className="practice-toggle-btn" onClick={togglePractice}>
                                        {isPracticeOpen ? 'Close Practice' : 'Start Practice'}
                                    </button>
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
                                            <div className="lesson-view hide-scrollbar" ref={contentAreaRef} >
                                                {parseLessonContent(activeTopic.content)}
                                                {/* <div dangerouslySetInnerHTML={{ __html: activeTopic.content }} /> */}
                                            </div>
                                            <div className="practice-view">
                                                <CodeEditor
                                                    html={activeTopic.code?.html || exampleCode.html}
                                                    css={activeTopic.code?.css || exampleCode.css}
                                                    js={activeTopic.code?.js || exampleCode.js}
                                                />
                                            </div>
                                        </Split>
                                    ) : (
                                        <div className="lesson-view" ref={contentAreaRef}>
                                            {parseLessonContent(activeTopic.content)}
                                            {/* <div dangerouslySetInnerHTML={{ __html: activeTopic.content }} /> */}
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
        </div>
    );
}

const styles = {
    bottomBar: {

        // width: '100%',            // Spans full width
        // backgroundColor: '#fff',  // White background

        // padding: '0px 20px',     // Spacing inside the bar
        // zIndex: 1000,             // Ensures it sits on top of content

    },
    button: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'none',
        border: 'none',
        color: '#333',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        border: '2px solid #e5e7eb', // Light gray border
        boxShadow: '0 -2px 10px rgba(0,0,0,0.05)', // Subtle shadow
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',        // Locks it to the screen
        top: 0,                // Aligns to the bottom
        left: 0,
    }
};
export default CourseScreen;