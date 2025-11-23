import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import './lessons.css'; // Import the new CSS file


const API_BASE_URL = "http://localhost:5000";

function CourseScreen() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [course, setCourse] = useState(null);
    const [expandedPart, setExpandedPart] = useState(null); 
    const [activeTopic, setActiveTopic] = useState(null);

     useEffect(() => {
        if (!courseId) return;

        const fetchCourseDetails = async () => {
            try {
                // This endpoint needs to be created on your backend.
                // It should fetch a course and populate its parts and lessons.
                const response = await fetch(`${API_BASE_URL}/api/courses/${courseId}`);
                const result = await response.json();

                if (result.success) {
                    const fetchedCourse = result.data;
                    setCourse(fetchedCourse);

                    const lessonIdFromUrl = searchParams.get('lesson');

                    // If a lesson ID is in the URL, find and set it as active
                    if (lessonIdFromUrl) {
                        for (const part of fetchedCourse.parts) {
                            const lesson = part.lessons.find(l => l._id === lessonIdFromUrl);
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
                            navigate(`?lesson=${firstLesson._id}`, { replace: true });
                        }
                    }
                    console.log(fetchedCourse)
                } else {
                    console.error("Failed to fetch course details:", result.error);
                }
            } catch (error) {
                console.error("Error fetching course details:", error);
            }
        };

        fetchCourseDetails();
    }, [courseId, navigate, searchParams]);

    const handlePartClick = (partId) => {
        setExpandedPart(expandedPart === partId ? null : partId); // Toggle expansion
    };

    const handleTopicClick = (topic) => {
        setActiveTopic(topic);
        navigate(`?lesson=${topic._id}`, { replace: true });
    };

    if (!course) {
        return (
            <div style={styles.screenContainer}>
                <Header />
                <div style={{...styles.pageContainer, justifyContent: 'center', alignItems: 'center'}}>
                    <h1>Loading course...</h1>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div style={styles.screenContainer}>
            <Header />
            <div style={styles.pageContainer}>
                {/* Left Sidebar */}
                <aside style={styles.sidebar} className="hide-scrollbar">
                    <h2 style={styles.courseTitle}>{course.title}</h2>
                    <nav>
                        {course.parts.map((part) => (
                            <div key={part._id}>
                                <div style={styles.partHeader} onClick={() => handlePartClick(part._id)}>
                                    {part.title}
                                    <span style={styles.expandIcon}>{expandedPart === part._id ? '−' : '+'}</span>
                                </div>
                                {expandedPart === part._id && (
                                    <ul style={styles.topicList}>
                                        {/* BUG FIX 2: Use 'lessons' instead of 'topics' */}
                                        {part.lessons.map((lesson) => (
                                            <li
                                                key={lesson._id}
                                                style={activeTopic?._id === lesson._id ? { ...styles.topicItem, ...styles.activeTopic } : styles.topicItem}
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

                {/* Right Content Area */}
                <main style={styles.contentArea} className="hide-scrollbar">
                    {activeTopic ? (
                        <>
                            <h1>{activeTopic.title}</h1>
                            {/* <p>{activeTopic.content}</p> */}
                            <div dangerouslySetInnerHTML={{ __html: activeTopic.content }} />
                            {/* <div style={{ height: '800px', background: '#eee', marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Scrollable Content Area</div> */}
                        </>
                    ) : (
                        <h1>Select a topic to start learning</h1>
                    )}
                </main>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

const styles = {
    screenContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    },
    pageContainer: {
        paddingTop: '70px', // Height of the fixed header
        display: 'flex',
        flex: 1, // Takes up all available space between header and footer
        overflow: 'hidden', // Prevents the container itself from scrolling
    },
    sidebar: {
        width: '300px',
        // backgroundColor: '#f4f4f4',
        padding: '20px',
        // borderRight: '1px solid #ddd',
        // borderRadius: '28px',
        overflowY: 'auto', // Allows this column to scroll independently
    },
    courseTitle: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '20px',
                // backgroundColor: '#da2424ff',
                padding: '12px',
                


    },
    partHeader: {
        fontSize: '16px',
        fontWeight: 'bold',
        padding: '10px',
        cursor: 'pointer',
        marginBottom: '12px',
        borderRadius: '28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #eee',
        // backgroundColor: '#5124daff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',

    },
    expandIcon: {
        fontSize: '20px',
    },
    topicList: {
        listStyle: 'none',
        paddingLeft: '20px',
        margin: 0,
    },
    topicItem: {
        padding: '10px',
        cursor: 'pointer',
        borderRadius: '28px',
        marginBottom: '4px',
    },
    activeTopic: {
        backgroundColor: '#007bff',
        color: 'white',
        fontWeight: 'bold',
    },
    contentArea: {
        flex: 1,
        padding: '40px',
        overflowY: 'auto',
    },
};

export default CourseScreen;