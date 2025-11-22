import React from 'react';

function Footer() {
    return (
        <footer style={styles.footerContainer}>
            <p>Copyright &copy; {new Date().getFullYear()} Devora. All rights reserved.</p>
        </footer>
    )
}

const styles = {
    footerContainer: {
        backgroundColor: 'black',
        color: 'white',
        padding: '0px 32px',
        borderRadius: 12,
        fontSize: 16,
        fontWeight: 'bold',
        // boxShadow: '0 0 8px rgba(0,0,0,0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto', // Pushes footer to the bottom if content is short
    }
};

export default Footer;