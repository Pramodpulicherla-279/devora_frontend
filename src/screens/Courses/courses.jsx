import React from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';

const coursesData = [
    { title: 'HTML', description: 'Learn the structure of web pages.' },
    { title: 'CSS', description: 'Style your websites with modern techniques.' },
    { title: 'JavaScript', description: 'Add interactivity to your web applications.' },
    { title: 'Git & GitHub', description: 'Master version control and collaboration.' },
    { title: 'Node.js', description: 'Build scalable server-side applications.' },
    { title: 'Express.js', description: 'Create robust APIs with this popular framework.' },
    { title: 'MongoDB', description: 'Work with a leading NoSQL database.' },
    { title: 'Real-time Projects', description: 'Apply your skills to build complete projects.' },
];

function CoursesScreen() {
    return (
        <>
            <Header />
            <div style={styles.mainContainer}>
                <h1 style={styles.pageTitle}>Our Courses</h1>
                <div style={styles.coursesGrid}>
                    {coursesData.map((course, index) => (
                        <div key={index} style={styles.courseCard}>
                            <h3 style={styles.cardTitle}>{course.title}</h3>
                            <p style={styles.cardDescription}>{course.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

const styles = {
    mainContainer: {
                margin: '40px auto 0',

        padding: '20px',
        minHeight: 'calc(80vh - 120px)', // Adjust based on Header/Footer height
    },
    pageTitle: {
        textAlign: 'center',
        fontSize: '36px',
        marginBottom: '40px',
        color: '#333',
    },
    coursesGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '24px',
    },
    courseCard: {
        backgroundColor: '#ffffff',
        border: '1px solid #e0e0e0',
        borderRadius: '20px',
        padding: '24px',
        width: '280px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
    },
    cardTitle: {
        fontSize: '22px',
        fontWeight: 'bold',
        marginBottom: '12px',
        color: '#007bff',
    },
    cardDescription: {
        fontSize: '16px',
        color: '#555',
    }
};

export default CoursesScreen;