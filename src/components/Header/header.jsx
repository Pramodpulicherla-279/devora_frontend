import React, { useState, useEffect } from 'react';
import AuthPopup from '../AuthPopup/AuthPopup';
import { Link, useLocation } from 'react-router-dom';
import DonateModal from '../DonateModal/donateModal.jsx';
import logo from '../../assets/logo.png';
import './header.css';

function Header({ onAboutClick, onContactClick }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    // State to manage login status. Set to `true` to see the logged-in view.
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);


    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
    }, []);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
        setIsSidebarOpen(false);
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
        setIsSidebarOpen(false);
        window.location.reload();
    };

    const handleAboutClick = (e) => {
        if (onAboutClick) {
            e.preventDefault();
            onAboutClick();
            setIsSidebarOpen(false);
        }
    };

    const handleContactClick = (e) => {
        if (onAboutClick) {
            e.preventDefault();
            onContactClick();
            setIsSidebarOpen(false);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleOpenDonate = () => {
        setIsDonateModalOpen(true);
        setIsSidebarOpen(false);
    };

    const handleCloseDonate = () => {
        setIsDonateModalOpen(false);
    };

    // const handleTermsClick = () => {
    //     navigate('/terms')
    // };
    // const handlePrivacyPolicyClick = () => {
    //     navigate('/privacy-policy')
    // };
    return (
        <>
            <header className="header-container">
                {/* Left: Logo */}
                <div className="logo">
                    <img src={logo} alt="DevEL Logo" />
                    <p>Dev.eL</p>
                </div>

                <button type="button" className="header-hamburger-menu" onClick={toggleSidebar}>
                    ☰
                </button>

                {/* Right: Nav and Profile */}
                <div className={`right-section ${isSidebarOpen ? 'open' : ''}`}>
                    <button type="button" className="close-sidebar" onClick={toggleSidebar}>×</button>
                    {/* Navigation Links */}
                    <div className="nav-links">
                        {location.pathname === '/' ? (
                            <>
                                <a href="/about" className="nav-link" onClick={handleAboutClick} >About</a>
                                <a href="/contact" className="nav-link" onClick={handleContactClick}>Contact</a>

                            </>
                        ) : (
                            <Link to="/" className="nav-link">Home</Link>
                        )}
                        <Link to="/privacy-policy" className="nav-link">Privacy Policy</Link>
                        <Link to="/terms" className="nav-link">Terms & Conditions</Link>
                    </div>

                    {/* Profile/Login */}
                    <div className="profile-section">
                        <button className="donate-button" onClick={handleOpenDonate}>
                            ☕ Buy Me a Coffee
                        </button>
                        {user ? (
                            <div className="profile-container">
                                <img
                                    src={`https://placehold.co/40x40/EFEFEF/4A4A4A?text=${user.name.charAt(0).toUpperCase()}`}
                                    alt="User Avatar"
                                    className="avatar"
                                />
                                <span className="user-name">{user.name}</span>
                                <button className="login-button" onClick={handleLogout}>Logout</button>
                            </div>
                        ) : (
                            <button className="login-button" onClick={handleOpenPopup}>Login</button>
                        )}
                    </div>
                </div>
                {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
            </header >
            {isPopupOpen && <AuthPopup onClose={handleClosePopup} />}
            {isDonateModalOpen && <DonateModal onClose={handleCloseDonate} />}
        </>
    );
}
const styles = {
    // headerContainer: {
    //     position: 'fixed',
    //     top: 0,
    //     left: 0,
    //     right: 0,
    //     zIndex: 1000,
    //     backgroundColor: 'white',
    //     color: 'black',
    //     padding: '16px 32px',
    //     display: 'flex',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    // },
    // logo: {
    //     fontSize: 24,
    //     fontWeight: 'bold',
    //     letterSpacing: '2px',
    // },
    // rightSection: {
    //     display: 'flex',
    //     alignItems: 'center',
    //     gap: '40px',
    // },
    // navLinks: {
    //     display: 'flex',
    //     gap: '30px',
    // },
    // navLink: {
    //     color: 'black',
    //     textDecoration: 'none',
    //     fontSize: '16px',
    //     fontWeight: '500',
    // },
    // profileContainer: {
    //     display: 'flex',
    //     alignItems: 'center',
    //     gap: '15px',
    // },
    // userName: {
    //     fontWeight: 'bold',
    //     fontSize: '16px',
    // },
    // avatar: {
    //     width: '40px',
    //     height: '40px',
    //     borderRadius: '50%',
    //     objectFit: 'cover',
    // },
    // loginButton: {
    //     padding: '8px 20px',
    //     fontSize: '16px',
    //     fontWeight: 'bold',
    //     cursor: 'pointer',
    //     border: '2px solid #007bff',
    //     borderRadius: '8px',
    //     backgroundColor: '#081c15',
    //     color: 'white',
    // },
};
export default Header;