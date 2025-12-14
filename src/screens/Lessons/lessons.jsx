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
    

    useEffect(() => {
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
            if (contentAreaRef.current) {
                contentAreaRef.current.scrollTo = 0;
            }
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
                    <h2 className="course-title">{course.title}</h2>
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
                                                {lesson.title}
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