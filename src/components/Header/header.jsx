import React, { useState } from 'react';
import AuthPopup from '../AuthPopup/AuthPopup';

function Header() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    // State to manage login status. Set to `true` to see the logged-in view.
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        // Add any other logout logic here
    };

    return (
        <>
            <header style={styles.headerContainer}>
                <div style={styles.logo}>Devora</div>
                <div style={styles.navItems}>
                    {!isLoggedIn ? (
                        <div style={styles.profileContainer}>
                            <span style={styles.userName}>Pramod</span>
                            <img 
                                src="https://placehold.co/40x40/EFEFEF/4A4A4A?text=P" 
                                alt="User Avatar" 
                                style={styles.avatar} 
                            />
                            <button style={styles.loginButton} onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <button style={styles.loginButton} onClick={handleOpenPopup}>Login</button>
                    )}
                </div>
            </header>
            {isPopupOpen && <AuthPopup onClose={handleClosePopup} />}
        </>
    );
}
const styles = {
    headerContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000, // Ensures the header stays on top of other content
        backgroundColor: 'white',
        color: 'black',
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: '2px',
    },
    navItems: {
        display: 'flex',
        alignItems: 'center',
    },
    profileContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    },
    userName: {
        fontWeight: 'bold',
        fontSize: '16px',
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        objectFit: 'cover',
    },
    loginButton: {
        padding: '8px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        border: '2px solid #007bff',
        borderRadius: '8px',
        backgroundColor: '#007bff',
        color: 'white',
    }
};

export default Header;