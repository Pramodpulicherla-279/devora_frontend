import { useState, useEffect } from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';

const API_BASE_URL = "http://localhost:5000";

function CoursesScreen() {
    const [courses, setCourses] = useState([]);


    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/courses`);
                const result = await response.json();
                if (result.success) {
                    // Map backend data to frontend state structure
                    const fetchedCourses = result.data.map(course => ({
                        id: course._id,
                        name: course.title,
                        description: course.description,
                        parts: course.parts || [] // Assuming parts are populated or just IDs
                    }));
                    setCourses(fetchedCourses);
                    console.log("Course List:", fetchedCourses)
                }
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            }
        };
        fetchCourses();
    }, []);
    return (
        <>
            <Header />
            <div style={styles.mainContainer}>
                <h1 style={styles.pageTitle}>Our Courses</h1>
                <div style={styles.coursesGrid}>
                    {courses.map((course, index) => (
                        <div key={index} style={styles.courseCard}>
                            <h3 style={styles.cardTitle}>{course.name}</h3>
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