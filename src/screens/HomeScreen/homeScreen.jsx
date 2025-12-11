
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import coverImg from '../../assets/cover.png';
import emailjs from '@emailjs/browser';
import { Helmet } from 'react-helmet';
import './homeScreen.css';
import { API_BASE_URL } from '../../../config';


function HomeScreen() {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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
            setIsLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/api/courses`);
                const result = await response.json();
                if (result.success) {
                    // Map backend data to frontend state structure
                    const fetchedCourses = result.data.map(course => ({
                        id: course._id,
                        name: course.title,
                        slug: course.slug,
                        description: course.description,
                        parts: course.parts || [] // Assuming parts are populated or just IDs
                    }));
                    setCourses(fetchedCourses);
                    console.log("Course List:", fetchedCourses)

                    // Debug: Check if all courses have slugs
                    fetchedCourses.forEach(course => {
                        if (!course.slug) {
                            console.warn(`Course "${course.name}" is missing a slug!`);
                        }
                    });
                }
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const handleCourseClick = (course) => {
        console.log("Course object:", course);
        console.log("Course slug:", course.slug);
        console.log("Has slug?", !!course.slug);

        if (!course.slug) {
            console.error("Course has no slug:", course);
            alert("This course cannot be accessed (missing slug)");
            return;
        }
        // navigate(`/course/${courseId}`);
        // navigate(`/lessons`);
        navigate(`/course/${course.slug}`);
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
            <Helmet>
                <title>Dev.eL - MERN Courses & Web Development Learning</title>
                <meta
                    name="description"
                    content="Dev.eL offers simple, step-by-step text courses on MERN stack, JavaScript, and web development. Learn anytime at your own pace."
                />
                <link rel="canonical" href="https://www.dev-el.co" />
            </Helmet>

            <Header onAboutClick={handleAboutClick} onContactClick={handleContactClick} />
            <div className="main-container" style={styles.mainContainer}>
                <div className="text-container" style={styles.textContainer}>
                    <h1 className="maintitle" style={styles.maintitle}>Welcome to Dev.eL</h1>
                    <p className="subtitle" style={styles.subtitle}>Your journey to becoming a MERN Stack Developer starts here.</p>
                    <div className="button-container" style={styles.buttonContainer}>
                        <button className="startbtn" style={styles.startbtn} onClick={handleStartJourneyClick}>Start Journey</button>
                        {/* <button style={{ ...styles.button, ...styles.secondaryButton }}>Sign Up</button> */}
                    </div>
                </div>
                <div className="image-container" style={styles.imageContainer}>
                    <img src={coverImg} alt="Application preview" style={styles.image} className="image" />
                </div>
            </div>

            <div className="second-container" style={styles.secondContainer} ref={coursesRef}>
                <h1 className="course-title" style={styles.courseTitle}>Our Courses</h1>

                {isLoading ? (
                    <div style={styles.loaderContainer}>
                        <div style={styles.loader}></div>
                    </div>
                ) : (
                    <div className="courses-grid" style={styles.coursesGrid}>
                        {courses.map((course, index) => (
                            <div key={index} className="courseCard" onClick={() => handleCourseClick(course)}>
                                <h3 className="card-title" style={styles.cardTitle}>{course.name}</h3>
                                <p className="card-description" style={styles.cardDescription}>{course.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="about-container" style={styles.aboutContainer} ref={aboutRef}>
                <h2 className="about-title" style={styles.aboutTitle}>About Dev.eL</h2>

                <p className="about-text" style={styles.aboutText}>
                    Dev.eL is a modern learning platform created to help aspiring developers
                    learn full-stack web development with clarity and confidence. Our focus
                    is on the MERN stack, but we start from the very basics so that complete
                    beginners can follow along without feeling overwhelmed.
                </p>

                <p className="about-text" style={styles.aboutText}>
                    On Dev.eL, you learn real-world web development step by step—from HTML,
                    CSS, and responsive layouts to JavaScript, frontend frameworks, backend
                    APIs, databases, authentication, deployment, and real-time features.
                    Every lesson is written in simple language, with clear examples and
                    practical use cases so that you not only understand the concepts, but
                    also know how to apply them in real projects.
                </p>

                <p className="about-text" style={styles.aboutText}>
                    We believe that quality technical education should be accessible.
                    That&apos;s why Dev.eL is free to use and our content is openly
                    available. We regularly review and update our lessons to keep them
                    aligned with current industry practices and modern tools used by
                    professional developers.
                </p>

                <p className="about-text" style={styles.aboutText}>
                    Our mission is to support learners at every stage—whether you are
                    just starting out or strengthening your full-stack development skills.
                    We encourage consistent coding practice, project-based learning, and a
                    supportive community mindset so that you can grow at your own pace,
                    build meaningful applications, and prepare for real opportunities in
                    the tech industry.
                </p>

                <p className="about-text" style={styles.aboutText}>
                    Start your journey with Dev.eL today and experience a structured,
                    simple, and practical way to master the MERN stack.
                </p>

            </div>

            <div className="form-container" style={styles.formContainer} ref={contactRef}>
                <h1 className="title" style={styles.title}>Contact Us</h1>
                <p className="text" style={styles.text}>
                    Have a question or feedback? Fill out the form below, and we'll get back to you as soon as possible.
                </p>
                <form className="form" style={styles.form} onSubmit={handleSubmit}>
                    <div className="form-group" style={styles.formGroup}>
                        <label htmlFor="name" className="label" style={styles.label}>Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} style={styles.input} className="input" required />
                    </div>
                    <div className="form-group" style={styles.formGroup}>
                        <label htmlFor="email" className="label" style={styles.label}>Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} className="input" required />
                    </div>
                    <div className="form-group" style={styles.formGroup}>
                        <label htmlFor="message" className="label" style={styles.label}>Message</label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} style={styles.textarea} className="textarea" rows="6" required></textarea>
                    </div>
                    <button type="submit" className="button" style={styles.button} disabled={status === 'Sending...'}>
                        {status === 'Sending...' ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
                {status && <p className="status-text" style={styles.statusText}>{status}</p>}
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
    loaderContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '300px',
        gap: '20px',
    },
    loader: {
        border: '8px solid #f3f3f3',
        borderTop: '8px solid #007bff',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        animation: 'spin 1s linear infinite',
    },
    loadingText: {
        fontSize: '18px',
        color: '#555',
        fontWeight: '500',
    },
    // mainContainer: {
    //     width: '90%',
    //     display: 'flex',
    //     alignItems: 'center',
    //     margin: '80px auto 0',
    //     justifyContent: 'space-around',
    //     backgroundColor: '#bee9e8',
    //     borderRadius: '40px',
    //     flexWrap: 'wrap',
    //     padding: '40px 32px',
    //     minHeight: 'calc(80vh - 120px)', // Adjust based on Header/Footer height
    // },
    // textContainer: {
    //     flex: 1,
    //     minWidth: '300px',
    //     paddingRight: '20px',
    //     color: 'black',
    //     paddingLeft: '100px'

    // },
    // maintitle: {
    //     fontSize: '48px',
    //     fontWeight: 'bold',
    //     marginBottom: '16px',
    // },
    // subtitle: {
    //     fontSize: '20px',
    //     marginBottom: '24px',
    // },
    // buttonContainer: {
    //     display: 'flex',
    //     gap: '16px',
    // },
    // startbtn: {
    //     padding: '12px 24px',
    //     fontSize: '16px',
    //     fontWeight: 'bold',
    //     cursor: 'pointer',
    //     border: 'none',
    //     borderRadius: '8px',
    //     backgroundColor: '#ff6700',
    //     color: 'white',
    //     boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    // },
    // secondaryButton: {
    //     backgroundColor: '#6c757d',
    // },
    // imageContainer: {
    //     flex: 1,
    //     minWidth: '300px',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // image: {
    //     maxWidth: '80%',
    //     height: 'auto',

    //     // backgroundColor: '#bee9e8'
    //     // boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    // },
    // secondContainer: {
    //     margin: '0px auto 0',

    //     padding: '20px',
    //     minHeight: 'calc(80vh - 120px)', // Adjust based on Header/Footer height
    // },
    // courseTitle: {
    //     textAlign: 'center',
    //     fontSize: '36px',
    //     marginBottom: '40px',
    //     color: '#333',
    // },
    // coursesGrid: {
    //     display: 'flex',
    //     flexWrap: 'wrap',
    //     justifyContent: 'center',
    //     gap: '24px',
    // },
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
    // cardTitle: {
    //     fontSize: '22px',
    //     fontWeight: 'bold',
    //     marginBottom: '12px',
    //     color: '#007bff',
    // },
    // cardDescription: {
    //     fontSize: '16px',
    //     color: '#555',
    // },
    // aboutContainer: {
    //     padding: '60px 32px',
    //     backgroundColor: '#f8f9fa',
    //     textAlign: 'center',
    //     width: '90%',
    //     margin: '40px auto',
    //     borderRadius: '20px',
    // },
    // aboutTitle: {
    //     fontSize: '36px',
    //     marginBottom: '20px',
    //     color: '#333',
    // },
    // aboutText: {
    //     fontSize: '18px',
    //     color: '#555',
    //     maxWidth: '800px',
    //     margin: '0 auto',
    //     lineHeight: '1.6',
    // },
    // formContainer: {
    //     padding: '10px 5%',
    //     maxWidth: '400px',
    //     margin: '0 auto',
    //     color: '#333',
    // },
    // title: {
    //     fontSize: '28px',
    //     fontWeight: 'bold',
    //     textAlign: 'center',
    //     marginBottom: '20px',
    // },
    // text: {
    //     fontSize: '14px',
    //     textAlign: 'center',
    //     marginBottom: '40px',
    //     color: '#555',
    // },
    // form: {
    //     display: 'flex',
    //     flexDirection: 'column',
    //     gap: '0px',
    // },
    // formGroup: {
    //     display: 'flex',
    //     flexDirection: 'column',
    // },
    // label: {
    //     marginBottom: '8px',
    //     fontWeight: 'bold',
    //     fontSize: '16px',
    // },
    // input: {
    //     padding: '12px',
    //     fontSize: '16px',
    //     border: '1px solid #ccc',
    //     borderRadius: '8px',
    // },
    // textarea: {
    //     padding: '12px',
    //     fontSize: '16px',
    //     border: '1px solid #ccc',
    //     borderRadius: '8px',
    //     resize: 'vertical',
    // },
    // button: {
    //     padding: '15px',
    //     fontSize: '18px',
    //     fontWeight: 'bold',
    //     color: 'white',
    //     backgroundColor: '#007bff',
    //     border: 'none',
    //     borderRadius: '8px',
    //     cursor: 'pointer',
    //     marginTop: '10px',
    // },

};

export default HomeScreen;