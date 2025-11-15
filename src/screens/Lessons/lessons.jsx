import React, { useState } from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import './lessons.css'; // Import the new CSS file

// Mock data for the course structure, focused on HTML
const courseData = {
    name: 'HTML',
    parts: [
        {
            id: 'part1',
            title: 'Part 1: HTML Fundamentals',
            topics: [
                { id: 'topic1-1', title: 'HTML Basics', content: 'Content for HTML Basics goes here. Learn about elements, tags, and attributes.' },
                { id: 'topic1-2', title: 'HTML Forms & Inputs', content: 'Content for HTML Forms & Inputs goes here. Discover how to collect user data.' },
                { id: 'topic1-3', title: 'HTML5 Semantic Elements', content: 'Content for HTML5 Semantic Elements goes here. Understand how to structure your pages meaningfully.' },
            ],
        },
        {
            id: 'part2',
            title: 'Part 2: Advanced HTML',
            topics: [
                { id: 'topic2-1', title: 'Multimedia and Embedding', content: 'Content for Multimedia and Embedding goes here. Learn to add images, audio, and video.' },
                { id: 'topic2-2', title: 'HTML Tables', content: 'Content for HTML Tables goes here. Learn to structure data in rows and columns.' },
            ],
        },
    ],
};

function LessonsScreen() {
    const [expandedPart, setExpandedPart] = useState(courseData.parts[0].id); // Expand the first part by default
    const [activeTopic, setActiveTopic] = useState(courseData.parts[0].topics[0]);

    const handlePartClick = (partId) => {
        setExpandedPart(expandedPart === partId ? null : partId); // Toggle expansion
    };

    const handleTopicClick = (topic) => {
        setActiveTopic(topic);
    };

     return (
        <div style={styles.screenContainer}>
            <Header />
            <div style={styles.pageContainer}>
                {/* Left Sidebar */}
                <aside style={styles.sidebar} className="hide-scrollbar">
                    <h2 style={styles.courseTitle}>{courseData.name}</h2>
                    <nav>
                        {courseData.parts.map((part, index) => (
                            <div key={part.id || index}>
                                <div style={styles.partHeader} onClick={() => handlePartClick(part.id)}>
                                    {part.title}
                                    <span style={styles.expandIcon}>{expandedPart === part.id ? '-' : '+'}</span>
                                </div>
                                {expandedPart === part.id && (
                                    <ul style={styles.topicList}>
                                        {part.topics.map((topic) => (
                                            <li
                                                key={topic.id}
                                                style={activeTopic.id === topic.id ? { ...styles.topicItem, ...styles.activeTopic } : styles.topicItem}
                                                onClick={() => handleTopicClick(topic)}
                                            >
                                                {topic.title}
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
                            <p>{activeTopic.content}</p>
                            <div style={{ height: '800px', background: '#eee', marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Scrollable Content Area</div>
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
        backgroundColor: '#f4f4f4',
        padding: '20px',
        borderRight: '1px solid #ddd',
        borderRadius: '28px',
        overflowY: 'auto', // Allows this column to scroll independently
    },
    courseTitle: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    partHeader: {
        fontSize: '16px',
        fontWeight: 'bold',
        padding: '10px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #eee',
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
        borderRadius: '4px',
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

export default LessonsScreen;