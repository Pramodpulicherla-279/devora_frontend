import React from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';

function ContactScreen() {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for your message. We will get back to you shortly.");
        // Here you would typically handle form submission, e.g., send data to a server
        e.target.reset();
    };

    return (
        <>
            <Header />
            <div style={styles.container}>
                <h1 style={styles.title}>Contact Us</h1>
                <p style={styles.text}>
                    Have a question or feedback? Fill out the form below, and we'll get back to you as soon as possible.
                </p>
                <form style={styles.form} onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label htmlFor="name" style={styles.label}>Name</label>
                        <input type="text" id="name" name="name" style={styles.input} required />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="email" style={styles.label}>Email</label>
                        <input type="email" id="email" name="email" style={styles.input} required />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="message" style={styles.label}>Message</label>
                        <textarea id="message" name="message" style={styles.textarea} rows="6" required></textarea>
                    </div>
                    <button type="submit" style={styles.button}>Send Message</button>
                </form>
            </div>
            <Footer />
        </>
    );
}

const styles = {
    container: {
        padding: '10px 5%',
        maxWidth: '800px',
        margin: '0 auto',
        color: '#333',
    },
    title: {
        fontSize: '36px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '20px',
    },
    text: {
        fontSize: '18px',
        textAlign: 'center',
        marginBottom: '40px',
        color: '#555',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
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

export default ContactScreen;