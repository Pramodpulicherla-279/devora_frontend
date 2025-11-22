import React, { useState, useEffect } from 'react';
import AuthPopup from '../AuthPopup/AuthPopup';
import { Link, useLocation } from 'react-router-dom';

function Header({ onAboutClick, onContactClick }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    // State to manage login status. Set to `true` to see the logged-in view.
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();


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

    const handleAboutClick = (e) => {
        if (onAboutClick) {
            e.preventDefault();
            onAboutClick();
        }
    };

    const handleContactClick = (e) => {
        if (onAboutClick) {
            e.preventDefault();
            onContactClick();
        }
    };

    // const handleTermsClick = () => {
    //     navigate('/terms')
    // };
    // const handlePrivacyPolicyClick = () => {
    //     navigate('/privacy-policy')
    // };
    return (
        <>
            <header style={styles.headerContainer}>
                {/* Left: Logo */}
                <div style={styles.logo}>Dev.eL</div>

                {/* Right: Nav and Profile */}
                <div style={styles.rightSection}>
                    {/* Navigation Links */}
                    <div style={styles.navLinks}>
                        {location.pathname === '/' ? (
                            <>
                                <a href="/about" style={styles.navLink} onClick={handleAboutClick} >About</a>
                                <a href="/contact" style={styles.navLink} onClick={handleContactClick}>Contact</a>

                            </>
                        ) : (
                            <Link to="/" style={styles.navLink}>Home</Link>
                        )}
                    <Link to="/privacy-policy" style={styles.navLink}>Privacy Policy</Link>
                    <Link to="/terms" style={styles.navLink}>Terms & Conditions</Link>
                </div>

                {/* Profile/Login */}
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
        </header >
            { isPopupOpen && <AuthPopup onClose={handleClosePopup} />
}
        </>
    );
}
const styles = {
    headerContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
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
    rightSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '40px',
    },
    navLinks: {
        display: 'flex',
        gap: '30px',
    },
    navLink: {
        color: 'black',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: '500',
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
    },
};
export default Header;