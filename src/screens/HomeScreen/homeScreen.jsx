
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import coverImg from '../../assets/cover.png';
import emailjs from '@emailjs/browser';
import './homeScreen.css';
import { API_BASE_URL } from '../../../config';


function HomeScreen() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const coursesRef = useRef(null);
    const aboutRef = useRef(null);
    const contactRef = useRef(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState(''); // To show sending status or success/error messages

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

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

    const handleAboutClick = () => {
        // Scroll to the courses section smoothly
        aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleContactClick = () => {
        // Scroll to the courses section smoothly
        contactRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('Sending...');

        // Replace with your actual EmailJS credentials
        const serviceID = 'service_w68uiig';
        const templateID = 'template_sxdk7m1';
        const publicKey = 'a0HMfFE13KWXlWuFs';

        emailjs.send(serviceID, templateID, formData, publicKey)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setStatus('Message sent successfully!');
                setFormData({ name: '', email: '', message: '' }); // Reset form
            }, (error) => {
                console.log('FAILED...', error);
                setStatus('Failed to send message. Please try again.');
            });
    };

    return (
        <>
            <Header onAboutClick={handleAboutClick} onContactClick={handleContactClick} />
            <div style={styles.mainContainer}>
                <div style={styles.textContainer}>
                    <h1 style={styles.maintitle}>Welcome to Dev.eL</h1>
                    <p style={styles.subtitle}>Your journey to becoming a MERN Stack Developer starts here.</p>
                    <div style={styles.buttonContainer}>
                        <button style={styles.startbtn} onClick={handleStartJourneyClick}>Start Journey</button>
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
                        <div key={index} className="courseCard" onClick={() => handleCourseClick(course.id)}>
                            <h3 style={styles.cardTitle}>{course.name}</h3>
                            <p style={styles.cardDescription}>{course.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div style={styles.aboutContainer} ref={aboutRef}>
                <h2 style={styles.aboutTitle}>About Dev.eL</h2>

                <p style={styles.aboutText}>
                    Dev.eL is a modern learning platform designed to empower aspiring developers
                    with clear, practical, and industry-focused MERN stack education.
                    Whether you're a complete beginner or someone looking to strengthen your
                    full-stack development skills, Dev.eL provides structured, easy-to-understand
                    lessons that help you learn without confusion.
                </p>

                <p style={styles.aboutText}>
                    Our platform focuses on teaching real web development—from HTML and CSS
                    basics to advanced JavaScript, backend APIs, databases, authentication,
                    deployment, real-time features, and more. Every topic is explained in a
                    simple and hands-on approach so you can build real projects confidently.
                </p>

                <p style={styles.aboutText}>
                    At Dev.eL, we believe in accessibility. That's why the content is free,
                    open-source, and updated regularly to match modern industry standards.
                    We want every student, beginner, and aspiring developer to have the resources
                    they need to build meaningful projects and kickstart a successful tech career.
                </p>

                <p style={styles.aboutText}>
                    Our mission is to create a supportive community of learners, encourage
                    practical coding habits, and help you grow step-by-step as a developer.
                    Start your learning journey today and experience a smarter, simpler, and
                    more effective way to master the MERN stack with Dev.eL.
                </p>

            </div>

            <div style={styles.formContainer} ref={contactRef}>
                <h1 style={styles.title}>Contact Us</h1>
                <p style={styles.text}>
                    Have a question or feedback? Fill out the form below, and we'll get back to you as soon as possible.
                </p>
                <form style={styles.form} onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label htmlFor="name" style={styles.label}>Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} style={styles.input} required />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="email" style={styles.label}>Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} required />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="message" style={styles.label}>Message</label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} style={styles.textarea} rows="6" required></textarea>
                    </div>
                    <button type="submit" style={styles.button} disabled={status === 'Sending...'}>
                        {status === 'Sending...' ? 'Sending...' : 'Send Message'}
                    </button>   
                 </form>
                 {status && <p style={styles.statusText}>{status}</p>}
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
    maintitle: {
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
    startbtn: {
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
    // courseCard: {
    //     backgroundColor: '#ffffff',
    //     border: '1px solid #e0e0e0',
    //     borderRadius: '20px',
    //     padding: '24px',
    //     width: '280px',
    //     textAlign: 'center',
    //     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    //     transition: 'transform 0.2s, box-shadow 0.2s',
    //     cursor: 'pointer',
    // },
    cardTitle: {
        fontSize: '22px',
        fontWeight: 'bold',
        marginBottom: '12px',
        color: '#007bff',
    },
    cardDescription: {
        fontSize: '16px',
        color: '#555',
    },
    aboutContainer: {
        padding: '60px 32px',
        backgroundColor: '#f8f9fa',
        textAlign: 'center',
        width: '90%',
        margin: '40px auto',
        borderRadius: '20px',
    },
    aboutTitle: {
        fontSize: '36px',
        marginBottom: '20px',
        color: '#333',
    },
    aboutText: {
        fontSize: '18px',
        color: '#555',
        maxWidth: '800px',
        margin: '0 auto',
        lineHeight: '1.6',
    },
    formContainer: {
        padding: '10px 5%',
        maxWidth: '400px',
        margin: '0 auto',
        color: '#333',
    },
    title: {
        fontSize: '28px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '20px',
    },
    text: {
        fontSize: '14px',
        textAlign: 'center',
        marginBottom: '40px',
        color: '#555',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '8px',
        fontWeight: 'bold',
        fontSize: '16px',
    },
    input: {
        padding: '12px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '8px',
    },
    textarea: {
        padding: '12px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        resize: 'vertical',
    },
    button: {
        padding: '15px',
        fontSize: '18px',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginTop: '10px',
    },

};

export default HomeScreen;