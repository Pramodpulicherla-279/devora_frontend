
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import coverImg from '../../assets/cover.png';

const API_BASE_URL = "http://localhost:5000";

function HomeScreen() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const coursesRef = useRef(null); 


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

    const handleCourseClick = (courseId) => {
        navigate(`/course/${courseId}`);
        // navigate(`/lessons`);
    };

    
    const handleStartJourneyClick = () => {
        // Scroll to the courses section smoothly
        coursesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Header />
            <div style={styles.mainContainer}>
                <div style={styles.textContainer}>
                    <h1 style={styles.title}>Welcome to Dev.eL</h1>
                    <p style={styles.subtitle}>Your journey to becoming a MERN Stack Developer starts here.</p>
                    <div style={styles.buttonContainer}>
                        <button style={styles.button} onClick={handleStartJourneyClick}>Start Journey</button>
                        {/* <button style={{ ...styles.button, ...styles.secondaryButton }}>Sign Up</button> */}
                    </div>
                </div>
                <div style={styles.imageContainer}>
                    <img src={coverImg} alt="Application preview" style={styles.image} />
                </div>
            </div>

            <div style={styles.secondContainer} ref={coursesRef}>
                <h1 style={styles.courseTitle}>Our Courses</h1>
                <div style={styles.coursesGrid}>
                    {courses.map((course, index) => (
                        <div key={index} style={styles.courseCard} onClick={() => handleCourseClick(course.id)}>
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

// import { useState, useEffect } from 'react';
// import Header from '../../components/Header/header';
// import Footer from '../../components/Footer/footer';

// const API_BASE_URL = "http://localhost:5000";

// function CoursesScreen() {
//     return (
//         <>
//             <Header />

//             <Footer />
//         </>
//     );
// }

// const styles = {

// };

// export default CoursesScreen;

const styles = {
    mainContainer: {
        width: '90%',
        display: 'flex',
        alignItems: 'center',
        margin: '80px auto 0',
        justifyContent: 'space-around',
        backgroundColor: '#bee9e8',
        borderRadius: '40px',
        flexWrap: 'wrap',
        padding: '40px 32px',
        minHeight: 'calc(80vh - 120px)', // Adjust based on Header/Footer height
    },
    textContainer: {
        flex: 1,
        minWidth: '300px',
        paddingRight: '20px',
        color: 'black',
        paddingLeft: '100px'

    },
    title: {
        fontSize: '48px',
        fontWeight: 'bold',
        marginBottom: '16px',
    },
    subtitle: {
        fontSize: '20px',
        marginBottom: '24px',
    },
    buttonContainer: {
        display: 'flex',
        gap: '16px',
    },
    button: {
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '8px',
        backgroundColor: '#ff6700',
        color: 'white',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
    secondaryButton: {
        backgroundColor: '#6c757d',
    },
    imageContainer: {
        flex: 1,
        minWidth: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        maxWidth: '80%',
        height: 'auto',

        // backgroundColor: '#bee9e8'
        // boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    },
    secondContainer: {
        margin: '0px auto 0',

        padding: '20px',
        minHeight: 'calc(80vh - 120px)', // Adjust based on Header/Footer height
    },
    courseTitle: {
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

export default HomeScreen;