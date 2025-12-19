import React, { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { Sandpack } from '@codesandbox/sandpack-react';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import './lessons.css'; // Import the new CSS file
import { API_BASE_URL } from '../../../config';
import Split from 'react-split';
import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";

// A Code Editor component specifically for HTML, CSS, and JS
function CodeEditor({ html = '', css = '', js = '' }) {
    return (
        <Sandpack
            template="vanilla"
            files={{
                '/index.html': { code: html, active: true },
                '/styles.css': css,
                '/index.js': `import './styles.css';\n\n${js}`,
            }}
            options={{
                showLineNumbers: true,
                showTabs: true,
                showConsole: true,
                showConsoleButton: true,
                editorHeight: '80vh', // Make editor height responsive
            }}
            theme="dark"
        />
    );
}

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

    // const currentCourseId = currentCourse?._id;

    const scrollContentToTop = () => {
        if (contentAreaRef.current) {
            contentAreaRef.current.scrollTo({ top: 0, behavior: 'smooth' });
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
        const userInfo = localStorage.getItem('userInfo');

        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }

        if (!courseSlug) {
            console.log("No course slug provided in URL");
            return;
        }

        const fetchCourseDetails = async () => {
            try {
                // This endpoint needs to be created on your backend.
                // It should fetch a course and populate its parts and lessons.
                const response = await fetch(`${API_BASE_URL}/api/courses/${courseSlug}`);
                const result = await response.json();

                if (result.success) {
                    const fetchedCourse = result.data;
                    setCourse(fetchedCourse);

                    // const lessonSlugFromUrl = searchParams.get('lesson');
                    // collect already-completed lessons from backend, if provided
                    // const initialCompleted = [];
                    // fetchedCourse.parts.forEach(part => {
                    //     part.lessons.forEach(lesson => {
                    //         if (lesson.completed) {
                    //             initialCompleted.push(lesson._id);
                    //         }
                    //     });
                    // });
                    // setCompletedLessonIds(initialCompleted);

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
        console.log('useEffect[user,course] fired. user:', user, 'course:', course);

        if (!user || !course) {
            console.log('Skipping fetchUserCourseProgress because user or course is missing');
            return;
        }

        console.log('user token:', user.token);
        console.log('Calling fetchUserCourseProgress with courseId:', course._id);
        fetchUserCourseProgress(course._id);
    }, [user, course]);

    useEffect(() => {
        console.log('completedLessonIds state changed:', completedLessonIds);
    }, [completedLessonIds]);

    useEffect(() => {
        if (!user || !contentAreaRef.current || !activeTopic) return;

        const el = contentAreaRef.current;

        const handleScroll = () => {
            const nearBottom =
                el.scrollTop + el.clientHeight >= el.scrollHeight - 50; // 50px buffer

            if (nearBottom) {
                // This will call your POST endpoint and update course % from response
                markLessonCompleted();
            }
        };

        el.addEventListener('scroll', handleScroll);
        return () => el.removeEventListener('scroll', handleScroll);
    }, [user, activeTopic, course]); // dependencies


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
        setIsPracticeOpen(!isPracticeOpen);
    };

    useEffect(() => {

        // Add "Copy" buttons to code blocks in the rendered lesson HTML
        const containers = document.querySelectorAll('.lesson-view');

        containers.forEach((container) => {
            container
                .querySelectorAll('.copy-code-btn')
                .forEach((btn) => btn.remove());
        });

        containers.forEach((container) => {
            const codeBlocks = container.querySelectorAll('pre');
            codeBlocks.forEach((pre) => {
                // Avoid adding multiple buttons to the same block
                // if (pre.querySelector('.copy-code-btn')) return;

                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'copy-code-btn';
                btn.textContent = 'Copy';

                btn.addEventListener('click', () => {
                    const text = pre.innerText || '';
                    const copyFallback = () => {
                        const textarea = document.createElement('textarea');
                        textarea.value = text;
                        textarea.style.position = 'fixed';
                        textarea.style.left = '-9999px';
                        document.body.appendChild(textarea);
                        textarea.focus();
                        textarea.select();
                        try {
                            document.execCommand('copy');
                        } finally {
                            document.body.removeChild(textarea);
                        }
                    };

                    if (navigator.clipboard && window.isSecureContext) {
                        navigator.clipboard.writeText(text).catch(copyFallback);
                    } else {
                        copyFallback();
                    }
                    // Show "Copied" for 3 seconds
                    const originalText = btn.textContent;
                    btn.textContent = 'Copied';
                    btn.disabled = true;
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.disabled = false;
                    }, 3000);
                });

                pre.appendChild(btn);
            });
        });
        // Cleanup on unmount / dependency change
        return () => {
            containers.forEach((container) => {
                container
                    .querySelectorAll('.copy-code-btn')
                    .forEach((btn) => btn.remove());
            });
        };
    }, [activeTopic, isPracticeOpen, isSidebarOpen]);

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
            console.log('Progress API raw data:', data); // <--- log full response

            // course percent
            if (data && typeof data.percent === 'number') {
                setProgressPercentage(data.percent);
            }

            // ✅ fill completedLessonIds from progress API
            // adjust these field names to match your backend response
            if (Array.isArray(data.completedLessonIds)) {
                console.log('Completed lessons from API (ids):', data.completedLessonIds);
                setCompletedLessonIds(data.completedLessonIds);
            } else if (Array.isArray(data.completedLessons)) {
                // if backend sends objects, extract ids
                const ids = data.completedLessons.map((l) =>
                    typeof l === 'string' ? l : l._id || l.lessonId
                );
                console.log('Completed lessons from API (objects -> ids):', ids);
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
                setActiveTopic(prev =>
                    prev ? { ...prev, completed: true } : prev
                );

                // also store id in our completed list (avoids losing it on navigation)
                setCompletedLessonIds(prevIds =>
                    prevIds.includes(activeTopic._id)
                        ? prevIds
                        : [...prevIds, activeTopic._id]
                );

            } else {
                // fallback: re-fetch from GET /courses/:courseId
                await fetchUserCourseProgress(course._id);
            }
        } catch (err) {
            console.error('Failed to mark lesson as completed', err);
        }
    };

    // Calculate progress only for logged in users
    // let progressPercentage = 0;
    // if (user) {
    //     if (typeof course.progress === 'number') {
    //         progressPercentage = course.progress;
    //     } else {
    //         const totalLessons = course.parts.reduce((acc, part) => acc + part.lessons.length, 0);
    //         const completedLessons = course.parts.reduce(
    //             (acc, part) => acc + part.lessons.filter(l => l.completed).length,
    //             0
    //         );
    //         progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
    //     }
    // }

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
                <link rel="canonical" href={`https://www.dev-el.co/course/${courseSlug}${lessonSlug ? `/${lessonSlug}` : ''}`} />
            </Helmet>
            <Header />
            <div className="page-container">
                <aside className={`sidebar hide-scrollbar ${isSidebarOpen ? 'open' : 'closed'}`}>
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
                                                {(lesson.completed || completedLessonIds.includes(lesson._id)) && (
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
                    <button type="button" className="hamburger-menu" onClick={toggleSidebar}>
                        {isSidebarOpen ? <TbLayoutSidebarLeftCollapseFilled /> : <TbLayoutSidebarLeftExpandFilled />}
                    </button>
                    {/* {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>} */}


                    {/* Right Content Area */}
                    <main className="content-area hide-scrollbar" >
                        {activeTopic ? (
                            <>
                                <div className="content-header">
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
                                            <div className="lesson-view hide-scrollbar">
                                                <div dangerouslySetInnerHTML={{ __html: activeTopic.content }} />
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
                                            <div dangerouslySetInnerHTML={{ __html: activeTopic.content }} />
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
    // screenContainer: {
    //     display: 'flex',
    //     flexDirection: 'column',
    //     height: '100vh',
    // },
    // pageContainer: {
    //     paddingTop: '70px', // Height of the fixed header
    //     display: 'flex',
    //     flex: 1, // Takes up all available space between header and footer
    //     overflow: 'hidden', // Prevents the container itself from scrolling
    // },
    // sidebar: {
    //     width: '300px',
    //     // backgroundColor: '#f4f4f4',
    //     padding: '20px',
    //     // borderRight: '1px solid #ddd',
    //     // borderRadius: '28px',
    //     overflowY: 'auto', // Allows this column to scroll independently
    // },
    // courseTitle: {
    //     fontSize: '20px',
    //     fontWeight: 'bold',
    //     marginBottom: '20px',
    //             // backgroundColor: '#da2424ff',
    //             padding: '12px',



    // },
    // partHeader: {
    //     fontSize: '16px',
    //     fontWeight: 'bold',
    //     padding: '10px',
    //     cursor: 'pointer',
    //     marginBottom: '12px',
    //     borderRadius: '28px',
    //     display: 'flex',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     borderBottom: '1px solid #eee',
    //     // backgroundColor: '#5124daff',
    //     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',

    // },
    // expandIcon: {
    //     fontSize: '20px',
    // },
    // topicList: {
    //     listStyle: 'none',
    //     paddingLeft: '20px',
    //     margin: 0,
    // },
    // topicItem: {
    //     padding: '10px',
    //     cursor: 'pointer',
    //     borderRadius: '28px',
    //     marginBottom: '4px',
    // },
    // activeTopic: {
    //     backgroundColor: '#007bff',
    //     color: 'white',
    //     fontWeight: 'bold',
    // },
    // contentArea: {
    //     flex: 1,
    //     padding: '40px',
    //     overflowY: 'auto',
    // },
};

export default CourseScreen;