import React, { useState, useEffect } from 'react';
import AuthPopup from '../AuthPopup/AuthPopup';

function Header() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    // State to manage login status. Set to `true` to see the logged-in view.
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
    }, []);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        // Check for user info in case of successful login/signup
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    };

    return (
        <>
            <header style={styles.headerContainer}>
                <div style={styles.logo}>Dev.eL</div>
                <div style={styles.navItems}>
                    {user ? (
                        <div style={styles.profileContainer}>
                            <span style={styles.userName}>{user.name}</span>
                            <img 
                                src={`https://placehold.co/40x40/EFEFEF/4A4A4A?text=${user.name.charAt(0).toUpperCase()}`} 
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
        backgroundColor: '#081c15',
        color: 'white',
    }
};

export default Header;