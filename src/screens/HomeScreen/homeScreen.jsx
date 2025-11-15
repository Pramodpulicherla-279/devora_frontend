import React from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import coverImg from '../../assets/cover.png';

function HomeScreen() {
    return (
        <>
            <Header />
            <div style={styles.mainContainer}>
                <div style={styles.textContainer}>
                    <h1 style={styles.title}>Welcome to Devora</h1>
                    <p style={styles.subtitle}>Your journey to becoming a MERN Stack Developer starts here.</p>
                    <div style={styles.buttonContainer}>
                        <button style={styles.button}>Start Journey</button>
                        {/* <button style={{ ...styles.button, ...styles.secondaryButton }}>Sign Up</button> */}
                    </div>
                </div>
                <div style={styles.imageContainer}>
                    <img src={coverImg} alt="Application preview" style={styles.image} />
                </div>
            </div>
            <Footer />
        </>
    );
}

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
    }
};

export default HomeScreen;